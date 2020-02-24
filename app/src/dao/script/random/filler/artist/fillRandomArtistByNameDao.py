from contextlib import closing

from django.db import connection

from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam

## Fill the random table containing all the artists sorted by name.
class FillRandomArtistByNameDao(AbstractScriptWithRequestParam):

    ## Changing the way the request is executed since there is more params.
    def executeRequest(self, param):
        # Generating the sql request
        sql = self._generateRequest()
        with closing(connection.cursor()) as cursor:
            # Executing the query and fill the reference
            cursor.execute(sql, [param, param, param])

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomartistsortedbyname (id, "hashIndex", artist_id, playlist_id)
            SELECT id_seq, NEXTVAL('random_temp_artists'), id, pl_id FROM (
                SELECT NEXTVAL('app_randomartistsortedbyname_id_seq') id_seq,
                        app_artist.id,
                        coalesce(apt.playlist_id, apt1.playlist_id, apt2.playlist_id) pl_id
                FROM app_artist
                    LEFT JOIN app_track_artists ata on app_artist.id = ata.artist_id
                    LEFT JOIN app_track_composers atc on app_artist.id = atc.artist_id
                    LEFT JOIN app_track_performers atp on app_artist.id = atp.artist_id
                    LEFT JOIN app_track a on ata.track_id = a.id
                    LEFT JOIN app_track a1 on atc.track_id = a1.id
                    LEFT JOIN app_track a2 on atp.track_id = a2.id
                    LEFT JOIN app_playlist_tracks apt on a.id = apt.track_id
                    LEFT JOIN app_playlist_tracks apt1 on a1.id = apt1.track_id
                    LEFT JOIN app_playlist_tracks apt2 on a2.id = apt2.track_id
                WHERE apt.playlist_id = %s or apt1.playlist_id = %s or apt2.playlist_id = %s
                GROUP BY app_artist.id, apt.playlist_id, apt1.playlist_id, apt2.playlist_id, name
                ORDER BY name) tmp
        '''