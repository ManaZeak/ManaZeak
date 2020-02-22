from django.contrib.auth.decorators import login_required
from django.shortcuts import render


class SingleObjectViews(object):

    # TODO New url to process
    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleReleaseArtistPage(request):
        return render(request, 'views/singleObject/singleReleaseArtistPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleArtistPage(request):
        return render(request, 'views/singleObject/singleArtistPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleAlbumPage(request):
        return render(request, 'views/singleObject/singleAlbumPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleProducerPage(request):
        return render(request, 'views/singleObject/singleProducerPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleLabelPage(request):
        return render(request, 'views/singleObject/singleLabelPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleGenrePage(request):
        return render(request, 'views/singleObject/singleGenrePage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleCountryPage(request):
        return render(request, 'views/singleObject/singleCountryPage.html')
