from django.contrib.auth.models import User
from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=1000)


class Album(models.Model):
    title = models.CharField(max_length=1000)
    numberOfDisc = models.IntegerField(null=True)
    numberTotalTrack = models.IntegerField(null=True)
    artist = models.ManyToManyField(Artist)


class Genre(models.Model):
    name = models.CharField(max_length=1000)


class FileType(models.Model):
    name = models.CharField(max_length=1000)


class Track(models.Model):
    location = models.FilePathField(max_length=1000)
    title = models.CharField(max_length=1000)
    year = models.IntegerField(null=True)
    composer = models.CharField(max_length=1000, null=True)
    performer = models.CharField(max_length=1000, null=True)
    number = models.IntegerField(null=True)
    bpm = models.IntegerField(null=True)
    lyrics = models.CharField(max_length=42000, null=True)
    comment = models.CharField(max_length=10000, null=True)
    bitRate = models.IntegerField(null=True)
    bitRateMode = models.IntegerField(null=True)
    sampleRate = models.IntegerField(null=True)
    duration = models.IntegerField(null=True)
    discNumber = models.IntegerField(null=True)
    size = models.IntegerField(null=True)
    lastModified = models.DateField(auto_now=True, null=True)
    artist = models.ManyToManyField(Artist)
    album = models.ForeignKey(Album, null=True)
    genre = models.ForeignKey(Genre, null=True)
    fileType = models.ForeignKey(FileType, null=True)


class Playlist(models.Model):
    name = models.CharField(max_length=1000)
    user = models.ForeignKey(User)


class TrackIncludedInPlaylist(models.Model):
    playList = models.ForeignKey(Playlist)
    track = models.ForeignKey(Track)
