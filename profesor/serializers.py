from rest_framework import serializers
from .models import Profesor
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class ProfesorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profesor
        fields = '__all__'
