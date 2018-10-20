from app.models import PlaylistViewOptions, ViewColumn
from app.models.views import ViewType


## Generate in database the information linked to a list view for a user
#   @param user the user associated to the view
#   @param playlist the playlist associated to the view
def createDefaultListView(user, playlist):
    listViewOptions = PlaylistViewOptions()
    listViewOptions.viewType = ViewType.objects.get(name='LIST')
    listViewOptions.playlist = playlist
    listViewOptions.user = user
    listViewOptions.save()
    listViewOptions.columns.add(*generateDefaultListViewColumns())


## Generating the columns for a given view
def generateDefaultListViewColumns():
    cols = [ViewColumn(name='Duration', width='10'), ViewColumn(name='Title', width='20'),
            ViewColumn(name='Artist', width='14'), ViewColumn(name='Composer', width='14'),
            ViewColumn(name='Performer', width='14'), ViewColumn(name='Album', width='14'),
            ViewColumn(name='Genre', width='14')]
    for col in cols:
        col.save()
    return cols
