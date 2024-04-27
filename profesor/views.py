from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Profesor 
from .serializers import ProfesorSerializer
from rest_framework import viewsets
  


# Create your views here.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response("Estas iniciado con {}".format(request.user.username), status=status.HTTP_200_OK)

class profesorViewSet(viewsets.ModelViewSet):
    serializer_class = ProfesorSerializer
    queryset = Profesor.objects.all()
    