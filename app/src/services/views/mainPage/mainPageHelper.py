from app.models import Artist
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.dto.artist.mainPageArtist import MainPageArtist
from app.src.dto.country.mainPageCountry import MainPageCountry
from app.src.dto.genre.MainPageGenre import MainPageGenre
from app.src.dto.label.mainPageLabel import MainPageLabel
from app.src.services.random.getter.randomAlbumGetterService import RandomAlbumGetterService
from app.src.services.random.getter.randomArtistGetterService import RandomArtistGetterService


## Helper class for the main page.
from app.src.services.random.getter.randomCountryGetterService import RandomCountryGetterService
from app.src.services.random.getter.randomGenreGetterService import RandomGenreGetterService
from app.src.services.random.getter.randomLabelGetterService import RandomLabelGetterService


class MainPageHelper(object):

    @staticmethod
    ## Get a number of random release artists.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the artist's information.
    def getRandomReleaseArtists(numberToGet):
        artistsDb = RandomArtistGetterService.getReleaseArtistsSortedByName(numberToGet)
        return MainPageHelper._buildArtistsJsonFromRandom(artistsDb)

    @staticmethod
    ## Get a number of artists.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the artist's information.
    def getRandomArtists(numberToGet):
        artistsDb = RandomArtistGetterService.getArtistsSortedByName(numberToGet)
        return MainPageHelper._buildArtistsJsonFromRandom(artistsDb)

    @staticmethod
    ## Get a number of random albums.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the album's information.
    def getRandomAlbums(numberToGet):
        albumsFromDb = RandomAlbumGetterService.getAlbumsSortedByArtist(numberToGet)
        albums = []
        for albumDb in albumsFromDb:
            album = MainPageAlbum()
            album.buildFromOrmAlbum(albumDb)
            albums.append(album.getJsonObject())
        return albums

    @staticmethod
    ## Get a number of random genres.
    #   @param numberToGet The number of elements to get.
    #   @return A json containing the album's information.
    def getRandomGenres(numberToGet):
        genreFromDb = RandomGenreGetterService.getRandomGenreSortedByName(numberToGet)
        genres = []
        for genreDb in genreFromDb:
            genre = MainPageGenre()
            genre.buildFromOrmGenre(genreDb)
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
    def getRandomCountries(numberToGet):
        countriesFromDb = RandomCountryGetterService.getRandomCountrySortedByName(numberToGet)
        countries = []
        for country in countriesFromDb:
            mainPageCountry = MainPageCountry()
            mainPageCountry.loadFromOrm(country)
            countries.append(mainPageCountry.generateJson())
        return countries

    @staticmethod
    def getRandomProducers(numberToGet):
        pass

    @staticmethod
    def getRandomLabels(numberToGet):
        labelsFomDb = RandomLabelGetterService.getRandomLabelSortedByNames(numberToGet)
        albums = []
        for labelDb in labelsFomDb:
            album = MainPageLabel()
            album.loadFromOrm(labelDb)
            albums.append(album.getJsonObject())
        return albums

    @staticmethod
    def _buildArtistsJsonFromRandom(artistsDb):
        artists = []
        for artistDb in artistsDb:
            artist = MainPageArtist()
            artist.buildFromOrmArtistObject(artistDb)
            artists.append(artist.getJsonObject())
        return artists
