from django.contrib.auth.decorators import login_required

from app.models import Album
from app.src.dto.album.localLazyAlbum import LocalLazyAlbum
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
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
        # FIXME : add label, Language/country
        user = request.user
        AlbumService._checkPermissionAndRequest(request, user)
        # Getting the album of the user
        if Album.objects.filter(id=albumId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        albumDb = Album.objects.get(id=albumId)
        album = LocalLazyAlbum()
        album.createAlbumFromOrm(albumDb)
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