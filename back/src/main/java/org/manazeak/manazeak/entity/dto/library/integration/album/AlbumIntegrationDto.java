package org.manazeak.manazeak.entity.dto.library.integration.album;

import java.time.LocalDate;

/**
 * Contains the information needed to insert an album into the database.
 */
public class AlbumIntegrationDto {

    private Long albumId;

    private String title;

    private Integer totalTrack;

    private Integer releaseYear;

    private LocalDate releaseDate;

    private String catalogNumber;

    private String eanUpn;

    private Double duration;

    private Integer diskTotal;

    private String recordingLocation;
    private LocalDate startRecordingDate;
    private LocalDate endRecordingDate;

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTotalTrack() {
        return totalTrack;
    }

    public void setTotalTrack(Integer totalTrack) {
        this.totalTrack = totalTrack;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getCatalogNumber() {
        return catalogNumber;
    }

    public void setCatalogNumber(String catalogNumber) {
        this.catalogNumber = catalogNumber;
    }

    public String getEanUpn() {
        return eanUpn;
    }

    public void setEanUpn(String eanUpn) {
        this.eanUpn = eanUpn;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Integer getDiskTotal() {
        return diskTotal;
    }

    public void setDiskTotal(Integer diskTotal) {
        this.diskTotal = diskTotal;
    }

    public LocalDate getStartRecordingDate() {
        return startRecordingDate;
    }

    public void setStartRecordingDate(LocalDate startRecordingDate) {
        this.startRecordingDate = startRecordingDate;
    }

    public LocalDate getEndRecordingDate() {
        return endRecordingDate;
    }

    public void setEndRecordingDate(LocalDate endRecordingDate) {
        this.endRecordingDate = endRecordingDate;
    }

    public String getRecordingLocation() {
        return recordingLocation;
    }

    public void setRecordingLocation(String recordingLocation) {
        this.recordingLocation = recordingLocation;
    }
}
