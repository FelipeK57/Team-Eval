# Generated by Django 5.0.4 on 2024-06-05 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('criterio_evaluacion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='criterio_evaluacion',
            name='valor',
            field=models.IntegerField(null=True),
        ),
    ]