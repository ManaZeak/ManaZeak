package org.manazeak.manazeak.constant.cache;

import lombok.Getter;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

/**
 * Contains the information about the cache of the application.
 */
@Getter
public enum CacheEnum {
    /**
     * Contains the artists name linked to their id in the database.
     */
    ARTIST_ID_BY_NAME("artist_id_by_name", String.class, Long.class, true),
    /**
     * Contains the album title linked to their id in the database.
     */
    ALBUM_ID_BY_LOCATION("album_id_by_title", String.class, Long.class, true),
    /**
     * Contains the label name linked to their id in the database.
     */
    LABEL_ID_BY_NAME("label_id_by_name", String.class, Long.class, true),
    /**
     * Contains the genre name linked to their id in the database.
     */
    GENRE_ID_BY_NAME("genre_id_by_name", String.class, Long.class, true),
    /**
     * Contains the recording location of an album linked to their id in the database.
     */
    RECORDING_LOCATION_ID_BY_NAME("recording_location_id_by_name", String.class, Long.class, true),
    /**
     * Contains the keys names linked to their id in the reference table of the database.
     */
    KEY_ID_BY_NAME("key_id_by_name", String.class, Long.class, true, 100),
    /**
     * Contains the all artist view results.
     */
    ALL_ARTISTS_VIEW("all_artists_view", String.class, ArtistMinimalInfoDto.class, Duration.of(30, ChronoUnit.MINUTES), 1),
    /**
     * Contains the result of a genre detail.
     */
    DETAIL_GENRE_VIEW("detail_genre_view", String.class, GenreMinimalInfoDto.class, Duration.of(30, ChronoUnit.MINUTES), 500),
    /**
     * Contains the locale of the user by identifier.
     */
    USER_LOCALE("user_locale", Long.class, Locale.class, Duration.of(30, ChronoUnit.MINUTES), 100);


    private static final int UNLIMITED_SIZE = 100000;

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
     * The number of elements contained in the cache.
     */
    private final long capacity;
    /**
     * The duration before the elements contained in the cache are evicted after being written.
     */
    private final Duration expiry;

    CacheEnum(String cacheName, Class<?> keyType, Class<?> valueType, boolean isEternal, long capacity) {
        this.cacheName = cacheName;
        this.keyType = keyType;
        this.valueType = valueType;
        this.isEternal = isEternal;
        this.capacity = capacity;
        this.expiry = null;
    }

    CacheEnum(String cacheName, Class<?> keyType, Class<?> valueType, boolean isEternal) {
        this.cacheName = cacheName;
        this.keyType = keyType;
        this.valueType = valueType;
        this.isEternal = isEternal;
        this.capacity = UNLIMITED_SIZE;
        this.expiry = null;
    }

    CacheEnum(String cacheName, Class<?> keyType, Class<?> valueType, Duration expiry, long capacity) {
        this.cacheName = cacheName;
        this.keyType = keyType;
        this.valueType = valueType;
        this.isEternal = false;
        this.expiry = expiry;
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
}
