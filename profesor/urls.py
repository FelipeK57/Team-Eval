from django.contrib import admin
from django.urls import path, re_path,include
from . import views
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register('profesor', views.profesorViewSet, 'profesor.views')   

urlpatterns = [
    path('profesor/', include(router.urls)),
]