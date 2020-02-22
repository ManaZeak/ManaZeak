from app.src.services.random.generator.album.randomAlbumSortedByArtistGenerator \
    import RandomAlbumSortedByArtistGenerator
from app.src.services.random.generator.artist.randomArtistSortedByNameGenerator import RandomArtistSortedByNameGenerator
from app.src.services.random.generator.artist.randomReleaseArtistSortedByNameGenerator \
    import RandomReleaseArtistSortedByNameGenerator
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
    def fillAllRandomTables(self):
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
