from django.contrib import admin
from django.urls import path, re_path,include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'profesor', views.profesorViewSet, 'profesor.views')   

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls))
]