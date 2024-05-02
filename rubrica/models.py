from django.db import models
from evaluacion.models import evaluacion
# Create your models here.
class rubrica_Evaluacion(models.Model):
    nombre = models.CharField(max_length=50)
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    