package org.manazeak.manazeak.daos.playlist;

import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.playlist.PlaylistTrack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Data Access Object for PlaylistTrack using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface PlaylistTrackDAO extends JpaRepository<PlaylistTrack, Long> {

    void deleteByPlaylist(Playlist playlist);

    Optional<PlaylistTrack> findByPlaylistAndTrack_TrackId(Playlist playlist, Long trackId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT