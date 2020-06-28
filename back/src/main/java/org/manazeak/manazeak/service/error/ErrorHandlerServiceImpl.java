package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.entity.dto.KommunicatorObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.util.Locale;

/**
 * Handle the errors of the controllers.
 */
@Service
public class ErrorHandlerServiceImpl implements ErrorHandlerService{

    /**
     * The object for getting internationalized messages.
     */
    private final MessageSource messageGetter;

    public ErrorHandlerServiceImpl(@Qualifier("messageSource") MessageSource messageGetter) {
        this.messageGetter = messageGetter;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public KommunicatorObject createKommunicatorObjectFromError(Iterable<FieldError> errors, Locale locale) {
        // In this case, we are in a error state, so the status is not done.
        KommunicatorObject response = new KommunicatorObject(false);
        // Adding the errors to the kommunicator object.
        for (FieldError error : errors) {
            response.addError(messageGetter.getMessage(error, locale));
        }
        return response;
    }
}
