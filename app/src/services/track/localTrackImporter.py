import logging

from app.src.dao.importer.albumImporter import AlbumImporter
from app.src.dao.importer.albumArtistImporter import AlbumArtistImporter
from app.src.dao.importer.countryImporter import CountryImporter
from app.src.dao.importer.coverImporter import CoverImporter
from app.src.dao.importer.genreImporter import GenreImporter
from app.src.dao.importer.labelImporter import LabelImporter
from app.src.dao.importer.producerImporter import ProducerImporter
from app.src.dao.importer.trackImporter import TrackImporter
from app.src.dao.linker.artistToTrackLinker import ArtistToTrackLinker
from app.src.dao.linker.composerToTrackLinker import ComposerToTrackLinker
from app.src.dao.linker.countryToTrackLinker import CountryToTrackLinker
from app.src.dao.linker.genreToTrackLinker import GenreToTrackLinker
from app.src.dao.linker.performerToTrackLinker import PerformerToTrackLinker
from app.src.dao.linker.playlistToTrackLinker import PlaylistToTrackLinker
from app.src.dao.script.findAlbumCoversFromTrack import FindAlbumCoversFromTrack

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
        ## A dict containing the cover path linked to their id
        self.coverPathReference = {}
        ## A dict containing the label linked to their id
        self.labelReference = {}
        ## A dict containing the country linked to their id
        self.countryReference = {}
        ## The container containing the track to insert
        self.trackContainer = trackContainer

    ## Insert or update the tracks in the database.
    def insertLocalTracks(self, playlistId):
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
        # Imports the labels
        self._importLabel()
        # Imports the countries
        self._importCountries()
        # Link the previous objects to the tracks
        self._updateDtoWithDbIds()
        # Imports the tracks
        self._importTracks()
        # Creating the links between the objects inserted.
        self._linkObjects(playlistId)

        loggerScan.info('The insert of objects into the database is finished')

    ## Imports the genres of the indexed tracks.
    def _importGenre(self):
        genreImporter = GenreImporter()
        self.genreReference = genreImporter.importGenres(self.trackContainer.genres)

    ## Imports the artists of the indexed tracks.
    def _importArtists(self):
        artistImporter = AlbumArtistImporter()
        self.artistReference = artistImporter.importArtists(self.trackContainer.artists)

    ## Imports the producers of the indexed tracks.
    def _importProducers(self):
        producerImporter = ProducerImporter()
        self.producerReference = producerImporter.importProducers(self.trackContainer.producers)

    ## Imports the albums of the indexed tracks.
    def _importAlbums(self):
        # fill the albums with the references
        for track in self.trackContainer.tracks:
            track.album.fillArtistIdWithRef(self.artistReference)
            track.album.fillProducerIdWithRef(self.producerReference)
        albumImporter = AlbumImporter()
        self.albumReference = albumImporter.importAlbums(self.trackContainer.albums)

    ## Imports the cover of the indexed tracks.
    def _importCovers(self):
        coverImporter = CoverImporter()
        self.coverPathReference = coverImporter.importCovers(self.trackContainer.covers)

    ## Imports the tracks into the database.
    def _importTracks(self):
        trackImporter = TrackImporter()
        trackReference = trackImporter.importTracks(self.trackContainer.tracks)
        # Find the id for each track
        for track in self.trackContainer.tracks:
            track.id = trackReference[track.location]

    def _importCountries(self):
        countryImporter = CountryImporter()
        self.countryReference = countryImporter.importCountries(self.trackContainer.countries)

    def _importLabel(self):
        labelImporter = LabelImporter()
        self.labelReference = labelImporter.importLabels(self.trackContainer.labels)

    ## Update the track with the information of the other tables.
    def _updateDtoWithDbIds(self):
        for track in self.trackContainer.tracks:
            # Finding the cover id.
            if track.coverLocation in self.coverPathReference:
                track.coverId = self.coverPathReference[track.coverLocation]
            # Finding the album id.
            track.album.findId(self.albumReference)
            # Finding the producer id.
            if track.producer in self.producerReference:
                track.producerId = self.producerReference[track.producer]
            # Finding the label id.
            if track.label is not None and track.label.name in self.labelReference:
                track.labelId = self.labelReference[track.label.name]

    ## Creates tuples of trackId, objectId for linking the tracks to database objects.
    def _linkObjects(self, playlistId):
        genreToLink = []
        artistToLink = []
        composerToLink = []
        performerToLink = []
        countryToLink = []
        playlistToLink = []
        # Filling the references
        for track in self.trackContainer.tracks:
            for genre in track.genres:
                genreToLink.append((track.id, self.genreReference[genre.name]))
            for artist in track.artists:
                artistToLink.append((track.id, self.artistReference[artist.name]))
            for composer in track.composers:
                composerToLink.append((track.id, self.artistReference[composer.name]))
            for performer in track.performers:
                performerToLink.append((track.id, self.artistReference[performer.name]))
            for country in track.countries:
                countryToLink.append((track.id, self.countryReference[country.name]))
            playlistToLink.append((track.id, playlistId))
        self._linkTracksToGenres(genreToLink)
        self._linkTracksToArtists(artistToLink)
        self._linkTracksToComposers(composerToLink)
        self._linkTracksToPerformer(performerToLink)
        self._linkCountryToTrack(countryToLink)
        self._linkPlaylistToTrack(playlistToLink)
        self._findAlbumCovers()

    @staticmethod
    ## Insert the id of genres and track into the link table.
    def _linkTracksToGenres(genreToLink):
        linker = GenreToTrackLinker()
        linker.linkGenreToTracks(genreToLink)

    @staticmethod
    ## Insert the id of artists and the track into the link table.
    def _linkTracksToArtists(artistToLink):
        linker = ArtistToTrackLinker()
        linker.linkArtistToTracks(artistToLink)

    @staticmethod
    ## Insert the id of composer and the track into the link table.
    def _linkTracksToComposers(composerToLink):
        linker = ComposerToTrackLinker()
        linker.linkComposerToTracks(composerToLink)

    @staticmethod
    ## Insert the id of performer and the track into the link table.
    def _linkTracksToPerformer(performerToLink):
        linker = PerformerToTrackLinker()
        linker.linkPerformersToTracks(performerToLink)

    @staticmethod
    ## Insert the id of
    def _linkPlaylistToTrack(playlistToLink):
        linker = PlaylistToTrackLinker()
        linker.linkPlaylistToTracks(playlistToLink)

    @staticmethod
    def _linkCountryToTrack(countryToLink):
        linker = CountryToTrackLinker()
        linker.linkCountryToTracks(countryToLink)

    @staticmethod
    def _findAlbumCovers():
        loggerScan.info('Starting to link the album to theirs covers.')
        linker = FindAlbumCoversFromTrack()
        linker.executeRequest()
        loggerScan.info('Album linked to their covers successfully.')
