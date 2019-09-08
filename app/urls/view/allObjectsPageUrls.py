from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.views.genericViews import GenericViews

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('artist/layout/', GenericViews.getAllArtistsPage, name='getAllArtistPage'),
    path('artist/', ArtistService.getAllArtists, name='getAllArtists'),

    path('album/layout/', GenericViews.getAllAlbumsPage, name='getAllAlbumsPage'),
    path('album/', AlbumService.getAllAlbums, name='getAllAlbums'),
    path('genre/layout/', GenericViews.getAllGenresPage, name='getAllGenresPage'),
]
