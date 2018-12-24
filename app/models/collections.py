from django.contrib.auth.models import User
from django.db import models


from app.models import Track


## This class describes the playlists in the database.
class Playlist(models.Model):
    ## The name of the playlist
    name = models.CharField(max_length=100, default='Playlist')
    ## The tracks contained in the playlist
    tracks = models.ManyToManyField(Track)
    ## The number of track in the playlist
    totalTracks = models.IntegerField()
    ## The total listening time of the playlist
    listeningTime = models.IntegerField()
    ## The average bit rate of the tracks contained in the library
    averageBitRate = models.IntegerField()
    ## If the playlist is a library
    isLibrary = models.BooleanField()
    ## If the playlist is public
    isPublic = models.BooleanField()
    ## The owner of the playlist
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    ## The description of the playlist
    description = models.CharField(max_length=5000, null=True)

## This class describes a library.
class Library(models.Model):
    ## The library path.
    path = models.FilePathField(max_length=1000)
    ## The playlist associated to the library.
    playlist = models.ForeignKey(Playlist, on_delete=models.DO_NOTHING)
