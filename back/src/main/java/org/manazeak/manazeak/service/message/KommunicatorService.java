package org.manazeak.manazeak.service.message;

import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.exception.MzkRuntimeException;

/**
 * Handles the generation of kommunicator objects.
 */
public interface KommunicatorService {

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    KommunicatorDto buildKommunicatorFromException(MzkRestException e);

    /**
     * Build a response for the front when a exception occurred.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front
     */
    KommunicatorDto buildKommunicatorFromException(MzkObjectNotFoundException e);

    /**
     * Build a response for the front when a exception occured.
     *
     * @param e the exception to handle.
     * @return The object that will be send to the front.
     */
    KommunicatorDto buildKommunicatorFromException(MzkRuntimeException e);

    /**
     * Build a kommunicator object in succes mode with a notification.
     *
     * @param titleKey   The key containing the title of the notification.
     * @param messageKey The key containing the message of the notification.
     * @return The kom object to send to the front.
     */
    KommunicatorDto buildSuccessKom(String titleKey, String messageKey);
}
