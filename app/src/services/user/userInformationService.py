import logging

from django.contrib.auth.decorators import login_required

from app.models import Permissions
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum
from app.src.utils.userSettingsManager import UserSettingsManager

logger = logging.getLogger('django')


## This class allows the front to get information about a user
class UserInformationService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Return all the information concerning a user to the front
    def getUserInformation(request):
        user = request.user
        # Checking if the request is correct
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Returning the information about the user with a standard response
        return UserInformationService._extractUserInformation(user)

    @staticmethod
    ## Extract the information about a user stored in the database
    #   @param user the user to get info on
    def _extractUserInformation(user):
        # Getting the user settings
        userSettings = UserSettingsManager.getUserSettings(user)
        # If the invite code is null, we put some placeholder
        if userSettings.usedInviteCode is None:
            godfatherCode = 'JESUS'
            godfatherName = 'CHRIST'
        else:
            godfatherCode = userSettings.usedInviteCode.code
            godfatherName = userSettings.usedInviteCode.user.username
        return {
            'AVATAR_PATH': userSettings.avatar,
            'GODFATHER_CODE': godfatherCode,
            'GODFATHER_NAME': godfatherName,
            'GROUPS': UserInformationService._getUserGroups(userSettings),
            'INVITE_CODE': userSettings.inviteCode.code,
            'IS_ADMIN': PermissionHandler.hasPermission(PermissionEnum.ADMIN_VIEW, user),
            'PERMISSIONS': UserInformationService._getUserPermissionsCodes(userSettings),
            'USERNAME': user.username,
        }

    @staticmethod
    ## Extract the groups of an user
    #   @param userSettings
    #   @return a dict containing the name and the id of the groups
    def _getUserGroups(userSettings):
        groups = []
        # Extracting the group names and ids
        for group in userSettings.groups.all():
            groups.append({
                'ID': group.id,
                'NAME': group.name,
            })
        return groups

    @staticmethod
    ## Extract the permission name from the user settings
    #   @param userSettings the settings of the user
    #   @return a array containing all the permission of the user
    def _getUserPermissionsCodes(userSettings):
        permissionNames = []
        # Getting all the permissions and getting their names
        groupPermissions = Permissions.objects.filter(group__in=userSettings.groups.all()).distinct()
        for permission in groupPermissions:
            permissionNames.append(permission.code)
        return permissionNames
