from django.db import models
<<<<<<< HEAD
from estudiantes.models import Estudiante
from evaluacion.models import evaluacion

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200, null=False)
    proyectoAsignado = models.CharField(max_length=200, null=False)
    estudiantes = models.ManyToManyField(Estudiante)
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

=======
from cursos.models import Cursos

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200)
    proyectoAsignado = models.CharField(max_length=200)
    cursos = models.ManyToManyField(Cursos)
>>>>>>> modelos_actualizados

    def __str__(self):
        return self.nombre
