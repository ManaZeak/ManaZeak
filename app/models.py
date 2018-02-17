from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Artist(models.Model):
    name = models.CharField(max_length=1000, unique=True, null=True)

    class Meta:
        app_label = 'app'


class Album(models.Model):
    title = models.CharField(max_length=1000, unique=True, null=True)
    totalDisc = models.IntegerField(null=True)
    totalTrack = models.IntegerField(null=True)
    artist = models.ManyToManyField(Artist)


class Genre(models.Model):
    name = models.CharField(max_length=1000, unique=True, null=True)

    class Meta:
        app_label = 'app'


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
    duration = models.FloatField(null=True)
    discNumber = models.IntegerField(null=True)
    size = models.IntegerField(null=True)
    lastModified = models.DateField(auto_now=True, null=True)
    artist = models.ManyToManyField(Artist)
    album = models.ForeignKey(Album, null=True)
    genre = models.ForeignKey(Genre, null=True)
    fileType = models.ForeignKey(FileType, null=True)
    moodbar = models.URLField(max_length=1000, null=True)
    scanned = models.BooleanField(default=False)
    playCounter = models.IntegerField(default=0)
    downloadCounter = models.IntegerField(default=0)
    uploader = models.ForeignKey(User, null=True)


class Playlist(models.Model):
    name = models.CharField(max_length=1000)
    user = models.ForeignKey(User)
    track = models.ManyToManyField(Track)
    isLibrary = models.BooleanField(default=False)
    isScanned = models.BooleanField(default=False)
    refreshView = models.BooleanField(default=True)


class Library(models.Model):
    path = models.FilePathField(max_length=1000)
    playlist = models.ForeignKey(Playlist, null=True)
    convertID3 = models.BooleanField(default=False)


class Shuffle(models.Model):
    playlist = models.ForeignKey(Playlist)
    user = models.ForeignKey(User)
    tracksPlayed = models.ManyToManyField(Track)


class Stats(models.Model):
    user = models.ForeignKey(User)
    track = models.ForeignKey(Track)
    listeningPercentage = models.FloatField(null=True)
    playCounter = models.IntegerField(default=0)


class PlaylistSettings(models.Model):
    playlist = models.ForeignKey(Playlist)
    user = models.ForeignKey(User)
    randomMode = models.IntegerField(default=0)
    repeatEnabled = models.IntegerField(default=0)
    viewMode = models.IntegerField()


class History(models.Model):
    track = models.ForeignKey(Track)
    date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.date = timezone.now()
        return super(History, self).save(*args, **kwargs)


class UserHistory(models.Model):
    user = models.ForeignKey(User)
    histories = models.ManyToManyField(History)


class Wish(models.Model):
    user = models.ForeignKey(User)
    date = models.DateField(auto_now=True, null=True)
    text = models.CharField(max_length=1000)
    status = models.IntegerField()


class AdminOptions(models.Model):
    syncthingKey = models.CharField(max_length=100, null=True)
    inviteCodeEnabled = models.BooleanField(default=False)
    bufferPath = models.FilePathField(max_length=1000, null=True)


class InviteCode(models.Model):
    user = models.ForeignKey(User)
    code = models.CharField(max_length=33)


class Wallet(models.Model):
    miningGain = models.IntegerField(default=0)
    miningLoss = models.IntegerField(default=0)
    globalGain = models.IntegerField(default=0)
    globalLoss = models.IntegerField(default=0)


class TransactionType(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=5)
    coinGain = models.IntegerField(default=0)
    coinLoss = models.IntegerField(default=0)
    streakGain = models.IntegerField(default=0)
    streakLoss = models.IntegerField(default=0)
    bubbles = models.BooleanField(default=False)


class TransactionHistory(models.Model):
    transactionType = models.ForeignKey(TransactionType)
    streak = models.FloatField(default=0)
    isGain = models.BooleanField(default=False)
    baseMultiplier = models.FloatField(default=0)
    user = models.ForeignKey(User)


class Permissions(models.Model):
    name = models.CharField(max_length=1000)
    code = models.CharField(max_length=4)


class Groups(models.Model):
    name = models.CharField(max_length=1000, default="Default")
    rank = models.IntegerField(default=0)
    permissions = models.ManyToManyField(Permissions)


class UserPreferences(models.Model):
    inviteCode = models.ForeignKey(InviteCode, null=True)
    wallet = models.ForeignKey(Wallet, null=True)
    group = models.ForeignKey(Groups, null=True)
    user = models.ForeignKey(User, null=True)
    totalListeningTime = models.FloatField(default=0.0)
    streak = models.IntegerField(default=100)

