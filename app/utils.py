from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView


# Render class for serving modal to client
class ScanModal (TemplateView):
    template_name = 'utils/modal.html'

    @method_decorator(login_required(redirect_field_name='user/login.html', login_url='app:login'))
    def dispatch(self, *args, **kwargs):
        return super(ScanModal, self).dispatch(*args, **kwargs)


# Return a bad format error
def badFormatError():
    data = {
        'RESULT': 'FAIL',
        'ERROR': 'Bad format'
    }
    return JsonResponse(data)


def exportPlaylistToJson(playlist):
    tracks = playlist.track.all()
    finalData = "["
    for track in tracks:
        finalData += "{ \"ID\":"
        finalData += str(track.id)
        finalData += ", \"TITLE\":\""
        if track.title is not None:
            finalData += track.title
        else:
            finalData += " "
        finalData += "\", \"YEAR\":"
        if track.year is not None:
            finalData += str(track.year)
        else:
            finalData += "0"
        finalData += ", \"COMPOSER\":\""
        if track.composer is not None:
            finalData += track.composer
        else:
            finalData += " "
        finalData += "\", \"PERFORMER\":\""
        if track.performer is not None:
            finalData += track.performer
        else:
            finalData += " "
        finalData += "\", \"TRACK_NUMBER\":"
        if track.number is not None:
            finalData += str(track.number)
        else:
            finalData += "0"
        finalData += ", \"BPM\":"
        if track.bpm is not None:
            finalData += str(track.bpm)
        else:
            finalData += "0"
        finalData += ", \"LYRICS\":\""
        if track.lyrics is not None:
            finalData += track.lyrics
        else:
            finalData += " "
        finalData += "\", \"COMMENT\":\""
        if track.comment is not None:
            finalData += track.comment
        else:
            finalData += " "
        finalData += "\", \"BITRATE\":"
        finalData += str(track.bitRate)
        finalData += ", \"SAMPLERATE\":"
        finalData += str(track.sampleRate)
        finalData += ", \"DURATION\":"
        finalData += str(track.duration)
        finalData += ", \"DISC_NUMBER\":"
        if track.discNumber is not None:
            finalData += str(track.discNumber)
        else:
            finalData += "0"
        finalData += ", \"SIZE\":"
        if track.size is not None:
            finalData += str(track.size)
        else:
            finalData += "0"
        finalData += ", \"LAST_MODIFIED\":\""
        finalData += str(track.lastModified)
        finalData += "\", \"ARTISTS\":["
        for artist in track.artist.all():
            finalData += "{\"ID\":"
            finalData += str(artist.id)
            finalData += ", \"NAME\":\""
            finalData += artist.name
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "], \"ALBUM\": { \"ID\":"
        finalData += str(track.album.id)
        finalData += ", \"TITLE\":\""
        if track.album.title is not None:
            finalData += track.album.title
        else:
            finalData += " "
        finalData += "\", \"NUMBER_OF_DISC\":"
        if track.album.numberOfDisc is not None:
            finalData += str(track.album.numberOfDisc)
        else:
            finalData += "0"
        finalData += ", \"NUMBER_TOTAL_TRACK\":"
        if track.album.numberTotalTrack is not None:
            finalData += str(track.album.numberTotalTrack)
        else:
            finalData += "0"
        finalData += ", \"ARTIST\":["
        for artist in track.album.artist.all():
            finalData += "{\"ID\":"
            finalData += str(artist.id)
            finalData += ", \"NAME\":\""
            finalData += artist.name
            finalData += "\"},"
        finalData = finalData[:-1]
        finalData += "]}},"
    finalData = finalData[:-1]
    finalData += "]"
    return finalData
