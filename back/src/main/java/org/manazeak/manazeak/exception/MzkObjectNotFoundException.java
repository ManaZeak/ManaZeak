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
     * @param msg        Error message
     * @param messageKey The key of the message contained in the i18n file.
     * @param titleKey   The key of the title of the exception in the i18n file.
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
