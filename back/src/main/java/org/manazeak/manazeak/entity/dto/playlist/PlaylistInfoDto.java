package org.manazeak.manazeak.entity.dto.playlist;

import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Contains the information about a playlist.
 */
public record PlaylistInfoDto(
        Long playlistId,
        String playlistName,
        String playlistDescription,
        boolean isPublic,
        boolean isPublicEditable,
        boolean appendTrack,
        String imagePath,
        String userCreator,
        LocalDateTime created,
        int nbTracks,
        List<GenreMinimalInfoDto> genres) {
}
