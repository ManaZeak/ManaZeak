import logging

from urllib.parse import quote

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from app.models import Track
from app.src.constants.trackFileTypeEnum import TrackFileTypeEnum
from app.src.dao.track.randomTrackFromArtistGetter import RandomTrackFromArtistGetter
from app.src.dto.track.localLazyTrack import LocalLazyTrack
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.collections.playlist.playlistService import PlaylistService
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


logger = logging.getLogger('django')


## This class is used for the interactions between the user and the tracks.
class TrackService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## This method allows the user to play a track.
    #   @param request the track requested by the user.
    def getTrack(request, trackId):
        user = request.user
        try:
            # Checking the user permission
            PermissionHandler.hasPermission(PermissionEnum.PLAY, user)
            # Checking if the request is correct
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
            # Getting the track from the db
            track = Track.objects.get(id=trackId)
            redirectedResponse = HttpResponse(status=200)
            redirectedResponse['X-Accel-Redirect'] = quote(track.location)
            redirectedResponse['Content-Disposition'] = "inline"
            # Selecting the content type of the audio file.
            if track.fileType.id == TrackFileTypeEnum.MP3.value:
                redirectedResponse['Content-Type'] = 'audio/mpeg'
            elif track.fileType.id == TrackFileTypeEnum.FLAC.value:
                redirectedResponse['Content-Type'] = 'audio/flac'
            else:
                raise UserException(ErrorEnum.BAD_FORMAT, user)
            return redirectedResponse
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, PlaylistService.lazyLoadPlaylist)

    @staticmethod
    ## Fetch a random track of the database.
    #   @param request the request of the front.
    def getRandomTracksFromArtist(artist):
        # Getting a random track from the database.
        randomTrackGetter = RandomTrackFromArtistGetter()
        row = randomTrackGetter.getRandomTrackFromArtist(artist)
        tracksDb = Track.objects.filter(id__in=row)
        tracks = []
        for track in tracksDb:
            tracks.append(LocalLazyTrack.createTrackFromOrm(track))
        return [track.generateJson() for track in tracks]
