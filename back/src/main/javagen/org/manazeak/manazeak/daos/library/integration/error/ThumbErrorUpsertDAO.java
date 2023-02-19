package org.manazeak.manazeak.daos.library.integration.error;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailErrorTypeEnum;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

/**
 * Allows to insert or update a thumbnail error in the database.
 */
@Repository
@RequiredArgsConstructor
public class ThumbErrorUpsertDAO {

    private static final String MERGE_THUMBNAIL_ERROR = """
            INSERT INTO thumbnail_error (thumb_err_id, error, processed, label_id, album_id, genre_id, artist_id, thumb_error_type_id)
            VALUES (nextval('seq_thumbnail_error'), ?, false, ?, ?, ?, ?, ?)
            ON CONFLICT (label_id, album_id, artist_id, genre_id)
            DO UPDATE SET thumb_err_id = excluded.thumb_err_id,
                                      error = thumbnail_error.error,
                                      processed = thumbnail_error.processed,
                                      label_id = thumbnail_error.label_id,
                                      album_id = thumbnail_error.album_id,
                                      genre_id = thumbnail_error.genre_id,
                                      artist_id = thumbnail_error.artist_id,
                                      thumb_error_type_id = thumbnail_error.thumb_error_type_id""";
    private final JdbcTemplate jdbcTemplate;

    public void mergeThumbError(String error, Long entityId, ThumbnailTypeEnum thumbnailType, ThumbnailErrorTypeEnum errorType) {
        jdbcTemplate.update(MERGE_THUMBNAIL_ERROR, new ThumbErrorUpsertSetter(error, entityId, thumbnailType, errorType));
    }

    @RequiredArgsConstructor
    private class ThumbErrorUpsertSetter implements PreparedStatementSetter {

        private final String error;
        private final Long entityId;
        private final ThumbnailTypeEnum thumbType;
        private final ThumbnailErrorTypeEnum errorType;

        @Override
        public void setValues(PreparedStatement ps) throws SQLException {
            ps.setString(1, error);
            setEntityId(ThumbnailTypeEnum.LABEL, 2, ps);
            setEntityId(ThumbnailTypeEnum.ALBUM, 3, ps);
            setEntityId(ThumbnailTypeEnum.GENRE, 4, ps);
            setEntityId(ThumbnailTypeEnum.ARTIST, 5, ps);
            ps.setLong(6, errorType.getId());
        }

        /**
         * Set the value of the entity if the error on the element is the expected one, else set a null value.
         *
         * @param evaluatedType The type that is evaluated.
         * @param index         The index to place the value in the prepared statement.
         * @param ps            The prepared statement.
         * @throws SQLException Error while setting the values.
         */
        private void setEntityId(ThumbnailTypeEnum evaluatedType, int index, PreparedStatement ps) throws SQLException {
            if (evaluatedType == thumbType) {
                ps.setLong(index, entityId);
            } else {
                ps.setNull(index, Types.BIGINT);
            }
        }
    }

}
