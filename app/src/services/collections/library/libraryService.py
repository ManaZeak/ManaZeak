import logging
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.collections.library.libraryHelper import LibraryHelper
from app.src.services.collections.library.libraryIntegrationService import LibraryIntegrationService
from app.src.services.collections.library.libraryRescanHelper import LibraryRescanHelper
from app.src.services.collections.library.librarySatusHelper import LibraryStatusHelper
from app.src.services.collections.playlist.playlistHelper import PlayListHelper
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

loggerDjango = logging.getLogger('django')
loggerScan = logging.getLogger('scan')


## This class is used to manage the libraries of the application
class LibraryService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Rescan a library
    def rescanLibrary(request):
        # Getting the user
        user = request.user
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
        # Checking if the request is correct
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['LIBRARY_ID'])
        # Getting the library id
        libraryId = response['LIBRARY_ID']
        # Getting the library from the database
        library = LibraryHelper.getLibraryFromId(libraryId, user)
        # Checking if the given folder of the library is existing
        LibraryHelper.checkFolder(library.path, user)
        rescan = LibraryRescanHelper()
        rescan.scanModifiedFiles(library.path)
        loggerScan.info("Found " + str(rescan.newFiles) + " new files and " + str(rescan.modifiedFiles)
                        + " modified files.")
        # Creating the integration service for tracks and preparing the process (fork)
        LibraryIntegrationService.launchThreadedFileScan(library, rescan.mp3Files, rescan.flacFiles, rescan.newFiles,
                                                         rescan.modifiedFiles, rescan.libScan, False)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Creates a library for all the users (only the admin can perform this)
    def createLibrary(request):
        user = request.user
        # Checking the request from the front and getting the json object
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['URL', 'NAME'])
        # Checking if the user has the permission to do this action
        PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
        # Checking if the directory given exists
        dirPath = response['URL']
        LibraryHelper.checkFolder(dirPath, user)
        # Check if the library has sounds in it
        LibraryHelper.indexFileInLibrary(dirPath)
        # Saving the library into the database and getting its info
        data = LibraryHelper.createAndSaveLibraryFromRequest(response, user)
        loggerDjango.info('Created the library : ' + strip_tags(response['NAME']))
        return data

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Scan for the first time a library.
    #   This function scan all the files in the library and insert them into the database via a csv file.
    def initialScan(request):
        user = request.user
        library = None
        try:
            loggerDjango.info('Asked for the initial scan')
            # Checking the request from the front and getting the json object
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['LIBRARY_ID'])
            # Check if the user has the permission to do this action
            PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
            libraryId = response['LIBRARY_ID']
            # Checking if the library exists.
            library = LibraryHelper.getLibraryFromId(libraryId, user)
            # Setting the library flag as in scan -> locking all the other functions altering the library
            LibraryStatusHelper.startLibraryScan(library)
            # Creating the new library scan
            libScan = LibraryStatusHelper.createLibraryScan()
            # Checking if the given folder of the library is existing
            LibraryHelper.checkFolder(library.path, user)
            loggerScan.info('Starting indexing files.')
            # Indexing the audio files of the library
            mp3Files, flacFiles = LibraryHelper.indexFileInLibrary(library.path)
            # Creating the integration service for tracks and preparing the process (fork)
            LibraryIntegrationService.launchThreadedFileScan(library, mp3Files, flacFiles,
                                                             len(mp3Files) + len(flacFiles), 0, libScan, True)
            # Return a standard response, the front has to check if the scan is successful
            return JsonResponse(ErrorHandler.createStandardStateMessage(True))
        except UserException as e:
            # Rollback the previous operation done before
            LibraryHelper.abortLibraryInitialScan(library, e)
            # Handle the errors and send the result to the front
            return ErrorHandler.generateJsonResponseFromException(e, LibraryService.initialScan)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Delete the given library
    #   @param request a GET request from the front
    #   @param libraryId the id of the library
    def deleteLibrary(request, libraryId):
        user = request.user
        # Checking if the method is called correctly and the user has the permissions
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
        if libraryId is None:
            raise UserException(ErrorEnum.VALUE_ERROR, user)
        library = LibraryHelper.getLibraryFromId(libraryId, user)
        loggerDjango.info('Deleting the library : ' + library.playlist.name)
        LibraryHelper.deleteLibrary(library, LibraryStatusHelper.getLibraryScanStatus(library))

    @staticmethod
    def getLibraryScanStatus(request):
        user = request.user
        try:
            # Checking if the front send a correct
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['PLAYLIST_ID'])
            libraryId = PlayListHelper.getPlaylistFromId(response['PLAYLIST_ID'])
            scanStatus = LibraryStatusHelper.getLibraryScanStatus(libraryId)
            data = {
                'PROGRESS': round(scanStatus.totalTracks / scanStatus.processedTrack * 100)
            }
            return JsonResponse(
                {{**data, **ErrorHandler.generateStatusMessage(scanStatus.isScanned)}}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, LibraryService.getLibraryScanStatus)
