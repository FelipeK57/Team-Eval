from django.db import models
from rubrica.models import rubrica_Evaluacion

# Create your models here.
class criterio_Evaluacion(models.Model):
    descripcion = models.CharField(max_length=500)
    peso = models.IntegerField(null=False)
    escala = models.IntegerField(null=False)
    rubricas = models.ManyToManyField(rubrica_Evaluacion)

    def __str__(self):
        return self.descripcion