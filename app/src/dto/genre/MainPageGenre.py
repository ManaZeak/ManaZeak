from os import path

from app.src.config.constants import Constants


## Genre representation for the main page.
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
        self.image = self.generateGenrePicturePath(self.name)

    ## Initialise a genre from an orm object
    def buildFromOrmGenre(self, genre):
        self.id = genre.id
        self.name = genre.name
        self.description = genre.description
        self.image = self.generateGenrePicturePath(genre.name)

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
    @staticmethod
    def generateGenrePicturePath(name):
        # TODO à bouger dans une class utils je pense (same pour artist)
        sanitizedName = ''
        forbiddenChars = ['*', '/', '\\', ':', '?', '<', '>', '|']
        for x in range(0, len(name)):
            if name[x] in forbiddenChars:
                sanitizedName += '-'
            else:
                sanitizedName += name[x]

        imagePath = Constants.GENRE_COVER_LOCATION + sanitizedName + '.jpg' # TODO j'ai add l'ext mais ça serait mieux d'etre géré avec le mimetype
        if not path.exists('/' + imagePath):
            return None
        else:
            return imagePath
