from app.models import Track


def addTracksInDB(tracks):
    Track.objects.bulk_create(tracks)


def removeTracksInDB(tracks):
    for track in tracks:
        track.delete()
