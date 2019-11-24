from app.src.dao.abstractDaoGetter import AbstractDaoGetter
from app.src.dto.album.mainPageAlbum import MainPageAlbum


## Get a list of random albums.
class RandomAlbumGetter(AbstractDaoGetter):

    ## Get a table of MainPageAlbum for the front.
    def getRandomArtists(self, numberOfElements):
        albums = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            album = MainPageAlbum()
            album.buildFromRandomAlbumDao(row)
            albums.append(album)
        return albums

    def _generateRequest(self):
        return '''
            SELECT album_id, alb.title, ac.location, alb.year FROM app_album alb
            JOIN app_track a on alb.id = a.album_id
            JOIN app_cover ac on a.cover_id = ac.id
            GROUP BY ac.location, album_id, alb.title, alb.year
            OFFSET floor(random() * ( SELECT count(1) FROM music.public.app_album))
            LIMIT %s
        '''
