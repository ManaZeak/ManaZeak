from django.contrib.auth.models import User
from django.db import models

from app.models import Playlist, Track


## This class is used to represent the tracks already played by a user when shuffling.
class AlbumShuffle(models.Model):
    playlistId = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    trackId = models.ForeignKey(Track, on_delete=models.CASCADE)
