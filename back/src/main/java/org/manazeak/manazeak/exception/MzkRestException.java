package org.manazeak.manazeak.exception;

/**
 * This exception is used by the errors in the WS controller.
 */
public class MzkRestException extends Exception {

    private final String message;

    public MzkRestException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
