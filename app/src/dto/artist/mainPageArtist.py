from os import path

from app.src.config.constants import Constants


## Artist representation for the main page.
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


class MainPageArtist(object):

    ## Constructor
    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None

    ## Build an artist object from the SQL request.
    #   @param sqlRow the row returned by the SQL.
    def buildFromRandomArtistsGetter(self, sqlRow):
        self.id = sqlRow[0]
        self.name = sqlRow[1]
        self.picture = CoverPathGenerator.generateArtistPicturePath(self.name)

    ## Build an artist object from an orm artist object.
    #   @param artist the artist object of the ORM.
    def buildFromOrmArtistObject(self, artist):
        self.id = artist.id
        self.name = artist.name
        self.picture = CoverPathGenerator.generateArtistPicturePath(self.name)

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ARTIST_ID': self.id,
            'ARTIST_NAME': self.name,
            'ARTIST_PP': self.picture,
            'STATS': None,
        }
