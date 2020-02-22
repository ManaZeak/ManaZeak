from app.src.dto.artist.artistDto import ArtistDto
from app.src.services.album.loader.labelAlbumLoader import LabelAlbumLoader
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## This class allows to load an artist from the SQL request loading a label.
class LabelArtistLoader(object):

    def __init__(self):
        self.artists = []

    ## Load a table of artist from a SQL request by label.
    def loadArtistsFromLabelRq(self, rows):
        lastArtistId = 0
        currentArtist = None
        for row in rows:
            # If the artist has not been added
            if lastArtistId != row[6]:
                # If the artist is defined adding to the artists
                if currentArtist is not None:
                    self.artists.append(currentArtist)
                # Adding the new artist
                currentArtist = self._fillArtistFromRow(row)
                lastArtistId = row[6]
            # Adding the album to the artist
            albumLoader = LabelAlbumLoader()
            albumLoader.loadAlbumFromLabel(row)
            currentArtist.albums.append(albumLoader.album)
        # Adding the last artist.
        if currentArtist is not None:
            self.artists.append(currentArtist)

    @staticmethod
    ## Create a new artist DTO from the sql row.
    def _fillArtistFromRow(row):
        artist = ArtistDto()
        artist.id = row[6]
        artist.name = row[7]
        artist.picture = CoverPathGenerator.generateArtistPicturePath(row[8])
        return artist
