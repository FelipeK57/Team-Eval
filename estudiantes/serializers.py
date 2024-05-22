from rest_framework import serializers
from .models import Estudiante
from django.contrib.auth.models import User
<<<<<<< HEAD
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class EstudianteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
=======

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class EstudianteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

>>>>>>> origin/ventanas_juancho
    class Meta:
        model = Estudiante
        fields = ['id', 'user', 'codigo', 'estado']
    