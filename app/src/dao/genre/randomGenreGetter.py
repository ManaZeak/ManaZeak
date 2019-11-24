from app.src.dao.abstractDaoGetter import AbstractDaoGetter
from app.src.dto.genre.MainPageGenre import MainPageGenre


## Get a list of random genres.
class RandomGenreGetter(AbstractDaoGetter):

    ## Returns a list of random genres.
    def getRandomGenres(self, numberOfElements):
        genres = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            genre = MainPageGenre()
            genre.buildFromRandomGenreDao(row)
            genres.append(genre)
        return genres

    def _generateRequest(self):
        return '''
            SELECT id, name, description FROM app_genre
            OFFSET floor(random() * ( SELECT count(1) FROM app_genre))
            LIMIT %s
        '''
