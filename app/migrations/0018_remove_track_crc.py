# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-08 10:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_auto_20171107_0953'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='CRC',
        ),
    ]
