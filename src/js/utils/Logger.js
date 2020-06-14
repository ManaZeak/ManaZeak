'use strict';


class Logger {


  /** @summary <h1>Logger system with feedback</h1>
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>Singleton class, Raise both a log and a user feeback depending on front/*.json files
   * (all severity/key/value mut figure in it). The class also logs TypeErrors in JavaScript</blockquote> */
  constructor(options) {
    if (!!Logger.instance) {
      return Logger.instance;
    }

    Logger.instance = this;
    this._verbose = false;
    if (options.verbose !== undefined && typeof options.verbose === 'boolean') {
      this._verbose = options.verbose;
    }

    this._trace = false;
    if (options.trace !== undefined && typeof options.trace === 'boolean') {
      this._trace = options.trace;
    }

    this._cssRules = {
      info: '',
      warning: '',
      error: ''
    };
    // Those value needs to match the ones in ***.scss for info, warning and error
    this._cssRules.info = 'color: rgb(44, 44, 48); font-weight: bold;';
    this._cssRules.warning = 'color: rgb(44, 44, 48); font-weight: bold;';
    this._cssRules.error = 'color: rgb(255, 0, 48); font-weight: bold;';

    return this;
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @method
   * @name _getCallerName
   * @private
   * @memberof Logger
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Get caller function name depending on given browser
   * @param {object} browsers - Contains a browser list associated with a boolean to know which browser is in use
   * @returns {string} The caller function name */
  _getCallerName(browsers) {
    // Original code from: https://gist.github.com/irisli/716b6dacd3f151ce2b7e
    let caller = (new Error()).stack; // Create error and get its call stack

    if (browsers.firefox) {
      caller = caller.split('\n')[2]; // Get who called raise (0 = this, 1 = raise, 2 = raise caller)
      caller = caller.replace(/\@+/, ' ('); // Change `@` to `(`
      caller += ')';
    } else if (browsers.chrome) {
      caller = caller.split('\n')[3]; // Get who called raise (0 = this, 1 = raise, 2 = raise caller)
      caller = caller.replace(/^Error\s+/, ''); // Remove Chrome `Error` string
      caller = caller.replace(/^\s+at./, ''); // Remove Chrome `at` string
    }

    return `Raised from function ${caller}`;
  }


  //  ------------------------------------------------------------------------------------------------//
  //  --------------------------------------  RAISING ERROR  ---------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /** @method
   * @name raise
   * @public
   * @memberof Logger
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Register a custom event using a name and a callback
   * @param {object} options - The error options
   * @param {string} options.code - The error key value in front/*.json "errors" object
   * @param {boolean} [options.frontend=false] - The event string identifier (use specific names) */
  raise(options) {
    let severity = '';
    let title = '';
    let message = '';

    if (mzk.lang.errors.frontend[options.code] === undefined && mzk.lang.errors.backend[options.code] === undefined) { // JavaScript scripting error
      const filename = options.code.fileName.match(/\/([^\/]+)\/?$/)[1];
      severity = 'error';
      title = `Error in JavaScript source code`;
      message = `${options.code.name} because ${options.code.message} in file ${filename} (${options.code.lineNumber}:${options.code.columnNumber})`;
    } else if (options.frontend) {
      severity = mzk.lang.errors.frontend[options.code].severity;
      title = mzk.lang.errors.frontend[options.code].title;
      message = mzk.lang.errors.frontend[options.code].message;
    } else {
      severity = mzk.lang.errors.backend[options.code].severity;
      title = mzk.lang.errors.backend[options.code].title;
      message = mzk.lang.errors.backend[options.code].message;
    }

    Notification.new({
      type: severity,
      title: title,
      message: message
    });

    if (this._verbose) {
      const browser = {
        firefox: /firefox/i.test(navigator.userAgent),
        chrome: /chrome/i.test(navigator.userAgent) && /google inc/i.test(navigator.vendor) // Test vendor to avoid false positive
      };

      options.code = 'warn'; // To access console property easily (see console[type] call), init to warn ince console.warning doesn't exists (console.warn())
      const outputString = `%c${message}\n${this._getCallerName(browser)}`;
      console.groupCollapsed(`${severity.toUpperCase()} : ${title} (Logger.js)`);

      if (severity !== 'warning') {
        options.code = severity;
      }

      console[options.code](outputString, this._cssRules[severity]); // Apply type and severity to build console call

      if (this._trace && severity !== 'error' && (browser.firefox || (browser.chrome && severity !== 'warning'))) {
        console.trace();
      }

      console.groupEnd();
    }
  }


}


export default Logger;
