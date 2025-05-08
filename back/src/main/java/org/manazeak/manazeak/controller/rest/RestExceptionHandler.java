package org.manazeak.manazeak.controller.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.exception.*;
import org.manazeak.manazeak.manager.MessageManager;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * This template is used to handle the exception during the usage of the rest controllers.
 */
@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class RestExceptionHandler {

    private final KommunicatorService kommunicatorService;
    private final MessageManager messageManager;

    /**
     * Handle the MzkRestException of the controller.
     *
     * @param e the exception to handle.
     * @return the response to the front.
     */
    @ExceptionHandler(MzkRestException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleExceptionRestException(MzkRestException e) {
        // Building a error message from the available information.
        log.error("Error encountered during processing the client request.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkSecurityException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleMzkSecurityException(MzkSecurityException e) {
        log.error("Security error !", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkFrontNotificationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleMzkRuntimeException(MzkFrontNotificationException e) {
        // Building an error message from the information of the exception.
        log.error("Error encountered during processing the client request.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkObjectNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleElementNotFoundException(MzkObjectNotFoundException e) {
        // Building an error message from the exception.
        log.error("Object not found in the database.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkRuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleMzkRuntimeException(MzkRuntimeException e) {
        if (e.getNotificationMessage() != null) {
            return e.getNotificationMessage().buildKommunicator(messageManager);
        }
        return new KommunicatorDto(false);
    }
}
