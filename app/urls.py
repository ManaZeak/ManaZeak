from django.conf.urls import url
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import RedirectView, CreateView
from . import views

app_name = 'app'

urlpatterns = [
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^ajax/rescan/$', views.initialScan, name='rescan'),
    url(r'^DEBUG/drop/$', views.dropAllDB, name='drop'),
    url(r'^db/$', views.viewDB.as_view(), name='db'),
    url(r'^signup/$', views.createUser, name='signup'),
    url(r'^login/$', views.UserFormLogin.as_view(), name='login'),
    url(r'^logout/$', views.logoutView, name='logout')
]

