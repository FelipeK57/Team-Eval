# Generated by Django 5.0.4 on 2024-06-09 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profesor', '0003_profesor_autor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profesor',
            name='autor',
        ),
    ]
