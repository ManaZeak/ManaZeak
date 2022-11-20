package org.manazeak.manazeak.entity.dto.admin;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * Object for displaying a user of the application in a list.
 */
@Data
public class UserListLineDto {

    private Long userId;

    private String username;

    private String avatar;

    private LocalDateTime creationDate;

    private String roleValue;

    private boolean isActive;

}
