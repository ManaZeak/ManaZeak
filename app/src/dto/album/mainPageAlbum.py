from app.src.config.constants import Constants


## Artist representation for the main page.trackNumber
class MainPageAlbum(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.title = None
        self.picture = None

    ## Initialise the album object with data returned from the database.
    def buildFromRandomAlbumDao(self, sqlRow):
        self.id = sqlRow[0]
        self.title = sqlRow[1]
        self.picture = Constants.ALBUM_COVER_LOCATION + sqlRow[2]

    def buildFromOrmAlbum(self, album):
        self.id = album.id
        self.title = album.title
        self.picture = Constants.ALBUM_COVER_LOCATION + album.track_set.first().cover.location

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ALBUM_ID': self.id,
            'ALBUM_TITLE': self.title,
            'ALBUM_COVER': self.picture,
            'STATS': None,
        }
