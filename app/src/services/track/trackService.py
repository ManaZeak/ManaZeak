from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from app.models import Track
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.collections.playlist.playlistService import PlaylistService
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class is used for the interactions between the user and the tracks.
class TrackService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## This method allows the user to play a track.
    #   @param request the track requested by the user.
    def getTrack(request):
        user = request.user
        try:
            # Checking the user permission
            PermissionHandler.hasPermission(PermissionEnum.PLAY, user)
            # Checking if the request is correct
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, ['TRACK_ID'])
            trackId = int(response['TRACK_ID'])
            # Getting the track from the db
            track = Track.objects.get(id=trackId)
            redirectedResponse = HttpResponse()
            redirectedResponse['X-Accel-Redirect'] = track.location
            return redirectedResponse
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, PlaylistService.lazyLoadPlaylist, user)
