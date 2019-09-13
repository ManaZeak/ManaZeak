from os import path

from app.src.config.constants import Constants


## Artist representation for the main page.
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
        self.picture = self._generatePicturePath()

    ## Build an artist object from an orm artist object.
    #   @param artist the artist object of the ORM.
    def buildFromOrmArtistObject(self, artist):
        self.id = artist.id
        self.name = artist.name
        self.picture = self._generatePicturePath()

    ## Generate a json object from an object.
    def getJsonObject(self):
        return {
            'ARTIST_ID': self.id,
            'ARTIST_NAME': self.name,
            'ARTIST_PP': self.picture,
            'STATS': None,
        }

    ## Generate the path of the artist picture and checks if it exists.
    #   @return the path if it exists.
    def _generatePicturePath(self):
        # TODO à bouger dans une class utils je pense (same pour genre)
        sanitizedName = ''
        forbiddenChars = ['*', '/', '\\', ':', ';', '?', '<', '>', '\"', '|', '\'']
        for x in range(0, len(self.name)):
            if self.name[x] in forbiddenChars:
                sanitizedName += '-'
            else:
                sanitizedName += self.name[x]

        imagePath = Constants.ARTIST_PICTURE_LOCATION + sanitizedName + '.jpg'  # TODO j'ai add l'ext mais ça serait mieux d'etre géré avec le mimetype
        if not path.exists('/' + imagePath):
            return None
        else:
            return imagePath
