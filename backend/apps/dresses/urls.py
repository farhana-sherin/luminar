from django.urls import path
from .views import (
    create_dress,
    list_dresses,
    dress_detail,
    update_dress,
    delete_dress
)

urlpatterns = [

    path("create/", create_dress),

    path("list/", list_dresses),

    path("<int:pk>/", dress_detail),

    path("update/<int:pk>/", update_dress),

    path("delete/<int:pk>/", delete_dress),

]