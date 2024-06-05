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
from grupo.serializer import GrupoSerializer
from cursos.models import Cursos
from grupo.models import Grupo
from django.core.mail import send_mail
import random
from codigos_seguridad.models import codigos_seguridad
from rest_framework.validators import ValidationError
from django.contrib.auth import logout as django_logout
from django.shortcuts import get_list_or_404

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
    response = Response({
        "token": token.key,
        "estudiante": serializer.data,
        "nombre": estudiante.user.first_name,
        "apellido": estudiante.user.last_name,
        "email": estudiante.user.email,
        "username": estudiante.user.username
    }, status=status.HTTP_200_OK)

    response.set_cookie(
        key='sessionid',
        value=token.key,
        httponly=False,
        secure=False,   
        samesite='Lax',  # O 'Strict' según tus necesidades
        max_age=3600  # Tiempo de expiración en segundos
    )
    return response

@api_view(['POST'])
def login_adminte(request):
    codigo = request.data.get('codigo')
    admin = get_object_or_404(administrador, codigo=codigo)
    
    if not admin.user.check_password(request.data['password']):
        return Response({"error:": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
    token, created = Token.objects.get_or_create(user=admin.user)
    serializer = AdministradorSerializer(admin)
    response =  Response({"token": token.key, "user": serializer.data }, status=status.HTTP_200_OK)

    response.set_cookie(
        key='sessionid',
        value=token.key,
        httponly=False,
        secure=False,   
        samesite='Lax',  # O 'Strict' según tus necesidades
        max_age=3600  # Tiempo de expiración en segundos
    )
    return response


@api_view(['POST'])
def import_cursos(request):
    admin = get_object_or_404(administrador, codigo='5775')
    admin.importar_cursos(request.FILES['file'])
    message = admin.importar_cursos(request.FILES['file'])
    return Response({"message": str(message)},status=status.HTTP_200_OK)

@api_view(['POST'])
def import_estudiantes(request):
    admin = get_object_or_404(administrador, codigo='5775')
    admin.importar_estudiantes(request.FILES['file'])
    message = admin.importar_estudiantes(request.FILES['file'])
    return Response({"message": str(message)},status=status.HTTP_200_OK)
    
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
    response = Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

    response.set_cookie(
        key='sessionid',
        value=token.key,
        httponly=False,
        secure=False,   
        samesite='Lax',  # O 'Strict' según tus necesidades
        max_age=3600  # Tiempo de expiración en segundos
    )
    return response



@api_view(['POST']) 
def logout(request):
    # Obtener el token del usuario desde la cabecera de autorización
    token_key = request.META.get('HTTP_AUTHORIZATION')

    if token_key:
        # Eliminar 'Token ' del inicio del string del token
        token_key = token_key.split(' ')[1]
        
        try:
            token = Token.objects.get(key=token_key)
            token.delete()
        except Token.DoesNotExist:
            return Response({"error": "Token no encontrado"}, status=status.HTTP_404_NOT_FOUND) 

    # Cerrar sesión del usuario
    django_logout(request)
    
    # Eliminar la cookie de sessionid
    response = Response({"detail": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
    response.delete_cookie('sessionid')

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
    print(f"Identificación recibida: {identificacion}")  # Depuración
    profesor = get_object_or_404(Profesor, identificacion=identificacion)
    cursos = profesor.courses_teacher()
    print(f"Cursos obtenidos: {cursos}")  # Depuración
    serializer = CursosSerializer(cursos, many=True)
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
    admin = get_object_or_404(administrador, codigo=codigo)
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

    username = nombre + apellido
    
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
    profe = request.data.get('profe')
    if not nombre or not codigo or not periodo:
        return Response({"error": "Todos los campos son obligatorios"}, status=status.HTTP_400_BAD_REQUEST)
    if Cursos.objects.filter(codigo=codigo).exists():
        return Response({"error": "Ya existe un curso con el código proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.filter( username=profe ).first()
    profesor = Profesor.objects.get(user=user)

    curso = Cursos.objects.create(nombre=nombre, codigo=codigo, periodoAcademico=periodo, profesor=profesor)    
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
        
   
@api_view(['GET'])
def estudiantes_deshabilitados(request):
    estudiantes_deshabilitados = Estudiante.objects.filter(estado=False)
    serializer = EstudianteSerializer(estudiantes_deshabilitados, many=True)
    return Response({"estudiantes_deshabilitados": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def editar_estado_estudiante(request):
    codigo = request.data.get('codigo')
    estudiante = get_object_or_404(Estudiante, codigo=codigo)
    new_estado = request.data.get('estado')
    estudiante.estado = new_estado
    estudiante.save()
    serializer = EstudianteSerializer(estudiante)
    return Response({'estudiante': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def estudiantes(request):
    estudiantes= Estudiante.objects.filter(estado=True)
    serializer = EstudianteSerializer(estudiantes, many=True)
    return Response({"estudiantes": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def curso(request):
    codigo = request.data.get('codigo')
    curso = get_object_or_404(Cursos, codigo=codigo)
    serializer = CursosSerializer(curso)
    data = serializer.data
    estudiantes = curso.estudiantes.all()
    grupos = curso.grupos.all()
    estudiantes_en_grupo = []
    for grupo in curso.grupos.all():
        estudiantes_en_grupo.extend(grupo.estudiantes.all())
    estudiantes_sin_grupo = [estudiante for estudiante in estudiantes if estudiante not in estudiantes_en_grupo]
    estudiantes_sin_grupo_serialized = EstudianteSerializer(estudiantes_sin_grupo, many=True).data
    data['estudiantes'] = estudiantes_sin_grupo_serialized
    data['grupos'] = GrupoSerializer(grupos, many=True).data
    return Response({"curso": data}, status=status.HTTP_200_OK)



@api_view(['POST'])
def curso_estudiantes_en_grupo(request):
    codigo = request.data.get('codigo')
    curso = get_object_or_404(Cursos, codigo=codigo)
    serializer = CursosSerializer(curso)
    data = serializer.data
    estudiantes = curso.estudiantes.all()
    grupos = curso.grupos.all()
    grupos_serializados = []
    for grupo in grupos:
        estudiantes_grupo = grupo.estudiantes.all()
        estudiantes_grupo_serializados = EstudianteSerializer(estudiantes_grupo, many=True).data
        grupo_data = GrupoSerializer(grupo).data
        grupo_data['estudiantes'] = estudiantes_grupo_serializados
        grupos_serializados.append(grupo_data)
    data['grupos'] = grupos_serializados
    return Response({"curso": data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def agregar_estudiante_a_grupo(request):
    codigo = request.data.get('codigo')
    grupo_id = request.data.get('grupo_id')

    try:
        estudiante = Estudiante.objects.get(codigo=codigo)
        Grupo.objects.get(pk=grupo_id)
        return Response({"mensaje": "Estudiante agregado al grupo temporalmente"}, status=200)
    
    except Estudiante.DoesNotExist:
        return Response({"error": "El estudiante no existe"}, status=404)
    
    except Grupo.DoesNotExist:
        return Response({"error": "El grupo no existe"}, status=404)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def guardar_cambios(request):
    estudiantes_por_agregar = request.data.get('estudiantes')
    grupo_id = request.data.get('grupo_id')

    try:
        grupo = Grupo.objects.get(pk=grupo_id)
        for estudiante_id in estudiantes_por_agregar:
            estudiante = Estudiante.objects.get(id=estudiante_id)
            grupo.estudiantes.add(estudiante)
        
        return Response({"mensaje": "Cambios guardados correctamente"}, status=200)
    except Grupo.DoesNotExist:
        return Response({"error": "El grupo no existe"}, status=404)
    except Estudiante.DoesNotExist:
        return Response({"error": "Uno o más estudiantes no existen"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def estudiantesCurso(request):
    codigo = request.data.get('codigo')
    curso = get_object_or_404(Cursos, codigo=codigo)
    estudiantes = curso.estudiantes.all()
    serializer = EstudianteSerializer(estudiantes, many=True)
    return Response({"estudiantes": serializer.data}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def editar_profesor(request):
    nombre = request.data.get('nombre')
    identificacion = request.data.get('identificacion')
    newidentificacion = request.data.get('newidentificacion')
    email = request.data.get('email')

    # Filtra por identificacion en lugar de usar get()
    profesores = Profesor.objects.filter(identificacion=identificacion)

    if profesores.count() != 1:
        return Response({"error": "Identificación no es única o no existe"}, status=status.HTTP_400_BAD_REQUEST)
    
    if identificacion != newidentificacion and Profesor.objects.filter(identificacion=newidentificacion).exists():
        return Response({"error": "Ya existe un profesor con la identificación proporcionada"}, status=status.HTTP_400_BAD_REQUEST)
    
    if email != profesores.first().user.email and User.objects.filter(email=email).exists():
        return Response({"error": "Ya existe un usuario con el correo proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

    profesor = profesores.first()
    changes_made = False

    if nombre:
        profesor.user.first_name = nombre
        changes_made = True

    if newidentificacion:
        profesor.identificacion = newidentificacion
        changes_made = True

    if email:
        profesor.user.email = email
        changes_made = True

    if changes_made:
        profesor.user.save()  # Guardar cambios en el usuario asociado
        profesor.save()  # Guardar cambios en el profesor
        return Response({"success": "Datos del profesor editados exitosamente"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No se proporcionaron datos para editar"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def profesores_deshabilitados(request):
    profesores_deshabilitados = Profesor.objects.filter(estado=False)
    serializer = ProfesorSerializer(profesores_deshabilitados, many=True)
    return Response({"profesores_deshabilitados": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def profesores(request):
    profesores= Profesor.objects.filter(estado=True)
    serializer = ProfesorSerializer(profesores, many=True)
    return Response({"profesores": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def editar_estado_profesor(request):
    identificacion = request.data.get('identificacion')
    profesor = get_object_or_404(Profesor, identificacion=identificacion)
    new_estado = request.data.get('estado')
    profesor.estado = new_estado
    profesor.save()
    serializer = ProfesorSerializer(profesor)   
    return Response({'profesor': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def editar_Student(request):
    nombre = request.data.get('nombre')
    codigo = request.data.get('codigo')
    newCodigo = request.data.get('newcodigo')  # Asegúrate de que esto coincide con lo que envías desde el frontend
    email = request.data.get('email')

    estudiante = get_object_or_404(Estudiante, codigo=codigo)
    
    if codigo != newCodigo and Estudiante.objects.filter(codigo=newCodigo).exists():
        return Response({"error": "Ya existe un estudiante con la identificación proporcionada"}, status=status.HTTP_400_BAD_REQUEST)
    
    if email != estudiante.user.email and User.objects.filter(email=email).exists():
        return Response({"error": "Ya existe un usuario con el correo proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

    changes_made = False

    if nombre:
        estudiante.user.first_name = nombre
        changes_made = True

    if newCodigo:
        estudiante.codigo = newCodigo
        changes_made = True

    if email:
        estudiante.user.email = email
        changes_made = True

    if changes_made:
        estudiante.user.save()  
        estudiante.save()  
        return Response({"message": "Datos del estudiante editados exitosamente"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No se proporcionaron datos para editar"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def editar_curso(request):
    nombre = request.data.get('nombre')
    codigo = request.data.get('codigo')
    newCodigo = request.data.get('newCodigo')  # Asegúrate de que esto coincide con lo que envías desde el frontend
    periodo = request.data.get('periodo')

    curso = get_object_or_404(Cursos, codigo=codigo)
    
    if codigo != newCodigo and Cursos.objects.filter(codigo=newCodigo).exists():
        return Response({"error": "Ya existe un curso con el código proporcionado"}, status=status.HTTP_400_BAD_REQUEST)

    changes_made = False

    if nombre:
        curso.nombre = nombre
        changes_made = True

    if newCodigo:
        curso.codigo = newCodigo
        changes_made = True

    if periodo:        
        curso.periodoAcademico = periodo
        changes_made = True

    if changes_made:
        curso.save()
        return Response({"message": "Datos del curso editados exitosamente"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No se proporcionaron datos para editar"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def cursos(request):
    cursos= Cursos.objects.filter(estado=True)
    serializer = CursosSerializer(cursos, many=True)
    return Response({"Cursos": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def cursosDes(request):
    cursos= Cursos.objects.filter(estado=False)
    serializer = CursosSerializer(cursos, many=True)
    return Response({"Cursos": serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def editar_estado_Curso(request):
    codigo = request.data.get('codigo')
    curso = get_object_or_404(Cursos, codigo=codigo)
    new_estado = request.data.get('estado')
    curso.estado = new_estado
    curso.save()
    serializer = CursosSerializer(curso)  
    return Response({'curso': serializer.data}, status=status.HTTP_200_OK)
    


    
