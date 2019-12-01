from django.contrib.auth.decorators import login_required

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.playback.playbackHelper import PlaybackHelper
from app.src.services.random.getter.randomTrackGetterService import RandomTrackGetterService
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## This class controls the playback of the application.
class PlaybackService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Fetch a random track of the database.
    #   @param request the request of the front.
    def getRandomTrack(request):
        user = request.user
        # Checking the front request
        result = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['PLAYLIST_ID'])
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting a random track from the database.
        trackId = RandomTrackGetterService.getRandomTrackSortedByName(1).first().id
        if trackId is None:
            raise UserException(ErrorEnum.DB_ERROR, user)
        return {
            'TRACK_ID': trackId,
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Fetch a shuffled first track of an album
    def getShuffleAlbum(request):
        user = request.user
        # Checking the front request
        result = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['PLAYLIST_ID'])
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Getting a shuffled first album track from the database.
        playlistId = result['PLAYLIST_ID']
        trackId = PlaybackHelper.getShuffledFirstAlbumTrack(playlistId, user)
        # Insert in the database the track selected.
        PlaybackHelper.addTrackToAlbumShuffle(playlistId, trackId, user)
        PlaybackHelper.checkIfAlbumShuffleIsFinished(playlistId, user)
        # Return to the front the selected track
        return {
            'TRACK_ID': trackId,
        }
