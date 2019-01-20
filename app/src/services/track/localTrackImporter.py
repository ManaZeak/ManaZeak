## This class process and insert into the database the local tracks.
class LocalTrackImporter(object):

    ## Constructor, initialise the references of album artists and genre
    def __init__(self, localTracks):
        ## A dict containing the album name linked to the id
        self.albumReference = {}
        ## A dict containing the artists names linked to their id
        self.artistReference = {}
        ## A dict containing the genre linked to their id
        self.genreReference = {}
        ## Tracks to insert
        self.localTracks = localTracks

    ## Fill the references with the available data in the database.
    def fillReferences(self):
        genres = []
        artists = []
        albums = []
        for track in self.localTracks:
            pass

    ## Insert or update the tracks in the database.
    def insertLocalTracks(self):
        # Ajouter les genres
        # Ajouter les artistes (composer + performer)
        # Ajouter les albums
        pass


