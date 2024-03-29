package org.manazeak.manazeak.service.security.user.badge;


import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.NewBadgeDto;
import org.manazeak.manazeak.manager.security.user.badge.BadgeManager;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Used to manipulate the badges in the app.
 */
@Service
@TransactionalWithRollback
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

    private final BadgeManager badgeManager;

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
        badgeManager.associateUserToBadge(userId, badgeId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteBadge(Long badgeId) {
        // Deleting the badge.
        badgeManager.deleteBadge(badgeId);
    }
}
