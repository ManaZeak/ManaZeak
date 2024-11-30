package org.manazeak.manazeak.daos.playlist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Allows playlist track insert.
 */
@Component
@RequiredArgsConstructor
public class PlaylistInsertDao {

    private static final String INSERT_REQUEST = """
            INSERT INTO playlist_track (
                                        playlist_track_id,
                                        date_added,
                                        rank,
                                        playlist_id,
                                        user_id,
                                        track_id)
            VALUES (
                    nextval(seq_playlist_track),
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
            )
            """;

    private final JdbcTemplate template;

    /**
     * Add tracks to a playlist.
     *
     * @param playlist The information on the playlist.
     * @param trackIds The track identifier to add to the playlist.
     */
    public void addPlaylistTracks(MzkUser user, Playlist playlist, int startOffset, List<Long> trackIds) {
        template.batchUpdate(INSERT_REQUEST, new BatchPreparedStatementSetter() {
            private int currentOffset = startOffset;

            @Override
            public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
                ps.setTimestamp(1, DateUtil.getTimeStamp(LocalDateTime.now()));
                ps.setInt(2, currentOffset);
                ps.setLong(3, playlist.getPlaylistId());
                ps.setLong(4, user.getUserId());
                ps.setLong(5, trackIds.get(i));
                currentOffset++;
            }

            @Override
            public int getBatchSize() {
                return trackIds.size();
            }
        });
    }

}
