# import eyed3
import os

from django.views.generic.list import ListView
from django.http import JsonResponse
from os import listdir
from os.path import isfile, join

from app.models import Playlist


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist


def rescan_music(request):
    absolute_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library = os.path.join(absolute_path, 'static/audio')
    only_files = [f for f in listdir(library) if isfile(join(library, f))]
    print("file in folder ")
    print(only_files)
    track_path = os.path.join(library, only_files[1])
    # audio_file = eyed3.load(track_path)
    # audio_file.tag.artist = u"Zobar2k"
    # audio_file.tag.save()
    data = {
        'OK': only_files
    }
    return JsonResponse(data)
