from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = User

        fields = [
            "id",
            "email",
            "username",
            "password"
        ]

    def create(self, validated_data):

        user = User.objects.create_user(

            email=validated_data["email"],

            username=validated_data.get("username"),

            password=validated_data["password"]

        )

        return user
    
    
class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):

        email = data.get("email")
        password = data.get("password")

        user = authenticate(
            email=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password"
            )

        data["user"] = user

        return data
    