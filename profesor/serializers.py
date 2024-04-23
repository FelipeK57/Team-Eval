from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['is_student', 'is_teacher']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Aquí incluimos el serializador del perfil

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'profile']
