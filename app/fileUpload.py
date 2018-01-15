import base64
import json

from django.http import JsonResponse
from django.utils.html import strip_tags

from app.utils import errorCheckMessage


def handleUploadedFile(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'CONTENT' in response and 'NAME' in response:
            name = strip_tags(response['NAME'])
            with open(name, 'wb+') as destination:
                #split the header with MIME type
                destination.write(base64.b64decode(str(response['CONTENT'].split(",")[1])))
            data = errorCheckMessage(True, None)
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
