from django.contrib.auth.decorators import login_required

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager
from app.src.utils.decorators import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class AdminService(object):
    ## This class handles the admin actions of the application

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Toggles the invite mode.
    #   @return the current invite mode state
    def toggleInviteMode(request):
        user = request.user
        # Check the user permission
        PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
        # Check if the request is ok
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Toggles the invite mode
        config = ApplicationConfigurationManager.getApplicationConfiguration()
        config.inviteCodeEnabled = not config.inviteCodeEnabled
        config.save()
        return {
            'IS_INVITE_CODE_ENABLED': config.inviteCodeEnabled,
        }