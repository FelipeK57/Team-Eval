# Generated by Django 5.0.4 on 2024-04-23 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profesor', '0003_alter_profile_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='nombre',
            field=models.CharField(editable=False, max_length=150, null=True),
        ),
    ]