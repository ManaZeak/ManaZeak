from contextlib import closing

from django.db import connection

from app.src.dao.abstractDaoGetter import AbstractDaoGetter
from app.src.dto.album.mainPageAlbum import MainPageAlbum


## Get a list of random albums.
class RandomAlbumGetter(AbstractDaoGetter):

    picturePath = '../static/pictures/ArtistsProfile/'

    ## Get a table of MainPageAlbum for the front.
    def getRandomArtists(self, numberOfElements):
        albums = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            album = MainPageAlbum()
            album.id = row[0]
            album.title = row[1]
            album.picture = self.picturePath + row[2]  # TODO trouver le bon path des picture d'alb (constant?)
            albums.append(album)
        return albums

    def _executeRequest(self, numberOfElements):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(), self._generateParams(numberOfElements))
            return cursor.fetchall()

    def _generateRequest(self):
        return '''
            SELECT album_id, alb.title, ac.location FROM app_album alb
            JOIN app_track a on alb.id = a.album_id
            JOIN app_cover ac on a.cover_id = ac.id
            GROUP BY ac.location, album_id, alb.title
            OFFSET floor(random() * ( SELECT count(1) FROM music.public.app_album))
            LIMIT %s
        '''

    def _generateParams(self, numberOfElements):
        return [numberOfElements]
