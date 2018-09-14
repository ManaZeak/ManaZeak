class Errors {
  constructor(options) {
    this._verbose = options.verbose === undefined ? false : (typeof options.verbose === 'boolean' ? options.verbose : false);
    this._trace = options.trace === undefined ? false : (typeof options.trace === 'boolean' ? options.trace : false);
    this._cssRules = {
      info: '',
      warning: '',
      error: ''
    }

    // Those value needs to match the ones in ***.scss for info, warning and error
    this._cssRules.info = 'color: rgb(44, 44, 48); font-weight: bold;';
    this._cssRules.warning = 'color: rgb(44, 44, 48); font-weight: bold;';
    this._cssRules.error = 'color: rgb(255, 0, 48); font-weight: bold;';
  }

  raise(code, frontend) {
    let severity = '', title = '', message = '';

    if (mzk.lang.errors.frontend[code] === undefined && mzk.lang.errors.backend[code] === undefined) {
      severity = mzk.lang.errors.frontend.INVALID_ERROR_CODE.severity;
      title = mzk.lang.errors.frontend.INVALID_ERROR_CODE.title;
      message = mzk.lang.errors.frontend.INVALID_ERROR_CODE.message;
    }

    else if (frontend) {
      severity = mzk.lang.errors.frontend[code].severity;
      title = mzk.lang.errors.frontend[code].title;
      message = mzk.lang.errors.frontend[code].message;
    }

    else {
      severity = mzk.lang.errors.backend[code].severity;
      title = mzk.lang.errors.backend[code].title;
      message = mzk.lang.errors.backend[code].message;
    }

    Notification.new({
      type: severity,
      title: title,
      message: message
    });

    if (this._verbose) {
      let browser = {
        firefox: /firefox/i.test(navigator.userAgent),
        chrome: /chrome/i.test(navigator.userAgent) && /google inc/i.test(navigator.vendor) // Test vendor to avoid false positive
      };
      let code = ''; // To access console property easily (see console[type] call)
      let outputString = `%c${message}\n${this._getCallerName(browser)}`;

      console.groupCollapsed(`${severity.toUpperCase()} : ${title} (Error.js)`);

      severity === 'warning' ? code = 'warn' : code = severity; // Since console.warning doesn't exists (console.warn())
      console[code](outputString, this._cssRules[severity]); // Apply type and severity to build console call

      if (this._trace && severity !== 'error') {
        if (browser.firefox || (browser.chrome && severity !== 'warning')) {
          console.trace();
        }
      }

      console.groupEnd();
    }
  }

  _getCallerName(browser) {
    // Original code from: https://gist.github.com/irisli/716b6dacd3f151ce2b7e - Tweaked to fit Errors class needs (only Chrome and Firefox are supported)
    let caller = (new Error()).stack; // Create error and get its call stack

    if (browser.firefox) {
      caller = caller.split('\n')[2]; // Get who called raise (0 = this, 1 = raise, 2 = raise caller)
      caller = caller.replace(/\@+/, ' ('); // Change `@` to `(`
      caller += ')';
    } else if (browser.chrome) {
      caller = caller.split('\n')[3]; // Get who called raise (0 = this, 1 = raise, 2 = raise caller)
      caller = caller.replace(/^Error\s+/, ''); // Remove Chrome `Error` string
      caller = caller.replace(/^\s+at./, ''); // Remove Chrome `at` string
    }

    return `Raised from function ${caller}`;
  }
}

export default Errors;
