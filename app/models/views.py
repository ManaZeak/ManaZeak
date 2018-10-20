from django.contrib.auth.models import User
from django.db import models

from app.models import Playlist


## This class represents a columns of the front.
class ViewColumn(models.Model):
    ## The name of the column.
    name = models.CharField(max_length=1000)
    ## The width of the column.
    width = models.CharField(max_length=1000)


## The type of view
class ViewType(models.Model):
    ## The name of the type
    name = models.CharField(max_length=1000)


## This class describe a view for a playlist.
class PlaylistViewOptions(models.Model):
    ## The user associated to the view.
    user = models.ForeignKey(User)
    ## The playlist associated to the view.
    playlist = models.ForeignKey(Playlist)
    ## The columns associated to the view.
    columns = models.ManyToManyField(ViewColumn)
    ## The view mode of the settings
    viewType = models.ForeignKey(ViewType)
    ## The type of random that is used for the playlist.
    randomMode = models.IntegerField(default=0)
    ## The repeat mode on the playlist for the user and playlist.
    repeatEnabled = models.IntegerField(default=0)
    ## Is the view is active for the playlist
    isActive = models.BooleanField(default=True)
