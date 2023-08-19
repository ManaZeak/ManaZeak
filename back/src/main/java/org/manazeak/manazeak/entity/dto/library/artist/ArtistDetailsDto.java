package org.manazeak.manazeak.entity.dto.library.artist;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information displayed in the artist detail view.
 */
@Data
@AllArgsConstructor
public class ArtistDetailsDto {

    private final List<ArtistMinimalInfoDto> members = new ArrayList<>();
    private final List<String> links = new ArrayList<>();
    private Long artistId;
    private String name;
    private String location;
    private Integer birthDate;
    private Integer deathDate;
    private Boolean isLabel;
    private String countryCode;
    private Long labelId;
    private String label;
    private String cover;

    public void addMember(ArtistMinimalInfoDto member) {
        members.add(member);
    }
}
