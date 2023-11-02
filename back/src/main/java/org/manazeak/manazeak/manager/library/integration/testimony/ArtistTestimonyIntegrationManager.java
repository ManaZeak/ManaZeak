package org.manazeak.manazeak.manager.library.integration.testimony;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.manazeak.manazeak.daos.library.integration.testimony.TestimonyIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.testimony.TestimonyDto;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.entity.track.Testimony;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Manages the mass insertion of the artist testimonies.
 */
@Component
@RequiredArgsConstructor
public class ArtistTestimonyIntegrationManager {

    private final LocaleService localeService;

    private final ObjectMapper objectMapper;

    private final TestimonyIntegrationDAO testimonyIntegrationDAO;

    /**
     * Inserting the testimonies into the database.
     *
     * @param container The information extracted from the JSON file.
     * @param linker    The object containing the links between the artists and the newly created objects.
     */
    public void insertTestimonies(ArtistAdditionalInfoContainer container, ArtistAdditionalInfoLinkerDto linker) {
        // Changing the pool size for the number of elements to set.
        PkIdProvider.singleton().setPoolSize(Testimony.class, container.getTestimonies().size());
        // Inserting the testimonies into the databases.
        testimonyIntegrationDAO.insertTestimonies(container, linker);
    }

    /**
     * Create a testimony from a JSON object coming from the additional artist file.
     *
     * @param testimonyJson The JSON object that came from the FS.
     * @param artistName    The name of the artist who the testimony is about.
     * @return The list of extracted testimonies.
     */
    public List<TestimonyDto> buildTestimonies(JSONObject testimonyJson, String artistName) throws JsonProcessingException {
        // Checking the testimonies in each language.
        ArrayList<TestimonyDto> testimonies = new ArrayList<>();
        for (Locale locale : localeService.getAllLocales()) {
            if (testimonyJson.has(locale.getCode())) {
                // Extracting the testimony object in the locale.
                TestimonyDto testimony = objectMapper.readValue(
                        testimonyJson.getJSONObject(locale.getCode()).toString(), TestimonyDto.class
                );
                // Setting the locale of the testimony.
                testimony.setLocaleId(locale.getLocaleId());
                testimony.setArtistName(artistName);

                // Adding the testimony to the list
                testimonies.add(testimony);
            }
        }

        return testimonies;
    }

}
