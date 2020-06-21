/** Different HTTP status codes that can occur during a request. */
export default Object.freeze({
  OK: 200, // The url worked properly
  NOT_FOUND: 404, // The url wasn't found
  FORBIDDEN: 403, // The url cannot be accessed
  INTERNAL_ERROR: 500 // The server encountered a problem
});
