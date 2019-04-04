import logging

from app.src.dao.importer.albumImporter import AlbumImporter
from app.src.dao.importer.artistImporter import ArtistImporter
from app.src.dao.importer.genreImporter import GenreImporter
from app.src.dao.importer.producerImporter import ProducerImporter
from app.src.dao.importer.trackImporter import TrackImporter


loggerScan = logging.getLogger('scan')


## This class process and insert into the database the local tracks.
class LocalTrackImporter(object):

    ## Constructor, initialise the references of album artists and genre
    def __init__(self, trackContainer):
        ## A dict containing the album path linked to their id
        self.albumReference = {}
        ## A dict containing the artists names linked to their id
        self.artistReference = {}
        ## A dict containing the genre linked to their id
        self.genreReference = {}
        ## A dict containing the producer linked to their id
        self.producerReference = {}
        ## The container containing the track to insert
        self.trackContainer = trackContainer

    ## Insert or update the tracks in the database.
    def insertLocalTracks(self):
        loggerScan.info('Starting to insert the tracks into the database.')
        # Inserting the objects into the database.
        # Merge genre into the database and fill the reference
        self._importGenre()
        # Imports the artists (including composers and performers)
        self._importArtists()
        # Imports the producers
        self._importProducers()
        # Imports the albums
        self._importAlbums()
        # Imports the tracks
        self._importTracks()
        # Creating the links between the objects inserted.

        loggerScan.info('The insert of objects into the database is finished')

    ## Imports the genres of the indexed tracks.
    def _importGenre(self):
        genreImporter = GenreImporter()
        self.genreReference = genreImporter.importGenres(self.trackContainer.genres)

    ## Imports the artists of the indexed tracks.
    def _importArtists(self):
        artistImporter = ArtistImporter()
        self.artistReference = artistImporter.importArtists(self.trackContainer.artists)

    ## Imports the producers of the indexed tracks.
    def _importProducers(self):
        producerImporter = ProducerImporter()
        self.producerReference = producerImporter.importProducers(self.trackContainer.producers)
        # Find the id of each track producer.
        for track in self.trackContainer.tracks[0]:
            if track.producer in self.producerReference:
                track.producerId = self.producerReference[track.producer]

    ## Imports the albums of the indexed tracks
    def _importAlbums(self):
        # fill the albums with the references
        for album in self.trackContainer.albums:
            self.trackContainer.albums[album].fillArtistIdWithRef(self.artistReference)
            self.trackContainer.albums[album].fillProducerIdWithRef(self.producerReference)
        albumImporter = AlbumImporter()
        self.albumReference = albumImporter.importAlbums(self.trackContainer.albums)
        # Find the id of each album.
        for album in self.trackContainer.albums:
            self.trackContainer.albums[album].findId(self.albumReference)

    ## Imports the tracks into the database.
    def _importTracks(self):
        trackImporter = TrackImporter()
        trackReference = trackImporter.importTracks(self.trackContainer.tracks[0])
        # Find the id for each track
        for track in self.trackContainer.tracks:
            track.id = trackReference[track.location]

    ## Insert the id of genres and track into the link table.
    def _linkTracksToGenres(self):
        # Creating a list of tuples of {trackId, genreId}
        tracksToLink = []
        for track in self.trackContainer.tracks:
            for genre in track.genres:
                tracksToLink.append((track.id, self.genreReference[genre]))

