from django.db import models
from django.contrib.auth.models import User
from evaluacion.models import evaluacion


class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=20)
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

    
    def __str__(self):
        return self.user.username