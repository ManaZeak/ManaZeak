package org.manazeak.manazeak.manager.library.artist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ArtistManager {

    private final ArtistDAO artistDAO;


    /**
     * Get the list of artists released by a label.
     *
     * @param labelId The id of the label.
     * @return The list of artist released by the label.
     */
    public List<ArtistMinimalInfoDto> getMinimalArtistsFromLabelId(@NonNull Long labelId) {
        return artistDAO.getArtistFromLabelId(labelId);
    }

}
