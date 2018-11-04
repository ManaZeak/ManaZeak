## @package app.utils.errorHandler
# This package handle the errors that can happen during a normal use of the application.

## This class allows to create standard response message to the front
class ErrorHandler:
    ## This function create a dict containing the default information for server response to the front.
    #   @param isDone if the think the front asked was done correctly
    #   @param errorType the type of error encounter if any. Is a member of the enum ErrorEnum.
    #   @param caller the function object that called.
    #   @param user the user who encountered the error.
    #   @return a dict ready to be send to the client.
    @staticmethod
    def createStandardStateMessage(isDone, errorType, caller, user=None):
        pass  # FIXME: to be implemented
