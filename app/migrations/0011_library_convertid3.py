# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-12 11:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_playlist_isscanned'),
    ]

    operations = [
        migrations.AddField(
            model_name='library',
            name='convertID3',
            field=models.BooleanField(default=False),
        ),
    ]