from rest_framework import serializers
from .models import Dress


class DressSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Dress
        fields = [
            "id",
            "code",
            "name",
            "category",
            "category_name",
            "color",
            "image",
            "price",
            "created_at"
        ]