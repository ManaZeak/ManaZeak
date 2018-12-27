import os

from django.utils.html import strip_tags

from app.models import Library
from app.src.services.collections.playlist.playlistHelper import PlayListHelper

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


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

    @staticmethod
    ## Check if a folder exists, throw an exception if it doesn't.
    #   @param folderPath the path to the folder to check
    def checkFolder(folderPath):
        if not os.path.isdir(folderPath):
            raise UserException(ErrorEnum.DIR_NOT_FOUND)

    @staticmethod
    ## Indexes all the tracks contained in the library
    #   @param library the library to index
    #   @return the table with the mp3 files and the flac files
    def indexFileInLibrary(path):
        mp3Files = []
        flacFiles = []
        # Going through all the files of the library.
        for root, dirs, files in os.walk(path):
            for file in files:
                if file.lower().endswith('.mp3'):
                    mp3Files.append(os.path.join(root, file))

                if file.lower().endswith('.flac'):
                    flacFiles.append(os.path.join(root, file))
        # If there is no file throw an exception
        if len(mp3Files) == 0 and len(flacFiles) == 0:
            raise UserException(ErrorEnum.EMPTY_LIBRARY)
        # return the track found
        return mp3Files, flacFiles
