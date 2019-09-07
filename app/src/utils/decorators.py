from django.http import JsonResponse

from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException

## Decorator used to handle the request of the front.
#   This is used to handle the errors
def frontRequest(func):

    ## The default function that will be called.
    def inner1(*args, **kwargs):
        try:
            returnValue = func(*args, **kwargs)
            return JsonResponse({**returnValue, **ErrorHandler.createStandardStateMessage(True)})
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, func)
