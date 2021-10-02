package org.manazeak.manazeak.exception;

/**
 * This exception will be caught by the controller to be transformed into a notification into the front.
 */
public class MzkFrontNotificationException extends RuntimeException implements MzkException {

    private final String messageKey;
    private final String titleKey;

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param messageKey The message key that will be used to display the message to the user.
     * @param titleKey   The title key that will be used to display the title to the user.
     * @param e          The cause of this exception.
     */
    public MzkFrontNotificationException(String messageKey, String titleKey, Throwable e) {
        super(messageKey, e);
        this.messageKey = messageKey;
        this.titleKey = titleKey;
    }

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param messageKey The message key that will be used to display the message to the user.
     * @param titleKey   The title key that will be used to display the title to the user.
     */
    public MzkFrontNotificationException(String messageKey, String titleKey) {
        super(messageKey);
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
