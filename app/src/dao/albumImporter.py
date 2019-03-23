import logging

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')

## Imports the album into the database.
class AlbumImporter(AbstractDao):

    def importAlbums(self, albums):
        albumsRef = dict()
        loggerScan.info(str(len(albums)) + ' albums to import.')
        # Split the genre by the maximal object in a manual query (converting the dict into a list)
        splicedAlbums = ListUtils.chunksSet(list(albums.values()), Constants.REQUEST_PER_BATCH)
        # Executing the query for each sub group of genre
        for subAlbums in splicedAlbums:
            # Merging the genre insert to the old ones
            albumsRef = {**self._executeRequest(subAlbums), **albumsRef}
        return albumsRef

    ## Generating the sql request
    def _generateRequest(self, albums):
        return 'INSERT INTO app_album ("folderName", title, year, "releaseArtist_id", location) VALUES {}' \
                'ON CONFLICT (location)' \
                'DO UPDATE SET "folderName" = EXCLUDED."folderName", title = EXCLUDED."title", year = EXCLUDED.year,' \
                '"releaseArtist_id" = EXCLUDED."releaseArtist_id" ' \
               'returning id, location'.format(', '.join(['(%s, %s, %s, %s, %s)'] * len(albums)))

    ## Executing the sql request.
    def _executeRequest(self, request):
        pass

    ## Generating the parameters of the request.
    def _generateParams(self, albums):
        params = []
        for album in albums:
            # FIXME: ajouter l'id de l'artiste
            params.extend([album.folderName, album.title, album.year, album.location])
        return params
