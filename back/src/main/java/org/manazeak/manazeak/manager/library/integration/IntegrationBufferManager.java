package org.manazeak.manazeak.manager.library.integration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.daos.library.integration.album.AlbumIntegrationDAO;
import org.manazeak.manazeak.daos.library.integration.genre.GenreIntegrationDAO;
import org.manazeak.manazeak.daos.library.integration.label.LabelIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.cache.CacheAccessManager;
import org.manazeak.manazeak.manager.library.integration.artist.ArtistIntegrationManager;
import org.manazeak.manazeak.manager.library.integration.cache.CacheIntegrationInitializer;
import org.manazeak.manazeak.manager.library.integration.track.TrackIntegrationManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Integrate a buffer of scanned tracks into the database.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class IntegrationBufferManager {

    private final ArtistIntegrationManager artistIntegrationManager;
    private final CacheIntegrationInitializer cacheIntegrationInitializer;
    private final CacheAccessManager cacheAccessManager;
    private final LabelIntegrationDAO labelIntegrationDAO;
    private final AlbumIntegrationDAO albumIntegrationDAO;
    private final GenreIntegrationDAO genreIntegrationDAO;
    private final TrackIntegrationManager trackIntegrationManager;

    /**
     * Integrate a buffer of tracks into the database.
     * This part is synchronized because the id must be the same and must be present inside the database.
     *
     * @param bands The information about the extracted tags.
     */
    public synchronized void integrateBuffer(List<ExtractedBandDto> bands, int packageNumber, int totalPackages) {
        log.info("Starting the database insertion of the tags for the package {}/{}.", packageNumber + 1, totalPackages);

        // Init caches with the buffer.
        log.info("Started: populating caches.");
        cacheIntegrationInitializer.initCacheWithBuffer(bands);
        log.info("Finished: populating caches.");

        log.info("Started: conversion of the extracted tracks to DTOs.");
        // Launching the extraction of the tags contained in the library.
        LibraryIntegrationContainer integrationContainer = launchTagDtoConversion(bands);
        log.info("Finished: conversion of the extracted tracks to DTOs.");

        // Launching the integration of objects.
        log.info("Started: merging the labels.");
        labelIntegrationDAO.mergeLabel(new ArrayList<>(integrationContainer.getLabelIntegrationHelper().getLabels().values()));
        log.info("Finihed: merging the labels");

        log.info("Started: merging the artists.");
        artistIntegrationManager.mergeArtistsIntoDatabase(integrationContainer.getArtistIntegrationHelper().getArtists());
        log.info("Started: merging the artists.");

        log.info("Started : merging the albums.");
        albumIntegrationDAO.mergeAlbums(new ArrayList<>(integrationContainer.getAlbumIntegrationHelper().getAlbumMap().values()));
        log.info("Finished: merging the albums.");

        log.info("Started: merging the genres.");
        genreIntegrationDAO.mergeGenres(new ArrayList<>(integrationContainer.getGenreIntegrationHelper().getGenres().values()));
        log.info("Finished: merging the genres.");

        // Integrating the tracks into the database.
        // Generating the track ids before their integration into the database.
        log.info("Started: generating and associating the track ids.");
        trackIntegrationManager.fillTrackIds(integrationContainer.getTrackIntegrationHelper().getTracksByLocation());
        log.info("Finished: generating and associating the track ids.");

        log.info("Starting: merging the tracks.");
        trackIntegrationManager.mergeTracksIntoDatabase(new ArrayList<>(integrationContainer.getTrackIntegrationHelper().getTracksByLocation().values()));
        log.info("Finished: merging the tracks.");

        log.info("Finished the database insertion of the tags for the package {}/{}.", packageNumber + 1, totalPackages);
    }

    /**
     * Convert the data contained in the extracted tags from the tracks into object ready to be inserted into
     * the database.
     *
     * @param bands The information extracted from the tags and the folders.
     * @return An object containing all the entities that must be inserted.
     */
    public LibraryIntegrationContainer launchTagDtoConversion(List<ExtractedBandDto> bands) {
        LibraryIntegrationContainer integrationHelper = new LibraryIntegrationContainer(cacheAccessManager);

        // Iterating over the objects of the buffer to create the object to be inserted into the database.
        for (ExtractedBandDto band : bands) {
            // Extracting the information from the band.
            integrationHelper.convertBandIntoDto(band);
            for (ExtractedAlbumDto album : band.getAlbums()) {
                // Extracting the information from the album.
                integrationHelper.convertAlbumIntoDto(album, band);
                for (ExtractedTrackDto track : album.getTracks()) {
                    // Extracting the information from the track.
                    integrationHelper.convertTrackIntoDto(track, album);
                }
            }
        }

        return integrationHelper;
    }

}
