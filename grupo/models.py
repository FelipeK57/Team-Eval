from django.db import models
from estudiantes.models import Estudiante

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200, null=False)
    proyectoAsignado = models.CharField(max_length=200, null=False)
    estudiantes = models.ManyToManyField(Estudiante)


    def __str__(self):
        return self.nombre
