package org.manazeak.manazeak.util.database;


import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

public final class PreparedStatementSetterHelper {

    private PreparedStatementSetterHelper() {

    }

    /**
     * Set a nullable long in the prepared statement to avoid error.
     *
     * @param ps       The prepared statement to use.
     * @param position The position where to put the element in the prepared statement.
     * @param value    The value of the element.
     * @throws SQLException Error while associating the value to the statement.
     */
    public static void setNullableLong(PreparedStatement ps, int position, Long value) throws SQLException {
        if (value == null) {
            ps.setNull(position, Types.BIGINT);
        } else {
            ps.setLong(position, value);
        }
    }
}
