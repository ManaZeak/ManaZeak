import os

from django.core.management import BaseCommand

import psutil


class Command(BaseCommand):

    def handle(self, *args, **options):
        pids = psutil.pids()
        # Check that crond isn't already running
        for pid in pids:
            process = psutil.Process(pid)
            if process.name() == 'crond':
                print("crond already launched")
                return
        # Launching crond
        print("Launching cron daemon")
        os.system('crond')
