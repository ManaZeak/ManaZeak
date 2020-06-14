from django.urls import path

from app.src.services.collections.playlist.playlistService import PlaylistService

app_name = 'app'

## The playlist URL.
urlpatterns = [
    path('getUserPlaylists/', PlaylistService.getUserPlaylists, name='getUserPlaylists'),
    path('simplifiedLazyLoading/', PlaylistService.lazyLoadPlaylist, name='lazyLoading'),
]