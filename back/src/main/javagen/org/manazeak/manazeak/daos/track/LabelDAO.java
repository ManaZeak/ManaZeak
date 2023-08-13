package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.library.integration.label.LabelLinkerProjection;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailGenerationProjection;
import org.manazeak.manazeak.entity.track.Label;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * Data Access Object for Label using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface LabelDAO extends CrudRepository<Label, Long> {

    /**
     * Get a list of labels inside the database corresponding to a list of names.
     *
     * @param labelNames The lists of label name to fetch.
     * @return The label name associated with a label id.
     */
    @Query("select name as labelName, labelId as labelId from Label where name in (:labelNames)")
    List<LabelLinkerProjection> getLabelsByNames(@Param("labelNames") Collection<String> labelNames);

    @Query("""
            select
                labelId as elementId,
                name as name
            from Label
            where labelId > :lastLabelId
            order by labelId
            """)
    List<ThumbnailGenerationProjection> getLabelThumbsGeneration(@Param("lastLabelId") Long lastLabelId, Pageable pageable);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT