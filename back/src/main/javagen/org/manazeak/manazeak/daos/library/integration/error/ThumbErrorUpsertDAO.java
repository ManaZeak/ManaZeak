package org.manazeak.manazeak.daos.library.integration.error;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.thumbnail.ThumbnailTypeEnum;
import org.manazeak.manazeak.entity.dto.library.integration.thumbnail.ThumbnailErrorDto;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

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

    public void mergeThumbError(List<ThumbnailErrorDto> thumbErrors) {
        if (thumbErrors.isEmpty()) {
            return;
        }
        jdbcTemplate.batchUpdate(MERGE_THUMBNAIL_ERROR, new ThumbErrorUpsertSetter(thumbErrors));
    }


    private record ThumbErrorUpsertSetter(List<ThumbnailErrorDto> thumbErrors) implements BatchPreparedStatementSetter {

        @Override
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            ThumbnailErrorDto error = thumbErrors.get(i);
            ps.setString(1, error.error());
            setEntityId(ThumbnailTypeEnum.LABEL, 2, ps, error);
            setEntityId(ThumbnailTypeEnum.ALBUM, 3, ps, error);
            setEntityId(ThumbnailTypeEnum.GENRE, 4, ps, error);
            setEntityId(ThumbnailTypeEnum.ARTIST, 5, ps, error);
            ps.setLong(6, error.errorType().getId());
        }

        @Override
        public int getBatchSize() {
            return thumbErrors.size();
        }

        /**
         * Set the value of the entity if the error on the element is the expected one, else set a null value.
         *
         * @param evaluatedType The type that is evaluated.
         * @param index         The index to place the value in the prepared statement.
         * @param ps            The prepared statement.
         * @throws SQLException Error while setting the values.
         */
        private static void setEntityId(ThumbnailTypeEnum evaluatedType, int index, PreparedStatement ps, ThumbnailErrorDto error) throws SQLException {
            if (evaluatedType == error.type()) {
                ps.setLong(index, error.entityId());
            } else {
                ps.setNull(index, Types.BIGINT);
            }
        }
    }

}
