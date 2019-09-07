from app.models import Permissions
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException
from app.src.utils.userSettingsManager import UserSettingsManager


## This class is used to control the permissions of users.
class PermissionHandler(object):

    @staticmethod
    ## Check if a user has a specific permission
    #   @param requiredPermission the permission needed contained in the permissionEnum
    #   @param user the user to check the permission
    def checkPermission(requiredPermission, user):
        # Getting the user preferences
        userSettings = UserSettingsManager.getUserSettings(user)
        # Getting the user permissions from the groups of the user
        userPermissions = Permissions.objects.filter(group__in=userSettings.groups.all())
        # Checking if the user has the good permission
        for permission in userPermissions:
            if permission.code == requiredPermission.value:
                return
        # We raise an exception if the user doesn't have the permission
        raise UserException(ErrorEnum.PERMISSION_ERROR, user)

    @staticmethod
    ## Check if a user posses a permission
    #   @param requiredPermission the permission needed contained in the permissionEnum
    #   @param user the user to check the permission
    #   @return True if the user has the permission, False otherwise
    def hasPermission(requiredPermission, user):
        try:
            PermissionHandler.checkPermission(requiredPermission, user)
            return True
        except UserException:
            return False
