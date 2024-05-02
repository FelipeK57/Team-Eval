from django.urls import path, include 
from rest_framework import routers
from criterio_evaluacion import views

router = routers.DefaultRouter()
router.register(r'criterios_Evaluacion', views.criterio_EvaluacionView, 'criterio_Evaluacion')
urlpatterns = [
    path("critero_Evaluacion/", include(router.urls)) 
]