from app.src.dao.script.random.filler.album.fillRandomAlbumByArtistDao import FillRandomAlbumByArtistDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomAlbumSortedByArtistGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_albums'

    def _getFillRandomObject(self):
        return FillRandomAlbumByArtistDao()

    def _getRandomName(self):
        return 'albums sorted by artists'

