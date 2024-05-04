package org.manazeak.manazeak.manager.cache;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

/**
 * Allows accessing the cache.
 */
@Component
@RequiredArgsConstructor
public class CacheAccessManager {

    private final CacheManager cacheManager;

    /**
     * Get a long value from the cache.
     *
     * @param cache The cache where the value is.
     * @param key   The key inside the cache.
     * @return The value contained in the cache.
     */
    public Long getLongValue(CacheEnum cache, Object key) {
        if (key == null) {
            return null;
        }
        Cache.ValueWrapper cacheValue = CacheEnum.getCache(cache, cacheManager).get(key);
        if (cacheValue == null) {
            return null;
        }
        Object cacheObject = cacheValue.get();
        return switch (cacheObject) {
            case null -> null;
            case String stringValue -> Long.parseLong(stringValue);
            case Long longValue -> longValue;
            default -> throw new MzkRuntimeException("Invalid cache type " + cache.name() + ".");
        };
    }

    /**
     * Put into the cache a pair of key value.
     *
     * @param key   The key of the element to add in the cache.
     * @param value The value of the element to add in the cache.
     */
    public void put(CacheEnum cacheEnum, Object key, Object value) {
        Cache cache = CacheEnum.getCache(cacheEnum, cacheManager);
        // Checking that the elements are not null.
        if (key == null || value == null) {
            throw new MzkRuntimeException("The cache shouldn't be passed null values.");
        }
        cache.put(key, value);
    }

}
