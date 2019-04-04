import logging

from contextlib import closing

from django.db import connection

from app.src.config.constants import Constants
from app.src.dao.abstractDao import AbstractDao
from app.src.utils.listUtils import ListUtils

loggerScan = logging.getLogger('scan')


## Import some tracks into the database.
class TrackImporter(AbstractDao):
    # TODO: Add cover to track.

    ## Merge the tracks into the database.
    #   @param track a list of tracks to import.
    #   @return a dict containing the track path linked to their id.
    def importTracks(self, tracks):
        loggerScan.info(str(len(tracks)) + ' tracks to import.')
        # Split the genre by the maximal object in a manual query
        splicedTracks = ListUtils.chunks(tracks, Constants.PARAMS_PER_REQUEST)
        # Executing the query for each sub group of genre
        for subTracks in splicedTracks:
            self._executeRequest(subTracks)

    ## Generate a sql request with the given params
    def _generateRequest(self, tracks):
        return 'INSERT INTO app_track (location, "fileName", "fileSize", mood, duration, "bitRate", "bitRateMode", ' \
               '"sampleRate", title, year, lyrics, comment, "trackNumber", "trackTotal", ' \
               '"discNumber", bpm, "downloadCounter", scanned, album_id, "fileType_id", producer_id, "playCounter") ' \
               'VALUES {} ' \
               'ON CONFLICT (location) ' \
               'DO UPDATE SET location=EXCLUDED.location, "fileName"=EXCLUDED."fileName", ' \
               '"fileSize"=EXCLUDED."fileSize", mood=EXCLUDED.mood, duration=EXCLUDED.duration, ' \
               '"bitRate"=EXCLUDED."bitRate", "bitRateMode"=EXCLUDED."bitRateMode", ' \
               '"sampleRate"=EXCLUDED."sampleRate", ' \
               'title=EXCLUDED.title, year=EXCLUDED.year, lyrics=EXCLUDED.lyrics, comment=EXCLUDED.comment, ' \
               '"trackNumber"=EXCLUDED."trackNumber", "trackTotal"=EXCLUDED."trackTotal", ' \
               '"discNumber"=EXCLUDED."discNumber", bpm=EXCLUDED.bpm, "downloadCounter"=EXCLUDED."downloadCounter", ' \
               'scanned=EXCLUDED.scanned, album_id=EXCLUDED.album_id, cover_id=EXCLUDED.cover_id, ' \
               '"fileType_id"=EXCLUDED."fileType_id", "moodAverage_id"=EXCLUDED."moodAverage_id", ' \
               'producer_id=EXCLUDED.producer_id ' \
               'returning id, location'.format(', '.join(['(%s, %s, %s, %s, %s, %s, %s, '
                                                          '%s, %s, %s, %s, %s, %s, %s, '
                                                          '%s, %s, %s, %s, %s, %s, %s, %s)'] * len(tracks)))

    ## Execute the sql request and returns the results.
    #   @param tracks the tracks to be upsert into the database.
    #   @return the track location linked to the track id.
    def _executeRequest(self, tracks):
        trackRef = dict()
        # Generating the request
        sql = self._generateRequest(tracks)
        loggerScan.info(str(len(tracks)))
        # Getting the parameters
        params = self._generateParams(tracks)
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, params)
            for row in cursor.fetchall():
                trackRef[row[1]] = row[0]
        return trackRef

    ## Prepares the tracks for the upsert.
    def _generateParams(self, tracks):
        params = []
        for track in tracks:
            tmp = [track.location, track.fileName, track.size, track.moodbar, track.duration, track.bitRate,
                   track.bitRateMode, track.sampleRate, track.title, int(track.year),
                   track.lyrics, track.comment, int(track.number), track.trackTotal, track.discNumber,
                   track.bpm, track.downloadCounter, track.scanned, track.album.albumId, track.fileType,
                   track.producerId, track.playCounter]
            loggerScan.info(tmp)
            params.extend(tmp)
        return params
