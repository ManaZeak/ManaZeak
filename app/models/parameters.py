from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from app.models import Playlist, Track, Wallet
from app.models.permissions import Groups

## @package app.models.parameters
#   This package describes the different settings and parameters stored in the database


## This class describes the shuffle.
class Shuffle(models.Model):
    ## The playlist associated to the shuffle.
    playlist = models.ForeignKey(Playlist)
    ## The username associated with the shuffle.
    user = models.ForeignKey(User)
    ## The tracks that has been played already.
    tracksPlayed = models.ManyToManyField(Track)


## The class describes an entry in the history of each user in the app.
class History(models.Model):
    ## The track.
    track = models.ForeignKey(Track)
    ## The date when the track is saved into the history.
    date = models.DateTimeField(null=True)

    ## Overriding the save function for automatically setting the date
    def save(self, *args, **kwargs):
        if not self.id:
            self.date = timezone.now()
        return super(History, self).save(*args, **kwargs)


## The class describes the whole history of the users.
class UserHistory(models.Model):
    ## The user associated with the history.
    user = models.ForeignKey(User)
    ## All the tracks associated with a date.
    histories = models.ManyToManyField(History)


## This class describes the invite codes.
class InviteCode(models.Model):
    ## The user associated with the code
    user = models.ForeignKey(User)
    ## The invite code.
    code = models.CharField(max_length=33)


## This class stores the information about a user.
class UserPreferences(models.Model):
    ## The invite code of the user.
    inviteCode = models.ForeignKey(InviteCode, null=True)
    ## The wallet object of a user.
    wallet = models.ForeignKey(Wallet, null=True)
    ## The group of the user.
    group = models.ForeignKey(Groups, null=True)
    ## The user associated to the preferences.
    user = models.ForeignKey(User, null=True)
    ## The total time the user has listened to music
    totalListeningTime = models.FloatField(default=0.0)
    ## The win/loss streak of the user.
    streak = models.IntegerField(default=100)
    ## The path to the avatar of the user.
    avatar = models.FilePathField(default='/defaultimgpath')


## This class describes the admin options variables.
class AdminOptions(models.Model):
    ## The syncthing API key.
    syncthingKey = models.CharField(max_length=100, null=True)
    ## If the invite code are enabled.
    inviteCodeEnabled = models.BooleanField(default=False)
    ## The path of the buffer (where the uploaded songs are saved).
    bufferPath = models.FilePathField(max_length=1000, null=True)
