from app.src.config.constants import Constants


## Artist representation for the main page.trackNumber
class MainPageAlbum(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.title = None
        self.year = None
        self.picture = None

    ## Initialise the album object with data returned from the database.
    def buildFromRandomAlbumDao(self, sqlRow):
        self.id = sqlRow[0]
        self.title = sqlRow[1]
        self.year = sqlRow[3]
        self.picture = Constants.ALBUM_COVER_LOCATION + sqlRow[2]

    ## Initialise the album object with data returned from the orm.
    def buildFromOrmAlbum(self, album):
        self.id = album.id
        self.title = album.title
        self.year = album.year
        self.picture = Constants.ALBUM_COVER_LOCATION + album.track_set.first().cover.location

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ALBUM_ID': self.id,
            'ALBUM_TITLE': self.title,
            'ALBUM_YEAR': self.year,
            'ALBUM_COVER': self.picture,
            'STATS': None,
        }
