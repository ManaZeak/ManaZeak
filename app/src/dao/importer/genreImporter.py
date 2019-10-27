import logging

from app.src.config.constants import Constants
from app.src.dao.importer.abstractDaoImporter import AbstractDaoImporter
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some genre into the database.
class GenreImporter(AbstractDaoImporter):

    ## Merge the genres into the database.
    #   @param genres a set containing the genres to insert into the database.
    #   @return a dict containing the genre name linked to its id.
    def importGenres(self, genres):
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

    ## Prepares the genres for the upsert.
    def _generateParams(self, genres):
        params = []
        for name in genres:
            params.extend([name])
        return params
