import logging

from app.src.dao.country.countryGetter import CountryGetter
from app.src.dto.album.mainPageAlbum import MainPageAlbum
from app.src.dto.artist.artistCountryDto import ArtistCountryDto
from app.src.dto.country.countryDto import CountryDto
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


logger = logging.getLogger('django')

## Loads all the information about a country.
class SingleCountryLoader(object):

    def __init__(self):
        self.country = CountryDto()
        self.lastArtistId = None
        self.lastArtistIndex = -1

    ## Loads a country from the database.
    def loadCountryFromId(self, countryId):
        # Getting the country information in the database.
        countryGetter = CountryGetter()
        rows = countryGetter.executeRequest(countryId)
        # Filling the basic information
        self._loadCountryFromRow(rows[0])
        # Iterating over the rows and building the albums and the artists.
        for row in rows:
            self._loadArtistFromRow(row)
            self._loadAlbumFromRow(row)

    ## Loads the artist from the sql row.
    def _loadArtistFromRow(self, row):
        artistId = row[5]
        logger.info(row[5])
        # If the artist doesn't exit, we create it.
        if self.lastArtistId is None or self.lastArtistId != artistId:
            self._buildArtistFromRow(row)

    ## Construct album from the sql row.
    def _loadAlbumFromRow(self, row):
        album = MainPageAlbum()
        album.id = row[2]
        album.title = row[3]
        album.picture = CoverPathGenerator.getCoverPathAlbum(row[7])
        self.country.artists[self.lastArtistIndex].albums.append(album)

    ## Construct a artist from the sql row.
    def _buildArtistFromRow(self, row):
        self.lastArtistIndex += 1
        artist = ArtistCountryDto()
        artist.id = row[5]
        artist.name = row[6]
        artist.picture = CoverPathGenerator.generateArtistPicturePath(artist.name)
        self.lastArtistId = artist.id
        self.country.artists.append(artist)

    def _loadCountryFromRow(self, row):
        # Building the country
        self.country.id = row[0]
        self.country.code = row[1]
