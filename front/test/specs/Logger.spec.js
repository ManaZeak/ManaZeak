import Logger from '../../js/utils/Logger.js'


// Working component, must be delete after each test because of singleton
let AppLogger = null;
const errorValue = {
  "severity": "error",
  "title": "Test error",
  "message": "Do we have to say something here ?"
};
const warningValue = {
  "severity": "warning",
  "title": "Test warning",
  "message": "Do we have to say something here ?"
};
const infoValue = {
  "severity": "info",
  "title": "Test warning",
  "message": "Do we have to say something here ?"
};
const successValue = {
  "severity": "success",
  "title": "Test warning",
  "message": "Do we have to say something here ?"
};
const error = {
  "TEST_ERROR": errorValue,
  "TEST_WARNING": warningValue,
  "TEST_INFO": infoValue,
  "TEST_SUCCESS": successValue
};
const notification = {
  new: (severity, title, message) => { /*console.log('Notification.new called');*/ }
};
const browsers = {
  firefox: /firefox/i.test(navigator.userAgent),
  chrome: /chrome/i.test(navigator.userAgent) && /google inc/i.test(navigator.vendor)
};


describe('Logger unit test', () => {


  it('Component construction with no arguments', done => {
    AppLogger = new Logger();
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component proper construction
    expect(AppLogger._errors).toEqual({});
    expect(AppLogger._notification).toEqual(null);
    expect(AppLogger._log).toEqual(true);
    expect(AppLogger.version).toEqual('1.1.0');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Component construction with custom error', done => {
    AppLogger = new Logger({
      errors: error
    });
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component proper construction
    expect(AppLogger._errors).toEqual(error);
    expect(AppLogger._notification).toEqual(null);
    expect(AppLogger._log).toEqual(true);
    expect(AppLogger.version).toEqual('1.1.0');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Component construction with notification component', done => {
    AppLogger = new Logger({
      notification: notification
    });
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component proper construction
    expect(AppLogger._errors).toEqual({});
    expect(AppLogger._notification).toEqual(notification);
    expect(AppLogger._log).toEqual(true);
    expect(AppLogger.version).toEqual('1.1.0');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Component construction without log', done => {
    AppLogger = new Logger({
      log: false
    });
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component proper construction
    expect(AppLogger._errors).toEqual({});
    expect(AppLogger._notification).toEqual(null);
    expect(AppLogger._log).toEqual(false);
    expect(AppLogger.version).toEqual('1.1.0');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Component construction for singleton pattern', done => {
    AppLogger = new Logger();
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component proper construction
    expect(AppLogger._errors).toEqual({});
    expect(AppLogger._notification).toEqual(null);
    expect(AppLogger._log).toEqual(true);
    expect(AppLogger.version).toEqual('1.1.0');
    // Reinstantiation, will not update any properties
    AppLogger = new Logger({
      errors: error,
      notification: notification,
      log: false
    });
    // Component existence
    expect(AppLogger).not.toEqual(undefined);
    expect(AppLogger).not.toEqual(null);
    // Component same set of argument as first instantiation
    expect(AppLogger._errors).toEqual({});
    expect(AppLogger._notification).toEqual(null);
    expect(AppLogger._log).toEqual(true);
    expect(AppLogger.version).toEqual('1.1.0');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  /* No need to test destroy as if it didn't worked, previous test would have failed. */


  it('Private method _buildErrorInfo', done => {
    const emptyError = {
      severity: '',
      title: '',
      message: ''
    };
    const jsError = {
      severity: 'error',
      title: 'JavaScript error',
      message: 'Me is not defined in file'
    };
    const unexpectedError = {
      severity: 'error',
      title: 'Unexpected error ZEAZ',
      message: 'The error object sent to Logger.raise() is neither a JavaScript error nor a custom error (with severity, title and message).'
    };
    AppLogger = new Logger({
      errors: error
    });
    // No arguments provided
    expect(AppLogger._buildErrorInfo()).toEqual(emptyError);
    // Custom error retrieved
    expect(AppLogger._buildErrorInfo('TEST_ERROR')).toEqual(errorValue);
    // Custom error not retrieved
    expect(AppLogger._buildErrorInfo('ZEAZ')).toEqual(unexpectedError);
    try { new Me(); } catch (err) { // Js error
      const localError = AppLogger._buildErrorInfo(err);
      expect(localError.severity).toEqual(jsError.severity);
      expect(localError.title).toEqual(jsError.title);
      expect(localError.message.indexOf(jsError.message)).not.toEqual(-1);
    }
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _logErrorToNotification', done => {
    AppLogger = new Logger({
      notification: notification
    });
    spyOn(notification, 'new').and.callThrough();
    // With notification existing, proper arguments
    AppLogger._logErrorToNotification({
      severity: 'success',
      title: 'Great success!',
      message: 'That unit test went pretty well!'
    });
    expect(notification.new).toHaveBeenCalledWith({
      type: 'success',
      title: 'Great success!',
      message: 'That unit test went pretty well!'
    });
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _logErrorToNotification with wrong arguments', done => {
    AppLogger = new Logger();
    // No argument provided and no notification component
    spyOn(notification, 'new').and.callThrough();
    AppLogger._logErrorToNotification();
    expect(notification.new).not.toHaveBeenCalled();
    AppLogger.destroy();
    AppLogger = null;
    // With notification existing, without argument
    AppLogger = new Logger({
      notification: notification
    });
    AppLogger._logErrorToNotification();
    expect(notification.new).not.toHaveBeenCalled();
    // With notification existing, with invalid arguments
    AppLogger._logErrorToNotification({
      notExistingKey: 'TEST'
    });
    expect(notification.new).toHaveBeenCalledWith({
      type: 'error',
      title: 'Can\'t get error info',
      message: 'Call for new notification wasn\'t made with arguments'
    });
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _logErrorToConsole', done => {
    AppLogger = new Logger();
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _logErrorToConsole with wrong arguments', done => {
    AppLogger = new Logger();
    spyOn(console, 'groupCollapsed').and.callThrough();
    spyOn(console, 'groupEnd').and.callThrough();
    spyOn(console, 'log').and.callThrough();
    spyOn(console, 'info').and.callThrough();
    spyOn(console, 'warn').and.callThrough();
    spyOn(console, 'error').and.callThrough();
    AppLogger._logErrorToConsole();
    expect(console.groupCollapsed).not.toHaveBeenCalled();
    expect(console.groupEnd).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _getCallerName', done => {
    AppLogger = new Logger();
    // Firefox
    if (browsers.firefox) {
      expect(AppLogger._getCallerName({ chrome: true }).indexOf('Raised from function')).not.toEqual(-1);
    } else if (browsers.chrome) {
      expect(AppLogger._getCallerName({ chrome: true }).indexOf('Raised from function')).not.toEqual(-1);
    }
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Private method _getCallerName with wrong arguments', done => {
    AppLogger = new Logger();
    // No argument provided
    expect(AppLogger._getCallerName()).toEqual('Argument error, unable to get the caller name on this raise');
    // Wrong type argument
    expect(AppLogger._getCallerName('Not a string')).toEqual('Argument error, unable to get the caller name on this raise');
    // Unsupported browser
    expect(AppLogger._getCallerName({ SaFArI: true })).toEqual('Unsupported browser to get the caller name from');
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


  it('Public method raise', done => {
    AppLogger = new Logger({
      errors: error
    });
    spyOn(AppLogger, '_buildErrorInfo').and.callThrough();
    spyOn(AppLogger, '_logErrorToNotification').and.callThrough();
    spyOn(AppLogger, '_logErrorToConsole').and.callThrough();
    spyOn(console, 'log').and.callThrough();
    spyOn(console, 'info').and.callThrough();
    spyOn(console, 'warn').and.callThrough();
    spyOn(console, 'error').and.callThrough();
    // No arguments provided
    AppLogger.raise();
    expect(AppLogger._buildErrorInfo).toHaveBeenCalled();
    expect(AppLogger._logErrorToNotification).toHaveBeenCalled();
    expect(AppLogger._logErrorToConsole).toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    // Javascript error
    AppLogger.raise(new Error('App error'));
    expect(console.error).toHaveBeenCalled();
    // Custom error
    AppLogger.raise("TEST_ERROR");
    expect(console.error).toHaveBeenCalled();
    // Custom warning
    AppLogger.raise("TEST_WARNING");
    expect(console.warn).toHaveBeenCalled();
    // Custom info
    AppLogger.raise("TEST_INFO");
    expect(console.info).toHaveBeenCalled();
    // Custom success
    AppLogger.raise("TEST_SUCCESS");
    expect(console.log).toHaveBeenCalled();
    AppLogger.destroy();
    AppLogger = null;
    done();
  });


});
