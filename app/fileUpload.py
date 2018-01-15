import json

from django.http import JsonResponse
from django.utils.html import strip_tags

from app.utils import errorCheckMessage


def handleUploadedFile(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'CONTENT' in response and 'NAME' in response:
            print(response['CONTENT'])
            name = strip_tags(response['NAME'])
            with open(name, 'wb+') as destination:
                destination.write(response['CONTENT'])
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
