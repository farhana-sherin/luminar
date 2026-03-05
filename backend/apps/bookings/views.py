from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from datetime import datetime

from apps.dresses.models import Dress
from .models import Booking
from .services import is_dress_available


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_booking(request):

    try:
        dress_id = request.data.get("dress_id")
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")

        # dress fetch
        dress = Dress.objects.get(id=dress_id)

        # string → date convert
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

        # date validation
        if start_date > end_date:
            return Response({
                "error": "End date must be after start date"
            })

        # availability check
        available = is_dress_available(
            dress,
            start_date,
            end_date
        )

        if not available:
            return Response({
                "error": "Dress already booked for selected dates"
            })

        # total days calculate
        total_days = (end_date - start_date).days

        if total_days == 0:
            total_days = 1

        # total price calculate
        total_amount = total_days * dress.price

        # create booking
        booking = Booking.objects.create(

            dress=dress,

            customer_name=request.data.get("customer_name"),

            mobile_number=request.data.get("mobile_number"),

            place=request.data.get("place"),

            start_date=start_date,

            end_date=end_date,

            total_days=total_days,

            total_amount=total_amount
        )

        return Response({

            "message": "Booking created successfully",

            "booking_id": booking.id,

            "dress_name": dress.name,

            "total_days": total_days,

            "total_amount": total_amount
        })

    except Dress.DoesNotExist:

        return Response({
            "error": "Dress not found"
        })
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def booking_history(request):

    bookings = Booking.objects.select_related("dress").all().order_by("-created_at")

    data = []

    for booking in bookings:

        data.append({

            "booking_id": booking.id,

            "customer_name": booking.customer_name,

            "mobile_number": booking.mobile_number,

            "place": booking.place,

            "dress_name": booking.dress.name,

            "dress_code": booking.dress.code,

            "color": booking.dress.color,

            "category": booking.dress.category.name,

            "start_date": booking.start_date,

            "end_date": booking.end_date,

            "total_days": booking.total_days,

            "total_amount": booking.total_amount,

            "returned": booking.returned

        })

    return Response(data)