from rest_framework import serializers
from .models import evaluacion
from grupo.models import Grupo
from rubrica.models import rubrica_Evaluacion

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = "__all__"

class RubricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = rubrica_Evaluacion
        fields = "__all__"

class evaluacionSerializer(serializers.ModelSerializer):
    grupo = GrupoSerializer(many=True)
    rubrica = RubricaSerializer()
    class Meta:
        model = evaluacion
        fields = "__all__"