package org.manazeak.manazeak.service.message;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.constant.notification.NotificationTypeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorNotificationDto;
import org.manazeak.manazeak.entity.dto.kommunicator.NotificationDto;
import org.manazeak.manazeak.exception.*;
import org.manazeak.manazeak.manager.MessageManager;
import org.springframework.stereotype.Service;

/**
 * Allows to manipulate error before sending them to the front.
 */
@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class KommunicatorServiceImpl implements KommunicatorService {

    private final MessageManager messageManager;

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    @Override
    public KommunicatorDto buildKommunicatorFromException(MzkRestException e) {
        // An exception has occurred, not a normal state.
        KommunicatorDto kom = new KommunicatorDto(false);

        // Building the error from the exception.
        for (NotificationDto notification : e.getNotifications()) {
            KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
            komNotif.setTitle(messageManager.getMessage(notification.getTitleKey()));
            // In some case the message is already translated.
            if (notification.hasMessage()) {
                komNotif.setMessage(notification.getMessage());
            } else {
                komNotif.setMessage(messageManager.getMessage(notification.getMessageKey()));
            }
            komNotif.setType(notification.getType().getStatus());
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
    @Override
    public KommunicatorDto buildKommunicatorFromException(MzkObjectNotFoundException e) {
        return buildKomFromMzkException(e);
    }

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    @Override
    public KommunicatorDto buildKommunicatorFromException(MzkSecurityException e) {
        return buildKomFromMzkException(e);
    }

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    @Override
    public KommunicatorDto buildKommunicatorFromException(MzkFrontNotificationException e) {
        return buildKomFromMzkException(e);
    }

    /**
     * Build a kommunicator object in succes mode with a notification.
     *
     * @param titleKey   The key containing the title of the notification.
     * @param messageKey The key containing the message of the notification.
     * @return The kom object to send to the front.
     */
    @Override
    public KommunicatorDto buildSuccessKom(String titleKey, String messageKey) {
        KommunicatorDto kom = new KommunicatorDto(true);

        // Building the success notification.
        KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
        komNotif.setTitle(messageManager.getMessage(titleKey));
        komNotif.setMessage(messageManager.getMessage(messageKey));
        komNotif.setType(NotificationTypeEnum.SUCCESS.getStatus());

        kom.addNotification(komNotif);

        return kom;
    }

    private KommunicatorDto buildKomFromMzkException(MzkException e) {
        // The application is in a error state.
        KommunicatorDto kom = new KommunicatorDto(false);

        // Building the error from the exception.
        KommunicatorNotificationDto komNotif = new KommunicatorNotificationDto();
        komNotif.setTitle(messageManager.getMessage(e.getTitleKey()));
        komNotif.setMessage(messageManager.getMessage(e.getMessageKey()));
        komNotif.setType(NotificationTypeEnum.ERROR.getStatus());

        kom.addNotification(komNotif);

        return kom;
    }
}
