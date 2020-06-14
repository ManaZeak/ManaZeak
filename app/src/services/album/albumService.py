from django.contrib.auth.decorators import login_required

from app.models import Album
from app.src.dto.album.albumDto import AlbumDto
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.random.getter.randomAlbumGetterService import RandomAlbumGetterService
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class AlbumService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the available albums in the database.
    def getAllAlbums(request):
        user = request.user
        AlbumService._checkPermissionAndRequest(request, user)
        # Getting the albums of the database
        albumsInDb = Album.objects.all()
        albums = []
        for album in albumsInDb:
            albumDto = MainPageAlbum()
            albumDto.buildFromOrmAlbum(album)
            albums.append(albumDto.getJsonObject())
        return {
            'ALBUMS': albums
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get information about an album.
    def getAlbum(request, albumId):
        user = request.user
        AlbumService._checkPermissionAndRequest(request, user)
        album = AlbumDto()
        album.loadAlbumFromIdWithOrm(albumId, user)
        return {
            'ALBUM': album.generateJson()
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getRandomAlbum(request):
        user = request.user
        AlbumService._checkPermissionAndRequest(request, user)
        albumDb = RandomAlbumGetterService.getAlbumsSortedByArtist(1)
        album = AlbumDto()
        if albumDb.count() == 1:
            album.loadAlbumFromOrm(albumDb.get())
        return {
            'ALBUM': album.generateJson()
        }

    @staticmethod
    ## Check if the permissions and the request are correct.
    def _checkPermissionAndRequest(request, user):
        # Checking the request of the user
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
