from django.urls import path

from app.src.views import loginView
from app.src.views import mainView, signupView
## The name of the app linked to the urls
app_name = 'app'


## The different pattern of the urls of the application.
#   This list links the urls of the application and the function called
urlpatterns = [
    ############################# Views #############################
    path('login/', loginView.Login.as_view(), name='login'),
    path('signup/', signupView.signup, name='signup'),
    path('', mainView.mainView.as_view(), name='index')
]