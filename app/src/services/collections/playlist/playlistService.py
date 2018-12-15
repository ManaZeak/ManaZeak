from django.contrib.auth.decorators import login_required

from app.models.collections import Playlist
from app.src.services.collections.playlist.playlistHelper import PlayListHelper
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class PlaylistService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the list of the available playlist for the user.
    def getUserPlaylists(request):
        user = request.user
        try:
            helper = PlayListHelper()
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
            # Getting all the available ordered playlists
            playlists = helper.getOrderedPlaylist(user)
            # Getting all the available playlists and removing the playlist already in the queryset
            playlists = (
                    Playlist.objects.filter(isPublic=True) |
                    Playlist.objects.filter(isLibrary=True) |
                    Playlist.objects.filter(user=user)
            ).exclude(playlists)

        except UserException as e:
            # Handle the errors and send the result to the front
            return ErrorHandler.generateJsonResponseFromException(e, PlaylistService.getUserPlaylists, user)
