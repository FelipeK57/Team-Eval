from rest_framework import serializers
from .models import evaluacion

class evaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = evaluacion
        fields = ('id', 'fecha')