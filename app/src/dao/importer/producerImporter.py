import logging

from app.src.config.constants import Constants
from app.src.dao.importer.abstractDaoImporter import AbstractDaoImporter
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some genre into the database.
class ProducerImporter(AbstractDaoImporter):

    ## Merge the genres into the database.
    #   @param genres a set containing the genres to insert into the database.
    #   @return a dict containing the genre name linked to its id.
    def importProducers(self, producers):
        producerRef = dict()
        loggerScan.info(str(len(producers)) + ' producers to import.')
        # Split the genre by the maximal object in a manual query
        splicedProducersNames = ListUtils.chunksSet(producers, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of genre
        for subProducers in splicedProducersNames:
            # Merging the genre insert to the old ones
            producerRef = {**self._executeRequest(subProducers), **producerRef}
        return producerRef

    ## Generate a sql request with the given params
    def _generateRequest(self, genres):
        return 'INSERT INTO app_producer (name) VALUES {} ' \
               'ON CONFLICT (name) ' \
               'DO UPDATE SET name = EXCLUDED.name returning id, name'.format(', '.join(['(%s)'] * len(genres)))

    ## Prepares the genres for the upsert.
    def _generateParams(self, producers):
        params = []
        for name in producers:
            params.extend([name])
        return params
