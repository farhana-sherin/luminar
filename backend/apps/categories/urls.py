from django.urls import path
from .views import (

create_category,
list_categories,
update_category,
delete_category

)

urlpatterns = [

path("create/", create_category),

path("", list_categories),

path("update/<int:category_id>/", update_category),

path("delete/<int:category_id>/", delete_category),

]