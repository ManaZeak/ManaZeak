from abc import ABC
from contextlib import closing

from django.db import connection

from app.src.dao.abstractDao import AbstractDao


class AbstractDaoImporter(AbstractDao, ABC):

    def _executeRequest(self, objectsToSave):
        objectRef = dict()
        # Generating the request
        sql = self._generateRequest(objectsToSave)
        # Getting the parameters
        params = self._generateParams(objectsToSave)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                objectRef[row[1]] = row[0]
        return objectRef
