from django.db import models
from django.db.models import DO_NOTHING


## The average values of the mood file.
class MoodAverage(models.Model):
    ## Represents the bass range.
    r = models.FloatField()
    ## Represents the middle range.
    g = models.FloatField()
    ## Represents the high range.
    b = models.FloatField()


class TrackInScopeAverages(models.Model):
    ## The number of disc of the artist.
    totalDisc = models.IntegerField(null=True)
    ## the number of track in the album.
    totalTrack = models.IntegerField(null=True)
    ## The duration of the artist tracks
    totalDuration = models.FloatField()
    ## The average track duration in the album
    averageTrackDuration = models.FloatField()
    ## The album average bit rate
    averageBitRate = models.FloatField(null=True)
    ## The album average sample rate
    averageSampleRate = models.FloatField(null=True)
    ## The average BPM of the track of the artist
    averageBpm = models.FloatField(null=True)
    ## The average of the average color in mood of the tracks of the artist
    averageMood = models.ForeignKey(MoodAverage, on_delete=DO_NOTHING)
    ## The percentage of flac files in the album
    flacPercentage = models.FloatField()
