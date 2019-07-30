from contextlib import closing

from django.db import connection

from app.src.dao.abstractDao import AbstractDao


## Get a list of random artists.
from app.src.dto.artist.mainPageArtist import MainPageArtist


class RandomArtistsGetter(AbstractDao):

    picturePath = '/pictures/ArtistsProfile/'

    def getRandomArtists(self, numberOfElements):
        artists = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            artist = MainPageArtist()
            artist.id = row[0]
            artist.name = row[0]
            artist.picture = self.picturePath + artist.name + '.jpg'
            artists.append(artist)
        return artists

    def _executeRequest(self, numberOfElements):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(None), self._generateParams(numberOfElements))
            return cursor.fetchall()

    def _generateRequest(self, numberOfElements):
        return '''
            SELECT id, name FROM app_artist OFFSET floor(random() * ( SELECT count(1) FROM app_artist)) LIMIT %s
        '''

    def _generateParams(self, numberOfElements):
        return [numberOfElements]
