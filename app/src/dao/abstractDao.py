import abc

from app.src.config.constants import Constants

## This class represents a DAO object and it's basic functions.
class AbstractDao(object, metaclass=abc.ABCMeta):

    @abc.abstractmethod
    ## Generate the request for the DAO
    def _generateRequest(self, objectsToSave):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    @abc.abstractmethod
    ## Execute the request to save the data into the database.
    def _executeRequest(self, objectsToSave):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)

    @abc.abstractmethod
    ## Prepares the parameters to be send to the request.
    def _generateParams(self, objectsToSave):
        raise NotImplementedError(Constants.NOT_IMPLEMENTED)
