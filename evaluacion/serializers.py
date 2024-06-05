from rest_framework import serializers
from .models import evaluacion
from grupo.models import Grupo
from grupo.serializer import GrupoSerializer




class evaluacionSerializer(serializers.ModelSerializer):
    grupo = GrupoSerializer(Grupo, many=True)
    class Meta:
        model = evaluacion
        fields = "__all__"