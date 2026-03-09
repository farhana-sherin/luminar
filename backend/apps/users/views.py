
from .models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


@api_view(['POST'])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response({
            "status": 6001,
            "message": serializer.errors
        })

    data = serializer.validated_data
    email = data["email"]
    username = data.get("username")
    password = data["password"]

    # email duplicate check
    if User.objects.filter(email=email).exists():
        return Response({
            "status": 6001,
            "message": "User with this email already exists"
        })

    # create user
    user = User(
        email=email,
        username=username,
    )

    user.set_password(password)   # 🔑 password hash
    user.save()

    # create JWT token
    refresh = RefreshToken.for_user(user)

    return Response({
        "status": 6000,
        "message": "Register successful",
        "data": {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
    })




@api_view(['POST'])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    # required field check
    if not email or not password:
        return Response({
            "status": 6001,
            "message": "Email and password are required"
        })

    # authenticate user
    user = authenticate(email=email, password=password)

    if not user:
        return Response({
            "status": 6001,
            "message": "Invalid email or password"
        })

    # generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        "status": 6000,
        "message": "Login successful",
        "data": {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "email": user.email,
            "username": user.username,

        }
    })


@api_view(['GET'])
def profile(request):

    user = request.user

    return Response({

        "id": user.id,

        "email": user.email,

        "username": user.username

    })