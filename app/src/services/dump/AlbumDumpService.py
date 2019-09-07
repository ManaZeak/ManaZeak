from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import Album, Artist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class gives the information about albums.
class AlbumDumpService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Dump all the album of the database.
    #   @param request the request of the user.
    def dumpAllAlbums(request):
        user = request.user
        try:
            # Checking if the request is correct
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
            # Checking the permission of the user
            PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
            # Getting the albums in base.
            albums = Album.objects.all()
            # Generating the json.
            albumsDump = AlbumDumpService._generateJsonForAlbums(albums)
            return JsonResponse({**albumsDump, **ErrorHandler.createStandardStateMessage(True)})
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, AlbumDumpService.dumpAllAlbums, user)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Exports all the album for the given artist id.
    #   @param request the request of the user.
    #   @param artistId the id of the artist.
    def dumpAlbumForArtist(request, artistId):
        user = request.user
        try:
            # Checking the user request and the permission
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
            PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
            # Checking the artist id
            if Artist.objects.filter(id=artistId).count() == 0:
                raise UserException(ErrorEnum.DB_ERROR, user)
            # Getting all the albums for the artist
            albums = Album.objects.filter(releaseArtist=artistId)
            albumsDump = AlbumDumpService._generateJsonForAlbums(albums)
            return JsonResponse({**albumsDump, **ErrorHandler.createStandardStateMessage(True)})
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, AlbumDumpService.dumpAlbumForArtist, user)

    @staticmethod
    ## Generate the JSON for an array of albums.
    #   @param albums an array of albums.
    def _generateJsonForAlbums(albums):
        # Generating the JSON
        albumsInfo = []
        for album in albums:
            albumsInfo.append({
                'TITLE': album.title,
                'ARTIST': album.releaseArtist.name,
                'PRODUCER': AlbumDumpService._getProducerName(album.producer),
                'DESCRIPTION': album.description,
                'YEAR': album.year,
            })
        return {'RESULT': albumsInfo}

    @staticmethod
    ## Get the JSON object for a producer.
    #   @param producer the producer object linked to an album.
    def _getProducerName(producer):
        if producer is None:
            return None
        return producer.name
