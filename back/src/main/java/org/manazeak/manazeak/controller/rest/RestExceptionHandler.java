package org.manazeak.manazeak.controller.rest;

import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.exception.MzkFrontNotificationException;
import org.manazeak.manazeak.exception.MzkObjectNotFoundException;
import org.manazeak.manazeak.exception.MzkRestException;
import org.manazeak.manazeak.exception.MzkSecurityException;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * This template is used to handle the exception during the usage of the rest controllers.
 */
@RestControllerAdvice
public class RestExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(RestExceptionHandler.class);
    private final KommunicatorService kommunicatorService;

    public RestExceptionHandler(KommunicatorService kommunicatorService) {
        this.kommunicatorService = kommunicatorService;
    }

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
        LOG.error("Error encountered during processing the client request.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkSecurityException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleMzkSecurityException(MzkSecurityException e) {
        LOG.error("Security error !", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkFrontNotificationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleMzkRuntimeException(MzkFrontNotificationException e) {
        // Building an error message from the information of the exception.
        LOG.error("Error encountered during processing the client request.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }

    @ExceptionHandler(MzkObjectNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public KommunicatorDto handleElementNotFoundException(MzkObjectNotFoundException e) {
        // Building an error message from the exception.
        LOG.error("Object not found in the database.", e);
        return kommunicatorService.buildKommunicatorFromException(e);
    }
}
