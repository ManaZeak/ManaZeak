from django.urls import path

from app.src.services.dump.AlbumDumpService import AlbumDumpService
from app.src.services.dump.ArtistDumpService import ArtistDumpService
from app.src.services.dump.GenreDumpService import GenreDumpService

app_name = 'app'

## The contexts URLS.
urlpatterns = [

    path('artists/', ArtistDumpService.dumpAllArtists, name='dumpAllArtists'),  # send the artists in the database.

    path('albums/', AlbumDumpService.dumpAllAlbums, name='dumpAllAlbums'),
    path('album/<int:artistId>/', AlbumDumpService.dumpAlbumForArtist, name='dumpAlbumsForArtist'),

    path('genres/', GenreDumpService.dumpAllGenres, name='dumpAllGenres'),
]