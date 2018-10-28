from app.avatars.avatarGenerator import generateAvatar
from app.models.security import Group
from app.models.settings import UserSetting


## @package app.utils.userSettingsManager
# Control the users settings
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
    userPref.avatar = generateAvatar(user.username)
    userPref.inviteCode = inviteCode
    userPref.save()
