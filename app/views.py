from django.shortcuts import render

# Create your views here.
from django.views.generic.list import ListView

from app.models import Playlist


class mainView(ListView):
    template_name = 'index.html'
    queryset = Playlist

