import collections


## This class is used to store information about the position on the file system of the tracks.
class IndexedTrackContainer(object):

    def __init__(self):
        ## The tracks in a VA albums (compilation and mixes)
        self.variousArtists = []
        ## The standard tracks
        self.tracks = collections.defaultdict(list)
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
        self.tracks[track.artistFolderName].append(track)
        # Add the metadata of the track to the reference
        self._addTrackInfo(track)

    ## Merge IndexedTrackContainer together.
    def merge(self, containers):
        # Going through all the containers given
        for container in containers:
            # Merging the dict
            for key, value in container.tracks.items():
                self.tracks[key].append(value)
            # Merging the references and the VA tracks
            self.variousArtists.append(container.variousArtists)
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
            self.artists.add(artist)
        self.albums.add(track.album)
        self.tracksInContainer += 1
