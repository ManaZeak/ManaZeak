from app.models.settings import Suggestion
from app.src.constants.wishStatusEnum import WishStatusEnum


## Class used to manipulate wishes.
from app.src.services.suggestion.suggestionLoader import SuggestionLoader


class SuggestionManager(object):

    @staticmethod
    ## Creates and save a suggestion for a user.
    def createSuggestion(text, user):
        suggestion = Suggestion()
        suggestion.user = user
        suggestion.text = text
        suggestion.status_id = WishStatusEnum.SUBMITTED.value
        suggestion.save()
