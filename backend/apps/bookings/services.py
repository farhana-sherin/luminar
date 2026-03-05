from .models import Booking


def is_dress_available(dress, start_date, end_date):
    """
    Purpose:
    check whether the dress is already booked
    for the given date range
    """

    overlap = Booking.objects.filter(
        dress=dress,
        start_date__lte=end_date,
        end_date__gte=start_date,
        returned=False
    ).exists()

    return not overlap