package org.manazeak.manazeak.service.message;

import org.manazeak.manazeak.constant.notification.NotificationSeverityEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorNotificationDto;
import org.manazeak.manazeak.entity.dto.kommunicator.NotificationDto;
import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.service.message.MessageManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * Allows to manipulate error before sending them to the front.
 */
@Service
public class KommunicatorServiceImpl implements KommunicatorService {

    private final MessageManager messageManager;

    public KommunicatorServiceImpl(MessageManager messageManager) {
        this.messageManager = messageManager;
    }

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    public KommunicatorDto buildKommunicatorFromException(MzkRestException e) {
        // An exception has occurred, not a normal state.
        KommunicatorDto kom = new KommunicatorDto(false);

        // Building the error from the exception.
        for (NotificationDto notification : e.getNotifications()) {
            KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
            komNotif.setTitle(messageManager.getMessage(notification.getTitleKey()));
            // In some case the message is already translated.
            if(notification.hasMessage()) {
                komNotif.setMessage(notification.getMessage());
            } else {
                komNotif.setMessage(messageManager.getMessage(notification.getMessageKey()));
            }
            komNotif.setSeverity(notification.getSeverity().getStatus());
            kom.addNotification(komNotif);
        }

        return kom;
    }

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    public KommunicatorDto buildKommunicatorFromException(MzkObjectNotFoundException e) {
        // An exception has occurred, not a normal state.
        KommunicatorDto kom = new KommunicatorDto(false);

        // Building the error from the exception
        KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
        komNotif.setTitle(messageManager.getMessage(e.getTitleKey()));
        komNotif.setMessage(messageManager.getMessage(e.getMessageKey()));
        komNotif.setSeverity(NotificationSeverityEnum.ERROR.getStatus());

        kom.addNotification(komNotif);

        return kom;
    }

    /**
     * Build a kommunicator object in succes mode with a notification.
     * @param titleKey The key containing the title of the notification.
     * @param messageKey The key containing the message of the notification.
     * @return The kom object to send to the front.
     */
    public KommunicatorDto buildSuccessKom(String titleKey, String messageKey) {
        KommunicatorDto kom = new KommunicatorDto(true);

        // Building the success notification.
        KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
        komNotif.setTitle(messageManager.getMessage(titleKey));
        komNotif.setMessage(messageManager.getMessage(messageKey));
        komNotif.setSeverity(NotificationSeverityEnum.SUCCESS.getStatus());

        kom.addNotification(komNotif);

        return kom;
    }
}
