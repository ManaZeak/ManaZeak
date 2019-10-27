import logging

from app.src.config.constants import Constants
from app.src.dao.importer.abstractDaoImporter import AbstractDaoImporter
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import labels into the database.
class LabelImporter(AbstractDaoImporter):

    ## Merge the label into the database.
    #   @param covers a set containing the labels to insert into the database.
    #   @return a dict containing the label name linked to its id.
    def importLabels(self, labels):
        labelsRef = dict()
        loggerScan.info(str(len(labels)) + ' labels to import.')
        # Split the labels by the maximal object in a manual query
        splicedLabels = ListUtils.chunksSet(labels, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of labels
        for subLabels in splicedLabels:
            # Merging the labels inserted to the new ones
            labelsRef = {**self._executeRequest(subLabels), **labelsRef}
        return labelsRef

    ## Generate a sql request with the given params
    def _generateRequest(self, labels):
        return 'INSERT INTO app_label (name) VALUES {} ON CONFLICT (name) ' \
               'DO UPDATE SET name = EXCLUDED.name returning id, name' \
            .format(', '.join(['(%s)'] * len(labels)))

    ## Prepares the labels for the upsert.
    def _generateParams(self, covers):
        params = []
        for location in covers:
            params.extend([location])
        return params
