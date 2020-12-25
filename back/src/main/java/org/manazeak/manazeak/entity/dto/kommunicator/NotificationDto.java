package org.manazeak.manazeak.entity.dto.kommunicator;

import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;

/**
 * Contains the information to build a notification with error codes.
 */
public class NotificationDto {

    /**
     * Contains the title key of the error.
     */
    private String titleKey;
    /**
     * Contains the message key of the error.
     */
    private String messageKey;
    /**
     * The message if the key wasn't available
     */
    private String message;
    /**
     * The severity of the notification.
     */
    private NotificationSeverityEnum severity;

    public boolean hasMessage() {
        return message != null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTitleKey() {
        return titleKey;
    }

    public void setTitleKey(String titleKey) {
        this.titleKey = titleKey;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public NotificationSeverityEnum getSeverity() {
        return severity;
    }

    public void setSeverity(NotificationSeverityEnum severity) {
        this.severity = severity;
    }
}
