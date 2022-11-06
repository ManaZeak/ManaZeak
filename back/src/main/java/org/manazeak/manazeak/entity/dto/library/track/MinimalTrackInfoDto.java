package org.manazeak.manazeak.entity.dto.library.track;

/**
 * Contains the minimal amount of information needed to display a track.
 */
public class MinimalTrackInfoDto {

    private Long trackId;

    private String title;

    private Double duration;

    public MinimalTrackInfoDto(Long trackId, String title, Double duration) {
        this.trackId = trackId;
        this.title = title;
        this.duration = duration;
    }

    public Long getTrackId() {
        return trackId;
    }

    public void setTrackId(Long trackId) {
        this.trackId = trackId;
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
}
