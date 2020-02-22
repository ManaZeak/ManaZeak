from app.src.dao.abstractDaoGetter import AbstractDaoGetter


## DAO for getting the information about a country.
class CountryGetter(AbstractDaoGetter):

    ## Generate the request for getting the countries and it's information.
    def _generateRequest(self):
        return '''
            SELECT cnt.id, cnt.name, album_id, alb.title, alb.year, art.id, art.name, cov.location FROM app_country cnt
            JOIN app_track_countries atc on cnt.id = atc.country_id
            JOIN app_track trk on atc.track_id = trk.id
            JOIN app_album alb on trk.album_id = alb.id
            JOIN app_artist art on alb."releaseArtist_id" = art.id
            JOIN app_cover cov on trk.cover_id = cov.id
            WHERE country_id = 13
            GROUP BY cnt.id, cnt.name, album_id, alb.title, alb.year, art.id, art.name, cov.location
            ORDER BY art.name, alb.year, alb.title
        '''
