from rest_framework import serializers
from .models import Estudiante
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class EstudianteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Estudiante
        fields = ['id', 'user', 'codigo', 'estado']
    