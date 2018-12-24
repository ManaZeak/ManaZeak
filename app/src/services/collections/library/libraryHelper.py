from django.utils.html import strip_tags

from app.models import Library
from app.src.services.collections.playlist.playlistHelper import PlayListHelper

## This class contains some tools for library operation in the service
class LibraryHelper(object):

    @staticmethod
    ## Create a new library and save it into the database from a user request.
    #   @param response the sanitised request json.
    #   @return a dict containing the playlist information.
    def createAndSaveLibraryFromRequest(response, user):
        dirPath = response['URL']
        if dirPath.endswith("/"):
            dirPath = dirPath[:-1]
        # Creates the playlist associated with the library
        playlist = PlayListHelper.createPlaylist(user, strip_tags(response['NAME']), True, True)

        # Creates the library
        library = Library()
        library.playlist = playlist
        library.path = dirPath
        library.save()
        return {
            'INFO': PlayListHelper.getPlaylistInformation(playlist)
        }
