package org.manazeak.manazeak.dto;

import java.io.Serializable;

public class DtObject implements Serializable {

    protected boolean done = true;
    protected String errorCode = null;

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
