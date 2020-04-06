from django.contrib.auth.decorators import login_required
from django.utils.html import strip_tags

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler

from app.src.services.suggestion.suggestionLoader import SuggestionLoader
from app.src.services.suggestion.suggestionManager import SuggestionManager
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## Service for interacting with wishes.
class SuggestionService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Create a wish for a user.
    def createSuggestion(request):
        # Getting the user.
        user = request.user
        # Checking the permission of the user.
        PermissionHandler.checkPermission(PermissionEnum.WISH, user)
        # Check the request of the user.
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['SUGGESTION'])
        # Creates the wish into the database.
        SuggestionManager.createSuggestion(strip_tags(response['SUGGESTION']), user)

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the wishes of a user.
    def getUserSuggestions(request):
        # Getting the user.
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.WISH, user)
        # Check the request of the user.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Getting the list of the suggestions of the user
        suggestions = SuggestionLoader.loadSuggestionFromUser(user)
        return {
            'SUGGESTIONS': [suggestion.generateJson() for suggestion in suggestions]
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the users suggestions.
    def getAllSuggestion(request):
        # Getting the user.
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.WISH_REVIEW, user)
        # Check the request of the user.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Getting the list of the suggestions of the users
        suggestions = SuggestionLoader.loadAllSuggestion()
        return {
            'SUGGESTIONS': [suggestion.generateJson() for suggestion in suggestions]
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Change the status of a suggestion.
    def changeSuggestionStatus(request):
        # Getting the user.
        user = request.user
        # Checking the permission of the user
        PermissionHandler.checkPermission(PermissionEnum.WISH_REVIEW, user)
        # Check the request of the user.
        response = FrontRequestChecker.checkRequest(RequestMethodEnum.POST, request, user, ['SUGGESTION_ID', 'STATUS'])
        # Getting the suggestion and the status
        suggestionId = int(response['SUGGESTION_ID'])
        status = bool(response['STATUS'])
        SuggestionManager.changeStatusSuggestion(suggestionId, status, user)
