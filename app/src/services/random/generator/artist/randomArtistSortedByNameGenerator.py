from app.src.dao.script.random.filler.artist.fillRandomArtistByNameDao import FillRandomArtistByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomArtistSortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_artists'

    def _getFillRandomObject(self):
        return FillRandomArtistByNameDao()

    def _getRandomName(self):
        return 'artist sorted by name'

