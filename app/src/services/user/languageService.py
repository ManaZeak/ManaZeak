import json
import os

from django.contrib.auth.decorators import login_required

from app.src.utils.decorators import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker


## This class allows the front to choose the right language to display
from app.src.utils.requestMethodEnum import RequestMethodEnum


class LanguageService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Loading the json file corresponding to the language of the user.
    #   @param request a POST request send by the front must contain :
    #   - the user locale (LANG)
    #   @return a default json response and the json file containing all the language keys and strings.
    def selectLanguage(request):
        pathToLang = "/ManaZeak/static/locale/front/"
        user = request.user
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['LANG'])
        requestedLang = response['LANG']
        LanguageService._checkLanguage(requestedLang, user)
        jsonFile = os.path.join(pathToLang, requestedLang + ".json")
        # If the local is not found using a default one
        if not os.path.isfile(jsonFile):
            jsonFile = os.path.join(pathToLang, "en.json")
        # Reading the json file
        with open(jsonFile) as file:
            data = json.load(file)
        # Send the information to the front
        return data

    @staticmethod
    ## Check if the requested json is correct
    def _checkLanguage(requestedLanguage, user):
        if '/' in requestedLanguage or '\\' in requestedLanguage or '.' in requestedLanguage:
            raise UserException(ErrorEnum.SUSPICIOUS_OPERATION, user)
