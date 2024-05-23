from django.db import models
from profesor.models import Profesor
from grupo.models import Grupo
from estudiantes.models import Estudiante
from evaluacion.models import evaluacion

# Create your models here.
class Cursos(models.Model):
    codigo = models.CharField(max_length=200, null=False)
    nombre = models.CharField(max_length=200, null=False)
    estado = models.BooleanField(default=True, null=False)
    periodoAcademico = models.CharField(max_length=20, default=2024-1)
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, default=1)
    estudiantes = models.ManyToManyField(Estudiante) 
    evaluaciones = models.ManyToManyField(evaluacion)
    estado = models.BooleanField(default=True, null=False)  

    def __str__(self):
        return self.nombre
    