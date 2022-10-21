package org.manazeak.manazeak.daos.library.integration.album;

import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Allows to set the parameters on the request to update the album cover in the database.
 */
public class AlbumCoverSetter implements BatchPreparedStatementSetter {

    private final List<Pair<Long, Long>> albumCovers;

    public AlbumCoverSetter(List<Pair<Long, Long>> albumCovers) {
        this.albumCovers = albumCovers;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        ps.setLong(1, albumCovers.get(i).getFirst());
        ps.setLong(2, albumCovers.get(i).getSecond());
    }

    @Override
    public int getBatchSize() {
        return albumCovers.size();
    }
}
