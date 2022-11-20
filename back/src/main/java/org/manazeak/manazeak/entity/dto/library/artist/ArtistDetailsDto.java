package org.manazeak.manazeak.entity.dto.library.artist;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information displayed in the artist detail view.
 */
@Data
@AllArgsConstructor
public class ArtistDetailsDto {

    private final List<ArtistMinimalInfoDto> members = new ArrayList<>();
    private Long artistId;
    private String name;
    private String location;
    private LocalDate birthDate;
    private LocalDate deathDate;
    private Boolean isLabel;
    private String testimonyFrom;
    private String testimonyText;
    private String countryCode;
    private Long labelId;
    private String label;
    private String cover;
    private final List<String> links = new ArrayList<>();
    private String bio;

    public void addMember(ArtistMinimalInfoDto member) {
        members.add(member);
    }
}
