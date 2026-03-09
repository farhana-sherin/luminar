from rest_framework.permissions import BasePermission
from django.contrib.auth.models import AnonymousUser


class IsBookingOwnerOrAdmin(BasePermission):
    """
    Permission to check if user is the booking owner or admin.
    For now, all authenticated users can view/modify bookings,
    but this structure allows future enhancement to track booking ownership.
    """
    message = "You do not have permission to access this booking."

    def has_object_permission(self, request, view, obj):
        # Allow admin to access anything
        if request.user and request.user.is_staff:
            return True
        
        # In future, check if request.user is the customer
        # For now, allow any authenticated user (can be restricted to ownership)
        return request.user and not isinstance(request.user, AnonymousUser)
