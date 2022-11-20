package org.manazeak.manazeak.entity.dto.library.integration.artist;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about an artist before the database integration.
 */
@Data
@NoArgsConstructor
public class ArtistIntegrationDto {

    private Long id;

    private String name;

    private String location;

    private boolean isLabel;

    private LocalDateTime modificationDate;

    private final List<String> subArtists = new ArrayList<>();

    private Long labelId;

    public void addSubArtists(List<String> newSubArtists) {
        subArtists.addAll(newSubArtists);
    }
}
