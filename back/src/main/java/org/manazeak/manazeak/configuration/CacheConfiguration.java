package org.manazeak.manazeak.configuration;

import org.cache2k.extra.spring.SpringCache2kCacheManager;
import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure the cache option of the application.
 */
@Configuration
@EnableCaching
public class CacheConfiguration {

    /**
     * Configuring the cache for the spring application.
     *
     * @return The cache manager that will be used in the application.
     */
    @Bean
    public CacheManager cacheManager() {
        // Building a cache with a name for unit tests.
        SpringCache2kCacheManager cacheManager = new SpringCache2kCacheManager("spring-" + hashCode());

        // Configuring the caches.
        configureCaches(cacheManager);

        return cacheManager;
    }

    /**
     * Creates all the caches in the manager from the enum containing all the configuration of the caches.
     *
     * @param cacheManager The manager that will be used in the application to get all caches.
     */
    private static void configureCaches(SpringCache2kCacheManager cacheManager) {
        for (CacheEnum cache : CacheEnum.values()) {
            // Adding a new cache into the manager.
            cacheManager.addCaches(builder -> {
                // Configuring the cache with the enum.
                builder.name(cache.getCacheName());
                builder.keyType(cache.getKeyType());
                builder.valueType(cache.getValueType());
                builder.eternal(cache.isEternal());
                builder.entryCapacity(cache.getCapacity());

                return builder;
            });
        }
    }
}
