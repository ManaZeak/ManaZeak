from django.urls import path

from app.views import loginView, signupView

app_name = 'app'
urlpatterns = [
    ############################# Views #############################
    path('login/', loginView.Login.as_view(), name='login'),
    path('signup/', signupView.signup, name='signup'),
]