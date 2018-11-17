from app.models import Permissions
from app.src.utils.userSettingsManager import UserSettingsManager


## This class is used to control the permissions of users.
class PermissionHandler:

    @staticmethod
    ## Check if a user has a specific permission
    #   @param requiredPermission the permission needed contained in the permissionEnum
    #   @param user the user to check the permission
    #   @return True if the user has the permission, False otherwise
    def checkPermission(requiredPermission, user):
        # Getting the user preferences
        userSettings = UserSettingsManager.getUserSettings(user)
        # Getting the user permissions from the groups of the user
        userPermissions = Permissions.objects.filter(group__in=userSettings.groups.all())
        # Checking if the user has the good permission
        for permission in userPermissions:
            if permission.code == requiredPermission.value:
                return True
        return False
