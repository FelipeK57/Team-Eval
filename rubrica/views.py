from django.shortcuts import render
from rest_framework import viewsets
from .serializers import rubrica_EvaluacionSerializer
from .models import rubrica_Evaluacion

# Create your views here.
class rubrica_EvaluacionView(viewsets.ModelViewSet):
    serializer_class = rubrica_EvaluacionSerializer
    queryset = rubrica_Evaluacion.objects.all()