from builtins import staticmethod

from django.contrib.auth.decorators import login_required

from app.models import Artist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class is used to export data from the artist table.
class ArtistDumpService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Export all the artists information. This action can only be performed by the admin.
    #   @param request the front request.
    def dumpAllArtists(request):
        user = request.user
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
        # Getting all the artists available in the database.
        artists = Artist.objects.all()
        return ArtistDumpService._generateJsonForArtists(artists)

    @staticmethod
    ## Generate the JSON for an array of artists.
    #   @param artists the artist to convert into JSON.
    def _generateJsonForArtists(artists):
        # For each, generating the json
        artistsInfo = []
        for artist in artists:
            artistsInfo.append({
                'NAME': artist.name,
                'REAL_NAME': artist.realName,
                'DESCRIPTION': artist.description
            })
        return {'RESULT': artistsInfo}
