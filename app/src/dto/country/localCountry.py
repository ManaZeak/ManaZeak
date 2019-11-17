## Describes a country of an artist.
class LocalCountry(object):

    def __init__(self):
        self.id = None
        self.name = None

    ## Load the country from the country object of the ORM
    def loadCountryFromOrm(self, country):
        if country is not None:
            self.id = country.id
            self.name = country.name

    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
        }
