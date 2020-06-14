from app.src.dao.script.abstractScript import AbstractScript


## Find the cover of an album for the tracks of the album.
class FindAlbumCoversFromTrack(AbstractScript):

    ## Generate the SQL request.
    def _generateRequest(self):
        return '''
                UPDATE app_album SET cover_id = (
                    SELECT ac.id cover FROM app_track trk
                    JOIN app_cover ac on trk.cover_id = ac.id
                    where app_album.id = trk.album_id
                    group by album_id, ac.id
                )
            '''
