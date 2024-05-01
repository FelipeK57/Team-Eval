from django.db import models
#from estudiantes.models import Estudiante


# Create your models here.
class evaluacion(models.Model):
    fecha = models.DateField (null=False)
    #evaluador = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    #evaluado = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    
    
