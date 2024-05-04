from django.shortcuts import render
from rest_framework import viewsets
from .serializers import evaluacionSerializer
from .models import evaluacion

# Create your views here.
class evaluacionView(viewsets.ModelViewSet):
    serializer_class = evaluacionSerializer
    queryset = evaluacion.objects.all()