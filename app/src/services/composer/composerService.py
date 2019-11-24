from django.contrib.auth.decorators import login_required

from app.models import Artist
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators.frontRequest import FrontRequest

from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This service handle the view containing the composers.
class ComposerService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    # Return a list of all the composers.
    def getAllComposers(request):
        user = request.user
        # Checking the request.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Checking the permission.
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting the artists.
        artistsInDb = Artist.objects.all()
        artists = []
        for artist in artistsInDb:
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artist)
            artists.append(artistDto.getJsonObject())
        return {
            'COMPOSERS': artists,
        }
