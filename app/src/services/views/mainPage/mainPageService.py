from django.contrib.auth.decorators import login_required


from django.http import JsonResponse

from app.models import Playlist
from app.src.services.collections.playlist.playlistHelper import PlayListHelper
from app.src.services.views.mainPage.mainPageHelper import MainPageHelper
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## Generate response for the main page of the application.
class MainPageService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Get all libraries and playlist of the user.
    def getLibrariesAndPlaylistForUser(request):
        user = request.user
        try:
            # Checking if the user request is correct.
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
            # Get the libraries.
            librariesInBase = Playlist.objects.filter(isLibrary=True)
            libs = []
            PlayListHelper.getPlaylistsInformation(librariesInBase, libs)
            # Get the user playlist.
            playlistsInBase = Playlist.objects.filter(isLibrary=False)
            playlists = []
            PlayListHelper.getPlaylistsInformation(playlistsInBase, playlists)
            data = {
                'LIBRARY': libs,
                'PLAYLISTS': playlists,
            }
            return JsonResponse(
                {{**data, **ErrorHandler.createStandardStateMessage(True)}}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, MainPageService.getLibrariesAndPlaylistForUser,
                                                                  user)

    @staticmethod
    def getRandomObjects(request):
        user = request.user
        try:
            # Checking the response from the front.
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, ['NUMBER_OF_ELEMENT'])
            # If the number of element is too big, reject the request
            if response['NUMBER_OF_ELEMENT'] > 10:
                raise UserException(ErrorEnum.SUSPICIOUS_OPERATION)
            artists = MainPageHelper.getRandomArtists(response['NUMBER_OF_ELEMENT'])
            albums = []
            genres = []
            producers = []
            data = {
                'ARTISTS': artists,
                'GENRES': genres,
                'ALBUMS': albums,
                'PRODUCERS': producers,
            }
            return JsonResponse(
                {{**data, **ErrorHandler.createStandardStateMessage(True)}}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, MainPageService.getRandomObjects, user)
