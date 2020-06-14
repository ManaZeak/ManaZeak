import logging

from app.src.config.constants import Constants
from app.src.dao.linker.abstractLinkerDao import AbstractLinkerDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## This class allows to create the links between the playlist object of the database and the tracks.
class PlaylistToTrackLinker(AbstractLinkerDao):

    ## Create the links between tracks and playlist.
    def linkPlaylistToTracks(self, tracksLinkedToPlaylist):
        loggerScan.info(str(len(tracksLinkedToPlaylist)) + ' tracks to link.')
        # Split the genre by the maximal object in a manual query
        splicedLinks = ListUtils.chunksSet(tracksLinkedToPlaylist, Constants.PARAMS_PER_REQUEST)
        for links in splicedLinks:
            self._executeRequest(links)

    ## Generating the request for inserting the links into the database.
    #   @param links the object to insert into the database.
    def _generateRequest(self, links):
        return 'INSERT INTO app_playlist_tracks (track_id, playlist_id) VALUES {} ON CONFLICT DO NOTHING '\
            .format(', '.join(['(%s, %s)'] * len(links)))
