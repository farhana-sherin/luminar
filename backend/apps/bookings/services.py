from .models import Booking


def is_dress_available(dress, start_date, end_date):
    """
    Purpose:
    check whether the dress is already booked
    for the given date range
    """

    return not Booking.objects.filter(
        dress_id=dress.id,
        status="Confirmed",
        start_date__lte=end_date,
        end_date__gte=start_date
    ).exists()