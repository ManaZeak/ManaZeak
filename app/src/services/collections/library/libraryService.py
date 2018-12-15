import logging

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


## @package app.collections.library
# This package is used for managing the libraries

logger = logging.getLogger('django')

@login_required(redirect_field_name='', login_url='app:login')
## Rescan a library
def rescanLibrary(request):
    pass  # FIXME: to be implemented

@login_required(redirect_field_name='', login_url='app:login')
def getTrack(request, path):
    logger.info('asked for :' + path)
    response = HttpResponse()
    response['X-Accel-Redirect'] = '/library/%s' % path
    return response
