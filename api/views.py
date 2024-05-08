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
from django.contrib.auth import login, authenticate
from django.http import QueryDict
from django.http import JsonResponse
from cursos.serializer import CursosSerializer


@api_view(['POST'])
def login(request):
    codigo = request.data.get('codigo')
    estudiante = get_object_or_404(Estudiante, codigo=codigo)

    if not estudiante.user.check_password(request.data['password']):
        return Response({"error:": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
    token, created = Token.objects.get_or_create(user=estudiante.user)
    serializer = EstudianteSerializer(estudiante)
    return Response({"token": token.key, "estudiante": serializer.data, "nombre": estudiante.user.first_name, "apellido": estudiante.user.last_name, "email": estudiante.user.email}, status=status.HTTP_200_OK)

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
    data = QueryDict(request.body)
    identificacion = request.data.get('identificacion')
    password = request.data.get('password')

    try:
        profesor = Profesor.objects.get(identificacion=identificacion)
    except Profesor.DoesNotExist:
        return Response({"error": "Profesor no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    # Verificar la contraseña
    user = profesor.user
    if not user.check_password(password):
        return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_400_BAD_REQUEST)

    # Autenticar al usuario
    user = authenticate(request._request, username=user.username, password=password)
    if user is None:
        return Response({"error": "Error de autenticación"}, status=status.HTTP_400_BAD_REQUEST)

    # Generar o recuperar el token de autenticación
    token, created = Token.objects.get_or_create(user=user)

    # Serializar los datos del profesor
    serializer = ProfesorSerializer(profesor)

    # Devolver respuesta con el token y los datos del usuario
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST']) 
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
     request.user.auth_token.delete()
     response = Response({'mensaje': 'Cerrando sesión'}, status=status.HTTP_200_OK)
     
     return response

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

@api_view(['POST'])
def change_password(request):
    nueva_contraseña = request.data.get('nueva_contraseña')
    identificacion = request.data.get('identificacion')
    
    try:
        profesor = Profesor.objects.get(identificacion=identificacion)
        usuario = profesor.user
        
        if not usuario:
            raise ValueError('Usuario no encontrado')

        usuario.set_password(nueva_contraseña)
        usuario.save()

        return Response({'mensaje': 'Contraseña cambiada con éxito'},status=status.HTTP_200_OK)
    except Profesor.DoesNotExist:
        return Response({'error': 'Profesor no encontrado'}, status=404)
    except (ValueError, Exception) as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response("Estas iniciado con {}".format(request.user.username), status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profesorProfile(request):  
    identificacion = request.data.get('identificacion') 
    profesor = Profesor.objects.get(identificacion=identificacion)
    
    user = profesor.user

    return Response({'nombre': user.first_name, 'apellidos': user.last_name, 'email': user.email}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def permissions(request):
    if request.user.is_authenticated:
            return Response({"message": "Bienvenido a la página de inicio"})
    else:
            return Response({"message": "Debes iniciar sesión primero"}, status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile_student(request):
    return Response("Datos: {}, {}, {}".format(request.user.username, request.data.get('codigo'), request.user.email), status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_email(request):
    codigo = request.data.get('codigo')
    estudiante = get_object_or_404(Estudiante, codigo=codigo)
    new_email = request.data.get('email')
    
    if new_email == estudiante.user.email:
        return Response({"error:": "Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)
    
    estudiante.user.email = new_email
    estudiante.user.save()
    serializer = EstudianteSerializer(estudiante)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_emaiP(request):
    identificacion = request.data.get('identificacion')
    profesor = get_object_or_404(Profesor, identificacion=identificacion)
    new_email = request.data.get('email')
    
    if new_email == profesor.user.email:
        return Response({"error:": "Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)
    
    profesor.user.email = new_email
    profesor.user.save()
    serializer = ProfesorSerializer(profesor)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def student_courses(request):
    codigo = request.data.get('codigo')
    student = get_object_or_404(Estudiante, codigo=codigo)
    serializer = CursosSerializer(student.cursos_inscritos(), many=True)
    return Response({"cursos": serializer.data}, status=status.HTTP_200_OK)
