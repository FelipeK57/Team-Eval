from django import path, include 
from rest_framework import routers
from rubrica import views

router = routers.DefaultRouter()
router.register(r'rubrica_Evaluacion', views.rubrica_EvaluacionView, 'rubrica_Evaluacion')
urlpatterns = [
    path("api/v1/", include(router.urls)) 
]