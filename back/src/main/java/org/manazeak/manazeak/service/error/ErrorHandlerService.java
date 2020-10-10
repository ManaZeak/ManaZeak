package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.constant.error.ErrorEnum;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.validation.FieldError;

import java.util.Locale;

/**
 * Handle the errors of the controllers.
 */
public interface ErrorHandlerService {

    /**
     * Creates a rest exception when the a field validation wasn't ok.
     *
     * @param errors the errors of the validator.
     * @param locale The locale of the user to translate the message correctly.
     */
    void generateRestErrorFromException(Iterable<FieldError> errors, Locale locale) throws MzkRestException;

    /**
     * Creates a rest exception with a list of {@link ErrorEnum}.
     *
     * @param errors the errors that needs to be send to the user.
     */
    void generateRestErrorFromErrorEnum(ErrorEnum... errors) throws MzkRestException;

}
