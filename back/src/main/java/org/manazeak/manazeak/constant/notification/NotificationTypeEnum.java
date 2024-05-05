package org.manazeak.manazeak.constant.notification;

import lombok.Getter;

/**
 * Contains the notification type to display in the UI.
 */
@Getter
public enum NotificationTypeEnum {
    SUCCESS("success"),
    INFO("info"),
    WARNING("warning"),
    ERROR("error");

    private final String status;

    NotificationTypeEnum(String status) {
        this.status = status;
    }

}
