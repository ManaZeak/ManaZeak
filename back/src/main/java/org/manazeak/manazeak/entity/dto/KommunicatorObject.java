package org.manazeak.manazeak.entity.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Object used to communicate with the front.
 */
public class KommunicatorObject implements Serializable {

    protected final boolean done;
    protected final List<String> errors = new ArrayList<>();

    public KommunicatorObject(boolean done) {
        this.done = done;
    }

    public KommunicatorObject(boolean done, String error) {
        this.done = done;
        this.errors.add(error);
    }

    public boolean isDone() {
        return done;
    }


    public List<String> getErrors() {
        return errors;
    }

    /**
     * Add a list of errors to the object.
     * @param errors the errors messages.
     */
    public void addErrors(List<String> errors) {
        this.errors.addAll(errors);
    }

    /**
     * Add one error to the object.
     * @param error the error message.
     */
    public void addError(String error) {
        this.errors.add(error);
    }
}
