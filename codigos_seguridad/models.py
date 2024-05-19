from django.db import models

# Create your models here.
class codigos_seguridad(models.Model): 
    token = models.CharField(max_length=200, null=True)
    codigo = models.PositiveBigIntegerField(null=True)