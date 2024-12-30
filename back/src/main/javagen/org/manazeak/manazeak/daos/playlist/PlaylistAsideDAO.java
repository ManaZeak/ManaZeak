package org.manazeak.manazeak.daos.playlist;

import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.playlist.PlaylistAside;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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
                pl.id,
                pl.name,
                pl.imagePath
            ) from PlaylistAside p
            join p.playlist pl
            where p.mzkUser = :mzkUser
            order by p.rank asc
            """)
    List<PlaylistAsideDto> getPlaylistByUser(MzkUser mzkUser);

}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT