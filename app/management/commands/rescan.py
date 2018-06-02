import logging

from django.core.management import BaseCommand

from app.collection.library import rescanLibraryProcess


logger = logging.getLogger('django')


class Command(BaseCommand):

    def handle(self, *args, **options):
        logger.info("Launching rescan via management command")
        rescanLibraryProcess(None)

