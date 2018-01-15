import base64
import json

import os
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.utils import errorCheckMessage


def handleUploadedFile(request):
    if request.method == 'POST':
        response = json.loads(request.body)
        if 'CONTENT' in response and 'NAME' in response:
            name = strip_tags(response['NAME'])
            if '/' not in name and '\\' not in name:
                # TODO : check if file exists allready in the buffer
                if not os.path.exists("/library/Buffer"):
                    os.makedirs("/library/Buffer")
                with open(os.path.join("/library/Buffer", name), 'wb+') as destination:
                    # Split the header with MIME type
                    destination.write(base64.b64decode(str(response['CONTENT'].split(",")[1])))
                data = errorCheckMessage(True, None)
            else:
                data = errorCheckMessage(False, "badFileName")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
