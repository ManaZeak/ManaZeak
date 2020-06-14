from app.src.dao.script.random.filler.track.fillRandomTrackByArtistDao import FillRandomTrackByArtistDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomTrackSortedByArtistGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_tracks_by_artist'

    def _getFillRandomObject(self):
        return FillRandomTrackByArtistDao()

    def _getRandomName(self):
        return 'track sorted by artist'
