from django.conf.urls import url
from django.views.generic import RedirectView
from . import views

app_name = 'app'

urlpatterns =[
    url(r'^$', views.mainView.as_view(), name='index'),
    url(r'^ajax/rescan/$', views.initialScan, name='rescan'),
]
