# Generated by Django 5.0.6 on 2024-06-11 14:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluacion', '0008_alter_evaluacion_informe'),
        ('rubrica', '0005_alter_rubrica_evaluacion_escala'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evaluacion',
            name='rubrica',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rubrica.rubrica_evaluacion'),
        ),
    ]
