from django.db import models

# Create your models here.
class Estudiante(models.Model):
    codigo = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
    correo = models.CharField(max_length=200)
    contraseña = models.CharField(max_length=15, null=False)

    def __str__(self):
        return self.nombre
