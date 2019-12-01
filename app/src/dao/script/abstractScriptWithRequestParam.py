import abc
from abc import ABC
from contextlib import closing

from django.db import connection

## Abstract class for SQL script without any parameters
class AbstractScriptWithRequestParam(ABC):

    ## Inserting the object into the database.
    #   @param links the links between the tracks and the performer.
    def executeRequest(self, param):
        # Generating the sql request
        sql = self._generateRequest()
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, [param])

    @abc.abstractmethod
    ## Generate the SQL request.
    def _generateRequest(self):
        raise NotImplementedError('The function needs an override.')
