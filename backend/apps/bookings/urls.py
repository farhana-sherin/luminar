from django.urls import path
from .views import (
    create_booking, booking_history, view_single_booking, return_dress, returned_dresses, return_reminder,
    available_dresses, booked_dresses, filter_dresses, search_dress, check_dress_availability, dashboard, 
    booking_statistics, cancel_booking, update_booking
)


urlpatterns = [
    path("dashboard/", dashboard, name="dashboard"),
    path("create/", create_booking, name="create-booking"),
    path("history/", booking_history, name="booking-history"),
    path( "booking/<int:booking_id>/", view_single_booking, name="booking-detail" ),
    path("return/", return_dress, name="return-dress"),
    path("returned/", returned_dresses, name="returned-dresses"),
    path("return-reminder/", return_reminder, name="return-reminder"),
    path("available-dresses/",available_dresses,name="available-dresses"),
    path("booked-dresses/",booked_dresses,name="booked-dresses"),
    path("filter-dresses/",filter_dresses,name="filter-dresses"),
    path("search-dress/",search_dress,name="search-dress"),
    path("check-availability/<int:dress_id>/",check_dress_availability,name="check-availability"),
    path("statistics/", booking_statistics, name="booking-statistics"),
    path("cancel/<int:booking_id>/", cancel_booking, name="cancel-booking"),
    path("update/<int:booking_id>/", update_booking, name="update-booking"),


   



]