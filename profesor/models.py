from django.contrib.auth.models import User
from django.db import models

class Profesor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.BigIntegerField(null=True)
    nombre = models.CharField(max_length=150, null=True, editable=False)  # Cambiado a CharField
    

    def save(self, *args, **kwargs):
        # Al guardar el perfil, actualizar el nombre con el nombre de usuario del usuario asociado
        self.nombre = self.user.first_name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username

