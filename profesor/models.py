from django.contrib.auth.models import User
from django.db import models

class Profesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.PositiveIntegerField(null=True)
    identificacion = models.PositiveBigIntegerField(null=True)

    def __str__(self):
        return self.user.username

