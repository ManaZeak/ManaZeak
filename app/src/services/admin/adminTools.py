from app.models import TrackInScopeStats, Track, Genre, Library, Playlist, Album, Artist, RandomAlbumSortedByArtist, \
    RandomTrackSortedByName, RandomGenreSortedByName
from app.models.collections import LibraryScanStatus
from app.models.random import RandomArtistSortedByName, RandomTrackSortedByArtist
from app.models.track import Producer, Cover

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators.frontRequest import FrontRequest


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
        objectsToDelete = [LibraryScanStatus, Library, RandomAlbumSortedByArtist, RandomArtistSortedByName,
                           RandomTrackSortedByName, RandomGenreSortedByName, RandomTrackSortedByArtist,
                           Playlist, Track, Genre, Album, Artist, TrackInScopeStats, Cover, Producer]
        for table in objectsToDelete:
            table.objects.all().delete()
