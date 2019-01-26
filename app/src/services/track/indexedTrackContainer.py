import collections


## This class is used to store information about the position on the file system of the tracks.
class IndexedTrackContainer(object):

    def __init__(self):
        ## The standard tracks
        self.tracks = []
        ## The genres names present in the indexed tracks
        self.genres = set()
        ## The artists names present in the indexed tracks
        self.artists = set()
        ## The albums names present in the indexed tracks
        self.albums = set()
        ## The number of track inside the container
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
    def merge(self, containers):
        # Going through all the containers given
        for container in containers:
            self.tracks.append(container.tracks)
            # Merging the references
            self.genres.add(container.genre)
            self.artists.add(container.artists)
            self.albums.add(container.albums)
            self.tracksInContainer += container.tracksInContainer

    ## Add the information about the track into the references.
    #   @param track the LocalTrack to get the metadata to add to the reference.
    def _addTrackInfo(self, track):
        # Adding genre names to the reference
        for genre in track.genres:
            self.genres.add(genre)
        for artist in track.artists:
            self.artists.add(artist.name)
        for composer in track.composers:
            self.artists.add(composer.name)
        for performer in track.performers:
            self.artists.add(performer.name)
        self.albums.add(track.album)
        self.tracksInContainer += 1
