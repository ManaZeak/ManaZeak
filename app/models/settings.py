from django.contrib.auth.models import User
from django.db import models

from app.models import Playlist
from app.models.security import Group, InviteCode


## This class describes the global parameters of the application.
class ApplicationConfiguration(models.Model):
    ## Toggle if an invitation code is needed for the login.
    inviteCodeEnabled = models.BooleanField(default=False)
    ## The default group of a new user.
    defaultGroup = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)

## This class describes a key of configuration.
class Config(models.Model):
    ## The code of the configuration.
    code = models.CharField(max_length=50, unique=True, null=False)
    ## The value of the configuration.
    value = models.CharField(max_length=200, null=False)

## This class describes a status of a wish.
class SuggestionStatus(models.Model):
    ## The name of the status.
    label = models.CharField(max_length=20, null=False, unique=True)

## This class describes a user's wish.
class Suggestion(models.Model):
    ## The text value of the wish.
    text = models.CharField(max_length=10000, null=False)
    ## The status of the wish.
    status = models.ForeignKey(SuggestionStatus, on_delete=models.DO_NOTHING)
    ## The user making the wish.
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    ## The date of the suggestion creation
    creationDate = models.DateTimeField(auto_now_add=True)

## This class stores the preferences and the information about a user.
class UserSetting(models.Model):
    ## The invite code of the user.
    inviteCode = models.ForeignKey(InviteCode, on_delete=models.CASCADE, null=True)
    ## The groups of the user.
    groups = models.ManyToManyField(Group)
    ## The user linked to the preferences.
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ## The path to the avatar of the user.
    avatar = models.FilePathField(default='static/default/user.svg')
    ## The invite code the user used to create an account.
    usedInviteCode = models.ForeignKey(InviteCode, on_delete=models.CASCADE, null=True, related_name='used_invite_code')
    ## The language the user choose.
    language = models.CharField(max_length=5, null=True)


## This class stores the order of the playlist for a user.
class PlaylistOrder(models.Model):
    ## The user with this settings.
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    ## The playlist concerned.
    playlist = models.ForeignKey(Playlist, on_delete=models.DO_NOTHING)
    ## The position in the list of the playlist.
    position = models.IntegerField()
