## This class allows to throw an exception when the user has insufficient permissions
class UnexpectedStateException(Exception):

    ## Initialise the exception
    #   @param errorType a member of the ErrorEnum
    def __init__(self):
        super().__init__('Unexpected application state in the database. Please check your installation')
