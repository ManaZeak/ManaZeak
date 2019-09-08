from app.models import Genre
from app.src.dto.genre.MainPageGenre import MainPageGenre
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.decorators import FrontRequest


from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## The interactions between the user and the genres.
class GenreService(object):

    @staticmethod
    @FrontRequest
    def getAllGenres(request):
        user = request.user
        # Checking if the request is correct.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
        # Checking if the user has the permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        genreInDb = Genre.objects.all()
        genres = []
        for genre in genreInDb:
            genreDto = MainPageGenre()
            genreDto.buildFromOrmGenre(genre)
            genres.append(genreDto.getJsonObject())
        return {
            'GENRES': genres,
        }
