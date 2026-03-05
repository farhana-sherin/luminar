from .models import Booking

def is_dress_availabe(dress, start_date, end_date):
    overlap = Booking.objects.filter(
        dress=dress,
        start_date__lte=end_date,
        end_date__gte=start_date,
    ).exists()
    return not overlap