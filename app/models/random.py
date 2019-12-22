from django.db import models
from django.db.models import DO_NOTHING

from app.models import Track, Album, Artist, Playlist, Genre


## This class represents the table for storing the contiguous sequence for selecting tracks.
from app.models.track import Label


class RandomTrackSortedByName(models.Model):
    track = models.ForeignKey(Track, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing the contiguous sequence for selecting tracks sorted by release artist.
class RandomTrackSortedByArtist(models.Model):
    track = models.ForeignKey(Track, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing contiguous sequence for selecting albums.
class RandomAlbumSortedByArtist(models.Model):
    album = models.ForeignKey(Album, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing contiguous sequence for selecting release artists.
class RandomReleaseArtistSortedByName(models.Model):
    artist = models.ForeignKey(Artist, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing contiguous sequence for selecting artists.
class RandomArtistSortedByName(models.Model):
    artist = models.ForeignKey(Artist, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing contiguous sequence for selecting genres.
class RandomGenreSortedByName(models.Model):
    genre = models.ForeignKey(Genre, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)

## This class represents the table for storing contiguous sequence for selecting labels.
class RandomLabelSortedByName(models.Model):
    label = models.ForeignKey(Label, on_delete=DO_NOTHING)
    playlist = models.ForeignKey(Playlist, on_delete=DO_NOTHING)
    hashIndex = models.IntegerField(db_index=True)
