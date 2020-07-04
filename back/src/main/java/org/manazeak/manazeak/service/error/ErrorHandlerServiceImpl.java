package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.constant.errors.ErrorEnum;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.i18n.LocaleContextHolder;
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

    public ErrorHandlerServiceImpl(@Lazy @Qualifier("messageSource") MessageSource messageGetter) {
        this.messageGetter = messageGetter;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void generateRestErrorFromException(Iterable<FieldError> errors, Locale locale) throws MzkRestException {
        // Generating the exception.
        MzkRestException exception = new MzkRestException();
        // Adding the errors to the exception.
        for (FieldError error : errors) {
            exception.addMessage(messageGetter.getMessage(error, locale));
        }
        throw exception;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void generateRestErrorFromErrorEnum(ErrorEnum... errors) throws MzkRestException {
        MzkRestException exception = new MzkRestException();
        Locale userLocale = LocaleContextHolder.getLocale();
        // Adding the errors for the enum.
        for (ErrorEnum error : errors) {
            exception.addMessage(messageGetter.getMessage(error.getKey(), null, userLocale));
        }
        throw exception;
    }
}
