from django.db import models

class InformesIndividuales(models.Model):
    codigo_evaluador = models.CharField(max_length=100)
    codigo_evaluado = models.CharField(max_length=100)
    id_evaluacion = models.IntegerField()
    comentarios = models.TextField()
    criterios = models.JSONField()

    def __str__(self):
        return f"Informe Individual de {self.codigo_evaluador} para {self.codigo_evaluado}"