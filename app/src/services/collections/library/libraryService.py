import logging

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Library
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.collections.library.libraryHelper import LibraryHelper
from app.src.services.collections.library.librarySatusHelper import LibraryStatusHelper
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum

logger = logging.getLogger('django')


## This class is used to manage the libraries of the application
class LibraryService(object):

    @login_required(redirect_field_name='', login_url='app:login')
    ## Rescan a library
    def rescanLibrary(self, request):
        pass  # FIXME: to be implemented

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Creates a library for all the users (only the admin can perform this)
    def createLibrary(request):
        user = request.user
        try:
            # Checking the request from the front and getting the json object
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, ['URL', 'NAME'])
            # Checking if the user has the permission to do this action
            PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
            # Checking if the directory given exists
            dirPath = response['URL']
            LibraryHelper.checkFolder(dirPath)
            # Check if the library has sounds in it
            LibraryHelper.indexFileInLibrary(dirPath)
            # Saving the library into the database and getting its info
            data = LibraryHelper.createAndSaveLibraryFromRequest(response, user)
            logger.info('Created the library : ' + strip_tags(response['NAME']))
            # Returning a standard response to the front with the library info
            return JsonResponse(
                {**data, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            # Handle the errors and send the result to the front
            return ErrorHandler.generateJsonResponseFromException(e, LibraryService.createLibrary, user)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Scan for the first time a library.
    #   This function scan all the files in the library and insert them into the database via a csv file.
    def initialScan(request):
        user = request.user
        try:
            # Checking the request from the front and getting the json object
            response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, ['LIBRARY_ID'])
            # Check if the user has the permission to do this action
            PermissionHandler.checkPermission(PermissionEnum.LIBRARY_MANAGEMENT, user)
            libraryId = response['LIBRARY_ID']
            # Raising an error if the library isn't found
            if Library.objects.filter(id=libraryId) == 0:
                raise UserException(ErrorEnum.DB_ERROR)
            # Getting the library object
            library = Library.objects.get(id=libraryId)
            # Setting the library flag as in scan -> locking all the other functions altering the library
            LibraryStatusHelper.startLibraryScan(library)
            # Checking if the given folder of the library is existing
            LibraryHelper.checkFolder(library.path)
            # Indexing the audio files of the library
            mp3files, flacFiles = LibraryHelper.indexFileInLibrary(library.path)
            # Launching the process of integrating the track into the database.
            # This is process to avoid the timeout from the web server.

        except UserException as e:
            # Handle the errors and send the result to the front
            return ErrorHandler.generateJsonResponseFromException(e, LibraryService.initialScan, user)
