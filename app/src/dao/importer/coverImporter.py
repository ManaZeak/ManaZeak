import logging

from app.src.config.constants import Constants
from app.src.dao.importer.abstractDaoImporter import AbstractDaoImporter
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some genre into the database.
class CoverImporter(AbstractDaoImporter):

    ## Merge the covers into the database.
    #   @param covers a set containing the covers to insert into the database.
    #   @return a dict containing the genre name linked to its id.
    def importCovers(self, covers):
        coverRef = dict()
        loggerScan.info(str(len(covers)) + ' covers to import.')
        # Split the genre by the maximal object in a manual query
        splicedCoverLocation = ListUtils.chunksSet(covers, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of covers
        for subCovers in splicedCoverLocation:
            # Merging the covers insert to the new ones
            coverRef = {**self._executeRequest(subCovers), **coverRef}
        return coverRef

    ## Generate a sql request with the given params
    def _generateRequest(self, covers):
        return 'INSERT INTO app_cover (location) VALUES {} ON CONFLICT (location) ' \
               'DO UPDATE SET location = EXCLUDED.location returning id, location' \
            .format(', '.join(['(%s)'] * len(covers)))

    ## Prepares the genres for the upsert.
    def _generateParams(self, covers):
        params = []
        for location in covers:
            params.extend([location])
        return params
