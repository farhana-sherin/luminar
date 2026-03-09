from rest_framework import serializers
from .models import Booking
from apps.dresses.models import Dress


class DressBookingSerializer(serializers.ModelSerializer):
    """Lightweight dress serializer for booking responses"""
    category = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Dress
        fields = ['id', 'name', 'code', 'color', 'category', 'price', 'image']


class BookingCreateSerializer(serializers.Serializer):
    """Serializer for creating bookings with validation"""
    dress_id = serializers.IntegerField(required=True, min_value=1)
    customer_name = serializers.CharField(max_length=200, required=True, min_length=2)
    mobile_number = serializers.CharField(max_length=20, required=True, min_length=10)
    place = serializers.CharField(max_length=200, required=True, min_length=2)
    start_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])
    end_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])

    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError(
                {"end_date": "End date must be after start date"}
            )
        return data

    def validate_mobile_number(self, value):
        """Validate mobile number contains only digits"""
        if not value.isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits")
        return value


class BookingSerializer(serializers.ModelSerializer):
    """Complete booking serializer with nested data"""
    dress = DressBookingSerializer(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'dress', 'customer_name', 'mobile_number', 'place',
            'start_date', 'end_date', 'total_days', 'total_amount',
            'returned', 'created_at'
        ]
        read_only_fields = ['id', 'total_days', 'total_amount', 'created_at']


class BookingListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    dress_name = serializers.CharField(source='dress.name', read_only=True)
    dress_code = serializers.CharField(source='dress.code', read_only=True)
    category = serializers.CharField(source='dress.category.name', read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'dress_name', 'dress_code', 'category', 'customer_name',
            'mobile_number', 'start_date', 'end_date', 'total_days',
            'total_amount', 'returned', 'created_at'
        ]


class BookingReturnReminderSerializer(serializers.ModelSerializer):
    """Serializer for return reminder with custom message"""
    dress_name = serializers.CharField(source='dress.name', read_only=True)
    dress_code = serializers.CharField(source='dress.code', read_only=True)
    message = serializers.SerializerMethodField()
    
    def get_message(self, obj):
        return "Dress rental period finished. Please collect dress."
    
    class Meta:
        model = Booking
        fields = [
            'id', 'dress_name', 'dress_code', 'customer_name',
            'mobile_number', 'end_date', 'message'
        ]


class DressAvailabilitySerializer(serializers.Serializer):
    """Serializer for checking dress availability"""
    start_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])
    end_date = serializers.DateField(format='%Y-%m-%d', input_formats=['%Y-%m-%d'])

    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError(
                {"end_date": "End date must be after start date"}
            )
        return data


class DressListSerializer(serializers.ModelSerializer):
    """Serializer for dress list with category"""
    category = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Dress
        fields = ['id', 'name', 'code', 'color', 'category', 'price']


class SearchFilterSerializer(serializers.Serializer):
    """Serializer for search and filter parameters"""
    query = serializers.CharField(required=False, allow_blank=True)
    category = serializers.CharField(required=False, allow_blank=True)
    start_date = serializers.DateField(
        required=False, 
        format='%Y-%m-%d', 
        input_formats=['%Y-%m-%d']
    )
    end_date = serializers.DateField(
        required=False, 
        format='%Y-%m-%d', 
        input_formats=['%Y-%m-%d']
    )

    def validate(self, data):
        if 'start_date' in data and 'end_date' in data:
            if data['start_date'] and data['end_date']:
                if data['start_date'] >= data['end_date']:
                    raise serializers.ValidationError(
                        {"end_date": "End date must be after start date"}
                    )
        return data
