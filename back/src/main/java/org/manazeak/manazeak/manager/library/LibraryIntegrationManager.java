package org.manazeak.manazeak.manager.library;

import org.manazeak.manazeak.entity.dto.library.IntegrationBufferDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedAlbumDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedBandDto;
import org.manazeak.manazeak.entity.dto.library.scan.ExtractedTrackDto;
import org.manazeak.manazeak.manager.library.integration.IntegrationBufferManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Allows to integrate the library into the database.
 */
@Component
public class LibraryIntegrationManager {

    @Value("${app.bufferLength}")
    private int bufferSize;

    /**
     * The manager to integrate the buffer of the library.
     */
    private final IntegrationBufferManager integrationBufferManager;

    public LibraryIntegrationManager(IntegrationBufferManager integrationBufferManager) {
        this.integrationBufferManager = integrationBufferManager;
    }

    /**
     * Insert the data extracted from the tracks into the database.
     *
     * @param extractedBands The list of the bands extracted from the tags and the FS.
     */
    public void insertLibraryData(List<ExtractedBandDto> extractedBands) {
        IntegrationBufferDto integrationBuffer = new IntegrationBufferDto();

        // Iterating through the tracks.
        for (ExtractedBandDto band : extractedBands) {
            // Extracting the information contained in the band.
            integrationBuffer.addBand(band);
            for (ExtractedAlbumDto album : band.getAlbums()) {
                // Extracting the information contained on the album.
                integrationBuffer.addAlbum(album);
                for (ExtractedTrackDto track : album.getTracks()) {
                    integrationBuffer.addTrack(track);
                }
            }
            // Checking if the buffer must be integrated in the database.
            if (integrationBuffer.isBufferFull(bufferSize)) {
                // Inserting the data into the database.
                integrationBufferManager.integrateBuffer(integrationBuffer);
                // Clear all the data contained in the buffer.
                integrationBuffer.clearBuffer();
            }
        }

        // Is the buffer is not empty, integrating the last elements.
        if (integrationBuffer.isBufferFull(0)) {
            integrationBufferManager.integrateBuffer(integrationBuffer);
        }
    }

}
