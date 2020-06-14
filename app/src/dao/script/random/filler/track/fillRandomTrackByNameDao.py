from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


## Fill the table of track sorted by name for the random.
class FillRandomTrackByNameDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomtracksortedbyname (id, "hashIndex", track_id, playlist_id)
                SELECT nextval('app_randomtracksortedbyname_id_seq'), NEXTVAL('random_temp_tracks'),
                app_track.id, playlist_id FROM app_track
                    JOIN app_playlist_tracks apt on app_track.id = apt.track_id
                WHERE  playlist_id = %s
                ORDER BY title
        '''