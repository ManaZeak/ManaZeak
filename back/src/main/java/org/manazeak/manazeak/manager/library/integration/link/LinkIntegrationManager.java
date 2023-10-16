package org.manazeak.manazeak.manager.library.integration.link;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.daos.library.integration.link.LinkIntegrationDAO;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LinkIntegrationManager {

    private final LinkIntegrationDAO linkIntegrationDAO;

    public void insertLinks(ArtistAdditionalInfoContainer container) {
        linkIntegrationDAO.insertLinks(container);
    }
}
