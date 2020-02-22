from app.src.dto.AbstractDto import AbstractDto


## DTO for the country information
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


class MainPageCountry(AbstractDto):

    def __init__(self):
        self.id = None
        self.code = None
        self.image = None

    def loadFromOrm(self, country):
        self.id = country.id
        self.code = country.name
        self.image = CoverPathGenerator.generateCountryPicturePath(self.code)

    ## Generating the json for a response.
    def generateJson(self):
        return {
            'COUNTRY_ID': self.id,
            'COUNTRY_CODE': self.code,
            'COUNTRY_FLAG': self.image,
        }
