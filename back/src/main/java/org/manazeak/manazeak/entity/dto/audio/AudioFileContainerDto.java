package org.manazeak.manazeak.entity.dto.audio;

import lombok.Data;
import org.jaudiotagger.tag.TagField;

/**
 * Contains the information about a file in the filesystem
 */
@Data
public class AudioFileContainerDto {

    private String fileLocation;
    private TagField cover;
    private String title;
    private String artist;
    private String album;
    private String comment;
    private String date;
    private String trackNumber;
    private String trackTotal;
    private String genre;
    private String albumArtist;
    private String compilation;
    private String composer;
    private String copyright;
    private String lyricists;
    private String engineers;
    private String discNumber;
    private String diskTotal;
    private String country;
    private String lyrics;
    private String releaseDate;
    private String performer;
    private String producer;
    private String label;
    private String eanUpn;
    private String catalogNumber;
    private String arranger;
    private String recordingLocation;
    private String startRecordingDate;
    private String endRecordingDate;
    private String irsc;
    private Double bpm;
    private String opus;
    private String subtitle;
    private String key;
    private AudioFileHeaderContainerDto headers;
}
