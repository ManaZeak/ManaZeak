from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


## this class is used fir rendering all the templates in the application
class GenericViews(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Log out the user
    #   @param request request given by the front
    #   @return the login page
    def logoutView(request):
        logout(request)
        return redirect('app:login')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the new library HTML template
    #   @param request request given by the front
    #   @return the new library template
    def newLibraryModal(request):
        return render(request, 'modals/newLibrary.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the user menu context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def userMenuContext(request):
        return render(request, 'modals/userMenu.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the change view context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def changeViewContext(request):
        return render(request, 'modals/changeView.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the change view context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def trackContext(request):
        return render(request, 'contexts/trackcontext.html')
