package org.manazeak.manazeak.manager.library.random;

import org.manazeak.manazeak.entity.dto.library.integration.random.RandomMinMaxProjection;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Contains the basic methods used to get elements from the random table.
 *
 * @param <T> The type of the returned elements.
 */
public abstract class AbstractRandomManager<T> {

    /**
     * Get a random value within the given interval.
     *
     * @param randomMinMaxProjection Contains the max and min value for the random.
     * @return A random value within the random interval.
     */
    private static Long getRandomValue(RandomMinMaxProjection randomMinMaxProjection) {
        return ThreadLocalRandom.current().nextLong(randomMinMaxProjection.getMinIndex(),
                randomMinMaxProjection.getMaxIndex() + 1L);
    }


    /**
     * Get a random list of element in the database.
     *
     * @param numberOfElements The number of element to fetch from the database.
     * @return The list of element found in the database.
     */
    public List<T> getRandomElements(int numberOfElements) {
        // Getting the random values.
        Set<Long> indexValues = getRandomIndexValues(numberOfElements);

        // Getting the values in the database.
        return getElementByIndexes(indexValues);
    }


    /**
     * @return Get the maximal and the minimal value into the random table.
     */
    protected abstract RandomMinMaxProjection getMinMaxIndex();

    /**
     * Get the element in the random table by their random_index.
     *
     * @param indexValues The set containing the indexes to fecth.
     * @return The element gecthed from the database with the random_index.
     */
    protected abstract List<T> getElementByIndexes(Set<Long> indexValues);

    /**
     * Get X random values.
     *
     * @param numberRandomValues The number of elements to return.
     * @return The list of elements randomly generated.
     */
    protected Set<Long> getRandomIndexValues(int numberRandomValues) {
        // Get the min value and the max value of the random.
        RandomMinMaxProjection randomMinMaxProjection = getMinMaxIndex();

        // Checking if we can get the number of values asked.
        final int dbMaxNumberValue;
        if (numberRandomValues > randomMinMaxProjection.getMaxIndex() - getMinMaxIndex().getMinIndex()) {
            dbMaxNumberValue = (int) (randomMinMaxProjection.getMaxIndex() - getMinMaxIndex().getMinIndex());
        } else {
            dbMaxNumberValue = numberRandomValues;
        }

        // Getting the random values.
        Set<Long> randomValues = new HashSet<>();
        for (int i = 0; i < dbMaxNumberValue; ++i) {
            Long randomValue = getRandomValue(randomMinMaxProjection);
            // Trying to get another value until we find one we doesn't have.
            while (randomValues.contains(randomValue)) {
                randomValue = getRandomValue(randomMinMaxProjection);
            }

            randomValues.add(randomValue);
        }

        return randomValues;
    }

}
