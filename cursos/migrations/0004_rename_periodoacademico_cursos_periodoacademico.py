# Generated by Django 5.0.4 on 2024-05-21 19:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0003_rename_periodoacademico_cursos_periodoacademico_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cursos',
            old_name='periodoacademico',
            new_name='periodoAcademico',
        ),
    ]
