package org.manazeak.manazeak.service.security.user.badge;


import org.manazeak.manazeak.annotations.TransactionnalWithRollback;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.NewBadgeDto;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Used to manipulate the badges in the app.
 */
@Service
@TransactionnalWithRollback
public class BadgeServiceImpl implements BadgeService {

    private final BadgeManager badgeManager;

    public BadgeServiceImpl(BadgeManager badgeManager) {
        this.badgeManager = badgeManager;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void createBadge(NewBadgeDto badge) {
        badgeManager.createBadge(badge);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<BadgeListLineDto> getBadgesList() {
        return badgeManager.getBadges();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void associateBadgeToUser(Long userId, Long badgeId) {

    }
}
