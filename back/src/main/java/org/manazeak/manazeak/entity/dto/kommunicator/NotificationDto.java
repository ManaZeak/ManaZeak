package org.manazeak.manazeak.entity.dto.kommunicator;

import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;

/**
 * Contains the information to build a notification with error codes.
 */
public class NotificationDto {

    private String titleKey;
    private String messageKey;
    private NotificationSeverityEnum severity;

    public void setTitleKey(String titleKey) {
        this.titleKey = titleKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public void setSeverity(NotificationSeverityEnum severity) {
        this.severity = severity;
    }

    public String getTitleKey() {
        return titleKey;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public NotificationSeverityEnum getSeverity() {
        return severity;
    }
}
