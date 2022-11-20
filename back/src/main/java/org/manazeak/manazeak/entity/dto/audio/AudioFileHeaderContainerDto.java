package org.manazeak.manazeak.entity.dto.audio;

import lombok.Data;

/**
 * Contains the information extracted from the file header.
 */
@Data
public class AudioFileHeaderContainerDto {

    private Integer bitrate;

    private int sampleRate;

    private double trackLength;

    private long size;

}
