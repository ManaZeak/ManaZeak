# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-06-02 14:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_auto_20180526_0910'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpreferences',
            old_name='picture',
            new_name='avatar',
        ),
    ]
