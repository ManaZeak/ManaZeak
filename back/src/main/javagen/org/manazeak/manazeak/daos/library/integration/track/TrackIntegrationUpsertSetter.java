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
        ps.setInt(2, track.getDiscNumber());
        ps.setInt(3, track.getTrackNumber());
        ps.setString(4, track.getIsrc());
        ps.setString(5, track.getLyrics());
        ps.setDouble(6, track.getDuration());
        ps.setString(7, track.getOpus());
        ps.setString(8, track.getSubtitle());
        ps.setLong(9, track.getAlbumId());
        ps.setString(10, track.getLocation());
        ps.setDouble(11, track.getBpm());
    }

    @Override
    public int getBatchSize() {
        return tracks.size();
    }
}
