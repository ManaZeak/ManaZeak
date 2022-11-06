package org.manazeak.manazeak.entity.dto.library.track;

public class TrackInfoDto {

    private String title;

    private Double duration;

    private String artistName;

    public TrackInfoDto(String title, Double duration, String artistName) {
        this.title = title;
        this.duration = duration;
        this.artistName = artistName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }
}
