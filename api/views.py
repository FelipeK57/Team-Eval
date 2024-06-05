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
from rubrica.models import rubrica_Evaluacion
from rubrica.serializers import rubrica_EvaluacionSerializer
from criterio_evaluacion.models import criterio_Evaluacion
from criterio_evaluacion.serializers import criterio_EvaluacionSerializer
from django.contrib.auth import authenticate
from django.http import QueryDict
from cursos.serializer import CursosSerializer
from administrador.models import administrador
from administrador.serializer import AdministradorSerializer
from cursos.models import Cursos
from django.core.mail import send_mail
import random
from codigos_seguridad.models import codigos_seguridad
from rest_framework.validators import ValidationError
from django.contrib.auth import logout as django_logout
from evaluacion.serializers import evaluacionSerializer
from grupo.models import Grupo
from grupo.serializer import GrupoSerializer
from evaluacion.models import evaluacion
from criterio_evaluacion.models import criterio_Evaluacion
from criterio_evaluacion.serializers import criterio_EvaluacionSerializer
from rubrica.models import rubrica_Evaluacion
from rubrica.serializers import rubrica_EvaluacionSerializer
from evaluacion.models import evaluacion
from informesindividuales.models import InformesIndividuales
from informesindividuales.serializer import InformesIndividualesSerializer

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

