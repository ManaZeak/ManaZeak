package org.manazeak.manazeak.daos.playlist;

import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Data Access Object for Playlist using Spring JpaRepository interface
 * <p>
 * This file has been automatically generated
 */
public interface PlaylistDAO extends JpaRepository<Playlist, Long> {

    /**
     * Get the playlist for the user.
     *
     * @param user       The user requesting the playlist.
     * @param playlistId The identifier of the playlist.
     * @return The playlist if there is one.
     */
    @Query("""
            select p from Playlist p
            where p.playlistId = :playlistId
            and (p.creator = :user or p.isPublic)
            """)
    Optional<Playlist> getPlaylistByIdentifier(MzkUser user, Long playlistId);

    /**
     * Get all the track already contained in the playlist.
     *
     * @param playlist The identifier of the playlist.
     * @param trackIds The identifier of the tracks to search in the playlist.
     * @return The identifier of the tracks contained in the playlist.
     */
    @Query("""
            select pt.track.id from Playlist p
            join PlaylistTrack pt on pt.playlist = p
            where p = :playlist
            and pt.track.id in :trackIds
            """)
    Set<Long> getTrackContainedInPlaylist(Playlist playlist, Set<Long> trackIds);

    @Query("""
            select count(1) from PlaylistTrack p
            where p.playlist = :playlist
            """)
    int countTrackInPlaylist(Playlist playlist);

    /**
     * Get the genres contained in the playlist.
     *
     * @param user       The user requesting the information.
     * @param playlistId The identifier of the playlist.
     * @return The genre contained in the playlist.
     */
    @Query("""
            select distinct new org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto(
                g.id,
                g.name,
                g.pictureFilename
            ) from PlaylistTrack pt
            join pt.playlist pl
            join pt.track t
            join t.genreList g
            where (pl.creator = :user or pl.isPublic)
            order by g.name
            """)
    List<GenreMinimalInfoDto> getGenresContainedInPlaylist(MzkUser user, Long playlistId);

    @Query("""
            select new org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto(
                trk.trackId,
                trk.title,
                trk.duration,
                trk.isrc,
                trk.bpm,
                trk.mood,
                keys.label,
                keys.keyId,
                perf.artistId,
                perf.name,
                perf.pictureFilename,
                perf.isLabel,
                genre.genreId,
                genre.name,
                genre.pictureFilename,
                comp.artistId,
                comp.name,
                comp.pictureFilename,
                comp.isLabel,
                lyr.artistId,
                lyr.name,
                lyr.pictureFilename,
                lyr.isLabel,
                pro.artistId,
                pro.name,
                pro.pictureFilename,
                pro.isLabel,
                eng.artistId,
                eng.name,
                eng.pictureFilename,
                eng.isLabel
            )
            from Track trk
            join trk.album alb
            left join trk.keyList keys
            left join trk.performerList perf
            left join trk.genreList genre
            left join trk.composerList comp
            left join trk.lyricistList lyr
            left join trk.producerList pro
            left join trk.engineerList eng
            join PlaylistTrack pl on pl.track = trk
            where pl.playlist.id = :playlistId
            order by pl.rank
            """)
    List<TrackCompleteInfoDbDto> getPlaylistTracks(Long playlistId);

    /**
     * Add an offset to all the tracks of a playlist.
     *
     * @param playlist      The playlist to change.
     * @param offsetToApply The offset to apply to all the tracks ranks.
     */
    @Modifying
    @Query("""
            update PlaylistTrack p set rank = rank + :offsetToApply where p.playlist = :playlist
            """)
    void offsetPlaylistTracks(Playlist playlist, int offsetToApply);
}
// STOP GENERATION -> Comment used to prevent generator from generate the file again, DO NOT REMOVE IT