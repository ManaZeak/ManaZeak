package org.manazeak.manazeak.entity.dto.user;


import com.fasterxml.jackson.annotation.JsonCreator;


/**
 * Used to store the information
 */
public class ResetUserPasswordDto {

    private final String password;
    private final Long userId;

    @JsonCreator
    public ResetUserPasswordDto(String password, Long userId) {
        this.password = password;
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public Long getUserId() {
        return userId;
    }
}
