import collections

from app.models import Genre, Artist, Album


## This class process and insert into the database the local tracks.
class LocalTrackImporter(object):

    ## Constructor, initialise the references of album artists and genre
    def __init__(self, trackContainer):
        ## A dict containing the album name linked to the id
        self.albumReference = collections.defaultdict(list)
        ## A dict containing the artists names linked to their id
        self.artistReference = {}
        ## A dict containing the genre linked to their id
        self.genreReference = {}
        ## The container containing the track to insert
        self.trackContainer = trackContainer

    ## Fill the references with the available data in the database.
    def fillReferences(self):
        # Getting the information from the database for the genres
        self.cacheExistingGenre()
        # Getting the information from the database for the artists
        self.cacheExistingArtists()

    ## Fill the reference for the genres
    def cacheExistingGenre(self):
        existingGenres = Genre.objects.filter(name__in=self.trackContainer.genres)
        for existingGenre in existingGenres:
            self.genreReference[existingGenre.name] = existingGenre.id

    ## Fill the reference for the artists
    def cacheExistingArtists(self):
        existingArtists = Artist.objects.filter(name__in=self.trackContainer.artists)
        for existingArtist in existingArtists:
            self.artistReference[existingArtist] = existingArtist.id

    ## Fill the reference for the albums
    def cacheExistingAlbums(self):
        existingAlbums = Album.objects.filter(title=self.trackContainer.album)
        for existingAlbum in existingAlbums:
            artistAlbums = self.albumReference[existingAlbum.artist.name]
            artistAlbums[existingAlbum.title] = existingAlbum.id

    ## Insert or update the tracks in the database.
    def insertLocalTracks(self):
        # Ajouter les genres
        # Ajouter les artistes (composer + performer)
        # Ajouter les albums
        pass
