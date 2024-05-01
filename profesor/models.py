from django.contrib.auth.models import User
from django.db import models
from cursos.models import Cursos

class Profesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.PositiveIntegerField(null=True)
    identificacion = models.PositiveBigIntegerField(null=True)
    curso = models.ForeignKey(Cursos, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.user.username 

