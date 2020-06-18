package org.manazeak.manazeak.exception;

/**
 * Runtime exception for ManaZeak
 */
public class MzkRuntimeException extends RuntimeException {

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param msg Error message
     */
    public MzkRuntimeException(final String msg) {
        super(msg);
    }

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param msg   Error message
     * @param cause The parent exception
     */
    public MzkRuntimeException(final String msg, final Throwable cause) {
        super(msg, cause);
    }

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param cause Parent exception.
     */
    public MzkRuntimeException(final Throwable cause) {
        super(cause);
    }
}
