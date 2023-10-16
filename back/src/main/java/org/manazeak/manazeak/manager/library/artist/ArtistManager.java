package org.manazeak.manazeak.manager.library.artist;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.ArtistDAO;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    /**
     * Creates a map with the given artist name if they are present in the database.
     * @param artistNames The name of the artist to fetch in the database.
     * @return The artist name linked to their id.
     */
    public Map<String, Long> getArtistByIdMap(Collection<String> artistNames) {
        Map<String, Long> artistByName = new HashMap<>();

        // Fetching the artists inside the database.
        for (NameIdentifierProjection artist : artistDAO.getArtistByNames(artistNames)) {
            artistByName.put(artist.getName(), artist.getIdentifier());
        }

        return artistByName;
    }

}
