from django.shortcuts import render
from rest_framework import viewsets
from .serializers import criterio_EvaluacionSerializer
from .models import criterio_Evaluacion

# Create your views here.
class criterio_EvaluacionView(viewsets.ModelViewSet):
    serializer_class = criterio_EvaluacionSerializer
    queryset = criterio_Evaluacion.objects.all()