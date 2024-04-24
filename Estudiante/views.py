from django.shortcuts import render
from rest_framework import viewsets
from .serializer import EstudianteSerializer
from .models import Estudiante

# Create your views here.
class CursosView(viewsets.ModelViewSet):
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()