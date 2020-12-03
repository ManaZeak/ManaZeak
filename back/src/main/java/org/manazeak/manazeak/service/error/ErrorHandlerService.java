package org.manazeak.manazeak.service.error;

import org.manazeak.manazeak.constant.error.ErrorEnum;
import org.manazeak.manazeak.exception.MzkRestException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * Handle the errors of the controllers.
 */
public interface ErrorHandlerService {

    /**
     * Check if there is validation errors and throw an exception if there is some errors.
     *
     * @param result the result of the field validation.
     */
    void handleValidationErrors(BindingResult result);

    /**
     * Creates a rest exception when the a field validation wasn't ok.
     *
     * @param errors the errors of the validator.
     */
    void generateRestErrorFromValidationError(Iterable<FieldError> errors) throws MzkRestException;

    /**
     * Creates a rest exception with a list of {@link ErrorEnum}.
     *
     * @param errors the errors that needs to be send to the user.
     */
    void generateRestErrorFromErrorEnum(ErrorEnum... errors);

}
