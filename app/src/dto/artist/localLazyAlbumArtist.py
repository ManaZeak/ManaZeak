from app.src.dto.album.localLazyAlbum import LocalLazyAlbum


## This object describes an artist in the lazy loading of an artist.
class LocalLazyAlbumArtist (object):

    ## Constructor
    def __init__(self):
        ## The artist id.
        self.id = None
        ## The artist name.
        self.name = None
        ## The albums of the artist.
        self.albums = []
        ## The last inserted album position.
        self.lastAlbumPosition = -1
        ## The last album id.
        self.lastAlbumId = None
        ## Current year
        self.currentYear = None
        ## A temporary variable used to merge album of the same year.
        self.albumOfSameYear = {}

    ## Generate the JSON object of an albumArtist.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.name,
            'ALBUMS': [album.generateJson() for album in self.albums],
        }

    ## Add the information contained by a row into the albums.
    def addAlbumFromRow(self, row):
        # Getting the album id
        albumId = row[2]
        # If it's a different album we create it.
        if self.lastAlbumId is None or self.lastAlbumId != albumId:
            albumTitle = row[3]
            albumYear = row[4]
            # If the albums is in the same year as the previous, they are mixed.
            if albumYear == self.currentYear:
                if albumId in self.albumOfSameYear:
                    # Adding the track and exiting the function.
                    self.albums[self.albumOfSameYear[albumId]].addTrackFromRow(row)
                    return
            else:
                # Changing the current year
                self.currentYear = albumYear
                self.albumOfSameYear.clear()
            self._createAlbum(albumId, albumTitle, albumYear)
            # Adding the created album to the dict containing the albums of the current year
            self.albumOfSameYear[albumId] = self.lastAlbumPosition
        self.albums[self.lastAlbumPosition].addTrackFromRow(row)

    ## Creates a new album object and add it to the list.
    def _createAlbum(self, albumId, albumTitle, albumYear):
        album = LocalLazyAlbum()
        album.id = albumId
        album.title = albumTitle
        album.year = albumYear
        # New album adding 1 to the position.
        self.lastAlbumPosition += 1
        # New last album id.
        self.lastAlbumId = albumId
        # Adding the new album to the list.
        self.albums.append(album)
