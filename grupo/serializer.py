from rest_framework import serializers
from .models import Grupo
from estudiantes.models import Estudiante
from estudiantes.serializers import EstudianteSerializer



class GrupoSerializer(serializers.ModelSerializer):
    estudiantes = EstudianteSerializer(many=True)
    class Meta:
        model = Grupo
        fields = "__all__"
        