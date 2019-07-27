import logging
from builtins import staticmethod
from contextlib import closing

from django.db import connection


loggerScan = logging.getLogger('scan')
## Get a random track in a playlist.
class RandomTrackGetter(object):

    @staticmethod
    ## Get a random track in a playlist.
    def getRandomTrack(playlistId):
        return RandomTrackGetter._executeRequest(playlistId)

    @staticmethod
    ## Execute the sql request.
    def _executeRequest(playlistId):
        with closing(connection.cursor()) as cursor:
            loggerScan.info(str(playlistId))
            cursor.execute(RandomTrackGetter._generateRequest(), [playlistId, playlistId])
            return cursor.fetchall()[0]

    @staticmethod
    ## Generate the request for getting
    def _generateRequest():
        return '''
            SELECT app_track.id FROM app_track
            JOIN app_playlist_tracks apt on app_track.id = apt.track_id
            WHERE apt.playlist_id = %s
            OFFSET floor(random() * (
                SELECT count(1) FROM app_track
                JOIN app_playlist_tracks apt on app_track.id = apt.track_id
                WHERE apt.playlist_id = %s
                )
            ) LIMIT 1
            '''
