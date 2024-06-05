from django.db import models

# Create your models here.
class criterio_Evaluacion(models.Model):
    descripcion = models.CharField(max_length=500)
<<<<<<< HEAD
    valor = models.IntegerField(null=False)  
=======
    valor = models.PositiveIntegerField(max_length=10, default=1)
>>>>>>> origin/Cositas-ADMIN

    def __str__(self):
        return self.descripcion