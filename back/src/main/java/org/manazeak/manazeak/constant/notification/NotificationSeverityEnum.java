package org.manazeak.manazeak.constant.notification;

/**
 * Contains the level of severity of an error
 */
public enum NotificationSeverityEnum {
    SUCCESS("success"),
    INFO("info"),
    WARNING("warning"),
    ERROR("error");

    private final String status;

    NotificationSeverityEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
