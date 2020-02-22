from app.src.dto.AbstractDto import AbstractDto


## DTO for the detail on a country.
class CountryDto(AbstractDto):

    def __init__(self):
        self.id = None
        self.code = None
        self.artists = []

    def generateJson(self):
        return {
            'COUNTRY_ID': self.id,
            'COUNTRY_CODE': self.code,
            'COUNTRY_ARTISTS': [artist.generateJson() for artist in self.artists],
        }
