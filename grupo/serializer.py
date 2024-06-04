from rest_framework import serializers
from .models import Grupo
from estudiantes.models import Estudiante

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ['id', 'user', 'codigo', 'estado']

class GrupoSerializer(serializers.ModelSerializer):
    estudiantes = EstudianteSerializer(read_only=True, many=True)
    class Meta:
        model = Grupo
        fields = "__all__"
        