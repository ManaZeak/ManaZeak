from django.contrib.auth.models import User
from django.db import models

from app.models import Track


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
