from app.src.dao.abstractDaoGetter import AbstractDaoGetter

## Get the information about an artist.
class ArtistGetter(AbstractDaoGetter):

    def getArtist(self, artistId):
        return self._executeRequest(artistId)

    def _generateRequest(self):
        return '''
            SELECT art.id, art.name, art.picture, alb.id, alb.title, alb.year, ac.location,
                   sum(trk.duration), count(trk) FROM app_artist art
            JOIN app_album alb on art.id = alb."releaseArtist_id"
            JOIN app_track trk on alb.id = trk.album_id
            JOIN app_cover ac on alb.cover_id = ac.id
            WHERE art.id = %s
            GROUP BY art.id, art.name, art.picture, alb.id, alb.title, alb.year, ac.location
            ORDER BY art.name, year, title 
        '''
