package org.manazeak.manazeak.manager.library.alias;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.track.AliasDAO;
import org.manazeak.manazeak.entity.dto.utils.NameIdentifierProjection;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Handles the aliases of artists in the database.
 */
@Component
@RequiredArgsConstructor
public class AliasManager {

    private final AliasDAO aliasDAO;

    /**
     * Build a map of aliases with the alias associated with its id.
     *
     * @param aliases The alias string to search.
     * @return A map associating an alias string with its id.
     */
    public Map<String, Long> getAliasByNameMap(Collection<String> aliases) {
        // Fetch all the aliases available in the database.
        List<NameIdentifierProjection> dbAliases = aliasDAO.getAliasIdAndNameByName(aliases);
        HashMap<String, Long> aliasMap = new HashMap<>();
        for (NameIdentifierProjection alias : dbAliases) {
            aliasMap.put(alias.getName(), alias.getIdentifier());
        }

        return aliasMap;
    }
}