@api_view(['GET'])
def obtener_evaluaciones(request):
    codigo = request.data.get('codigo')
    curso = get_object_or_404(Cursos, codigo=codigo)
    evaluaciones = curso.evaluaciones
    serializer = evaluacionSerializer(evaluaciones, many=True)
    return Response({"evaluaciones": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def obtener_grupo_criterios(request):
    codigo_estudiante = request.data.get("codigo")
    id_evaluacion = request.data.get("id")

    estudiante = get_object_or_404(Estudiante, codigo=codigo_estudiante)
    evaluacion_ph = get_object_or_404(evaluacion, id=id_evaluacion)

    grupo_estudiante = estudiante.grupo_set.filter(evaluacion=evaluacion_ph).first()
    if not grupo_estudiante:
        return Response({"error": "El estudiante no pertenece a un grupo en esta evaluación"}, status=status.HTTP_400_BAD_REQUEST)

    companeros = Estudiante.objects.filter(grupo=grupo_estudiante).exclude(id=estudiante.id)

    companeros_sin_evaluar = []
    for companero in companeros:
        if not InformesIndividuales.objects.filter(
            id_evaluacion=id_evaluacion,
            codigo_evaluado=companero.codigo,
            codigo_evaluador=codigo_estudiante
        ).exists():
            companeros_sin_evaluar.append(companero)

    serializer_estudiantes = EstudianteSerializer(companeros_sin_evaluar, many=True)
    serializer_criterios = criterio_EvaluacionSerializer(evaluacion_ph.rubrica.criterios, many=True)

    return Response({
        "estudiantes": serializer_estudiantes.data,
        "criterios": serializer_criterios.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def realizar_calificacion(request):
    codigo_evaluado=request.data.get('codigo_evaluado')
    codigo_evaluador=request.data.get('codigo_evaluador')
    id_evaluacion=request.data.get('id')
    comentarios = request.data.get('comentarios')
    criterios = request.data.get('criterios')

    evaluaciones_previas = InformesIndividuales.objects.filter(
        codigo_evaluador=codigo_evaluador,
        codigo_evaluado=codigo_evaluado,
        id_evaluacion=id_evaluacion
    )
    
    if evaluaciones_previas.exists():
        return Response({"error": "El estudiante ya ha sido calificado en esta evaluación"}, status=status.HTTP_400_BAD_REQUEST)

    informe_individual = InformesIndividuales.objects.create(codigo_evaluado=codigo_evaluado, codigo_evaluador=codigo_evaluador, id_evaluacion=id_evaluacion, comentarios=comentarios, criterios=criterios)
    serializer = InformesIndividualesSerializer(informe_individual)

    return Response({"Mensaje": "Calificacion realizada con exito", "InformeHecho": serializer.data}, status=status.HTTP_200_OK)

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
    if (Cursos.objects.filter(profesor=profesor).exists()):
        return Response({"error": "El profesor ya tiene cursos asignados"}, status=status.HTTP_400_BAD_REQUEST)
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

@api_view(['POST'])  
def Rubricas_profe(request):
    identificacion = request.data.get('identificacion')
    profesor = get_object_or_404(Profesor, identificacion=identificacion)
    username = profesor.user.username
    rubricas = rubrica_Evaluacion.objects.filter(autor=username)

    peredeterminada = rubrica_Evaluacion.objects.filter(autor="admin").first()
    serializer_pre = rubrica_EvaluacionSerializer(peredeterminada)
    
    # Serializar cada rubrica individualmente
    serialized_rubricas = []
    for rubrica in rubricas:
        serializer = rubrica_EvaluacionSerializer(rubrica)
        serialized_rubricas.append(serializer.data)

    return Response({'rubricas': serialized_rubricas, 'predeterminada': serializer_pre.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def obtener_criterios(request):
    id = request.data.get('id')
    rubrica = get_object_or_404(rubrica_Evaluacion, id=id)  

    # Serializar la rubrica y los criterios asociados
    rubrica_serializer = rubrica_EvaluacionSerializer(rubrica)
    criterios_serializer = criterio_EvaluacionSerializer(rubrica.criterios.all(), many=True)

    # Combinar la información de la rubrica y los criterios en un solo diccionario de respuesta
    data = {
        'rubrica': rubrica_serializer.data,
        'criterios': criterios_serializer.data
    }

    return Response(data)

@api_view(['POST'])
def guardar_criterios(request):
    id = request.data.get('id')
    criterios = request.data.get('criterios')
    criteriosEliminados = request.data.get('criteriosEliminados')
    newEscala = request.data.get('newEscala')

    rubrica = get_object_or_404(rubrica_Evaluacion, id=id)

    if(newEscala != rubrica.escala):
        rubrica.escala = newEscala

    # Eliminar criterios
    for criterio in criteriosEliminados:
        criterio_obj = get_object_or_404(criterio_Evaluacion, id=criterio['id'])
        criterio_obj.delete()

    # Actualizar o crear criterios
    for criterio in criterios:
        if 'id' in criterio and criterio_Evaluacion.objects.filter(id=criterio['id']).exists():
            criterio_obj = criterio_Evaluacion.objects.get(id=criterio['id'])
            criterio_obj.descripcion = criterio['descripcion']
            criterio_obj.valor = criterio['valor']
            criterio_obj.save()
        else:
            new = criterio_Evaluacion.objects.create(
                descripcion=criterio['descripcion'],
                valor=criterio['valor'],
            )
            rubrica.criterios.add(new)

    rubrica.save()

    return Response({"message": "Criterios actualizados correctamente"}, status=status.HTTP_200_OK)
@api_view(['GET'])
def Rubricas_admin(request):
    predeterminada = rubrica_Evaluacion.objects.filter(autor="admin").first()
    
    if predeterminada:
        serializer_pre = rubrica_EvaluacionSerializer(predeterminada)
        return Response({'predeterminada': serializer_pre.data}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'No se encontró una rubrica predeterminada'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def editar_predeterminada(request):
    id = request.data.get('id')
    criterios = request.data.get('criterios')
    criteriosEliminados = request.data.get('criteriosEliminados')
    newEscala = request.data.get('newEscala')

    rubrica = get_object_or_404(rubrica_Evaluacion, id=id)

    if(newEscala != rubrica.escala):
        rubrica.escala = newEscala

    # Eliminar criterios
    for criterio in criteriosEliminados:
        criterio_obj = get_object_or_404(criterio_Evaluacion, id=criterio['id'])
        criterio_obj.delete()

    # Actualizar o crear criterios
    for criterio in criterios:
        if 'id' in criterio and criterio_Evaluacion.objects.filter(id=criterio['id']).exists():
            criterio_obj = criterio_Evaluacion.objects.get(id=criterio['id'])
            criterio_obj.descripcion = criterio['descripcion']
            criterio_obj.valor = criterio['valor']
            criterio_obj.save()
        else:
            new = criterio_Evaluacion.objects.create(
                descripcion=criterio['descripcion'],
                valor=criterio['valor'],
            )
            rubrica.criterios.add(new)

    rubrica.save()

    return Response({"message": "Criterios actualizados correctamente"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def guardarRubrica(request):
    rubrica_data = request.data.get('rubrica')
    criterios_data = request.data.get('criterios')
    identificacion = request.data.get('identificacion')
    escala = request.data.get('escala')

    profesor = Profesor.objects.get(identificacion=identificacion)

    username = profesor.user.username

    # Crear la nueva rúbrica
    nueva_rubrica = rubrica_Evaluacion.objects.create(nombre=rubrica_data['nombre'], escala=escala)

    nueva_rubrica.autor = username


    # Crear los criterios asociados
    for criterio in criterios_data:
        new = criterio_Evaluacion.objects.create(
            descripcion=criterio['descripcion'],
            valor=criterio['valor'],
        )
        nueva_rubrica.criterios.add(new)

    nueva_rubrica.save()

    return Response({"message": "Rúbrica creada correctamente"}, status=status.HTTP_201_CREATED)


    


    
