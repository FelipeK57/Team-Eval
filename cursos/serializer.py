from rest_framework import serializers
from .models import Cursos
from evaluacion.models import evaluacion

class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = evaluacion
        fields = '__all__'

class CursosSerializer(serializers.ModelSerializer):
    evaluaciones = EvaluacionSerializer(evaluacion, many=True)
    class Meta:
        model = Cursos
        fields = '__all__'