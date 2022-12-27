package org.manazeak.manazeak.service.library.label;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.dto.library.label.LabelMinimalInfoDto;
import org.manazeak.manazeak.manager.library.random.label.RandomLabelManager;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Allows to manipulate the label in the service.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class LabelService {

    private final RandomLabelManager randomLabelManager;

    /**
     * Get a number of random labels from the database.
     *
     * @param nbLabels The number of labels to get from the database.
     * @return The list of minimal label fetched from the databaes.
     */
    public List<LabelMinimalInfoDto> getSomeRandomLabelsMinimal(int nbLabels) {
        return randomLabelManager.getRandomElements(nbLabels);
    }

}
