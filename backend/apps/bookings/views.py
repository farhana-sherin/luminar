from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_201_CREATED, HTTP_200_OK, HTTP_400_BAD_REQUEST, 
    HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
)

from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import date
from django.db import transaction



from apps.common.google_sheets import add_booking, update_return_status
from apps.dresses.models import Dress
from .models import Booking
from .services import is_dress_available
from .serializers import (
    BookingCreateSerializer, BookingSerializer, BookingListSerializer,
    BookingReturnReminderSerializer, DressAvailabilitySerializer,
    DressListSerializer, SearchFilterSerializer
)
from .permissions import IsBookingOwnerOrAdmin
from .utils import (
    validate_and_parse_dates, paginate_queryset, error_response,
    safe_call_google_sheets
)


# -------------------------
# CREATE BOOKING
# -------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def create_booking(request):
 
    serializer = BookingCreateSerializer(data=request.data)
    
    if not serializer.is_valid():
        return error_response(serializer.errors, HTTP_400_BAD_REQUEST)
    
    # Validate dates
    try:
        start_date, end_date = validate_and_parse_dates(
            serializer.validated_data['start_date'].strftime('%Y-%m-%d'),
            serializer.validated_data['end_date'].strftime('%Y-%m-%d')
        )
    except ValueError as e:
        return error_response(str(e), HTTP_400_BAD_REQUEST)
    
    # Check if dress exists
    try:
        dress = Dress.objects.get(id=serializer.validated_data['dress_id'])
    except Dress.DoesNotExist:
        return error_response("Dress not found", HTTP_404_NOT_FOUND)
    
    # Check availability
    if not is_dress_available(dress, start_date, end_date):
        return error_response(
            "Dress already booked for selected dates",
            HTTP_400_BAD_REQUEST
        )
    
    # Calculate total days and amount
    total_days = (end_date - start_date).days + 1
    total_amount = dress.price  # Fixed price for the dress rental
    
    try:
        with transaction.atomic():
            booking = Booking.objects.create(
                dress=dress,
                customer_name=serializer.validated_data['customer_name'],
                mobile_number=serializer.validated_data['mobile_number'],
                place=serializer.validated_data['place'],
                start_date=start_date,
                end_date=end_date,
                total_days=total_days,
                total_amount=total_amount
            )
            
            # Try to sync with Google Sheets
            safe_call_google_sheets(add_booking, booking)
    except Exception as e:
        return error_response(
            f"Error creating booking: {str(e)}",
            HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    booking_serializer = BookingSerializer(booking)
    return Response(
        {
            "message": "Booking created successfully",
            "booking": booking_serializer.data
        },
        status=HTTP_201_CREATED
    )


# -------------------------
# BOOKING HISTORY
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def booking_history(request):
  
    bookings = Booking.objects.select_related("dress", "dress__category").order_by("-created_at")
    
    page_obj, paginator = paginate_queryset(bookings, request, page_size=20)
    serializer = BookingListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# SINGLE BOOKING
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def view_single_booking(request, booking_id):
 
    try:
        booking = Booking.objects.select_related(
            "dress", "dress__category"
        ).get(id=booking_id)
    except Booking.DoesNotExist:
        return error_response("Booking not found", HTTP_404_NOT_FOUND)
    
    # Check permissions
    permission = IsBookingOwnerOrAdmin()
    if not permission.has_object_permission(request, None, booking):
        return error_response("Permission denied", 403)
    
    serializer = BookingSerializer(booking)
    return Response(serializer.data)


# -------------------------
# RETURN DRESS
# -------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def return_dress(request):
   
    booking_id = request.data.get("booking_id")
    
    if not booking_id:
        return error_response("booking_id required", HTTP_400_BAD_REQUEST)
    
    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return error_response("Booking not found", HTTP_404_NOT_FOUND)
    
    # Check permissions
    permission = IsBookingOwnerOrAdmin()
    if not permission.has_object_permission(request, None, booking):
        return error_response("Permission denied", 403)
    
    if booking.returned:
        return error_response("Dress already returned", HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
            booking.returned = True
            booking.save()
            safe_call_google_sheets(update_return_status, booking)
    except Exception as e:
        return error_response(
            f"Error updating booking: {str(e)}",
            HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    return Response({"message": "Dress returned successfully"})


# -------------------------
# RETURNED DRESSES
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def returned_dresses(request):
 
    bookings = Booking.objects.filter(returned=True).select_related("dress", "dress__category").order_by("-created_at")
    
    page_obj, paginator = paginate_queryset(bookings, request, page_size=20)
    serializer = BookingListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# RETURN REMINDER
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def return_reminder(request):
  
    today = date.today()
    
    bookings = Booking.objects.filter(
        end_date__lt=today,
        returned=False
    ).select_related("dress", "dress__category").order_by("end_date")
    
    page_obj, paginator = paginate_queryset(bookings, request, page_size=20)
    serializer = BookingReturnReminderSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# AVAILABLE DRESSES
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def available_dresses(request):
    
    today = date.today()
    
    # Get dress IDs that are currently booked
    booked_dress_ids = Booking.objects.filter(
        end_date__gte=today,
        returned=False
    ).values_list("dress_id", flat=True).distinct()
    
    # Get available dresses
    dresses = Dress.objects.exclude(id__in=booked_dress_ids).select_related("category").order_by("name")
    
    page_obj, paginator = paginate_queryset(dresses, request, page_size=20)
    serializer = DressListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# BOOKED DRESSES
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def booked_dresses(request):
 
    bookings = Booking.objects.filter(returned=False).select_related("dress", "dress__category").order_by("-created_at")
    
    page_obj, paginator = paginate_queryset(bookings, request, page_size=20)
    serializer = BookingListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# FILTER DRESSES
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def filter_dresses(request):

    serializer = SearchFilterSerializer(data=request.GET)
    
    if not serializer.is_valid():
        return error_response(serializer.errors, HTTP_400_BAD_REQUEST)
    
    dresses = Dress.objects.select_related("category")
    
    # Filter by category if provided
    category = serializer.validated_data.get('category')
    if category:
        dresses = dresses.filter(category__name__icontains=category)
    
    # Filter by date range if provided
    start_date_val = serializer.validated_data.get('start_date')
    end_date_val = serializer.validated_data.get('end_date')
    
    if start_date_val and end_date_val:
        try:
            start_date, end_date = validate_and_parse_dates(
                start_date_val.strftime('%Y-%m-%d'),
                end_date_val.strftime('%Y-%m-%d')
            )
        except ValueError as e:
            return error_response(str(e), HTTP_400_BAD_REQUEST)
        
        # Get booked dress IDs for date range
        booked_ids = Booking.objects.filter(
            start_date__lte=end_date,
            end_date__gte=start_date,
            returned=False
        ).values_list("dress_id", flat=True).distinct()
        
        dresses = dresses.exclude(id__in=booked_ids)
    
    dresses = dresses.order_by("name")
    page_obj, paginator = paginate_queryset(dresses, request, page_size=20)
    serializer_out = DressListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer_out.data
    })


# -------------------------
# SEARCH DRESS
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def search_dress(request):
  
    query = request.GET.get("q", "").strip()
    
    if not query or len(query) < 2:
        return error_response(
            "Search query required (minimum 2 characters)",
            HTTP_400_BAD_REQUEST
        )
    
    dresses = Dress.objects.filter(
        Q(name__icontains=query) |
        Q(code__icontains=query)
    ).select_related("category").order_by("name").distinct()
    
    page_obj, paginator = paginate_queryset(dresses, request, page_size=20)
    serializer = DressListSerializer(page_obj, many=True)
    
    return Response({
        "count": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": request.GET.get('page', 1),
        "results": serializer.data
    })


# -------------------------
# CHECK AVAILABILITY
# -------------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def check_dress_availability(request, dress_id):
   
    start_date_str = request.GET.get("start_date")
    end_date_str = request.GET.get("end_date")
    
    if not start_date_str or not end_date_str:
        return error_response(
            "start_date and end_date required",
            HTTP_400_BAD_REQUEST
        )
    
    # Validate dates
    try:
        start_date, end_date = validate_and_parse_dates(start_date_str, end_date_str)
    except ValueError as e:
        return error_response(str(e), HTTP_400_BAD_REQUEST)
    
    # Check if dress exists
    try:
        dress = Dress.objects.get(id=dress_id)
    except Dress.DoesNotExist:
        return error_response("Dress not found", HTTP_404_NOT_FOUND)
    
    available = is_dress_available(dress, start_date, end_date)
    
    return Response({
        "dress_id": dress.id,
        "dress_name": dress.name,
        "available": available
    })



from django.db.models import Count, Q
from datetime import date

@api_view(["GET"])
@permission_classes([AllowAny])
def dashboard(request):

    today = date.today()

    stats = Booking.objects.aggregate(

        total_bookings=Count("id"),

        active_rentals=Count(
            "id",
            filter=Q(returned=False)
        ),

        returned_dresses=Count(
            "id",
            filter=Q(returned=True)
        ),
        #dresses that should have been returned by today but are not yet returned

        today_returns=Count(
            "id",
            filter=Q(end_date=today, returned=False)
        )
    )

    total_dresses = Dress.objects.count()

    return Response({

        "total_dresses": total_dresses,

        "total_bookings": stats["total_bookings"],

        "active_rentals": stats["active_rentals"],

        "returned_dresses": stats["returned_dresses"],

        "today_returns": stats["today_returns"]

    })


@api_view(["GET"])
@permission_classes([AllowAny])
def booking_statistics(request):

    # Monthly booking stats
    monthly_bookings = list(
        Booking.objects
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(total=Count("id"))
        .order_by("month")
    )

    # Category booking stats
    category_stats = list(
        Booking.objects
        .values("dress__category__name")
        .annotate(total=Count("id"))
        .order_by("-total")
    )

    # Clean category key for frontend
    for item in category_stats:
        item["category"] = item.pop("dress__category__name")

    return Response({
        "monthly_bookings": monthly_bookings,
        "category_stats": category_stats
    })