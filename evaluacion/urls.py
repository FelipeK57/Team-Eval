from django.urls import path, include 
from rest_framework import routers
from evaluacion import views

router = routers.DefaultRouter()
router.register(r'evaluacion', views.evaluacionView, 'evaluacion')
urlpatterns = [
    path("api/v1/", include(router.urls)) 
]