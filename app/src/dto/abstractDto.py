import abc

class AbstractDto(object, metaclass=abc.ABCMeta):

    @abc.abstractmethod
    ## Generate the json from the object
    def generateJson(self):
        raise NotImplementedError('The function needs an override.')
