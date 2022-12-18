package org.manazeak.manazeak.manager.library.track;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.TrackDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.AlbumTrackDbInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.AlbumTrackInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Allows to manipulate the tracks in the application.
 */
@Component
@RequiredArgsConstructor
public class TrackManager {

    private final TrackDAO trackDAO;

    private static ArtistMinimalInfoDto createPerformerFromTrack(AlbumTrackDbInfoDto dbTrack) {
        return new ArtistMinimalInfoDto(dbTrack.performerId(), dbTrack.performerName(), dbTrack.performerPicture(),
                dbTrack.performerIsLabel());
    }

    /**
     * Add the track to the album and set the performers from the track.
     *
     * @param albumDetails The information on the album.
     */
    public void addTrackToAlbumInfo(AlbumDetailsDto albumDetails) {
        List<AlbumTrackDbInfoDto> dbTracks = trackDAO.getMinimalTracksByAlbumId(albumDetails.getAlbumId());
        Long lastTrackId = 0L;
        List<AlbumTrackInfoDto> tracks = new ArrayList<>();
        for (AlbumTrackDbInfoDto dbTrack : dbTracks) {
            // If the track is new, adding it.
            if (!lastTrackId.equals(dbTrack.trackId())) {
                AlbumTrackInfoDto track = new AlbumTrackInfoDto(dbTrack.trackId(), dbTrack.title(), dbTrack.duration(), dbTrack.mood());
                tracks.add(track);
                lastTrackId = track.getTrackId();
            }
            ArtistMinimalInfoDto performer = createPerformerFromTrack(dbTrack);
            // Adding the performer to the tracks.
            tracks.get(tracks.size() - 1).addPerformer(performer);
            albumDetails.addPerformer(performer);
        }
        // Adding the tracks to the album details.
        albumDetails.addTracks(tracks);
    }

    /**
     * Get the list of tracks by genres.
     *
     * @param genreId The id of the genre.
     * @return The list of tracks linked to the genre.
     */
    public List<TrackInfoDto> getTrackInfoByGenreId(Long genreId) {
        return trackDAO.getTrackInfoByGenreId(genreId);
    }

}
