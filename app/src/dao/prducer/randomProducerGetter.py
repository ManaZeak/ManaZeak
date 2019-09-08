from contextlib import closing

from django.db import connection

from app.src.dao.abstractDao import AbstractDao
from app.src.dto.genre.MainPageGenre import MainPageGenre


## Get a list of random genres.
class RandomGenreGetter(AbstractDao):

    ## Returns a list of random genres.
    def getRandomGenres(self, numberOfElements):
        genres = []
        rows = self._executeRequest(numberOfElements)
        for row in rows:
            genre = MainPageGenre()
            genre.id = row[0]
            genre.name = row[1]
            genre.description = row[2]
            genre.description = row[3]  # TODO trouver le bon path des picture d'alb (constant?)
            genres.append(genre)
        return genres

    def _executeRequest(self, numberOfElements):
        # Getting the sql request
        with closing(connection.cursor()) as cursor:
            cursor.execute(self._generateRequest(None), self._generateParams(numberOfElements))
            return cursor.fetchall()

    def _generateRequest(self, numberOfElements):
        return '''
            SELECT id, name, description, picture FROM app_genre
            OFFSET floor(random() * ( SELECT count(1) FROM app_genre))
            LIMIT %s
        '''

    def _generateParams(self, numberOfElements):
        return [numberOfElements]
