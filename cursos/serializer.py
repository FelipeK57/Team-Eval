from rest_framework import serializers
from .models import Cursos
from evaluacion.models import evaluacion
from profesor.models import Profesor
from profesor.serializers import ProfesorSerializer



class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = evaluacion
        fields = '__all__'

class CursosSerializer(serializers.ModelSerializer):
    evaluaciones = EvaluacionSerializer(evaluacion, many=True)
    profesor = ProfesorSerializer(Profesor)
    class Meta:
        model = Cursos
        fields = '__all__'