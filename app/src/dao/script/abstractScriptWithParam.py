import abc
from abc import ABC
from contextlib import closing

from django.db import connection

## Abstract class for SQL script without any parameters
class AbstractScriptWithParam(ABC):

    ## Inserting the object into the database.
    #   @param links the links between the tracks and the performer.
    def executeRequest(self, param):
        # Generating the sql request
        sql = self._generateRequest(param)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql)

    @abc.abstractmethod
    ## Generate the SQL request.
    def _generateRequest(self, param):
        raise NotImplementedError('The function needs an override.')
