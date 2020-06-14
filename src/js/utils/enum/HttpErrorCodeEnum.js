/**
 * This class represents the different HTTP error codes that can occur during a request.
 */
const HttpErrorCodeEnum = Object.freeze({
    OK: 200, // The url worked properly
    NOT_FOUND: 404, // The url wasn't found
    FORBIDDEN: 403, // The url cannot be accessed
    INTERNAL_ERROR: 500 // The server encountered a problem
});


export default HttpErrorCodeEnum;
