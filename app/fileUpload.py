import base64
import json

import os

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.adminTools import getAdminOptions
from app.track.importer import setUploader
from app.utils import errorCheckMessage


@login_required(redirect_field_name='user/login.html', login_url='app:login')
def handleUploadedFile(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if 'CONTENT' in response and 'NAME' in response:
            name = strip_tags(response['NAME'])
            if '/' not in name and '\\' not in name:
                adminOptions = getAdminOptions()
                if not os.path.exists(adminOptions.bufferPath):
                    os.makedirs(adminOptions.bufferPath)
                filePath = os.path.join(adminOptions.bufferPath, name)
                if not os.path.isfile(filePath):
                    with open(filePath, 'wb+') as destination:
                        # Split the header with MIME type
                        destination.write(base64.b64decode(str(response['CONTENT'].split(",")[1])))
                    setUploader(filePath, user.username)
                    data = errorCheckMessage(True, None)
                else:
                    data = errorCheckMessage(False, "fileExists")
            else:
                data = errorCheckMessage(False, "badFileName")
        else:
            data = errorCheckMessage(False, "badFormat")
    else:
        data = errorCheckMessage(False, "badRequest")
    return JsonResponse(data)
