## This class allows to throw an exception when the user has insufficient permissions
class UserException(Exception):

    ## Initialise the exception
    #   @param errorType a member of the ErrorEnum
    def __init__(self, errorType, user):
        super().__init__(errorType.value)
        self.errorType = errorType
        self.user = user
