from app.models import Album
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class AlbumService(object):

    @staticmethod
    @FrontRequest
    ## Get all the available albums in the database.
    def getAllAlbums(request):
        user = request.user
        # Checking the request of the user
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
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
