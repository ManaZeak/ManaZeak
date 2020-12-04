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
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = response => {
        if (response.target.readyState === 4) { // Ready state changed has reach the response state
          this._resolveAsRaw(response.target)
            .then(resolve)
            .catch(reject);
        }
      };
      xhr.onerror = () => {
        reject('F_KOM_XHR_ERROR')
      };
      xhr.send();
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
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-SRFToken', this._csrfToken);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = response => {
        if (response.target.readyState === 4) { // Ready state changed has reach the response state
          this._resolveAsRaw(response.target)
            .then(resolve)
            .catch(reject);
        }
      };
      xhr.onerror = () => {
        reject('F_KOM_XHR_ERROR')
      };
      xhr.send(JSON.stringify(data));
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
        reject('F_KOM_XHR_ERROR')
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
        } else if (error.severity && error.title && error.message) {
          severity = error.severity || '';
          title = error.title || '';
          message = error.message || '';
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
   * @param {string} seed   - The seed string to hash
   * @param {number} length - The length of the returned ID */
  _idGenerator(seed, length) {
    /* Original code from:
     * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     * Tweaked to fit Notification class needs
     */
    let hash = 0;
    let character = '';

    if (seed.length === 0 || length > 12) { return undefined; }

    for (let i = 0; i < seed.length; ++i) {
      character = seed.charCodeAt(i);
      hash  = ((hash << 5) - hash) + character;
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
/* harmony import */ var _modal_menupage_WishModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal/menupage/WishModal.js */ "./front/js/view/modal/menupage/WishModal.js");



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
        .catch(reject)
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
    return new Promise((resolve, reject) => {
      this.modal = new _modal_ModalFactory__WEBPACK_IMPORTED_MODULE_1__["default"](options.name, options);
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




const Classes = {
  AboutModal: _menupage_AboutModal_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  WishModal: _menupage_WishModal_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};


class ModalFactory {


  constructor(name, options = {}) {
    return new Classes[`${name}Modal`](options);
  }


}


/* harmony default export */ __webpack_exports__["default"] = (ModalFactory);


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
        Logger.raise(error)
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
        Logger.raise(error)
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
    return new Promise((resolve, reject) => {
      /* Append service style into document */
      Utils.appendLinkInHead('static/dist/css/userprofile.bundle.css');
      resolve();
    });
  }


  _events() {
    return new Promise((resolve, reject) => {
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

    this._fillAttributes();
    this._events();
  }


  destroy() {
    for (let i = 0; i < this._dropElements.length; ++i) {
      this._dropElements[i].destroy();
    }
    for (let i = 0; i < this._dragElements.length; ++i) {
      this._dragElements[i].destroy();
    }
    Utils.removeAllObjectKeys(this);
  }


  _fillAttributes() {
    const usersWrapper = this._target.querySelector('#users-wrapper');
    for (let i = 0; i < usersWrapper.children.length; ++i) {
      this._users.push(usersWrapper.children[i]);
    }
    const badgesWrapper = this._target.querySelector('#badges-wrapper');
    for (let i = 0; i < badgesWrapper.children.length; ++i) {
      this._badges.push(badgesWrapper.children[i]);
    }
  }


  _events() {
    for (let i = 0; i < this._users.length; ++i) {
      const dropElement = new _utils_DropElement__WEBPACK_IMPORTED_MODULE_1__["default"]({
        target: this._users[i],
        onDrop: this._dropOnUser.bind(this._users[i], this._refreshCB)
      });
      this._dropElements.push(dropElement);
    }

    for (let i = 0; i < this._badges.length; ++i) {
      const dragElement = new _utils_DragElement__WEBPACK_IMPORTED_MODULE_0__["default"]({
        target: this._badges[i],
        data: {
          badgeId: this._badges[i].dataset.id
        }
      });
      this._dragElements.push(dragElement);
    }
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
class WishesFragment {


  constructor() {

  }


  destroy() {
    Utils.removeAllObjectKeys(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvU3RhcnRTZXNzaW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL2NvcmUvS29tLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL2NvcmUvTXprLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL0N1c3RvbUV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9EcmFnRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9Ecm9wRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy91dGlscy9Mb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdXRpbHMvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3V0aWxzL2VudW0vSHR0cFN0YXR1c0NvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9Vc2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvY29tcG9uZW50L0FzaWRlLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvY29tcG9uZW50L1NjZW5lLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvTW9kYWxGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvbW9kYWwvbWVudXBhZ2UvQWJvdXRNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy92aWV3L21vZGFsL21lbnVwYWdlL1dpc2hNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy92aWV3L21vZGFsL3V0aWxzL01vZGFsLmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvVmlld0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9tYWlucGFnZS9NYWluUGFnZVZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQvanMvdmlldy9zY2VuZS9tZW51cGFnZS9BZG1pblBhZ2VWaWV3LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvbWVudXBhZ2UvTWVudVBhZ2VWaWV3LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvbWVudXBhZ2UvVXNlclBhZ2VWaWV3LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvbWVudXBhZ2UvYWRtaW4vVXNlcnNGcmFnbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9qcy92aWV3L3NjZW5lL21lbnVwYWdlL2FkbWluL1dpc2hlc0ZyYWdtZW50LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvdXRpbHMvU2NlbmVWaWV3LmpzIiwid2VicGFjazovLy8uL2Zyb250L2pzL3ZpZXcvc2NlbmUvdXRpbHMvVGFiVmlldy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC9zY3NzL3NlcnZpY2UvbWFuYXplYWsuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnRDtBQUNBO0FBQ1o7QUFDRjtBQUNMO0FBQzdCOztBQUVBLG9CQUFvQiwyREFBWTtBQUNoQywwQkFBMEIsMkRBQVk7QUFDdEMsb0JBQW9CLHFEQUFNO0FBQzFCO0FBQ0EsQ0FBQztBQUNELG1CQUFtQixvREFBSzs7QUFFeEIsaUJBQWlCLGlEQUFHO0FBQ3BCOzs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTtBQUE2RDs7O0FBRzdEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU87QUFDckI7QUFDQSxpQkFBaUIscUVBQWM7QUFDL0I7QUFDQSxLQUFLLG1CQUFtQixxRUFBYztBQUN0QztBQUNBLEtBQUssbUJBQW1CLHFFQUFjO0FBQ3RDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0Isa0NBQWtDLHFFQUFjO0FBQ2hEO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTLCtDQUErQztBQUN4RDtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLGtFQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN0WW5CO0FBQUE7QUFBQTtBQUFrRDtBQUMxQjtBQUN4Qjs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CQUFtQiw0Q0FBRztBQUN0QixrQkFBa0IsMkRBQWE7QUFDL0I7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOzs7QUFHQTs7O0FBR2Usa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3REbkI7QUFBYTs7O0FBR2I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBLGFBQWEsUUFBUSw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEZBQThGO0FBQzlGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QixhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0EsaURBQWlELFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxRQUFRO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUSxzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFFBQVE7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsUUFBUSxzQkFBc0I7QUFDNUM7QUFDQTtBQUNBLDJEQUEyRCxNQUFNO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0Esa0RBQWtELFVBQVUsR0FBRyxTQUFTLEdBQUcsUUFBUTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxvREFBb0QsUUFBUTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsNEdBQTRHLFFBQVEsT0FBTyxVQUFVO0FBQ3JJO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsMERBQTBELFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVEsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxnREFBZ0QsVUFBVSxHQUFHLEtBQUs7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0Esd0VBQXdFLFVBQVUsbUJBQW1CLFdBQVc7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDcmM1QjtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsS0FBSyxPQUFPO0FBQ1osNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRSw0Q0FBNEMsdUJBQXVCO0FBQ25FLDhDQUE4QyxZQUFZO0FBQzFELDZDQUE2QyxXQUFXO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsMkNBQTJDLG9FQUFvRTtBQUMvRyw0Q0FBNEMsb0VBQW9FO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR2UsMEVBQVcsRTs7Ozs7Ozs7Ozs7O0FDakwxQjtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsa0NBQWtDO0FBQ2xDO0FBQ0EsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsOEJBQThCO0FBQzlCLCtEQUErRDtBQUMvRDtBQUNBLE9BQU8sT0FBTztBQUNkO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLDBFQUFXLEU7Ozs7Ozs7Ozs7OztBQ3ZQMUI7QUFBYTs7O0FBR2I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpR0FBaUc7QUFDakc7QUFDQTtBQUNBLGFBQWEsT0FBTyxZQUFZO0FBQ2hDLGFBQWEsT0FBTyxtQkFBbUI7QUFDdkM7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsT0FBTztBQUNyQiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxPQUFPLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYyxXQUFXLFNBQVMsR0FBRyxpQkFBaUIsR0FBRyxtQkFBbUI7QUFDbkcsU0FBUyx5Q0FBeUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWMsV0FBVyxTQUFTO0FBQ3pELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQSxzQ0FBc0MsTUFBTTtBQUM1QztBQUNBO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsdUNBQXVDO0FBQ3ZDLDBDQUEwQztBQUMxQyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1Q0FBdUMsSUFBSSxzQkFBc0I7QUFDbkc7QUFDQSxnQ0FBZ0Msd0JBQXdCLElBQUksOEJBQThCO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MsT0FBTztBQUNQLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsR0FBRztBQUN0QyxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsbUNBQW1DLGFBQWE7QUFDaEQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSxxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDM1F0QjtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU8sNENBQTRDLFdBQVcsYUFBYSxjQUFjO0FBQ3RHLGFBQWEsT0FBTyxvQ0FBb0MsUUFBUSxNQUFNLE9BQU8sTUFBTTtBQUNuRixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTyxrREFBa0QsV0FBVyxhQUFhLGNBQWM7QUFDL0c7QUFDQTtBQUNBLGdCQUFnQixPQUFPLDBEQUEwRCxRQUFRLE1BQU0sT0FBTyxNQUFNO0FBQzVHO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPLDRDQUE0QyxXQUFXLGFBQWEsY0FBYztBQUN0RyxhQUFhLE9BQU8sb0NBQW9DLFFBQVEsTUFBTSxPQUFPLE1BQU07QUFDbkYsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDs7QUFFQSxvRUFBb0U7QUFDcEUsc0RBQXNEO0FBQ3REOztBQUVBLG1IQUFtSDtBQUNuSCwwREFBMEQ7QUFDMUQ7O0FBRUEsc0VBQXNFO0FBQ3RFLHdEQUF3RDtBQUN4RDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQsb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxtREFBbUQ7O0FBRW5ELGlDQUFpQztBQUNqQywrQkFBK0I7O0FBRS9CO0FBQ0EseUNBQXlDO0FBQ3pDLE9BQU8seUJBQXlCO0FBQ2hDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXLEVBQUUsc0dBQXNHO0FBQ2pJLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDs7QUFFQSxnREFBZ0Q7QUFDaEQsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCxPQUFPLG1EQUFtRDtBQUMxRCxxQ0FBcUM7QUFDckM7QUFDQSxLQUFLLFFBQVE7QUFDYjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQSxPQUFPLE9BQU87QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNHQUFzRztBQUNwSCxhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxXQUFXLEVBQUUsc0dBQXNHO0FBQ2pJLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQSx1Q0FBdUM7QUFDdkMsS0FBSyx5QkFBeUI7QUFDOUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtRkFBbUY7QUFDakcsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUEsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyx1Q0FBdUM7QUFDdkMsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsNkRBQTZEO0FBQzdELEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsMkNBQTJDO0FBQzNDLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsZUFBZTtBQUNmOztBQUVBLDREQUE0RDtBQUM1RCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkMsa0JBQWtCOztBQUU3RCxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUEsZ0pBQWdKO0FBQ2hKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTyx5QkFBeUIsU0FBUyxNQUFNLFNBQVM7QUFDckUsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixhQUFhLEVBQUUsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0Esb0RBQW9EOztBQUVwRCw0Q0FBNEM7QUFDNUMsZ0RBQWdEO0FBQ2hEOztBQUVBLGtDQUFrQztBQUNsQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRSxrQ0FBa0M7QUFDbEMsdUJBQXVCOztBQUV2QixzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPLGtCQUFrQixNQUFNLFNBQVMsT0FBTztBQUM1RDtBQUNBLGlEQUFpRDtBQUNqRCxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR2UsMkVBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQzNpQzVCO0FBQWE7OztBQUdiOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtQ0FBbUM7QUFDckQ7QUFDQSx1REFBdUQsZ0JBQWdCLEVBQUUsS0FBSztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkRyQjtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDVEg7QUFBQTtBQUFBO0FBQUE7QUFBc0M7QUFDQTtBQUNnQjtBQUN0RDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsc0JBQXNCLHdEQUFLO0FBQzNCO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsc0JBQXNCLHdEQUFLO0FBQzNCO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSw0RUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMUg3QjtBQUFhOzs7QUFHYjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDekNyQjtBQUFBO0FBQUE7QUFBK0M7QUFDRTtBQUNqRDs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxzQkFBc0IsMERBQVc7QUFDakM7QUFDQTtBQUNBLHdCQUF3QiwwREFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLHVCQUF1QiwyREFBWTtBQUNuQyxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkRyQjtBQUFBO0FBQUE7QUFBa0Q7QUFDRjs7O0FBR2hEO0FBQ0EsRUFBRSwyRUFBVTtBQUNaLEVBQUUseUVBQVM7QUFDWDs7O0FBR0E7OztBQUdBLGdDQUFnQztBQUNoQywwQkFBMEIsS0FBSztBQUMvQjs7O0FBR0E7OztBQUdlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNyQjVCO0FBQUE7QUFBc0M7OztBQUd0Qyx5QkFBeUIsdURBQUs7OztBQUc5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BOzs7QUFHZSx5RUFBVSxFOzs7Ozs7Ozs7Ozs7QUM5RXpCO0FBQUE7QUFBc0M7OztBQUd0Qyx3QkFBd0IsdURBQUs7OztBQUc3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLHdFQUFTLEU7Ozs7Ozs7Ozs7OztBQ3ZIeEI7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xELGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLG9FQUFLLEU7Ozs7Ozs7Ozs7OztBQ2hLcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzRDtBQUNBO0FBQ0U7QUFDRjs7O0FBR3REO0FBQ0EsRUFBRSwrRUFBWTtBQUNkLEVBQUUsK0VBQVk7QUFDZCxFQUFFLGlGQUFhO0FBQ2YsRUFBRSwrRUFBWTtBQUNkOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTyxZQUFZO0FBQ2hDLGNBQWMsT0FBTztBQUNyQixnQ0FBZ0M7QUFDaEMsMEJBQTBCLEtBQUs7QUFDL0I7OztBQUdBOzs7QUFHZSwwRUFBVyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbEMzQjtBQUFBO0FBQTJDOzs7QUFHM0MsMkJBQTJCLHdEQUFTOzs7QUFHcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMUI1QjtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNXO0FBQ0U7OztBQUdwRCw0QkFBNEIsc0RBQU87OztBQUduQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDREQUFhO0FBQ2hEO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDZEQUFjO0FBQ2pEO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBOzs7QUFHZSw0RUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkU3QjtBQUFBO0FBQTJDOzs7QUFHM0MsMkJBQTJCLHdEQUFTOzs7QUFHcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7OztBQUdlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM3RjVCO0FBQUE7QUFBMkM7QUFDM0M7OztBQUdBLDJCQUEyQix3REFBUzs7O0FBR3BDO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLDJFQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUMvRDVCO0FBQUE7QUFBQTtBQUF3RDtBQUNBOzs7QUFHeEQ7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBLG1CQUFtQiwrQkFBK0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQ0FBbUM7QUFDdEQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0MsOEJBQThCLDBEQUFXO0FBQ3pDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDLDhCQUE4QiwwREFBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOzs7QUFHZSw0RUFBYSxFOzs7Ozs7Ozs7Ozs7QUNsRjVCO0FBQUE7OztBQUdBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHZSw2RUFBYyxFOzs7Ozs7Ozs7Ozs7QUNoQjdCO0FBQWE7OztBQUdiOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdlLHdFQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM5RnpCO0FBQUE7QUFBb0M7OztBQUdwQyxzQkFBc0Isa0RBQVM7OztBQUcvQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1CQUFtQixtQ0FBbUM7QUFDdEQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDRDQUE0QyxXQUFXO0FBQ3ZELHFEQUFxRCxXQUFXO0FBQ2hFOzs7QUFHQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDOzs7QUFHQTtBQUNBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsOENBQThDO0FBQzlDLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7OztBQUdlLHNFQUFPLEVBQUM7Ozs7Ozs7Ozs7OztBQ3hHdkIsdUMiLCJmaWxlIjoianMvbWFuYXplYWsuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IEN1c3RvbUV2ZW50cyBmcm9tICcuL3V0aWxzL0N1c3RvbUV2ZW50cyc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vdXRpbHMvTm90aWZpY2F0aW9uJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi91dGlscy9Mb2dnZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMnO1xuaW1wb3J0IE16ayBmcm9tICcuL2NvcmUvTXprJztcbid1c2Ugc3RyaWN0Jztcblxud2luZG93LkV2ZW50cyA9IG5ldyBDdXN0b21FdmVudHMoKTtcbndpbmRvdy5Ob3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XG53aW5kb3cuTG9nZ2VyID0gbmV3IExvZ2dlcih7XG4gIG5vdGlmaWNhdGlvbjogd2luZG93Lk5vdGlmaWNhdGlvblxufSk7XG53aW5kb3cuVXRpbHMgPSBuZXcgVXRpbHMoKTtcblxud2luZG93Lm16ayA9IG5ldyBNemsoKTtcbndpbmRvdy5temsuaW5pdFNlc3Npb24oKTtcbiIsImltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuLi91dGlscy9lbnVtL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuXG5jbGFzcyBLb20ge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5TZXJ2ZXIgY29tbXVuaWNhdGlvbiBhYnN0cmFjdGlvbjwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgY2xhc3MgaXMgdGhlIG1haW4gb2JqZWN0IHRvIGRlYWwgd2l0aCB3aGVuIHJlcXVlc3Rpbmcgc29tZXRoaW5nIGZyb20gdGhlIHNlcnZlci48YnI+XG4gICAqIEl0IGhhbmRsZSBhbGwgdXJscyBjYWxscyAoPGNvZGU+R0VUPC9jb2RlPiwgPGNvZGU+UE9TVDwvY29kZT4pLCB0cmVhdCByZXNwb25zZXMgb3IgaGFuZGxlIGVycm9ycyB1c2luZ1xuICAgKiA8Y29kZT5Qcm9taXNlPC9jb2RlPi48YnI+QmVjYXVzZSBpdCB1c2VzIDxjb2RlPlByb21pc2U8L2NvZGU+LCBzdWNjZXNzIGFuZCBlcnJvcnMgYXJlIHRvIGJlIGhhbmRsZWQgaW4gdGhlIGNhbGxlclxuICAgKiBmdW5jdGlvbiwgdXNpbmcgPGNvZGU+LnRoZW4oKTwvY29kZT4gYW5kIDxjb2RlPi5jYXRjaCgpPC9jb2RlPi4gVG8gcHJvcGVybHkgZGVhbCB3aXRoIDxjb2RlPlBPU1Q8L2NvZGU+IHJlcXVlc3QsXG4gICAqIHRoZSBzZXNzaW9uIG11c3QgY29udGFpbiBhIGNzcmYgdG9rZW4gaW4gY29va2llcy4gT3RoZXJ3aXNlLCB0aG9zZSA8Y29kZT5QT1NUPC9jb2RlPiBjYWxsIG1heSBmYWlsLjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFVzZXIgc2Vzc2lvbiBDU1JGIHRva2VuIHRvIHVzZSBpbiBQT1NUIHJlcXVlc3QgKi9cbiAgICB0aGlzLl9jc3JmVG9rZW4gPSB0aGlzLl9nZXRDc3JmQ29va2llKCk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7YXJyYXlbXX0gLSBBcnJheSBvZiBIVFRQIGhlYWRlcnMgdG8gYmUgdXNlZCBpbiBIVFRQIGNhbGxzICovXG4gICAgdGhpcy5faGVhZGVycyA9IHRoaXMuX2NyZWF0ZVJlcXVlc3RIZWFkZXJzKCk7XG4gICAgLy8gQ2hlY2sgdGhhdCBDU1JGIHRva2VuIGV4aXN0cyBhbmQgdGhhdCBoZWFkZXJzIGFyZSBwcm9wZXJseSBjcmVhdGVkXG4gICAgdGhpcy5fY2hlY2tWYWxpZGl0eSgpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDTEFTUyBJTklUIFVUSUxTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldENzcmZDb29raWVcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+RXh0cmFjdCBDU1JGIHRva2VuIHZhbHVlIGZyb20gY2xpZW50IGNvb2tpZXMgYW5kIHJldHVybnMgaXQgYXMgYSBzdHJpbmcuIFJldHVybnMgYW4gZW1wdHlcbiAgICogc3RyaW5nIGJ5IGRlZmF1bHQuIFRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIHRvIGJlIGNhbGxlZCBvbiBjb25zdHJ1Y3Rpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gVGhlIENTUkYgdG9rZW4gc3RyaW5nICovXG4gIF9nZXRDc3JmQ29va2llKCkge1xuICAgIGlmIChkb2N1bWVudC5jb29raWUgJiYgZG9jdW1lbnQuY29va2llICE9PSAnJykge1xuICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vIFBhcnNlIGN1cnJlbnQgY29va2llIHRvIGV4dHJhY3QgaXRzIHByb3BlcnRpZXNcbiAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoY29va2llICE9PSB1bmRlZmluZWQgJiYgY29va2llWzBdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3NyZicpKSB7XG4gICAgICAgICAgLy8gRm91bmQgYSBtYXRjaGluZyBjb29raWUgZm9yIGNzcmZ0b2tlbiB2YWx1ZSwgcmV0dXJuIGFzIGRlY29kZWQgc3RyaW5nXG4gICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb29raWVbMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiBlbXB0eSBzdHJpbmcgYnkgZGVmYXVsdCwgUE9TVCBjYWxscyBtYXkgZmFpbFxuICAgIHJldHVybiAnJztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NyZWF0ZVJlcXVlc3RIZWFkZXJzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkZpbGxzIEtvbSA8Y29kZT5faGVhZGVyczwvY29kZT4gcHJpdmF0ZSBtZW1iZXIgYXJyYXksIHRvIHVzZSBpbiBIVFRQIHJlcXVlc3RzIGxhdGVyIG9uLlxuICAgKiBUaGlzIG1ldGhvZCBpcyByZXF1aXJlZCB0byBiZSBjYWxsZWQgb24gY29uc3RydWN0aW9uLjwvYmxvY2txdW90ZT5cbiAgICogQHJldHVybiB7YXJyYXlbXX0gLSBUaGUgaGVhZGVycyBhcnJheSwgbGVuZ3RoIDMsIHRvIGJlIHVzZWQgaW4gSFRUUCByZXF1ZXN0cyAqL1xuICBfY3JlYXRlUmVxdWVzdEhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFsnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnXSxcbiAgICAgIFsnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nXSxcbiAgICAgIFsnWC1YU1JGLVRPS0VOJywgdGhpcy5fY3NyZlRva2VuXVxuICAgIF07XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfY2hlY2tWYWxpZGl0eVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5DaGVjayB0aGUgS29tIGluc3RhbmNlIHZhbGlkaXR5IHRvIGVuc3VyZSBpdHMgcHJvcGVydGllcyB2YWxpZGl0eS48L2Jsb2NrcXVvdGU+ICovXG4gIF9jaGVja1ZhbGlkaXR5KCkge1xuICAgIGlmICh0aGlzLl9jc3JmVG9rZW4gIT09ICcnKSB7XG4gICAgICBpZiAodGhpcy5faGVhZGVycy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRl9LT01fSEVBREVSU19FUlJPUicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGX0tPTV9OT19DU1JGX1RPS0VOJyk7XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldEVycm9yQ29kZUZyb21IVFRQU3RhdHVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuZXZlciBhIHNlcnZlciByZXF1ZXN0IGRpZG4ndCB3ZW50IHdlbGwuIEluIGNhc2UgYSByZXF1ZXN0IChmcm9tXG4gICAqIGFueSB0eXBlKSBmYWlscywgaXRzIEhUVFAgc3RhdHVzIGNvZGUgaGF2ZSB0byBiZSBoYW5kbGUgaW4gdGhlIG1ldGhvZCwgc28gaXQgcmV0dXJucyBhbiBlcnJvciBjb2RlIGNhbiBiZSBoYW5kbGVkXG4gICAqIGluIHRoZSB1c2VyIGludGVyZmFjZSAod2l0aCBub3RpZmljYXRpb24sIGNvbnNvbGUgb3IgZWxzZSkuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29kZSAtIFRoZSBIVFRQIHN0YXR1cyBjb2RlIHRvIGhhbmRsZSwgaW4gc3VwcG9ydGVkIG9uZXMgZnJvbSBIdHRwU3RhdHVzQ29kZSBlbnVtZXJhdGlvblxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBIVFRQIHN0YXR1cyBhcyBhbiBlcnJvciBjb2RlICovXG4gIF9nZXRFcnJvckNvZGVGcm9tSFRUUFN0YXR1cyhjb2RlKSB7XG4gICAgaWYgKGNvZGUgPT09IEh0dHBTdGF0dXNDb2RlLk5PVF9GT1VORCkge1xuICAgICAgcmV0dXJuICdCX0tPTV9OT1RfRk9VTkQnO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gSHR0cFN0YXR1c0NvZGUuRk9SQklEREVOKSB7XG4gICAgICByZXR1cm4gJ0JfS09NX0FDQ0VTU19GT1JCSURERU4nO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gSHR0cFN0YXR1c0NvZGUuSU5URVJOQUxfRVJST1IpIHtcbiAgICAgIHJldHVybiAnQl9LT01fSU5URVJOQUxfRVJST1InO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYEJfS09NX1VOS05PV05fRVJST1JgO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIF9yZXNvbHZlQXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+R2VuZXJpYyB0b29sIG1ldGhvZCB1c2VkIGJ5IHByaXZhdGUgbWV0aG9kcyBvbiBmZXRjaCByZXNwb25zZXMgdG8gZm9ybWF0IG91dHB1dCBpbiB0aGUgcHJvdmlkZWRcbiAgICogZm9ybWF0LiBJdCBtdXN0IGJlIGVpdGhlciBganNvbmAsIGB0ZXh0YCBvciBgcmF3YC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgcmVzb2x1dGlvbiwgY2FuIGJlIGBqc29uYCwgYHRleHRgIG9yIGByYXdgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSAtIFRoZSA8Y29kZT5mZXRjaDwvY29kZT4gcmVzcG9uc2Ugb2JqZWN0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiwgZm9ybWF0IHJlc3BvbnNlIGFzIGFuIG9iamVjdCBvbiByZXNvbHZlLCBhcyBlcnJvciBjb2RlIHN0cmluZyBvbiByZWplY3QgKi9cbiAgX3Jlc29sdmVBcyh0eXBlLCByZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdyYXcnKSB7IC8vIFJhdyBhcmUgbWFkZSBpbiBYTUxIdHRwUmVxdWVzdCBhbmQgbmVlZCBzcGVjaWFsIGhhbmRsaW5nXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gSHR0cFN0YXR1c0NvZGUuT0spIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHRoaXMuX2dldEVycm9yQ29kZUZyb21IVFRQU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnanNvbicgfHwgdHlwZSA9PT0gJ3RleHQnKSB7IC8vIENhbGwgYXJlIG1hZGUgdXNpbmcgZmV0Y2ggQVBJXG4gICAgICAgICAgaWYgKHJlc3BvbnNlW3R5cGVdKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlW3R5cGVdKCkpO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIEZhbGxiYWNrIG9uIHN0YW5kYXJkIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICByZWplY3QodGhpcy5fZ2V0RXJyb3JDb2RlRnJvbUhUVFBTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBSZXNvbHV0aW9uIHR5cGUgZG9lc24ndCBleGlzdHNcbiAgICAgICAgICByZWplY3QoJ0ZfS09NX1VOU1VQUE9SVEVEX1RZUEUnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdGX0tPTV9NSVNTSU5HX0FSR1VNRU5UJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfcmVzb2x2ZUFzSlNPTlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IHB1YmxpYyBtZXRob2RzIG9uIGZldGNoIHJlc3BvbnNlcyB0byBmb3JtYXQgb3V0cHV0IGRhdGEgYXMgSlNPTiB0byBiZVxuICAgKiByZWFkIGluIEphdmFTY3JpcHQgY29kZSBhcyBvYmplY3RzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIC0gVGhlIDxjb2RlPmZldGNoPC9jb2RlPiByZXNwb25zZSBvYmplY3RcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+LCBmb3JtYXQgcmVzcG9uc2UgYXMgYW4gb2JqZWN0IG9uIHJlc29sdmUsIGFzIGVycm9yIGNvZGUgc3RyaW5nIG9uIHJlamVjdCAqL1xuICBfcmVzb2x2ZUFzSlNPTihyZXNwb25zZSkge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlQXMoJ2pzb24nLCByZXNwb25zZSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBfcmVzb2x2ZUFzVGV4dFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IHB1YmxpYyBtZXRob2RzIG9uIGZldGNoIHJlc3BvbnNlcyB0byBmb3JtYXQgb3V0cHV0IGRhdGEgYXMgdGV4dCB0byBiZVxuICAgKiByZWFkIGluIEphdmFTY3JpcHQgY29kZSBhcyBzdHJpbmcgKG1vc3RseSB0byBwYXJzZSBIVE1MIHRlbXBsYXRlcykuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgLSBUaGUgPGNvZGU+ZmV0Y2g8L2NvZGU+IHJlc3BvbnNlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4sIGZvcm1hdCByZXNwb25zZSBhcyBhIHN0cmluZyBvbiByZXNvbHZlLCBhcyBlcnJvciBjb2RlIHN0cmluZyBvbiByZWplY3QgKi9cbiAgX3Jlc29sdmVBc1RleHQocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFzKCd0ZXh0JywgcmVzcG9uc2UpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgX3Jlc29sdmVBc1Jhd1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Ub29sIG1ldGhvZCB1c2VkIGJ5IFhtbEhUVFBSZXF1ZXN0cyB0byBmb3JtYXQgc2VydmVyIHJlc3BvbnNlIGFzIHJhdyBiaW5hcnkgZGF0YS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSAtIFRoZSA8Y29kZT5YbWxIVFRQUmVxdWVzdDwvY29kZT4gcmVzcG9uc2Ugc3RhdHVzIG9iamVjdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4sIGRvZXNuJ3QgZm9ybWF0IHJlc3BvbnNlIG9uIHJlc29sdmUsIHNlbmQgZXJyb3IgY29kZSBzdHJpbmcgb24gcmVqZWN0ICovXG4gIF9yZXNvbHZlQXNSYXcocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFzKCdyYXcnLCByZXNwb25zZSk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgSFRUUCBTRVJWRVIgQ0FMTFMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgZ2V0XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+R0VUPC9jb2RlPiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIGZldGNoIEFQSS48YnI+PGNvZGU+cmVzb2x2ZTwvY29kZT4gcmV0dXJucyB0aGVcbiAgICogcmVzcG9uc2UgYXMgYW4gPGNvZGU+T2JqZWN0PC9jb2RlPi48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uXG4gICAqIEl0IGlzIG1lYW50IHRvIHBlcmZvcm0gQVBJIGNhbGwgdG8gYWNjZXNzIGRhdGFiYXNlIHRocm91Z2ggdGhlIHVzZXIgaW50ZXJmYWNlLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5HRVQ8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb20sIGluIHN1cHBvcnRlZCBiYWNrIFVSTHNcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIGdldCh1cmwsIHJlc29sdXRpb24gPSB0aGlzLl9yZXNvbHZlQXNKU09OLmJpbmQodGhpcykpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoW3RoaXMuX2hlYWRlcnNbMF1dKSAvLyBDb250ZW50IHR5cGUgdG8gSlNPTlxuICAgICAgfTtcblxuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNvbHV0aW9uKVxuICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIGdldFRleHRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgS29tXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5HRVQ8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj48Y29kZT5yZXNvbHZlPC9jb2RlPiByZXR1cm5zIHRoZVxuICAgKiByZXNwb25zZSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPGJyPjxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LiBJdCBpc1xuICAgKiBtZWFudCB0byBwZXJmb3JtIEFQSSBjYWxsIHRvIGdldCBIVE1MIHRlbXBsYXRlcyBhcyBzdHJpbmcgdG8gYmUgcGFyc2VkIGFzIGRvY3VtZW50cy9kb2N1bWVudHMgZnJhZ21lbnRzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5HRVQ8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb20sIGluIHN1cHBvcnRlZCBiYWNrIFVSTHNcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIGdldFRleHQodXJsKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHVybCwgdGhpcy5fcmVzb2x2ZUFzVGV4dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIGdldFJhd1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPkdFVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIGFuIDxjb2RlPlhNTEh0dHBSZXF1ZXN0PC9jb2RlPiwgd2l0aCBhbiBvdmVycmlkZVxuICAgKiBtaW1lIHR5cGUgaGFjayB0byBwYXNzIGJ5dGVzIHRocm91Z2ggdW5wcm9jZXNzZWQuPGJyPjxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIHJhdyBiaW5hcnkgZGF0YS48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPlxuICAgKiByZXR1cm5zIGFuIGVycm9yIGNvZGUgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSB1cmwgdG8gZmV0Y2ggcmF3IGRhdGEgZnJvbVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgZ2V0UmF3KHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkgeyAvLyBSZWFkeSBzdGF0ZSBjaGFuZ2VkIGhhcyByZWFjaCB0aGUgcmVzcG9uc2Ugc3RhdGVcbiAgICAgICAgICB0aGlzLl9yZXNvbHZlQXNSYXcocmVzcG9uc2UudGFyZ2V0KVxuICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHJlamVjdCgnRl9LT01fWEhSX0VSUk9SJylcbiAgICAgIH07XG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgcG9zdFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPlBPU1Q8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj5CZXdhcmUgdGhhdCB0aGUgZ2l2ZW4gb3B0aW9uc1xuICAgKiBvYmplY3QgbWF0Y2ggdGhlIHVybCBleHBlY3RhdGlvbnMuPGJyPjxjb2RlPnJlc29sdmU8L2NvZGU+XG4gICAqIHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGFuIDxjb2RlPk9iamVjdDwvY29kZT4uPGJyPjxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5QT1NUPC9jb2RlPiB1cmwgdG8gZmV0Y2ggZGF0YSBmcm9tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gVGhlIDxjb2RlPkpTT048L2NvZGU+IG9iamVjdCB0aGF0IGNvbnRhaW5zIDxjb2RlPlBPU1Q8L2NvZGU+IHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIHBvc3QodXJsLCBkYXRhLCByZXNvbHV0aW9uID0gdGhpcy5fcmVzb2x2ZUFzSlNPTi5iaW5kKHRoaXMpKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLl9oZWFkZXJzKSwgLy8gUE9TVCBuZWVkcyBhbGwgcHJldmlvdXNseSBkZWZpbmVkIGhlYWRlcnNcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgIH07XG5cbiAgICAgIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4ocmVzb2x1dGlvbilcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBwb3N0VGV4dFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBLb21cbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPlBPU1Q8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj5CZXdhcmUgdGhhdCB0aGUgZ2l2ZW4gb3B0aW9uc1xuICAgKiBvYmplY3QgbWF0Y2ggdGhlIHVybCBleHBlY3RhdGlvbnMuPGJyPjxjb2RlPnJlc29sdmU8L2NvZGU+XG4gICAqIHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48YnI+PGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPlBPU1Q8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb21cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgPGNvZGU+SlNPTjwvY29kZT4gb2JqZWN0IHRoYXQgY29udGFpbnMgPGNvZGU+UE9TVDwvY29kZT4gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgcG9zdFRleHQodXJsLCBkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCh1cmwsIGRhdGEsIHRoaXMuX3Jlc29sdmVBc1RleHQuYmluZCh0aGlzKSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBwb3N0UmF3XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEtvbVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+UE9TVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPkJld2FyZSB0aGF0IHRoZSBnaXZlbiBvcHRpb25zXG4gICAqIG9iamVjdCBtYXRjaCB0aGUgdXJsIGV4cGVjdGF0aW9ucy48YnI+PGNvZGU+cmVzb2x2ZTwvY29kZT4sIHdpdGggYW4gb3ZlcnJpZGVcbiAgICogbWltZSB0eXBlIGhhY2sgdG8gcGFzcyBieXRlcyB0aHJvdWdoIHVucHJvY2Vzc2VkLjxicj48Y29kZT5yZXNvbHZlPC9jb2RlPiByZXR1cm5zIHRoZSByZXNwb25zZSBhcyByYXcgYmluYXJ5IGRhdGEuPGJyPjxjb2RlPnJlamVjdDwvY29kZT5cbiAgICogcmV0dXJucyBhbiBlcnJvciBjb2RlIGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgdXJsIHRvIGZldGNoIHJhdyBkYXRhIGZyb21cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgPGNvZGU+SlNPTjwvY29kZT4gb2JqZWN0IHRoYXQgY29udGFpbnMgPGNvZGU+UE9TVDwvY29kZT4gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgcG9zdFJhdyh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TUkZUb2tlbicsIHRoaXMuX2NzcmZUb2tlbik7XG4gICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnRhcmdldC5yZWFkeVN0YXRlID09PSA0KSB7IC8vIFJlYWR5IHN0YXRlIGNoYW5nZWQgaGFzIHJlYWNoIHRoZSByZXNwb25zZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuX3Jlc29sdmVBc1JhdyhyZXNwb25zZS50YXJnZXQpXG4gICAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KCdGX0tPTV9YSFJfRVJST1InKVxuICAgICAgfTtcbiAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcG9zdEZvcm0odXJsLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIENyZWF0ZSB2aXJ0dWFsIGZvcm1cbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdGT1JNJyk7XG4gICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGZvcm0uYWN0aW9uID0gdXJsO1xuICAgICAgLy8gRGVjbGFyZSBpdHMgdmlydHVhbCBmaWVsZHMgZnJvbSBzZW50IGRhdGFcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IGhpZGRlbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcbiAgICAgICAgICBoaWRkZW5GaWVsZC50eXBlID0gJ2hpZGRlbic7XG4gICAgICAgICAgaGlkZGVuRmllbGQubmFtZSA9IGtleTtcbiAgICAgICAgICBoaWRkZW5GaWVsZC52YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGhpZGRlbkZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQnVpbGQgWEhSIHdpdGggeHNyZiB0b2tlblxuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignUE9TVCcsIHVybCk7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1YU1JGLVRPS0VOJywgdGhpcy5fY3NyZlRva2VuKTtcbiAgICAgIC8vIFJlZ2lzdGVyIHRoZSBzdGF0ZSBjaGFuZ2UgZXZlbnRcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkgeyAvLyBSZWFkeSBzdGF0ZSBjaGFuZ2VkIGhhcyByZWFjaCB0aGUgcmVzcG9uc2Ugc3RhdGVcbiAgICAgICAgICAvLyBBcyBzcGVjaWZpZWQgd2l0aCBiYWNrZW5kLCByZXNwb25zZSBpcyBKU09OIGlmIHN1Y2Nlc3MsIEhUTUwgb3RoZXJ3aXNlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElmIHdlIGNhbiBwYXJzZSBhcyBhIEpTT04sIGV2ZXJ5dGhpbmcgd2VudCBmaW5lIHNlcnZlciBzaWRlXG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnRhcmdldC5yZXNwb25zZSk7XG4gICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHRoZSBzZXJ2ZXIgcmV0dXJucyB0aGUgdGVtcGxhdGUgd2l0aCBpdHMgZXJyb3JzXG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2UudGFyZ2V0LnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICAvLyBYSFIgZXJyb3IgaGFuZGxpbmdcbiAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICByZWplY3QoJ0ZfS09NX1hIUl9FUlJPUicpXG4gICAgICB9O1xuICAgICAgLy8gQ3JlYXRlIGZvcm0gZGF0YSBhbmQgc2VuZCBpdCB0aHJvdWdoIHRoZSBYSFJcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEtvbTtcbiIsImltcG9ydCBVc2VySW50ZXJmYWNlIGZyb20gJy4uL3ZpZXcvVXNlckludGVyZmFjZSc7XG5pbXBvcnQgS29tIGZyb20gJy4vS29tJztcbid1c2Ugc3RyaWN0JztcblxuXG5jbGFzcyBNemsge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rb20gPSBudWxsO1xuICAgIHRoaXMudWkgPSBudWxsO1xuICB9XG5cblxuICBpbml0U2Vzc2lvbigpIHtcbiAgICB0aGlzLmtvbSA9IG5ldyBLb20oKTtcbiAgICB0aGlzLnVpID0gbmV3IFVzZXJJbnRlcmZhY2UoKTtcbiAgICB0aGlzLnVpLnN0b3BMb2FkaW5nKCk7XG4gIH1cblxuXG4gIHNldFZpZXcob3B0aW9ucykge1xuICAgIHRoaXMudWkuc2V0U2NlbmVWaWV3KG9wdGlvbnMpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3ZpZXcgaW5zdGFudGlhdGVkJyk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc2V0TW9kYWwob3B0aW9ucykge1xuICAgIHRoaXMudWkuc2V0TW9kYWwob3B0aW9ucykudGhlbigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnbW9kYWwgY3JlYXRlZCcpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuXG4gIGdldEZyYWdtZW50KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy51aS5nZXRGcmFnbWVudChvcHRpb25zKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZyYWdtZW50IGZldGNoZWQnKTtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNems7XG4iLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgQ3VzdG9tRXZlbnRzIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+SmF2YVNjcmlwdCByZWd1bGFyIGFuZCBjdXN0b20gZXZlbnRzIGFic3RyYWN0aW9uPC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIEN1c3RvbUV2ZW50cyBjbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvZiBKYXZhU2NyaXB0IGV2ZW50IGxpc3RlbmVyLCB0byBhbGxvd1xuICAgKiBlYXN5IGJpbmRpbmcgYW5kIHJlbW92aW5nIHRob3NlIGV2ZW50cy4gSXQgYWxzbyBwcm92aWRlcyBhbiBpbnRlcmZhY2UgdG8gcmVnaXN0ZXIgY3VzdG9tIGV2ZW50cy4gVGhpcyBjbGFzcyBpc1xuICAgKiBtZWFudCB0byBiZSB1c2VkIG9uIGFsbCBzY29wZXMgeW91IG5lZWQgOyBtb2R1bGUgb3IgZ2xvYmFsLiBSZWZlciB0byBlYWNoIHB1YmxpYyBtZXRob2QgZm9yIGRldGFpbGVkIGZlYXR1cmVzLlxuICAgKiBGb3Igc291cmNlIGNvZGUsIHBsZWFzZSBnbyB0byA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L0N1c3RvbUV2ZW50cy5qc1wiIGFsdD1cImN1c3RvbS1ldmVudHMtanNcIj5cbiAgICogaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L0N1c3RvbUV2ZW50cy5qczwvYT48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlYnVnPWZhbHNlXSAtIERlYnVnIGZsYWcgOyB3aGVuIHRydWUsIGxvZ3Mgd2lsbCBiZSBvdXRwdXQgaW4gSmF2YVNjcmlwdCBjb25zb2xlIGF0IGVhY2ggZXZlbnQgKi9cbiAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSkge1xuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgZGVidWdcbiAgICBpZiAodHlwZW9mIGRlYnVnICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIGRlYnVnID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gSW50ZXJuYWwgbG9nZ2luZyBmbGFnIGZyb20gY29uc3RydWN0b3Igb3B0aW9ucywgYWxsb3cgdG8gb3V0cHV0IGVhY2ggZXZlbnQgYWN0aW9uICovXG4gICAgdGhpcy5fZGVidWcgPSBkZWJ1ZztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gU3RhcnQgdGhlIElEIGluY3JlbWVudGVyIGF0IHBzZXVkbyByYW5kb20gdmFsdWUsIHVzZWQgZm9yIGJvdGggcmVndWxhciBhbmQgY3VzdG9tIGV2ZW50cyAqL1xuICAgIHRoaXMuX2lkSW5jcmVtZW50b3IgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigyNTYpKSAqIDU2NzgpO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge2FueVtdfSAtIFdlIHN0b3JlIGNsYXNzaWNhbCBldmVudCBsaXN0ZW5lcnMgaW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIGFsbCB0aGVpciBpbmZvcm1hdGlvbiAqL1xuICAgIHRoaXMuX3JlZ3VsYXJFdmVudHMgPSBbXTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gV2Ugc3RvcmUgY3VzdG9tIGV2ZW50cyBieSBuYW1lIGFzIGtleSwgZWFjaCBrZXkgc3RvcmVzIGFuIEFycmF5IG9mIHN1YnNjcmliZWQgZXZlbnRzICovXG4gICAgdGhpcy5fY3VzdG9tRXZlbnRzID0ge307XG4gICAgLyoqIEBwdWJsaWNcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQ29tcG9uZW50IHZlcnNpb24gKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnMS4xLjAnO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+Q3VzdG9tRXZlbnRzIGRlc3RydWN0b3IuIFdpbGwgcmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGtleXMgaW4gaW5zdGFuY2UuPC9ibG9ja3F1b3RlPiAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0N1c3RvbUV2ZW50cy5kZXN0cm95Jyk7XG4gICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBldmVudExpc3RlbmVyXG4gICAgdGhpcy5yZW1vdmVBbGxFdmVudHMoKTtcbiAgICAvLyBEZWxldGUgb2JqZWN0IGF0dHJpYnV0ZXNcbiAgICBPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgQ0xBU1NJQyBKUyBFVkVOVFMgT1ZFUlJJREUgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIGZvbGxvd2luZyBtZXRob2RzIGFyZSBtYWRlIHRvIGFic3RyYWN0IHRoZSBldmVudCBsaXN0ZW5lcnMgZnJvbSB0aGUgSmF2YVNjcmlwdCBsYXllciwgc28geW91IGNhbiBlYXNpbHkgICAgICovXG4gIC8qICByZW1vdmUgdGhlbSB3aGVuIGRvbmUgdXNpbmcsIHdpdGhvdXQgYm90aGVyaW5nIHdpdGggYmluZGluZyB1c3VhbCBidXNpbmVzcyBmb3IgdGhlbS4gJ2FkZEV2ZW50L3JlbW92ZUV2ZW50JyAgICAgKi9cbiAgLyogIG1ldGhvZCByZXBsYWNlIHRoZSBpbml0aWFsIG9uZXMuICdyZW1vdmVBbGxFdmVudHMnIGNsZWFycyBhbGwgaW5zdGFuY2UgZXZlbnQgbGlzdGVuZXJzIDsgbmljZSBmb3IgZGVzdHJveSAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGRFdmVudFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPmFkZEV2ZW50PC9jb2RlPiBtZXRob2QgYWJzdHJhY3RzIHRoZSA8Y29kZT5hZGRFdmVudExpc3RlbmVyPC9jb2RlPiBtZXRob2QgdG8gZWFzaWx5XG4gICAqIHJlbW92ZSBpdCB3aGVuIG5lZWRlZCwgYWxzbyB0byBzZXQgYSBjdXN0b20gc2NvcGUgb24gY2FsbGJhY2suPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gVGhlIGV2ZW50IG5hbWUgdG8gZmlyZSAobW91c2Vtb3ZlLCBjbGljaywgY29udGV4dCBldGMuKVxuICAgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCAtIFRoZSBET00gZWxlbWVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBldmVudCBpcyByZWFsaXNlZFxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlPWVsZW1lbnRdIC0gVGhlIGV2ZW50IHNjb3BlIHRvIGFwcGx5IHRvIHRoZSBjYWxsYmFjayAob3B0aW9uYWwsIGRlZmF1bHQgdG8gRE9NIGVsZW1lbnQpXG4gICAqIEBwYXJhbSB7b2JqZWN0fGJvb2xlYW59IFtvcHRpb25zPWZhbHNlXSAtIFRoZSBldmVudCBvcHRpb25zICh1c2VDYXB0dXJlIGFuZCBlbHNlKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfGJvb2xlYW59IC0gVGhlIGV2ZW50IElEIHRvIHVzZSB0byBtYW51YWxseSByZW1vdmUgYW4gZXZlbnQsIGZhbHNlIGlmIGFyZ3VtZW50cyBhcmUgaW52YWxpZCAqL1xuICBhZGRFdmVudChldmVudE5hbWUsIGVsZW1lbnQsIGNhbGxiYWNrLCBzY29wZSA9IGVsZW1lbnQsIG9wdGlvbnMgPSBmYWxzZSkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEN1c3RvbUV2ZW50cy5hZGRFdmVudDogJHtldmVudE5hbWV9ICR7ZWxlbWVudH0gJHtjYWxsYmFja30gJHtzY29wZX0gJHtvcHRpb25zfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudE5hbWUgPT09IG51bGwgfHwgZXZlbnROYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLmFkZEV2ZW50OiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgY29uc3QgZXJyID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5hZGRFdmVudDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICB9O1xuICAgIC8vIFRlc3QgYXJndW1lbnQgdmFsaWRpdHkgZm9yIGZ1cnRoZXIgcHJvY2Vzc1xuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKChzY29wZSAhPT0gbnVsbCAmJiBzY29wZSAhPT0gdW5kZWZpbmVkKSAmJiB0eXBlb2Ygc2NvcGUgIT09ICdvYmplY3QnKSB7XG4gICAgICBlcnIoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHVuZGVmaW5lZCkgJiYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Jvb2xlYW4nKSkge1xuICAgICAgZXJyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFNhdmUgc2NvcGUgdG8gY2FsbGJhY2sgZnVuY3Rpb24sIGRlZmF1bHQgc2NvcGUgaXMgRE9NIHRhcmdldCBvYmplY3RcbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrLmJpbmQoc2NvcGUpO1xuICAgIC8vIEFkZCBldmVudCB0byBpbnRlcm5hbCBhcnJheSBhbmQga2VlcCBhbGwgaXRzIGRhdGFcbiAgICB0aGlzLl9yZWd1bGFyRXZlbnRzLnB1c2goe1xuICAgICAgaWQ6IHRoaXMuX2lkSW5jcmVtZW50b3IsXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHdpdGggb3B0aW9uc1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAvLyBQb3N0IGluY3JlbWVudCB0byByZXR1cm4gdGhlIHRydWUgZXZlbnQgZW50cnkgaWQsIHRoZW4gdXBkYXRlIHRoZSBpbmNyZW1lbnRlclxuICAgIHJldHVybiB0aGlzLl9pZEluY3JlbWVudG9yKys7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbW92ZUV2ZW50XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+cmVtb3ZlRXZlbnQ8L2NvZGU+IG1ldGhvZCBhYnN0cmFjdHMgdGhlIDxjb2RlPnJlbW92ZUV2ZW50TGlzdGVuZXI8L2NvZGU+IG1ldGhvZCB0b1xuICAgKiByZWFsbHkgcmVtb3ZlIGV2ZW50IGxpc3RlbmVycy48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBldmVudElkIC0gVGhlIGV2ZW50IElEIHRvIHJlbW92ZSBsaXN0ZW5lciBmcm9tLiBSZXR1cm5lZCB3aGVuIGFkZEV2ZW50IGlzIGNhbGxlZFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3RpbmcgZXZlbnQgKi9cbiAgcmVtb3ZlRXZlbnQoZXZlbnRJZCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEV2ZW50cy5yZW1vdmVFdmVudDogJHtldmVudElkfWApO1xuICAgIC8vIE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50c1xuICAgIGlmIChldmVudElkID09PSBudWxsIHx8IGV2ZW50SWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5yZW1vdmVFdmVudDogTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkpXG4gICAgaWYgKHR5cGVvZiBldmVudElkICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5yZW1vdmVFdmVudDogV3JvbmcgdHlwZSBmb3IgYXJndW1lbnQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgdmFsdWVcbiAgICBsZXQgc3RhdHVzQ29kZSA9IGZhbHNlOyAvLyBOb3QgZm91bmQgc3RhdHVzIGNvZGUgYnkgZGVmYXVsdCAoZmFsc2UpXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHNhdmVkIGxpc3RlbmVycywgcmV2ZXJzZSBvcmRlciBmb3IgcHJvcGVyIHNwbGljaW5nXG4gICAgZm9yIChsZXQgaSA9ICh0aGlzLl9yZWd1bGFyRXZlbnRzLmxlbmd0aCAtIDEpOyBpID49IDAgOyAtLWkpIHtcbiAgICAgIC8vIElmIGFuIGV2ZW50IElEIG1hdGNoIGluIHNhdmVkIG9uZXMsIHdlIHJlbW92ZSBpdCBhbmQgdXBkYXRlIHNhdmVkIGxpc3RlbmVyc1xuICAgICAgaWYgKHRoaXMuX3JlZ3VsYXJFdmVudHNbaV0uaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgcmVtb3ZlZCBldmVudCBsaXN0ZW5lciBzdGF0dXMgY29kZSAodHJ1ZSlcbiAgICAgICAgdGhpcy5fY2xlYXJSZWd1bGFyRXZlbnQoaSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB3aXRoIHN0YXR1cyBjb2RlXG4gICAgcmV0dXJuIHN0YXR1c0NvZGU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbW92ZUFsbEV2ZW50c1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkNsZWFyIGFsbCBldmVudCBsaXN0ZW5lciByZWdpc3RlcmVkIHRocm91Z2ggdGhpcyBjbGFzcyBvYmplY3QuPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub3QgcmVtb3ZlZCBhbnkgZXZlbnQgKi9cbiAgcmVtb3ZlQWxsRXZlbnRzKCkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgJ0N1c3RvbUV2ZW50cy5yZW1vdmVBbGxFdmVudHMnKTtcbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIERpZG4ndCByZW1vdmVkIGFueSBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBGbGFnIHRvIGtub3cgaWYgdGhlcmUgd2FzIGFueSBwcmV2aW91c2x5IHN0b3JlZCBldmVudCBsaXN0ZW5lcnNcbiAgICBjb25zdCBoYWRFdmVudHMgPSAodGhpcy5fcmVndWxhckV2ZW50cy5sZW5ndGggPiAwKTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgc2F2ZWQgbGlzdGVuZXJzLCByZXZlcnNlIG9yZGVyIGZvciBwcm9wZXIgc3BsaWNpbmdcbiAgICBmb3IgKGxldCBpID0gKHRoaXMuX3JlZ3VsYXJFdmVudHMubGVuZ3RoIC0gMSk7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0aGlzLl9jbGVhclJlZ3VsYXJFdmVudChpKTtcbiAgICB9XG4gICAgLy8gSWYgYWxsIGV2ZW50cyB3aGVyZSByZW1vdmVkLCB1cGRhdGUgc3RhdHVzQ29kZSB0byBzdWNjZXNzXG4gICAgaWYgKHRoaXMuX3JlZ3VsYXJFdmVudHMubGVuZ3RoID09PSAwICYmIGhhZEV2ZW50cykge1xuICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICBzdGF0dXNDb2RlID0gdHJ1ZTsgLy8gRm91bmQgYW5kIHJlbW92ZWQgYWxsIGV2ZW50cyBsaXN0ZW5lciBzdGF0dXMgY29kZSAodHJ1ZSlcbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NsZWFyUmVndWxhckV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPl9jbGVhclJlZ3VsYXJFdmVudDwvY29kZT4gbWV0aG9kIHJlbW92ZSB0aGUgc2F2ZWQgZXZlbnQgbGlzdGVuZXIgZm9yIGFcbiAgICogZ2l2ZW4gaW5kZXggaW4gcmVndWxhckV2ZW50cyBhcnJheSByYW5nZS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSByZWd1bGFyIGV2ZW50IGluZGV4IHRvIHJlbW92ZSBmcm9tIGNsYXNzIGF0dHJpYnV0ZXNcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub3QgY2xlYXJlZCBhbnkgZXZlbnQgKi9cbiAgX2NsZWFyUmVndWxhckV2ZW50KGluZGV4KSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLl9jbGVhclJlZ3VsYXJFdmVudDogJHtpbmRleH1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoaW5kZXggPT09IG51bGwgfHwgaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5fY2xlYXJSZWd1bGFyRXZlbnQ6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkpXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMuX2NsZWFyUmVndWxhckV2ZW50OiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBpZiBpbmRleCBtYXRjaCBhbiBleGlzdGluZyBldmVudCBpbiBhdHRyaWJ1dGVzXG4gICAgaWYgKHRoaXMuX3JlZ3VsYXJFdmVudHNbaW5kZXhdKSB7XG4gICAgICAvLyBSZW1vdmUgaXRzIGV2ZW50IGxpc3RlbmVyIGFuZCB1cGRhdGUgcmVndWxhckV2ZW50cyBhcnJheVxuICAgICAgY29uc3QgZXZ0ID0gdGhpcy5fcmVndWxhckV2ZW50c1tpbmRleF07XG4gICAgICBldnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dC5ldmVudE5hbWUsIGV2dC5jYWxsYmFjaywgZXZ0Lm9wdGlvbnMpO1xuICAgICAgdGhpcy5fcmVndWxhckV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDVVNUT00gSlMgRVZFTlRTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIHRocmVlIGZvbGxvd2luZyBtZXRob2RzIChzdWJzY3JpYmUsIHVuc3Vic2NyaWJlLCBwdWJsaXNoKSBhcmUgZGVzaWduZWQgdG8gcmVmZXJlbmNlIGFuIGV2ZW50IGJ5IGl0cyBuYW1lICAgICovXG4gIC8qICBhbmQgaGFuZGxlIGFzIG1hbnkgc3Vic2NyaXB0aW9ucyBhcyB5b3Ugd2FudC4gV2hlbiBzdWJzY3JpYmluZywgeW91IGdldCBhbiBJRCB5b3UgY2FuIHVzZSB0byB1bnN1YnNjcmliZSB5b3VyICAgKi9cbiAgLyogIGV2ZW50IGxhdGVyLiBKdXN0IHB1Ymxpc2ggd2l0aCB0aGUgZXZlbnQgbmFtZSB0byBjYWxsYmFjayBhbGwgaXRzIHJlZ2lzdGVyZWQgc3Vic2NyaXB0aW9ucy4gICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBzdWJzY3JpYmVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5TdWJzY3JpYmUgbWV0aG9kIGFsbG93IHlvdSB0byBsaXN0ZW4gdG8gYW4gZXZlbnQgYW5kIHJlYWN0IHdoZW4gaXQgb2NjdXJzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIEV2ZW50IG5hbWUgKHRoZSBvbmUgdG8gdXNlIHRvIHB1Ymxpc2gpXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBldmVudCBpcyBwdWJsaXNoZWRcbiAgICogQHBhcmFtIHtib29sZWFufSBbb25lU2hvdD1mYWxzZV0gLSBPbmUgc2hvdCA6IHRvIHJlbW92ZSBzdWJzY3JpcHRpb24gdGhlIGZpcnN0IHRpbWUgY2FsbGJhY2sgaXMgZmlyZWRcbiAgICogQHJldHVybnMge251bWJlcnxib29sZWFufSAtIFRoZSBldmVudCBpZCwgdG8gYmUgdXNlZCB3aGVuIG1hbnVhbGx5IHVuc3Vic2NyaWJpbmcgKi9cbiAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9uZVNob3QgPSBmYWxzZSkge1xuICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEN1c3RvbUV2ZW50cy5zdWJzY3JpYmU6ICR7ZXZlbnROYW1lfSAke2NhbGxiYWNrfSAke29uZVNob3R9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gbnVsbCB8fCBldmVudE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmFpc2UoJ2Vycm9yJywgJ0N1c3RvbUV2ZW50cy5zdWJzY3JpYmUnLCAnTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFByZXZlbnQgd3JvbmcgdHlwZSBmb3IgYXJndW1lbnRzIChtYW5kYXRvcnkgYW5kIG9wdGlvbmFsKVxuICAgIGNvbnN0IGVyciA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3JhaXNlKCdlcnJvcicsICdDdXN0b21FdmVudHMuc3Vic2NyaWJlOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgIH07XG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICgob25lU2hvdCAhPT0gbnVsbCAmJiBvbmVTaG90ICE9PSB1bmRlZmluZWQpICYmIHR5cGVvZiBvbmVTaG90ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIGVycigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgZXZlbnQgZW50cnkgaWYgbm90IGFscmVhZHkgZXhpc3RpbmcgaW4gdGhlIHJlZ2lzdGVyZWQgZXZlbnRzXG4gICAgaWYgKCF0aGlzLl9jdXN0b21FdmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5fY3VzdG9tRXZlbnRzW2V2ZW50TmFtZV0gPSBbXTsgLy8gU2V0IGVtcHR5IGFycmF5IGZvciBuZXcgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgIH1cbiAgICAvLyBQdXNoIG5ldyBzdWJzY3JpcHRpb24gZm9yIGV2ZW50IG5hbWVcbiAgICB0aGlzLl9jdXN0b21FdmVudHNbZXZlbnROYW1lXS5wdXNoKHtcbiAgICAgIGlkOiB0aGlzLl9pZEluY3JlbWVudG9yLFxuICAgICAgbmFtZTogZXZlbnROYW1lLFxuICAgICAgb3M6IG9uZVNob3QsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcbiAgICAvLyBQb3N0IGluY3JlbWVudCB0byByZXR1cm4gdGhlIHRydWUgZXZlbnQgZW50cnkgaWQsIHRoZW4gdXBkYXRlIHRoZSBpbmNyZW1lbnRlclxuICAgIHJldHVybiB0aGlzLl9pZEluY3JlbWVudG9yKys7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVuc3Vic2NyaWJlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VW5zdWJzY3JpYmUgbWV0aG9kIGFsbG93IHlvdSB0byByZXZva2UgYW4gZXZlbnQgc3Vic2NyaXB0aW9uIGZyb20gaXRzIHN0cmluZyBuYW1lLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGV2ZW50SWQgLSBUaGUgc3Vic2NyaXB0aW9uIGlkIHJldHVybmVkIHdoZW4gc3Vic2NyaWJpbmcgdG8gYW4gZXZlbnQgbmFtZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgbWV0aG9kIHN0YXR1cyA7IHRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBub24tZXhpc3Rpbmcgc3Vic2NyaXB0aW9uICoqL1xuICB1bnN1YnNjcmliZShldmVudElkKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlOiAke2V2ZW50SWR9YCk7XG4gICAgLy8gTWlzc2luZyBtYW5kYXRvcnkgYXJndW1lbnRzXG4gICAgaWYgKGV2ZW50SWQgPT09IG51bGwgfHwgZXZlbnRJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlOiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSlcbiAgICBpZiAodHlwZW9mIGV2ZW50SWQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBTYXZlIGV2ZW50IGtleXMgdG8gaXRlcmF0ZSBwcm9wZXJseSBvbiB0aGlzLl9ldmVudHMgT2JqZWN0XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1c3RvbUV2ZW50cyk7XG4gICAgLy8gUmV2ZXJzZSBldmVudHMgaXRlcmF0aW9uIHRvIHByb3Blcmx5IHNwbGljZSB3aXRob3V0IG1lc3Npbmcgd2l0aCBpdGVyYXRpb24gb3JkZXJcbiAgICBmb3IgKGxldCBpID0gKGtleXMubGVuZ3RoIC0gMSk7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAvLyBHZXQgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgICAgY29uc3Qgc3VicyA9IHRoaXMuX2N1c3RvbUV2ZW50c1trZXlzW2ldXTtcbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVudHMgc3Vic2NyaXB0aW9ucyB0byBmaW5kIHRoZSBvbmUgd2l0aCBnaXZlbiBpZFxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdWJzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIC8vIEluIGNhc2Ugd2UgZ290IGEgc3Vic2NyaXB0aW9uIGZvciB0aGlzIGV2ZW50c1xuICAgICAgICBpZiAoc3Vic1tqXS5pZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgIC8vIERlYnVnIGxvZ2dpbmdcbiAgICAgICAgICB0aGlzLl9yYWlzZSgnbG9nJywgYEN1c3RvbUV2ZW50cy51bnN1YnNjcmliZTogc3Vic2NyaXB0aW9uIGZvdW5kXFxuYCwgc3Vic1tqXSwgYFxcblN1YnNjcmlwdGlvbiBuwrAke2V2ZW50SWR9IGZvciAke3N1YnMubmFtZX0gaGFzIGJlZW4gcmVtb3ZlZGApO1xuICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0dXMgY29kZVxuICAgICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgdW5zdWJzY3JpYmVkIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICAgIC8vIFJlbW92ZSBzdWJzY3JpcHRpb24gZnJvbSBldmVudCBBcnJheVxuICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBuYW1lIGlmIG5vIHJlbWFpbmluZyBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBCcmVhayBzaW5jZSBpZCBhcmUgdW5pcXVlIGFuZCBubyBvdGhlciBzdWJzY3JpcHRpb24gY2FuIGJlIGZvdW5kIGFmdGVyXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHdpdGggc3RhdHVzIGNvZGVcbiAgICByZXR1cm4gc3RhdHVzQ29kZTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgdW5zdWJzY3JpYmVBbGxGb3JcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRXZlbnRzXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT51bnN1YnNjcmliZUFsbEZvcjwvY29kZT4gbWV0aG9kIGNsZWFyIGFsbCBzdWJzY3JpcHRpb25zIHJlZ2lzdGVyZWQgZm9yIGdpdmVuIGV2ZW50IG5hbWUuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gVGhlIGV2ZW50IHRvIGNsZWFyIHN1YnNjcmlwdGlvbiBmcm9tXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRoZSBtZXRob2Qgc3RhdHVzIDsgdHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIG5vbi1leGlzdGluZyBldmVudCAqKi9cbiAgdW5zdWJzY3JpYmVBbGxGb3IoZXZlbnROYW1lKSB7XG4gICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgIHRoaXMuX3JhaXNlKCdsb2cnLCBgQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlQWxsRm9yOiAke2V2ZW50TmFtZX1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlQWxsRm9yOiBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHMnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMgKG1hbmRhdG9yeSBhbmQgb3B0aW9uYWwpXG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnVuc3Vic2NyaWJlQWxsRm9yOiBXcm9uZyB0eXBlIGZvciBhcmd1bWVudCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5lZCB2YWx1ZVxuICAgIGxldCBzdGF0dXNDb2RlID0gZmFsc2U7IC8vIE5vdCBmb3VuZCBzdGF0dXMgY29kZSBieSBkZWZhdWx0IChmYWxzZSlcbiAgICAvLyBTYXZlIGV2ZW50IGtleXMgdG8gaXRlcmF0ZSBwcm9wZXJseSBvbiB0aGlzLl9ldmVudHMgT2JqZWN0XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX2N1c3RvbUV2ZW50cyk7XG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGN1c3RvbSBldmVudCBrZXlzIHRvIGZpbmQgbWF0Y2hpbmcgZXZlbnQgdG8gcmVtb3ZlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoa2V5c1tpXSA9PT0gZXZlbnROYW1lKSB7XG4gICAgICAgIC8vIEdldCBldmVudCBzdWJzY3JpcHRpb25zXG4gICAgICAgIGNvbnN0IHN1YnMgPSB0aGlzLl9jdXN0b21FdmVudHNba2V5c1tpXV07XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVudHMgc3Vic2NyaXB0aW9ucyB0byBmaW5kIHRoZSBvbmUgd2l0aCBnaXZlbiBpZCwgcmV2ZXJzZSBpdGVyYXRpb24gdG8gcHJvcGVybHkgc3BsaWNlIHdpdGhvdXQgbWVzc2luZyB3aXRoIGl0ZXJhdGlvbiBvcmRlclxuICAgICAgICBmb3IgKGxldCBqID0gKHN1YnMubGVuZ3RoIC0gMSk7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgICAgc3RhdHVzQ29kZSA9IHRydWU7IC8vIEZvdW5kIGFuZCB1bnN1YnNjcmliZWQgYWxsIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICAgIC8vIFJlbW92ZSBzdWJzY3JpcHRpb24gZnJvbSBldmVudCBBcnJheVxuICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBldmVudCBuYW1lIGlmIG5vIHJlbWFpbmluZyBzdWJzY3JpcHRpb25zXG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBwdWJsaXNoXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEN1c3RvbUV2ZW50c1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+UHVibGlzaDwvY29kZT4gbWV0aG9kIGFsbG93IHlvdSB0byBmaXJlIGFuIGV2ZW50IGJ5IG5hbWUgYW5kIHRyaWdnZXIgYWxsIGl0cyBzdWJzY3JpcHRpb24gYnkgY2FsbGJhY2tzLi9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gRXZlbnQgbmFtZSAodGhlIG9uZSB0byB1c2UgdG8gcHVibGlzaClcbiAgICogQHBhcmFtIHtvYmplY3R9IFtkYXRhPXVuZGVmaW5lZF0gLSBUaGUgZGF0YSBvYmplY3QgdG8gc2VudCB0aHJvdWdoIHRoZSBjdXN0b20gZXZlbnRcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIG1ldGhvZCBzdGF0dXMgOyB0cnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3Igbm9uLWV4aXN0aW5nIGV2ZW50ICoqL1xuICBwdWJsaXNoKGV2ZW50TmFtZSwgZGF0YSA9IG51bGwpIHtcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBDdXN0b21FdmVudHMucHVibGlzaDogJHtldmVudE5hbWV9ICR7ZGF0YX1gKTtcbiAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICBpZiAoZXZlbnROYW1lID09PSBudWxsIHx8IGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnB1Ymxpc2g6IE1pc3NpbmcgbWFuZGF0b3J5IGFyZ3VtZW50cycpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBQcmV2ZW50IHdyb25nIHR5cGUgZm9yIGFyZ3VtZW50cyAobWFuZGF0b3J5IGFuZCBvcHRpb25hbClcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gJ3N0cmluZycgfHwgKGRhdGEgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpKSB7XG4gICAgICB0aGlzLl9yYWlzZSgnZXJyb3InLCAnQ3VzdG9tRXZlbnRzLnB1Ymxpc2g6IFdyb25nIHR5cGUgZm9yIGFyZ3VtZW50Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybmVkIHZhbHVlXG4gICAgbGV0IHN0YXR1c0NvZGUgPSBmYWxzZTsgLy8gTm90IGZvdW5kIHN0YXR1cyBjb2RlIGJ5IGRlZmF1bHQgKGZhbHNlKVxuICAgIC8vIFNhdmUgZXZlbnQga2V5cyB0byBpdGVyYXRlIHByb3Blcmx5IG9uIHRoaXMuX2V2ZW50cyBPYmplY3RcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fY3VzdG9tRXZlbnRzKTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgc2F2ZWQgY3VzdG9tIGV2ZW50c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgLy8gSWYgcHVibGlzaGVkIG5hbWUgbWF0Y2ggYW4gZXhpc3RpbmcgZXZlbnRzLCB3ZSBpdGVyYXRlIGl0cyBzdWJzY3JpcHRpb25zLiBGaXJzdCBzdWJzY3JpYmVkLCBmaXJzdCBzZXJ2ZWRcbiAgICAgIGlmIChrZXlzW2ldID09PSBldmVudE5hbWUpIHtcbiAgICAgICAgLy8gVXBkYXRlIHN0YXR1cyBjb2RlXG4gICAgICAgIHN0YXR1c0NvZGUgPSB0cnVlOyAvLyBGb3VuZCBhbmQgcHVibGlzaGVkIHN0YXR1cyBjb2RlICh0cnVlKVxuICAgICAgICAvLyBHZXQgZXZlbnQgc3Vic2NyaXB0aW9uc1xuICAgICAgICBjb25zdCBzdWJzID0gdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlbnRzIHN1YnNjcmlwdGlvbnMgdG8gZmluZCB0aGUgb25lIHdpdGggZ2l2ZW4gaWRcbiAgICAgICAgLy8gUmV2ZXJzZSBzdWJzY3JpcHRpb25zIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBzcGxpY2Ugd2l0aG91dCBtZXNzaW5nIHdpdGggaXRlcmF0aW9uIG9yZGVyXG4gICAgICAgIGZvciAobGV0IGogPSAoc3Vicy5sZW5ndGggLSAxKTsgaiA+PSAwOyAtLWopIHtcbiAgICAgICAgICAvLyBEZWJ1ZyBsb2dnaW5nXG4gICAgICAgICAgdGhpcy5fcmFpc2UoJ2xvZycsIGBDdXN0b21FdmVudHMucHVibGlzaDogZmlyZSBjYWxsYmFjayBmb3IgJHtldmVudE5hbWV9LCBzdWJzY3JpcHRpb24gbsKwJHtzdWJzW2pdLmlkfWAsIHN1YnNbal0pO1xuICAgICAgICAgIC8vIEZpcmUgc2F2ZWQgY2FsbGJhY2tcbiAgICAgICAgICBzdWJzW2pdLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgIC8vIFJlbW92ZSBvbmVTaG90IGxpc3RlbmVyIGZyb20gZXZlbnQgZW50cnlcbiAgICAgICAgICBpZiAoc3Vic1tqXS5vcykge1xuICAgICAgICAgICAgLy8gRGVidWcgbG9nZ2luZ1xuICAgICAgICAgICAgdGhpcy5fcmFpc2UoJ2xvZycsICdDdXN0b21FdmVudHMucHVibGlzaDogcmVtb3ZlIHN1YnNjcmlwdGlvbiBiZWNhdXNlIG9uZSBzaG90IHVzYWdlIGlzIGRvbmUnKTtcbiAgICAgICAgICAgIHN1YnMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IG5hbWUgaWYgbm8gcmVtYWluaW5nIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY3VzdG9tRXZlbnRzW2tleXNbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gd2l0aCBzdGF0dXMgY29kZVxuICAgIHJldHVybiBzdGF0dXNDb2RlO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgQ09NUE9ORU5UIFVUSUxTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3JhaXNlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBDdXN0b21FdmVudHNcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkludGVybmFsIG1ldGhvZCB0byBhYnN0cmFjdCBjb25zb2xlIHdyYXBwZWQgaW4gZGVidWcgZmxhZy4vYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGxldmVsIC0gVGhlIGNvbnNvbGUgbWV0aG9kIHRvIGNhbGxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yVmFsdWUgLSBUaGUgZXJyb3IgdmFsdWUgdG8gZGlzcGxheSBpbiBjb25zb2xlIG1ldGhvZCAqKi9cbiAgX3JhaXNlKGxldmVsLCBlcnJvclZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgICBjb25zb2xlW2xldmVsXShlcnJvclZhbHVlKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tRXZlbnRzO1xuIiwiY2xhc3MgRHJhZ0VsZW1lbnQge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5NYWtlIGFueSBET00gZWxlbWVudCBkcmFnZ2FibGU8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBjbGFzcyB3aWxsIG1ha2UgYW55IERPTSBlbGVtZW50IGRyYWdnYWJsZSwgYW5kIGF0dGFjaCBzcGVjaWZpYyBkYXRhIG9uIGl0IHRoYXQgY2FuIGJlXG4gICAqIHVzZWQgb24gZHJvcCAoc2VlIERyb3BFbGVtZW50IGNsYXNzKS4gSXQgaGFuZGxlIGJvdGggdGhlIGRlc2t0b3AgYW5kIHRoZSBtb2JpbGUgYmVoYXZpb3IuIEl0IG11c3QgYmUgdXNlZCB3aXRoIGFcbiAgICogRHJvcEVsZW1lbnQgY2xhc3MgZm9yIHBlcmZlY3QgY29tcGF0aWJpbGl0eSE8L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGVsZW1lbnQgdG8gZHJhZyBvcHRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnRhcmdldCAtIFRoZSBlbGVtZW50IHRvIG1ha2UgZHJhZ2dhYmxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmRhdGEgLSBUaGUgZGF0YSB0byBhdHRhY2ggdG8gdGhlIGRyYWcgZXZlbnQsIHRoYXQgd2lsbCBiZSByZXRyaWV2ZWQgb24gZHJvcCAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgZWxlbWVudCB0byBtYWtlIGRyYWdnYWJsZSAqL1xuICAgIHRoaXMuX3RhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgZGF0YSB0byBhdHRhY2hlZCAqL1xuICAgIHRoaXMuX2RhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyW119IC0gVGhlIGV2ZW50IElEcyBmb3IgYWxsIG1vYmlsZSBhbmQgZGVza3RvcCBkcmFnZ2luZyBldmVudHMgKi9cbiAgICB0aGlzLl9ldmVudElkcyA9IFtdO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gQSBmbGFnIHRvIGtub3cgaWYgZHJhZ2dpbmcgaXMgb2NjdXJyaW5nIGluIG1vYmlsZSAqL1xuICAgIHRoaXMuX3RvdWNoU3RhcnRlZCA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgdGFyZ2V0IERPTSBjb3B5IGZvciBhIHByb3BlciBkcmFnIGFuaW1hdGlvbiBpbiBtb2JpbGUgKi9cbiAgICB0aGlzLl90b3VjaFBoYW50b21Eb20gPSBudWxsO1xuICAgIC8vIEJ1aWxkIERPTSBlbGVtZW50cyBhbmQgc3Vic2NyaWJlIHRvIGRyYWcgZXZlbnRzXG4gICAgdGhpcy5fYnVpbGRFbGVtZW50cygpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIERyYWdFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHVuc3Vic2NyaWJlIGFsbCBkcmFnIGV2ZW50cyBhbmQgcmVtb3ZlIGFsbCBwcm9wZXJ0aWVzLjwvYmxvY2txdW90ZT4gKiovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ldmVudElkcy5sZW5ndGg7ICsraSkge1xuICAgICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2V2ZW50SWRzW2ldKTtcbiAgICB9XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBEUkFHRUxFTUVOVCBJTlNUQU5USUFUSU9OIFNFUVVFTkNFICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9idWlsZEVsZW1lbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcmFnRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBtYWtlIHRoZSB0YXJnZXQgZWxlbWVudCBkcmFnZ2FibGUgYWRkaW5nIHRoZSBwcm9wZXIgYXR0cmlidXRlLiBJdCB3aWxsXG4gICAqIGFsc28gY3JlYXRlIGEgY29weSBvZiB0aGUgZHJhZ2dhYmxlIERPTSBlbGVtZW50IGFuZCBzZXQgaXRzIHN0eWxlIHdpdGggYSBmaXhlZCBwb3NpdGlvbiBhbmQgaGFsZiBpdHMgb3BhY2l0eSB0b1xuICAgKiBlbXVsYXRlIHRoZSBkZXNrdG9wIGRyYWcgYW5pbWF0aW9uIGluIG1vYmlsZS48L2Jsb2NrcXVvdGU+ICoqL1xuICBfYnVpbGRFbGVtZW50cygpIHtcbiAgICB0aGlzLl90b3VjaFBoYW50b21Eb20gPSB0aGlzLl90YXJnZXQuY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLm9wYWNpdHkgPSAnLjUnO1xuICAgIHRoaXMuX3RhcmdldC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyYWdFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHN1YnNjcmliZSB0byBkcmFnIGV2ZW50cywgYm90aCBmb3IgZGVza3RvcCBhbmQgbW9iaWxlLjwvYmxvY2txdW90ZT4gKiovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ2RyYWdzdGFydCcsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ1N0YXJ0LCB0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ3RvdWNoc3RhcnQnLCB0aGlzLl90YXJnZXQsIHRoaXMuX2RyYWdTdGFydCwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCd0b3VjaG1vdmUnLCB0aGlzLl90YXJnZXQsIHRoaXMuX2RyYWdUb3VjaE1vdmUsIHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgndG91Y2hlbmQnLCB0aGlzLl90YXJnZXQsIHRoaXMuX2RyYWdUb3VjaEVuZCwgdGhpcykpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PQklMRSBBTkQgREVTS1RPUCBEUkFHIEVWRU5UUyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdTdGFydFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJhZ0VsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBkZXNrdG9wIGRyYWcgc3RhcnQgZXZlbnQgYnkgYXR0YWNoaW5nIHRoZSBkYXRhIGludG8gdGhlIGV2ZW50LlxuICAgKiBPbiBtb2JpbGUsIGl0IHdpbGwgY29tcHV0ZSB0aGUgdGFyZ2V0IGN1cnJlbnQgcG9zaXRpb24gdG8gdXBkYXRlIHRoZSBwaGFudG9tIERPTSBlbGVtZW50IHBvc2l0aW9uLiBJdCB0aGVuIGF0dGFjaFxuICAgKiB0aGUgaW5pdGlhbCB0b3VjaCBwb3NpdGlvbiBhbmQgZmluYWxseSBhdHRhY2ggdGhlIHBoYW50b20gRE9NIGVsZW1lbnQgbmV4dCB0byB0aGUgdGFyZ2V0IGVsZW1lbnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2Ugb3IgdG91Y2ggZXZlbnQgKiovXG4gIF9kcmFnU3RhcnQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7IC8vIERlc2t0b3AgYmVoYXZpb3JcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgSlNPTi5zdHJpbmdpZnkodGhpcy5fZGF0YSkpO1xuICAgIH0gZWxzZSB7IC8vIE1vYmlsZSBiZWhhdmlvclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gQXZvaWQgY29udGV4dCB0byBiZSB0cmlnZ2VyZWQgb24gdG91Y2gga2VwdCBwdXNoZWRcbiAgICAgIHRoaXMuX3RvdWNoU3RhcnRlZCA9IHRydWU7XG4gICAgICAvLyBEZWZpbmUgc3R5bGUgZm9yIHBoYW50b20gRElWIGFjY29yZGluZyB0byB0aGUgZHJhZ2dlZCBpdGVtIHN0eWxlIHZhbHVlc1xuICAgICAgY29uc3QgcmVjdCA9IHRoaXMuX3RhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fdGFyZ2V0KTsgLy8gR2V0IG1hcmdpbiwgYXMgdGhleSBtYWtlIHRoZSBwb3NpdGlvbiBjYWxjdWx1cyB3cm9uZ1xuICAgICAgY29uc3QgbGVmdE1hcmdpbiA9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgY29uc3QgdG9wTWFyZ2luID0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLnJlcGxhY2UoJ3B4JywgJycpKTtcbiAgICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5zdHlsZS50b3AgPSBgJHtyZWN0LnRvcCAtIHRvcE1hcmdpbn1weGA7XG4gICAgICB0aGlzLl90b3VjaFBoYW50b21Eb20uc3R5bGUubGVmdCA9IGAke3JlY3QubGVmdCAtIGxlZnRNYXJnaW59cHhgO1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLmhlaWdodCA9IGAke3JlY3QuaGVpZ2h0fXB4YDtcbiAgICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5zdHlsZS53aWR0aCA9IGAke3JlY3Qud2lkdGh9cHhgO1xuICAgICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBpbml0aWFsIHRvdWNoIHBvc2l0aW9uIHRvIHByb3Blcmx5IG1ha2UgdGhlIGRpdiBtb3ZlIHVuZGVyIHRoZSBmaW5nZXJcbiAgICAgIHRoaXMuX3RvdWNoUGhhbnRvbURvbS5kYXRhc2V0LnN0YXJ0WCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSByZWN0LmxlZnQgKyBsZWZ0TWFyZ2luO1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLmRhdGFzZXQuc3RhcnRZID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHJlY3QudG9wICsgdG9wTWFyZ2luO1xuICAgICAgLy8gQXBwZW5kIHRvIERPTSBwYXJlbnQgdG8gaGF2ZSB0aGUgZXhhY3Qgc2FtZSBzdHlsZSB3aXRob3V0IG1hbnVhbGx5IGNvcHlpbmcgYWxsIHRoZSBhcHBsaWVkIHJ1bGVzXG4gICAgICB0aGlzLl90YXJnZXQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLl90b3VjaFBoYW50b21Eb20pO1xuICAgIH1cbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PQklMRSBEUkFHIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kcmFnVG91Y2hNb3ZlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcmFnRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+T24gbW9iaWxlLCB0aGUgZHJhZ2dpbmcgbXVzdCBiZSBmdWxseSByZS1pbXBsZW1lbnRlZCBhcyBpdCBpcyBub3Qgc3RhbmRhcmQuIElmIGFueSBkcmFnXG4gICAqIHN0YXJ0IGV2ZW50IHdhcyBwcmV2aW91c2x5IHB1Ymxpc2hlZCwgdGhlIHBoYW50b20gRE9NIGVsZW1lbnQgaXMgbW92ZWQgYWNjb3JkaW5nIHRvIHRoZSBpbml0aWFsIHRvdWNoIHBvc2l0aW9uLFxuICAgKiByZWxhdGl2ZSB0byB0aGUgZXZlbnQgdG91Y2ggcG9zaXRpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgdG91Y2ggZXZlbnQgKiovXG4gIF9kcmFnVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX3RvdWNoU3RhcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLnRvcCA9IGAke2V2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl90b3VjaFBoYW50b21Eb20uZGF0YXNldC5zdGFydFl9cHhgO1xuICAgICAgdGhpcy5fdG91Y2hQaGFudG9tRG9tLnN0eWxlLmxlZnQgPSBgJHtldmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5fdG91Y2hQaGFudG9tRG9tLmRhdGFzZXQuc3RhcnRYfXB4YDtcbiAgICAgIC8vIEF0dGFjaCBhIHRvdWNoIGRyYWdnaW5nIGZsYWcgdG8gdGhlIGV2ZW50LCBzbyB0aGUgRHJvcEVsZW1lbnQgY2xhc3MgY2FuIGtub3cgdGhhdCBhIGRyYWdnaW5nIGV2ZW50IGlzIG9jY3VycmluZ1xuICAgICAgZXZlbnQudG91Y2hEcmFnZ2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ1RvdWNoRW5kXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcmFnRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+T24gbW9iaWxlLCB0aGUgZHJhZ2dpbmcgbXVzdCBiZSBmdWxseSByZS1pbXBsZW1lbnRlZCBhcyBpdCBpcyBub3Qgc3RhbmRhcmQuIFdoZW4gdGhlIHVzZXJcbiAgICogcmVsZWFzZSBpdHMgZmluZ2VyLCB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgcGhhbnRvbSBET00gZWxlbWVudCBmcm9tIHRoZSB0cmVlLiBUaGUgZHJhZyBldmVudCBkYXRhIGlzIGF0dGFjaGVkIGFzIGFcbiAgICogc3RyaW5nIHRvIHRoZSBldmVudCBzbyBpdCBjYW4gYmUgcmV0cmlldmVkIGluIHRoZSBEcm9wRWxlbWVudCBjbGFzcy48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSB0b3VjaCBldmVudCAqKi9cbiAgX2RyYWdUb3VjaEVuZChldmVudCkge1xuICAgIHRoaXMuX3RvdWNoU3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3RhcmdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX3RvdWNoUGhhbnRvbURvbSk7XG4gICAgLy8gRW11bGF0ZWQgZGF0YVRyYW5zZmVyIGludG8gdGhlIGV2ZW50LCB3ZSBtdXN0IGF0dGFjaCBhdCBlYWNoIHRvdWNobW92ZSBzbyBpdCBjYW4gYmUgcmV0cmlldmVkIGluIERyb3BFbGVtZW50XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyID0ge1xuICAgICAgZ2V0RGF0YTogdHlwZSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAndGV4dC9wbGFpbicpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERyYWdFbGVtZW50OyIsImNsYXNzIERyb3BFbGVtZW50IHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+TWFrZSBhbnkgRE9NIGVsZW1lbnQgZHJvcCBmcmllbmRseTwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIGNsYXNzIHdpbGwgbWFrZSBhbnkgRE9NIGVsZW1lbnQgYWJsZSB0byByZWNlaXZlIGRyb3AgZXZlbnQuIEl0IHByb3Bvc2UgYW4gb3ZlcmxheVxuICAgKiB3aGVuIHRoZSB0YXJnZXQgaXMgaG92ZXJlZCB3aXRoIGEgZHJhZ2dhYmxlIGVsZW1lbnQuIEl0IGhhbmRsZSBib3RoIHRoZSBkZXNrdG9wIGFuZCB0aGUgbW9iaWxlIGJlaGF2aW9yLiBJdCBtdXN0IGJlXG4gICAqIHVzZWQgd2l0aCBhIERyYWdFbGVtZW50IGNsYXNzIGZvciBwZXJmZWN0IGNvbXBhdGliaWxpdHkhPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBlbGVtZW50IHRvIGRyb3Agb3B0aW9uc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy50YXJnZXQgLSBUaGUgZWxlbWVudCB0byBhbGxvdyBkcm9wcGluZyBpblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uRHJvcCAtIFRoZSBtZXRob2QgdG8gY2FsbCBmb3IgZWFjaCBkcm9wIGV2ZW50ICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBlbGVtZW50IHRvIG1ha2UgYWxsb3cgZHJvcHBpbmcgaW4gKi9cbiAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLnRhcmdldDsgLy8gR2V0IGdpdmVuIHRhcmdldCBmcm9tIHRoZSBET01cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtmdW5jdGlvbn0gLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGRyb3AgZXZlbnQgKi9cbiAgICB0aGlzLl9vbkRyb3BDQiA9IG9wdGlvbnMub25Ecm9wO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcltdfSAtIFRoZSBldmVudCBJRHMgZm9yIGFsbCBtb2JpbGUgYW5kIGRlc2t0b3AgZHJvcHBpbmcgZXZlbnRzICovXG4gICAgdGhpcy5fZXZlbnRJZHMgPSBbXTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhpcyBjb3VudGVyIGhlbHBzIHRvIGF2b2lkIGVudGVyL2xlYXZlIGV2ZW50cyB0byBvdmVybGFwIHdoZW4gdGFyZ2V0IGhhcyBjaGlsZHJlbiAqL1xuICAgIHRoaXMuX21vdmVtZW50Q291bnRlciA9IDA7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSB0cmFuc3BhcmVudCBib3JkZXIgdGhhdCBtdXN0IGJlIGFkZGVkIHRvIGF2b2lkIHdlaXJkIHRhcmdldCByZXNpemUgb24gaG92ZXIgKi9cbiAgICB0aGlzLl90cmFuc3BhcmVudEJvcmRlciA9ICcnO1xuICAgIC8vIEJ1aWxkIERPTSBlbGVtZW50cyBhbmQgc3Vic2NyaWJlIHRvIGRyYWcgZXZlbnRzXG4gICAgdGhpcy5fYnVpbGRFbGVtZW50cygpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHVuc3Vic2NyaWJlIGFsbCBkcm9wIGV2ZW50cyBhbmQgcmVtb3ZlIGFsbCBwcm9wZXJ0aWVzLjwvYmxvY2txdW90ZT4gKiovXG4gIGRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ldmVudElkcy5sZW5ndGg7ICsraSkge1xuICAgICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2V2ZW50SWRzW2ldKTtcbiAgICB9XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBEUk9QRUxFTUVOVCBJTlNUQU5USUFUSU9OIFNFUVVFTkNFICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9idWlsZEVsZW1lbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBkZWZpbmUgdGhlIHRyYW5zcGFyZW50IGJvcmRlciBzdHlsZSBhbmQgYXBwZW5kIHRoaXMgdmlydHVhbCBib3JkZXIgdG8gdGhlXG4gICAqIHRhcmdldCBET00gZWxlbWVudC48L2Jsb2NrcXVvdGU+ICoqL1xuICBfYnVpbGRFbGVtZW50cygpIHtcbiAgICB0aGlzLl90cmFuc3BhcmVudEJvcmRlciA9ICdkYXNoZWQgM3B4IHRyYW5zcGFyZW50JztcbiAgICB0aGlzLl90YXJnZXQuc3R5bGUuYm9yZGVyID0gdGhpcy5fdHJhbnNwYXJlbnRCb3JkZXI7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHN1YnNjcmliZSB0byBkcm9wIGV2ZW50cywgYm90aCBmb3IgZGVza3RvcCBhbmQgbW9iaWxlLjwvYmxvY2txdW90ZT4gKiovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ2RyYWdlbnRlcicsIHRoaXMuX3RhcmdldCwgdGhpcy5fZHJhZ0VudGVyLCB0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ2RyYWdvdmVyJywgdGhpcy5fdGFyZ2V0LCB0aGlzLl9kcmFnT3ZlciwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCdkcmFnbGVhdmUnLCB0aGlzLl90YXJnZXQsIHRoaXMuX2RyYWdMZWF2ZSwgdGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SWRzLnB1c2goRXZlbnRzLmFkZEV2ZW50KCdkcm9wJywgdGhpcy5fdGFyZ2V0LCB0aGlzLl9kcm9wLCB0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJZHMucHVzaChFdmVudHMuYWRkRXZlbnQoJ3RvdWNobW92ZScsIGRvY3VtZW50LmJvZHksIHRoaXMuX2RyYWdUb3VjaE92ZXIsIHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElkcy5wdXNoKEV2ZW50cy5hZGRFdmVudCgndG91Y2hlbmQnLCBkb2N1bWVudC5ib2R5LCB0aGlzLl9kcmFnVG91Y2hFbmQsIHRoaXMpKTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIERFU0tUT1AgRFJPUCBFVkVOVFMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kcmFnRW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGhhbmRsZSB0aGUgZW50ZXJpbmcgb2YgYSBkcmFnZ2VkIGRpdiBvdmVyIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQuIFdoZW5cbiAgICogdGhlIHRhcmdldCBET00gZWxlbWVudCBpcyBob3ZlcmVkLCBhIGRhc2hlZCBib3JkZXIgaXMgbWFkZSB2aXNpYmxlLCByZXBsYWNpbmcgdGhlIHRyYW5zcGFyZW50IG9uZSB0byBub3RpZnkgdGhlXG4gICAqIHVzZXIgdGhhdCB0aGUgZHJhZ2dlZCBkaXYgY2FuIGJlIGRyb3BwZWQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2UgZXZlbnQgKiovXG4gIF9kcmFnRW50ZXIoZXZlbnQpIHtcbiAgICB0aGlzLl9ldmVudEJlaGF2aW9yKGV2ZW50KTtcbiAgICArK3RoaXMuX21vdmVtZW50Q291bnRlcjtcbiAgICB0aGlzLl90YXJnZXQuc3R5bGUuYm9yZGVyID0gJ2Rhc2hlZCAzcHggcmdiKDI1NSwgMTAwLCAxMDApJztcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdPdmVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBoYW5kbGUgdGhlIGRyYWdnZWQgZGl2IGhvdmVyaW5nIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2UgZXZlbnQgKiovXG4gIF9kcmFnT3ZlcihldmVudCkge1xuICAgIHRoaXMuX2V2ZW50QmVoYXZpb3IoZXZlbnQpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ0xlYXZlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBoYW5kbGUgdGhlIGV2ZW50IHRoYXQgaXMgZmlyZWQgd2hlbiB0aGUgaG92ZXJlZCBkaXYgbGVhdmVzIHRoZSB0YXJnZXRcbiAgICogRE9NIGVsZW1lbnQuIEl0IHJlcXVpcmUgdGhlIG1vdmVtZW50IGNvdW50ZXIgdG8gYmUgZXF1YWwgdG8gemVybyB0byByZXN0b3JlIHRoZSB0cmFuc3BhcmVudCBib3JkZXIgb2YgdGhlIHRhcmdldFxuICAgKiBET00gZWxlbWVudC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBldmVudCAqKi9cbiAgX2RyYWdMZWF2ZShldmVudCkge1xuICAgIHRoaXMuX2V2ZW50QmVoYXZpb3IoZXZlbnQpO1xuICAgIC0tdGhpcy5fbW92ZW1lbnRDb3VudGVyO1xuICAgIGlmICh0aGlzLl9tb3ZlbWVudENvdW50ZXIgPT09IDApIHtcbiAgICAgIHRoaXMuX3RhcmdldC5zdHlsZS5ib3JkZXIgPSB0aGlzLl90cmFuc3BhcmVudEJvcmRlcjtcbiAgICB9XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9CSUxFIERST1AgRVZFTlRTIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ1RvdWNoT3ZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBob3ZlcmluZyBvZiBhIGRyYWdnZWQgZGl2IG92ZXIgdGhlIHRhcmdldCBET00gZWxlbWVudC4gVGhlXG4gICAqIHRvdWNoIGRyYWdnaW5nIGZsYWcgaXMgYXR0YWNoZWQgdG8gdGhlIGV2ZW50IGluIHRoZSBEcm9wRWxlbWVudCBjbGFzcywgc28gd2UgY2FuIGVuc3VyZSB0byBvbmx5IHRyaWdnZXIgdGhlXG4gICAqIGRyYWdnaW5nIG92ZXIgZXZlbnQgbG9naWMgd2hlbiB0aGUgZXZlbnQgaXMgY29taW5nIGFmdGVyIGEgZHJhZyB0b3VjaCBoYXMgb2NjdXJyZWQgaW4gRHJvcEVsZW1lbnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgdG91Y2ggZXZlbnQgKiovXG4gIF9kcmFnVG91Y2hPdmVyKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRvdWNoRHJhZ2dpbmcpIHsgLy8gVGhpcyBmbGFnIGhhcyBiZWVuIHNldCBpbiBEcmFnRWxlbWVudCBjbGFzcyB0byBrbm93IGlmIGEgdG91Y2ggZHJhZyBpcyBvY2N1cnJpbmdcbiAgICAgIGlmICh0aGlzLl9pc1RvdWNoRXZlbnRJblRhcmdldChldmVudC50YXJnZXRUb3VjaGVzWzBdKSkgeyAvLyBNb2JpbGUgZXF1aXZhbGVudCB0byBkcmFnZW50ZXJcbiAgICAgICAgdGhpcy5fdGFyZ2V0LnN0eWxlLmJvcmRlciA9ICdkYXNoZWQgM3B4IHJnYigyNTUsIDEwMCwgMTAwKSc7XG4gICAgICB9IGVsc2UgeyAvLyBTYW1lIGZvciBkcmFnbGVhdmVcbiAgICAgICAgdGhpcy5fdGFyZ2V0LnN0eWxlLmJvcmRlciA9IHRoaXMuX3RyYW5zcGFyZW50Qm9yZGVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdUb3VjaEVuZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBwcmUtZHJvcCBldmVudCBmb3IgbW9iaWxlIGRldmljZXMuIFRoZSBkYXRhVHJhbnNmZXIgaXNcbiAgICogYXR0YWNoZWQgdG8gdGhlIGV2ZW50IGJ5IERyYWdFbGVtZW50IGNsYXNzLCB0byByZWNvZ25pemUgYSB0b3VjaCBlbmRlZCBldmVudCB0aGF0IGlzIGxpbmtlZCB3aXRoIGEgZHJhZ2dpbmcgaW5cbiAgICogcHJvZ3Jlc3MuIFRoZSB0b3VjaCBwb3NpdGlvbiBpcyB0aGVuIHRlc3RlZCB0byBmaXJlZCB0aGUgZHJvcCBtZXRob2QgaWYgdGhlIHRvdWNoIGVuZCBvY2N1cnJlZCBvbiB0aGUgdGFyZ2V0IERPTVxuICAgKiBlbGVtZW50LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIHRvdWNoIGV2ZW50ICoqL1xuICBfZHJhZ1RvdWNoRW5kKGV2ZW50KSB7XG4gICAgLy8gVG91Y2ggZXZlbnQgaGFzIGFuIGVtdWxhdGVkIGRhdGFUcmFuc2ZlciBlbGVtZW50LCBzZWUgRHJhZ0VsZW1lbnQuIHRvdWNoZWQgcG9zaXRpb24gaXMgaGVsZCBpbiBjaGFuZ2VkVG91Y2hlc1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgdGhpcy5faXNUb3VjaEV2ZW50SW5UYXJnZXQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0pKSB7XG4gICAgICB0aGlzLl9kcm9wKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9CSUxFIEFORCBERVNLVE9QIERST1AgRVZFTlRTIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJvcFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRHJvcEVsZW1lbnRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIERlY2VtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgaGFuZGxlIHRoZSBkcm9wcGluZyBvZiBhIERyYWdFbGVtZW50LCB0byBwcm9wZXJseSByZWFkIHRoZSBkYXRhIGl0IGhvbGRzXG4gICAqIGFuZCBzZW5kIGl0IHRvIHRoZSBkcm9wIGNhbGxiYWNrIHByb3ZpZGVkIGluIGNvbnN0cnVjdG9yLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIG1vdXNlIG9yIHRvdWNoIGV2ZW50ICoqL1xuICBfZHJvcChldmVudCkge1xuICAgIHRoaXMuX2V2ZW50QmVoYXZpb3IoZXZlbnQpO1xuICAgIHRoaXMuX3RhcmdldC5zdHlsZS5ib3JkZXIgPSB0aGlzLl90cmFuc3BhcmVudEJvcmRlcjtcbiAgICB0aGlzLl9vbkRyb3BDQihKU09OLnBhcnNlKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykpKTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgVVRJTFMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudEJlaGF2aW9yXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBEcm9wRWxlbWVudFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgRGVjZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIGdpdmVuIGV2ZW50LCBhbmQgd2lsbCBzdG9wIGl0c1xuICAgKiBwcm9wYWdhdGlvbi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBvciB0b3VjaCBldmVudCAqKi9cbiAgX2V2ZW50QmVoYXZpb3IoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfaXNUb3VjaEV2ZW50SW5UYXJnZXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIERyb3BFbGVtZW50XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBEZWNlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGNvbXBhcmUgYSB0b3VjaCBwb2ludCB0byB0aGUgdGFyZ2V0IHBvc2l0aW9uIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGVcbiAgICogdG91Y2ggcG9pbnQgaXMgaW5zaWRlIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gdG91Y2hQb3NpdGlvbiAtIFRoZSB0b3VjaCBldmVudFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBEbyB0aGUgdG91Y2ggcG9pbnQgaXMgaW5jbHVkZWQgaW4gdGhlIHRhcmdldCBET00gZWxlbWVudCAqKi9cbiAgX2lzVG91Y2hFdmVudEluVGFyZ2V0KHRvdWNoUG9zaXRpb24pIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGluQXhpc1ggPSB0b3VjaFBvc2l0aW9uLnBhZ2VYID49IHJlY3QueCAmJiAodG91Y2hQb3NpdGlvbi5wYWdlWCA8PSByZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICBjb25zdCBpbkF4aXNZID0gdG91Y2hQb3NpdGlvbi5wYWdlWSA+PSByZWN0LnkgJiYgKHRvdWNoUG9zaXRpb24ucGFnZVkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQpO1xuICAgIHJldHVybiAoaW5BeGlzWCAmJiBpbkF4aXNZKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBEcm9wRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgTG9nZ2VyIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+SmF2YVNjcmlwdCBsb2dnZXIgc2luZ2xldG9uIHRvIGhhbmRsZSBlcnJvcnMgdGhlIHNhbWUgd2F5PC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIExvZ2dlciBjbGFzcyBwcm92aWRlcyBhIHNpbmdsZXRvbiBvYmplY3QgdG8gYWxsb3cgYnJhaW4gZGVhZCBsb2dnaW5nIGZvciBmcm9udGVuZFxuICAgKiBKYXZhU2NyaXB0IGNvZGUuIEVycm9ycyBjYW4gYmUgcmFpc2VkIGZyb20gSmF2YVNjcmlwdCBlcnJvcnMgKDxjb2RlPm5ldyBFcnJvcigpPC9jb2RlPiksIG9yIHVzaW5nIGEgY3VzdG9tIGVycm9yXG4gICAqIGZvcm1hdCwgd2l0aCBhIHNldmVyaXR5LCB0aXRsZSBhbmQgbWVzc2FnZS4gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIGEgbm90aWZpY2F0aW9uIG1hbmFnZXIgb2JqZWN0IHRvIGhhbmRsZVxuICAgKiB0aG9zZSBlcnJvciBlaXRoZXIgaW4gY29uc29sZSBhbmQgaW4gVUkuIFRoZSByZWNvbW1lbmRlZCBtYW5hZ2VyIHRvIHVzZSBmb3Igbm90aWZpY2F0aW9uIGNhbiBiZSBmb3VuZCBhdFxuICAgKiA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qc1wiIGFsdD1cIm5vdGlmaWNhdGlvbi1qc1wiPk5vdGlmaWNhdGlvbi5qczwvYT4uIFlvdSBjYW5cbiAgICogb3RoZXJ3aXNlIGltcGxlbWVudCB5b3Ugc3lzdGVtLCBidXQgaXQgYXMgdG8gdGFrZSBhIHR5cGUgKHNldmVyaXR5KSwgYSB0aXRsZSBhbmQgYSBtZXNzYWdlIDsgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb24sXG4gICAqIHJlZmVyIHRvIHRoZSA8Y29kZT5fbG9nRXJyb3JUb05vdGlmaWNhdGlvbjwvY29kZT4gZG9jdW1lbnRhdGlvbi4gRm9yIHNvdXJjZSBjb2RlLCBwbGVhc2UgZ28gdG9cbiAgICogPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9BcnRodXJCZWF1bGlldS9Mb2dnZXIuanNcIiBhbHQ9XCJsb2dnZXItanNcIj5Mb2dnZXIuanM8L2E+PC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnM9e31dIC0gVGhlIExvZ2dlciBvYmplY3QsIG5vdCBtYW5kYXRvcnkgYnV0IGl0IGlzIHJlY29tbWVuZGVkIHRvIHByb3ZpZGUgb25lIGZvciBmdWxsIGZlYXR1cmVzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5lcnJvcnM9e31dIC0gVGhlIGN1c3RvbSBlcnJvcnMsIEpTT04gc3R5bGUsIHdpdGgga2V5IGJlaW5nIHRoZSBlcnJvciBuYW1lIGFuZCB2YWx1ZSBiZWluZ1xuICAgKiBhbiBvYmplY3Qgd2l0aCBhIDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgYSA8Y29kZT50aXRsZTwvY29kZT4gYW5kIGEgPGNvZGU+bWVzc2FnZTwvY29kZT4gcHJvcGVydHkgKGFsbCBzdHJpbmdzKVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMubm90aWZpY2F0aW9uPW51bGxdIC0gVGhlIG5vdGlmaWNhdGlvbiBtYW5hZ2VyICh0byBjcmVhdGUgbmV3IG5vdGlmaWNhdGlvbnMgd2hlbiBsb2dnaW5nKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxvZz10cnVlXSAtIEFsbG93IGNvbnNvbGUgbG9nZ2luZyAodHVybiB0byBmYWxzZSBpbiBwcm9kIGVudmlyb25tZW50KVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIExvZ2dlciBzaW5nbGV0b24gaW5zdGFuY2UgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gSWYgYW4gaW5zdGFuY2Ugb2YgTG9nZ2VyIGFscmVhZHkgZXhpc3RzLCB3ZSBqdXN0IHJldHVybiBpdFxuICAgIGlmICghIUxvZ2dlci5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIExvZ2dlci5pbnN0YW5jZTtcbiAgICB9XG4gICAgLy8gU2V0IG9iamVjdCBpbnN0YW5jZVxuICAgIExvZ2dlci5pbnN0YW5jZSA9IHRoaXM7XG4gICAgLy8gUHJldmVudCB3cm9uZyB0eXBlIGZvciBhcmd1bWVudHMsIGZhbGxiYWNrIGFjY29yZGluZyB0byBhdHRyaWJ1dGUgdXRpbGl0eVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lcnJvcnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zLmVycm9ycyA9IHt9OyAvLyBOZWVkcyB0byBkZWZpbmUgdG8gZW1wdHkgb2JqZWN0IHRvIGF2b2lkIGVycm9ycyB3aGVuIGNoZWNraW5nIGN1c3RvbSBlcnJvcnNcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm5vdGlmaWNhdGlvbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMubm90aWZpY2F0aW9uID0gbnVsbDsgLy8gTnVsbCB0byBpZ25vcmUgdGhlIG5vdGlmaWNhdGlvbiBzdGVwIGluIGVycm9yIHJhaXNpbmdcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvZyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBvcHRpb25zLmxvZyA9IHRydWU7IC8vIE5vIGxvZyBtZWFucy4uLiB1c2VmdWwgY29tcG9uZW50IHJpZ2h0P1xuICAgIH1cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIGVycm9yIG1lc3NhZ2VzIHRvIHVzZSBpbiBMb2dnZXIgKi9cbiAgICB0aGlzLl9lcnJvcnMgPSBvcHRpb25zLmVycm9ycztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIGN1c3RvbSBub3RpZmljYXRpb24gaGFuZGxlciwgbXVzdCBiZSBhYmxlIHRvIHRha2UgdHlwZSwgdGl0bGUgYW5kIG1lc3NhZ2UgKGF0IGxlYXN0KSAqL1xuICAgIHRoaXMuX25vdGlmaWNhdGlvbiA9IG9wdGlvbnMubm90aWZpY2F0aW9uO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gSW50ZXJuYWwgbG9nZ2luZyBmbGFnIGZyb20gY29uc3RydWN0b3Igb3B0aW9ucywgYWxsb3cgdG8gb3V0cHV0IGVhY2ggZXZlbnQgYWN0aW9uICovXG4gICAgdGhpcy5fbG9nID0gb3B0aW9ucy5sb2c7XG4gICAgLyoqIEBwdWJsaWNcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQ29tcG9uZW50IHZlcnNpb24gKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnMS4xLjAnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIExvZ2dlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+TG9nZ2VyIGRlc3RydWN0b3IuIFdpbGwgZGVsZXRlIHNpbmdsZXRvbiBpbnN0YW5jZSBhbmQgaXRzIHByb3BlcnRpZXMuPC9ibG9ja3F1b3RlPiAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIERlbGV0ZSBvYmplY3QgYXR0cmlidXRlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgfSk7XG4gICAgLy8gQ2xlYXIgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgTG9nZ2VyLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTE9HR0VSIEpTIElOVEVSTiBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZXNlIGludGVybmFsIG1ldGhvZHMgd2lsbCBidWlsZCBhIHJhaXNlZCBlcnJvciBkZXBlbmRpbmcgb24gbG9nZ2luZyBsZXZlbCBzZW50IHdoZW4gYnVpbGRpbmcgdGhpcyBzaW5nbGV0b24uICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfYnVpbGRFcnJvckluZm9cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIExvZ2dlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBiZSB0aGUgZXJyb3IgcHJvcGVydGllcyBhY2NvcmRpbmcgdG8gaXRzIHR5cGUuIEEgY3VzdG9tIGVycm9yIHdpbGxcbiAgICogdGFrZSB2YWx1ZXMgZGVmaW5lZCBhdCBjb25zdHJ1Y3Rpb24gb2YgdGhpcyBzaW5nbGV0b24uIEphdmFTY3JpcCBlcnJvciBhcmUgcGFyc2VkIHRvIGV4dHJhY3QgdGl0bGUgYW5kXG4gICAqIG1lc3NhZ2UgcHJvcGVydGllcyBmcm9tIHN0YWNrLCB3aXRoIHNwZWNpZmljIGhhbmRsaW5nIGZvciBDaHJvbWUgYW5kIEZpcmVmb3guPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgLSBUaGUgZXJyb3IgdG8gYnVpbGQgaW5mbyBmcm9tLiBDYW4gYmUgYSBjdXN0b20gZXJyb3Igb3IgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZXJyb3IgcHJvcGVydGllcyA7IDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgPGNvZGU+dGl0bGU8L2NvZGU+IGFuZCA8Y29kZT5tZXNzYWdlPC9jb2RlPiAqL1xuICBfYnVpbGRFcnJvckluZm8oZXJyb3IpIHtcbiAgICBsZXQgc2V2ZXJpdHkgPSAnJztcbiAgICBsZXQgdGl0bGUgPSAnJztcbiAgICBsZXQgbWVzc2FnZSA9ICcnO1xuICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHRoaXMuX2Vycm9ycyBkb2Vzbid0IGNvbnRhaW4gdGhlIGVycm9yIGtleSA7IGVpdGhlciBhIEpzIGVycm9yIG9yIGFuIHVua25vd24gZXJyb3JcbiAgICAgIGlmICh0aGlzLl9lcnJvcnNbZXJyb3JdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gSmF2YVNjcmlwdCBlcnJvciBjcmVhdGVkIHdpdGggbmV3IEVycm9yKCksIHRoYXQgbmVlZCB0byBjb250YWluIGZpbGVOYW1lLCBtZXNzYWdlLCBsaW5lIGFuZCBjb2x1bW4gbnVtYmVyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9ICcnO1xuICAgICAgICBpZiAoZXJyb3IuZmlsZU5hbWUgJiYgZXJyb3IubWVzc2FnZSAmJiBlcnJvci5saW5lTnVtYmVyICYmIGVycm9yLmNvbHVtbk51bWJlcikgeyAvLyBGaXJlZm94IHNwZWNpZmljXG4gICAgICAgICAgZmlsZW5hbWUgPSBlcnJvci5maWxlTmFtZS5tYXRjaCgvXFwvKFteXFwvXSspXFwvPyQvKVsxXTtcbiAgICAgICAgICBzZXZlcml0eSA9ICdlcnJvcic7XG4gICAgICAgICAgdGl0bGUgPSBgSmF2YVNjcmlwdCBlcnJvcmA7XG4gICAgICAgICAgbWVzc2FnZSA9IGAke2Vycm9yLm1lc3NhZ2V9IGluIGZpbGUgJHtmaWxlbmFtZX06JHtlcnJvci5saW5lTnVtYmVyfToke2Vycm9yLmNvbHVtbk51bWJlcn1gO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLm1lc3NhZ2UgJiYgZXJyb3Iuc3RhY2spIHsgLy8gQ2hyb21lIHNwZWNpZmljXG4gICAgICAgICAgZmlsZW5hbWUgPSBlcnJvci5zdGFjay5zcGxpdCgnXFxuJylbZXJyb3Iuc3RhY2suc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDFdLm1hdGNoKC9cXC8oW15cXC9dKylcXC8/JC8pWzFdO1xuICAgICAgICAgIHNldmVyaXR5ID0gJ2Vycm9yJztcbiAgICAgICAgICB0aXRsZSA9IGBKYXZhU2NyaXB0IGVycm9yYDtcbiAgICAgICAgICBtZXNzYWdlID0gYCR7ZXJyb3IubWVzc2FnZX0gaW4gZmlsZSAke2ZpbGVuYW1lfWA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3Iuc2V2ZXJpdHkgJiYgZXJyb3IudGl0bGUgJiYgZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHNldmVyaXR5ID0gZXJyb3Iuc2V2ZXJpdHkgfHwgJyc7XG4gICAgICAgICAgdGl0bGUgPSBlcnJvci50aXRsZSB8fCAnJztcbiAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCAnJztcbiAgICAgICAgfSBlbHNlIHsgLy8gVW5rbm93biBlcnJvciB0aGF0IGRvIG5vdCByZXF1aXJlIGFueSBhcmd1bWVudHNcbiAgICAgICAgICBzZXZlcml0eSA9ICdlcnJvcic7XG4gICAgICAgICAgdGl0bGUgPSBgVW5leHBlY3RlZCBlcnJvciAke2Vycm9yfWA7XG4gICAgICAgICAgbWVzc2FnZSA9ICdUaGUgZXJyb3Igb2JqZWN0IHNlbnQgdG8gTG9nZ2VyLnJhaXNlKCkgaXMgbmVpdGhlciBhIEphdmFTY3JpcHQgZXJyb3Igbm9yIGEgY3VzdG9tIGVycm9yICh3aXRoIHNldmVyaXR5LCB0aXRsZSBhbmQgbWVzc2FnZSkuJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHsgLy8gQ3VzdG9tIGVycm9yIHRoYXQgbmVlZCB0byBiZSBmaWxsZWQgd2l0aCBhIHNldmVyaXR5LCBhIHRpdGxlIGFuZCBhIG1lc3NhZ2VcbiAgICAgICAgc2V2ZXJpdHkgPSB0aGlzLl9lcnJvcnNbZXJyb3JdLnNldmVyaXR5IHx8ICcnO1xuICAgICAgICB0aXRsZSA9IHRoaXMuX2Vycm9yc1tlcnJvcl0udGl0bGUgfHwgJyc7XG4gICAgICAgIG1lc3NhZ2UgPSB0aGlzLl9lcnJvcnNbZXJyb3JdLm1lc3NhZ2UgfHwgJyc7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiBlcnJvciBzdGFuZGFyZCBwcm9wZXJ0aWVzXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldmVyaXR5OiBzZXZlcml0eSxcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9O1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfbG9nRXJyb3JUb05vdGlmaWNhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTG9nZ2VyXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGNhbGwgZm9yIGEgbmV3IG5vdGlmaWNhdGlvbiBpZiBhIGNvbXBvbmVudCBoYXMgYmVlbiBnaXZlbiB0byB0aGlzIHNpbmdsZXRvblxuICAgKiBjb25zdHJ1Y3Rvci4gVGhlIGNvbXBvbmVudCBtdXN0IGV4cG9zZSBhIDxjb2RlPm5ldygpPC9jb2RlPiBtZXRob2RzIHRoYXQgdGFrZXMgYXMgYXJndW1lbnRzIHRoZSBMb2dnZXIgc3RhbmRhcmQgcHJvcGVydGllcyA7XG4gICAqIDxjb2RlPnNldmVyaXR5PC9jb2RlPiwgPGNvZGU+dGl0bGU8L2NvZGU+IGFuZCA8Y29kZT5tZXNzYWdlPC9jb2RlPi4gSWYgbm8gY29tcG9uZW50IGhhcyBiZSBwcm92aWRlZCwgdGhpcyBtZXRob2Qgd29uJ3QgZG8gYW55dGhpbmcuXG4gICAqIE9uZSBjYW4gZmluZCBzdWNoIGNvbXBvbmVudCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qc1wiIGFsdD1cIm5vdGlmaWNhdGlvbi1qc1wiPmhlcmU8L2E+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yUGFyYW1ldGVycyAtIFRoZSBlcnJvciB3aXRoIExvZ2dlciBzdGFuZGFyZCBwcm9wZXJ0aWVzICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pICovXG4gIF9sb2dFcnJvclRvTm90aWZpY2F0aW9uKGVycm9yUGFyYW1ldGVycykge1xuICAgIGlmICh0aGlzLl9ub3RpZmljYXRpb24gJiYgdHlwZW9mIGVycm9yUGFyYW1ldGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuX25vdGlmaWNhdGlvbi5uZXcoe1xuICAgICAgICB0eXBlOiBlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHkgfHwgJ2Vycm9yJyxcbiAgICAgICAgdGl0bGU6IGVycm9yUGFyYW1ldGVycy50aXRsZSB8fCAnQ2FuXFwndCBnZXQgZXJyb3IgaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yUGFyYW1ldGVycy5tZXNzYWdlIHx8ICdDYWxsIGZvciBuZXcgbm90aWZpY2F0aW9uIHdhc25cXCd0IG1hZGUgd2l0aCBhcmd1bWVudHMnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9sb2dFcnJvclRvQ29uc29sZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTG9nZ2VyXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHNlbmQgZXJyb3IgdG8gY29uc29sZSBpZiBsb2dnaW5nIGhhcyBiZWVuIGFsbG93ZWQgdG8gdGhpcyBzaW5nbGV0b24gY29uc3RydWN0b3IuXG4gICAqIEl0IHRha2VzIGEgTG9nZ2VyIHN0YW5kYXJkIGVycm9yICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pIGFzIGFyZ3VtZW50LlxuICAgKiBJdCB3aWxsIGJ1aWxkIGEgdW5pZmllZCBvdXRwdXQgcmVnYXJkbGVzcyB0aGUgQ2hyb21lIG9yIEZpcmVmb3ggYnJvd3Nlci4gSXQgZW5oYW5jZSA8Y29kZT5jb25zb2xlLmxvZzwvY29kZT4gYW5kXG4gICAqIDxjb2RlPmNvbnNvbGUuaW5mbzwvY29kZT4gdG8gYWxzbyBkaXNwbGF5IHRoZSBzdGFjayB0cmFjZSBpbiBhIDxjb2RlPmNvbnNvbGUuZ3JvdXA8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGVycm9yUGFyYW1ldGVycyAtIFRoZSBlcnJvciB3aXRoIExvZ2dlciBzdGFuZGFyZCBwcm9wZXJ0aWVzICg8Y29kZT5zZXZlcml0eTwvY29kZT4sIDxjb2RlPnRpdGxlPC9jb2RlPiBhbmQgPGNvZGU+bWVzc2FnZTwvY29kZT4pICovXG4gIF9sb2dFcnJvclRvQ29uc29sZShlcnJvclBhcmFtZXRlcnMpIHtcbiAgICBpZiAodGhpcy5fbG9nICYmIHR5cGVvZiBlcnJvclBhcmFtZXRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBNaXNzaW5nIG1hbmRhdG9yeSBhcmd1bWVudHNcbiAgICAgIGlmICghZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ICYmICFlcnJvclBhcmFtZXRlcnMudGl0bGUgJiYgIWVycm9yUGFyYW1ldGVycy5tZXNzYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8qIENvbG9ycyB0byB1c2UsIGV4dHJhY3RlZCBmcm9tIE5vdGlmaWNhdGlvbi5qcyAoaHR0cHM6Ly9naXRodWIuY29tL0FydGh1ckJlYXVsaWV1L05vdGlmaWNhdGlvbi5qcykgKi9cbiAgICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgICAgc3VjY2VzczogJ2NvbG9yOiByZ2IoNzYsIDE3NSwgODApOycsXG4gICAgICAgIGluZm86ICdjb2xvcjogcmdiKDMsIDE2OSwgMjQ0KTsnLFxuICAgICAgICB3YXJuaW5nOiAnY29sb3I6IHJnYigyNTUsIDE1MiwgMCk7JyxcbiAgICAgICAgZXJyb3I6ICdjb2xvcjogcmdiKDI0NCwgNjcsIDU0KTsnXG4gICAgICB9O1xuICAgICAgY29uc3QgYnJvd3NlcnMgPSB7XG4gICAgICAgIGZpcmVmb3g6IC9maXJlZm94L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgICAgICAgY2hyb21lOiAvY2hyb21lL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAvZ29vZ2xlIGluYy9pLnRlc3QobmF2aWdhdG9yLnZlbmRvcilcbiAgICAgIH07XG4gICAgICAvLyBDb21wdXRlIGxvZyBsZXZlbCBmcm9tIHNldmVyaXR5LCBhbmQgaGFuZGxlIHdhcm4gYW5kIGxvZyBhcyB3YXJuaW5nIGFuZCBzdWNjZXNzXG4gICAgICBsZXQgbG9nTGV2ZWwgPSBlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHk7XG4gICAgICBpZiAoZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ID09PSAnd2FybmluZycpIHtcbiAgICAgICAgbG9nTGV2ZWwgPSAnd2Fybic7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yUGFyYW1ldGVycy5zZXZlcml0eSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgIGxvZ0xldmVsID0gJ2xvZyc7XG4gICAgICB9XG4gICAgICAvLyBDcmVhdGUgY29uc29sZSBncm91cCB3aXRoIGFzc29jaWF0ZWQgc3R5bGVcbiAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYCVjJHtlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHkudG9VcHBlckNhc2UoKX06ICR7ZXJyb3JQYXJhbWV0ZXJzLnRpdGxlfWAsIGNvbG9yc1tlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHldKTtcbiAgICAgIC8vIEFwcGx5IHR5cGUgYW5kIHNldmVyaXR5IHRvIGJ1aWxkIGNvbnNvbGUgY2FsbFxuICAgICAgY29uc3Qgb3V0cHV0U3RyaW5nID0gYCVjJHtlcnJvclBhcmFtZXRlcnMubWVzc2FnZX1cXG4ke3RoaXMuX2dldENhbGxlck5hbWUoYnJvd3NlcnMpfWA7XG4gICAgICBjb25zb2xlW2xvZ0xldmVsXShvdXRwdXRTdHJpbmcsIGNvbG9yc1tlcnJvclBhcmFtZXRlcnMuc2V2ZXJpdHldKTtcbiAgICAgIC8vIE9ubHkgYXBwZW5kIGNvbnNvbGUgdHJhY2UgaWYgc2V2ZXJpdHkgaXMgbm90IGFuIGVycm9yIChhcyBlcnJvciBhbHJlYWR5IGRpc3BsYXkgdHJhY2UpXG4gICAgICBpZiAoZXJyb3JQYXJhbWV0ZXJzLnNldmVyaXR5ICE9PSAnZXJyb3InICYmIGVycm9yUGFyYW1ldGVycy5zZXZlcml0eSAhPT0gJ3dhcm5pbmcnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICAgIC8vIENsb3NlIGVycm9yIGdyb3VwIGluIGNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9nZXRDYWxsZXJOYW1lXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBMb2dnZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgYnVpbGQgdGhlIGNhbGxlciBuYW1lIGFzIGEgc3RyaW5nLCBmb3JtYXR0ZWQgdG8gYmUgZWFzeSB0b1xuICAgKiByZWFkIGFuZCBkaXNwbGF5IGluIHRoZSBsb2cgb3V0cHV0LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IGJyb3dzZXJzIC0gQW4gb2JqZWN0IHdpdGggYm9vbGVhbnMgdmFsdWVzIGZvciBjdXJyZW50IGJyb3dzZXIgdXNlZCBieSBzZXNzaW9uXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgTG9nZ2VyIHN0YW5kYXJkIGNhbGxlciBuYW1lIHJlZ2FyZGxlc3MgdGhlIGJyb3dzZXIgKi9cbiAgX2dldENhbGxlck5hbWUoYnJvd3NlcnMpIHtcbiAgICAvLyBPcmlnaW5hbCBjb2RlIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaXJpc2xpLzcxNmI2ZGFjZDNmMTUxY2UyYjdlXG4gICAgbGV0IGNhbGxlciA9IChuZXcgRXJyb3IoKSkuc3RhY2s7IC8vIENyZWF0ZSBlcnJvciBhbmQgZ2V0IGl0cyBjYWxsIHN0YWNrXG4gICAgLy8gR2V0IGxhc3QgY2FsbGVkIGRlcGVuZGluZyBvbiBicm93c2VyXG4gICAgaWYgKHR5cGVvZiBicm93c2VycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChicm93c2Vycy5maXJlZm94KSB7XG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5zcGxpdCgnXFxuJylbM107IC8vIFRoaXJkIGl0ZW0gaXMgZXJyb3IgY2FsbGVyIG1ldGhvZFxuICAgICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvQCsvLCAnICcpOyAvLyBDaGFuZ2UgYEBgIHRvIGAoYFxuICAgICAgfSBlbHNlIGlmIChicm93c2Vycy5jaHJvbWUpIHtcbiAgICAgICAgY2FsbGVyID0gY2FsbGVyLnNwbGl0KCdcXG4nKVtjYWxsZXIuc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDJdOyAvLyBNaW51cyAyIHRvIHJlbW92ZSBjbG9zaW5nIHBhcmVudGhlc2lzIGFzIHdlbGxcbiAgICAgICAgLy8gUmVtb3ZlIENocm9tZSBzcGVjaWZpYyBzdHJpbmdzIHRvIG1hdGNoIEZpcmVmb3ggbG9vayBhbmQgZmVlbCAoZ28gZmYpXG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9eRXJyb3JcXHMrLywgJycpO1xuICAgICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvXlxccythdC4vLCAnJyk7XG4gICAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9beygpfV0vZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdVbnN1cHBvcnRlZCBicm93c2VyIHRvIGdldCB0aGUgY2FsbGVyIG5hbWUgZnJvbSc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnQXJndW1lbnQgZXJyb3IsIHVuYWJsZSB0byBnZXQgdGhlIGNhbGxlciBuYW1lIG9uIHRoaXMgcmFpc2UnO1xuICAgIH1cbiAgICAvLyBQcmVwYXJlIGZ1bmN0aW9uIG5hbWUsIGFuZCByZXBsYWNlIHdpdGggYW5vbnltb3VzIGluIHByb3BlciBjYXNlXG4gICAgbGV0IGZ1bmN0aW9uTmFtZSA9IGNhbGxlcjtcbiAgICBpZiAoY2FsbGVyLmNoYXJBdCgwKSA9PT0gJyAnKSB7IC8vIEZpcnN0IGNoYXIgaXMgbm9ybWFsbHkgdGhlIGZ1bmN0aW9uIG5hbWUgZmlyc3QgY2hhci4gU3BhY2UgbWVhbnMgYW5vbnltb3VzIGNyb3NzIGJyb3dzZXJzIChzbyBmYXIuLi4pXG4gICAgICBmdW5jdGlvbk5hbWUgPSBgPGFub255bW91cz4ke2NhbGxlcn1gO1xuICAgIH1cbiAgICAvLyBVbmlmaWVkIHJldHVybmVkIHZhbHVlIGZvciBhbm9ueW1vdXMvbm9uIGFub255bW91cyBtZXRob2RzXG4gICAgcmV0dXJuIGBSYWlzZWQgZnJvbSBmdW5jdGlvbiAke2Z1bmN0aW9uTmFtZX1gO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBMT0dHRVIgSlMgUFVCTElDIE1FVEhPRCAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgYXJlIHRoZSBleHBvc2VkIG1ldGhvZCBvZiBMb2dnZXIgY29tcG9uZW50LiBJdCBhbGxvd3MgdG8gcmFpc2UgZXJyb3IgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgICAgICAgICovXG4gIC8qICBjb25zb2xlIGlmIG5lZWRlZCwgYW5kIGRpc3BsYXllZCBpbiB0aGUgaW50ZXJmYWNlIHVzaW5nIGEgbm90aWZpY2F0aW9uIGNvbXBvbmVudC4gT3RoZXJ3aXNlLCBpdCB3b24ndCBkbyAgICAgICAgKi9cbiAgLyogIGFueXRoaW5nLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSByYWlzZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBMb2dnZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoZSByYWlzZSBtZXRob2Qgd2lsbCBidWlsZCwgYWNjb3JkaW5nIHRvIGFyZ3VtZW50IHNlbnQgdG8gdGhpcyBzaW5nbGV0b24gY29uc3RydWN0b3IsXG4gICAqIGEgY29uc29sZSBvdXRwdXQgYW5kL29yIGEgbm90aWZpY2F0aW9uIGZvciB0aGUgZ2l2ZW4gZXJyb3IuIFRoZSBpbnB1dCBlcnJvciBjYW4gYmUgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yLFxuICAgKiByYWlzZWQgbGlrZSA8Y29kZT5uZXcgRXJyb3IoKTwvY29kZT4sIGJ1dCBjYW4gYWxzbyBiZSBidWlsZCB1c2luZyB0aGUgY3VzdG9tIGZvcm1hdCwgdXNpbmcgdGhlIGtleSBvZiB0aGUgZXJyb3JcbiAgICogYXMgaW5wdXQgc3RyaW5nLiBTZWUgY29uc3RydWN0b3IgYW5kIGV4YW1wbGUgZm9yIGRlbW9uc3RyYXRpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgLSBUaGUgZXJyb3IgdG8gaGFuZGxlLiBDYW4gYmUgYSBjdXN0b20gZXJyb3Igb3IgYSBzdGFuZGFyZCBKYXZhU2NyaXB0IGVycm9yICovXG4gIHJhaXNlKGVycm9yKSB7XG4gICAgLy8gQ3JlYXRlIGVycm9yIHNwZWNpZmljIHZhbHVlcyBkZXBlbmRpbmcgb24gZXJyb3Igb3JpZ2luIChKYXZhU2NyaXB0LCBDdXN0b20gb3IgVW5rbm93bikgKi9cbiAgICBjb25zdCBlcnJvclBhcmFtZXRlcnMgPSB0aGlzLl9idWlsZEVycm9ySW5mbyhlcnJvcik7XG4gICAgLyogSWYgYW55IE5vdGlmaWNhdGlvbiBtYW5hZ2VyIGV4aXN0cywgdXNlIGl0IHdpdGggZXJyb3IgcGFyYW1ldGVycyAqL1xuICAgIHRoaXMuX2xvZ0Vycm9yVG9Ob3RpZmljYXRpb24oZXJyb3JQYXJhbWV0ZXJzKTtcbiAgICAvKiBJbiBkZWJ1ZyBtb2RlLCBmaWxsIHRoZSBjb25zb2xlIHdpdGggZXJyb3IgcGFyYW1ldGVycyAqL1xuICAgIHRoaXMuX2xvZ0Vycm9yVG9Db25zb2xlKGVycm9yUGFyYW1ldGVycyk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VyO1xuIiwiY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuXG4gIC8qKiBAc3VtbWFyeSBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYSBub3RpZmljYXRpb24gaGFuZGxlclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCB0aGUgbm90aWZpY2F0aW9uIHNpbmdsZXRvbiBoYW5kbGVyIHRoYXQgd2lsbCBoYW5kbGUgYWxsIGluY29taW5nIE5vdGlmaWNhdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFRoZSBub3RpZmljYXRpb24gaGFuZGxlciBnbG9iYWwgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249dG9wLXJpZ2h0XSAtIDxpPnRvcC1sZWZ0OyB0b3AtcmlnaHQ7IGJvdHRvbS1sZWZ0OyBib3R0b20tcmlnaHQ7PC9pPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudGhpY2tCb3JkZXI9dG9wXSAtIDxpPnRvcDsgYm90dG9tOyBsZWZ0OyByaWdodDsgbm9uZTs8L2k+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0zMDAwXSAtIE5vdGlmaWNhdGlvbiBsaWZlIGN5Y2xlIGR1cmF0aW9uIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRyYW5zaXRpb249MTAwXSAtIE5vdGlmaWNhdGlvbiBmYWRlIGFuaW1hdGlvbiB0cmFuc2l0aW9uIHRpbWluZyAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhBY3RpdmU9NV0gLSBNYXhpbXVtIG9mIHNpbXVsdGFuZW91c2x5IG9wZW5lZCBub3RpZmljYXRpb24gaW4gcmFuZ2UgTiogKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICghIU5vdGlmaWNhdGlvbi5pbnN0YW5jZSkgeyAvLyBHb0YgU2luZ2xldG9uXG4gICAgICByZXR1cm4gTm90aWZpY2F0aW9uLmluc3RhbmNlO1xuICAgIH1cbiAgICBOb3RpZmljYXRpb24uaW5zdGFuY2UgPSB0aGlzO1xuICAgIC8vIEF0dHJpYnV0ZXMgZGVjbGFyYXRpb25cbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtib29sZWFufSAtIERpc21pc3MgYWxsIG9wZXJhdGlvbiBpbiBwcm9ncmVzcyBmbGFnICovXG4gICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gTm90aWZpY2F0aW9uIGhhbmRsZXIgY29udGFpbmVyIG5vZGUgKi9cbiAgICB0aGlzLl9kb20gPSB7fTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gQWN0aXZlIG5vdGlmaWNhdGlvbnMgb2JqZWN0IDogcmV0cmlldmUgYSBub3RpZmljYXRpb24gdXNpbmcgaXRzIElEICh0aGlzLl9hY3RpdmVbSURdKSAqL1xuICAgIHRoaXMuX2FjdGl2ZSA9IHt9O1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBRdWV1ZSBub3RpZmljYXRpb25zIHdoZW4gbWF4IGFjdGl2ZSBoYXMgYmVlbiByZWFjaGVkICovXG4gICAgdGhpcy5fcXVldWUgPSB7fTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gTm90aWZpY2F0aW9uIGhhbmRsZXIgZGVmYXVsdCB2YWx1ZXMgKi9cbiAgICB0aGlzLl9kZWZhdWx0ID0ge307XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSBoYW5kbGVyIHBvc2l0aW9uIGluIHZpZXdwb3J0IC0gPGk+dG9wLWxlZnQ7IHRvcC1yaWdodDsgYm90dG9tLWxlZnQ7IGJvdHRvbS1yaWdodDs8L2k+ICovXG4gICAgdGhpcy5fcG9zaXRpb24gPSAnJztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gVGhlIHRoaWNrIGJvcmRlciBwb3NpdGlvbiBpbiB0aGUgTm90aWZpY2F0aW9uIC0gPGk+dG9wOyBib3R0b207IGxlZnQ7IHJpZ2h0OyBub25lOzwvaT4gKi9cbiAgICB0aGlzLl90aGlja0JvcmRlciA9ICcnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBUaGUgTm90aWZpY2F0aW9uIG9uIHNjcmVlbiBkdXJhdGlvbiBpbiBtcyAqL1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGZhZGUgdHJhbnNpdGlvbiB0aW1lIGluIG1zICovXG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IDA7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBhY3RpdmUgTm90aWZpY2F0aW9uICovXG4gICAgdGhpcy5fbWF4QWN0aXZlID0gMDtcbiAgICAvKiogQHB1YmxpY1xuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBUaGUgY29tcG9uZW50IHZlcnNpb24gKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnMS4xLjAnO1xuICAgIC8vIEJ1aWxkIHNpbmdsZXRvbiBhbmQgYXR0YWNoXG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICAvLyBSZXR1cm4gc2luZ2xldG9uXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBNYXJjaCAyMDE5XG4gICAqIEBkZXNjcmlwdGlvbiBEZXN0cm95IHRoZSBzaW5nbGV0b24gYW5kIGRldGFjaCBpdCBmcm9tIHRoZSBET00gKi9cbiAgZGVzdHJveSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2RvbSk7XG4gICAgLy8gRGVsZXRlIG9iamVjdCBhdHRyaWJ1dGVzXG4gICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICB9KTtcbiAgICAvLyBDbGVhciBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICBOb3RpZmljYXRpb24uaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE5PVElGSUNBVElPTiBKUyBIQU5ETEVSIENPTlNUUlVDVElPTiBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIGZvbGxvd2luZyBtZXRob2RzIG9ubHkgY29uY2VybnMgdGhlIHNpbmdsZXRvbiBjcmVhdGlvbi4gSXQgaGFuZGxlIGFsbCBhcmd1bWVudHMgYW5kIHdpbGwgZmFsbGJhY2sgb24gICAgICAgICovXG4gIC8qICBkZWZhdWx0IHZhbHVlcyBpZiBhbnkgYXJndW1lbnQgZG9lc24ndCBtZWV0IGl0cyBleHBlY3RlZCB2YWx1ZSBvciB0eXBlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdGhlIGhhbmRsZXIgRE9NIGVsZW1lbnQsIHNldCBkZWZhdWx0IHZhbHVlcywgdGVzdCBnaXZlbiBvcHRpb25zIGFuZCBwcm9wZXJseSBhZGQgQ1NTIGNsYXNzIHRvIHRoZSBoYW5kbGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgZ2xvYmFsIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBvc2l0aW9uPXRvcC1yaWdodF0gLSA8aT50b3AtbGVmdDsgdG9wLXJpZ2h0OyBib3R0b20tbGVmdDsgYm90dG9tLXJpZ2h0OzwvaT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRoaWNrQm9yZGVyPXRvcF0gLSA8aT50b3A7IGJvdHRvbTsgbGVmdDsgcmlnaHQ7IG5vbmU7PC9pPlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MzAwMF0gLSBOb3RpZmljYXRpb24gbGlmZSBjeWNsZSBkdXJhdGlvbiAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy50cmFuc2l0aW9uPTEwMF0gIC0gTm90aWZpY2F0aW9uIGZhZGUgYW5pbWF0aW9uIHRyYW5zaXRpb24gdGltaW5nIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heEFjdGl2ZT01XSAtIE1heGltdW0gb2Ygc2ltdWx0YW5lb3VzbHkgb3BlbmVkIG5vdGlmaWNhdGlvbiBpbiByYW5nZSBOKiAqL1xuICBfaW5pdChvcHRpb25zKSB7XG4gICAgLy8gRGVjbGFyZSBvcHRpb25zIGFzIG9iamVjdCBpZiBlbXB0eVxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgLy8gQ3JlYXRlIG5vdGlmaWNhdGlvbiBtYWluIGNvbnRhaW5lclxuICAgIHRoaXMuX2RvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpOyAvLyBOb3RpZmljYXRpb24gaGFuZGxlciBET00gY29udGFpbmVyXG4gICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbi1jb250YWluZXInKTsgLy8gU2V0IHByb3BlciBDU1MgY2xhc3NcbiAgICAvLyBOb3RpZmljYXRpb24uanMgZGVmYXVsdCB2YWx1ZXNcbiAgICB0aGlzLl9kZWZhdWx0ID0ge1xuICAgICAgaGFuZGxlcjoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXG4gICAgICAgIHRoaWNrQm9yZGVyOiAndG9wJyxcbiAgICAgICAgZHVyYXRpb246IDUwMDAsXG4gICAgICAgIHRyYW5zaXRpb246IDIwMCxcbiAgICAgICAgbWF4QWN0aXZlOiAxMFxuICAgICAgfSxcbiAgICAgIG5vdGlmaWNhdGlvbjoge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGljb25sZXNzOiBmYWxzZSxcbiAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgIHN0aWNreTogZmFsc2UsXG4gICAgICAgIHJlbmRlclRvOiB0aGlzLl9kb20sXG4gICAgICAgIENCdGl0bGU6ICcnLFxuICAgICAgICBjYWxsYmFjazogbnVsbCxcbiAgICAgICAgaXNEaW1tZWQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgY29sb3I6IHtcbiAgICAgICAgc3VjY2VzczogJ3JnYig3NiwgMTc1LCA4MCknLFxuICAgICAgICBpbmZvOiAncmdiKDMsIDE2OSwgMjQ0KScsXG4gICAgICAgIHdhcm5pbmc6ICdyZ2IoMjU1LCAxNTIsIDApJyxcbiAgICAgICAgZXJyb3I6ICdyZ2IoMjQ0LCA2NywgNTQpJ1xuICAgICAgfSxcbiAgICAgIHN2Z1BhdGg6IHtcbiAgICAgICAgc3VjY2VzczogJ00xMi41IDBDNS42MDIgMCAwIDUuNjAyIDAgMTIuNVM1LjYwMiAyNSAxMi41IDI1IDI1IDE5LjM5OCAyNSAxMi41IDE5LjM5OCAwIDEyLjUgMHptLTIuMyAxOC44OThsLTUuNS01LjUgMS44LTEuNzk2IDMuNyAzLjY5OUwxOC41IDdsMS44IDEuOHptMCAwJyxcbiAgICAgICAgaW5mbzogJ00xMi41MDQuMDM1YTEyLjQ2OCAxMi40NjggMCAxMDAgMjQuOTM3IDEyLjQ2OCAxMi40NjggMCAwMDAtMjQuOTM3ek0xNS4xIDE5LjM1OWMtLjY0My4yNS0xLjE1My40NDUtMS41MzcuNTc2LS4zODQuMTM0LS44MjUuMTk5LTEuMzMzLjE5OS0uNzc1IDAtMS4zODEtLjE5Mi0xLjgxMy0uNTdhMS44MzIgMS44MzIgMCAwMS0uNjQyLTEuNDQyYzAtLjIyNy4wMTUtLjQ1OS4wNDctLjY5My4wMy0uMjQuMDgzLS41MDQuMTU0LS44MDZsLjgwMi0yLjgzNWMuMDY5LS4yNzIuMTMyLS41MjcuMTgyLS43Ny4wNDgtLjI0NC4wNjktLjQ2Ny4wNjktLjY2OCAwLS4zNi0uMDc1LS42MTUtLjIyMy0uNzU2LS4xNTMtLjE0NC0uNDM3LS4yMTMtLjg1Ny0uMjEzLS4yMDcgMC0uNDIyLjAzNi0uNjM5LjA5NWE5LjkxNCA5LjkxNCAwIDAwLS41Ni4xODRsLjIxMy0uODc0YTE5Ljc3NyAxOS43NzcgMCAwMTEuNTEtLjU0OSA0LjQ4IDQuNDggMCAwMTEuMzYxLS4yM2MuNzcgMCAxLjM2OC4xOSAxLjc4NC41NmExLjg1NyAxLjg1NyAwIDAxLjYyNiAxLjQ1MmMwIC4xMjItLjAxMi4zNDEtLjA0LjY1MmE0LjQ0IDQuNDQgMCAwMS0uMTYyLjg1NmwtLjc5OCAyLjgzMWE4LjEzMyA4LjEzMyAwIDAwLS4xNzYuNzc1Yy0uMDUuMjg4LS4wNzUuNTEtLjA3NS42NiAwIC4zNzQuMDgyLjYzMy4yNTEuNzcxLjE2NS4xMzQuNDU4LjIwMi44NzUuMjAyLjE5MiAwIC40MTItLjAzNy42Ni0uMS4yNDMtLjA3My40Mi0uMTI3LjUzMS0uMTh6bS0uMTQ0LTExLjQ4M2ExLjkwMSAxLjkwMSAwIDAxLTEuMzQzLjUxOCAxLjkzIDEuOTMgMCAwMS0xLjM1Mi0uNTE4IDEuNjUgMS42NSAwIDAxLS41NjItMS4yNTggMS42ODggMS42ODggMCAwMS41NjItMS4yNjYgMS45MTQgMS45MTQgMCAwMTEuMzUtLjUyMmMuNTI0IDAgLjk3NS4xNzMgMS4zNDUuNTIzYTEuNjczIDEuNjczIDAgMDEuNTYgMS4yNjYgMS42NSAxLjY1IDAgMDEtLjU2IDEuMjU3eicsXG4gICAgICAgIHdhcm5pbmc6ICdNMjQuNTg1IDIxLjE3TDEzLjc3NCAzLjI0YTEuNTEgMS41MSAwIDAwLTIuNTg2IDBMLjM3NiAyMS4xN2ExLjUxIDEuNTEgMCAwMDEuMjkzIDIuMjloMjEuNjIzYTEuNTEgMS41MSAwIDAwMS4yOTItMi4yOXpNMTIuNDkgOC43MTRjLjYyMSAwIDEuMTQ2LjM1IDEuMTQ2Ljk3IDAgMS44OTUtLjIyMyA0LjYxOC0uMjIzIDYuNTEzIDAgLjQ5NC0uNTQxLjctLjkyMy43LS41MSAwLS45NC0uMjA4LS45NC0uNzAxIDAtMS44OTQtLjIyMy00LjYxNy0uMjIzLTYuNTExIDAtLjYyLjUxLS45NzEgMS4xNjMtLjk3MXptLjAxNSAxMS43MzRhMS4yMjUgMS4yMjUgMCAwMS0xLjIyNS0xLjIyNmMwLS42NjkuNTI1LTEuMjI3IDEuMjI1LTEuMjI3LjY1MiAwIDEuMjEuNTU4IDEuMjEgMS4yMjcgMCAuNjUyLS41NTcgMS4yMjUtMS4yMSAxLjIyNXonLFxuICAgICAgICBlcnJvcjogJ00xMi40NjkuMDI3Yy0zLjMzMiAwLTYuNDY1IDEuMzAxLTguODI0IDMuNjUzLTQuODYgNC44Ni00Ljg2IDEyLjc3NyAwIDE3LjYzNmExMi4zOTIgMTIuMzkyIDAgMDA4LjgyNCAzLjY1M2MzLjMzNiAwIDYuNDY1LTEuMzAxIDguODI0LTMuNjUzIDQuODYzLTQuODU5IDQuODYzLTEyLjc3NyAwLTE3LjYzNkExMi40MTcgMTIuNDE3IDAgMDAxMi40NjkuMDI3em01LjYxIDE4LjA4NmExLjEzNyAxLjEzNyAwIDAxLS44MDIuMzMyYy0uMjg1IDAtLjU4Mi0uMTEzLS44LS4zMzJsLTQuMDA4LTQuMDA4LTQuMDA4IDQuMDA4YTEuMTM3IDEuMTM3IDAgMDEtLjguMzMyYy0uMjg2IDAtLjU4My0uMTEzLS44MDItLjMzMmExLjEzMiAxLjEzMiAwIDAxMC0xLjYwNWw0LjAwOC00LjAwNEw2Ljg2IDguNDk2YTEuMTMyIDEuMTMyIDAgMDEwLTEuNjA1IDEuMTI3IDEuMTI3IDAgMDExLjYwMiAwbDQuMDA4IDQuMDA3IDQuMDA4LTQuMDA3YTEuMTI3IDEuMTI3IDAgMDExLjYwMSAwYy40NS40NDkuNDUgMS4xNjQgMCAxLjYwNWwtNC4wMDQgNC4wMDggNC4wMDQgNC4wMDRjLjQ1LjQ0OS40NSAxLjE2NCAwIDEuNjA1em0wIDAnXG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBCdWlsZCBzaW5nbGV0b24gZnJvbSBvcHRpb25zIGFuZCBzYW5pdGl6ZSB0aGVtXG4gICAgdGhpcy5fc2V0T3B0aW9uc0RlZmF1bHQob3B0aW9ucyk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uO1xuICAgIHRoaXMuX3RoaWNrQm9yZGVyID0gb3B0aW9ucy50aGlja0JvcmRlcjtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IG9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB0aGlzLl9tYXhBY3RpdmUgPSBvcHRpb25zLm1heEFjdGl2ZTtcbiAgICB0aGlzLl9zZXRBdHRyaWJ1dGVzRGVmYXVsdCgpO1xuICAgIC8vIEFkZCBwb3NpdGlvbiBDU1MgY2xhc3Mgb25seSBhZnRlciB0aGlzLl9wb3NpdGlvbiBpcyBzdXJlIHRvIGJlIGEgdmFsaWQgdmFsdWVcbiAgICB0aGlzLl9kb20uY2xhc3NMaXN0LmFkZCh0aGlzLl9wb3NpdGlvbik7XG4gICAgdGhpcy5fYXR0YWNoKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRPcHRpb25zRGVmYXVsdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IFNldCBzaW5nbGV0b24gb3B0aW9uc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgdGhlIG5vdGlmaWNhdGlvbiBzaW5nbGV0b24gYWNjb3JkaW5nIHRvIHRoZSB1c2VyIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgc2luZ2xldG9uIG9wdGlvbnMgdG8gc2V0ICovXG4gIF9zZXRPcHRpb25zRGVmYXVsdChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRoaWNrQm9yZGVyID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRoaWNrQm9yZGVyO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIuZHVyYXRpb247XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudHJhbnNpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRyYW5zaXRpb24gPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5tYXhBY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5tYXhBY3RpdmUgPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIubWF4QWN0aXZlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3NldEF0dHJpYnV0ZXNEZWZhdWx0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQHN1bW1hcnkgQ2hlY2sgdGhlIG5vdGlmaWNhdGlvbiBzaW5nbGV0b24gb3B0aW9ucyB2YWxpZGl0eVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gRmFsbGJhY2sgb24gZGVmYXVsdCBhdHRyaWJ1dGVzIHZhbHVlIGlmIHRoZSBub3RpZmljYXRpb24gc2luZ2xldG9uIG9wdGlvbnMgYXJlIGludmFsaWQgKi9cbiAgX3NldEF0dHJpYnV0ZXNEZWZhdWx0KCkge1xuICAgIGlmICh0aGlzLl9wb3NpdGlvbiAhPT0gJ3RvcC1sZWZ0JyAmJiAvKiBJbGxlZ2FsIHZhbHVlIGZvciBwb3NpdGlvbiAqL1xuICAgICAgdGhpcy5fcG9zaXRpb24gIT09ICd0b3AtcmlnaHQnICYmXG4gICAgICB0aGlzLl9wb3NpdGlvbiAhPT0gJ2JvdHRvbS1sZWZ0JyAmJlxuICAgICAgdGhpcy5fcG9zaXRpb24gIT09ICdib3R0b20tcmlnaHQnKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl90aGlja0JvcmRlciAhPT0gJ3RvcCcgJiYgLyogSWxsZWdhbCB2YWx1ZSBmb3IgdGhpY2sgYm9yZGVyICovXG4gICAgICB0aGlzLl90aGlja0JvcmRlciAhPT0gJ2JvdHRvbScgJiZcbiAgICAgIHRoaXMuX3RoaWNrQm9yZGVyICE9PSAnbGVmdCcgJiZcbiAgICAgIHRoaXMuX3RoaWNrQm9yZGVyICE9PSAncmlnaHQnICYmXG4gICAgICB0aGlzLl90aGlja0JvcmRlciAhPT0gJ25vbmUnKSB7XG4gICAgICB0aGlzLl90aGlja0JvcmRlciA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50aGlja0JvcmRlcjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5fZHVyYXRpb24gIT09ICdudW1iZXInIHx8IHRoaXMuX2R1cmF0aW9uIDw9IDApIHsgLy8gSWxsZWdhbCB2YWx1ZSBmb3IgZHVyYXRpb25cbiAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLmR1cmF0aW9uOyAvLyBEZWZhdWx0IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl90cmFuc2l0aW9uICE9PSAnbnVtYmVyJyB8fCB0aGlzLl9kdXJhdGlvbiA8ICh0aGlzLl90cmFuc2l0aW9uICogMikgfHwgdGhpcy5fdHJhbnNpdGlvbiA8PSAwKSB7IC8vIFRyYW5zaXRpb24gb3ZlciAoZHVyYXRpb24gLyAyKVxuICAgICAgdGhpcy5fdHJhbnNpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50cmFuc2l0aW9uOyAvLyBEZWZhdWx0IHZhbHVlIGZvciBfbWF4QWN0aXZlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhBY3RpdmUgIT09ICdudW1iZXInIHx8IHRoaXMuX21heEFjdGl2ZSA8PSAwKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIG1heEFjdGl2ZVxuICAgICAgdGhpcy5fbWF4QWN0aXZlID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLm1heEFjdGl2ZTsgLy8gRGVmYXVsdCB2YWx1ZSBmb3IgX21heEFjdGl2ZVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2F0dGFjaFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEF0dGFjaCB0aGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgdG8gdGhlIGRvbSB1c2luZyBhIGZyYWdtZW50ICovXG4gIF9hdHRhY2goKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5fZG9tKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTk9USUZJQ0FUSU9OIFNQRUNJRklDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIFRoZSBmb2xsb3dpbmcgbWV0aG9kcyBpbXBsZW1lbnRzIG5vdGlmaWNhdGlvbiBmZWF0dXJlcy4gSXQgaGFuZGxlIGl0cyBldmVudHMsIGxpZmVjeWNsZSBkZXBlbmRpbmcgb24gaXRzICAgICAgICAqL1xuICAvKiAgcGFyYW1ldGVycywgaXRzIERPTSBzdHJ1Y3R1cmUsIGFuZCBpdHMgYW5pbWF0aW9ucy4gVGhlIE5vdGlmaWNhdGlvbiBzaW5nbGV0b24gd2lsbCBoYW5kbGUgdGhlIG5vdGlmaWNhdGlvbiAgICAgICovXG4gIC8qICBzdGFja2luZyB0aGUgaW4gdXNlciBpbnRlcmZhY2UuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBtb3VzZSBldmVudHMgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn19IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgLSBOb3RpZmljYXRpb24gaW5uZXIgY2FsbCBjb3VudGVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24udGltZW91dElEIC0gTm90aWZpY2F0aW9uIG93biBzZXRUaW1lb3V0IElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnICovXG4gIF9ldmVudHMobm90aWZpY2F0aW9uKSB7XG4gICAgbGV0IGNsb3NlRmlyZWQgPSBmYWxzZTsgLy8gQ2xvc2UgZmlyZWQgZmxhZ1xuXG4gICAgLy8gSW5uZXIgY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgY29uc3QgX3VuRGltID0gKCkgPT4geyAvLyBVbmRpbSBub3RpZmljYXRpb25cbiAgICAgIGlmIChub3RpZmljYXRpb24uaXNEaW1tZWQpIHtcbiAgICAgICAgdGhpcy5fdW5EaW0obm90aWZpY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgX2Nsb3NlID0gKCkgPT4geyAvLyBDbG9zZSBub3RpZmljYXRpb25cbiAgICAgIGlmICh0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID4gMSkge1xuICAgICAgICB0aGlzLl9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgbm90aWZpY2F0aW9uIGVsZW1lbnQgZnJvbSB0aGUgRE9NIHRyZWVcbiAgICAgIGVsc2UgaWYgKCFjbG9zZUZpcmVkKSB7XG4gICAgICAgIGNsb3NlRmlyZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG5vdGlmaWNhdGlvbi50aW1lb3V0SUQpOyAvLyBDbGVhciBsaWZlIGN5Y2xlIHRpbWVvdXRcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbG9zZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZSk7IC8vIEF2b2lkIGVycm9yIHdoZW4gc3BhbSBjbGlja2luZyB0aGUgY2xvc2UgYnV0dG9uXG4gICAgICAgIHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IF9yZXNldFRpbWVvdXQgPSAoKSA9PiB7IC8vIFJlc2V0IGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNsb3NlRmlyZWQgJiYgIW5vdGlmaWNhdGlvbi5pc0RpbW1lZCkgeyAvLyBPbmx5IHJlc2V0IHRpbWVvdXQgaWYgbm8gY2xvc2UgZXZlbnQgaGFzIGJlZW4gZmlyZWRcbiAgICAgICAgdGhpcy5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1vdXNlIGV2ZW50IGxpc3RlbmVyc1xuICAgIGlmIChub3RpZmljYXRpb24uc3RpY2t5KSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBfdW5EaW0uYmluZCh0aGlzKSk7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgX3VuRGltLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChub3RpZmljYXRpb24uY2xvc2FibGUpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgX3Jlc2V0VGltZW91dC5iaW5kKHRoaXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkVUlcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZHMgdGhlIERPTSBlbGVtZW50IHRoYXQgY29udGFpbnMgYW5kIHRoYXQgYWRhcHRzIHRvIGFsbCBnaXZlbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnR5cGUgLSBFcnJvciwgV2FybmluZywgSW5mbywgU3VjY2Vzc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnRpdGxlIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24ubWVzc2FnZSAtIE5vdGlmaWNhdGlvbiBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmljb25sZXNzIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24udGhpY2tCb3JkZXIgLSBOb3RpZmljYXRpb24gYm9yZGVyIHNpZGUgKG92ZXJyaWRlIGhhbmRsZXIgc2lkZSB2YWx1ZSlcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE1ha2Ugbm90aWZpY2F0aW9uIHN0aWNreSBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24uQ0J0aXRsZSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBub3RpZmljYXRpb24uY2FsbGJhY2sgLSBOb3RpZmljYXRpb24gY2FsbGJhY2sgYnV0dG9uXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEVuaGFuY2VkIGFuZCByZWFkeSBub3RpZmljYXRpb24gb2JqZWN0ICovXG4gIF9idWlsZFVJKG5vdGlmaWNhdGlvbikge1xuICAgIG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPSAxO1xuICAgIG5vdGlmaWNhdGlvbi50b3RhbFJlcXVlc3RDb3VudCA9IDE7XG4gICAgdGhpcy5fYnVpbGRVSURvbShub3RpZmljYXRpb24pO1xuICAgIHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uVHlwZShub3RpZmljYXRpb24pO1xuXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb25sZXNzLXdpZHRoJyk7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20ubWFpbnRpdGxlKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlKTtcbiAgICAvLyBBZGQgY2FsbGJhY2sgYnV0dG9uIGFuZCBsaXN0ZW5lciBpZiBuZWVkZWRcbiAgICBpZiAobm90aWZpY2F0aW9uLmNhbGxiYWNrKSB7XG4gICAgICBjb25zdCBjYWxsYmFja0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0JVVFRPTicpO1xuICAgICAgY2FsbGJhY2tCdXR0b24uaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLkNCdGl0bGU7XG4gICAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQoY2FsbGJhY2tCdXR0b24pO1xuICAgICAgY2FsbGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEZpbGwgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50XG4gICAgaWYgKCFub3RpZmljYXRpb24uaWNvbmxlc3MpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5pY29uKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20udGV4dCk7XG4gICAgLy8gQXBwZW5kIGNsb3NlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICBpZiAobm90aWZpY2F0aW9uLmNsb3NhYmxlKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20uY2xvc2UpO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gZmluYWwgbm90aWZpY2F0aW9uXG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkVUlEb21cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAc3VtbWFyeSBDcmVhdGUgdGhlIE5vdGlmaWNhdGlvbiBET00gdHJlZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTWFyY2ggMjAxOVxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYWxsIHRoZSBOb3RpZmljYXRpb24gaW50ZXJuYWwgc3RydWN0dXJlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIHRvIGNyZWF0ZSAqL1xuICBfYnVpbGRVSURvbShub3RpZmljYXRpb24pIHtcbiAgICAvLyBDcmVhdGUgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50c1xuICAgIG5vdGlmaWNhdGlvbi5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvblBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BhdGgnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdINicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKTtcbiAgICAvLyBDbGFzcyBhc3NpZ25hdGlvblxuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLmNsYXNzTGlzdC5hZGQoJ3ZlY3Rvci1jb250YWluZXInKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1jb250YWluZXInKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgLy8gQ2hhbmdpbmcgYm9yZGVyIHNpZGVcbiAgICBpZiAobm90aWZpY2F0aW9uLnRoaWNrQm9yZGVyID09PSAndG9wJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCd0b3AtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdib3R0b20nKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2JvdHRvbS1ib3JkZXInKTtcbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi50aGlja0JvcmRlciA9PT0gJ2xlZnQnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2xlZnQtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdyaWdodCcpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgncmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuICAgIC8vIFRleHQgbW9kaWZpY2F0aW9uXG4gICAgbm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUuaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLnRpdGxlIHx8ICcnO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWVzc2FnZS5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ubWVzc2FnZSB8fCAnJztcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmlubmVySFRNTCA9ICcmI3gyNzE2Oyc7XG4gICAgLy8gSW1hZ2UgdmVjdG9yXG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLnNldEF0dHJpYnV0ZSgndmlld0JveCcsICcwIDAgMjUgMjUnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLmljb24uc2V0QXR0cmlidXRlKCd3aWR0aCcsICcyNScpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcyNScpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLmljb25QYXRoKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkTm90aWZpY2F0aW9uVHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IEF0dGFjaCBwcm9wZXIgYXNzZXRzIGFuZCBjc3NcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE1hcmNoIDIwMTlcbiAgICogQGRlc2NyaXB0aW9uIEZpbGxzIHRoZSBOb3RpZmljYXRpb24gaWNvbiBhbmQgY2xhc3MgYWNjb3JkaW5nIHRvIGl0cyBpbm5lciB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIHRvIGZpbGwgKi9cbiAgX2J1aWxkTm90aWZpY2F0aW9uVHlwZShub3RpZmljYXRpb24pIHtcbiAgICAvLyBUeXBlIHNwZWNpZmljYXRpb24gKHRpdGxlLCBpY29uLCBjb2xvcilcbiAgICBpZiAoWydzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnaW5mbyddLmluZGV4T2Yobm90aWZpY2F0aW9uLnR5cGUpICE9PSAtMSl7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQobm90aWZpY2F0aW9uLnR5cGUpO1xuXG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmljb25QYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIHRoaXMuX2RlZmF1bHQuY29sb3Jbbm90aWZpY2F0aW9uLnR5cGVdKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5pY29uUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLl9kZWZhdWx0LnN2Z1BhdGhbbm90aWZpY2F0aW9uLnR5cGVdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdpbmZvJyk7XG5cbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvblBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5fZGVmYXVsdC5jb2xvci5pbmZvKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5pY29uUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLl9kZWZhdWx0LnN2Z1BhdGguaW5mbyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RhcnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYWxsIHRoaXMgbWV0aG9kIHRvIGFkZCB0aGUgbmV3IG5vdGlmaWNhdGlvbiB0byB0aGUgRE9NIGNvbnRhaW5lciwgYW5kIGxhdW5jaCBpdHMgbGlmZSBjeWNsZVxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBvd24gSUQgKi9cbiAgX3N0YXJ0KG5vdGlmaWNhdGlvbikge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9hY3RpdmUpLmxlbmd0aCA+PSB0aGlzLl9tYXhBY3RpdmUpIHtcbiAgICAgIHRoaXMuX3F1ZXVlW25vdGlmaWNhdGlvbi5pZF0gPSBub3RpZmljYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdID0gbm90aWZpY2F0aW9uOyAvLyBBcHBlbmQgdGhlIG5ldyBub3RpZmljYXRpb24gdG8gdGhlIF9hY3RpdmUgb2JqZWN0XG5cbiAgICAgIHRoaXMuX2V2ZW50cyhub3RpZmljYXRpb24pOyAvLyBMaXN0ZW4gdG8gbW91c2UgZXZlbnRzIG9uIHRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvblxuICAgICAgdGhpcy5fb3Blbihub3RpZmljYXRpb24pOyAvLyBPcGVuIHRoZSBuZXcgbm90aWZpY2F0aW9uXG5cbiAgICAgIG5vdGlmaWNhdGlvbi50aW1lb3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrQ291bnRlcihub3RpZmljYXRpb24pOyAvLyBDaGVjayBub3RpZmljYXRpb24gcmVxdWVzdCBjb3VudCB0byBhY3QgYWNjb3JkaW5nbHlcbiAgICAgIH0sIG5vdGlmaWNhdGlvbi5kdXJhdGlvbik7IC8vIFVzZSBOb3RpZmljYXRpb24gbWFzdGVyIGR1cmF0aW9uXG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfb3BlblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE9wZW4gYW5kIGFkZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSBjb250YWluZXJcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn19IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnQgKi9cbiAgX29wZW4obm90aWZpY2F0aW9uKSB7XG4gICAgLy8gUmV2ZXJzZSBpbnNlcnRpb24gd2hlbiBub3RpZmljYXRpb25zIGFyZSBvbiBib3R0b21cbiAgICBpZiAodGhpcy5fcG9zaXRpb24gPT09ICdib3R0b20tcmlnaHQnIHx8IHRoaXMuX3Bvc2l0aW9uID09PSAnYm90dG9tLWxlZnQnKSB7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8uaW5zZXJ0QmVmb3JlKG5vdGlmaWNhdGlvbi5kb20sIG5vdGlmaWNhdGlvbi5yZW5kZXJUby5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWZpY2F0aW9uLnJlbmRlclRvLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20pO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5vcGVuZWQgPSBEYXRlLm5vdygpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfSwgMTApO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfY2xvc2VcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDbG9zZSBhbmQgcmVtb3ZlIHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgY29udGFpbmVyXG4gICAqIEBwYXJhbSB7e2lkOiBudW1iZXJ9fHtpZDogbnVtYmVyLCBkb206IE9iamVjdCwgcmVxdWVzdENvdW50OiBudW1iZXIsIHRpbWVvdXRJRDogbnVtYmVyLCBzdGlja3k6IGJvb2xlYW4sIGNsb3NhYmxlOiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNDbG9zaW5nIC0gQWxyZWFkeSBjbG9zaW5nIGZsYWdcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLnJlbmRlclRvIC0gRE9NIG9iamVjdCB0byByZW5kZXIgdGhlIG5vdGlmaWNhdGlvbiBpbiAqL1xuICBfY2xvc2Uobm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pc0Nsb3NpbmcpIHsgLy8gQXZvaWQgZG91YmxlIGNsb3NlIG9uIGEgbm90aWZpY2F0aW9uIChpbiBjYXNlIGRpc21pc3MvZGlzbWlzc0FsbCBpcyB0cmlnZ2VycmVkIHdoZW4gbm90aWZpY2F0aW9uIGlzIGFscmVhZHkgY2xvc2luZylcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uaXNDbG9zaW5nID0gdHJ1ZTsgLy8gTG9jayBub3RpZmljYXRpb24gdG8gb25lIGZhZGVPdXQgYW5pbWF0aW9uXG4gICAgbm90aWZpY2F0aW9uLmNsb3NlZCA9IERhdGUubm93KCk7XG4gICAgbm90aWZpY2F0aW9uLmVmZmVjdGl2ZUR1cmF0aW9uID0gbm90aWZpY2F0aW9uLmNsb3NlZCAtIG5vdGlmaWNhdGlvbi5vcGVuZWQ7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8ucmVtb3ZlQ2hpbGQobm90aWZpY2F0aW9uLmRvbSk7IC8vIFJlbW92ZSB0aGlzIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBET00gdHJlZVxuICAgICAgZGVsZXRlIHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdO1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fcXVldWUpLmxlbmd0aCA+IDApIHsgLy8gTm90aWZpY2F0aW9uIHF1ZXVlIGlzIG5vdCBlbXB0eVxuICAgICAgICB0aGlzLl9zdGFydCh0aGlzLl9xdWV1ZVtPYmplY3Qua2V5cyh0aGlzLl9xdWV1ZSlbMF1dKTsgLy8gU3RhcnQgZmlyc3QgcXVldWVkIG5vdGlmaWNhdGlvblxuICAgICAgICBkZWxldGUgdGhpcy5fcXVldWVbT2JqZWN0LmtleXModGhpcy5fcXVldWUpWzBdXTsgLy8gU2hpZnQgcXVldWUgb2JqZWN0XG4gICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoID09PSAwKSB7IC8vIENoZWNrIHRoaXMuX2FjdGl2ZSBlbXB0eW5lc3NcbiAgICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTsgLy8gVW5sb2NrIGRpc21pc3NBbGxMb2NrXG4gICAgICB9XG4gICAgfSwgMTAwMCk7IC8vIFRyYW5zaXRpb24gdmFsdWUgc2V0IGluIF9ub3RpZmljYXRpb24uc2Nzc1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5jcmVtZW50UmVxdWVzdENvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiBhIG5vdGlmaWNhdGlvbiBpcyByZXF1ZXN0ZWQgYW5vdGhlciB0aW1lXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSkgKi9cbiAgX2luY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbikge1xuICAgICsrbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDsgLy8gSW5jcmVtZW50IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnRcblxuICAgIGlmIChub3RpZmljYXRpb24udG90YWxSZXF1ZXN0Q291bnQgPCBub3RpZmljYXRpb24ucmVxdWVzdENvdW50KSB7XG4gICAgICBub3RpZmljYXRpb24udG90YWxSZXF1ZXN0Q291bnQgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBjb3VudGVyIERPTSBlbGVtZW50XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICBsZXQgdmFsdWVUb0Rpc3BsYXkgPSAn4oieJztcbiAgICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50IDwgMTAwKSB7XG4gICAgICAgIHZhbHVlVG9EaXNwbGF5ID0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcikgeyAvLyBVcGRhdGUgZXhpc3RpbmcgY291bnRlclxuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gdmFsdWVUb0Rpc3BsYXk7XG4gICAgICB9IGVsc2UgeyAvLyBDcmVhdGUgY291bnRlciBET00gZWxlbWVudFxuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyLmNsYXNzTGlzdC5hZGQoJ2NvdW50ZXInKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyLmlubmVySFRNTCA9IHZhbHVlVG9EaXNwbGF5O1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVW5kaW0gbm90aWZpY2F0aW9uIGlmIGl0IGlzIGEgc3RpY2t5L2RpbW1lZCBvbmVcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiBub3RpZmljYXRpb24uaXNEaW1tZWQpIHtcbiAgICAgIHRoaXMuX3VuRGltKG5vdGlmaWNhdGlvbik7XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfZGVjcmVtZW50UmVxdWVzdENvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZWFjaCBub3RpZmljYXRpb24gY3ljbGUgZW5kIHRvIHVwZGF0ZSBpdHMgaW5uZXIgY291bnRlclxuICAgKiBAcGFyYW0ge3tpZDogbnVtYmVyLCBkb206IE9iamVjdCwgcmVxdWVzdENvdW50OiBudW1iZXIsIHRpbWVvdXRJRDogbnVtYmVyLCBzdGlja3k6IGJvb2xlYW4sIGNsb3NhYmxlOiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uc3RpY2t5IC0gTm90aWZpY2F0aW9uIHN0aWNreSBiZWh2YWlvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5pc0RpbW1lZCAtIE5vdGlmaWNhdGlvbiBkaW1tZWQgc3RhdHVzIChvbmx5IHVzZWZ1bCBpZiBub3RpZmljYXRpb24uc3RpY2t5IGlzIHRydWUpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50IC0gTm90aWZpY2F0aW9uIGlubmVyIGNhbGwgY291bnRlclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWNhdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlIC0gVG8gZm9yY2UgdGhlIG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgZGVjcmVtZW50YXRpb24gKi9cbiAgX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbiwgZm9yY2UpIHtcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiAhZm9yY2UpIHtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmlzRGltbWVkKSB7XG4gICAgICAgIHRoaXMuX2RpbShub3RpZmljYXRpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7XG4gICAgLS1ub3RpZmljYXRpb24ucmVxdWVzdENvdW50OyAvLyBEZWNyZW1lbnQgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudFxuXG4gICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgIGxldCB2YWx1ZVRvRGlzcGxheSA9ICfiiJ4nO1xuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPCAxMDApIHtcbiAgICAgICAgdmFsdWVUb0Rpc3BsYXkgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgICAgfVxuXG4gICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gdmFsdWVUb0Rpc3BsYXk7XG4gICAgfSBlbHNlIHsgLy8gUmVtb3ZlIGNvdW50ZXIgZWxlbWVudCBmcm9tIHRoZSBET00gdHJlZVxuICAgICAgbm90aWZpY2F0aW9uLmRvbS5yZW1vdmVDaGlsZChub3RpZmljYXRpb24uZG9tLmNvdW50ZXIpO1xuICAgICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5kb20uY291bnRlcjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jaGVja0NvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB3aWxsIHJlc2V0IHRoZSBmYWRlb3V0L2RpbSB0aW1lb3V0IG9yIGNsb3NlL2RpbSB0aGUgbm90aWZpY2F0aW9uIGRlcGVuZGluZyBvbiBpdHMgcmVxdWVzdENvdW50XG4gICAqIEBwYXJhbSB7e2lkOiBudW1iZXJ9fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yICovXG4gIF9jaGVja0NvdW50ZXIobm90aWZpY2F0aW9uKSB7XG4gICAgLy8gVGhpcyBub3RpZmljYXRpb24gYXMgc3RpbGwgbW9yZSB0aGFuIG9uZSBjeWNsZSB0byBsaXZlXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICB0aGlzLl9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24pO1xuICAgIH0gZWxzZSB7IC8vIFRoaXMgbm90aWZpY2F0aW9uIHJlYWNoZWQgdGhlIGVuZCBvZiBpdHMgbGlmZSBjeWNsZVxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZW5kZXJUby5jb250YWlucyhub3RpZmljYXRpb24uZG9tKSkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KG5vdGlmaWNhdGlvbi50aW1lb3V0SUQpO1xuICAgICAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSkgeyAvLyBGYWRlT3V0L0RpbSBkZXBlbmRpbmcgb24gc3RpY2t5IGJlaGF2aW9yXG4gICAgICAgICAgdGhpcy5fZGltKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2Uobm90aWZpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NsZWFyUmVxdWVzdENvdW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTWV0aG9kIHRoYXQgY2xlYXIgZXZlcnkgcGVuZGluZyByZXF1ZXN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50ICovXG4gIF9jbGVhclJlcXVlc3RDb3VudChub3RpZmljYXRpb24pIHtcbiAgICBub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID0gMTtcbiAgICBub3RpZmljYXRpb24uZG9tLnJlbW92ZUNoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5kb20uY291bnRlcjtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX3Jlc2V0VGltZW91dFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVzZSB0aGlzIHRvIHJlc2V0IGEgbm90aWZpY2F0aW9uIGxpZmUgY3ljbGUsIGFuZCBkZWxheSBpdHMgY2xvc2UgZXZlbnRcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlcn18e2lkOiBudW1iZXIsIGRvbTogT2JqZWN0LCByZXF1ZXN0Q291bnQ6IG51bWJlciwgdGltZW91dElEOiBudW1iZXIsIHN0aWNreTogYm9vbGVhbiwgY2xvc2FibGU6IGJvb2xlYW59fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRCAqL1xuICBfcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbikge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobm90aWZpY2F0aW9uLnRpbWVvdXRJRCk7IC8vIENsZWFyIHByZXZpb3VzIGxpZmUgY3ljbGVcbiAgICBub3RpZmljYXRpb24udGltZW91dElEID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY2hlY2tDb3VudGVyKG5vdGlmaWNhdGlvbik7IC8vIENoZWNrIG5vdGlmaWNhdGlvbiByZXF1ZXN0IGNvdW50IHRvIGFjdCBhY2NvcmRpbmdseVxuICAgIH0sIG5vdGlmaWNhdGlvbi5kdXJhdGlvbik7IC8vIFVzZSBOb3RpZmljYXRpb24gbWFzdGVyIGR1cmF0aW9uXG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kaW1cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBPbmx5IHVzZWZ1bCBmb3Igc3RpY2t5IG5vdGlmaWNhdGlvbiB0aGF0IGRpbSBpbnN0ZWFkIG9mIGNsb3NlIGF0IHRoZSBlbmQgb2YgaXRzIGxpZmUgY3ljbGVcbiAgICogQHBhcmFtIHt7aWQ6IG51bWJlciwgcmVxdWVzdENvdW50OiBudW1iZXIsIGRvbTogT2JqZWN0LCB0aW1lb3V0SUQ6IG51bWJlciwgc3RpY2t5OiBib29sZWFufX0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSkgKi9cbiAgX2RpbShub3RpZmljYXRpb24pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaSA9IDEwMDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVPdXQoKSB7IC8vIFN0YXJ0IGFuaW1hdGlvbiBpbW1lZGlhdGx5XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgIC0taTtcblxuICAgICAgICBpZiAoaSA9PT0gNTAgJiYgbm90aWZpY2F0aW9uLnN0aWNreSkgeyAvLyBPcGFjaXR5IGhhcyByZWFjaGVkIDAuNTFcbiAgICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAwLjU7IC8vIFNldCBoYWxmIHRyYW5zcGFyZW5jeSBvbiBub3RpZmljYXRpb25cbiAgICAgICAgICBub3RpZmljYXRpb24uaXNEaW1tZWQgPSB0cnVlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGhhbGZGYWRlT3V0LCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfdW5EaW1cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYWxsIHRoaXMgbWV0aG9kIHdoZW4gYSBub3RpZmljYXRpb24gaXMgbm90IGluYWN0aXZlIGFueW1vcmVcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNEaW1tZWQgLSBOb3RpZmljYXRpb24gZGltbWVkIHN0YXR1cyAob25seSB1c2VmdWwgaWYgbm90aWZpY2F0aW9uLnN0aWNreSBpcyB0cnVlKSAqL1xuICBfdW5EaW0obm90aWZpY2F0aW9uKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGkgPSA1MDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVJbigpIHtcbiAgICAgIGlmIChpIDwgMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgICsraTtcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7IC8vIFNldCBmdWxsIHZpc2liaWxpdHkgb24gbm90aWZpY2F0aW9uXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pc0RpbW1lZCA9IGZhbHNlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgdGhhdC5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7IC8vIFJlc2V0IGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChoYWxmRmFkZUluLCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgU0lOR0xFIE5PVElGSUNBVElPTiBDT05TVFJVQ1RJT04gVVRJTFMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlIGZvbGxvd2luZyBtZXRob2RzIG9ubHkgY29uY2VybnMgYSBuZXcgbm90aWZpY2F0aW9uIHJlcXVlc3QuIEl0IHdpbGwgdGVzdCB0aGUgb3B0aW9ucyB2YWxpZGl0eSwgZGVmYXVsdCB0byAgICovXG4gIC8qICBmYWxsYmFjayB2YWx1ZSBpZiBuZWNlc3NhcnkgYW5kIGdpdmUgdGhlIG5vdGlmaWNhdGlvbiBhIHBzZXVkbyB1bmlxdWUgaWRlbnRpZmllci4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2NoZWNrTm90aWZpY2F0aW9uT3B0aW9uc1ZhbGlkaXR5XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQHN1bW1hcnkgQ2hlY2sgdGhlIE5vdGlmaWNhdGlvbiBvcHRpb25zIHZhbGlkaXR5XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBNYXJjaCAyMDE5XG4gICAqIEBkZXNjcmlwdGlvbiBDaGVjayBhIE5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCBhZ2FpbnN0IHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyB0byBjaGVjayB2YWxpZGl0eSAqL1xuICBfY2hlY2tOb3RpZmljYXRpb25PcHRpb25zVmFsaWRpdHkob3B0aW9ucykge1xuICAgIC8vIENoZWNrIGZvciBtYW5kYXRvcnkgYXJndW1lbnRzIGV4aXN0ZW5jZVxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgKG9wdGlvbnMudHlwZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMubWVzc2FnZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBleGlzdGluZyBtZXNzYWdlXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1lc3NhZ2UgIT09ICdzdHJpbmcnIHx8IG9wdGlvbnMubWVzc2FnZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgZm9yIHVuY2xvc2FibGUgYXQgYWxsIG5vdGlmaWNhdGlvblxuICAgIGlmIChvcHRpb25zLnN0aWNreSAmJiBvcHRpb25zLmNsb3NhYmxlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBUZXN0IE5vdGlmaWNhdGlvbiBpbm5lciB2YXJpYWJsZXMgdmFsaWRpdHlcbiAgICBpZiAob3B0aW9ucy50eXBlICE9PSAnaW5mbycgJiYgb3B0aW9ucy50eXBlICE9PSAnc3VjY2VzcycgJiYgb3B0aW9ucy50eXBlICE9PSAnd2FybmluZycgJiYgb3B0aW9ucy50eXBlICE9PSAnZXJyb3InKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi50eXBlO1xuICAgIH1cbiAgICAvLyBVbmxvY2sgZGlzbWlzc0FsbExvY2tcbiAgICBpZiAodGhpcy5fZGlzbWlzc0FsbExvY2spIHtcbiAgICAgIHRoaXMuX2Rpc21pc3NBbGxMb2NrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRPcHRpb25zRmFsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAc3VtbWFyeSBTZXQgTm90aWZpY2F0aW9uIGZhbGxiYWNrIG9wdGlvbnNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE1hcmNoIDIwMTlcbiAgICogQGRlc2NyaXB0aW9uIENoZWNrIGEgTm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0IGFuZCBmaWxsIGl0IHdpdGggZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZXkgYXJlIGVtcHR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyB0byBmaWxsIHdpdGggZGVmYXVsdCB2YWx1ZSBpZiBlbXB0eSAqL1xuICBfc2V0T3B0aW9uc0ZhbGxiYWNrKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy50aXRsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRpdGxlID0gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24udGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5kdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmljb25sZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuaWNvbmxlc3MgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5pY29ubGVzcztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnRoaWNrQm9yZGVyID0gdGhpcy5fdGhpY2tCb3JkZXI7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2xvc2FibGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5jbG9zYWJsZSA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLmNsb3NhYmxlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnN0aWNreSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb25zLnN0aWNreT0gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24uc3RpY2t5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlbmRlclRvID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMucmVuZGVyVG8gPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5yZW5kZXJUbztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5DQnRpdGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuQ0J0aXRsZSA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLkNCdGl0bGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLmNhbGxiYWNrO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlzRGltbWVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdGlvbnMuaXNEaW1tZWQgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5pc0RpbW1lZDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pZEdlbmVyYXRvclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBzdW1tYXJ5IEdlbmVyYXRlIGFuIElEXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhc2ggdGhlIHNlZWQgdG8gZ2VuZXJhdGUgYW4gSURcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlZWQgICAtIFRoZSBzZWVkIHN0cmluZyB0byBoYXNoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSByZXR1cm5lZCBJRCAqL1xuICBfaWRHZW5lcmF0b3Ioc2VlZCwgbGVuZ3RoKSB7XG4gICAgLyogT3JpZ2luYWwgY29kZSBmcm9tOlxuICAgICAqIGh0dHA6Ly93ZXJ4bHRkLmNvbS93cC8yMDEwLzA1LzEzL2phdmFzY3JpcHQtaW1wbGVtZW50YXRpb24tb2YtamF2YXMtc3RyaW5nLWhhc2hjb2RlLW1ldGhvZC9cbiAgICAgKiBUd2Vha2VkIHRvIGZpdCBOb3RpZmljYXRpb24gY2xhc3MgbmVlZHNcbiAgICAgKi9cbiAgICBsZXQgaGFzaCA9IDA7XG4gICAgbGV0IGNoYXJhY3RlciA9ICcnO1xuXG4gICAgaWYgKHNlZWQubGVuZ3RoID09PSAwIHx8IGxlbmd0aCA+IDEyKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZC5sZW5ndGg7ICsraSkge1xuICAgICAgY2hhcmFjdGVyID0gc2VlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXJhY3RlcjtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuXG4gICAgcmV0dXJuIChNYXRoLmFicyhoYXNoKS50b1N0cmluZygzNikgKyAnJyArIE1hdGguYWJzKGhhc2ggLyAyKS50b1N0cmluZygzNikuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSkuc3Vic3RyaW5nKDAsIGxlbmd0aCkudG9VcHBlckNhc2UoKTsgLy8gSGVyZSBpcyB0aGUgdHdla2VhZCBsaW5lXG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBOT1RJRklDQVRJT04gUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHRoZSBleHBvc2VkIEFQSSBvZiB0aGUgTm90aWZpY2F0aW9uIGNvbXBvbmVudC4gSXQgYWxsb3cgdG8gcmFpc2Ugc3RhbmRhcmQgb3IgY3VzdG9tICAgKi9cbiAgLyogIG5vdGlmaWNhdGlvbiB3aXRob3V0IGJvdGhlcmluZyB0aGVpciBsaWZlY3ljbGUsIHBvc2l0aW9uIG9yIG90aGVyIEphdmFTY3JpcHQgZXhwZW5zaXZlIGltcGxlbWVudGF0aW9uLiAgICAgICAgICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBuZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgbm90aWZpY2F0aW9uIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gb3B0aW9ucywgdGhlbiBhcHBlbmQgaXQgdG8gbm90aWZpY2F0aW9uIGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSA8aT5FcnJvcjsgV2FybmluZzsgSW5mbzsgU3VjY2Vzczs8L2k+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aXRsZT1vcHRpb25zLnR5cGVdIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lc3NhZ2UgLSBOb3RpZmljYXRpb24gbWVzc2FnZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249aGFuZGxlcl0gLSBOb3RpZmljYXRpb24gZHVyYXRpb24gKG92ZXJyaWRlIGhhbmRsZXIgZHVyYXRpb24gdmFsdWUpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaWNvbmxlc3M9ZmFsc2VdIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aGlja0JvcmRlcj1oYW5kbGVyXSAtIE5vdGlmaWNhdGlvbiBib3JkZXIgc2lkZSAob3ZlcnJpZGUgaGFuZGxlciBzaWRlIHZhbHVlKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNsb3NhYmxlPXRydWVdIC0gTWFrZSBub3RpZmljYXRpb24gY2xvc2FibGUgZmxhZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnN0aWNreT1mYWxzZV0gLSBNYWtlIG5vdGlmaWNhdGlvbiBzdGlja3kgZmxhZ1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucmVuZGVyVG89aGFuZGxlcl0gLSBEb20gb2JqZWN0IHRvIHJlbmRlciB0aGUgbm90aWZpY2F0aW9uIGluXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5DQnRpdGxlPUNhbGxiYWNrXSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFjaz11bmRlZmluZWRdIC0gTm90aWZpY2F0aW9uIGNhbGxiYWNrIGJ1dHRvblxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSUQgKi9cbiAgbmV3KG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5fY2hlY2tOb3RpZmljYXRpb25PcHRpb25zVmFsaWRpdHkob3B0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdOb3RpZmljYXRpb24uanMgOiBuZXcoKSBvcHRpb25zIGFyZ3VtZW50IG9iamVjdCBpcyBpbnZhbGlkLicpO1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHRoaXMuX3NldE9wdGlvbnNGYWxsYmFjayhvcHRpb25zKTtcbiAgICAvLyBCdWlsZCBub3RpZmljYXRpb24gRE9NIGVsZW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zXG4gICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuX2J1aWxkVUkoe1xuICAgICAgaWQ6IHRoaXMuX2lkR2VuZXJhdG9yKGAke29wdGlvbnMudHlwZX0ke29wdGlvbnMubWVzc2FnZX1gLCA1KSwgLy8gR2VuZXJhdGluZyBhbiBJRCBvZiA1IGNoYXJhY3RlcnMgbG9uZyBmcm9tIG5vdGlmaWNhdGlvbiBtYW5kYXRvcnkgZmllbGRzXG4gICAgICB0eXBlOiBvcHRpb25zLnR5cGUsXG4gICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICB0aXRsZTogb3B0aW9ucy50aXRsZSxcbiAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICAgICAgaWNvbmxlc3M6IG9wdGlvbnMuaWNvbmxlc3MsXG4gICAgICB0aGlja0JvcmRlcjogb3B0aW9ucy50aGlja0JvcmRlcixcbiAgICAgIGNsb3NhYmxlOiBvcHRpb25zLmNsb3NhYmxlLFxuICAgICAgc3RpY2t5OiBvcHRpb25zLnN0aWNreSxcbiAgICAgIHJlbmRlclRvOiBvcHRpb25zLnJlbmRlclRvLFxuICAgICAgQ0J0aXRsZTogb3B0aW9ucy5DQnRpdGxlLFxuICAgICAgY2FsbGJhY2s6IG9wdGlvbnMuY2FsbGJhY2ssXG4gICAgICBpc0RpbW1lZDogb3B0aW9ucy5pc0RpbW1lZCAvLyBPbmx5IHVzZWZ1bCBpZiBzdGlja3kgaXMgc2V0IHRvIHRydWVcbiAgICB9KTtcbiAgICAvLyBDcmVhdGUgYSBuZXcgbm90aWZpY2F0aW9uIGluIHRoZSBjb250YWluZXI6IE5vIG5vdGlmaWNhdGlvbiB3aXRoIHRoZSBzYW1lIElEIGlzIGFscmVhZHkgb3BlblxuICAgIGlmICghdGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0pIHtcbiAgICAgIHRoaXMuX3N0YXJ0KG5vdGlmaWNhdGlvbik7XG4gICAgfSBlbHNlIHsgLy8gVXNlIGV4aXN0aW5nIG5vdGlmaWNhdGlvbjogaW5jcmVtZW50IHJlcXVlc3QgY291bnQgYW5kIHJlc2V0IHRpbWVvdXRcbiAgICAgIHRoaXMuX3Jlc2V0VGltZW91dCh0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSk7XG4gICAgICB0aGlzLl9pbmNyZW1lbnRSZXF1ZXN0Q291bnRlcih0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSk7XG4gICAgICBub3RpZmljYXRpb24gPSB0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXTsgLy8gQ2xlYXIgbG9jYWwgbmV3IG5vdGlmaWNhdGlvbiBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGlzLl9hY3RpdmVcbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWZpY2F0aW9uLmlkO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBpbmZvXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhbiBpbmZvIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIGluZm8ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSAnaW5mbyc7XG4gICAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdGlmaWNhdGlvbi5qcyA6IE5vIGFyZ3VtZW50cyBwcm92aWRlZCBmb3IgaW5mbygpIG1ldGhvZC4nKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN1Y2Nlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgc3VjY2VzcyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0IChzZWUgbmV3KCkgYXJndW1lbnRzIHNpbmNlIHRoaXMgaXMgYW4gYWJzdHJhY3Rpb24gb2YgbmV3KCkpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvbiBJRCAqL1xuICBzdWNjZXNzKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgb3B0aW9ucy50eXBlID0gJ3N1Y2Nlc3MnO1xuICAgICAgcmV0dXJuIHRoaXMubmV3KG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdOb3RpZmljYXRpb24uanMgOiBObyBhcmd1bWVudHMgcHJvdmlkZWQgZm9yIHN1Y2Nlc3MoKSBtZXRob2QuJyk7XG4gICAgfVxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSB3YXJuaW5nXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhIHdhcm5pbmcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCAoc2VlIG5ldygpIGFyZ3VtZW50cyBzaW5jZSB0aGlzIGlzIGFuIGFic3RyYWN0aW9uIG9mIG5ldygpKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSUQgKi9cbiAgd2FybmluZyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMudHlwZSA9ICd3YXJuaW5nJztcbiAgICAgIHJldHVybiB0aGlzLm5ldyhvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignTm90aWZpY2F0aW9uLmpzIDogTm8gYXJndW1lbnRzIHByb3ZpZGVkIGZvciB3YXJuaW5nKCkgbWV0aG9kLicpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZXJyb3JcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGFuIGVycm9yIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEICovXG4gIGVycm9yKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgb3B0aW9ucy50eXBlID0gJ2Vycm9yJztcbiAgICAgIHJldHVybiB0aGlzLm5ldyhvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignTm90aWZpY2F0aW9uLmpzIDogTm8gYXJndW1lbnRzIHByb3ZpZGVkIGZvciBlcnJvcigpIG1ldGhvZC4nKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRpc21pc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIERpc21pc3MgYSBzcGVjaWZpYyBub3RpZmljYXRpb24gdmlhIGl0cyBJRFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgbm90aWZpY2F0aW9uIElEIHRvIGRpc21pc3MgKi9cbiAgZGlzbWlzcyhpZCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fYWN0aXZlW2lkXS50aW1lb3V0SUQpOyAvLyBDbGVhciBub3RpZmljYXRpb24gdGltZW91dFxuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVtpZF0ucmVxdWVzdENvdW50ID4gMSkgeyAvLyBTZXZlcmFsIHJlcXVlc3QgYXJlIHBlbmRpbmdcbiAgICAgIHRoaXMuX2NsZWFyUmVxdWVzdENvdW50KHRoaXMuX2FjdGl2ZVtpZF0pOyAvLyBDbGVhciBhbGwgcGVuZGluZyByZXF1ZXN0XG4gICAgfVxuXG4gICAgdGhpcy5fY2xvc2UodGhpcy5fYWN0aXZlW2lkXSk7IC8vIENsb3NlIG5vdGlmaWNhdGlvblxuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkaXNtaXNzQWxsXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDbGVhciB0aGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgZnJvbSBhbGwgaXRzIGFjdGl2ZSBub3RpZmljYXRpb25zICovXG4gIGRpc21pc3NBbGwoKSB7XG4gICAgaWYgKCF0aGlzLl9kaXNtaXNzQWxsTG9jayAmJiBPYmplY3Qua2V5cyh0aGlzLl9hY3RpdmUpLmxlbmd0aCAhPT0gMCkgeyAvLyBDaGVjayB0aGF0IF9kaW1pc3NBbGxMb2NrIGlzIGRpc2FibGUgYW5kIHRoYXQgdGhlcmUgaXMgc3RpbGwgbm90aWZpY2F0aW9uIGRpc3BsYXllZFxuICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSB0cnVlOyAvLyBkaXNtaXNzQWxsTG9jayB3aWxsIGJlIHVubG9ja2VkIGF0IHRoZSBsYXN0IF9jbG9zZSgpIG1ldGhvZCBjYWxsXG4gICAgICB0aGlzLl9xdWV1ZSA9IHt9OyAvLyBDbGVhciBxdWV1ZSBvYmplY3RcblxuICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLl9hY3RpdmUpIHsgLy8gSXRlcmF0ZSBvdmVyIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgdGhpcy5kaXNtaXNzKGlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRpc21pc3NUeXBlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBEaXNtaXNzIGFsbCBub3RpZmljYXRpb25zIGZyb20gYSBnaXZlbiB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gPGk+c3VjY2VzOyBpbmZvOyB3YXJuaW5nOyBlcnJvcjs8L2k+ICovXG4gIGRpc21pc3NUeXBlKHR5cGUpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fYWN0aXZlKS5sZW5ndGggIT09IDApIHsgLy8gQ2hlY2sgdGhhdCBfZGlzbWlzc0FsbExvY2sgaXMgZGlzYWJsZSBhbmQgdGhhdCB0aGVyZSBpcyBzdGlsbCBub3RpZmljYXRpb24gZGlzcGxheWVkXG4gICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuX2FjdGl2ZSkgeyAvLyBJdGVyYXRlIG92ZXIgbm90aWZpY2F0aW9uc1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlW2lkXS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgdGhpcy5kaXNtaXNzKGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgVXRpbHMge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSWYgYW4gaW5zdGFuY2Ugb2YgVXRpbHMgYWxyZWFkeSBleGlzdHMsIHdlIGp1c3QgcmV0dXJuIGl0XG4gICAgaWYgKCEhVXRpbHMuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBVdGlscy5pbnN0YW5jZTtcbiAgICB9XG4gICAgLy8gU2V0IG9iamVjdCBpbnN0YW5jZVxuICAgIFV0aWxzLmluc3RhbmNlID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICBwYXJzZUhUTUxGcmFnbWVudChodG1sU3RyaW5nKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgIGNvbnN0IGRvbSA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbFN0cmluZywgJ3RleHQvaHRtbCcpO1xuICAgIHJldHVybiBkb20uYm9keS5maXJzdENoaWxkO1xuICB9XG5cblxuICByZW1vdmVBbGxPYmplY3RLZXlzKG9iamVjdCkge1xuICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICAgIH0pO1xuICB9XG5cblxuICBhcHBlbmRMaW5rSW5IZWFkKHBhdGgpIHtcbiAgICAvKiBTZWFyY2ggZm9yIGV4aXN0aW5nIGxpbmsgd2l0aCBzYW1lIHBhdGggKi9cbiAgICBsZXQgYWxyZWFkeUV4aXN0cyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPTA7IGkgPCBkb2N1bWVudC5oZWFkLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBtZXRhID0gZG9jdW1lbnQuaGVhZC5jaGlsZHJlbltpXTtcbiAgICAgIGlmIChtZXRhLm5vZGVOYW1lID09PSAnTElOSycgJiYgbWV0YS5ocmVmID09PSBgJHt3aW5kb3cubG9jYXRpb259JHtwYXRofWApIHtcbiAgICAgICAgYWxyZWFkeUV4aXN0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBPbmx5IGFwcGVuZCBzdHlsZSBpZiBub3QgYWxyZWFkeSBleGlzdGluZyBpbiBkb2N1bWVudCBoZWFkZXIgKi9cbiAgICBpZiAoIWFscmVhZHlFeGlzdHMpIHtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdMSU5LJyk7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGxpbmsuaHJlZiA9IHBhdGg7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcbiIsImV4cG9ydCBkZWZhdWx0IE9iamVjdC5mcmVlemUoe1xuICAvKiBUaGUgSFRUUCBjYWxsIHdvcmtlZCBwcm9wZXJseS4gKi9cbiAgT0s6IDIwMCxcbiAgLyogVGhlIHVybCB3YXNuJ3QgZm91bmQuICovXG4gIE5PVF9GT1VORDogNDA0LFxuICAvKiBUaGUgdXJsIGNhbm5vdCBiZSBhY2Nlc3NlZC4gKi9cbiAgRk9SQklEREVOOiA0MDMsXG4gIC8qIFRoZSBzZXJ2ZXIgZW5jb3VudGVyZWQgYSBwcm9ibGVtLiAqL1xuICBJTlRFUk5BTF9FUlJPUjogNTAwXG59KTtcbiIsImltcG9ydCBBc2lkZSBmcm9tICcuL2NvbXBvbmVudC9Bc2lkZSc7XG5pbXBvcnQgU2NlbmUgZnJvbSAnLi9jb21wb25lbnQvU2NlbmUnO1xuaW1wb3J0IFdpc2hNb2RhbCBmcm9tICcuL21vZGFsL21lbnVwYWdlL1dpc2hNb2RhbC5qcyc7XG4ndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgVXNlckludGVyZmFjZSB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPk1hbmFaZWFrIHVzZXIgaW50ZXJmYWNlIGNvbnRyb2xsZXI8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgY2xhc3MgaXMgbWFkZSB0byBoYW5kbGUgYWxsIGludGVyYWN0aW9ucyBiZXR3ZWVuIFVJIGFuZCBNemsgY29udHJvbGxlci4gSXQgaXMgaW5cbiAgICogY2hhcmdlIHRvIGxvYWQgdmlld3MgYW5kIHRvIGFwcGVuZCB0aGVtIGludG8gdGhlIERPTSwgYnV0IGFsc28gdG8gbWFrZSB0aGVtIGludGVyYWN0aXZlIHdpdGggdGhlIGFwcCBjb250ZXh0LjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBhc2lkZSBjb250cm9sbGVyICovXG4gICAgdGhpcy5fYXNpZGUgPSBuZXcgQXNpZGUoKTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIHNjZW5lIGNvbnRyb2xsZXIgKi9cbiAgICB0aGlzLl9zY2VuZSA9IG5ldyBTY2VuZSgpO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgRE9NIGxvYWRpbmcgb3ZlcmxheSB0byB1c2UgaW4gdHJhbnNpdGlvbnMgKi9cbiAgICB0aGlzLl9sb2FkaW5nT3ZlcmxheSA9IG51bGw7XG4gICAgLy8gQnVpbGQgbG9hZGluZyBvdmVybGF5IGFuZCBhZGQgaXRzIHN0eWxlIGNsYXNzXG4gICAgdGhpcy5fbG9hZGluZ092ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXprLWxvYWRpbmctb3ZlcmxheScpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBWSUVXIE1BTklQVUxBVElPTiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgbWV0aG9kcyB3aWxsIHNldCB0aGUgc2luZ2xlIHBhZ2Ugd2l0aCBhIG5ldyB2aWV3LCB3aGlsZSBwcm9wZXJseSBjbGVhbmluZyB0aGUgcHJldmlvdXNseSB1c2VkIG9uZS4gICAgICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFNjZW5lVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVc2VySW50ZXJmYWNlXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIHRyeSB0byBidWlsZCBhIHZpZXcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zLiBJZiBvcHRpb25zIGFyZVxuICAgKiBpbnZhbGlkLCB0aGUgTWFpbiBQYWdlIHdpbGwgYmUgbG9hZGVkIGluc3RlYWQuIEl0IGhhbmRsZSB0aGUgdHJhbnNpdGlvbiB3aXRoIHByZXZpb3VzIHZpZXcgdG8gcHV0IGEgbG9hZGluZ1xuICAgKiBvdmVybGF5IHdoaWxlIGxvYWRpbmcgdGhlIG5ldyB2aWV3LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBidWlsZCB0aGUgdmlldyBmcm9tXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLm5hbWUgLSBUaGUgdmlldyBuYW1lLCBtdXN0IG1hdGNoIG9uZSBpbiB0aGUgVmlld0ZhY3RvcnkgY2xhc3NcbiAgICogQHJldHVybiB7cHJvbWlzZX0gLSBUaGUgYWN0aW9uIHByb21pc2UgKi9cbiAgc2V0U2NlbmVWaWV3KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zdGFydExvYWRpbmcoKVxuICAgICAgICAudGhlbih0aGlzLl9zY2VuZS5idWlsZFZpZXcuYmluZCh0aGlzLl9zY2VuZSwgb3B0aW9ucykpXG4gICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgIC5maW5hbGx5KHRoaXMuc3RvcExvYWRpbmcuYmluZCh0aGlzKSk7IC8vIENsZWFyIGxvYWRpbmcgb3ZlcmxheSB3aGF0ZXZlciBoYXBwZW5zXG4gICAgfSk7XG4gIH1cblxuXG4gIHNldE1vZGFsKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fc2NlbmUuYnVpbGRNb2RhbChvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZ2V0RnJhZ21lbnQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG16ay5rb20uZ2V0VGV4dCh1cmwpIC8vIFRoZSBsb2FkaW5nIG92ZXJsYXkgbXVzdCBiZSBoYW5kbGVkIGNhbGxlciwgc2luY2UgZnJhZ21lbnQgaXMgb25seSBhIHBhcnQgb2Ygdmlld3BvcnRcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgLmNhdGNoKHJlamVjdClcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJvY2Vzc0xvZ0Zyb21TZXJ2ZXIoZXJyb3JzKSB7XG4gICAgaWYgKGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcnJvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBMT0FESU5HIE9WRVJMQVkgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAgVGhlc2UgbWV0aG9kcyBhZGQvcmVtb3ZlIHRoZSBsb2FkaW5nIG92ZXJsYXkgb24gdG9wIG9mIGVsZW1lbnRzLiBJdCBpcyBtZWFudCB0byBiZSB1c2VkIHdoZW4gc3dpdGNoaW5nIHZpZXcuICAgICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN0YXJ0TG9hZGluZ1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVc2VySW50ZXJmYWNlXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGUgc3RhcnQgbG9hZGluZyBtZXRob2Qgd2lsbCBhZGQgYW4gb3ZlcmxheSBvbiB0aGUgd2hvbGUgcGFnZSB0aGF0IGhhcyBhIGNzcyBhbmltYXRpb24uPC9ibG9ja3F1b3RlPlxuICAgKiBAcmV0dXJuIHtwcm9taXNlfSAtIFRoZSBhY3Rpb24gcHJvbWlzZSAqL1xuICBzdGFydExvYWRpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9sb2FkaW5nT3ZlcmxheSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN0YXJ0TG9hZGluZ1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVc2VySW50ZXJmYWNlXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGUgc3RvcCBsb2FkaW5nIG1ldGhvZCB3aWxsIHJlbW92ZSB0aGUgb3ZlcmxheSBvbiB0aGUgcGFnZS48L2Jsb2NrcXVvdGU+XG4gICAqIEByZXR1cm4ge3Byb21pc2V9IC0gVGhlIGFjdGlvbiBwcm9taXNlICovXG4gIHN0b3BMb2FkaW5nKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fbG9hZGluZ092ZXJsYXkpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJJbnRlcmZhY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgQXNpZGUge1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faG9tZXBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UtYnV0dG9uJyk7XG4gICAgdGhpcy5fbWVudXBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudXBhZ2UtYnV0dG9uJyk7XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICAvLyBUT0RPOiBwcm9wZXIgZXZlbnRzXG4gICAgdGhpcy5faG9tZXBhZ2VDbGlja2VkID0gdGhpcy5faG9tZXBhZ2VDbGlja2VkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faG9tZXBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ob21lcGFnZUNsaWNrZWQpO1xuXG4gICAgdGhpcy5fbWVudXBhZ2VDbGlja2VkID0gdGhpcy5fbWVudXBhZ2VDbGlja2VkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbWVudXBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9tZW51cGFnZUNsaWNrZWQpO1xuICB9XG5cblxuICBfaG9tZXBhZ2VDbGlja2VkKCkge1xuICAgIG16ay5zZXRWaWV3KHtcbiAgICAgIG5hbWU6ICdNYWluUGFnZSdcbiAgICB9KTtcbiAgfVxuXG5cbiAgX21lbnVwYWdlQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnTWVudVBhZ2UnXG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXNpZGU7XG4iLCJpbXBvcnQgVmlld0ZhY3RvcnkgZnJvbSAnLi4vc2NlbmUvVmlld0ZhY3RvcnknO1xuaW1wb3J0IE1vZGFsRmFjdG9yeSBmcm9tICcuLi9tb2RhbC9Nb2RhbEZhY3RvcnknO1xuJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIFNjZW5lIHtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NjZW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjZW5lJyk7XG4gICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB0aGlzLm1vZGFsID0gbnVsbDtcbiAgfVxuXG5cbiAgY2xlYXJTY2VuZSgpIHtcbiAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICB0aGlzLnZpZXcuZGVzdHJveSgpO1xuICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9zY2VuZS5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG5cbiAgYnVpbGRWaWV3KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgRXZlbnRzLnN1YnNjcmliZSgnU2NlbmVWaWV3UmVhZHknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NjZW5lLmFwcGVuZCh0aGlzLnZpZXcuZG9tKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMuY2xlYXJTY2VuZSgpO1xuICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdGYWN0b3J5KG9wdGlvbnMubmFtZSwgb3B0aW9ucyk7XG4gICAgICAvLyBSZXN0b3JlIG1haW5wYWdlIGlmIHZpZXcgZG9lc24ndCBleGlzdHNcbiAgICAgIGlmICh0aGlzLnZpZXcgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXdGYWN0b3J5KCdNYWluUGFnZScpO1xuICAgICAgICAvLyBUT0RPIHJhaXNlIHdhcm5pbmdcbiAgICAgIH1cbiAgICAgIC8vIFJlamVjdCB2aWV3IGJ1aWxkIGlmIGl0IGV4Y2VlZCA1IHNlY29uZHNcbiAgICAgIHNldFRpbWVvdXQocmVqZWN0LCA1MDAwKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgYnVpbGRNb2RhbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxGYWN0b3J5KG9wdGlvbnMubmFtZSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmU7XG4iLCJpbXBvcnQgQWJvdXRNb2RhbCBmcm9tICcuL21lbnVwYWdlL0Fib3V0TW9kYWwuanMnO1xuaW1wb3J0IFdpc2hNb2RhbCBmcm9tICcuL21lbnVwYWdlL1dpc2hNb2RhbC5qcyc7XG5cblxuY29uc3QgQ2xhc3NlcyA9IHtcbiAgQWJvdXRNb2RhbCxcbiAgV2lzaE1vZGFsXG59O1xuXG5cbmNsYXNzIE1vZGFsRmFjdG9yeSB7XG5cblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENsYXNzZXNbYCR7bmFtZX1Nb2RhbGBdKG9wdGlvbnMpO1xuICB9XG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsRmFjdG9yeTtcbiIsImltcG9ydCBNb2RhbCBmcm9tICcuLi91dGlscy9Nb2RhbC5qcyc7XG5cblxuY2xhc3MgQWJvdXRNb2RhbCBleHRlbmRzIE1vZGFsIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+V2lzaCBtb2RhbDwvaDE+XG4gICAqIEBleHRlbmRzIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1vZGFsIGlzIG1hZGUgdG8gYWxsb3cgdGhlIHVzZXIgdG8gc2VuZCBhIHdpc2ggKHVuZGVyIHRoZSBmb3JtIG9mIGEgc3RyaW5nKSB0byB0aGVcbiAgICogaW5zdGFuY2UgYWRtaW5pc3RyYXRvcnMuIFRoaXMgd2lzaCBjYW4gYmUgcmV2aWV3ZWQgaW4gdGhlIGFkbWluIHBhZ2UsIGluIHRoZSB3aXNoZXMgc2VjdGlvbnMuIFRoaXMgd2F5LCB1c2VycyBjYW5cbiAgICogbGVhdmUgYSBmZWVkYmFjayBvbiB0aGUgaW5zdGFuY2UsIHN0cmFpZ2h0IGZyb20gdGhlaXIgYWNjb3VudC48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG1vZGFsIGJhc2Ugb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy51cmwgLSBUaGUgdXJsIHRvIGZldGNoIHRoZSB3aXNoIG1vZGFsIHRlbXBsYXRlIGZyb20gKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIG1vZGFsIGNsb3NlIGJ1dHRvbiAqL1xuICAgIHRoaXMuX2Zvb3RlckNsb3NlQnV0dG9uID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGV2ZW50IElEIGZvciB0aGUgY2xvc2UgYnV0dG9uIGNsaWNrZWQgKi9cbiAgICB0aGlzLl9mb290ZXJDbG9zZUV2dElkID0gLTE7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc3Ryb3lcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQWJvdXRNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IHRoZSBNb2RhbCBwYXJlbnQgKHNlZSBkb2N1bWVudGF0aW9uKS48L2Jsb2NrcXVvdGU+ICoqL1xuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fZm9vdGVyQ2xvc2VFdnRJZCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBJTlNUQU5USUFUSU9OIFNFUVVFTkNFICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9maWxsQXR0cmlidXRlc1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgQWJvdXRNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgZG9lc24ndCBkbyBhbnl0aGluZywgdGhlIGFib3V0IG1vZGFsIGlzIG9ubHkgZm9yIHJlYWRpbmcuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2ZpbGxBdHRyaWJ1dGVzKCkge1xuICAgIC8vIFRoZSBtb2RhbCBkb2Vzbid0IGNvbnRhaW4gYW55IGludGVyYWN0aW9uIHdpdGggdXNlciBpbnB1dHNcbiAgICB0aGlzLl9mb290ZXJDbG9zZUJ1dHRvbiA9IHRoaXMuX3Jvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1mb290ZXItY2xvc2UnKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgV2lzaE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGxpc3RlbiB0byBhbnkgY2xpY2sgb24gdGhlIHN1Ym1pdCBidXR0b24gdG8gcHJvY2VzcyB0aGUgdGV4dGFyZWFcbiAgICogY29udGVudCB0byBzZW5kIGl0IHRvIHRoZSBiYWNrZW5kIGlmIG5lZWRlZC48L2Jsb2NrcXVvdGU+ICoqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2Zvb3RlckNsb3NlRXZ0SWQgPSBFdmVudHMuYWRkRXZlbnQoJ2NsaWNrJywgdGhpcy5fZm9vdGVyQ2xvc2VCdXR0b24sIHRoaXMuY2xvc2UsIHRoaXMpO1xuICB9XG5cblxuXG5cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0TW9kYWw7IiwiaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL01vZGFsLmpzJztcblxuXG5jbGFzcyBXaXNoTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cblxuICAvKiogQHN1bW1hcnkgPGgxPldpc2ggbW9kYWw8L2gxPlxuICAgKiBAZXh0ZW5kcyBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtb2RhbCBpcyBtYWRlIHRvIGFsbG93IHRoZSB1c2VyIHRvIHNlbmQgYSB3aXNoICh1bmRlciB0aGUgZm9ybSBvZiBhIHN0cmluZykgdG8gdGhlXG4gICAqIGluc3RhbmNlIGFkbWluaXN0cmF0b3JzLiBUaGlzIHdpc2ggY2FuIGJlIHJldmlld2VkIGluIHRoZSBhZG1pbiBwYWdlLCBpbiB0aGUgd2lzaGVzIHNlY3Rpb25zLiBUaGlzIHdheSwgdXNlcnMgY2FuXG4gICAqIGxlYXZlIGEgZmVlZGJhY2sgb24gdGhlIGluc3RhbmNlLCBzdHJhaWdodCBmcm9tIHRoZWlyIGFjY291bnQuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBtb2RhbCBiYXNlIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudXJsIC0gVGhlIHVybCB0byBmZXRjaCB0aGUgd2lzaCBtb2RhbCB0ZW1wbGF0ZSBmcm9tICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBmb3JtIHN1Ym1pdCBpbnB1dCAqL1xuICAgIHRoaXMuX3N1Ym1pdElucHV0ID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gVGhlIGV2ZW50IElEIGZvciB0aGUgc3VibWl0IGlucHV0IGNsaWNrZWQgKi9cbiAgICB0aGlzLl9zdWJtaXRFdnRJZCA9IC0xO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IHRoZSBNb2RhbCBwYXJlbnQgKHNlZSBkb2N1bWVudGF0aW9uKSwgdGhlbiBjbGVhciB0aGUgc3VibWl0IGV2ZW50XG4gICAqIHN1YnNjcmlwdGlvbiwgYW5kIGZpbmFsbHkgd2lsbCBkZXN0cm95IGFsbCBwcm9wZXJ0aWVzIG9mIHRoaXMgY2xhc3MuIEl0J3MgdGhlbiBwcm9wZXJseSBkZXN0cm95ZWQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX3N1Ym1pdEV2dElkKTtcbiAgICBVdGlscy5yZW1vdmVBbGxPYmplY3RLZXlzKHRoaXMpO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIE1PREFMIElOU1RBTlRJQVRJT04gU0VRVUVOQ0UgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2ZpbGxBdHRyaWJ1dGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBXaXNoTW9kYWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE5vdmVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIHdpbGwgcmV0cmlldmUgdGhlIHN1Ym1pdCBidXR0b24gZnJvbSB0aGUgd2lzaCBtb2RhbCB0ZW1wbGF0ZS4gSXQgd2lsbCB0aGVuXG4gICAqIGNhbGwgdGhlIGV2ZW50IGJ1dHRvbiB0byBoYW5kbGUgdGhlIGludGVyYWN0aXZpdHkgd2l0aCB0aGlzIGJ1dHRvbi48L2Jsb2NrcXVvdGU+ICoqL1xuICBfZmlsbEF0dHJpYnV0ZXMoKSB7XG4gICAgdGhpcy5fc3VibWl0SW5wdXQgPSB0aGlzLl9yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LXdpc2gtYnV0dG9uJyk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCBsaXN0ZW4gdG8gYW55IGNsaWNrIG9uIHRoZSBzdWJtaXQgYnV0dG9uIHRvIHByb2Nlc3MgdGhlIHRleHRhcmVhXG4gICAqIGNvbnRlbnQgdG8gc2VuZCBpdCB0byB0aGUgYmFja2VuZCBpZiBuZWVkZWQuPC9ibG9ja3F1b3RlPiAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9zdWJtaXRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl9zdWJtaXRJbnB1dCwgdGhpcy5fc3VibWl0Q2xpY2tlZCwgdGhpcyk7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBJTlRFUkFDVElPTlMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3VibWl0Q2xpY2tlZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAYXN5bmNcbiAgICogQG1lbWJlcm9mIFdpc2hNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgaXMgdGhlIHN1Ym1pdCBidXR0b24gY2FsbGJhY2suIElmIHRoZSB0ZXh0YXJlYSBjb250ZW50IGlzIGVtcHR5LCB0aGUgc2VydmVyXG4gICAqIHJlc3BvbnNlIHRvIHRoZSBwb3N0IGNhbGwgd2lsbCBiZSB0aGUgd2lzaCBtb2RhbCBIVE1MIHRlbXBsYXRlLCBjb21wbGV0ZWQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLiBUaGlzIGNhbGxiYWNrXG4gICAqIHdpbGwgcmVmcmVzaCB0aGUgaW50ZXJmYWNlIHRvIGRpc3BsYXkgdGhpcyBlcnJvciBtZXNzYWdlLiBPdGhlcndpc2UsIGlmIHRoZSB0ZXh0YXJlYSBpc24ndCBlbXB0eSwgdGhlIHNlcnZlciB3aWxsXG4gICAqIHJlc3BvbmQgd2l0aCBhIEpTT04gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHN1Y2Nlc3MgaW5mb3JtYXRpb24sIHRvIGJlIGRpc3BsYXllZCBhcyBhIG5vdGlmaWNhdGlvbi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBjbGljayBldmVudCAob24gc3VibWl0IGJ1dHRvbikgKiovXG4gIF9zdWJtaXRDbGlja2VkKGV2ZW50KSB7XG4gICAgLy8gQXZvaWQgZm9ybSBzdWJtaXQgZGVmYXVsdCBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gQ2FsbGluZyB0aGUgbW9kYWwgdXJsIGluIHBvc3QgYWxsb3cgaXRzIHJlc29sdXRpb25cbiAgICBtemsua29tLnBvc3RGb3JtKHRoaXMuX3VybCwge1xuICAgICAgY29udGVudDogdGhpcy5fcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3dpc2gtY29udGVudCcpLnZhbHVlXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBMb2dnZXIucmFpc2UocmVzcG9uc2UpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0pLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgIC8vIFBhcnNlIG5ldyBtb2RhbCBjb250ZW50IGFzIERPTSBvYmplY3RcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gVXRpbHMucGFyc2VIVE1MRnJhZ21lbnQocmVzcG9uc2UpO1xuICAgICAgLy8gQ2xlYXIgb3ZlcmxheSBjb250ZW50XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuaW5uZXJIVE1MID0gJyc7XG4gICAgICAvLyBSZXN0b3JlIG5ldyBtb2RhbCBjb250ZW50XG4gICAgICB0aGlzLl9tb2RhbE92ZXJsYXkuYXBwZW5kQ2hpbGQodGhpcy5fcm9vdEVsZW1lbnQpO1xuICAgICAgLy8gQXZvaWQgZXZlbnQgc3RhY2tpbmdcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9zdWJtaXRFdnRJZCk7XG4gICAgICAvLyBSZXNldCBzdWJtaXQgZXZlbnQgaWRcbiAgICAgIHRoaXMuX3N1Ym1pdEV2dElkID0gLTE7XG4gICAgICAvLyBSZS1zYXZlIGludGVybmFscyB3aXRoIG5ldyB0ZW1wbGF0ZVxuICAgICAgdGhpcy5fZmlsbEF0dHJpYnV0ZXMoKTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBXaXNoTW9kYWw7IiwiY2xhc3MgTW9kYWwge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5NemsgTW9kYWwgYmFzZSBjb21wb25lbnQ8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtb2RhbCBjb21wb25lbnQgaXMgbWVhbnQgdG8gYmUgZXh0ZW5kZWQuIEl0IHByb3ZpZGVzIGEgYmFzZSB0byBidWlsZCBhIG1vZGFsLCB1c2luZ1xuICAgKiBhbiBIVE1MIHRlbXBsYXRlIGZyb20gYW4gZXhpc3RpbmcgYmFja2VuZCB1cmwuIEl0IGhhbmRsZXMgdGhlIGxvYWRpbmcgYW5kIGJ1aWxkaW5nIG9mIHRoZSBIVE1MIHRlbXBsYXRlLiBJdCBhbHNvXG4gICAqIGV4cG9zZXMgYW4gb3BlbiBhbmQgYSBjbG9zZSBtZXRob2QuIEZpbmFsbHksIGl0IGFsbG93cyB0aGUgdXNlciB0byBjbGljayBvbiB0aGUgbW9kYWwgb3ZlcmxheSwgb3Igb24gdGhlIGNsb3NlIGljb25cbiAgICogdG8gY2xvc2UgdGhlIG1vZGFsLiBUaGUgZGV2ZWxvcGVyIG11c3Qgb3ZlcnJpZGUgPGNvZGU+ZGVzdHJveSgpPC9jb2RlPiBhbmQgPGNvZGU+X2ZpbGxBdHRyaWJ1dGVzKCk8L2NvZGU+IG1ldGhvZHNcbiAgICogdG8gZnVsbHkgY292ZXIgdGhlIG1vZGFsIGxpZmVjeWNsZSAoc2VlIGVhY2ggb2YgdGhlc2UgbWV0aG9kcyBkb2N1bWVudGF0aW9uKS48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG1vZGFsIGJhc2Ugb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy51cmwgLSBUaGUgdXJsIHRvIGZldGNoIHRoZSBtb2RhbCB0ZW1wbGF0ZSBmcm9tICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSBIVE1MIHRlbXBsYXRlIHVybCB0byBmZXRjaCAqL1xuICAgIHRoaXMuX3VybCA9IG9wdGlvbnMudXJsO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgdGVtcGxhdGUgcm9vdCBET00gZWxlbWVudCAqL1xuICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gbnVsbDtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIG92ZXJsYXkgdGhhdCBjb250YWlucyB0aGUgbW9kYWwsIGZ1bGwgdmlld3BvcnQgc2l6ZSBhbmQgY2xvc2UgbW9kYWwgb24gY2xpY2sgKi9cbiAgICB0aGlzLl9tb2RhbE92ZXJsYXkgPSBudWxsO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge251bWJlcn0gLSBUaGUgZXZlbnQgSUQgZm9yIHRoZSBvdmVybGF5IGNsaWNrZWQgKi9cbiAgICB0aGlzLl9vdmVybGF5Q2xpY2tlZEV2dElkID0gLTE7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBjbG9zZSBidXR0b24sIGluIHRoZSBtb2RhbCBoZWFkZXIgKi9cbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IG51bGw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSAtIFRoZSBldmVudCBJRCBmb3IgdGhlIGNsb3NlIGJ1dHRvbiBjbGlja2VkICovXG4gICAgdGhpcy5fY2xvc2VDbGlja2VkRXZ0SWQgPSAtMTtcbiAgICAvLyBNb2RhbCBidWlsZGluZyBzZXF1ZW5jZTpcbiAgICAvLyAtIGdldCBIVE1MIHRlbXBsYXRlIGZyb20gc2VydmVyO1xuICAgIC8vIC0gcGFyc2UgdGVtcGxhdGUgcmVzcG9uc2UgdG8gYmVjb21lIERPTSBvYmplY3Q7XG4gICAgLy8gLSBhcHBlbmQgRE9NIGVsZW1lbnQgdG8gZ2xvYmFsIG92ZXJsYXk7XG4gICAgLy8gLSBvcGVuIG1vZGFsIGJ5IGFkZGluZyBvdmVybGF5IHRvIHRoZSBib2R5O1xuICAgIC8vIC0gbGV0IGNoaWxkIGNsYXNzIGZpbGwgYXR0cmlidXRlcyBhbmQgcmVnaXN0ZXIgaXRzIGV2ZW50cy5cbiAgICB0aGlzLl9sb2FkVGVtcGxhdGUoKTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzdHJveVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgbXVzdCBiZSBvdmVycmlkZGVuIGluIGNoaWxkIGNsYXNzLiBJdCBvbmx5IGRlc3Ryb3lzIHRoZSA8Y29kZT5Nb2RhbC5qczwvY29kZT5cbiAgICogcHJvcGVydGllcyBhbmQgY2xvc2UgZXZlbnQgc3Vic2NyaXB0aW9uLiBUaGUgZGV2ZWxvcGVyIG11c3QgcmVtb3ZlIGl0cyBhYnN0cmFjdGVkIHByb3BlcnRpZXMgYW5kIGV2ZW50cyBhZnRlclxuICAgKiBjYWxsaW5nIHRoaXMgbWV0aG9kLCB0byBtYWtlIHRoZSBkZXN0cnVjdGlvbiBwcm9jZXNzIGNvbXBsZXRlLjwvYmxvY2txdW90ZT4gKiovXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gTXVzdCBiZSBvdmVycmlkZGVuIGluIGNoaWxkIGNsYXNzIHRvIGNsZWFuIGV4dGVuc2lvbiBwcm9wZXJ0aWVzIGFuZCBldmVudHNcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fb3ZlcmxheUNsaWNrZWRFdnRJZCk7IC8vIE1pZ2h0IGRvIG5vdGhpbmcsIGFzIGV2ZW50IGlzIHJlbW92ZWQgaW4gY2xvc2UgbWV0aG9kXG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2Nsb3NlQ2xpY2tlZEV2dElkKTsgLy8gU2FtZSBmb3IgdGhpcyBldmVudFxuICAgIGRlbGV0ZSB0aGlzLl91cmw7XG4gICAgZGVsZXRlIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIGRlbGV0ZSB0aGlzLl9tb2RhbE92ZXJsYXk7XG4gICAgZGVsZXRlIHRoaXMuX292ZXJsYXlDbGlja2VkRXZ0SWQ7XG4gICAgZGVsZXRlIHRoaXMuX2Nsb3NlQnV0dG9uO1xuICAgIGRlbGV0ZSB0aGlzLl9jbG9zZUNsaWNrZWRFdnRJZDtcbiAgfVxuXG5cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBNT0RBTCBJTlNUQU5USUFUSU9OIFNFUVVFTkNFICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9sb2FkVGVtcGxhdGVcbiAgICogQHByaXZhdGVcbiAgICogQGFzeW5jXG4gICAqIEBtZW1iZXJvZiBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgbW9kYWwgb3ZlcmxheSwgZmV0Y2ggdGhlIEhUTUwgdGVtcGxhdGUgdXNpbmcgdGhlIDxjb2RlPktvbS5qc1xuICAgKiA8L2NvZGU+IGNvbXBvbmVudCwgaXQgdGhlbiBidWlsZCB0aGUgbW9kYWwgRE9NLCBhcHBlbmQgaXQgdG8gdGhlIG92ZXJsYXksIG9wZW4gdGhlIG1vZGFsIGFuZCBjYWxsIDxjb2RlPlxuICAgKiBfZmlsbEF0dHJpYnV0ZXMoKTwvY29kZT4gdGhhdCBtdXN0IGJlIG92ZXJyaWRkZW4gaW4gdGhlIGNoaWxkIGNsYXNzLiBJdCBpcyBhc3luY2hyb25vdXMgYmVjYXVzZSBvZiB0aGUgZmV0Y2ggY2FsbCxcbiAgICogc28gdGhlIGNoaWxkIGNsYXNzIGNvbnN0cnVjdG9yIGNhbiBiZSBmdWxseSBleGVjdXRlZC48L2Jsb2NrcXVvdGU+ICoqL1xuICBfbG9hZFRlbXBsYXRlKCkge1xuICAgIG16ay5rb20uZ2V0VGV4dCh0aGlzLl91cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBVdGlscy5wYXJzZUhUTUxGcmFnbWVudChyZXNwb25zZSk7XG4gICAgICAvLyBDcmVhdGUgb3ZlcmxheSBtb2RhbCBjb250YWluZXJcbiAgICAgIHRoaXMuX21vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgdGhpcy5fbW9kYWxPdmVybGF5LmNsYXNzTmFtZSA9ICdsb2FkaW5nLW92ZXJsYXknO1xuICAgICAgdGhpcy5fbW9kYWxPdmVybGF5LmFwcGVuZENoaWxkKHRoaXMuX3Jvb3RFbGVtZW50KTtcbiAgICAgIC8vIEdldCBjbG9zZSBidXR0b24gZnJvbSB0ZW1wbGF0ZVxuICAgICAgdGhpcy5fY2xvc2VCdXR0b24gPSB0aGlzLl9yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwtY2xvc2UnKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgICAgdGhpcy5fZmlsbEF0dHJpYnV0ZXMoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2ZpbGxBdHRyaWJ1dGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNb2RhbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgTm92ZW1iZXIgMjAyMFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2QgZG9lc24ndCBpbXBsZW1lbnQgYW55dGhpbmcuIEl0IG11c3QgYmUgb3ZlcnJpZGRlbiBpbiBjaGlsZCBjbGFzcywgdG8gdXNlIHRoZVxuICAgKiB0ZW1wbGF0ZSBET00gZWxlbWVudHMgdG8gYnVpbGQgaXRzIGludGVyYWN0aW9ucy4gSXQgaXMgY2FsbGVkIG9uY2UgdGhlIHRlbXBsYXRlIGlzIHN1Y2Nlc3NmdWxseSBmZXRjaGVkIGZyb20gdGhlXG4gICAqIHNlcnZlci48L2Jsb2NrcXVvdGU+ICoqL1xuICBfZmlsbEF0dHJpYnV0ZXMoKSB7XG4gICAgLy8gTXVzdCBiZSBvdmVycmlkZGVuIGluIGNoaWxkIGNsYXNzIHRvIGJ1aWxkIG1vZGFsIHdpdGggSFRNTCB0ZW1wbGF0ZSBhdHRyaWJ1dGVzXG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgTU9EQUwgVklTSUJJTElUWSBNQU5JUFVMQVRJT04gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBvcGVuXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIG9wZW4gdGhlIG1vZGFsLCBieSBhZGRpbmcgdGhlIG1vZGFsIG92ZXJsYXkgdG8gdGhlIGRvY3VtZW50IGJvZHkuIEl0IHdpbGxcbiAgICogYWxzbyByZWdpc3RlciBhIHN1YnNjcmlwdGlvbiBmb3IgYSB1c2VyIGNsaWNrIGV2ZW50IG9uIHRoZSBtb2RhbCBvdmVybGF5IG9yIG9uIHRoZSBjbG9zZSBpY29uLjwvYmxvY2txdW90ZT4gKiovXG4gIG9wZW4oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9tb2RhbE92ZXJsYXkpO1xuICAgIHRoaXMuX292ZXJsYXlDbGlja2VkRXZ0SWQgPSBFdmVudHMuYWRkRXZlbnQoJ2NsaWNrJywgdGhpcy5fbW9kYWxPdmVybGF5LCB0aGlzLmNsb3NlLCB0aGlzKTtcbiAgICB0aGlzLl9jbG9zZUNsaWNrZWRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl9jbG9zZUJ1dHRvbiwgdGhpcy5jbG9zZSwgdGhpcyk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGNsb3NlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGFsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBOb3ZlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIG1ldGhvZCB3aWxsIGNsb3NlIHRoZSBtb2RhbCBieSByZW1vdmluZyB0aGUgbW9kYWwgb3ZlcmxheSBmcm9tIHRoZSBkb2N1bWVudCBib2R5LlxuICAgKiBXaGVuIGNsb3NlZCwgYSBtb2RhbCBtdXN0IGJlIGRlc3Ryb3llZCwgYW5kIHRoZSBjaGlsZCBjbGFzcyBtdXN0IGltcGxlbWVudCBpdHMgb3duIDxjb2RlPmRlc3Ryb3koKTwvY29kZT4gbWV0aG9kLFxuICAgKiB0byB1bnN1YnNjcmliZSB0byBhbnkgZXZlbnRzIGl0IGhhcyBhbmQgdG8gcmVtb3ZlIGl0cyBpbnRlcm5hbCBwcm9wZXJ0aWVzLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF0gLSBUaGUgY2xpY2sgZXZlbnQsIG5vdCBtYW5kYXRvcnkgdG8gYWxsb3cgdGhlIGNsb3Npbmcgb2YgdGhlIG1vZGFsIG91dHNpZGUgb2YgYW55IGV2ZW50ICoqL1xuICBjbG9zZShldmVudCkge1xuICAgIC8vIE11c3QgYmUgb3ZlcnJpZGRlbiBpbiBjaGlsZCBjbGFzcyB0byBwcm9wZXJseSBjbGVhbiBleHRlbnNpb24gcHJvcGVydGllcyBhbmQgZXZlbnRzXG4gICAgaWYgKCFldmVudCB8fCAoZXZlbnQgJiYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fbW9kYWxPdmVybGF5IHx8IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fY2xvc2VCdXR0b24pKSkge1xuICAgICAgLy8gQ2xlYXIgY2xvc2UgZXZlbnRzIGludCBlaCBFdmVudHMgY29tcG9uZW50XG4gICAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fb3ZlcmxheUNsaWNrZWRFdnRJZCk7XG4gICAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fY2xvc2VDbGlja2VkRXZ0SWQpO1xuICAgICAgdGhpcy5fb3ZlcmxheUNsaWNrZWRFdnRJZCA9IC0xO1xuICAgICAgdGhpcy5fY2xvc2VDbGlja2VkRXZ0SWQgPSAtMTtcbiAgICAgIC8vIFJlbW92ZSB0aGUgb3ZlcmxheSBmcm9tIHRoZSBib2R5XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX21vZGFsT3ZlcmxheSk7XG4gICAgICAvLyBVc2UgdGhlIGNoaWxkIGNsYXNzIGRlc3Ryb3lcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCJpbXBvcnQgTWFpblBhZ2VWaWV3IGZyb20gJy4vbWFpbnBhZ2UvTWFpblBhZ2VWaWV3LmpzJztcbmltcG9ydCBNZW51UGFnZVZpZXcgZnJvbSAnLi9tZW51cGFnZS9NZW51UGFnZVZpZXcuanMnO1xuaW1wb3J0IEFkbWluUGFnZVZpZXcgZnJvbSAnLi9tZW51cGFnZS9BZG1pblBhZ2VWaWV3LmpzJztcbmltcG9ydCBVc2VyUGFnZVZpZXcgZnJvbSAnLi9tZW51cGFnZS9Vc2VyUGFnZVZpZXcuanMnO1xuXG5cbmNvbnN0IENsYXNzZXMgPSB7XG4gIE1haW5QYWdlVmlldyxcbiAgTWVudVBhZ2VWaWV3LFxuICBBZG1pblBhZ2VWaWV3LFxuICBVc2VyUGFnZVZpZXdcbn07XG5cblxuY2xhc3MgVmlld0ZhY3Rvcnkge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5WaWV3IGZhY3RvcnkgZm9yIGFsbCB1c2FnZXMgaW4gc2luZ2xlIHBhZ2UgYXBwPC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDIwXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIGNsYXNzIGlzIGEgZmFjdG9yeSBwYXR0ZXJuIHRoYXQgd2lsbCBidWlsZCBhbnkgdmlldyB1c2VkIGluIE1hbmFaZWFrLiBTZW5kaW5nIHRoZVxuICAgKiB2aWV3IG5hbWUgYWxvbmcgaXRzIG9wdGlvbnMgd2lsbCBtYWtlIHRoaXMgY2xhc3MgcmV0dXJucyBpdC4gVGhlIHZpZXcgbmFtZSBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSBDTGFzc2VzIGRlZmluaXRpb25cbiAgICogaW4gdGhpcyBmaWxlLCB3aXRob3V0IHRoZSA8Y29kZT5WaWV3PC9jb2RlPiBzdWZmaXguPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSB2aWV3IG5hbWUsIG11c3QgYmUgbGlzdGVkIGluIENsYXNzZXMgZGVmaW5lZCBpbiB0aGlzIGZpbGUsIHdpdGhvdXQgdGhlIFZpZXcgc3VmZml4XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucz17fV0gLSBUaGUgdmlldyBvcHRpb24gb2JqZWN0LCBzZWUgY2hpbGQgY2xhc3MgZm9yIHVzYWdlXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgcmVxdWVzdGVkIHZpZXcgYXMgYW4gb2JqZWN0ICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgQ2xhc3Nlc1tgJHtuYW1lfVZpZXdgXShvcHRpb25zKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBWaWV3RmFjdG9yeTtcbiIsImltcG9ydCBTY2VuZVZpZXcgZnJvbSAnLi4vdXRpbHMvU2NlbmVWaWV3JztcblxuXG5jbGFzcyBNYWluUGFnZVZpZXcgZXh0ZW5kcyBTY2VuZVZpZXcge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fZmV0Y2hXcmFwcGVyKCcvZnJhZ21lbnQvbWFpbnBhZ2UvJylcbiAgICAgIC50aGVuKHRoaXMuX3ZpZXdSZWFkeSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYWluUGFnZVZpZXc7XG4iLCJpbXBvcnQgVGFiVmlldyBmcm9tICcuLi91dGlscy9UYWJWaWV3JztcbmltcG9ydCBVc2Vyc0ZyYWdtZW50IGZyb20gJy4vYWRtaW4vVXNlcnNGcmFnbWVudCc7XG5pbXBvcnQgV2lzaGVzRnJhZ21lbnQgZnJvbSAnLi9hZG1pbi9XaXNoZXNGcmFnbWVudCc7XG5cblxuY2xhc3MgQWRtaW5QYWdlVmlldyBleHRlbmRzIFRhYlZpZXcge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fZmV0Y2hXcmFwcGVyKHRoaXMuX3VybClcbiAgICAgIC50aGVuKHRoaXMuX2ZpbGxBdHRyaWJ1dGVzLmJpbmQodGhpcykpXG4gICAgICAudGhlbih0aGlzLl92aWV3UmVhZHkpXG4gICAgICAudGhlbih0aGlzLl91c2Vyc0NsaWNrZWQuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgX2ZpbGxBdHRyaWJ1dGVzKCkge1xuICAgIHN1cGVyLl9maWxsQXR0cmlidXRlcygpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIHN1cGVyLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgX3VzZXJzQ2xpY2tlZCgpIHtcbiAgICB0aGlzLl9jbGVhckZyYWdtZW50KCk7XG4gICAgdGhpcy5fZmV0Y2hWaWV3RnJhZ21lbnQoJy9mcmFnbWVudC9hZG1pbi91c2VyLWxpc3QnKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9hY3RpdmVGcmFnbWVudCA9IG5ldyBVc2Vyc0ZyYWdtZW50KHtcbiAgICAgICAgICB0YXJnZXQ6IHRoaXMuX3ZpZXdDb250YWluZXIsXG4gICAgICAgICAgcmVmcmVzaDogdGhpcy5fdXNlcnNDbGlja2VkLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKVxuICAgICAgfSk7XG4gIH1cblxuXG4gIF93aXNoZXNDbGlja2VkKCkge1xuICAgIHRoaXMuX2NsZWFyRnJhZ21lbnQoKTtcbiAgICB0aGlzLl9mZXRjaFZpZXdGcmFnbWVudCgnL2ZyYWdtZW50L2FkbWluL3dpc2gvYWxsJylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYWN0aXZlRnJhZ21lbnQgPSBuZXcgV2lzaGVzRnJhZ21lbnQoe1xuICAgICAgICAgIHRhcmdldDogdGhpcy5fdmlld0NvbnRhaW5lcixcbiAgICAgICAgICByZWZyZXNoOiB0aGlzLl93aXNoZXNDbGlja2VkLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKVxuICAgICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRtaW5QYWdlVmlldztcbiIsImltcG9ydCBTY2VuZVZpZXcgZnJvbSAnLi4vdXRpbHMvU2NlbmVWaWV3JztcblxuXG5jbGFzcyBNZW51UGFnZVZpZXcgZXh0ZW5kcyBTY2VuZVZpZXcge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fYWRtaW5JdGVtID0gbnVsbDtcbiAgICB0aGlzLl9hZG1pbkNsaWNrZWRFdnRJZCA9IC0xO1xuXG4gICAgdGhpcy5fdXNlckl0ZW0gPSBudWxsO1xuICAgIHRoaXMuX3VzZXJDbGlja2VkRXZ0SWQgPSAtMTtcblxuICAgIHRoaXMuX3dpc2hJdGVtID0gbnVsbDtcbiAgICB0aGlzLl93aXNoQ2xpY2tlZEV2dElkID0gLTE7XG5cbiAgICB0aGlzLl9hYm91dEl0ZW0gPSBudWxsO1xuICAgIHRoaXMuX2Fib3V0Q2xpY2tlZEV2dElkID0gLTE7XG5cbiAgICB0aGlzLl9mZXRjaFdyYXBwZXIoJy9mcmFnbWVudC9tZW51cGFnZS8nKVxuICAgICAgLnRoZW4odGhpcy5fZmlsbEF0dHJpYnV0ZXMuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKHRoaXMuX3ZpZXdSZWFkeSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5yYWlzZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX2FkbWluQ2xpY2tlZEV2dElkKTtcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fdXNlckNsaWNrZWRFdnRJZCk7XG4gICAgRXZlbnRzLnJlbW92ZUV2ZW50KHRoaXMuX3dpc2hDbGlja2VkRXZ0SWQpO1xuICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl9hYm91dENsaWNrZWRFdnRJZCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgX2ZpbGxBdHRyaWJ1dGVzKCkge1xuICAgIHRoaXMuX2FkbWluSXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyNhZG1pbi1idXR0b24nKTtcbiAgICB0aGlzLl91c2VySXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyN1c2VycGFnZS1idXR0b24nKTtcbiAgICB0aGlzLl93aXNoSXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyN3aXNoLWJ1dHRvbicpO1xuICAgIHRoaXMuX2Fib3V0SXRlbSA9IHRoaXMuZG9tLnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1idXR0b24nKTtcblxuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2FkbWluQ2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2FkbWluSXRlbSwgdGhpcy5fYWRtaW5DbGlja2VkLCB0aGlzKTtcbiAgICB0aGlzLl91c2VyQ2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX3VzZXJJdGVtLCB0aGlzLl91c2VyQ2xpY2tlZCwgdGhpcyk7XG4gICAgdGhpcy5fd2lzaENsaWNrZWRFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLl93aXNoSXRlbSwgdGhpcy5fd2lzaENsaWNrZWQsIHRoaXMpO1xuICAgIHRoaXMuX2Fib3V0Q2xpY2tlZEV2dElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX2Fib3V0SXRlbSwgdGhpcy5fYWJvdXRDbGlja2VkLCB0aGlzKTtcbiAgfVxuXG5cbiAgX2FkbWluQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnQWRtaW5QYWdlJywgLy8gVG8gdXNlIGluIFZpZXdGYWN0b3J5XG4gICAgICB0eXBlOiAnYWRtaW4nLCAvLyBUbyByZXRyaWV2ZSBET20gZWxlbWVudHNcbiAgICAgIHVybDogJy9mcmFnbWVudC9hZG1pbi8nXG4gICAgfSk7XG4gIH1cblxuXG4gIF91c2VyQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0Vmlldyh7XG4gICAgICBuYW1lOiAnVXNlclBhZ2UnXG4gICAgfSk7XG4gIH1cblxuXG4gIF93aXNoQ2xpY2tlZCgpIHtcbiAgICBtemsuc2V0TW9kYWwoe1xuICAgICAgbmFtZTogJ1dpc2gnLFxuICAgICAgdXJsOiAnL2ZyYWdtZW50L3dpc2gnXG4gICAgfSk7XG4gIH1cblxuXG4gIF9hYm91dENsaWNrZWQoKSB7XG4gICAgbXprLnNldE1vZGFsKHtcbiAgICAgIG5hbWU6ICdBYm91dCcsXG4gICAgICB1cmw6ICcvZnJhZ21lbnQvbW9kYWwvYWJvdXQnXG4gICAgfSk7XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWVudVBhZ2VWaWV3O1xuIiwiaW1wb3J0IFNjZW5lVmlldyBmcm9tICcuLi91dGlscy9TY2VuZVZpZXcnO1xuJ3VzZSBzdHJpY3QnO1xuXG5cbmNsYXNzIFVzZXJQYWdlVmlldyBleHRlbmRzIFNjZW5lVmlldyB7XG5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl9zd2l0Y2hUaGVtZUV2dElkID0gLTE7XG4gICAgdGhpcy5fdGhlbWUgPSAnREFSSyc7IC8vIFRPRE8gbG9hZCBmcm9tIHByZWYgKGxzIGFuZCBzZXJ2ZXIpXG5cbiAgICB0aGlzLl9mZXRjaFdyYXBwZXIoJy9mcmFnbWVudC91c2VyLXByb2ZpbGUvJylcbiAgICAgIC50aGVuKHRoaXMuX2J1aWxkVmlldylcbiAgICAgIC50aGVuKHRoaXMuX2V2ZW50cy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5fdmlld1JlYWR5KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgTG9nZ2VyLnJhaXNlKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICBFdmVudHMucmVtb3ZlRXZlbnQodGhpcy5fc3dpdGNoVGhlbWVFdnRJZCk7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbiAgX2J1aWxkVmlldygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLyogQXBwZW5kIHNlcnZpY2Ugc3R5bGUgaW50byBkb2N1bWVudCAqL1xuICAgICAgVXRpbHMuYXBwZW5kTGlua0luSGVhZCgnc3RhdGljL2Rpc3QvY3NzL3VzZXJwcm9maWxlLmJ1bmRsZS5jc3MnKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fc3dpdGNoVGhlbWVFdnRJZCA9IEV2ZW50cy5hZGRFdmVudCgnY2xpY2snLCB0aGlzLmRvbS5xdWVyeVNlbGVjdG9yKCcjdGhlbWUtc3dpdGNoJyksIHRoaXMuX3N3aXRjaFRoZW1lLCB0aGlzKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgX3N3aXRjaFRoZW1lKCkge1xuICAgIGlmICh0aGlzLl90aGVtZSA9PT0gJ0RBUksnKSB7XG4gICAgICB0aGlzLl90aGVtZSA9ICdMSUdIVCc7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmstdGhlbWUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbGlnaHQtdGhlbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGhlbWUgPSAnREFSSyc7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2xpZ2h0LXRoZW1lJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlclBhZ2VWaWV3O1xuIiwiaW1wb3J0IERyYWdFbGVtZW50IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL0RyYWdFbGVtZW50JztcbmltcG9ydCBEcm9wRWxlbWVudCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9Ecm9wRWxlbWVudCc7XG5cblxuY2xhc3MgVXNlcnNGcmFnbWVudCB7XG5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7XG4gICAgdGhpcy5fcmVmcmVzaENCID0gb3B0aW9ucy5yZWZyZXNoO1xuXG4gICAgdGhpcy5fdXNlcnMgPSBbXTtcbiAgICB0aGlzLl9iYWRnZXMgPSBbXTtcblxuICAgIHRoaXMuX2Ryb3BFbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuX2RyYWdFbGVtZW50cyA9IFtdO1xuXG4gICAgdGhpcy5fZmlsbEF0dHJpYnV0ZXMoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG5cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2Ryb3BFbGVtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fZHJvcEVsZW1lbnRzW2ldLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kcmFnRWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX2RyYWdFbGVtZW50c1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIFV0aWxzLnJlbW92ZUFsbE9iamVjdEtleXModGhpcyk7XG4gIH1cblxuXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICBjb25zdCB1c2Vyc1dyYXBwZXIgPSB0aGlzLl90YXJnZXQucXVlcnlTZWxlY3RvcignI3VzZXJzLXdyYXBwZXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVzZXJzV3JhcHBlci5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fdXNlcnMucHVzaCh1c2Vyc1dyYXBwZXIuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjb25zdCBiYWRnZXNXcmFwcGVyID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJyNiYWRnZXMtd3JhcHBlcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFkZ2VzV3JhcHBlci5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fYmFkZ2VzLnB1c2goYmFkZ2VzV3JhcHBlci5jaGlsZHJlbltpXSk7XG4gICAgfVxuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdXNlcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IGRyb3BFbGVtZW50ID0gbmV3IERyb3BFbGVtZW50KHtcbiAgICAgICAgdGFyZ2V0OiB0aGlzLl91c2Vyc1tpXSxcbiAgICAgICAgb25Ecm9wOiB0aGlzLl9kcm9wT25Vc2VyLmJpbmQodGhpcy5fdXNlcnNbaV0sIHRoaXMuX3JlZnJlc2hDQilcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZHJvcEVsZW1lbnRzLnB1c2goZHJvcEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYmFkZ2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBkcmFnRWxlbWVudCA9IG5ldyBEcmFnRWxlbWVudCh7XG4gICAgICAgIHRhcmdldDogdGhpcy5fYmFkZ2VzW2ldLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYmFkZ2VJZDogdGhpcy5fYmFkZ2VzW2ldLmRhdGFzZXQuaWRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9kcmFnRWxlbWVudHMucHVzaChkcmFnRWxlbWVudCk7XG4gICAgfVxuICB9XG5cblxuICBfZHJvcE9uVXNlcihyZWZyZXNoQ0IsIGRhdGEpIHtcbiAgICBtemsua29tLnBvc3QoJy9iYWRnZS9hc3NvY2lhdGUnLCB7XG4gICAgICB1c2VySWQ6IHRoaXMuZGF0YXNldC5pZCxcbiAgICAgIGJhZGdlSWQ6IGRhdGEuYmFkZ2VJZFxuICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbXprLnVpLnByb2Nlc3NMb2dGcm9tU2VydmVyKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICByZWZyZXNoQ0IoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBVc2Vyc0ZyYWdtZW50OyIsImNsYXNzIFdpc2hlc0ZyYWdtZW50IHtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuXG4gIGRlc3Ryb3koKSB7XG4gICAgVXRpbHMucmVtb3ZlQWxsT2JqZWN0S2V5cyh0aGlzKTtcbiAgfVxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBXaXNoZXNGcmFnbWVudDsiLCIndXNlIHN0cmljdCc7XG5cblxuY2xhc3MgU2NlbmVWaWV3IHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+VmlldyBiYXNlIGNsYXNzIHdpdGggbWFuZGF0b3J5IG1ldGhvZHM8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMjBcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlNjZW5lIHZpZXcgYmFzZSBjbGFzcyB0aGF0IG11c3QgYmUgaW5oZXJpdGVkIHRvIG1hdGNoIHRoZSBsb2FkaW5nIHBhdHRlcm4uIEFsbCB2aWV3c1xuICAgKiBhcmUgYmFzZWQgb24gYW4gSFRNTCB0ZW1wbGF0ZSwgdGhhdCB3aWxsIGJlIGxvYWRlZCB0aGUgcGFyc2VkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBET00gc2NlbmUuIFdoZW4gdGhlIHZpZXdcbiAgICogYnVpbGRpbmcgaXMgZG9uZSwgYSA8Y29kZT5TY2VuZVZpZXdSZWFkeTwvY29kZT4gZXZlbnQgaXMgZmlyZWQgdGhyb3VnaCB0aGUgY3VzdG9tIGV2ZW50IHByb3h5LjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwdWJsaWNcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IC0gVGhlIHZpZXcgd3JhcHBlciBkaXYgKi9cbiAgICB0aGlzLndyYXBwZXIgPSBudWxsO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBkZXN0cm95XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNjZW5lVmlld1xuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhlIGRlc3Ryb3kgbWV0aG9kIHdpbGwgY2xlYXIgdGhlIHdyYXBwZXIuIEEgZGVzdHJveSBtZXRob2QgbXVzdCBiZSBjcmVhdGVkIGluIGNoaWxkXG4gICAqIGNsYXNzIHRvIHByb3Blcmx5IGNsZWFuIGl0c2VsZi4gSXQgc2hvdWxkIGFsc28gY2FsbCBmb3IgPGNvZGU+c3VwZXI8L2NvZGU+IHRvIGNhbGwgdGhpcyBtZXRob2QuPC9ibG9ja3F1b3RlPiAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMud3JhcHBlciA9IG51bGw7XG4gIH1cblxuXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBCVUlMRElORyBWSUVXIFBBVFRFUk4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAqL1xuICAvKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qICBUaGVzZSB0d28gbWV0aG9kcyBtdXN0IGJlIGNhbGxlZCB0byBwcm9wZXJseSBmZXRjaCB2aWV3IHdyYXBwZXIgYW5kIG5vdGlmeSBhcHAgdGhhdCB0aGUgdmlldyBpcyByZWFkeSB0byB1c2UuICAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2ZldGNoV3JhcHBlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgVXNlckludGVyZmFjZVxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBtZXRob2Qgd2lsbCByZXF1ZXN0IHRoZSBIVE1MIHRlbXBsYXRlIGZvciB0aGUgZ2l2ZW4gdXJsLiBJdCB3aWxsIHRoZW4gcGFyc2UgaXRcbiAgICogYW5kIHVwZGF0ZSB0aGUgdmlldyB3cmFwcGVyIHRvIG1hdGNoIHRoaXMgbmV3bHkgbG9hZGVkIHRlbXBsYXRlLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB0ZW1wbGF0ZSB1cmwgdG8gbG9hZCBodG1sIGZyb21cbiAgICogQHJldHVybiB7cHJvbWlzZX0gLSBUaGUgYWN0aW9uIHByb21pc2UgKi9cbiAgX2ZldGNoV3JhcHBlcih1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbXprLmtvbS5nZXRUZXh0KHVybClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHRoaXMuZG9tID0gVXRpbHMucGFyc2VIVE1MRnJhZ21lbnQocmVzcG9uc2UpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIF92aWV3UmVhZHlcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFVzZXJJbnRlcmZhY2VcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRoaXMgbWV0aG9kIG5lZWRzIHRvIGJlIGNhbGxlZCBsYXN0LCB3aGVuIGFsbCB0aGUgdmlldyBpbml0aWFsaXNhdGlvbiBpcyBkb25lLiBUaGlzXG4gICAqIHdheSwgaXQgd2lsbCBub3RpZnkgdGhlIFVzZXJJbnRlcmZhY2UgY29udHJvbGxlciB0aGF0IHRlIHZpZXcgY3JlYXRpb24gaXMgZG9uZSwgYW5kIHRoYXQgaXQgc2hvdWxkIHJlbGVhc2UgdGhlXG4gICAqIFVJIHJlbW92aW5nIHRoZSBsb2FkaW5nIG92ZXJsYXkuPC9ibG9ja3F1b3RlPiAqL1xuICBfdmlld1JlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIEV2ZW50cy5wdWJsaXNoKCdTY2VuZVZpZXdSZWFkeScpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIC8gU0VUVEVSICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgKi9cbiAgLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbiAgLyoqIEBwdWJsaWNcbiAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSB2aWV3IGZpcnN0IERPTSBjaGlsZCBpbiB0ZW1wbGF0ZSAqL1xuICBnZXQgZG9tKCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZXI7XG4gIH1cblxuXG4gIC8qKiBAcHVibGljXG4gICAqIEBtZW1iZXIge29iamVjdH0gLSBUaGUgdmlldyBmaXJzdCBET00gY2hpbGQgaW4gdGVtcGxhdGUgKi9cbiAgc2V0IGRvbShkb20pIHtcbiAgICB0aGlzLndyYXBwZXIgPSBkb207XG4gIH1cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmVWaWV3O1xuIiwiaW1wb3J0IFNjZW5lVmlldyBmcm9tICcuL1NjZW5lVmlldyc7XG5cblxuY2xhc3MgVGFiVmlldyBleHRlbmRzIFNjZW5lVmlldyB7XG5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLl90eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIHRoaXMuX3VybCA9IG9wdGlvbnMudXJsO1xuXG4gICAgdGhpcy5fdGFicyA9IG51bGw7XG4gICAgdGhpcy5fdGFiQ2xpY2tlZEV2dElkcyA9IFtdO1xuXG4gICAgdGhpcy5fdmlld0NvbnRhaW5lciA9IG51bGw7XG5cbiAgICB0aGlzLl9hY3RpdmVGcmFnbWVudCA9IG51bGw7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSAtIFRoZSBET00gbG9hZGluZyBvdmVybGF5IHRvIHVzZSBpbiB0cmFuc2l0aW9ucyAqL1xuICAgIHRoaXMuX2xvYWRpbmdPdmVybGF5ID0gbnVsbDtcbiAgICAvLyBCdWlsZCBsb2FkaW5nIG92ZXJsYXkgYW5kIGFkZCBpdHMgc3R5bGUgY2xhc3NcbiAgICB0aGlzLl9sb2FkaW5nT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHRoaXMuX2xvYWRpbmdPdmVybGF5LmNsYXNzTmFtZSA9ICdtemstbG9hZGluZy1vdmVybGF5IGZpdC1wYXJlbnQnO1xuICB9XG5cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RhYkNsaWNrZWRFdnRJZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIEV2ZW50cy5yZW1vdmVFdmVudCh0aGlzLl90YWJDbGlja2VkRXZ0SWRzW2ldKTtcbiAgICB9XG4gIH1cblxuXG4gIF9maWxsQXR0cmlidXRlcygpIHtcbiAgICB0aGlzLl90YWJzID0gdGhpcy5kb20ucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5fdHlwZX0tdGFic2ApO1xuICAgIHRoaXMuX3ZpZXdDb250YWluZXIgPSB0aGlzLmRvbS5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLl90eXBlfS12aWV3YCk7XG4gIH1cblxuXG4gIF9ldmVudHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90YWJzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCBldmVudElkID0gRXZlbnRzLmFkZEV2ZW50KCdjbGljaycsIHRoaXMuX3RhYnMuY2hpbGRyZW5baV0sIHRoaXMuX3RhYkNsaWNrZWQsIHRoaXMpO1xuICAgICAgdGhpcy5fdGFiQ2xpY2tlZEV2dElkcy5wdXNoKGV2ZW50SWQpO1xuICAgIH1cbiAgfVxuXG5cbiAgX3RhYkNsaWNrZWQoZXZlbnQpIHtcbiAgICB0aGlzLl91bnNlbGVjdFRhYnMoKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzW2BfJHtldmVudC50YXJnZXQuZGF0YXNldC52aWV3fUNsaWNrZWRgXSgpO1xuICB9XG5cblxuICBfdW5zZWxlY3RUYWJzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdGFicy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fdGFicy5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxuXG5cbiAgX2ZldGNoVmlld0ZyYWdtZW50KHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgdGhpcy5zdGFydExvYWRpbmcoKVxuICAgICAgICAudGhlbihtemsuZ2V0RnJhZ21lbnQuYmluZChtemssIHVybCkpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCggJ2JlZm9yZWVuZCcsIHJlc3BvbnNlKTtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgIC5maW5hbGx5KHRoaXMuc3RvcExvYWRpbmcuYmluZCh0aGlzKSk7IC8vIENsZWFyIGxvYWRpbmcgb3ZlcmxheSB3aGF0ZXZlciBoYXBwZW5zO1xuICAgIH0pO1xuICB9XG5cblxuICBfY2xlYXJGcmFnbWVudCgpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlRnJhZ21lbnQpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZUZyYWdtZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2FjdGl2ZUZyYWdtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuXG4gIHN0YXJ0TG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX2xvYWRpbmdPdmVybGF5KTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc3RvcExvYWRpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9sb2FkaW5nT3ZlcmxheSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhYlZpZXc7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9