from app.models.track import Label
from app.src.dto.label.mainPageLabel import MainPageLabel
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator


## Allow to loads some labels for the main page.
class MainPageLabelLoader(object):

    @staticmethod
    ## Loads all the label and create main
    def loadAllLabels():
        mainPageLabels = []
        labels = Label.objects.all().order_by('name')
        for label in labels:
            mainPageLabels.append(MainPageLabelLoader.createMainPageAlbumFromOrm(label))
        return mainPageLabels

    @staticmethod
    ## Creates a main page album from a label in the database.
    def createMainPageAlbumFromOrm(label):
        mainPageLabel = MainPageLabel()
        mainPageLabel.id = label.id
        mainPageLabel.name = label.name
        mainPageLabel.picture = CoverPathGenerator.generateLabelPicturePath(mainPageLabel.name)
        return mainPageLabel
