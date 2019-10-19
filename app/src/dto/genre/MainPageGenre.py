from os import path

## Genre representation for the main page.
from app.src.config.constants import Constants


class MainPageGenre(object):

    def __init__(self):
        self.id = None
        self.image = None
        self.name = None
        self.description = None

    ## Initialise a genre object with sql row return by the randomGenre getter.
    def buildFromRandomGenreDao(self, sqlRow):
        self.id = sqlRow[0]
        self.name = sqlRow[1]
        self.description = sqlRow[2]
        self.image = self._generatePicturePath()

    ## Initialise a genre from an orm object
    def buildFromOrmGenre(self, genre):
        self.id = genre.id
        self.name = genre.name
        self.description = genre.description
        self.image = self._generatePicturePath()

    def getJsonObject(self):
        return {
            'GENRE_ID': self.id,
            'GENRE_LOGO': self.image,
            'GENRE_NAME': self.name,
            'GENRE_DESC': self.description,
            'STATE': None,
        }

    ## Generate the path of the artist picture and checks if it exists.
    #   @return the path if it exists.
    def _generatePicturePath(self):
        # TODO à bouger dans une class utils je pense (same pour artist)
        sanitizedName = ''
        forbiddenChars = ['*', '/', '\\', ':', '?', '<', '>', '|']
        for x in range(0, len(self.name)):
            if self.name[x] in forbiddenChars:
                sanitizedName += '-'
            else:
                sanitizedName += self.name[x]

        imagePath = Constants.GENRE_COVER_LOCATION + sanitizedName + '.jpg' # TODO j'ai add l'ext mais ça serait mieux d'etre géré avec le mimetype
        if not path.exists('/' + imagePath):
            return None
        else:
            return imagePath