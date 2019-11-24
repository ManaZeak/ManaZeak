import abc
from contextlib import closing

from django.db import connection


class AbstractDaoGetter(object, metaclass=abc.ABCMeta):

    @abc.abstractmethod
    ## Generate the request for the DAO
    def _generateRequest(self):
        raise NotImplementedError('The function needs an override.')

    ## Execute the request to save the data into the database.
    def _executeRequest(self, numberOfElements):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(), self._generateParams(numberOfElements))
            return cursor.fetchall()

    @staticmethod
    ## Prepares the parameters to be send to the request.
    def _generateParams(objectsToGet):
        return [objectsToGet]
