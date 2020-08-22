package org.manazeak.manazeak.entity.dto.admin;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to represent the user by hierarchy.
 */
public class UserHierarchyDto {

    private Long userId;
    private String username;
    private List<UserHierarchyDto> children = new ArrayList<>();

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<UserHierarchyDto> getChildren() {
        return children;
    }

    public void setChildren(List<UserHierarchyDto> children) {
        this.children = children;
    }
}
