## @package app.utils.errorHandler
# This package handle the errors that can happen during a normal use of the application.
import logging

from django.http import JsonResponse

logger = logging.getLogger('django')


## This class allows to create standard response message to the front
class ErrorHandler(object):

    @staticmethod
    ## This function create a dict containing the default information for server response to the front.
    # This function also log the error.
    #   @param isDone if the think the front asked was done correctly
    #   @param errorType the type of error encounter if any. Is a member of the enum ErrorEnum.
    #   @param caller the function object that called.
    #   @param user the user who encountered the error.
    #   @return a dict ready to be send to the client.
    def createStandardStateMessage(isDone, errorType=None, caller=None, user=None):
        # Logging the error
        if not isDone:
            ErrorHandler._formatLogErrorMessage(errorType, caller, user)
        # Preparing the dict for the response to the front
        if errorType is None:
            return {
                'DONE': isDone,
                'ERROR_KEY': None,
            }
        else:
            return {
                'DONE': isDone,
                'ERROR_KEY': errorType.name,
            }

    @staticmethod
    def generateJsonResponseFromException(exception, caller):
        return JsonResponse(
            ErrorHandler.createStandardStateMessage(False, exception.errorType, caller, exception.user)
        )

    @staticmethod
    ## This function generate a dict containing the default status information
    def generateStatusMessage(isDone, errorType=None, caller=None, user=None):
        # Logging the error
        if errorType is not None:
            ErrorHandler._formatLogErrorMessage(errorType, caller, user)
        return {
            'DONE': isDone,
            'ERROR_KEY': errorType.name,
        }

    @staticmethod
    ## This function create the formatted log for the serer in case of an error.
    #   @param errorType the member of the errorEnum containing the information about it.
    #   @param caller the function that caused the error.
    #   @param user the user if he was logged in.
    def _formatLogErrorMessage(errorType, caller, user):
        message = errorType.value
        message += ' Called by : ' + caller.__name__ + '.'
        if user is not None:
            message += ' By the user : \'' + user.username + '\'.'
        logger.error(message)
