from django.urls import path

from app.src.services.suggestion.suggestionService import SuggestionService

app_name = 'app'

urlpatterns = [
    ## Create a suggestion
    path('create/', SuggestionService.createGeneralSuggestion, name='createSuggestion'),
    ## Get the suggestion of the current user
    path('get/', SuggestionService.getUserSuggestions, name='getSuggestions'),
    ## Get all the suggestions.
    path('getAll/', SuggestionService.getAllSuggestion, name='getAllSuggestions'),
    ## Change the status of a wish.
    path('changeStatus/', SuggestionService.changeSuggestionStatus, name='changeSuggestionStatus'),
]
