from app.src.dao.abstractDaoGetter import AbstractDaoGetter
from app.src.dto.artist.mainPageArtist import MainPageArtist


## Get a list of random artists.
class RandomArtistsGetter(AbstractDaoGetter):

    def getRandomArtists(self, numberOfElements):
        artists = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            artist = MainPageArtist()
            artist.buildFromRandomArtistsGetter(row)
            artists.append(artist)
        return artists

    def _generateRequest(self):
        return '''
            SELECT id, name FROM app_artist WHERE location IS NOT NULL
            OFFSET floor(random() * ( SELECT count(1) FROM app_artist WHERE location IS NOT NULL ))
            LIMIT %s
        '''
