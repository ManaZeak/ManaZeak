## This object is used to describe an album in the lazy loading of the list view.
import logging

from app.models import Track
from app.src.dto.track.localLazyTrack import LocalLazyTrack

logger = logging.getLogger('django')

class LocalLazyAlbum(object):


    ## Constructor
    def __init__(self):
        ## The album id.
        self.id = None
        ## The album title
        self.title = None
        ## The album year.
        self.year = None
        ## The tracks linked to the album.
        self.tracks = []
        ## The last inserted track position.
        self.lastTrackPosition = -1
        ## The last track id.
        self.lastTrackId = None
        ## The duration of the album
        self.duration = None
        ## The release artist
        self.releaseArtist = None
        ## The label
        self.label = None
        ## The country where the album were released
        self.country = None
        ## The genres contained in the album.
        self.genres = []

    ## Generate the JSON object of a album.
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.title,
            'YEAR': self.year,
            'TRACKS': [track.generateJson() for track in self.tracks],
        }

    ## Add the information contained by a row into the tracks.
    def addTrackFromRow(self, row):
        trackId = row[5]
        # This is a new track creating it.
        if self.lastTrackId is None or self.lastTrackId != trackId:
            self._createTrackFromRow(trackId, row)
            self.tracks[self.lastTrackPosition].addGenreFromRow(row)
        # Adding the track artist.
        self.tracks[self.lastTrackPosition].addArtistsFromRow(row)
        # Adding the composer and the performer.
        self.tracks[self.lastTrackPosition].addComposerAndPerformerFromRow(row)

    ## Add the track to the album object
    def addTrackFromOrm(self):
        for track in Track.objects.filter(album_id=self.id).order_by('trackNumber'):
            self.tracks.append(LocalLazyTrack.createTrackFromOrm(track))

    ## Create an album object from the orm.
    def createAlbumFromOrm(self, album):
        self.id = album.id
        self.title = album.title
        self.year = album.year
        # Creating the track from the orm
        self.addTrackFromOrm()

    ## Creating a track object from the sql row
    def _createTrackFromRow(self, trackId, row):
        track = LocalLazyTrack()
        track.id = trackId
        track.title = row[6]
        track.year = row[7]
        track.bitrate = row[8]
        track.duration = row[9]
        track.cover = row[10]
        track.moodbar = row[11]
        self.lastTrackId = trackId
        self.lastTrackPosition += 1
        self.tracks.append(track)

