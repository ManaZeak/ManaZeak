package org.manazeak.manazeak.manager.library.integration.cache;

import org.manazeak.manazeak.entity.dto.library.integration.CacheObject;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Contains the shared logic between the loading of the cache before the integration of objects in the database.
 *
 * @param <T> The type of the object that will be return by the database.
 */
public abstract class AbstractIntegrationCacheLoaderManager<T extends CacheObject> {

    /**
     * Add a set of elements ids into the cache with a list of unique names.
     *
     * @param elements The list of elements to add.
     */
    public void addElementsFromDatabaseToCache(Set<String> elements) {
        // Removing the elements that are already in the cache.
        removeEntitiesAlreadyInCache(elements);

        // Getting the objects from the database.
        List<T> dbElements = getObjects(elements);

        // Adding the elements to the cache.
        for (T dbElement : dbElements) {
            getCache().put(dbElement.getKey(), dbElement.getId());
        }
    }

    /**
     * Get the objects that will be inserted into the cache.
     *
     * @return The objects to be inserted.
     */
    protected abstract List<T> getObjects(Set<String> elements);

    /**
     * Get the cache where the data will be added.
     *
     * @return The cache.
     */
    protected abstract Cache getCache();

    /**
     * Remove the elements that are already present in the cache from the set.
     *
     * @param elements The list of element to check.
     */
    private void removeEntitiesAlreadyInCache(Set<String> elements) {
        // The list of the names that will be removed from the set.
        final List<String> removedElements = new ArrayList<>();

        // Checking if the elements are present in the cache.
        for (String element : elements) {
            if (getCache().get(element) != null) {
                removedElements.add(element);
            }
        }

        // Removing the elements for the set.
        removedElements.forEach(elements::remove);
    }

}
