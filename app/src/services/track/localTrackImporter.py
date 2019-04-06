import logging

from app.src.dao.importer.albumImporter import AlbumImporter
from app.src.dao.importer.artistImporter import ArtistImporter
from app.src.dao.importer.coverImporter import CoverImporter
from app.src.dao.importer.genreImporter import GenreImporter
from app.src.dao.importer.producerImporter import ProducerImporter
from app.src.dao.importer.trackImporter import TrackImporter
from app.src.dao.linker.artistToTrackLinker import ArtistToTrackLinker
from app.src.dao.linker.composerToTrackLinker import ComposerToTrackLinker
from app.src.dao.linker.genreToTrackLinker import GenreToTrackLinker
from app.src.dao.linker.performerToTrackLinker import PerformerToTrackLinker

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
        # Imports the covers
        self._importCovers()
        # Imports the tracks
        self._importTracks()
        # Creating the links between the objects inserted.
        # Creating the links between tracks and genres.
        self._linkTracksToGenres()
        # Creating the links between tracks and artists.
        self._linkTracksToArtists()
        # Creating the links between tracks and composers.
        self._linkTracksToComposers()
        # Creating the links between tracks and performers.
        self._linkTracksToPerformer()
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

    ## Imports the albums of the indexed tracks.
    def _importAlbums(self):
        # fill the albums with the references
        for track in self.trackContainer.tracks[0]:
            track.album.fillArtistIdWithRef(self.artistReference)
            track.album.fillProducerIdWithRef(self.producerReference)
        albumImporter = AlbumImporter()
        self.albumReference = albumImporter.importAlbums(self.trackContainer.albums)
        # Find the id of each album.
        for track in self.trackContainer.tracks[0]:
            track.album.findId(self.albumReference)

    ## Imports the cover of the indexed tracks.
    def _importCovers(self):
        coverImporter = CoverImporter()
        coverReference = coverImporter.importCovers(self.trackContainer.covers)
        # Filling the id of the covers in the track object.
        for track in self.trackContainer.tracks[0]:
            track.coverId = coverReference[track.coverLocation]

    ## Imports the tracks into the database.
    def _importTracks(self):
        trackImporter = TrackImporter()
        trackReference = trackImporter.importTracks(self.trackContainer.tracks[0])
        # Find the id for each track
        for track in self.trackContainer.tracks[0]:
            track.id = trackReference[track.location]

    ## Insert the id of genres and track into the link table.
    def _linkTracksToGenres(self):
        # Creating a list of tuples of (trackId, genreId)
        tracksToLink = []
        for track in self.trackContainer.tracks[0]:
            for genre in track.genres:
                tracksToLink.append((track.id, self.genreReference[genre]))
        linker = GenreToTrackLinker()
        linker.linkGenreToTracks(tracksToLink)

    ## Insert the id of artists and the track into the link table.
    def _linkTracksToArtists(self):
        # Creating a list of tuples of (trackId, artistId)
        tracksToLink = []
        for track in self.trackContainer.tracks[0]:
            for artist in track.artists:
                tracksToLink.append((track.id, self.artistReference[artist.name]))
        linker = ArtistToTrackLinker()
        linker.linkArtistToTracks(tracksToLink)

    ## Insert the id of composer and the track into the link table.
    def _linkTracksToComposers(self):
        # Creating a list of tuples of (trackId, composerId)
        tracksToLink = []
        for track in self.trackContainer.tracks[0]:
            for composer in track.composers:
                tracksToLink.append((track.id, self.artistReference[composer.name]))
        linker = ComposerToTrackLinker()
        linker.linkArtistToTracks(tracksToLink)

    ## Insert the id of performer and the track into the link table.
    def _linkTracksToPerformer(self):
        # Creating a list of tuples of (trackId, performerId)
        tracksToLink = []
        for track in self.trackContainer.tracks[0]:
            for performer in track.performers:
                tracksToLink.append((track.id, self.artistReference[performer.name]))
        linker = PerformerToTrackLinker()
        linker.linkArtistToTracks(tracksToLink)
