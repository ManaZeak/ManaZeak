package org.manazeak.manazeak.daos.library.integration.cover;

import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class ThumbNameUpdaterSetter implements BatchPreparedStatementSetter {

    final List<Pair<Long, String>> elements;

    public ThumbNameUpdaterSetter(List<Pair<Long, String>> elements) {
        this.elements = elements;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Setting the thumb name
        ps.setString(1, elements.get(i).getSecond());
        // Setting the artist id
        ps.setLong(2, elements.get(i).getFirst());
    }


    @Override
    public int getBatchSize() {
        return elements.size();
    }

}
