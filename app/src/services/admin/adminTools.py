from django.http import JsonResponse

from app.models import TrackInScopeStats, Track, Genre, Library, Playlist, Album, Artist
from app.models.collections import LibraryScanStatus
from app.models.track import Producer

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException


## Gives some tools to the admin to execute special actions.
class AdminTools(object):

    @staticmethod
    @FrontRequest
    ## Deletes the content of the database.
    def resetInstance(request):
        user = request.user
        # Checking the user permissions
        PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
        # Deleting the tables
        LibraryScanStatus.objects.all().delete()
        Library.objects.all().delete()
        Playlist.objects.all().delete()
        Track.objects.all().delete()
        Genre.objects.all().delete()
        Album.objects.all().delete()
        Artist.objects.all().delete()
        TrackInScopeStats.objects.all().delete()
        Producer.objects.all().delete()
