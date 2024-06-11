from rest_framework import serializers
from .models import evaluacion
from grupo.models import Grupo
<<<<<<< HEAD
from rubrica.models import rubrica_Evaluacion
=======
from grupo.serializer import GrupoSerializer
from rubrica.models import rubrica_Evaluacion
from rubrica.serializers import rubrica_EvaluacionSerializer


>>>>>>> front_back_sebas


class RubricaSerializer(serializers.ModelSerializer):
    class Meta:
        model = rubrica_Evaluacion
        fields = "__all__"

class evaluacionSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    grupo = GrupoSerializer(many=True)
    rubrica = RubricaSerializer()
=======
    grupo = GrupoSerializer(Grupo, many=True)
    rubrica = rubrica_EvaluacionSerializer(rubrica_Evaluacion)
>>>>>>> front_back_sebas
    class Meta:
        model = evaluacion
        fields = "__all__"