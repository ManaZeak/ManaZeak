from django.contrib.auth.decorators import login_required

from app.models import Artist
from app.src.dto.artist.localLazyAlbumArtist import LocalLazyAlbumArtist
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

## Defines the action of the user interacting with artists.
class ArtistService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the artists available in the database.
    def getAllArtists(request):
        user = request.user
        # Checking the request.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission.
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artists.
        artistsInDb = Artist.objects.filter(location__isnull=False)
        artists = []
        for artist in artistsInDb:
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artist)
            artists.append(artistDto.getJsonObject())
        return {
            'ARTISTS': artists,
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the album and the track of an artist.
    def getArtist(request, artistId):
        user = request.user
        # Checking the front request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artist in the database
        if Artist.objects.filter(id=artistId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        artist = Artist.objects.get(id=artistId)
        # Getting the album of the artist in the database.
        albums = LocalLazyAlbumArtist()
        albums.addArtistFromOrm(artist)
        return {
            'ARTIST': albums.generateJson(),
        }

