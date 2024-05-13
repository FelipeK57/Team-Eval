from django.db import models

# Create your models here.
class informes(models.Model):
    nota = models.PositiveSmallIntegerField(max_length=2)
    comentarios = models.CharField(max_length=500)

    def __str__(self):
        return self.comentarios
    