package org.manazeak.manazeak.entity.dto.user.badge;

import java.util.List;

/**
 * A line containing a badge.
 */
public class BadgeListLineDto {

    private String label;

    private List<UserBadgeDto> users;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<UserBadgeDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserBadgeDto> users) {
        this.users = users;
    }
}
