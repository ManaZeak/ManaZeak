import logging

loggerScan = logging.getLogger('scan')

class LocalLazyGenre(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.name = None

    ## Loads a genre from the genre ORM object.
    def loadFromGenre(self, genre):
        self.id = genre.id
        self.name = genre.name

    ## Generate the JSON object of a genre.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
        }

    ## Recreating the hash for set.
    def __hash__(self):
        return hash(str(self.id))

    ## Recreating the equals operator for the set.
    def __eq__(self, other):
        if isinstance(other, LocalLazyGenre):
            return self.__hash__() == other.__hash__()
        else:
            return False
