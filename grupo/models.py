from django.db import models

# Create your models here.
class Grupo(models.Model):
    nombre = models.CharField(max_length=200)
    proyectoAsignado = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre
