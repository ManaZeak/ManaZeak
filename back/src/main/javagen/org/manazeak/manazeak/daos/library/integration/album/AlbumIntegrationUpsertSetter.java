package org.manazeak.manazeak.daos.library.integration.album;

import org.manazeak.manazeak.constant.cache.CacheEnum;
import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.util.DateUtil;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * Setter for the batch update or insert of the albums.
 */
public class AlbumIntegrationUpsertSetter implements BatchPreparedStatementSetter {

    // The list of elements to integrate into the database.
    private final List<AlbumIntegrationDto> albums;

    // The cache access object, used to get the data contained in the cache for getting the PKs of the linked objects.
    private final CacheAccessManager cacheAccessManager;

    public AlbumIntegrationUpsertSetter(List<AlbumIntegrationDto> albums, CacheAccessManager cacheAccessManager) {
        this.albums = albums;
        this.cacheAccessManager = cacheAccessManager;
    }

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        // Getting the current album for simplificating the expressions.
        AlbumIntegrationDto currentAlbum = albums.get(i);

        // Setting the data on the prepared statement.
        ps.setLong(1, currentAlbum.getAlbumId());
        ps.setString(2, currentAlbum.getTitle());
        ps.setInt(3, currentAlbum.getTotalTrack());
        ps.setInt(4, currentAlbum.getReleaseYear());
        ps.setTimestamp(5, DateUtil.getTimeStamp(currentAlbum.getReleaseDate()));
        ps.setString(6, currentAlbum.getCatalogNumber());
        ps.setString(7, currentAlbum.getEanUpn());
        ps.setDouble(8, currentAlbum.getDuration());
        ps.setInt(9, currentAlbum.getDiskTotal());
        ps.setLong(10, currentAlbum.getCompilationTypeId());
        ps.setLong(11, cacheAccessManager.getLongValue(CacheEnum.LABEL_ID_BY_NAME, currentAlbum.getLabel()));
        ps.setLong(12, cacheAccessManager.getLongValue(CacheEnum.ARTIST_ID_BY_NAME, currentAlbum.getArtist()));
        ps.setTimestamp(13, DateUtil.getTimeStamp(currentAlbum.getStartRecordingDate()));
        ps.setTimestamp(14, DateUtil.getTimeStamp(currentAlbum.getEndRecordingDate()));
        ps.setString(15, currentAlbum.getLocation());
    }

    @Override
    public int getBatchSize() {
        return albums.size();
    }
}
