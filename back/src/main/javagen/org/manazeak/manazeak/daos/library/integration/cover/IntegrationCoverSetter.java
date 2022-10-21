package org.manazeak.manazeak.daos.library.integration.cover;

import org.manazeak.manazeak.entity.track.Cover;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Allows to integrate new artist association in the database.
 */
public class IntegrationCoverSetter implements BatchPreparedStatementSetter {

    private final List<Cover> covers;

    public IntegrationCoverSetter(List<Cover> covers) {
        this.covers = covers;
    }


    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Setting the data from the artist integration object.
        ps.setLong(1, covers.get(i).getCoverId());
        ps.setString(2, covers.get(i).getFilename());
    }

    @Override
    public int getBatchSize() {
        return covers.size();
    }
}
