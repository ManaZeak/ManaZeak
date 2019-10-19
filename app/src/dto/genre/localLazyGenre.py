class LocalLazyGenre(object):

    def __init__(self):
        self.name = None
        self.id = None

    ## Generate the JSON object of a album.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
        }

