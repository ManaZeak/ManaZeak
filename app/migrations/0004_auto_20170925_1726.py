# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-25 15:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20170925_1705'),
    ]

    operations = [
        migrations.RenameField(
            model_name='playlist',
            old_name='tracks',
            new_name='track',
        ),
    ]
