package org.manazeak.manazeak.manager.library.integration.alias;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.alias.AliasIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Inserts the aliases into the database.
 */
@Component
@RequiredArgsConstructor
public class AliasIntegrationManager {

    private final AliasIntegrationDAO aliasIntegrationDAO;

    /**
     * Inserts into the database a list of aliases.
     *
     * @param additionalInfoContainer The information extracted from the JSON.
     */
    public void insertAliases(ArtistAdditionalInfoContainer additionalInfoContainer) {
        // The list of aliases that will be inserted into the database.
        List<String> aliasToInsert = new ArrayList<>();

        // Searching for alias not present in the database.
        for (String alias : additionalInfoContainer.getAliases()) {
            if (!additionalInfoContainer.getAliases().contains(alias)) {
                aliasToInsert.add(alias);
            }
        }

        // Inserting the aliases into the database.
        aliasIntegrationDAO.insertAlias(additionalInfoContainer, aliasToInsert);
    }

}
