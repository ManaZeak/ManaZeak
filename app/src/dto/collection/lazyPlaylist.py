import logging

from app.src.dto.artist.localLazyAlbumArtist import LocalLazyAlbumArtist

loggerDjango = logging.getLogger('django')


## Object containing the information for creating the lazy response for the list view.
class LazyPlaylist(object):

    ## Constructor.
    def __init__(self):
        ## The list of artist contained by the response.
        self.artists = []
        ## The offset to be send to the front.
        self.offset = None
        ## The last artist position in the list. Start at -1 for the first iteration -1 + 1 = 0.
        self.lastArtistPosition = -1
        ## The last artist id inserted.
        self.lastArtistId = None

    def generateJson(self):
        if len(self.artists) == 0:
            return {}
        return {
            'OFFSET': self.offset,
            'RESULT': [artist.generateJson() for artist in self.artists]
        }

    ## Add or merge an album into the table.
    #   @param row the SQL row.
    def addArtistFromRow(self, row):
        # Getting the artist id
        artistId = row[0]
        # If there is no artist or if the artist is different.
        if self.lastArtistId is None or self.lastArtistId != artistId:
            # Getting the artist name
            artistName = row[1]
            # Creating the new artist
            self._createArtist(artistId, artistName)
        # Adding the album information to the artist.
        self.artists[self.lastArtistPosition].addAlbumFromRow(row)

    ## Create an new artist and add it to the artist list.
    #   @param artistId the id of the artist.
    #   @param artistName the name of the artist
    def _createArtist(self, artistId, artistName):
        # Creating the new artist
        artist = LocalLazyAlbumArtist()
        artist.id = artistId
        artist.name = artistName
        # The last artist is this one.
        self.lastArtistId = artistId
        # The position is incremented by 1
        self.lastArtistPosition += 1
        # Adding the artist to the artists list.
        self.artists.append(artist)
