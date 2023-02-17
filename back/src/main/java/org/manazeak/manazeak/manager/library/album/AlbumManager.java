package org.manazeak.manazeak.manager.library.album;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.AlbumDAO;
import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Handle the manipulation on the album in the application.
 */
@Component
@RequiredArgsConstructor
public class AlbumManager {

    private final AlbumDAO albumDAO;

    /**
     * Get the list of albums released by a label.
     *
     * @param labelId The identifier of the label.
     * @return The list of albums released by the label.
     */
    public List<AlbumMinimalInfoDto> getLabelAlbums(@NonNull Long labelId) {
        return albumDAO.getMinimalAlbumsByLabelId(labelId);
    }

}
