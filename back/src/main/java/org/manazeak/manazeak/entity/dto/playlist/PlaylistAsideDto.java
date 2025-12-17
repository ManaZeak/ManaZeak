package org.manazeak.manazeak.entity.dto.playlist;

import org.manazeak.manazeak.constant.file.ResourcePathEnum;

/**
 * Contains the information about the available playlist for a user.
 *
 * @param playlistId The identifier of the playlist.
 * @param name       The name of the playlist.
 * @param imagePath  The image path if there is an image associated with this playlist.
 */
public record PlaylistAsideDto(
        Long playlistId,
        String name,
        String imagePath) {

    @Override
    public String imagePath() {
        if (imagePath == null) {
            return null;
        }
        return ResourcePathEnum.PLAYLIST_IMAGE_FOLDER.getPath().resolve(imagePath).toString();
    }

}
