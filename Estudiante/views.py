from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import serializers
from .models import Profesor
from .serializers import ProfileSerializer


# Create your views here.
@api_view(['POST'])
def login (request):
    return Response({})

@api_view(['POST'])
def profile (request):
    return Response({})

@api_view(['POST'])
def create (request):
    return Response({})

class profesorViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profesor.objects.all()
    