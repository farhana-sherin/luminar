from django.urls import path
from .views import create_booking, booking_history


urlpatterns = [

    path("create/", create_booking, name="create-booking"),
    path("history/", booking_history, name="booking-history"),

]