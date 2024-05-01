from django.db import models
from criterio_evaluacion.models import criterio_Evaluacion
from evaluacion.models import evaluacion
# Create your models here.
class rubrica_Evaluacion(models.Model):
    nombre = models.CharField(max_length=50)
    criterios = models.ManyToManyField(criterio_Evaluacion)
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    