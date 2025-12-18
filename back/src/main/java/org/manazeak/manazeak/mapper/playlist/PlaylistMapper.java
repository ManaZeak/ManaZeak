package org.manazeak.manazeak.mapper.playlist;

import org.manazeak.manazeak.entity.dto.library.genre.GenreMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistEditDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistInfoDto;
import org.manazeak.manazeak.entity.playlist.Playlist;
import org.manazeak.manazeak.entity.security.MzkUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
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
    @Mapping(target = "isPublicEditable", source = "playlistCreation.publicEditable")
    @Mapping(target = "playlistId", ignore = true)
    @Mapping(target = "imagePath", source = "playlistCreation.image")
    @Mapping(target = "isPublic", expression = "java(!playlistCreation.isPrivate())")
    @Mapping(target = "creator", source = "user")
    @Mapping(target = "creationDate", expression = "java(LocalDateTime.now())")
    @Mapping(target = "name", source = "playlistCreation.name")
    @Mapping(target = "appendTrack", expression = "java(!playlistCreation.isAddItemAtStartRank())")
    public abstract Playlist buildPlaylist(MzkUser user, PlaylistCreationDto playlistCreation);

    @Mapping(target = "playlistId", source = "originPlaylist.playlistId")
    @Mapping(target = "name", source = "playlistEdit.name")
    @Mapping(target = "description", source = "playlistEdit.description")
    @Mapping(target = "isPublic", expression = "java(!playlistEdit.isPrivate())")
    @Mapping(target = "isPublicEditable", source = "playlistEdit.publicEditable")
    @Mapping(target = "appendTrack", expression = "java(!playlistEdit.isAddItemAtStartRank())")
    public abstract Playlist buildPlaylist(Playlist originPlaylist, PlaylistEditDto playlistEdit);

    @Mapping(target = "private", expression = "java(!playlist.getIsPublic())")
    @Mapping(target = "addItemAtStartRank", expression = "java(!playlist.getAppendTrack())")
    @Mapping(target = "publicEditable", source = "isPublicEditable")
    @Mapping(target = "image", ignore = true)
    public abstract PlaylistEditDto buildPlaylistEdit(Playlist playlist);

    public abstract PlaylistAsideDto buildPlaylistAside(Playlist playlist);

    @Mapping(target = "genres", source = "genresInPlaylist")
    @Mapping(target = "userCreator", source = "playlist.creator.name")
    @Mapping(target = "playlistName", source = "playlist.name")
    @Mapping(target = "playlistDescription", source = "playlist.description")
    @Mapping(target = "created", source = "playlist.creationDate")
    public abstract PlaylistInfoDto buildPlaylistInfo(Playlist playlist, int nbTracks,
                                                      List<GenreMinimalInfoDto> genresInPlaylist);

    /**
     * Build an identifier for the playlist picture if there is one.
     *
     * @param file The file provided by the user.
     * @return The identifier of the library image.
     */
    protected String buildPlaylistImagePath(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        return UUID.randomUUID().toString();
    }

}
