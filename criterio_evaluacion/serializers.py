from rest_framework import serializers
from .models import criterio_Evaluacion

class criterio_EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = criterio_Evaluacion
        fields = ('id', 'descripcion', 'peso', 'escala')