import logging

from django.core.management import BaseCommand

from app.models import Group, ApplicationConfiguration, Permissions, FileType
from app.models.settings import Config, SuggestionStatus
from app.src.config.configEnum import ConfigEnum

logger = logging.getLogger('django')


## This class is a command that can be launched from manage.py
class Command(BaseCommand):

    ## Initialise all the db objects if needed
    def handle(self, *args, **options):
        logger.info('Inserting default object into the database')
        self._permissionGenerator()
        self._groupGenerator()
        self._generateApplicationConfiguration()
        self._generateDefaultFileTypes()
        self._generateDefaultConf()
        self._generateConfigSuggestion()
        logger.info('Inserted all the default objects into the database')

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
                self._fillDefaultPermissions(group)
            logger.info('Associated default permissions to groups.')

    @staticmethod
    ## Add the permission to a group given the user rank
    #   @param group the Group object of a user
    def _fillDefaultPermissions(group):
        if group.rank > 0:
            group.permissions.add(Permissions.objects.get(code='LOGI'))
            group.permissions.add(Permissions.objects.get(code='PLAY'))
            group.permissions.add(Permissions.objects.get(code='PLST'))
            group.permissions.add(Permissions.objects.get(code='DOWN'))
        if group.rank > 1:
            group.permissions.add(Permissions.objects.get(code='WISH'))
            group.permissions.add(Permissions.objects.get(code='TAGS'))
            group.permissions.add(Permissions.objects.get(code='UPLD'))
            group.permissions.add(Permissions.objects.get(code='SPON'))
            group.permissions.add(Permissions.objects.get(code='STAT'))
        if group.rank > 2:
            group.permissions.add(Permissions.objects.get(code='STCH'))
            group.permissions.add(Permissions.objects.get(code='STFA'))
            group.permissions.add(Permissions.objects.get(code='WISR'))
            group.permissions.add(Permissions.objects.get(code='STAL'))
        if group.rank > 3:
            group.permissions.add(Permissions.objects.get(code='DESC'))
            group.permissions.add(Permissions.objects.get(code='TAGE'))
            group.permissions.add(Permissions.objects.get(code='UPAP'))
            group.permissions.add(Permissions.objects.get(code='STAA'))
            group.permissions.add(Permissions.objects.get(code='ADMV'))
            group.permissions.add(Permissions.objects.get(code='GRPE'))
            group.permissions.add(Permissions.objects.get(code='FTAL'))
            group.permissions.add(Permissions.objects.get(code='LIBR'))
        if group.rank > 4:
            group.permissions.add(Permissions.objects.get(code='GAPR'))
            group.permissions.add(Permissions.objects.get(code='COIN'))

    @staticmethod
    ## Generate the default permissions for the application
    def _permissionGenerator():
        if Permissions.objects.all().count() == 0:
            Permissions(name='Login', code='LOGI').save()
            Permissions(name='Music listening', code='PLAY').save()
            Permissions(name='Playlist management', code='PLST').save()
            Permissions(name='Download', code='DOWN').save()
            Permissions(name='Wish creation', code='WISH').save()
            Permissions(name='Tag submission', code='TAGS').save()
            Permissions(name='Upload file', code='UPLD').save()
            Permissions(name='Sponsor right', code='SPON').save()
            Permissions(name='Stats access', code='STAT').save()
            Permissions(name='Child stats access', code='STCH').save()
            Permissions(name='Family stat access', code='STFA').save()
            Permissions(name='Wish review', code='WISR').save()
            Permissions(name='Access to library stats', code='STAL').save()
            Permissions(name='Change genre or album description', code='DESC').save()
            Permissions(name='Tag edition', code='TAGE').save()
            Permissions(name='Upload aproval', code='UPAP').save()
            Permissions(name='All stats', code='STAA').save()
            Permissions(name='Access to adminView', code='ADMV').save()
            Permissions(name='Edit user group', code='GRPE').save()
            Permissions(name='Access to whole family tree', code='FTAL').save()
            Permissions(name='Library management', code='LIBR').save()
            Permissions(name='Grant admin privileges', code='GAPR').save()
            Permissions(name='Coin gift', code='COIN').save()
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

    @staticmethod
    ## This function inserts the suggestions of the user.
    def _generateConfigSuggestion():
        if SuggestionStatus.objects.all().count() == 0:
            SuggestionStatus(label='Submitted', id=1).save(force_insert=True)
            SuggestionStatus(label='Accepted', id=2).save(force_insert=True)
            SuggestionStatus(label='Refused', id=3).save(force_insert=True)

    @staticmethod
    ## This function generates the default file types the application can handle.
    def _generateDefaultFileTypes():
        if FileType.objects.all().count() > 0:
            return
        FileType(name='mp3', id=1).save(force_insert=True)
        FileType(name='flac', id=2).save(force_insert=True)

    @staticmethod
    ## This function generates the default configuration of the application.
    def _generateDefaultConf():
        logger.info('Generating default conf.')
        insertAll = False
        if Config.objects.all().count() == 0:
            insertAll = True
        if insertAll or Config.objects.filter(code=ConfigEnum.TRACK_IN_LAZY.value).count() == 0:
            configObject = Config()
            configObject.code = ConfigEnum.TRACK_IN_LAZY.value
            configObject.value = '5000'
            configObject.save()
