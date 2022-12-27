package org.manazeak.manazeak.manager.library.random.label;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.random.RandomLabelDAO;
import org.manazeak.manazeak.entity.dto.library.label.LabelMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.random.RandomMinMaxProjection;
import org.manazeak.manazeak.manager.library.random.AbstractRandomManager;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

/**
 * Allows to get the random labels in the database.
 */
@Component
@RequiredArgsConstructor
public class RandomLabelManager extends AbstractRandomManager<LabelMinimalInfoDto> {

    private final RandomLabelDAO randomLabelDAO;

    @Override
    protected RandomMinMaxProjection getMinMaxIndex() {
        return randomLabelDAO.getRandomReleaseGenreMinMax();
    }

    @Override
    protected List<LabelMinimalInfoDto> getElementByIndexes(Set<Long> indexValues) {
        return randomLabelDAO.getListMinimalInfoByIndexes(indexValues);
    }
}
