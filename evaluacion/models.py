from django.db import models

# Create your models here.
class evaluacion(models.Model):
    fecha = models.DateField (null=False)
