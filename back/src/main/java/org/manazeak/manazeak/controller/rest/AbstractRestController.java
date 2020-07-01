package org.manazeak.manazeak.controller.rest;

import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * This template is used to handle the exception during the usage of the rest controllers.
 */
@Service
public abstract class AbstractRestController {

    @Autowired
    private MessageSource messageSource;

    /**
     * Handle the MzkRestException of the controller.
     * @param e the exception to handle.
     * @return the response to the front.
     */
    @ExceptionHandler(MzkRestException.class)
    public KommunicatorObject handleException(MzkRestException e){
        // Building a error message from the available information.
        return new KommunicatorObject(false, messageSource.getMessage(e.getMessage(), null,
                LocaleContextHolder.getLocale()));
    }
}
