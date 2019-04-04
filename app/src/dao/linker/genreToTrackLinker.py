import logging

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## This class allows to create the links between the genre objects of the database and the tracks.
class GenreToTrackLinker(AbstractDao):

    ## Create the links between tracks and genres.
    def linkGenreToTracks(self, tracksLinkedToGenres):
        loggerScan.info(str(len(tracksLinkedToGenres)) + ' genres to link.')
        # Split the genre by the maximal object in a manual query
        splicedLinks = ListUtils.chunksSet(tracksLinkedToGenres, Constants.PARAMS_PER_REQUEST)
        for links in splicedLinks:
            self._executeRequest(links)

    ## Generating the request for inserting the links into the database.
    #   @param links the object to insert into the database.
    def _generateRequest(self, links):
        return 'INSERT INTO app_producer (name) VALUES {} ' \
               'ON CONFLICT (name) ' \
               'DO UPDATE SET name = EXCLUDED.name returning id, name'.format(', '.join(['(%s)'] * len(genres)))

    def _executeRequest(self, objectsToSave):
        sql = self._generateRequest()


    def _generateParams(self, objectsToSave):
        pass