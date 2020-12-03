package org.manazeak.manazeak.exception;

/**
 * An object hasn't been found in the database.
 */
public class MzkObjectNotFoundException extends RuntimeException {

    private String messageKey;
    private String titleKey;

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param msg Error message
     */
    public MzkObjectNotFoundException(final String msg, final String messageKey, final String titleKey) {
        super(msg);
        this.messageKey = messageKey;
        this.titleKey = titleKey;
    }

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param msg   Error message
     * @param cause The parent exception
     */
    public MzkObjectNotFoundException(final String msg, final Throwable cause) {
        super(msg, cause);
    }

    /**
     * Construct an instance of DecaRuntimeException.
     *
     * @param cause Parent exception.
     */
    public MzkObjectNotFoundException(final Throwable cause) {
        super(cause);
    }

    public String getMessageKey() {
        return messageKey;
    }

    public String getTitleKey() {
        return titleKey;
    }
}
