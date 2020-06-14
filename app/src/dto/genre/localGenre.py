from app.src.config.constants import Constants
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## Describe a genre before inserting into the database.
class LocalGenre(object):

    ## Constructor
    def __init__(self):
        ## The name of the genre.
        self.name = None
        ## The name of the cover.
        self.coverName = None

    ## Load a genre from a name (tag)
    def loadGenreFromName(self, name):
        self.name = name
        # Generating the cover name.
        self.coverName = CoverPathGenerator.sanitizeName(self.name) + Constants.JPG

    ## Recreating the hash for set.
    def __hash__(self):
        return hash(self.name)

    ## Recreating the equals operator for the set.
    def __eq__(self, other):
        if isinstance(other, LocalGenre):
            return self.__hash__() == other.__hash__()
        else:
            return False
