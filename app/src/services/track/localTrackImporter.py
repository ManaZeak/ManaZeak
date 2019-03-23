import collections
import logging

from app.models import Artist, Album
from app.src.dao.artistImporter import ArtistImporter
from app.src.dao.genreImporter import GenreImporter
from app.src.dao.producerImporter import ProducerImporter

loggerScan = logging.getLogger('scan')

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
        ## A dict containing the producer linked to their id
        self.producerReference = {}
        ## The container containing the track to insert
        self.trackContainer = trackContainer

    ## Insert or update the tracks in the database.
    def insertLocalTracks(self):
        # Merge genre into the database and fill the reference
        self._importGenre()
        # Imports the artists (including composers and performers)
        self._importArtists()
        # Imports the producers
        self._importProducers()
        # FIXME : compléter les albums avec les références des artistes.
        # Ajouter les albums

        # Ajouter les tracks FIXME: utiliser les location pour les clé uniques pour retrouver les id
        pass

    ## Imports the genres of the indexed tracks.
    def _importGenre(self):
        genreImporter = GenreImporter()
        self.genreReference = genreImporter.mergeGenres(self.trackContainer.genres)

    ## Imports the artists of the indexed tracks.
    def _importArtists(self):
        artistImporter = ArtistImporter()
        self.artistReference = artistImporter.mergeArtists(self.trackContainer.artists)

    ## Imports the producers of the indexed tracks.
    def _importProducers(self):
        producerImporter = ProducerImporter()
        self.producerReference = producerImporter.mergeProducer(self.trackContainer.producers)

    ## Imports the albums of the indexed tracks
    def _importAlbums(self):
        # fill the albums with the references
        for album in self.trackContainer.albums.values:
            album.fillArtistIdWithRef(self.artistReference)
            album.fillProducerIdWithRef(self.producerReference)
