# Generated by Django 5.0.4 on 2024-05-01 17:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0003_cursos_profesor'),
        ('profesor', '0010_remove_profesor_nombre_profesor_identificacion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cursos',
            name='profesor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='profesor.profesor'),
        ),
    ]
