from django.contrib.auth.models import User
from django.db import models

class Estudiante(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=150, null=True, editable=False)  # Cambiado a CharField
    correo = models.CharField(max_length=100, null=True, )
    contraseña = models.CharField(max_length=15, null=True)

    def save(self, *args, **kwargs):
        # Al guardar el perfil, actualizar el nombre con el nombre de usuario del usuario asociado
        self.nombre = self.user.first_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username

