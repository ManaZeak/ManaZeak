from django.contrib.auth.models import User
from django.db import models


## This class is describing the table fileType.
class FileType(models.Model):
    ## The name of the file type (mp3, flac...).
    name = models.CharField(max_length=1000)


## This class is describing the table artists.
class Artist(models.Model):
    ## The name of the artist.
    name = models.CharField(max_length=1000, unique=True, null=True)
    ## The real name of the artist.
    realName = models.CharField(max_length=1000)


## This class is describing the table album.
class Album(models.Model):
    ## The title of the album.
    title = models.CharField(max_length=1000, null=True)
    ## The number of disc of the album.
    totalDisc = models.IntegerField(null=True)
    ## the number of track in the album.
    totalTrack = models.IntegerField(null=True)
    ## The artists associated to the album.
    artists = models.ManyToManyField(Artist)
    ## The description of the album
    description = models.CharField(max_length=1000, null=True)


## This class is describing the table genre.
class Genre(models.Model):
    ## The genre name
    name = models.CharField(max_length=1000, unique=True, null=True)


## Tis class is describing the table of track.
#   This table is the main table of the app it contains all the tracks of the app.
class Track(models.Model):
    ## The path of the track.
    location = models.FilePathField(max_length=1000, unique=True)
    ## The path of the cover.
    coverLocation = models.URLField(max_length=1000, null=True)
    ## The title of the app.
    title = models.CharField(max_length=1000)
    ## The year of creation of the track (metadata).
    year = models.IntegerField(null=True)
    ## The composer of the track.
    composers = models.ManyToManyField(Artist, related_name='composer_artists')
    ## The performer of the track.
    performers = models.ManyToManyField(Artist, related_name='performer_artists')
    ## The position of the track inside the album.
    number = models.IntegerField(null=True)
    ## The beats per minute of the track.
    bpm = models.IntegerField(null=True)
    ## The lyrics of the track.
    lyrics = models.CharField(max_length=42000, null=True)
    ## The comment on the track.
    comment = models.CharField(max_length=10000, null=True)
    ## The bit rate of the track.
    bitRate = models.IntegerField(null=True)
    ## The bit rate mode of the track (CBR, VBR).
    bitRateMode = models.IntegerField(null=True)
    ## The sample rate of the track.
    sampleRate = models.IntegerField(null=True)
    ## The duration of the track.
    duration = models.FloatField(null=True)
    ## The disc number the track is on.
    discNumber = models.IntegerField(null=True)
    ## The size of the track.
    size = models.IntegerField(null=True)
    ## The last time the track was modified.
    lastModified = models.DateField(auto_now=True, null=True)
    ## The artists linked to the track.
    artists = models.ManyToManyField(Artist)
    ## The album linked to the track.
    album = models.ForeignKey(Album, null=True, on_delete=models.CASCADE)
    ## The genre linked to the track.
    genre = models.ManyToManyField(Genre)
    ## The file type linked to the track.
    fileType = models.ForeignKey(FileType, null=True, on_delete=models.CASCADE)
    ## The track moodbar path.
    moodbar = models.URLField(max_length=1000, null=True)
    ## If the track has been scanned by the rescan.
    scanned = models.BooleanField(default=False)
    ## The number of time the track has been played.
    playCounter = models.IntegerField(default=0)
    ## The number of time the track has been downloaded.
    downloadCounter = models.IntegerField(default=0)
    ## The user that uploaded the track.
    uploader = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
