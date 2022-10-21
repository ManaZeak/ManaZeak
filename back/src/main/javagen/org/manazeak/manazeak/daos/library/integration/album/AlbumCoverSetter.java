package org.manazeak.manazeak.daos.library.integration.album;

import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class AlbumCoverSetter implements BatchPreparedStatementSetter {

    private final List<Pair<Long, Long>> albumCovers;

    public AlbumCoverSetter(List<Pair<Long, Long>> albumCovers) {
        this.albumCovers = albumCovers;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        //ps.setLong(albumCovers.get(i).);
    }

    @Override
    public int getBatchSize() {
        return 0;
    }
}
