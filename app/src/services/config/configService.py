from django.http import JsonResponse

from app.models.settings import Config

from app.src.config.configEnum import ConfigEnum
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException


## This class allows to get some configuration objects of the database.
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class ConfigService(object):

    @staticmethod
    ## This method returns the status of the invite code option.
    def isInviteCodeEnabled(request):
        try:
            # Checking the request
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
            # Getting the configuration
            conf = ApplicationConfigurationManager.getApplicationConfiguration()
            data = {
                'INVITE': conf.inviteCodeEnabled,
            }
            # Sending data to front.
            return JsonResponse(
                {**data, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            # Handle the errors and send the response to the front.
            return ErrorHandler.generateJsonResponseFromException(e, ConfigService.isInviteCodeEnabled, None)

    @staticmethod
    ## Return the number of tracks returned by the lazy loading.
    def getNumberOfTracksReturnedByLazyLoad():
        if Config.objects.filter(code=ConfigEnum.TRACK_IN_LAZY.name).count() != 1:
            raise UserException(ErrorEnum.UNEXPECTED_STATE)
        return Config.objects.get(code=ConfigEnum.TRACK_IN_LAZY.name).value
