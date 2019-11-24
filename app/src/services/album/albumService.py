from django.contrib.auth.decorators import login_required

from app.models import Album
from app.src.dto.album.albumDto import AlbumDto
from app.src.dto.album.localLazyAlbum import LocalLazyAlbum
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.views.mainPage.mainPageHelper import MainPageHelper
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
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
        album.loadAlbumFromOrm(albumId, user)
        return {
            'ALBUM': album.generateJson()
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getRandomAlbum(request):
        user = request.user
        AlbumService._checkPermissionAndRequest(request, user)
        album = MainPageHelper.getRandomAlbums(1)
        albumDb = Album.objects.get(id=album[0]['ALBUM_ID'])
        album = AlbumDto()
        album.loadAlbumFromOrm(albumDb.id, user)
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
