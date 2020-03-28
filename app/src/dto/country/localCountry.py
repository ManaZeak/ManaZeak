from app.src.dto.abstractDto import AbstractDto


## Describes a country of an artist.
class LocalCountry(AbstractDto):

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
            'CODE': self.name,
        }

    ## Recreating the hash for set.
    def __hash__(self):
        return hash(str(self.id))

    ## Recreating the equals operator for the set.
    def __eq__(self, other):
        if isinstance(other, LocalCountry):
            return self.__hash__() == other.__hash__()
        else:
            return False
