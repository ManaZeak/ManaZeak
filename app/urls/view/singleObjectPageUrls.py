from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.services.composer.composerService import ComposerService
from app.src.services.genre.genreService import GenreService
from app.src.views.genericViews import GenericViews

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('artist/layout/', GenericViews.getSingleArtistPage, name='getSingleArtistPage'),
    path('artist/<int:artistId>/', ArtistService.getArtist, name='getSingleArtist'),

    path('album/layout/', GenericViews.getSingleAlbumPage, name='getSingleAlbumPage'),
    path('album/<int:albumId>/', AlbumService.getAlbum, name='getSingleAlbum'),
    path('album/random/', AlbumService.getRandomAlbum, name='getRandomAlbum'),

    path('genre/layout/', GenericViews.getSingleGenrePage, name='getSingleGenrePage'),
    path('genre/<int:genreId>/', GenreService.getGenre, name='getSingleGenre'),

    path('composer/<int:composerId>', ComposerService.getComposer, name='getSingleComposer'),
]
