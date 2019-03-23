import logging
from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')

## Import some artists into the database.
class ArtistImporter(AbstractDao):

    ## Merge the artists into the database.
    #   @param artists a set containing the artists to insert into the database.
    #   @return a dict containing the artists name linked to its id.
    def mergeArtists(self, artists):
        artistsRef = dict()
        loggerScan.info(str(len(artists)) + ' artists to import.')
        # Split the genre by the maximal object in a manual query (converting the dict into a list)
        splicedArtists = ListUtils.chunksSet(list(artists.values()), Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of genre
        for subArtists in splicedArtists:
            # Merging the genre insert to the old ones
            artistsRef = {**self._executeRequest(subArtists), **artistsRef}
        return artistsRef

    ## Generate a sql request with the given params
    def _generateRequest(self, artists):
        return 'INSERT INTO app_artist (name, "realName", "folderName", location) VALUES {} ON CONFLICT (name) ' \
               'DO UPDATE SET name = EXCLUDED.name, "realName" = EXCLUDED."realName", location = EXCLUDED.location, ' \
               '"folderName" = EXCLUDED."folderName"' \
               'returning id, name'.format(', '.join(['(%s, %s, %s, %s)'] * len(artists)))

    ## Execute the sql request and returns the results.
    def _executeRequest(self, artists):
        artistRef = dict()
        # Generating the request
        sql = self._generateRequest(artists)
        # Getting the parameters
        params = self._generateParams(artists)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                artistRef[row[1]] = row[0]
        return artistRef

    ## Prepares the genres for the upsert.
    def _generateParams(self, artists):
        params = []
        for artist in artists:
            params.extend([artist.name, artist.realName, artist.folderName, artist.location])
        return params
