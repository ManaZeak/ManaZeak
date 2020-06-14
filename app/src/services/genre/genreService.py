from django.contrib.auth.decorators import login_required

from app.models import Genre, Track, Artist
from app.src.dto.genre.MainPageGenre import MainPageGenre
from app.src.dto.track.localLazyTrack import LocalLazyTrack
from app.src.security.permissionEnum import PermissionEnum
from app.src.security.permissionHandler import PermissionHandler
from app.src.utils.covers.coverPathGenerator import CoverPathGenerator
from app.src.utils.decorators.frontRequest import FrontRequest
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException

from app.src.utils.frontRequestChecker import FrontRequestChecker
from app.src.utils.requestMethodEnum import RequestMethodEnum


## The interactions between the user and the genres.
class GenreService(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get all the genres available in the database.
    def getAllGenres(request):
        user = request.user
        # Checking if the request is correct.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
        # Checking if the user has the permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        genreInDb = Genre.objects.all().order_by('name')
        genres = []
        for genre in genreInDb:
            genreDto = MainPageGenre()
            genreDto.buildFromOrmGenre(genre)
            genres.append(genreDto.getJsonObject())
        return {
            'GENRES': genres,
        }

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    @FrontRequest
    ## Get the track related to a genre.
    def getGenre(request, genreId):
        user = request.user
        # Checking if the request is correct.
        FrontRequestChecker.checkRequest(RequestMethodEnum.GET, request)
        # Checking if the user has the permission
        PermissionHandler.checkPermission(PermissionEnum.PLAY, user)
        if Genre.objects.filter(id=genreId).count() == 0:
            raise UserException(ErrorEnum.DB_ERROR, user)
        genre = Genre.objects.get(id=genreId)
        tracksDb = Track.objects.filter(genres__id=genreId).order_by('artists__name', 'album__year',
                                                                     'album__title', 'trackNumber')
        artistNumber = Artist.objects.filter(track__genres=genre).distinct().count()
        tracks = []
        for track in tracksDb:
            tracks.append(LocalLazyTrack.createTrackFromOrm(track).generateJson())
        return {
            'GENRE': {
                'ID': genre.id,
                'TRACKS': tracks,
                'NAME': genre.name,
                'PICTURE': CoverPathGenerator.generateGenrePicturePath(genre.name),
                'TOTAL_ARTIST': artistNumber,
            }
        }
