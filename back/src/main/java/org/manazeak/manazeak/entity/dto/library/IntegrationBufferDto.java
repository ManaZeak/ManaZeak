package org.manazeak.manazeak.entity.dto.library;

import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;

import java.util.ArrayList;
import java.util.List;

/**
 * Contains the objects that will be integrated into the database.
 */
public class IntegrationBufferDto {

    private final List<ExtractedTrackDto> tracks = new ArrayList<>();

    private final List<ExtractedAlbumDto> albums = new ArrayList<>();

    private final List<ExtractedBandDto> bands = new ArrayList<>();

    /**
     * Check if the buffer is ready to be integrated in the database.
     *
     * @param bufferSize The size of the buffer.
     * @return True is the buffer is full.
     */
    public boolean isBufferFull(int bufferSize) {
        return tracks.size() > bufferSize || albums.size() > bufferSize || bands.size() > bufferSize;
    }

    /**
     * Clear all the collections of the buffer.
     */
    public void clearBuffer() {
        tracks.clear();
        albums.clear();
        bands.clear();
    }

    /**
     * Add a track to integrate.
     *
     * @param track The track that will be added.
     */
    public void addTrack(ExtractedTrackDto track) {
        tracks.add(track);
    }


    public void addAlbum(ExtractedAlbumDto album) {
        albums.add(album);
    }


    public void addBand(ExtractedBandDto band) {
        bands.add(band);
    }

    public List<ExtractedTrackDto> getTracks() {
        return tracks;
    }

    public List<ExtractedAlbumDto> getAlbums() {
        return albums;
    }

    public List<ExtractedBandDto> getBands() {
        return bands;
    }

}
