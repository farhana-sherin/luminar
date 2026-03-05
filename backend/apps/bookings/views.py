from rest_framework.decorators import api_view
from rest_framework.response import Response

from dresses.models import Dress
from .models import Booking
from .services import is_dress_availabe

from datetime import datetime
from apps.common.google_sheets import add_booking


@api_view(['POST'])
def create_booking(request):

    dress_id = request.data.get("dress_id")

    start_date = request.data.get("start_date")

    end_date = request.data.get("end_date")

    dress = Dress.objects.get(id=dress_id)

    start_date = datetime.strptime(
        start_date,
        "%Y-%m-%d"
    ).date()

    end_date = datetime.strptime(
        end_date,
        "%Y-%m-%d"
    ).date()

    available = is_dress_availabe(
        dress,
        start_date,
        end_date
    )

    if not available:

        return Response({
            "error": "Dress already booked"
        })

    days = (end_date - start_date).days

    total_price = days * dress.price_per_day

    booking = Booking.objects.create(

        dress=dress,

        customer_name=request.data.get("customer_name"),

        mobile=request.data.get("mobile"),

        place=request.data.get("place"),

        start_date=start_date,

        end_date=end_date,

        total_days=days,

        total_price=total_price
    )

    add_booking(booking)

    return Response({

        "message": "Booking successful",

        "booking_id": booking.id
    })