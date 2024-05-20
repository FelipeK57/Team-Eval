from rest_framework import serializers
from .models import administrador
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
class AdministradorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = administrador
        fields = '__all__'
