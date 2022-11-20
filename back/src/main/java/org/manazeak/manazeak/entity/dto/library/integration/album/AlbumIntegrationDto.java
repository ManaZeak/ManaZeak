package org.manazeak.manazeak.entity.dto.library.integration.album;

import lombok.Data;

import java.time.LocalDate;

/**
 * Contains the information needed to insert an album into the database.
 */
@Data
public class AlbumIntegrationDto {

    private Long albumId;

    private String title;

    private Integer totalTrack;

    private String label;

    private String artist;

    private Integer releaseYear;

    private LocalDate releaseDate;

    private String catalogNumber;

    private String eanUpn;

    private Double duration;

    private Integer diskTotal;

    private String recordingLocation;
    private LocalDate startRecordingDate;
    private LocalDate endRecordingDate;
    private Long compilationTypeId;
    private String location;

}
