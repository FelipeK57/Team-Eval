from django.db import models

# Create your models here.
class Cursos(models.Model):
    codigo = models.CharField(max_length=200, null=False)
    nombre = models.CharField(max_length=200, null=False)
    estado = models.BooleanField(default=True, null=False)
    periodoAcademico = models.CharField(max_length=7, default=2024-1)
    


    def __str__(self):
        return self.nombre
