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

