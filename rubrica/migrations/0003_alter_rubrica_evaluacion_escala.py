# Generated by Django 5.0.4 on 2024-06-05 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rubrica', '0002_rubrica_evaluacion_autor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rubrica_evaluacion',
            name='escala',
            field=models.IntegerField(max_length=10),
        ),
    ]
