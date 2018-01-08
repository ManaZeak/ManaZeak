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


class TrackView(models.Model):
    track_id = models.BigIntegerField(primary_key=True)
    track_location = models.FilePathField(max_length=1000)
    track_title = models.CharField(max_length=1000)
    track_year = models.IntegerField(null=True)
    track_composer = models.CharField(max_length=1000, null=True)
    track_performer = models.CharField(max_length=1000, null=True)
    track_number = models.IntegerField(null=True)
    track_bpm = models.IntegerField(null=True)
    track_lyrics = models.CharField(max_length=42000, null=True)
    track_comment = models.CharField(max_length=10000, null=True)
    track_bitrate = models.IntegerField(null=True)
    track_bitratemode = models.IntegerField(null=True)
    track_samplerate = models.IntegerField(null=True)
    track_duration = models.FloatField(null=True)
    track_discnumber = models.IntegerField(null=True)
    track_size = models.IntegerField(null=True)
    track_lastmodified = models.DateField(auto_now=True, null=True)
    track_cover = models.URLField(max_length=1000, null=True)
    track_filetype_id = models.BigIntegerField()
    track_mood = models.URLField(max_length=1000, null=True)
    track_download_counter = models.IntegerField(default=0)
    album_title = models.CharField(max_length=1000, null=True)
    genre_id = models.BigIntegerField()
    genre_name = models.CharField(max_length=1000, null=True)
    album_id = models.BigIntegerField()
    artist_name = models.CharField(max_length=1000, null=True)
    artist_id = models.CharField(max_length=1000, null=True)
    album_artist_id = models.CharField(max_length=1000, null=True)
    album_artist_name = models.CharField(max_length=1000, null=True)

    class Meta:
        managed = False
        db_table = 'app_track_view'


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
    date = models.TimeField()

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
