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
    private String discTotal;
    private String label;
    private String year;
    private LocalDate releaseDate;
    private Integer trackTotal;

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

    public String getDiscTotal() {
        return discTotal;
    }

    public void setDiscTotal(String discTotal) {
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
    }
}
