package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.Data;

import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about an album.
 */
@Data
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

    public void addTrack(ExtractedTrackDto track) {
        tracks.add(track);
        duration += track.getDuration();
    }
}
