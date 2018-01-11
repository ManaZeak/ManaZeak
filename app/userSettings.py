from django.http import JsonResponse

from app.utils import errorCheckMessage


def getUserSettings(request):
    if request.method == 'GET':
        data = errorCheckMessage(True, None)
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)

