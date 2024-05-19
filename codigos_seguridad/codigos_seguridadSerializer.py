from rest_framework import serializers
from .models import codigos_seguridad

class codigos_seguridadSerializer(serializers.ModelSerializer):
    class Meta:
        model = codigos_seguridad
        fields = '__all__'