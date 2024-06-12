from rest_framework import serializers
from .models import rubrica_Evaluacion
from criterio_evaluacion.serializers import criterio_EvaluacionSerializer

class rubrica_EvaluacionSerializer(serializers.ModelSerializer):
    criterios = criterio_EvaluacionSerializer(many=True)    
    class Meta:
        model = rubrica_Evaluacion
        fields = ['id', 'nombre', 'escala', 'criterios', 'autor']