# Generated by Django 4.1.7 on 2023-03-28 05:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_alter_project_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='avatar',
        ),
        migrations.AddField(
            model_name='project',
            name='complete',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='project',
            name='start_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]