import logging
from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## This class allows to create the links between the artist objects of the database and the tracks.
class ArtistToTrackLinker(AbstractDao):

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

    ## Inserting the object into the database.
    #   @param links the links between the tracks and the artists.
    def _executeRequest(self, links):
        # Generating the sql request
        sql = self._generateRequest(links)
        # Generating the params for the request
        params = self._generateParams(links)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)

    ## Generate the list containing the params of the sql request.
    #   @param links the links to be inserted into the database.
    #   @return the params of the sql request.
    def _generateParams(self, links):
        params = []
        for link in links:
            params.extend([link[0], link[1]])
        return params
