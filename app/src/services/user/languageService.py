import json
import os

from django.contrib.auth.decorators import login_required

from django.http import JsonResponse

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker


## This class allows the front to choose the right language to display
from app.src.utils.requestMethodEnum import RequestMethodEnum


class LanguageService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Loading the json file corresponding to the language of the user.
    #   @param request a POST request send by the front must contain :
    #   - the user locale (LANG)
    #   @return a default json response and the json file containing all the language keys and strings.
    def selectLanguage(request):
        pathToLang = "/ManaZeak/static/json/lang/"
        user = request.user
        try:
            response = FrontRequestChecker.checkRequest(
                RequestMethodEnum.POST, request, ['LANG'])
            requestedLang = response['LANG']
            if LanguageService._checkLanguage(requestedLang):
                jsonFile = os.path.join(pathToLang, requestedLang + ".json")
                # If the local is not found using a default one
                if not os.path.isfile(jsonFile):
                    jsonFile = os.path.join(pathToLang, "en.json")
                # Reading the json file
                with open(jsonFile) as file:
                    data = json.load(file)
                # Send the information to the front
                return JsonResponse(
                    {**data, **ErrorHandler.createStandardStateMessage(True)}
                )
        except UserException as e:
            # Handle the errors and send the response to the front.
            return ErrorHandler.generateJsonResponseFromException(e, LanguageService.selectLanguage, user)

    @staticmethod
    ## Check if the requested json is correct
    def _checkLanguage(requestedLanguage):
        if '/' not in requestedLanguage or '\\' not in requestedLanguage or '.' not in requestedLanguage:
            return True
        else:
            raise UserException(ErrorEnum.SUSPICIOUS_OPERATION)
