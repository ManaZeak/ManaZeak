from app.src.dto.AbstractDto import AbstractDto

## Store the artist for the country view.
class ArtistCountryDto(AbstractDto):

    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None
        self.albums = []

    def generateJson(self):
        return {
            'ARTIST_ID': self.id,
            'ARTIST_NAME': self.name,
            'ARTIST_PP': self.picture,
            'ARTIST_ALBUMS': [album.getJsonObject() for album in self.albums]
        }