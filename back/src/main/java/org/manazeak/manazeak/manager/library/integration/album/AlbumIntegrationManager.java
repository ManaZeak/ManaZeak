package org.manazeak.manazeak.manager.library.integration.album;

import org.manazeak.manazeak.entity.dto.library.integration.album.AlbumIntegrationDto;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Allows to insert the information contained inside the album into the database.
 */
@Component
public class AlbumIntegrationManager {

    /**
     * Merge all the album into the database.
     *
     * @param albumsByTitle A map containing the albums linked to their title.
     */
    public void mergeAlbumIntoDatabase(Map<String, AlbumIntegrationDto> albumsByTitle) {

    }
}
