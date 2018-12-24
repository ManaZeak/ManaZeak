import logging
import os

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.src.services.collections.library.libraryHelper import LibraryHelper
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
            # Checking if the directory given exists
            dirPath = response['URL']
            if not os.path.isdir(dirPath):
                raise UserException(ErrorEnum.DIR_NOT_FOUND)
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
