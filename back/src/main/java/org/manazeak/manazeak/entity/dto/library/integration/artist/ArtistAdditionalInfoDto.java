package org.manazeak.manazeak.entity.dto.library.integration.artist;

import java.util.List;

/**
 * Contains the information needed to launch the insertion of an artist into the database.
 */
public record ArtistAdditionalInfoDto(
        String type,
        String name,
        String realName,
        List<String> alias,
        List<String> originCountry,
        String birth,
        String placeOfBirth,
        String countryOfBirth,
        String death,
        String placeOfDeath,
        String countryOfDeath,
        List<String> yearsActive,
        List<String> members,
        List<String> pastMembers,
        List<ArtistLink> links
) {

    public static ArtistAdditionalInfoDto buildFromParsed(ParsedArtistAdditionalInfoDto parsed) {
        return new ArtistAdditionalInfoDto(
                parsed.type(),
                parsed.name(),
                parsed.realName(),
                parsed.alias(),
                parsed.originCountry(),
                parsed.birth(),
                parsed.placeOfBirth(),
                parsed.countryOfBirth(),
                parsed.death(),
                parsed.placeOfDeath(),
                parsed.countryOfDeath(),
                parsed.yearsActive(),
                parsed.members(),
                parsed.pastMembers(),
                parsed.links()
        );
    }
}
