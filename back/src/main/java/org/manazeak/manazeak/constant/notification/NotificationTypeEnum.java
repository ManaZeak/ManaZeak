package org.manazeak.manazeak.constant.notification;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Contains the notification type to display in the UI.
 */
@Getter
@RequiredArgsConstructor
public enum NotificationTypeEnum {
    SUCCESS("success", true),
    INFO("info", true),
    WARNING("warning", true),
    ERROR("error", false);

    private final String status;

    private final boolean isSuccess;


}
