from app.models import TrackInScopeStats


## The helper class for generating the stats on the object in the database.
class StatGenerationHelper(object):

    ## Generate the stats of a library.
    def generateLibraryStat(self):
        pass

    ## Generate the stats of an album.
    def generateAlbumStat(self):
        pass

    ## Generate the stats of a playlist.
    def generatePlaylistStat(self):
        pass

    ## Generate the stats of an artist.
    def generateArtistStat(self):
        pass

    ## Generate the stat for a list of track
    def _generateStatForTrackList(self, tracks):
        pass
