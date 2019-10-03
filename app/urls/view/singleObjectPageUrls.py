from django.urls import path

from app.src.services.artist.artistService import ArtistService
from app.src.views.genericViews import GenericViews

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('artist/layout/', GenericViews.getSingleArtistPage, name='getSingleArtistPage'),
    path('artist/<int:artistId>/', ArtistService.getArtist, name='getArtist'),
    path('album/layout/', GenericViews.getSingleAlbumPage, name='getSingleAlbumPage'),
    path('genre/layout/', GenericViews.getSingleGenrePage, name='getSingleGenrePage'),
]
