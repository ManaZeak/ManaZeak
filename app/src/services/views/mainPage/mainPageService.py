import logging

from django.contrib.auth.decorators import login_required


from app.models import Playlist
from app.src.services.collections.playlist.playlistHelper import PlayListHelper
from app.src.services.views.mainPage.mainPageHelper import MainPageHelper
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

loggerDjango = logging.getLogger('django')

## Generate response for the main page of the application.
class MainPageService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all libraries and playlist of the user.
    def getLibrariesAndPlaylistForUser(request):
        user = request.user
        # Checking if the user request is correct.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Get the libraries.
        librariesInBase = Playlist.objects.filter(isLibrary=True)
        libs = []
        PlayListHelper.getPlaylistsInformation(librariesInBase, libs)
        # Get the user playlist.
        playlistsInBase = Playlist.objects.filter(isLibrary=False)
        playlists = []
        PlayListHelper.getPlaylistsInformation(playlistsInBase, playlists)
        return {
            'LIBRARY': libs,
            'PLAYLISTS': playlists,
        }

    @staticmethod
    @FrontRequest
    ## Return a selection of randoms objects for the main age display.
    #   @param request the front request.
    def getRandomObjects(request):
        user = request.user
        loggerDjango.info("Getting the main page.")
        # Checking the response from the front.
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['NUMBER_OF_ELEMENT'])
        # If the number of element is too big, reject the request
        if response['NUMBER_OF_ELEMENT'] > 10:
            raise UserException(ErrorEnum.SUSPICIOUS_OPERATION, user)
        numberOfElements = response['NUMBER_OF_ELEMENT']
        producers = []
        return {
            'RELEASE_ARTISTS': MainPageHelper.getRandomReleaseArtists(numberOfElements),
            'GENRES': MainPageHelper.getRandomGenres(numberOfElements),
            'ALBUMS': MainPageHelper.getRandomAlbums(numberOfElements),
            'PRODUCERS': producers,
            'COMPOSERS': MainPageHelper.getRandomComposer(numberOfElements),
            'ARTISTS': MainPageHelper.getRandomArtists(numberOfElements),
        }
