from contextlib import closing

from django.db import connection

from app.src.dao.abstractDaoGetter import AbstractDaoGetter
from app.src.dto.artist.mainPageArtist import MainPageArtist


## Get a list of random artists.
class RandomArtistsGetter(AbstractDaoGetter):

    picturePath = '../static/pictures/ArtistsProfile/'

    def getRandomArtists(self, numberOfElements):
        artists = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            artist = MainPageArtist()
            artist.id = row[0]
            artist.name = row[1]
            # if
            artist.picture = self.picturePath + artist.name + '.jpg' # TODO test image existence, otherwise fallback on default cover
            artists.append(artist)
        return artists

    def _executeRequest(self, numberOfElements):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(), self._generateParams(numberOfElements))
            return cursor.fetchall()

    def _generateRequest(self):
        return '''
            SELECT id, name FROM app_artist WHERE location IS NOT NULL 
            OFFSET floor(random() * ( SELECT count(1) FROM app_artist WHERE location IS NOT NULL ))
            LIMIT %s
        '''

    def _generateParams(self, numberOfElements):
        return [numberOfElements]
