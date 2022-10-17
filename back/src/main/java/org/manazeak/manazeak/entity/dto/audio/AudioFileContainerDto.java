package org.manazeak.manazeak.entity.dto.audio;

import org.jaudiotagger.tag.TagField;

/**
 * Contains the information about a file in the filesystem
 */
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

    public AudioFileHeaderContainerDto getHeaders() {
        return headers;
    }

    public void setHeaders(AudioFileHeaderContainerDto headers) {
        this.headers = headers;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
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

    public String getDiscNumber() {
        return discNumber;
    }

    public void setDiscNumber(String discNumber) {
        this.discNumber = discNumber;
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

    public String getEanUpn() {
        return eanUpn;
    }

    public void setEanUpn(String eanUpn) {
        this.eanUpn = eanUpn;
    }

    public String getCatalogNumber() {
        return catalogNumber;
    }

    public void setCatalogNumber(String catalogNumber) {
        this.catalogNumber = catalogNumber;
    }

    public String getArranger() {
        return arranger;
    }

    public void setArranger(String arranger) {
        this.arranger = arranger;
    }

    public String getRecordingLocation() {
        return recordingLocation;
    }

    public void setRecordingLocation(String recordingLocation) {
        this.recordingLocation = recordingLocation;
    }

    public String getStartRecordingDate() {
        return startRecordingDate;
    }

    public void setStartRecordingDate(String startRecordingDate) {
        this.startRecordingDate = startRecordingDate;
    }

    public String getEndRecordingDate() {
        return endRecordingDate;
    }

    public void setEndRecordingDate(String endRecordingDate) {
        this.endRecordingDate = endRecordingDate;
    }

    public String getIrsc() {
        return irsc;
    }

    public void setIrsc(String irsc) {
        this.irsc = irsc;
    }

    public Double getBpm() {
        return bpm;
    }

    public void setBpm(Double bpm) {
        this.bpm = bpm;
    }

    public String getFileLocation() {
        return fileLocation;
    }

    public void setFileLocation(String fileLocation) {
        this.fileLocation = fileLocation;
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

    public String getLyricists() {
        return lyricists;
    }

    public void setLyricists(String lyricists) {
        this.lyricists = lyricists;
    }

    public String getEngineers() {
        return engineers;
    }

    public void setEngineers(String engineers) {
        this.engineers = engineers;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
