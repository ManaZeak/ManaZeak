import logging

logger = logging.getLogger('django')

class Bench(object):

    def __init__(self, benchName):
        self.benchName = benchName

    ## The default function that will be called.
    def __call__(self, function):
        def bench(*args, **kwargs):
            logger.info('EZ! ' + self.benchName)
            return function(*args, **kwargs)
        return bench
