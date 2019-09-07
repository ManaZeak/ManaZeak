## Dumps information about genre in the database.
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from app.models import Genre
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.errors.errorHandler import ErrorHandler
from app.src.utils.exceptions.userException import UserException
from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## Exports all the information contained in the genre table.
class GenreDumpService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Dump all the genres of the database.
    #   @param request the request of the user
    def dumpAllGenres(request):
        user = request.user
        try:
            # Check the request and the user permissions
            FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request, user)
            PermissionHandler.checkPermission(PermissionEnum.ADMIN_VIEW, user)
            # Getting the genres of the genres
            genres = Genre.objects.all()
            genresDump = GenreDumpService._generateJsonForGenres(genres)
            return JsonResponse({**genresDump, **ErrorHandler.createStandardStateMessage(True)})
        except UserException as e:
            ErrorHandler.generateJsonResponseFromException(e, GenreDumpService.dumpAllGenres, user)

    @staticmethod
    ## Generate the JSON for an array of genres.
    #   @param genres an array of genres.
    #   @return a dict containing the genres information.
    def _generateJsonForGenres(genres):
        genresInfo = []
        for genre in genres:
            genresInfo.append({
                'NAME': genre.name
            })
        return {'RESULT': genresInfo}
