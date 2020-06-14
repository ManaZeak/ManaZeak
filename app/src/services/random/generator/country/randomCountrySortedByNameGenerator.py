from app.src.dao.script.random.filler.country.fillRandomCountryByNameDao import FillRandomCountryByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomCountrySortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_country'

    def _getFillRandomObject(self):
        return FillRandomCountryByNameDao()

    def _getRandomName(self):
        return 'country sorted by name'

