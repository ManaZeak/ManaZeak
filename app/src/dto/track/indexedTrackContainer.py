import logging

from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException

loggerScan = logging.getLogger('scan')


## This class is used to store information about the position on the file system of the tracks.
class IndexedTrackContainer(object):

    def __init__(self):
        ## The standard tracks.
        self.tracks = []
        ## The genres names present in the indexed tracks.
        self.genres = set()
        ## The producers present in the indexed tracks.
        self.producers = set()
        ## The artists names present in the indexed tracks.
        self.artists = dict()
        ## The albums names present in the indexed tracks.
        self.albums = dict()
        ## The number of track inside the container.
        self.tracksInContainer = 0

    ## Add a local track to the dict
    #   @param artistFolder the name of the artists folder.
    #   @param track the LocalTrack extracted by the extractor.
    def addTrack(self, track):
        # Adding to the dict (default value is a list so we don't have to test if the values exists)
        self.tracks.append(track)
        # Add the metadata of the track to the reference
        self._addTrackInfo(track)

    ## Merge IndexedTrackContainer together.
    #   @param containers a table of containers to merge.
    def merge(self, containers):
        # Going through all the containers given
        for container in containers:
            # If the container is empty we do nothing
            if len(container) == 0:
                continue
            elif len(container) > 1:  # If there is more than 1 container, return an error.
                raise UserException(ErrorEnum.UNEXPECTED_STATE)
            # Adding the objects
            self.tracks.append(container[0].tracks)
            self.genres.update(container[0].genres)
            self.producers.update(container[0].producers)
            self.artists = {**self.artists, **container[0].artists}
            self.albums = {**self.albums, **container[0].albums}
            self.tracksInContainer += container[0].tracksInContainer

    ## Add the information about the track into the references.
    #   @param track the LocalTrack to get the metadata to add to the reference.
    def _addTrackInfo(self, track):
        # Adding album artist to the artist
        self._addArtistToArtists(track.albumArtist, True)
        # Adding genre names to the reference
        for genre in track.genres:
            self.genres.add(genre)
        # Adding artists names to the reference
        for artist in track.artists:
            self._addArtistToArtists(artist)
        # Adding composer names to the reference
        for composer in track.composers:
            self._addArtistToArtists(composer)
        # Adding performer names to the reference
        for performer in track.performers:
            self._addArtistToArtists(performer)
        # Adding the producer
        self.producers.add(track.producer)
        # Adding the album
        self._addAlbumToAlbums(track.album)
        # Incrementing the number of track in the container
        self.tracksInContainer += 1

    ## Add the artist to the artists to be inserted into the database.
    #   @param artist the artist to add into the dict.
    #   @param isAlbumArtist if the artist is an album artist (has a folder).
    def _addArtistToArtists(self, artist, isAlbumArtist=False):
        if artist.name in self.artists:
            # If the artist real name isn't set we add it
            if self.artists[artist.name].realName is None:
                self.artists[artist.name].realName = artist.realName
            # The folder information is only present in the album artist
            if isAlbumArtist:
                if self.artists[artist.name].folderName is None:
                    self.artists[artist.name].folderName = artist.folderName
                if self.artists[artist.name].location is None:
                    self.artists[artist.name].location = artist.location

        else:
            # Creating the artist in the element to save
            self.artists[artist.name] = artist

    ## Adds the album to the dict of albums to save into the database.
    #   @param album the album to add to the dict
    def _addAlbumToAlbums(self, album):
        # Adding the album only if it's not present
        if album.location not in self.albums:
            self.albums[album.location] = album
