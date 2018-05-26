from django.core.management import BaseCommand

from app.collection.library import rescanLibraryProcess


class Command(BaseCommand):

    def handle(self, *args, **options):
        rescanLibraryProcess(None)
