package org.manazeak.manazeak.service.security.user.badge;

import org.manazeak.manazeak.entity.dto.user.badge.BadgeListLineDto;
import org.manazeak.manazeak.entity.dto.user.badge.UserBadgeDto;
import org.manazeak.manazeak.entity.security.Badge;
import org.manazeak.manazeak.entity.security.MzkUser;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to manipulate the data of badges.
 */
public class BadgeHelper {

    /**
     * Private constructor, this is a helper.
     */
    private BadgeHelper() {

    }

    /**
     * Converts a badge into a display object.
     * @param badges the list of objects to convert.
     * @return the converted objects.
     */
    public static List<BadgeListLineDto> convertBadges(List<Badge> badges) {
        List<BadgeListLineDto> convertedBadges = new ArrayList<>();
        for (Badge badge : badges) {
            BadgeListLineDto badgeLine = new BadgeListLineDto();
            badgeLine.setLabel(badge.getLabel());

            List<UserBadgeDto> linkedUsers = new ArrayList<>();
            // Iterating through the users
            if (badge.getMzkUserList() != null) {
                for (MzkUser user : badge.getMzkUserList()) {
                    UserBadgeDto userBadge = new UserBadgeDto();
                    userBadge.setUserId(user.getUserId());
                    userBadge.setUsername(user.getUsername());
                    linkedUsers.add(userBadge);
                }
            }
            badgeLine.setUsers(linkedUsers);

            convertedBadges.add(badgeLine);
        }
        return convertedBadges;
    }
}
