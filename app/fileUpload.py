import base64
import json

import os

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils.html import strip_tags

from app.adminTools import getAdminOptions
from app.errors import ErrorEnum, errorCheckMessage
from app.track.importer import setUploader
from app.utils import checkPermission


# Handle the file upload
@login_required(redirect_field_name='login.html', login_url='app:login')
## Function for handling uploaded file to the server
#   @param request the content of the file in base64
#   @return if the operation was successful
def handleUploadedFile(request):
    if request.method == 'POST':
        user = request.user
        response = json.loads(request.body)
        if checkPermission(["UPLD"], user):
            if 'CONTENT' in response and 'FILENAME' in response:
                name = strip_tags(response['FILENAME'])
                if '/' not in name and '\\' not in name:
                    adminOptions = getAdminOptions()
                    if not os.path.exists(adminOptions.bufferPath):
                        try:
                            os.makedirs(adminOptions.bufferPath)
                        except os.error:
                            return JsonResponse(errorCheckMessage(False, ErrorEnum.DND_ERROR, handleUploadedFile))
                    filePath = os.path.join(adminOptions.bufferPath, name)
                    if not os.path.isfile(filePath):
                        with open(filePath, 'wb+') as destination:
                            # Split the header with MIME type
                            destination.write(base64.b64decode(str(response['CONTENT'].split(",")[1])))
                        setUploader(filePath, user.username)
                        data = errorCheckMessage(True, None, handleUploadedFile)
                    else:
                        data = errorCheckMessage(False, ErrorEnum.FILE_EXISTS, handleUploadedFile, user)
                else:
                    data = errorCheckMessage(False, ErrorEnum.BAD_FILE_NAME, handleUploadedFile)
            else:
                data = errorCheckMessage(False, ErrorEnum.BAD_FORMAT, handleUploadedFile, user)
        else:
            data = errorCheckMessage(False, ErrorEnum.PERMISSION_ERROR, handleUploadedFile, user)
    else:
        data = errorCheckMessage(False, ErrorEnum.BAD_REQUEST, handleUploadedFile)
    return JsonResponse(data)
