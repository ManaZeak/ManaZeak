import logging

from django.core.management import BaseCommand

from app.models import Group

logger = logging.getLogger('django')


## This class is a command that can be launched from manage.py
class Command(BaseCommand):

    ## Initialise all the db objects if needed
    def handle(self, *args, **options):
        logger.info('Inserting default object into the database')
        self.groupGenerator()


    @staticmethod
    def groupGenerator():
        if Group.objects.all().count() == 0:
            Group(name='Banned', rank=0).save()
            Group(name='Naab', rank=1).save()
            Group(name='User', rank=2).save()
            Group(name='Moderator', rank=3).save()
            Group(name='Admin', rank=4).save()
            Group(name='Root', rank=5).save()
