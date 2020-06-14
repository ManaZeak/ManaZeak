from abc import ABC
from contextlib import closing

from django.db import connection

from app.src.dao.abstractDao import AbstractDao


class AbstractLinkerDao(AbstractDao, ABC):

    ## Inserting the object into the database.
    #   @param links the links between the tracks and the performer.
    def _executeRequest(self, links):
        # Generating the sql request
        sql = self._generateRequest(links)
        # Generating the params for the request
        params = self._generateParams(links)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)

    ## Generate the list containing the params of the sql request.
    #   @param links the links to be inserted into the database.
    #   @return the params of the sql request.
    def _generateParams(self, links):
        params = []
        for link in links:
            params.extend([link[0], link[1]])
        return params
