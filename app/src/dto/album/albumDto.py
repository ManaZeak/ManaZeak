from app.models import Album, Track

from app.src.dto.artist.localLazyArtist import LocalLazyArtist
from app.src.dto.country.localCountry import LocalCountry
from app.src.dto.label.localLazyLabel import LocalLazyLabel
from app.src.dto.track.localLazyTrack import LocalLazyTrack
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


# This class represents the complete information about an album.
class AlbumDto(object):

    ## Constructor
    def __init__(self):
        ## The id of the album
        self.id = None
        ## The title of the album
        self.title = None
        ## The year of the album release
        self.year = None
        ## The duration of the album
        self.duration = None
        ## The description of the album.
        self.description = None
        ## The release artist
        self.releaseArtist = LocalLazyArtist()
        ## The label
        self.label = LocalLazyLabel()
        ## The country where the album were released.
        self.countries = set()
        ## The cover of the album
        self.cover = None
        ## The genres contained in the album.
        self.genres = set()
        ## The total duration of the album
        self.duration = 0
        ## The tracks of the album. A table of LocalLazyTracks.
        self.tracks = []

    ## Load an album with the ORM with the album id
    def loadAlbumFromOrm(self, albumId, user):
        # Getting the album of the user
        if Album.objects.filter(id=albumId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        # Getting the album from the database.
        album = Album.objects.get(id=albumId)
        # Loading the information of the album
        self._loadAlbum(album)
        # Getting the release artist
        self.releaseArtist.loadFromArtist(album.releaseArtist)
        # Getting the tracks of the album
        first = True
        for track in Track.objects.filter(album_id=self.id).order_by('trackNumber'):
            # Getting the label of the first track
            if first:
                self.label.loadLabelFromOrm(track)
                for country in track.countries.all():
                    localCountry = LocalCountry()
                    localCountry.loadCountryFromOrm(country)
                    self.countries.add(localCountry)
                first = False
            localTrack = LocalLazyTrack.createTrackFromOrm(track)
            self.tracks.append(localTrack)
            for genre in localTrack.genres:
                self.genres.add(genre)
            self.duration += track.duration

    ## Load an album from an album object.
    def _loadAlbum(self, album):
        self.id = album.id
        self.title = album.title
        self.year = album.year
        self.description = album.description
        self.cover = CoverPathGenerator.generateCoverPathForAlbum(album.cover)

    ## Generate a JSON from the object
    def generateJson(self):
        return {
            'ID': self.id,
            'NAME': self.title,
            'YEAR': self.year,
            'COVER': self.cover,
            'ALBUM_ARTIST': self.releaseArtist.generateJson(),
            'LABEL': self.label.generateJson(),
            'DURATION': self.duration,
            'COUNTRY': [country.generateJson() for country in self.countries],
            'TRACKS': [track.generateJson() for track in self.tracks],
            'GENRES': [genre.generateJson() for genre in self.genres],
        }
