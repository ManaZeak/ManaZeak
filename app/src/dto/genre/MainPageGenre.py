## Genre representation for the main page.
class MainPageGenre(object):

    def __init__(self):
        self.id = None
        self.image = None
        self.name = None
        self.description = None

    def getJsonObject(self):
        return {
            'GENRE_ID': self.id,
            'GENRE_IMAGE': self.image,
            'GENRE_NAME': self.name,
            'GENRE_DESC': self.description,
            'STATE': None,
        }
