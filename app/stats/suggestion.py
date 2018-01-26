import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.models import Track
from app.track.track import exportTrackInfo
from app.utils import errorCheckMessage


# Generate json for a list of tracks with detailed information
def generateSimilarTrackJson(selectedTracks):
    if len(selectedTracks) == 0:
        return None
    data = []
    for track in selectedTracks:
        data.append(exportTrackInfo(track))
    return dict({'RESULT': data})


# From a track read the tags and fetch similar tracks
@login_required(redirect_field_name='login.html', login_url='app:login')
def getSimilarTrack(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        selectedTracks = []
        if 'TRACK_ID' in response and 'SUGGESTION_MODE' in response:
            trackId = strip_tags(response['TRACK_ID'])
            if Track.objects.filter(id=trackId).count() == 1:
                track = Track.objects.get(id=trackId)
                mode = strip_tags(response['SUGGESTION_MODE'])
                numberTrackTarget = 4

                try:
                    mode = int(mode)
                except ValueError:
                    mode = 5

                # Same artist track selection
                if mode == 0:
                    tracks = Track.objects.filter(artist__in=track.artist.all()).exclude(id=track.id) \
                        .order_by('-playCounter')
                # Same album track selection
                elif mode == 1:
                    tracks = Track.objects.filter(album=track.album).exclude(id=track.id).order_by('-playCounter')
                # Same genre track selection
                elif mode == 2:
                    tracks = Track.objects.filter(genre=track.genre).exclude(id=track.id).order_by('-playCounter')
                # Other values
                else:
                    return JsonResponse(errorCheckMessage(False, "badFormat"))

                # Check length of the query set
                if len(tracks) < 4:
                    if len(tracks) == 0:
                        if mode == 0:
                            return JsonResponse(errorCheckMessage(False, "noSameArtist"))
                        elif mode == 1:
                            return JsonResponse(errorCheckMessage(False, "noSameAlbum"))
                        else:
                            return JsonResponse(errorCheckMessage(False, "noSameGenre"))
                    else:
                        numberTrackTarget = len(tracks)

                # Choosing the X most listened tracks
                for trackCursor in tracks:
                    selectedTracks.append(trackCursor)
                    if len(selectedTracks) == numberTrackTarget:
                        break

                # Returning results
                return JsonResponse({**generateSimilarTrackJson(selectedTracks), **errorCheckMessage(True, None)})
            else:
                data = errorCheckMessage(False, "dbError")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return data
