package org.manazeak.manazeak.manager.library.integration.bio;


import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.manazeak.manazeak.daos.library.integration.bio.BioIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoLinkerDto;
import org.manazeak.manazeak.entity.dto.library.integration.bio.BioDto;
import org.manazeak.manazeak.entity.reference.Locale;
import org.manazeak.manazeak.service.reference.locale.LocaleService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Launch
 */
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
     * Build bios with the JSON object retrieved in the artist JSON.
     *
     * @param bioJson    The object found in the JSON.
     * @param artistName The name of the artist
     * @return A list of bios.
     */
    public List<BioDto> buildBio(JSONObject bioJson, String artistName) {
        // Checking the testimonies in each language.
        ArrayList<BioDto> bios = new ArrayList<>();
        for (Locale locale : localeService.getAllLocales()) {
            if (bioJson.has(locale.getCode())) {
                // Extracting the testimony object in the locale.
                BioDto bio = new BioDto(locale.getLocaleId(), bioJson.getString(locale.getCode()), artistName);

                // Adding the testimony to the list
                bios.add(bio);
            }
        }

        return bios;
    }

}
