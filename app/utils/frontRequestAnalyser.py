import json

from app.utils.errorHandler import createStandardStateMessage

from app.utils.errors import ErrorEnum


## @package app.utils.requestHandler
# This package check if the request send by the front is correctly formatted

## Check if a request is correct
def checkRequest(expectRequestMethod, request, caller, expectedKeys=None, user=None):
    # Check if the request has the good method type
    if request.method != expectRequestMethod:
        return _generateError(ErrorEnum.BAD_REQUEST, caller, user)

    # Test the keys of the request
    if request.method == 'POST' and expectedKeys is not None:
        return _checkRequestPOST(request, caller, expectedKeys, user)
    return {
        'DONE': True,
    }


## Check a request of the POST type.
#   @param request the request send by the front
#   @param caller the function that called the analyser
#   @param expectedKeys the key expected to be in the request
#   @param user the user doing the action
def _checkRequestPOST(request, caller, expectedKeys, user):
    # Parsing the request
    parsedRequest = json.loads(request.body)

    # Checking if all the keys are present
    for key in expectedKeys:
        if key not in parsedRequest:
            return _generateError(ErrorEnum.BAD_FORMAT, caller, user)

    # Creating the returning object
    return {
        'DONE': True,
        'DATA': parsedRequest,
    }


## @return Generate a dict containing the error message
def _generateError(errorType, caller, user):
    return {
        'DONE': False,
        'DATA': createStandardStateMessage(False, errorType, caller, user),
    }
