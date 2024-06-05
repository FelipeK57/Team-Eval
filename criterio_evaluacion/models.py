from django.db import models

# Create your models here.
class criterio_Evaluacion(models.Model):
    descripcion = models.CharField(max_length=500)
    valor = models.IntegerField(null=True)  

    def __str__(self):
        return self.descripcion