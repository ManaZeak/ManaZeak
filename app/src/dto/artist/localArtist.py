## Represents an artist before it's inserted into the database.
class LocalArtist(object):

    ## Constructor.
    def __init__(self):
        self.name = None
        self.realName = None
        self.folderName = None
        self.folderSize = None
        self.location = None
        self.isAlbumArtist = False

    def addArtist(self, name):
        self._extractNameAndRealName(name)

    def addAlbumArtist(self, name, folderName, folderSize):
        self._extractNameAndRealName(name)
        self.folderName = folderName
        self.folderSize = folderSize
        self.isAlbumArtist = True

    def _extractNameAndRealName(self, name):
        splitArtist = name.split('(')
        self.name = splitArtist[0].strip()
        # If the artist has a real name
        if len(splitArtist) > 1:
            # Removing the last ')'
            self.realName = splitArtist[1].strip()[:-1]
