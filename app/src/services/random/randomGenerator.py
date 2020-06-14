from app.src.dao.script.random.remover.album.deleteRandomAlbumByArtistDao import DeleteRandomAlbumByArtistDao
from app.src.dao.script.random.remover.artist.deleteRandomArtistByNameDao import DeleteRandomArtistByNameDao
from app.src.dao.script.random.remover.artist.deleteRandomReleaseArtistByNameDao import \
    DeleteRandomReleaseArtistByNameDao
from app.src.dao.script.random.remover.country.deleteRandomCountryByNameDao import DeleteRandomCountryByNameDao
from app.src.dao.script.random.remover.genre.deleteRandomGenreByNameDao import DeleteRandomGenreByNameDao
from app.src.dao.script.random.remover.label.deleteRandomLabelByNameDao import DeleteRandomLabelByNameDao
from app.src.dao.script.random.remover.track.deleteRandomTrackByArtistDao import DeleteRandomTrackByArtistDao
from app.src.dao.script.random.remover.track.deleteRandomTrackByNameDao import DeleteRandomTrackByNameDao
from app.src.services.random.generator.album.randomAlbumSortedByArtistGenerator \
    import RandomAlbumSortedByArtistGenerator
from app.src.services.random.generator.artist.randomArtistSortedByNameGenerator import RandomArtistSortedByNameGenerator
from app.src.services.random.generator.artist.randomReleaseArtistSortedByNameGenerator \
    import RandomReleaseArtistSortedByNameGenerator
from app.src.services.random.generator.country.randomCountrySortedByNameGenerator import \
    RandomCountrySortedByNameGenerator
from app.src.services.random.generator.genre.randomGenreSortedByNameGenerator import RandomGenreSortedByNameGenerator
from app.src.services.random.generator.label.RandomLabelSortedByNameGenerator import RandomLabelSortedByNameGenerator
from app.src.services.random.generator.track.randomTrackSortedByArtistGenerator import \
    RandomTrackSortedByArtistGenerator
from app.src.services.random.generator.track.randomTrackSortedByNameGenerator \
    import RandomTrackSortedByNameGenerator


class RandomGenerator(object):

    def __init__(self, playlistId):
        self.playlistId = playlistId

    ## Fill all the tables for random objects.
    def fillAllRandomTables(self, isInitScan):
        # Delete all the data of the random tables
        if not isInitScan:
            self._removeAllRandomData()
        # Fill the random artists tables.
        self._fillRandomArtist()
        # Fill the random albums tables.
        self._fillRandomAlbum()
        # Fill the random tracks tables.
        self._fillRandomTrack()
        # Fill the random genre tables.
        self._fillRandomGenre()
        # Fill the random labels tables.
        self._fillRandomLabel()
        # Fill the random countries tables.
        self._fillRandomCountry()

    @staticmethod
    ## Delete all the data contained in the random tables.
    def _removeAllRandomData():
        randoms = [DeleteRandomAlbumByArtistDao(), DeleteRandomArtistByNameDao(), DeleteRandomReleaseArtistByNameDao(),
                   DeleteRandomCountryByNameDao(), DeleteRandomGenreByNameDao(), DeleteRandomLabelByNameDao(),
                   DeleteRandomTrackByArtistDao(), DeleteRandomTrackByNameDao()]
        for random in randoms:
            random.executeRequest()

    ## Fill the tables linked to the artists.
    def _fillRandomArtist(self):
        randomGenerators = [RandomReleaseArtistSortedByNameGenerator(), RandomArtistSortedByNameGenerator()]
        for randGen in randomGenerators:
            randGen.fillTableRandom(self.playlistId)

    ## Fill the tables linked to the albums.
    def _fillRandomAlbum(self):
        randGenerator = RandomAlbumSortedByArtistGenerator()
        randGenerator.fillTableRandom(self.playlistId)

    ## Fill the tables linked to the tracks.
    def _fillRandomTrack(self):
        randGenerators = [RandomTrackSortedByNameGenerator(), RandomTrackSortedByArtistGenerator()]
        for randGenerator in randGenerators:
            randGenerator.fillTableRandom(self.playlistId)

    ## Fill the tables linked to the genres.
    def _fillRandomGenre(self):
        randGenerator = RandomGenreSortedByNameGenerator()
        randGenerator.fillTableRandom(self.playlistId)

    ## Fill the tables linked to the labels.
    def _fillRandomLabel(self):
        randGenerator = RandomLabelSortedByNameGenerator()
        randGenerator.fillTableRandom(self.playlistId)

    ## Fill the tables linked to the countries.
    def _fillRandomCountry(self):
        randGenerator = RandomCountrySortedByNameGenerator()
        randGenerator.fillTableRandom(self.playlistId)
