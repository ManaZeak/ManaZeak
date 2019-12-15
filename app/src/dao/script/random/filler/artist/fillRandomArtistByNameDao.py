from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam

## Fill the random table containing all the artists sorted by name.
class FillRandomArtistByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomartistsortedbyname (id, "hashIndex", artist_id, playlist_id) 
                SELECT id_seq, nextval('random_temp_artists'), id, playlist_id FROM (
                    SELECT NEXTVAL('app_randomartistsortedbyname_id_seq') id_seq,
                            app_artist.id,
                            playlist_id
                    FROM app_artist
                        LEFT JOIN app_track_artists ata on app_artist.id = ata.artist_id
                        LEFT JOIN app_track_composers atc on app_artist.id = atc.artist_id
                        LEFT JOIN app_track_performers atp on app_artist.id = atp.artist_id
                        LEFT JOIN app_track a on ata.track_id = a.id or atc.track_id = a.id or atp.track_id = a.id
                        JOIN app_playlist_tracks apt on a.id = apt.track_id
                    WHERE playlist_id = %s
                    GROUP BY app_artist.id, playlist_id, name
                    ORDER BY name) tmp
        '''