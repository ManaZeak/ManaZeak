from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


## Fill the table of track sorted by name for the random.
class FillRandomTrackByArtistDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomtracksortedbyartist (id, "hashIndex", track_id, playlist_id) 
                SELECT nextval('app_randomtracksortedbyartist_id_seq'), NEXTVAL('random_temp_tracks_by_artist'), 
                    app_track.id, playlist_id FROM app_track
                    JOIN app_playlist_tracks apt on app_track.id = apt.track_id
                    JOIN app_album aa on app_track.album_id = aa.id
                    JOIN app_artist a on aa."releaseArtist_id" = a.id
                WHERE  playlist_id = %s
                ORDER BY name, "trackNumber"
        '''