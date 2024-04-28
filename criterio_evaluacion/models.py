from django.db import models

# Create your models here.
class criterio_Evaluacion(models.Model):
    descripcion = models.CharField(max_length=500)
    peso = models.IntegerField(null=False)
    escala = models.IntegerField(null=False)

    def __str__(self):
        return self.descripcion