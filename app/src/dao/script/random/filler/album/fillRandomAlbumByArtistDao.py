from app.src.dao.script.abstractScriptWithRequestParam import AbstractScriptWithRequestParam


## Fill the table random artist sorted by name
class FillRandomAlbumByArtistDao(AbstractScriptWithRequestParam):

    def _generateRequest(self):
        return '''
            INSERT INTO app_randomalbumsortedbyartist (id, "hashIndex", album_id, playlist_id) 
                SELECT id_seq, NEXTVAL('random_temp_albums'), id, playlist_id FROM (
                    SELECT NEXTVAL('app_randomalbumsortedbyartist_id_seq') id_seq,
                         app_album.id,
                         playlist_id
                    FROM app_album
                           JOIN app_artist aa on app_album."releaseArtist_id" = aa.id
                           JOIN app_track a on app_album.id = a.album_id
                           JOIN app_playlist_tracks apt on a.id = apt.track_id
                    WHERE playlist_id = %s
                    GROUP BY app_album.id, playlist_id, name
                    order by name
                ) tmp
            '''