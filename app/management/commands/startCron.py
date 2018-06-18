import logging
import os

from django.core.management import BaseCommand

import psutil


logger = logging.getLogger('django')


class Command(BaseCommand):

    def handle(self, *args, **options):
        pids = psutil.pids()
        # Check that crond isn't already running
        for pid in pids:
            process = psutil.Process(pid)
            if process.name() == 'crond':
                logger.info("The cron deamon wasn't launched because it's already running")
                return
        # Launching crond
        logger.info("The cron daemon was launched")
        os.system('crond')
