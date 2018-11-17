import logging

from django.contrib.auth.models import Permission
from django.core.management import BaseCommand

from app.models import Group, ApplicationConfiguration
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager

logger = logging.getLogger('django')


## This class is a command that can be launched from manage.py
class Command(BaseCommand):

    ## Initialise all the db objects if needed
    def handle(self, *args, **options):
        logger.info('Inserting default object into the database')
        self._permissionGenerator()
        self._groupGenerator()
        self._generateApplicationConfiguration()

    ## Generate the default group for the application
    def _groupGenerator(self):
        if Group.objects.all().count() == 0:
            Group(name='Banned', rank=0).save()
            Group(name='Naab', rank=1).save()
            Group(name='User', rank=2).save()
            Group(name='Moderator', rank=3).save()
            Group(name='Admin', rank=4).save()
            Group(name='Root', rank=5).save()
            logger.info('Generated default groups.')
            for group in Group.objects.all():
                self._fillDefaultPermission(group)
            logger.info('Associated default permissions to groups.')

    @staticmethod
    ## Add the permission to a group given the user rank
    #   @param group the Group object of a user
    def _fillDefaultPermission(group):
        if group.rank > 0:
            group.permissions.add(Permission.objects.get(code="LOGI"))
            group.permissions.add(Permission.objects.get(code="PLAY"))
            group.permissions.add(Permission.objects.get(code="PLST"))
            group.permissions.add(Permission.objects.get(code="DOWN"))
        if group.rank > 1:
            group.permissions.add(Permission.objects.get(code="WISH"))
            group.permissions.add(Permission.objects.get(code="TAGS"))
            group.permissions.add(Permission.objects.get(code="UPLD"))
            group.permissions.add(Permission.objects.get(code="SPON"))
            group.permissions.add(Permission.objects.get(code="STAT"))
        if group.rank > 2:
            group.permissions.add(Permission.objects.get(code="STCH"))
            group.permissions.add(Permission.objects.get(code="STFA"))
            group.permissions.add(Permission.objects.get(code="WISR"))
            group.permissions.add(Permission.objects.get(code="STAL"))
        if group.rank > 3:
            group.permissions.add(Permission.objects.get(code="DESC"))
            group.permissions.add(Permission.objects.get(code="TAGE"))
            group.permissions.add(Permission.objects.get(code="UPAP"))
            group.permissions.add(Permission.objects.get(code="STAA"))
            group.permissions.add(Permission.objects.get(code="ADMV"))
            group.permissions.add(Permission.objects.get(code="GRPE"))
            group.permissions.add(Permission.objects.get(code="FTAL"))
            group.permissions.add(Permission.objects.get(code="LIBR"))
        if group.rank > 4:
            group.permissions.add(Permission.objects.get(code="GAPR"))
            group.permissions.add(Permission.objects.get(code="COIN"))

    @staticmethod
    ## Generate the default permissions for the application
    def _permissionGenerator():
        if Permission.objects.all().count() == 0:
            Permission(name="Login", code="LOGI").save()
            Permission(name="Music listening", code="PLAY").save()
            Permission(name="Playlist management", code="PLST").save()
            Permission(name="Download", code="DOWN").save()
            Permission(name="Wish creation", code="WISH").save()
            Permission(name="Tag submission", code="TAGS").save()
            Permission(name="Upload file", code='UPLD').save()
            Permission(name="Sponsor right", code='SPON').save()
            Permission(name="Stats access", code='STAT').save()
            Permission(name="Child stats access", code="STCH").save()
            Permission(name="Family stat access", code="STFA").save()
            Permission(name="Wish review", code="WISR").save()
            Permission(name="Access to library stats", code="STAL").save()
            Permission(name="Change genre or album description", code="DESC").save()
            Permission(name="Tag edition", code="TAGE").save()
            Permission(name="Upload aproval", code="UPAP").save()
            Permission(name="All stats", code="STAA").save()
            Permission(name="Access to adminView", code="ADMV").save()
            Permission(name="Edit user group", code="GRPE").save()
            Permission(name="Access to whole family tree", code="FTAL").save()
            Permission(name="Library management", code="LIBR").save()
            Permission(name="Grant admin privileges", code="GAPR").save()
            Permission(name="Coin gift", code="COIN").save()
            logger.info('Generated default permissions.')

    @staticmethod
    ## This function creates the application configuration in database.
    def _generateApplicationConfiguration():
        if ApplicationConfiguration.objects.all().count() == 1:
            return
        if ApplicationConfiguration.objects.all().count() > 1:
            ApplicationConfiguration.objects.all().delete()
        appConf = ApplicationConfiguration()
        appConf.defaultGroup = Group.objects.get(rank=1)
        appConf.save()
