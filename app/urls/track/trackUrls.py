from django.urls import path

from app.src.services.playback.playbackService import PlaybackService
from app.src.services.track.bpm.BpmService import BpmService
from app.src.services.track.trackService import TrackService

app_name = 'app'

## The modals URLS.
urlpatterns = [
    path('get/<int:trackId>/', TrackService.getTrack, name='getTrack'),
    path('random/', PlaybackService.getRandomTrack, name='getRandom'),
    path('shuffle/', PlaybackService.getShuffleAlbum, name='getShuffle'),

    # Setting the BPM
    path('setBpm/', BpmService.setTrackBpm, name='setBpm'),
]