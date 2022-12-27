package org.manazeak.manazeak.entity.dto.library.artist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Contains the minimal information of an artist.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistMinimalInfoDto implements Comparable<ArtistMinimalInfoDto> {

    private Long id;

    private String name;

    private String cover;

    private boolean isLabel;

    public ArtistMinimalInfoDto(String name, boolean isLabel) {
        this.name = name;
        this.isLabel = isLabel;
    }

    @Override
    public int compareTo(ArtistMinimalInfoDto artistMinimalInfoDto) {
        return name.compareTo(artistMinimalInfoDto.name);
    }
}

