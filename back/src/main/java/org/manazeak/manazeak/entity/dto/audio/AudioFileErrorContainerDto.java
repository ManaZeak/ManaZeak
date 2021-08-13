package org.manazeak.manazeak.entity.dto.audio;

import org.manazeak.manazeak.exception.MzkTagException;

import java.util.ArrayList;
import java.util.List;

/**
 * Contain the errors that were encountered during the extraction of the audio file.
 */
public class AudioFileErrorContainerDto {

    /**
     * Contains the list of the errors to be inserted in the database.
     */
    private final List<MzkTagException> errors = new ArrayList<>();

    /**
     * Adding an error into the list of the errors.
     *
     * @param e The encountered error
     */
    public void addError(MzkTagException e) {
        errors.add(e);
    }

    /**
     * Get the list of the errors.
     *
     * @return The list of the errors.
     */
    public List<MzkTagException> getErrors() {
        return errors;
    }
}
