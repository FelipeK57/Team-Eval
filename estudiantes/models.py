from django.db import models
from django.contrib.auth.models import User
from cursos.models import Cursos

class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=20)
    cursos = models.ManyToManyField(Cursos)
    
    def __str__(self):
        return self.user.username