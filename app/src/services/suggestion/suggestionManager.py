from app.models.settings import Suggestion
from app.src.constants.suggestionStatusEnum import SuggestionStatusEnum
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


## Class used to manipulate wishes.
class SuggestionManager(object):

    @staticmethod
    ## Creates and save a suggestion for a user.
    #   @param text the content of the suggestion.
    #   @param user the user creating the suggestion.
    #   @param suggestionType the enum filed containing the type of the enum.
    def createSuggestion(text, user, suggestionType):
        suggestion = Suggestion()
        suggestion.user = user
        suggestion.text = text
        suggestion.type_id = suggestionType.value
        suggestion.status_id = SuggestionStatusEnum.SUBMITTED.value
        suggestion.save()

    @staticmethod
    ## Change the status of a suggestion.
    #   @param suggestionId the id of the suggestion to change
    #   @param status the new status of the wish true is accepted false is refused.
    #   @param user the user making the request.
    def changeStatusSuggestion(suggestionId, status, user):
        if status:
            newWishStatus = SuggestionStatusEnum.ACCEPTED
        else:
            newWishStatus = SuggestionStatusEnum.REFUSED
        if suggestionId is None:
            raise UserException(ErrorEnum.BAD_REQUEST, user)
        suggestion = Suggestion.objects.get(suggestionId)
        suggestion.status_id = newWishStatus.value
        suggestion.save()
