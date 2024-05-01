from django.db import models
from django.contrib.auth.models import User
<<<<<<< HEAD
from evaluacion.models import evaluacion

=======
from cursos.models import Cursos
>>>>>>> modelos_actualizados

class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=20)
<<<<<<< HEAD
    evaluacion = models.ForeignKey(evaluacion, on_delete=models.CASCADE)

=======
    cursos = models.ManyToManyField(Cursos)
>>>>>>> modelos_actualizados
    
    def __str__(self):
        return self.user.username