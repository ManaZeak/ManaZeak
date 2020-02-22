import os

from django.utils.html import strip_tags

from app.models import Library
from app.src.services.collections.library.librarySatusHelper import LibraryStatusHelper
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
    def checkFolder(folderPath, user):
        if not os.path.isdir(folderPath):
            raise UserException(ErrorEnum.DIR_NOT_FOUND, user)

    @staticmethod
    ## Indexes all the tracks contained in the library
    #   @param library the library to index
    #   @return the table with the mp3 files and the flac files
    def indexFileInLibrary(path):
        mp3Files = []
        flacFiles = []
        # Going through all the files of the library.
        for root, _, files in os.walk(path):
            for file in files:
                if file.lower().endswith('.mp3'):
                    mp3Files.append(os.path.join(root, file))

                if file.lower().endswith('.flac'):
                    flacFiles.append(os.path.join(root, file))
        # If there is no file throw an exception
        if len(mp3Files) == 0 and len(flacFiles) == 0:
            raise UserException(ErrorEnum.EMPTY_LIBRARY, None)
        # return the track found
        return mp3Files, flacFiles

    @staticmethod
    ## Get a library from it's id in the database.
    #   @param libraryId the library id to fetch.
    #   @return a library object.
    def getLibraryFromId(libraryId):
        # The library doesn't exist
        if Library.objects.filter(id=libraryId).count() != 1:
            raise UserException(ErrorEnum.DB_ERROR, None)
        return Library.objects.get(id=libraryId)

    @staticmethod
    ## Delete a library and all the associated objects.
    #   @param library the library object to delete.
    def deleteLibrary(library, scanStatus):
        # Deleting the scan status associated to the library
        scanStatus.delete()
        playlist = library.playlist
        library.delete()
        # Deleting the playlist created by the library
        PlayListHelper.deletePlaylist(playlist)

    @staticmethod
    ## Cancel all the operation done in the library creation if the function encountered an error.
    #   @param library the library to abort.
    #   @param exception the exception raised by the processing.
    def abortLibraryInitialScan(library, exception):
        # The library hasn't been created nothing to rollback.
        if library is None:
            return
        # The library has been created, checking if the scan status object has been created
        scanStatus = LibraryStatusHelper.getLibraryScanStatus(library)
        if exception.errorType == ErrorEnum.SCAN_IN_PROGRESS:
            return  # Nothing to do, a scan is already in progress
        # Canceling the failed scan
        LibraryStatusHelper.abortLibraryScan(library)
        # Deleting the created library
        LibraryHelper.deleteLibrary(library, scanStatus)
