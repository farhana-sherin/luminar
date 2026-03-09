from datetime import datetime
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.core.exceptions import ValidationError


def validate_and_parse_dates(start_date_str, end_date_str):
    """
    Validate and parse date strings in YYYY-MM-DD format.
    
    Args:
        start_date_str: Start date as string
        end_date_str: End date as string
    
    Returns:
        Tuple of (start_date, end_date) as date objects
    
    Raises:
        ValueError: If dates are invalid or end_date <= start_date
    """
    try:
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
    except (TypeError, ValueError):
        raise ValueError("Invalid date format. Use YYYY-MM-DD")
    
    if start_date >= end_date:
        raise ValueError("End date must be after start date")
    
    return start_date, end_date


def paginate_queryset(queryset, request, page_size=20):
    """
    Paginate a queryset based on page parameter in request.
    
    Args:
        queryset: Django queryset to paginate
        request: HTTP request object
        page_size: Number of items per page (default 20)
    
    Returns:
        Tuple of (paginated_results, paginator object)
    """
    paginator = Paginator(queryset, page_size)
    page_number = request.GET.get('page', 1)
    
    try:
        page = paginator.page(page_number)
    except Exception:
        page = paginator.page(1)
    
    return page.object_list, paginator


def error_response(message, status_code=400):
    """
    Generate standardized error response.
    
    Args:
        message: Error message
        status_code: HTTP status code
    
    Returns:
        Response object with error
    """
    return Response({"error": message}, status=status_code)


def safe_call_google_sheets(func, *args, **kwargs):
    """
    Safely call Google Sheets integration without crashing on error.
    
    Args:
        func: Function to call
        *args, **kwargs: Arguments to pass to function
    
    Returns:
        Boolean indicating success
    """
    try:
        func(*args, **kwargs)
        return True
    except Exception as e:
        # Log error but don't crash
        print(f"Google Sheets error: {str(e)}")
        return False
