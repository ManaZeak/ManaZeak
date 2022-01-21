package org.manazeak.manazeak.manager.cache;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

/**
 * Allows to access the cache.
 */
@Component
public class CacheAccessManager {

    private final CacheManager cacheManager;

    public CacheAccessManager(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    /**
     * Get a long value from the cache.
     *
     * @param cache The cache where the value is.
     * @param key   The key inside the cache.
     * @return The value contained in the cache.
     */
    public Long getLongValue(CacheEnum cache, Object key) {
        Cache.ValueWrapper cacheValue = CacheEnum.getCache(cache, cacheManager).get(key);
        if (cacheValue == null) {
            return null;
        }
        Object cacheObject = cacheValue.get();
        if (cacheObject instanceof String) {
            return Long.parseLong((String) cacheObject);
        } else if (cacheObject instanceof Long) {
            return (Long) cacheObject;
        }
        throw new MzkRuntimeException("Invalid cache type " + cache.name() + ".");
    }

}
