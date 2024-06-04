from rest_framework import serializers
from .models import evaluacion
from grupo.models import Grupo

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = "__all__"

class evaluacionSerializer(serializers.ModelSerializer):
    grupo = GrupoSerializer(read_only=True, many=True)
    class Meta:
        model = evaluacion
        fields = "__all__"