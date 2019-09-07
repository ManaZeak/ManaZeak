from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.playback.playbackHelper import PlaybackHelper
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class controls the playback of the application.
class PlaybackService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Fetch a random track of the database.
    #   @param request the request of the front.
    def getRandomTrack(request):
        user = request.user
        try:
            # Checking the front request
            result = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['PLAYLIST_ID'])
            PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
            # Getting a random track from the database.
            track_id = PlaybackHelper.getRandomTrack(result['PLAYLIST_ID'])
            if track_id is None:
                raise UserException(ErrorEnum.DB_ERROR, user)
            response = {
                'TRACK_ID': track_id,
            }
            # Sending the track to the front.
            return JsonResponse(
                {**response, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, PlaybackService.getRandomTrack, user)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Fetch a shuffled first track of an album
    def getShuffleAlbum(request):
        user = request.user
        try:
            # Checking the front request
            result = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['PLAYLIST_ID'])
            PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
            # Getting a shuffled first album track from the database.
            playlistId = result['PLAYLIST_ID']
            trackId = PlaybackHelper.getShuffledFirstAlbumTrack(playlistId)
            # Insert in the database the track selected.
            PlaybackHelper.addTrackToAlbumShuffle(playlistId, trackId, user)
            PlaybackHelper.checkIfAlbumShuffleIsFinished(playlistId, user)
            # Return to the front the selected track
            return JsonResponse(
                {**{'TRACK_ID': trackId}, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, PlaybackService.getShuffleAlbum, user)
