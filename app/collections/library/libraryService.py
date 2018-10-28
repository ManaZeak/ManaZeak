from django.contrib.auth.decorators import login_required


## @package app.collections.library
# This package is used for managing the libraries


@login_required(redirect_field_name='login.html', login_url='app:login')
## Rescan a library
def rescanLibrary(request):
    pass  # FIXME: to be implemented

