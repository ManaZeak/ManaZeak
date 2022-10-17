package org.manazeak.manazeak.daos.library.integration.track;

import org.manazeak.manazeak.entity.dto.library.integration.track.TrackIntegrationDto;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class TrackIntegrationUpsertSetter implements BatchPreparedStatementSetter {


    private final List<TrackIntegrationDto> tracks;

    public TrackIntegrationUpsertSetter(List<TrackIntegrationDto> tracks) {
        this.tracks = tracks;
    }


    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        TrackIntegrationDto track = tracks.get(i);
        ps.setLong(1, track.getTrackId());
        ps.setString(2, track.getTitle());
        ps.setInt(3, track.getDiscNumber());
        ps.setInt(4, track.getTrackNumber());
        ps.setString(5, track.getIsrc());
        ps.setString(6, track.getLyrics());
        ps.setDouble(7, track.getDuration());
        ps.setString(8, track.getOpus());
        ps.setString(9, track.getSubtitle());
        ps.setLong(10, track.getAlbumId());
        ps.setString(11, track.getLocation());
        ps.setObject(12, track.getBpm());
    }

    @Override
    public int getBatchSize() {
        return tracks.size();
    }
}
