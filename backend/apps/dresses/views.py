from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Dress
from .serializers import DressSerializer
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_dress(request):

    serializer = DressSerializer(data=request.data)

    if not serializer.is_valid():
        return Response({
            "status": 6001,
            "message": serializer.errors
        })

    serializer.save()

    return Response({
        "status": 6000,
        "message": "Dress created successfully",
        "data": serializer.data
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def list_dresses(request):

    dresses = Dress.objects.all().order_by("-created_at")

    serializer = DressSerializer(dresses, many=True)

    return Response({
        "status": 6000,
        "data": serializer.data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dress_detail(request, pk):

    try:
        dress = Dress.objects.get(pk=pk)
    except Dress.DoesNotExist:
        return Response({
            "status": 6001,
            "message": "Dress not found"
        })

    serializer = DressSerializer(dress)

    return Response({
        "status": 6000,
        "data": serializer.data
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_dress(request, pk):

    try:
        dress = Dress.objects.get(pk=pk)
    except Dress.DoesNotExist:
        return Response({
            "status": 6001,
            "message": "Dress not found"
        })

    serializer = DressSerializer(dress, data=request.data, partial=True)

    if not serializer.is_valid():
        return Response({
            "status": 6001,
            "message": serializer.errors
        })

    serializer.save()

    return Response({
        "status": 6000,
        "message": "Dress updated successfully",
        "data": serializer.data
    })

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_dress(request, pk):

    try:
        dress = Dress.objects.get(pk=pk)
    except Dress.DoesNotExist:
        return Response({
            "status": 6001,
            "message": "Dress not found"
        })

    dress.delete()

    return Response({
        "status": 6000,
        "message": "Dress deleted successfully"
    })