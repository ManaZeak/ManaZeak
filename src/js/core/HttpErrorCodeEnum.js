/**
 * This class represents the different HTTP error codes that can occur during a request.
 */
const HttpErrorCodeEnum = Object.freeze({
    // The url worked properly.
    OK: 200,
    // The url wasn't found.
    NOT_FOUND: 404,
    // The url cannot be accessed.
    FORBIDDEN: 403,
    // The server encountered a problem
    INTERNAL_ERROR: 500
});

export default HttpErrorCodeEnum;
