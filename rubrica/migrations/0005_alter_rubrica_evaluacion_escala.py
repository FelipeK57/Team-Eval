<<<<<<< HEAD
# Generated by Django 5.0.6 on 2024-06-11 14:38
=======
# Generated by Django 5.0.4 on 2024-06-05 20:42
>>>>>>> front_back_sebas

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
<<<<<<< HEAD
        ('rubrica', '0004_merge_20240605_1026'),
=======
        ('rubrica', '0004_merge_20240605_1541'),
>>>>>>> front_back_sebas
    ]

    operations = [
        migrations.AlterField(
            model_name='rubrica_evaluacion',
            name='escala',
            field=models.IntegerField(max_length=10),
        ),
    ]
