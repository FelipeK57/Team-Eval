from django.shortcuts import render
from rest_framework import viewsets
from .codigos_seguridadSerializer import codigos_seguridadSerializer    
from .models import codigos_seguridad

# Create your views here.
class codigos_seguridadView(viewsets.ModelViewSet):
    serializer_class = codigos_seguridadSerializer
    queryset = codigos_seguridad.objects.all()
