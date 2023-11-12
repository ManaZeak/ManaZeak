package org.manazeak.manazeak.manager.library.integration.bio;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.daos.library.integration.bio.BioIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.bio.BioDto;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Launch
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class BioIntegrationManager {

    private final LocaleService localeService;

    private final BioIntegrationDAO bioIntegrationDAO;

    /**
     * Insert the artist bio in the database.
     *
     * @param container The information extracted from the artists JSON.
     */
    public void insertBios(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linker) {
        bioIntegrationDAO.insertBios(container, linker);
    }

    /**
     * Fill the information about the bio.
     *
     * @param bios       The bios extracted from the JSON.
     * @param artistName The name of the artist.
     */
    public void fillBios(List<BioDto> bios, String artistName) {
        for (BioDto bio : bios) {
            Optional<Locale> localeOpt = localeService.getLocaleByCode(bio.getLocale());
            // If the locale was not recognized, the bio is skipped.
            if (localeOpt.isEmpty()) {
                log.warn("The bio : {} locale was not recognized, skipping it.", bio);
                continue;
            }
            // Filling the bio information.
            bio.setLocaleId(localeOpt.get().getLocaleId());
            bio.setArtistName(artistName);
        }
    }
}
