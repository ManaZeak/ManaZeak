from django.core.cache import cache


## Allows to handle the cache.
class CacheUtils(object):

    @staticmethod
    def disconnectAll():
        # Closing the connection to the cache for avoiding errors.
        cache._cache.disconnect_all()
