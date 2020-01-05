from app.src.dto.album.simpleAlbumDto import SimpleAlbumDto
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## Loads an album from the request for getting the information about a label.
class LabelAlbumLoader(object):

    def __init__(self):
        self.album = SimpleAlbumDto()

    ## Load the information of an album from a label request.
    def loadAlbumFromLabel(self, row):
        self.album.id = row[2]
        self.album.title = row[3]
        self.album.year = row[4]
        self.album.cover = CoverPathGenerator.getCoverPathAlbum(row[5])
        self.album.numberOfTracks = row[9]
        self.album.duration = row[10]
