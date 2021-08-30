package org.manazeak.manazeak.entity.dto.audio;

import org.jaudiotagger.tag.TagField;

/**
 * Contains the information about a file in the filesystem
 */
public class AudioFileContainerDto {

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

    private String diskNumber;

    private String diskTotal;

    private String country;

    private String lyrics;

    private String releaseDate;

    private String performer;

    public AudioFileContainerDto() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(String trackNumber) {
        this.trackNumber = trackNumber;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getAlbumArtist() {
        return albumArtist;
    }

    public void setAlbumArtist(String albumArtist) {
        this.albumArtist = albumArtist;
    }

    public String getCompilation() {
        return compilation;
    }

    public void setCompilation(String compilation) {
        this.compilation = compilation;
    }

    public String getComposer() {
        return composer;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    public String getDiskNumber() {
        return diskNumber;
    }

    public void setDiskNumber(String diskNumber) {
        this.diskNumber = diskNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPerformer() {
        return performer;
    }

    public void setPerformer(String performer) {
        this.performer = performer;
    }

    public TagField getCover() {
        return cover;
    }

    public void setCover(TagField cover) {
        this.cover = cover;
    }

    public String getDiskTotal() {
        return diskTotal;
    }

    public void setDiskTotal(String diskTotal) {
        this.diskTotal = diskTotal;
    }

    public String getTrackTotal() {
        return trackTotal;
    }

    public void setTrackTotal(String trackTotal) {
        this.trackTotal = trackTotal;
    }
}
