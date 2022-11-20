package org.manazeak.manazeak.entity.dto.library.genre;

import lombok.Data;

/**
 * Contains the information needed to build the genre detail DTO.
 */
@Data
public class GenreArtistDetailBuilderDto {

    private final Long artistId;

    private final String artistName;

    private final String artistPicture;

    private final Long albumId;

    private final String albumTitle;

    private final String albumCover;

    private final Long trackId;

    private final String trackTitle;

    private final Double trackDuration;

}
