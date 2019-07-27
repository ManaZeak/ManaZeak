## This class controls the playback of the application.
from django.http import JsonResponse

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.playback.playbackHelper import PlaybackHelper
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class PlaybackService(object):

    @staticmethod
    ## Fetch a random track of the database.
    #   @param request the request of the front.
    def getRandomTrack(request):
        user = request.user
        try:
            result = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, ['PLAYLIST_ID'])
            PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
            track_id = PlaybackHelper.getRandomTrack(result['PLAYLIST_ID'])
            if track_id is None:
                raise UserException(ErrorEnum.DB_ERROR)
            response = {
                'TRACK_ID': track_id,
            }
            return JsonResponse(
                {**response, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            return JsonResponse(
                ErrorHandler.createStandardStateMessage(
                    False, e.errorType, PlaybackService.getRandomTrack, user)
            )
