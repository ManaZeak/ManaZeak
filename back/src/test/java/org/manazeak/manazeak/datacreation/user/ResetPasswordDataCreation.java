package org.manazeak.manazeak.datacreation.user;

import org.manazeak.manazeak.entity.dto.user.ResetPasswordDto;
import org.manazeak.manazeak.entity.dto.user.ResetUserPasswordDto;
import org.springframework.stereotype.Component;

/**
 * This class is used to create objects to reset the user password.
 */
@Component
public class ResetPasswordDataCreation {

    /**
     * Creates a reset password DTO with the default values for the user.
     *
     * @return the reset password object.
     */
    public ResetPasswordDto createResetPasswordDto() {
        return new ResetPasswordDto(UserTestConstants.NEW_PASS, UserTestConstants.NEW_PASS);
    }

    /**
     * Create a reset password DTO with the given user id and the default values.
     *
     * @param userId the user id.
     * @return the reset user object.
     */
    public ResetUserPasswordDto createResetUserPasswordDto(Long userId) {
        return new ResetUserPasswordDto(UserTestConstants.NEW_PASS, userId);
    }

    /**
     * Create a reset password DTO with a non existent user and the default password.
     *
     * @return the reset user object.
     */
    public ResetUserPasswordDto createNonExistingResetUserPasswordDto() {
        return new ResetUserPasswordDto(UserTestConstants.NEW_PASS, 0L);
    }
}
