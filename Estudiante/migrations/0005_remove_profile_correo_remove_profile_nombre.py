# Generated by Django 5.0.4 on 2024-04-23 19:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profesor', '0004_alter_profile_nombre'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='correo',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='nombre',
        ),
    ]
