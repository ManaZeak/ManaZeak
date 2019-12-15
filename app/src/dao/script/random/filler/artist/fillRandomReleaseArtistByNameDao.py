from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


## Fill the table random artist sorted by name
class FillRandomReleaseArtistByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomreleaseartistsortedbyname (id, "hashIndex", artist_id, playlist_id) 
                SELECT id_seq, nextval('random_temp_release_artists'), id, playlist_id FROM (
                    SELECT NEXTVAL('app_randomreleaseartistsortedbyname_id_seq') id_seq,
                            app_artist.id, 
                            playlist_id 
                    FROM app_artist
                        JOIN app_album aa on app_artist.id = aa."releaseArtist_id"
                        JOIN app_track a on aa.id = a.album_id
                        JOIN app_playlist_tracks apt on a.id = apt.track_id
                    WHERE playlist_id = %s and app_artist.location IS NOT NULL
                    GROUP BY app_artist.id, playlist_id, name
                    ORDER BY name
                ) tmp
        '''