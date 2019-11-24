from django.http import JsonResponse

from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException

## Decorator used to handle the request of the front.
#   This is used to handle the errors
class FrontRequest(object):

    def __init__(self, func):
        self.func = func

    ## The default function that will be called.
    def __call__(self, *args, **kwargs):
        try:
            returnValue = self.func(*args, **kwargs)
            if returnValue is None:
                return JsonResponse(ErrorHandler.createStandardStateMessage(True))
            return JsonResponse({**returnValue, **ErrorHandler.createStandardStateMessage(True)})
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, self.func)
