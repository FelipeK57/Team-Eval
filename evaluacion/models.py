from django.db import models
from rubrica.models import rubrica_Evaluacion
from grupo.models import Grupo
from informes.models import informes
from grupo.models import Grupo
import datetime

# Create your models here.
class evaluacion(models.Model):
    nombre = models.CharField(default="Evaluacion",max_length=100)
    fecha = models.DateField(null=False)
    rubrica = models.OneToOneField(rubrica_Evaluacion,on_delete=models.CASCADE, null=False) 
    informe = models.ManyToManyField(informes)
    grupo = models.ManyToManyField(Grupo)