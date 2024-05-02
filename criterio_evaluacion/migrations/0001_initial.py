# Generated by Django 5.0.4 on 2024-05-02 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rubrica', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='criterio_Evaluacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(max_length=500)),
                ('peso', models.IntegerField()),
                ('escala', models.IntegerField()),
                ('rubricas', models.ManyToManyField(to='rubrica.rubrica_evaluacion')),
            ],
        ),
    ]
