package org.manazeak.manazeak.exception;

/**
 * Allows to handle security exception.
 */
public class MzkSecurityException extends RuntimeException implements MzkException {

    private final String messageKey;
    private final String titleKey;

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param messageKey The message key that will be used to display the message to the user.
     * @param titleKey   The title key that will be used to display the title to the user.
     * @param e          The cause of this exception.
     */
    public MzkSecurityException(String messageKey, String titleKey, Throwable e) {
        super(e);
        this.messageKey = messageKey;
        this.titleKey = titleKey;
    }

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param messageKey The message key that will be used to display the message to the user.
     * @param titleKey   The title key that will be used to display the title to the user.
     */
    public MzkSecurityException(String messageKey, String titleKey) {
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
