from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


## Fill the table random artist sorted by name
class FillRandomGenreByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomgenresortedbyname (id, "hashIndex", genre_id, playlist_id) 
                SELECT id_seq, NEXTVAL('random_temp_genres'), id, playlist_id FROM (
                    SELECT NEXTVAL('app_randomgenresortedbyname_id_seq') id_seq,
                            app_genre.id,
                            playlist_id
                    FROM app_genre
                        JOIN app_track_genres atg on app_genre.id = atg.genre_id
                        JOIN app_playlist_tracks apt on atg.track_id = apt.track_id
                    WHERE playlist_id = %s
                    GROUP BY app_genre.id, playlist_id, name
                    ORDER BY name
                ) tmp
        '''