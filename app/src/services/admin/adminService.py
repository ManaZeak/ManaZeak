from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class AdminService(object):
    ## This class handles the admin actions of the application

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Toggles the invite mode.
    #   @return the current invite mode state
    def toggleInviteMode(request):
        user = request.user
        try:
            # Check the user permission
            PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
            # Check if the request is ok
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
            # Toggles the invite mode
            config = ApplicationConfigurationManager.getApplicationConfiguration()
            config.inviteCodeEnabled = not config.inviteCodeEnabled
            config.save()
            data = {
                'IS_INVITE_CODE_ENABLED': config.inviteCodeEnabled,
            }
            return JsonResponse(
                {**data, **ErrorHandler.createStandardStateMessage(True)}
            )
        except UserException as e:
            return ErrorHandler.generateJsonResponseFromException(e, AdminService.toggleInviteMode, user)
