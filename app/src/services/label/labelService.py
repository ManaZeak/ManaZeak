from django.contrib.auth.decorators import login_required

from app.models.track import Label
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.label.labelLoader import LabelLoader
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class LabelService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getLabel(request, labelId):
        user = request.user
        # Check permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Check the request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Getting the label
        labelLoader = LabelLoader(user)
        labelLoader.loadLabelDtoWithDao(labelId)
        return {
            'LABEL': labelLoader.label.generateJson(),
        }
