package org.manazeak.manazeak.entity.dto.user;

/**
 * Interface to get the password fields for the validator.
 */
public interface PasswordContainer {

    /**
     * Get the first password.
     * @return the first password field.
     */
    String getPassword1();

    /**
     * Get the second password.
     * @return the second password field.
     */
    String getPassword2();
}
