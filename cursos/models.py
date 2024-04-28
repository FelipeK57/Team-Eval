from django.db import models

# Create your models here.
class Cursos(models.Model):
    codigo = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
    estado = models.BooleanField(default=True)
    periodoAcademico = models.CharField(max_length=7)


    def __str__(self):
        return self.nombre
