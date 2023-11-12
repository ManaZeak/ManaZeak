package org.manazeak.manazeak.manager.library.integration.testimony;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.daos.library.integration.testimony.TestimonyIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.testimony.TestimonyDto;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.entity.track.Testimony;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Manages the mass insertion of the artist testimonies.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class ArtistTestimonyIntegrationManager {

    private final LocaleService localeService;

    private final TestimonyIntegrationDAO testimonyIntegrationDAO;

    /**
     * Inserting the testimonies into the database.
     *
     * @param container The information extracted from the JSON file.
     * @param linker    The object containing the links between the artists and the newly created objects.
     */
    public void insertTestimonies(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linker) {
        // Nothing to do if there are no testimonies.
        if (container.getTestimonies().isEmpty()) {
            return;
        }
        // Changing the pool size for the number of elements to set.
        PkIdProvider.singleton().setPoolSize(Testimony.class, container.getTestimonies().size());
        // Inserting the testimonies into the databases.
        testimonyIntegrationDAO.insertTestimonies(container, linker);
    }

    /**
     * Fill the extra information from the parsed testimonies.
     *
     * @param testimonies The parsed testimonies.
     * @param artistName  The name of the artist attached to this testimony.
     */
    public void fillTestimonies(List<TestimonyDto> testimonies, String artistName) {
        for (TestimonyDto testimony : testimonies) {
            Optional<Locale> locale = localeService.getLocaleByCode(testimony.getLocale());
            if (locale.isEmpty()) {
                log.warn("The testimony : {} locale wasn't recognized, skipping it.", testimony);
                continue;
            }

            testimony.setLocaleId(locale.get().getLocaleId());
            testimony.setArtistName(artistName);
        }
    }
}
