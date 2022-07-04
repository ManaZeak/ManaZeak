package org.manazeak.manazeak.constant.cache;

import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

/**
 * Contains the information about the cache of the application.
 */
public enum CacheEnum {
    /**
     * Contains the artists name linked to their id in the database.
     */
    ARTIST_ID_BY_NAME("artist_id_by_name", String.class, Long.class, true, 100000),
    /**
     * Contains the album title linked to their id in the database.
     */
    ALBUM_ID_BY_TITLE("album_id_by_title", String.class, Long.class, true, 100000);


    /**
     * If the entries of the cache expire after a certain time.
     */
    final boolean isEternal;
    /**
     * The name of the cache.
     */
    private final String cacheName;
    /**
     * The type of the key in the cache.
     */
    private final Class<?> keyType;
    /**
     * The type of the value in the cache.
     */
    private final Class<?> valueType;
    /**
     * The number of element contained in the cache.
     */
    private final long capacity;

    CacheEnum(String cacheName, Class<?> keyType, Class<?> valueType, boolean isEternal, long capacity) {
        this.cacheName = cacheName;
        this.keyType = keyType;
        this.valueType = valueType;
        this.isEternal = isEternal;
        this.capacity = capacity;
    }

    /**
     * Get a cache from the cache manager. The returned cache can't be null.
     *
     * @param cache        The cache that will be fetched.
     * @param cacheManager The cache holder.
     * @return The cache.
     */
    public static Cache getCache(CacheEnum cache, CacheManager cacheManager) {
        Cache fetchedCache = cacheManager.getCache(cache.getCacheName());

        if (fetchedCache == null) {
            throw new MzkRuntimeException("The cache '" + cache.getCacheName() + "' doesn't exist.");
        }

        return fetchedCache;
    }

    /**
     * @return The cache name.
     */
    public String getCacheName() {
        return cacheName;
    }

    /**
     * @return The type of the key of the cache.
     */
    public Class<?> getKeyType() {
        return keyType;
    }

    /**
     * @return The type of the value of the cache.
     */
    public Class<?> getValueType() {
        return valueType;
    }

    /**
     * @return If the cache is eternal.
     */
    public boolean isEternal() {
        return isEternal;
    }

    /**
     * @return The capacity of the cache.
     */
    public long getCapacity() {
        return capacity;
    }
}
