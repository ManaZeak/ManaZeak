# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20170927_0725'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='artist',
            unique_together=set([]),
        ),
    ]
