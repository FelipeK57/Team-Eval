# Generated by Django 5.0.4 on 2024-04-27 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profesor', '0009_rename_profile_profesor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profesor',
            name='nombre',
        ),
        migrations.AddField(
            model_name='profesor',
            name='identificacion',
            field=models.PositiveBigIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='telefono',
            field=models.PositiveIntegerField(null=True),
        ),
    ]