from contextlib import closing

from django.db import connection


class RandomTrackFromArtistGetter(object):

    def getRandomTrackFromArtist(self, artist):
        return self._executeRequest(artist.id)

    @staticmethod
    def _generateRequest():
        return'''
        SELECT DISTINCT app_track.id FROM app_track
        JOIN app_playlist_tracks apt on app_track.id = apt.track_id
            JOIN app_track_artists ata on app_track.id = ata.track_id
            LEFT JOIN app_track_composers atc on app_track.id = atc.track_id
            LEFT JOIN app_track_performers atp on app_track.id = atp.track_id
            AND (ata.artist_id = %s OR atc.artist_id = %s OR atp.artist_id = %s)
        OFFSET floor(random() *  (
            SELECT count(1) FROM (SELECT DISTINCT app_track.id FROM app_track
            JOIN app_playlist_tracks apt on app_track.id = apt.track_id
            JOIN app_track_artists ata on app_track.id = ata.track_id
            LEFT JOIN app_track_composers atc on app_track.id = atc.track_id
            LEFT JOIN app_track_performers atp on app_track.id = atp.track_id
            AND (ata.artist_id = %s OR atc.artist_id = %s OR atp.artist_id = %s)) tmp
            )
        ) LIMIT 20
        '''

    def _executeRequest(self, artistId):
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(), self._generateParams(artistId))
            return cursor.fetchall()[0]

    @staticmethod
    def _generateParams(artistId):
        return [artistId, artistId, artistId, artistId, artistId, artistId]
