from django.db import models

# Create your models here.
class informes(models.Model):
    nota = models.PositiveSmallIntegerField()
    comentarios = models.CharField(max_length=500)

    def __str__(self):
        return self.comentarios
    