from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Category


@api_view(['POST'])
@permission_classes([AllowAny])
def create_category(request):

    name = request.data.get("name")

    if Category.objects.filter(name=name).exists():

        return Response({
            "error": "Category already exists"
        })

    category = Category.objects.create(
        name=name
    )

    return Response({

        "message": "Category created successfully",

        "id": category.id,

        "name": category.name

    })
#  show all categories

@api_view(['GET'])
@permission_classes([AllowAny])
def list_categories(request):

    categories = Category.objects.all()

    data = []

    for c in categories:

        data.append({

            "id": c.id,

            "name": c.name

        })

    return Response(data)

# update category

@api_view(['PUT'])
@permission_classes([AllowAny])
def update_category(request, category_id):

    try:
        category = Category.objects.get(id=category_id)

    except Category.DoesNotExist:

        return Response({
            "error": "Category not found"
        })

    category.name = request.data.get("name")

    category.save()

    return Response({

        "message": "Category updated",

        "name": category.name

    })

# delete category

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_category(request, category_id):

    try:
        category = Category.objects.get(id=category_id)

    except Category.DoesNotExist:

        return Response({
            "error": "Category not found"
        })

    category.delete()

    return Response({

        "message": "Category deleted successfully"

    })