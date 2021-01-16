/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./front/js/StartSession.js":
/*!**********************************!*\
  !*** ./front/js/StartSession.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_CustomEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/CustomEvents */ "./front/js/utils/CustomEvents.js");
/* harmony import */ var _utils_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Notification */ "./front/js/utils/Notification.js");
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Logger */ "./front/js/utils/Logger.js");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Utils */ "./front/js/utils/Utils.js");
/* harmony import */ var _core_Mzk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/Mzk */ "./front/js/core/Mzk.js");





'use strict';

window.Events = new _utils_CustomEvents__WEBPACK_IMPORTED_MODULE_0__["default"]();
window.Notification = new _utils_Notification__WEBPACK_IMPORTED_MODULE_1__["default"]();
window.Logger = new _utils_Logger__WEBPACK_IMPORTED_MODULE_2__["default"]({
  notification: window.Notification
});
window.Utils = new _utils_Utils__WEBPACK_IMPORTED_MODULE_3__["default"]();

window.mzk = new _core_Mzk__WEBPACK_IMPORTED_MODULE_4__["default"]();
window.mzk.initSession();


/***/ }),

/***/ "./front/js/core/Kom.js":
/*!******************************!*\
  !*** ./front/js/core/Kom.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_enum_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/enum/HttpStatusCode.js */ "./front/js/utils/enum/HttpStatusCode.js");



class Kom {


  /** @summary <h1>Server communication abstraction</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>This class is the main object to deal with when requesting something from the server.<br>
   * It handle all urls calls (<code>GET</code>, <code>POST</code>), treat responses or handle errors using
   * <code>Promise</code>.<br>Because it uses <code>Promise</code>, success and errors are to be handled in the caller
   * function, using <code>.then()</code> and <code>.catch()</code>. To properly deal with <code>POST</code> request,
   * the session must contain a csrf token in cookies. Otherwise, those <code>POST</code> call may fail.</blockquote> */
  constructor() {
    /** @private
     * @member {string} - User session CSRF token to use in POST request */
    this._csrfToken = this._getCsrfCookie();
    /** @private
     * @member {array[]} - Array of HTTP headers to be used in HTTP calls */
    this._headers = this._createRequestHeaders();
    // Check that CSRF token exists and that headers are properly created
    this._checkValidity();
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  CLASS INIT UTILS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _getCsrfCookie
   * @private
   * @memberof Kom
   * @description <blockquote>Extract CSRF token value from client cookies and returns it as a string. Returns an empty
   * string by default. This method is required to be called on construction.</blockquote>
   * @return {string} - The CSRF token string */
  _getCsrfCookie() {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; ++i) {
        // Parse current cookie to extract its properties
        const cookie = cookies[i].split('=');
        if (cookie !== undefined && cookie[0].toLowerCase().includes('srf')) {
          // Found a matching cookie for csrftoken value, return as decoded string
          return decodeURIComponent(cookie[1]);
        }
      }
    }
    // Return empty string by default, POST calls may fail
    return '';
  }


  /** @method
   * @name _createRequestHeaders
   * @private
   * @memberof Kom
   * @description <blockquote>Fills Kom <code>_headers</code> private member array, to use in HTTP requests later on.
   * This method is required to be called on construction.</blockquote>
   * @return {array[]} - The headers array, length 3, to be used in HTTP requests */
  _createRequestHeaders() {
    return [
      ['Content-Type', 'application/json; charset=UTF-8'],
      ['Accept', 'application/json'],
      ['X-XSRF-TOKEN', this._csrfToken]
    ];
  }


  /** @method
   * @async
   * @name _checkValidity
   * @private
   * @memberof Kom
   * @description <blockquote>Check the Kom instance validity to ensure its properties validity.</blockquote> */
  _checkValidity() {
    if (this._csrfToken !== '') {
      if (this._headers.length !== 3) {
        console.error('F_KOM_HEADERS_ERROR');
      }
    } else {
      console.error('F_KOM_NO_CSRF_TOKEN');
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  PRIVATE METHODS  ------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _getErrorCodeFromHTTPStatus
   * @private
   * @memberof Kom
   * @description <blockquote>This method is called whenever a server request didn't went well. In case a request (from
   * any type) fails, its HTTP status code have to be handle in the method, so it returns an error code can be handled
   * in the user interface (with notification, console or else).</blockquote>
   * @param {number} code - The HTTP status code to handle, in supported ones from HttpStatusCode enumeration
   * @return {string} The HTTP status as an error code */
  _getErrorCodeFromHTTPStatus(code) {
    if (code === _utils_enum_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_0__["default"].NOT_FOUND) {
      return 'B_KOM_NOT_FOUND';
    } else if (code === _utils_enum_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_0__["default"].FORBIDDEN) {
      return 'B_KOM_ACCESS_FORBIDDEN';
    } else if (code === _utils_enum_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_0__["default"].INTERNAL_ERROR) {
      return 'B_KOM_INTERNAL_ERROR';
    } else {
      return `B_KOM_UNKNOWN_ERROR`;
    }
  }


  /** @method
   * @async
   * @name _resolveAs
   * @private
   * @memberof Kom
   * @description <blockquote>Generic tool method used by private methods on fetch responses to format output in the provided
   * format. It must be either `json`, `text` or `raw`.</blockquote>
   * @param {String} type - The type of resolution, can be `json`, `text` or `raw`
   * @param {Object} response - The <code>fetch</code> response object
   * @returns {Promise} The request <code>Promise</code>, format response as an object on resolve, as error code string on reject */
  _resolveAs(type, response) {
    return new Promise((resolve, reject) => {
      if (response) {
        if (type === 'raw') { // Raw are made in XMLHttpRequest and need special handling
          if (response.status === _utils_enum_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_0__["default"].OK) {
            resolve(response.responseText);
          } else {
            reject(this._getErrorCodeFromHTTPStatus(response.status));
          }
        } else if (type === 'json' || type === 'text') { // Call are made using fetch API
          if (response[type]) {
            resolve(response[type]());
          } else { // Fallback on standard error handling
            reject(this._getErrorCodeFromHTTPStatus(response.status));
          }
        } else { // Resolution type doesn't exists
          reject('F_KOM_UNSUPPORTED_TYPE');
        }
      } else {
        reject('F_KOM_MISSING_ARGUMENT');
      }
    });
  }


  /** @method
   * @async
   * @name _resolveAsJSON
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by public methods on fetch responses to format output data as JSON to be
   * read in JavaScript code as objects.</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @returns {Promise} The request <code>Promise</code>, format response as an object on resolve, as error code string on reject */
  _resolveAsJSON(response) {
    return this._resolveAs('json', response);
  }


  /** @method
   * @async
   * @name _resolveAsText
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by public methods on fetch responses to format output data as text to be
   * read in JavaScript code as string (mostly to parse HTML templates).</blockquote>
   * @param {Object} response - The <code>fetch</code> response object
   * @returns {Promise} The request <code>Promise</code>, format response as a string on resolve, as error code string on reject */
  _resolveAsText(response) {
    return this._resolveAs('text', response);
  }


  /** @method
   * @async
   * @name _resolveAsRaw
   * @private
   * @memberof Kom
   * @description <blockquote>Tool method used by XmlHTTPRequests to format server response as raw binary data.</blockquote>
   * @param {Object} response - The <code>XmlHTTPRequest</code> response status object
   * @returns {Promise} The request <code>Promise</code>, doesn't format response on resolve, send error code string on reject */
  _resolveAsRaw(response) {
    return this._resolveAs('raw', response);
  }


  _xhrCall(url, verb, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(verb, url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = response => {
        if (response.target.readyState === 4) { // Ready state changed has reach the response state
          this._resolveAsRaw(response.target)
            .then(resolve)
            .catch(reject);
        }
      };
      xhr.onerror = () => {
        reject('F_KOM_XHR_ERROR');
      };
      xhr.send(data);
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------------  HTTP SERVER CALLS METHODS  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @async
   * @name get
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br><code>resolve</code> returns the
   * response as an <code>Object</code>.<br><code>reject</code> returns an error key as a <code>String</code>.
   * It is meant to perform API call to access database through the user interface.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from, in supported back URLs
   * @returns {Promise} The request <code>Promise</code> */
  get(url, resolution = this._resolveAsJSON.bind(this)) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]]) // Content type to JSON
      };

      fetch(url, options)
        .then(resolution)
        .then(resolve)
        .catch(reject);
    });
  }


  /** @method
   * @async
   * @name getText
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br><code>resolve</code> returns the
   * response as a <code>String</code>.<br><code>reject</code> returns an error key as a <code>String</code>. It is
   * meant to perform API call to get HTML templates as string to be parsed as documents/documents fragments.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from, in supported back URLs
   * @returns {Promise} The request <code>Promise</code> */
  getText(url) {
    return this.get(url, this._resolveAsText.bind(this));
  }


  /** @method
   * @async
   * @name getRaw
   * @public
   * @memberof Kom
   * @description <blockquote><code>GET</code> HTTP request using an <code>XMLHttpRequest</code>, with an override
   * mime type hack to pass bytes through unprocessed.<br><code>resolve</code> returns the response as raw binary data.<br><code>reject</code>
   * returns an error code as a <code>String</code>.</blockquote>
   * @param {String} url - The url to fetch raw data from
   * @returns {Promise} The request <code>Promise</code> */
  getRaw(url) {
    return new Promise((resolve, reject) => {
      this._xhrCall(url, 'GET', null)
        .then(resolve)
        .catch(reject);
    });
  }


  /** @method
   * @async
   * @name post
   * @public
   * @memberof Kom
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>Beware that the given options
   * object match the url expectations.<br><code>resolve</code>
   * returns the response as an <code>Object</code>.<br><code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>POST</code> url to fetch data from
   * @param {Object} data - The <code>JSON</code> object that contains <code>POST</code> parameters
   * @returns {Promise} The request <code>Promise</code> */
  post(url, data, resolution = this._resolveAsJSON.bind(this)) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: new Headers(this._headers), // POST needs all previously defined headers
        body: JSON.stringify(data)
      };

      fetch(url, options)
        .then(resolution)
        .then(resolve)
        .catch(reject);
    });
  }


  /** @method
   * @async
   * @name postText
   * @public
   * @memberof Kom
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>Beware that the given options
   * object match the url expectations.<br><code>resolve</code>
   * returns the response as a <code>String</code>.<br><code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>POST</code> url to fetch data from
   * @param {Object} data - The <code>JSON</code> object that contains <code>POST</code> parameters
   * @returns {Promise} The request <code>Promise</code> */
  postText(url, data) {
    return this.post(url, data, this._resolveAsText.bind(this));
  }


  /** @method
   * @async
   * @name postRaw
   * @public
   * @memberof Kom
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>Beware that the given options
   * object match the url expectations.<br><code>resolve</code>, with an override
   * mime type hack to pass bytes through unprocessed.<br><code>resolve</code> returns the response as raw binary data.<br><code>reject</code>
   * returns an error code as a <code>String</code>.</blockquote>
   * @param {String} url - The url to fetch raw data from
   * @param {Object} data - The <code>JSON</code> object that contains <code>POST</code> parameters
   * @returns {Promise} The request <code>Promise</code> */
  postRaw(url, data) {
    return new Promise((resolve, reject) => {
      this._xhrCall(url, 'POST', JSON.stringify(data))
        .then(resolve)
        .catch(reject);
    });
  }


  postForm(url, data) {
    return new Promise((resolve, reject) => {
      // Create virtual form
      const form = document.createElement('FORM');
      form.method = 'POST';
      form.action = url;
      // Declare its virtual fields from sent data
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const hiddenField = document.createElement('INPUT');
          hiddenField.type = 'hidden';
          hiddenField.name = key;
          hiddenField.value = data[key];
          form.appendChild(hiddenField);
        }
      }
      // Build XHR with xsrf token
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('X-XSRF-TOKEN', this._csrfToken);
      // Register the state change event
      xhr.onreadystatechange = response => {
        if (response.target.readyState === 4) { // Ready state changed has reach the response state
          // As specified with backend, response is JSON if success, HTML otherwise
          try {
            // If we can parse as a JSON, everything went fine server side
            const output = JSON.parse(response.target.response);
            resolve(output);
          } catch {
            // Otherwise, the server returns the template with its errors
            reject(response.target.response);
          }
        }
      };
      // XHR error handling
      xhr.onerror = () => {
        reject('F_KOM_XHR_ERROR');
      };
      // Create form data and send it through the XHR
      const formData = new FormData(form);
      xhr.send(formData);
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Kom);


/***/ }),

/***/ "./front/js/core/Mzk.js":
/*!******************************!*\
  !*** ./front/js/core/Mzk.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_UserInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/UserInterface */ "./front/js/view/UserInterface.js");
/* harmony import */ var _Kom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Kom */ "./front/js/core/Kom.js");


'use strict';


class Mzk {


  constructor() {
    this.kom = null;
    this.ui = null;
  }


  initSession() {
    this.kom = new _Kom__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.ui = new _view_UserInterface__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.ui.stopLoading();
  }


  setView(options) {
    this.ui.setSceneView(options).then(() => {
      console.log('view instantiated');
    }).catch(error => {
      Logger.raise(error);
    });
  }


  setModal(options) {
    this.ui.setModal(options).then(() => {
      console.log('modal created');
    }).catch(error => {
      Logger.raise(error);
    });
  }


  getFragment(options) {
    return new Promise((resolve, reject) => {
      this.ui.getFragment(options).then(response => {
        console.log('fragment fetched');
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Mzk);


/***/ }),

/***/ "./front/js/utils/CustomEvents.js":
/*!****************************************!*\
  !*** ./front/js/utils/CustomEvents.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



class CustomEvents {


  /** @summary <h1>JavaScript regular and custom events abstraction</h1>
   * @author Arthur Beaulieu
   * @since June 2020
   * @description <blockquote>The CustomEvents class provides an abstraction of JavaScript event listener, to allow
   * easy binding and removing those events. It also provides an interface to register custom events. This class is
   * meant to be used on all scopes you need ; module or global. Refer to each public method for detailed features.
   * For source code, please go to <a href="https://github.com/ArthurBeaulieu/CustomEvents.js" alt="custom-events-js">
   * https://github.com/ArthurBeaulieu/CustomEvents.js</a></blockquote>
   * @param {boolean} [debug=false] - Debug flag ; when true, logs will be output in JavaScript console at each event */
  constructor(debug = false) {
    // Prevent wrong type for debug
    if (typeof debug !== 'boolean') {
      debug = false;
    }
    /** @private
     * @member {boolean} - Internal logging flag from constructor options, allow to output each event action */
    this._debug = debug;
    /** @private
     * @member {number} - Start the ID incrementer at pseudo random value, used for both regular and custom events */
    this._idIncrementor = (Math.floor(Math.random() * Math.floor(256)) * 5678);
    /** @private
     * @member {any[]} - We store classical event listeners in array of objects containing all their information */
    this._regularEvents = [];
    /** @private
     * @member {object} - We store custom events by name as key, each key stores an Array of subscribed events */
    this._customEvents = {};
    /** @public
     * @member {string} - Component version */
    this.version = '1.1.0';
  }


  /** @method
   * @name destroy
   * @public
   * @memberof CustomEvents
   * @description <blockquote>CustomEvents destructor. Will remove all event listeners and keys in instance.</blockquote> */
  destroy() {
    // Debug logging
    this._raise('log', 'CustomEvents.destroy');
    // Remove all existing eventListener
    this.removeAllEvents();
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  CLASSIC JS EVENTS OVERRIDE  ------------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are made to abstract the event listeners from the JavaScript layer, so you can easily     */
  /*  remove them when done using, without bothering with binding usual business for them. 'addEvent/removeEvent'     */
  /*  method replace the initial ones. 'removeAllEvents' clears all instance event listeners ; nice for destroy       */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name addEvent
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>addEvent</code> method abstracts the <code>addEventListener</code> method to easily
   * remove it when needed, also to set a custom scope on callback.</blockquote>
   * @param {string} eventName - The event name to fire (mousemove, click, context etc.)
   * @param {object} element - The DOM element to attach the listener to
   * @param {function} callback - The callback function to execute when event is realised
   * @param {object} [scope=element] - The event scope to apply to the callback (optional, default to DOM element)
   * @param {object|boolean} [options=false] - The event options (useCapture and else)
   * @returns {number|boolean} - The event ID to use to manually remove an event, false if arguments are invalid */
  addEvent(eventName, element, callback, scope = element, options = false) {
    // Debug logging
    this._raise('log', `CustomEvents.addEvent: ${eventName} ${element} ${callback} ${scope} ${options}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined ||
      element === null || element === undefined ||
      callback === null || callback === undefined) {
      this._raise('error', 'CustomEvents.addEvent: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    const err = () => {
      this._raise('error', 'CustomEvents.addEvent: Wrong type for argument');
    };
    // Test argument validity for further process
    if (typeof eventName !== 'string' || typeof element !== 'object' || typeof callback !== 'function') {
      err();
      return false;
    }
    if ((scope !== null && scope !== undefined) && typeof scope !== 'object') {
      err();
      return false;
    }
    if ((options !== null && options !== undefined) && (typeof options !== 'object' && typeof options !== 'boolean')) {
      err();
      return false;
    }
    // Save scope to callback function, default scope is DOM target object
    callback = callback.bind(scope);
    // Add event to internal array and keep all its data
    this._regularEvents.push({
      id: this._idIncrementor,
      element: element,
      eventName: eventName,
      scope: scope,
      callback: callback,
      options: options
    });
    // Add event listener with options
    element.addEventListener(eventName, callback, options);
    // Post increment to return the true event entry id, then update the incrementer
    return this._idIncrementor++;
  }


  /** @method
   * @name removeEvent
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>removeEvent</code> method abstracts the <code>removeEventListener</code> method to
   * really remove event listeners.</blockquote>
   * @param {number} eventId - The event ID to remove listener from. Returned when addEvent is called
   * @returns {boolean} - The method status ; true for success, false for non-existing event */
  removeEvent(eventId) {
    // Debug logging
    this._raise('log', `Events.removeEvent: ${eventId}`);
    // Missing mandatory arguments
    if (eventId === null || eventId === undefined) {
      this._raise('error', 'CustomEvents.removeEvent: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof eventId !== 'number') {
      this._raise('error', 'CustomEvents.removeEvent: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >= 0 ; --i) {
      // If an event ID match in saved ones, we remove it and update saved listeners
      if (this._regularEvents[i].id === eventId) {
        // Update status code
        statusCode = true; // Found and removed event listener status code (true)
        this._clearRegularEvent(i);
      }
    }
    // Return with status code
    return statusCode;
  }


  /** @method
   * @name removeAllEvents
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Clear all event listener registered through this class object.</blockquote>
   * @returns {boolean} - The method status ; true for success, false for not removed any event */
  removeAllEvents() {
    // Debug logging
    this._raise('log', 'CustomEvents.removeAllEvents');
    // Returned value
    let statusCode = false; // Didn't removed any status code by default (false)
    // Flag to know if there was any previously stored event listeners
    const hadEvents = (this._regularEvents.length > 0);
    // Iterate over saved listeners, reverse order for proper splicing
    for (let i = (this._regularEvents.length - 1); i >= 0; --i) {
      this._clearRegularEvent(i);
    }
    // If all events where removed, update statusCode to success
    if (this._regularEvents.length === 0 && hadEvents) {
      // Update status code
      statusCode = true; // Found and removed all events listener status code (true)
    }
    // Return with status code
    return statusCode;
  }


  /** @method
   * @name _clearRegularEvent
   * @private
   * @memberof CustomEvents
   * @description <blockquote><code>_clearRegularEvent</code> method remove the saved event listener for a
   * given index in regularEvents array range.</blockquote>
   * @param {number} index - The regular event index to remove from class attributes
   * @return {boolean} - The method status ; true for success, false for not cleared any event */
  _clearRegularEvent(index) {
    // Debug logging
    this._raise('log', `CustomEvents._clearRegularEvent: ${index}`);
    // Missing mandatory arguments
    if (index === null || index === undefined) {
      this._raise('error', 'CustomEvents._clearRegularEvent: Missing mandatory argument');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof index !== 'number') {
      this._raise('error', 'CustomEvents._clearRegularEvent: Wrong type for argument');
      return false;
    }
    // Check if index match an existing event in attributes
    if (this._regularEvents[index]) {
      // Remove its event listener and update regularEvents array
      const evt = this._regularEvents[index];
      evt.element.removeEventListener(evt.eventName, evt.callback, evt.options);
      this._regularEvents.splice(index, 1);
      return true;
    }

    return false;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  CUSTOM JS EVENTS  -----------------------------------------------  */
  /*                                                                                                                  */
  /*  The three following methods (subscribe, unsubscribe, publish) are designed to reference an event by its name    */
  /*  and handle as many subscriptions as you want. When subscribing, you get an ID you can use to unsubscribe your   */
  /*  event later. Just publish with the event name to callback all its registered subscriptions.                     */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name subscribe
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Subscribe method allow you to listen to an event and react when it occurs.</blockquote>
   * @param {string} eventName - Event name (the one to use to publish)
   * @param {function} callback - The callback to execute when event is published
   * @param {boolean} [oneShot=false] - One shot : to remove subscription the first time callback is fired
   * @returns {number|boolean} - The event id, to be used when manually unsubscribing */
  subscribe(eventName, callback, oneShot = false) {
    // Debug logging
    this._raise('log', `CustomEvents.subscribe: ${eventName} ${callback} ${oneShot}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined ||
      callback === null || callback === undefined) {
      this._raise('error', 'CustomEvents.subscribe', 'Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    const err = () => {
      this._raise('error', 'CustomEvents.subscribe: Wrong type for argument');
    };
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      err();
      return false;
    }
    if ((oneShot !== null && oneShot !== undefined) && typeof oneShot !== 'boolean') {
      err();
      return false;
    }
    // Create event entry if not already existing in the registered events
    if (!this._customEvents[eventName]) {
      this._customEvents[eventName] = []; // Set empty array for new event subscriptions
    }
    // Push new subscription for event name
    this._customEvents[eventName].push({
      id: this._idIncrementor,
      name: eventName,
      os: oneShot,
      callback: callback
    });
    // Post increment to return the true event entry id, then update the incrementer
    return this._idIncrementor++;
  }


  /** @method
   * @name unsubscribe
   * @public
   * @memberof CustomEvents
   * @description <blockquote>Unsubscribe method allow you to revoke an event subscription from its string name.</blockquote>
   * @param {number} eventId - The subscription id returned when subscribing to an event name
   * @returns {boolean} - The method status ; true for success, false for non-existing subscription **/
  unsubscribe(eventId) {
    // Debug logging
    this._raise('log', `CustomEvents.unsubscribe: ${eventId}`);
    // Missing mandatory arguments
    if (eventId === null || eventId === undefined) {
      this._raise('error', 'CustomEvents.unsubscribe: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory)
    if (typeof eventId !== 'number') {
      this._raise('error', 'CustomEvents.unsubscribe: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Reverse events iteration to properly splice without messing with iteration order
    for (let i = (keys.length - 1); i >= 0; --i) {
      // Get event subscriptions
      const subs = this._customEvents[keys[i]];
      // Iterate over events subscriptions to find the one with given id
      for (let j = 0; j < subs.length; ++j) {
        // In case we got a subscription for this events
        if (subs[j].id === eventId) {
          // Debug logging
          this._raise('log', `CustomEvents.unsubscribe: subscription found\n`, subs[j], `\nSubscription n°${eventId} for ${subs.name} has been removed`);
          // Update status code
          statusCode = true; // Found and unsubscribed status code (true)
          // Remove subscription from event Array
          subs.splice(j, 1);
          // Remove event name if no remaining subscriptions
          if (subs.length === 0) {
            delete this._customEvents[keys[i]];
          }
          // Break since id are unique and no other subscription can be found after
          break;
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /** @method
   * @name unsubscribeAllFor
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>unsubscribeAllFor</code> method clear all subscriptions registered for given event name.</blockquote>
   * @param {string} eventName - The event to clear subscription from
   * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  unsubscribeAllFor(eventName) {
    // Debug logging
    this._raise('log', `CustomEvents.unsubscribeAllFor: ${eventName}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined) {
      this._raise('error', 'CustomEvents.unsubscribeAllFor: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    if (typeof eventName !== 'string') {
      this._raise('error', 'CustomEvents.unsubscribeAllFor: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Iterate through custom event keys to find matching event to remove
    for (let i = 0; i < keys.length; ++i) {
      if (keys[i] === eventName) {
        // Get event subscriptions
        const subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id, reverse iteration to properly splice without messing with iteration order
        for (let j = (subs.length - 1); j >= 0; --j) {
          // Update status code
          statusCode = true; // Found and unsubscribed all status code (true)
          // Remove subscription from event Array
          subs.splice(j, 1);
          // Remove event name if no remaining subscriptions
          if (subs.length === 0) {
            delete this._customEvents[keys[i]];
          }
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /** @method
   * @name publish
   * @public
   * @memberof CustomEvents
   * @description <blockquote><code>Publish</code> method allow you to fire an event by name and trigger all its subscription by callbacks./blockquote>
   * @param {string} eventName - Event name (the one to use to publish)
   * @param {object} [data=undefined] - The data object to sent through the custom event
   * @returns {boolean} - The method status ; true for success, false for non-existing event **/
  publish(eventName, data = null) {
    // Debug logging
    this._raise('log', `CustomEvents.publish: ${eventName} ${data}`);
    // Missing mandatory arguments
    if (eventName === null || eventName === undefined) {
      this._raise('error', 'CustomEvents.publish: Missing mandatory arguments');
      return false;
    }
    // Prevent wrong type for arguments (mandatory and optional)
    if (typeof eventName !== 'string' || (data !== undefined && typeof data !== 'object')) {
      this._raise('error', 'CustomEvents.publish: Wrong type for argument');
      return false;
    }
    // Returned value
    let statusCode = false; // Not found status code by default (false)
    // Save event keys to iterate properly on this._events Object
    const keys = Object.keys(this._customEvents);
    // Iterate over saved custom events
    for (let i = 0; i < keys.length; ++i) {
      // If published name match an existing events, we iterate its subscriptions. First subscribed, first served
      if (keys[i] === eventName) {
        // Update status code
        statusCode = true; // Found and published status code (true)
        // Get event subscriptions
        const subs = this._customEvents[keys[i]];
        // Iterate over events subscriptions to find the one with given id
        // Reverse subscriptions iteration to properly splice without messing with iteration order
        for (let j = (subs.length - 1); j >= 0; --j) {
          // Debug logging
          this._raise('log', `CustomEvents.publish: fire callback for ${eventName}, subscription n°${subs[j].id}`, subs[j]);
          // Fire saved callback
          subs[j].callback(data);
          // Remove oneShot listener from event entry
          if (subs[j].os) {
            // Debug logging
            this._raise('log', 'CustomEvents.publish: remove subscription because one shot usage is done');
            subs.splice(j, 1);
            // Remove event name if no remaining subscriptions
            if (subs.length === 0) {
              delete this._customEvents[keys[i]];
            }
          }
        }
      }
    }
    // Return with status code
    return statusCode;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  COMPONENT UTILS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _raise
   * @private
   * @memberof CustomEvents
   * @description <blockquote>Internal method to abstract console wrapped in debug flag./blockquote>
   * @param {string} level - The console method to call
   * @param {string} errorValue - The error value to display in console method **/
  _raise(level, errorValue) {
    if (this._debug) {
      console[level](errorValue);
    }
  }


}


/* harmony default export */ __webpack_exports__["default"] = (CustomEvents);


/***/ }),

/***/ "./front/js/utils/DragElement.js":
/*!***************************************!*\
  !*** ./front/js/utils/DragElement.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DragElement {


  /** @summary <h1>Make any DOM element draggable</h1>
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This class will make any DOM element draggable, and attach specific data on it that can be
   * used on drop (see DropElement class). It handle both the desktop and the mobile behavior. It must be used with a
   * DropElement class for perfect compatibility!</blockquote>
   * @param {object} options - The element to drag options
   * @param {object} options.target - The element to make draggable
   * @param {string} options.data - The data to attach to the drag event, that will be retrieved on drop **/
  constructor(options) {
    /** @private
     * @member {object} - The element to make draggable */
    this._target = options.target;
    /** @private
     * @member {object} - The data to attached */
    this._data = options.data;
    /** @private
     * @member {number[]} - The event IDs for all mobile and desktop dragging events */
    this._eventIds = [];
    /** @private
     * @member {boolean} - A flag to know if dragging is occurring in mobile */
    this._touchStarted = false;
    /** @private
     * @member {object} - The target DOM copy for a proper drag animation in mobile */
    this._touchPhantomDom = null;
    // Build DOM elements and subscribe to drag events
    this._buildElements();
    this._events();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will unsubscribe all drag events and remove all properties.</blockquote> **/
  destroy() {
    for (let i = 0; i < this._eventIds.length; ++i) {
      Events.removeEvent(this._eventIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------  DRAGELEMENT INSTANTIATION SEQUENCE  ---------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _buildElements
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will make the target element draggable adding the proper attribute. It will
   * also create a copy of the draggable DOM element and set its style with a fixed position and half its opacity to
   * emulate the desktop drag animation in mobile.</blockquote> **/
  _buildElements() {
    this._touchPhantomDom = this._target.cloneNode(true);
    this._touchPhantomDom.style.position = 'fixed';
    this._touchPhantomDom.style.opacity = '.5';
    this._target.setAttribute('draggable', 'true');
  }


  /** @method
   * @name _events
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will subscribe to drag events, both for desktop and mobile.</blockquote> **/
  _events() {
    this._eventIds.push(Events.addEvent('dragstart', this._target, this._dragStart, this));
    this._eventIds.push(Events.addEvent('touchstart', this._target, this._dragStart, this));
    this._eventIds.push(Events.addEvent('touchmove', this._target, this._dragTouchMove, this));
    this._eventIds.push(Events.addEvent('touchend', this._target, this._dragTouchEnd, this));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  MOBILE AND DESKTOP DRAG EVENTS METHODS  --------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragStart
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the desktop drag start event by attaching the data into the event.
   * On mobile, it will compute the target current position to update the phantom DOM element position. It then attach
   * the initial touch position and finally attach the phantom DOM element next to the target element.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _dragStart(event) {
    if (event.dataTransfer) { // Desktop behavior
      event.dataTransfer.setData('text/plain', JSON.stringify(this._data));
    } else { // Mobile behavior
      event.preventDefault(); // Avoid context to be triggered on touch kept pushed
      this._touchStarted = true;
      // Define style for phantom DIV according to the dragged item style values
      const rect = this._target.getBoundingClientRect();
      const style = window.getComputedStyle(this._target); // Get margin, as they make the position calculus wrong
      const leftMargin = parseInt(style.marginLeft.replace('px', ''));
      const topMargin = parseInt(style.marginTop.replace('px', ''));
      this._touchPhantomDom.style.top = `${rect.top - topMargin}px`;
      this._touchPhantomDom.style.left = `${rect.left - leftMargin}px`;
      this._touchPhantomDom.style.height = `${rect.height}px`;
      this._touchPhantomDom.style.width = `${rect.width}px`;
      // We need to keep track of the initial touch position to properly make the div move under the finger
      this._touchPhantomDom.dataset.startX = event.targetTouches[0].pageX - rect.left + leftMargin;
      this._touchPhantomDom.dataset.startY = event.targetTouches[0].pageY - rect.top + topMargin;
      // Append to DOM parent to have the exact same style without manually copying all the applied rules
      this._target.parentNode.appendChild(this._touchPhantomDom);
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MOBILE DRAG METHODS  ----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragTouchMove
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>On mobile, the dragging must be fully re-implemented as it is not standard. If any drag
   * start event was previously published, the phantom DOM element is moved according to the initial touch position,
   * relative to the event touch position.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchMove(event) {
    if (this._touchStarted === true) {
      this._touchPhantomDom.style.top = `${event.targetTouches[0].pageY - this._touchPhantomDom.dataset.startY}px`;
      this._touchPhantomDom.style.left = `${event.targetTouches[0].pageX - this._touchPhantomDom.dataset.startX}px`;
      // Attach a touch dragging flag to the event, so the DropElement class can know that a dragging event is occurring
      event.touchDragging = true;
    }
  }


  /** @method
   * @name _dragTouchEnd
   * @private
   * @memberof DragElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>On mobile, the dragging must be fully re-implemented as it is not standard. When the user
   * release its finger, we need to remove the phantom DOM element from the tree. The drag event data is attached as a
   * string to the event so it can be retrieved in the DropElement class.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchEnd(event) {
    this._touchStarted = false;
    this._target.parentNode.removeChild(this._touchPhantomDom);
    // Emulated dataTransfer into the event, we must attach at each touchmove so it can be retrieved in DropElement
    event.dataTransfer = {
      getData: type => {
        if (type === 'text/plain') {
          return JSON.stringify(this._data);
        }

        return null;
      }
    };
  }


}


/* harmony default export */ __webpack_exports__["default"] = (DragElement);


/***/ }),

/***/ "./front/js/utils/DropElement.js":
/*!***************************************!*\
  !*** ./front/js/utils/DropElement.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DropElement {


  /** @summary <h1>Make any DOM element drop friendly</h1>
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This class will make any DOM element able to receive drop event. It propose an overlay
   * when the target is hovered with a draggable element. It handle both the desktop and the mobile behavior. It must be
   * used with a DragElement class for perfect compatibility!</blockquote>
   * @param {object} options - The element to drop options
   * @param {object} options.target - The element to allow dropping in
   * @param {function} options.onDrop - The method to call for each drop event **/
  constructor(options) {
    /** @private
     * @member {object} - The element to make allow dropping in */
    this._target = options.target; // Get given target from the DOM
    /** @private
     * @member {function} - The callback function to call on each drop event */
    this._onDropCB = options.onDrop;
    /** @private
     * @member {number[]} - The event IDs for all mobile and desktop dropping events */
    this._eventIds = [];
    /** @private
     * @member {number} - This counter helps to avoid enter/leave events to overlap when target has children */
    this._movementCounter = 0;
    /** @private
     * @member {string} - The transparent border that must be added to avoid weird target resize on hover */
    this._transparentBorder = '';
    // Build DOM elements and subscribe to drag events
    this._buildElements();
    this._events();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will unsubscribe all drop events and remove all properties.</blockquote> **/
  destroy() {
    for (let i = 0; i < this._eventIds.length; ++i) {
      Events.removeEvent(this._eventIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------  DROPELEMENT INSTANTIATION SEQUENCE  ---------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _buildElements
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will define the transparent border style and append this virtual border to the
   * target DOM element.</blockquote> **/
  _buildElements() {
    this._transparentBorder = 'dashed 3px transparent';
    this._target.style.border = this._transparentBorder;
  }


  /** @method
   * @name _events
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will subscribe to drop events, both for desktop and mobile.</blockquote> **/
  _events() {
    this._eventIds.push(Events.addEvent('dragenter', this._target, this._dragEnter, this));
    this._eventIds.push(Events.addEvent('dragover', this._target, this._dragOver, this));
    this._eventIds.push(Events.addEvent('dragleave', this._target, this._dragLeave, this));
    this._eventIds.push(Events.addEvent('drop', this._target, this._drop, this));
    this._eventIds.push(Events.addEvent('touchmove', document.body, this._dragTouchOver, this));
    this._eventIds.push(Events.addEvent('touchend', document.body, this._dragTouchEnd, this));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------  DESKTOP DROP EVENTS METHODS  --------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragEnter
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the entering of a dragged div over the target DOM element. When
   * the target DOM element is hovered, a dashed border is made visible, replacing the transparent one to notify the
   * user that the dragged div can be dropped.</blockquote>
   * @param {object} event - The mouse event **/
  _dragEnter(event) {
    this._eventBehavior(event);
    ++this._movementCounter;
    this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
  }


  /** @method
   * @name _dragOver
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the dragged div hovering the target DOM element.</blockquote>
   * @param {object} event - The mouse event **/
  _dragOver(event) {
    this._eventBehavior(event);
    event.dataTransfer.dropEffect = 'copy';
  }


  /** @method
   * @name _dragLeave
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the event that is fired when the hovered div leaves the target
   * DOM element. It require the movement counter to be equal to zero to restore the transparent border of the target
   * DOM element.</blockquote>
   * @param {object} event - The mouse event **/
  _dragLeave(event) {
    this._eventBehavior(event);
    --this._movementCounter;
    if (this._movementCounter === 0) {
      this._target.style.border = this._transparentBorder;
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MOBILE DROP EVENTS METHODS  --------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _dragTouchOver
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the hovering of a dragged div over the target DOM element. The
   * touch dragging flag is attached to the event in the DropElement class, so we can ensure to only trigger the
   * dragging over event logic when the event is coming after a drag touch has occurred in DropElement.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchOver(event) {
    if (event.touchDragging) { // This flag has been set in DragElement class to know if a touch drag is occurring
      if (this._isTouchEventInTarget(event.targetTouches[0])) { // Mobile equivalent to dragenter
        this._target.style.border = 'dashed 3px rgb(255, 100, 100)';
      } else { // Same for dragleave
        this._target.style.border = this._transparentBorder;
      }
    }
  }


  /** @method
   * @name _dragTouchEnd
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the pre-drop event for mobile devices. The dataTransfer is
   * attached to the event by DragElement class, to recognize a touch ended event that is linked with a dragging in
   * progress. The touch position is then tested to fired the drop method if the touch end occurred on the target DOM
   * element.</blockquote>
   * @param {object} event - The touch event **/
  _dragTouchEnd(event) {
    // Touch event has an emulated dataTransfer element, see DragElement. touched position is held in changedTouches
    if (event.dataTransfer && this._isTouchEventInTarget(event.changedTouches[0])) {
      this._drop(event);
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  MOBILE AND DESKTOP DROP EVENTS METHODS  --------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _drop
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will handle the dropping of a DragElement, to properly read the data it holds
   * and send it to the drop callback provided in constructor.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _drop(event) {
    this._eventBehavior(event);
    this._target.style.border = this._transparentBorder;
    this._onDropCB(JSON.parse(event.dataTransfer.getData('text/plain')));
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  UTILS METHODS  --------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _eventBehavior
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will prevent the default behavior of given event, and will stop its
   * propagation.</blockquote>
   * @param {object} event - The mouse or touch event **/
  _eventBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
  }


  /** @method
   * @name _isTouchEventInTarget
   * @private
   * @memberof DropElement
   * @author Arthur Beaulieu
   * @since December 2020
   * @description <blockquote>This method will compare a touch point to the target position and return true if the
   * touch point is inside the target DOM element.</blockquote>
   * @param {object} touchPosition - The touch event
   * @return {boolean} Do the touch point is included in the target DOM element **/
  _isTouchEventInTarget(touchPosition) {
    const rect = this._target.getBoundingClientRect();
    const inAxisX = touchPosition.pageX >= rect.x && (touchPosition.pageX <= rect.x + rect.width);
    const inAxisY = touchPosition.pageY >= rect.y && (touchPosition.pageY <= rect.y + rect.height);
    return (inAxisX && inAxisY);
  }


}


/* harmony default export */ __webpack_exports__["default"] = (DropElement);


/***/ }),

/***/ "./front/js/utils/Logger.js":
/*!**********************************!*\
  !*** ./front/js/utils/Logger.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



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
        return this._buildJsError(error);
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
   * @name _buildJsError
   * @private
   * @memberof Logger
   * @description <blockquote>Auxiliary method for <code>_buildErrorInfo</code> to handle JavaScript errors</blockquote>
   * @param {object} error - The error to build info from. Must be a standard JavaScript error
   * @return {object} - The error properties ; <code>severity</code>, <code>title</code> and <code>message</code> */
  _buildJsError(error) {
    let severity = '';
    let title = '';
    let message = '';
    let filename = '';
    // JavaScript error created with new Error(), that need to contain fileName, message, line and column number
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
    } else if (error.severity && error.title && error.message) { // User custom error
      severity = error.severity || '';
      title = error.title || '';
      message = error.message || '';
    } else { // Unknown error that do not require any arguments
      severity = 'error';
      title = `Unexpected error ${error}`;
      message = 'The error object sent to Logger.raise() is neither a JavaScript error nor a custom error (with severity, title and message).';
    }

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


/* harmony default export */ __webpack_exports__["default"] = (Logger);


/***/ }),

/***/ "./front/js/utils/Notification.js":
/*!****************************************!*\
  !*** ./front/js/utils/Notification.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Notification {


  /** @summary Create an instance of a notification handler
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build the notification singleton handler that will handle all incoming Notifications
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100] - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N* */
  constructor(options) {
    if (!!Notification.instance) { // GoF Singleton
      return Notification.instance;
    }
    Notification.instance = this;
    // Attributes declaration
    /** @private
     * @member {boolean} - Dismiss all operation in progress flag */
    this._dismissAllLock = false;
    /** @private
     * @member {object} - Notification handler container node */
    this._dom = {};
    /** @private
     * @member {object} - Active notifications object : retrieve a notification using its ID (this._active[ID]) */
    this._active = {};
    /** @private
     * @member {object} - Queue notifications when max active has been reached */
    this._queue = {};
    /** @private
     * @member {object} - Notification handler default values */
    this._default = {};
    /** @private
     * @member {string} - The handler position in viewport - <i>top-left; top-right; bottom-left; bottom-right;</i> */
    this._position = '';
    /** @private
     * @member {string} - The thick border position in the Notification - <i>top; bottom; left; right; none;</i> */
    this._thickBorder = '';
    /** @private
     * @member {number} - The Notification on screen duration in ms */
    this._duration = 0;
    /** @private
     * @member {number} - The fade transition time in ms */
    this._transition = 0;
    /** @private
     * @member {number} - The maximum amount of active Notification */
    this._maxActive = 0;
    /** @public
     * @member {number} - The component version */
    this.version = '1.1.0';
    // Build singleton and attach
    this._init(options);
    // Return singleton
    return this;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Destroy the singleton and detach it from the DOM */
  destroy() {
    document.body.removeChild(this._dom);
    // Delete object attributes
    Object.keys(this).forEach(key => {
      delete this[key];
    });
    // Clear singleton instance
    Notification.instance = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------  NOTIFICATION JS HANDLER CONSTRUCTION METHODS  --------------------------------  */
  /*                                                                                                                  */
  /*  The following methods only concerns the singleton creation. It handle all arguments and will fallback on        */
  /*  default values if any argument doesn't meet its expected value or type.                                         */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _init
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Create the handler DOM element, set default values, test given options and properly add CSS class to the handler
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100]  - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N* */
  _init(options) {
    // Declare options as object if empty
    if (options === undefined) {
      options = {};
    }
    // Create notification main container
    this._dom = document.createElement('DIV'); // Notification handler DOM container
    this._dom.classList.add('notification-container'); // Set proper CSS class
    // Notification.js default values
    this._default = {
      handler: {
        position: 'top-right',
        thickBorder: 'top',
        duration: 5000,
        transition: 200,
        maxActive: 10
      },
      notification: {
        type: 'info',
        message: '',
        title: '',
        iconless: false,
        closable: true,
        sticky: false,
        renderTo: this._dom,
        CBtitle: '',
        callback: null,
        isDimmed: false
      },
      color: {
        success: 'rgb(76, 175, 80)',
        info: 'rgb(3, 169, 244)',
        warning: 'rgb(255, 152, 0)',
        error: 'rgb(244, 67, 54)'
      },
      svgPath: {
        success: 'M12.5 0C5.602 0 0 5.602 0 12.5S5.602 25 12.5 25 25 19.398 25 12.5 19.398 0 12.5 0zm-2.3 18.898l-5.5-5.5 1.8-1.796 3.7 3.699L18.5 7l1.8 1.8zm0 0',
        info: 'M12.504.035a12.468 12.468 0 100 24.937 12.468 12.468 0 000-24.937zM15.1 19.359c-.643.25-1.153.445-1.537.576-.384.134-.825.199-1.333.199-.775 0-1.381-.192-1.813-.57a1.832 1.832 0 01-.642-1.442c0-.227.015-.459.047-.693.03-.24.083-.504.154-.806l.802-2.835c.069-.272.132-.527.182-.77.048-.244.069-.467.069-.668 0-.36-.075-.615-.223-.756-.153-.144-.437-.213-.857-.213-.207 0-.422.036-.639.095a9.914 9.914 0 00-.56.184l.213-.874a19.777 19.777 0 011.51-.549 4.48 4.48 0 011.361-.23c.77 0 1.368.19 1.784.56a1.857 1.857 0 01.626 1.452c0 .122-.012.341-.04.652a4.44 4.44 0 01-.162.856l-.798 2.831a8.133 8.133 0 00-.176.775c-.05.288-.075.51-.075.66 0 .374.082.633.251.771.165.134.458.202.875.202.192 0 .412-.037.66-.1.243-.073.42-.127.531-.18zm-.144-11.483a1.901 1.901 0 01-1.343.518 1.93 1.93 0 01-1.352-.518 1.65 1.65 0 01-.562-1.258 1.688 1.688 0 01.562-1.266 1.914 1.914 0 011.35-.522c.524 0 .975.173 1.345.523a1.673 1.673 0 01.56 1.266 1.65 1.65 0 01-.56 1.257z',
        warning: 'M24.585 21.17L13.774 3.24a1.51 1.51 0 00-2.586 0L.376 21.17a1.51 1.51 0 001.293 2.29h21.623a1.51 1.51 0 001.292-2.29zM12.49 8.714c.621 0 1.146.35 1.146.97 0 1.895-.223 4.618-.223 6.513 0 .494-.541.7-.923.7-.51 0-.94-.208-.94-.701 0-1.894-.223-4.617-.223-6.511 0-.62.51-.971 1.163-.971zm.015 11.734a1.225 1.225 0 01-1.225-1.226c0-.669.525-1.227 1.225-1.227.652 0 1.21.558 1.21 1.227 0 .652-.557 1.225-1.21 1.225z',
        error: 'M12.469.027c-3.332 0-6.465 1.301-8.824 3.653-4.86 4.86-4.86 12.777 0 17.636a12.392 12.392 0 008.824 3.653c3.336 0 6.465-1.301 8.824-3.653 4.863-4.859 4.863-12.777 0-17.636A12.417 12.417 0 0012.469.027zm5.61 18.086a1.137 1.137 0 01-.802.332c-.285 0-.582-.113-.8-.332l-4.008-4.008-4.008 4.008a1.137 1.137 0 01-.8.332c-.286 0-.583-.113-.802-.332a1.132 1.132 0 010-1.605l4.008-4.004L6.86 8.496a1.132 1.132 0 010-1.605 1.127 1.127 0 011.602 0l4.008 4.007 4.008-4.007a1.127 1.127 0 011.601 0c.45.449.45 1.164 0 1.605l-4.004 4.008 4.004 4.004c.45.449.45 1.164 0 1.605zm0 0'
      }
    };
    // Build singleton from options and sanitize them
    this._setOptionsDefault(options);
    this._position = options.position;
    this._thickBorder = options.thickBorder;
    this._duration = options.duration;
    this._transition = options.transition;
    this._maxActive = options.maxActive;
    this._setAttributesDefault();
    // Add position CSS class only after this._position is sure to be a valid value
    this._dom.classList.add(this._position);
    this._attach();
  }


  /** @method
   * @name _setOptionsDefault
   * @private
   * @memberof Notification
   * @summary Set singleton options
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Build the notification singleton according to the user options
   * @param {object} options - The singleton options to set */
  _setOptionsDefault(options) {
    if (options.position === undefined) {
      options.position = this._default.handler.position;
    }

    if (options.thickBorder === undefined) {
      options.thickBorder = this._default.handler.thickBorder;
    }

    if (options.duration === undefined) {
      options.duration = this._default.handler.duration;
    }

    if (options.transition === undefined) {
      options.transition = this._default.handler.transition;
    }

    if (options.maxActive === undefined) {
      options.maxActive = this._default.handler.maxActive;
    }
  }


  /** @method
   * @name _setAttributesDefault
   * @private
   * @memberof Notification
   * @summary Check the notification singleton options validity
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Fallback on default attributes value if the notification singleton options are invalid */
  _setAttributesDefault() {
    if (this._position !== 'top-left' && /* Illegal value for position */
      this._position !== 'top-right' &&
      this._position !== 'bottom-left' &&
      this._position !== 'bottom-right') {
      this._position = this._default.handler.position; // Default value
    }

    if (this._thickBorder !== 'top' && /* Illegal value for thick border */
      this._thickBorder !== 'bottom' &&
      this._thickBorder !== 'left' &&
      this._thickBorder !== 'right' &&
      this._thickBorder !== 'none') {
      this._thickBorder = this._default.handler.thickBorder; // Default value
    }

    if (typeof this._duration !== 'number' || this._duration <= 0) { // Illegal value for duration
      this._duration = this._default.handler.duration; // Default value
    }

    if (typeof this._transition !== 'number' || this._duration < (this._transition * 2) || this._transition <= 0) { // Transition over (duration / 2)
      this._transition = this._default.handler.transition; // Default value for _maxActive
    }

    if (typeof this._maxActive !== 'number' || this._maxActive <= 0) { // Illegal value for maxActive
      this._maxActive = this._default.handler.maxActive; // Default value for _maxActive
    }
  }


  /** @method
   * @name _attach
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Attach the notification handler to the dom using a fragment */
  _attach() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    document.body.appendChild(fragment);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------  NOTIFICATION SPECIFIC METHODS  ----------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods implements notification features. It handle its events, lifecycle depending on its        */
  /*  parameters, its DOM structure, and its animations. The Notification singleton will handle the notification      */
  /*  stacking the in user interface.                                                                                 */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _events
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Handle mouse events for the given notification
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.closable - Make notification closable flag */
  _events(notification) {
    let closeFired = false; // Close fired flag

    // Inner callback functions
    const _unDim = () => { // Undim notification
      if (notification.isDimmed) {
        this._unDim(notification);
      }
    };

    const _close = () => { // Close notification
      if (this._active[notification.id] === undefined) {
        return;
      }

      // Update counter DOM element
      if (notification.requestCount > 1) {
        this._decrementRequestCounter(notification, true);
      }

      // Remove notification element from the DOM tree
      else if (!closeFired) {
        closeFired = true;
        window.clearTimeout(notification.timeoutID); // Clear life cycle timeout
        notification.dom.close.removeEventListener('click', _close); // Avoid error when spam clicking the close button
        this._close(notification);
      }
    };

    const _resetTimeout = () => { // Reset life cycle timeout
      if (this._active[notification.id] === undefined) {
        return;
      }

      if (!closeFired && !notification.isDimmed) { // Only reset timeout if no close event has been fired
        this._resetTimeout(notification);
      }
    };

    // Mouse event listeners
    if (notification.sticky) {
      notification.dom.addEventListener('mouseenter', _unDim.bind(this));
      notification.dom.addEventListener('mouseout', _unDim.bind(this));
    }

    if (notification.closable) {
      notification.dom.addEventListener('click', _close.bind(this));
      notification.dom.close.addEventListener('click', _close.bind(this));
    }

    notification.dom.addEventListener('mouseover', _resetTimeout.bind(this));
  }


  /** @method
   * @name _buildUI
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Builds the DOM element that contains and that adapts to all given options
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {string} notification.type - Error, Warning, Info, Success
   * @param {string} notification.title - Notification title
   * @param {string} notification.message - Notification message
   * @param {boolean} notification.iconless - No icon flag
   * @param {string} notification.thickBorder - Notification border side (override handler side value)
   * @param {boolean} notification.closable - Make notification closable flag
   * @param {boolean} notification.sticky - Make notification sticky flag
   * @param {string} notification.CBtitle - Notification callback title
   * @param {function} notification.callback - Notification callback button
   * @returns {object} Enhanced and ready notification object */
  _buildUI(notification) {
    notification.requestCount = 1;
    notification.totalRequestCount = 1;
    this._buildUIDom(notification);
    this._buildNotificationType(notification);

    if (notification.iconless) {
      notification.dom.message.classList.add('iconless-width');
    }

    notification.dom.text.appendChild(notification.dom.maintitle);
    notification.dom.text.appendChild(notification.dom.message);
    // Add callback button and listener if needed
    if (notification.callback) {
      const callbackButton = document.createElement('BUTTON');
      callbackButton.innerHTML = notification.CBtitle;
      notification.dom.text.appendChild(callbackButton);
      callbackButton.addEventListener('click', () => {
        this._close(notification);
        notification.callback();
      });
    }
    // Fill notification DOM element
    if (!notification.iconless) {
      notification.dom.appendChild(notification.dom.icon);
    }

    notification.dom.appendChild(notification.dom.text);
    // Append close button if needed
    if (notification.closable) {
      notification.dom.appendChild(notification.dom.close);
    }
    // Return final notification
    return notification;
  }


  /** @method
   * @name _buildUIDom
   * @private
   * @memberof Notification
   * @summary Create the Notification DOM tree
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Build all the Notification internal structure
   * @param {object} notification - The notification to create */
  _buildUIDom(notification) {
    // Create notification DOM elements
    notification.dom = document.createElement('DIV');
    notification.dom.icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    notification.dom.iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    notification.dom.text = document.createElement('DIV');
    notification.dom.close = document.createElement('DIV');
    notification.dom.maintitle = document.createElement('H6');
    notification.dom.message = document.createElement('P');
    // Class assignation
    notification.dom.classList.add('notification');
    notification.dom.icon.classList.add('vector-container');
    notification.dom.text.classList.add('text-container');
    notification.dom.close.classList.add('close');
    // Changing border side
    if (notification.thickBorder === 'top') {
      notification.dom.classList.add('top-border');
    } else if (notification.thickBorder === 'bottom') {
      notification.dom.classList.add('bottom-border');
    } else if (notification.thickBorder === 'left') {
      notification.dom.classList.add('left-border');
    } else if (notification.thickBorder === 'right') {
      notification.dom.classList.add('right-border');
    }
    // Text modification
    notification.dom.maintitle.innerHTML = notification.title || '';
    notification.dom.message.innerHTML = notification.message || '';
    notification.dom.close.innerHTML = '&#x2716;';
    // Image vector
    notification.dom.icon.setAttribute('viewBox', '0 0 25 25');
    notification.dom.icon.setAttribute('width', '25');
    notification.dom.icon.setAttribute('height', '25');
    notification.dom.icon.appendChild(notification.dom.iconPath);
  }


  /** @method
   * @name _buildNotificationType
   * @private
   * @memberof Notification
   * @summary Attach proper assets and css
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Fills the Notification icon and class according to its inner type
   * @param {object} notification - The notification to fill */
  _buildNotificationType(notification) {
    // Type specification (title, icon, color)
    if (['success', 'warning', 'error', 'info'].indexOf(notification.type) !== -1){
      notification.dom.classList.add(notification.type);

      if (!notification.iconless) {
        notification.dom.iconPath.setAttribute('fill', this._default.color[notification.type]);
        notification.dom.iconPath.setAttribute('d', this._default.svgPath[notification.type]);
      }
    } else {
      notification.dom.classList.add('info');

      if (!notification.iconless) {
        notification.dom.iconPath.setAttribute('fill', this._default.color.info);
        notification.dom.iconPath.setAttribute('d', this._default.svgPath.info);
      }
    }
  }


  /** @method
   * @name _start
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method to add the new notification to the DOM container, and launch its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification own ID */
  _start(notification) {
    if (Object.keys(this._active).length >= this._maxActive) {
      this._queue[notification.id] = notification;
    } else {
      this._active[notification.id] = notification; // Append the new notification to the _active object

      this._events(notification); // Listen to mouse events on the newly created notification
      this._open(notification); // Open the new notification

      notification.timeoutID = window.setTimeout(() => {
        this._checkCounter(notification); // Check notification request count to act accordingly
      }, notification.duration); // Use Notification master duration
    }
  }


  /** @method
   * @name _open
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Open and add the notification to the container
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element */
  _open(notification) {
    // Reverse insertion when notifications are on bottom
    if (this._position === 'bottom-right' || this._position === 'bottom-left') {
      notification.renderTo.insertBefore(notification.dom, notification.renderTo.firstChild);
    } else {
      notification.renderTo.appendChild(notification.dom);
    }

    notification.opened = Date.now();
    window.setTimeout(() => {
      notification.dom.style.opacity = 1;
    }, 10);
  }


  /** @method
   * @name _close
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Close and remove the notification from the container
   * @param {{id: number}|{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.isClosing - Already closing flag
   * @param {object} notification.dom - Notifiction DOM element
   * @param {object} notification.renderTo - DOM object to render the notification in */
  _close(notification) {
    if (notification.isClosing) { // Avoid double close on a notification (in case dismiss/dismissAll is triggerred when notification is already closing)
      return;
    }

    notification.isClosing = true; // Lock notification to one fadeOut animation
    notification.closed = Date.now();
    notification.effectiveDuration = notification.closed - notification.opened;
    notification.dom.style.opacity = 0;
    window.setTimeout(() => {
      notification.renderTo.removeChild(notification.dom); // Remove this notification from the DOM tree
      delete this._active[notification.id];

      if (Object.keys(this._queue).length > 0) { // Notification queue is not empty
        this._start(this._queue[Object.keys(this._queue)[0]]); // Start first queued notification
        delete this._queue[Object.keys(this._queue)[0]]; // Shift queue object
      } else if (Object.keys(this._active).length === 0) { // Check this._active emptyness
        this._dismissAllLock = false; // Unlock dismissAllLock
      }
    }, 1000); // Transition value set in _notification.scss
  }


  /** @method
   * @name _incrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called when a notification is requested another time
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
  _incrementRequestCounter(notification) {
    ++notification.requestCount; // Increment notification.requestCount

    if (notification.totalRequestCount < notification.requestCount) {
      notification.totalRequestCount = notification.requestCount;
    }

    // Update counter DOM element
    if (notification.requestCount > 1) {
      let valueToDisplay = '∞';
      if (notification.requestCount < 100) {
        valueToDisplay = notification.requestCount;
      }

      if (notification.dom.counter) { // Update existing counter
        notification.dom.counter.innerHTML = valueToDisplay;
      } else { // Create counter DOM element
        notification.dom.counter = document.createElement('DIV');
        notification.dom.counter.classList.add('counter');
        notification.dom.counter.innerHTML = valueToDisplay;
        notification.dom.appendChild(notification.dom.counter);
      }
    }

    // Undim notification if it is a sticky/dimmed one
    if (notification.sticky && notification.isDimmed) {
      this._unDim(notification);
    }
  }


  /** @method
   * @name _decrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called each notification cycle end to update its inner counter
   * @param {{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notification DOM element
   * @param {boolean} force - To force the notification.requestCount decrementation */
  _decrementRequestCounter(notification, force) {
    if (notification.sticky && !force) {
      if (!notification.isDimmed) {
        this._dim(notification);
      }

      return;
    }

    this._resetTimeout(notification);
    --notification.requestCount; // Decrement notification.requestCount

    // Update counter DOM element
    if (notification.requestCount > 1) {
      let valueToDisplay = '∞';
      if (notification.requestCount < 100) {
        valueToDisplay = notification.requestCount;
      }

      notification.dom.counter.innerHTML = valueToDisplay;
    } else { // Remove counter element from the DOM tree
      notification.dom.removeChild(notification.dom.counter);
      delete notification.dom.counter;
    }
  }


  /** @method
   * @name _checkCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method will reset the fadeout/dim timeout or close/dim the notification depending on its requestCount
   * @param {{id: number}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior */
  _checkCounter(notification) {
    // This notification as still more than one cycle to live
    if (notification.requestCount > 1) {
      this._decrementRequestCounter(notification);
    } else { // This notification reached the end of its life cycle
      if (notification.renderTo.contains(notification.dom)) {
        window.clearTimeout(notification.timeoutID);
        if (notification.sticky) { // FadeOut/Dim depending on sticky behavior
          this._dim(notification);
        } else {
          this._close(notification);
        }
      }
    }
  }


  /** @method
   * @name _clearRequestCount
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Method that clear every pending request
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element */
  _clearRequestCount(notification) {
    notification.requestCount = 1;
    notification.dom.removeChild(notification.dom.counter);
    delete notification.dom.counter;
  }


  /** @method
   * @name _resetTimeout
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Use this to reset a notification life cycle, and delay its close event
   * @param {{id: number}|{id: number, dom: Object, requestCount: number, timeoutID: number, sticky: boolean, closable: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.timeoutID - Notification own setTimeout ID */
  _resetTimeout(notification) {
    window.clearTimeout(notification.timeoutID); // Clear previous life cycle
    notification.timeoutID = window.setTimeout(() => {
      this._checkCounter(notification); // Check notification request count to act accordingly
    }, notification.duration); // Use Notification master duration
  }


  /** @method
   * @name _dim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Only useful for sticky notification that dim instead of close at the end of its life cycle
   * @param {{id: number, requestCount: number, dom: Object, timeoutID: number, sticky: boolean}} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
  _dim(notification) {
    const that = this;
    let i = 100;
    (function halfFadeOut() { // Start animation immediatly
      if (i >= 0) {
        notification.dom.style.opacity = i / 100;
        --i;

        if (i === 50 && notification.sticky) { // Opacity has reached 0.51
          notification.dom.style.opacity = 0.5; // Set half transparency on notification
          notification.isDimmed = true; // Update notification dim status
          return; // End function
        }
      }

      window.setTimeout(halfFadeOut, that._transition / 100); // Split animation transition into 100 iterations (50 for real here)
    })();
  }


  /** @method
   * @name _unDim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method when a notification is not inactive anymore
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true) */
  _unDim(notification) {
    const that = this;
    let i = 50;
    (function halfFadeIn() {
      if (i < 100) {
        notification.dom.style.opacity = i / 100;
        ++i;
      } else if (i === 100) {
        notification.dom.style.opacity = 1; // Set full visibility on notification
        notification.isDimmed = false; // Update notification dim status
        that._resetTimeout(notification); // Reset life cycle timeout
        return; // End function
      }

      window.setTimeout(halfFadeIn, that._transition / 100); // Split animation transition into 100 iterations (50 for real here)
    })();
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------  SINGLE NOTIFICATION CONSTRUCTION UTILS METHODS  -------------------------------  */
  /*                                                                                                                  */
  /*  The following methods only concerns a new notification request. It will test the options validity, default to   */
  /*  fallback value if necessary and give the notification a pseudo unique identifier.                               */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _checkNotificationOptionsValidity
   * @private
   * @memberof Notification
   * @summary Check the Notification options validity
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Check a Notification options object against the required parameters.
   * @param {object} options - The notification options to check validity */
  _checkNotificationOptionsValidity(options) {
    // Check for mandatory arguments existence
    if (options === undefined || (options.type === undefined || options.message === undefined)) {
      return false;
    }
    // Check existing message
    if (typeof options.message !== 'string' || options.message.length === 0) {
      return false;
    }
    // Check for unclosable at all notification
    if (options.sticky && options.closable === false) {
      return false;
    }
    // Test Notification inner variables validity
    if (options.type !== 'info' && options.type !== 'success' && options.type !== 'warning' && options.type !== 'error') {
      options.type = this._default.notification.type;
    }
    // Unlock dismissAllLock
    if (this._dismissAllLock) {
      this._dismissAllLock = false;
    }

    return true;
  }


  /** @method
   * @name _setOptionsFallback
   * @private
   * @memberof Notification
   * @summary Set Notification fallback options
   * @author Arthur Beaulieu
   * @since March 2019
   * @description Check a Notification options object and fill it with default value in case they are empty.
   * @param {object} options - The notification options to fill with default value if empty */
  _setOptionsFallback(options) {
    if (options.title === undefined) {
      options.title = this._default.notification.title;
    }

    if (options.duration === undefined) {
      options.duration = this._duration;
    }

    if (options.iconless === undefined) {
      options.iconless = this._default.notification.iconless;
    }

    if (options.thickBorder === undefined) {
      options.thickBorder = this._thickBorder;
    }

    if (options.closable === undefined) {
      options.closable = this._default.notification.closable;
    }

    if (options.sticky === undefined) {
      options.sticky= this._default.notification.sticky;
    }

    if (options.renderTo === undefined) {
      options.renderTo = this._default.notification.renderTo;
    }

    if (options.CBtitle === undefined) {
      options.CBtitle = this._default.notification.CBtitle;
    }

    if (options.callback === undefined) {
      options.callback = this._default.notification.callback;
    }

    if (options.isDimmed === undefined) {
      options.isDimmed = this._default.notification.isDimmed;
    }
  }


  /** @method
   * @name _idGenerator
   * @private
   * @memberof Notification
   * @summary Generate an ID
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Hash the seed to generate an ID
   * @param {string} seed - The seed string to hash
   * @param {number} length - The length of the returned ID */
  _idGenerator(seed, length) {
    /* Original code from:
     * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     * Tweaked to fit Notification class needs
     */
    let hash = 0;
    let character = '';

    if (seed.length === 0 || length > 12) {
      return undefined;
    }

    for (let i = 0; i < seed.length; ++i) {
      character = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash |= 0; // Convert to 32bit integer
    }

    return (Math.abs(hash).toString(36) + '' + Math.abs(hash / 2).toString(36).split('').reverse().join('')).substring(0, length).toUpperCase(); // Here is the twekead line
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------  NOTIFICATION PUBLIC METHODS  -----------------------------------------  */
  /*                                                                                                                  */
  /*  The following methods are the exposed API of the Notification component. It allow to raise standard or custom   */
  /*  notification without bothering their lifecycle, position or other JavaScript expensive implementation.          */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name new
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a notification according to the given options, then append it to notification container.
   * @param {object} options - The notification options object
   * @param {string} options.type - <i>Error; Warning; Info; Success;</i>
   * @param {string} [options.title=options.type] - Notification title
   * @param {string} options.message - Notification message
   * @param {number} [options.duration=handler] - Notification duration (override handler duration value)
   * @param {boolean} [options.iconless=false] - No icon flag
   * @param {string} [options.thickBorder=handler] - Notification border side (override handler side value)
   * @param {boolean} [options.closable=true] - Make notification closable flag
   * @param {boolean} [options.sticky=false] - Make notification sticky flag
   * @param {object} [options.renderTo=handler] - Dom object to render the notification in
   * @param {string} [options.CBtitle=Callback] - Notification callback title
   * @param {function} [options.callback=undefined] - Notification callback button
   * @returns {number} The newly created notification ID */
  new(options) {
    if (this._checkNotificationOptionsValidity(options) === false) {
      console.error('Notification.js : new() options argument object is invalid.');
      return -1;
    }

    this._setOptionsFallback(options);
    // Build notification DOM element according to the given options
    let notification = this._buildUI({
      id: this._idGenerator(`${options.type}${options.message}`, 5), // Generating an ID of 5 characters long from notification mandatory fields
      type: options.type,
      message: options.message,
      title: options.title,
      duration: options.duration,
      iconless: options.iconless,
      thickBorder: options.thickBorder,
      closable: options.closable,
      sticky: options.sticky,
      renderTo: options.renderTo,
      CBtitle: options.CBtitle,
      callback: options.callback,
      isDimmed: options.isDimmed // Only useful if sticky is set to true
    });
    // Create a new notification in the container: No notification with the same ID is already open
    if (!this._active[notification.id]) {
      this._start(notification);
    } else { // Use existing notification: increment request count and reset timeout
      this._resetTimeout(this._active[notification.id]);
      this._incrementRequestCounter(this._active[notification.id]);
      notification = this._active[notification.id]; // Clear local new notification since it already exists in this._active
    }

    return notification.id;
  }


  /** @method
   * @name info
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an info notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  info(options) {
    if (options) {
      options.type = 'info';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for info() method.');
      return null;
    }
  }


  /** @method
   * @name success
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a success notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  success(options) {
    if (options) {
      options.type = 'success';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for success() method.');
      return null;
    }
  }


  /** @method
   * @name warning
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a warning notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  warning(options) {
    if (options) {
      options.type = 'warning';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for warning() method.');
      return null;
    }
  }


  /** @method
   * @name error
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an error notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID */
  error(options) {
    if (options) {
      options.type = 'error';
      return this.new(options);
    } else {
      console.error('Notification.js : No arguments provided for error() method.');
      return null;
    }
  }


  /** @method
   * @name dismiss
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss a specific notification via its ID
   * @param {string} id - The notification ID to dismiss */
  dismiss(id) {
    window.clearTimeout(this._active[id].timeoutID); // Clear notification timeout

    if (this._active[id].requestCount > 1) { // Several request are pending
      this._clearRequestCount(this._active[id]); // Clear all pending request
    }

    this._close(this._active[id]); // Close notification
  }


  /** @method
   * @name dismissAll
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Clear the notification handler from all its active notifications */
  dismissAll() {
    if (!this._dismissAllLock && Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      this._dismissAllLock = true; // dismissAllLock will be unlocked at the last _close() method call
      this._queue = {}; // Clear queue object

      for (const id in this._active) { // Iterate over notifications
        this.dismiss(id);
      }
    }
  }


  /** @method
   * @name dismissType
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss all notifications from a given type
   * @param {string} type - <i>succes; info; warning; error;</i> */
  dismissType(type) {
    if (Object.keys(this._active).length !== 0) { // Check that _dismissAllLock is disable and that there is still notification displayed
      for (const id in this._active) { // Iterate over notifications
        if (this._active[id].type === type) {
          this.dismiss(id);
        }
      }
    }
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Notification);


/***/ }),

/***/ "./front/js/utils/Utils.js":
/*!*********************************!*\
  !*** ./front/js/utils/Utils.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



class Utils {


  constructor() {
    // If an instance of Utils already exists, we just return it
    if (!!Utils.instance) {
      return Utils.instance;
    }
    // Set object instance
    Utils.instance = this;

    return this;
  }


  parseHTMLFragment(htmlString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');
    return dom.body.firstChild;
  }


  removeAllObjectKeys(object) {
    Object.keys(object).forEach(key => {
      delete object[key];
    });
  }


  appendLinkInHead(path) {
    /* Search for existing link with same path */
    let alreadyExists = false;
    for (let i =0; i < document.head.children.length; ++i) {
      const meta = document.head.children[i];
      if (meta.nodeName === 'LINK' && meta.href === `${window.location}${path}`) {
        alreadyExists = true;
        break;
      }
    }
    /* Only append style if not already existing in document header */
    if (!alreadyExists) {
      const link = document.createElement('LINK');
      link.rel = 'stylesheet';
      link.href = path;
      document.head.appendChild(link);
    }
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Utils);


/***/ }),

/***/ "./front/js/utils/enum/HttpStatusCode.js":
/*!***********************************************!*\
  !*** ./front/js/utils/enum/HttpStatusCode.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Object.freeze({
  /* The HTTP call worked properly. */
  OK: 200,
  /* The url wasn't found. */
  NOT_FOUND: 404,
  /* The url cannot be accessed. */
  FORBIDDEN: 403,
  /* The server encountered a problem. */
  INTERNAL_ERROR: 500
}));


/***/ }),

/***/ "./front/js/view/UserInterface.js":
/*!****************************************!*\
  !*** ./front/js/view/UserInterface.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component_Aside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/Aside */ "./front/js/view/component/Aside.js");
/* harmony import */ var _component_Scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/Scene */ "./front/js/view/component/Scene.js");


'use strict';


class UserInterface {


  /** @summary <h1>ManaZeak user interface controller</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>This class is made to handle all interactions between UI and Mzk controller. It is in
   * charge to load views and to append them into the DOM, but also to make them interactive with the app context.</blockquote> */
  constructor() {
    /** @private
     * @member {object} - The aside controller */
    this._aside = new _component_Aside__WEBPACK_IMPORTED_MODULE_0__["default"]();
    /** @private
     * @member {object} - The scene controller */
    this._scene = new _component_Scene__WEBPACK_IMPORTED_MODULE_1__["default"]();
    /** @private
     * @member {object} - The DOM loading overlay to use in transitions */
    this._loadingOverlay = null;
    // Build loading overlay and add its style class
    this._loadingOverlay = document.getElementById('mzk-loading-overlay');
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  VIEW MANIPULATION  ----------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods will set the single page with a new view, while properly cleaning the previously used one.        */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name setSceneView
   * @public
   * @memberof UserInterface
   * @description <blockquote>This method will try to build a view according to the given options. If options are
   * invalid, the Main Page will be loaded instead. It handle the transition with previous view to put a loading
   * overlay while loading the new view.</blockquote>
   * @param {object} options - The options to build the view from
   * @param {object} options.name - The view name, must match one in the ViewFactory class
   * @return {promise} - The action promise */
  setSceneView(options) {
    return new Promise((resolve, reject) => {
      this.startLoading()
        .then(this._scene.buildView.bind(this._scene, options))
        .then(resolve)
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens
    });
  }


  setModal(options) {
    return new Promise((resolve, reject) => {
      this._scene.buildModal(options)
        .then(resolve)
        .catch(reject);
    });
  }


  getFragment(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url) // The loading overlay must be handled caller, since fragment is only a part of viewport
        .then(resolve)
        .catch(reject);
    });
  }


  processLogFromServer(errors) {
    if (errors && errors.length > 0) {
      for (let i = 0; i < errors.length; ++i) {
        Logger.raise(errors[i]);
      }
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  LOADING OVERLAY METHODS  -------------------------------------------  */
  /*                                                                                                                  */
  /*  These methods add/remove the loading overlay on top of elements. It is meant to be used when switching view.    */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The start loading method will add an overlay on the whole page that has a css animation.</blockquote>
   * @return {promise} - The action promise */
  startLoading() {
    return new Promise(resolve => {
      document.body.appendChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


  /** @method
   * @name startLoading
   * @public
   * @memberof UserInterface
   * @description <blockquote>The stop loading method will remove the overlay on the page.</blockquote>
   * @return {promise} - The action promise */
  stopLoading() {
    return new Promise(resolve => {
      document.body.removeChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (UserInterface);


/***/ }),

/***/ "./front/js/view/component/Aside.js":
/*!******************************************!*\
  !*** ./front/js/view/component/Aside.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



class Aside {


  constructor() {
    this._homepage = document.getElementById('homepage-button');
    this._menupage = document.getElementById('menupage-button');

    this._events();
  }


  _events() {
    // TODO: proper events
    this._homepageClicked = this._homepageClicked.bind(this);
    this._homepage.addEventListener('click', this._homepageClicked);

    this._menupageClicked = this._menupageClicked.bind(this);
    this._menupage.addEventListener('click', this._menupageClicked);
  }


  _homepageClicked() {
    mzk.setView({
      name: 'MainPage'
    });
  }


  _menupageClicked() {
    mzk.setView({
      name: 'MenuPage'
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Aside);


/***/ }),

/***/ "./front/js/view/component/Scene.js":
/*!******************************************!*\
  !*** ./front/js/view/component/Scene.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scene_ViewFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/ViewFactory */ "./front/js/view/scene/ViewFactory.js");
/* harmony import */ var _modal_ModalFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal/ModalFactory */ "./front/js/view/modal/ModalFactory.js");


'use strict';


class Scene {


  constructor() {
    this._scene = document.getElementById('scene');
    this.view = null;
    this.modal = null;
  }


  clearScene() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }

    this._scene.innerHTML = '';
  }


  buildView(options) {
    return new Promise((resolve, reject) => {
      Events.subscribe('SceneViewReady', () => {
        this._scene.append(this.view.dom);
        resolve();
      }, true);

      this.clearScene();
      this.view = new _scene_ViewFactory__WEBPACK_IMPORTED_MODULE_0__["default"](options.name, options);
      // Restore mainpage if view doesn't exists
      if (this.view === null) {
        this.view = new _scene_ViewFactory__WEBPACK_IMPORTED_MODULE_0__["default"]('MainPage');
        // TODO raise warning
      }
      // Reject view build if it exceed 5 seconds
      setTimeout(reject, 5000);
    });
  }


  buildModal(options) {
    return new Promise(resolve => {
      this.modal = new _modal_ModalFactory__WEBPACK_IMPORTED_MODULE_1__["default"](options.name, options);
      resolve();
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Scene);


/***/ }),

/***/ "./front/js/view/modal/ModalFactory.js":
/*!*********************************************!*\
  !*** ./front/js/view/modal/ModalFactory.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menupage_AboutModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menupage/AboutModal.js */ "./front/js/view/modal/menupage/AboutModal.js");
/* harmony import */ var _menupage_WishModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menupage/WishModal.js */ "./front/js/view/modal/menupage/WishModal.js");
/* harmony import */ var _adminpage_BadgeModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adminpage/BadgeModal.js */ "./front/js/view/modal/adminpage/BadgeModal.js");





const Classes = {
  AboutModal: _menupage_AboutModal_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  WishModal: _menupage_WishModal_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  BadgeModal: _adminpage_BadgeModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


/* harmony default export */ __webpack_exports__["default"] = (ModalFactory);


/***/ }),

/***/ "./front/js/view/modal/adminpage/BadgeModal.js":
/*!*****************************************************!*\
  !*** ./front/js/view/modal/adminpage/BadgeModal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Modal.js */ "./front/js/view/modal/utils/Modal.js");



class BadgeModal extends _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);
    /** @private
     * @member {object} - The form submit input */
    this._submitInput = null;
    /** @private
     * @member {number} - The event ID for the submit input clicked */
    this._submitEvtId = -1;
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._submitEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _fillAttributes() {
    this._submitInput = this._rootElement.querySelector('#submit-badge-button');
    this._events();
  }


  _events() {
    this._submitEvtId = Events.addEvent('click', this._submitInput, this._submitClicked, this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MODAL INTERACTIONS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  _submitClicked(event) {
    console.log('submit clicked');
  }


}


/* harmony default export */ __webpack_exports__["default"] = (BadgeModal);


/***/ }),

/***/ "./front/js/view/modal/menupage/AboutModal.js":
/*!****************************************************!*\
  !*** ./front/js/view/modal/menupage/AboutModal.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Modal.js */ "./front/js/view/modal/utils/Modal.js");



class AboutModal extends _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__["default"] {


  /** @summary <h1>Wish modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal is made to allow the user to send a wish (under the form of a string) to the
   * instance administrators. This wish can be reviewed in the admin page, in the wishes sections. This way, users can
   * leave a feedback on the instance, straight from their account.</blockquote>
   * @param {object} options - The modal base options
   * @param {string} options.url - The url to fetch the wish modal template from **/
  constructor(options) {
    super(options);
    /** @private
     * @member {object} - The modal close button */
    this._footerCloseButton = null;
    /** @private
     * @member {number} - The event ID for the close button clicked */
    this._footerCloseEvtId = -1;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof AboutModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will destroy the Modal parent (see documentation).</blockquote> **/
  destroy() {
    super.destroy();
    Events.removeEvent(this._footerCloseEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof AboutModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method doesn't do anything, the about modal is only for reading.</blockquote> **/
  _fillAttributes() {
    // The modal doesn't contain any interaction with user inputs
    this._footerCloseButton = this._rootElement.querySelector('#modal-footer-close');
    this._events();
  }


  /** @method
   * @name _events
   * @private
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will listen to any click on the submit button to process the textarea
   * content to send it to the backend if needed.</blockquote> **/
  _events() {
    this._footerCloseEvtId = Events.addEvent('click', this._footerCloseButton, this.close, this);
  }





}


/* harmony default export */ __webpack_exports__["default"] = (AboutModal);


/***/ }),

/***/ "./front/js/view/modal/menupage/WishModal.js":
/*!***************************************************!*\
  !*** ./front/js/view/modal/menupage/WishModal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Modal.js */ "./front/js/view/modal/utils/Modal.js");



class WishModal extends _utils_Modal_js__WEBPACK_IMPORTED_MODULE_0__["default"] {


  /** @summary <h1>Wish modal</h1>
   * @extends Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal is made to allow the user to send a wish (under the form of a string) to the
   * instance administrators. This wish can be reviewed in the admin page, in the wishes sections. This way, users can
   * leave a feedback on the instance, straight from their account.</blockquote>
   * @param {object} options - The modal base options
   * @param {string} options.url - The url to fetch the wish modal template from **/
  constructor(options) {
    super(options);
    /** @private
     * @member {object} - The form submit input */
    this._submitInput = null;
    /** @private
     * @member {number} - The event ID for the submit input clicked */
    this._submitEvtId = -1;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will destroy the Modal parent (see documentation), then clear the submit event
   * subscription, and finally will destroy all properties of this class. It's then properly destroyed.</blockquote> **/
  destroy() {
    super.destroy();
    Events.removeEvent(this._submitEvtId);
    Utils.removeAllObjectKeys(this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will retrieve the submit button from the wish modal template. It will then
   * call the event button to handle the interactivity with this button.</blockquote> **/
  _fillAttributes() {
    this._submitInput = this._rootElement.querySelector('#submit-wish-button');
    this._events();
  }


  /** @method
   * @name _events
   * @private
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will listen to any click on the submit button to process the textarea
   * content to send it to the backend if needed.</blockquote> **/
  _events() {
    this._submitEvtId = Events.addEvent('click', this._submitInput, this._submitClicked, this);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  MODAL INTERACTIONS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _submitClicked
   * @private
   * @async
   * @memberof WishModal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method is the submit button callback. If the textarea content is empty, the server
   * response to the post call will be the wish modal HTML template, completed with an error message. This callback
   * will refresh the interface to display this error message. Otherwise, if the textarea isn't empty, the server will
   * respond with a JSON object that contains the success information, to be displayed as a notification.</blockquote>
   * @param {object} event - The click event (on submit button) **/
  _submitClicked(event) {
    // Avoid form submit default behavior
    event.preventDefault();
    // Calling the modal url in post allow its resolution
    mzk.kom.postForm(this._url, {
      content: this._rootElement.querySelector('#wish-content').value
    }).then(response => {
      Logger.raise(response);
      this.close();
    }).catch(response => {
      // Parse new modal content as DOM object
      this._rootElement = Utils.parseHTMLFragment(response);
      // Clear overlay content
      this._modalOverlay.innerHTML = '';
      // Restore new modal content
      this._modalOverlay.appendChild(this._rootElement);
      // Avoid event stacking
      Events.removeEvent(this._submitEvtId);
      // Reset submit event id
      this._submitEvtId = -1;
      // Re-save internals with new template
      this._fillAttributes();
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (WishModal);


/***/ }),

/***/ "./front/js/view/modal/utils/Modal.js":
/*!********************************************!*\
  !*** ./front/js/view/modal/utils/Modal.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Modal {


  /** @summary <h1>Mzk Modal base component</h1>
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This modal component is meant to be extended. It provides a base to build a modal, using
   * an HTML template from an existing backend url. It handles the loading and building of the HTML template. It also
   * exposes an open and a close method. Finally, it allows the user to click on the modal overlay, or on the close icon
   * to close the modal. The developer must override <code>destroy()</code> and <code>_fillAttributes()</code> methods
   * to fully cover the modal lifecycle (see each of these methods documentation).</blockquote>
   * @param {object} options - The modal base options
   * @param {string} options.url - The url to fetch the modal template from **/
  constructor(options) {
    /** @private
     * @member {string} - The HTML template url to fetch */
    this._url = options.url;
    /** @private
     * @member {object} - The template root DOM element */
    this._rootElement = null;
    /** @private
     * @member {object} - The overlay that contains the modal, full viewport size and close modal on click */
    this._modalOverlay = null;
    /** @private
     * @member {number} - The event ID for the overlay clicked */
    this._overlayClickedEvtId = -1;
    /** @private
     * @member {object} - The close button, in the modal header */
    this._closeButton = null;
    /** @private
     * @member {number} - The event ID for the close button clicked */
    this._closeClickedEvtId = -1;
    // Modal building sequence:
    // - get HTML template from server;
    // - parse template response to become DOM object;
    // - append DOM element to global overlay;
    // - open modal by adding overlay to the body;
    // - let child class fill attributes and register its events.
    this._loadTemplate();
  }


  /** @method
   * @name destroy
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method must be overridden in child class. It only destroys the <code>Modal.js</code>
   * properties and close event subscription. The developer must remove its abstracted properties and events after
   * calling this method, to make the destruction process complete.</blockquote> **/
  destroy() {
    // Must be overridden in child class to clean extension properties and events
    Events.removeEvent(this._overlayClickedEvtId); // Might do nothing, as event is removed in close method
    Events.removeEvent(this._closeClickedEvtId); // Same for this event
    delete this._url;
    delete this._rootElement;
    delete this._modalOverlay;
    delete this._overlayClickedEvtId;
    delete this._closeButton;
    delete this._closeClickedEvtId;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL INSTANTIATION SEQUENCE  ------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _loadTemplate
   * @private
   * @async
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method creates the modal overlay, fetch the HTML template using the <code>Kom.js
   * </code> component, it then build the modal DOM, append it to the overlay, open the modal and call <code>
   * _fillAttributes()</code> that must be overridden in the child class. It is asynchronous because of the fetch call,
   * so the child class constructor can be fully executed.</blockquote> **/
  _loadTemplate() {
    mzk.kom.getText(this._url).then(response => {
      this._rootElement = Utils.parseHTMLFragment(response);
      // Create overlay modal container
      this._modalOverlay = document.createElement('DIV');
      this._modalOverlay.className = 'loading-overlay';
      this._modalOverlay.appendChild(this._rootElement);
      // Get close button from template
      this._closeButton = this._rootElement.querySelector('#modal-close');
      this.open();
      this._fillAttributes();
    }).catch(error => {
      console.error(error);
    });
  }


  /** @method
   * @name _fillAttributes
   * @private
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method doesn't implement anything. It must be overridden in child class, to use the
   * template DOM elements to build its interactions. It is called once the template is successfully fetched from the
   * server.</blockquote> **/
  _fillAttributes() {
    // Must be overridden in child class to build modal with HTML template attributes
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------  MODAL VISIBILITY MANIPULATION  -----------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name open
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will open the modal, by adding the modal overlay to the document body. It will
   * also register a subscription for a user click event on the modal overlay or on the close icon.</blockquote> **/
  open() {
    document.body.appendChild(this._modalOverlay);
    this._overlayClickedEvtId = Events.addEvent('click', this._modalOverlay, this.close, this);
    this._closeClickedEvtId = Events.addEvent('click', this._closeButton, this.close, this);
  }


  /** @method
   * @name close
   * @public
   * @memberof Modal
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This method will close the modal by removing the modal overlay from the document body.
   * When closed, a modal must be destroyed, and the child class must implement its own <code>destroy()</code> method,
   * to unsubscribe to any events it has and to remove its internal properties.</blockquote>
   * @param {object} [event] - The click event, not mandatory to allow the closing of the modal outside of any event **/
  close(event) {
    // Must be overridden in child class to properly clean extension properties and events
    if (!event || (event && (event.target === this._modalOverlay || event.target === this._closeButton))) {
      // Clear close events int eh Events component
      Events.removeEvent(this._overlayClickedEvtId);
      Events.removeEvent(this._closeClickedEvtId);
      this._overlayClickedEvtId = -1;
      this._closeClickedEvtId = -1;
      // Remove the overlay from the body
      document.body.removeChild(this._modalOverlay);
      // Use the child class destroy
      this.destroy();
    }
  }


}


/* harmony default export */ __webpack_exports__["default"] = (Modal);


/***/ }),

/***/ "./front/js/view/scene/ViewFactory.js":
/*!********************************************!*\
  !*** ./front/js/view/scene/ViewFactory.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mainpage_MainPageView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainpage/MainPageView.js */ "./front/js/view/scene/mainpage/MainPageView.js");
/* harmony import */ var _menupage_MenuPageView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menupage/MenuPageView.js */ "./front/js/view/scene/menupage/MenuPageView.js");
/* harmony import */ var _menupage_AdminPageView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menupage/AdminPageView.js */ "./front/js/view/scene/menupage/AdminPageView.js");
/* harmony import */ var _menupage_UserPageView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menupage/UserPageView.js */ "./front/js/view/scene/menupage/UserPageView.js");






const Classes = {
  MainPageView: _mainpage_MainPageView_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  MenuPageView: _menupage_MenuPageView_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  AdminPageView: _menupage_AdminPageView_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  UserPageView: _menupage_UserPageView_js__WEBPACK_IMPORTED_MODULE_3__["default"]
};


class ViewFactory {


  /** @summary <h1>View factory for all usages in single page app</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>This class is a factory pattern that will build any view used in ManaZeak. Sending the
   * view name along its options will make this class returns it. The view name must be included in the CLasses definition
   * in this file, without the <code>View</code> suffix.</blockquote>
   * @param {string} name - The view name, must be listed in Classes defined in this file, without the View suffix
   * @param {object} [options={}] - The view option object, see child class for usage
   * @return {object} - The requested view as an object */
  constructor(name, options = {}) {
    return new Classes[`${name}View`](options);
  }


}


/* harmony default export */ __webpack_exports__["default"] = (ViewFactory);


/***/ }),

/***/ "./front/js/view/scene/mainpage/MainPageView.js":
/*!******************************************************!*\
  !*** ./front/js/view/scene/mainpage/MainPageView.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/SceneView */ "./front/js/view/scene/utils/SceneView.js");



class MainPageView extends _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);

    this._fetchWrapper('/fragment/mainpage/')
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


}


/* harmony default export */ __webpack_exports__["default"] = (MainPageView);


/***/ }),

/***/ "./front/js/view/scene/menupage/AdminPageView.js":
/*!*******************************************************!*\
  !*** ./front/js/view/scene/menupage/AdminPageView.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_TabView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/TabView */ "./front/js/view/scene/utils/TabView.js");
/* harmony import */ var _admin_UsersFragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin/UsersFragment */ "./front/js/view/scene/menupage/admin/UsersFragment.js");
/* harmony import */ var _admin_WishesFragment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin/WishesFragment */ "./front/js/view/scene/menupage/admin/WishesFragment.js");





class AdminPageView extends _utils_TabView__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);

    this._fetchWrapper(this._url)
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .then(this._usersClicked.bind(this))
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    super._fillAttributes();
    this._events();
  }


  _events() {
    super._events();
  }


  _usersClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/user-list')
      .then(() => {
        this._activeFragment = new _admin_UsersFragment__WEBPACK_IMPORTED_MODULE_1__["default"]({
          target: this._viewContainer,
          refresh: this._usersClicked.bind(this)
        });
      })
      .catch(error => {
        Logger.raise(error);
      });
  }


  _wishesClicked() {
    this._clearFragment();
    this._fetchViewFragment('/fragment/admin/wish/all')
      .then(() => {
        this._activeFragment = new _admin_WishesFragment__WEBPACK_IMPORTED_MODULE_2__["default"]({
          target: this._viewContainer,
          refresh: this._wishesClicked.bind(this)
        });
      })
      .catch(error => {
        Logger.raise(error);
      });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (AdminPageView);


/***/ }),

/***/ "./front/js/view/scene/menupage/MenuPageView.js":
/*!******************************************************!*\
  !*** ./front/js/view/scene/menupage/MenuPageView.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/SceneView */ "./front/js/view/scene/utils/SceneView.js");



class MenuPageView extends _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);

    this._adminItem = null;
    this._adminClickedEvtId = -1;

    this._userItem = null;
    this._userClickedEvtId = -1;

    this._wishItem = null;
    this._wishClickedEvtId = -1;

    this._aboutItem = null;
    this._aboutClickedEvtId = -1;

    this._fetchWrapper('/fragment/menupage/')
      .then(this._fillAttributes.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._adminClickedEvtId);
    Events.removeEvent(this._userClickedEvtId);
    Events.removeEvent(this._wishClickedEvtId);
    Events.removeEvent(this._aboutClickedEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._adminItem = this.dom.querySelector('#admin-button');
    this._userItem = this.dom.querySelector('#userpage-button');
    this._wishItem = this.dom.querySelector('#wish-button');
    this._aboutItem = this.dom.querySelector('#about-button');

    this._events();
  }


  _events() {
    this._adminClickedEvtId = Events.addEvent('click', this._adminItem, this._adminClicked, this);
    this._userClickedEvtId = Events.addEvent('click', this._userItem, this._userClicked, this);
    this._wishClickedEvtId = Events.addEvent('click', this._wishItem, this._wishClicked, this);
    this._aboutClickedEvtId = Events.addEvent('click', this._aboutItem, this._aboutClicked, this);
  }


  _adminClicked() {
    mzk.setView({
      name: 'AdminPage', // To use in ViewFactory
      type: 'admin', // To retrieve DOm elements
      url: '/fragment/admin/'
    });
  }


  _userClicked() {
    mzk.setView({
      name: 'UserPage'
    });
  }


  _wishClicked() {
    mzk.setModal({
      name: 'Wish',
      url: '/fragment/wish'
    });
  }


  _aboutClicked() {
    mzk.setModal({
      name: 'About',
      url: '/fragment/modal/about'
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (MenuPageView);


/***/ }),

/***/ "./front/js/view/scene/menupage/UserPageView.js":
/*!******************************************************!*\
  !*** ./front/js/view/scene/menupage/UserPageView.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/SceneView */ "./front/js/view/scene/utils/SceneView.js");

'use strict';


class UserPageView extends _utils_SceneView__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);

    this._switchThemeEvtId = -1;
    this._theme = 'DARK'; // TODO load from pref (ls and server)

    this._fetchWrapper('/fragment/user-profile/')
      .then(this._buildView)
      .then(this._events.bind(this))
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Events.removeEvent(this._switchThemeEvtId);
    Utils.removeAllObjectKeys(this);
  }


  _buildView() {
    return new Promise(resolve => {
      /* Append service style into document */
      Utils.appendLinkInHead('static/dist/css/userprofile.bundle.css');
      resolve();
    });
  }


  _events() {
    return new Promise(resolve => {
      this._switchThemeEvtId = Events.addEvent('click', this.dom.querySelector('#theme-switch'), this._switchTheme, this);
      resolve();
    });
  }


  _switchTheme() {
    if (this._theme === 'DARK') {
      this._theme = 'LIGHT';
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      this._theme = 'DARK';
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }


}


/* harmony default export */ __webpack_exports__["default"] = (UserPageView);


/***/ }),

/***/ "./front/js/view/scene/menupage/admin/UsersFragment.js":
/*!*************************************************************!*\
  !*** ./front/js/view/scene/menupage/admin/UsersFragment.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DragElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/DragElement */ "./front/js/utils/DragElement.js");
/* harmony import */ var _utils_DropElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/DropElement */ "./front/js/utils/DropElement.js");




class UsersFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._users = [];
    this._badges = [];

    this._dropElements = [];
    this._dragElements = [];
    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    for (let i = 0; i < this._dropElements.length; ++i) {
      this._dropElements[i].destroy();
    }
    for (let i = 0; i < this._dragElements.length; ++i) {
      this._dragElements[i].destroy();
    }
    for (let i = 0; i < this._evtIds.length; ++i) {
      Events.removeEvent(this._evtIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    // Saving users and badge from template
    const usersWrapper = this._target.querySelector('#users-wrapper');
    for (let i = 0; i < usersWrapper.children.length; ++i) {
      this._users.push(usersWrapper.children[i]);
    }
    const badgesWrapper = this._target.querySelector('#badges-wrapper');
    for (let i = 0; i < badgesWrapper.children.length; ++i) {
      this._badges.push(badgesWrapper.children[i]);
    }
    // Build drag behavior for badges
    for (let i = 0; i < this._badges.length; ++i) {
      const dragElement = new _utils_DragElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
        target: this._badges[i],
        data: {
          badgeId: this._badges[i].dataset.id
        }
      });
      this._dragElements.push(dragElement);
    }
    // Build drop behavior for users and setup ban/delete events for each
    for (let i = 0; i < this._users.length; ++i) {
      const dropElement = new _utils_DropElement__WEBPACK_IMPORTED_MODULE_1__["default"]({
        target: this._users[i],
        onDrop: this._dropOnUser.bind(this._users[i], this._refreshCB)
      });
      this._dropElements.push(dropElement);
      // Ban/Delete events
      const banUser = this._users[i].children[this._users[i].children.length - 1].children[0];
      const deleteUser = this._users[i].children[this._users[i].children.length - 1].children[1];
      this._evtIds.push(Events.addEvent('click', banUser, this._banUser, { element: this._users[i], scope: this }));
      this._evtIds.push(Events.addEvent('click', deleteUser, this._deleteUser, { element: this._users[i], scope: this }));
    }
    // Badge creation event
    this._evtIds.push(Events.addEvent('click', this._target.querySelector('#new-badge'), this._newBadge, this));
  }


  _dropOnUser(refreshCB, data) {
    mzk.kom.post('/badge/associate', {
      userId: this.dataset.id,
      badgeId: data.badgeId
    }).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _banUser() {
    mzk.kom.post(`/admin/user/deactivate/${this.element.dataset.id}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _deleteUser() {
    mzk.kom.post(`/admin/user/delete/${this.element.dataset.id}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _newBadge() {
    mzk.setModal({
      name: 'Badge',
      url: '/fragment/badge'
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (UsersFragment);


/***/ }),

/***/ "./front/js/view/scene/menupage/admin/WishesFragment.js":
/*!**************************************************************!*\
  !*** ./front/js/view/scene/menupage/admin/WishesFragment.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_DragElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/DragElement */ "./front/js/utils/DragElement.js");
/* harmony import */ var _utils_DropElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/DropElement */ "./front/js/utils/DropElement.js");




class WishesFragment {


  constructor(options) {
    this._target = options.target;
    this._refreshCB = options.refresh;

    this._dropElements = [];
    this._dragElements = [];
    this._evtIds = [];

    this._fillAttributes();
  }


  destroy() {
    for (let i = 0; i < this._dropElements.length; ++i) {
      this._dropElements[i].destroy();
    }
    for (let i = 0; i < this._dragElements.length; ++i) {
      this._dragElements[i].destroy();
    }
    for (let i = 0; i < this._evtIds.length; ++i) {
      Events.removeEvent(this._evtIds[i]);
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    this._setDragDropElements('#pending-wishes', 'reset');
    this._setDragDropElements('#accepted-wishes', 'accept');
    this._setDragDropElements('#refused-wishes', 'reject');
  }


  _setDragDropElements(selector, type) {
    const wishes = this._target.querySelector(selector);
    // Drop wrapper
    const dropContainer = new _utils_DropElement__WEBPACK_IMPORTED_MODULE_1__["default"]({
      target: wishes,
      onDrop: this._wishDroppedOn.bind(this, type)
    });
    this._dropElements.push(dropContainer);
    for (let i = 0; i < wishes.children.length; ++i) {
      // We ignore the title of each section (Pending/Accepted/Refused)
      if (wishes.children[i].nodeName !== 'H1') {
        // Drag elements
        const dragElement = new _utils_DragElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
          target: wishes.children[i],
          data: {
            wishId: wishes.children[i].dataset.id
          }
        });
        this._dragElements.push(dragElement);
        // Remove wish
        this._evtIds.push(Events.addEvent('click', wishes.children[i], this._removeWish, { element: wishes.children[i], scope: this }));
      }
    }
  }


  _wishDroppedOn(type, data) {
    mzk.kom.post(`/admin/wish/${type}/${data.wishId}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


  _removeWish() {
    mzk.kom.post(`/admin/wish/delete/${this.element.dataset.id}`, {}).then(response => {
      mzk.ui.processLogFromServer(response.errors);
      this.scope._refreshCB();
    }).catch(error => {
      console.error(error);
    });
  }


}


/* harmony default export */ __webpack_exports__["default"] = (WishesFragment);


/***/ }),

/***/ "./front/js/view/scene/utils/SceneView.js":
/*!************************************************!*\
  !*** ./front/js/view/scene/utils/SceneView.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



class SceneView {


  /** @summary <h1>View base class with mandatory methods</h1>
   * @author Arthur Beaulieu
   * @since September 2020
   * @description <blockquote>Scene view base class that must be inherited to match the loading pattern. All views
   * are based on an HTML template, that will be loaded the parsed to be included in the DOM scene. When the view
   * building is done, a <code>SceneViewReady</code> event is fired through the custom event proxy.</blockquote> */
  constructor() {
    /** @public
     * @member {object} - The view wrapper div */
    this.wrapper = null;
  }


  /** @method
   * @name destroy
   * @public
   * @memberof SceneView
   * @description <blockquote>The destroy method will clear the wrapper. A destroy method must be created in child
   * class to properly clean itself. It should also call for <code>super</code> to call this method.</blockquote> */
  destroy() {
    this.wrapper = null;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -----------------------------------------  BUILDING VIEW PATTERN  --------------------------------------------  */
  /*                                                                                                                  */
  /*  These two methods must be called to properly fetch view wrapper and notify app that the view is ready to use.   */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fetchWrapper
   * @private
   * @memberof UserInterface
   * @description <blockquote>This method will request the HTML template for the given url. It will then parse it
   * and update the view wrapper to match this newly loaded template.</blockquote>
   * @param {string} url - The template url to load html from
   * @return {promise} - The action promise */
  _fetchWrapper(url) {
    return new Promise((resolve, reject) => {
      mzk.kom.getText(url)
        .then(response => {
          this.dom = Utils.parseHTMLFragment(response);
          resolve();
        })
        .catch(reject);
    });
  }


  /** @method
   * @name _viewReady
   * @private
   * @memberof UserInterface
   * @description <blockquote>This method needs to be called last, when all the view initialisation is done. This
   * way, it will notify the UserInterface controller that te view creation is done, and that it should release the
   * UI removing the loading overlay.</blockquote> */
  _viewReady() {
    return new Promise(resolve => {
      Events.publish('SceneViewReady');
      resolve();
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  GETTER / SETTER  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @public
   * @member {object} - The view first DOM child in template */
  get dom() {
    return this.wrapper;
  }


  /** @public
   * @member {object} - The view first DOM child in template */
  set dom(dom) {
    this.wrapper = dom;
  }


}


/* harmony default export */ __webpack_exports__["default"] = (SceneView);


/***/ }),

/***/ "./front/js/view/scene/utils/TabView.js":
/*!**********************************************!*\
  !*** ./front/js/view/scene/utils/TabView.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SceneView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneView */ "./front/js/view/scene/utils/SceneView.js");



class TabView extends _SceneView__WEBPACK_IMPORTED_MODULE_0__["default"] {


  constructor(options) {
    super(options);

    this._type = options.type;
    this._url = options.url;

    this._tabs = null;
    this._tabClickedEvtIds = [];

    this._viewContainer = null;

    this._activeFragment = null;
    /** @private
     * @member {object} - The DOM loading overlay to use in transitions */
    this._loadingOverlay = null;
    // Build loading overlay and add its style class
    this._loadingOverlay = document.createElement('DIV');
    this._loadingOverlay.className = 'mzk-loading-overlay fit-parent';
  }


  destroy() {
    super.destroy();
    for (let i = 0; i < this._tabClickedEvtIds.length; ++i) {
      Events.removeEvent(this._tabClickedEvtIds[i]);
    }
  }


  _fillAttributes() {
    this._tabs = this.dom.querySelector(`#${this._type}-tabs`);
    this._viewContainer = this.dom.querySelector(`#${this._type}-view`);
  }


  _events() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      const eventId = Events.addEvent('click', this._tabs.children[i], this._tabClicked, this);
      this._tabClickedEvtIds.push(eventId);
    }
  }


  _tabClicked(event) {
    this._unselectTabs();
    event.target.classList.add('selected');
    this[`_${event.target.dataset.view}Clicked`]();
  }


  _unselectTabs() {
    for (let i = 0; i < this._tabs.children.length; ++i) {
      this._tabs.children[i].classList.remove('selected');
    }
  }


  _fetchViewFragment(url) {
    return new Promise((resolve, reject) => {
      this._viewContainer.innerHTML = '';
      this.startLoading()
        .then(mzk.getFragment.bind(mzk, url))
        .then(response => {
          this._viewContainer.insertAdjacentHTML( 'beforeend', response);
          requestAnimationFrame(resolve);
        })
        .catch(reject)
        .finally(this.stopLoading.bind(this)); // Clear loading overlay whatever happens;
    });
  }


  _clearFragment() {
    if (this._activeFragment) {
      this._activeFragment.destroy();
      this._activeFragment = null;
    }
  }


  startLoading() {
    return new Promise(resolve => {
      this._viewContainer.appendChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }


  stopLoading() {
    return new Promise(resolve => {
      this._viewContainer.removeChild(this._loadingOverlay);
      requestAnimationFrame(resolve);
    });
  }

}


/* harmony default export */ __webpack_exports__["default"] = (TabView);


/***/ }),

/***/ "./front/scss/service/manazeak.scss":
/*!******************************************!*\
  !*** ./front/scss/service/manazeak.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./front/js/StartSession.js ./front/scss/service/manazeak.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./front/js/StartSession.js */"./front/js/StartSession.js");
module.exports = __webpack_require__(/*! ./front/scss/service/manazeak.scss */"./front/scss/service/manazeak.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvU3RhcnRTZXNzaW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL2NvcmUvS29tLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL2NvcmUvTXprLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL0N1c3RvbUV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9EcmFnRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9Ecm9wRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9Mb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdXRpbHMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL2VudW0vSHR0cFN0YXR1c0NvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9Vc2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvY29tcG9uZW50L0FzaWRlLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvY29tcG9uZW50L1NjZW5lLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvTW9kYWxGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvYWRtaW5wYWdlL0JhZGdlTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9tb2RhbC9tZW51cGFnZS9BYm91dE1vZGFsLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvbWVudXBhZ2UvV2lzaE1vZGFsLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvdXRpbHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9WaWV3RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy92aWV3L3NjZW5lL21haW5wYWdlL01haW5QYWdlVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy92aWV3L3NjZW5lL21lbnVwYWdlL0FkbWluUGFnZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9tZW51cGFnZS9NZW51UGFnZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9tZW51cGFnZS9Vc2VyUGFnZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9tZW51cGFnZS9hZG1pbi9Vc2Vyc0ZyYWdtZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvbWVudXBhZ2UvYWRtaW4vV2lzaGVzRnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS91dGlscy9TY2VuZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS91dGlscy9UYWJWaWV3LmpzIiwid2VicGFjazovLy8uL2Zyb250L3Njc3Mvc2VydmljZS9tYW5hemVhay5zY3NzP2E3ZDgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0Q7QUFDQTtBQUNaO0FBQ0Y7QUFDTDtBQUM3Qjs7QUFFQSxvQkFBb0IsMkRBQVk7QUFDaEMsMEJBQTBCLDJEQUFZO0FBQ3RDLG9CQUFvQixxREFBTTtBQUMxQjtBQUNBLENBQUM7QUFDRCxtQkFBbUIsb0RBQUs7O0FBRXhCLGlCQUFpQixpREFBRztBQUNwQjs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBNkQ7OztBQUc3RDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0EsaUJBQWlCLHFFQUFjO0FBQy9CO0FBQ0EsS0FBSyxtQkFBbUIscUVBQWM7QUFDdEM7QUFDQSxLQUFLLG1CQUFtQixxRUFBYztBQUN0QztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGtDQUFrQyxxRUFBYztBQUNoRDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUywrQ0FBK0M7QUFDeEQ7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLGtFQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNuWW5CO0FBQUE7QUFBQTtBQUFrRDtBQUMxQjtBQUN4Qjs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CQUFtQiw0Q0FBRztBQUN0QixrQkFBa0IsMkRBQWE7QUFDL0I7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOzs7QUFHQTs7O0FBR2Usa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3REbkI7QUFBYTs7O0FBR2I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBLGFBQWEsUUFBUSw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEZBQThGO0FBQzlGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0EsaURBQWlELFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxRQUFRO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUSxzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsUUFBUSxzQkFBc0I7QUFDNUM7QUFDQTtBQUNBLDJEQUEyRCxNQUFNO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0Esa0RBQWtELFVBQVUsR0FBRyxTQUFTLEdBQUcsUUFBUTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxvREFBb0QsUUFBUTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsNEdBQTRHLFFBQVEsT0FBTyxVQUFVO0FBQ3JJO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsMERBQTBELFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVSxHQUFHLEtBQUs7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0Esd0VBQXdFLFVBQVUsbUJBQW1CLFdBQVc7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDcmM1QjtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsS0FBSyxPQUFPO0FBQ1osNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRSw0Q0FBNEMsdUJBQXVCO0FBQ25FLDhDQUE4QyxZQUFZO0FBQzFELDZDQUE2QyxXQUFXO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsMkNBQTJDLG9FQUFvRTtBQUMvRyw0Q0FBNEMsb0VBQW9FO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR2UsMEVBQVcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ25MM0I7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCLGtDQUFrQztBQUNsQztBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLDhCQUE4QjtBQUM5QiwrREFBK0Q7QUFDL0Q7QUFDQSxPQUFPLE9BQU87QUFDZDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwwRUFBVyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdlAzQjtBQUFhOzs7QUFHYjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlHQUFpRztBQUNqRztBQUNBO0FBQ0EsYUFBYSxPQUFPLFlBQVk7QUFDaEMsYUFBYSxPQUFPLG1CQUFtQjtBQUN2QztBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsY0FBYyxPQUFPO0FBQ3JCLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU8seUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLE9BQU8sT0FBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU8seUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYyxXQUFXLFNBQVMsR0FBRyxpQkFBaUIsR0FBRyxtQkFBbUI7QUFDL0YsS0FBSyx5Q0FBeUM7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWMsV0FBVyxTQUFTO0FBQ3JELEtBQUssMkRBQTJEO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyx1Q0FBdUM7QUFDdkMsMENBQTBDO0FBQzFDLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVDQUF1QyxJQUFJLHNCQUFzQjtBQUNuRztBQUNBLGdDQUFnQyx3QkFBd0IsSUFBSSw4QkFBOEI7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLDJDQUEyQztBQUMzQyxPQUFPO0FBQ1AsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxHQUFHO0FBQ3RDLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYTtBQUNoRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLHFFQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNoU3RCO0FBQUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTyw0Q0FBNEMsV0FBVyxhQUFhLGNBQWM7QUFDdEcsYUFBYSxPQUFPLG9DQUFvQyxRQUFRLE1BQU0sT0FBTyxNQUFNO0FBQ25GLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPLGtEQUFrRCxXQUFXLGFBQWEsY0FBYztBQUMvRztBQUNBO0FBQ0EsZ0JBQWdCLE9BQU8sMERBQTBELFFBQVEsTUFBTSxPQUFPLE1BQU07QUFDNUc7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU8sNENBQTRDLFdBQVcsYUFBYSxjQUFjO0FBQ3RHLGFBQWEsT0FBTyxvQ0FBb0MsUUFBUSxNQUFNLE9BQU8sTUFBTTtBQUNuRixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEOztBQUVBLG9FQUFvRTtBQUNwRSxzREFBc0Q7QUFDdEQ7O0FBRUEsbUhBQW1IO0FBQ25ILDBEQUEwRDtBQUMxRDs7QUFFQSxzRUFBc0U7QUFDdEUsd0RBQXdEO0FBQ3hEO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRCxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUEsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1EQUFtRDs7QUFFbkQsaUNBQWlDO0FBQ2pDLCtCQUErQjs7QUFFL0I7QUFDQSx5Q0FBeUM7QUFDekMsT0FBTyx5QkFBeUI7QUFDaEM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFdBQVcsRUFBRSxzR0FBc0c7QUFDakksYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEOztBQUVBLGdEQUFnRDtBQUNoRCw4REFBOEQ7QUFDOUQsd0RBQXdEO0FBQ3hELE9BQU8sbURBQW1EO0FBQzFELHFDQUFxQztBQUNyQztBQUNBLEtBQUssUUFBUTtBQUNiOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQztBQUNBLE9BQU8sT0FBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsc0dBQXNHO0FBQ3BILGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFdBQVcsRUFBRSxzR0FBc0c7QUFDakksYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBLHVDQUF1QztBQUN2QyxLQUFLLHlCQUF5QjtBQUM5Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1GQUFtRjtBQUNqRyxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBQy9DLHVDQUF1QztBQUN2QyxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQSw2REFBNkQ7QUFDN0QsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLHlDQUF5QztBQUN6QyxlQUFlO0FBQ2Y7O0FBRUEsNERBQTREO0FBQzVELEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUEsZ0pBQWdKO0FBQ2hKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTyx5QkFBeUIsU0FBUyxNQUFNLFNBQVM7QUFDckUsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixhQUFhLEVBQUUsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQSxvREFBb0Q7O0FBRXBELDRDQUE0QztBQUM1QyxnREFBZ0Q7QUFDaEQ7O0FBRUEsa0NBQWtDO0FBQ2xDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFLGtDQUFrQztBQUNsQyx1QkFBdUI7O0FBRXZCLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU8sa0JBQWtCLE1BQU0sU0FBUyxPQUFPO0FBQzVEO0FBQ0EsaURBQWlEO0FBQ2pELHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDampDNUI7QUFBYTs7O0FBR2I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1DQUFtQztBQUNyRDtBQUNBLHVEQUF1RCxnQkFBZ0IsRUFBRSxLQUFLO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN2RHJCO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNUSDtBQUFBO0FBQUE7QUFBc0M7QUFDQTtBQUN0Qzs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsc0JBQXNCLHdEQUFLO0FBQzNCO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsc0JBQXNCLHdEQUFLO0FBQzNCO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSw0RUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDekg3QjtBQUFhOzs7QUFHYjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDekNyQjtBQUFBO0FBQUE7QUFBK0M7QUFDRTtBQUNqRDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxzQkFBc0IsMERBQVc7QUFDakM7QUFDQTtBQUNBLHdCQUF3QiwwREFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLHVCQUF1QiwyREFBWTtBQUNuQztBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN4RHJCO0FBQUE7QUFBQTtBQUFBO0FBQWtEO0FBQ0Y7QUFDRzs7O0FBR25EO0FBQ0EsRUFBRSwyRUFBVTtBQUNaLEVBQUUseUVBQVM7QUFDWCxFQUFFLDRFQUFVO0FBQ1o7OztBQUdBOzs7QUFHQSxnQ0FBZ0M7QUFDaEMsMEJBQTBCLEtBQUs7QUFDL0I7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkI1QjtBQUFBO0FBQXNDOzs7QUFHdEMseUJBQXlCLHVEQUFLOzs7QUFHOUI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSx5RUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDckQxQjtBQUFBO0FBQXNDOzs7QUFHdEMseUJBQXlCLHVEQUFLOzs7QUFHOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTs7O0FBR2UseUVBQVUsRUFBQzs7Ozs7Ozs7Ozs7OztBQzlFMUI7QUFBQTtBQUFzQzs7O0FBR3RDLHdCQUF3Qix1REFBSzs7O0FBRzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTs7O0FBR2Usd0VBQVMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3ZIekI7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xELGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNoS3JCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBc0Q7QUFDQTtBQUNFO0FBQ0Y7OztBQUd0RDtBQUNBLEVBQUUsK0VBQVk7QUFDZCxFQUFFLCtFQUFZO0FBQ2QsRUFBRSxpRkFBYTtBQUNmLEVBQUUsK0VBQVk7QUFDZDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU8sWUFBWTtBQUNoQyxjQUFjLE9BQU87QUFDckIsZ0NBQWdDO0FBQ2hDLDBCQUEwQixLQUFLO0FBQy9COzs7QUFHQTs7O0FBR2UsMEVBQVcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2xDM0I7QUFBQTtBQUEyQzs7O0FBRzNDLDJCQUEyQix3REFBUzs7O0FBR3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR2UsMkVBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQzFCNUI7QUFBQTtBQUFBO0FBQUE7QUFBdUM7QUFDVztBQUNFOzs7QUFHcEQsNEJBQTRCLHNEQUFPOzs7QUFHbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0REFBYTtBQUNoRDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw2REFBYztBQUNqRDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTs7O0FBR2UsNEVBQWEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3ZFN0I7QUFBQTtBQUEyQzs7O0FBRzNDLDJCQUEyQix3REFBUzs7O0FBR3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDN0Y1QjtBQUFBO0FBQTJDO0FBQzNDOzs7QUFHQSwyQkFBMkIsd0RBQVM7OztBQUdwQztBQUNBOztBQUVBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDL0Q1QjtBQUFBO0FBQUE7QUFBd0Q7QUFDQTs7O0FBR3hEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQ0FBbUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1Qyw4QkFBOEIsMERBQVc7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQyw4QkFBOEIsMERBQVc7QUFDekM7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSx1Q0FBdUM7QUFDakgsZ0ZBQWdGLHVDQUF1QztBQUN2SDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQSwyQ0FBMkMsd0JBQXdCLEtBQUs7QUFDeEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQSx1Q0FBdUMsd0JBQXdCLEtBQUs7QUFDcEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSw0RUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdEg3QjtBQUFBO0FBQUE7QUFBd0Q7QUFDQTs7O0FBR3hEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0EsbUJBQW1CLCtCQUErQjtBQUNsRDtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFXO0FBQ3pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwREFBVztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEZBQTBGLDJDQUEyQztBQUNySTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsZ0NBQWdDLEtBQUssR0FBRyxZQUFZLEtBQUs7QUFDekQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQSx1Q0FBdUMsd0JBQXdCLEtBQUs7QUFDcEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLDZFQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN6RjlCO0FBQWE7OztBQUdiOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLHdFQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM5RnpCO0FBQUE7QUFBb0M7OztBQUdwQyxzQkFBc0Isa0RBQVM7OztBQUcvQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1CQUFtQixtQ0FBbUM7QUFDdEQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDRDQUE0QyxXQUFXO0FBQ3ZELHFEQUFxRCxXQUFXO0FBQ2hFOzs7QUFHQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDOzs7QUFHQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsOENBQThDO0FBQzlDLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7OztBQUdlLHNFQUFPLEVBQUM7Ozs7Ozs7Ozs7OztBQ3hHdkIsdUMiLCJmaWxlIjoianMvbWFuYXplYWsuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IEN1c3RvbUV2ZW50cyBmcm9tICcuL3V0aWxzL0N1c3RvbUV2ZW50cyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vdXRpbHMvTm90aWZpY2F0aW9uJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi91dGlscy9Mb2dnZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMnO1xuaW1wb3J0IE16ayBmcm9tICcuL2NvcmUvTXprJztcbid1c2Ugc3RyaWN0Jztcblxud2luZG93LkV2ZW50cyA9IG5ldyBDdXN0b21FdmVudHMoKTtcbndpbmRvdy5Ob3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XG53aW5kb3cuTG9nZ2VyID0gbmV3IExvZ2dlcih7XG4gIG5vdGlmaWNhdGlvbjogd2luZG93Lk5vdGlmaWNhdGlvblxufSk7XG53aW5kb3cuVXRpbHMgPSBuZXcgVXRpbHMoKTtcblxud2luZG93Lm16ayA9IG5ldyBNemsoKTtcbndpbmRvdy5temsuaW5pdFNlc3Npb24oKTtcbiIsImltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuLi91dGlscy9lbnVtL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuXG5jbGFzcyBLb20ge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5TZXJ2ZXIgY29tbXVuaWNhdGlvbiBhYnN0cmFjdGlvbjwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgY2xhc3MgaXMgdGhlIG1haW4gb2JqZWN0IHRvIGRlYWwgd2l0aCB3aGVuIHJlcXVlc3Rpbmcgc29tZXRoaW5nIGZyb20gdGhlIHNlcnZlci48YnI+XG4gICAqIEl0IGhhbmRsZSBhbGwgdXJscyBjYWxscyAoPGNvZGU+R0VUPC9jb2RlPiwgPGNvZGU+UE9TVDwvY29kZT4pLCB0cmVhdCByZXNwb25zZXMgb3IgaGFuZGxlIGVycm9ycyB1c2luZ1xuICAgKiA8Y29kZT5Qcm9taXNlPC9jb2RlPi48YnI+QmVjYXVzZSBpdCB1c2VzIDxjb2RlPlByb21pc2U8L2NvZGU+LCBzdWNjZXNzIGFuZCBlcnJvcnMgYXJlIHRvIGJlIGhhbmRsZWQgaW4gdGhlIGNhbGxlclxuICAgKiBmdW5jdGlvbiwgdXNpbmcgPGNvZGU+LnRoZW4oKTwvY29kZT4gYW5kIDxjb2RlPi5jYXRjaCgpPC9jb2RlPi4gVG8gcHJvcGVybHkgZGVhbCB3aXRoIDxjb2RlPlBPU1Q8L2NvZGU+IHJlcXVlc3QsXG4gICAqIHRoZSBzZXNzaW9uIG11c3QgY29udGFpbiBhIGNzcmYgdG9rZW4gaW4gY29va2llcy4gT3RoZXJ3aXNlLCB0aG9zZSA8Y29kZT5QT1NUPC9jb2RlPiBjYWxsIG1heSBmYWlsLjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFVzZXIgc2Vzc2lvbiBDU1JGIHRva2VuIHRvIHVzZSBpbiBQT1NUIHJlcXVlc3QgKi9cbiAgICB0aGlzLl9jc3JmVG9rZW4gPSB0aGlzLl9nZXRDc3JmQ29va2llKCk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7YXJyYXlbXX0gLSBBcnJheSBvZiBIVFRQIGhlYWRlcnMgdG8gYmUgdXNlZCBpbiBIVFRQIGNhbGxzICovXG4gICAgdGhpcy5faGVhZGVycyA9IHRoaXMuX2NyZWF0ZVJlcXVlc3RIZWFkZXJzKCk7XG4gICAgLy8gQ2hlY2sgdGhhdCBDU1JGIHRva2VuIGV4aXN0cyBhbmQgdGhhdCBoZWFkZXJzIGFyZSBwcm9wZXJseSBjcmVhdGVkXG4gICAgdGhpcy5fY2hlY2tWYWxpZGl0eSgpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDTEFTUyBJTklUIFVUSUxTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldENzcmZDb29raWVcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+RXh0cmFjdCBDU1JGIHRva2VuIHZhbHVlIGZyb20gY2xpZW50IGNvb2tpZXMgYW5kIHJldHVybnMgaXQgYXMgYSBzdHJpbmcuIFJldHVybnMgYW4gZW1wdHlcbiAgICogc3RyaW5nIGJ5IGRlZmF1bHQuIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIHRvIGJlIGNhbGxlZCBvbiBjb25zdHJ1Y3Rpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIENTUkYgdG9rZW4gc3RyaW5nICovXG4gIF9nZXRDc3JmQ29va2llKCkge1xuICAgIGlmIChkb2N1bWVudC5jb29raWUgJiYgZG9jdW1lbnQuY29va2llICE9PSAnJykge1xuICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vIFBhcnNlIGN1cnJlbnQgY29va2llIHRvIGV4dHJhY3QgaXRzIHByb3BlcnRpZXNcbiAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoY29va2llICE9PSB1bmRlZmluZWQgJiYgY29va2llWzBdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NyZicpKSB7XG4gICAgICAgICAgLy8gRm91bmQgYSBtYXRjaGluZyBjb29raWUgZm9yIGNzcmZ0b2tlbiB2YWx1ZSwgcmV0dXJuIGFzIGRlY29kZWQgc3RyaW5nXG4gICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb29raWVbMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiBlbXB0eSBzdHJpbmcgYnkgZGVmYXVsdCwgUE9TVCBjYWxscyBtYXkgZmFpbFxuICAgIHJldHVybiAnJztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NyZWF0ZVJlcXVlc3RIZWFkZXJzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkZpbGxzIEtvbSA8Y29kZT5faGVhZGVyczwvY29kZT4gcHJpdmF0ZSBtZW1iZXIgYXJyYXksIHRvIHVzZSBpbiBIVFRQIHJlcXVlc3RzIGxhdGVyIG9uLlxuICAgKiBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCB0byBiZSBjYWxsZWQgb24gY29uc3RydWN0aW9uLjwvYmxvY2txdW90ZT5cbiAgICogQHJldHVybiB7YXJyYXlbXX0gLSBUaGUgaGVhZGVycyBhcnJheSwgbGVuZ3RoIDMsIHRvIGJlIHVzZWQgaW4gSFRUUCByZXF1ZXN0cyAqL1xuICBfY3JlYXRlUmVxdWVzdEhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFsnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnXSxcbiAgICAgIFsnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nXSxcbiAgICAgIFsnWC1YU1JGLVRPS0VOJywgdGhpcy5fY3NyZlRva2VuXVxuICAgIF07XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfY2hlY2tWYWxpZGl0eVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5DaGVjayB0aGUgS29tIGluc3RhbmNlIHZhbGlkaXR5IHRvIGVuc3VyZSBpdHMgcHJvcGVydGllcyB2YWxpZGl0eS48L2Jsb2NrcXVvdGU+ICovXG4gIF9jaGVja1ZhbGlkaXR5KCkge1xuICAgIGlmICh0aGlzLl9jc3JmVG9rZW4gIT09ICcnKSB7XG4gICAgICBpZiAodGhpcy5faGVhZGVycy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRl9LT01fSEVBREVSU19FUlJPUicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGX0tPTV9OT19DU1JGX1RPS0VOJyk7XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldEVycm9yQ29kZUZyb21IVFRQU3RhdHVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuZXZlciBhIHNlcnZlciByZXF1ZXN0IGRpZG4ndCB3ZW50IHdlbGwuIEluIGNhc2UgYSByZXF1ZXN0IChmcm9tXG4gICAqIGFueSB0eXBlKSBmYWlscywgaXRzIEhUVFAgc3RhdHVzIGNvZGUgaGF2ZSB0byBiZSBoYW5kbGUgaW4gdGhlIG1ldGhvZCwgc28gaXQgcmV0dXJucyBhbiBlcnJvciBjb2RlIGNhbiBiZSBoYW5kbGVkXG4gICAqIGluIHRoZSB1c2VyIGludGVyZmFjZSAod2l0aCBub3RpZmljYXRpb24sIGNvbnNvbGUgb3IgZWxzZSkuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFRoZSBIVFRQIHN0YXR1cyBjb2RlIHRvIGhhbmRsZSwgaW4gc3VwcG9ydGVkIG9uZXMgZnJvbSBIdHRwU3RhdHVzQ29kZSBlbnVtZXJhdGlvblxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBIVFRQIHN0YXR1cyBhcyBhbiBlcnJvciBjb2RlICovXG4gIF9nZXRFcnJvckNvZGVGcm9tSFRUUFN0YXR1cyhjb2RlKSB7XG4gICAgaWYgKGNvZGUgPT09IEh0dHBTdGF0dXNDb2RlLk5PVF9GT1VORCkge1xuICAgICAgcmV0dXJuICdCX0tPTV9OT1RfRk9VTkQnO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gSHR0cFN0YXR1c0NvZGUuRk9SQklEREVOKSB7XG4gICAgICByZXR1cm4gJ0JfS09NX0FDQ0VTU19GT1JCSURERU4nO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gSHR0cFN0YXR1c0NvZGUuSU5URVJOQUxfRVJST1IpIHtcbiAgICAgIHJldHVybiAnQl9LT01fSU5URVJOQUxfRVJST1InO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYEJfS09NX1VOS05PV05fRVJST1JgO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIF9yZXNvbHZlQXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+R2VuZXJpYyB0b29sIG1ldGhvZCB1c2VkIGJ5IHByaXZhdGUgbWV0aG9kcyBvbiBmZXRjaCByZXNwb25zZXMgdG8gZm9ybWF0IG91dHB1dCBpbiB0aGUgcHJvdmlkZWRcbiAgICogZm9ybWF0LiBJdCBtdXN0IGJlIGVpdGhlciBganNvbmAsIGB0ZXh0YCBvciBgcmF3YC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgcmVzb2x1dGlvbiwgY2FuIGJlIGBqc29uYCwgYHRleHRgIG9yIGByYXdgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSAtIFRoZSA8Y29kZT5mZXRjaDwvY29kZT4gcmVzcG9uc2Ugb2JqZWN0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiwgZm9ybWF0IHJlc3BvbnNlIGFzIGFuIG9iamVjdCBvbiByZXNvbHZlLCBhcyBlcnJvciBjb2RlIHN0cmluZyBvbiByZWplY3QgKi9cbiAgX3Jlc29sdmVBcyh0eXBlLCByZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdyYXcnKSB7IC8vIFJhdyBhcmUgbWFkZSBpbiBYTUxIdHRwUmVxdWVzdCBhbmQgbmVlZCBzcGVjaWFsIGhhbmRsaW5nXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gSHR0cFN0YXR1c0NvZGUuT0spIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHRoaXMuX2dldEVycm9yQ29kZUZyb21IVFRQU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnanNvbicgfHwgdHlwZSA9PT0gJ3RleHQnKSB7IC8vIENhbGwgYXJlIG1hZGUgdXNpbmcgZmV0Y2ggQVBJXG4gICAgICAgICAgaWYgKHJlc3BvbnNlW3R5cGVdKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlW3R5cGVdKCkpO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIEZhbGxiYWNrIG9uIHN0YW5kYXJkIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICByZWplY3QodGhpcy5fZ2V0RXJyb3JDb2RlRnJvbUhUVFBTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBSZXNvbHV0aW9uIHR5cGUgZG9lc24ndCBleGlzdHNcbiAgICAgICAgICByZWplY3QoJ0ZfS09NX1VOU1VQUE9SVEVEX1RZUEUnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdGX0tPTV9NSVNTSU5HX0FSR1VNRU5UJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfcmVzb2x2ZUFzSlNPTlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IHB1YmxpYyBtZXRob2RzIG9uIGZldGNoIHJlc3BvbnNlcyB0byBmb3JtYXQgb3V0cHV0IGRhdGEgYXMgSlNPTiB0byBiZVxuICAgKiByZWFkIGluIEphdmFTY3JpcHQgY29kZSBhcyBvYmplY3RzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gVGhlIDxjb2RlPmZldGNoPC9jb2RlPiByZXNwb25zZSBvYmplY3RcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+LCBmb3JtYXQgcmVzcG9uc2UgYXMgYW4gb2JqZWN0IG9uIHJlc29sdmUsIGFzIGVycm9yIGNvZGUgc3RyaW5nIG9uIHJlamVjdCAqL1xuICBfcmVzb2x2ZUFzSlNPTihyZXNwb25zZSkge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlQXMoJ2pzb24nLCByZXNwb25zZSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfcmVzb2x2ZUFzVGV4dFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IHB1YmxpYyBtZXRob2RzIG9uIGZldGNoIHJlc3BvbnNlcyB0byBmb3JtYXQgb3V0cHV0IGRhdGEgYXMgdGV4dCB0byBiZVxuICAgKiByZWFkIGluIEphdmFTY3JpcHQgY29kZSBhcyBzdHJpbmcgKG1vc3RseSB0byBwYXJzZSBIVE1MIHRlbXBsYXRlcykuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSBUaGUgPGNvZGU+ZmV0Y2g8L2NvZGU+IHJlc3BvbnNlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4sIGZvcm1hdCByZXNwb25zZSBhcyBhIHN0cmluZyBvbiByZXNvbHZlLCBhcyBlcnJvciBjb2RlIHN0cmluZyBvbiByZWplY3QgKi9cbiAgX3Jlc29sdmVBc1RleHQocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFzKCd0ZXh0JywgcmVzcG9uc2UpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgX3Jlc29sdmVBc1Jhd1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IFhtbEhUVFBSZXF1ZXN0cyB0byBmb3JtYXQgc2VydmVyIHJlc3BvbnNlIGFzIHJhdyBiaW5hcnkgZGF0YS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSAtIFRoZSA8Y29kZT5YbWxIVFRQUmVxdWVzdDwvY29kZT4gcmVzcG9uc2Ugc3RhdHVzIG9iamVjdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4sIGRvZXNuJ3QgZm9ybWF0IHJlc3BvbnNlIG9uIHJlc29sdmUsIHNlbmQgZXJyb3IgY29kZSBzdHJpbmcgb24gcmVqZWN0ICovXG4gIF9yZXNvbHZlQXNSYXcocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFzKCdyYXcnLCByZXNwb25zZSk7XG4gIH1cblxuXG4gIF94aHJDYWxsKHVybCwgdmVyYiwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKHZlcmIsIHVybCwgdHJ1ZSk7XG4gICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnRhcmdldC5yZWFkeVN0YXRlID09PSA0KSB7IC8vIFJlYWR5IHN0YXRlIGNoYW5nZWQgaGFzIHJlYWNoIHRoZSByZXNwb25zZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuX3Jlc29sdmVBc1JhdyhyZXNwb25zZS50YXJnZXQpXG4gICAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCdGX0tPTV9YSFJfRVJST1InKTtcbiAgICAgIH07XG4gICAgICB4aHIuc2VuZChkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBIVFRQIFNFUlZFUiBDQUxMUyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBnZXRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5HRVQ8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj48Y29kZT5yZXNvbHZlPC9jb2RlPiByZXR1cm5zIHRoZVxuICAgKiByZXNwb25zZSBhcyBhbiA8Y29kZT5PYmplY3Q8L2NvZGU+Ljxicj48Y29kZT5yZWplY3Q8L2NvZGU+IHJldHVybnMgYW4gZXJyb3Iga2V5IGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi5cbiAgICogSXQgaXMgbWVhbnQgdG8gcGVyZm9ybSBBUEkgY2FsbCB0byBhY2Nlc3MgZGF0YWJhc2UgdGhyb3VnaCB0aGUgdXNlciBpbnRlcmZhY2UuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPkdFVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbSwgaW4gc3VwcG9ydGVkIGJhY2sgVVJMc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgZ2V0KHVybCwgcmVzb2x1dGlvbiA9IHRoaXMuX3Jlc29sdmVBc0pTT04uYmluZCh0aGlzKSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhbdGhpcy5faGVhZGVyc1swXV0pIC8vIENvbnRlbnQgdHlwZSB0byBKU09OXG4gICAgICB9O1xuXG4gICAgICBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc29sdXRpb24pXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgZ2V0VGV4dFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPkdFVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPjxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlXG4gICAqIHJlc3BvbnNlIGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uIEl0IGlzXG4gICAqIG1lYW50IHRvIHBlcmZvcm0gQVBJIGNhbGwgdG8gZ2V0IEhUTUwgdGVtcGxhdGVzIGFzIHN0cmluZyB0byBiZSBwYXJzZWQgYXMgZG9jdW1lbnRzL2RvY3VtZW50cyBmcmFnbWVudHMuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPkdFVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbSwgaW4gc3VwcG9ydGVkIGJhY2sgVVJMc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgZ2V0VGV4dCh1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQodXJsLCB0aGlzLl9yZXNvbHZlQXNUZXh0LmJpbmQodGhpcykpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgZ2V0UmF3XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+R0VUPC9jb2RlPiBIVFRQIHJlcXVlc3QgdXNpbmcgYW4gPGNvZGU+WE1MSHR0cFJlcXVlc3Q8L2NvZGU+LCB3aXRoIGFuIG92ZXJyaWRlXG4gICAqIG1pbWUgdHlwZSBoYWNrIHRvIHBhc3MgYnl0ZXMgdGhyb3VnaCB1bnByb2Nlc3NlZC48YnI+PGNvZGU+cmVzb2x2ZTwvY29kZT4gcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgcmF3IGJpbmFyeSBkYXRhLjxicj48Y29kZT5yZWplY3Q8L2NvZGU+XG4gICAqIHJldHVybnMgYW4gZXJyb3IgY29kZSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIHVybCB0byBmZXRjaCByYXcgZGF0YSBmcm9tXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBnZXRSYXcodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3hockNhbGwodXJsLCAnR0VUJywgbnVsbClcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBwb3N0XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+UE9TVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPkJld2FyZSB0aGF0IHRoZSBnaXZlbiBvcHRpb25zXG4gICAqIG9iamVjdCBtYXRjaCB0aGUgdXJsIGV4cGVjdGF0aW9ucy48YnI+PGNvZGU+cmVzb2x2ZTwvY29kZT5cbiAgICogcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgYW4gPGNvZGU+T2JqZWN0PC9jb2RlPi48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPlBPU1Q8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb21cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgPGNvZGU+SlNPTjwvY29kZT4gb2JqZWN0IHRoYXQgY29udGFpbnMgPGNvZGU+UE9TVDwvY29kZT4gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgcG9zdCh1cmwsIGRhdGEsIHJlc29sdXRpb24gPSB0aGlzLl9yZXNvbHZlQXNKU09OLmJpbmQodGhpcykpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuX2hlYWRlcnMpLCAvLyBQT1NUIG5lZWRzIGFsbCBwcmV2aW91c2x5IGRlZmluZWQgaGVhZGVyc1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgfTtcblxuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNvbHV0aW9uKVxuICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIHBvc3RUZXh0XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+UE9TVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPkJld2FyZSB0aGF0IHRoZSBnaXZlbiBvcHRpb25zXG4gICAqIG9iamVjdCBtYXRjaCB0aGUgdXJsIGV4cGVjdGF0aW9ucy48YnI+PGNvZGU+cmVzb2x2ZTwvY29kZT5cbiAgICogcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+Ljxicj48Y29kZT5yZWplY3Q8L2NvZGU+IHJldHVybnMgYW4gZXJyb3Iga2V5IGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgPGNvZGU+UE9TVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSA8Y29kZT5KU09OPC9jb2RlPiBvYmplY3QgdGhhdCBjb250YWlucyA8Y29kZT5QT1NUPC9jb2RlPiBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBwb3N0VGV4dCh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KHVybCwgZGF0YSwgdGhpcy5fcmVzb2x2ZUFzVGV4dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIHBvc3RSYXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5QT1NUPC9jb2RlPiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIGZldGNoIEFQSS48YnI+QmV3YXJlIHRoYXQgdGhlIGdpdmVuIG9wdGlvbnNcbiAgICogb2JqZWN0IG1hdGNoIHRoZSB1cmwgZXhwZWN0YXRpb25zLjxicj48Y29kZT5yZXNvbHZlPC9jb2RlPiwgd2l0aCBhbiBvdmVycmlkZVxuICAgKiBtaW1lIHR5cGUgaGFjayB0byBwYXNzIGJ5dGVzIHRocm91Z2ggdW5wcm9jZXNzZWQuPGJyPjxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIHJhdyBiaW5hcnkgZGF0YS48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPlxuICAgKiByZXR1cm5zIGFuIGVycm9yIGNvZGUgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSB1cmwgdG8gZmV0Y2ggcmF3IGRhdGEgZnJvbVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSA8Y29kZT5KU09OPC9jb2RlPiBvYmplY3QgdGhhdCBjb250YWlucyA8Y29kZT5QT1NUPC9jb2RlPiBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBwb3N0UmF3KHVybCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl94aHJDYWxsKHVybCwgJ1BPU1QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHBvc3RGb3JtKHVybCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBDcmVhdGUgdmlydHVhbCBmb3JtXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRk9STScpO1xuICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICBmb3JtLmFjdGlvbiA9IHVybDtcbiAgICAgIC8vIERlY2xhcmUgaXRzIHZpcnR1YWwgZmllbGRzIGZyb20gc2VudCBkYXRhXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb25zdCBoaWRkZW5GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lOUFVUJyk7XG4gICAgICAgICAgaGlkZGVuRmllbGQudHlwZSA9ICdoaWRkZW4nO1xuICAgICAgICAgIGhpZGRlbkZpZWxkLm5hbWUgPSBrZXk7XG4gICAgICAgICAgaGlkZGVuRmllbGQudmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChoaWRkZW5GaWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEJ1aWxkIFhIUiB3aXRoIHhzcmYgdG9rZW5cbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtWFNSRi1UT0tFTicsIHRoaXMuX2NzcmZUb2tlbik7XG4gICAgICAvLyBSZWdpc3RlciB0aGUgc3RhdGUgY2hhbmdlIGV2ZW50XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gcmVzcG9uc2UgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UudGFyZ2V0LnJlYWR5U3RhdGUgPT09IDQpIHsgLy8gUmVhZHkgc3RhdGUgY2hhbmdlZCBoYXMgcmVhY2ggdGhlIHJlc3BvbnNlIHN0YXRlXG4gICAgICAgICAgLy8gQXMgc3BlY2lmaWVkIHdpdGggYmFja2VuZCwgcmVzcG9uc2UgaXMgSlNPTiBpZiBzdWNjZXNzLCBIVE1MIG90aGVyd2lzZVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBjYW4gcGFyc2UgYXMgYSBKU09OLCBldmVyeXRoaW5nIHdlbnQgZmluZSBzZXJ2ZXIgc2lkZVxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gSlNPTi5wYXJzZShyZXNwb25zZS50YXJnZXQucmVzcG9uc2UpO1xuICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGUgc2VydmVyIHJldHVybnMgdGhlIHRlbXBsYXRlIHdpdGggaXRzIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLnRhcmdldC5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgLy8gWEhSIGVycm9yIGhhbmRsaW5nXG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCdGX0tPTV9YSFJfRVJST1InKTtcbiAgICAgIH07XG4gICAgICAvLyBDcmVhdGUgZm9ybSBkYXRhIGFuZCBzZW5kIGl0IHRocm91Z2ggdGhlIFhIUlxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgS29tO1xuIiwiaW1wb3J0IFVzZXJJbnRlcmZhY2UgZnJvbSAnLi4vdmlldy9Vc2VySW50ZXJmYWNlJztcbmltcG9ydCBLb20gZnJvbSAnLi9Lb20nO1xuJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIE16ayB7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtvbSA9IG51bGw7XG4gICAgdGhpcy51aSA9IG51bGw7XG4gIH1cblxuXG4gIGluaXRTZXNzaW9uKCkge1xuICAgIHRoaXMua29tID0gbmV3IEtvbSgpO1xuICAgIHRoaXMudWkgPSBuZXcgVXNlckludGVyZmFjZSgpO1xuICAgIHRoaXMudWkuc3RvcExvYWRpbmcoKTtcbiAgfVxuXG5cbiAgc2V0VmlldyhvcHRpb25zKSB7XG4gICAgdGhpcy51aS5zZXRTY2VuZVZpZXcob3B0aW9ucykudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndmlldyBpbnN0YW50aWF0ZWQnKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBMb2dnZXIucmFpc2UoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cblxuICBzZXRNb2RhbChvcHRpb25zKSB7XG4gICAgdGhpcy51aS5zZXRNb2RhbChvcHRpb25zKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBjcmVhdGVkJyk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZ2V0RnJhZ21lbnQob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnVpLmdldEZyYWdtZW50KG9wdGlvbnMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZnJhZ21lbnQgZmV0Y2hlZCcpO1xuICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE16aztcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5jbGFzcyBDdXN0b21FdmVudHMge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5KYXZhU2NyaXB0IHJlZ3VsYXIgYW5kIGN1c3RvbSBldmVudHMgYWJzdHJhY3Rpb248L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGUgQ3VzdG9tRXZlbnRzIGNsYXNzIHByb3ZpZGVzIGFuIGFic3RyYWN0aW9uIG9mIEphdmFTY3JpcHQgZXZlbnQgbGlzdGVuZXIsIHRvIGFsbG93XG4gICAqIGVhc3kgYmluZGluZyBhbmQgcmVtb3ZpbmcgdGhvc2UgZXZlbnRzLiBJdCBhbHNvIHByb3ZpZGVzIGFuIGludGVyZmFjZSB0byByZWdpc3RlciBjdXN0b20gZXZlbnRzLiBUaGlzIGNsYXNzIGlzXG4gICAqIG1lYW50IHRvIGJlIHVzZWQgb24gYWxsIHNjb3BlcyB5b3UgbmVlZCA7IG1vZHVsZSBvciBnbG9iYWwuIFJlZmVyIHRvIGVhY2ggcHVibGljIG1ldGhvZCBmb3IgZGV0YWlsZWQgZmVhdHVyZXMuXG4gICAqIEZvciBzb3VyY2UgY29kZSwgcGxlYXNlIGdvIHRvIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vQXJ0aHVyQmVhdWxpZXUvQ3VzdG9tRXZlbnRzLmpzXCIgYWx0PVwiY3VzdG9tLWV2ZW50cy1qc1wiPlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vQXJ0aHVyQmVhdWxpZXUvQ3VzdG9tRXZlbnRzLmpzPC9hPjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZGVidWc9ZmFsc2VdIC0gRGVidWcgZmxhZyA7IHdoZW4gdHJ1ZSwgbG9ncyB3aWxsIGJlIG91dHB1dCBpbiBKYXZhU2NyaXB0IGNvbnNvbGUgYXQgZWFjaCBldmVudCAqL1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBkZWJ1Z1xuICAgIGlmICh0eXBlb2YgZGVidWcgIT09ICdib29sZWFuJykge1xuICAgICAgZGVidWcgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7Ym9vbGVhbn0gLSBJbnRlcm5hbCBsb2dnaW5nIGZsYWcgZnJvbSBjb25zdHJ1Y3RvciBvcHRpb25zLCBhbGxvdyB0byBvdXRwdXQgZWFjaCBldmVudCBhY3Rpb24gKi9cbiAgICB0aGlzLl9kZWJ1ZyA9IGRlYnVnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBTdGFydCB0aGUgSUQgaW5jcmVtZW50ZXIgYXQgcHNldWRvIHJhbmRvbSB2YWx1ZSwgdXNlZCBmb3IgYm90aCByZWd1bGFyIGFuZCBjdXN0b20gZXZlbnRzICovXG4gICAgdGhpcy5faWRJbmNyZW1lbnRvciA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDI1NikpICogNTY3OCk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7YW55W119IC0gV2Ugc3RvcmUgY2xhc3NpY2FsIGV2ZW50IGxpc3RlbmVycyBpbiBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgYWxsIHRoZWlyIGluZm9ybWF0aW9uICovXG4gICAgdGhpcy5fcmVndWxhckV2ZW50cyA9IFtdO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBXZSBzdG9yZSBjdXN0b20gZXZlbnRzIGJ5IG5hbWUgYXMga2V5LCBlYWNoIGtleSBzdG9yZXMgYW4gQXJyYXkgb2Ygc3Vic2NyaWJlZCBldmVudHMgKi9cbiAgICB0aGlzLl9jdXN0b21FdmVudHMgPSB7fTtcbiAgICAvKiogQHB1YmxpY1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBDb21wb25lbnQgdmVyc2lvbiAqL1xuICAgIHRoaXMudmVyc2lvbiA9ICcxLjEuMCc7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5DdXN0b21FdmVudHMgZGVzdHJ1Y3Rvci4gV2lsbCByZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQga2V5cyBpbiBpbnN0YW5jZS48L2Jsb2NrcXVvdGU+ICovXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCAnQ3VzdG9tRXZlbnRzLmRlc3Ryb3knKTtcbiAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIGV2ZW50TGlzdGVuZXJcbiAgICB0aGlzLnJlbW92ZUFsbEV2ZW50cygpO1xuICAgIC8vIERlbGV0ZSBvYmplY3QgYXR0cmlidXRlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDTEFTU0lDIEpTIEVWRU5UUyBPVkVSUklERSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIG1hZGUgdG8gYWJzdHJhY3QgdGhlIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBKYXZhU2NyaXB0IGxheWVyLCBzbyB5b3UgY2FuIGVhc2lseSAgICAgKi9cbiAgLyogIHJlbW92ZSB0aGVtIHdoZW4gZG9uZSB1c2luZywgd2l0aG91dCBib3RoZXJpbmcgd2l0aCBiaW5kaW5nIHVzdWFsIGJ1c2luZXNzIGZvciB0aGVtLiAnYWRkRXZlbnQvcmVtb3ZlRXZlbnQnICAgICAqL1xuICAvKiAgbWV0aG9kIHJlcGxhY2UgdGhlIGluaXRpYWwgb25lcy4gJ3JlbW92ZUFsbEV2ZW50cycgY2xlYXJzIGFsbCBpbnN0YW5jZSBldmVudCBsaXN0ZW5lcnMgOyBuaWNlIGZvciBkZXN0cm95ICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkZEV2ZW50XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+YWRkRXZlbnQ8L2NvZGU+IG1ldGhvZCBhYnN0cmFjdHMgdGhlIDxjb2RlPmFkZEV2ZW50TGlzdGVuZXI8L2NvZGU+IG1ldGhvZCB0byBlYXNpbHlcbiAgICogcmVtb3ZlIGl0IHdoZW4gbmVlZGVkLCBhbHNvIHRvIHNldCBhIGN1c3RvbSBzY29wZSBvbiBjYWxsYmFjay48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgZXZlbnQgbmFtZSB0byBmaXJlIChtb3VzZW1vdmUsIGNsaWNrLCBjb250ZXh0IGV0Yy4pXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50IC0gVGhlIERPTSBlbGVtZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG9cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IGlzIHJlYWxpc2VkXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGU9ZWxlbWVudF0gLSBUaGUgZXZlbnQgc2NvcGUgdG8gYXBwbHkgdG8gdGhlIGNhbGxiYWNrIChvcHRpb25hbCwgZGVmYXVsdCB0byBET00gZWxlbWVudClcbiAgICogQHBhcmFtIHtvYmplY3R8Ym9vbGVhbn0gW29wdGlvbnM9ZmFsc2VdIC0gVGhlIGV2ZW50IG9wdGlvbnMgKHVzZUNhcHR1cmUgYW5kIGVsc2UpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ8Ym9vbGVhbn0gLSBUaGUgZXZlbnQgSUQgdG8gdXNlIHRvIG1hbnVhbGx5IHJlbW92ZSBhbiBldmVudCwgZmFsc2UgaWYgYXJndW1lbnRzIGFyZSBpbnZhbGlkICovXG4gIGFkZEV2ZW50KGV2ZW50TmFtZSwgZWxlbWVudCwgY2FsbGJhY2ssIHNjb3BlID0gZWxlbWVudCwgb3B0aW9ucyA9IGZhbHNlKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLmFkZEV2ZW50OiAke2V2ZW50TmFtZX0gJHtlbGVtZW50fSAke2NhbGxiYWNrfSAke3Njb3BlfSAke29wdGlvbnN9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gbnVsbCB8fCBldmVudE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMuYWRkRXZlbnQ6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBjb25zdCBlcnIgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLmFkZEV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgIH07XG4gICAgLy8gVGVzdCBhcmd1bWVudCB2YWxpZGl0eSBmb3IgZnVydGhlciBwcm9jZXNzXG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKHNjb3BlICE9PSBudWxsICYmIHNjb3BlICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBzY29wZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdW5kZWZpbmVkKSAmJiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zICE9PSAnYm9vbGVhbicpKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gU2F2ZSBzY29wZSB0byBjYWxsYmFjayBmdW5jdGlvbiwgZGVmYXVsdCBzY29wZSBpcyBET00gdGFyZ2V0IG9iamVjdFxuICAgIGNhbGxiYWNrID0gY2FsbGJhY2suYmluZChzY29wZSk7XG4gICAgLy8gQWRkIGV2ZW50IHRvIGludGVybmFsIGFycmF5IGFuZCBrZWVwIGFsbCBpdHMgZGF0YVxuICAgIHRoaXMuX3JlZ3VsYXJFdmVudHMucHVzaCh7XG4gICAgICBpZDogdGhpcy5faWRJbmNyZW1lbnRvcixcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9KTtcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgd2l0aCBvcHRpb25zXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIC8vIFBvc3QgaW5jcmVtZW50IHRvIHJldHVybiB0aGUgdHJ1ZSBldmVudCBlbnRyeSBpZCwgdGhlbiB1cGRhdGUgdGhlIGluY3JlbWVudGVyXG4gICAgcmV0dXJuIHRoaXMuX2lkSW5jcmVtZW50b3IrKztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgcmVtb3ZlRXZlbnRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5yZW1vdmVFdmVudDwvY29kZT4gbWV0aG9kIGFic3RyYWN0cyB0aGUgPGNvZGU+cmVtb3ZlRXZlbnRMaXN0ZW5lcjwvY29kZT4gbWV0aG9kIHRvXG4gICAqIHJlYWxseSByZW1vdmUgZXZlbnQgbGlzdGVuZXJzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50SWQgLSBUaGUgZXZlbnQgSUQgdG8gcmVtb3ZlIGxpc3RlbmVyIGZyb20uIFJldHVybmVkIHdoZW4gYWRkRXZlbnQgaXMgY2FsbGVkXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBldmVudCAqL1xuICByZW1vdmVFdmVudChldmVudElkKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgRXZlbnRzLnJlbW92ZUV2ZW50OiAke2V2ZW50SWR9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50SWQgPT09IG51bGwgfHwgZXZlbnRJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnJlbW92ZUV2ZW50OiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGV2ZW50SWQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnJlbW92ZUV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBJdGVyYXRlIG92ZXIgc2F2ZWQgbGlzdGVuZXJzLCByZXZlcnNlIG9yZGVyIGZvciBwcm9wZXIgc3BsaWNpbmdcbiAgICBmb3IgKGxldCBpID0gKHRoaXMuX3JlZ3VsYXJFdmVudHMubGVuZ3RoIC0gMSk7IGkgPj0gMCA7IC0taSkge1xuICAgICAgLy8gSWYgYW4gZXZlbnQgSUQgbWF0Y2ggaW4gc2F2ZWQgb25lcywgd2UgcmVtb3ZlIGl0IGFuZCB1cGRhdGUgc2F2ZWQgbGlzdGVuZXJzXG4gICAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50c1tpXS5pZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCByZW1vdmVkIGV2ZW50IGxpc3RlbmVyIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICB0aGlzLl9jbGVhclJlZ3VsYXJFdmVudChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgcmVtb3ZlQWxsRXZlbnRzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+Q2xlYXIgYWxsIGV2ZW50IGxpc3RlbmVyIHJlZ2lzdGVyZWQgdGhyb3VnaCB0aGlzIGNsYXNzIG9iamVjdC48L2Jsb2NrcXVvdGU+XG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vdCByZW1vdmVkIGFueSBldmVudCAqL1xuICByZW1vdmVBbGxFdmVudHMoKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCAnQ3VzdG9tRXZlbnRzLnJlbW92ZUFsbEV2ZW50cycpO1xuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gRGlkbid0IHJlbW92ZWQgYW55IHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIEZsYWcgdG8ga25vdyBpZiB0aGVyZSB3YXMgYW55IHByZXZpb3VzbHkgc3RvcmVkIGV2ZW50IGxpc3RlbmVyc1xuICAgIGNvbnN0IGhhZEV2ZW50cyA9ICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCA+IDApO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBzYXZlZCBsaXN0ZW5lcnMsIHJldmVyc2Ugb3JkZXIgZm9yIHByb3BlciBzcGxpY2luZ1xuICAgIGZvciAobGV0IGkgPSAodGhpcy5fcmVndWxhckV2ZW50cy5sZW5ndGggLSAxKTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRoaXMuX2NsZWFyUmVndWxhckV2ZW50KGkpO1xuICAgIH1cbiAgICAvLyBJZiBhbGwgZXZlbnRzIHdoZXJlIHJlbW92ZWQsIHVwZGF0ZSBzdGF0dXNDb2RlIHRvIHN1Y2Nlc3NcbiAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50cy5sZW5ndGggPT09IDAgJiYgaGFkRXZlbnRzKSB7XG4gICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgcmVtb3ZlZCBhbGwgZXZlbnRzIGxpc3RlbmVyIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfY2xlYXJSZWd1bGFyRXZlbnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+X2NsZWFyUmVndWxhckV2ZW50PC9jb2RlPiBtZXRob2QgcmVtb3ZlIHRoZSBzYXZlZCBldmVudCBsaXN0ZW5lciBmb3IgYVxuICAgKiBnaXZlbiBpbmRleCBpbiByZWd1bGFyRXZlbnRzIGFycmF5IHJhbmdlLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHJlZ3VsYXIgZXZlbnQgaW5kZXggdG8gcmVtb3ZlIGZyb20gY2xhc3MgYXR0cmlidXRlc1xuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vdCBjbGVhcmVkIGFueSBldmVudCAqL1xuICBfY2xlYXJSZWd1bGFyRXZlbnQoaW5kZXgpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBDdXN0b21FdmVudHMuX2NsZWFyUmVndWxhckV2ZW50OiAke2luZGV4fWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChpbmRleCA9PT0gbnVsbCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLl9jbGVhclJlZ3VsYXJFdmVudDogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5fY2xlYXJSZWd1bGFyRXZlbnQ6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIENoZWNrIGlmIGluZGV4IG1hdGNoIGFuIGV4aXN0aW5nIGV2ZW50IGluIGF0dHJpYnV0ZXNcbiAgICBpZiAodGhpcy5fcmVndWxhckV2ZW50c1tpbmRleF0pIHtcbiAgICAgIC8vIFJlbW92ZSBpdHMgZXZlbnQgbGlzdGVuZXIgYW5kIHVwZGF0ZSByZWd1bGFyRXZlbnRzIGFycmF5XG4gICAgICBjb25zdCBldnQgPSB0aGlzLl9yZWd1bGFyRXZlbnRzW2luZGV4XTtcbiAgICAgIGV2dC5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LmV2ZW50TmFtZSwgZXZ0LmNhbGxiYWNrLCBldnQub3B0aW9ucyk7XG4gICAgICB0aGlzLl9yZWd1bGFyRXZlbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIENVU1RPTSBKUyBFVkVOVFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgdGhyZWUgZm9sbG93aW5nIG1ldGhvZHMgKHN1YnNjcmliZSwgdW5zdWJzY3JpYmUsIHB1Ymxpc2gpIGFyZSBkZXNpZ25lZCB0byByZWZlcmVuY2UgYW4gZXZlbnQgYnkgaXRzIG5hbWUgICAgKi9cbiAgLyogIGFuZCBoYW5kbGUgYXMgbWFueSBzdWJzY3JpcHRpb25zIGFzIHlvdSB3YW50LiBXaGVuIHN1YnNjcmliaW5nLCB5b3UgZ2V0IGFuIElEIHlvdSBjYW4gdXNlIHRvIHVuc3Vic2NyaWJlIHlvdXIgICAqL1xuICAvKiAgZXZlbnQgbGF0ZXIuIEp1c3QgcHVibGlzaCB3aXRoIHRoZSBldmVudCBuYW1lIHRvIGNhbGxiYWNrIGFsbCBpdHMgcmVnaXN0ZXJlZCBzdWJzY3JpcHRpb25zLiAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN1YnNjcmliZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlN1YnNjcmliZSBtZXRob2QgYWxsb3cgeW91IHRvIGxpc3RlbiB0byBhbiBldmVudCBhbmQgcmVhY3Qgd2hlbiBpdCBvY2N1cnMuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gRXZlbnQgbmFtZSAodGhlIG9uZSB0byB1c2UgdG8gcHVibGlzaClcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGV2ZW50IGlzIHB1Ymxpc2hlZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvbmVTaG90PWZhbHNlXSAtIE9uZSBzaG90IDogdG8gcmVtb3ZlIHN1YnNjcmlwdGlvbiB0aGUgZmlyc3QgdGltZSBjYWxsYmFjayBpcyBmaXJlZFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfGJvb2xlYW59IC0gVGhlIGV2ZW50IGlkLCB0byBiZSB1c2VkIHdoZW4gbWFudWFsbHkgdW5zdWJzY3JpYmluZyAqL1xuICBzdWJzY3JpYmUoZXZlbnROYW1lLCBjYWxsYmFjaywgb25lU2hvdCA9IGZhbHNlKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLnN1YnNjcmliZTogJHtldmVudE5hbWV9ICR7Y2FsbGJhY2t9ICR7b25lU2hvdH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnN1YnNjcmliZScsICdNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgY29uc3QgZXJyID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5zdWJzY3JpYmU6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKChvbmVTaG90ICE9PSBudWxsICYmIG9uZVNob3QgIT09IHVuZGVmaW5lZCkgJiYgdHlwZW9mIG9uZVNob3QgIT09ICdib29sZWFuJykge1xuICAgICAgZXJyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIENyZWF0ZSBldmVudCBlbnRyeSBpZiBub3QgYWxyZWFkeSBleGlzdGluZyBpbiB0aGUgcmVnaXN0ZXJlZCBldmVudHNcbiAgICBpZiAoIXRoaXMuX2N1c3RvbUV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICB0aGlzLl9jdXN0b21FdmVudHNbZXZlbnROYW1lXSA9IFtdOyAvLyBTZXQgZW1wdHkgYXJyYXkgZm9yIG5ldyBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgfVxuICAgIC8vIFB1c2ggbmV3IHN1YnNjcmlwdGlvbiBmb3IgZXZlbnQgbmFtZVxuICAgIHRoaXMuX2N1c3RvbUV2ZW50c1tldmVudE5hbWVdLnB1c2goe1xuICAgICAgaWQ6IHRoaXMuX2lkSW5jcmVtZW50b3IsXG4gICAgICBuYW1lOiBldmVudE5hbWUsXG4gICAgICBvczogb25lU2hvdCxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuICAgIC8vIFBvc3QgaW5jcmVtZW50IHRvIHJldHVybiB0aGUgdHJ1ZSBldmVudCBlbnRyeSBpZCwgdGhlbiB1cGRhdGUgdGhlIGluY3JlbWVudGVyXG4gICAgcmV0dXJuIHRoaXMuX2lkSW5jcmVtZW50b3IrKztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgdW5zdWJzY3JpYmVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5VbnN1YnNjcmliZSBtZXRob2QgYWxsb3cgeW91IHRvIHJldm9rZSBhbiBldmVudCBzdWJzY3JpcHRpb24gZnJvbSBpdHMgc3RyaW5nIG5hbWUuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge251bWJlcn0gZXZlbnRJZCAtIFRoZSBzdWJzY3JpcHRpb24gaWQgcmV0dXJuZWQgd2hlbiBzdWJzY3JpYmluZyB0byBhbiBldmVudCBuYW1lXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBzdWJzY3JpcHRpb24gKiovXG4gIHVuc3Vic2NyaWJlKGV2ZW50SWQpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBDdXN0b21FdmVudHMudW5zdWJzY3JpYmU6ICR7ZXZlbnRJZH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnRJZCA9PT0gbnVsbCB8fCBldmVudElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMudW5zdWJzY3JpYmU6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5KVxuICAgIGlmICh0eXBlb2YgZXZlbnRJZCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMudW5zdWJzY3JpYmU6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gTm90IGZvdW5kIHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIFNhdmUgZXZlbnQga2V5cyB0byBpdGVyYXRlIHByb3Blcmx5IG9uIHRoaXMuX2V2ZW50cyBPYmplY3RcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY3VzdG9tRXZlbnRzKTtcbiAgICAvLyBSZXZlcnNlIGV2ZW50cyBpdGVyYXRpb24gdG8gcHJvcGVybHkgc3BsaWNlIHdpdGhvdXQgbWVzc2luZyB3aXRoIGl0ZXJhdGlvbiBvcmRlclxuICAgIGZvciAobGV0IGkgPSAoa2V5cy5sZW5ndGggLSAxKTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICBjb25zdCBzdWJzID0gdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZW50cyBzdWJzY3JpcHRpb25zIHRvIGZpbmQgdGhlIG9uZSB3aXRoIGdpdmVuIGlkXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN1YnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgLy8gSW4gY2FzZSB3ZSBnb3QgYSBzdWJzY3JpcHRpb24gZm9yIHRoaXMgZXZlbnRzXG4gICAgICAgIGlmIChzdWJzW2pdLmlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgICAgICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlOiBzdWJzY3JpcHRpb24gZm91bmRcXG5gLCBzdWJzW2pdLCBgXFxuU3Vic2NyaXB0aW9uIG7CsCR7ZXZlbnRJZH0gZm9yICR7c3Vicy5uYW1lfSBoYXMgYmVlbiByZW1vdmVkYCk7XG4gICAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCB1bnN1YnNjcmliZWQgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgICAgICAgLy8gUmVtb3ZlIHN1YnNjcmlwdGlvbiBmcm9tIGV2ZW50IEFycmF5XG4gICAgICAgICAgc3Vicy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IG5hbWUgaWYgbm8gcmVtYWluaW5nIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEJyZWFrIHNpbmNlIGlkIGFyZSB1bmlxdWUgYW5kIG5vIG90aGVyIHN1YnNjcmlwdGlvbiBjYW4gYmUgZm91bmQgYWZ0ZXJcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnN1YnNjcmliZUFsbEZvclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPnVuc3Vic2NyaWJlQWxsRm9yPC9jb2RlPiBtZXRob2QgY2xlYXIgYWxsIHN1YnNjcmlwdGlvbnMgcmVnaXN0ZXJlZCBmb3IgZ2l2ZW4gZXZlbnQgbmFtZS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgZXZlbnQgdG8gY2xlYXIgc3Vic2NyaXB0aW9uIGZyb21cbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIG1ldGhvZCBzdGF0dXMgOyB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3Igbm9uLWV4aXN0aW5nIGV2ZW50ICoqL1xuICB1bnN1YnNjcmliZUFsbEZvcihldmVudE5hbWUpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBDdXN0b21FdmVudHMudW5zdWJzY3JpYmVBbGxGb3I6ICR7ZXZlbnROYW1lfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMudW5zdWJzY3JpYmVBbGxGb3I6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMudW5zdWJzY3JpYmVBbGxGb3I6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gTm90IGZvdW5kIHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIFNhdmUgZXZlbnQga2V5cyB0byBpdGVyYXRlIHByb3Blcmx5IG9uIHRoaXMuX2V2ZW50cyBPYmplY3RcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY3VzdG9tRXZlbnRzKTtcbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggY3VzdG9tIGV2ZW50IGtleXMgdG8gZmluZCBtYXRjaGluZyBldmVudCB0byByZW1vdmVcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChrZXlzW2ldID09PSBldmVudE5hbWUpIHtcbiAgICAgICAgLy8gR2V0IGV2ZW50IHN1YnNjcmlwdGlvbnNcbiAgICAgICAgY29uc3Qgc3VicyA9IHRoaXMuX2N1c3RvbUV2ZW50c1trZXlzW2ldXTtcbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGV2ZW50cyBzdWJzY3JpcHRpb25zIHRvIGZpbmQgdGhlIG9uZSB3aXRoIGdpdmVuIGlkLCByZXZlcnNlIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBzcGxpY2Ugd2l0aG91dCBtZXNzaW5nIHdpdGggaXRlcmF0aW9uIG9yZGVyXG4gICAgICAgIGZvciAobGV0IGogPSAoc3Vicy5sZW5ndGggLSAxKTsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgICAgICBzdGF0dXNDb2RlID0gdHJ1ZTsgLy8gRm91bmQgYW5kIHVuc3Vic2NyaWJlZCBhbGwgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgICAgICAgLy8gUmVtb3ZlIHN1YnNjcmlwdGlvbiBmcm9tIGV2ZW50IEFycmF5XG4gICAgICAgICAgc3Vicy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IG5hbWUgaWYgbm8gcmVtYWluaW5nIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB3aXRoIHN0YXR1cyBjb2RlXG4gICAgcmV0dXJuIHN0YXR1c0NvZGU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHB1Ymxpc2hcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5QdWJsaXNoPC9jb2RlPiBtZXRob2QgYWxsb3cgeW91IHRvIGZpcmUgYW4gZXZlbnQgYnkgbmFtZSBhbmQgdHJpZ2dlciBhbGwgaXRzIHN1YnNjcmlwdGlvbiBieSBjYWxsYmFja3MuL2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBFdmVudCBuYW1lICh0aGUgb25lIHRvIHVzZSB0byBwdWJsaXNoKVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2RhdGE9dW5kZWZpbmVkXSAtIFRoZSBkYXRhIG9iamVjdCB0byBzZW50IHRocm91Z2ggdGhlIGN1c3RvbSBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3RpbmcgZXZlbnQgKiovXG4gIHB1Ymxpc2goZXZlbnROYW1lLCBkYXRhID0gbnVsbCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEN1c3RvbUV2ZW50cy5wdWJsaXNoOiAke2V2ZW50TmFtZX0gJHtkYXRhfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMucHVibGlzaDogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkgYW5kIG9wdGlvbmFsKVxuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJyB8fCAoZGF0YSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JykpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMucHVibGlzaDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gU2F2ZSBldmVudCBrZXlzIHRvIGl0ZXJhdGUgcHJvcGVybHkgb24gdGhpcy5fZXZlbnRzIE9iamVjdFxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9jdXN0b21FdmVudHMpO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBzYXZlZCBjdXN0b20gZXZlbnRzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAvLyBJZiBwdWJsaXNoZWQgbmFtZSBtYXRjaCBhbiBleGlzdGluZyBldmVudHMsIHdlIGl0ZXJhdGUgaXRzIHN1YnNjcmlwdGlvbnMuIEZpcnN0IHN1YnNjcmliZWQsIGZpcnN0IHNlcnZlZFxuICAgICAgaWYgKGtleXNbaV0gPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAvLyBVcGRhdGUgc3RhdHVzIGNvZGVcbiAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCBwdWJsaXNoZWQgc3RhdHVzIGNvZGUgKHRydWUpXG4gICAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVudHMgc3Vic2NyaXB0aW9ucyB0byBmaW5kIHRoZSBvbmUgd2l0aCBnaXZlbiBpZFxuICAgICAgICAvLyBSZXZlcnNlIHN1YnNjcmlwdGlvbnMgaXRlcmF0aW9uIHRvIHByb3Blcmx5IHNwbGljZSB3aXRob3V0IG1lc3Npbmcgd2l0aCBpdGVyYXRpb24gb3JkZXJcbiAgICAgICAgZm9yIChsZXQgaiA9IChzdWJzLmxlbmd0aCAtIDEpOyBqID49IDA7IC0taikge1xuICAgICAgICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICAgICAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEN1c3RvbUV2ZW50cy5wdWJsaXNoOiBmaXJlIGNhbGxiYWNrIGZvciAke2V2ZW50TmFtZX0sIHN1YnNjcmlwdGlvbiBuwrAke3N1YnNbal0uaWR9YCwgc3Vic1tqXSk7XG4gICAgICAgICAgLy8gRmlyZSBzYXZlZCBjYWxsYmFja1xuICAgICAgICAgIHN1YnNbal0uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgLy8gUmVtb3ZlIG9uZVNob3QgbGlzdGVuZXIgZnJvbSBldmVudCBlbnRyeVxuICAgICAgICAgIGlmIChzdWJzW2pdLm9zKSB7XG4gICAgICAgICAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgICAgICAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0N1c3RvbUV2ZW50cy5wdWJsaXNoOiByZW1vdmUgc3Vic2NyaXB0aW9uIGJlY2F1c2Ugb25lIHNob3QgdXNhZ2UgaXMgZG9uZScpO1xuICAgICAgICAgICAgc3Vicy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbmFtZSBpZiBubyByZW1haW5pbmcgc3Vic2NyaXB0aW9uc1xuICAgICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB3aXRoIHN0YXR1cyBjb2RlXG4gICAgcmV0dXJuIHN0YXR1c0NvZGU7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDT01QT05FTlQgVVRJTFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfcmFpc2VcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+SW50ZXJuYWwgbWV0aG9kIHRvIGFic3RyYWN0IGNvbnNvbGUgd3JhcHBlZCBpbiBkZWJ1ZyBmbGFnLi9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWwgLSBUaGUgY29uc29sZSBtZXRob2QgdG8gY2FsbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JWYWx1ZSAtIFRoZSBlcnJvciB2YWx1ZSB0byBkaXNwbGF5IGluIGNvbnNvbGUgbWV0aG9kICoqL1xuICBfcmFpc2UobGV2ZWwsIGVycm9yVmFsdWUpIHtcbiAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgIGNvbnNvbGVbbGV2ZWxdKGVycm9yVmFsdWUpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDdXN0b21FdmVudHM7XG4iLCJjbGFzcyBEcmFnRWxlbWVudCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPk1ha2UgYW55IERPTSBlbGVtZW50IGRyYWdnYWJsZTwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIGNsYXNzIHdpbGwgbWFrZSBhbnkgRE9NIGVsZW1lbnQgZHJhZ2dhYmxlLCBhbmQgYXR0YWNoIHNwZWNpZmljIGRhdGEgb24gaXQgdGhhdCBjYW4gYmVcbiAgICogdXNlZCBvbiBkcm9wIChzZWUgRHJvcEVsZW1lbnQgY2xhc3MpLiBJdCBoYW5kbGUgYm90aCB0aGUgZGVza3RvcCBhbmQgdGhlIG1vYmlsZSBiZWhhdmlvci4gSXQgbXVzdCBiZSB1c2VkIHdpdGggYVxuICAgKiBEcm9wRWxlbWVudCBjbGFzcyBmb3IgcGVyZmVjdCBjb21wYXRpYmlsaXR5ITwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgZWxlbWVudCB0byBkcmFnIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMudGFyZ2V0IC0gVGhlIGVsZW1lbnQgdG8gbWFrZSBkcmFnZ2FibGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZGF0YSAtIFRoZSBkYXRhIHRvIGF0dGFjaCB0byB0aGUgZHJhZyBldmVudCwgdGhhdCB3aWxsIGJlIHJldHJpZXZlZCBvbiBkcm9wICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBlbGVtZW50IHRvIG1ha2UgZHJhZ2dhYmxlICovXG4gICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBkYXRhIHRvIGF0dGFjaGVkICovXG4gICAgdGhpcy5fZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJbXX0gLSBUaGUgZXZlbnQgSURzIGZvciBhbGwgbW9iaWxlIGFuZCBkZXNrdG9wIGRyYWdnaW5nIGV2ZW50cyAqL1xuICAgIHRoaXMuX2V2ZW50SWRzID0gW107XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7Ym9vbGVhbn0gLSBBIGZsYWcgdG8ga25vdyBpZiBkcmFnZ2luZyBpcyBvY2N1cnJpbmcgaW4gbW9iaWxlICovXG4gICAgdGhpcy5fdG91Y2hTdGFydGVkID0gZmFsc2U7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSB0YXJnZXQgRE9NIGNvcHkgZm9yIGEgcHJvcGVyIGRyYWcgYW5pbWF0aW9uIGluIG1vYmlsZSAqL1xuICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbSA9IG51bGw7XG4gICAgLy8gQnVpbGQgRE9NIGVsZW1lbnRzIGFuZCBzdWJzY3JpYmUgdG8gZHJhZyBldmVudHNcbiAgICB0aGlzLl9idWlsZEVsZW1lbnRzKCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRHJhZ0VsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgdW5zdWJzY3JpYmUgYWxsIGRyYWcgZXZlbnRzIGFuZCByZW1vdmUgYWxsIHByb3BlcnRpZXMuPC9ibG9ja3F1b3RlPiAqKi9cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V2ZW50SWRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fZXZlbnRJZHNbaV0pO1xuICAgIH1cbiAgICBVdGlscy5yZW1vdmVBbGxPYmplY3RLZXlzKHRoaXMpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIERSQUdFTEVNRU5UIElOU1RBTlRJQVRJT04gU0VRVUVOQ0UgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkRWxlbWVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyYWdFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIG1ha2UgdGhlIHRhcmdldCBlbGVtZW50IGRyYWdnYWJsZSBhZGRpbmcgdGhlIHByb3BlciBhdHRyaWJ1dGUuIEl0IHdpbGxcbiAgICogYWxzbyBjcmVhdGUgYSBjb3B5IG9mIHRoZSBkcmFnZ2FibGUgRE9NIGVsZW1lbnQgYW5kIHNldCBpdHMgc3R5bGUgd2l0aCBhIGZpeGVkIHBvc2l0aW9uIGFuZCBoYWxmIGl0cyBvcGFjaXR5IHRvXG4gICAqIGVtdWxhdGUgdGhlIGRlc2t0b3AgZHJhZyBhbmltYXRpb24gaW4gbW9iaWxlLjwvYmxvY2txdW90ZT4gKiovXG4gIF9idWlsZEVsZW1lbnRzKCkge1xuICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbSA9IHRoaXMuX3RhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uc3R5bGUub3BhY2l0eSA9ICcuNSc7XG4gICAgdGhpcy5fdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJhZ0VsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgc3Vic2NyaWJlIHRvIGRyYWcgZXZlbnRzLCBib3RoIGZvciBkZXNrdG9wIGFuZCBtb2JpbGUuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnZHJhZ3N0YXJ0JywgdGhpcy5fdGFyZ2V0LCB0aGlzLl9kcmFnU3RhcnQsIHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgndG91Y2hzdGFydCcsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ1N0YXJ0LCB0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ3RvdWNobW92ZScsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ1RvdWNoTW92ZSwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCd0b3VjaGVuZCcsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ1RvdWNoRW5kLCB0aGlzKSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9CSUxFIEFORCBERVNLVE9QIERSQUcgRVZFTlRTIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ1N0YXJ0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcmFnRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBoYW5kbGUgdGhlIGRlc2t0b3AgZHJhZyBzdGFydCBldmVudCBieSBhdHRhY2hpbmcgdGhlIGRhdGEgaW50byB0aGUgZXZlbnQuXG4gICAqIE9uIG1vYmlsZSwgaXQgd2lsbCBjb21wdXRlIHRoZSB0YXJnZXQgY3VycmVudCBwb3NpdGlvbiB0byB1cGRhdGUgdGhlIHBoYW50b20gRE9NIGVsZW1lbnQgcG9zaXRpb24uIEl0IHRoZW4gYXR0YWNoXG4gICAqIHRoZSBpbml0aWFsIHRvdWNoIHBvc2l0aW9uIGFuZCBmaW5hbGx5IGF0dGFjaCB0aGUgcGhhbnRvbSBET00gZWxlbWVudCBuZXh0IHRvIHRoZSB0YXJnZXQgZWxlbWVudC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBvciB0b3VjaCBldmVudCAqKi9cbiAgX2RyYWdTdGFydChldmVudCkge1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIpIHsgLy8gRGVza3RvcCBiZWhhdmlvclxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBKU09OLnN0cmluZ2lmeSh0aGlzLl9kYXRhKSk7XG4gICAgfSBlbHNlIHsgLy8gTW9iaWxlIGJlaGF2aW9yXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBBdm9pZCBjb250ZXh0IHRvIGJlIHRyaWdnZXJlZCBvbiB0b3VjaCBrZXB0IHB1c2hlZFxuICAgICAgdGhpcy5fdG91Y2hTdGFydGVkID0gdHJ1ZTtcbiAgICAgIC8vIERlZmluZSBzdHlsZSBmb3IgcGhhbnRvbSBESVYgYWNjb3JkaW5nIHRvIHRoZSBkcmFnZ2VkIGl0ZW0gc3R5bGUgdmFsdWVzXG4gICAgICBjb25zdCByZWN0ID0gdGhpcy5fdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl90YXJnZXQpOyAvLyBHZXQgbWFyZ2luLCBhcyB0aGV5IG1ha2UgdGhlIHBvc2l0aW9uIGNhbGN1bHVzIHdyb25nXG4gICAgICBjb25zdCBsZWZ0TWFyZ2luID0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdC5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICBjb25zdCB0b3BNYXJnaW4gPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLnRvcCA9IGAke3JlY3QudG9wIC0gdG9wTWFyZ2lufXB4YDtcbiAgICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5zdHlsZS5sZWZ0ID0gYCR7cmVjdC5sZWZ0IC0gbGVmdE1hcmdpbn1weGA7XG4gICAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uc3R5bGUuaGVpZ2h0ID0gYCR7cmVjdC5oZWlnaHR9cHhgO1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLndpZHRoID0gYCR7cmVjdC53aWR0aH1weGA7XG4gICAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGluaXRpYWwgdG91Y2ggcG9zaXRpb24gdG8gcHJvcGVybHkgbWFrZSB0aGUgZGl2IG1vdmUgdW5kZXIgdGhlIGZpbmdlclxuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLmRhdGFzZXQuc3RhcnRYID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHJlY3QubGVmdCArIGxlZnRNYXJnaW47XG4gICAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uZGF0YXNldC5zdGFydFkgPSBldmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gcmVjdC50b3AgKyB0b3BNYXJnaW47XG4gICAgICAvLyBBcHBlbmQgdG8gRE9NIHBhcmVudCB0byBoYXZlIHRoZSBleGFjdCBzYW1lIHN0eWxlIHdpdGhvdXQgbWFudWFsbHkgY29weWluZyBhbGwgdGhlIGFwcGxpZWQgcnVsZXNcbiAgICAgIHRoaXMuX3RhcmdldC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuX3RvdWNoUGhhbnRvbURvbSk7XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9CSUxFIERSQUcgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdUb3VjaE1vdmVcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyYWdFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5PbiBtb2JpbGUsIHRoZSBkcmFnZ2luZyBtdXN0IGJlIGZ1bGx5IHJlLWltcGxlbWVudGVkIGFzIGl0IGlzIG5vdCBzdGFuZGFyZC4gSWYgYW55IGRyYWdcbiAgICogc3RhcnQgZXZlbnQgd2FzIHByZXZpb3VzbHkgcHVibGlzaGVkLCB0aGUgcGhhbnRvbSBET00gZWxlbWVudCBpcyBtb3ZlZCBhY2NvcmRpbmcgdG8gdGhlIGluaXRpYWwgdG91Y2ggcG9zaXRpb24sXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBldmVudCB0b3VjaCBwb3NpdGlvbi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSB0b3VjaCBldmVudCAqKi9cbiAgX2RyYWdUb3VjaE1vdmUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5fdG91Y2hTdGFydGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uc3R5bGUudG9wID0gYCR7ZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5kYXRhc2V0LnN0YXJ0WX1weGA7XG4gICAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uc3R5bGUubGVmdCA9IGAke2V2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl90b3VjaFBoYW50b21Eb20uZGF0YXNldC5zdGFydFh9cHhgO1xuICAgICAgLy8gQXR0YWNoIGEgdG91Y2ggZHJhZ2dpbmcgZmxhZyB0byB0aGUgZXZlbnQsIHNvIHRoZSBEcm9wRWxlbWVudCBjbGFzcyBjYW4ga25vdyB0aGF0IGEgZHJhZ2dpbmcgZXZlbnQgaXMgb2NjdXJyaW5nXG4gICAgICBldmVudC50b3VjaERyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kcmFnVG91Y2hFbmRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyYWdFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5PbiBtb2JpbGUsIHRoZSBkcmFnZ2luZyBtdXN0IGJlIGZ1bGx5IHJlLWltcGxlbWVudGVkIGFzIGl0IGlzIG5vdCBzdGFuZGFyZC4gV2hlbiB0aGUgdXNlclxuICAgKiByZWxlYXNlIGl0cyBmaW5nZXIsIHdlIG5lZWQgdG8gcmVtb3ZlIHRoZSBwaGFudG9tIERPTSBlbGVtZW50IGZyb20gdGhlIHRyZWUuIFRoZSBkcmFnIGV2ZW50IGRhdGEgaXMgYXR0YWNoZWQgYXMgYVxuICAgKiBzdHJpbmcgdG8gdGhlIGV2ZW50IHNvIGl0IGNhbiBiZSByZXRyaWV2ZWQgaW4gdGhlIERyb3BFbGVtZW50IGNsYXNzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIHRvdWNoIGV2ZW50ICoqL1xuICBfZHJhZ1RvdWNoRW5kKGV2ZW50KSB7XG4gICAgdGhpcy5fdG91Y2hTdGFydGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fdG91Y2hQaGFudG9tRG9tKTtcbiAgICAvLyBFbXVsYXRlZCBkYXRhVHJhbnNmZXIgaW50byB0aGUgZXZlbnQsIHdlIG11c3QgYXR0YWNoIGF0IGVhY2ggdG91Y2htb3ZlIHNvIGl0IGNhbiBiZSByZXRyaWV2ZWQgaW4gRHJvcEVsZW1lbnRcbiAgICBldmVudC5kYXRhVHJhbnNmZXIgPSB7XG4gICAgICBnZXREYXRhOiB0eXBlID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0L3BsYWluJykge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRHJhZ0VsZW1lbnQ7XG4iLCJjbGFzcyBEcm9wRWxlbWVudCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPk1ha2UgYW55IERPTSBlbGVtZW50IGRyb3AgZnJpZW5kbHk8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBjbGFzcyB3aWxsIG1ha2UgYW55IERPTSBlbGVtZW50IGFibGUgdG8gcmVjZWl2ZSBkcm9wIGV2ZW50LiBJdCBwcm9wb3NlIGFuIG92ZXJsYXlcbiAgICogd2hlbiB0aGUgdGFyZ2V0IGlzIGhvdmVyZWQgd2l0aCBhIGRyYWdnYWJsZSBlbGVtZW50LiBJdCBoYW5kbGUgYm90aCB0aGUgZGVza3RvcCBhbmQgdGhlIG1vYmlsZSBiZWhhdmlvci4gSXQgbXVzdCBiZVxuICAgKiB1c2VkIHdpdGggYSBEcmFnRWxlbWVudCBjbGFzcyBmb3IgcGVyZmVjdCBjb21wYXRpYmlsaXR5ITwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgZWxlbWVudCB0byBkcm9wIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMudGFyZ2V0IC0gVGhlIGVsZW1lbnQgdG8gYWxsb3cgZHJvcHBpbmcgaW5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5vbkRyb3AgLSBUaGUgbWV0aG9kIHRvIGNhbGwgZm9yIGVhY2ggZHJvcCBldmVudCAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgZWxlbWVudCB0byBtYWtlIGFsbG93IGRyb3BwaW5nIGluICovXG4gICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7IC8vIEdldCBnaXZlbiB0YXJnZXQgZnJvbSB0aGUgRE9NXG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7ZnVuY3Rpb259IC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBkcm9wIGV2ZW50ICovXG4gICAgdGhpcy5fb25Ecm9wQ0IgPSBvcHRpb25zLm9uRHJvcDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJbXX0gLSBUaGUgZXZlbnQgSURzIGZvciBhbGwgbW9iaWxlIGFuZCBkZXNrdG9wIGRyb3BwaW5nIGV2ZW50cyAqL1xuICAgIHRoaXMuX2V2ZW50SWRzID0gW107XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoaXMgY291bnRlciBoZWxwcyB0byBhdm9pZCBlbnRlci9sZWF2ZSBldmVudHMgdG8gb3ZlcmxhcCB3aGVuIHRhcmdldCBoYXMgY2hpbGRyZW4gKi9cbiAgICB0aGlzLl9tb3ZlbWVudENvdW50ZXIgPSAwO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBUaGUgdHJhbnNwYXJlbnQgYm9yZGVyIHRoYXQgbXVzdCBiZSBhZGRlZCB0byBhdm9pZCB3ZWlyZCB0YXJnZXQgcmVzaXplIG9uIGhvdmVyICovXG4gICAgdGhpcy5fdHJhbnNwYXJlbnRCb3JkZXIgPSAnJztcbiAgICAvLyBCdWlsZCBET00gZWxlbWVudHMgYW5kIHN1YnNjcmliZSB0byBkcmFnIGV2ZW50c1xuICAgIHRoaXMuX2J1aWxkRWxlbWVudHMoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzdHJveVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCB1bnN1YnNjcmliZSBhbGwgZHJvcCBldmVudHMgYW5kIHJlbW92ZSBhbGwgcHJvcGVydGllcy48L2Jsb2NrcXVvdGU+ICoqL1xuICBkZXN0cm95KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZXZlbnRJZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9ldmVudElkc1tpXSk7XG4gICAgfVxuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgRFJPUEVMRU1FTlQgSU5TVEFOVElBVElPTiBTRVFVRU5DRSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfYnVpbGRFbGVtZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgZGVmaW5lIHRoZSB0cmFuc3BhcmVudCBib3JkZXIgc3R5bGUgYW5kIGFwcGVuZCB0aGlzIHZpcnR1YWwgYm9yZGVyIHRvIHRoZVxuICAgKiB0YXJnZXQgRE9NIGVsZW1lbnQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2J1aWxkRWxlbWVudHMoKSB7XG4gICAgdGhpcy5fdHJhbnNwYXJlbnRCb3JkZXIgPSAnZGFzaGVkIDNweCB0cmFuc3BhcmVudCc7XG4gICAgdGhpcy5fdGFyZ2V0LnN0eWxlLmJvcmRlciA9IHRoaXMuX3RyYW5zcGFyZW50Qm9yZGVyO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBzdWJzY3JpYmUgdG8gZHJvcCBldmVudHMsIGJvdGggZm9yIGRlc2t0b3AgYW5kIG1vYmlsZS48L2Jsb2NrcXVvdGU+ICoqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCdkcmFnZW50ZXInLCB0aGlzLl90YXJnZXQsIHRoaXMuX2RyYWdFbnRlciwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCdkcmFnb3ZlcicsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ092ZXIsIHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnZHJhZ2xlYXZlJywgdGhpcy5fdGFyZ2V0LCB0aGlzLl9kcmFnTGVhdmUsIHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnZHJvcCcsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJvcCwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCd0b3VjaG1vdmUnLCBkb2N1bWVudC5ib2R5LCB0aGlzLl9kcmFnVG91Y2hPdmVyLCB0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ3RvdWNoZW5kJywgZG9jdW1lbnQuYm9keSwgdGhpcy5fZHJhZ1RvdWNoRW5kLCB0aGlzKSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBERVNLVE9QIERST1AgRVZFTlRTIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ0VudGVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBoYW5kbGUgdGhlIGVudGVyaW5nIG9mIGEgZHJhZ2dlZCBkaXYgb3ZlciB0aGUgdGFyZ2V0IERPTSBlbGVtZW50LiBXaGVuXG4gICAqIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgaXMgaG92ZXJlZCwgYSBkYXNoZWQgYm9yZGVyIGlzIG1hZGUgdmlzaWJsZSwgcmVwbGFjaW5nIHRoZSB0cmFuc3BhcmVudCBvbmUgdG8gbm90aWZ5IHRoZVxuICAgKiB1c2VyIHRoYXQgdGhlIGRyYWdnZWQgZGl2IGNhbiBiZSBkcm9wcGVkLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIG1vdXNlIGV2ZW50ICoqL1xuICBfZHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgdGhpcy5fZXZlbnRCZWhhdmlvcihldmVudCk7XG4gICAgKyt0aGlzLl9tb3ZlbWVudENvdW50ZXI7XG4gICAgdGhpcy5fdGFyZ2V0LnN0eWxlLmJvcmRlciA9ICdkYXNoZWQgM3B4IHJnYigyNTUsIDEwMCwgMTAwKSc7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kcmFnT3ZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBkcmFnZ2VkIGRpdiBob3ZlcmluZyB0aGUgdGFyZ2V0IERPTSBlbGVtZW50LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIG1vdXNlIGV2ZW50ICoqL1xuICBfZHJhZ092ZXIoZXZlbnQpIHtcbiAgICB0aGlzLl9ldmVudEJlaGF2aW9yKGV2ZW50KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdMZWF2ZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBldmVudCB0aGF0IGlzIGZpcmVkIHdoZW4gdGhlIGhvdmVyZWQgZGl2IGxlYXZlcyB0aGUgdGFyZ2V0XG4gICAqIERPTSBlbGVtZW50LiBJdCByZXF1aXJlIHRoZSBtb3ZlbWVudCBjb3VudGVyIHRvIGJlIGVxdWFsIHRvIHplcm8gdG8gcmVzdG9yZSB0aGUgdHJhbnNwYXJlbnQgYm9yZGVyIG9mIHRoZSB0YXJnZXRcbiAgICogRE9NIGVsZW1lbnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2UgZXZlbnQgKiovXG4gIF9kcmFnTGVhdmUoZXZlbnQpIHtcbiAgICB0aGlzLl9ldmVudEJlaGF2aW9yKGV2ZW50KTtcbiAgICAtLXRoaXMuX21vdmVtZW50Q291bnRlcjtcbiAgICBpZiAodGhpcy5fbW92ZW1lbnRDb3VudGVyID09PSAwKSB7XG4gICAgICB0aGlzLl90YXJnZXQuc3R5bGUuYm9yZGVyID0gdGhpcy5fdHJhbnNwYXJlbnRCb3JkZXI7XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PQklMRSBEUk9QIEVWRU5UUyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdUb3VjaE92ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGhhbmRsZSB0aGUgaG92ZXJpbmcgb2YgYSBkcmFnZ2VkIGRpdiBvdmVyIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQuIFRoZVxuICAgKiB0b3VjaCBkcmFnZ2luZyBmbGFnIGlzIGF0dGFjaGVkIHRvIHRoZSBldmVudCBpbiB0aGUgRHJvcEVsZW1lbnQgY2xhc3MsIHNvIHdlIGNhbiBlbnN1cmUgdG8gb25seSB0cmlnZ2VyIHRoZVxuICAgKiBkcmFnZ2luZyBvdmVyIGV2ZW50IGxvZ2ljIHdoZW4gdGhlIGV2ZW50IGlzIGNvbWluZyBhZnRlciBhIGRyYWcgdG91Y2ggaGFzIG9jY3VycmVkIGluIERyb3BFbGVtZW50LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIHRvdWNoIGV2ZW50ICoqL1xuICBfZHJhZ1RvdWNoT3ZlcihldmVudCkge1xuICAgIGlmIChldmVudC50b3VjaERyYWdnaW5nKSB7IC8vIFRoaXMgZmxhZyBoYXMgYmVlbiBzZXQgaW4gRHJhZ0VsZW1lbnQgY2xhc3MgdG8ga25vdyBpZiBhIHRvdWNoIGRyYWcgaXMgb2NjdXJyaW5nXG4gICAgICBpZiAodGhpcy5faXNUb3VjaEV2ZW50SW5UYXJnZXQoZXZlbnQudGFyZ2V0VG91Y2hlc1swXSkpIHsgLy8gTW9iaWxlIGVxdWl2YWxlbnQgdG8gZHJhZ2VudGVyXG4gICAgICAgIHRoaXMuX3RhcmdldC5zdHlsZS5ib3JkZXIgPSAnZGFzaGVkIDNweCByZ2IoMjU1LCAxMDAsIDEwMCknO1xuICAgICAgfSBlbHNlIHsgLy8gU2FtZSBmb3IgZHJhZ2xlYXZlXG4gICAgICAgIHRoaXMuX3RhcmdldC5zdHlsZS5ib3JkZXIgPSB0aGlzLl90cmFuc3BhcmVudEJvcmRlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kcmFnVG91Y2hFbmRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGhhbmRsZSB0aGUgcHJlLWRyb3AgZXZlbnQgZm9yIG1vYmlsZSBkZXZpY2VzLiBUaGUgZGF0YVRyYW5zZmVyIGlzXG4gICAqIGF0dGFjaGVkIHRvIHRoZSBldmVudCBieSBEcmFnRWxlbWVudCBjbGFzcywgdG8gcmVjb2duaXplIGEgdG91Y2ggZW5kZWQgZXZlbnQgdGhhdCBpcyBsaW5rZWQgd2l0aCBhIGRyYWdnaW5nIGluXG4gICAqIHByb2dyZXNzLiBUaGUgdG91Y2ggcG9zaXRpb24gaXMgdGhlbiB0ZXN0ZWQgdG8gZmlyZWQgdGhlIGRyb3AgbWV0aG9kIGlmIHRoZSB0b3VjaCBlbmQgb2NjdXJyZWQgb24gdGhlIHRhcmdldCBET01cbiAgICogZWxlbWVudC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSB0b3VjaCBldmVudCAqKi9cbiAgX2RyYWdUb3VjaEVuZChldmVudCkge1xuICAgIC8vIFRvdWNoIGV2ZW50IGhhcyBhbiBlbXVsYXRlZCBkYXRhVHJhbnNmZXIgZWxlbWVudCwgc2VlIERyYWdFbGVtZW50LiB0b3VjaGVkIHBvc2l0aW9uIGlzIGhlbGQgaW4gY2hhbmdlZFRvdWNoZXNcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIHRoaXMuX2lzVG91Y2hFdmVudEluVGFyZ2V0KGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKSkge1xuICAgICAgdGhpcy5fZHJvcChldmVudCk7XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PQklMRSBBTkQgREVTS1RPUCBEUk9QIEVWRU5UUyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2Ryb3BcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGhhbmRsZSB0aGUgZHJvcHBpbmcgb2YgYSBEcmFnRWxlbWVudCwgdG8gcHJvcGVybHkgcmVhZCB0aGUgZGF0YSBpdCBob2xkc1xuICAgKiBhbmQgc2VuZCBpdCB0byB0aGUgZHJvcCBjYWxsYmFjayBwcm92aWRlZCBpbiBjb25zdHJ1Y3Rvci48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBvciB0b3VjaCBldmVudCAqKi9cbiAgX2Ryb3AoZXZlbnQpIHtcbiAgICB0aGlzLl9ldmVudEJlaGF2aW9yKGV2ZW50KTtcbiAgICB0aGlzLl90YXJnZXQuc3R5bGUuYm9yZGVyID0gdGhpcy5fdHJhbnNwYXJlbnRCb3JkZXI7XG4gICAgdGhpcy5fb25Ecm9wQ0IoSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpKSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFVUSUxTIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZXZlbnRCZWhhdmlvclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiBnaXZlbiBldmVudCwgYW5kIHdpbGwgc3RvcCBpdHNcbiAgICogcHJvcGFnYXRpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2Ugb3IgdG91Y2ggZXZlbnQgKiovXG4gIF9ldmVudEJlaGF2aW9yKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2lzVG91Y2hFdmVudEluVGFyZ2V0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBjb21wYXJlIGEgdG91Y2ggcG9pbnQgdG8gdGhlIHRhcmdldCBwb3NpdGlvbiBhbmQgcmV0dXJuIHRydWUgaWYgdGhlXG4gICAqIHRvdWNoIHBvaW50IGlzIGluc2lkZSB0aGUgdGFyZ2V0IERPTSBlbGVtZW50LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IHRvdWNoUG9zaXRpb24gLSBUaGUgdG91Y2ggZXZlbnRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gRG8gdGhlIHRvdWNoIHBvaW50IGlzIGluY2x1ZGVkIGluIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgKiovXG4gIF9pc1RvdWNoRXZlbnRJblRhcmdldCh0b3VjaFBvc2l0aW9uKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX3RhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBpbkF4aXNYID0gdG91Y2hQb3NpdGlvbi5wYWdlWCA+PSByZWN0LnggJiYgKHRvdWNoUG9zaXRpb24ucGFnZVggPD0gcmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgY29uc3QgaW5BeGlzWSA9IHRvdWNoUG9zaXRpb24ucGFnZVkgPj0gcmVjdC55ICYmICh0b3VjaFBvc2l0aW9uLnBhZ2VZIDw9IHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICByZXR1cm4gKGluQXhpc1ggJiYgaW5BeGlzWSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgRHJvcEVsZW1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgTG9nZ2VyIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+SmF2YVNjcmlwdCBsb2dnZXIgc2luZ2xldG9uIHRvIGhhbmRsZSBlcnJvcnMgdGhlIHNhbWUgd2F5PC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIExvZ2dlciBjbGFzcyBwcm92aWRlcyBhIHNpbmdsZXRvbiBvYmplY3QgdG8gYWxsb3cgYnJhaW4gZGVhZCBsb2dnaW5nIGZvciBmcm9udGVuZFxuICAgKiBKYXZhU2NyaXB0IGNvZGUuIEVycm9ycyBjYW4gYmUgcmFpc2VkIGZyb20gSmF2YVNjcmlwdCBlcnJvcnMgKDxjb2RlPm5ldyBFcnJvcigpPC9jb2RlPiksIG9yIHVzaW5nIGEgY3VzdG9tIGVycm9yXG4gICAqIGZvcm1hdCwgd2l0aCBhIHNldmVyaXR5LCB0aXRsZSBhbmQgbWVzc2FnZS4gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIGEgbm90aWZpY2F0aW9uIG1hbmFnZXIgb2JqZWN0IHRvIGhhbmRsZVxuICAgKiB0aG9zZSBlcnJvciBlaXRoZXIgaW4gY29uc29sZSBhbmQgaW4gVUkuIFRoZSByZWNvbW1lbmRlZCBtYW5hZ2VyIHRvIHVzZSBmb3Igbm90aWZpY2F0aW9uIGNhbiBiZSBmb3VuZCBhdFxuICAgKiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qc1wiIGFsdD1cIm5vdGlmaWNhdGlvbi1qc1wiPk5vdGlmaWNhdGlvbi5qczwvYT4uIFlvdSBjYW5cbiAgICogb3RoZXJ3aXNlIGltcGxlbWVudCB5b3Ugc3lzdGVtLCBidXQgaXQgYXMgdG8gdGFrZSBhIHR5cGUgKHNldmVyaXR5KSwgYSB0aXRsZSBhbmQgYSBtZXNzYWdlIDsgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb24sXG4gICAqIHJlZmVyIHRvIHRoZSA8Y29kZT5fbG9nRXJyb3JUb05vdGlmaWNhdGlvbjwvY29kZT4gZG9jdW1lbnRhdGlvbi4gRm9yIHNvdXJjZSBjb2RlLCBwbGVhc2UgZ28gdG9cbiAgICogPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9BcnRodXJCZWF1bGlldS9Mb2dnZXIuanNcIiBhbHQ9XCJsb2dnZXItanNcIj5Mb2dnZXIuanM8L2E+PC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIC0gVGhlIExvZ2dlciBvYmplY3QsIG5vdCBtYW5kYXRvcnkgYnV0IGl0IGlzIHJlY29tbWVuZGVkIHRvIHByb3ZpZGUgb25lIGZvciBmdWxsIGZlYXR1cmVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5lcnJvcnM9e31dIC0gVGhlIGN1c3RvbSBlcnJvcnMsIEpTT04gc3R5bGUsIHdpdGgga2V5IGJlaW5nIHRoZSBlcnJvciBuYW1lIGFuZCB2YWx1ZSBiZWluZ1xuICAgKiBhbiBvYmplY3Qgd2l0aCBhIDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgYSA8Y29kZT50aXRsZTwvY29kZT4gYW5kIGEgPGNvZGU+bWVzc2FnZTwvY29kZT4gcHJvcGVydHkgKGFsbCBzdHJpbmdzKVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMubm90aWZpY2F0aW9uPW51bGxdIC0gVGhlIG5vdGlmaWNhdGlvbiBtYW5hZ2VyICh0byBjcmVhdGUgbmV3IG5vdGlmaWNhdGlvbnMgd2hlbiBsb2dnaW5nKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxvZz10cnVlXSAtIEFsbG93IGNvbnNvbGUgbG9nZ2luZyAodHVybiB0byBmYWxzZSBpbiBwcm9kIGVudmlyb25tZW50KVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIExvZ2dlciBzaW5nbGV0b24gaW5zdGFuY2UgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gSWYgYW4gaW5zdGFuY2Ugb2YgTG9nZ2VyIGFscmVhZHkgZXhpc3RzLCB3ZSBqdXN0IHJldHVybiBpdFxuICAgIGlmICghIUxvZ2dlci5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIExvZ2dlci5pbnN0YW5jZTtcbiAgICB9XG4gICAgLy8gU2V0IG9iamVjdCBpbnN0YW5jZVxuICAgIExvZ2dlci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMsIGZhbGxiYWNrIGFjY29yZGluZyB0byBhdHRyaWJ1dGUgdXRpbGl0eVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lcnJvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zLmVycm9ycyA9IHt9OyAvLyBOZWVkcyB0byBkZWZpbmUgdG8gZW1wdHkgb2JqZWN0IHRvIGF2b2lkIGVycm9ycyB3aGVuIGNoZWNraW5nIGN1c3RvbSBlcnJvcnNcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm5vdGlmaWNhdGlvbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMubm90aWZpY2F0aW9uID0gbnVsbDsgLy8gTnVsbCB0byBpZ25vcmUgdGhlIG5vdGlmaWNhdGlvbiBzdGVwIGluIGVycm9yIHJhaXNpbmdcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvZyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBvcHRpb25zLmxvZyA9IHRydWU7IC8vIE5vIGxvZyBtZWFucy4uLiB1c2VmdWwgY29tcG9uZW50IHJpZ2h0P1xuICAgIH1cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIGVycm9yIG1lc3NhZ2VzIHRvIHVzZSBpbiBMb2dnZXIgKi9cbiAgICB0aGlzLl9lcnJvcnMgPSBvcHRpb25zLmVycm9ycztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIGN1c3RvbSBub3RpZmljYXRpb24gaGFuZGxlciwgbXVzdCBiZSBhYmxlIHRvIHRha2UgdHlwZSwgdGl0bGUgYW5kIG1lc3NhZ2UgKGF0IGxlYXN0KSAqL1xuICAgIHRoaXMuX25vdGlmaWNhdGlvbiA9IG9wdGlvbnMubm90aWZpY2F0aW9uO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gSW50ZXJuYWwgbG9nZ2luZyBmbGFnIGZyb20gY29uc3RydWN0b3Igb3B0aW9ucywgYWxsb3cgdG8gb3V0cHV0IGVhY2ggZXZlbnQgYWN0aW9uICovXG4gICAgdGhpcy5fbG9nID0gb3B0aW9ucy5sb2c7XG4gICAgLyoqIEBwdWJsaWNcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQ29tcG9uZW50IHZlcnNpb24gKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnMS4xLjAnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIExvZ2dlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+TG9nZ2VyIGRlc3RydWN0b3IuIFdpbGwgZGVsZXRlIHNpbmdsZXRvbiBpbnN0YW5jZSBhbmQgaXRzIHByb3BlcnRpZXMuPC9ibG9ja3F1b3RlPiAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIERlbGV0ZSBvYmplY3QgYXR0cmlidXRlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgfSk7XG4gICAgLy8gQ2xlYXIgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgTG9nZ2VyLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTE9HR0VSIEpTIElOVEVSTiBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZXNlIGludGVybmFsIG1ldGhvZHMgd2lsbCBidWlsZCBhIHJhaXNlZCBlcnJvciBkZXBlbmRpbmcgb24gbG9nZ2luZyBsZXZlbCBzZW50IHdoZW4gYnVpbGRpbmcgdGhpcyBzaW5nbGV0b24uICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfYnVpbGRFcnJvckluZm9cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIExvZ2dlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBiZSB0aGUgZXJyb3IgcHJvcGVydGllcyBhY2NvcmRpbmcgdG8gaXRzIHR5cGUuIEEgY3VzdG9tIGVycm9yIHdpbGxcbiAgICogdGFrZSB2YWx1ZXMgZGVmaW5lZCBhdCBjb25zdHJ1Y3Rpb24gb2YgdGhpcyBzaW5nbGV0b24uIEphdmFTY3JpcCBlcnJvciBhcmUgcGFyc2VkIHRvIGV4dHJhY3QgdGl0bGUgYW5kXG4gICAqIG1lc3NhZ2UgcHJvcGVydGllcyBmcm9tIHN0YWNrLCB3aXRoIHNwZWNpZmljIGhhbmRsaW5nIGZvciBDaHJvbWUgYW5kIEZpcmVmb3guPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgLSBUaGUgZXJyb3IgdG8gYnVpbGQgaW5mbyBmcm9tLiBDYW4gYmUgYSBjdXN0b20gZXJyb3Igb3IgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZXJyb3IgcHJvcGVydGllcyA7IDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgPGNvZGU+dGl0bGU8L2NvZGU+IGFuZCA8Y29kZT5tZXNzYWdlPC9jb2RlPiAqL1xuICBfYnVpbGRFcnJvckluZm8oZXJyb3IpIHtcbiAgICBsZXQgc2V2ZXJpdHkgPSAnJztcbiAgICBsZXQgdGl0bGUgPSAnJztcbiAgICBsZXQgbWVzc2FnZSA9ICcnO1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRoaXMuX2Vycm9ycyBkb2Vzbid0IGNvbnRhaW4gdGhlIGVycm9yIGtleSA7IGVpdGhlciBhIEpzIGVycm9yIG9yIGFuIHVua25vd24gZXJyb3JcbiAgICAgIGlmICh0aGlzLl9lcnJvcnNbZXJyb3JdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkSnNFcnJvcihlcnJvcik7XG4gICAgICB9IGVsc2UgeyAvLyBDdXN0b20gZXJyb3IgdGhhdCBuZWVkIHRvIGJlIGZpbGxlZCB3aXRoIGEgc2V2ZXJpdHksIGEgdGl0bGUgYW5kIGEgbWVzc2FnZVxuICAgICAgICBzZXZlcml0eSA9IHRoaXMuX2Vycm9yc1tlcnJvcl0uc2V2ZXJpdHkgfHwgJyc7XG4gICAgICAgIHRpdGxlID0gdGhpcy5fZXJyb3JzW2Vycm9yXS50aXRsZSB8fCAnJztcbiAgICAgICAgbWVzc2FnZSA9IHRoaXMuX2Vycm9yc1tlcnJvcl0ubWVzc2FnZSB8fCAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGVycm9yIHN0YW5kYXJkIHByb3BlcnRpZXNcbiAgICByZXR1cm4ge1xuICAgICAgc2V2ZXJpdHk6IHNldmVyaXR5LFxuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgIH07XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9idWlsZEpzRXJyb3JcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIExvZ2dlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+QXV4aWxpYXJ5IG1ldGhvZCBmb3IgPGNvZGU+X2J1aWxkRXJyb3JJbmZvPC9jb2RlPiB0byBoYW5kbGUgSmF2YVNjcmlwdCBlcnJvcnM8L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvciAtIFRoZSBlcnJvciB0byBidWlsZCBpbmZvIGZyb20uIE11c3QgYmUgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZXJyb3IgcHJvcGVydGllcyA7IDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgPGNvZGU+dGl0bGU8L2NvZGU+IGFuZCA8Y29kZT5tZXNzYWdlPC9jb2RlPiAqL1xuICBfYnVpbGRKc0Vycm9yKGVycm9yKSB7XG4gICAgbGV0IHNldmVyaXR5ID0gJyc7XG4gICAgbGV0IHRpdGxlID0gJyc7XG4gICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZmlsZW5hbWUgPSAnJztcbiAgICAvLyBKYXZhU2NyaXB0IGVycm9yIGNyZWF0ZWQgd2l0aCBuZXcgRXJyb3IoKSwgdGhhdCBuZWVkIHRvIGNvbnRhaW4gZmlsZU5hbWUsIG1lc3NhZ2UsIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJcbiAgICBpZiAoZXJyb3IuZmlsZU5hbWUgJiYgZXJyb3IubWVzc2FnZSAmJiBlcnJvci5saW5lTnVtYmVyICYmIGVycm9yLmNvbHVtbk51bWJlcikgeyAvLyBGaXJlZm94IHNwZWNpZmljXG4gICAgICBmaWxlbmFtZSA9IGVycm9yLmZpbGVOYW1lLm1hdGNoKC9cXC8oW15cXC9dKylcXC8/JC8pWzFdO1xuICAgICAgc2V2ZXJpdHkgPSAnZXJyb3InO1xuICAgICAgdGl0bGUgPSBgSmF2YVNjcmlwdCBlcnJvcmA7XG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubWVzc2FnZX0gaW4gZmlsZSAke2ZpbGVuYW1lfToke2Vycm9yLmxpbmVOdW1iZXJ9OiR7ZXJyb3IuY29sdW1uTnVtYmVyfWA7XG4gICAgfSBlbHNlIGlmIChlcnJvci5tZXNzYWdlICYmIGVycm9yLnN0YWNrKSB7IC8vIENocm9tZSBzcGVjaWZpY1xuICAgICAgZmlsZW5hbWUgPSBlcnJvci5zdGFjay5zcGxpdCgnXFxuJylbZXJyb3Iuc3RhY2suc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDFdLm1hdGNoKC9cXC8oW15cXC9dKylcXC8/JC8pWzFdO1xuICAgICAgc2V2ZXJpdHkgPSAnZXJyb3InO1xuICAgICAgdGl0bGUgPSBgSmF2YVNjcmlwdCBlcnJvcmA7XG4gICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubWVzc2FnZX0gaW4gZmlsZSAke2ZpbGVuYW1lfWA7XG4gICAgfSBlbHNlIGlmIChlcnJvci5zZXZlcml0eSAmJiBlcnJvci50aXRsZSAmJiBlcnJvci5tZXNzYWdlKSB7IC8vIFVzZXIgY3VzdG9tIGVycm9yXG4gICAgICBzZXZlcml0eSA9IGVycm9yLnNldmVyaXR5IHx8ICcnO1xuICAgICAgdGl0bGUgPSBlcnJvci50aXRsZSB8fCAnJztcbiAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8ICcnO1xuICAgIH0gZWxzZSB7IC8vIFVua25vd24gZXJyb3IgdGhhdCBkbyBub3QgcmVxdWlyZSBhbnkgYXJndW1lbnRzXG4gICAgICBzZXZlcml0eSA9ICdlcnJvcic7XG4gICAgICB0aXRsZSA9IGBVbmV4cGVjdGVkIGVycm9yICR7ZXJyb3J9YDtcbiAgICAgIG1lc3NhZ2UgPSAnVGhlIGVycm9yIG9iamVjdCBzZW50IHRvIExvZ2dlci5yYWlzZSgpIGlzIG5laXRoZXIgYSBKYXZhU2NyaXB0IGVycm9yIG5vciBhIGN1c3RvbSBlcnJvciAod2l0aCBzZXZlcml0eSwgdGl0bGUgYW5kIG1lc3NhZ2UpLic7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldmVyaXR5OiBzZXZlcml0eSxcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9O1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfbG9nRXJyb3JUb05vdGlmaWNhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTG9nZ2VyXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGNhbGwgZm9yIGEgbmV3IG5vdGlmaWNhdGlvbiBpZiBhIGNvbXBvbmVudCBoYXMgYmVlbiBnaXZlbiB0byB0aGlzIHNpbmdsZXRvblxuICAgKiBjb25zdHJ1Y3Rvci4gVGhlIGNvbXBvbmVudCBtdXN0IGV4cG9zZSBhIDxjb2RlPm5ldygpPC9jb2RlPiBtZXRob2RzIHRoYXQgdGFrZXMgYXMgYXJndW1lbnRzIHRoZSBMb2dnZXIgc3RhbmRhcmQgcHJvcGVydGllcyA7XG4gICAqIDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgPGNvZGU+dGl0bGU8L2NvZGU+IGFuZCA8Y29kZT5tZXNzYWdlPC9jb2RlPi4gSWYgbm8gY29tcG9uZW50IGhhcyBiZSBwcm92aWRlZCwgdGhpcyBtZXRob2Qgd29uJ3QgZG8gYW55dGhpbmcuXG4gICAqIE9uZSBjYW4gZmluZCBzdWNoIGNvbXBvbmVudCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qc1wiIGFsdD1cIm5vdGlmaWNhdGlvbi1qc1wiPmhlcmU8L2E+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yUGFyYW1ldGVycyAtIFRoZSBlcnJvciB3aXRoIExvZ2dlciBzdGFuZGFyZCBwcm9wZXJ0aWVzICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pICovXG4gIF9sb2dFcnJvclRvTm90aWZpY2F0aW9uKGVycm9yUGFyYW1ldGVycykge1xuICAgIGlmICh0aGlzLl9ub3RpZmljYXRpb24gJiYgdHlwZW9mIGVycm9yUGFyYW1ldGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuX25vdGlmaWNhdGlvbi5uZXcoe1xuICAgICAgICB0eXBlOiBlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHkgfHwgJ2Vycm9yJyxcbiAgICAgICAgdGl0bGU6IGVycm9yUGFyYW1ldGVycy50aXRsZSB8fCAnQ2FuXFwndCBnZXQgZXJyb3IgaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yUGFyYW1ldGVycy5tZXNzYWdlIHx8ICdDYWxsIGZvciBuZXcgbm90aWZpY2F0aW9uIHdhc25cXCd0IG1hZGUgd2l0aCBhcmd1bWVudHMnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9sb2dFcnJvclRvQ29uc29sZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTG9nZ2VyXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHNlbmQgZXJyb3IgdG8gY29uc29sZSBpZiBsb2dnaW5nIGhhcyBiZWVuIGFsbG93ZWQgdG8gdGhpcyBzaW5nbGV0b24gY29uc3RydWN0b3IuXG4gICAqIEl0IHRha2VzIGEgTG9nZ2VyIHN0YW5kYXJkIGVycm9yICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pIGFzIGFyZ3VtZW50LlxuICAgKiBJdCB3aWxsIGJ1aWxkIGEgdW5pZmllZCBvdXRwdXQgcmVnYXJkbGVzcyB0aGUgQ2hyb21lIG9yIEZpcmVmb3ggYnJvd3Nlci4gSXQgZW5oYW5jZSA8Y29kZT5jb25zb2xlLmxvZzwvY29kZT4gYW5kXG4gICAqIDxjb2RlPmNvbnNvbGUuaW5mbzwvY29kZT4gdG8gYWxzbyBkaXNwbGF5IHRoZSBzdGFjayB0cmFjZSBpbiBhIDxjb2RlPmNvbnNvbGUuZ3JvdXA8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yUGFyYW1ldGVycyAtIFRoZSBlcnJvciB3aXRoIExvZ2dlciBzdGFuZGFyZCBwcm9wZXJ0aWVzICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pICovXG4gIF9sb2dFcnJvclRvQ29uc29sZShlcnJvclBhcmFtZXRlcnMpIHtcbiAgICBpZiAodGhpcy5fbG9nICYmIHR5cGVvZiBlcnJvclBhcmFtZXRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICAgIGlmICghZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ICYmICFlcnJvclBhcmFtZXRlcnMudGl0bGUgJiYgIWVycm9yUGFyYW1ldGVycy5tZXNzYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8qIENvbG9ycyB0byB1c2UsIGV4dHJhY3RlZCBmcm9tIE5vdGlmaWNhdGlvbi5qcyAoaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qcykgKi9cbiAgICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgICAgc3VjY2VzczogJ2NvbG9yOiByZ2IoNzYsIDE3NSwgODApOycsXG4gICAgICAgIGluZm86ICdjb2xvcjogcmdiKDMsIDE2OSwgMjQ0KTsnLFxuICAgICAgICB3YXJuaW5nOiAnY29sb3I6IHJnYigyNTUsIDE1MiwgMCk7JyxcbiAgICAgICAgZXJyb3I6ICdjb2xvcjogcmdiKDI0NCwgNjcsIDU0KTsnXG4gICAgICB9O1xuICAgICAgY29uc3QgYnJvd3NlcnMgPSB7XG4gICAgICAgIGZpcmVmb3g6IC9maXJlZm94L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgICAgICAgY2hyb21lOiAvY2hyb21lL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAvZ29vZ2xlIGluYy9pLnRlc3QobmF2aWdhdG9yLnZlbmRvcilcbiAgICAgIH07XG4gICAgICAvLyBDb21wdXRlIGxvZyBsZXZlbCBmcm9tIHNldmVyaXR5LCBhbmQgaGFuZGxlIHdhcm4gYW5kIGxvZyBhcyB3YXJuaW5nIGFuZCBzdWNjZXNzXG4gICAgICBsZXQgbG9nTGV2ZWwgPSBlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHk7XG4gICAgICBpZiAoZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ID09PSAnd2FybmluZycpIHtcbiAgICAgICAgbG9nTGV2ZWwgPSAnd2Fybic7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yUGFyYW1ldGVycy5zZXZlcml0eSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgIGxvZ0xldmVsID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICAvLyBDcmVhdGUgY29uc29sZSBncm91cCB3aXRoIGFzc29jaWF0ZWQgc3R5bGVcbiAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYCVjJHtlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHkudG9VcHBlckNhc2UoKX06ICR7ZXJyb3JQYXJhbWV0ZXJzLnRpdGxlfWAsIGNvbG9yc1tlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHldKTtcbiAgICAgIC8vIEFwcGx5IHR5cGUgYW5kIHNldmVyaXR5IHRvIGJ1aWxkIGNvbnNvbGUgY2FsbFxuICAgICAgY29uc3Qgb3V0cHV0U3RyaW5nID0gYCVjJHtlcnJvclBhcmFtZXRlcnMubWVzc2FnZX1cXG4ke3RoaXMuX2dldENhbGxlck5hbWUoYnJvd3NlcnMpfWA7XG4gICAgICBjb25zb2xlW2xvZ0xldmVsXShvdXRwdXRTdHJpbmcsIGNvbG9yc1tlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHldKTtcbiAgICAgIC8vIE9ubHkgYXBwZW5kIGNvbnNvbGUgdHJhY2UgaWYgc2V2ZXJpdHkgaXMgbm90IGFuIGVycm9yIChhcyBlcnJvciBhbHJlYWR5IGRpc3BsYXkgdHJhY2UpXG4gICAgICBpZiAoZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ICE9PSAnZXJyb3InICYmIGVycm9yUGFyYW1ldGVycy5zZXZlcml0eSAhPT0gJ3dhcm5pbmcnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICAgIC8vIENsb3NlIGVycm9yIGdyb3VwIGluIGNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9nZXRDYWxsZXJOYW1lXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBMb2dnZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgYnVpbGQgdGhlIGNhbGxlciBuYW1lIGFzIGEgc3RyaW5nLCBmb3JtYXR0ZWQgdG8gYmUgZWFzeSB0b1xuICAgKiByZWFkIGFuZCBkaXNwbGF5IGluIHRoZSBsb2cgb3V0cHV0LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGJyb3dzZXJzIC0gQW4gb2JqZWN0IHdpdGggYm9vbGVhbnMgdmFsdWVzIGZvciBjdXJyZW50IGJyb3dzZXIgdXNlZCBieSBzZXNzaW9uXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgTG9nZ2VyIHN0YW5kYXJkIGNhbGxlciBuYW1lIHJlZ2FyZGxlc3MgdGhlIGJyb3dzZXIgKi9cbiAgX2dldENhbGxlck5hbWUoYnJvd3NlcnMpIHtcbiAgICAvLyBPcmlnaW5hbCBjb2RlIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaXJpc2xpLzcxNmI2ZGFjZDNmMTUxY2UyYjdlXG4gICAgbGV0IGNhbGxlciA9IChuZXcgRXJyb3IoKSkuc3RhY2s7IC8vIENyZWF0ZSBlcnJvciBhbmQgZ2V0IGl0cyBjYWxsIHN0YWNrXG4gICAgLy8gR2V0IGxhc3QgY2FsbGVkIGRlcGVuZGluZyBvbiBicm93c2VyXG4gICAgaWYgKHR5cGVvZiBicm93c2VycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChicm93c2Vycy5maXJlZm94KSB7XG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5zcGxpdCgnXFxuJylbM107IC8vIFRoaXJkIGl0ZW0gaXMgZXJyb3IgY2FsbGVyIG1ldGhvZFxuICAgICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvQCsvLCAnICcpOyAvLyBDaGFuZ2UgYEBgIHRvIGAoYFxuICAgICAgfSBlbHNlIGlmIChicm93c2Vycy5jaHJvbWUpIHtcbiAgICAgICAgY2FsbGVyID0gY2FsbGVyLnNwbGl0KCdcXG4nKVtjYWxsZXIuc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDJdOyAvLyBNaW51cyAyIHRvIHJlbW92ZSBjbG9zaW5nIHBhcmVudGhlc2lzIGFzIHdlbGxcbiAgICAgICAgLy8gUmVtb3ZlIENocm9tZSBzcGVjaWZpYyBzdHJpbmdzIHRvIG1hdGNoIEZpcmVmb3ggbG9vayBhbmQgZmVlbCAoZ28gZmYpXG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9eRXJyb3JcXHMrLywgJycpO1xuICAgICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvXlxccythdC4vLCAnJyk7XG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9beygpfV0vZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdVbnN1cHBvcnRlZCBicm93c2VyIHRvIGdldCB0aGUgY2FsbGVyIG5hbWUgZnJvbSc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnQXJndW1lbnQgZXJyb3IsIHVuYWJsZSB0byBnZXQgdGhlIGNhbGxlciBuYW1lIG9uIHRoaXMgcmFpc2UnO1xuICAgIH1cbiAgICAvLyBQcmVwYXJlIGZ1bmN0aW9uIG5hbWUsIGFuZCByZXBsYWNlIHdpdGggYW5vbnltb3VzIGluIHByb3BlciBjYXNlXG4gICAgbGV0IGZ1bmN0aW9uTmFtZSA9IGNhbGxlcjtcbiAgICBpZiAoY2FsbGVyLmNoYXJBdCgwKSA9PT0gJyAnKSB7IC8vIEZpcnN0IGNoYXIgaXMgbm9ybWFsbHkgdGhlIGZ1bmN0aW9uIG5hbWUgZmlyc3QgY2hhci4gU3BhY2UgbWVhbnMgYW5vbnltb3VzIGNyb3NzIGJyb3dzZXJzIChzbyBmYXIuLi4pXG4gICAgICBmdW5jdGlvbk5hbWUgPSBgPGFub255bW91cz4ke2NhbGxlcn1gO1xuICAgIH1cbiAgICAvLyBVbmlmaWVkIHJldHVybmVkIHZhbHVlIGZvciBhbm9ueW1vdXMvbm9uIGFub255bW91cyBtZXRob2RzXG4gICAgcmV0dXJuIGBSYWlzZWQgZnJvbSBmdW5jdGlvbiAke2Z1bmN0aW9uTmFtZX1gO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBMT0dHRVIgSlMgUFVCTElDIE1FVEhPRCAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgYXJlIHRoZSBleHBvc2VkIG1ldGhvZCBvZiBMb2dnZXIgY29tcG9uZW50LiBJdCBhbGxvd3MgdG8gcmFpc2UgZXJyb3IgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgICAgICAgICovXG4gIC8qICBjb25zb2xlIGlmIG5lZWRlZCwgYW5kIGRpc3BsYXllZCBpbiB0aGUgaW50ZXJmYWNlIHVzaW5nIGEgbm90aWZpY2F0aW9uIGNvbXBvbmVudC4gT3RoZXJ3aXNlLCBpdCB3b24ndCBkbyAgICAgICAgKi9cbiAgLyogIGFueXRoaW5nLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSByYWlzZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBMb2dnZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoZSByYWlzZSBtZXRob2Qgd2lsbCBidWlsZCwgYWNjb3JkaW5nIHRvIGFyZ3VtZW50IHNlbnQgdG8gdGhpcyBzaW5nbGV0b24gY29uc3RydWN0b3IsXG4gICAqIGEgY29uc29sZSBvdXRwdXQgYW5kL29yIGEgbm90aWZpY2F0aW9uIGZvciB0aGUgZ2l2ZW4gZXJyb3IuIFRoZSBpbnB1dCBlcnJvciBjYW4gYmUgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yLFxuICAgKiByYWlzZWQgbGlrZSA8Y29kZT5uZXcgRXJyb3IoKTwvY29kZT4sIGJ1dCBjYW4gYWxzbyBiZSBidWlsZCB1c2luZyB0aGUgY3VzdG9tIGZvcm1hdCwgdXNpbmcgdGhlIGtleSBvZiB0aGUgZXJyb3JcbiAgICogYXMgaW5wdXQgc3RyaW5nLiBTZWUgY29uc3RydWN0b3IgYW5kIGV4YW1wbGUgZm9yIGRlbW9uc3RyYXRpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgLSBUaGUgZXJyb3IgdG8gaGFuZGxlLiBDYW4gYmUgYSBjdXN0b20gZXJyb3Igb3IgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yICovXG4gIHJhaXNlKGVycm9yKSB7XG4gICAgLy8gQ3JlYXRlIGVycm9yIHNwZWNpZmljIHZhbHVlcyBkZXBlbmRpbmcgb24gZXJyb3Igb3JpZ2luIChKYXZhU2NyaXB0LCBDdXN0b20gb3IgVW5rbm93bikgKi9cbiAgICBjb25zdCBlcnJvclBhcmFtZXRlcnMgPSB0aGlzLl9idWlsZEVycm9ySW5mbyhlcnJvcik7XG4gICAgLyogSWYgYW55IE5vdGlmaWNhdGlvbiBtYW5hZ2VyIGV4aXN0cywgdXNlIGl0IHdpdGggZXJyb3IgcGFyYW1ldGVycyAqL1xuICAgIHRoaXMuX2xvZ0Vycm9yVG9Ob3RpZmljYXRpb24oZXJyb3JQYXJhbWV0ZXJzKTtcbiAgICAvKiBJbiBkZWJ1ZyBtb2RlLCBmaWxsIHRoZSBjb25zb2xlIHdpdGggZXJyb3IgcGFyYW1ldGVycyAqL1xuICAgIHRoaXMuX2xvZ0Vycm9yVG9Db25zb2xlKGVycm9yUGFyYW1ldGVycyk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuXG4gIC8qKiBAc3VtbWFyeSBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYSBub3RpZmljYXRpb24gaGFuZGxlclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCB0aGUgbm90aWZpY2F0aW9uIHNpbmdsZXRvbiBoYW5kbGVyIHRoYXQgd2lsbCBoYW5kbGUgYWxsIGluY29taW5nIE5vdGlmaWNhdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFRoZSBub3RpZmljYXRpb24gaGFuZGxlciBnbG9iYWwgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249dG9wLXJpZ2h0XSAtIDxpPnRvcC1sZWZ0OyB0b3AtcmlnaHQ7IGJvdHRvbS1sZWZ0OyBib3R0b20tcmlnaHQ7PC9pPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudGhpY2tCb3JkZXI9dG9wXSAtIDxpPnRvcDsgYm90dG9tOyBsZWZ0OyByaWdodDsgbm9uZTs8L2k+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0zMDAwXSAtIE5vdGlmaWNhdGlvbiBsaWZlIGN5Y2xlIGR1cmF0aW9uIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRyYW5zaXRpb249MTAwXSAtIE5vdGlmaWNhdGlvbiBmYWRlIGFuaW1hdGlvbiB0cmFuc2l0aW9uIHRpbWluZyAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhBY3RpdmU9NV0gLSBNYXhpbXVtIG9mIHNpbXVsdGFuZW91c2x5IG9wZW5lZCBub3RpZmljYXRpb24gaW4gcmFuZ2UgTiogKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghIU5vdGlmaWNhdGlvbi5pbnN0YW5jZSkgeyAvLyBHb0YgU2luZ2xldG9uXG4gICAgICByZXR1cm4gTm90aWZpY2F0aW9uLmluc3RhbmNlO1xuICAgIH1cbiAgICBOb3RpZmljYXRpb24uaW5zdGFuY2UgPSB0aGlzO1xuICAgIC8vIEF0dHJpYnV0ZXMgZGVjbGFyYXRpb25cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtib29sZWFufSAtIERpc21pc3MgYWxsIG9wZXJhdGlvbiBpbiBwcm9ncmVzcyBmbGFnICovXG4gICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gTm90aWZpY2F0aW9uIGhhbmRsZXIgY29udGFpbmVyIG5vZGUgKi9cbiAgICB0aGlzLl9kb20gPSB7fTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gQWN0aXZlIG5vdGlmaWNhdGlvbnMgb2JqZWN0IDogcmV0cmlldmUgYSBub3RpZmljYXRpb24gdXNpbmcgaXRzIElEICh0aGlzLl9hY3RpdmVbSURdKSAqL1xuICAgIHRoaXMuX2FjdGl2ZSA9IHt9O1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBRdWV1ZSBub3RpZmljYXRpb25zIHdoZW4gbWF4IGFjdGl2ZSBoYXMgYmVlbiByZWFjaGVkICovXG4gICAgdGhpcy5fcXVldWUgPSB7fTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gTm90aWZpY2F0aW9uIGhhbmRsZXIgZGVmYXVsdCB2YWx1ZXMgKi9cbiAgICB0aGlzLl9kZWZhdWx0ID0ge307XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSBoYW5kbGVyIHBvc2l0aW9uIGluIHZpZXdwb3J0IC0gPGk+dG9wLWxlZnQ7IHRvcC1yaWdodDsgYm90dG9tLWxlZnQ7IGJvdHRvbS1yaWdodDs8L2k+ICovXG4gICAgdGhpcy5fcG9zaXRpb24gPSAnJztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gVGhlIHRoaWNrIGJvcmRlciBwb3NpdGlvbiBpbiB0aGUgTm90aWZpY2F0aW9uIC0gPGk+dG9wOyBib3R0b207IGxlZnQ7IHJpZ2h0OyBub25lOzwvaT4gKi9cbiAgICB0aGlzLl90aGlja0JvcmRlciA9ICcnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBUaGUgTm90aWZpY2F0aW9uIG9uIHNjcmVlbiBkdXJhdGlvbiBpbiBtcyAqL1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGZhZGUgdHJhbnNpdGlvbiB0aW1lIGluIG1zICovXG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IDA7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBhY3RpdmUgTm90aWZpY2F0aW9uICovXG4gICAgdGhpcy5fbWF4QWN0aXZlID0gMDtcbiAgICAvKiogQHB1YmxpY1xuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBUaGUgY29tcG9uZW50IHZlcnNpb24gKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnMS4xLjAnO1xuICAgIC8vIEJ1aWxkIHNpbmdsZXRvbiBhbmQgYXR0YWNoXG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAvLyBSZXR1cm4gc2luZ2xldG9uXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBNYXJjaCAyMDE5XG4gICAqIEBkZXNjcmlwdGlvbiBEZXN0cm95IHRoZSBzaW5nbGV0b24gYW5kIGRldGFjaCBpdCBmcm9tIHRoZSBET00gKi9cbiAgZGVzdHJveSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2RvbSk7XG4gICAgLy8gRGVsZXRlIG9iamVjdCBhdHRyaWJ1dGVzXG4gICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBDbGVhciBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICBOb3RpZmljYXRpb24uaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE5PVElGSUNBVElPTiBKUyBIQU5ETEVSIENPTlNUUlVDVElPTiBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIGZvbGxvd2luZyBtZXRob2RzIG9ubHkgY29uY2VybnMgdGhlIHNpbmdsZXRvbiBjcmVhdGlvbi4gSXQgaGFuZGxlIGFsbCBhcmd1bWVudHMgYW5kIHdpbGwgZmFsbGJhY2sgb24gICAgICAgICovXG4gIC8qICBkZWZhdWx0IHZhbHVlcyBpZiBhbnkgYXJndW1lbnQgZG9lc24ndCBtZWV0IGl0cyBleHBlY3RlZCB2YWx1ZSBvciB0eXBlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdGhlIGhhbmRsZXIgRE9NIGVsZW1lbnQsIHNldCBkZWZhdWx0IHZhbHVlcywgdGVzdCBnaXZlbiBvcHRpb25zIGFuZCBwcm9wZXJseSBhZGQgQ1NTIGNsYXNzIHRvIHRoZSBoYW5kbGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgZ2xvYmFsIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBvc2l0aW9uPXRvcC1yaWdodF0gLSA8aT50b3AtbGVmdDsgdG9wLXJpZ2h0OyBib3R0b20tbGVmdDsgYm90dG9tLXJpZ2h0OzwvaT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRoaWNrQm9yZGVyPXRvcF0gLSA8aT50b3A7IGJvdHRvbTsgbGVmdDsgcmlnaHQ7IG5vbmU7PC9pPlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MzAwMF0gLSBOb3RpZmljYXRpb24gbGlmZSBjeWNsZSBkdXJhdGlvbiAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy50cmFuc2l0aW9uPTEwMF0gIC0gTm90aWZpY2F0aW9uIGZhZGUgYW5pbWF0aW9uIHRyYW5zaXRpb24gdGltaW5nIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heEFjdGl2ZT01XSAtIE1heGltdW0gb2Ygc2ltdWx0YW5lb3VzbHkgb3BlbmVkIG5vdGlmaWNhdGlvbiBpbiByYW5nZSBOKiAqL1xuICBfaW5pdChvcHRpb25zKSB7XG4gICAgLy8gRGVjbGFyZSBvcHRpb25zIGFzIG9iamVjdCBpZiBlbXB0eVxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIG5vdGlmaWNhdGlvbiBtYWluIGNvbnRhaW5lclxuICAgIHRoaXMuX2RvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpOyAvLyBOb3RpZmljYXRpb24gaGFuZGxlciBET00gY29udGFpbmVyXG4gICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbi1jb250YWluZXInKTsgLy8gU2V0IHByb3BlciBDU1MgY2xhc3NcbiAgICAvLyBOb3RpZmljYXRpb24uanMgZGVmYXVsdCB2YWx1ZXNcbiAgICB0aGlzLl9kZWZhdWx0ID0ge1xuICAgICAgaGFuZGxlcjoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXG4gICAgICAgIHRoaWNrQm9yZGVyOiAndG9wJyxcbiAgICAgICAgZHVyYXRpb246IDUwMDAsXG4gICAgICAgIHRyYW5zaXRpb246IDIwMCxcbiAgICAgICAgbWF4QWN0aXZlOiAxMFxuICAgICAgfSxcbiAgICAgIG5vdGlmaWNhdGlvbjoge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGljb25sZXNzOiBmYWxzZSxcbiAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgIHN0aWNreTogZmFsc2UsXG4gICAgICAgIHJlbmRlclRvOiB0aGlzLl9kb20sXG4gICAgICAgIENCdGl0bGU6ICcnLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICAgICAgaXNEaW1tZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgY29sb3I6IHtcbiAgICAgICAgc3VjY2VzczogJ3JnYig3NiwgMTc1LCA4MCknLFxuICAgICAgICBpbmZvOiAncmdiKDMsIDE2OSwgMjQ0KScsXG4gICAgICAgIHdhcm5pbmc6ICdyZ2IoMjU1LCAxNTIsIDApJyxcbiAgICAgICAgZXJyb3I6ICdyZ2IoMjQ0LCA2NywgNTQpJ1xuICAgICAgfSxcbiAgICAgIHN2Z1BhdGg6IHtcbiAgICAgICAgc3VjY2VzczogJ00xMi41IDBDNS42MDIgMCAwIDUuNjAyIDAgMTIuNVM1LjYwMiAyNSAxMi41IDI1IDI1IDE5LjM5OCAyNSAxMi41IDE5LjM5OCAwIDEyLjUgMHptLTIuMyAxOC44OThsLTUuNS01LjUgMS44LTEuNzk2IDMuNyAzLjY5OUwxOC41IDdsMS44IDEuOHptMCAwJyxcbiAgICAgICAgaW5mbzogJ00xMi41MDQuMDM1YTEyLjQ2OCAxMi40NjggMCAxMDAgMjQuOTM3IDEyLjQ2OCAxMi40NjggMCAwMDAtMjQuOTM3ek0xNS4xIDE5LjM1OWMtLjY0My4yNS0xLjE1My40NDUtMS41MzcuNTc2LS4zODQuMTM0LS44MjUuMTk5LTEuMzMzLjE5OS0uNzc1IDAtMS4zODEtLjE5Mi0xLjgxMy0uNTdhMS44MzIgMS44MzIgMCAwMS0uNjQyLTEuNDQyYzAtLjIyNy4wMTUtLjQ1OS4wNDctLjY5My4wMy0uMjQuMDgzLS41MDQuMTU0LS44MDZsLjgwMi0yLjgzNWMuMDY5LS4yNzIuMTMyLS41MjcuMTgyLS43Ny4wNDgtLjI0NC4wNjktLjQ2Ny4wNjktLjY2OCAwLS4zNi0uMDc1LS42MTUtLjIyMy0uNzU2LS4xNTMtLjE0NC0uNDM3LS4yMTMtLjg1Ny0uMjEzLS4yMDcgMC0uNDIyLjAzNi0uNjM5LjA5NWE5LjkxNCA5LjkxNCAwIDAwLS41Ni4xODRsLjIxMy0uODc0YTE5Ljc3NyAxOS43NzcgMCAwMTEuNTEtLjU0OSA0LjQ4IDQuNDggMCAwMTEuMzYxLS4yM2MuNzcgMCAxLjM2OC4xOSAxLjc4NC41NmExLjg1NyAxLjg1NyAwIDAxLjYyNiAxLjQ1MmMwIC4xMjItLjAxMi4zNDEtLjA0LjY1MmE0LjQ0IDQuNDQgMCAwMS0uMTYyLjg1NmwtLjc5OCAyLjgzMWE4LjEzMyA4LjEzMyAwIDAwLS4xNzYuNzc1Yy0uMDUuMjg4LS4wNzUuNTEtLjA3NS42NiAwIC4zNzQuMDgyLjYzMy4yNTEuNzcxLjE2NS4xMzQuNDU4LjIwMi44NzUuMjAyLjE5MiAwIC40MTItLjAzNy42Ni0uMS4yNDMtLjA3My40Mi0uMTI3LjUzMS0uMTh6bS0uMTQ0LTExLjQ4M2ExLjkwMSAxLjkwMSAwIDAxLTEuMzQzLjUxOCAxLjkzIDEuOTMgMCAwMS0xLjM1Mi0uNTE4IDEuNjUgMS42NSAwIDAxLS41NjItMS4yNTggMS42ODggMS42ODggMCAwMS41NjItMS4yNjYgMS45MTQgMS45MTQgMCAwMTEuMzUtLjUyMmMuNTI0IDAgLjk3NS4xNzMgMS4zNDUuNTIzYTEuNjczIDEuNjczIDAgMDEuNTYgMS4yNjYgMS42NSAxLjY1IDAgMDEtLjU2IDEuMjU3eicsXG4gICAgICAgIHdhcm5pbmc6ICdNMjQuNTg1IDIxLjE3TDEzLjc3NCAzLjI0YTEuNTEgMS41MSAwIDAwLTIuNTg2IDBMLjM3NiAyMS4xN2ExLjUxIDEuNTEgMCAwMDEuMjkzIDIuMjloMjEuNjIzYTEuNTEgMS41MSAwIDAwMS4yOTItMi4yOXpNMTIuNDkgOC43MTRjLjYyMSAwIDEuMTQ2LjM1IDEuMTQ2Ljk3IDAgMS44OTUtLjIyMyA0LjYxOC0uMjIzIDYuNTEzIDAgLjQ5NC0uNTQxLjctLjkyMy43LS41MSAwLS45NC0uMjA4LS45NC0uNzAxIDAtMS44OTQtLjIyMy00LjYxNy0uMjIzLTYuNTExIDAtLjYyLjUxLS45NzEgMS4xNjMtLjk3MXptLjAxNSAxMS43MzRhMS4yMjUgMS4yMjUgMCAwMS0xLjIyNS0xLjIyNmMwLS42NjkuNTI1LTEuMjI3IDEuMjI1LTEuMjI3LjY1MiAwIDEuMjEuNTU4IDEuMjEgMS4yMjcgMCAuNjUyLS41NTcgMS4yMjUtMS4yMSAxLjIyNXonLFxuICAgICAgICBlcnJvcjogJ00xMi40NjkuMDI3Yy0zLjMzMiAwLTYuNDY1IDEuMzAxLTguODI0IDMuNjUzLTQuODYgNC44Ni00Ljg2IDEyLjc3NyAwIDE3LjYzNmExMi4zOTIgMTIuMzkyIDAgMDA4LjgyNCAzLjY1M2MzLjMzNiAwIDYuNDY1LTEuMzAxIDguODI0LTMuNjUzIDQuODYzLTQuODU5IDQuODYzLTEyLjc3NyAwLTE3LjYzNkExMi40MTcgMTIuNDE3IDAgMDAxMi40NjkuMDI3em01LjYxIDE4LjA4NmExLjEzNyAxLjEzNyAwIDAxLS44MDIuMzMyYy0uMjg1IDAtLjU4Mi0uMTEzLS44LS4zMzJsLTQuMDA4LTQuMDA4LTQuMDA4IDQuMDA4YTEuMTM3IDEuMTM3IDAgMDEtLjguMzMyYy0uMjg2IDAtLjU4My0uMTEzLS44MDItLjMzMmExLjEzMiAxLjEzMiAwIDAxMC0xLjYwNWw0LjAwOC00LjAwNEw2Ljg2IDguNDk2YTEuMTMyIDEuMTMyIDAgMDEwLTEuNjA1IDEuMTI3IDEuMTI3IDAgMDExLjYwMiAwbDQuMDA4IDQuMDA3IDQuMDA4LTQuMDA3YTEuMTI3IDEuMTI3IDAgMDExLjYwMSAwYy40NS40NDkuNDUgMS4xNjQgMCAxLjYwNWwtNC4wMDQgNC4wMDggNC4wMDQgNC4wMDRjLjQ1LjQ0OS40NSAxLjE2NCAwIDEuNjA1em0wIDAnXG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBCdWlsZCBzaW5nbGV0b24gZnJvbSBvcHRpb25zIGFuZCBzYW5pdGl6ZSB0aGVtXG4gICAgdGhpcy5fc2V0T3B0aW9uc0RlZmF1bHQob3B0aW9ucyk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uO1xuICAgIHRoaXMuX3RoaWNrQm9yZGVyID0gb3B0aW9ucy50aGlja0JvcmRlcjtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IG9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB0aGlzLl9tYXhBY3RpdmUgPSBvcHRpb25zLm1heEFjdGl2ZTtcbiAgICB0aGlzLl9zZXRBdHRyaWJ1dGVzRGVmYXVsdCgpO1xuICAgIC8vIEFkZCBwb3NpdGlvbiBDU1MgY2xhc3Mgb25seSBhZnRlciB0aGlzLl9wb3NpdGlvbiBpcyBzdXJlIHRvIGJlIGEgdmFsaWQgdmFsdWVcbiAgICB0aGlzLl9kb20uY2xhc3NMaXN0LmFkZCh0aGlzLl9wb3NpdGlvbik7XG4gICAgdGhpcy5fYXR0YWNoKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRPcHRpb25zRGVmYXVsdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IFNldCBzaW5nbGV0b24gb3B0aW9uc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgdGhlIG5vdGlmaWNhdGlvbiBzaW5nbGV0b24gYWNjb3JkaW5nIHRvIHRoZSB1c2VyIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgc2luZ2xldG9uIG9wdGlvbnMgdG8gc2V0ICovXG4gIF9zZXRPcHRpb25zRGVmYXVsdChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRoaWNrQm9yZGVyID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRoaWNrQm9yZGVyO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIuZHVyYXRpb247XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudHJhbnNpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRyYW5zaXRpb24gPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5tYXhBY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5tYXhBY3RpdmUgPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIubWF4QWN0aXZlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3NldEF0dHJpYnV0ZXNEZWZhdWx0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQHN1bW1hcnkgQ2hlY2sgdGhlIG5vdGlmaWNhdGlvbiBzaW5nbGV0b24gb3B0aW9ucyB2YWxpZGl0eVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gRmFsbGJhY2sgb24gZGVmYXVsdCBhdHRyaWJ1dGVzIHZhbHVlIGlmIHRoZSBub3RpZmljYXRpb24gc2luZ2xldG9uIG9wdGlvbnMgYXJlIGludmFsaWQgKi9cbiAgX3NldEF0dHJpYnV0ZXNEZWZhdWx0KCkge1xuICAgIGlmICh0aGlzLl9wb3NpdGlvbiAhPT0gJ3RvcC1sZWZ0JyAmJiAvKiBJbGxlZ2FsIHZhbHVlIGZvciBwb3NpdGlvbiAqL1xuICAgICAgdGhpcy5fcG9zaXRpb24gIT09ICd0b3AtcmlnaHQnICYmXG4gICAgICB0aGlzLl9wb3NpdGlvbiAhPT0gJ2JvdHRvbS1sZWZ0JyAmJlxuICAgICAgdGhpcy5fcG9zaXRpb24gIT09ICdib3R0b20tcmlnaHQnKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl90aGlja0JvcmRlciAhPT0gJ3RvcCcgJiYgLyogSWxsZWdhbCB2YWx1ZSBmb3IgdGhpY2sgYm9yZGVyICovXG4gICAgICB0aGlzLl90aGlja0JvcmRlciAhPT0gJ2JvdHRvbScgJiZcbiAgICAgIHRoaXMuX3RoaWNrQm9yZGVyICE9PSAnbGVmdCcgJiZcbiAgICAgIHRoaXMuX3RoaWNrQm9yZGVyICE9PSAncmlnaHQnICYmXG4gICAgICB0aGlzLl90aGlja0JvcmRlciAhPT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLl90aGlja0JvcmRlciA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50aGlja0JvcmRlcjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5fZHVyYXRpb24gIT09ICdudW1iZXInIHx8IHRoaXMuX2R1cmF0aW9uIDw9IDApIHsgLy8gSWxsZWdhbCB2YWx1ZSBmb3IgZHVyYXRpb25cbiAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLmR1cmF0aW9uOyAvLyBEZWZhdWx0IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl90cmFuc2l0aW9uICE9PSAnbnVtYmVyJyB8fCB0aGlzLl9kdXJhdGlvbiA8ICh0aGlzLl90cmFuc2l0aW9uICogMikgfHwgdGhpcy5fdHJhbnNpdGlvbiA8PSAwKSB7IC8vIFRyYW5zaXRpb24gb3ZlciAoZHVyYXRpb24gLyAyKVxuICAgICAgdGhpcy5fdHJhbnNpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50cmFuc2l0aW9uOyAvLyBEZWZhdWx0IHZhbHVlIGZvciBfbWF4QWN0aXZlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhBY3RpdmUgIT09ICdudW1iZXInIHx8IHRoaXMuX21heEFjdGl2ZSA8PSAwKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIG1heEFjdGl2ZVxuICAgICAgdGhpcy5fbWF4QWN0aXZlID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLm1heEFjdGl2ZTsgLy8gRGVmYXVsdCB2YWx1ZSBmb3IgX21heEFjdGl2ZVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2F0dGFjaFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEF0dGFjaCB0aGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgdG8gdGhlIGRvbSB1c2luZyBhIGZyYWdtZW50ICovXG4gIF9hdHRhY2goKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5fZG9tKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTk9USUZJQ0FUSU9OIFNQRUNJRklDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyBpbXBsZW1lbnRzIG5vdGlmaWNhdGlvbiBmZWF0dXJlcy4gSXQgaGFuZGxlIGl0cyBldmVudHMsIGxpZmVjeWNsZSBkZXBlbmRpbmcgb24gaXRzICAgICAgICAqL1xuICAvKiAgcGFyYW1ldGVycywgaXRzIERPTSBzdHJ1Y3R1cmUsIGFuZCBpdHMgYW5pbWF0aW9ucy4gVGhlIE5vdGlmaWNhdGlvbiBzaW5nbGV0b24gd2lsbCBoYW5kbGUgdGhlIG5vdGlmaWNhdGlvbiAgICAgICovXG4gIC8qICBzdGFja2luZyB0aGUgaW4gdXNlciBpbnRlcmZhY2UuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBtb3VzZSBldmVudHMgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn19IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgLSBOb3RpZmljYXRpb24gaW5uZXIgY2FsbCBjb3VudGVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24udGltZW91dElEIC0gTm90aWZpY2F0aW9uIG93biBzZXRUaW1lb3V0IElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnICovXG4gIF9ldmVudHMobm90aWZpY2F0aW9uKSB7XG4gICAgbGV0IGNsb3NlRmlyZWQgPSBmYWxzZTsgLy8gQ2xvc2UgZmlyZWQgZmxhZ1xuXG4gICAgLy8gSW5uZXIgY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgY29uc3QgX3VuRGltID0gKCkgPT4geyAvLyBVbmRpbSBub3RpZmljYXRpb25cbiAgICAgIGlmIChub3RpZmljYXRpb24uaXNEaW1tZWQpIHtcbiAgICAgICAgdGhpcy5fdW5EaW0obm90aWZpY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgX2Nsb3NlID0gKCkgPT4geyAvLyBDbG9zZSBub3RpZmljYXRpb25cbiAgICAgIGlmICh0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID4gMSkge1xuICAgICAgICB0aGlzLl9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgbm90aWZpY2F0aW9uIGVsZW1lbnQgZnJvbSB0aGUgRE9NIHRyZWVcbiAgICAgIGVsc2UgaWYgKCFjbG9zZUZpcmVkKSB7XG4gICAgICAgIGNsb3NlRmlyZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG5vdGlmaWNhdGlvbi50aW1lb3V0SUQpOyAvLyBDbGVhciBsaWZlIGN5Y2xlIHRpbWVvdXRcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZSk7IC8vIEF2b2lkIGVycm9yIHdoZW4gc3BhbSBjbGlja2luZyB0aGUgY2xvc2UgYnV0dG9uXG4gICAgICAgIHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IF9yZXNldFRpbWVvdXQgPSAoKSA9PiB7IC8vIFJlc2V0IGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNsb3NlRmlyZWQgJiYgIW5vdGlmaWNhdGlvbi5pc0RpbW1lZCkgeyAvLyBPbmx5IHJlc2V0IHRpbWVvdXQgaWYgbm8gY2xvc2UgZXZlbnQgaGFzIGJlZW4gZmlyZWRcbiAgICAgICAgdGhpcy5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1vdXNlIGV2ZW50IGxpc3RlbmVyc1xuICAgIGlmIChub3RpZmljYXRpb24uc3RpY2t5KSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBfdW5EaW0uYmluZCh0aGlzKSk7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgX3VuRGltLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChub3RpZmljYXRpb24uY2xvc2FibGUpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgX3Jlc2V0VGltZW91dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkVUlcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZHMgdGhlIERPTSBlbGVtZW50IHRoYXQgY29udGFpbnMgYW5kIHRoYXQgYWRhcHRzIHRvIGFsbCBnaXZlbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnR5cGUgLSBFcnJvciwgV2FybmluZywgSW5mbywgU3VjY2Vzc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnRpdGxlIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24ubWVzc2FnZSAtIE5vdGlmaWNhdGlvbiBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmljb25sZXNzIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24udGhpY2tCb3JkZXIgLSBOb3RpZmljYXRpb24gYm9yZGVyIHNpZGUgKG92ZXJyaWRlIGhhbmRsZXIgc2lkZSB2YWx1ZSlcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE1ha2Ugbm90aWZpY2F0aW9uIHN0aWNreSBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24uQ0J0aXRsZSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBub3RpZmljYXRpb24uY2FsbGJhY2sgLSBOb3RpZmljYXRpb24gY2FsbGJhY2sgYnV0dG9uXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEVuaGFuY2VkIGFuZCByZWFkeSBub3RpZmljYXRpb24gb2JqZWN0ICovXG4gIF9idWlsZFVJKG5vdGlmaWNhdGlvbikge1xuICAgIG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPSAxO1xuICAgIG5vdGlmaWNhdGlvbi50b3RhbFJlcXVlc3RDb3VudCA9IDE7XG4gICAgdGhpcy5fYnVpbGRVSURvbShub3RpZmljYXRpb24pO1xuICAgIHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uVHlwZShub3RpZmljYXRpb24pO1xuXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb25sZXNzLXdpZHRoJyk7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20ubWFpbnRpdGxlKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlKTtcbiAgICAvLyBBZGQgY2FsbGJhY2sgYnV0dG9uIGFuZCBsaXN0ZW5lciBpZiBuZWVkZWRcbiAgICBpZiAobm90aWZpY2F0aW9uLmNhbGxiYWNrKSB7XG4gICAgICBjb25zdCBjYWxsYmFja0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xuICAgICAgY2FsbGJhY2tCdXR0b24uaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLkNCdGl0bGU7XG4gICAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQoY2FsbGJhY2tCdXR0b24pO1xuICAgICAgY2FsbGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEZpbGwgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50XG4gICAgaWYgKCFub3RpZmljYXRpb24uaWNvbmxlc3MpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5pY29uKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20udGV4dCk7XG4gICAgLy8gQXBwZW5kIGNsb3NlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICBpZiAobm90aWZpY2F0aW9uLmNsb3NhYmxlKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20uY2xvc2UpO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gZmluYWwgbm90aWZpY2F0aW9uXG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkVUlEb21cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAc3VtbWFyeSBDcmVhdGUgdGhlIE5vdGlmaWNhdGlvbiBET00gdHJlZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYWxsIHRoZSBOb3RpZmljYXRpb24gaW50ZXJuYWwgc3RydWN0dXJlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIHRvIGNyZWF0ZSAqL1xuICBfYnVpbGRVSURvbShub3RpZmljYXRpb24pIHtcbiAgICAvLyBDcmVhdGUgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50c1xuICAgIG5vdGlmaWNhdGlvbi5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvblBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BhdGgnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdINicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcbiAgICAvLyBDbGFzcyBhc3NpZ25hdGlvblxuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLmNsYXNzTGlzdC5hZGQoJ3ZlY3Rvci1jb250YWluZXInKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1jb250YWluZXInKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgLy8gQ2hhbmdpbmcgYm9yZGVyIHNpZGVcbiAgICBpZiAobm90aWZpY2F0aW9uLnRoaWNrQm9yZGVyID09PSAndG9wJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCd0b3AtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdib3R0b20nKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2JvdHRvbS1ib3JkZXInKTtcbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi50aGlja0JvcmRlciA9PT0gJ2xlZnQnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2xlZnQtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdyaWdodCcpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgncmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIC8vIFRleHQgbW9kaWZpY2F0aW9uXG4gICAgbm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUuaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLnRpdGxlIHx8ICcnO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWVzc2FnZS5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ubWVzc2FnZSB8fCAnJztcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmlubmVySFRNTCA9ICcmI3gyNzE2Oyc7XG4gICAgLy8gSW1hZ2UgdmVjdG9yXG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMjUgMjUnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmljb24uc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyNScpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyNScpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLmljb25QYXRoKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkTm90aWZpY2F0aW9uVHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IEF0dGFjaCBwcm9wZXIgYXNzZXRzIGFuZCBjc3NcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE1hcmNoIDIwMTlcbiAgICogQGRlc2NyaXB0aW9uIEZpbGxzIHRoZSBOb3RpZmljYXRpb24gaWNvbiBhbmQgY2xhc3MgYWNjb3JkaW5nIHRvIGl0cyBpbm5lciB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIHRvIGZpbGwgKi9cbiAgX2J1aWxkTm90aWZpY2F0aW9uVHlwZShub3RpZmljYXRpb24pIHtcbiAgICAvLyBUeXBlIHNwZWNpZmljYXRpb24gKHRpdGxlLCBpY29uLCBjb2xvcilcbiAgICBpZiAoWydzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnaW5mbyddLmluZGV4T2Yobm90aWZpY2F0aW9uLnR5cGUpICE9PSAtMSl7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQobm90aWZpY2F0aW9uLnR5cGUpO1xuXG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmljb25QYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX2RlZmF1bHQuY29sb3Jbbm90aWZpY2F0aW9uLnR5cGVdKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5pY29uUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLl9kZWZhdWx0LnN2Z1BhdGhbbm90aWZpY2F0aW9uLnR5cGVdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdpbmZvJyk7XG5cbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvblBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fZGVmYXVsdC5jb2xvci5pbmZvKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5pY29uUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLl9kZWZhdWx0LnN2Z1BhdGguaW5mbyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RhcnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYWxsIHRoaXMgbWV0aG9kIHRvIGFkZCB0aGUgbmV3IG5vdGlmaWNhdGlvbiB0byB0aGUgRE9NIGNvbnRhaW5lciwgYW5kIGxhdW5jaCBpdHMgbGlmZSBjeWNsZVxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBvd24gSUQgKi9cbiAgX3N0YXJ0KG5vdGlmaWNhdGlvbikge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9hY3RpdmUpLmxlbmd0aCA+PSB0aGlzLl9tYXhBY3RpdmUpIHtcbiAgICAgIHRoaXMuX3F1ZXVlW25vdGlmaWNhdGlvbi5pZF0gPSBub3RpZmljYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdID0gbm90aWZpY2F0aW9uOyAvLyBBcHBlbmQgdGhlIG5ldyBub3RpZmljYXRpb24gdG8gdGhlIF9hY3RpdmUgb2JqZWN0XG5cbiAgICAgIHRoaXMuX2V2ZW50cyhub3RpZmljYXRpb24pOyAvLyBMaXN0ZW4gdG8gbW91c2UgZXZlbnRzIG9uIHRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvblxuICAgICAgdGhpcy5fb3Blbihub3RpZmljYXRpb24pOyAvLyBPcGVuIHRoZSBuZXcgbm90aWZpY2F0aW9uXG5cbiAgICAgIG5vdGlmaWNhdGlvbi50aW1lb3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrQ291bnRlcihub3RpZmljYXRpb24pOyAvLyBDaGVjayBub3RpZmljYXRpb24gcmVxdWVzdCBjb3VudCB0byBhY3QgYWNjb3JkaW5nbHlcbiAgICAgIH0sIG5vdGlmaWNhdGlvbi5kdXJhdGlvbik7IC8vIFVzZSBOb3RpZmljYXRpb24gbWFzdGVyIGR1cmF0aW9uXG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfb3BlblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE9wZW4gYW5kIGFkZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSBjb250YWluZXJcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn19IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnQgKi9cbiAgX29wZW4obm90aWZpY2F0aW9uKSB7XG4gICAgLy8gUmV2ZXJzZSBpbnNlcnRpb24gd2hlbiBub3RpZmljYXRpb25zIGFyZSBvbiBib3R0b21cbiAgICBpZiAodGhpcy5fcG9zaXRpb24gPT09ICdib3R0b20tcmlnaHQnIHx8IHRoaXMuX3Bvc2l0aW9uID09PSAnYm90dG9tLWxlZnQnKSB7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8uaW5zZXJ0QmVmb3JlKG5vdGlmaWNhdGlvbi5kb20sIG5vdGlmaWNhdGlvbi5yZW5kZXJUby5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWZpY2F0aW9uLnJlbmRlclRvLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20pO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5vcGVuZWQgPSBEYXRlLm5vdygpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfSwgMTApO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfY2xvc2VcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDbG9zZSBhbmQgcmVtb3ZlIHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgY29udGFpbmVyXG4gICAqIEBwYXJhbSB7e2lkOiBudW1iZXJ9fHtpZDogbnVtYmVyLCBkb206IE9iamVjdCwgcmVxdWVzdENvdW50OiBudW1iZXIsIHRpbWVvdXRJRDogbnVtYmVyLCBzdGlja3k6IGJvb2xlYW4sIGNsb3NhYmxlOiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNDbG9zaW5nIC0gQWxyZWFkeSBjbG9zaW5nIGZsYWdcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLnJlbmRlclRvIC0gRE9NIG9iamVjdCB0byByZW5kZXIgdGhlIG5vdGlmaWNhdGlvbiBpbiAqL1xuICBfY2xvc2Uobm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pc0Nsb3NpbmcpIHsgLy8gQXZvaWQgZG91YmxlIGNsb3NlIG9uIGEgbm90aWZpY2F0aW9uIChpbiBjYXNlIGRpc21pc3MvZGlzbWlzc0FsbCBpcyB0cmlnZ2VycmVkIHdoZW4gbm90aWZpY2F0aW9uIGlzIGFscmVhZHkgY2xvc2luZylcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uaXNDbG9zaW5nID0gdHJ1ZTsgLy8gTG9jayBub3RpZmljYXRpb24gdG8gb25lIGZhZGVPdXQgYW5pbWF0aW9uXG4gICAgbm90aWZpY2F0aW9uLmNsb3NlZCA9IERhdGUubm93KCk7XG4gICAgbm90aWZpY2F0aW9uLmVmZmVjdGl2ZUR1cmF0aW9uID0gbm90aWZpY2F0aW9uLmNsb3NlZCAtIG5vdGlmaWNhdGlvbi5vcGVuZWQ7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8ucmVtb3ZlQ2hpbGQobm90aWZpY2F0aW9uLmRvbSk7IC8vIFJlbW92ZSB0aGlzIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBET00gdHJlZVxuICAgICAgZGVsZXRlIHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdO1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fcXVldWUpLmxlbmd0aCA+IDApIHsgLy8gTm90aWZpY2F0aW9uIHF1ZXVlIGlzIG5vdCBlbXB0eVxuICAgICAgICB0aGlzLl9zdGFydCh0aGlzLl9xdWV1ZVtPYmplY3Qua2V5cyh0aGlzLl9xdWV1ZSlbMF1dKTsgLy8gU3RhcnQgZmlyc3QgcXVldWVkIG5vdGlmaWNhdGlvblxuICAgICAgICBkZWxldGUgdGhpcy5fcXVldWVbT2JqZWN0LmtleXModGhpcy5fcXVldWUpWzBdXTsgLy8gU2hpZnQgcXVldWUgb2JqZWN0XG4gICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoID09PSAwKSB7IC8vIENoZWNrIHRoaXMuX2FjdGl2ZSBlbXB0eW5lc3NcbiAgICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTsgLy8gVW5sb2NrIGRpc21pc3NBbGxMb2NrXG4gICAgICB9XG4gICAgfSwgMTAwMCk7IC8vIFRyYW5zaXRpb24gdmFsdWUgc2V0IGluIF9ub3RpZmljYXRpb24uc2Nzc1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5jcmVtZW50UmVxdWVzdENvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiBhIG5vdGlmaWNhdGlvbiBpcyByZXF1ZXN0ZWQgYW5vdGhlciB0aW1lXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSkgKi9cbiAgX2luY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbikge1xuICAgICsrbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDsgLy8gSW5jcmVtZW50IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnRcblxuICAgIGlmIChub3RpZmljYXRpb24udG90YWxSZXF1ZXN0Q291bnQgPCBub3RpZmljYXRpb24ucmVxdWVzdENvdW50KSB7XG4gICAgICBub3RpZmljYXRpb24udG90YWxSZXF1ZXN0Q291bnQgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBjb3VudGVyIERPTSBlbGVtZW50XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICBsZXQgdmFsdWVUb0Rpc3BsYXkgPSAn4oieJztcbiAgICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50IDwgMTAwKSB7XG4gICAgICAgIHZhbHVlVG9EaXNwbGF5ID0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcikgeyAvLyBVcGRhdGUgZXhpc3RpbmcgY291bnRlclxuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gdmFsdWVUb0Rpc3BsYXk7XG4gICAgICB9IGVsc2UgeyAvLyBDcmVhdGUgY291bnRlciBET00gZWxlbWVudFxuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvdW50ZXInKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyLmlubmVySFRNTCA9IHZhbHVlVG9EaXNwbGF5O1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVW5kaW0gbm90aWZpY2F0aW9uIGlmIGl0IGlzIGEgc3RpY2t5L2RpbW1lZCBvbmVcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiBub3RpZmljYXRpb24uaXNEaW1tZWQpIHtcbiAgICAgIHRoaXMuX3VuRGltKG5vdGlmaWNhdGlvbik7XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZGVjcmVtZW50UmVxdWVzdENvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZWFjaCBub3RpZmljYXRpb24gY3ljbGUgZW5kIHRvIHVwZGF0ZSBpdHMgaW5uZXIgY291bnRlclxuICAgKiBAcGFyYW0ge3tpZDogbnVtYmVyLCBkb206IE9iamVjdCwgcmVxdWVzdENvdW50OiBudW1iZXIsIHRpbWVvdXRJRDogbnVtYmVyLCBzdGlja3k6IGJvb2xlYW4sIGNsb3NhYmxlOiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uc3RpY2t5IC0gTm90aWZpY2F0aW9uIHN0aWNreSBiZWh2YWlvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5pc0RpbW1lZCAtIE5vdGlmaWNhdGlvbiBkaW1tZWQgc3RhdHVzIChvbmx5IHVzZWZ1bCBpZiBub3RpZmljYXRpb24uc3RpY2t5IGlzIHRydWUpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50IC0gTm90aWZpY2F0aW9uIGlubmVyIGNhbGwgY291bnRlclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWNhdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlIC0gVG8gZm9yY2UgdGhlIG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgZGVjcmVtZW50YXRpb24gKi9cbiAgX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbiwgZm9yY2UpIHtcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiAhZm9yY2UpIHtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmlzRGltbWVkKSB7XG4gICAgICAgIHRoaXMuX2RpbShub3RpZmljYXRpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7XG4gICAgLS1ub3RpZmljYXRpb24ucmVxdWVzdENvdW50OyAvLyBEZWNyZW1lbnQgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudFxuXG4gICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgIGxldCB2YWx1ZVRvRGlzcGxheSA9ICfiiJ4nO1xuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPCAxMDApIHtcbiAgICAgICAgdmFsdWVUb0Rpc3BsYXkgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgICAgfVxuXG4gICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gdmFsdWVUb0Rpc3BsYXk7XG4gICAgfSBlbHNlIHsgLy8gUmVtb3ZlIGNvdW50ZXIgZWxlbWVudCBmcm9tIHRoZSBET00gdHJlZVxuICAgICAgbm90aWZpY2F0aW9uLmRvbS5yZW1vdmVDaGlsZChub3RpZmljYXRpb24uZG9tLmNvdW50ZXIpO1xuICAgICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5kb20uY291bnRlcjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jaGVja0NvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB3aWxsIHJlc2V0IHRoZSBmYWRlb3V0L2RpbSB0aW1lb3V0IG9yIGNsb3NlL2RpbSB0aGUgbm90aWZpY2F0aW9uIGRlcGVuZGluZyBvbiBpdHMgcmVxdWVzdENvdW50XG4gICAqIEBwYXJhbSB7e2lkOiBudW1iZXJ9fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yICovXG4gIF9jaGVja0NvdW50ZXIobm90aWZpY2F0aW9uKSB7XG4gICAgLy8gVGhpcyBub3RpZmljYXRpb24gYXMgc3RpbGwgbW9yZSB0aGFuIG9uZSBjeWNsZSB0byBsaXZlXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICB0aGlzLl9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24pO1xuICAgIH0gZWxzZSB7IC8vIFRoaXMgbm90aWZpY2F0aW9uIHJlYWNoZWQgdGhlIGVuZCBvZiBpdHMgbGlmZSBjeWNsZVxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZW5kZXJUby5jb250YWlucyhub3RpZmljYXRpb24uZG9tKSkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG5vdGlmaWNhdGlvbi50aW1lb3V0SUQpO1xuICAgICAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSkgeyAvLyBGYWRlT3V0L0RpbSBkZXBlbmRpbmcgb24gc3RpY2t5IGJlaGF2aW9yXG4gICAgICAgICAgdGhpcy5fZGltKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2Uobm90aWZpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NsZWFyUmVxdWVzdENvdW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTWV0aG9kIHRoYXQgY2xlYXIgZXZlcnkgcGVuZGluZyByZXF1ZXN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50ICovXG4gIF9jbGVhclJlcXVlc3RDb3VudChub3RpZmljYXRpb24pIHtcbiAgICBub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID0gMTtcbiAgICBub3RpZmljYXRpb24uZG9tLnJlbW92ZUNoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5kb20uY291bnRlcjtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3Jlc2V0VGltZW91dFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVzZSB0aGlzIHRvIHJlc2V0IGEgbm90aWZpY2F0aW9uIGxpZmUgY3ljbGUsIGFuZCBkZWxheSBpdHMgY2xvc2UgZXZlbnRcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn18e2lkOiBudW1iZXIsIGRvbTogT2JqZWN0LCByZXF1ZXN0Q291bnQ6IG51bWJlciwgdGltZW91dElEOiBudW1iZXIsIHN0aWNreTogYm9vbGVhbiwgY2xvc2FibGU6IGJvb2xlYW59fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRCAqL1xuICBfcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbikge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobm90aWZpY2F0aW9uLnRpbWVvdXRJRCk7IC8vIENsZWFyIHByZXZpb3VzIGxpZmUgY3ljbGVcbiAgICBub3RpZmljYXRpb24udGltZW91dElEID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY2hlY2tDb3VudGVyKG5vdGlmaWNhdGlvbik7IC8vIENoZWNrIG5vdGlmaWNhdGlvbiByZXF1ZXN0IGNvdW50IHRvIGFjdCBhY2NvcmRpbmdseVxuICAgIH0sIG5vdGlmaWNhdGlvbi5kdXJhdGlvbik7IC8vIFVzZSBOb3RpZmljYXRpb24gbWFzdGVyIGR1cmF0aW9uXG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kaW1cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBPbmx5IHVzZWZ1bCBmb3Igc3RpY2t5IG5vdGlmaWNhdGlvbiB0aGF0IGRpbSBpbnN0ZWFkIG9mIGNsb3NlIGF0IHRoZSBlbmQgb2YgaXRzIGxpZmUgY3ljbGVcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlciwgcmVxdWVzdENvdW50OiBudW1iZXIsIGRvbTogT2JqZWN0LCB0aW1lb3V0SUQ6IG51bWJlciwgc3RpY2t5OiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSkgKi9cbiAgX2RpbShub3RpZmljYXRpb24pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaSA9IDEwMDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVPdXQoKSB7IC8vIFN0YXJ0IGFuaW1hdGlvbiBpbW1lZGlhdGx5XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgIC0taTtcblxuICAgICAgICBpZiAoaSA9PT0gNTAgJiYgbm90aWZpY2F0aW9uLnN0aWNreSkgeyAvLyBPcGFjaXR5IGhhcyByZWFjaGVkIDAuNTFcbiAgICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAwLjU7IC8vIFNldCBoYWxmIHRyYW5zcGFyZW5jeSBvbiBub3RpZmljYXRpb25cbiAgICAgICAgICBub3RpZmljYXRpb24uaXNEaW1tZWQgPSB0cnVlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGhhbGZGYWRlT3V0LCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfdW5EaW1cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYWxsIHRoaXMgbWV0aG9kIHdoZW4gYSBub3RpZmljYXRpb24gaXMgbm90IGluYWN0aXZlIGFueW1vcmVcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNEaW1tZWQgLSBOb3RpZmljYXRpb24gZGltbWVkIHN0YXR1cyAob25seSB1c2VmdWwgaWYgbm90aWZpY2F0aW9uLnN0aWNreSBpcyB0cnVlKSAqL1xuICBfdW5EaW0obm90aWZpY2F0aW9uKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGkgPSA1MDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVJbigpIHtcbiAgICAgIGlmIChpIDwgMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgICsraTtcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7IC8vIFNldCBmdWxsIHZpc2liaWxpdHkgb24gbm90aWZpY2F0aW9uXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pc0RpbW1lZCA9IGZhbHNlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgdGhhdC5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7IC8vIFJlc2V0IGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChoYWxmRmFkZUluLCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgU0lOR0xFIE5PVElGSUNBVElPTiBDT05TVFJVQ1RJT04gVVRJTFMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIGZvbGxvd2luZyBtZXRob2RzIG9ubHkgY29uY2VybnMgYSBuZXcgbm90aWZpY2F0aW9uIHJlcXVlc3QuIEl0IHdpbGwgdGVzdCB0aGUgb3B0aW9ucyB2YWxpZGl0eSwgZGVmYXVsdCB0byAgICovXG4gIC8qICBmYWxsYmFjayB2YWx1ZSBpZiBuZWNlc3NhcnkgYW5kIGdpdmUgdGhlIG5vdGlmaWNhdGlvbiBhIHBzZXVkbyB1bmlxdWUgaWRlbnRpZmllci4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NoZWNrTm90aWZpY2F0aW9uT3B0aW9uc1ZhbGlkaXR5XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQHN1bW1hcnkgQ2hlY2sgdGhlIE5vdGlmaWNhdGlvbiBvcHRpb25zIHZhbGlkaXR5XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBNYXJjaCAyMDE5XG4gICAqIEBkZXNjcmlwdGlvbiBDaGVjayBhIE5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCBhZ2FpbnN0IHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyB0byBjaGVjayB2YWxpZGl0eSAqL1xuICBfY2hlY2tOb3RpZmljYXRpb25PcHRpb25zVmFsaWRpdHkob3B0aW9ucykge1xuICAgIC8vIENoZWNrIGZvciBtYW5kYXRvcnkgYXJndW1lbnRzIGV4aXN0ZW5jZVxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgKG9wdGlvbnMudHlwZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMubWVzc2FnZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBleGlzdGluZyBtZXNzYWdlXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1lc3NhZ2UgIT09ICdzdHJpbmcnIHx8IG9wdGlvbnMubWVzc2FnZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgZm9yIHVuY2xvc2FibGUgYXQgYWxsIG5vdGlmaWNhdGlvblxuICAgIGlmIChvcHRpb25zLnN0aWNreSAmJiBvcHRpb25zLmNsb3NhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUZXN0IE5vdGlmaWNhdGlvbiBpbm5lciB2YXJpYWJsZXMgdmFsaWRpdHlcbiAgICBpZiAob3B0aW9ucy50eXBlICE9PSAnaW5mbycgJiYgb3B0aW9ucy50eXBlICE9PSAnc3VjY2VzcycgJiYgb3B0aW9ucy50eXBlICE9PSAnd2FybmluZycgJiYgb3B0aW9ucy50eXBlICE9PSAnZXJyb3InKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi50eXBlO1xuICAgIH1cbiAgICAvLyBVbmxvY2sgZGlzbWlzc0FsbExvY2tcbiAgICBpZiAodGhpcy5fZGlzbWlzc0FsbExvY2spIHtcbiAgICAgIHRoaXMuX2Rpc21pc3NBbGxMb2NrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRPcHRpb25zRmFsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAc3VtbWFyeSBTZXQgTm90aWZpY2F0aW9uIGZhbGxiYWNrIG9wdGlvbnNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE1hcmNoIDIwMTlcbiAgICogQGRlc2NyaXB0aW9uIENoZWNrIGEgTm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0IGFuZCBmaWxsIGl0IHdpdGggZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZXkgYXJlIGVtcHR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyB0byBmaWxsIHdpdGggZGVmYXVsdCB2YWx1ZSBpZiBlbXB0eSAqL1xuICBfc2V0T3B0aW9uc0ZhbGxiYWNrKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy50aXRsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRpdGxlID0gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24udGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmljb25sZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuaWNvbmxlc3MgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5pY29ubGVzcztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRoaWNrQm9yZGVyID0gdGhpcy5fdGhpY2tCb3JkZXI7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2xvc2FibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5jbG9zYWJsZSA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLmNsb3NhYmxlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0aWNreSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnN0aWNreT0gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24uc3RpY2t5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlbmRlclRvID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMucmVuZGVyVG8gPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5yZW5kZXJUbztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5DQnRpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuQ0J0aXRsZSA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLkNCdGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLmNhbGxiYWNrO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlzRGltbWVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuaXNEaW1tZWQgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5pc0RpbW1lZDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pZEdlbmVyYXRvclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IEdlbmVyYXRlIGFuIElEXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhc2ggdGhlIHNlZWQgdG8gZ2VuZXJhdGUgYW4gSURcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlZWQgLSBUaGUgc2VlZCBzdHJpbmcgdG8gaGFzaFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIGxlbmd0aCBvZiB0aGUgcmV0dXJuZWQgSUQgKi9cbiAgX2lkR2VuZXJhdG9yKHNlZWQsIGxlbmd0aCkge1xuICAgIC8qIE9yaWdpbmFsIGNvZGUgZnJvbTpcbiAgICAgKiBodHRwOi8vd2VyeGx0ZC5jb20vd3AvMjAxMC8wNS8xMy9qYXZhc2NyaXB0LWltcGxlbWVudGF0aW9uLW9mLWphdmFzLXN0cmluZy1oYXNoY29kZS1tZXRob2QvXG4gICAgICogVHdlYWtlZCB0byBmaXQgTm90aWZpY2F0aW9uIGNsYXNzIG5lZWRzXG4gICAgICovXG4gICAgbGV0IGhhc2ggPSAwO1xuICAgIGxldCBjaGFyYWN0ZXIgPSAnJztcblxuICAgIGlmIChzZWVkLmxlbmd0aCA9PT0gMCB8fCBsZW5ndGggPiAxMikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZWQubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNoYXJhY3RlciA9IHNlZWQuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXJhY3RlcjtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuXG4gICAgcmV0dXJuIChNYXRoLmFicyhoYXNoKS50b1N0cmluZygzNikgKyAnJyArIE1hdGguYWJzKGhhc2ggLyAyKS50b1N0cmluZygzNikuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSkuc3Vic3RyaW5nKDAsIGxlbmd0aCkudG9VcHBlckNhc2UoKTsgLy8gSGVyZSBpcyB0aGUgdHdla2VhZCBsaW5lXG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBOT1RJRklDQVRJT04gUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHRoZSBleHBvc2VkIEFQSSBvZiB0aGUgTm90aWZpY2F0aW9uIGNvbXBvbmVudC4gSXQgYWxsb3cgdG8gcmFpc2Ugc3RhbmRhcmQgb3IgY3VzdG9tICAgKi9cbiAgLyogIG5vdGlmaWNhdGlvbiB3aXRob3V0IGJvdGhlcmluZyB0aGVpciBsaWZlY3ljbGUsIHBvc2l0aW9uIG9yIG90aGVyIEphdmFTY3JpcHQgZXhwZW5zaXZlIGltcGxlbWVudGF0aW9uLiAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBuZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgbm90aWZpY2F0aW9uIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gb3B0aW9ucywgdGhlbiBhcHBlbmQgaXQgdG8gbm90aWZpY2F0aW9uIGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSA8aT5FcnJvcjsgV2FybmluZzsgSW5mbzsgU3VjY2Vzczs8L2k+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aXRsZT1vcHRpb25zLnR5cGVdIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lc3NhZ2UgLSBOb3RpZmljYXRpb24gbWVzc2FnZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249aGFuZGxlcl0gLSBOb3RpZmljYXRpb24gZHVyYXRpb24gKG92ZXJyaWRlIGhhbmRsZXIgZHVyYXRpb24gdmFsdWUpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaWNvbmxlc3M9ZmFsc2VdIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aGlja0JvcmRlcj1oYW5kbGVyXSAtIE5vdGlmaWNhdGlvbiBib3JkZXIgc2lkZSAob3ZlcnJpZGUgaGFuZGxlciBzaWRlIHZhbHVlKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNsb3NhYmxlPXRydWVdIC0gTWFrZSBub3RpZmljYXRpb24gY2xvc2FibGUgZmxhZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnN0aWNreT1mYWxzZV0gLSBNYWtlIG5vdGlmaWNhdGlvbiBzdGlja3kgZmxhZ1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucmVuZGVyVG89aGFuZGxlcl0gLSBEb20gb2JqZWN0IHRvIHJlbmRlciB0aGUgbm90aWZpY2F0aW9uIGluXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5DQnRpdGxlPUNhbGxiYWNrXSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFjaz11bmRlZmluZWRdIC0gTm90aWZpY2F0aW9uIGNhbGxiYWNrIGJ1dHRvblxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSUQgKi9cbiAgbmV3KG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tOb3RpZmljYXRpb25PcHRpb25zVmFsaWRpdHkob3B0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdOb3RpZmljYXRpb24uanMgOiBuZXcoKSBvcHRpb25zIGFyZ3VtZW50IG9iamVjdCBpcyBpbnZhbGlkLicpO1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHRoaXMuX3NldE9wdGlvbnNGYWxsYmFjayhvcHRpb25zKTtcbiAgICAvLyBCdWlsZCBub3RpZmljYXRpb24gRE9NIGVsZW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zXG4gICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuX2J1aWxkVUkoe1xuICAgICAgaWQ6IHRoaXMuX2lkR2VuZXJhdG9yKGAke29wdGlvbnMudHlwZX0ke29wdGlvbnMubWVzc2FnZX1gLCA1KSwgLy8gR2VuZXJhdGluZyBhbiBJRCBvZiA1IGNoYXJhY3RlcnMgbG9uZyBmcm9tIG5vdGlmaWNhdGlvbiBtYW5kYXRvcnkgZmllbGRzXG4gICAgICB0eXBlOiBvcHRpb25zLnR5cGUsXG4gICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICB0aXRsZTogb3B0aW9ucy50aXRsZSxcbiAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICAgICAgaWNvbmxlc3M6IG9wdGlvbnMuaWNvbmxlc3MsXG4gICAgICB0aGlja0JvcmRlcjogb3B0aW9ucy50aGlja0JvcmRlcixcbiAgICAgIGNsb3NhYmxlOiBvcHRpb25zLmNsb3NhYmxlLFxuICAgICAgc3RpY2t5OiBvcHRpb25zLnN0aWNreSxcbiAgICAgIHJlbmRlclRvOiBvcHRpb25zLnJlbmRlclRvLFxuICAgICAgQ0J0aXRsZTogb3B0aW9ucy5DQnRpdGxlLFxuICAgICAgY2FsbGJhY2s6IG9wdGlvbnMuY2FsbGJhY2ssXG4gICAgICBpc0RpbW1lZDogb3B0aW9ucy5pc0RpbW1lZCAvLyBPbmx5IHVzZWZ1bCBpZiBzdGlja3kgaXMgc2V0IHRvIHRydWVcbiAgICB9KTtcbiAgICAvLyBDcmVhdGUgYSBuZXcgbm90aWZpY2F0aW9uIGluIHRoZSBjb250YWluZXI6IE5vIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBzYW1lIElEIGlzIGFscmVhZHkgb3BlblxuICAgIGlmICghdGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0pIHtcbiAgICAgIHRoaXMuX3N0YXJ0KG5vdGlmaWNhdGlvbik7XG4gICAgfSBlbHNlIHsgLy8gVXNlIGV4aXN0aW5nIG5vdGlmaWNhdGlvbjogaW5jcmVtZW50IHJlcXVlc3QgY291bnQgYW5kIHJlc2V0IHRpbWVvdXRcbiAgICAgIHRoaXMuX3Jlc2V0VGltZW91dCh0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSk7XG4gICAgICB0aGlzLl9pbmNyZW1lbnRSZXF1ZXN0Q291bnRlcih0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSk7XG4gICAgICBub3RpZmljYXRpb24gPSB0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXTsgLy8gQ2xlYXIgbG9jYWwgbmV3IG5vdGlmaWNhdGlvbiBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGlzLl9hY3RpdmVcbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWZpY2F0aW9uLmlkO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBpbmZvXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhbiBpbmZvIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIGluZm8ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSAnaW5mbyc7XG4gICAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdGlmaWNhdGlvbi5qcyA6IE5vIGFyZ3VtZW50cyBwcm92aWRlZCBmb3IgaW5mbygpIG1ldGhvZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgc3VjY2Vzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYSBzdWNjZXNzIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIHN1Y2Nlc3Mob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSAnc3VjY2Vzcyc7XG4gICAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdGlmaWNhdGlvbi5qcyA6IE5vIGFyZ3VtZW50cyBwcm92aWRlZCBmb3Igc3VjY2VzcygpIG1ldGhvZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgd2FybmluZ1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYSB3YXJuaW5nIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIHdhcm5pbmcob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSAnd2FybmluZyc7XG4gICAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdGlmaWNhdGlvbi5qcyA6IE5vIGFyZ3VtZW50cyBwcm92aWRlZCBmb3Igd2FybmluZygpIG1ldGhvZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZXJyb3JcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGFuIGVycm9yIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIGVycm9yKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgb3B0aW9ucy50eXBlID0gJ2Vycm9yJztcbiAgICAgIHJldHVybiB0aGlzLm5ldyhvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignTm90aWZpY2F0aW9uLmpzIDogTm8gYXJndW1lbnRzIHByb3ZpZGVkIGZvciBlcnJvcigpIG1ldGhvZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGlzbWlzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRGlzbWlzcyBhIHNwZWNpZmljIG5vdGlmaWNhdGlvbiB2aWEgaXRzIElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBub3RpZmljYXRpb24gSUQgdG8gZGlzbWlzcyAqL1xuICBkaXNtaXNzKGlkKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9hY3RpdmVbaWRdLnRpbWVvdXRJRCk7IC8vIENsZWFyIG5vdGlmaWNhdGlvbiB0aW1lb3V0XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlW2lkXS5yZXF1ZXN0Q291bnQgPiAxKSB7IC8vIFNldmVyYWwgcmVxdWVzdCBhcmUgcGVuZGluZ1xuICAgICAgdGhpcy5fY2xlYXJSZXF1ZXN0Q291bnQodGhpcy5fYWN0aXZlW2lkXSk7IC8vIENsZWFyIGFsbCBwZW5kaW5nIHJlcXVlc3RcbiAgICB9XG5cbiAgICB0aGlzLl9jbG9zZSh0aGlzLl9hY3RpdmVbaWRdKTsgLy8gQ2xvc2Ugbm90aWZpY2F0aW9uXG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRpc21pc3NBbGxcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENsZWFyIHRoZSBub3RpZmljYXRpb24gaGFuZGxlciBmcm9tIGFsbCBpdHMgYWN0aXZlIG5vdGlmaWNhdGlvbnMgKi9cbiAgZGlzbWlzc0FsbCgpIHtcbiAgICBpZiAoIXRoaXMuX2Rpc21pc3NBbGxMb2NrICYmIE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoICE9PSAwKSB7IC8vIENoZWNrIHRoYXQgX2RpbWlzc0FsbExvY2sgaXMgZGlzYWJsZSBhbmQgdGhhdCB0aGVyZSBpcyBzdGlsbCBub3RpZmljYXRpb24gZGlzcGxheWVkXG4gICAgICB0aGlzLl9kaXNtaXNzQWxsTG9jayA9IHRydWU7IC8vIGRpc21pc3NBbGxMb2NrIHdpbGwgYmUgdW5sb2NrZWQgYXQgdGhlIGxhc3QgX2Nsb3NlKCkgbWV0aG9kIGNhbGxcbiAgICAgIHRoaXMuX3F1ZXVlID0ge307IC8vIENsZWFyIHF1ZXVlIG9iamVjdFxuXG4gICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuX2FjdGl2ZSkgeyAvLyBJdGVyYXRlIG92ZXIgbm90aWZpY2F0aW9uc1xuICAgICAgICB0aGlzLmRpc21pc3MoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGlzbWlzc1R5cGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIERpc21pc3MgYWxsIG5vdGlmaWNhdGlvbnMgZnJvbSBhIGdpdmVuIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSA8aT5zdWNjZXM7IGluZm87IHdhcm5pbmc7IGVycm9yOzwvaT4gKi9cbiAgZGlzbWlzc1R5cGUodHlwZSkge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9hY3RpdmUpLmxlbmd0aCAhPT0gMCkgeyAvLyBDaGVjayB0aGF0IF9kaXNtaXNzQWxsTG9jayBpcyBkaXNhYmxlIGFuZCB0aGF0IHRoZXJlIGlzIHN0aWxsIG5vdGlmaWNhdGlvbiBkaXNwbGF5ZWRcbiAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5fYWN0aXZlKSB7IC8vIEl0ZXJhdGUgb3ZlciBub3RpZmljYXRpb25zXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVbaWRdLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICB0aGlzLmRpc21pc3MoaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5jbGFzcyBVdGlscyB7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJZiBhbiBpbnN0YW5jZSBvZiBVdGlscyBhbHJlYWR5IGV4aXN0cywgd2UganVzdCByZXR1cm4gaXRcbiAgICBpZiAoISFVdGlscy5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFV0aWxzLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyBTZXQgb2JqZWN0IGluc3RhbmNlXG4gICAgVXRpbHMuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIHBhcnNlSFRNTEZyYWdtZW50KGh0bWxTdHJpbmcpIHtcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgY29uc3QgZG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sU3RyaW5nLCAndGV4dC9odG1sJyk7XG4gICAgcmV0dXJuIGRvbS5ib2R5LmZpcnN0Q2hpbGQ7XG4gIH1cblxuXG4gIHJlbW92ZUFsbE9iamVjdEtleXMob2JqZWN0KSB7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgfSk7XG4gIH1cblxuXG4gIGFwcGVuZExpbmtJbkhlYWQocGF0aCkge1xuICAgIC8qIFNlYXJjaCBmb3IgZXhpc3RpbmcgbGluayB3aXRoIHNhbWUgcGF0aCAqL1xuICAgIGxldCBhbHJlYWR5RXhpc3RzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9MDsgaSA8IGRvY3VtZW50LmhlYWQuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5oZWFkLmNoaWxkcmVuW2ldO1xuICAgICAgaWYgKG1ldGEubm9kZU5hbWUgPT09ICdMSU5LJyAmJiBtZXRhLmhyZWYgPT09IGAke3dpbmRvdy5sb2NhdGlvbn0ke3BhdGh9YCkge1xuICAgICAgICBhbHJlYWR5RXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIE9ubHkgYXBwZW5kIHN0eWxlIGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIGRvY3VtZW50IGhlYWRlciAqL1xuICAgIGlmICghYWxyZWFkeUV4aXN0cykge1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0xJTksnKTtcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgbGluay5ocmVmID0gcGF0aDtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuIiwiZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZSh7XG4gIC8qIFRoZSBIVFRQIGNhbGwgd29ya2VkIHByb3Blcmx5LiAqL1xuICBPSzogMjAwLFxuICAvKiBUaGUgdXJsIHdhc24ndCBmb3VuZC4gKi9cbiAgTk9UX0ZPVU5EOiA0MDQsXG4gIC8qIFRoZSB1cmwgY2Fubm90IGJlIGFjY2Vzc2VkLiAqL1xuICBGT1JCSURERU46IDQwMyxcbiAgLyogVGhlIHNlcnZlciBlbmNvdW50ZXJlZCBhIHByb2JsZW0uICovXG4gIElOVEVSTkFMX0VSUk9SOiA1MDBcbn0pO1xuIiwiaW1wb3J0IEFzaWRlIGZyb20gJy4vY29tcG9uZW50L0FzaWRlJztcbmltcG9ydCBTY2VuZSBmcm9tICcuL2NvbXBvbmVudC9TY2VuZSc7XG4ndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgVXNlckludGVyZmFjZSB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPk1hbmFaZWFrIHVzZXIgaW50ZXJmYWNlIGNvbnRyb2xsZXI8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgY2xhc3MgaXMgbWFkZSB0byBoYW5kbGUgYWxsIGludGVyYWN0aW9ucyBiZXR3ZWVuIFVJIGFuZCBNemsgY29udHJvbGxlci4gSXQgaXMgaW5cbiAgICogY2hhcmdlIHRvIGxvYWQgdmlld3MgYW5kIHRvIGFwcGVuZCB0aGVtIGludG8gdGhlIERPTSwgYnV0IGFsc28gdG8gbWFrZSB0aGVtIGludGVyYWN0aXZlIHdpdGggdGhlIGFwcCBjb250ZXh0LjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBhc2lkZSBjb250cm9sbGVyICovXG4gICAgdGhpcy5fYXNpZGUgPSBuZXcgQXNpZGUoKTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIHNjZW5lIGNvbnRyb2xsZXIgKi9cbiAgICB0aGlzLl9zY2VuZSA9IG5ldyBTY2VuZSgpO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgRE9NIGxvYWRpbmcgb3ZlcmxheSB0byB1c2UgaW4gdHJhbnNpdGlvbnMgKi9cbiAgICB0aGlzLl9sb2FkaW5nT3ZlcmxheSA9IG51bGw7XG4gICAgLy8gQnVpbGQgbG9hZGluZyBvdmVybGF5IGFuZCBhZGQgaXRzIHN0eWxlIGNsYXNzXG4gICAgdGhpcy5fbG9hZGluZ092ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXprLWxvYWRpbmctb3ZlcmxheScpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBWSUVXIE1BTklQVUxBVElPTiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgbWV0aG9kcyB3aWxsIHNldCB0aGUgc2luZ2xlIHBhZ2Ugd2l0aCBhIG5ldyB2aWV3LCB3aGlsZSBwcm9wZXJseSBjbGVhbmluZyB0aGUgcHJldmlvdXNseSB1c2VkIG9uZS4gICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFNjZW5lVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVc2VySW50ZXJmYWNlXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHRyeSB0byBidWlsZCBhIHZpZXcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zLiBJZiBvcHRpb25zIGFyZVxuICAgKiBpbnZhbGlkLCB0aGUgTWFpbiBQYWdlIHdpbGwgYmUgbG9hZGVkIGluc3RlYWQuIEl0IGhhbmRsZSB0aGUgdHJhbnNpdGlvbiB3aXRoIHByZXZpb3VzIHZpZXcgdG8gcHV0IGEgbG9hZGluZ1xuICAgKiBvdmVybGF5IHdoaWxlIGxvYWRpbmcgdGhlIG5ldyB2aWV3LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBidWlsZCB0aGUgdmlldyBmcm9tXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLm5hbWUgLSBUaGUgdmlldyBuYW1lLCBtdXN0IG1hdGNoIG9uZSBpbiB0aGUgVmlld0ZhY3RvcnkgY2xhc3NcbiAgICogQHJldHVybiB7cHJvbWlzZX0gLSBUaGUgYWN0aW9uIHByb21pc2UgKi9cbiAgc2V0U2NlbmVWaWV3KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zdGFydExvYWRpbmcoKVxuICAgICAgICAudGhlbih0aGlzLl9zY2VuZS5idWlsZFZpZXcuYmluZCh0aGlzLl9zY2VuZSwgb3B0aW9ucykpXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgIC5maW5hbGx5KHRoaXMuc3RvcExvYWRpbmcuYmluZCh0aGlzKSk7IC8vIENsZWFyIGxvYWRpbmcgb3ZlcmxheSB3aGF0ZXZlciBoYXBwZW5zXG4gICAgfSk7XG4gIH1cblxuXG4gIHNldE1vZGFsKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fc2NlbmUuYnVpbGRNb2RhbChvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZ2V0RnJhZ21lbnQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG16ay5rb20uZ2V0VGV4dCh1cmwpIC8vIFRoZSBsb2FkaW5nIG92ZXJsYXkgbXVzdCBiZSBoYW5kbGVkIGNhbGxlciwgc2luY2UgZnJhZ21lbnQgaXMgb25seSBhIHBhcnQgb2Ygdmlld3BvcnRcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHByb2Nlc3NMb2dGcm9tU2VydmVyKGVycm9ycykge1xuICAgIGlmIChlcnJvcnMgJiYgZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTE9BRElORyBPVkVSTEFZIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZXNlIG1ldGhvZHMgYWRkL3JlbW92ZSB0aGUgbG9hZGluZyBvdmVybGF5IG9uIHRvcCBvZiBlbGVtZW50cy4gSXQgaXMgbWVhbnQgdG8gYmUgdXNlZCB3aGVuIHN3aXRjaGluZyB2aWV3LiAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBzdGFydExvYWRpbmdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVXNlckludGVyZmFjZVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIHN0YXJ0IGxvYWRpbmcgbWV0aG9kIHdpbGwgYWRkIGFuIG92ZXJsYXkgb24gdGhlIHdob2xlIHBhZ2UgdGhhdCBoYXMgYSBjc3MgYW5pbWF0aW9uLjwvYmxvY2txdW90ZT5cbiAgICogQHJldHVybiB7cHJvbWlzZX0gLSBUaGUgYWN0aW9uIHByb21pc2UgKi9cbiAgc3RhcnRMb2FkaW5nKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fbG9hZGluZ092ZXJsYXkpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBzdGFydExvYWRpbmdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVXNlckludGVyZmFjZVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIHN0b3AgbG9hZGluZyBtZXRob2Qgd2lsbCByZW1vdmUgdGhlIG92ZXJsYXkgb24gdGhlIHBhZ2UuPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJuIHtwcm9taXNlfSAtIFRoZSBhY3Rpb24gcHJvbWlzZSAqL1xuICBzdG9wTG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2xvYWRpbmdPdmVybGF5KTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2VySW50ZXJmYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIEFzaWRlIHtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2hvbWVwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWVwYWdlLWJ1dHRvbicpO1xuICAgIHRoaXMuX21lbnVwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVwYWdlLWJ1dHRvbicpO1xuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIF9ldmVudHMoKSB7XG4gICAgLy8gVE9ETzogcHJvcGVyIGV2ZW50c1xuICAgIHRoaXMuX2hvbWVwYWdlQ2xpY2tlZCA9IHRoaXMuX2hvbWVwYWdlQ2xpY2tlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hvbWVwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faG9tZXBhZ2VDbGlja2VkKTtcblxuICAgIHRoaXMuX21lbnVwYWdlQ2xpY2tlZCA9IHRoaXMuX21lbnVwYWdlQ2xpY2tlZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21lbnVwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fbWVudXBhZ2VDbGlja2VkKTtcbiAgfVxuXG5cbiAgX2hvbWVwYWdlQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnTWFpblBhZ2UnXG4gICAgfSk7XG4gIH1cblxuXG4gIF9tZW51cGFnZUNsaWNrZWQoKSB7XG4gICAgbXprLnNldFZpZXcoe1xuICAgICAgbmFtZTogJ01lbnVQYWdlJ1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFzaWRlO1xuIiwiaW1wb3J0IFZpZXdGYWN0b3J5IGZyb20gJy4uL3NjZW5lL1ZpZXdGYWN0b3J5JztcbmltcG9ydCBNb2RhbEZhY3RvcnkgZnJvbSAnLi4vbW9kYWwvTW9kYWxGYWN0b3J5Jztcbid1c2Ugc3RyaWN0JztcblxuXG5jbGFzcyBTY2VuZSB7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zY2VuZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2VuZScpO1xuICAgIHRoaXMudmlldyA9IG51bGw7XG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XG4gIH1cblxuXG4gIGNsZWFyU2NlbmUoKSB7XG4gICAgaWYgKHRoaXMudmlldykge1xuICAgICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMudmlldyA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fc2NlbmUuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuXG4gIGJ1aWxkVmlldyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIEV2ZW50cy5zdWJzY3JpYmUoJ1NjZW5lVmlld1JlYWR5JywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9zY2VuZS5hcHBlbmQodGhpcy52aWV3LmRvbSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRydWUpO1xuXG4gICAgICB0aGlzLmNsZWFyU2NlbmUoKTtcbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3RmFjdG9yeShvcHRpb25zLm5hbWUsIG9wdGlvbnMpO1xuICAgICAgLy8gUmVzdG9yZSBtYWlucGFnZSBpZiB2aWV3IGRvZXNuJ3QgZXhpc3RzXG4gICAgICBpZiAodGhpcy52aWV3ID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3RmFjdG9yeSgnTWFpblBhZ2UnKTtcbiAgICAgICAgLy8gVE9ETyByYWlzZSB3YXJuaW5nXG4gICAgICB9XG4gICAgICAvLyBSZWplY3QgdmlldyBidWlsZCBpZiBpdCBleGNlZWQgNSBzZWNvbmRzXG4gICAgICBzZXRUaW1lb3V0KHJlamVjdCwgNTAwMCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGJ1aWxkTW9kYWwob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxGYWN0b3J5KG9wdGlvbnMubmFtZSwgb3B0aW9ucyk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmU7XG4iLCJpbXBvcnQgQWJvdXRNb2RhbCBmcm9tICcuL21lbnVwYWdlL0Fib3V0TW9kYWwuanMnO1xuaW1wb3J0IFdpc2hNb2RhbCBmcm9tICcuL21lbnVwYWdlL1dpc2hNb2RhbC5qcyc7XG5pbXBvcnQgQmFkZ2VNb2RhbCBmcm9tICcuL2FkbWlucGFnZS9CYWRnZU1vZGFsLmpzJztcblxuXG5jb25zdCBDbGFzc2VzID0ge1xuICBBYm91dE1vZGFsLFxuICBXaXNoTW9kYWwsXG4gIEJhZGdlTW9kYWxcbn07XG5cblxuY2xhc3MgTW9kYWxGYWN0b3J5IHtcblxuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgQ2xhc3Nlc1tgJHtuYW1lfU1vZGFsYF0ob3B0aW9ucyk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxGYWN0b3J5O1xuIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL01vZGFsLmpzJztcblxuXG5jbGFzcyBCYWRnZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgZm9ybSBzdWJtaXQgaW5wdXQgKi9cbiAgICB0aGlzLl9zdWJtaXRJbnB1dCA9IG51bGw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBldmVudCBJRCBmb3IgdGhlIHN1Ym1pdCBpbnB1dCBjbGlja2VkICovXG4gICAgdGhpcy5fc3VibWl0RXZ0SWQgPSAtMTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX3N1Ym1pdEV2dElkKTtcbiAgICBVdGlscy5yZW1vdmVBbGxPYmplY3RLZXlzKHRoaXMpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PREFMIElOU1RBTlRJQVRJT04gU0VRVUVOQ0UgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgX2ZpbGxBdHRyaWJ1dGVzKCkge1xuICAgIHRoaXMuX3N1Ym1pdElucHV0ID0gdGhpcy5fcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdC1iYWRnZS1idXR0b24nKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9zdWJtaXRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl9zdWJtaXRJbnB1dCwgdGhpcy5fc3VibWl0Q2xpY2tlZCwgdGhpcyk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBJTlRFUkFDVElPTlMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICBfc3VibWl0Q2xpY2tlZChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdzdWJtaXQgY2xpY2tlZCcpO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJhZGdlTW9kYWw7XG4iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvTW9kYWwuanMnO1xuXG5cbmNsYXNzIEFib3V0TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPldpc2ggbW9kYWw8L2gxPlxuICAgKiBAZXh0ZW5kcyBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtb2RhbCBpcyBtYWRlIHRvIGFsbG93IHRoZSB1c2VyIHRvIHNlbmQgYSB3aXNoICh1bmRlciB0aGUgZm9ybSBvZiBhIHN0cmluZykgdG8gdGhlXG4gICAqIGluc3RhbmNlIGFkbWluaXN0cmF0b3JzLiBUaGlzIHdpc2ggY2FuIGJlIHJldmlld2VkIGluIHRoZSBhZG1pbiBwYWdlLCBpbiB0aGUgd2lzaGVzIHNlY3Rpb25zLiBUaGlzIHdheSwgdXNlcnMgY2FuXG4gICAqIGxlYXZlIGEgZmVlZGJhY2sgb24gdGhlIGluc3RhbmNlLCBzdHJhaWdodCBmcm9tIHRoZWlyIGFjY291bnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBtb2RhbCBiYXNlIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudXJsIC0gVGhlIHVybCB0byBmZXRjaCB0aGUgd2lzaCBtb2RhbCB0ZW1wbGF0ZSBmcm9tICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBtb2RhbCBjbG9zZSBidXR0b24gKi9cbiAgICB0aGlzLl9mb290ZXJDbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBldmVudCBJRCBmb3IgdGhlIGNsb3NlIGJ1dHRvbiBjbGlja2VkICovXG4gICAgdGhpcy5fZm9vdGVyQ2xvc2VFdnRJZCA9IC0xO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEFib3V0TW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgZGVzdHJveSB0aGUgTW9kYWwgcGFyZW50IChzZWUgZG9jdW1lbnRhdGlvbikuPC9ibG9ja3F1b3RlPiAqKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2Zvb3RlckNsb3NlRXZ0SWQpO1xuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9EQUwgSU5TVEFOVElBVElPTiBTRVFVRU5DRSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZmlsbEF0dHJpYnV0ZXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEFib3V0TW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIGRvZXNuJ3QgZG8gYW55dGhpbmcsIHRoZSBhYm91dCBtb2RhbCBpcyBvbmx5IGZvciByZWFkaW5nLjwvYmxvY2txdW90ZT4gKiovXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICAvLyBUaGUgbW9kYWwgZG9lc24ndCBjb250YWluIGFueSBpbnRlcmFjdGlvbiB3aXRoIHVzZXIgaW5wdXRzXG4gICAgdGhpcy5fZm9vdGVyQ2xvc2VCdXR0b24gPSB0aGlzLl9yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtZm9vdGVyLWNsb3NlJyk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBsaXN0ZW4gdG8gYW55IGNsaWNrIG9uIHRoZSBzdWJtaXQgYnV0dG9uIHRvIHByb2Nlc3MgdGhlIHRleHRhcmVhXG4gICAqIGNvbnRlbnQgdG8gc2VuZCBpdCB0byB0aGUgYmFja2VuZCBpZiBuZWVkZWQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9mb290ZXJDbG9zZUV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2Zvb3RlckNsb3NlQnV0dG9uLCB0aGlzLmNsb3NlLCB0aGlzKTtcbiAgfVxuXG5cblxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBYm91dE1vZGFsO1xuIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL01vZGFsLmpzJztcblxuXG5jbGFzcyBXaXNoTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPldpc2ggbW9kYWw8L2gxPlxuICAgKiBAZXh0ZW5kcyBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtb2RhbCBpcyBtYWRlIHRvIGFsbG93IHRoZSB1c2VyIHRvIHNlbmQgYSB3aXNoICh1bmRlciB0aGUgZm9ybSBvZiBhIHN0cmluZykgdG8gdGhlXG4gICAqIGluc3RhbmNlIGFkbWluaXN0cmF0b3JzLiBUaGlzIHdpc2ggY2FuIGJlIHJldmlld2VkIGluIHRoZSBhZG1pbiBwYWdlLCBpbiB0aGUgd2lzaGVzIHNlY3Rpb25zLiBUaGlzIHdheSwgdXNlcnMgY2FuXG4gICAqIGxlYXZlIGEgZmVlZGJhY2sgb24gdGhlIGluc3RhbmNlLCBzdHJhaWdodCBmcm9tIHRoZWlyIGFjY291bnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBtb2RhbCBiYXNlIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudXJsIC0gVGhlIHVybCB0byBmZXRjaCB0aGUgd2lzaCBtb2RhbCB0ZW1wbGF0ZSBmcm9tICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBmb3JtIHN1Ym1pdCBpbnB1dCAqL1xuICAgIHRoaXMuX3N1Ym1pdElucHV0ID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGV2ZW50IElEIGZvciB0aGUgc3VibWl0IGlucHV0IGNsaWNrZWQgKi9cbiAgICB0aGlzLl9zdWJtaXRFdnRJZCA9IC0xO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IHRoZSBNb2RhbCBwYXJlbnQgKHNlZSBkb2N1bWVudGF0aW9uKSwgdGhlbiBjbGVhciB0aGUgc3VibWl0IGV2ZW50XG4gICAqIHN1YnNjcmlwdGlvbiwgYW5kIGZpbmFsbHkgd2lsbCBkZXN0cm95IGFsbCBwcm9wZXJ0aWVzIG9mIHRoaXMgY2xhc3MuIEl0J3MgdGhlbiBwcm9wZXJseSBkZXN0cm95ZWQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX3N1Ym1pdEV2dElkKTtcbiAgICBVdGlscy5yZW1vdmVBbGxPYmplY3RLZXlzKHRoaXMpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PREFMIElOU1RBTlRJQVRJT04gU0VRVUVOQ0UgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2ZpbGxBdHRyaWJ1dGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBXaXNoTW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgcmV0cmlldmUgdGhlIHN1Ym1pdCBidXR0b24gZnJvbSB0aGUgd2lzaCBtb2RhbCB0ZW1wbGF0ZS4gSXQgd2lsbCB0aGVuXG4gICAqIGNhbGwgdGhlIGV2ZW50IGJ1dHRvbiB0byBoYW5kbGUgdGhlIGludGVyYWN0aXZpdHkgd2l0aCB0aGlzIGJ1dHRvbi48L2Jsb2NrcXVvdGU+ICoqL1xuICBfZmlsbEF0dHJpYnV0ZXMoKSB7XG4gICAgdGhpcy5fc3VibWl0SW5wdXQgPSB0aGlzLl9yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXdpc2gtYnV0dG9uJyk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBsaXN0ZW4gdG8gYW55IGNsaWNrIG9uIHRoZSBzdWJtaXQgYnV0dG9uIHRvIHByb2Nlc3MgdGhlIHRleHRhcmVhXG4gICAqIGNvbnRlbnQgdG8gc2VuZCBpdCB0byB0aGUgYmFja2VuZCBpZiBuZWVkZWQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9zdWJtaXRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl9zdWJtaXRJbnB1dCwgdGhpcy5fc3VibWl0Q2xpY2tlZCwgdGhpcyk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBJTlRFUkFDVElPTlMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3VibWl0Q2xpY2tlZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAYXN5bmNcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgaXMgdGhlIHN1Ym1pdCBidXR0b24gY2FsbGJhY2suIElmIHRoZSB0ZXh0YXJlYSBjb250ZW50IGlzIGVtcHR5LCB0aGUgc2VydmVyXG4gICAqIHJlc3BvbnNlIHRvIHRoZSBwb3N0IGNhbGwgd2lsbCBiZSB0aGUgd2lzaCBtb2RhbCBIVE1MIHRlbXBsYXRlLCBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLiBUaGlzIGNhbGxiYWNrXG4gICAqIHdpbGwgcmVmcmVzaCB0aGUgaW50ZXJmYWNlIHRvIGRpc3BsYXkgdGhpcyBlcnJvciBtZXNzYWdlLiBPdGhlcndpc2UsIGlmIHRoZSB0ZXh0YXJlYSBpc24ndCBlbXB0eSwgdGhlIHNlcnZlciB3aWxsXG4gICAqIHJlc3BvbmQgd2l0aCBhIEpTT04gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHN1Y2Nlc3MgaW5mb3JtYXRpb24sIHRvIGJlIGRpc3BsYXllZCBhcyBhIG5vdGlmaWNhdGlvbi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBjbGljayBldmVudCAob24gc3VibWl0IGJ1dHRvbikgKiovXG4gIF9zdWJtaXRDbGlja2VkKGV2ZW50KSB7XG4gICAgLy8gQXZvaWQgZm9ybSBzdWJtaXQgZGVmYXVsdCBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gQ2FsbGluZyB0aGUgbW9kYWwgdXJsIGluIHBvc3QgYWxsb3cgaXRzIHJlc29sdXRpb25cbiAgICBtemsua29tLnBvc3RGb3JtKHRoaXMuX3VybCwge1xuICAgICAgY29udGVudDogdGhpcy5fcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3dpc2gtY29udGVudCcpLnZhbHVlXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBMb2dnZXIucmFpc2UocmVzcG9uc2UpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIC8vIFBhcnNlIG5ldyBtb2RhbCBjb250ZW50IGFzIERPTSBvYmplY3RcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gVXRpbHMucGFyc2VIVE1MRnJhZ21lbnQocmVzcG9uc2UpO1xuICAgICAgLy8gQ2xlYXIgb3ZlcmxheSBjb250ZW50XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuaW5uZXJIVE1MID0gJyc7XG4gICAgICAvLyBSZXN0b3JlIG5ldyBtb2RhbCBjb250ZW50XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuYXBwZW5kQ2hpbGQodGhpcy5fcm9vdEVsZW1lbnQpO1xuICAgICAgLy8gQXZvaWQgZXZlbnQgc3RhY2tpbmdcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9zdWJtaXRFdnRJZCk7XG4gICAgICAvLyBSZXNldCBzdWJtaXQgZXZlbnQgaWRcbiAgICAgIHRoaXMuX3N1Ym1pdEV2dElkID0gLTE7XG4gICAgICAvLyBSZS1zYXZlIGludGVybmFscyB3aXRoIG5ldyB0ZW1wbGF0ZVxuICAgICAgdGhpcy5fZmlsbEF0dHJpYnV0ZXMoKTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBXaXNoTW9kYWw7XG4iLCJjbGFzcyBNb2RhbCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPk16ayBNb2RhbCBiYXNlIGNvbXBvbmVudDwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1vZGFsIGNvbXBvbmVudCBpcyBtZWFudCB0byBiZSBleHRlbmRlZC4gSXQgcHJvdmlkZXMgYSBiYXNlIHRvIGJ1aWxkIGEgbW9kYWwsIHVzaW5nXG4gICAqIGFuIEhUTUwgdGVtcGxhdGUgZnJvbSBhbiBleGlzdGluZyBiYWNrZW5kIHVybC4gSXQgaGFuZGxlcyB0aGUgbG9hZGluZyBhbmQgYnVpbGRpbmcgb2YgdGhlIEhUTUwgdGVtcGxhdGUuIEl0IGFsc29cbiAgICogZXhwb3NlcyBhbiBvcGVuIGFuZCBhIGNsb3NlIG1ldGhvZC4gRmluYWxseSwgaXQgYWxsb3dzIHRoZSB1c2VyIHRvIGNsaWNrIG9uIHRoZSBtb2RhbCBvdmVybGF5LCBvciBvbiB0aGUgY2xvc2UgaWNvblxuICAgKiB0byBjbG9zZSB0aGUgbW9kYWwuIFRoZSBkZXZlbG9wZXIgbXVzdCBvdmVycmlkZSA8Y29kZT5kZXN0cm95KCk8L2NvZGU+IGFuZCA8Y29kZT5fZmlsbEF0dHJpYnV0ZXMoKTwvY29kZT4gbWV0aG9kc1xuICAgKiB0byBmdWxseSBjb3ZlciB0aGUgbW9kYWwgbGlmZWN5Y2xlIChzZWUgZWFjaCBvZiB0aGVzZSBtZXRob2RzIGRvY3VtZW50YXRpb24pLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbW9kYWwgYmFzZSBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnVybCAtIFRoZSB1cmwgdG8gZmV0Y2ggdGhlIG1vZGFsIHRlbXBsYXRlIGZyb20gKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gVGhlIEhUTUwgdGVtcGxhdGUgdXJsIHRvIGZldGNoICovXG4gICAgdGhpcy5fdXJsID0gb3B0aW9ucy51cmw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSB0ZW1wbGF0ZSByb290IERPTSBlbGVtZW50ICovXG4gICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgb3ZlcmxheSB0aGF0IGNvbnRhaW5zIHRoZSBtb2RhbCwgZnVsbCB2aWV3cG9ydCBzaXplIGFuZCBjbG9zZSBtb2RhbCBvbiBjbGljayAqL1xuICAgIHRoaXMuX21vZGFsT3ZlcmxheSA9IG51bGw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBldmVudCBJRCBmb3IgdGhlIG92ZXJsYXkgY2xpY2tlZCAqL1xuICAgIHRoaXMuX292ZXJsYXlDbGlja2VkRXZ0SWQgPSAtMTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIGNsb3NlIGJ1dHRvbiwgaW4gdGhlIG1vZGFsIGhlYWRlciAqL1xuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGV2ZW50IElEIGZvciB0aGUgY2xvc2UgYnV0dG9uIGNsaWNrZWQgKi9cbiAgICB0aGlzLl9jbG9zZUNsaWNrZWRFdnRJZCA9IC0xO1xuICAgIC8vIE1vZGFsIGJ1aWxkaW5nIHNlcXVlbmNlOlxuICAgIC8vIC0gZ2V0IEhUTUwgdGVtcGxhdGUgZnJvbSBzZXJ2ZXI7XG4gICAgLy8gLSBwYXJzZSB0ZW1wbGF0ZSByZXNwb25zZSB0byBiZWNvbWUgRE9NIG9iamVjdDtcbiAgICAvLyAtIGFwcGVuZCBET00gZWxlbWVudCB0byBnbG9iYWwgb3ZlcmxheTtcbiAgICAvLyAtIG9wZW4gbW9kYWwgYnkgYWRkaW5nIG92ZXJsYXkgdG8gdGhlIGJvZHk7XG4gICAgLy8gLSBsZXQgY2hpbGQgY2xhc3MgZmlsbCBhdHRyaWJ1dGVzIGFuZCByZWdpc3RlciBpdHMgZXZlbnRzLlxuICAgIHRoaXMuX2xvYWRUZW1wbGF0ZSgpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCBtdXN0IGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3MuIEl0IG9ubHkgZGVzdHJveXMgdGhlIDxjb2RlPk1vZGFsLmpzPC9jb2RlPlxuICAgKiBwcm9wZXJ0aWVzIGFuZCBjbG9zZSBldmVudCBzdWJzY3JpcHRpb24uIFRoZSBkZXZlbG9wZXIgbXVzdCByZW1vdmUgaXRzIGFic3RyYWN0ZWQgcHJvcGVydGllcyBhbmQgZXZlbnRzIGFmdGVyXG4gICAqIGNhbGxpbmcgdGhpcyBtZXRob2QsIHRvIG1ha2UgdGhlIGRlc3RydWN0aW9uIHByb2Nlc3MgY29tcGxldGUuPC9ibG9ja3F1b3RlPiAqKi9cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBNdXN0IGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3MgdG8gY2xlYW4gZXh0ZW5zaW9uIHByb3BlcnRpZXMgYW5kIGV2ZW50c1xuICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9vdmVybGF5Q2xpY2tlZEV2dElkKTsgLy8gTWlnaHQgZG8gbm90aGluZywgYXMgZXZlbnQgaXMgcmVtb3ZlZCBpbiBjbG9zZSBtZXRob2RcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fY2xvc2VDbGlja2VkRXZ0SWQpOyAvLyBTYW1lIGZvciB0aGlzIGV2ZW50XG4gICAgZGVsZXRlIHRoaXMuX3VybDtcbiAgICBkZWxldGUgdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgZGVsZXRlIHRoaXMuX21vZGFsT3ZlcmxheTtcbiAgICBkZWxldGUgdGhpcy5fb3ZlcmxheUNsaWNrZWRFdnRJZDtcbiAgICBkZWxldGUgdGhpcy5fY2xvc2VCdXR0b247XG4gICAgZGVsZXRlIHRoaXMuX2Nsb3NlQ2xpY2tlZEV2dElkO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PREFMIElOU1RBTlRJQVRJT04gU0VRVUVOQ0UgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2xvYWRUZW1wbGF0ZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAYXN5bmNcbiAgICogQG1lbWJlcm9mIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBtb2RhbCBvdmVybGF5LCBmZXRjaCB0aGUgSFRNTCB0ZW1wbGF0ZSB1c2luZyB0aGUgPGNvZGU+S29tLmpzXG4gICAqIDwvY29kZT4gY29tcG9uZW50LCBpdCB0aGVuIGJ1aWxkIHRoZSBtb2RhbCBET00sIGFwcGVuZCBpdCB0byB0aGUgb3ZlcmxheSwgb3BlbiB0aGUgbW9kYWwgYW5kIGNhbGwgPGNvZGU+XG4gICAqIF9maWxsQXR0cmlidXRlcygpPC9jb2RlPiB0aGF0IG11c3QgYmUgb3ZlcnJpZGRlbiBpbiB0aGUgY2hpbGQgY2xhc3MuIEl0IGlzIGFzeW5jaHJvbm91cyBiZWNhdXNlIG9mIHRoZSBmZXRjaCBjYWxsLFxuICAgKiBzbyB0aGUgY2hpbGQgY2xhc3MgY29uc3RydWN0b3IgY2FuIGJlIGZ1bGx5IGV4ZWN1dGVkLjwvYmxvY2txdW90ZT4gKiovXG4gIF9sb2FkVGVtcGxhdGUoKSB7XG4gICAgbXprLmtvbS5nZXRUZXh0KHRoaXMuX3VybCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICB0aGlzLl9yb290RWxlbWVudCA9IFV0aWxzLnBhcnNlSFRNTEZyYWdtZW50KHJlc3BvbnNlKTtcbiAgICAgIC8vIENyZWF0ZSBvdmVybGF5IG1vZGFsIGNvbnRhaW5lclxuICAgICAgdGhpcy5fbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuY2xhc3NOYW1lID0gJ2xvYWRpbmctb3ZlcmxheSc7XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuYXBwZW5kQ2hpbGQodGhpcy5fcm9vdEVsZW1lbnQpO1xuICAgICAgLy8gR2V0IGNsb3NlIGJ1dHRvbiBmcm9tIHRlbXBsYXRlXG4gICAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3Jvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1jbG9zZScpO1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB0aGlzLl9maWxsQXR0cmlidXRlcygpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZmlsbEF0dHJpYnV0ZXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCBkb2Vzbid0IGltcGxlbWVudCBhbnl0aGluZy4gSXQgbXVzdCBiZSBvdmVycmlkZGVuIGluIGNoaWxkIGNsYXNzLCB0byB1c2UgdGhlXG4gICAqIHRlbXBsYXRlIERPTSBlbGVtZW50cyB0byBidWlsZCBpdHMgaW50ZXJhY3Rpb25zLiBJdCBpcyBjYWxsZWQgb25jZSB0aGUgdGVtcGxhdGUgaXMgc3VjY2Vzc2Z1bGx5IGZldGNoZWQgZnJvbSB0aGVcbiAgICogc2VydmVyLjwvYmxvY2txdW90ZT4gKiovXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICAvLyBNdXN0IGJlIG92ZXJyaWRkZW4gaW4gY2hpbGQgY2xhc3MgdG8gYnVpbGQgbW9kYWwgd2l0aCBIVE1MIHRlbXBsYXRlIGF0dHJpYnV0ZXNcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBWSVNJQklMSVRZIE1BTklQVUxBVElPTiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIG9wZW5cbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgb3BlbiB0aGUgbW9kYWwsIGJ5IGFkZGluZyB0aGUgbW9kYWwgb3ZlcmxheSB0byB0aGUgZG9jdW1lbnQgYm9keS4gSXQgd2lsbFxuICAgKiBhbHNvIHJlZ2lzdGVyIGEgc3Vic2NyaXB0aW9uIGZvciBhIHVzZXIgY2xpY2sgZXZlbnQgb24gdGhlIG1vZGFsIG92ZXJsYXkgb3Igb24gdGhlIGNsb3NlIGljb24uPC9ibG9ja3F1b3RlPiAqKi9cbiAgb3BlbigpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX21vZGFsT3ZlcmxheSk7XG4gICAgdGhpcy5fb3ZlcmxheUNsaWNrZWRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl9tb2RhbE92ZXJsYXksIHRoaXMuY2xvc2UsIHRoaXMpO1xuICAgIHRoaXMuX2Nsb3NlQ2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2Nsb3NlQnV0dG9uLCB0aGlzLmNsb3NlLCB0aGlzKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgY2xvc2VcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgY2xvc2UgdGhlIG1vZGFsIGJ5IHJlbW92aW5nIHRoZSBtb2RhbCBvdmVybGF5IGZyb20gdGhlIGRvY3VtZW50IGJvZHkuXG4gICAqIFdoZW4gY2xvc2VkLCBhIG1vZGFsIG11c3QgYmUgZGVzdHJveWVkLCBhbmQgdGhlIGNoaWxkIGNsYXNzIG11c3QgaW1wbGVtZW50IGl0cyBvd24gPGNvZGU+ZGVzdHJveSgpPC9jb2RlPiBtZXRob2QsXG4gICAqIHRvIHVuc3Vic2NyaWJlIHRvIGFueSBldmVudHMgaXQgaGFzIGFuZCB0byByZW1vdmUgaXRzIGludGVybmFsIHByb3BlcnRpZXMuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XSAtIFRoZSBjbGljayBldmVudCwgbm90IG1hbmRhdG9yeSB0byBhbGxvdyB0aGUgY2xvc2luZyBvZiB0aGUgbW9kYWwgb3V0c2lkZSBvZiBhbnkgZXZlbnQgKiovXG4gIGNsb3NlKGV2ZW50KSB7XG4gICAgLy8gTXVzdCBiZSBvdmVycmlkZGVuIGluIGNoaWxkIGNsYXNzIHRvIHByb3Blcmx5IGNsZWFuIGV4dGVuc2lvbiBwcm9wZXJ0aWVzIGFuZCBldmVudHNcbiAgICBpZiAoIWV2ZW50IHx8IChldmVudCAmJiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9tb2RhbE92ZXJsYXkgfHwgZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9jbG9zZUJ1dHRvbikpKSB7XG4gICAgICAvLyBDbGVhciBjbG9zZSBldmVudHMgaW50IGVoIEV2ZW50cyBjb21wb25lbnRcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9vdmVybGF5Q2xpY2tlZEV2dElkKTtcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9jbG9zZUNsaWNrZWRFdnRJZCk7XG4gICAgICB0aGlzLl9vdmVybGF5Q2xpY2tlZEV2dElkID0gLTE7XG4gICAgICB0aGlzLl9jbG9zZUNsaWNrZWRFdnRJZCA9IC0xO1xuICAgICAgLy8gUmVtb3ZlIHRoZSBvdmVybGF5IGZyb20gdGhlIGJvZHlcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fbW9kYWxPdmVybGF5KTtcbiAgICAgIC8vIFVzZSB0aGUgY2hpbGQgY2xhc3MgZGVzdHJveVxuICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xuIiwiaW1wb3J0IE1haW5QYWdlVmlldyBmcm9tICcuL21haW5wYWdlL01haW5QYWdlVmlldy5qcyc7XG5pbXBvcnQgTWVudVBhZ2VWaWV3IGZyb20gJy4vbWVudXBhZ2UvTWVudVBhZ2VWaWV3LmpzJztcbmltcG9ydCBBZG1pblBhZ2VWaWV3IGZyb20gJy4vbWVudXBhZ2UvQWRtaW5QYWdlVmlldy5qcyc7XG5pbXBvcnQgVXNlclBhZ2VWaWV3IGZyb20gJy4vbWVudXBhZ2UvVXNlclBhZ2VWaWV3LmpzJztcblxuXG5jb25zdCBDbGFzc2VzID0ge1xuICBNYWluUGFnZVZpZXcsXG4gIE1lbnVQYWdlVmlldyxcbiAgQWRtaW5QYWdlVmlldyxcbiAgVXNlclBhZ2VWaWV3XG59O1xuXG5cbmNsYXNzIFZpZXdGYWN0b3J5IHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+VmlldyBmYWN0b3J5IGZvciBhbGwgdXNhZ2VzIGluIHNpbmdsZSBwYWdlIGFwcDwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBjbGFzcyBpcyBhIGZhY3RvcnkgcGF0dGVybiB0aGF0IHdpbGwgYnVpbGQgYW55IHZpZXcgdXNlZCBpbiBNYW5hWmVhay4gU2VuZGluZyB0aGVcbiAgICogdmlldyBuYW1lIGFsb25nIGl0cyBvcHRpb25zIHdpbGwgbWFrZSB0aGlzIGNsYXNzIHJldHVybnMgaXQuIFRoZSB2aWV3IG5hbWUgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgQ0xhc3NlcyBkZWZpbml0aW9uXG4gICAqIGluIHRoaXMgZmlsZSwgd2l0aG91dCB0aGUgPGNvZGU+VmlldzwvY29kZT4gc3VmZml4LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgdmlldyBuYW1lLCBtdXN0IGJlIGxpc3RlZCBpbiBDbGFzc2VzIGRlZmluZWQgaW4gdGhpcyBmaWxlLCB3aXRob3V0IHRoZSBWaWV3IHN1ZmZpeFxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIC0gVGhlIHZpZXcgb3B0aW9uIG9iamVjdCwgc2VlIGNoaWxkIGNsYXNzIGZvciB1c2FnZVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHJlcXVlc3RlZCB2aWV3IGFzIGFuIG9iamVjdCAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENsYXNzZXNbYCR7bmFtZX1WaWV3YF0ob3B0aW9ucyk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVmlld0ZhY3Rvcnk7XG4iLCJpbXBvcnQgU2NlbmVWaWV3IGZyb20gJy4uL3V0aWxzL1NjZW5lVmlldyc7XG5cblxuY2xhc3MgTWFpblBhZ2VWaWV3IGV4dGVuZHMgU2NlbmVWaWV3IHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMuX2ZldGNoV3JhcHBlcignL2ZyYWdtZW50L21haW5wYWdlLycpXG4gICAgICAudGhlbih0aGlzLl92aWV3UmVhZHkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBMb2dnZXIucmFpc2UoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFpblBhZ2VWaWV3O1xuIiwiaW1wb3J0IFRhYlZpZXcgZnJvbSAnLi4vdXRpbHMvVGFiVmlldyc7XG5pbXBvcnQgVXNlcnNGcmFnbWVudCBmcm9tICcuL2FkbWluL1VzZXJzRnJhZ21lbnQnO1xuaW1wb3J0IFdpc2hlc0ZyYWdtZW50IGZyb20gJy4vYWRtaW4vV2lzaGVzRnJhZ21lbnQnO1xuXG5cbmNsYXNzIEFkbWluUGFnZVZpZXcgZXh0ZW5kcyBUYWJWaWV3IHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMuX2ZldGNoV3JhcHBlcih0aGlzLl91cmwpXG4gICAgICAudGhlbih0aGlzLl9maWxsQXR0cmlidXRlcy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5fdmlld1JlYWR5KVxuICAgICAgLnRoZW4odGhpcy5fdXNlcnNDbGlja2VkLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBMb2dnZXIucmFpc2UoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICBzdXBlci5fZmlsbEF0dHJpYnV0ZXMoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICBzdXBlci5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIF91c2Vyc0NsaWNrZWQoKSB7XG4gICAgdGhpcy5fY2xlYXJGcmFnbWVudCgpO1xuICAgIHRoaXMuX2ZldGNoVmlld0ZyYWdtZW50KCcvZnJhZ21lbnQvYWRtaW4vdXNlci1saXN0JylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYWN0aXZlRnJhZ21lbnQgPSBuZXcgVXNlcnNGcmFnbWVudCh7XG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLl92aWV3Q29udGFpbmVyLFxuICAgICAgICAgIHJlZnJlc2g6IHRoaXMuX3VzZXJzQ2xpY2tlZC5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgX3dpc2hlc0NsaWNrZWQoKSB7XG4gICAgdGhpcy5fY2xlYXJGcmFnbWVudCgpO1xuICAgIHRoaXMuX2ZldGNoVmlld0ZyYWdtZW50KCcvZnJhZ21lbnQvYWRtaW4vd2lzaC9hbGwnKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9hY3RpdmVGcmFnbWVudCA9IG5ldyBXaXNoZXNGcmFnbWVudCh7XG4gICAgICAgICAgdGFyZ2V0OiB0aGlzLl92aWV3Q29udGFpbmVyLFxuICAgICAgICAgIHJlZnJlc2g6IHRoaXMuX3dpc2hlc0NsaWNrZWQuYmluZCh0aGlzKVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBMb2dnZXIucmFpc2UoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5QYWdlVmlldztcbiIsImltcG9ydCBTY2VuZVZpZXcgZnJvbSAnLi4vdXRpbHMvU2NlbmVWaWV3JztcblxuXG5jbGFzcyBNZW51UGFnZVZpZXcgZXh0ZW5kcyBTY2VuZVZpZXcge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fYWRtaW5JdGVtID0gbnVsbDtcbiAgICB0aGlzLl9hZG1pbkNsaWNrZWRFdnRJZCA9IC0xO1xuXG4gICAgdGhpcy5fdXNlckl0ZW0gPSBudWxsO1xuICAgIHRoaXMuX3VzZXJDbGlja2VkRXZ0SWQgPSAtMTtcblxuICAgIHRoaXMuX3dpc2hJdGVtID0gbnVsbDtcbiAgICB0aGlzLl93aXNoQ2xpY2tlZEV2dElkID0gLTE7XG5cbiAgICB0aGlzLl9hYm91dEl0ZW0gPSBudWxsO1xuICAgIHRoaXMuX2Fib3V0Q2xpY2tlZEV2dElkID0gLTE7XG5cbiAgICB0aGlzLl9mZXRjaFdyYXBwZXIoJy9mcmFnbWVudC9tZW51cGFnZS8nKVxuICAgICAgLnRoZW4odGhpcy5fZmlsbEF0dHJpYnV0ZXMuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKHRoaXMuX3ZpZXdSZWFkeSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2FkbWluQ2xpY2tlZEV2dElkKTtcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fdXNlckNsaWNrZWRFdnRJZCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX3dpc2hDbGlja2VkRXZ0SWQpO1xuICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9hYm91dENsaWNrZWRFdnRJZCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgX2ZpbGxBdHRyaWJ1dGVzKCkge1xuICAgIHRoaXMuX2FkbWluSXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyNhZG1pbi1idXR0b24nKTtcbiAgICB0aGlzLl91c2VySXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyN1c2VycGFnZS1idXR0b24nKTtcbiAgICB0aGlzLl93aXNoSXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyN3aXNoLWJ1dHRvbicpO1xuICAgIHRoaXMuX2Fib3V0SXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1idXR0b24nKTtcblxuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2FkbWluQ2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2FkbWluSXRlbSwgdGhpcy5fYWRtaW5DbGlja2VkLCB0aGlzKTtcbiAgICB0aGlzLl91c2VyQ2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX3VzZXJJdGVtLCB0aGlzLl91c2VyQ2xpY2tlZCwgdGhpcyk7XG4gICAgdGhpcy5fd2lzaENsaWNrZWRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl93aXNoSXRlbSwgdGhpcy5fd2lzaENsaWNrZWQsIHRoaXMpO1xuICAgIHRoaXMuX2Fib3V0Q2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2Fib3V0SXRlbSwgdGhpcy5fYWJvdXRDbGlja2VkLCB0aGlzKTtcbiAgfVxuXG5cbiAgX2FkbWluQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnQWRtaW5QYWdlJywgLy8gVG8gdXNlIGluIFZpZXdGYWN0b3J5XG4gICAgICB0eXBlOiAnYWRtaW4nLCAvLyBUbyByZXRyaWV2ZSBET20gZWxlbWVudHNcbiAgICAgIHVybDogJy9mcmFnbWVudC9hZG1pbi8nXG4gICAgfSk7XG4gIH1cblxuXG4gIF91c2VyQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnVXNlclBhZ2UnXG4gICAgfSk7XG4gIH1cblxuXG4gIF93aXNoQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0TW9kYWwoe1xuICAgICAgbmFtZTogJ1dpc2gnLFxuICAgICAgdXJsOiAnL2ZyYWdtZW50L3dpc2gnXG4gICAgfSk7XG4gIH1cblxuXG4gIF9hYm91dENsaWNrZWQoKSB7XG4gICAgbXprLnNldE1vZGFsKHtcbiAgICAgIG5hbWU6ICdBYm91dCcsXG4gICAgICB1cmw6ICcvZnJhZ21lbnQvbW9kYWwvYWJvdXQnXG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWVudVBhZ2VWaWV3O1xuIiwiaW1wb3J0IFNjZW5lVmlldyBmcm9tICcuLi91dGlscy9TY2VuZVZpZXcnO1xuJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIFVzZXJQYWdlVmlldyBleHRlbmRzIFNjZW5lVmlldyB7XG5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9zd2l0Y2hUaGVtZUV2dElkID0gLTE7XG4gICAgdGhpcy5fdGhlbWUgPSAnREFSSyc7IC8vIFRPRE8gbG9hZCBmcm9tIHByZWYgKGxzIGFuZCBzZXJ2ZXIpXG5cbiAgICB0aGlzLl9mZXRjaFdyYXBwZXIoJy9mcmFnbWVudC91c2VyLXByb2ZpbGUvJylcbiAgICAgIC50aGVuKHRoaXMuX2J1aWxkVmlldylcbiAgICAgIC50aGVuKHRoaXMuX2V2ZW50cy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5fdmlld1JlYWR5KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fc3dpdGNoVGhlbWVFdnRJZCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgX2J1aWxkVmlldygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAvKiBBcHBlbmQgc2VydmljZSBzdHlsZSBpbnRvIGRvY3VtZW50ICovXG4gICAgICBVdGlscy5hcHBlbmRMaW5rSW5IZWFkKCdzdGF0aWMvZGlzdC9jc3MvdXNlcnByb2ZpbGUuYnVuZGxlLmNzcycpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3N3aXRjaFRoZW1lRXZ0SWQgPSBFdmVudHMuYWRkRXZlbnQoJ2NsaWNrJywgdGhpcy5kb20ucXVlcnlTZWxlY3RvcignI3RoZW1lLXN3aXRjaCcpLCB0aGlzLl9zd2l0Y2hUaGVtZSwgdGhpcyk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIF9zd2l0Y2hUaGVtZSgpIHtcbiAgICBpZiAodGhpcy5fdGhlbWUgPT09ICdEQVJLJykge1xuICAgICAgdGhpcy5fdGhlbWUgPSAnTElHSFQnO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLXRoZW1lJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2xpZ2h0LXRoZW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RoZW1lID0gJ0RBUksnO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodC10aGVtZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrLXRoZW1lJyk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJQYWdlVmlldztcbiIsImltcG9ydCBEcmFnRWxlbWVudCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9EcmFnRWxlbWVudCc7XG5pbXBvcnQgRHJvcEVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvRHJvcEVsZW1lbnQnO1xuXG5cbmNsYXNzIFVzZXJzRnJhZ21lbnQge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX3RhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuICAgIHRoaXMuX3JlZnJlc2hDQiA9IG9wdGlvbnMucmVmcmVzaDtcblxuICAgIHRoaXMuX3VzZXJzID0gW107XG4gICAgdGhpcy5fYmFkZ2VzID0gW107XG5cbiAgICB0aGlzLl9kcm9wRWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLl9kcmFnRWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLl9ldnRJZHMgPSBbXTtcblxuICAgIHRoaXMuX2ZpbGxBdHRyaWJ1dGVzKCk7XG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kcm9wRWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX2Ryb3BFbGVtZW50c1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZHJhZ0VsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLl9kcmFnRWxlbWVudHNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V2dElkcy5sZW5ndGg7ICsraSkge1xuICAgICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2V2dElkc1tpXSk7XG4gICAgfVxuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICAvLyBTYXZpbmcgdXNlcnMgYW5kIGJhZGdlIGZyb20gdGVtcGxhdGVcbiAgICBjb25zdCB1c2Vyc1dyYXBwZXIgPSB0aGlzLl90YXJnZXQucXVlcnlTZWxlY3RvcignI3VzZXJzLXdyYXBwZXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVzZXJzV3JhcHBlci5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fdXNlcnMucHVzaCh1c2Vyc1dyYXBwZXIuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjb25zdCBiYWRnZXNXcmFwcGVyID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJyNiYWRnZXMtd3JhcHBlcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFkZ2VzV3JhcHBlci5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fYmFkZ2VzLnB1c2goYmFkZ2VzV3JhcHBlci5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIC8vIEJ1aWxkIGRyYWcgYmVoYXZpb3IgZm9yIGJhZGdlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYmFkZ2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBkcmFnRWxlbWVudCA9IG5ldyBEcmFnRWxlbWVudCh7XG4gICAgICAgIHRhcmdldDogdGhpcy5fYmFkZ2VzW2ldLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYmFkZ2VJZDogdGhpcy5fYmFkZ2VzW2ldLmRhdGFzZXQuaWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9kcmFnRWxlbWVudHMucHVzaChkcmFnRWxlbWVudCk7XG4gICAgfVxuICAgIC8vIEJ1aWxkIGRyb3AgYmVoYXZpb3IgZm9yIHVzZXJzIGFuZCBzZXR1cCBiYW4vZGVsZXRlIGV2ZW50cyBmb3IgZWFjaFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdXNlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGRyb3BFbGVtZW50ID0gbmV3IERyb3BFbGVtZW50KHtcbiAgICAgICAgdGFyZ2V0OiB0aGlzLl91c2Vyc1tpXSxcbiAgICAgICAgb25Ecm9wOiB0aGlzLl9kcm9wT25Vc2VyLmJpbmQodGhpcy5fdXNlcnNbaV0sIHRoaXMuX3JlZnJlc2hDQilcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZHJvcEVsZW1lbnRzLnB1c2goZHJvcEVsZW1lbnQpO1xuICAgICAgLy8gQmFuL0RlbGV0ZSBldmVudHNcbiAgICAgIGNvbnN0IGJhblVzZXIgPSB0aGlzLl91c2Vyc1tpXS5jaGlsZHJlblt0aGlzLl91c2Vyc1tpXS5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlblswXTtcbiAgICAgIGNvbnN0IGRlbGV0ZVVzZXIgPSB0aGlzLl91c2Vyc1tpXS5jaGlsZHJlblt0aGlzLl91c2Vyc1tpXS5jaGlsZHJlbi5sZW5ndGggLSAxXS5jaGlsZHJlblsxXTtcbiAgICAgIHRoaXMuX2V2dElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCBiYW5Vc2VyLCB0aGlzLl9iYW5Vc2VyLCB7IGVsZW1lbnQ6IHRoaXMuX3VzZXJzW2ldLCBzY29wZTogdGhpcyB9KSk7XG4gICAgICB0aGlzLl9ldnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ2NsaWNrJywgZGVsZXRlVXNlciwgdGhpcy5fZGVsZXRlVXNlciwgeyBlbGVtZW50OiB0aGlzLl91c2Vyc1tpXSwgc2NvcGU6IHRoaXMgfSkpO1xuICAgIH1cbiAgICAvLyBCYWRnZSBjcmVhdGlvbiBldmVudFxuICAgIHRoaXMuX2V2dElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl90YXJnZXQucXVlcnlTZWxlY3RvcignI25ldy1iYWRnZScpLCB0aGlzLl9uZXdCYWRnZSwgdGhpcykpO1xuICB9XG5cblxuICBfZHJvcE9uVXNlcihyZWZyZXNoQ0IsIGRhdGEpIHtcbiAgICBtemsua29tLnBvc3QoJy9iYWRnZS9hc3NvY2lhdGUnLCB7XG4gICAgICB1c2VySWQ6IHRoaXMuZGF0YXNldC5pZCxcbiAgICAgIGJhZGdlSWQ6IGRhdGEuYmFkZ2VJZFxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbXprLnVpLnByb2Nlc3NMb2dGcm9tU2VydmVyKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICByZWZyZXNoQ0IoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2JhblVzZXIoKSB7XG4gICAgbXprLmtvbS5wb3N0KGAvYWRtaW4vdXNlci9kZWFjdGl2YXRlLyR7dGhpcy5lbGVtZW50LmRhdGFzZXQuaWR9YCwge30pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbXprLnVpLnByb2Nlc3NMb2dGcm9tU2VydmVyKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICB0aGlzLnNjb3BlLl9yZWZyZXNoQ0IoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2RlbGV0ZVVzZXIoKSB7XG4gICAgbXprLmtvbS5wb3N0KGAvYWRtaW4vdXNlci9kZWxldGUvJHt0aGlzLmVsZW1lbnQuZGF0YXNldC5pZH1gLCB7fSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBtemsudWkucHJvY2Vzc0xvZ0Zyb21TZXJ2ZXIocmVzcG9uc2UuZXJyb3JzKTtcbiAgICAgIHRoaXMuc2NvcGUuX3JlZnJlc2hDQigpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cblxuICBfbmV3QmFkZ2UoKSB7XG4gICAgbXprLnNldE1vZGFsKHtcbiAgICAgIG5hbWU6ICdCYWRnZScsXG4gICAgICB1cmw6ICcvZnJhZ21lbnQvYmFkZ2UnXG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlcnNGcmFnbWVudDtcbiIsImltcG9ydCBEcmFnRWxlbWVudCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9EcmFnRWxlbWVudCc7XG5pbXBvcnQgRHJvcEVsZW1lbnQgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvRHJvcEVsZW1lbnQnO1xuXG5cbmNsYXNzIFdpc2hlc0ZyYWdtZW50IHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLnRhcmdldDtcbiAgICB0aGlzLl9yZWZyZXNoQ0IgPSBvcHRpb25zLnJlZnJlc2g7XG5cbiAgICB0aGlzLl9kcm9wRWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLl9kcmFnRWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLl9ldnRJZHMgPSBbXTtcblxuICAgIHRoaXMuX2ZpbGxBdHRyaWJ1dGVzKCk7XG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kcm9wRWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX2Ryb3BFbGVtZW50c1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZHJhZ0VsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLl9kcmFnRWxlbWVudHNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V2dElkcy5sZW5ndGg7ICsraSkge1xuICAgICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2V2dElkc1tpXSk7XG4gICAgfVxuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICB0aGlzLl9zZXREcmFnRHJvcEVsZW1lbnRzKCcjcGVuZGluZy13aXNoZXMnLCAncmVzZXQnKTtcbiAgICB0aGlzLl9zZXREcmFnRHJvcEVsZW1lbnRzKCcjYWNjZXB0ZWQtd2lzaGVzJywgJ2FjY2VwdCcpO1xuICAgIHRoaXMuX3NldERyYWdEcm9wRWxlbWVudHMoJyNyZWZ1c2VkLXdpc2hlcycsICdyZWplY3QnKTtcbiAgfVxuXG5cbiAgX3NldERyYWdEcm9wRWxlbWVudHMoc2VsZWN0b3IsIHR5cGUpIHtcbiAgICBjb25zdCB3aXNoZXMgPSB0aGlzLl90YXJnZXQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgLy8gRHJvcCB3cmFwcGVyXG4gICAgY29uc3QgZHJvcENvbnRhaW5lciA9IG5ldyBEcm9wRWxlbWVudCh7XG4gICAgICB0YXJnZXQ6IHdpc2hlcyxcbiAgICAgIG9uRHJvcDogdGhpcy5fd2lzaERyb3BwZWRPbi5iaW5kKHRoaXMsIHR5cGUpXG4gICAgfSk7XG4gICAgdGhpcy5fZHJvcEVsZW1lbnRzLnB1c2goZHJvcENvbnRhaW5lcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aXNoZXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgIC8vIFdlIGlnbm9yZSB0aGUgdGl0bGUgb2YgZWFjaCBzZWN0aW9uIChQZW5kaW5nL0FjY2VwdGVkL1JlZnVzZWQpXG4gICAgICBpZiAod2lzaGVzLmNoaWxkcmVuW2ldLm5vZGVOYW1lICE9PSAnSDEnKSB7XG4gICAgICAgIC8vIERyYWcgZWxlbWVudHNcbiAgICAgICAgY29uc3QgZHJhZ0VsZW1lbnQgPSBuZXcgRHJhZ0VsZW1lbnQoe1xuICAgICAgICAgIHRhcmdldDogd2lzaGVzLmNoaWxkcmVuW2ldLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHdpc2hJZDogd2lzaGVzLmNoaWxkcmVuW2ldLmRhdGFzZXQuaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kcmFnRWxlbWVudHMucHVzaChkcmFnRWxlbWVudCk7XG4gICAgICAgIC8vIFJlbW92ZSB3aXNoXG4gICAgICAgIHRoaXMuX2V2dElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB3aXNoZXMuY2hpbGRyZW5baV0sIHRoaXMuX3JlbW92ZVdpc2gsIHsgZWxlbWVudDogd2lzaGVzLmNoaWxkcmVuW2ldLCBzY29wZTogdGhpcyB9KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBfd2lzaERyb3BwZWRPbih0eXBlLCBkYXRhKSB7XG4gICAgbXprLmtvbS5wb3N0KGAvYWRtaW4vd2lzaC8ke3R5cGV9LyR7ZGF0YS53aXNoSWR9YCwge30pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbXprLnVpLnByb2Nlc3NMb2dGcm9tU2VydmVyKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICB0aGlzLl9yZWZyZXNoQ0IoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX3JlbW92ZVdpc2goKSB7XG4gICAgbXprLmtvbS5wb3N0KGAvYWRtaW4vd2lzaC9kZWxldGUvJHt0aGlzLmVsZW1lbnQuZGF0YXNldC5pZH1gLCB7fSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBtemsudWkucHJvY2Vzc0xvZ0Zyb21TZXJ2ZXIocmVzcG9uc2UuZXJyb3JzKTtcbiAgICAgIHRoaXMuc2NvcGUuX3JlZnJlc2hDQigpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFdpc2hlc0ZyYWdtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIFNjZW5lVmlldyB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPlZpZXcgYmFzZSBjbGFzcyB3aXRoIG1hbmRhdG9yeSBtZXRob2RzPC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5TY2VuZSB2aWV3IGJhc2UgY2xhc3MgdGhhdCBtdXN0IGJlIGluaGVyaXRlZCB0byBtYXRjaCB0aGUgbG9hZGluZyBwYXR0ZXJuLiBBbGwgdmlld3NcbiAgICogYXJlIGJhc2VkIG9uIGFuIEhUTUwgdGVtcGxhdGUsIHRoYXQgd2lsbCBiZSBsb2FkZWQgdGhlIHBhcnNlZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgRE9NIHNjZW5lLiBXaGVuIHRoZSB2aWV3XG4gICAqIGJ1aWxkaW5nIGlzIGRvbmUsIGEgPGNvZGU+U2NlbmVWaWV3UmVhZHk8L2NvZGU+IGV2ZW50IGlzIGZpcmVkIHRocm91Z2ggdGhlIGN1c3RvbSBldmVudCBwcm94eS48L2Jsb2NrcXVvdGU+ICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKiBAcHVibGljXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSB2aWV3IHdyYXBwZXIgZGl2ICovXG4gICAgdGhpcy53cmFwcGVyID0gbnVsbDtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzdHJveVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTY2VuZVZpZXdcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoZSBkZXN0cm95IG1ldGhvZCB3aWxsIGNsZWFyIHRoZSB3cmFwcGVyLiBBIGRlc3Ryb3kgbWV0aG9kIG11c3QgYmUgY3JlYXRlZCBpbiBjaGlsZFxuICAgKiBjbGFzcyB0byBwcm9wZXJseSBjbGVhbiBpdHNlbGYuIEl0IHNob3VsZCBhbHNvIGNhbGwgZm9yIDxjb2RlPnN1cGVyPC9jb2RlPiB0byBjYWxsIHRoaXMgbWV0aG9kLjwvYmxvY2txdW90ZT4gKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLndyYXBwZXIgPSBudWxsO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgQlVJTERJTkcgVklFVyBQQVRURVJOICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgdHdvIG1ldGhvZHMgbXVzdCBiZSBjYWxsZWQgdG8gcHJvcGVybHkgZmV0Y2ggdmlldyB3cmFwcGVyIGFuZCBub3RpZnkgYXBwIHRoYXQgdGhlIHZpZXcgaXMgcmVhZHkgdG8gdXNlLiAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9mZXRjaFdyYXBwZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmZhY2VcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgcmVxdWVzdCB0aGUgSFRNTCB0ZW1wbGF0ZSBmb3IgdGhlIGdpdmVuIHVybC4gSXQgd2lsbCB0aGVuIHBhcnNlIGl0XG4gICAqIGFuZCB1cGRhdGUgdGhlIHZpZXcgd3JhcHBlciB0byBtYXRjaCB0aGlzIG5ld2x5IGxvYWRlZCB0ZW1wbGF0ZS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdGVtcGxhdGUgdXJsIHRvIGxvYWQgaHRtbCBmcm9tXG4gICAqIEByZXR1cm4ge3Byb21pc2V9IC0gVGhlIGFjdGlvbiBwcm9taXNlICovXG4gIF9mZXRjaFdyYXBwZXIodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG16ay5rb20uZ2V0VGV4dCh1cmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICB0aGlzLmRvbSA9IFV0aWxzLnBhcnNlSFRNTEZyYWdtZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfdmlld1JlYWR5XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBVc2VySW50ZXJmYWNlXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCBuZWVkcyB0byBiZSBjYWxsZWQgbGFzdCwgd2hlbiBhbGwgdGhlIHZpZXcgaW5pdGlhbGlzYXRpb24gaXMgZG9uZS4gVGhpc1xuICAgKiB3YXksIGl0IHdpbGwgbm90aWZ5IHRoZSBVc2VySW50ZXJmYWNlIGNvbnRyb2xsZXIgdGhhdCB0ZSB2aWV3IGNyZWF0aW9uIGlzIGRvbmUsIGFuZCB0aGF0IGl0IHNob3VsZCByZWxlYXNlIHRoZVxuICAgKiBVSSByZW1vdmluZyB0aGUgbG9hZGluZyBvdmVybGF5LjwvYmxvY2txdW90ZT4gKi9cbiAgX3ZpZXdSZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBFdmVudHMucHVibGlzaCgnU2NlbmVWaWV3UmVhZHknKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiAvIFNFVFRFUiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAcHVibGljXG4gICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgdmlldyBmaXJzdCBET00gY2hpbGQgaW4gdGVtcGxhdGUgKi9cbiAgZ2V0IGRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVyO1xuICB9XG5cblxuICAvKiogQHB1YmxpY1xuICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIHZpZXcgZmlyc3QgRE9NIGNoaWxkIGluIHRlbXBsYXRlICovXG4gIHNldCBkb20oZG9tKSB7XG4gICAgdGhpcy53cmFwcGVyID0gZG9tO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lVmlldztcbiIsImltcG9ydCBTY2VuZVZpZXcgZnJvbSAnLi9TY2VuZVZpZXcnO1xuXG5cbmNsYXNzIFRhYlZpZXcgZXh0ZW5kcyBTY2VuZVZpZXcge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICB0aGlzLl91cmwgPSBvcHRpb25zLnVybDtcblxuICAgIHRoaXMuX3RhYnMgPSBudWxsO1xuICAgIHRoaXMuX3RhYkNsaWNrZWRFdnRJZHMgPSBbXTtcblxuICAgIHRoaXMuX3ZpZXdDb250YWluZXIgPSBudWxsO1xuXG4gICAgdGhpcy5fYWN0aXZlRnJhZ21lbnQgPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgRE9NIGxvYWRpbmcgb3ZlcmxheSB0byB1c2UgaW4gdHJhbnNpdGlvbnMgKi9cbiAgICB0aGlzLl9sb2FkaW5nT3ZlcmxheSA9IG51bGw7XG4gICAgLy8gQnVpbGQgbG9hZGluZyBvdmVybGF5IGFuZCBhZGQgaXRzIHN0eWxlIGNsYXNzXG4gICAgdGhpcy5fbG9hZGluZ092ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl9sb2FkaW5nT3ZlcmxheS5jbGFzc05hbWUgPSAnbXprLWxvYWRpbmctb3ZlcmxheSBmaXQtcGFyZW50JztcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90YWJDbGlja2VkRXZ0SWRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fdGFiQ2xpY2tlZEV2dElkc1tpXSk7XG4gICAgfVxuICB9XG5cblxuICBfZmlsbEF0dHJpYnV0ZXMoKSB7XG4gICAgdGhpcy5fdGFicyA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMuX3R5cGV9LXRhYnNgKTtcbiAgICB0aGlzLl92aWV3Q29udGFpbmVyID0gdGhpcy5kb20ucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5fdHlwZX0tdmlld2ApO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdGFicy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgZXZlbnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl90YWJzLmNoaWxkcmVuW2ldLCB0aGlzLl90YWJDbGlja2VkLCB0aGlzKTtcbiAgICAgIHRoaXMuX3RhYkNsaWNrZWRFdnRJZHMucHVzaChldmVudElkKTtcbiAgICB9XG4gIH1cblxuXG4gIF90YWJDbGlja2VkKGV2ZW50KSB7XG4gICAgdGhpcy5fdW5zZWxlY3RUYWJzKCk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgdGhpc1tgXyR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQudmlld31DbGlja2VkYF0oKTtcbiAgfVxuXG5cbiAgX3Vuc2VsZWN0VGFicygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RhYnMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX3RhYnMuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuXG4gIF9mZXRjaFZpZXdGcmFnbWVudCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgIHRoaXMuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgLnRoZW4obXprLmdldEZyYWdtZW50LmJpbmQobXprLCB1cmwpKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoICdiZWZvcmVlbmQnLCByZXNwb25zZSk7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KVxuICAgICAgICAuZmluYWxseSh0aGlzLnN0b3BMb2FkaW5nLmJpbmQodGhpcykpOyAvLyBDbGVhciBsb2FkaW5nIG92ZXJsYXkgd2hhdGV2ZXIgaGFwcGVucztcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2NsZWFyRnJhZ21lbnQoKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZUZyYWdtZW50KSB7XG4gICAgICB0aGlzLl9hY3RpdmVGcmFnbWVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLl9hY3RpdmVGcmFnbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cblxuICBzdGFydExvYWRpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9sb2FkaW5nT3ZlcmxheSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHN0b3BMb2FkaW5nKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3ZpZXdDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5fbG9hZGluZ092ZXJsYXkpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUYWJWaWV3O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==