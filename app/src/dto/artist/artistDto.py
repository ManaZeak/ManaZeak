from app.src.config.constants import Constants
from app.src.dao.artist.artistGetter import ArtistGetter
from app.src.dto.AbstractDto import AbstractDto
from app.src.dto.album.mainPageAlbum import MainPageAlbum


## Represents all the information about an artist.
class ArtistDto(AbstractDto):

    ## Constructor
    def __init__(self):
        ## The artist id
        self.id = None
        ## The artist name
        self.name = None
        ## The albums of the artist.
        self.albums = []
        ## The artist picture
        self.picture = None
        ## The number of tracks
        self.numberOfTracks = 0
        ## The total duration
        self.totalDuration = 0

    ## Build an artist from the ORM.
    def loadArtistFromDb(self, artistId):
        # Getting the album asked by the user
        dao = ArtistGetter()
        rows = dao.executeRequest(artistId)
        first = True
        for row in rows:
            # Adding the artist information
            if first:
                self.id = row[0]
                self.name = row[1]
                if row[2] is not None:
                    self.picture = Constants.ARTIST_PICTURE_LOCATION + row[2]
            # Adding the number of track and the total duration of the album.
            if row[7] is not None:
                self.totalDuration += row[7]
            if row[8] is not None:
                self.numberOfTracks += row[8]
            # Creating the info about the album
            album = MainPageAlbum()
            album.buildFromArtistDao(row)
            self.albums.append(album)

    ## Generate a JSON object with the object.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
            'ALBUMS': [album.getJsonObject() for album in self.albums],
            'TOTAL_RELEASED_TRACK': self.numberOfTracks,
            'TOTAL_DURATION': self.totalDuration,
            'TOTAL_RELEASED_ALBUM': len(self.albums),
            'PP': self.picture,
        }
