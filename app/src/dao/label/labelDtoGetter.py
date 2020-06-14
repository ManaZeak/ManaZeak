from app.src.dao.abstractDaoGetter import AbstractDaoGetter


## Get the information about a label from the database.
class LabelDtoGetter(AbstractDaoGetter):

    def _generateRequest(self):
        return '''
            SELECT al.id, al.name, album_id, app_album.title,
                app_album.year, ac.location, "releaseArtist_id",
                aa.name, picture, count(t.id) trackNumber, sum(duration) totalDuration
            FROM app_album
            JOIN app_artist aa on app_album."releaseArtist_id" = aa.id
            JOIN app_track t on app_album.id = t.album_id
            JOIN app_cover ac on app_album.cover_id = ac.id
            JOIN app_label al on t.label_id = al.id
            WHERE label_id = %s
            GROUP BY album_id, app_album.title, ac.location, "releaseArtist_id", aa.name, picture, app_album.year,
             al.name, al.id
            ORDER BY aa.name, app_album.year DESC
        '''
