from django.shortcuts import render
from rest_framework import viewsets
from .serializer import AdministradorSerializer
from .models import administrador

# Create your views here.
class AdministradorViewSet(viewsets.ModelViewSet):
     serializer_class = AdministradorSerializer
     queryset = administrador.objects.all()
