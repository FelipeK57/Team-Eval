# Generated by Django 5.0.4 on 2024-05-21 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudiantes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiante',
            name='estado',
            field=models.BooleanField(default=True),
        ),
    ]