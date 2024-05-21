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
from django.contrib.auth import authenticate
from django.http import QueryDict
from cursos.serializer import CursosSerializer
from administrador.models import administrador
from administrador.serializer import AdministradorSerializer
from cursos.models import Cursos
from django.core.mail import send_mail
import random
from codigos_seguridad.models import codigos_seguridad


@api_view(['POST'])
def login(request):
    codigo = request.data.get('codigo')
    password = request.data.get('password')

    try:
        estudiante = Estudiante.objects.get(codigo=codigo)
    except Estudiante.DoesNotExist:
        return Response({"error": "Estudiante con este código no existe"}, status=status.HTTP_400_BAD_REQUEST)

    if not estudiante.user.check_password(password):
        return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_400_BAD_REQUEST)

    # Autenticar al usuario
    user = authenticate(request, username=estudiante.user.username, password=password)
    if user is None:
        return Response({"error": "Error de autenticación"}, status=status.HTTP_400_BAD_REQUEST)

    # Generar o recuperar el token de autenticación
    token, created = Token.objects.get_or_create(user=estudiante.user)

    # Serializar los datos del estudiante
    serializer = EstudianteSerializer(estudiante)

    # Devolver respuesta con el token y los datos del usuario
    return Response({
        "token": token.key,
        "estudiante": serializer.data,
        "nombre": estudiante.user.first_name,
        "apellido": estudiante.user.last_name,
        "email": estudiante.user.email,
        "username": estudiante.user.username
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def login_adminte(request):
    codigo = request.data.get('codigo')
    admin = get_object_or_404(administrador, codigo=codigo)
    
    if not admin.user.check_password(request.data['password']):
        return Response({"error:": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
    token, created = Token.objects.get_or_create(user=admin.user)
    serializer = AdministradorSerializer(admin)
    return Response({"token": token.key, "user": serializer.data }, status=status.HTTP_200_OK)

@api_view(['POST'])
def import_cursos(request):
    admin = get_object_or_404(administrador, codigo='5775')
    admin.read_file(request.FILES['file'])
    return Response(status=status.HTTP_200_OK)

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
        return Response({"error": "Profesor con la identificación proporcionada no existe"}, status=status.HTTP_404_NOT_FOUND)

    print(profesor.courses_teacher())

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

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def adminProfile(request):  
    username = request.data.get('user') 
    user = User.objects.get(username=username)   

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
    serializer = CursosSerializer(student.courses_student(), many=True)
    return Response({"cursos": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def teacher_courses(request):
    identificacion = request.data.get('identificacion')
    profesor = get_object_or_404(Profesor, identificacion=identificacion)
    serializer = CursosSerializer(profesor.courses_teacher(), many=True)
    return Response({"cursos": serializer.data}, status=status.HTTP_200_OK)


    
@api_view(['POST'])
def change_passwordA(request):
    nueva_contraseña = request.data.get('nueva_contraseña')
    user = request.data.get('user')
    
    try:
        user = User.objects.get(username=user)
        
        if not user:
            raise ValueError('Usuario no encontrado')

        user.set_password(nueva_contraseña)
        user.save()

        return Response({'mensaje': 'Contraseña cambiada con éxito'},status=status.HTTP_200_OK)
    except Profesor.DoesNotExist:
        return Response({'error': 'usuario no encontrado'}, status=404)
    except (ValueError, Exception) as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_emailA(request):
    codigo = request.data.get('codigo')
    admin = get_object_or_404(administrador    , codigo=codigo)
    new_email = request.data.get('email')
    
    if new_email == admin.user.email:
        return Response({"error:": "Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)
    
    admin.user.email = new_email
    admin.user.save()
    serializer = EstudianteSerializer(admin)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST']) 
def nuevo_profesor(request):
    identificacion = request.data.get('identificacion')
    nombre = request.data.get('nombre')
    apellido = request.data.get('apellido')
    email = request.data.get('email')
    if not identificacion or not nombre or not apellido or not email:
        return Response({"error": "Todos los campos son obligatorios"}, status=status.HTTP_400_BAD_REQUEST)
    if Profesor.objects.filter(identificacion=identificacion).exists():
        return Response({"error": "Ya existe un profesor con la identificación proporcionada"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({"error": "Ya existe un usuario con el correo proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
    
   
   
    primera_letra_nombre = nombre[0].upper()
   
    contraseña = primera_letra_nombre + identificacion

    username = nombre + identificacion
    
    user = User.objects.create_user(username=username, email=email, password=contraseña, first_name=nombre, last_name=apellido)
    
    # Crear profesor
    profesor = Profesor.objects.create(user=user, identificacion=identificacion)
    
    # Puedes realizar otras operaciones aquí, si es necesario
    
    return Response({"success": "Profesor creado exitosamente"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def nuevo_curso(request):
    nombre = request.data.get('nombre')
    codigo = request.data.get('codigo')
    periodo = request.data.get('periodo')
    if not nombre or not codigo or not periodo:
        return Response({"error": "Todos los campos son obligatorios"}, status=status.HTTP_400_BAD_REQUEST)
    if Cursos.objects.filter(codigo=codigo).exists():
        return Response({"error": "Ya existe un curso con el código proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
    curso = Cursos.objects.create(nombre=nombre, codigo=codigo, periodoAcademico=periodo)
    return Response({"success": "Curso creado exitosamente"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def PasswordResetRequestView( request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({'error': 'Usuario con este correo no existe.'}, status=status.HTTP_404_NOT_FOUND)
        
    reset_code = random.randint(100000, 999999)
    send_mail(
        subject= "Restablece tu contraseña",    
        message=f"Tu código de verificación es: {reset_code}",
        from_email='team.eval.col@gmail.com',
        recipient_list=[email],
        fail_silently=False,
    )

    token, created = Token.objects.get_or_create(user=user)

    if created:
        codigos_seguridad.objects.create(token=token, codigo=reset_code)
        
    return Response({'message': 'Se ha enviado un enlace para restablecer la contraseña a tu correo.', 'token': token.key, 'user': user.username}, status=status.HTTP_200_OK)

@api_view(['POST'])
def password_reset_confirm(request):
    Token = request.data.get('token')
    code = request.data.get('code')
    codigo = codigos_seguridad.objects.filter(token=Token).first()

    if not Token:
        return Response({'error': 'Token no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if int(code) != int(codigo.codigo):
        return Response({'error': 'Codigo incorrecto'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        codigo.delete()
        return Response({'message': 'Codigo correcto'}, status=status.HTTP_200_OK)
        
   

