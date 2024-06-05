from rest_framework import serializers
from .models import Cursos
from evaluacion.models import evaluacion
from estudiantes.models import Estudiante
from django.contrib.auth.models import User
from evaluacion.serializers import evaluacionSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class EstudianteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Estudiante
        fields = '__all__'

class CursosSerializer(serializers.ModelSerializer):
    evaluaciones = evaluacionSerializer(evaluacion, many=True)
    estudiantes = EstudianteSerializer(Estudiante, many=True)
    class Meta:
        model = Cursos
        fields = '__all__'