import logging
from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some genre into the database.
class ProducerImporter(AbstractDao):

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

    ## Execute the sql request and returns the results.
    def _executeRequest(self, producers):
        producerRef = dict()
        # Generating the request
        sql = self._generateRequest(producers)
        # Getting the parameters
        params = self._generateParams(producers)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                producerRef[row[1]] = row[0]
        return producerRef

    ## Prepares the genres for the upsert.
    def _generateParams(self, producers):
        params = []
        for name in producers:
            params.extend([name])
        return params
