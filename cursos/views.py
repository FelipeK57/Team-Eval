from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CursosSerializer
from .models import Cursos

# Create your views here.
class CursosView(viewsets.ModelViewSet):
    serializer_class = CursosSerializer
    queryset = Cursos.objects.all()