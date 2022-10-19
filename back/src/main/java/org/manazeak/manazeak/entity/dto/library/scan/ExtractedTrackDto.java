package org.manazeak.manazeak.entity.dto.library.scan;

import org.manazeak.manazeak.entity.dto.library.integration.artist.ExtractedComposerDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the information about the track extracted from the tags.
 */
public class ExtractedTrackDto {

    private String location;
    private String title;

    private List<String> artists = new ArrayList<>();

    private List<String> performers = new ArrayList<>();

    private List<ExtractedComposerDto> composers = new ArrayList<>();

    private List<String> producers = new ArrayList<>();

    private List<String> lyricists = new ArrayList<>();

    private List<String> engineers = new ArrayList<>();

    private List<String> arrangers = new ArrayList<>();

    private List<String> genres = new ArrayList<>();

    private String year;

    private Integer discNumber;

    private Integer trackNumber;

    private Integer bitrate;

    private int sampleRate;

    private long size;

    private double duration;

    private String lyrics;

    private String irsc;

    private Double bpm;

    private String opus;

    private String subtitle;

    private List<String> key;

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

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

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public List<String> getProducers() {
        return producers;
    }

    public void setProducers(List<String> producers) {
        this.producers = producers;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getArtists() {
        return artists;
    }

    public void setArtists(List<String> artists) {
        this.artists = artists;
    }

    public List<String> getPerformers() {
        return performers;
    }

    public void setPerformers(List<String> performers) {
        this.performers = performers;
    }

    public List<ExtractedComposerDto> getComposers() {
        return composers;
    }

    public void setComposers(List<ExtractedComposerDto> composers) {
        this.composers = composers;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public List<String> getLyricists() {
        return lyricists;
    }

    public void setLyricists(List<String> lyricists) {
        this.lyricists = lyricists;
    }

    public List<String> getEngineers() {
        return engineers;
    }

    public void setEngineers(List<String> engineers) {
        this.engineers = engineers;
    }

    public List<String> getArrangers() {
        return arrangers;
    }

    public void setArrangers(List<String> arrangers) {
        this.arrangers = arrangers;
    }

    public List<String> getKeys() {
        return key;
    }

    public void setKeys(List<String> key) {
        this.key = key;
    }
}
