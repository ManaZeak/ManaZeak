from django.contrib.auth.models import User
from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=1000)


class Album(models.Model):
    title = models.CharField(max_length=1000)
    totalDisc = models.IntegerField(null=True)
    totalTrack = models.IntegerField(null=True)
    artist = models.ManyToManyField(Artist)


class Genre(models.Model):
    name = models.CharField(max_length=1000, unique=True)


class FileType(models.Model):
    name = models.CharField(max_length=1000)


class Track(models.Model):
    location = models.FilePathField(max_length=1000)
    coverLocation = models.URLField(max_length=1000, null=True)
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
    moodbar = models.URLField(max_length=1000, null=True)
    CRC = models.CharField(max_length=1000, null=False)
    scanned = models.BooleanField(default=False)
    playCounter = models.IntegerField(default=0)
    uploader = models.ForeignKey(User, null=True)


class Playlist(models.Model):
    name = models.CharField(max_length=1000)
    user = models.ForeignKey(User)
    track = models.ManyToManyField(Track)
    isLibrary = models.BooleanField(default=False)
    isScanned = models.BooleanField(default=False)


class Library(models.Model):
    name = models.CharField(max_length=1000)
    path = models.FilePathField(max_length=1000)
    user = models.ForeignKey(User)
    playlist = models.ForeignKey(Playlist, null=True)
    convertID3 = models.BooleanField(default=False)


class Shuffle(models.Model):
    playlist = models.ForeignKey(Playlist)
    user = models.ForeignKey(User)
    tracksPlayed = models.ManyToManyField(Track)


class Stats(models.Model):
    user = models.ForeignKey(User)
    track = models.ForeignKey(Track)
    listeningPercentage = models.IntegerField(null=True)
    playCounter = models.IntegerField(default=0)
