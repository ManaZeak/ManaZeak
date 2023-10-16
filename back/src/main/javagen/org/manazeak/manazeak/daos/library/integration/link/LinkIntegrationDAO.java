package org.manazeak.manazeak.daos.library.integration.link;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.constant.library.website.WebsiteTypeEnum;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistAdditionalInfoContainer;
import org.manazeak.manazeak.entity.dto.library.integration.artist.ArtistLink;
import org.manazeak.manazeak.entity.track.Link;
import org.manazeak.manazeak.util.database.PkIdProvider;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Inserts into the database the new links for an artist.
 */
@Repository
@RequiredArgsConstructor
public class LinkIntegrationDAO {

    private static final String INSERT_LINKS = """
            INSERT INTO link (link_id, url, website_id, artist_id) VALUES (?, ?, ?)
            """;

    private final JdbcTemplate jdbcTemplate;

    /**
     * Insert all the links of the artists into the database.
     *
     * @param container The data extracted
     */
    public void insertLinks(ArtistAdditionalInfoContainer container) {
        List<ArtistLink> links = new ArrayList<>(container.getLinks());
        jdbcTemplate.batchUpdate(INSERT_LINKS, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(@NonNull PreparedStatement ps, int i) throws SQLException {
                Long linkId = PkIdProvider.singleton().getNewPkId(Link.class);
                ps.setLong(1, linkId);
                ps.setString(2, links.get(i).url());
                ps.setLong(3, WebsiteTypeEnum.getWebsiteTypeByCode(links.get(i).type()));
                ps.setLong(4, container.resolveArtistLinkId(links.get(i)));
            }

            @Override
            public int getBatchSize() {
                return links.size();
            }
        });
    }

}
