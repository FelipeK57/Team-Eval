from rest_framework import serializers
from .models import Profesor
from api.serializers import UserSerializer

class ProfesorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profesor
        fields = '__all__'
