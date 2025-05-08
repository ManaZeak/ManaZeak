package org.manazeak.manazeak.constant.notification;

import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorNotificationDto;
import org.manazeak.manazeak.manager.MessageManager;

import java.io.Serializable;

/**
 * Contains the messages used to build the notification.
 */
public record NotificationMessage(String messageKey, String titleKey,
                                  NotificationTypeEnum type) implements Serializable {

    public static NotificationMessage of(String messageKey, String titleKey, NotificationTypeEnum type) {
        return new NotificationMessage(messageKey, titleKey, type);
    }

    public static NotificationMessage of(String messageKey, String titleKey) {
        return new NotificationMessage(messageKey, titleKey, NotificationTypeEnum.ERROR);
    }

    public KommunicatorDto buildKommunicator(MessageManager messageManager) {
        KommunicatorDto kom = new KommunicatorDto(type.isSuccess());
        kom.addNotification(buildKommunicatorNotification(messageManager));
        return kom;
    }

    private KommunicatorNotificationDto buildKommunicatorNotification(MessageManager messageManager) {
        KommunicatorNotificationDto notif = new KommunicatorNotificationDto();
        notif.setMessage(messageManager.getMessage(messageKey));
        notif.setTitle(messageManager.getMessage(titleKey));
        notif.setType(type.getStatus());
        return notif;
    }
}
