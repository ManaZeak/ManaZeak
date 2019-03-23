import abc


class AbstractDao(object, metaclass=abc.ABCMeta):

    @abc.abstractmethod
    ## Generate the request for the DAO
    def _generateRequest(self, objectsToSave):
        raise NotImplementedError('The function needs an override.')

    @abc.abstractmethod
    ## Execute the request to save the data into the database.
    def _executeRequest(self, objectToSave):
        raise NotImplementedError('The function needs an override.')

    @abc.abstractmethod
    ## Prepares the parameters to be send to the request.
    def _generateParams(self, objectToSave):
        raise NotImplementedError('The function needs an override.')
