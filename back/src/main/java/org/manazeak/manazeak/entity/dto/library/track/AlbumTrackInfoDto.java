package org.manazeak.manazeak.entity.dto.library.track;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.artist.ArtistMinimalInfoDto;

import java.util.HashSet;
import java.util.Set;

/**
 * Contains the information displayed on the album view.
 */
@Data
public class AlbumTrackInfoDto {
    private final Long trackId;
    private final String title;
    private final Double duration;
    private final String mood;
    private final Set<ArtistMinimalInfoDto> performers = new HashSet<>();

    public void addPerformer(ArtistMinimalInfoDto performer) {
        performers.add(performer);
    }
}
