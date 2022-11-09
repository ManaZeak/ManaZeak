package org.manazeak.manazeak.manager.library.random;

import org.manazeak.manazeak.entity.dto.library.integration.random.RandomMinMaxProjection;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public abstract class AbstractRandomManager<T> {

    protected abstract RandomMinMaxProjection getMinMaxIndex();

    public List<T> getRandomElements(int numberOfElements) {
        // Getting the random values.
        List<Long> indexValues = getRandomIndexValues(numberOfElements);

        // Getting the values in the database.
        return getElementByIndexes(indexValues);
    }

    protected abstract List<T> getElementByIndexes(List<Long> indexValues);

    /**
     * Get X random values.
     *
     * @param numberRandomValues The number of elements to return.
     * @return The list of elements randomly generated.
     */
    protected List<Long> getRandomIndexValues(int numberRandomValues) {
        // Get the min value and the max value of the random.
        RandomMinMaxProjection randomMinMaxProjection = getMinMaxIndex();

        // Getting the random values.
        List<Long> randomValues = new ArrayList<>();
        for (int i = 0; i < numberRandomValues; ++i) {
            randomValues.add(ThreadLocalRandom.current().nextLong(randomMinMaxProjection.getMinIndex(), randomMinMaxProjection.getMaxIndex() + 1L));
        }

        return randomValues;
    }

}
