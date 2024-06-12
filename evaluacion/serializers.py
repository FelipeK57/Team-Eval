from rest_framework import serializers
from .models import evaluacion
from grupo.models import Grupo
from grupo.serializer import GrupoSerializer
from rubrica.models import rubrica_Evaluacion
from rubrica.serializers import rubrica_EvaluacionSerializer




class RubricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = rubrica_Evaluacion
        fields = "__all__"

class evaluacionSerializer(serializers.ModelSerializer):
    grupo = GrupoSerializer(Grupo, many=True)
    rubrica = rubrica_EvaluacionSerializer(rubrica_Evaluacion)
    class Meta:
        model = evaluacion
        fields = "__all__"