import abc
import logging
from abc import ABC

from django.db import transaction

from app.src.dao.script.random.createRandomTempSequence import CreateRandomTempSequence

loggerScan = logging.getLogger('scan')

class AbstractRandomGenerator(ABC):

    @transaction.atomic  # Creating transaction for this method.
    ## Fill the table containing a artist linked to an contiguous id.
    def fillTableRandom(self, playlistId):
        loggerScan.info('Started creation of the random for ' + self._getRandomName() + '.')
        # Create the temporary sequence
        self._createTempSequence()
        # Inserting the artists into the new table
        self._insertData(playlistId)
        loggerScan.info('Ended creation of the random for ' + self._getRandomName() + '.')

    ## Fill the table with the object linked to an id.
    def _insertData(self, playlistId):
        filler = self._getFillRandomObject()
        filler.executeRequest(playlistId)

    ## Create a temporary sequence.
    def _createTempSequence(self):
        sequenceGen = CreateRandomTempSequence()
        sequenceGen.executeRequest(self._getSequenceName())

    @abc.abstractmethod
    ## Get the sequence name to create into the database.
    def _getSequenceName(self):
        raise NotImplementedError('The function needs an override.')

    @abc.abstractmethod
    ## Get the filler object for executing the sql.
    def _getFillRandomObject(self):
        raise NotImplementedError('The function needs an override.')

    @abc.abstractmethod
    ## Get the name of the table that is filled.
    def _getRandomName(self):
        raise NotImplementedError('The function needs an override.')
