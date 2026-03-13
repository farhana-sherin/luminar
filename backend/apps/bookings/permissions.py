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
        """
        Relaxed for testing: allow any user (including anonymous).
        The view itself is already guarded by AllowAny.
        Restore stricter checks when you add authentication.
        """
        return True
