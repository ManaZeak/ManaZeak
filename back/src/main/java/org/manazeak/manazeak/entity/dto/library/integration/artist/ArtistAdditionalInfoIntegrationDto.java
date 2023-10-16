package org.manazeak.manazeak.entity.dto.library.integration.artist;

import lombok.Builder;

@Builder
public class ArtistAdditionalInfoIntegrationDto {

    private final Long type;

    private final Long artistId;

    private final String realName;

    private final Integer birthDate;

    private final String placeOfBirth;

    private final Long birthCountry;

    private final Integer deathDate;

    private final String placeOfDeath;

    private final Long deathCountry;

    private final String yearActive;
}
