'use strict';


class Logger {


  /** @summary <h1>JavaScript logger singleton to handle errors the same way</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>The Logger class provides a singleton object to allow brain dead logging for frontend
   * JavaScript code. Errors can be raised from JavaScript errors (<code>new Error()</code>), or using a custom error
   * format, with a severity, title and message. It is also possible to pass a notification manager object to handle
   * those error either in console and in UI. The recommended manager to use for notification can be found at
   * <a href="https://github.com/ArthurBeaulieu/Notification.js" alt="notification-js">Notification.js</a>. You can
   * otherwise implement you system, but it as to take a type (severity), a title and a message ; for further information,
   * refer to the <code>_logErrorToNotification</code> documentation. For source code, please go to
   * <a href="https://github.com/ArthurBeaulieu/Logger.js" alt="logger-js">Logger.js</a></blockquote>
   * @param {object} [options={}] - The Logger object, not mandatory but it is recommended to provide one for full features
   * @param {object} [options.errors={}] - The custom errors, JSON style, with key being the error name and value being
   * an object with a <code>severity</code>, a <code>title</code> and a <code>message</code> property (all strings)
   * @param {object} [options.notification=null] - The notification manager (to create new notifications when logging)
   * @param {boolean} [options.log=true] - Allow console logging (turn to false in prod environment)
   * @return {object} - The Logger singleton instance */
  constructor(options = {}) {
    // If an instance of Logger already exists, we just return it
    if (!!Logger.instance) {
      return Logger.instance;
    }
    // Set object instance
    Logger.instance = this;
    // Prevent wrong type for arguments, fallback according to attribute utility
    if (typeof options.errors !== 'object') {
      options.errors = {}; // Needs to define to empty object to avoid errors when checking custom errors
    }
    if (typeof options.notification !== 'object') {
      options.notification = null; // Null to ignore the notification step in error raising
    }
    if (typeof options.log !== 'boolean') {
      options.log = true; // No log means... useful component right?
    }
    /** @private
     * @member {object} - The error messages to use in Logger */
    this._errors = options.errors;
    /** @private
     * @member {object} - The custom notification handler, must be able to take type, title and message (at least) */
    this._notification = options.notification;
    /** @private
     * @member {boolean} - Internal logging flag from constructor options, allow to output each event action */
    this._log = options.log;
    /** @public
     * @member {string} - Component version */
    this.version = '1.1.0';
    return this;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Logger
   * @description <blockquote>Logger destructor. Will delete singleton instance and its properties.</blockquote> */
  destroy() {
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
    // Clear singleton instance
    Logger.instance = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  LOGGER JS INTERN METHODS  ------------------------------------------  */
  /*                                                                                                                  */
  /*  These internal methods will build a raised error depending on logging level sent when building this singleton.  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _buildErrorInfo
   * @private
   * @memberof Logger
   * @description <blockquote>This method will be the error properties according to its type. A custom error will
   * take values defined at construction of this singleton. JavaScrip error are parsed to extract title and
   * message properties from stack, with specific handling for Chrome and Firefox.</blockquote>
   * @param {object} error - The error to build info from. Can be a custom error or a standard JavaScript error
   * @return {object} - The error properties ; <code>severity</code>, <code>title</code> and <code>message</code> */
  _buildErrorInfo(error) {
    let severity = '';
    let title = '';
    let message = '';
    if (typeof error === 'object' || typeof error === 'string') {
      // this._errors doesn't contain the error key ; either a Js error or an unknown error
      if (this._errors[error] === undefined) {
        // JavaScript error created with new Error(), that need to contain fileName, message, line and column number
        let filename = '';
        if (error.fileName && error.message && error.lineNumber && error.columnNumber) { // Firefox specific
          filename = error.fileName.match(/\/([^\/]+)\/?$/)[1];
          severity = 'error';
          title = `JavaScript error`;
          message = `${error.message} in file ${filename}:${error.lineNumber}:${error.columnNumber}`;
        } else if (error.message && error.stack) { // Chrome specific
          filename = error.stack.split('\n')[error.stack.split('\n').length - 1].match(/\/([^\/]+)\/?$/)[1];
          severity = 'error';
          title = `JavaScript error`;
          message = `${error.message} in file ${filename}`;
        } else { // Unknown error that do not require any arguments
          severity = 'error';
          title = `Unexpected error ${error}`;
          message = 'The error object sent to Logger.raise() is neither a JavaScript error nor a custom error (with severity, title and message).';
        }
      } else { // Custom error that need to be filled with a severity, a title and a message
        severity = this._errors[error].severity || '';
        title = this._errors[error].title || '';
        message = this._errors[error].message || '';
      }
    }
    // Return error standard properties
    return {
      severity: severity,
      title: title,
      message: message
    };
  }


  /** @method
   * @name _logErrorToNotification
   * @private
   * @memberof Logger
   * @description <blockquote>This method will call for a new notification if a component has been given to this singleton
   * constructor. The component must expose a <code>new()</code> methods that takes as arguments the Logger standard properties ;
   * <code>severity</code>, <code>title</code> and <code>message</code>. If no component has be provided, this method won't do anything.
   * One can find such component <a href="https://github.com/ArthurBeaulieu/Notification.js" alt="notification-js">here</a>.</blockquote>
   * @param {object} errorParameters - The error with Logger standard properties (<code>severity</code>, <code>title</code> and <code>message</code>) */
  _logErrorToNotification(errorParameters) {
    if (this._notification && typeof errorParameters === 'object') {
      this._notification.new({
        type: errorParameters.severity || 'error',
        title: errorParameters.title || 'Can\'t get error info',
        message: errorParameters.message || 'Call for new notification wasn\'t made with arguments'
      });
    }
  }


  /** @method
   * @name _logErrorToConsole
   * @private
   * @memberof Logger
   * @description <blockquote>This method will send error to console if logging has been allowed to this singleton constructor.
   * It takes a Logger standard error (<code>severity</code>, <code>title</code> and <code>message</code>) as argument.
   * It will build a unified output regardless the Chrome or Firefox browser. It enhance <code>console.log</code> and
   * <code>console.info</code> to also display the stack trace in a <code>console.group</code>.</blockquote>
   * @param {object} errorParameters - The error with Logger standard properties (<code>severity</code>, <code>title</code> and <code>message</code>) */
  _logErrorToConsole(errorParameters) {
    if (this._log && typeof errorParameters === 'object') {
      // Missing mandatory arguments
      if (!errorParameters.severity && !errorParameters.title && !errorParameters.message) {
        return;
      }
      /* Colors to use, extracted from Notification.js (https://github.com/ArthurBeaulieu/Notification.js) */
      const colors = {
        success: 'color: rgb(76, 175, 80);',
        info: 'color: rgb(3, 169, 244);',
        warning: 'color: rgb(255, 152, 0);',
        error: 'color: rgb(244, 67, 54);'
      };
      const browsers = {
        firefox: /firefox/i.test(navigator.userAgent),
        chrome: /chrome/i.test(navigator.userAgent) && /google inc/i.test(navigator.vendor)
      };
      // Compute log level from severity, and handle warn and log as warning and success
      let logLevel = errorParameters.severity;
      if (errorParameters.severity === 'warning') {
        logLevel = 'warn';
      } else if (errorParameters.severity === 'success') {
        logLevel = 'log';
      }
      // Create console group with associated style
      console.groupCollapsed(`%c${errorParameters.severity.toUpperCase()}: ${errorParameters.title}`, colors[errorParameters.severity]);
      // Apply type and severity to build console call
      const outputString = `%c${errorParameters.message}\n${this._getCallerName(browsers)}`;
      console[logLevel](outputString, colors[errorParameters.severity]);
      // Only append console trace if severity is not an error (as error already display trace)
      if (errorParameters.severity !== 'error' && errorParameters.severity !== 'warning') {
        console.trace();
      }
      // Close error group in console
      console.groupEnd();
    }
  }


  /** @method
   * @name _getCallerName
   * @private
   * @memberof Logger
   * @description <blockquote>This method will build the caller name as a string, formatted to be easy to
   * read and display in the log output.</blockquote>
   * @param {object} browsers - An object with booleans values for current browser used by session
   * @return {string} - The Logger standard caller name regardless the browser */
  _getCallerName(browsers) {
    // Original code from https://gist.github.com/irisli/716b6dacd3f151ce2b7e
    let caller = (new Error()).stack; // Create error and get its call stack
    // Get last called depending on browser
    if (typeof browsers === 'object') {
      if (browsers.firefox) {
        caller = caller.split('\n')[3]; // Third item is error caller method
        caller = caller.replace(/@+/, ' '); // Change `@` to `(`
      } else if (browsers.chrome) {
        caller = caller.split('\n')[caller.split('\n').length - 2]; // Minus 2 to remove closing parenthesis as well
        // Remove Chrome specific strings to match Firefox look and feel (go ff)
        caller = caller.replace(/^Error\s+/, '');
        caller = caller.replace(/^\s+at./, '');
        caller = caller.replace(/[{()}]/g, '');
      } else {
        return 'Unsupported browser to get the caller name from';
      }
    } else {
      return 'Argument error, unable to get the caller name on this raise';
    }
    // Prepare function name, and replace with anonymous in proper case
    let functionName = caller;
    if (caller.charAt(0) === ' ') { // First char is normally the function name first char. Space means anonymous cross browsers (so far...)
      functionName = `<anonymous>${caller}`;
    }
    // Unified returned value for anonymous/non anonymous methods
    return `Raised from function ${functionName}`;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  LOGGER JS PUBLIC METHOD  -------------------------------------------  */
  /*                                                                                                                  */
  /*  These are the exposed method of Logger component. It allows to raise error that will be displayed in the        */
  /*  console if needed, and displayed in the interface using a notification component. Otherwise, it won't do        */
  /*  anything.                                                                                                       */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name raise
   * @public
   * @memberof Logger
   * @description <blockquote>The raise method will build, according to argument sent to this singleton constructor,
   * a console output and/or a notification for the given error. The input error can be a standard JavaScript error,
   * raised like <code>new Error()</code>, but can also be build using the custom format, using the key of the error
   * as input string. See constructor and example for demonstration.</blockquote>
   * @param {object} error - The error to handle. Can be a custom error or a standard JavaScript error */
  raise(error) {
    // Create error specific values depending on error origin (JavaScript, Custom or Unknown) */
    const errorParameters = this._buildErrorInfo(error);
    /* If any Notification manager exists, use it with error parameters */
    this._logErrorToNotification(errorParameters);
    /* In debug mode, fill the console with error parameters */
    this._logErrorToConsole(errorParameters);
  }


}


export default Logger;
