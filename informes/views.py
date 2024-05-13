from django.shortcuts import render
from rest_framework import viewsets
from .serializer import informesSerializer
from . models import informes

# Create your views here.

class informesView(viewsets.ModelViewSet):
    serializer_class = informesSerializer
    queryset = informes.objects.all()
