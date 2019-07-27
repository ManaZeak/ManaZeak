from builtins import staticmethod
from contextlib import closing

from django.db import connection


## Get a random track in a playlist.
class RandomTrackGetter(object):

    @staticmethod
    ## Get a random track in a playlist.
    def getRandomTrack():
        return RandomTrackGetter._executeRequest()

    @staticmethod
    ## Execute the sql request.
    def _executeRequest():
        with closing(connection.cursor()) as cursor:
            cursor.execute(RandomTrackGetter._generateRequest())
            return cursor.fetchall()

    @staticmethod
    ## Generate the request for getting
    def _generateRequest():
        return '''
            SELECT app_track.id FROM app_track
            JOIN app_playlist_tracks apt on app_track.id = apt.track_id
            WHERE apt.playlist_id = 1
            OFFSET floor(random() * (
                SELECT count(1) FROM app_track
                JOIN app_playlist_tracks apt on app_track.id = apt.track_id
                WHERE apt.playlist_id = 1
                )
            ) LIMIT 1
            '''
