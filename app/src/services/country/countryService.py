## Service for the information linked to the country.
from django.contrib.auth.decorators import login_required

from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


class CountryService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    def getAllCountries(request):
        # Getting the user
        user = request.user
        # Checking the user permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        # Checking the request
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
        # Getting the countries
