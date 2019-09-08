from django.contrib.auth.decorators import login_required

from app.models import Artist
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

## Defines the action of the user interacting with artists.
class ArtistService(object):

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
        artistsInDb = Artist.objects.filter(location__isnull=False)
        artists = []
        for artist in artistsInDb:
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artist)
            artists.append(artistDto.getJsonObject())
        return {
            'ARTISTS': artists,
        }
