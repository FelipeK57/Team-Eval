from django.db import models
from estudiantes.models import Estudiante
from evaluacion.models import evaluacion

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200, null=False)
    proyectoAsignado = models.CharField(max_length=200, null=False)
    estudiantes = models.ManyToManyField(Estudiante)
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
