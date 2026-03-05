from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.bookings.models import Booking
from apps.dresses.models import Dress
from apps.common.google_sheets import add_booking


@api_view(["POST"])
def create_booking(request):

    dress = Dress.objects.get(id=request.data.get("dress_id"))

    booking = Booking.objects.create(
        dress=dress,
        customer_name=request.data.get("customer_name"),
        mobile_number=request.data.get("mobile_number"),
        place=request.data.get("place"),
        start_date=request.data.get("start_date"),
        end_date=request.data.get("end_date"),
        total_days=request.data.get("total_days"),
        total_amount=request.data.get("total_amount"),
    )

    # send booking to google sheet
    add_booking(booking)

    return Response({
        "message": "Booking created successfully",
        "booking_id": booking.id
    })