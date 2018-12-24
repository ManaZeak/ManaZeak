import logging

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse

from app.models.collections import Playlist
from app.src.services.collections.playlist.playlistHelper import PlayListHelper
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

logger = logging.getLogger('django')

## This class is used to manage the playlists inside the application
class PlaylistService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the list of the available playlist for the user.
    #   @param request the request send by the front
    #   @return the information about the available playlists for the user
    def getUserPlaylists(request):
        user = request.user
        try:
            helper = PlayListHelper()
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
            # Getting all the available ordered playlists
            playlists = helper.getOrderedPlaylist(user)
            # Getting the information about the ordered playlists
            playlistsInfo = []
            helper.getPlaylistsInformation(playlists, playlistsInfo)
            # Getting all the available playlists
            playlists = (
                    Playlist.objects.filter(isPublic=True) |
                    Playlist.objects.filter(isLibrary=True) |
                    Playlist.objects.filter(owner=user)
            )
            # removing the playlist already in the queryset if there is any
            if len(playlists) > 0:
                playlists.exclude(id__in=[pl.id for pl in playlists])

            helper.getPlaylistsInformation(playlists, playlistsInfo)
            # FIXME: change COLLECTION to COLLECTIONS
            # Prepare the information and send it to the front
            data = {
                'COLLECTION': playlistsInfo
            }
            return JsonResponse(
                {**data, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            # Handle the errors and send the result to the front
            return ErrorHandler.generateJsonResponseFromException(e, PlaylistService.getUserPlaylists, user)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send a request to the nginx server to send a song to the user
    def getTrack(request, path):
        logger.info('asked for :' + path)
        response = HttpResponse()
        response['X-Accel-Redirect'] = '/library/%s' % path
        return response
