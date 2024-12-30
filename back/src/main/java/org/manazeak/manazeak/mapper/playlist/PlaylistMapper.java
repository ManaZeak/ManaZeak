package org.manazeak.manazeak.mapper.playlist;

import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Allow mapping playlist objects.
 */
@Mapper(
        imports = {
                LocalDateTime.class
        }
)
public abstract class PlaylistMapper {

    /**
     * Build a playlist from the provided information.
     *
     * @param user             The user creating the playlist.
     * @param playlistCreation The information about the playlist.
     * @return The playlist to be saved in the database.
     */
    @Mapping(target = "playlistId", ignore = true)
    @Mapping(target = "imagePath", source = "playlistCreation.image")
    @Mapping(target = "isPublic", expression = "java(!playlistCreation.isPrivate())")
    @Mapping(target = "creator", source = "user")
    @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())")
    @Mapping(target = "name", source = "playlistCreation.name")
    @Mapping(target = "appendTrack", expression = "java(!playlistCreation.addItemAtStartRank())")
    public abstract Playlist buildPlaylist(MzkUser user, PlaylistCreationDto playlistCreation);

    public abstract PlaylistAsideDto buildPlaylistAside(Playlist playlist);

    /**
     * Build an identifier for the playlist picture if there is one.
     *
     * @param file The file provided by the user.
     * @return The identifier of the library image.
     */
    protected String buildPlaylistImagePath(MultipartFile file) {
        if (file == null) {
            return null;
        }

        return UUID.randomUUID().toString();
    }

}
