# Generated by Django 5.1.2 on 2024-10-11 07:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='votes_to_skip',
            new_name='vote_to_skip',
        ),
    ]