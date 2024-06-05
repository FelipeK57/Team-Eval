from django.db import models

# Create your models here.
class criterio_Evaluacion(models.Model):
    descripcion = models.CharField(max_length=500)
<<<<<<< HEAD
    valor = models.IntegerField(default=0)
=======
    valor = models.IntegerField(null=False)  
>>>>>>> origin/front_back_sebas

    def __str__(self):
        return self.descripcion