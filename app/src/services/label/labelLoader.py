from app.src.dao.label.labelDtoGetter import LabelDtoGetter
from app.src.dto.label.labelDto import LabelDto
from app.src.services.artist.loader.labelArtistLoader import LabelArtistLoader
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


## This class allows to load a label from the database to a DTO.
class LabelLoader(object):

    ## Constructor
    def __init__(self, user):
        self.label = LabelDto()
        self.user = user

    ## Loads a label and the subsequent objects with a custom request.
    def loadLabelDtoWithDao(self, labelId):
        # Getting the DAO
        dao = LabelDtoGetter()
        # Getting the rows.
        rows = dao.executeRequest(labelId)
        # Building the DTO with the elements returned.
        if len(rows) == 0:
            raise UserException(ErrorEnum.DB_ERROR, self.user)
        # Getting the info about the current label
        self._getLabelInfoByDao(rows)
        # Getting the info about the artists and albums.
        labelArtistLoader = LabelArtistLoader()
        labelArtistLoader.loadArtistsFromLabelRq(rows)
        self.label.artists = labelArtistLoader.artists

    ## Getting the information about the label from the first row of the sql.
    def _getLabelInfoByDao(self, rows):
        # Getting the first line since we know there is at least 1 line.
        row = rows[0]
        self.label.id = row[0]
        self.label.name = row[1]
