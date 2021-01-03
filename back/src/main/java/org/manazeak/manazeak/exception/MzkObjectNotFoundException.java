package org.manazeak.manazeak.exception;

/**
 * An object hasn't been found in the database.
 */
public class MzkObjectNotFoundException extends RuntimeException implements MzkException {

    private final String messageKey;
    private final String titleKey;

    /**
     * Construct an instance of MzkObjectNotFoundException.
     *
     * @param msg Error message
     */
    public MzkObjectNotFoundException(final String msg, final String messageKey, final String titleKey) {
        super(msg);
        this.messageKey = messageKey;
        this.titleKey = titleKey;
    }

    @Override
    public String getMessageKey() {
        return messageKey;
    }

    @Override
    public String getTitleKey() {
        return titleKey;
    }

}
