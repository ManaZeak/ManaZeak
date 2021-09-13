package org.manazeak.manazeak.entity.dto.audio;

/**
 * Contains the information extracted from the file header.
 */
public class AudioFileHeaderContainerDto {

    private Integer bitrate;

    private int sampleRate;

    private double trackLength;

    private long size;

    public Integer getBitrate() {
        return bitrate;
    }

    public void setBitrate(Integer bitrate) {
        this.bitrate = bitrate;
    }

    public int getSampleRate() {
        return sampleRate;
    }

    public void setSampleRate(int sampleRate) {
        this.sampleRate = sampleRate;
    }

    public double getTrackLength() {
        return trackLength;
    }

    public void setTrackLength(double trackLength) {
        this.trackLength = trackLength;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
