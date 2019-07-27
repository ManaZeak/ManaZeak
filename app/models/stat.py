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


class TrackInScopeStats(models.Model):
    ## The number of disc in the scope
    totalDisc = models.IntegerField(null=True)
    ## the number of track in the scope.
    totalTrack = models.IntegerField(null=True)
    ## The total duration of the track in the scope.
    totalDuration = models.FloatField()
    ## The average track duration in the scope.
    averageTrackDuration = models.FloatField()
    ## The album average bit rate in the scope.
    averageBitRate = models.FloatField(null=True)
    ## The album average sample rate in the scope.
    averageSampleRate = models.FloatField(null=True)
    ## The average BPM of the track in the scope.
    averageBpm = models.FloatField(null=True)
    ## The average of the average color in mood of the tracks in the scope.
    averageMood = models.ForeignKey(MoodAverage, on_delete=DO_NOTHING)
    ## The percentage of flac files in the scope.
    flacPercentage = models.FloatField()
