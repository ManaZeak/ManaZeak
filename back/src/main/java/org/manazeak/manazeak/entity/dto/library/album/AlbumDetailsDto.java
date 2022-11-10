package org.manazeak.manazeak.entity.dto.library.album;

import org.manazeak.manazeak.entity.dto.library.track.MinimalTrackInfoDto;

import java.time.LocalDate;
import java.util.List;

/**
 * Contains the information need to display the album detail page.
 */
public class AlbumDetailsDto {

    private Long albumId;

    private String title;

    private String cover;

    private Integer totalTrack;

    private Long albumArtistId;

    private String albumArtist;

    private String albumArtistPicture;

    private LocalDate releaseDate;

    private Long labelId;

    private String labelName;

    private Double duration;

    private String catalogNumber;

    private String eanUpn;

    private LocalDate startingRecordingDate;

    private LocalDate endRecordingDate;

    private List<MinimalTrackInfoDto> tracks;

    public AlbumDetailsDto(Long albumId, String title, String cover, Integer totalTrack, Long albumArtistId, String albumArtist,
                           String albumArtistPicture, LocalDate releaseDate, Long labelId, String labelName, Double duration, String catalogNumber,
                           String eanUpn, LocalDate startingRecordingDate, LocalDate endRecordingDate) {
        this.albumId = albumId;
        this.title = title;
        this.cover = cover;
        this.totalTrack = totalTrack;
        this.albumArtistId = albumArtistId;
        this.albumArtist = albumArtist;
        this.albumArtistPicture = albumArtistPicture;
        this.releaseDate = releaseDate;
        this.labelId = labelId;
        this.labelName = labelName;
        this.duration = duration;
        this.catalogNumber = catalogNumber;
        this.eanUpn = eanUpn;
        this.startingRecordingDate = startingRecordingDate;
        this.endRecordingDate = endRecordingDate;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public Integer getTotalTrack() {
        return totalTrack;
    }

    public void setTotalTrack(Integer totalTrack) {
        this.totalTrack = totalTrack;
    }

    public Long getAlbumArtistId() {
        return albumArtistId;
    }

    public void setAlbumArtistId(Long albumArtistId) {
        this.albumArtistId = albumArtistId;
    }

    public String getAlbumArtist() {
        return albumArtist;
    }

    public void setAlbumArtist(String albumArtist) {
        this.albumArtist = albumArtist;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public String getCatalogNumber() {
        return catalogNumber;
    }

    public void setCatalogNumber(String catalogNumber) {
        this.catalogNumber = catalogNumber;
    }

    public String getEanUpn() {
        return eanUpn;
    }

    public void setEanUpn(String eanUpn) {
        this.eanUpn = eanUpn;
    }

    public LocalDate getStartingRecordingDate() {
        return startingRecordingDate;
    }

    public void setStartingRecordingDate(LocalDate startingRecordingDate) {
        this.startingRecordingDate = startingRecordingDate;
    }

    public LocalDate getEndRecordingDate() {
        return endRecordingDate;
    }

    public void setEndRecordingDate(LocalDate endRecordingDate) {
        this.endRecordingDate = endRecordingDate;
    }

    public List<MinimalTrackInfoDto> getTracks() {
        return tracks;
    }

    public void setTracks(List<MinimalTrackInfoDto> tracks) {
        this.tracks = tracks;
    }

    public String getAlbumArtistPicture() {
        return albumArtistPicture;
    }

    public void setAlbumArtistPicture(String albumArtistPicture) {
        this.albumArtistPicture = albumArtistPicture;
    }
}
