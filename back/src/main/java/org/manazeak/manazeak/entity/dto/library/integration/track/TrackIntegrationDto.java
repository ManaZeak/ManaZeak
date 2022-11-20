package org.manazeak.manazeak.entity.dto.library.integration.track;

import lombok.Data;

import java.util.Set;

/**
 * Contains all the information need to insert a track into the database.
 */
@Data
public class TrackIntegrationDto {

    private Long trackId;
    private String title;
    private Integer discNumber;
    private Integer trackNumber;
    private String isrc;
    private String lyrics;
    private String location;
    private Double bpm;
    private Double duration;
    private String opus;
    private String subtitle;
    private Long albumId;
    private Set<Long> producerIds;
    private Set<Long> artistIds;
    private Set<Long> composerIds;
    private Set<Long> lyricistIds;
    private Set<Long> performerIds;
    private Set<Long> engineerIds;
    private Set<Long> arrangerIds;
    private Set<Long> genreIds;
    private Set<Long> keyIds;
    private boolean isMp3;

    public void addKeyId(Long keyId) {
        keyIds.add(keyId);
    }
}
