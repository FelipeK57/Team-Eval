# Generated by Django 5.0.4 on 2024-05-22 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profesor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profesor',
            name='estado',
            field=models.BooleanField(default=True),
        ),
    ]