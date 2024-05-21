from rest_framework import serializers
from .models import Profesor
<<<<<<< HEAD
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

=======
from api.serializers import UserSerializer
>>>>>>> origin/Importar_cursos

class ProfesorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profesor
        fields = '__all__'
