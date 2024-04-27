from django.shortcuts import render
from django.urls import path, include
from rest_framework import routers
from estudiantes import views

router = routers.DefaultRouter()
router.register('estudiantes', views.EstudianteView, 'estudiantes.views')

urlpatterns = [
    path('estudiantes/', include(router.urls))
]