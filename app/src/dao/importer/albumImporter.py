import logging
from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Imports the album into the database.
class AlbumImporter(AbstractDao):

    ## Imports the list of albums found into the database.
    #   @param albums a dict containing the album location linked to the album.
    def importAlbums(self, albums):
        albumsRef = dict()
        loggerScan.info(str(len(albums)) + ' albums to import.')
        # Split the genre by the maximal object in a manual query (converting the dict into a list)
        splicedAlbums = ListUtils.chunksSet(list(albums.values()), Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of genre
        for subAlbums in splicedAlbums:
            # Merging the genre insert to the old ones
            albumsRef = {**self._executeRequest(subAlbums), **albumsRef}
        return albumsRef

    ## Generating the sql request
    #   @param albums a list of album object to insert.
    def _generateRequest(self, albums):
        return 'INSERT INTO app_album ("folderName", title, year, "releaseArtist_id", location, producer_id) VALUES {}' \
                'ON CONFLICT (location)' \
                'DO UPDATE SET "folderName" = EXCLUDED."folderName", title = EXCLUDED."title", year = EXCLUDED.year,' \
                '"releaseArtist_id" = EXCLUDED."releaseArtist_id" ' \
               'returning id, location'.format(', '.join(['(%s, %s, %s, %s, %s, %s)'] * len(albums)))

    ## Executing the sql request.
    #   @param albums a list of album object to insert.
    def _executeRequest(self, albums):
        albumRef = dict()
        # Generating the request
        sql = self._generateRequest(albums)
        # Getting the parameters
        params = self._generateParams(albums)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                albumRef[row[1]] = row[0]
        return albumRef

    ## Generating the parameters of the request.
    #   @param albums a list of album object to insert.
    def _generateParams(self, albums):
        params = []
        for album in albums:
            params.extend([album.folderName, album.title, album.year, album.artistId, album.location, album.producerId])
        return params
