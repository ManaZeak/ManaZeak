package org.manazeak.manazeak.daos.playlist;

import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for PlaylistTrack using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface PlaylistTrackDAO extends JpaRepository<PlaylistTrack, Long> {

    void deleteByPlaylist(Playlist playlist);

    Optional<PlaylistTrack> findByPlaylistAndTrack_TrackId(Playlist playlist, Long trackId);

    /**
     * Delete the track from all the playlist of the application.
     *
     * @param trackIds The identifier of the tracks to delete.
     */
    @Modifying
    @Query("""
            delete from PlaylistTrack pt
            where pt.track.trackId in :trackIds
            """)
    void deleteAllPlaylistTracks(List<Long> trackIds);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT