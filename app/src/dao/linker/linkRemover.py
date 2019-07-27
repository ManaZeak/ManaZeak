from contextlib import closing

from django.db import connection


class LinkRemover(object):

    @staticmethod
    ## Removes all the links between the tracks and the genres from a playlist id.
    #   @param playlistId the id of the playlist to remove the links with the tracks.
    def removeTrackToGenreLinkByPlaylist(playlistId):
        sql = 'DELETE FROM app_track_genres ' \
              'WHERE track_id IN (' \
                'SELECT track_id FROM app_track ' \
                'JOIN app_playlist_tracks apt ON app_track.id = apt.track_id ' \
                'WHERE playlist_id = ?)'
        params = [[playlistId]]
        with closing(connection.cursor()) as cursor:
            cursor.execute(sql, params)

