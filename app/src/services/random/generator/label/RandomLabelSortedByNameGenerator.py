from app.src.dao.script.random.filler.label.fillRandomLabelByNameDao import FillRandomLabelByNameDao
from app.src.services.random.generator.abstractRandomGenerator import AbstractRandomGenerator


## Fill the table containing the contiguous sequence for the
class RandomLabelSortedByNameGenerator(AbstractRandomGenerator):

    def _getSequenceName(self):
        return 'random_temp_labels'

    def _getFillRandomObject(self):
        return FillRandomLabelByNameDao()

    def _getRandomName(self):
        return 'label sorted by name'
