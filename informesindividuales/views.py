from django.shortcuts import render
from rest_framework import viewsets
from .serializer import InformesIndividualesSerializer
from . models import InformesIndividuales

# Create your views here.

class InformesIndividualesView(viewsets.ModelViewSet):
    serializer_class = InformesIndividualesSerializer
    queryset = InformesIndividuales.objects.all()