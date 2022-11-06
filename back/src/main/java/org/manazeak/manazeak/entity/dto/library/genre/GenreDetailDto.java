package org.manazeak.manazeak.entity.dto.library.genre;

import org.manazeak.manazeak.entity.dto.library.track.TrackInfoDto;

import java.util.List;

/**
 * Contains the details of a genre of the application.
 */
public class GenreDetailDto {

    private String genreName;

    private String cover;

    private List<TrackInfoDto> tracks;

    public GenreDetailDto(String genreName, String cover) {
        this.genreName = genreName;
        this.cover = cover;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public List<TrackInfoDto> getTracks() {
        return tracks;
    }

    public void setTracks(List<TrackInfoDto> tracks) {
        this.tracks = tracks;
    }
}
