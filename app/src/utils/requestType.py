from enum import unique, Enum


@unique
## The enumeration containing all the information about the errors.
class RequestMethodEnum(Enum):
    ## The GET method
    GET = 'GET'
    ## The POST method
    POST = 'POST'
