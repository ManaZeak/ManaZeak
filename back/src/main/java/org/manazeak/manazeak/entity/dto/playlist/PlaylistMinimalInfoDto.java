package org.manazeak.manazeak.entity.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.manazeak.manazeak.constant.file.ResourcePathEnum;

/**
 * Minimal information to display a playlist.
 */
@Data
@AllArgsConstructor
public class PlaylistMinimalInfoDto {

    private long playlistId;

    private String name;

    private String imagePath;

    private String creator;

    private long nbTracks;

    public String getImagePath() {
        if (imagePath == null) {
            return null;
        }
        return ResourcePathEnum.PLAYLIST_IMAGE_FOLDER.getPath().resolve(imagePath).toString();
    }

}
