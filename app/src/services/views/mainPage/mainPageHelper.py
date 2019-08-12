## Helper class for the main page.
from app.src.dao.artist.randomArtistsGetter import RandomArtistsGetter


class MainPageHelper(object):

    @staticmethod
    ## Get a number of random artists
    def getRandomArtists(numberToGet):
        randomArtistsGetter = RandomArtistsGetter()
        artistsFromDb = randomArtistsGetter.getRandomArtists(numberToGet)
        artists = []
        for artist in artistsFromDb:
            artists.append(artist.getJsonObject())
        return artists
