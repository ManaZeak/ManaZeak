from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.services.composer.composerService import ComposerService
from app.src.services.country.countryService import CountryService
from app.src.services.genre.genreService import GenreService
from app.src.services.label.labelService import LabelService
from app.src.views.object.single.singleObjectViews import SingleObjectViews

app_name = 'app'

## Contains the sceneviews and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('releaseArtist/layout/', SingleObjectViews.getSingleArtistPage, name='getSingleReleaseArtistPage'),
    path('releaseArtist/<int:artistId>/', ArtistService.getArtist, name='getSingleReleaseArtist'),

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

    path('country/layout/', SingleObjectViews.getSingleCountryPage, name='getSingleCountryPage'),
    path('country/<int:countryId>/', CountryService.getCountry, name='getSingleCountry'),

    # FIXME : faire la page get producer

    path('composer/<int:composerId>', ComposerService.getComposer, name='getSingleComposer'),
]
