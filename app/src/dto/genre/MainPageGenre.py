from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


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
        self.image = CoverPathGenerator.generateGenrePicturePath(self.name)

    ## Initialise a genre from an orm object
    def buildFromOrmGenre(self, genre):
        self.id = genre.id
        self.name = genre.name
        self.description = genre.description
        self.image = CoverPathGenerator.generateGenrePicturePath(genre.name)

    def getJsonObject(self):
        return {
            'GENRE_ID': self.id,
            'GENRE_LOGO': self.image,
            'GENRE_NAME': self.name,
            'GENRE_DESC': self.description,
            'STATE': None,
        }