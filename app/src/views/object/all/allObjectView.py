from django.contrib.auth.decorators import login_required
from django.shortcuts import render


class AllObjectView(object):

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllReleaseArtistsPage(request):
        return render(request, 'views/tags/allReleaseArtistsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllAlbumsPage(request):
        return render(request, 'views/tags/allAlbumsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllProducersPage(request):
        return render(request, 'views/tags/allProducersPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllLabelsPage(request):
        return render(request, 'views/tags/allLabelsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllGenresPage(request):
        return render(request, 'views/tags/allGenresPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllArtist(request):
        return render(request, 'views/tags/allArtistsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllCountriesPage(request):
        return render(request, 'views/tags/allCountriesPage.html')