from django.shortcuts import render
from rest_framework import viewsets
from .serializer import GrupoSerializer
from . models import Grupo

# Create your views here.

class GrupoView(viewsets.ModelViewSet):
    serializer_class = GrupoSerializer
    queryset = Grupo.objects.all()
