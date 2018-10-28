from django.contrib.auth.models import User
from django.db import models

from app.models.security import Group, InviteCode


## This class describes the global parameters of the application
class ApplicationConfiguration(models.Model):
    ## Toggle if an invitation code is needed for the login
    inviteCodeEnabled = models.BooleanField(default=False)


## This class stores the preferences and the information about a user.
class UserSetting(models.Model):
    ## The invite code of the user.
    inviteCode = models.CharField(max_length=32)
    ## The groups of the user
    groups = models.ManyToManyField(Group)
    ## The user linked to the preferences
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ## The path to the avatar of the user.
    avatar = models.FilePathField(default='/defaultimgpath')  # FIXME : mettre un vrai chemin
    ## The invite code the user used to create an account
    usedInviteCode = models.ForeignKey(InviteCode, on_delete=models.CASCADE, null=True)
