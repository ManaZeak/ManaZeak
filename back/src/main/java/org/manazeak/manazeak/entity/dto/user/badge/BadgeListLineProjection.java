package org.manazeak.manazeak.entity.dto.user.badge;

import java.util.Set;

public interface BadgeListLineProjection {

    String getLabel();

    Set<UserBadgeProjection> getMzkUserList();

    /**
     * Used to get the information of linked user of a badge.
     */
    interface UserBadgeProjection {

        String getUsername();

        Long getUserId();
    }
}
