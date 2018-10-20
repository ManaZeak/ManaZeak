from django.contrib.auth.models import User
from django.db import models

from app.models import Track

## @package app.models.collections
#   This package describes the database models for the collection related objects


## This class describes a playlist.


class Playlist(models.Model):
    ## The name of the playlist.
    name = models.CharField(max_length=1000)
    ## The creator of the playlist.
    user = models.ForeignKey(User)
    ## The track inside the playlist.
    track = models.ManyToManyField(Track)
    ## If the playlist is a library.
    isLibrary = models.BooleanField(default=False)
    ## If the playlist has finished to be scanned.
    isScanned = models.BooleanField(default=False)
    ## If the postgres view of the playlist must be refreshed.
    refreshView = models.BooleanField(default=True)
    ## The description of the playlist.
    description = models.CharField(default="", max_length=10000)
    ## If the playlist is public
    isPublic = models.BooleanField(default=True)


## This class describes a library.
class Library(models.Model):
    ## The library path.
    path = models.FilePathField(max_length=1000)
    ## The playlist associated to the library.
    playlist = models.ForeignKey(Playlist, null=True)
    ## If the mp3 tracks must be converted in ID3V2.
    convertID3 = models.BooleanField(default=False)


# FIXME: a SUPPRIMER
## The class describing the playlist settings.
class PlaylistSettings(models.Model):
    ## The playlist associated to the settings.
    playlist = models.ForeignKey(Playlist)
    ## The user associated to the settings.
    user = models.ForeignKey(User)
    ## The type of random that is used for the playlist.
    randomMode = models.IntegerField(default=0)
    ## The repeat mode on the playlist for the user and playlist.
    repeatEnabled = models.IntegerField(default=0)
    ## The view mode the playlist needs to be displayed.
    viewMode = models.IntegerField()
