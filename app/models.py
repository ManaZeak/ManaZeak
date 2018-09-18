from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

## @package app.models
#   This package is describing the database model.


## This class is describing the table artists.
class Artist(models.Model):
    ## the name of the artist.
    name = models.CharField(max_length=1000, unique=True, null=True)


## This class is describing the table album.
class Album(models.Model):
    ## The title of the album.
    title = models.CharField(max_length=1000, unique=True, null=True)
    ## The number of disc of the album.
    totalDisc = models.IntegerField(null=True)
    ## the number of track in the album.
    totalTrack = models.IntegerField(null=True)
    ## The artists associated to the album.
    artist = models.ManyToManyField(Artist)


## This class is describing the table genre.
class Genre(models.Model):
    ## The genre name
    name = models.CharField(max_length=1000, unique=True, null=True)


## This class is describing the table fileType.
class FileType(models.Model):
    ## The name of the file type (mp3, flac...).
    name = models.CharField(max_length=1000)


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
    composer = models.CharField(max_length=1000, null=True)
    ## The performer of the track.
    performer = models.CharField(max_length=1000, null=True)
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
    artist = models.ManyToManyField(Artist)
    ## The album linked to the track.
    album = models.ForeignKey(Album, null=True)
    ## The genre linked to the track.
    genre = models.ForeignKey(Genre, null=True)
    ## The file type linked to the track.
    fileType = models.ForeignKey(FileType, null=True)
    ## The track moodbar path.
    moodbar = models.URLField(max_length=1000, null=True)
    ## If the track has been scanned by the rescan.
    scanned = models.BooleanField(default=False)
    ## The number of time the track has been played.
    playCounter = models.IntegerField(default=0)
    ## The number of time the track has been downloaded.
    downloadCounter = models.IntegerField(default=0)
    ## The user that uploaded the track.
    uploader = models.ForeignKey(User, null=True)


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


## This class describes a library.
class Library(models.Model):
    ## The library path.
    path = models.FilePathField(max_length=1000)
    ## The playlist associated to the library.
    playlist = models.ForeignKey(Playlist, null=True)
    ## If the mp3 tracks must be converted in ID3V2.
    convertID3 = models.BooleanField(default=False)


## This class describes the shuffle.
class Shuffle(models.Model):
    ## The playlist associated to the shuffle.
    playlist = models.ForeignKey(Playlist)
    ## The username associated with the shuffle.
    user = models.ForeignKey(User)
    ## The tracks that has been played already.
    tracksPlayed = models.ManyToManyField(Track)


## The class describes the statistics that we collect on a user.
class Stats(models.Model):
    ## The user associated with the stats.
    user = models.ForeignKey(User)
    ## The track associated.
    track = models.ForeignKey(Track)
    ## The global listening percentage of the track.
    listeningPercentage = models.FloatField(null=True)
    ## The number of time the user has listened to the track.
    playCounter = models.IntegerField(default=0)


## The class describes the playlist settings.
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


## The class describes the wish system.
class Wish(models.Model):
    ## The user that created a wish.
    user = models.ForeignKey(User)
    ## The date when the wish has been created (the date is auto set)
    date = models.DateField(auto_now=True, null=True)
    ## The text body of the wish.
    text = models.CharField(max_length=1000)
    ## The status of the wish
    status = models.IntegerField()


## This class describes the admin options variables.
class AdminOptions(models.Model):
    ## The syncthing API key.
    syncthingKey = models.CharField(max_length=100, null=True)
    ## If the invite code are enabled.
    inviteCodeEnabled = models.BooleanField(default=False)
    ## The path of the buffer (where the uploaded songs are saved).
    bufferPath = models.FilePathField(max_length=1000, null=True)


## This class describes the invite codes.
class InviteCode(models.Model):
    ## The user associated with the code
    user = models.ForeignKey(User)
    ## The invite code.
    code = models.CharField(max_length=33)


## This class describe the manacoin wallet of a user.
class Wallet(models.Model):
    ## The gain in manacoin the user has with mining.
    miningGain = models.IntegerField(default=0)
    ## The coin loss the user has.
    miningLoss = models.IntegerField(default=0)
    ## The gain the user has with mining + other gain (achievements).
    globalGain = models.IntegerField(default=0)
    ## The loss the user has with mining + other loss (buy hints).
    globalLoss = models.IntegerField(default=0)


## This class describe the transactions that are possibles.
class TransactionType(models.Model):
    ## The name of the transaction.
    name = models.CharField(max_length=100)
    ## The code of the transaction.
    code = models.CharField(max_length=5)
    ## The number of coin reward for this type of transaction.
    coinGain = models.IntegerField(default=0)
    ## The number of coin loss for this type of transaction.
    coinLoss = models.IntegerField(default=0)
    ## How much the streak is increased in case of success.
    streakGain = models.IntegerField(default=0)
    ## How much the streak is reduced in case of fail.
    streakLoss = models.IntegerField(default=0)
    ## If the transaction give money to the user's godfather.
    bubbles = models.BooleanField(default=False)


## This class is the history of all transaction in manazeak.
class TransactionHistory(models.Model):
    ## The type of transaction created.
    transactionType = models.ForeignKey(TransactionType)
    ## The streak of the user at this time.
    streak = models.FloatField(default=0)
    ## If it was a gain or a loss
    isGain = models.BooleanField(default=False)
    ## If a multiplier was applied to the transaction.
    baseMultiplier = models.FloatField(default=0)
    ## The user associated with the transacation.
    user = models.ForeignKey(User)


## This class is the permission of the application.
class Permissions(models.Model):
    ## The name of the permission.
    name = models.CharField(max_length=1000)
    ## The code name of the permission.
    code = models.CharField(max_length=4)


## This class define the groups inside the app.
class Groups(models.Model):
    ## The name of the group.
    name = models.CharField(max_length=1000, default="Default")
    ## The rank of the group (for display purpose).
    rank = models.IntegerField(default=0)
    ## The permissions associated to the group.
    permissions = models.ManyToManyField(Permissions)


## This class define the achievements in the app.
class Achievement(models.Model):
    ## The reward given for the achievement
    reward = models.IntegerField()
    ## If the description of the achievement is hidden.
    isHidden = models.BooleanField(default=True)
    ## The code of the achievement
    code = models.CharField(max_length=10, unique=True)
    ## The user that posses the achievement.
    user = models.ManyToManyField(User)


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
