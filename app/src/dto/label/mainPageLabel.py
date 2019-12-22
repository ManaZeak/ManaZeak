from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


class MainPageLabel(object):

    def __init__(self):
        self.id = None
        self.name = None
        self.picture = None

    def loadFromOrm(self, label):
        self.id = label.id
        self.name = label.name
        self.picture = CoverPathGenerator.generateLabelPicturePath(self.name)

    def getJsonObject(self):
        return {
            'LABEL_ID': self.id,
            'LABEL_NAME': self.name,
            'LABEL_PP': self.picture
        }
