# Generated by Django 5.0.4 on 2024-05-01 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('criterio_evaluacion', '0001_initial'),
        ('rubrica', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='rubrica_evaluacion',
            name='criterios',
            field=models.ManyToManyField(to='criterio_evaluacion.criterio_evaluacion'),
        ),
    ]
