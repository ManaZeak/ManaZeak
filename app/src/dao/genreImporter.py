import logging
from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')

## Import some genre into the database.
class GenreImporter(AbstractDao):

    ## Merge the genres into the database.
    #   @param genres a set containing the genres to insert into the database.
    #   @return a dict containing the genre name linked to its id.
    def mergeGenres(self, genres):
        genreRef = dict()
        loggerScan.info(str(len(genres)) + ' genres to import.')
        # Split the genre by the maximal object in a manual query
        splicedGenresNames = ListUtils.chunksSet(genres, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of genre
        for subGenres in splicedGenresNames:
            # Merging the genre insert to the old ones
            genreRef = {**self._executeRequest(subGenres), **genreRef}
        return genreRef

    ## Generate a sql request with the given params
    def _generateRequest(self, genres):
        return 'INSERT INTO app_genre (name) VALUES {} ON CONFLICT (name) ' \
              'DO UPDATE SET name = EXCLUDED.name returning id, name'.format(', '.join(['(%s)'] * len(genres)))

    ## Execute the sql request and returns the results.
    def _executeRequest(self, genres):
        genreRef = dict()
        # Generating the request
        sql = self._generateRequest(genres)
        # Getting the parameters
        params = self._generateParams(genres)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                genreRef[row[1]] = row[0]
        return genreRef

    ## Prepares the genres for the upsert.
    def _generateParams(self, genres):
        params = []
        for name in genres:
            params.extend([name])
        return params
