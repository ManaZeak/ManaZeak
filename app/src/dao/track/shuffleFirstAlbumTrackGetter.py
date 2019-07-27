import logging
from contextlib import closing

from django.db import connection

loggerScan = logging.getLogger('scan')


## Get the first track of a random album.
class ShuffleFirstAlbumTrackGetter(object):

    @staticmethod
    ## Get a shuffled first track of an album.
    #   @param libraryId the library id where the shuffle will be performed.
    def getShuffledFirstAlbumTrack(playlistId):
        return ShuffleFirstAlbumTrackGetter._executeSqlRequest(playlistId)

    @staticmethod
    def _executeSqlRequest(playlistId):
        with closing(connection.cursor()) as cursor:
            cursor.execute(ShuffleFirstAlbumTrackGetter._generateRequest(), [playlistId, playlistId])
            result = cursor.fetchall()
            if len(result) == 0:
                # The shuffle is empty, using the other request
                cursor.execute(ShuffleFirstAlbumTrackGetter._generateFallbackRequest(), [playlistId, playlistId])
                result = cursor.fetchall()
            return result[0]

    @staticmethod
    ## Generate the sql request for the shuffle.
    def _generateRequest():
        return '''
        SELECT trk.id FROM app_track trk
        JOIN app_playlist_tracks apt on trk.id = apt.track_id
        JOIN (SELECT * FROM app_albumshuffle WHERE "playlistId_id" = %s) album on album."trackId_id" != trk.id
        WHERE trk."trackNumber" = 1
        OFFSET floor(random() * (
            SELECT count(1)
            from (
                 SELECT trk.id
                 FROM app_track trk
                          JOIN app_playlist_tracks apt on trk.id = apt.track_id
                          JOIN (SELECT * FROM app_albumshuffle WHERE "playlistId_id" = %s) album 
                          on album."trackId_id" != trk.id
                 WHERE trk."trackNumber" = 1
                 GROUP BY trk.id
                 ORDER BY trk.id
             ) albums
        )) LIMIT 1
        '''

    @staticmethod
    ## Generate the fallback request when the random isn't initialised.
    def _generateFallbackRequest():
        return '''
        SELECT trk.id FROM app_track trk
        JOIN app_playlist_tracks apt on trk.id = apt.track_id
        WHERE trk."trackNumber" = 1
        AND apt.playlist_id = %s
        OFFSET floor(random() * (
            SELECT count(1)
            FROM (
                SELECT trk.id
                FROM app_track trk
                JOIN app_playlist_tracks apt on trk.id = apt.track_id
                WHERE trk."trackNumber" = 1
                AND apt.playlist_id = %s
                GROUP BY trk.id
                ORDER BY trk.id
            ) albums
        ))
        LIMIT 1;
        '''
