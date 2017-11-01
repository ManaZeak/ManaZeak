# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-01 14:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_auto_20171101_1123'),
    ]

    operations = [
        migrations.AddField(
            model_name='stats',
            name='playCounter',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='stats',
            name='listeningPercentage',
            field=models.IntegerField(null=True),
        ),
    ]
