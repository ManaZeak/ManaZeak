package org.manazeak.manazeak.exception;

import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.NotificationDto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * This exception is used by the errors in the WS controller.
 */
public class MzkRestException extends RuntimeException {

    private final Set<NotificationDto> notifications = new HashSet<>();

    /**
     * Create an exception with no message
     */
    public MzkRestException() {

    }

    /**
     * Create an exception with only one message.
     *
     * @param titleCode   the code of the string for the notification title.
     * @param messageCode the code of the string for the notification message.
     * @param severity    the serveity of the notification.
     */
    public MzkRestException(String titleCode, String messageCode, NotificationSeverityEnum severity) {
        super(messageCode);
        NotificationDto notification = new NotificationDto();
        notification.setTitleKey(titleCode);
        notification.setMessageKey(messageCode);
        notification.setSeverity(severity);
        notifications.add(notification);
    }

    public Set<NotificationDto> getNotifications() {
        return notifications;
    }

    /**
     * Add one message to the set of messages.
     *
     * @param message the exception message to add.
     */
    public void addNotification(NotificationDto message) {
        notifications.add(message);
    }

    /**
     * Add multiple message to the exception.
     *
     * @param messages the messages to add into the exception.
     */
    public void addNotifications(List<NotificationDto> messages) {
        this.notifications.addAll(messages);
    }
}
