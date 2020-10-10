package org.manazeak.manazeak.exception;

/**
 * This exception is used when checking a field for errors.
 */
public class MzkValidationException extends Exception {

    private final String message;

    /**
     * Create a validation error.
     *
     * @param message the key containing the message
     */
    public MzkValidationException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
