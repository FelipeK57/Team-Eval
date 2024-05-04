from rest_framework import serializers
from .models import rubrica_Evaluacion

class rubrica_EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = rubrica_Evaluacion
        fields = ('nombre')