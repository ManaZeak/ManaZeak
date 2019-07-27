## This class describe an artist of a track for the lazy loading of the list view.
class LocalLazyArtist(object):

    def __init__(self):
        self.id = None
        self.name = None

    ## Generate the json object of an artist.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name
        }
