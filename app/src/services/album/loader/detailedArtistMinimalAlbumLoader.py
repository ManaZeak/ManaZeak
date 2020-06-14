from app.src.dto.album.minimalAlbumDto import MinimalAlbumDto
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## Loads the album for the detailed artists.
class DetailedArtistMinimalAlbumLoader(object):

    @staticmethod
    ## Load the album information from the SQL row.
    #   @param row the SQL row.
    def getAlbumFromDetailedArtistRow(row):
        album = MinimalAlbumDto()
        album.id = row[3]
        album.name = row[4]
        album.year = row[5]
        album.picture = CoverPathGenerator.getCoverPathAlbum(row[6])
        return album
