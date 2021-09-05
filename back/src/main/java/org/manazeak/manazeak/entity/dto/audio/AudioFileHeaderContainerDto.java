package org.manazeak.manazeak.entity.dto.audio;

/**
 * Contains the information extracted from the file header.
 */
public class AudioFileHeaderContainerDto {

    private long bitrate;

    private int sampleRate;

    private double trackLength;

    private long size;

    public long getBitrate() {
        return bitrate;
    }

    public void setBitrate(long bitrate) {
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
