package org.manazeak.manazeak.daos.library.integration.artist;

import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Allows to integrate new artist association in the database.
 */
public class IntegrationTrackAssociationSetter implements BatchPreparedStatementSetter {

    private final List<Pair<Long, Long>> associationIds;


    public IntegrationTrackAssociationSetter(List<Pair<Long, Long>> associationIds) {
        this.associationIds = associationIds;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Setting the data from the artist integration object.
        ps.setLong(1, associationIds.get(i).getFirst());
        ps.setLong(2, associationIds.get(i).getSecond());
    }

    @Override
    public int getBatchSize() {
        return associationIds.size();
    }
}
