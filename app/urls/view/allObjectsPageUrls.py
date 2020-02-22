from django.urls import path

from app.src.services.album.albumService import AlbumService
from app.src.services.artist.artistService import ArtistService
from app.src.services.composer.composerService import ComposerService
from app.src.services.country.countryService import CountryService
from app.src.services.genre.genreService import GenreService
from app.src.services.label.labelService import LabelService
from app.src.views.object.all.allObjectView import AllObjectView

app_name = 'app'

## Contains the views and the urls for single object display.
#   One genre, album or artist.
urlpatterns = [
    path('releaseArtist/layout/', AllObjectView.getAllReleaseArtistsPage, name='getAllReleaseArtistPage'),
    path('releaseArtist/', ArtistService.getAllReleaseArtists, name='getAllReleaseArtists'),

    path('artist/layout/', AllObjectView.getAllArtist, name='getAllArtistPage'),
    path('artist/', ArtistService.getAllArtists, name='getAllArtist'),

    path('album/layout/', AllObjectView.getAllAlbumsPage, name='getAllAlbumsPage'),
    path('album/', AlbumService.getAllAlbums, name='getAllAlbums'),

    path('producer/layout/', AllObjectView.getAllProducersPage, name='getAllGenresPage'),

    path('genre/layout/', AllObjectView.getAllGenresPage, name='getAllGenresPage'),
    path('genre/', GenreService.getAllGenres, name='getAllGenres'),

    path('label/layout/', AllObjectView.getAllLabelsPage, name='getAllLabelsPage'),
    path('label/', LabelService.getAllLabel, name='getAllLabels'),

    path('country/layout/', AllObjectView.getAllCountriesPage, name='getAllCountriesPage'),
    path('country/', CountryService.getAllCountries, name="getAllCountries"),

    # FIXME : faire la page get producer

    path('composer/', ComposerService.getAllComposers, name='getAllComposers'),
]
