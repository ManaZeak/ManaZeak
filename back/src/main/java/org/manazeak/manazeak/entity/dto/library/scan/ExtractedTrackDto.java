package org.manazeak.manazeak.entity.dto.library.scan;

import lombok.Data;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about the track extracted from the tags.
 */
@Data
public class ExtractedTrackDto {

    private String location;
    private String title;

    private List<String> artists = new ArrayList<>();

    private List<String> performers = new ArrayList<>();

    private List<ExtractedComposerDto> composers = new ArrayList<>();

    private List<String> producers = new ArrayList<>();

    private List<String> lyricists = new ArrayList<>();

    private List<String> engineers = new ArrayList<>();

    private List<String> arrangers = new ArrayList<>();

    private List<String> genres = new ArrayList<>();

    private String year;

    private Integer discNumber;

    private Integer trackNumber;

    private Integer bitrate;

    private int sampleRate;

    private long size;

    private double duration;

    private String lyrics;

    private String irsc;

    private Double bpm;

    private String opus;

    private String subtitle;

    private List<String> keys;

    private boolean isMp3;

    private LocalDateTime modificationDate;

}
