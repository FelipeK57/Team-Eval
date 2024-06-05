from django.db import models
from criterio_evaluacion.models import criterio_Evaluacion
# Create your models here.
class rubrica_Evaluacion(models.Model):
    nombre = models.CharField(max_length=50)
    escala = models.IntegerField(max_length=10)
    criterios = models.ManyToManyField(criterio_Evaluacion)
<<<<<<< HEAD
    autor = models.CharField(max_length=50, null=True)
=======
    autor = models.CharField(max_length=50,null=True)
>>>>>>> origin/Cositas-ADMIN

    def __str__(self):
        return self.nombre
    