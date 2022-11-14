package org.manazeak.manazeak.entity.dto.library.integration.track;

import java.util.Set;

/**
 * Contains all the information need to insert a track into the database.
 */
public class TrackIntegrationDto {

    private Long trackId;
    private String title;
    private Integer discNumber;
    private Integer trackNumber;
    private String isrc;
    private String lyrics;
    private String location;
    private Double bpm;
    private Double duration;
    private String opus;
    private String subtitle;
    private Long albumId;
    private Set<Long> producerIds;
    private Set<Long> artistIds;
    private Set<Long> composerIds;
    private Set<Long> lyricistIds;
    private Set<Long> performerIds;
    private Set<Long> engineerIds;
    private Set<Long> arrangerIds;
    private Set<Long> genreIds;
    private Set<Long> keyIds;
    private boolean isMp3;

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

    public Integer getDiscNumber() {
        return discNumber;
    }

    public void setDiscNumber(Integer discNumber) {
        this.discNumber = discNumber;
    }

    public Integer getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(Integer trackNumber) {
        this.trackNumber = trackNumber;
    }

    public String getIsrc() {
        return isrc;
    }

    public void setIsrc(String isrc) {
        this.isrc = isrc;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getBpm() {
        return bpm;
    }

    public void setBpm(Double bpm) {
        this.bpm = bpm;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public String getOpus() {
        return opus;
    }

    public void setOpus(String opus) {
        this.opus = opus;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public Set<Long> getProducerIds() {
        return producerIds;
    }

    public void setProducerIds(Set<Long> producerIds) {
        this.producerIds = producerIds;
    }

    public Set<Long> getArtistIds() {
        return artistIds;
    }

    public void setArtistIds(Set<Long> artistIds) {
        this.artistIds = artistIds;
    }

    public Set<Long> getComposerIds() {
        return composerIds;
    }

    public void setComposerIds(Set<Long> composerIds) {
        this.composerIds = composerIds;
    }

    public Set<Long> getLyricistIds() {
        return lyricistIds;
    }

    public void setLyricistIds(Set<Long> lyricistIds) {
        this.lyricistIds = lyricistIds;
    }

    public Set<Long> getPerformerIds() {
        return performerIds;
    }

    public void setPerformerIds(Set<Long> performerIds) {
        this.performerIds = performerIds;
    }

    public Set<Long> getEngineerIds() {
        return engineerIds;
    }

    public void setEngineerIds(Set<Long> engineerIds) {
        this.engineerIds = engineerIds;
    }

    public Set<Long> getArrangerIds() {
        return arrangerIds;
    }

    public void setArrangerIds(Set<Long> arrangerIds) {
        this.arrangerIds = arrangerIds;
    }

    public Set<Long> getGenreIds() {
        return genreIds;
    }

    public void setGenreIds(Set<Long> genreIds) {
        this.genreIds = genreIds;
    }

    public Set<Long> getKeyIds() {
        return keyIds;
    }

    public void setKeyIds(Set<Long> keyIds) {
        this.keyIds = keyIds;
    }

    public void addKeyId(Long keyId) {
        keyIds.add(keyId);
    }

    public boolean isMp3() {
        return isMp3;
    }

    public void setMp3(boolean mp3) {
        isMp3 = mp3;
    }
}
