from django.urls import path

from app.src.views import loginView
from app.src.views import mainView, signupView

app_name = 'app'
urlpatterns = [
    ############################# Views #############################
    path('login/', loginView.Login.as_view(), name='login'),
    path('signup/', signupView.signup, name='signup'),
    path('', mainView.mainView.as_view(), name='index')
]