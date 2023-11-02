package org.manazeak.manazeak.entity.dto.library.integration.artist;

import org.json.JSONObject;

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
        JSONObject bio,
        JSONObject testimony
) {
}
