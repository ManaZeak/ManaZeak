package org.manazeak.manazeak.exception;

import org.manazeak.manazeak.constant.notification.NotificationMessage;
import org.manazeak.manazeak.constant.notification.NotificationMessageEnum;

/**
 * Runtime exception for ManaZeak
 */
public class MzkRuntimeException extends RuntimeException {

    /**
     * Contains the messages contained in the notification.
     */
    private final NotificationMessage notificationMessage;

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param message      The exception message that will be displayed in the logs.
     * @param notification The notification that will be displayed to the user.
     * @param e            The cause of this exception.
     */
    public MzkRuntimeException(String message, NotificationMessageEnum notification, Throwable e) {
        super(message, e);
        if (notification != null) {
            notificationMessage = notification.getNotificationMessages();
        } else {
            notificationMessage = null;
        }
    }

    /**
     * Constructs an instance of the exception without information about the exception for the front.
     *
     * @param message The exception message that will be displayed in the logs.
     * @param e       The cause of this exception.
     */
    public MzkRuntimeException(String message, Throwable e) {
        super(message, e);
        notificationMessage = null;
    }

    /**
     * Constructs an instance of the exception with a message key and a title and a cause.
     *
     * @param message      The message that will be displayed.
     * @param notification The notification that will be displayed to the user.
     */
    public MzkRuntimeException(String message, NotificationMessageEnum notification) {
        super(message);
        if (notification != null) {
            notificationMessage = notification.getNotificationMessages();
        } else {
            notificationMessage = null;
        }
    }

    /**
     * Constructs an instance of the exception without the information about the exception for the front.
     *
     * @param message The message that will be displayed.
     */
    public MzkRuntimeException(String message) {
        super(message);
        notificationMessage = null;
    }

    /**
     * @return The key of the messages inside the notification.
     */
    public NotificationMessage getNotificationMessage() {
        return notificationMessage;
    }
}
