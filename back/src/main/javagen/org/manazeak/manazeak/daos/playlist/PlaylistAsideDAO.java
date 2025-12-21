package org.manazeak.manazeak.daos.playlist;

import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.playlist.PlaylistAside;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for PlaylistAside using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface PlaylistAsideDAO extends JpaRepository<PlaylistAside, Long> {

    int countByMzkUser(MzkUser mzkUser);

    /**
     * Get all the playlist contained in a user aside.
     *
     * @param mzkUser The user requesting the playlist.
     * @return The playlist contained in the aside of the user.
     */
    @Query("""
            select new org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto(
                pl.playlistId,
                pl.name,
                pl.imagePath
            ) from PlaylistAside p
            join p.playlist pl
            where p.mzkUser = :mzkUser
            order by p.rank asc
            """)
    List<PlaylistAsideDto> getPlaylistByUser(MzkUser mzkUser);

    /**
     * Get all the playlist contained in the aside of the user.
     *
     * @param user The user associated with the playlist aside.
     * @return The list of playlists in the aside.
     */
    List<PlaylistAside> getPlaylistAsideByMzkUser(MzkUser user);

    /**
     * Get a playlist aside by the user and the playlist identifier.
     *
     * @param user       The user requesting the playlist aside.
     * @param playlistId The identifier of the playlist.
     * @return The playlist aside if it exists.
     */
    Optional<PlaylistAside> getPlaylistAsideByMzkUserAndPlaylist_PlaylistId(MzkUser user, Long playlistId);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT