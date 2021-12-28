package org.manazeak.manazeak.manager.library.integration;

import org.manazeak.manazeak.entity.dto.library.IntegrationBufferDto;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Integrate a buffer of scanned tracks into the database.
 */
@Component
public class IntegrationBufferManager {

    /**
     * Integrate a buffer of tracks into the database.
     * @param container The container with the scanned information.
     */
    public void integrateBuffer(IntegrationBufferDto container) {
        // Creating the set containing all the artists to process.
        

    }

}
