## Artist representation for the main page.trackNumber
class MainPageAlbum(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.title = None
        self.picture = None

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ALBUM_ID': self.id,
            'ALBUM_TITLE': self.title,
            'ALBUM_COVER': self.picture,
            'STATS': None,
        }
