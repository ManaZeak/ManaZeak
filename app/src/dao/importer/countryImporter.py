import logging

from app.src.config.constants import Constants
from app.src.dao.importer.abstractDaoImporter import AbstractDaoImporter
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some genre into the database.
class CountryImporter(AbstractDaoImporter):

    ## Merge the country into the database.
    #   @param covers a set containing the country to insert into the database.
    #   @return a dict containing the genre name linked to its id.
    def importCountries(self, countries):
        countriesRef = dict()
        loggerScan.info(str(len(countries)) + ' country to import.')
        # Split the countries by the maximal object in a manual query
        splicedCountries = ListUtils.chunksSet(countries, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of countries
        for subCountries in splicedCountries:
            # Merging the covers insert to the new ones
            countriesRef = {**self._executeRequest(subCountries), **countriesRef}
        return countriesRef

    ## Generate a sql request with the given params
    def _generateRequest(self, countries):
        return 'INSERT INTO app_country (name) VALUES {} ON CONFLICT (name) ' \
               'DO UPDATE SET name = EXCLUDED.name returning id, name' \
            .format(', '.join(['(%s)'] * len(countries)))

    ## Prepares the genres for the upsert.
    def _generateParams(self, covers):
        params = []
        for location in covers:
            params.extend([location])
        return params
