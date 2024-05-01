from django.db import models
from cursos.models import Cursos

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200)
    proyectoAsignado = models.CharField(max_length=200)
    cursos = models.ManyToManyField(Cursos)

    def __str__(self):
        return self.nombre
