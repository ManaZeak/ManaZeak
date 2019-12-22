from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.services.composer.composerService import ComposerService
from app.src.services.genre.genreService import GenreService
from app.src.views.object.all.allObjectView import AllObjectView

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('releaseArtist/layout/', AllObjectView.getAllReleaseArtistsPage, name='getAllReleaseArtistPage'),
    path('releaseArtist/', ArtistService.getAllReleaseArtists, name='getAllReleaseArtists'),

    path('album/layout/', AllObjectView.getAllAlbumsPage, name='getAllAlbumsPage'),
    path('album/', AlbumService.getAllAlbums, name='getAllAlbums'),

    path('genre/layout/', AllObjectView.getAllGenresPage, name='getAllGenresPage'),
    path('genre/', GenreService.getAllGenres, name='getAllGenres'),

    path('artist/layout/', AllObjectView.getAllArtist, name='getAllArtistPage'),
    path('artist/', AlbumService.getAllAlbums, name='getAllArtist'),

    # FIXME : faire la page get label

    # FIXME : faire la page get producer

    # FIXME : faire la page get country

    path('composer/', ComposerService.getAllComposers, name='getAllComposers'),
]
