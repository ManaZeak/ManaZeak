import json
from builtins import staticmethod

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler


## @package app.utils.requestHandler
# This package check if the request send by the front is correctly formatted


## This class is used to verify the request coming from the front is correctly formatted.
from app.src.utils.exceptions.userException import UserException


class FrontRequestChecker:

    @staticmethod
    ## Check if a request is correct. Throws an exception if an unexpected value was encountered.
    #   @param expectedRequestMethod the type of html request type expected
    #   @param request the request coming from the front
    #   @param caller the method calling this function (needed for error logging)
    #   @param expectedKeys the keys expected in the POST request if any
    #   @param user the user doing the request
    #   @return the response if the request is a POST nothing if it's a get.
    def checkRequest(expectedRequestMethod, request, caller, expectedKeys=None, user=None):
        # Check if the request has the good method type
        if request.method != expectedRequestMethod:
            raise UserException(ErrorEnum.BAD_REQUEST)

        # Test the keys of the request
        if request.method == 'POST' and expectedKeys is not None:
            return FrontRequestChecker._checkRequestPOST(request, caller, expectedKeys, user)

    @staticmethod
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
                raise UserException(ErrorEnum.BAD_FORMAT)

        # Creating the returning object
        return parsedRequest
