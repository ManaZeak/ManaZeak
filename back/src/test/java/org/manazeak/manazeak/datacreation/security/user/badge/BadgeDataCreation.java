package org.manazeak.manazeak.datacreation.security.user.badge;

import org.manazeak.manazeak.daos.security.BadgeDAO;
import org.manazeak.manazeak.entity.security.Badge;
import org.springframework.stereotype.Component;

@Component
public class BadgeDataCreation {

    public static final String BADGE_CONTENT = "BADGE TU";

    private final BadgeDAO badgeDAO;

    public BadgeDataCreation(BadgeDAO badgeDAO) {
        this.badgeDAO = badgeDAO;
    }

    /**
     * Creates a badge in the database.
     * @return The badge that was created.
     */
    public Badge createBadge() {
        Badge badge = new Badge();
        badge.setLabel(BADGE_CONTENT);
        badgeDAO.save(badge);
        return badge;
    }
}
