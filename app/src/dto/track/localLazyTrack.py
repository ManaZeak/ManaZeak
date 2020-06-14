import logging

from app.src.dto.artist.localLazyArtist import LocalLazyArtist
from app.src.dto.genre.localLazyGenre import LocalLazyGenre

logger = logging.getLogger('django')

## This class describe a track object in the lazy loading of the list view.
class LocalLazyTrack(object):

    ## Constructor.
    def __init__(self):
        ## The track id.
        self.id = None
        ## The track title.
        self.title = None
        ## The track year.
        self.year = None
        ## The track bitrate.
        self.bitrate = None
        ## The track duration.
        self.duration = None
        ## The track cover.
        self.cover = None
        ## The track moodbar.
        self.moodbar = None
        ## The track genre.
        self.genres = []
        ## The track artists.
        self.artists = []
        ## The track composers.
        self.composers = []
        ## The track performers.
        self.performers = []
        ## The last artist id.
        self.lastArtistId = None
        ## The composers id.
        self.composersIds = set()
        ## The performers id.
        self.performersIds = set()

    ## Generate the JSON object of the track.
    def generateJson(self):
        return {
            'ID': self.id,
            'TITLE': self.title,
            'YEAR': self.year,
            'COMPOSERS': [composer.generateJson() for composer in self.composers],
            'PERFORMERS': [performer.generateJson() for performer in self.performers],
            'ARTISTS': [artist.generateJson() for artist in self.artists],
            'BITRATE': self.bitrate,
            'DURATION': self.duration,
            'COVER': self.cover,
            'GENRE': [genre.generateJson() for genre in self.genres],
            'MOODBAR': self.moodbar,
        }

    ## Add the artist information to a track.
    def addArtistsFromRow(self, row):
        artistId = row[13]
        if self.lastArtistId is None or self.lastArtistId != artistId:
            artistName = row[14]
            self._createArtist(artistId, artistName)

    def addGenreFromRow(self, row):
        genres = row[12].split(';')
        # if the genre is empty
        if genres is None or genres[0] == '|':
            return None
        for genre in genres:
            splitGenre = genre.split('|')
            newGenre = LocalLazyGenre()
            newGenre.id = splitGenre[0]
            newGenre.name = splitGenre[1]
            self.genres.append(newGenre)
        self.genres.sort(key=lambda genreTmp: genreTmp.name)

    ## Add the composer and the performer to a track.
    def addComposerAndPerformerFromRow(self, row):
        composerId = row[16]
        # If the composer doesn't exist, we create it.
        if composerId not in self.composersIds:
            composerName = row[15]
            self._createComposer(composerId, composerName)
        performerId = row[17]
        ## If the performer doesn't exist, we create it.
        if performerId not in self.performersIds:
            performerName = row[18]
            self._createPerformer(performerId, performerName)

    @staticmethod
    ## Creating a track object from the orm track
    def createTrackFromOrm(track):
        trackLazy = LocalLazyTrack()
        trackLazy.id = track.id
        trackLazy.title = track.title
        trackLazy.year = track.year
        trackLazy.bitrate = track.bitRate
        trackLazy.duration = track.duration
        trackLazy.cover = track.cover.location
        trackLazy.moodbar = track.mood
        trackLazy.addRelatedInfoFromOrm(track)
        return trackLazy

    ## Adds the information linked to the track. (Performer, artists, composer...)
    def addRelatedInfoFromOrm(self, track):
        # Adding the artist from the track.
        for artist in track.artists.all():
            localArtist = LocalLazyArtist()
            localArtist.loadFromArtist(artist)
            self.artists.append(localArtist)
        # Adding the composers from the track.
        for composer in track.composers.all():
            localArtist = LocalLazyArtist()
            localArtist.loadFromArtist(composer)
            self.composers.append(localArtist)
        # Adding the performers from the track.
        for performer in track.performers.all():
            localArtist = LocalLazyArtist()
            localArtist.loadFromArtist(performer)
            self.composers.append(localArtist)
        for genre in track.genres.all():
            localGenre = LocalLazyGenre()
            localGenre.loadFromGenre(genre)
            self.genres.append(localGenre)

    ## Creates a new artist and add it to the artist list.
    def _createArtist(self, artistId, artistName):
        artist = LocalLazyArtist()
        artist.id = artistId
        artist.name = artistName
        self.lastArtistId = artistId
        self.artists.append(artist)

    ## Creates a new composer and add it to the composer list.
    def _createComposer(self, composerId, composerName):
        composer = LocalLazyArtist()
        composer.id = composerId
        composer.name = composerName
        self.composersIds.add(composerId)
        self.composers.append(composer)

    ## Creates a new performer and add it to the performer list.
    def _createPerformer(self, performerId, performerName):
        performer = LocalLazyArtist()
        performer.id = performerId
        performer.name = performerName
        self.performersIds.add(performerId)
        self.performers.append(performer)