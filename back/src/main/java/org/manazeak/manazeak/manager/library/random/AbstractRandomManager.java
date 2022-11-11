package org.manazeak.manazeak.manager.library.random;

import org.manazeak.manazeak.entity.dto.library.integration.random.RandomMinMaxProjection;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;

public abstract class AbstractRandomManager<T> {

    private static Long getRandomValue(RandomMinMaxProjection randomMinMaxProjection) {
        return ThreadLocalRandom.current().nextLong(randomMinMaxProjection.getMinIndex(),
                randomMinMaxProjection.getMaxIndex() + 1L);
    }

    protected abstract RandomMinMaxProjection getMinMaxIndex();

    public List<T> getRandomElements(int numberOfElements) {
        // Getting the random values.
        Set<Long> indexValues = getRandomIndexValues(numberOfElements);

        // Getting the values in the database.
        return getElementByIndexes(indexValues);
    }

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
