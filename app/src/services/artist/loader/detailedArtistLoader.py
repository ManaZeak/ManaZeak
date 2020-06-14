from app.src.dao.artist.detailedArtistGetter import DetailedArtistGetter
from app.src.dto.artist.detailedArtistDto import DetailedArtistDto
from app.src.dto.country.localCountry import LocalCountry
from app.src.dto.genre.localLazyGenre import LocalLazyGenre
from app.src.services.album.loader.detailedArtistMinimalAlbumLoader import DetailedArtistMinimalAlbumLoader
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## This class manages the loading of a detailed artist.
class DetailArtistLoader(object):

    def __init__(self):
        self.detailedArtists = DetailedArtistDto()
        self.lastAlbumId = None

    ## Loads a detail artist from the database with it's id.
    #   @param artistId the id of the artist we want to load.
    def loadDetailArtistWithId(self, artistId):
        # Loading the information of the artist with a sql request
        artistGetter = DetailedArtistGetter()
        rows = artistGetter.executeRequest(artistId)
        # Loads the information about the artist
        self._loadArtistInfoFromRow(rows[0])
        # Iterating over the rows
        for row in rows:
            # Checking if it's a new album.
            if self.lastAlbumId is None or self.lastAlbumId != row[3]:
                self.detailedArtists.albums.append(DetailedArtistMinimalAlbumLoader.getAlbumFromDetailedArtistRow(row))
                self._addAlbumStats(row)
                self.lastAlbumId = row[3]
            # Adding the genre to the set.
            self._addGenreFromRow(row)
            # Adding the country to the set.
            self._addCountryFromRow(row)

    ## Creates a genre object from the SQL row and add it to the set of the album.
    def _addGenreFromRow(self, row):
        # There is no genre for the track.
        if row[11] is None:
            return
        genre = LocalLazyGenre()
        genre.id = row[11]
        genre.name = row[12]
        self.detailedArtists.genres.add(genre)

    ## Creates a country object from the SQL row and add it to the set of countries.
    def _addCountryFromRow(self, row):
        # There is no country for the track.
        if row[9] is None:
            return
        country = LocalCountry()
        country.id = row[9]
        country.name = row[10]
        self.detailedArtists.countries.add(country)

    ## Add the element of an album to the artist.
    def _addAlbumStats(self, row):
        self.detailedArtists.totalDuration += row[7]
        self.detailedArtists.numberOfTracks += row[8]

    ## Loads the artist information from a SQL row.
    def _loadArtistInfoFromRow(self, row):
        self.detailedArtists.id = row[0]
        self.detailedArtists.name = row[1]
        self.detailedArtists.picture = CoverPathGenerator.generateArtistPicturePath(self.detailedArtists.name)
