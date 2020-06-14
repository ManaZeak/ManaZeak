from random import sample


## Util class for checking intervals and getting random numbers.
class RandomGetterHelper(object):

    @staticmethod
    ## Get a table of random id from the table
    def getRandomIds(minMaxObject, numberToGet):
        minId = minMaxObject['hashIndex__min']
        maxId = minMaxObject['hashIndex__max']
        # If the table is empty return nothing.
        if minId is None or maxId is None:
            return []
        # If the number is too big, we reduce it.
        if numberToGet > ((maxId+1) - minId):
            numberToGet = ((maxId+1) - minId)
        # Returns the table of selected ids.
        return sample(range(minId, maxId+1), numberToGet)

