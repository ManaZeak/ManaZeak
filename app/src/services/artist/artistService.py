from django.contrib.auth.decorators import login_required
from django.core.cache import cache

from app.models import Artist
from app.src.constants.cacheNameEnum import CacheNameEnum
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.artist.loader.detailedArtistLoader import DetailArtistLoader
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
        # Getting the artists from the cache.
        jsonAllArtist = cache.get(CacheNameEnum.ALL_RELEASE_ARTISTS)
        if jsonAllArtist is not None:
            return jsonAllArtist
        # Getting the artist from the database and setting it into the cache
        artistsInDb = Artist.objects.filter(location__isnull=False).order_by('name')
        return ArtistService._getArtistJson(artistsInDb, CacheNameEnum.ALL_RELEASE_ARTISTS)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getArtist(request, artistId):
        user = request.user
        # Checking the front request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # The cache key of this artist.
        cacheKey = CacheNameEnum.SINGLE_ARTIST.value + str(artistId)
        artistJson = cache.get(cacheKey)
        if artistJson is None:
            # Getting the artist
            artistLoader = DetailArtistLoader()
            artistLoader.loadDetailArtistWithId(artistId)
            artistJson = artistLoader.detailedArtists.generateJson()
            # Setting the artist into the cache.
            cache.set(cacheKey, artistJson)
        return {
            'ARTIST': artistJson
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
        allArtistJson = cache.get(CacheNameEnum.ALL_ARTISTS)
        if allArtistJson is not None:
            return allArtistJson
        artistsInDb = Artist.objects.all().order_by('name')
        return ArtistService._getArtistJson(artistsInDb, CacheNameEnum.ALL_ARTISTS)

    @staticmethod
    def _getArtistJson(artistsInDb, cacheKey):
        artists = []
        if len(artistsInDb) == 0:
            return {
                'ARTISTS': [],
            }
        for artist in artistsInDb:
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artist)
            artists.append(artistDto.getJsonObject())
        allArtistJson = {
            'ARTISTS': artists,
        }
        cache.set(cacheKey, allArtistJson)
        return allArtistJson
