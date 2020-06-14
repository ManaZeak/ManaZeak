from django.contrib.auth.decorators import login_required

from app.models import Track
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.track.bpm.bpmDtoLoader import BpmDtoLoader
from app.src.services.track.bpm.bpmSetter import BpmSetter
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException

from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## Allows to manipulate the track BPM.
class BpmService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Setting a track bpm.
    def setTrackBpm(request):
        # Getting the user
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.EDIT_TAGS, user)
        # Checking the front request
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['TRACK_ID', 'BPM'])
        # Getting the track to modify.
        track = Track.objects.get(id=response['TRACK_ID'])
        if int(response['BPM']) <= 0:
            raise UserException(ErrorEnum.BAD_REQUEST, user)
        # Setting the BPM in the database.
        track.bpm = int(response['BPM'])
        track.save()
        # Setting the BPM in the track
        BpmSetter.setBpmOnTrack(track.location, track.fileType.id, track.bpm)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Setting a track bpm.
    def getTrackBpm(request, trackId):
        # Getting the user
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Check the front request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Getting the information from track
        return BpmDtoLoader.loadDtoFromTrackId(trackId).generateJson()
