from app.src.dao.script.random.filler.artist.fillRandomReleaseArtistByNameDao import FillRandomReleaseArtistByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomReleaseArtistSortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_release_artists'

    def _getFillRandomObject(self):
        return FillRandomReleaseArtistByNameDao()

    def _getRandomName(self):
        return 'release artist sorted by name'
