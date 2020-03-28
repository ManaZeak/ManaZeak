from app.src.dao.abstractDaoGetter import AbstractDaoGetter


class DetailedArtistGetter(AbstractDaoGetter):

    def _generateRequest(self):
        return '''
            SELECT art.id, art.name, art.picture, alb.id, alb.title, alb.year, ac.location,
                   sum(trk.duration), count(trk), cou.id, cou.name, gen.id, gen.name FROM app_artist art
            LEFT JOIN app_album alb on art.id = alb."releaseArtist_id"
            LEFT JOIN app_track trk on alb.id = trk.album_id
            LEFT JOIN app_cover ac on alb.cover_id = ac.id
            LEFT JOIN app_track_genres on trk.id = app_track_genres.track_id
            LEFT JOIN app_genre gen on app_track_genres.genre_id = gen.id
            LEFT JOIN app_track_countries atc on trk.id = atc.track_id
            LEFT JOIN app_country cou on atc.country_id = cou.id
            WHERE art.id = 943
            GROUP BY art.id, art.name, art.picture, alb.id, alb.title, alb.year, ac.location, cou.id, cou.name,
             gen.id, gen.name
            ORDER BY art.name, alb.year, title, cou.name, gen.name
        '''