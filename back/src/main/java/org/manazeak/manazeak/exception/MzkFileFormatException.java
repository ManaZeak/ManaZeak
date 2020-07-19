package org.manazeak.manazeak.exception;

/**
 * This exception is used when a file doesn't have an known format.
 */
public class MzkFileFormatException extends Exception {

    public MzkFileFormatException(String message) {
        super(message);
    }
}
