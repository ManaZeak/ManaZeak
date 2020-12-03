package org.manazeak.manazeak.constant.error;

import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;

/**
 * This enum contains the possible errors of the application.
 */
public enum ErrorEnum {

    /**
     * The asked user desn't exists in the database.
     */
    USER_NOT_FOUND("general.error.validation_error", "database.error.user_not_found", NotificationSeverityEnum.ERROR);

    private final String messageKey;

    private final String titleKey;

    private final NotificationSeverityEnum severity;

    ErrorEnum(String titleKey, String messageKey, NotificationSeverityEnum severity) {
        this.titleKey = titleKey;
        this.messageKey = messageKey;
        this.severity = severity;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public String getTitleKey() {
        return titleKey;
    }

    public NotificationSeverityEnum getSeverity() {
        return severity;
    }
}
