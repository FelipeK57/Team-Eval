from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from estudiantes.models import Estudiante 
from estudiantes.serializers import EstudianteSerializer
from profesor.serializers import ProfesorSerializer
from profesor.models import Profesor


@api_view(['POST'])
def login(request):
    codigo = request.data.get('codigo')
    estudiante = get_object_or_404(Estudiante, codigo=codigo)

    if not estudiante.user.check_password(request.data['password']):
        return Response({"error:": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
    token, created = Token.objects.get_or_create(user=estudiante.user)
    serializer = EstudianteSerializer(estudiante)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['user.password'])
        user.save()
        
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
          
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def loginProfesor(request):
    identificacion = request.data.get('identificacion')
    profesor = get_object_or_404(Profesor, identificacion=identificacion)

    if not profesor.user.check_password(request.data['password']):
        return Response({"error:": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
    token, created = Token.objects.get_or_create(user=profesor.user)
    serializer = ProfesorSerializer(profesor)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def registerProfesor(request):
    
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['user.password'])
        user.save()
        
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
          
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def permissions(request):
    if request.user.is_authenticated:
            return Response({"message": "Bienvenido a la página de inicio"})
    else:
            return Response({"message": "Debes iniciar sesión primero"}, status=status.HTTP_401_UNAUTHORIZED)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response("Estas iniciado con {}".format(request.user.username), status=status.HTTP_200_OK)