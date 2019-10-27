import logging

from app.src.config.constants import Constants
from app.src.dao.linker.abstractLinkerDao import AbstractLinkerDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## This class allows to create the links between the artist objects of the database and the tracks.
class ArtistToTrackLinker(AbstractLinkerDao):

    ## Create the links between tracks and artists.
    def linkArtistToTracks(self, tracksLinkedToArtists):
        loggerScan.info(str(len(tracksLinkedToArtists)) + ' artists to link.')
        # Split the genre by the maximal object in a manual query
        splicedLinks = ListUtils.chunksSet(tracksLinkedToArtists, Constants.PARAMS_PER_REQUEST)
        for links in splicedLinks:
            self._executeRequest(links)

    ## Generating the request for inserting the links into the database.
    #   @param links the object to insert into the database.
    def _generateRequest(self, links):
        return 'INSERT INTO app_track_artists (track_id, artist_id) VALUES {} '\
            .format(', '.join(['(%s, %s)'] * len(links)))
