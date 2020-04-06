from app.models.settings import Suggestion
from app.src.constants.wishStatusEnum import WishStatusEnum
from app.src.utils.errors.errorEnum import ErrorEnum
from app.src.utils.exceptions.userException import UserException


## Class used to manipulate wishes.
class SuggestionManager(object):

    @staticmethod
    ## Creates and save a suggestion for a user.
    #   @param text the content of the suggestion.
    #   @param user the user creating the suggestion.
    def createSuggestion(text, user):
        suggestion = Suggestion()
        suggestion.user = user
        suggestion.text = text
        suggestion.status_id = WishStatusEnum.SUBMITTED.value
        suggestion.save()

    @staticmethod
    ## Change the status of a suggestion.
    #   @param suggestionId the id of the suggestion to change
    #   @param status the new status of the wish true is accepted false is refused.
    #   @param user the user making the request.
    def changeStatusSuggestion(suggestionId, status, user):
        if status:
            newWishStatus = WishStatusEnum.ACCEPTED
        else:
            newWishStatus = WishStatusEnum.REFUSED
        if suggestionId is None:
            raise UserException(ErrorEnum.BAD_REQUEST, user)
        suggestion = Suggestion.objects.get(suggestionId)
        suggestion.status_id = newWishStatus.value
        suggestion.save()
