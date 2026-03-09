from django.urls import path
from .views import register, login, profile

app_name = "users"


urlpatterns = [

path("register/", register),

path("login/", login),

path("profile/", profile),

]