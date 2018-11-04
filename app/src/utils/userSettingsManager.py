from app.models.security import Group
from app.models.settings import UserSetting
from app.src.utils.avatars.avatarGenerator import AvatarGenerator


## @package app.utils.userSettingsManager
# Control the users settings

## Create the user settings in database for a user
#   @param user the user to be linked with the settings created
#   @param inviteCode the invite code the user used if any
def createUserSettings(user, inviteCode):
    userPref = UserSetting()
    userPref.user = user
    # Special group if the user is an admin
    # FIXME : changer avec un sytème qui fonctionne si on créer de nouveau groupe
    if user.is_superuser:
        userPref.group = Group.objects.get(rank=5)
    else:
        userPref.group = Group.objects.get(rank=1)
    # Setting the user avatar
    userPref.avatar = AvatarGenerator().generateAvatar(user.username)
    if inviteCode is not None:
        userPref.inviteCode = inviteCode
    userPref.save()
