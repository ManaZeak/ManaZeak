from django.contrib.auth.decorators import login_required

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.services.label.labelLoader import LabelLoader
from app.src.services.label.mainPageLabelLoader import MainPageLabelLoader
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class LabelService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get a single label from the label id.
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

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the labels.
    def getAllLabel(request):
        user = request.user
        # Check permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Check the request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Loading the labels
        labels = MainPageLabelLoader.loadAllLabels()
        return {
            'LABELS': [label.getJsonObject() for label in labels]
        }
