from app.src.services.thumbs.labelThumbnailService import LabelThumbnailService
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator
from app.src.utils.imageGenerators.thumbSizeEnum import ThumbSizeEnum


class MainPageLabel(object):

    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None

    def loadFromOrm(self, label):
        self.id = label.id
        self.name = label.name
        self.picture = LabelThumbnailService.getThumbnailForLabel(self.name, ThumbSizeEnum.SMALL)

    def getJsonObject(self):
        return {
            'LABEL_ID': self.id,
            'LABEL_NAME': self.name,
            'LABEL_PP': self.picture
        }
