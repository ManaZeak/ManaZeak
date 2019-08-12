## Artist representation for the main page.trackNumber
class MainPageArtist(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None
        self.trackNumber = None

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ARTIST_ID': self.id,
            'NAME': self.name,
            'PICTURE': self.picture,
        }
