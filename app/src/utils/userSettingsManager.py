from app.models import ApplicationConfiguration
from app.models.security import Group
from app.models.settings import UserSetting
from app.src.utils.applicationConfigurationManager import ApplicationConfigurationManager
from app.src.utils.avatars.avatarGenerator import AvatarGenerator


# Controls the users settings
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


class UserSettingsManager:

    @staticmethod
    ## Create the user settings in database for a user
    #   @param user the user to be linked with the settings created
    #   @param inviteCode the invite code the user used if any
    def createUserSettings(user, inviteCode):
        userPref = UserSetting()
        userPref.user = user
        # Special group if the user is an admin
        if user.is_superuser:
            userPref.group = Group.objects.get(rank=5)
        else:
            # Use the default group of the application
            userPref.group = ApplicationConfigurationManager.getApplicationConfiguration().defaultGroup
        # Setting the user avatar
        userPref.avatar = AvatarGenerator().generateAvatar(user.username)
        if inviteCode is not None:
            userPref.inviteCode = inviteCode
        userPref.save()

    @staticmethod
    ## Get the user settings from the database
    def getUserSettings(user):
        userSettings = UserSetting.objects.filter(user=user)
        if userSettings is not None:
            return UserSetting.objects.get(user=user)
        else:
            raise UserException(ErrorEnum.UNKNOWN_USER_SETTINGS)
