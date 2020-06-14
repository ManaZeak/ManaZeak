from app.src.dao.script.random.filler.genre.fillRandomGenreByNameDao import FillRandomGenreByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


## Generate the table for the random genre sorted by name.
class RandomGenreSortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_genres'

    def _getFillRandomObject(self):
        return FillRandomGenreByNameDao()

    def _getRandomName(self):
        return 'genre sorted by name'
