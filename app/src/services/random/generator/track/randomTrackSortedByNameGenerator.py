from app.src.dao.script.random.filler.track.fillRandomTrackByNameDao import FillRandomTrackByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


class RandomTrackSortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_tracks'

    def _getFillRandomObject(self):
        return FillRandomTrackByNameDao()

    def _getRandomName(self):
        return 'track sorted by name'
