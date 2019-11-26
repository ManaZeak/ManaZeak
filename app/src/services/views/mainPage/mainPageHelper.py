from builtins import staticmethod

from app.models import Artist
from app.src.dao.album.randomAlbumGetter import RandomAlbumGetter
from app.src.dao.artist.randomArtistsGetter import RandomArtistsGetter
from app.src.dao.genre.randomGenreGetter import RandomGenreGetter


## Helper class for the main page.
from app.src.dto.artist.mainPageArtist import MainPageArtist


class MainPageHelper(object):

    @staticmethod
    ## Get a number of random artists.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the artist's information.
    def getRandomArtists(numberToGet):
        randomArtistsGetter = RandomArtistsGetter()
        artistsFromDb = randomArtistsGetter.getRandomArtists(numberToGet)
        artists = []
        for artist in artistsFromDb:
            artists.append(artist.getJsonObject())
        return artists

    @staticmethod
    ## Get a number of random albums.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the album's information.
    def getRandomAlbums(numberToGet):
        randomAlbumGetter = RandomAlbumGetter()
        albumFromDb = randomAlbumGetter.getRandomArtists(numberToGet)
        albums = []
        for album in albumFromDb:
            albums.append(album.getJsonObject())
        return albums

    @staticmethod
    ## Get a number of random genres.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the album's information.
    def getRandomGenres(numberToGet):
        randomGenreGetter = RandomGenreGetter()
        genreFromDb = randomGenreGetter.getRandomGenres(numberToGet)
        genres = []
        for genre in genreFromDb:
            genres.append(genre.getJsonObject())
        return genres

    @staticmethod
    def getRandomComposer(numberToGet):
        if Artist.objects.all().count() > 0:
            artistInDb = Artist.objects.first()
            artistDto = MainPageArtist()
            artistDto.buildFromOrmArtistObject(artistInDb)
            return artistDto.getJsonObject()
        else:
            return {

            }

    @staticmethod
    def getRandomProducers(numberToGet):
        pass
