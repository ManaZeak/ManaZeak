from django.contrib.auth.decorators import login_required

from app.models import Artist
from app.src.dto.artist.artistDto import ArtistDto
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.track.trackService import TrackService
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## Defines the action of the user interacting with artists.
class ArtistService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the artists available in the database.
    def getAllReleaseArtists(request):
        user = request.user
        # Checking the request.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission.
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artists.
        artistsInDb = Artist.objects.filter(location__isnull=False).order_by('name')
        return ArtistService._getArtistJson(artistsInDb)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the album and the track of an artist.
    def getReleaseArtist(request, artistId):
        user = request.user
        # Checking the front request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artist
        artist = ArtistDto()
        artist.loadArtistFromDb(artistId)
        return {
            'ARTIST': artist.generateJson(),
            'RANDOM_TRACKS': TrackService.getRandomTracksFromArtist(artistId, 5)
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getArtist(request, artistId):
        # FIXME : ajouter les albums liés.
        user = request.user
        # Checking the front request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artist
        artist = ArtistDto()
        artist.loadArtistFromDb(artistId)
        return {
            'ARTIST': artist.generateJson(),
            'RANDOM_TRACKS': TrackService.getRandomTracksFromArtist(artistId, 5)
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getAllArtists(request):
        user = request.user
        # Checking the request.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission.
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artists.
        artistsInDb = Artist.objects.all().order_by('name')
        return ArtistService._getArtistJson(artistsInDb)

    @staticmethod
    def _getArtistJson(artistsInDb):
        artists = []
        if len(artistsInDb) == 0:
            return {
                'ARTISTS': [],
            }
        for artist in artistsInDb:
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artist)
            artists.append(artistDto.getJsonObject())
        return {
            'ARTISTS': artists,
        }
