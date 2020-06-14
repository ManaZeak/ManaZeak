from app.models.track import Country
from app.src.dto.country.mainPageCountry import MainPageCountry
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## Loads a country for the main page.
class MainPageCountryLoader(object):

    def __init__(self):
        self.countries = []

    ## Load all the countries of the database.
    def loadAllCountries(self):
        countries = Country.objects.all()
        for country in countries:
            self._loadCountryFromOrm(country)

    ## Load a country from the orm
    def _loadCountryFromOrm(self, countryDb):
        country = MainPageCountry()
        country.id = countryDb.id
        country.code = countryDb.name
        country.image = CoverPathGenerator.generateCountryPicturePath(country.code)
        self.countries.append(country)
