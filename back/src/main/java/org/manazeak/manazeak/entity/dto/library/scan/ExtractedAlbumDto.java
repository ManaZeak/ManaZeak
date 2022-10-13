package org.manazeak.manazeak.entity.dto.library.scan;

import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about an album.
 */
public class ExtractedAlbumDto {

    private final List<ExtractedTrackDto> tracks = new ArrayList<>();
    private final Path location;
    private String title;
    private Integer discTotal;
    private String label;
    private String year;
    private LocalDate releaseDate;
    private Integer trackTotal;
    private Integer compilationCode;
    private double duration = 0D;
    private String eanUpn;
    private String catalogNumber;
    private String recordingLocation;
    private String startRecordingDate;
    private String endRecordingDate;

    public ExtractedAlbumDto(Path location) {
        this.location = location;
    }

    public Path getLocation() {
        return location;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<ExtractedTrackDto> getTracks() {
        return tracks;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDiscTotal() {
        return discTotal;
    }

    public void setDiscTotal(Integer discTotal) {
        this.discTotal = discTotal;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getTrackTotal() {
        return trackTotal;
    }

    public void setTrackTotal(Integer trackTotal) {
        this.trackTotal = trackTotal;
    }

    public void addTrack(ExtractedTrackDto track) {
        tracks.add(track);
        duration += track.getDuration();
    }

    public String getEanUpn() {
        return eanUpn;
    }

    public void setEanUpn(String eanUpn) {
        this.eanUpn = eanUpn;
    }

    public String getCatalogNumber() {
        return catalogNumber;
    }

    public void setCatalogNumber(String catalogNumber) {
        this.catalogNumber = catalogNumber;
    }

    public String getRecordingLocation() {
        return recordingLocation;
    }

    public void setRecordingLocation(String recordingLocation) {
        this.recordingLocation = recordingLocation;
    }

    public String getStartRecordingDate() {
        return startRecordingDate;
    }

    public void setStartRecordingDate(String startRecordingDate) {
        this.startRecordingDate = startRecordingDate;
    }

    public String getEndRecordingDate() {
        return endRecordingDate;
    }

    public void setEndRecordingDate(String endRecordingDate) {
        this.endRecordingDate = endRecordingDate;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public Integer getCompilationCode() {
        return compilationCode;
    }

    public void setCompilationCode(Integer compilationCode) {
        this.compilationCode = compilationCode;
    }
}
