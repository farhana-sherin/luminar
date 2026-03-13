
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.urls import path, include

from apps.users.views import test_api



urlpatterns = [
     path("", test_api),  # root JSON test
    path('admin/', admin.site.urls),

    path("api/user/", include("apps.users.urls")),
    path("api/dresses/", include("apps.dresses.urls")),
    path("api/bookings/", include("apps.bookings.urls")),
    path("api/categories/", include("apps.categories.urls"))
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
