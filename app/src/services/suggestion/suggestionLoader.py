from app.models.settings import Suggestion
from app.src.dto.suggestion.suggestionDto import SuggestionDto


class SuggestionLoader(object):

    @staticmethod
    ## Loads user's suggestions from the database
    def loadSuggestionFromUser(user):
        suggestionsDb = Suggestion.objects.filter(user=user).order_by('creationDate', 'status_id')
        return SuggestionLoader._loadSuggestionFromOrm(suggestionsDb)

    @staticmethod
    ## Loads all the user's suggestions for the database.
    def loadAllSuggestion():
        suggestionDB = Suggestion.objects.all().order_by('creationDate', 'status_id')
        return SuggestionLoader._loadSuggestionFromOrm(suggestionDB)

    @staticmethod
    def _loadSuggestionFromOrm(suggestionsDb):
        suggestions = []
        for suggestionDb in suggestionsDb:
            suggestion = SuggestionDto()
            suggestion.user = suggestionDb.user
            suggestion.creationDate = suggestionDb.creationDate
            suggestion.text = suggestionDb.text
            suggestion.status = suggestionDb.status
            suggestion.statusLabel = suggestionDb.status.label
            suggestions.append(suggestion)
        return suggestions
