from django.shortcuts import render
from rest_framework.response import Response

from apps.common.google_sheets import add_booking

def create_booking(request):

    booking = {
        "booking_id": 101,
        "user": "Farhana",
        "dress": "Red Gown",
        "date": "2026-03-05",
        "status": "Booked"
    }

    add_booking(booking)

    return Response({"message": "Booking created"})
