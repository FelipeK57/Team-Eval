from rest_framework import serializers
from .models import Cursos
from evaluacion.models import evaluacion
<<<<<<< HEAD
from profesor.models import Profesor
from profesor.serializers import ProfesorSerializer


=======
from estudiantes.models import Estudiante
from django.contrib.auth.models import User
from evaluacion.serializers import evaluacionSerializer
>>>>>>> front_back_sebas

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
<<<<<<< HEAD
    evaluaciones = EvaluacionSerializer(evaluacion, many=True)
    profesor = ProfesorSerializer(Profesor)
=======
    evaluaciones = evaluacionSerializer(evaluacion, many=True)
    estudiantes = EstudianteSerializer(Estudiante, many=True)
>>>>>>> front_back_sebas
    class Meta:
        model = Cursos
        fields = '__all__'