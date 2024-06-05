from django.db import models
from criterio_evaluacion.models import criterio_Evaluacion
# Create your models here.
class rubrica_Evaluacion(models.Model):
    nombre = models.CharField(max_length=50)
    escala = models.IntegerField(max_length=5)
    criterios = models.ManyToManyField(criterio_Evaluacion)
    autor = models.CharField(max_length=50,null=True)

    def __str__(self):
        return self.nombre
    