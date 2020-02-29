from app.src.config.constants import Constants


## Artist representation for the main page.trackNumber
from app.src.services.thumbs.coverThumbnailService import CoverThumbnailService
from app.src.utils.imageGenerators.thumbSizeEnum import ThumbSizeEnum


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
        self.picture = CoverThumbnailService.getThumbnailForCover(sqlRow[2], ThumbSizeEnum.SMALL)

    ## Initialise the album object with data returned from the orm.
    def buildFromOrmAlbum(self, album):
        self.id = album.id
        self.title = album.title
        self.year = album.year
        self.picture = CoverThumbnailService.getThumbnailForCover(
            album.track_set.first().cover.location, ThumbSizeEnum.SMALL)

    ## Initialise the album from an artist getter DAO line.
    def buildFromArtistDao(self, sqlRow):
        self.id = sqlRow[3]
        self.title = sqlRow[4]
        self.year = sqlRow[5]
        if sqlRow[6] is not None:
            self.picture = CoverThumbnailService.getThumbnailForCover(sqlRow[6], ThumbSizeEnum.SMALL)

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ALBUM_ID': self.id,
            'ALBUM_TITLE': self.title,
            'ALBUM_YEAR': self.year,
            'ALBUM_COVER': self.picture,
            'STATS': None,
        }
