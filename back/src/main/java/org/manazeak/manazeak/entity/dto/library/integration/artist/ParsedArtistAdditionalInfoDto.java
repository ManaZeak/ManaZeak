package org.manazeak.manazeak.entity.dto.library.integration.artist;

import org.manazeak.manazeak.entity.dto.library.integration.bio.BioDto;
import org.manazeak.manazeak.entity.dto.library.integration.testimony.TestimonyDto;

import java.util.List;

/**
 * Represents the JSON file containing the artist additional information.
 */
public record ParsedArtistAdditionalInfoDto(
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
        List<ArtistLink> links,
        List<BioDto> bio,
        List<TestimonyDto> testimony
) {
}
