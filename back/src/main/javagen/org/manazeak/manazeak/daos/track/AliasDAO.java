package org.manazeak.manazeak.daos.track;

import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.manazeak.manazeak.entity.track.Alias;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

/**
 * Data Access Object for Alias using Spring CrudRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface AliasDAO extends CrudRepository<Alias, Long> {

    /**
     * Get all the aliases by names.
     *
     * @param names The name of the aliases to filter.
     * @return The aliases with their id.
     */
    @Query("""
                select
                    aliasId as identifier,
                    value as name
                from Alias
                where value in :names
            """)
    List<NameIdentifierProjection> getAliasIdAndNameByName(@Param("names") Collection<String> names);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT