import logging

from django.contrib.auth.decorators import login_required


logger = logging.getLogger('django')


## This class is used to manage the libraries of the application
class LibraryService(object):

    @login_required(redirect_field_name='', login_url='app:login')
    ## Rescan a library
    def rescanLibrary(request):
        pass  # FIXME: to be implemented
