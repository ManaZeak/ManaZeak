from contextlib import closing

from django.db import connection

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
            return cursor.fetchall()[0]

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
                          JOIN (SELECT * FROM app_albumshuffle WHERE "playlistId_id" = %s) album on album."trackId_id" != trk.id
                 WHERE trk."trackNumber" = 1
                 GROUP BY trk.id
                 ORDER BY trk.id
             ) albums
        )) LIMIT 1
        '''
