from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.services.composer.composerService import ComposerService
from app.src.services.genre.genreService import GenreService
from app.src.services.label.labelService import LabelService
from app.src.views.object.single.singleObjectViews import SingleObjectViews

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('releaseArtist/layout/', SingleObjectViews.getSingleReleaseArtistPage, name='getSingleReleaseArtistPage'),
    path('releaseArtist/<int:artistId>/', ArtistService.getReleaseArtist, name='getSingleReleaseArtist'),

    path('artist/layout/', SingleObjectViews.getSingleArtistPage, name='getSingleArtistPage'),
    path('artist/<int:artistId>/', ArtistService.getArtist, name='getArtist'),

    path('album/layout/', SingleObjectViews.getSingleAlbumPage, name='getSingleAlbumPage'),
    path('album/<int:albumId>/', AlbumService.getAlbum, name='getSingleAlbum'),
    path('album/random/', AlbumService.getRandomAlbum, name='getRandomAlbum'),

    path('genre/layout/', SingleObjectViews.getSingleGenrePage, name='getSingleGenrePage'),
    path('genre/<int:genreId>/', GenreService.getGenre, name='getSingleGenre'),

    path('producer/layout/', SingleObjectViews.getSingleProducerPage, name='getSingleProducerPage'),

    path('label/layout/', SingleObjectViews.getSingleLabelPage, name='getSingleLabelPage'),
    path('label/<int:labelId>/', LabelService.getLabel, name='getSingleLabel'),

    # FIXME : faire la page get label

    # FIXME : faire la page get producer

    # FIXME : faire la page get country

    path('composer/<int:composerId>', ComposerService.getComposer, name='getSingleComposer'),
]
