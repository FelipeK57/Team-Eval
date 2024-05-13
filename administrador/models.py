from django.db import models
from django.contrib.auth.models import User
from cursos.models import Cursos
from estudiantes.models import Estudiante
from profesor.models import Profesor
from openpyxl import load_workbook
# Create your models here.
class administrador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.PositiveBigIntegerField(null=True)

    def read_file(self, file):
        wb = load_workbook(file)
        hoja = wb.active
        
        curso_codigo = hoja['A2'].value
        curso_nombre = hoja['C2'].value
        curso_periodo = hoja['F2'].value
        
        profesor_identificacion = hoja['B3'].value
        profesor_nombre = hoja['C3'].value
        profesor_apellido = hoja['D3'].value
        profesor_email = hoja['E3'].value
        username_p = profesor_nombre + ' ' + profesor_apellido
        try:
            user_profesor, creado = User.objects.get_or_create(username=username_p, email=profesor_email, first_name=profesor_nombre, last_name=profesor_apellido)
            if creado:
                dp_profesor = profesor_nombre[0] + str(profesor_identificacion) + profesor_apellido[0] 
                user_profesor.set_password(dp_profesor)
                user_profesor.save()
        except Exception as e:
            print(f"Error al crear/obtener profesor: {e}")

        try:
            nuevo_profesor, creado = Profesor.objects.get_or_create(user=user_profesor, identificacion=profesor_identificacion, telefono="123")
            if creado:
                nuevo_profesor.save()
        except Exception as e:
            print(f"Error al crear/obtener objeto Profesor: {e}")

        try:
            nuevo_curso, creado = Cursos.objects.get_or_create(nombre=curso_nombre, codigo=curso_codigo, estado=True, periodoAcademico=curso_periodo, profesor=nuevo_profesor)
            if creado:
                nuevo_curso.save()
        except Exception as e:
            print(f"Error al crear/obtener objeto Curso: {e}")

        for fila in hoja.iter_rows(min_row=4, values_only=True):
            estudiante_codigo = fila[0]
            estudiante_nombre = fila[2]
            estudiante_apellido = fila[3]
            estudiante_email = fila[4]
            username_e = estudiante_nombre + ' ' + estudiante_apellido
            try:
                user_estudiante, creado = User.objects.get_or_create(username=username_e, email=estudiante_email, first_name=estudiante_nombre, last_name=estudiante_apellido)
                if creado:
                    dp_estudiante = estudiante_nombre[0] + str(estudiante_codigo) + estudiante_apellido[0]
                    user_estudiante.set_password(dp_estudiante)
                    user_estudiante.save()
            except Exception as e:
                print(f"Error al crear/obtener estudiante: {e}")

            try:
                nuevo_estudiante, creado = Estudiante.objects.get_or_create(user=user_estudiante, codigo=estudiante_codigo)
                if creado:
                    nuevo_estudiante.save()
            except Exception as e:
                print(f"Error al crear/obtener objeto Estudiante: {e}")

            try:
                nuevo_curso.estudiantes.add(nuevo_estudiante)
            except Exception as e:
                print(f"Error al agregar estudiante al curso: {e}")


    def __str__(self):
        return self.user.username