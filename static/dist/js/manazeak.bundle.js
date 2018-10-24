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
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/Start.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/Start.js":
/*!****************************!*\
  !*** ./static/js/Start.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./static/scss/style.scss");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Utils.js */ "./static/js/utils/Utils.js");
/* harmony import */ var _utils_Errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Errors.js */ "./static/js/utils/Errors.js");
/* harmony import */ var _utils_Events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Events.js */ "./static/js/utils/Events.js");
/* harmony import */ var _utils_Shortcut_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Shortcut.js */ "./static/js/utils/Shortcut.js");
/* harmony import */ var _utils_Notification_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/Notification.js */ "./static/js/utils/Notification.js");
/* harmony import */ var _core_Mzk_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/Mzk.js */ "./static/js/core/Mzk.js");








'use_strict';

const errorsOptions = {
  verbose: true,
  trace: true
};

const notificationOptions = {
  thickBorder: 'top',
  duration: 4000,
  transition: 200,
  maxActive: 3
};

window.Utils = new _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
window.Errors = new _utils_Errors_js__WEBPACK_IMPORTED_MODULE_2__["default"](errorsOptions);
window.Events = new _utils_Events_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
window.Shortcut = new _utils_Shortcut_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
window.Notification = new _utils_Notification_js__WEBPACK_IMPORTED_MODULE_5__["default"](notificationOptions);

//Utils.addStyleSheet('/static/dist/css/main.css');

document.addEventListener('DOMContentLoaded', () => {
  window.mzk = new _core_Mzk_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  mzk.start();
});


/***/ }),

/***/ "./static/js/core/Komunikator.js":
/*!***************************************!*\
  !*** ./static/js/core/Komunikator.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class Komunikator {


  /** @summary <h1>Handle ManaZeak's HTTP requests</h1>
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>This class is the main object to deal with when requesting something from the server.<br>
   * It handle all urls calls (<code>GET</code>, <code>POST</code>), treat responses or handle errors using <code>Promise</code>.<br>
   * Because it uses <code>Promise</code>, success and errors are to be handled in the caller function, using <code>.then()</code> and <code>.catch()</code>.<br>
   * This object is a <a href="Mzk.html" target="_blank">Mzk</a>'s attribute, that can be used from anywhere (<code>mzk.komunikator</code>).<br>
   * Refer to <code>app/url.py</code> for available urls to control ManaZeak.</blockquote>
   * @param {Object} options - The komunikator's parameters
   * @param {String} options.csrfToken - The user's csrf token (must be extracted from browser's cookies before) */
  constructor(options) {
    /** @private
     * @member {String} - The user's csrf token */
    this._csrfToken = options.csrfToken;
    /** @private
     * @member {Array} - The HTTP headers that are used in <code>GET</code> and <code>POST</code> requests */
    this._headers = [];

    this._init();
  }


  //  ----  PRIVATE METHODS  ----  //


  /** @method
   * @name _init
   * @private
   * @memberof Komunikator
   * @description <blockquote>Init the Komunikator class by filling its <code>_headers</code> private member, to use in requests later on.<br>
   * This method must be called in Komunikator's constructor only.</blockquote> */
  _init() {
    this._headers.push(['Content-Type', 'application/json; charset=UTF-8']); // this._headers[0]
    this._headers.push(['Accept', 'application/json']); // this._headers[1]
    this._headers.push(['X-CSRFToken', this._csrfToken]); // this._headers[2]
  }


  //  ----  PUBLIC METHODS  ----  //


  /** @method
   * @async
   * @name get
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br>
   * <code>resolve</code> returns the response as an <code>Object</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from (see <code>app/urls.py</code>)
   * @returns {Promise} The request <code>Promise</code> */
  get(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]])
      };

      fetch(url, options)
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          } else if (response.status === 404) {
            reject('URL_NOT_FOUND');
          } else if (response.status === 403) {
            reject('ACCESS_FORBIDDEN');
          } else if (response.status === 500) {
            reject('INTERNAL_ERROR');
          } else {
            reject('UNKNOWN_ERROR');
          }
        });
    });
  }


  /** @method
   * @async
   * @name getBinaryResponse
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using an <code>XMLHttpRequest</code>, with an override mimetype hack to pass bytes through unprocessed.<br>
   * It was implemented to allow <code>d3.js</code> to render <code>.mood</code> file (used in <a href="./FootBar.html#.renderMoodFile" target="_blank">renderMoodFile</a>).<br>
   * <code>resolve</code> returns the response as binary data.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>.mood</code> file url to fetch data from
   * @returns {Promise} The request <code>Promise</code> */
  getBinaryResponse(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = function() { // Keep old js function definition since this is the request response object
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText); // responseText is binary data
        }
      };
      xhr.send();
    });
  }


  /** @method
   * @async
   * @name getTemplate
   * @memberof Komunikator
   * @description <blockquote><code>GET</code> HTTP request using the fetch API.<br>
   * <code>resolve</code> returns the response as a <code>String</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>GET</code> url to fetch data from (see <code>app/urls.py</code>)
   * @returns {Promise} The request <code>Promise</code> */
  getTemplate(url) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        headers: new Headers([this._headers[0]])
      };

      fetch(url, options)
        .then(response => {
          if (response.ok) {
            resolve(response.text());
          } else if (response.status === 404) {
            reject('URL_NOT_FOUND');
          } else if (response.status === 403) {
            reject('ACCESS_FORBIDDEN');
          } else if (response.status === 500) {
            reject('INTERNAL_ERROR');
          } else {
            reject('UNKNOWN_ERROR');
          }
        });
    });
  }


  /** @method
   * @async
   * @name post
   * @memberof Komunikator
   * @description <blockquote><code>POST</code> HTTP request using the fetch API.<br>
   * Beware that the given options object match the url expectations (browse the backend documentation for further details).<br>
   * <code>resolve</code> returns the response as an <code>Object</code>.<br>
   * <code>reject</code> returns an error key as a <code>String</code>.</blockquote>
   * @param {String} url - The <code>POST</code> url to fetch data from (see <code>app/urls.py</code>)
   * @param {Object} data - The <code>JSON</code> object that contains <code>POST</code> parameters
   * @returns {Promise} The request <code>Promise</code> */
  post(url, data) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: new Headers(this._headers), // POST needs all previously defined headers
        body: JSON.stringify(data)
      };

      fetch(url, options)
        .then(response => {
          if (response.ok) {
            resolve(response.json());
          } else if (response.status === 404) {
            reject('URL_NOT_FOUND');
          } else if (response.status === 403) {
            reject('ACCESS_FORBIDDEN');
          } else if (response.status === 500) {
            reject('INTERNAL_ERROR');
          } else {
            reject('UNKNOWN_ERROR');
          }
        });
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Komunikator);


/***/ }),

/***/ "./static/js/core/Mzk.js":
/*!*******************************!*\
  !*** ./static/js/core/Mzk.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Komunikator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Komunikator.js */ "./static/js/core/Komunikator.js");
/* harmony import */ var _model_Model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Model.js */ "./static/js/model/Model.js");
/* harmony import */ var _view_View_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/View.js */ "./static/js/view/View.js");
/* harmony import */ var _User_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./User.js */ "./static/js/core/User.js");




'use_strict';


class Mzk {
  /**
   * @summary ManaZeak main controller
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle both Model ad View, and animate them accordingly. Host User, Langage and Komunikator also.
   **/
  constructor() {
    this.cookies = {};
    this.komunikator = {};
    this.lang = {};
    this.model = {};
    this.user = {};
    this.view = {};
  }


  //  ----  SESSION INITIALIZATION  ----  //


  /**
   * @method
   * @name start
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init a ManaZeak session depending on user settings in db
   **/
  start() {
    this.cookies = Utils.getCookies(); // Get user cookies

    this._initKomunikator()
      .then(() => {
        return this._initLang();
      })
      .then(() => {
        return this._initUser();
      })
      .then(() => {
        return this._initModel();
      })
      .then(() => {
        return this._initView();
      })
      .then(() => {
        return this._initShortcut();
      })
      .then(() => {
        return this._startApp();
      })
      .catch(() => {
        Errors.raise({
          code: 'FATAL_ERROR',
          frontend: true
        });
      });
  }


  /**
   * @method
   * @name _initKomunikator
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the Komunikator object (cookies must have been stored before)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initKomunikator() {
    return new Promise(resolve => {
      this.komunikator = new _Komunikator_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
        csrfToken: this.cookies['csrftoken']
      });
      resolve();
    });
  }


  /**
   * @method
   * @name _initUser
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the User object
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initUser() {
    return new Promise((resolve, reject) => {
      this.user = new _User_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
      this.komunikator.get('user/getInformation/')
        .then(userInfo => {
          this.user.setMembers(userInfo);
          resolve();
        })
        .catch(errorCode => {
          Errors.raise({
            code: errorCode,
            frontend: true
          });
          reject();
        });
    });
  }


  /**
   * @method
   * @name _initLang
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the lang keys and attach them to this
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initLang() {
    const checkLang = (lang) => { // In case language JSON can not be fetched, we raise a manual notification only.
      if (lang.DONE) {
        this.lang = lang;
      } else {
        Notification.new({
          type: 'error',
          title: 'Unable to load language',
          message: 'Something went wrong, languages settings can not be received.'
        });
      }
    };

    return new Promise(resolve => {
      const options = {
        LANG: (navigator.language || navigator.userLanguage)
      };

      this.komunikator.post('language/', options)
        .then(lang => {
          checkLang(lang);
          resolve();
        }); // Errors can not be catched since language failed loading.
    });
  }


  /**
   * @method
   * @name _initModel
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the frontend Model
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initModel() {
    return new Promise(resolve => {
      this.model = new _model_Model_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      resolve();
    });
  }


  /**
   * @method
   * @name _initView
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the frontend View
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initView() {
    return new Promise(resolve => {
      this.view = new _view_View_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      resolve();
    });
  }


  /**
   * @method
   * @name _initShortcut
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the user shortcuts
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initShortcut() {
    return new Promise(resolve => {
      this.reloadShortcuts();
      resolve();
    });
  }


  /**
   * @method
   * @name _startApp
   * @private
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Start the UI building (must be called when everything have been safely initialized)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _startApp() {
    return new Promise((resolve, reject) => {
      this.komunikator.get('playlist/getUserPlaylists/')
        .then(collection => {
          this.model.initCollection(collection)
            .then(playlist => {
              this.view.initPlaylist(playlist);
              resolve();
            })
            .catch(errorKey => {
              Errors.raise({
                code: errorKey,
                frontend: false
              });
              reject();
            });
        })
        .catch(errorKey => {
          Errors.raise({
            code: errorKey,
            frontend: true
          });
          reject();
        });
    });
  }


  //  ----  PLAYBACK METHODS  ----  //


  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change the played track with the gievn one (using its ID)
   * @param {number} id - The track ID to request to the server
   **/
  changeTrack(id) {
    let durationPlayed = 0;

    if (!isNaN(this.model.getPlayer().getProgress())) {
      durationPlayed = this.model.getPlayer().getProgress();
    }

    const options = {
      TRACK_ID: id,
      LAST_TRACK_PATH: this.model.getPlayer().getSource(),
      TRACK_PERCENTAGE: durationPlayed,
      PREVIOUS: false
    };

    this.komunikator.post('track/getPath/', options)
      .then(track => {
        return this.model.changeTrack(id, track.TRACK_PATH);
      })
      .then(() => {
        this.view.changeTrack(this.model.getActiveTrack());
      })

    // Ci-gît ce petit banc de test, pour le lulz uniquement
    //.then(url => { return this.model.changeTrack('http://static.kevvv.in/sounds/callmemaybe.mp3') })
  }


  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the playback and update the view
   **/
  togglePlay() {
    this.model.togglePlay()
      .then(() => {
        this.view.togglePlay();
      });
  }


  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Stop the playback and update the view
   **/
  stopPlayback() {
    this.model.stopPlayback()
      .then(() => {
        this.view.stopPlayback();
      });
  }


  //  ----  VOLUME METHODS  ----  //


  /**
   * @method
   * @name mute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Mute the player
   **/
  mute() {
    this.model.mute();
    this.view.updateVolume();
  }


  /**
   * @method
   * @name unmute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Un Mute the player
   **/
  unmute() {
    this.model.unmute();
    this.view.updateVolume();
  }


  /**
   * @method
   * @name toggleMute
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the player's mute state and update the view
   **/
  toggleMute() {
    this.model.toggleMute()
      .then(() => {
        this.view.updateVolume();
      });
  }


  /**
   * @method
   * @name adjustVolume
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add/Substract a given amount of volume, in range float[-1, 1] and update the view
   **/
  adjustVolume(amount) {
    this.model.adjustVolume(amount)
      .then(() => {
        this.view.updateVolume();
      });
  }


  /**
   * @method
   * @name setVolume
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add/Substract a given amount of volume, in range float[0, 1] and update the view
   **/
  setVolume(volume) {
    this.model.setVolume(volume)
      .then(() => {
        this.view.updateVolume();
      });
  }


  //  ----  PROGRESS METHODS  ----  //


  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Adjust the progress percentage from a given amoun in range float[-100,100] and update the view
   **/
  adjustProgress(amount) {
    this.model.adjustProgress(amount)
      .then(() => {
        this.view.updateProgress();
      });
  }


  /**
   * @method
   * @name setProgress
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Set the progress percentage in range float[0,100] and update the view
   **/
  setProgress(progress) {
    this.model.setProgress(progress)
      .then(() => {
        this.view.updateProgress();
      });
  }


  /**
   * @method
   * @name trackEnded
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Triggered when the player reached the end of a track
   **/
  trackEnded() {
    mzk.nextTrackInView();
  }


  /**
   * @method
   * @name nextTrackInView
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the next one in the current view
   **/
  nextTrackInView() {
    const repeatMode = this.model.repeatMode;

    if (repeatMode === 0) {
      if (this.view.isLastTrack()) {
        this.stopPlayback();
      } else {
        mzk.nextTrackInView();
      }
    } else if (repeatMode === 1) {
      mzk.repeatTrack();
    } else if (repeatMode === 2) {
      mzk.changeTrack(this.view.getNextTrackId());
    } else {
      // TODO : handle error
    }
  }


  /**
   * @method
   * @name previousTrackInView
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the player track using the previous one in the current view
   **/
  previousTrackInView() {
    mzk.changeTrack(this.view.getPreviousTrackId());
  }


  repeatTrack() {
    this.model.repeatTrack();
    // No need to update the view since the current track didn't changed
  }


  /**
   * @method
   * @name toggleRepeatMode
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Change the repeat state to the next one (off, one, all)
   **/
  toggleRepeatMode() {
    this.model.toggleRepeatMode()
      .then((repeatMode) => {
        this.view.setRepeatMode(repeatMode);
      });
  }

  //  ----  SHORTCUTS METHODS  ----  //


  /**
   * @method
   * @name reloadShortcuts
   * @public
   * @memberof Mzk
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Clear registered shortcuts and reload them all from User preferences, when they'll be a thing
   **/
  reloadShortcuts() {
    Shortcut.unregisterAll();

    // Multi keys shortcuts must be declared before simple ones, to respect the trigger ordre

    // Volume control
    Shortcut.register('Ctrl+Shift+ArrowDown', () => {
      this.adjustVolume(-0.25);
    });

    Shortcut.register('Ctrl+Shift+ArrowUp', () => {
      this.adjustVolume(0.25);
    });

    Shortcut.register('Ctrl+ArrowDown', () => {
      this.adjustVolume(-0.1);
    });

    Shortcut.register('Ctrl+ArrowUp', () => {
      this.adjustVolume(0.1);
    });

    Shortcut.register('ArrowDown', () => {
      this.adjustVolume(-0.01);
    });

    Shortcut.register('ArrowUp', () => {
      this.adjustVolume(0.01);
    });

    // Progress control
    Shortcut.register('Ctrl+Shift+ArrowLeft', () => {
      this.adjustProgress(-25);
    });

    Shortcut.register('Ctrl+Shift+ArrowRight', () => {
      this.adjustProgress(25);
    });

    Shortcut.register('Ctrl+ArrowLeft', () => {
      this.adjustProgress(-10);
    });

    Shortcut.register('Ctrl+ArrowRight', () => {
      this.adjustProgress(10);
    });

    Shortcut.register('ArrowLeft', () => {
      this.adjustProgress(-1);
    });

    Shortcut.register('ArrowRight', () => {
      this.adjustProgress(1);
    });

    // Playback control
    Shortcut.register(' ', () => {
      this.togglePlay();
    });
  }


  logOut() {
    this.komunikator.getBinaryResponse('logout/')
      .then(() => {
        location.reload();
      });
  }


  //  ----  GETTERS / SETTERS  ----  //


  getIsMuted() {
    return this.model.getPlayer().getIsMuted();
  }
  getProgress() {
    return this.model.getPlayer().getProgress();
  }
  getVolume() {
    return this.model.getVolume();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Mzk);


/***/ }),

/***/ "./static/js/core/Player.js":
/*!**********************************!*\
  !*** ./static/js/core/Player.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class Player {


  /**
   * @summary Basic audio HTML music player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Provide a few features to control a playback. Should be handled in a controller
   **/
  constructor() {
    this._player = {}; // HTML audio player
    this._volume = 0.0; // Volume in range [0, 1] float
    this._isMuted = false; // Mute flag
    this._isPlaying = false; // Playback flag

    this._init(); // Init player object
    this._events(); // Listen to events
    this._attach(); // Attach HTML audio tag to the DOM
  }


  //  ----  PRIVATE METHODS  ----  //


  /**
   * @method
   * @name _init
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Build player tag and set loop/volume values
   **/
  _init() {
    this._player = document.createElement('AUDIO'); // Create HTML audio tag
    this._player.id = 'mzk-audio-player'; // Assign player ID
    this.setVolume(1); // Initialize volume to its maximum value, prefs
  }


  /**
   * @method
   * @name _event
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Listen to ended track event on audio player
   **/
  _events() {
    this._player.addEventListener('ended', this._trackEnded.bind(this)); // Handle track end playback event
  }


  /**
   * @method
   * @name _attach
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Append audio player to the DOM using a fragment
   **/
  _attach() {
    const fragment = document.createDocumentFragment(); // Fragment creation
    fragment.appendChild(this._player); // Append audio player to the fragment
    document.body.appendChild(fragment); // Append fragment to the document body
  }


  /**
   * @method
   * @name _getProgress
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Compute and returns the current track progression in the player
   * @returns {number} The track progression in completion percentage in range [0, 100]
   **/
  _getProgress() {
    return Utils.precisionRound((this._player.currentTime * 100) / this._player.duration, 3) || 0; // Compute percentage from current time
  }


  /**
   * @method
   * @name _setProgress
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Set progression percentage on current track
   * @param {number} percentage - The progression percentage in range [0, 100]
   **/
  _setProgress(percentage) {
    if (typeof percentage !== 'number') { // Bad format for value
      Errors.raise({
        code: 'INVALID_PROGRESS',
        frontend: true
      });
      return;
    }

    if (this._player.currentTime === 0) { // When player is stopped, currentTime = 0. We don't do anything
      return;
    }

    if (percentage <= 0) { // Bound lower value
      percentage = 0;
    }

    if (percentage > 100) { // Bound upper value
      percentage = 100;
    }

    this._player.currentTime = (percentage * this._player.duration) / 100; // Apply percentage to total duration
  }


  /**
   * @method
   * @name _setVolume
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Set the player volume according to the given value.
   * @param {number} value - The volume value to set in range [0, 1]
   **/
  _setVolume(value) {
    if (typeof value !== 'number') { // Bad format for value
      Errors.raise({
        code: 'INVALID_VOLUME',
        frontend: true
      });
      return;
    }

    if (value <= 0) { // Bound lower value
      this.mute();
      this._volume = 0;
      return;
    }

    if (value > 1) { // Bound upper value
      value = 1;
    }

    if (this._isMuted) { // Restore mute state if needed
      this.unmute(); // Un mute playback
      this.setVolume(value); // Call again setVolume with previous value
      return;
    }

    this._player.volume = Utils.precisionRound(value, 2); // Assign new volume value (truncated with 2 decimals)
    this._volume = this._player.volume; // Store old volume value
  }


  /**
   * @method
   * @name _trackEnded
   * @private
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Action to take when the current track reaches its end
   **/
  _trackEnded() {
    this._isPlaying = false; // Update playling state
    mzk.trackEnded();
  }


  //  ----  PUBLIC METHODS  ----  //


  /**
   * @method
   * @name toggleMute
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Toggle the mute status of the player
   **/
  toggleMute() {
    if (!this._isMuted) {
      this.mute();
    } else {
      this.unmute();
    }
  }


  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Toggle the playback state of the player
   **/
  togglePlay() {
    if (!this._isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }


  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Add/Substract the amount (percentage) to the current progress (percentage)
   * @param {number} amount - Percentage value to adjust progress in range [0, 100]
   **/
  adjustProgress(amount) {
    this._setProgress(this._getProgress() + amount); // Inner call with current progression
  }


  /**
   * @method
   * @name adjustVolume
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Add/Substract the amount to the current volume
   * @param {number} amount - Volume to add/substract in range [0, 1]
   **/
  adjustVolume(amount) {
    this._setVolume(this._volume + amount); // Inner call
  }


  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Change the player source and start the playback once ready to play
   * @param {string} url - The path to the track (local or hosted)
   * @returns {Promise} A Promise that resolves when player is operating
   **/
  changeTrack(url) {
    return new Promise((resolve) => {
      if (typeof url !== 'string') { // Bad format value
        Errors.raise({
          code: 'INVALID_TRACK_URL',
          frontend: true
        });
        return;
      }

      const loadedListener = () => {
        this._player.removeEventListener('loadedmetadata', loadedListener); // Remove loaded track listener
        this.play(); // Call player play method (not actually play after that line)
        resolve(); // Resolve promise
      };

      if (this._isPlaying) { // Stop any previous playback
        this.stop();
      }

      this._player.src = url; // Set new track url
      this._player.addEventListener('loadedmetadata', loadedListener); // Add loaded track listener
    });
  }


  /**
   * @method
   * @name play
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Swap playing state and start playback at currentTime
   **/
  play() {
    if (this._player.src) { // Apply only if src is defined
      this._isPlaying = true; // Set playing state to true
      this._player.play(); // Start player efective playback
    }
  }


  /**
   * @method
   * @name pause
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Swap playing state and pause playback at currentTime
   **/
  pause() {
    if (this._player.src) { // Apply only if src is defined
      this._isPlaying = false; // Set playing state to false
      this._player.pause(); // Pause player playback
    }
  }


  /**
   * @method
   * @name stop
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Stop playback and remove source from player attributes
   **/
  stop() {
    if (this._player.src) { // Apply only if src is defined
      this._player.pause(); // Pause player playback
      this._isPlaying = false; // Set playing state to false
      this._player.currentTime = 0;
      //this._player.duration = 0;
      this._player.removeAttribute('src'); // Remove src attribute from player (since this._player.src = null doesn't delete src)
    }
  }


  /**
   * @method
   * @name mute
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Set player effective volume to zero
   **/
  mute() {
    if (!this._isMuted) { // Avoid multi call
      this._isMuted = true; // Set mute state to true
      this._player.volume = 0; // Mute audio player
    }
  }


  /**
   * @method
   * @name unmute
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Restore player volume to previous its value
   **/
  unmute() {
    if (this._isMuted) { // Avoid multi call
      let volume = 0.5; // Prevent old volume value was zero, we need to restore at half, to avoid unmuting to volume = 0

      if (this._volume !== 0) { // Old volume != 0
        volume = this._volume; // We restore the previous volume otherwise
      }

      this._isMuted = false; // Set mute state to false
      this.setVolume(volume); // Restore old volume value
    }
  }


  /**
   * @method
   * @name repeatTrack
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since July 2018
   * @description restart immediately the current track in the player
   **/
  repeatTrack() {
    if (this._player.src) { // Apply only if src is defined
      this._player.currentTime = 0; // Reset current time
      this.play(); // Start playback
    }
  }


  /**
   * @method
   * @name getSource
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Returns the player current source url if existing, otherwise returns None
   * @returns {string} - The player current source url
   **/
  getSource() {
    let source = 'None';

    if (this._player.src !== null) {
      source = this._player.src;
    }

    return source;
  }


  /**
   * @method
   * @name hasSource
   * @public
   * @memberof Player
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Check if player has a loaded track
   * @returns {boolean} - The presence of a source in player state
   **/
  hasSource() {
    let hasSource = false;

    if (this._player.src) {
      hasSource = true;
    }

    return hasSource;
  }


  //  ----  GETTER   ----  //


  getIsPlaying() {
    return this._isPlaying;
  }


  getIsMuted() {
    return this._isMuted;
  }


  getVolume() {
    return this._volume;
  }


  getProgress() {
    return this._getProgress();
  }


  getDuration() {
    return this._player.duration;
  }


  getCurrentTime() {
    return this._player.currentTime;
  }


  //  ----  SETTER   ----  //


  setProgress(percentage) {
    this._setProgress(percentage);
  }


  setVolume(value) {
    this._setVolume(value);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./static/js/core/User.js":
/*!********************************!*\
  !*** ./static/js/core/User.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class User {


  /** @summary <h1>ManaZeak's user class</h1>
   * @author Arthur Beaulieu
   * @since June 2018
   * @description <blockquote>This class stores everything useful about the user.<br>
   * It stores its own attributes and provide a method to test the user's permissions (frontend only, the backend does its own test for this).<br>
   * All user members must be accessed through getters and setters.<br>
   * This object is a <a href="Mzk.html" target="_blank">Mzk</a>'s attribute, that can be used from anywhere (<code>mzk.user</code>).</blockquote> */
  constructor() {
    /** @private
     * @member {String} - The user's god father's invite code */
    this._godfatherCode = '';
    /** @private
     * @member {String} - The user's god father's name */
    this._godfatherName = '';
    /** @private
     * @member {Number} - The user's current group id */
    this._groupId = -1;
    /** @private
     * @member {String} - The user's current group name */
    this._groupName = '';
    /** @private
     * @member {Number} - The user's id */
    this._id = -1;
    /** @private
     * @member {String} - The user's invite code hash */
    this._inviteCode = '';
    /** @private
     * @member {Boolean} - The user's admin status */
    this._isAdmin = false;
    /** @private
     * @member {Array} - The user's permissions (4-grams items, see <code>app/utils.py:populateDB()</code>) */
    this._permissions = [];
    /** @private
     * @member {String} - The user's username */
    this._username = '';
  }


  //  ----  PUBLIC METHODS  ----  //


  /** @method
   * @name hasPermission
   * @memberof User
   * @description <blockquote>Test if the user has a given permission, using the 4-grams defined in <code>app/utils.py:populateDB()</code>.</blockquote>
   * @param {String} permissionCode - The permission code to test, it must be a four caps letters
   * @returns {Boolean} True if user is granted, false otherwise */
  hasPermission(permissionCode) {
    return this._permissions.includes(permissionCode);
  }


  /** @method
   * @name setMembers
   * @memberof User
   * @description <blockquote>Set members according to the given <code>GET</code> response from url <code>user/getInformation/</code>.</blockquote>
   * @param {Object} options - The server response object
   * @param {Number} options.GODFATHER_CODE - The user's godfather invitation code
   * @param {String} options.GODFATHER_NAME - The user's godfather name
   * @param {Number} options.GROUP_ID - The user's group id
   * @param {String} options.GROUP_NAME - The user's group
   * @param {Number} options.USER_ID - The user's id
   * @param {Number} options.INVITE_CODE - The user's invitation code
   * @param {Boolean} options.IS_ADMIN - The user's admin status
   * @param {Array} options.PERMISSIONS - The user's permissions
   * @param {String} options.USERNAME - The user's username */
  setMembers(options) {
    this._avatarPath = options.AVATAR_PATH;
    this._godfatherCode = options.GODFATHER_CODE;
    this._godfatherName = options.GODFATHER_NAME;
    this._groupId = options.GROUP_ID;
    this._groupName = options.GROUP_NAME;
    this._id = options.USER_ID;
    this._inviteCode = options.INVITE_CODE;
    this._isAdmin = options.IS_ADMIN;
    this._permissions = options.PERMISSIONS;
    this._username = options.USERNAME;
  }


  //  ----  GETTER  ----  //


  /** <strong>getter:godfatherName</strong>
   * @type {String} */
  get godfatherName() {
    return this._godfatherName;
  }


  /** <strong>getter:id</strong>
   * @type {Number} */
  get id() {
    return this._id;
  }


  /** <strong>getter:username</strong>
   * @type {String} */
  get username() {
    return this._username;
  }

  get avatarPath() {
    return this._avatarPath;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (User);


/***/ }),

/***/ "./static/js/model/Model.js":
/*!**********************************!*\
  !*** ./static/js/model/Model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Player.js */ "./static/js/core/Player.js");
/* harmony import */ var _components_Collection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Collection.js */ "./static/js/model/components/Collection.js");


'use_strict';

class Model {
  /**
   * @summary ManaZeak frontend model
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle ManaZeak abstract models relative to the current session
   **/
  constructor() {
    this._player = {};
    this._collection = {};
    this._activeTrack = null;

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof Model
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Init player, user collection
   **/
  _init() {
    this._player = new _core_Player_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._collection = new _components_Collection_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  //  --------------------------------  PLAYER METHODS  ---------------------------------  //

  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Change the current track in the player according to the given url
   * @param {string} url - The track url to read stream from
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  changeTrack(id, url) {
    return new Promise(resolve => {
      this._activeTrack = this.getTrackById(id);
      this._player.changeTrack(url).then(resolve);
    });
  }


  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Toggle playback on the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  togglePlay() {
    return new Promise(resolve => {
      this._player.togglePlay();
      resolve();
    });
  }

  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Stop the player playback
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  stopPlayback() {
    return new Promise(resolve => {
      this._player.stop();
      this._activeTrack = null;
      resolve();
    });
  }

  /**
   * @method
   * @name mute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Mute the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  mute() {
    return new Promise(resolve => {
      this._player.mute();
      resolve();
    });
  }

  /**
   * @method
   * @name unmute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description UnMute the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  unmute() {
    return new Promise(resolve => {
      this._player.unmute();
      resolve();
    });
  }

  /**
   * @method
   * @name toggleMute
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Toggle the mute status of the player
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  toggleMute() {
    return new Promise(resolve => {
      this._player.toggleMute();
      resolve();
    });
  }

  /**
   * @method
   * @name adjustVolume
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Adjust the playback volume from a given amount
   * @param {number} amount - Positive or negative float amount of volume in range [-1, 1]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  adjustVolume(amount) {
    return new Promise(resolve => {
      this._player.adjustVolume(amount);
      resolve();
    });
  }

  /**
   * @method
   * @name setVolume
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Set the playback volume from a given value
   * @param {number} volume - Positive or negative float volume value in range [0, 1]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  setVolume(volume) {
    return new Promise(resolve => {
      this._player.setVolume(volume);
      resolve();
    });
  }

  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Adjust the playback progress from a given amount
   * @param {number} amount - Positive or negative float amount of progress in range [-100, 100]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  adjustProgress(amount) {
    return new Promise(resolve => {
      this._player.adjustProgress(amount);
      resolve();
    });
  }

  /**
   * @method
   * @name setProgress
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Set the playback progress from a given amount
   * @param {number} progress - The progression percentage [0, 100]
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  setProgress(progress) {
    return new Promise(resolve => {
      this._player.setProgress(progress);
      resolve();
    });
  }

  //  --------------------------------  COLLECTION METHODS  ---------------------------------  //

  /**
   * @method
   * @name initCollection
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Init user colletion according to user response (from controller mzk.js)
   * @param {object} response - The server reponse object
   * @param {boolean} response.DONE - The request status
   * @param {string} response.ERROR_KEY - The error key to eventually use
   * @param {array} response.COLLECTION - The raw user collection
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  initCollection(response) {
    return new Promise((resolve, reject) => {
      if (response.DONE && response.ERROR_KEY === null) {
        if (response.COLLECTION.length === 0) {
          this._collection.newLibrary()
            .then(() => {
              resolve(this._collection.getActivePlaylist());
            });
        } else {
          this._collection.buildUserCollection(response)
            .then(() => {
              resolve(this._collection.getActivePlaylist());
            });
        }
      } else {
        reject(response.ERROR_KEY);
      }
    });
  }

  /**
   * @method
   * @name getTrackById
   * @public
   * @memberof Model
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Returns the track that match the given id, searching in full user collection (obviously brutal)
   * @param {number} id - The track id to get in collections
   * @returns {object} - The matching track or null
   **/
  getTrackById(id) {
    for (let i = 0; i < this._collection._playlists.length; ++i) {
      for (let j = 0; j < this._collection._playlists[i]._artists.length; ++j) {
        for (let k = 0; k < this._collection._playlists[i]._artists[j].albums.length; ++k) {
          for (let l = 0; l < this._collection._playlists[i]._artists[j].albums[k].tracks.length; ++l) {
            if (this._collection._playlists[i]._artists[j].albums[k].tracks[l].id === id) {
              return this._collection._playlists[i]._artists[j].albums[k].tracks[l];
            }
          }
        }
      }
    }

    return null;
  }

  toggleRepeatMode() {
    return new Promise(resolve => {
      this._collection.getActivePlaylist().toggleRepeatMode();
      resolve(this._collection.getActivePlaylist().repeatMode);
    });
  }

  repeatTrack() {
    this._player.repeatTrack();
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._collection.getActivePlaylist().repeatMode;
  }

  getVolume() {
    return this._player.getVolume();
  }
  getPlayer() {
    return this._player;
  }
  getCollection() {
    return this._collection;
  }
  getActiveTrack() {
    return this._activeTrack;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Model);


/***/ }),

/***/ "./static/js/model/components/Collection.js":
/*!**************************************************!*\
  !*** ./static/js/model/components/Collection.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Playlist_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Playlist.js */ "./static/js/model/components/Playlist.js");

'use_strict';

class Collection {
  /**
   * @summary ManaZeak Collection class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the user collection of playlists. It contains both the ManaZeak libraries, the usr playlist, and in a near future, shared playlist from other users
   **/
  constructor() {
    this._playlists = [];
    this._activePlaylist = -1;
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _initialScan
   * @private
   * @memberof Collection
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Ask the server to perform an initial scan server side (use on a newly created library only)
   * @param {object} playlist - The new playlist (library)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _initialScan(playlist) {
    return new Promise((resolve) => {
      const options = {
        LIBRARY_ID: playlist.getId()
      };

      mzk.komunikator.post('library/initialScan/', options)
        .then(() => {
          return this._checkScanStatus(playlist);
        })
        .then(resolve);
    });
  }

  /**
   * @method
   * @name checkScanStatus
   * @private
   * @memberof Collection
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Ask the server until a library have been scanned and request tracks for it
   * @description Method that recurse with an interval to ask the server if a library have been fully scanned (use on a newly created library only, after _initialScan only)
   * @param {object} playlist - The new playlist (library)
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _checkScanStatus(playlist) {
    return new Promise((resolve, reject) => {
      let intervalId = -1;
      const options = {
        PLAYLIST_ID: playlist.getId()
      };

      const checkStatus = () => {
        mzk.komunikator.post('library/checkScanStatus/', options)
          .then((response) => {
            if (response.DONE === true) {
              clearInterval(intervalId);
              playlist.getArtistsFromServer(response)
                .then(resolve)
                .catch(errorCode => {
                  Errors.raise({
                    code: errorCode,
                    frontend: false
                  });
                  reject();
                });
            }
          })
          .catch(errorCode => {
            Errors.raise({
              code: errorCode,
              frontend: true
            });
            reject();
          });
      };

      intervalId = setInterval(() => {
        checkStatus();
      }, 500);
    });
  }

  /**
   * @method
   * @name _buildPlaylist
   * @private
   * @memberof Collection
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Builds a new playlist from a server response
   * @param {object} playlist - The raw playlist to build
   * @param {object} playlist.INFO - The playlist information
   * @param {number} playlist.INFO.ID - The playlist id
   * @param {boolean} playlist.INFO.IS_LIBRARY - The playlist id
   * @param {boolean} playlist.INFO.IS_PUBLIC - The playlist id
   * @param {string} playlist.INFO.NAME - The playlist name
   * @param {string} playlist.INFO.DESCRIPTION - The playlist description
   * @param {string} playlist.INFO.OWNER - The playlist owner
   * @param {number} playlist.INFO.AVERAGE_BITRATE - The playlist average bitrate
   * @param {number} playlist.INFO.TOTAL_DURATION - The playlist total duration
   * @param {number} playlist.INFO.TOTAL_TRACK - The playlist total track
   **/
  _buildPlaylist(playlist) {
    const options = {
      id: playlist.INFO.ID,
      isLibrary: playlist.INFO.IS_LIBRARY,
      isPublic: playlist.INFO.IS_PUBLIC,
      name: playlist.INFO.NAME,
      description: playlist.INFO.DESCRIPTION,
      owner: playlist.INFO.OWNER,
      averagBitRate: playlist.INFO.AVERAGE_BITRATE,
      totalDuration: playlist.INFO.TOTAL_DURATION,
      totalTrack: playlist.INFO.TOTAL_TRACK
    };
    // TODO handle playlist.VIEW
    this._playlists.push(new _Playlist_js__WEBPACK_IMPORTED_MODULE_0__["default"](options));
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name buildUserCollection
   * @public
   * @memberof Collection
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get playlist relative artists object from server
   * @param {object} response - The server reponse object
   * @param {boolean} response.DONE - The request status
   * @param {string} response.ERROR_KEY - The error key to eventually use
   * @param {array} response.COLLECTION - The user collection of playlists
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  buildUserCollection(response) {
    return new Promise(resolve => {
      for (let i = 0; i < response.COLLECTION.length; ++i) {
        this._buildPlaylist(response.COLLECTION[i]);
        this._playlists[this._playlists.length - 1].getArtistsFromServer(response)
          .then(() => {
            this._activePlaylist = 0; // TODO : store in ack user latest active playlist (keep the I index)
            resolve();
          });
      }
    });
  }

  /**
   * @method
   * @name newLibrary
   * @public
   * @memberof Collection
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get playlist relative artists object from server
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  newLibrary() {
    return new Promise((resolve) => {
      if (!mzk.user.hasPermission('LIBR')) {
        return;
      }

      const checkServerResponse = (response) => {
        if (response.DONE) {
          this._activePlaylist = 0;
          this._buildPlaylist(response);
          this._initialScan(this._playlists[0])
            .then(() => {
              Shortcut.resumeAll(); // Restore all shortcuts
              mzk.view.removeOverlay(); // Remove modal from main container
              resolve();
            });
        } else {
          Errors.raise({
            code: response.ERROR_KEY,
            frontend: false
          });
        }
      };

      const checkModalValues = (formValues) => {
        const options = {
          NAME: formValues.name,
          URL: formValues.path,
          CONVERT: false
        };

        mzk.komunikator.post('library/new/', options)
          .then(response => {
            checkServerResponse(response);
          })
          .catch(response => {
            Errors.raise({
              code: response,
              frontend: true
            });
          });
      };

      Shortcut.pauseAll(); // Pause all shortcuts (espascially the stop propagation)
      mzk.view.displayModal({
          name: 'newlibrary',
          callback: checkModalValues
      });
    });
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getActivePlaylist() {
    return this._playlists[this._activePlaylist];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Collection);


/***/ }),

/***/ "./static/js/model/components/Playlist.js":
/*!************************************************!*\
  !*** ./static/js/model/components/Playlist.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Track_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Track.js */ "./static/js/model/components/Track.js");

'use_strict';


class Playlist {
  /**
   * @summary ManaZeak Playlist class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Playlist object that stores all information about a single playlist
   * @param {object} options - The playlist information
   * @param {number} options.id - The playlist id
   * @param {boolean} options.isLibrary - Is playlist a library
   * @param {boolean} options.isPublic - Is playlist public
   * @param {string} options.name - The playlist name
   * @param {string} options.description - The playlist description
   * @param {string} options.owner - The playlist owner
   * @param {number} options.averageBitRate - The playlist average bitrate
   * @param {number} options.totalDuration - The playlist total duration
   * @param {number} options.totalTrack - The playlist total track
   **/
  constructor(options) {
    this._id = options.id;
    this._isLibrary = options.isLibrary;
    this._isPublic = options.isPublic;
    this._name = options.name;
    this._description = options.description;
    this._owner = options.owner;
    this._avgBitrate = options.averagBitRate;
    this._totalDuration = options.totalDuration;
    this._totalTrack = options.totalTrack;
    this._repeatMode = 0; // 0 = off | 1 = one | 2 = all

    this._rawArtists = []; // Artist array that contains albums array that contains tracks array
    this._artists = [];
    this._tracks = [];
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _getArtistsLazyLoad
   * @private
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fetch a bunch of tracks
   * @param {number} step - The lazy load call number
   **/
  _getArtistsLazyLoad(step) {
    const options = {
      PLAYLIST_ID: this._id,
      REQUEST_NUMBER: step
    };

    mzk.komunikator.post('playlist/simplifiedLazyLoading/', options)
      .then((response) => {
        if (response.DONE) {
          this._convertRawArtists(response.RESULT)
            .then(() => {
              this._getArtistsLazyLoad(step + 1);
            });
        } else {
          if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
            Events.fire(`TrackLoaded-${this._id}`);
          } else {
            console.log('Error');
          }
        }
      })
      .catch(errorCode => {
        Errors.raise({
          code: errorCode,
          frontend: true
        });
      });
  }

  /**
   * @method
   * @name _convertRawArtists
   * @private
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Convert raw artists into cleansed object
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  _convertRawArtists(rawArtistsArray) {
    return new Promise(resolve => {
      for (let i = 0; i < rawArtistsArray.length; ++i) {
        const albums = [];
        for (let j = 0; j < rawArtistsArray[i].ALBUMS.length; ++j) {
          const tracks = [];
          for (let k = 0; k < rawArtistsArray[i].ALBUMS[j].TRACKS.length; ++k) {
            tracks.push(new _Track_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
              album: rawArtistsArray[i].ALBUMS[j],
              artist: rawArtistsArray[i].NAME,
              rawTrack: rawArtistsArray[i].ALBUMS[j].TRACKS[k]
            }));
          }

          albums.push({
            id: rawArtistsArray[i].ALBUMS[j].ID,
            name: rawArtistsArray[i].ALBUMS[j].NAME,
            tracks: tracks
          });
        }

        this._artists.push({
          ids: rawArtistsArray[i].IDS,
          name: rawArtistsArray[i].NAME,
          albums: albums
        });
      }

      resolve();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name getArtistsFromServer
   * @public
   * @memberof Playlist
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get playlist relative artists object from server
   * @param {object} response - The server reponse object
   * @param {boolean} response.DONE - The request status
   * @param {string} response.ERROR_KEY - The error key to eventually use
   * @returns {Promise} - A promise that resolve when logic has been executed
   **/
  getArtistsFromServer(response) {
    return new Promise((resolve, reject) => {
      if (response.DONE) {
        const eventOptions = {
          name: `TrackLoaded-${this._id}`,
          oneShot: true // Event needs to be dismissed after request completion
        };

        Events.register(eventOptions, () => {
          resolve();
        });
        this._getArtistsLazyLoad(0);
      } else {
        reject(response.ERROR_KEY);
      }
    });
  }

  toggleRepeatMode() {
    this._repeatMode = ++this._repeatMode % 3;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  get repeatMode() {
    return this._repeatMode;
  }

  getId() {
    return this._id;
  }
  getArtists() {
    return this._artists;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Playlist);


/***/ }),

/***/ "./static/js/model/components/Track.js":
/*!*********************************************!*\
  !*** ./static/js/model/components/Track.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Track {
  /**
   * @summary ManaZeak Track class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Stores all metadata from a raw format
   * @param {object} options - The track metadata
   * @param {string} options.album - Track album
   * @param {string} options.artist - Track artist
   * @param {object} options.rawTrack - Raw track server response
   * @param {number} options.rawTrack.BITRATE - Track bitrate (kbps)
   * @param {string} options.rawTrack.COMPOSER - Track composer
   * @param {string} options.rawTrack.COVER - Track cover url
   * @param {number} options.rawTrack.DURATION - Track duration
   * @param {string} options.rawTrack.GENRE - Track genre
   * @param {number} options.rawTrack.ID - Track id
   * @param {string} options.rawTrack.PERFORMER - Track performer
   * @param {string} options.rawTrack.TITLE - Track title
   * @param {number} options.rawTrack.YEAR - Track year
   **/
  constructor(options) {
    this.album = options.album;
    this.artist = options.artist;
    this.bitrate = options.rawTrack.BITRATE;
    this.composer = options.rawTrack.COMPOSER;
    this.cover = options.rawTrack.COVER;
    this.duration = options.rawTrack.DURATION;
    this.genre = options.rawTrack.GENRE;
    this.id = options.rawTrack.ID;
    this.moodbar = options.rawTrack.MOODBAR;
    this.performer = options.rawTrack.PERFORMER;
    this.title = options.rawTrack.TITLE;
    this.year = options.rawTrack.YEAR;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getId() {
    return this._id;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Track);


/***/ }),

/***/ "./static/js/utils/Errors.js":
/*!***********************************!*\
  !*** ./static/js/utils/Errors.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Errors {
  /**
   * @summary Errors system with feedback
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Raise both a log and a user feeback depending on lang/*.json files (all severity/key/value mut figure in it). The class also logs TypeErrors in JavaScript
   **/
  constructor(options) {
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
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _getCallerName
   * @private
   * @memberof Errors
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Get caller function name depending on given browser
   * @param {object} browsers - Contains a browser list associated with a boolean to know which browser is in use
   * @returns {string} The caller function name
   **/
  _getCallerName(browser) {
    // Original code from: https://gist.github.com/irisli/716b6dacd3f151ce2b7e
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

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name raise
   * @public
   * @memberof Events
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Register a custom event using a name and a callback
   * @param {object} options - The error options
   * @param {string} options.code - The error key value in lang/*.json "errors" object
   * @param {boolean} [options.frontend=false] - The event string identifier (use specific names)
   **/
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
      console.groupCollapsed(`${severity.toUpperCase()} : ${title} (Error.js)`);

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

/* harmony default export */ __webpack_exports__["default"] = (Errors);


/***/ }),

/***/ "./static/js/utils/Events.js":
/*!***********************************!*\
  !*** ./static/js/utils/Events.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Events {
  /**
   * @summary Basic custom events system
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Exposes an API to register/unregister events and fire them
   **/
  constructor() {
    this._eventUid = 0;
    this._events = {};
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name register
   * @public
   * @memberof Events
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Register a custom event using a name and a callback
   * @param {object} options - The event options
   * @param {string} options.name - The event string identifier (use specific names)
   * @param {boolean} [options.oneShot=false] - Only register the event for one call. Automatically unregister after
   * @returns {number} The event id (useful to unregister the registered event)
   **/
  register(options, callback) {
    if (typeof options !== 'object' || typeof options.name !== 'string' || typeof callback !== 'function') {
      return -1;
    }

    if (!this._events[options.name]) {
      this._events[options.name] = [];
    } // Create event entry if not already existing

    this._events[options.name].push({
      id: this._eventUid,
      name: options.name,
      oneShot: options.oneShot ? options.oneShot : false,
      callback: callback
    });

    this._eventUid++;

    return this._eventUid; // Post increment to return the true event entry id, then increment
  }

  /**
   * @method
   * @name unregister
   * @public
   * @memberof Events
   * @author Arthur Beaulieu
   * @since September 2018
   * @description UnRegister a custom event using its id
   * @param {number} uid - The event unique id
   **/
  unregister(uid) {
    if (typeof uuid !== 'number') {
      return;
    }

    for (const key in this._events) {
      let i = this._events[key].length;
      while (i--) { // Reverse parsing, post decrement is mandatory bc of splice()
        if (this._events[key][i].id === uid) {
          this._events[key].splice(i, 1);
        }
      }

      if (this._events[key].length === 0) {
        delete this._events[key];
      } // Remove event entry if nothing is listening to it
    }
  }

  /**
   * @method
   * @name unregisterAll
   * @public
   * @memberof Events
   * @author Arthur Beaulieu
   * @since September 2018
   * @description UnRegister all custom event registered
   **/
  unregisterAll() {
    this._events = {}; // Remove all entry
  }

  /**
   * @method
   * @name fire
   * @public
   * @memberof Events
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fire a custom event from its string identifier
   * @param {string} eventName - The event string identifier
   **/
  fire(eventName) {
    if (typeof eventName !== 'string') {
      return;
    }

    for (const key in this._events) {
      let i = this._events[key].length;
      while (i--) { // Reverse parsing, post decrement is mandatory bc of splice()
        if (this._events[key][i].name === eventName) {
          this._events[key][i].callback();
          if (this._events[key][i].oneShot) {
            this._events[key].splice(i, 1);
          } // Remove oneShot listener from event entry
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Events);


/***/ }),

/***/ "./static/js/utils/Modal.js":
/*!**********************************!*\
  !*** ./static/js/utils/Modal.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class Modal {
  constructor() {

  }

  newLibrary(options) {
    let close = document.getElementById('new-library-close');
    let create = document.getElementById('create-new-library');
    let libraryName = document.getElementById('library-name');
    let libraryPath = document.getElementById('library-path');

    console.log(libraryName)
    console.log(libraryPath)
    console.log(close)
    console.log(create)

    close.addEventListener('click', () => {
      Shortcut.resumeAll();
      mzk.view.removeOverlay();
    });

    create.addEventListener('click', () => {
      options.callback({
          name: libraryName.value,
          path: libraryPath.value
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./static/js/utils/Notification.js":
/*!*****************************************!*\
  !*** ./static/js/utils/Notification.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Notification {
  /**
   * @summary Create an instance of a notification handler
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Notification Class to automatically handle one or several notification of different types at the same time.
   * @param {object} [options] - The notification handler global options
   * @param {string} [options.position=top-right] - <i>top-left; top-right; bottom-left; bottom-right;</i>
   * @param {string} [options.thickBorder=top] - <i>top; bottom; left; right; none;</i>
   * @param {number} [options.duration=3000] - Notification life cycle duration (in ms) in range N*
   * @param {number} [options.transition=100] - Notification fade animation transition timing (in ms) in range N*
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N*
   **/
  constructor(options) {
    this._dismissAllLock = false; // Dismiss all operation in progress flag
    this._dom = {}; // Notification handler container
    this._active = {}; // Active notifications object : retrieve a notification using its ID (this._active[ID])
    this._queue = {}; // Queue notifications when max active has been reached
    this._history = []; // Notification history
    this._default = {}; // Will contain all default value for Notification

    this._position = '';
    this._thickBorder = '';
    this._duration = 0;
    this._transition = 0;
    this._maxActive = 0;

    this._init(options);
    this._attach();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
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
   * @param {number} [options.maxActive=5] - Maximum of simultaneously opened notification in range N*
   **/
  _init(options) {
    this._dom = document.createElement('DIV'); // Notification handler DOM container
    this._dom.classList.add('notification-container'); // Set proper CSS class

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
        callback: null
      },
      color: {
        success: 'rgb(76, 175, 80)',
        info: 'rgb(3, 169, 244)',
        warning: 'rgb(255, 152, 0)',
        error: 'rgb(244, 67, 54)'
      }
    };

    this._position = options === undefined ? this._default.handler.position : options.position === undefined ? this._default.handler.position : options.position;
    this._thickBorder = options === undefined ? this._default.handler.thickBorder : options.thickBorder === undefined ? this._default.handler.thickBorder : options.thickBorder;
    this._duration = options === undefined ? this._default.handler.duration : options.duration === undefined ? this._default.handler.duration : options.duration;
    this._transition = options === undefined ? this._default.handler.transition : options.transition === undefined ? this._default.handler.transition : options.transition;
    this._maxActive = options === undefined ? this._default.handler.maxActive : options.maxActive === undefined ? this._default.handler.maxActive : options.maxActive;

    if (this._position !== 'top-left' && this._position !== 'top-right' && this._position !== 'bottom-left' && this._position !== 'bottom-right') { // Illegal value for position
      this._position = this._default.handler.position; // Default value
    }

    if (this._thickBorder !== 'top' && this._thickBorder !== 'bottom' && this._thickBorder !== 'left' && this._thickBorder !== 'right' && this._thickBorder !== 'none') { // Illegal value for thick border
      this._thickBorder = this._default.handler.thickBorder; // Default value
    }

    if (typeof this._duration !== 'number' || this._duration <= 0) { // Illegal value for duration
      this._duration = this._default.handler.duration; // Default value
    }

    if (this._duration < (this._transition * 2)) { // Transition over (duration / 2)
      this._transition = this._default.handler.transition; // Default value for _maxActive
    }

    if (typeof this._maxActive !== 'number' || this._maxActive <= 0) { // Illegal value for maxActive
      this._maxActive = this._default.handler.maxActive; // Default value for _maxActive
    }

    this._dom.classList.add(this._position); // Add position CSS class only after this._position is sure to be a valid value
  }

  /**
   * @method
   * @name _attach
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Attach the notification handler to the dom using a fragment
   **/
  _attach() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    document.body.appendChild(fragment);
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Handle mouse events for the given notification
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.closable - Make notification closable flag
   **/
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

  /**
   * @method
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
   * @returns {object} Enhanced and ready notification object
   **/
  _buildUI(notification) {
    notification.requestCount = 1;
    notification.totalRequestCount = 1;

    // Create notification DOM elements
    notification.dom = document.createElement('DIV');
    notification.dom.icon = document.createElement('IMG');
    notification.dom.text = document.createElement('DIV');
    notification.dom.close = document.createElement('DIV');
    notification.dom.maintitle = document.createElement('H6');
    notification.dom.message = document.createElement('P');

    // Class assignation
    notification.dom.classList.add('notification');
    notification.dom.icon.classList.add('icon-container');
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
    notification.dom.maintitle.innerHTML = notification.title;
    notification.dom.message.innerHTML = notification.message;
    notification.dom.close.innerHTML = '&#x2716;';

    // Type specification (title, icon, color)
    if (notification.type === 'success') {
      notification.dom.classList.add('success');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/feedback/Notification.js/success.svg';
      }
    } else if (notification.type === 'warning') {
      notification.dom.classList.add('warning');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/feedback/Notification.js/warning.svg';
      }
    } else if (notification.type === 'error') {
      notification.dom.classList.add('error');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/feedback/Notification.js/error.svg';
      }
    } else if (notification.type === 'info') {
      notification.dom.classList.add('info');
      if (!notification.iconless) {
        notification.dom.icon.src = '/static/img/feedback/Notification.js/info.svg';
      }
    }

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

  /**
   * @method
   * @name _start
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method to add the new notification to the DOM container, and launch its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   **/
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

  /**
   * @method
   * @name _open
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Open and add the notification to the container
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   **/
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

  /**
   * @method
   * @name _close
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Close and remove the notification from the container
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.isClosing - Already closing flag
   * @param {object} notification.dom - Notifiction DOM element
   * @param {object} notification.renderTo - DOM object to render the notification in
   **/
  _close(notification) {
    if (notification.isClosing) { // Avoid double close on a notification (in case dismiss/dismissAll is triggerred when notification is already closing)
      return;
    }

    notification.isClosing = true; // Lock notification to one fadeOut animation
    notification.closed = Date.now();
    notification.effectiveDuration = notification.closed - notification.opened;
    notification.dom.style.opacity = 0;
    // TODO hadle this._transition instead of hard code in css

    window.setTimeout(() => {
      this._updateHistory(notification);
      notification.renderTo.removeChild(notification.dom); // Remove this notification from the DOM tree

      if (Object.keys(this._queue).length > 0) { // Notification queue is not empty
        this._start(this._queue[Object.keys(this._queue)[0]]); // Start first queued notification
        delete this._queue[Object.keys(this._queue)[0]]; // Shift queue object
      } else if (Object.keys(this._active).length === 0) { // Check this._active emptyness
        this._dismissAllLock = false; // Unlock dismissAllLock
      }
    }, 1000); // Transition value set in _notification.scss TODO same as few lines up
  }

  /**
   * @method
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
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
  _incrementRequestCounter(notification) {
    ++notification.requestCount; // Increment notification.requestCount

    if (notification.totalRequestCount < notification.requestCount) {
      notification.totalRequestCount = notification.requestCount;
    }

    // Update counter DOM element
    if (notification.requestCount > 1) {
      // Update existing counter
      if (notification.dom.counter) {
        notification.dom.counter.innerHTML = notification.requestCount;
      }

      // Create counter DOm element
      else {
        notification.dom.counter = document.createElement('DIV');
        notification.dom.counter.classList.add('counter');
        notification.dom.counter.innerHTML = notification.requestCount;
        notification.dom.appendChild(notification.dom.counter);
      }
    }

    // Undim notification if it is a sticky/dimmed one
    if (notification.sticky && notification.isDimmed) {
      this._unDim(notification);
    }
  }

  /**
   * @method
   * @name _decrementRequestCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method is called each notification cycle end to update its inner counter
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notification DOM element
   * @param {boolean} force - To force the notification.requestCount decrementation
   **/
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
      notification.dom.counter.innerHTML = notification.requestCount;
    }

    // Remove counter element from the DOM tree
    else {
      notification.dom.removeChild(notification.dom.counter);
      delete notification.dom.counter;
    }
  }

  /**
   * @method
   * @name _checkCounter
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description This method will reset the fadeout/dim timeout or close/dim the notification depending on its requestCount
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.requestCount - Notification inner call counter
   * @param {object} notification.dom - Notifiction DOM element
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   * @param {boolean} notification.sticky - Notification sticky behvaior
   **/
  _checkCounter(notification) {
    // This notification as still more than one cycle to live
    if (notification.requestCount > 1) {
      this._decrementRequestCounter(notification);
    }

    // This notification reached the end of its life cycle
    else {
      if (notification.renderTo.contains(notification.dom)) {
        window.clearTimeout(notification.timeoutID);
        notification.sticky ? this._dim(notification) : this._close(notification); // FadeOut/Dim depending on sticky behavior
      }
    }
  }

  /**
   * @method
   * @name _clearRequestCount
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Method that clear every pending request
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   **/
  _clearRequestCount(notification) {
    notification.requestCount = 1;
    notification.dom.removeChild(notification.dom.counter);
    delete notification.dom.counter;
  }

  /**
   * @method
   * @name _resetTimeout
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Use this to reset a notification life cycle, and delay its close event
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {number} notification.timeoutID - Notification own setTimeout ID
   **/
  _resetTimeout(notification) {
    window.clearTimeout(notification.timeoutID); // Clear previpous life cycle

    notification.timeoutID = window.setTimeout(() => {
      this._checkCounter(notification); // Check notification request count to act accordingly
    }, notification.duration); // Use Notification master duration
  }

  /**
   * @method
   * @name _updateHistory
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Add a notification to the history. Might be executed when a notification is being closed
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   **/
  _updateHistory(notification) {
    // Remove this notification from the active object
    delete this._active[notification.id];

    // Work notification copy
    const cleanEntry = JSON.parse(JSON.stringify(notification));

    // Clear notification object from working attributes
    delete cleanEntry.isClosing;
    delete cleanEntry.isDimmed;
    delete cleanEntry.requestCount;
    delete cleanEntry.timeoutID;
    delete cleanEntry.renderTo;
    delete cleanEntry.dom;

    // Save notification to the history
    this._history.push(cleanEntry);
  }

  /**
   * @method
   * @name _dim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Only useful for sticky notification that dim instead of close at the end of its life cycle
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.sticky - Notification sticky behvaior
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
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

  /**
   * @method
   * @name _unDim
   * @private
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Call this method when a notification is not inactive anymore
   * @param {object} notification - The notification object
   * @param {number} notification.id - Notification personnal ID
   * @param {object} notification.dom - Notifiction DOM element
   * @param {boolean} notification.isDimmed - Notification dimmed status (only useful if notification.sticky is true)
   **/
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

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
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
   * @returns {number} The newly created notification ID
   **/
  new(options) {
    // Check for mandatory arguments existence
    if (options === undefined || options.type === undefined || (options.message === undefined || options.message === '')) {
      return -1;
    }

    // Check for unclosable at all notification
    if (options.sticky && options.closable === false && options.callback === undefined) {
      return -1;
    }

    // Test Notification inner variables validity
    if (options.type !== 'info' && options.type !== 'success' && options.type !== 'warning' && options.type !== 'error') {
      options.type = this._default.notification.type;
    }

    if (this._dismissAllLock) {
      this._dismissAllLock = false; // Unlock dismissAllLock
    }

    // Build notification DOM element according to the given options
    let notification = this._buildUI({
      id: Utils.idGenerator(options.type + '' + options.message, 5), // Generating an ID of 5 characters long from notification mandatory fields
      type: options.type,
      message: options.message,
      title: options.title === undefined ? this._default.notification.title : options.title,
      duration: options.duration === undefined ? this._duration : options.duration,
      iconless: options.iconless === undefined ? this._default.notification.iconless : options.iconless,
      thickBorder: options.thickBorder === undefined ? this._thickBorder : options.thickBorder,
      closable: options.closable === undefined ? this._default.notification.closable : options.closable,
      sticky: options.sticky === undefined ? this._default.notification.sticky : options.sticky,
      renderTo: options.renderTo === undefined ? this._default.notification.renderTo : options.renderTo,
      CBtitle: options.CBtitle === undefined ? this._default.notification.CBtitle : options.CBtitle,
      callback: options.callback === undefined ? this._default.notification.callback : options.callback,
      isDimmed: false // Only usefull if sticky is set to true
    });

    // Create a new notification in the container: No notification with the same ID is already open
    if (!this._active[notification.id]) {
      this._start(notification);
    }

    // Use existing notification: increment request count and reset timeout
    else {
      this._resetTimeout(this._active[notification.id]);
      this._incrementRequestCounter(this._active[notification.id]);
      notification = {}; // Clear local new notification since it already exists in this._active
    }

    return notification.id;
  }

  /**
   * @method
   * @name info
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an info notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  info(options) {
    options.type = 'info';
    return this.new(options);
  }

  /**
   * @method
   * @name success
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a success notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  success(options) {
    options.type = 'success';
    return this.new(options);
  }

  /**
   * @method
   * @name warning
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build a warning notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  warning(options) {
    options.type = 'warning';
    return this.new(options);
  }

  /**
   * @method
   * @name error
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Build an error notification
   * @param {object} options - The notification options object (see new() arguments since this is an abstraction of new())
   * @returns {number} The newly created notification ID
   **/
  error(options) {
    options.type = 'error';
    return this.new(options);
  }

  /**
   * @method
   * @name dismiss
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss a specific notification via its ID
   * @param {number} id - The notification ID to dismiss
   **/
  dismiss(id) {
    window.clearTimeout(this._active[id].timeoutID); // Clear notification timeout

    if (this._active[id].requestCount > 1) { // Several request are pending
      this._clearRequestCount(this._active[id]); // Clear all pending request
    }

    this._close(this._active[id]); // Close notification
  }

  /**
   * @method
   * @name dismissAll
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Clear the notification handler from all its active notifications
   **/
  dismissAll() {
    if (!this._dismissAllLock && Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      this._dismissAllLock = true; // dismissAllLock will be unlocked at the last _close() method call
      this._queue = {}; // Clear queue object

      for (const id in this._active) { // Iterate over notifications
        this.dismiss(id);
      }
    }
  }

  /**
   * @method
   * @name dismissType
   * @public
   * @memberof Notification
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Dismiss all notifications from a given type
   * @param {string} type - <i>succes; info; warning; error;</i>
   **/
  dismissType(type) {
    if (Object.keys(this._active).length !== 0) { // Check that _dimissAllLock is disable and that there is still notification displayed
      for (const id in this._active) { // Iterate over notifications
        if (this._active[id].type === type) {
          this.dismiss(id);
        }
      }
    }
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getHistoryLength() {
    return this._history.length;
  }
  getHistory() {
    return this._history;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Notification);


/***/ }),

/***/ "./static/js/utils/ScrollBar.js":
/*!**************************************!*\
  !*** ./static/js/utils/ScrollBar.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class ScrollBar {
  /**
   * @summary Custom JavaScript ScrollBar for any conatiner
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Build a custom ScrollBar according to the given DOM target, inspired from https://github.com/buzinas/simple-scrollbar <3
   * @param {object} options - The ScrollBar options
   * @param {object} options.target - The DOM node to add a ScrollBar to
   **/
  constructor(options) {
    this._target = options.target; // Parent div to put the ScrollBar in
    this._wrapper = {}; // Wrap both container and ScrollBar
    this._container = {}; // Content to scroll + browser ScrollBar (18px offset)
    this._bar = {}; // ScrollBar itself
    this._scrollRatio = 0;
    this._lastPageY = 0;

    this._init();
    this._events();
    this._updateScrollBar();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Build DOM hierrarchy, ScrollBar double wraps the content to append its custom bar
   **/
  _init() {
    const fragment = document.createDocumentFragment();
    // Creating associated elements (wrapper, container, bar)
    this._target.classList.add('scrollbar-container');
    this._wrapper = document.createElement('DIV');
    this._wrapper.setAttribute('class', 'scrollbar-wrapper');
    this._container = document.createElement('DIV');
    this._container.setAttribute('class', 'scrollbar-content');
    // Move target children into this container
    while (this._target.firstChild) {
      this._container.appendChild(this._target.firstChild);
    }
    // Link DOM elements
    this._wrapper.appendChild(this._container);
    fragment.appendChild(this._wrapper);
    // Append fragment to DOM target
    this._target.appendChild(fragment);
    this._target.insertAdjacentHTML('beforeend', '<div class="scroll"></div>'); // Append scroll as last child
    this._bar = this._target.lastChild; // Get content from line just over this!
    // Methods auto binding with this to be able to add/remove listeners easily
    this._drag = this._drag.bind(this);
    this._stopDrag = this._stopDrag.bind(this);
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle ScrollBar mouse events
   **/
  _events() {
    window.addEventListener('resize', this._updateScrollBar.bind(this));
    this._container.addEventListener('scroll', this._updateScrollBar.bind(this));
    this._container.addEventListener('mouseenter', this._updateScrollBar.bind(this));
    this._bar.addEventListener('mousedown', this._barClicked.bind(this));
  }

  /**
   * @method
   * @name _drag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the drag animation of the bar
   * @param {object} event - The Mouse event from this._events()
   **/
  _drag(event) {
    const delta = event.pageY - this._lastPageY;
    this._lastPageY = event.pageY;
    requestAnimationFrame(() => {
      this._container.scrollTop += (delta / this._scrollRatio);
    });
  }

  /**
   * @method
   * @name _barClicked
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add document events when bar is clicked to track the mouse movement in parent
   * @param {object} event - The Mouse event from this._events()
   **/
  _barClicked(event) {
    this._lastPageY = event.pageY;
    this._bar.classList.add('scrollbar-grabbed');
    document.body.classList.add('scrollbar-grabbed');
    document.addEventListener('mousemove', this._drag);
    document.addEventListener('mouseup', this._stopDrag);
  }

  /**
   * @method
   * @name _stopDrag
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Remove document events when bar is released
   **/
  _stopDrag() {
    this._bar.classList.remove('scrollbar-grabbed');
    document.body.classList.remove('scrollbar-grabbed');
    document.removeEventListener('mousemove', this._drag);
    document.removeEventListener('mouseup', this._stopDrag);
  }

  /**
   * @method
   * @name _updateScrollBar
   * @private
   * @memberof ScrollBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Compute bar position according to DOM measurements
   **/
  _updateScrollBar() {
    const totalHeight = this._container.scrollHeight;
    const ownHeight = this._container.clientHeight;
    const right = (this._target.clientWidth - this._bar.clientWidth) * -1;

    this._scrollRatio = ownHeight / totalHeight;
    requestAnimationFrame(() => {
      if (this._scrollRatio >= 1) { // Hide scrollbar if no scrolling is possible
        this._bar.classList.add('hidden');
      } else {
        const height = (Math.max(this._scrollRatio * 100, 5) * ownHeight) / 100;
        let top = ((this._container.scrollTop / totalHeight) * 100) * ownHeight / 100;

        if (Math.max(this._scrollRatio * 100, 5) === 5) { // ScrollBar has reached its minimum size
          /* Here is a complex thing : scroll total height != DOM node total height. We must substract
          a growing percentage (as user goes down) that is scaled after total scroll progress in %. */
          const scrollProgressPercentage = (this._container.scrollTop * 100) / (totalHeight - ownHeight);
          top = ((ownHeight - height) * (((this._container.scrollTop + (scrollProgressPercentage * ownHeight) / 100) / totalHeight) * 100)) / 100;
        }

        this._bar.classList.remove('hidden');
        this._bar.style.cssText = `height: ${height}px; top: ${top}px; right: ${right}px;`;
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ScrollBar);


/***/ }),

/***/ "./static/js/utils/Shortcut.js":
/*!*************************************!*\
  !*** ./static/js/utils/Shortcut.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Shortcut {
  /**
   * @summary Basic keyboard Shortcut handler
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handler callbacks set on keyboard bindings
   **/
  constructor() {
    this._singleKey = [];
    this._multiKey = [];

    this._testShortcuts = this._testShortcuts.bind(this);
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _addEvents
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add key down and key press events to the DOM
   **/
  _addEvents() {
    document.addEventListener('keydown', this._testShortcuts);
    document.addEventListener('keypress', this._testShortcuts);
  }

  /**
   * @method
   * @name _removeEvents
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Remove key down and key press events to the DOM
   **/
  _removeEvents() {
    document.removeEventListener('keydown', this._testShortcuts);
    document.removeEventListener('keypress', this._testShortcuts);
  }

  /**
   * @method
   * @name _testShortcuts
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Test keyboard event to fire stored shortcut accordingly
   * @param {object} event - The Keyboard event from this._addEvents()
   **/
  _testShortcuts(event) {
    if (!(event.ctrlKey && event.shiftKey && event.key === 'R')) { // DEVELOPEMENT test to keep hard refresh available
      event.preventDefault(); // This is for PRODUCTION only, to prevent that browser shortcuts collide with user one
    }

    if (event.ctrlKey || event.altKey || event.shiftKey) { // Multi key shortcut
      for (let i = 0; i < this._multiKey.length; ++i) {
        const shortcut = this._multiKey[i];

        if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
          switch (shortcut.modifierCount) {
            case 1:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey) ||
                (shortcut.modifiers.altKey && event.altKey) ||
                (shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
            case 2:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.altKey && event.altKey) ||
                (shortcut.modifiers.ctrlKey && event.ctrlKey && shortcut.modifiers.shiftKey && event.shiftKey) ||
                (shortcut.modifiers.altKey && event.altKey && shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
            case 3:
              if ((shortcut.modifiers.ctrlKey && event.ctrlKey &&
                  shortcut.modifiers.altKey && event.altKey &&
                  shortcut.modifiers.shiftKey && event.shiftKey)) {
                shortcut.fire();
                return;
              }
              break;
          }
        }
      }
    } else { // Single key shortcut
      for (let i = 0; i < this._singleKey.length; ++i) {
        const shortcut = this._singleKey[i];

        if (!shortcut.pause && shortcut.key === event.key.toLowerCase()) {
          shortcut.fire(this);
          return;
        }
      }
    }
  }

  /**
   * @method
   * @name _getModifiersCount
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Count the amount of modifiers in given shortcut binding
   * @param {string} keyString - The keys string
   * @return {number} - The number of modifiers in the keys string
   **/
  _getModifiersCount(keyString) {
    let count = 0;
    const modifiers = {
      ctrlKey: /ctrl/i.test(keyString),
      altKey: /alt/i.test(keyString),
      shiftKey: /shift/i.test(keyString)
    };

    if (modifiers.ctrlKey) ++count;
    if (modifiers.altKey) ++count;
    if (modifiers.shiftKey) ++count;

    return count;
  }

  /**
   * @method
   * @name _setAllPauseFlag
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause/Resume all shortcuts currently registered
   * @param {boolean} value - The pause value to set
   **/
  _setAllPauseFlag(value) {
    for (let i = 0; i < this._singleKey.length; ++i) {
      this._setOnePauseFlag(this._singleKey[i].keyString, value);
    }

    for (let i = 0; i < this._multiKey.length; ++i) {
      this._setOnePauseFlag(this._multiKey[i].keyString, value);
    }
  }

  /**
   * @method
   * @name _setOnePauseFlag
   * @private
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause/Resume given shortcuts currently registered
   * @param {string} keyString - The keys string
   * @param {boolean} value - The pause value to set
   **/
  _setOnePauseFlag(keyString, value) {
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = 0; i < this._singleKey.length; ++i) {
        if (this._singleKey[i].keyString === keyString) {
          this._singleKey[i].pause = value;
        }
      }
    } else {
      for (let i = 0; i < this._multiKey.length; ++i) {
        if (this._multiKey[i].keyString === keyString) {
          this._multiKey[i].pause = value;
        }
      }
    }
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name register
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Register a new shortcut and bind it to a callback
   * @param {string} keyString - The keys string
   * @param {function} fire - The shortcut callback to trigger
   **/
  register(keyString, fire) {
    const shortcut = {
      keyString: keyString,
      modifiers: {
        ctrlKey: /ctrl/i.test(keyString),
        altKey: /alt/i.test(keyString),
        shiftKey: /shift/i.test(keyString)
      },
      modifierCount: this._getModifiersCount(keyString),
      key: keyString.substr(keyString.lastIndexOf('+') + 1).toLowerCase(),
      paused: false,
      fire: fire
    };

    if (this._singleKey.length === 0 || this._multiKey.length === 0) {
      this._addEvents();
    }

    (!shortcut.modifiers.ctrlKey && !shortcut.modifiers.shiftKey && !shortcut.modifiers.altKey && !shortcut.modifiers.metaKey) ?
    this._singleKey.push(shortcut):
      this._multiKey.push(shortcut);
  }

  /**
   * @method
   * @name unregister
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description UnRegister a shortcut via its keys string
   * @param {string} keyString - The keys string
   **/
  unregister(keyString) {
    if (this._getModifiersCount(keyString) === 0) {
      for (let i = this._singleKey.length - 1; i >= 0; i--) {
        if (this._singleKey[i].key === keyString.toLowerCase()) {
          this._singleKey.splice(i, 1);
        }
      }
    } else {
      for (let i = this._multiKey.length - 1; i >= 0; i--) {
        if (this._multiKey[i].key === keyString.toLowerCase()) {
          this._multiKey.splice(i, 1);
        }
      }
    }

    if (this._singleKey.length === 0 && this._multiKey.length === 0) {
      this._removeEvents();
    }
  }

  /**
   * @method
   * @name unregisterAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Unregister every active shortcut
   **/
  unregisterAll() {
    this._singleKey = [];
    this._multiKey = [];
    this._removeEvents();
  }

  /**
   * @method
   * @name resume
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Resume the given shortcut callback
   * @param {string} keyString - The keys string
   **/
  resume(keyString) {
    this._setOnePauseFlag(keyString, false);
  }

  /**
   * @method
   * @name pause
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause the given shortcut callback
   * @param {string} keyString - The keys string
   **/
  pause(keyString) {
    this._setOnePauseFlag(keyString, true);
  }

  /**
   * @method
   * @name resumeAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Resume all shortcuts callback
   **/
  resumeAll() {
    this._addEvents();
    this._setAllPauseFlag(false);
  }


  /**
   * @method
   * @name pauseAll
   * @public
   * @memberof Shortcut
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Pause all shortcuts callback
   **/
  pauseAll() {
    this._removeEvents();
    this._setAllPauseFlag(true);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Shortcut);


/***/ }),

/***/ "./static/js/utils/Utils.js":
/*!**********************************!*\
  !*** ./static/js/utils/Utils.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class Utils {
  /**
   * @summary Miscelaneous utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Miscelaneous utils function and prototypes for mzk
   **/
  constructor() {
    this._prototypes();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _prototypes
   * @private
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Overrides some useful type prototypes
   **/
  _prototypes() {
    // https://www.redips.net/javascript/array-move/ <- Da real MVP
    Array.prototype.move = function(pos1, pos2) {
      // local variables
      let i, tmp;
      // cast input parameters to integers
      pos1 = parseInt(pos1, 10);
      pos2 = parseInt(pos2, 10);
      // if positions are different and inside array
      if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
          for (i = pos1; i < pos2; i++) {
            this[i] = this[i + 1];
          }
        }
        // move element up and shift other elements down
        else {
          for (i = pos1; i > pos2; i--) {
            this[i] = this[i - 1];
          }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
      }
    };
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name precisionRound
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Do a Math.round with a given precision (ie amount of integers after the coma)
   * @param {nunmber} value - The value to precisely round
   * @param {number} precision - The number of integers after the coma
   * @return {number} - The rounded value
   **/
  precisionRound(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * @method
   * @name secondsToTimecode
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Convert a time in seconds into a time DD HH MM SS
   * @param {nunmber} time - The time in seconds to convert
   * @return {string} - The output string according to time duration
   **/
  secondsToTimecode(time) {
    const transformedTime = {
      d: 0,
      h: 0,
      m: 0,
      s: 0
    };

    // Cutting total seconds
    transformedTime.d = Math.floor(time / 86400);
    transformedTime.h = Math.floor((time - (transformedTime.d * 86400)) / 3600);
    transformedTime.m = Math.floor((time - (transformedTime.d * 86400) - (transformedTime.h * 3600)) / 60);
    transformedTime.s = Math.floor(time - (transformedTime.d * 86400) - (transformedTime.h * 3600) - (transformedTime.m * 60));

    // Adding an extra 0 for values inferior to 10
    if (transformedTime.d < 10) {
      transformedTime.d = `0${transformedTime.d}`;
    }

    if (transformedTime.h < 10) {
      transformedTime.h = `0${transformedTime.h}`;
    }

    if (transformedTime.m < 10) {
      transformedTime.m = `0${transformedTime.m}`;
    }

    if (transformedTime.s < 10) {
      transformedTime.s = `0${transformedTime.s}`;
    }

    // Formatting output
    if (transformedTime.d > 0) {
      return `${transformedTime.d}d ${transformedTime.h}h ${transformedTime.m}m ${transformedTime.s}s`;
    } else if (transformedTime.h > 0) {
      return `${transformedTime.h}:${transformedTime.m}:${transformedTime.s}`;
    } else {
      return `${transformedTime.m}:${transformedTime.s}`;
    }
  }

  /**
   * @method
   * @name idGenerator
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since June 2018
   * @description Hash the seed to generate an ID, inspired from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   * @param {string} seed   - The seed string to hash
   * @param {number} length - The length of the returned ID
   **/
  idGenerator(seed, length) {
    let hash = 0,
      character = '';

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

  /**
   * @method
   * @name getCookies
   * @public
   * @memberof Utils
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Get all session cookies
   * @return {object} - The cookies object
   **/
  getCookies() {
    const cookies = {};
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function(cookie) {
        const m = cookie.trim().match(/(\w+)=(.*)/);
        if (m !== undefined) {
          cookies[m[1]] = decodeURIComponent(m[2]);
        }
      });
    }
    return cookies;
  }


  addStyleSheet(filename) {
    var head = document.head;
    var link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filename;

    head.appendChild(link);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Utils);


/***/ }),

/***/ "./static/js/view/View.js":
/*!********************************!*\
  !*** ./static/js/view/View.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _topbar_TopBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./topbar/TopBar.js */ "./static/js/view/topbar/TopBar.js");
/* harmony import */ var _maincontainer_Aside_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maincontainer/Aside.js */ "./static/js/view/maincontainer/Aside.js");
/* harmony import */ var _maincontainer_Scene_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maincontainer/Scene.js */ "./static/js/view/maincontainer/Scene.js");
/* harmony import */ var _footbar_FootBar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footbar/FootBar.js */ "./static/js/view/footbar/FootBar.js");
/* harmony import */ var _utils_Modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Modal.js */ "./static/js/utils/Modal.js");





'use_strict';


class View {
  /**
   * @summary Fronted View class
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle everything that is UI. Not meant AT ALL to handle data modelisation, use <code>Model.js</code>. This class is meant to be accessed from anywhere in the app, since it is attached to the Mzk object.
   **/
  constructor() {
    this._mainContainer = {};
    this._topBar = {};
    this._aside = {};
    this._scene = {};
    this._footBar = {};

    this.modal = new _utils_Modal_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the View object width TopBar, FootBar, Asides and Scene
   **/
  _init() {
    this._mainContainer = document.getElementById('mainContainer'); // Used when switching Discover (anciennement modes (partyview, managotit etc))

    this._topBar = new _topbar_TopBar_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._aside = new _maincontainer_Aside_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      side: 'left'
    });
    this._scene = new _maincontainer_Scene_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._footBar = new _footbar_FootBar_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

    this._footBar.getVolumeBar().updateVolume(mzk.getIsMuted(), mzk.getVolume()); // TODO : replace with mzk.getUserVolume() or from localStorage or from opts (serv)
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name changeTrack
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing track informations
   **/
  changeTrack(track) {
    d3.selectAll('.moodbar svg g').remove(); // Clear current moodbar
    this.togglePlay();
    this._scene.changeTrack(track.id);

    const player = mzk.model.getPlayer();
    this._footBar.renderMoodFile(track.moodbar);
    this._footBar.getProgressBar().updateDuration(player.getDuration());
  }

  /**
   * @method
   * @name togglePlay
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Change UI elements according to the new playing state
   **/
  togglePlay() {
    const isPlaying = mzk.model.getPlayer().getIsPlaying();
    this._footBar.updatePlayButton(isPlaying);

    if (isPlaying) { // Don't handle !playing (desactivate) bc pause != stop
      this._footBar.getProgressBar().activate(); // Activate make the progress bar appear w/ animation
    }
  }

  /**
   * @method
   * @name stopPlayback
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates UI element to match the player stand by state
   **/
  stopPlayback() {
    d3.selectAll('.moodbar svg g').remove(); // Clear current moodbar
    this._footBar.updatePlayButton(false); // Send !isPlaying to restore play icon
    this._footBar.getProgressBar().resetProgressBar();
    this._scene.stopPlayback();
  }

  /**
   * @method
   * @name initPlaylist
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the given playlist into the scene/view
   * @param {object} playlist - The playlist to init the view with
   **/
  initPlaylist(playlist) {
    this._scene.updateView(playlist);
  }

  /**
   * @method
   * @name updateVolume
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the volume values in the UI according to the player's value
   **/
  updateVolume() {
    const player = mzk.model.getPlayer();
    this._footBar.getVolumeBar().updateVolume(player.getIsMuted(), player.getVolume());
  }

  /**
   * @method
   * @name updateProgress
   * @public
   * @memberof View
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Updates the progress bar according to the player progress' value
   **/
  updateProgress() { // Called onClick
    const progress = mzk.model.getPlayer().getProgress();
    this._footBar.getProgressBar().desactivateTransitions(); // Must disable transition when called
    this._footBar.getProgressBar().setProgress(progress);

    setTimeout(function() { // Restore transitions
      this._footBar.getProgressBar().activateTransitions();
    }.bind(this), 50); // 5 is fine, but 50 is more 'lag friendly'
  }


  extendMainContainer() {
    this._mainContainer.classList.add('extended');
    setTimeout(() => {
      this._scene.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  retractMainContainer() {
    this._mainContainer.classList.remove('extended');
    setTimeout(() => {
        this._scene.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  /** @method
   * @name addOverlay
   * @public
   * @memberof View
   * @description Add an overlay div (modal style) over the scene
   * @param {object} node - The DOM node to append to the scene as an overlay
   **/
  addOverlay(node) {
    const overlay = document.createElement('DIV');
    const fragment = document.createDocumentFragment();

    overlay.id = 'overlay';
    overlay.appendChild(node);
    fragment.appendChild(overlay);

    this._mainContainer.appendChild(fragment);
  }

  removeOverlay() {
    this._mainContainer.removeChild(document.getElementById('overlay'));
  }

  displayModal(options) {
    if (options.name === 'newlibrary') {
      mzk.komunikator.getTemplate('modals/newlibrary/')
        .then((response) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response, "text/html");
          const modal = doc.getElementsByClassName('modal')[0];
          this.addOverlay(modal);

          this.modal.newLibrary({
            callback: options.callback
          });
        });
    }
  }

  getNextTrackId() {
    return this._scene.getNextTrackId();
  }

  getPreviousTrackId() {
    return this._scene.getPreviousTrackId();
  }

  startLoading() {
    return new Promise(resolve => {
      this._scene.startLoading()
        .then(resolve);
    });
  }

  stopLoading() {
    return new Promise(resolve => {
      this._scene.stopLoading()
        .then(resolve);
    });
  }

  setRepeatMode(value) {
    this._footBar.setRepeatMode(value);
  }

  isLastTrack() {
    return this._scene.isLastTrack();
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getFootBar() {
    return this._footBar;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (View);


/***/ }),

/***/ "./static/js/view/footbar/FootBar.js":
/*!*******************************************!*\
  !*** ./static/js/view/footbar/FootBar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VolumeBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/VolumeBar.js */ "./static/js/view/footbar/components/VolumeBar.js");
/* harmony import */ var _components_ProgressBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ProgressBar.js */ "./static/js/view/footbar/components/ProgressBar.js");


'use_strict';

class FootBar {
  /**
   * @summary ManaZeak FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Handle all components in the FootBar and all related events
   **/
  constructor() {
    this._controls = {
      play: {},
      stop: {},
      volume: {},
      previous: {},
      next: {},
      repeat: {}
    };
    this._volumeBar = {};
    this._progressBar = {};

    this._init();
    this._events();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Init the FootBar with controls, a volume bar and a progress bar
   **/
  _init() {
    this._controls.play = document.getElementById('play');
    this._controls.stop = document.getElementById('stop');
    this._controls.previous = document.getElementById('previous');
    this._controls.next = document.getElementById('next');
    this._controls.repeat = document.getElementById('repeat');

    this._volumeBar = new _components_VolumeBar_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._progressBar = new _components_ProgressBar_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Handle al controls click events
   **/
  _events() {
    this._controls.play.addEventListener('click', () => {
      mzk.togglePlay();
    });

    this._controls.stop.addEventListener('click', () => {
      mzk.stopPlayback();
    });

    this._controls.previous.addEventListener('click', () => {
      mzk.previousTrackInView();
    });

    this._controls.next.addEventListener('click', () => {
      mzk.nextTrackInView();
    });

    this._controls.repeat.addEventListener('click', () => {
      mzk.toggleRepeatMode();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name updatePlayButton
   * @public
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Updates the play icon according to a given state
   * @param {boolean} isPlaying - The player playback state
   **/
  updatePlayButton(isPlaying) {
    if (isPlaying) {
      this._controls.play.src = '../../static/img/player/pause.svg';
    } else {
      this._controls.play.src = '../../static/img/player/play.svg';
    }
  }

  /**
   * @method
   * @name renderMoodFile
   * @public
   * @memberof FootBar
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Render a mood file into the progress-moodbar container
   * @param {string} url - The url to fetch the modd file
   **/
  renderMoodFile(url) {
    mzk.komunikator.getBinaryResponse(url)
      .then((responseText) => {
        // Original code from : https://gist.github.com/Valodim/5225460
        const rgb = [...Array((responseText.length / 3))];

        for (let i = 0; i < rgb.length; ++i) {
          // `& 0xff` Force 8bit long integer (to fit rgb range of values)
          const r = responseText.charCodeAt(i * 3) & 0xff;
          const g = responseText.charCodeAt((i * 3) + 1) & 0xff;
          const b = responseText.charCodeAt((i * 3) + 2) & 0xff;

          rgb[i] = { // Enhancement : Have fun here w/ colors and pref
            offset: `${(i / rgb.length * 100)}%`,
            color: `rgba(${r}, ${g}, ${b}, 1)`
          };
        }

        const svg = d3.select(this._progressBar.getMoodbarContainer().childNodes[1]).append('g'); // TODO : childNodes0 , remove text bs

        svg.append('linearGradient')
          .attr('id', `moodbar-gradient-${url[0] + url[1]}`)
          .attr('gradientUnits', 'userSpaceOnUse')
          .selectAll('stop')
          .data(rgb)
          .enter()
          .append('stop')
          .attr('offset', d => {
            return d.offset;
          })
          .attr('stop-color', d => {
            return d.color;
          });

        svg.append('rect')
          .attr('fill', `url(#moodbar-gradient-${url[0] + url[1]})`)
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', '100%')
          .attr('width', '100%');
      });
  }

  setRepeatMode(value) {
    if (value === 0) {
      this._controls.repeat.src = '/static/img/player/repeat-off.svg';
    } else if (value === 1) {
      this._controls.repeat.src = '/static/img/player/repeat-one.svg';
    } else if (value === 2) {
      this._controls.repeat.src = '/static/img/player/repeat-all.svg';
    }
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getProgressBar() {
    return this._progressBar;
  }
  getVolumeBar() {
    return this._volumeBar;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (FootBar);


/***/ }),

/***/ "./static/js/view/footbar/components/ProgressBar.js":
/*!**********************************************************!*\
  !*** ./static/js/view/footbar/components/ProgressBar.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class ProgressBar {
  /**
   * @summary Interactive Progress Bar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the progress over a track
   **/
  constructor() {
    this._progress = {
      container: {},
      track: {},
      current: {},
      thumb: {},
      hover: {},
      moodbar: {},
      left: {},
      right: {}
    }; // DOM elements
    this._topbarLogo = {};
    this._rafId = null;
    this._duration = 0;

    this._isActive = false; // Boolean flag to make listeners available/unavailable
    this._isMouseOver = false;
    this._isDragging = false;

    this._init();
  }

  //  ----  PRIVATE METHODS  ----  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Init the progress bar dom and events
   **/
  _init() {
    this._progress.container = document.getElementById('progress-container');
    this._progress.track = document.getElementById('progress-track');
    this._progress.current = document.getElementById('progress-current');
    this._progress.thumb = document.getElementById('progress-thumb');
    this._progress.hover = document.getElementById('progress-hover');
    this._progress.moodbar = document.getElementById('progress-moodbar');
    this._progress.left = document.getElementById('footbar-left');
    this._progress.right = document.getElementById('footbar-right');
    this._topbarLogo = document.getElementById('topbar-logo');

    this._resetTimecode();

    // In order to remove event listeners in _removeEvents()
    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
    this._updateMouseOver = this._updateMouseOver.bind(this);
  }

  /**
   * @method
   * @name _addEvents
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Listen to mouse events when ProgressBar is activated
   **/
  _addEvents() {
    this._progress.container.addEventListener('mousedown', this._mouseDown);
    this._progress.container.addEventListener('mouseover', this._updateMouseOver);
    this._progress.container.addEventListener('mouseleave', this._updateMouseOver);
    window.addEventListener('mousemove', this._mouseMove);
    window.addEventListener('mouseup', this._mouseUp);
  }

  /**
   * @method
   * @name _removeEvents
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Remove mouse events when ProgressBar is desactivated
   **/
  _removeEvents() {
    this._progress.container.removeEventListener('mousedown', this._mouseDown);
    this._progress.container.removeEventListener('mouseover', this._updateMouseOver);
    this._progress.container.removeEventListener('mouseleave', this._updateMouseOver);
    window.removeEventListener('mousemove', this._mouseMove);
    window.removeEventListener('mouseup', this._mouseUp);
  }

  /**
   * @method
   * @name _updateMouseOver
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle mouse hover on progress bar
   * @param {object} event - The mouse event object
   **/
  _updateMouseOver(event) {
    if (event.type === 'mouseover') {
      this._progress.hover.style.opacity = '1'; // Automatic CSS transition
      this._isMouseOver = true;
    } else if (event.type === 'mouseleave') {
      this._progress.hover.style.opacity = '0'; // Automatic CSS transition
      this._isMouseOver = false;
    }
  }

  /**
   * @method
   * @name _updateHoverTimecode
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Update the hover timecode value
   * @param {number} xPos - The mouse X position on screen
   **/
  _updateHoverTimecode(xPos) {
    const boundRect = this._progress.track.getBoundingClientRect();
    let percentage = ((xPos - boundRect.left) * 100) / boundRect.width;

    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }

    this._progress.hover.style.left = `${((((boundRect.width * percentage) / 100) - 30) * 100) / boundRect.width}%`;
    this._progress.hover.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
  }

  /**
   * @method
   * @name _mouseDown
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse down event
   * @param {object} event - The mouse event object
   **/
  _mouseDown(event) {
    if (!this._isDragging &&
      (event.target.id === 'progress-container' ||
        event.target.id === 'progress-track' ||
        event.target.id === 'progress-current' ||
        event.target.id === 'progress-moodbar' ||
        event.target.id === 'progress-thumb' ||
        event.target.id === 'moodbarThumb' ||
        event.target.tagName === 'rect')) {

      mzk.mute();
      this._isDragging = true;
      this._stopAnimation();
      this._moveProgress(event.clientX);
    }
  }

  /**
   * @method
   * @name _mouseUp
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse up event
   * @param {object} event - The mouse event object
   **/
  _mouseUp(event) {
    if (this._isDragging) { // User has released progress thumb
      mzk.unmute();
      this._isDragging = false;
      this._startAnimation();
      this._moveProgress(event.clientX);
    }
  }

  /**
   * @method
   * @name _mouseMove
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Handle the mouse move event
   * @param {object} event - The mouse event object
   **/
  _mouseMove(event) {
    if (this._isActive && this._isDragging) { // User is draging progress thumb
      this._moveProgress(event.clientX);
    } else if (this._isActive && this._isMouseOver) { // Hover on progress track
      this._updateHoverTimecode(event.clientX);
    }
  }

  /**
   * @method
   * @name _moveProgress
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Move the progress along its track
   * @param {number} xPos - The mouse X position on screen
   **/
  _moveProgress(xPos) {
    const boundRect = this._progress.track.getBoundingClientRect();
    let distance = ((xPos - boundRect.left) * 100) / boundRect.width;

    if (distance < 0) {
      distance = 0;
    }
    if (distance > 100) {
      distance = 100;
    }

    mzk.setProgress(Utils.precisionRound(distance, 3));
  }

  /**
   * @method
   * @name _animate
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the progress bar completion according to the Mzk player progress value
   **/
  _animate() {
    this.setProgress(mzk.getProgress());
  }

  /**
   * @method
   * @name _startAnimation
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Use RequestAnimationFrame to render and setProgress most of the frames
   **/
  _startAnimation() {
    if (this._isActive) {
      this._animate();
      this._rafId = requestAnimationFrame(this._startAnimation.bind(this));
    }
  }

  /**
   * @method
   * @name _stopAnimation
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Cancel animation frame if needed
   **/
  _stopAnimation() {
    if (!this._isActive) {
      cancelAnimationFrame(this._rafId);
    }
  }

  /**
   * @method
   * @name _resetTimecode
   * @private
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set UI values to default `--:--`
   **/
  _resetTimecode() {
    setTimeout(function() {
      this._progress.left.innerHTML = '--:--';
      this._progress.right.innerHTML = '--:--';
      this._progress.hover.innerHTML = '--:--';
    }.bind(this), 500); // Match value with the one in scss/view/components/_progresbar.scss -> $footbar-transition
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name resetProgressBar
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Reset the progress bar to its initial state and desactivate its events and transitions
   **/
  resetProgressBar() {
    this.setProgress(0);
    this.desactivate();
  }

  /**
   * @method
   * @name activateTransitions
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Enable the transition on the ProgressBar
   **/
  activateTransitions() {
    this._progress.thumb.style.transition = 'left 0.4s ease 0s, opacity 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
    this._progress.current.style.transition = 'width 0.4s ease 0s'; // Match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
  }

  /**
   * @method
   * @name desactivateTransitions
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Disable the transition on the ProgressBar
   **/
  desactivateTransitions() {
    // Here we need to set transition value to 0s to avoid lag on current and thumb when progress bar is active
    // Lag duration will be equal to the transition time otherwise
    // Reset left and width transition to default, match transition duration w/ the one in view/_footbar.scss ($footbar-transition)
    this._progress.thumb.style.transition = 'left 0s ease 0s, opacity 0.4s ease 0s';
    this._progress.current.style.transition = 'width 0s ease 0s';
  }

  /**
   * @method
   * @name toggleActive
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Toggle the ProgressBar active status
   **/
  toggleActive() {
    if (!this._isActive) {
      this.activate();
    } else {
      this.desactivate();
    }
  }

  /**
   * @method
   * @name activate
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Activate the ProgressBar, set it visible, add animations and add mouse events
   **/
  activate() {
    this._isActive = true;
    this.setVisibility(true);
    this._startAnimation();
    this.activateTransitions(); // TODO : add transition in startAnimation
    this._addEvents();
  }

  /**
   * @method
   * @name desactivate
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Desactivate the ProgressBar, set it invisible, remove animations and remove mouse events
   **/
  desactivate() {
    this._isActive = false;
    this.setVisibility(false);
    this._resetTimecode();
    this._removeEvents();
    this._stopAnimation();

    setTimeout(function() { // Delay no animation style for thumb and current (both come at 0% in 0.5s interval)
      this.desactivateTransitions();
    }.bind(this), 500); // Use same timeout value as the transition value set in resetProgressBar(), so animation can run properly
  }

  /**
   * @method
   * @name adjustProgress
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Add/Substract a completion percentage to the ProgressBar
   * @param {number} amount - The percentage amount to add/substract in range float[-100,100]
   **/
  adjustProgress(amount) {
    this.setProgress(0 + amount);
  }

  /**
   * @method
   * @name updateDuration
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Update the duration values
   * @param {number} duration - The track duration in seconds
   **/
  updateDuration(duration) {
    this._duration = duration;
    this._progress.right.innerHTML = Utils.secondsToTimecode(duration);
  }

  /**
   * @method
   * @name setProgress
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the completion percentage of the ProgressBar
   * @param {number} percentage - The progress percentage to set
   **/
  setProgress(percentage) {
    if (this._isActive) {
      this._progress.current.style.width = `${percentage}%`;
      this._progress.thumb.style.left = `${percentage}%`;
      this._progress.left.innerHTML = Utils.secondsToTimecode((percentage * this._duration) / 100);
    }
  }

  /**
   * @method
   * @name setVisibility
   * @public
   * @memberof ProgressBar
   * @author Arthur Beaulieu
   * @since August 2018
   * @description Set the visibility status of the ProgressBar
   * @param {boolean} isVisible - The visibility state
   **/
  setVisibility(isVisible) {
    if (isVisible) {
      this._progress.moodbar.style.height = '25px'; // Match value w/ the one in view/components/_progresbar.scss ($progress-moodbar-height)
      this._progress.moodbar.style.opacity = '1';
      this._progress.moodbar.style.cursor = 'pointer';
      this._progress.track.style.opacity = '1';
      this._progress.track.style.cursor = 'pointer';
      this._progress.thumb.style.opacity = '1';
      this._progress.left.style.opacity = '1';
      this._progress.right.style.opacity = '1';
      this._topbarLogo.style.opacity = '1';
    } else {
      this._progress.moodbar.style.height = '0';
      this._progress.moodbar.style.opacity = '0';
      this._progress.moodbar.style.cursor = 'default';
      this._progress.track.style.opacity = '0';
      this._progress.track.style.cursor = 'default';
      this._progress.thumb.style.opacity = '0';
      this._progress.left.style.opacity = '0';
      this._progress.right.style.opacity = '0';
      this._topbarLogo.style.opacity = '0';
    }
  }

  //  ----  GETTER METHODS   ----  //

  getMoodbarContainer() {
    return this._progress.moodbar;
  }


  //  ----  SETTER METHODS   ----  //

  setIsActive(isActive) {
    this._isActive = isActive;
  }
  setIsMouseOver(isMouseOver) {
    this._isMouseOver = isMouseOver;
  }
  setIsDragging(isDragging) {
    this._isDragging = isDragging;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);


/***/ }),

/***/ "./static/js/view/footbar/components/VolumeBar.js":
/*!********************************************************!*\
  !*** ./static/js/view/footbar/components/VolumeBar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class VolumeBar {
  /**
   * @summary UI VolumeBar
   * @author Arthur Beaulieu
   * @since July 2018
   * @description Interactive volume bar that is linked to ManaZeak logic
   **/
  constructor() {
    this._volume = {
      image: {},
      wrapper: {},
      container: {},
      current: {},
      thumb: {}
    };
    this._showHideTimeoutId = -1;
    this.isDragging = false;

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this._volume = {
      image: document.getElementById('volumebar-img'),
      wrapper: document.getElementById('volumebar-wrapper'),
      container: document.getElementById('volumebar-container'),
      current: document.getElementById('volumebar-current'),
      thumb: document.getElementById('volumebar-thumb')
    };

    this._events();
  }

  _events() {
    this._volume.image.addEventListener('click', mzk.toggleMute.bind(mzk));
    this._volume.container.addEventListener('mousedown', this._mouseDown.bind(this));

    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);
  }

  _mouseDown(event) {
    if (!this.isDragging && (event.target.id === 'volumebar-wrapper' ||
        event.target.id === 'volumebar-container' ||
        event.target.id === 'volumebar-current' ||
        event.target.id === 'volumebar-thumb')) {

      this.isDragging = true;
      this._moveVolume(event);

      window.addEventListener('mousemove', this._mouseMove);
      window.addEventListener('mouseup', this._mouseUp);
    }
  }

  _mouseMove(event) {
    if (this.isDragging) {
      this._moveVolume(event);
    }
  }

  _mouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      window.removeEventListener('mousemove', this._mouseMove);
      window.removeEventListener('mouseup', this._mouseUp);
    }
  }

  _moveVolume(event) {
    // Get container bound rectangle and compute difference in px and % (pr)
    const boundRect = this._volume.container.getBoundingClientRect();
    const toLeftInPx = event.clientX - boundRect.left; // Client X position minus container left X position equals X variation from container left side
    let toLeftInPr = (toLeftInPx * 100) / boundRect.width; // Get width percentage depending on container width
    // OOB protection
    if (toLeftInPr > 100) {
      toLeftInPr = 100;
    }
    if (toLeftInPr < 0) {
      toLeftInPr = 0;
    }
    // Set mzk global volume
    mzk.setVolume(toLeftInPr / 100);
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  updateVolume(isMuted, volume) {
    const removeFullClass = () => {
      if (this._volume.current.classList.contains('full')) {
        this._volume.current.classList.remove('full');
      }
    };

    volume *= 100;
    // Icon update
    if (volume === 0 || (typeof isMuted === 'boolean' && isMuted === true)) {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-mute.svg';
    } else if (volume > 0 && volume < 50) {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-half.svg';
    } else {
      removeFullClass();
      this._volume.image.src = '/static/img/player/volume-full.svg';
    }

    if (volume > 97 && volume <= 100) { // Add border radius on right side
      this._volume.current.classList.add('full');
    }

    // Current and thumb update
    if (typeof isMuted === 'boolean' && isMuted === true) {
      volume = 0;
    } // To set volume current and thumb at 0% left when muted.
    this._volume.current.style.width = `${volume}%`;
    this._volume.thumb.style.left = `${volume}%`;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (VolumeBar);


/***/ }),

/***/ "./static/js/view/maincontainer/Aside.js":
/*!***********************************************!*\
  !*** ./static/js/view/maincontainer/Aside.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AsideEntry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsideEntry.js */ "./static/js/view/maincontainer/AsideEntry.js");

'use_strict';

class Aside {
  /**
   * @summary A components container
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Can be filled with various AsideEntries and is meant to be both sides of a Mzk scene
   * @param {object} options - The Aside options object
   * @param {string} options.side - The Aside position on screen (`left` or `right` only)
   **/
  constructor(options) {
    this.dom = {};
    this._open = {};
    this._close = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the Aside according to its side
   **/
  _init() {
    this.dom = document.getElementById('aside');

    this._close = document.getElementById('aside-close');
    this._open = document.getElementById('aside-open');

    const a = new _AsideEntry_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      title: 'Content to come some day!'
    });
    this.dom.appendChild(a.getDom());

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this._events();
  }

  /**
   * @method
   * @name _events
   * @private
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle Aside mouse click events (show and hide)
   **/
  _events() {
    this._close.addEventListener('click', this.hide);
    this._open.addEventListener('click', this.show);
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  /**
   * @method
   * @name hide
   * @public
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Hide the aside with animation
   **/
  hide() {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.dom.style.left = `-${((this.dom.offsetWidth * 100) / viewportWidth)}%`;
    this._close.style.opacity = 0;
    this._open.style.opacity = 1;
    mzk.view.extendMainContainer();
  }

  /**
   * @method
   * @name show
   * @public
   * @memberof Aside
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Show the aside with animation
   **/
  show() {
    this.dom.style.left = 0;
    this._close.style.opacity = 1;
    this._open.style.opacity = 0;
    mzk.view.retractMainContainer();
  }

  toggleHideShow() {
    if (this.dom.style.left === '0px') {
      this.hide();
    } else {
      this.show();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Aside);


/***/ }),

/***/ "./static/js/view/maincontainer/AsideEntry.js":
/*!****************************************************!*\
  !*** ./static/js/view/maincontainer/AsideEntry.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';

class AsideEntry {
  /**
   * @summary An entry that is meant to be used as an Aside children
   * @author Arthur Beaulieu
   * @since September 2018
   * @description TODO
   * @param {object} options - The AsideEntry options object
   **/
  constructor(options) {
    this.title = options.title;
    this.dom = {};

    this._init();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  /**
   * @method
   * @name _init
   * @private
   * @memberof AsideEntry
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Init the AsideEntry DOM and fill it with instance attributes
   **/
  _init() {
    this.dom.title = document.createElement('P');
    this.dom.title.innerHTML = this.title;
  }

  //  --------------------------------  GETTER METHODS   --------------------------------  //

  getDom() {
    return this.dom.title;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AsideEntry);


/***/ }),

/***/ "./static/js/view/maincontainer/Scene.js":
/*!***********************************************!*\
  !*** ./static/js/view/maincontainer/Scene.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_ListView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/ListView.js */ "./static/js/view/maincontainer/views/ListView.js");

'use_strict';

class Scene {
  /**
   * @summary ManaZeak main scene to renders views in
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the main scene
   **/
  constructor() {
    this._scene = document.getElementById('scene');
    this._optionButton = document.getElementById('view-option');
    // TODO : add test function that replace scene with a sandBox to work with

    this._events();
  }

  _events() {
    this._optionButton.addEventListener('click', () => {
      this.view.optionsClicked();
    });
  }

  //  --------------------------------  PUBLIC METHODS  ---------------------------------  //

  stopPlayback() {
    this.view.removePlayingIcon(); // Warning, this is specific to listView so far
  }

  /**
   * @method
   * @name addView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Add a new view in the scene (only append the DOM element)
   * @param {object} node - The DOM node to append to the scene
   **/
  addView(node) {
    // TODO : clear existing material
    const fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    this._scene.appendChild(fragment);
  }

  extend() {
    this._scene.classList.add('extended');
    setTimeout(() => {
      this.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  retract() {
    this._scene.classList.remove('extended');
    setTimeout(() => {
        this.view.refreshView();
    }, 800); // Value must match 4 times the $transition-duration var in scss/utils/tools/_variables.scss
  }

  toggleExtension() {
    if (this._scene.classList.contains('extended')) {
      this.retract();
    } else {
      this.extend();
    }
  }

  /**
   * @method
   * @name updateView
   * @public
   * @memberof Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Update the current view with the given playlist
   * @param {object} playlist - The playlist to update the view with
   **/
  updateView(playlist) {
    const artists = playlist.getArtists();
    const tracks = [];

    for (let i = 0; i < artists.length; ++i) {
      for (let j = 0; j < artists[i].albums.length; ++j) {
        for (let k = 0; k < artists[i].albums[j].tracks.length; ++k) {
          tracks.push(artists[i].albums[j].tracks[k]);
        }
      }
    }

    const options = {
      columns: [{
          name: 'Duration',
          order: 0,
          width: '10'
        },
        {
          name: 'Title',
          order: 1,
          width: '20'
        },
        {
          name: 'Artist',
          order: 2,
          width: '14'
        },
        {
          name: 'Composer',
          order: 3,
          width: '14'
        },
        {
          name: 'Performer',
          order: 4,
          width: '14'
        },
        {
          name: 'Album',
          order: 5,
          width: '14'
        },
        {
          name: 'Genre',
          order: 6,
          width: '14'
        }
      ],
      target: this._scene,
      availableColumns: [ // TODO : store this in a default.json file somewhere
        {
          name: 'Duration',
          order: 0,
          width: '10'
        },
        {
          name: 'Title',
          order: 1,
          width: '20'
        },
        {
          name: 'Artist',
          order: 2,
          width: '14'
        },
        {
          name: 'Composer',
          order: 3,
          width: '14'
        },
        {
          name: 'Performer',
          order: 4,
          width: '14'
        },
        {
          name: 'Album',
          order: 5,
          width: '14'
        },
        {
          name: 'Genre',
          order: 6,
          width: '14'
        }
      ]
    };

    this.view = new _views_ListView_js__WEBPACK_IMPORTED_MODULE_0__["default"](options); // TODO : move this
    this.addView(this.view.getDOMFragment());
    this.view.addTracks(tracks);
/*
    setTimeout(() => {
      this.view.centerOn(2);
    }, 500);
*/
  }

  changeTrack(id) {
    this.view.changeTrack(id);
  }

  getNextTrackId() {
    return this.view.getNextTrackId();
  }

  getPreviousTrackId() {
    return this.view.getPreviousTrackId();
  }

  isLastTrack() {
    return this.view.isLastTrack();
  }

  startLoading() {
    return new Promise(resolve => {
      const spinner = document.createElement('DIV');
      spinner.id = 'loading-spinner';
      this._scene.appendChild(spinner);
      setTimeout(() => {
        resolve();
      }, 50); // Ensure spinner has started its animation before resolving the promise
    });
  }

  stopLoading() {
    return new Promise(resolve => {
        const spinner = this._scene.querySelector("#loading-spinner");
        if (spinner != null) {
            this._scene.removeChild(spinner);
        }
        resolve();
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Scene);


/***/ }),

/***/ "./static/js/view/maincontainer/views/ListView.js":
/*!********************************************************!*\
  !*** ./static/js/view/maincontainer/views/ListView.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListViewEntry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListViewEntry */ "./static/js/view/maincontainer/views/ListViewEntry.js");
/* harmony import */ var _utils_ScrollBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/ScrollBar.js */ "./static/js/utils/ScrollBar.js");


'use strict';

class ListView {
  /**
   * @summary ListView for mzk Scene
   * @author Arthur Beaulieu
   * @since September 2018
   * @description ListView that display tracks with customizable columns (size and type) in rows
   * @param {object} options - The ListView options object
   * @param {array} options.availableColumns - The ListView available column (not necessarly the ones that are displayed)
   * @param {array} options.columns - The user columns
   * @param {object} options.target - The DOM target node to inject ListView in (usually mzk Scene)
   **/
  constructor(options) {
    this._availableColumns = options.availableColumns;
    this._columns = options.columns;
    this._tracks = [];
    this._target = options.target;
    this._scrollBar = {};
    this._dom = {
      fragment: {},
      wrapper: {},
      header: {},
      container: {}
    };

    this._draggedColumn = null;
    this._selection = [];
    this._click = { // Object to handle click events on track entries
      dbclick: false,
      targetId: -1,
      timeoutId: -1
    };

    this._playingTrackIndex = -1;

    this._init();
    this._events();
  }

  //  --------------------------------  PRIVATE METHODS  --------------------------------  //

  _init() {
    this._dom.fragment = document.createDocumentFragment();
    this._dom.wrapper = document.createElement('DIV');
    this._dom.header = document.createElement('DIV');
    this._dom.container = document.createElement('DIV');

    this._dom.wrapper.classList.add('listview');
    this._dom.header.classList.add('header');
    this._dom.container.classList.add('track-container');
    this._target.style.position = 'relative';

    this._dom.wrapper.appendChild(this._dom.header);
    this._dom.wrapper.appendChild(this._dom.container);
    this._dom.fragment.appendChild(this._dom.wrapper);

    setTimeout(() => {
      this._initHeader();
    }, 0); // Wait that header has been added to the DOM
  }

  _events() {
    this._dom.container.addEventListener('click', (event) => {
      this._trackClicked(event);
    });

    window.addEventListener('click', () => {
      this.unselectAll();
    });

    window.addEventListener('resize', () => {
      this._refreshGridColumn(this._computeGridTemplateColumns());
    });
  }

  _trackClicked(event) {
    event.stopPropagation(); // Block window click listener

    const targetId = event.target.parentNode.dataset.id;

    if (!targetId) {
      this.unselectAll();
      return;
    }

    if (!this._click.dbclick || this._click.targetId !== targetId) { // Second test force dbclick to occur on same track
      this._click.dbclick = true;
      this._click.targetId = targetId;

      if (!event.ctrlKey) { // Simple click unselects all
        const isTargetSelected = this._tracks[targetId].getIsSelected(); // Saving target selection state before unselecting all
        this.unselectAll();
        this._tracks[targetId].setSelected(isTargetSelected); // Restore previous state to properly use in Normal click behavior condition
        this._selection.push(parseInt(targetId, 10));
      }

      if (event.ctrlKey && event.shiftKey && this._selection.length > 0) { // Ctrl + Shift + Click : fill selection in between target and closest selectioned track
        mzk.view.startLoading()
          .then(() => {
            // TODO : différence entre target et le dernier endroit ou on click
            let start = 0;
            let end = 0;

            if (parseInt(targetId, 10) < this._selection[0]) { // Compare to this._selection[0] since this._selection is always ordered
              start = parseInt(targetId, 10);
              end = this._selection[0];
            } else if (parseInt(targetId, 10) > this._selection[this._selection.length - 1]) { // Same here with greater index in this._selection
              start = this._selection[this._selection.length - 1] + 1; // +1  to avoid first item repetition
              end = parseInt(targetId, 10) + 1; // +1 to not forget the targetId too
            }

            for (let i = start; i < end; ++i) { // Loop to fill in between items
              this._tracks[i].setSelected(true);
              this._selection.push(i);
            }

            mzk.view.stopLoading();
          });
      } else { // Normal click behavior
        mzk.view.startLoading()
          .then(() => {
            if (this._tracks[targetId].getIsSelected()) {
              this._tracks[targetId].setSelected(false);
              this._selection.splice(this._selection.indexOf(targetId), 1);
            } else {
              this._tracks[targetId].setSelected(true);
              this._selection.push(parseInt(targetId, 10));
            }

            mzk.view.stopLoading();
          });
      }

      this._click.timeoutId = setTimeout(() => {
        this._click.dbclick = false;
      }, 300); // Double click speed lower than 300ms
    } else {
      clearTimeout(this._click.timeoutId);
      this.removePlayingIcon();
      this._tracks[targetId].setSelected(true);
      this._selection.push(parseInt(targetId, 10));
      mzk.changeTrack(this._tracks[targetId].id);
    }

    this._selection.sort((a, b) => {
      return (a - b);
    });
  }

  changeTrack(id) {
    let targetId = 0;

    for ( let i = 0; i < this._tracks.length; ++i) {
      if (this._tracks[i].id === id) {
        targetId = i;
        break;
      }
    }

    mzk.view.startLoading()
      .then(() => {
        this._playingTrackIndex !== -1 ? this._tracks[this._playingTrackIndex].setPlaying(false) : undefined;

        this._playingTrackIndex = targetId;
        this._click.dbclick = false;
        this._tracks[targetId].setPlaying(true);
        mzk.view.stopLoading();
      });
  }

  optionsClicked() {
    let listViewContext = this._target.querySelector('#listview-context');

    if (listViewContext !== null) { // Close context
      listViewContext.parentNode.remove();
      return;
    }

    // Otherwise, append context, and fill it with its content
    let overlay = document.createElement('DIV');
    overlay.classList.add('transparent-overlay');
    overlay.addEventListener('click', (event) => {
      if (!event.target.closest('#listview-context')) {
        listViewContext.parentNode.remove();
      }
    }, true);

    listViewContext = document.createElement('DIV');
    listViewContext.id = 'listview-context';

    overlay.appendChild(listViewContext);
    this._target.appendChild(overlay);
    this._fillOptionsContext(listViewContext);
  }

  _fillOptionsContext(context) {
    const activatedColumns = this._checkActivatedColumns();

    const checkBoxes = document.createElement('DIV');
    checkBoxes.classList.add('checkbox-container');

    for (let i = 0; i < this._availableColumns.length; ++i) {
      const text = document.createElement('LABEL');
      const input = document.createElement('INPUT');

      input.id = 'context-' + this._availableColumns[i].name;
      text.innerHTML = this._availableColumns[i].name;
      text.setAttribute('for', `context-${this._availableColumns[i].name}`);
      input.setAttribute('type', 'checkbox');

      if (activatedColumns.indexOf(this._availableColumns[i].name) !== -1) {
        input.checked = true;
      }

      input.addEventListener('click', (event) => {
        const name = event.target.id.match(/-(.*)/)[1];
        let width = '';

        mzk.view.startLoading()
          .then(() => {
            for (let j = 0; j < this._availableColumns.length; ++j) {
              if (this._availableColumns[j].name === name) {
                width = this._availableColumns[j].width;
                break;
              }
            }
            this._toggleColumn({
              name: name,
              width: width
            });
            mzk.view.stopLoading();
          });
      });

      checkBoxes.appendChild(input);
      checkBoxes.appendChild(text);
    }

    context.appendChild(checkBoxes);

    const stretchAll = document.createElement('BUTTON');
    stretchAll.innerHTML = 'Stretch All Columns';
    context.appendChild(stretchAll);

    stretchAll.addEventListener('click', (event) => {
      event.stopPropagation();
      this._stretchAllColumns();
    });
  }

  _initHeader() {
    const fragment = document.createDocumentFragment();
    this._dom.header.style.gridTemplateColumns = this._computeGridTemplateColumns(); // Assign CSS rule

    for (let i = 0; i < this._columns.length; ++i) { // Fill header with user's columns
      this._columns[i].order = i; // Assign column order

      const column = document.createElement('DIV');
      const stretch = document.createElement('IMG');
      const resize = document.createElement('DIV');

      column.classList.add(this._columns[i].name.toLowerCase());
      column.setAttribute('draggable', 'true');
      column.innerHTML = this._columns[i].name;
      column.dataset.id = i;

      stretch.classList.add('listview-stretch-button');
      stretch.setAttribute('draggable', 'false');
      stretch.src = '/static/img/actions/stretch-x.svg'; // TODO expand svg (left right arrow);

      resize.classList.add('listview-resize-handle');

      column.appendChild(resize);
      column.appendChild(stretch);
      fragment.appendChild(column);
      // Add header events : Drag'n'Drop, resize and stretch self
      this._handleDragEvents(column);
      this._handleResizeEvents(resize);
      stretch.addEventListener('click', (event) => {
        this._stretchColumn(event.target.parentNode);
      });
    }

    this._dom.header.appendChild(fragment);
  }

  _handleResizeEvents(handle) {
    const parent = handle.parentNode;
    const marker = document.createElement('DIV');
    let grabbed = false;

    const resize = event => {
      grabbed = true;
      this._dom.wrapper.appendChild(marker);
      parent.style.width = `${(event.clientX) - (parent.offsetLeft + this._target.offsetLeft)}px`;
      marker.style.left = `${event.clientX - this._target.offsetLeft - 1}px`;
    };

    const stopResizing = event => {
      mzk.view.startLoading()
        .then(() => {
          event.target.parentNode.setAttribute('draggable', 'true');
          window.removeEventListener('mousemove', resize, false);
          window.removeEventListener('mouseup', stopResizing, false);

          if (grabbed) {
            grabbed = false;
            this._dom.wrapper.removeChild(marker);
            for (let i = 0; i < this._columns.length; ++i) {
              if (this._columns[i].name === parent.innerHTML.match(/.*?(?=<div|$)/i)[0]) {
                this._columns[i].width = (parent.style.width.slice(0, -2) * 100 / this._dom.wrapper.clientWidth);
                this._columns[i].width = this._columns[i].width.toString();
                break;
              }
            }
          }

          this._refreshGridColumn(this._computeGridTemplateColumns());
          mzk.view.stopLoading();
        });
    };

    const initResize = event => {
      event.target.parentNode.setAttribute('draggable', 'false');
      window.addEventListener('mousemove', resize, false);
      window.addEventListener('mouseup', stopResizing, false);
    };

    handle.addEventListener('mousedown', initResize, false);
    marker.id = 'listview-resize-marker';
  }

  _handleDragEvents(column) {
    const dragStart = e => {
      if (e.target.getAttribute('draggable') === false) {
        return;
      } // Abort drag, resize event is occuring
      this._draggedColumn = e.target; // Store drag start column
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.outerHTML);
      e.target.classList.add('dragElem');
    };

    const dragOver = event => {
      if (event.target.getAttribute('draggable') === false) {
        return;
      } // Abort drag, resize event is occuring
      if (event.preventDefault) {
        event.preventDefault();
      } // Necessary. Allows us to drop.
      if (this._draggedColumn !== event.target) {
        event.target.classList.add('over');
      }
      event.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    };

    const dragLeave = function() {
      this.classList.remove('over'); // this / e.target is previous target element.
    };

    const dragEnd = event => {
      // this/e.target is the source node.
      event.target.classList.remove('over');
      event.target.classList.remove('dragElem');
    };

    const drop = event => {
      // this/e.target is current target element.
      if (event.stopPropagation) {
        event.stopPropagation();
      } // Stops some browsers from redirecting.

      event.target.classList.remove('over');

      // Don't do anything if dropping the same column we're dragging.
      if (this._draggedColumn !== event.target) {
        event.target.removeEventListener('drageend', dragEnd, false);
        mzk.view.startLoading()
          .then(() => {
            for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
              this._dom.container.childNodes[i].insertBefore(this._dom.container.childNodes[i].childNodes[this._draggedColumn.dataset.id], this._dom.container.childNodes[i].childNodes[event.target.dataset.id]);
            }

            if (this._draggedColumn.dataset.id < event.target.dataset.id) {
              this._columns.move(this._draggedColumn.dataset.id, event.target.dataset.id - 1); // Since we splice in move, we need to simulate insert
            } else { // No need to test id equality since self-drop is prevented : that._draggedColumn !== this
              this._columns.move(this._draggedColumn.dataset.id, event.target.dataset.id);
            }

            this._draggedColumn = null; // Must be done after column movement in grid
            this._refreshGridColumn();
            mzk.view.stopLoading();
          });
      } else {
        this._draggedColumn = null; //
      }
    };

    column.addEventListener('dragstart', dragStart, false);
    column.addEventListener('dragover', dragOver, false);
    column.addEventListener('dragleave', dragLeave, false);
    column.addEventListener('drop', drop, false);
    column.addEventListener('dragend', dragEnd, false);
  }

  _computeGridTemplateColumns() {
    let gridTemplateColumns = ''; // CSS grid rule

    for (let i = 0; i < this._columns.length; ++i) { // Init listview header and CSS grid columns rule
      gridTemplateColumns += `${(this._columns[i].width * (this._dom.wrapper.clientWidth / 100))}px `;
    }

    return gridTemplateColumns;
  }

  _refreshHeader(gridTemplateColumns) {
    this._dom.header.style.gridTemplateColumns = gridTemplateColumns;

    for (let i = 0; i < this._columns.length; ++i) { // Init listview header
      this._columns[i].order = i; // Refresh columns order

      const column = this._dom.header.childNodes[i];
      column.style = ''; // Remove old remaining width style value
      column.className = this._columns[i].name.toLowerCase();
      column.childNodes[0].nodeValue = this._columns[i].name; // Don't innerHTML to avoid remove of stretch and resize handles. childNodes[0] is #text node
      column.dataset.id = i;
    }
  }

  // gridTemplateColumns optionnal (custom set or self set)
  _refreshGridColumn(gridTemplateColumns) {
    if (!gridTemplateColumns) {
      gridTemplateColumns = this._computeGridTemplateColumns();
    }

    this._refreshHeader(gridTemplateColumns);

    for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
      this._dom.container.childNodes[i].style.gridTemplateColumns = gridTemplateColumns;
    }
  }

  _checkActivatedColumns() {
    const activatedColumns = [];

    for (let i = 0; i < this._columns.length; ++i) {
      for (let j = 0; j < this._availableColumns.length; ++j) {
        if (this._columns[i].name === this._availableColumns[j].name) {
          activatedColumns.push(this._columns[i].name);
        }
      }
    }

    return activatedColumns;
  }

  _addColumn(column) {
    if (this._checkActivatedColumns().indexOf(column.name) === -1) {
      this._columns.push({
        name: column.name,
        width: column.width
      });

      this._refreshGridColumn();

      for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
        const col = document.createElement('DIV');
        col.classList.add(column.name.toLowerCase());

        if (column.name.toLowerCase() === 'duration') {
          col.innerHTML = Utils.secondsToTimecode(this._tracks[this._dom.container.childNodes[i].dataset.id].get(column.name.toLowerCase()));
        } else {
          col.innerHTML = this._tracks[this._dom.container.childNodes[i].dataset.id].get(column.name.toLowerCase());
        }

        this._dom.container.childNodes[i].appendChild(col);
      }
    }
  }

  _removeColumn(column) {
    for (let i = this._columns.length - 1; i >= 0; --i) {
      if (this._columns[i].name === column.name) {
        this._columns.splice(i, 1);
        break;
      }
    }

    this._refreshGridColumn();

    for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
      for (let j = 0; j < this._dom.container.childNodes[i].childNodes.length; ++j) {
        if (this._dom.container.childNodes[i].childNodes[j].classList.contains(column.name.toLowerCase())) {
          this._dom.container.childNodes[i].removeChild(this._dom.container.childNodes[i].childNodes[j]);
        }
      }
    }
  }

  _toggleColumn(column) {
    if (this._checkActivatedColumns().indexOf(column.name) === -1) {
      this._addColumn(column);
    } else {
      this._removeColumn(column);
    }
  }

  _stretchColumn(column) {
    mzk.view.startLoading()
      .then(() => {
        const index = column.dataset.id; // Column to stretch index
        let sum = 0; // Columns width in % sum

        for (let i = 0; i < this._columns.length; ++i) {
          sum += parseFloat(this._columns[i].width, 10);
        }

        this._columns[index].width = parseFloat(this._columns[index].width, 10); // Convert target value to float for computations

        if (sum < 100) { // Expand column
          this._columns[index].width += (100 - sum);
        } else if (sum > 100) { // Retract column
          if ((sum - 100) < this._columns[index].width) {
            this._columns[index].width -= (sum - 100);
          } else { // Too tight to retract column, raise a warning
            Errors.raise({
              code: 'CANT_STRETCH_COLUMN',
              frontend: true
            });
            mzk.view.stopLoading();
            return;
          }
        } else { // Layout is 100% stretched to its container, raise an info
          Errors.raise({
            code: 'ALREADY_STRETCH',
            frontend: true
          });
          mzk.view.stopLoading();
          return;
        }

        this._columns[index].width = this._columns[index].width.toString(); // Restore target value
        this._refreshGridColumn();
        mzk.view.stopLoading();
      });
  }

  _stretchAllColumns() {
    mzk.view.startLoading()
      .then(() => {
        const equalColumnWidthInPx = (this._dom.wrapper.clientWidth / this._columns.length);
        let alreadyStretched = true; // Assuming by default that that columns have equal width

        for (let i = 0; i < this._columns.length; ++i) { // Loop to find if columns aren't all equal
          const currentColumnWidthInPx = ((this._dom.wrapper.clientWidth * this._columns[i].width) / 100);
          if (currentColumnWidthInPx !== equalColumnWidthInPx) { // One column isn't equals to the others
            alreadyStretched = false; // Break equal width assumption
            break;
          }
        }

        if (alreadyStretched) { // Exit function if columns are already stretched
          Errors.raise({
            code: 'ALREADY_STRETCH',
            frontend: true
          });
          mzk.view.stopLoading();
          return;
        }

        let gridTemplateColumns = ''; // CSS grid rule (in pixels)
        for (let i = 0; i < this._columns.length; ++i) { // Init equaly CSS grid columns rule
          this._columns[i].width = (equalColumnWidthInPx * 100) / this._dom.wrapper.clientWidth; // Update column width in %
          gridTemplateColumns += `${equalColumnWidthInPx}px `; // Assign column width in px
        }

        this._refreshGridColumn(gridTemplateColumns); // Refresh ListView grid with custom gridTemplateColumns value
        mzk.view.stopLoading();
      });
  }


  addTracks(tracks) {
    mzk.view.startLoading()
      .then(() => {
        const fragment = document.createDocumentFragment();
        const gridTemplateColumns = this._computeGridTemplateColumns(); // CSS grid rule
        const firstCall = this._tracks.length === 0 ? true : false;

        for (let i = 0; i < tracks.length; ++i) { // Init listview content depending on options object
          const listViewEntry = new _ListViewEntry__WEBPACK_IMPORTED_MODULE_0__["default"]({
            track: tracks[i],
            datasetId: i,
            gridTemplateColumns: gridTemplateColumns
          });
          this._tracks.push(listViewEntry);

          for (let j = 0; j < this._columns.length; ++j) {
            const col = document.createElement('DIV');
            col.classList.add(this._columns[j].name.toLowerCase());
            col.dataset.id = j;

            if (this._columns[j].name.toLowerCase() === 'duration') {
              col.innerHTML = Utils.secondsToTimecode(listViewEntry.get(this._columns[j].name.toLowerCase()));
            } else {
              col.innerHTML = listViewEntry.get(this._columns[j].name.toLowerCase());
            }

            listViewEntry.addColumn(col);
          }

          fragment.appendChild(listViewEntry.getDom());
        }

        this._dom.container.appendChild(fragment);

        if (firstCall) {
          this._scrollBar = new _utils_ScrollBar_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
            target: this._dom.container
          });
          this._dom.container = this._dom.container.firstChild.firstChild; // ScrollBar creates two wrappers
        }

        mzk.view.stopLoading();
        mzk.view.stopLoading();
      });
  }

  centerOn(id) {
    let index = -1;
    for (let i = 0; i < this._dom.container.childNodes.length; ++i) {
      if (parseInt(this._dom.container.childNodes[i].dataset.id) === id) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      Errors.raise({
        code: 'CANT_CENTER_TRACK',
        frontend: true
      });
      return;
    }

    const relativeDelta = this._dom.container.childNodes[index].offsetTop + this._dom.container.childNodes[index].scrollHeight / 2;
    this._dom.container.scrollTop = relativeDelta - this._dom.container.clientHeight / 2;
  }

  unselectAll() {
    this._selection = [];

    for (let i = 0; i < this._tracks.length; ++i) {
      this._tracks[i].setSelected(false);
    }
  }

  removePlayingIcon() {
    if (this._tracks[this._playingTrackIndex]) { // Testing if a track is flagged playing
      this._tracks[this._playingTrackIndex].setPlaying(false); // Remove the flag
      this._playingTrackIndex = -1;
    }
  }

  refreshView() { // TODO move this in AppView extended class to create and this is override
    mzk.view.startLoading()
      .then(() => {
        setTimeout(() => {
          this._refreshGridColumn();
          mzk.view.stopLoading();
        }, 500);
      });
  }

  getDOMFragment() {
    return this._dom.fragment;
  }

  getNextTrackId() {
    return this._tracks[(this._playingTrackIndex + 1) % this._tracks.length].id;
  }

  getPreviousTrackId() {
    return this._tracks[(this._playingTrackIndex + this._tracks.length - 1) % this._tracks.length].id;
  }

  isLastTrack() {
    if (this._playingTrackIndex === this._tracks.length - 1) {
      return true;
    }

    return false;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ListView);


/***/ }),

/***/ "./static/js/view/maincontainer/views/ListViewEntry.js":
/*!*************************************************************!*\
  !*** ./static/js/view/maincontainer/views/ListViewEntry.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'user strict';

class ListViewEntry {
  /**
   * @summary ListView entry
   * @author Arthur Beaulieu
   * @since August 2018
   * @description A ListView item that aim to contain track and its interactivity
   **/
  constructor(options) {
    if (typeof options !== 'object') {
      return;
    }
    this.artist = options.track.artist || '';
    this.album = options.track.album.NAME || '';
    this.composer = options.track.composer || '';
    this.duration = options.track.duration || '';
    this.genre = options.track.genre || '';
    this.id = options.track.id || '';
    this.performer = options.track.performer || '';
    this.title = options.track.title || '';

    this._dom = document.createElement('DIV');
    this._dom.classList.add('entry');
    this._dom.dataset.id = options.datasetId;
    this._dom.style.gridTemplateColumns = options.gridTemplateColumns;

    this._isSelected = false;
    this._isPlaying = false;
  }

  addColumn(column) {
    this._dom.appendChild(column);
  }

  getDom() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._dom);
    return fragment;
  }

  setSelected(status) {
    this._isSelected = status;

    if (!status) {
      this._dom.classList.remove('selected');
    } else {
      this._dom.classList.add('selected');
    }
  }

  setPlaying(status) {
    this._isPlaying = status;

    if (!status) {
      this._dom.classList.remove('playing');
    } else {
      this._dom.classList.add('playing');
    }
  }

  getLowerCaseOf(tag) {
    return this[tag].toString().toLowerCase();
  }
  get(tag) {
    return this[tag];
  }
  getIsSelected() {
    return this._isSelected;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ListViewEntry);


/***/ }),

/***/ "./static/js/view/topbar/TopBar.js":
/*!*****************************************!*\
  !*** ./static/js/view/topbar/TopBar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserMenu.js */ "./static/js/view/topbar/UserMenu.js");

'use_strict';


class TopBar {
  /**
   * @summary ManaZeak TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle all components in the TopBar and all related events
   **/
  constructor() {
    this._topbar = {};
    this._avatar = {};
    this._userMenu = {};

    this._init();
    this._events();
  }

  _init() {
    this._topbar = document.getElementById('topbar');
    this._avatar = document.getElementById('topbar-avatar');
    this._userMenu = document.createElement('DIV');

    this._userMenu = new _UserMenu_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      target: this._topbar
    });
    this._avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
  }

  _events() {
//    this._dismissUserMenu = this._dismissUserMenu.bind(this);

    this._avatar.addEventListener('click', () => {
      if (this._topbar.contains(this._userMenu.dom)) {
        this.closeUserMenu();
      } else {
        this.openUserMenu();
      }
    });
  }

  openUserMenu() {
    this._userMenu.open();
  }

  closeUserMenu() {
    this._userMenu.close();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TopBar);


/***/ }),

/***/ "./static/js/view/topbar/UserMenu.js":
/*!*******************************************!*\
  !*** ./static/js/view/topbar/UserMenu.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
'use_strict';


class UserMenu {
  /**
   * @summary TopBar user menu
   * @author Arthur Beaulieu
   * @since October 2018
   * @description Hold all user links to control the main view, logout etc.
   **/
  constructor(options) {
    this._target = options.target;
    this._userMenu = {};
    this._overlay = {};
    this._logOut = {};

    this._init();
  }


  _init() {
    mzk.komunikator.getTemplate('modals/usermenu/')
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');

        this._overlay = doc.getElementsByClassName('transparent-overlay')[0];
        this._userMenu = doc.getElementsByClassName('user-menu')[0];
        this._logOut = this._userMenu.childNodes[1];

        //        console.log(this._userMenu.firstElementChild.dataset.perm)
        this._events();
      });
  }


  _events() {
    this._viewportClicked = this._viewportClicked.bind(this);

    this._logOut.addEventListener('click', () => {
      mzk.logOut();
    }, true);
  }


  _viewportClicked(event) {
    event.stopPropagation();

    if (!event.target.closest(`.user-menu`)) {
        this.close();
    }
      if (event.target !== this._userMenu) {
    }
  }


  open() {
    this._target.appendChild(this._overlay);
    this._overlay.addEventListener('click', this._viewportClicked, false);
  }


  close() {
    this._target.removeChild(this._overlay);
    this._overlay.removeEventListener('click', this._viewportClicked, false);
  }


  get dom() {
    return this._userMenu;
  }
}


/* harmony default export */ __webpack_exports__["default"] = (UserMenu);

/***/ }),

/***/ "./static/scss/style.scss":
/*!********************************!*\
  !*** ./static/scss/style.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL1N0YXJ0LmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy9jb3JlL0tvbXVuaWthdG9yLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy9jb3JlL016ay5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvY29yZS9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL2NvcmUvVXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL21vZGVsL2NvbXBvbmVudHMvQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvY29tcG9uZW50cy9QbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvY29tcG9uZW50cy9UcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdXRpbHMvRXJyb3JzLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy91dGlscy9FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL01vZGFsLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy91dGlscy9Ob3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL1Njcm9sbEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdXRpbHMvU2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvZm9vdGJhci9Gb290QmFyLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L2Zvb3RiYXIvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy9mb290YmFyL2NvbXBvbmVudHMvVm9sdW1lQmFyLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L21haW5jb250YWluZXIvQXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvbWFpbmNvbnRhaW5lci9Bc2lkZUVudHJ5LmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L21haW5jb250YWluZXIvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvbWFpbmNvbnRhaW5lci92aWV3cy9MaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy9tYWluY29udGFpbmVyL3ZpZXdzL0xpc3RWaWV3RW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvdG9wYmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy90b3BiYXIvVXNlck1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3Njc3Mvc3R5bGUuc2Nzcz82ZDVhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBC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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RtQm5CO0FBQUE7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsMEJBQTBCO0FBQzFCLDRCQUE0Qjs7QUFFNUIsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkI7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRCx5Q0FBeUM7QUFDekMsc0JBQXNCO0FBQ3RCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQsdUNBQXVDO0FBQ3ZDLHdDQUF3QztBQUN4Qzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0Esa0dBQWtHO0FBQ2xHOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUEsMEVBQTBFO0FBQzFFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QixvQkFBb0I7QUFDcEIsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUEseURBQXlEO0FBQ3pELHVDQUF1QztBQUN2Qzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSwyRUFBMkU7QUFDM0Usb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQjs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0Isc0VBQXNFO0FBQ3RFLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0IsNkJBQTZCO0FBQzdCLDBCQUEwQjtBQUMxQjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiw4QkFBOEI7QUFDOUIsMkJBQTJCO0FBQzNCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQiw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QiwyQkFBMkI7QUFDM0IsOEJBQThCO0FBQzlCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLHVCQUF1Qjs7QUFFdkIsK0JBQStCO0FBQy9CLDhCQUE4QjtBQUM5Qjs7QUFFQSw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBQzdCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLG1DQUFtQztBQUNuQyxrQkFBa0I7QUFDbEI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7OztBQ25ldEI7QUFBQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE1BQU07QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQUksRUFBQzs7Ozs7Ozs7Ozs7OztBQ2xIcEI7QUFBQTtBQUFBO0FBQXVDO0FBQ2E7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUFNO0FBQzdCLDJCQUEyQixpRUFBVTtBQUNyQzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0EsbUJBQW1CLHdDQUF3QztBQUMzRCxxQkFBcUIsb0RBQW9EO0FBQ3pFLHVCQUF1Qiw4REFBOEQ7QUFDckYseUJBQXlCLHdFQUF3RTtBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQUssRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RUckI7QUFBQTtBQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVE7QUFDckM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxXQUFXO0FBQ1g7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QztBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUseUVBQVUsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2pPMUI7QUFBQTtBQUErQjtBQUMvQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCx1R0FBdUc7QUFDdkcsdUNBQXVDLFNBQVM7QUFDaEQsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNEJBQTRCO0FBQ2pEO0FBQ0EsdUJBQXVCLHNDQUFzQztBQUM3RDtBQUNBLHlCQUF5QixnREFBZ0Q7QUFDekUsNEJBQTRCLGlEQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUztBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHVFQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1S3hCO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDNUNyQjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELG1CQUFtQjtBQUNyRSxxREFBcUQsbUJBQW1CO0FBQ3hFLG1EQUFtRCxtQkFBbUI7QUFDdEU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDOztBQUVyQztBQUNBLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0M7QUFDQSxLQUFLO0FBQ0wscUNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyw2Q0FBNkM7QUFDN0M7O0FBRUEsbUNBQW1DLE9BQU87QUFDMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0hBQXNIO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0IsV0FBVyxxQkFBcUIsV0FBVyxTQUFTLElBQUksd0JBQXdCLEdBQUcsMEJBQTBCO0FBQ2xKLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCLGdDQUFnQyxRQUFRLElBQUksNkJBQTZCO0FBQ3pFLGdDQUFnQyx1QkFBdUIsS0FBSyxNQUFNOztBQUVsRTtBQUNBO0FBQ0E7O0FBRUEsb0VBQW9FOztBQUVwRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7OztBQy9IdEI7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRUFBQzs7Ozs7Ozs7Ozs7OztBQ3pIdEI7QUFBQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRWUsb0VBQUssRTs7Ozs7Ozs7Ozs7O0FDakNwQjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU8sNENBQTRDLFdBQVcsYUFBYSxjQUFjO0FBQ3RHLGFBQWEsT0FBTyxvQ0FBb0MsUUFBUSxNQUFNLE9BQU8sTUFBTTtBQUNuRixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLHVCQUF1QjtBQUN2Qix1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPLDRDQUE0QyxXQUFXLGFBQWEsY0FBYztBQUN0RyxhQUFhLE9BQU8sb0NBQW9DLFFBQVEsTUFBTSxPQUFPLE1BQU07QUFDbkYsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUpBQW1KO0FBQ25KLHNEQUFzRDtBQUN0RDs7QUFFQSx5S0FBeUs7QUFDekssNERBQTREO0FBQzVEOztBQUVBLG9FQUFvRTtBQUNwRSxzREFBc0Q7QUFDdEQ7O0FBRUEsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRDs7QUFFQSxzRUFBc0U7QUFDdEUsd0RBQXdEO0FBQ3hEOztBQUVBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQsb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG1EQUFtRDs7QUFFbkQsaUNBQWlDO0FBQ2pDLCtCQUErQjs7QUFFL0I7QUFDQSx5Q0FBeUM7QUFDekMsT0FBTyx5QkFBeUI7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBEOztBQUUxRCxnREFBZ0Q7QUFDaEQsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCxPQUFPLG1EQUFtRDtBQUMxRCxxQ0FBcUM7QUFDckM7QUFDQSxLQUFLLFFBQVE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0EsdUNBQXVDO0FBQ3ZDLEtBQUsseUJBQXlCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBQy9DLHVDQUF1QztBQUN2QyxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQSw2REFBNkQ7QUFDN0QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLHlDQUF5QztBQUN6QyxlQUFlO0FBQ2Y7O0FBRUEsNERBQTREO0FBQzVELEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTyx5QkFBeUIsU0FBUyxNQUFNLFNBQVM7QUFDckUsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0Esb0RBQW9EOztBQUVwRCw0Q0FBNEM7QUFDNUMsZ0RBQWdEO0FBQ2hEOztBQUVBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRSxrQ0FBa0M7QUFDbEMsdUJBQXVCOztBQUV2QixzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTyxrQkFBa0IsTUFBTSxTQUFTLE9BQU87QUFDNUQ7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSwyRUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdjFCNUI7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsdUJBQXVCO0FBQ3ZCLHlCQUF5QjtBQUN6QixtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsT0FBTyxHQUFHLFFBQVEsSUFBSSxHQUFHLFVBQVUsTUFBTSxHQUFHO0FBQ3pGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ25LekI7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRSw2QkFBNkI7QUFDN0I7O0FBRUEsMERBQTBEO0FBQzFELHFCQUFxQiwyQkFBMkI7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaLHFCQUFxQiw0QkFBNEI7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7O0FBRUEsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRCQUE0QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx1RUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDOVR4QjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsT0FBTztBQUNwQixjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7O0FBRUE7QUFDQSw4QkFBOEIsa0JBQWtCO0FBQ2hEOztBQUVBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRDs7QUFFQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0I7QUFDcEcsS0FBSztBQUNMLGdCQUFnQixrQkFBa0IsR0FBRyxrQkFBa0IsR0FBRyxrQkFBa0I7QUFDNUUsS0FBSztBQUNMLGdCQUFnQixrQkFBa0IsR0FBRyxrQkFBa0I7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQzs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQSxnSkFBZ0o7QUFDaEo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM5THJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNLO0FBQ0E7QUFDRjtBQUNMO0FBQ3RDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsdURBQUs7O0FBRTFCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7O0FBRW5FLHVCQUF1Qix5REFBTTtBQUM3QixzQkFBc0IsK0RBQUs7QUFDM0I7QUFDQSxLQUFLO0FBQ0wsc0JBQXNCLCtEQUFLO0FBQzNCLHdCQUF3QiwyREFBTzs7QUFFL0IsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QywwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsNERBQTREO0FBQzVEOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBLEtBQUssaUJBQWlCO0FBQ3RCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDblBwQjtBQUFBO0FBQUE7QUFBa0Q7QUFDSTtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGdFQUFTO0FBQ25DLDRCQUE0QixrRUFBVztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEIsdUJBQXVCLHVCQUF1QjtBQUM5QywyQkFBMkIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3pDO0FBQ0E7O0FBRUEsaUdBQWlHOztBQUVqRztBQUNBLDBDQUEwQyxnQkFBZ0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQSxpREFBaUQsZ0JBQWdCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsc0VBQU8sRUFBQzs7Ozs7Ozs7Ozs7OztBQzdLdkI7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLGVBQWU7QUFDZixpQkFBaUI7QUFDakIsZUFBZTtBQUNmLGVBQWU7QUFDZixpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLEtBQUs7QUFDTCwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5Qyx3RUFBd0U7QUFDakg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLEtBQUssZ0RBQWdEO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxrQkFBa0I7QUFDdkI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7QUFDdEYsbUVBQW1FO0FBQ25FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0EsS0FBSyxrQkFBa0I7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RCwyQ0FBMkMsV0FBVztBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsMEVBQVcsRUFBQzs7Ozs7Ozs7Ozs7OztBQzllM0I7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQ0FBMEMsT0FBTztBQUNqRCx1Q0FBdUMsT0FBTztBQUM5QztBQUNBOztBQUVlLHdFQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1SHpCO0FBQUE7QUFBeUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixzREFBVTtBQUM1QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrQ0FBK0M7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxvRUFBSyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMUdyQjtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHlFQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN4QzFCO0FBQUE7QUFBMkM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2QyxxQkFBcUIsOEJBQThCO0FBQ25ELHVCQUF1Qix3Q0FBd0M7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDBEQUFRLFVBQVU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sTUFBTTtBQUNiLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN4TnJCO0FBQUE7QUFBQTtBQUE0QztBQUNRO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE1BQU07QUFDbkIsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsNEJBQTRCOztBQUU1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvRUFBb0U7QUFDcEU7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0Isd0VBQXdFO0FBQ3hFO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUEsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOERBQThEO0FBQzlEO0FBQ0E7QUFDQSxhQUFhLGlGQUFpRjtBQUM5RixzRUFBc0U7QUFDdEUsK0NBQStDO0FBQy9DOztBQUVBLCtCQUErQixTQUFTLE9BQU87QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYLE9BQU8sT0FBTztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSxPQUFPLE9BQU87QUFDZCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLG1DQUFtQztBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsK0JBQStCO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixtQ0FBbUM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFdBQVc7QUFDWCxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxvRkFBb0Y7O0FBRXBGLG1CQUFtQiwwQkFBMEIsT0FBTztBQUNwRCxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdEOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUFnRTtBQUM5Riw2QkFBNkIsNENBQTRDO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3Qzs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDJDQUEyQztBQUN0RTtBQUNBOztBQUVBO0FBQ0EsOEZBQThGO0FBQzlGLGFBQWEsT0FBTztBQUNwQjtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUCxtQ0FBbUM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUM7O0FBRWpDLG1CQUFtQiwwQkFBMEIsT0FBTztBQUNwRCxnQ0FBZ0MsaUVBQWlFO0FBQ2pHOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsMEJBQTBCLE9BQU87QUFDcEQsaUNBQWlDOztBQUVqQztBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsMkNBQTJDO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQiwwQkFBMEI7QUFDN0MscUJBQXFCLG1DQUFtQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUEscUJBQXFCLDJDQUEyQztBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLDJDQUEyQztBQUM5RCxxQkFBcUIseURBQXlEO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QyxvQkFBb0I7O0FBRXBCLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTs7QUFFQSxnRkFBZ0Y7O0FBRWhGLHdCQUF3QjtBQUN4QjtBQUNBLFNBQVMsc0JBQXNCO0FBQy9CO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DOztBQUVwQyx1QkFBdUIsMEJBQTBCLE9BQU87QUFDeEQ7QUFDQSxnRUFBZ0U7QUFDaEUscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckMsdUJBQXVCLDBCQUEwQixPQUFPO0FBQ3hELGdHQUFnRztBQUNoRyxvQ0FBb0MscUJBQXFCLEtBQUs7QUFDOUQ7O0FBRUEscURBQXFEO0FBQ3JEO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTs7QUFFQSx1QkFBdUIsbUJBQW1CLE9BQU87QUFDakQsb0NBQW9DLHNEQUFhO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQWdDLDJEQUFTO0FBQ3pDO0FBQ0EsV0FBVztBQUNYLDBFQUEwRTtBQUMxRTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsMkNBQTJDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRCw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsdUVBQVEsRUFBQzs7Ozs7Ozs7Ozs7OztBQzFyQnhCO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsNEVBQWEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3pFN0I7QUFBQTtBQUFxQztBQUNyQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLG9EQUFRO0FBQ2pDO0FBQ0EsS0FBSztBQUNMLGdDQUFnQyxvQkFBb0IsRUFBRTtBQUN0RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDcER0QjtBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2UsdUVBQVEsRTs7Ozs7Ozs7Ozs7QUMxRXZCLHVDIiwiZmlsZSI6ImpzL21hbmF6ZWFrLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3RhdGljL2pzL1N0YXJ0LmpzXCIpO1xuIiwiaW1wb3J0ICcuLi9zY3NzL3N0eWxlLnNjc3MnO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscy9VdGlscy5qcyc7XG5pbXBvcnQgRXJyb3JzIGZyb20gJy4vdXRpbHMvRXJyb3JzLmpzJztcbmltcG9ydCBFdmVudHMgZnJvbSAnLi91dGlscy9FdmVudHMuanMnO1xuaW1wb3J0IFNob3J0Y3V0IGZyb20gJy4vdXRpbHMvU2hvcnRjdXQuanMnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL3V0aWxzL05vdGlmaWNhdGlvbi5qcyc7XG5pbXBvcnQgTXprIGZyb20gJy4vY29yZS9NemsuanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5jb25zdCBlcnJvcnNPcHRpb25zID0ge1xuICB2ZXJib3NlOiB0cnVlLFxuICB0cmFjZTogdHJ1ZVxufTtcblxuY29uc3Qgbm90aWZpY2F0aW9uT3B0aW9ucyA9IHtcbiAgdGhpY2tCb3JkZXI6ICd0b3AnLFxuICBkdXJhdGlvbjogNDAwMCxcbiAgdHJhbnNpdGlvbjogMjAwLFxuICBtYXhBY3RpdmU6IDNcbn07XG5cbndpbmRvdy5VdGlscyA9IG5ldyBVdGlscygpO1xud2luZG93LkVycm9ycyA9IG5ldyBFcnJvcnMoZXJyb3JzT3B0aW9ucyk7XG53aW5kb3cuRXZlbnRzID0gbmV3IEV2ZW50cygpO1xud2luZG93LlNob3J0Y3V0ID0gbmV3IFNob3J0Y3V0KCk7XG53aW5kb3cuTm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25PcHRpb25zKTtcblxuLy9VdGlscy5hZGRTdHlsZVNoZWV0KCcvc3RhdGljL2Rpc3QvY3NzL21haW4uY3NzJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHdpbmRvdy5temsgPSBuZXcgTXprKCk7XG4gIG16ay5zdGFydCgpO1xufSk7XG4iLCIndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgS29tdW5pa2F0b3Ige1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5IYW5kbGUgTWFuYVplYWsncyBIVFRQIHJlcXVlc3RzPC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIGNsYXNzIGlzIHRoZSBtYWluIG9iamVjdCB0byBkZWFsIHdpdGggd2hlbiByZXF1ZXN0aW5nIHNvbWV0aGluZyBmcm9tIHRoZSBzZXJ2ZXIuPGJyPlxuICAgKiBJdCBoYW5kbGUgYWxsIHVybHMgY2FsbHMgKDxjb2RlPkdFVDwvY29kZT4sIDxjb2RlPlBPU1Q8L2NvZGU+KSwgdHJlYXQgcmVzcG9uc2VzIG9yIGhhbmRsZSBlcnJvcnMgdXNpbmcgPGNvZGU+UHJvbWlzZTwvY29kZT4uPGJyPlxuICAgKiBCZWNhdXNlIGl0IHVzZXMgPGNvZGU+UHJvbWlzZTwvY29kZT4sIHN1Y2Nlc3MgYW5kIGVycm9ycyBhcmUgdG8gYmUgaGFuZGxlZCBpbiB0aGUgY2FsbGVyIGZ1bmN0aW9uLCB1c2luZyA8Y29kZT4udGhlbigpPC9jb2RlPiBhbmQgPGNvZGU+LmNhdGNoKCk8L2NvZGU+Ljxicj5cbiAgICogVGhpcyBvYmplY3QgaXMgYSA8YSBocmVmPVwiTXprLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Nems8L2E+J3MgYXR0cmlidXRlLCB0aGF0IGNhbiBiZSB1c2VkIGZyb20gYW55d2hlcmUgKDxjb2RlPm16ay5rb211bmlrYXRvcjwvY29kZT4pLjxicj5cbiAgICogUmVmZXIgdG8gPGNvZGU+YXBwL3VybC5weTwvY29kZT4gZm9yIGF2YWlsYWJsZSB1cmxzIHRvIGNvbnRyb2wgTWFuYVplYWsuPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBrb211bmlrYXRvcidzIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY3NyZlRva2VuIC0gVGhlIHVzZXIncyBjc3JmIHRva2VuIChtdXN0IGJlIGV4dHJhY3RlZCBmcm9tIGJyb3dzZXIncyBjb29raWVzIGJlZm9yZSkgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge1N0cmluZ30gLSBUaGUgdXNlcidzIGNzcmYgdG9rZW4gKi9cbiAgICB0aGlzLl9jc3JmVG9rZW4gPSBvcHRpb25zLmNzcmZUb2tlbjtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtBcnJheX0gLSBUaGUgSFRUUCBoZWFkZXJzIHRoYXQgYXJlIHVzZWQgaW4gPGNvZGU+R0VUPC9jb2RlPiBhbmQgPGNvZGU+UE9TVDwvY29kZT4gcmVxdWVzdHMgKi9cbiAgICB0aGlzLl9oZWFkZXJzID0gW107XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuXG4gIC8vICAtLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgS29tdW5pa2F0b3JcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPkluaXQgdGhlIEtvbXVuaWthdG9yIGNsYXNzIGJ5IGZpbGxpbmcgaXRzIDxjb2RlPl9oZWFkZXJzPC9jb2RlPiBwcml2YXRlIG1lbWJlciwgdG8gdXNlIGluIHJlcXVlc3RzIGxhdGVyIG9uLjxicj5cbiAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgaW4gS29tdW5pa2F0b3IncyBjb25zdHJ1Y3RvciBvbmx5LjwvYmxvY2txdW90ZT4gKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5faGVhZGVycy5wdXNoKFsnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnXSk7IC8vIHRoaXMuX2hlYWRlcnNbMF1cbiAgICB0aGlzLl9oZWFkZXJzLnB1c2goWydBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbiddKTsgLy8gdGhpcy5faGVhZGVyc1sxXVxuICAgIHRoaXMuX2hlYWRlcnMucHVzaChbJ1gtQ1NSRlRva2VuJywgdGhpcy5fY3NyZlRva2VuXSk7IC8vIHRoaXMuX2hlYWRlcnNbMl1cbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIGdldFxuICAgKiBAbWVtYmVyb2YgS29tdW5pa2F0b3JcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPkdFVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPlxuICAgKiA8Y29kZT5yZXNvbHZlPC9jb2RlPiByZXR1cm5zIHRoZSByZXNwb25zZSBhcyBhbiA8Y29kZT5PYmplY3Q8L2NvZGU+Ljxicj5cbiAgICogPGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPkdFVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbSAoc2VlIDxjb2RlPmFwcC91cmxzLnB5PC9jb2RlPilcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIGdldCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoW3RoaXMuX2hlYWRlcnNbMF1dKVxuICAgICAgfTtcblxuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgcmVqZWN0KCdVUkxfTk9UX0ZPVU5EJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmVqZWN0KCdBQ0NFU1NfRk9SQklEREVOJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgcmVqZWN0KCdJTlRFUk5BTF9FUlJPUicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoJ1VOS05PV05fRVJST1InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgZ2V0QmluYXJ5UmVzcG9uc2VcbiAgICogQG1lbWJlcm9mIEtvbXVuaWthdG9yXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5HRVQ8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyBhbiA8Y29kZT5YTUxIdHRwUmVxdWVzdDwvY29kZT4sIHdpdGggYW4gb3ZlcnJpZGUgbWltZXR5cGUgaGFjayB0byBwYXNzIGJ5dGVzIHRocm91Z2ggdW5wcm9jZXNzZWQuPGJyPlxuICAgKiBJdCB3YXMgaW1wbGVtZW50ZWQgdG8gYWxsb3cgPGNvZGU+ZDMuanM8L2NvZGU+IHRvIHJlbmRlciA8Y29kZT4ubW9vZDwvY29kZT4gZmlsZSAodXNlZCBpbiA8YSBocmVmPVwiLi9Gb290QmFyLmh0bWwjLnJlbmRlck1vb2RGaWxlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+cmVuZGVyTW9vZEZpbGU8L2E+KS48YnI+XG4gICAqIDxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGJpbmFyeSBkYXRhLjxicj5cbiAgICogPGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPi5tb29kPC9jb2RlPiBmaWxlIHVybCB0byBmZXRjaCBkYXRhIGZyb21cbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIGdldEJpbmFyeVJlc3BvbnNlKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgLy8gS2VlcCBvbGQganMgZnVuY3Rpb24gZGVmaW5pdGlvbiBzaW5jZSB0aGlzIGlzIHRoZSByZXF1ZXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0ICYmIHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2VUZXh0KTsgLy8gcmVzcG9uc2VUZXh0IGlzIGJpbmFyeSBkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgZ2V0VGVtcGxhdGVcbiAgICogQG1lbWJlcm9mIEtvbXVuaWthdG9yXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5HRVQ8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj5cbiAgICogPGNvZGU+cmVzb2x2ZTwvY29kZT4gcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+Ljxicj5cbiAgICogPGNvZGU+cmVqZWN0PC9jb2RlPiByZXR1cm5zIGFuIGVycm9yIGtleSBhcyBhIDxjb2RlPlN0cmluZzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVGhlIDxjb2RlPkdFVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbSAoc2VlIDxjb2RlPmFwcC91cmxzLnB5PC9jb2RlPilcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSByZXF1ZXN0IDxjb2RlPlByb21pc2U8L2NvZGU+ICovXG4gIGdldFRlbXBsYXRlKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyhbdGhpcy5faGVhZGVyc1swXV0pXG4gICAgICB9O1xuXG4gICAgICBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UudGV4dCgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICByZWplY3QoJ1VSTF9OT1RfRk9VTkQnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZWplY3QoJ0FDQ0VTU19GT1JCSURERU4nKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgICAgICAgICByZWplY3QoJ0lOVEVSTkFMX0VSUk9SJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdCgnVU5LTk9XTl9FUlJPUicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBwb3N0XG4gICAqIEBtZW1iZXJvZiBLb211bmlrYXRvclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+UE9TVDwvY29kZT4gSFRUUCByZXF1ZXN0IHVzaW5nIHRoZSBmZXRjaCBBUEkuPGJyPlxuICAgKiBCZXdhcmUgdGhhdCB0aGUgZ2l2ZW4gb3B0aW9ucyBvYmplY3QgbWF0Y2ggdGhlIHVybCBleHBlY3RhdGlvbnMgKGJyb3dzZSB0aGUgYmFja2VuZCBkb2N1bWVudGF0aW9uIGZvciBmdXJ0aGVyIGRldGFpbHMpLjxicj5cbiAgICogPGNvZGU+cmVzb2x2ZTwvY29kZT4gcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgYW4gPGNvZGU+T2JqZWN0PC9jb2RlPi48YnI+XG4gICAqIDxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5QT1NUPC9jb2RlPiB1cmwgdG8gZmV0Y2ggZGF0YSBmcm9tIChzZWUgPGNvZGU+YXBwL3VybHMucHk8L2NvZGU+KVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIFRoZSA8Y29kZT5KU09OPC9jb2RlPiBvYmplY3QgdGhhdCBjb250YWlucyA8Y29kZT5QT1NUPC9jb2RlPiBwYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBwb3N0KHVybCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5faGVhZGVycyksIC8vIFBPU1QgbmVlZHMgYWxsIHByZXZpb3VzbHkgZGVmaW5lZCBoZWFkZXJzXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICB9O1xuXG4gICAgICBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICByZWplY3QoJ1VSTF9OT1RfRk9VTkQnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICByZWplY3QoJ0FDQ0VTU19GT1JCSURERU4nKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgICAgICAgICByZWplY3QoJ0lOVEVSTkFMX0VSUk9SJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdCgnVU5LTk9XTl9FUlJPUicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS29tdW5pa2F0b3I7XG4iLCJpbXBvcnQgS29tdW5pa2F0b3IgZnJvbSAnLi9Lb211bmlrYXRvci5qcyc7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vbW9kZWwvTW9kZWwuanMnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vdmlldy9WaWV3LmpzJztcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlci5qcyc7XG4ndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgTXprIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IE1hbmFaZWFrIG1haW4gY29udHJvbGxlclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBib3RoIE1vZGVsIGFkIFZpZXcsIGFuZCBhbmltYXRlIHRoZW0gYWNjb3JkaW5nbHkuIEhvc3QgVXNlciwgTGFuZ2FnZSBhbmQgS29tdW5pa2F0b3IgYWxzby5cbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvb2tpZXMgPSB7fTtcbiAgICB0aGlzLmtvbXVuaWthdG9yID0ge307XG4gICAgdGhpcy5sYW5nID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHt9O1xuICAgIHRoaXMudXNlciA9IHt9O1xuICAgIHRoaXMudmlldyA9IHt9O1xuICB9XG5cblxuICAvLyAgLS0tLSAgU0VTU0lPTiBJTklUSUFMSVpBVElPTiAgLS0tLSAgLy9cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN0YXJ0XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgYSBNYW5hWmVhayBzZXNzaW9uIGRlcGVuZGluZyBvbiB1c2VyIHNldHRpbmdzIGluIGRiXG4gICAqKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5jb29raWVzID0gVXRpbHMuZ2V0Q29va2llcygpOyAvLyBHZXQgdXNlciBjb29raWVzXG5cbiAgICB0aGlzLl9pbml0S29tdW5pa2F0b3IoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdExhbmcoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0VXNlcigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRNb2RlbCgpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRWaWV3KCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdFNob3J0Y3V0KCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRBcHAoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgIGNvZGU6ICdGQVRBTF9FUlJPUicsXG4gICAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRLb211bmlrYXRvclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgS29tdW5pa2F0b3Igb2JqZWN0IChjb29raWVzIG11c3QgaGF2ZSBiZWVuIHN0b3JlZCBiZWZvcmUpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0S29tdW5pa2F0b3IoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5rb211bmlrYXRvciA9IG5ldyBLb211bmlrYXRvcih7XG4gICAgICAgIGNzcmZUb2tlbjogdGhpcy5jb29raWVzWydjc3JmdG9rZW4nXVxuICAgICAgfSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0VXNlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgVXNlciBvYmplY3RcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX2luaXRVc2VyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgdGhpcy5rb211bmlrYXRvci5nZXQoJ3VzZXIvZ2V0SW5mb3JtYXRpb24vJylcbiAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgIHRoaXMudXNlci5zZXRNZW1iZXJzKHVzZXJJbmZvKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvckNvZGUgPT4ge1xuICAgICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUsXG4gICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRMYW5nXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBsYW5nIGtleXMgYW5kIGF0dGFjaCB0aGVtIHRvIHRoaXNcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX2luaXRMYW5nKCkge1xuICAgIGNvbnN0IGNoZWNrTGFuZyA9IChsYW5nKSA9PiB7IC8vIEluIGNhc2UgbGFuZ3VhZ2UgSlNPTiBjYW4gbm90IGJlIGZldGNoZWQsIHdlIHJhaXNlIGEgbWFudWFsIG5vdGlmaWNhdGlvbiBvbmx5LlxuICAgICAgaWYgKGxhbmcuRE9ORSkge1xuICAgICAgICB0aGlzLmxhbmcgPSBsYW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTm90aWZpY2F0aW9uLm5ldyh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICB0aXRsZTogJ1VuYWJsZSB0byBsb2FkIGxhbmd1YWdlJyxcbiAgICAgICAgICBtZXNzYWdlOiAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIGxhbmd1YWdlcyBzZXR0aW5ncyBjYW4gbm90IGJlIHJlY2VpdmVkLidcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIExBTkc6IChuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSlcbiAgICAgIH07XG5cbiAgICAgIHRoaXMua29tdW5pa2F0b3IucG9zdCgnbGFuZ3VhZ2UvJywgb3B0aW9ucylcbiAgICAgICAgLnRoZW4obGFuZyA9PiB7XG4gICAgICAgICAgY2hlY2tMYW5nKGxhbmcpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7IC8vIEVycm9ycyBjYW4gbm90IGJlIGNhdGNoZWQgc2luY2UgbGFuZ3VhZ2UgZmFpbGVkIGxvYWRpbmcuXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0TW9kZWxcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIGZyb250ZW5kIE1vZGVsXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0TW9kZWwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFZpZXdcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIGZyb250ZW5kIFZpZXdcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX2luaXRWaWV3KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0U2hvcnRjdXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIHVzZXIgc2hvcnRjdXRzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0U2hvcnRjdXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5yZWxvYWRTaG9ydGN1dHMoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3N0YXJ0QXBwXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTdGFydCB0aGUgVUkgYnVpbGRpbmcgKG11c3QgYmUgY2FsbGVkIHdoZW4gZXZlcnl0aGluZyBoYXZlIGJlZW4gc2FmZWx5IGluaXRpYWxpemVkKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfc3RhcnRBcHAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMua29tdW5pa2F0b3IuZ2V0KCdwbGF5bGlzdC9nZXRVc2VyUGxheWxpc3RzLycpXG4gICAgICAgIC50aGVuKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgICAgIHRoaXMubW9kZWwuaW5pdENvbGxlY3Rpb24oY29sbGVjdGlvbilcbiAgICAgICAgICAgIC50aGVuKHBsYXlsaXN0ID0+IHtcbiAgICAgICAgICAgICAgdGhpcy52aWV3LmluaXRQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3JLZXkgPT4ge1xuICAgICAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgICAgIGNvZGU6IGVycm9yS2V5LFxuICAgICAgICAgICAgICAgIGZyb250ZW5kOiBmYWxzZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yS2V5ID0+IHtcbiAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgY29kZTogZXJyb3JLZXksXG4gICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBMQVlCQUNLIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBjaGFuZ2VUcmFja1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDaGFuZ2UgdGhlIHBsYXllZCB0cmFjayB3aXRoIHRoZSBnaWV2biBvbmUgKHVzaW5nIGl0cyBJRClcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gVGhlIHRyYWNrIElEIHRvIHJlcXVlc3QgdG8gdGhlIHNlcnZlclxuICAgKiovXG4gIGNoYW5nZVRyYWNrKGlkKSB7XG4gICAgbGV0IGR1cmF0aW9uUGxheWVkID0gMDtcblxuICAgIGlmICghaXNOYU4odGhpcy5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRQcm9ncmVzcygpKSkge1xuICAgICAgZHVyYXRpb25QbGF5ZWQgPSB0aGlzLm1vZGVsLmdldFBsYXllcigpLmdldFByb2dyZXNzKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIFRSQUNLX0lEOiBpZCxcbiAgICAgIExBU1RfVFJBQ0tfUEFUSDogdGhpcy5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRTb3VyY2UoKSxcbiAgICAgIFRSQUNLX1BFUkNFTlRBR0U6IGR1cmF0aW9uUGxheWVkLFxuICAgICAgUFJFVklPVVM6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMua29tdW5pa2F0b3IucG9zdCgndHJhY2svZ2V0UGF0aC8nLCBvcHRpb25zKVxuICAgICAgLnRoZW4odHJhY2sgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5jaGFuZ2VUcmFjayhpZCwgdHJhY2suVFJBQ0tfUEFUSCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcuY2hhbmdlVHJhY2sodGhpcy5tb2RlbC5nZXRBY3RpdmVUcmFjaygpKTtcbiAgICAgIH0pXG5cbiAgICAvLyBDaS1nw650IGNlIHBldGl0IGJhbmMgZGUgdGVzdCwgcG91ciBsZSBsdWx6IHVuaXF1ZW1lbnRcbiAgICAvLy50aGVuKHVybCA9PiB7IHJldHVybiB0aGlzLm1vZGVsLmNoYW5nZVRyYWNrKCdodHRwOi8vc3RhdGljLmtldnZ2LmluL3NvdW5kcy9jYWxsbWVtYXliZS5tcDMnKSB9KVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVQbGF5XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRvZ2dsZSB0aGUgcGxheWJhY2sgYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIHRvZ2dsZVBsYXkoKSB7XG4gICAgdGhpcy5tb2RlbC50b2dnbGVQbGF5KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LnRvZ2dsZVBsYXkoKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzdG9wUGxheWJhY2tcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcCB0aGUgcGxheWJhY2sgYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIHN0b3BQbGF5YmFjaygpIHtcbiAgICB0aGlzLm1vZGVsLnN0b3BQbGF5YmFjaygpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy5zdG9wUGxheWJhY2soKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvLyAgLS0tLSAgVk9MVU1FIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBtdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE11dGUgdGhlIHBsYXllclxuICAgKiovXG4gIG11dGUoKSB7XG4gICAgdGhpcy5tb2RlbC5tdXRlKCk7XG4gICAgdGhpcy52aWV3LnVwZGF0ZVZvbHVtZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1bm11dGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVW4gTXV0ZSB0aGUgcGxheWVyXG4gICAqKi9cbiAgdW5tdXRlKCkge1xuICAgIHRoaXMubW9kZWwudW5tdXRlKCk7XG4gICAgdGhpcy52aWV3LnVwZGF0ZVZvbHVtZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVNdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRvZ2dsZSB0aGUgcGxheWVyJ3MgbXV0ZSBzdGF0ZSBhbmQgdXBkYXRlIHRoZSB2aWV3XG4gICAqKi9cbiAgdG9nZ2xlTXV0ZSgpIHtcbiAgICB0aGlzLm1vZGVsLnRvZ2dsZU11dGUoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlVm9sdW1lKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0Vm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZC9TdWJzdHJhY3QgYSBnaXZlbiBhbW91bnQgb2Ygdm9sdW1lLCBpbiByYW5nZSBmbG9hdFstMSwgMV0gYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIGFkanVzdFZvbHVtZShhbW91bnQpIHtcbiAgICB0aGlzLm1vZGVsLmFkanVzdFZvbHVtZShhbW91bnQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy51cGRhdGVWb2x1bWUoKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzZXRWb2x1bWVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkL1N1YnN0cmFjdCBhIGdpdmVuIGFtb3VudCBvZiB2b2x1bWUsIGluIHJhbmdlIGZsb2F0WzAsIDFdIGFuZCB1cGRhdGUgdGhlIHZpZXdcbiAgICoqL1xuICBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgdGhpcy5tb2RlbC5zZXRWb2x1bWUodm9sdW1lKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlVm9sdW1lKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBST0dSRVNTIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGp1c3RQcm9ncmVzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGp1c3QgdGhlIHByb2dyZXNzIHBlcmNlbnRhZ2UgZnJvbSBhIGdpdmVuIGFtb3VuIGluIHJhbmdlIGZsb2F0Wy0xMDAsMTAwXSBhbmQgdXBkYXRlIHRoZSB2aWV3XG4gICAqKi9cbiAgYWRqdXN0UHJvZ3Jlc3MoYW1vdW50KSB7XG4gICAgdGhpcy5tb2RlbC5hZGp1c3RQcm9ncmVzcyhhbW91bnQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFByb2dyZXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgcHJvZ3Jlc3MgcGVyY2VudGFnZSBpbiByYW5nZSBmbG9hdFswLDEwMF0gYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIHNldFByb2dyZXNzKHByb2dyZXNzKSB7XG4gICAgdGhpcy5tb2RlbC5zZXRQcm9ncmVzcyhwcm9ncmVzcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdHJhY2tFbmRlZFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUcmlnZ2VyZWQgd2hlbiB0aGUgcGxheWVyIHJlYWNoZWQgdGhlIGVuZCBvZiBhIHRyYWNrXG4gICAqKi9cbiAgdHJhY2tFbmRlZCgpIHtcbiAgICBtemsubmV4dFRyYWNrSW5WaWV3KCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIG5leHRUcmFja0luVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlIHRoZSBwbGF5ZXIgdHJhY2sgdXNpbmcgdGhlIG5leHQgb25lIGluIHRoZSBjdXJyZW50IHZpZXdcbiAgICoqL1xuICBuZXh0VHJhY2tJblZpZXcoKSB7XG4gICAgY29uc3QgcmVwZWF0TW9kZSA9IHRoaXMubW9kZWwucmVwZWF0TW9kZTtcblxuICAgIGlmIChyZXBlYXRNb2RlID09PSAwKSB7XG4gICAgICBpZiAodGhpcy52aWV3LmlzTGFzdFRyYWNrKCkpIHtcbiAgICAgICAgdGhpcy5zdG9wUGxheWJhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG16ay5uZXh0VHJhY2tJblZpZXcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlcGVhdE1vZGUgPT09IDEpIHtcbiAgICAgIG16ay5yZXBlYXRUcmFjaygpO1xuICAgIH0gZWxzZSBpZiAocmVwZWF0TW9kZSA9PT0gMikge1xuICAgICAgbXprLmNoYW5nZVRyYWNrKHRoaXMudmlldy5nZXROZXh0VHJhY2tJZCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETyA6IGhhbmRsZSBlcnJvclxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcHJldmlvdXNUcmFja0luVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlIHRoZSBwbGF5ZXIgdHJhY2sgdXNpbmcgdGhlIHByZXZpb3VzIG9uZSBpbiB0aGUgY3VycmVudCB2aWV3XG4gICAqKi9cbiAgcHJldmlvdXNUcmFja0luVmlldygpIHtcbiAgICBtemsuY2hhbmdlVHJhY2sodGhpcy52aWV3LmdldFByZXZpb3VzVHJhY2tJZCgpKTtcbiAgfVxuXG5cbiAgcmVwZWF0VHJhY2soKSB7XG4gICAgdGhpcy5tb2RlbC5yZXBlYXRUcmFjaygpO1xuICAgIC8vIE5vIG5lZWQgdG8gdXBkYXRlIHRoZSB2aWV3IHNpbmNlIHRoZSBjdXJyZW50IHRyYWNrIGRpZG4ndCBjaGFuZ2VkXG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHRvZ2dsZVJlcGVhdE1vZGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSB0aGUgcmVwZWF0IHN0YXRlIHRvIHRoZSBuZXh0IG9uZSAob2ZmLCBvbmUsIGFsbClcbiAgICoqL1xuICB0b2dnbGVSZXBlYXRNb2RlKCkge1xuICAgIHRoaXMubW9kZWwudG9nZ2xlUmVwZWF0TW9kZSgpXG4gICAgICAudGhlbigocmVwZWF0TW9kZSkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcuc2V0UmVwZWF0TW9kZShyZXBlYXRNb2RlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gIC0tLS0gIFNIT1JUQ1VUUyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcmVsb2FkU2hvcnRjdXRzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENsZWFyIHJlZ2lzdGVyZWQgc2hvcnRjdXRzIGFuZCByZWxvYWQgdGhlbSBhbGwgZnJvbSBVc2VyIHByZWZlcmVuY2VzLCB3aGVuIHRoZXknbGwgYmUgYSB0aGluZ1xuICAgKiovXG4gIHJlbG9hZFNob3J0Y3V0cygpIHtcbiAgICBTaG9ydGN1dC51bnJlZ2lzdGVyQWxsKCk7XG5cbiAgICAvLyBNdWx0aSBrZXlzIHNob3J0Y3V0cyBtdXN0IGJlIGRlY2xhcmVkIGJlZm9yZSBzaW1wbGUgb25lcywgdG8gcmVzcGVjdCB0aGUgdHJpZ2dlciBvcmRyZVxuXG4gICAgLy8gVm9sdW1lIGNvbnRyb2xcbiAgICBTaG9ydGN1dC5yZWdpc3RlcignQ3RybCtTaGlmdCtBcnJvd0Rvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFZvbHVtZSgtMC4yNSk7XG4gICAgfSk7XG5cbiAgICBTaG9ydGN1dC5yZWdpc3RlcignQ3RybCtTaGlmdCtBcnJvd1VwJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RWb2x1bWUoMC4yNSk7XG4gICAgfSk7XG5cbiAgICBTaG9ydGN1dC5yZWdpc3RlcignQ3RybCtBcnJvd0Rvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFZvbHVtZSgtMC4xKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdDdHJsK0Fycm93VXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFZvbHVtZSgwLjEpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0Fycm93RG93bicsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0Vm9sdW1lKC0wLjAxKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdBcnJvd1VwJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RWb2x1bWUoMC4wMSk7XG4gICAgfSk7XG5cbiAgICAvLyBQcm9ncmVzcyBjb250cm9sXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrU2hpZnQrQXJyb3dMZWZ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RQcm9ncmVzcygtMjUpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrU2hpZnQrQXJyb3dSaWdodCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0UHJvZ3Jlc3MoMjUpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrQXJyb3dMZWZ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RQcm9ncmVzcygtMTApO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrQXJyb3dSaWdodCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0UHJvZ3Jlc3MoMTApO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0Fycm93TGVmdCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0UHJvZ3Jlc3MoLTEpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0Fycm93UmlnaHQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFByb2dyZXNzKDEpO1xuICAgIH0pO1xuXG4gICAgLy8gUGxheWJhY2sgY29udHJvbFxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCcgJywgKCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGVQbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGxvZ091dCgpIHtcbiAgICB0aGlzLmtvbXVuaWthdG9yLmdldEJpbmFyeVJlc3BvbnNlKCdsb2dvdXQvJylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIEdFVFRFUlMgLyBTRVRURVJTICAtLS0tICAvL1xuXG5cbiAgZ2V0SXNNdXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRJc011dGVkKCk7XG4gIH1cbiAgZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZ2V0UGxheWVyKCkuZ2V0UHJvZ3Jlc3MoKTtcbiAgfVxuICBnZXRWb2x1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZ2V0Vm9sdW1lKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTXprO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFBsYXllciB7XG5cblxuICAvKipcbiAgICogQHN1bW1hcnkgQmFzaWMgYXVkaW8gSFRNTCBtdXNpYyBwbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUHJvdmlkZSBhIGZldyBmZWF0dXJlcyB0byBjb250cm9sIGEgcGxheWJhY2suIFNob3VsZCBiZSBoYW5kbGVkIGluIGEgY29udHJvbGxlclxuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3BsYXllciA9IHt9OyAvLyBIVE1MIGF1ZGlvIHBsYXllclxuICAgIHRoaXMuX3ZvbHVtZSA9IDAuMDsgLy8gVm9sdW1lIGluIHJhbmdlIFswLCAxXSBmbG9hdFxuICAgIHRoaXMuX2lzTXV0ZWQgPSBmYWxzZTsgLy8gTXV0ZSBmbGFnXG4gICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7IC8vIFBsYXliYWNrIGZsYWdcblxuICAgIHRoaXMuX2luaXQoKTsgLy8gSW5pdCBwbGF5ZXIgb2JqZWN0XG4gICAgdGhpcy5fZXZlbnRzKCk7IC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLl9hdHRhY2goKTsgLy8gQXR0YWNoIEhUTUwgYXVkaW8gdGFnIHRvIHRoZSBET01cbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLSAgLy9cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgcGxheWVyIHRhZyBhbmQgc2V0IGxvb3Avdm9sdW1lIHZhbHVlc1xuICAgKiovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX3BsYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0FVRElPJyk7IC8vIENyZWF0ZSBIVE1MIGF1ZGlvIHRhZ1xuICAgIHRoaXMuX3BsYXllci5pZCA9ICdtemstYXVkaW8tcGxheWVyJzsgLy8gQXNzaWduIHBsYXllciBJRFxuICAgIHRoaXMuc2V0Vm9sdW1lKDEpOyAvLyBJbml0aWFsaXplIHZvbHVtZSB0byBpdHMgbWF4aW11bSB2YWx1ZSwgcHJlZnNcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTGlzdGVuIHRvIGVuZGVkIHRyYWNrIGV2ZW50IG9uIGF1ZGlvIHBsYXllclxuICAgKiovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgdGhpcy5fdHJhY2tFbmRlZC5iaW5kKHRoaXMpKTsgLy8gSGFuZGxlIHRyYWNrIGVuZCBwbGF5YmFjayBldmVudFxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYXR0YWNoXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQXBwZW5kIGF1ZGlvIHBsYXllciB0byB0aGUgRE9NIHVzaW5nIGEgZnJhZ21lbnRcbiAgICoqL1xuICBfYXR0YWNoKCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpOyAvLyBGcmFnbWVudCBjcmVhdGlvblxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX3BsYXllcik7IC8vIEFwcGVuZCBhdWRpbyBwbGF5ZXIgdG8gdGhlIGZyYWdtZW50XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcmFnbWVudCk7IC8vIEFwcGVuZCBmcmFnbWVudCB0byB0aGUgZG9jdW1lbnQgYm9keVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZ2V0UHJvZ3Jlc3NcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDb21wdXRlIGFuZCByZXR1cm5zIHRoZSBjdXJyZW50IHRyYWNrIHByb2dyZXNzaW9uIGluIHRoZSBwbGF5ZXJcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIHRyYWNrIHByb2dyZXNzaW9uIGluIGNvbXBsZXRpb24gcGVyY2VudGFnZSBpbiByYW5nZSBbMCwgMTAwXVxuICAgKiovXG4gIF9nZXRQcm9ncmVzcygpIHtcbiAgICByZXR1cm4gVXRpbHMucHJlY2lzaW9uUm91bmQoKHRoaXMuX3BsYXllci5jdXJyZW50VGltZSAqIDEwMCkgLyB0aGlzLl9wbGF5ZXIuZHVyYXRpb24sIDMpIHx8IDA7IC8vIENvbXB1dGUgcGVyY2VudGFnZSBmcm9tIGN1cnJlbnQgdGltZVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc2V0UHJvZ3Jlc3NcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgcHJvZ3Jlc3Npb24gcGVyY2VudGFnZSBvbiBjdXJyZW50IHRyYWNrXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gVGhlIHByb2dyZXNzaW9uIHBlcmNlbnRhZ2UgaW4gcmFuZ2UgWzAsIDEwMF1cbiAgICoqL1xuICBfc2V0UHJvZ3Jlc3MocGVyY2VudGFnZSkge1xuICAgIGlmICh0eXBlb2YgcGVyY2VudGFnZSAhPT0gJ251bWJlcicpIHsgLy8gQmFkIGZvcm1hdCBmb3IgdmFsdWVcbiAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgIGNvZGU6ICdJTlZBTElEX1BST0dSRVNTJyxcbiAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgPT09IDApIHsgLy8gV2hlbiBwbGF5ZXIgaXMgc3RvcHBlZCwgY3VycmVudFRpbWUgPSAwLiBXZSBkb24ndCBkbyBhbnl0aGluZ1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwZXJjZW50YWdlIDw9IDApIHsgLy8gQm91bmQgbG93ZXIgdmFsdWVcbiAgICAgIHBlcmNlbnRhZ2UgPSAwO1xuICAgIH1cblxuICAgIGlmIChwZXJjZW50YWdlID4gMTAwKSB7IC8vIEJvdW5kIHVwcGVyIHZhbHVlXG4gICAgICBwZXJjZW50YWdlID0gMTAwO1xuICAgIH1cblxuICAgIHRoaXMuX3BsYXllci5jdXJyZW50VGltZSA9IChwZXJjZW50YWdlICogdGhpcy5fcGxheWVyLmR1cmF0aW9uKSAvIDEwMDsgLy8gQXBwbHkgcGVyY2VudGFnZSB0byB0b3RhbCBkdXJhdGlvblxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc2V0Vm9sdW1lXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IHRoZSBwbGF5ZXIgdm9sdW1lIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2b2x1bWUgdmFsdWUgdG8gc2V0IGluIHJhbmdlIFswLCAxXVxuICAgKiovXG4gIF9zZXRWb2x1bWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykgeyAvLyBCYWQgZm9ybWF0IGZvciB2YWx1ZVxuICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgY29kZTogJ0lOVkFMSURfVk9MVU1FJyxcbiAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA8PSAwKSB7IC8vIEJvdW5kIGxvd2VyIHZhbHVlXG4gICAgICB0aGlzLm11dGUoKTtcbiAgICAgIHRoaXMuX3ZvbHVtZSA9IDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gMSkgeyAvLyBCb3VuZCB1cHBlciB2YWx1ZVxuICAgICAgdmFsdWUgPSAxO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc011dGVkKSB7IC8vIFJlc3RvcmUgbXV0ZSBzdGF0ZSBpZiBuZWVkZWRcbiAgICAgIHRoaXMudW5tdXRlKCk7IC8vIFVuIG11dGUgcGxheWJhY2tcbiAgICAgIHRoaXMuc2V0Vm9sdW1lKHZhbHVlKTsgLy8gQ2FsbCBhZ2FpbiBzZXRWb2x1bWUgd2l0aCBwcmV2aW91cyB2YWx1ZVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BsYXllci52b2x1bWUgPSBVdGlscy5wcmVjaXNpb25Sb3VuZCh2YWx1ZSwgMik7IC8vIEFzc2lnbiBuZXcgdm9sdW1lIHZhbHVlICh0cnVuY2F0ZWQgd2l0aCAyIGRlY2ltYWxzKVxuICAgIHRoaXMuX3ZvbHVtZSA9IHRoaXMuX3BsYXllci52b2x1bWU7IC8vIFN0b3JlIG9sZCB2b2x1bWUgdmFsdWVcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3RyYWNrRW5kZWRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBY3Rpb24gdG8gdGFrZSB3aGVuIHRoZSBjdXJyZW50IHRyYWNrIHJlYWNoZXMgaXRzIGVuZFxuICAgKiovXG4gIF90cmFja0VuZGVkKCkge1xuICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlOyAvLyBVcGRhdGUgcGxheWxpbmcgc3RhdGVcbiAgICBtemsudHJhY2tFbmRlZCgpO1xuICB9XG5cblxuICAvLyAgLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVNdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgdGhlIG11dGUgc3RhdHVzIG9mIHRoZSBwbGF5ZXJcbiAgICoqL1xuICB0b2dnbGVNdXRlKCkge1xuICAgIGlmICghdGhpcy5faXNNdXRlZCkge1xuICAgICAgdGhpcy5tdXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5tdXRlKCk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVQbGF5XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgdGhlIHBsYXliYWNrIHN0YXRlIG9mIHRoZSBwbGF5ZXJcbiAgICoqL1xuICB0b2dnbGVQbGF5KCkge1xuICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0UHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZC9TdWJzdHJhY3QgdGhlIGFtb3VudCAocGVyY2VudGFnZSkgdG8gdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgKHBlcmNlbnRhZ2UpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSBQZXJjZW50YWdlIHZhbHVlIHRvIGFkanVzdCBwcm9ncmVzcyBpbiByYW5nZSBbMCwgMTAwXVxuICAgKiovXG4gIGFkanVzdFByb2dyZXNzKGFtb3VudCkge1xuICAgIHRoaXMuX3NldFByb2dyZXNzKHRoaXMuX2dldFByb2dyZXNzKCkgKyBhbW91bnQpOyAvLyBJbm5lciBjYWxsIHdpdGggY3VycmVudCBwcm9ncmVzc2lvblxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGp1c3RWb2x1bWVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZC9TdWJzdHJhY3QgdGhlIGFtb3VudCB0byB0aGUgY3VycmVudCB2b2x1bWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIFZvbHVtZSB0byBhZGQvc3Vic3RyYWN0IGluIHJhbmdlIFswLCAxXVxuICAgKiovXG4gIGFkanVzdFZvbHVtZShhbW91bnQpIHtcbiAgICB0aGlzLl9zZXRWb2x1bWUodGhpcy5fdm9sdW1lICsgYW1vdW50KTsgLy8gSW5uZXIgY2FsbFxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBjaGFuZ2VUcmFja1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlIHRoZSBwbGF5ZXIgc291cmNlIGFuZCBzdGFydCB0aGUgcGxheWJhY2sgb25jZSByZWFkeSB0byBwbGF5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgcGF0aCB0byB0aGUgdHJhY2sgKGxvY2FsIG9yIGhvc3RlZClcbiAgICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gcGxheWVyIGlzIG9wZXJhdGluZ1xuICAgKiovXG4gIGNoYW5nZVRyYWNrKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7IC8vIEJhZCBmb3JtYXQgdmFsdWVcbiAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICBjb2RlOiAnSU5WQUxJRF9UUkFDS19VUkwnLFxuICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvYWRlZExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9wbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBsb2FkZWRMaXN0ZW5lcik7IC8vIFJlbW92ZSBsb2FkZWQgdHJhY2sgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5wbGF5KCk7IC8vIENhbGwgcGxheWVyIHBsYXkgbWV0aG9kIChub3QgYWN0dWFsbHkgcGxheSBhZnRlciB0aGF0IGxpbmUpXG4gICAgICAgIHJlc29sdmUoKTsgLy8gUmVzb2x2ZSBwcm9taXNlXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7IC8vIFN0b3AgYW55IHByZXZpb3VzIHBsYXliYWNrXG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9wbGF5ZXIuc3JjID0gdXJsOyAvLyBTZXQgbmV3IHRyYWNrIHVybFxuICAgICAgdGhpcy5fcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbG9hZGVkTGlzdGVuZXIpOyAvLyBBZGQgbG9hZGVkIHRyYWNrIGxpc3RlbmVyXG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHBsYXlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN3YXAgcGxheWluZyBzdGF0ZSBhbmQgc3RhcnQgcGxheWJhY2sgYXQgY3VycmVudFRpbWVcbiAgICoqL1xuICBwbGF5KCkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIuc3JjKSB7IC8vIEFwcGx5IG9ubHkgaWYgc3JjIGlzIGRlZmluZWRcbiAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7IC8vIFNldCBwbGF5aW5nIHN0YXRlIHRvIHRydWVcbiAgICAgIHRoaXMuX3BsYXllci5wbGF5KCk7IC8vIFN0YXJ0IHBsYXllciBlZmVjdGl2ZSBwbGF5YmFja1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcGF1c2VcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN3YXAgcGxheWluZyBzdGF0ZSBhbmQgcGF1c2UgcGxheWJhY2sgYXQgY3VycmVudFRpbWVcbiAgICoqL1xuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyLnNyYykgeyAvLyBBcHBseSBvbmx5IGlmIHNyYyBpcyBkZWZpbmVkXG4gICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTsgLy8gU2V0IHBsYXlpbmcgc3RhdGUgdG8gZmFsc2VcbiAgICAgIHRoaXMuX3BsYXllci5wYXVzZSgpOyAvLyBQYXVzZSBwbGF5ZXIgcGxheWJhY2tcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN0b3BcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN0b3AgcGxheWJhY2sgYW5kIHJlbW92ZSBzb3VyY2UgZnJvbSBwbGF5ZXIgYXR0cmlidXRlc1xuICAgKiovXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci5zcmMpIHsgLy8gQXBwbHkgb25seSBpZiBzcmMgaXMgZGVmaW5lZFxuICAgICAgdGhpcy5fcGxheWVyLnBhdXNlKCk7IC8vIFBhdXNlIHBsYXllciBwbGF5YmFja1xuICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7IC8vIFNldCBwbGF5aW5nIHN0YXRlIHRvIGZhbHNlXG4gICAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgPSAwO1xuICAgICAgLy90aGlzLl9wbGF5ZXIuZHVyYXRpb24gPSAwO1xuICAgICAgdGhpcy5fcGxheWVyLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7IC8vIFJlbW92ZSBzcmMgYXR0cmlidXRlIGZyb20gcGxheWVyIChzaW5jZSB0aGlzLl9wbGF5ZXIuc3JjID0gbnVsbCBkb2Vzbid0IGRlbGV0ZSBzcmMpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBtdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgcGxheWVyIGVmZmVjdGl2ZSB2b2x1bWUgdG8gemVyb1xuICAgKiovXG4gIG11dGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc011dGVkKSB7IC8vIEF2b2lkIG11bHRpIGNhbGxcbiAgICAgIHRoaXMuX2lzTXV0ZWQgPSB0cnVlOyAvLyBTZXQgbXV0ZSBzdGF0ZSB0byB0cnVlXG4gICAgICB0aGlzLl9wbGF5ZXIudm9sdW1lID0gMDsgLy8gTXV0ZSBhdWRpbyBwbGF5ZXJcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVubXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVzdG9yZSBwbGF5ZXIgdm9sdW1lIHRvIHByZXZpb3VzIGl0cyB2YWx1ZVxuICAgKiovXG4gIHVubXV0ZSgpIHtcbiAgICBpZiAodGhpcy5faXNNdXRlZCkgeyAvLyBBdm9pZCBtdWx0aSBjYWxsXG4gICAgICBsZXQgdm9sdW1lID0gMC41OyAvLyBQcmV2ZW50IG9sZCB2b2x1bWUgdmFsdWUgd2FzIHplcm8sIHdlIG5lZWQgdG8gcmVzdG9yZSBhdCBoYWxmLCB0byBhdm9pZCB1bm11dGluZyB0byB2b2x1bWUgPSAwXG5cbiAgICAgIGlmICh0aGlzLl92b2x1bWUgIT09IDApIHsgLy8gT2xkIHZvbHVtZSAhPSAwXG4gICAgICAgIHZvbHVtZSA9IHRoaXMuX3ZvbHVtZTsgLy8gV2UgcmVzdG9yZSB0aGUgcHJldmlvdXMgdm9sdW1lIG90aGVyd2lzZVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc011dGVkID0gZmFsc2U7IC8vIFNldCBtdXRlIHN0YXRlIHRvIGZhbHNlXG4gICAgICB0aGlzLnNldFZvbHVtZSh2b2x1bWUpOyAvLyBSZXN0b3JlIG9sZCB2b2x1bWUgdmFsdWVcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlcGVhdFRyYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiByZXN0YXJ0IGltbWVkaWF0ZWx5IHRoZSBjdXJyZW50IHRyYWNrIGluIHRoZSBwbGF5ZXJcbiAgICoqL1xuICByZXBlYXRUcmFjaygpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyLnNyYykgeyAvLyBBcHBseSBvbmx5IGlmIHNyYyBpcyBkZWZpbmVkXG4gICAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgPSAwOyAvLyBSZXNldCBjdXJyZW50IHRpbWVcbiAgICAgIHRoaXMucGxheSgpOyAvLyBTdGFydCBwbGF5YmFja1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZ2V0U291cmNlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgT2N0b2JlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBwbGF5ZXIgY3VycmVudCBzb3VyY2UgdXJsIGlmIGV4aXN0aW5nLCBvdGhlcndpc2UgcmV0dXJucyBOb25lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIHBsYXllciBjdXJyZW50IHNvdXJjZSB1cmxcbiAgICoqL1xuICBnZXRTb3VyY2UoKSB7XG4gICAgbGV0IHNvdXJjZSA9ICdOb25lJztcblxuICAgIGlmICh0aGlzLl9wbGF5ZXIuc3JjICE9PSBudWxsKSB7XG4gICAgICBzb3VyY2UgPSB0aGlzLl9wbGF5ZXIuc3JjO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGhhc1NvdXJjZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hlY2sgaWYgcGxheWVyIGhhcyBhIGxvYWRlZCB0cmFja1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUaGUgcHJlc2VuY2Ugb2YgYSBzb3VyY2UgaW4gcGxheWVyIHN0YXRlXG4gICAqKi9cbiAgaGFzU291cmNlKCkge1xuICAgIGxldCBoYXNTb3VyY2UgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9wbGF5ZXIuc3JjKSB7XG4gICAgICBoYXNTb3VyY2UgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNTb3VyY2U7XG4gIH1cblxuXG4gIC8vICAtLS0tICBHRVRURVIgICAtLS0tICAvL1xuXG5cbiAgZ2V0SXNQbGF5aW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG4gIH1cblxuXG4gIGdldElzTXV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTXV0ZWQ7XG4gIH1cblxuXG4gIGdldFZvbHVtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdm9sdW1lO1xuICB9XG5cblxuICBnZXRQcm9ncmVzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UHJvZ3Jlc3MoKTtcbiAgfVxuXG5cbiAgZ2V0RHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllci5kdXJhdGlvbjtcbiAgfVxuXG5cbiAgZ2V0Q3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllci5jdXJyZW50VGltZTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFNFVFRFUiAgIC0tLS0gIC8vXG5cblxuICBzZXRQcm9ncmVzcyhwZXJjZW50YWdlKSB7XG4gICAgdGhpcy5fc2V0UHJvZ3Jlc3MocGVyY2VudGFnZSk7XG4gIH1cblxuXG4gIHNldFZvbHVtZSh2YWx1ZSkge1xuICAgIHRoaXMuX3NldFZvbHVtZSh2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFVzZXIge1xuXG5cbiAgLyoqIEBzdW1tYXJ5IDxoMT5NYW5hWmVhaydzIHVzZXIgY2xhc3M8L2gxPlxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5UaGlzIGNsYXNzIHN0b3JlcyBldmVyeXRoaW5nIHVzZWZ1bCBhYm91dCB0aGUgdXNlci48YnI+XG4gICAqIEl0IHN0b3JlcyBpdHMgb3duIGF0dHJpYnV0ZXMgYW5kIHByb3ZpZGUgYSBtZXRob2QgdG8gdGVzdCB0aGUgdXNlcidzIHBlcm1pc3Npb25zIChmcm9udGVuZCBvbmx5LCB0aGUgYmFja2VuZCBkb2VzIGl0cyBvd24gdGVzdCBmb3IgdGhpcykuPGJyPlxuICAgKiBBbGwgdXNlciBtZW1iZXJzIG11c3QgYmUgYWNjZXNzZWQgdGhyb3VnaCBnZXR0ZXJzIGFuZCBzZXR0ZXJzLjxicj5cbiAgICogVGhpcyBvYmplY3QgaXMgYSA8YSBocmVmPVwiTXprLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Nems8L2E+J3MgYXR0cmlidXRlLCB0aGF0IGNhbiBiZSB1c2VkIGZyb20gYW55d2hlcmUgKDxjb2RlPm16ay51c2VyPC9jb2RlPikuPC9ibG9ja3F1b3RlPiAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IC0gVGhlIHVzZXIncyBnb2QgZmF0aGVyJ3MgaW52aXRlIGNvZGUgKi9cbiAgICB0aGlzLl9nb2RmYXRoZXJDb2RlID0gJyc7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7U3RyaW5nfSAtIFRoZSB1c2VyJ3MgZ29kIGZhdGhlcidzIG5hbWUgKi9cbiAgICB0aGlzLl9nb2RmYXRoZXJOYW1lID0gJyc7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7TnVtYmVyfSAtIFRoZSB1c2VyJ3MgY3VycmVudCBncm91cCBpZCAqL1xuICAgIHRoaXMuX2dyb3VwSWQgPSAtMTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IC0gVGhlIHVzZXIncyBjdXJyZW50IGdyb3VwIG5hbWUgKi9cbiAgICB0aGlzLl9ncm91cE5hbWUgPSAnJztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IC0gVGhlIHVzZXIncyBpZCAqL1xuICAgIHRoaXMuX2lkID0gLTE7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7U3RyaW5nfSAtIFRoZSB1c2VyJ3MgaW52aXRlIGNvZGUgaGFzaCAqL1xuICAgIHRoaXMuX2ludml0ZUNvZGUgPSAnJztcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtCb29sZWFufSAtIFRoZSB1c2VyJ3MgYWRtaW4gc3RhdHVzICovXG4gICAgdGhpcy5faXNBZG1pbiA9IGZhbHNlO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge0FycmF5fSAtIFRoZSB1c2VyJ3MgcGVybWlzc2lvbnMgKDQtZ3JhbXMgaXRlbXMsIHNlZSA8Y29kZT5hcHAvdXRpbHMucHk6cG9wdWxhdGVEQigpPC9jb2RlPikgKi9cbiAgICB0aGlzLl9wZXJtaXNzaW9ucyA9IFtdO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge1N0cmluZ30gLSBUaGUgdXNlcidzIHVzZXJuYW1lICovXG4gICAgdGhpcy5fdXNlcm5hbWUgPSAnJztcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgaGFzUGVybWlzc2lvblxuICAgKiBAbWVtYmVyb2YgVXNlclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGVzdCBpZiB0aGUgdXNlciBoYXMgYSBnaXZlbiBwZXJtaXNzaW9uLCB1c2luZyB0aGUgNC1ncmFtcyBkZWZpbmVkIGluIDxjb2RlPmFwcC91dGlscy5weTpwb3B1bGF0ZURCKCk8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHBlcm1pc3Npb25Db2RlIC0gVGhlIHBlcm1pc3Npb24gY29kZSB0byB0ZXN0LCBpdCBtdXN0IGJlIGEgZm91ciBjYXBzIGxldHRlcnNcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdXNlciBpcyBncmFudGVkLCBmYWxzZSBvdGhlcndpc2UgKi9cbiAgaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uQ29kZSkge1xuICAgIHJldHVybiB0aGlzLl9wZXJtaXNzaW9ucy5pbmNsdWRlcyhwZXJtaXNzaW9uQ29kZSk7XG4gIH1cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldE1lbWJlcnNcbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlNldCBtZW1iZXJzIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gPGNvZGU+R0VUPC9jb2RlPiByZXNwb25zZSBmcm9tIHVybCA8Y29kZT51c2VyL2dldEluZm9ybWF0aW9uLzwvY29kZT4uPC9ibG9ja3F1b3RlPlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBzZXJ2ZXIgcmVzcG9uc2Ugb2JqZWN0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLkdPREZBVEhFUl9DT0RFIC0gVGhlIHVzZXIncyBnb2RmYXRoZXIgaW52aXRhdGlvbiBjb2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLkdPREZBVEhFUl9OQU1FIC0gVGhlIHVzZXIncyBnb2RmYXRoZXIgbmFtZVxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5HUk9VUF9JRCAtIFRoZSB1c2VyJ3MgZ3JvdXAgaWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuR1JPVVBfTkFNRSAtIFRoZSB1c2VyJ3MgZ3JvdXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuVVNFUl9JRCAtIFRoZSB1c2VyJ3MgaWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuSU5WSVRFX0NPREUgLSBUaGUgdXNlcidzIGludml0YXRpb24gY29kZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuSVNfQURNSU4gLSBUaGUgdXNlcidzIGFkbWluIHN0YXR1c1xuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLlBFUk1JU1NJT05TIC0gVGhlIHVzZXIncyBwZXJtaXNzaW9uc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5VU0VSTkFNRSAtIFRoZSB1c2VyJ3MgdXNlcm5hbWUgKi9cbiAgc2V0TWVtYmVycyhvcHRpb25zKSB7XG4gICAgdGhpcy5fYXZhdGFyUGF0aCA9IG9wdGlvbnMuQVZBVEFSX1BBVEg7XG4gICAgdGhpcy5fZ29kZmF0aGVyQ29kZSA9IG9wdGlvbnMuR09ERkFUSEVSX0NPREU7XG4gICAgdGhpcy5fZ29kZmF0aGVyTmFtZSA9IG9wdGlvbnMuR09ERkFUSEVSX05BTUU7XG4gICAgdGhpcy5fZ3JvdXBJZCA9IG9wdGlvbnMuR1JPVVBfSUQ7XG4gICAgdGhpcy5fZ3JvdXBOYW1lID0gb3B0aW9ucy5HUk9VUF9OQU1FO1xuICAgIHRoaXMuX2lkID0gb3B0aW9ucy5VU0VSX0lEO1xuICAgIHRoaXMuX2ludml0ZUNvZGUgPSBvcHRpb25zLklOVklURV9DT0RFO1xuICAgIHRoaXMuX2lzQWRtaW4gPSBvcHRpb25zLklTX0FETUlOO1xuICAgIHRoaXMuX3Blcm1pc3Npb25zID0gb3B0aW9ucy5QRVJNSVNTSU9OUztcbiAgICB0aGlzLl91c2VybmFtZSA9IG9wdGlvbnMuVVNFUk5BTUU7XG4gIH1cblxuXG4gIC8vICAtLS0tICBHRVRURVIgIC0tLS0gIC8vXG5cblxuICAvKiogPHN0cm9uZz5nZXR0ZXI6Z29kZmF0aGVyTmFtZTwvc3Ryb25nPlxuICAgKiBAdHlwZSB7U3RyaW5nfSAqL1xuICBnZXQgZ29kZmF0aGVyTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ29kZmF0aGVyTmFtZTtcbiAgfVxuXG5cbiAgLyoqIDxzdHJvbmc+Z2V0dGVyOmlkPC9zdHJvbmc+XG4gICAqIEB0eXBlIHtOdW1iZXJ9ICovXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuXG4gIC8qKiA8c3Ryb25nPmdldHRlcjp1c2VybmFtZTwvc3Ryb25nPlxuICAgKiBAdHlwZSB7U3RyaW5nfSAqL1xuICBnZXQgdXNlcm5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJuYW1lO1xuICB9XG5cbiAgZ2V0IGF2YXRhclBhdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F2YXRhclBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi4vY29yZS9QbGF5ZXIuanMnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9jb21wb25lbnRzL0NvbGxlY3Rpb24uanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBmcm9udGVuZCBtb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBNYW5hWmVhayBhYnN0cmFjdCBtb2RlbHMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgc2Vzc2lvblxuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3BsYXllciA9IHt9O1xuICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLl9hY3RpdmVUcmFjayA9IG51bGw7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgcGxheWVyLCB1c2VyIGNvbGxlY3Rpb25cbiAgICoqL1xuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgdGhpcy5fY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQTEFZRVIgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGNoYW5nZVRyYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSB0aGUgY3VycmVudCB0cmFjayBpbiB0aGUgcGxheWVyIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gdXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdHJhY2sgdXJsIHRvIHJlYWQgc3RyZWFtIGZyb21cbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgY2hhbmdlVHJhY2soaWQsIHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRyYWNrID0gdGhpcy5nZXRUcmFja0J5SWQoaWQpO1xuICAgICAgdGhpcy5fcGxheWVyLmNoYW5nZVRyYWNrKHVybCkudGhlbihyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlUGxheVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgcGxheWJhY2sgb24gdGhlIHBsYXllclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICB0b2dnbGVQbGF5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3BsYXllci50b2dnbGVQbGF5KCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzdG9wUGxheWJhY2tcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU3RvcCB0aGUgcGxheWVyIHBsYXliYWNrXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIHN0b3BQbGF5YmFjaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIuc3RvcCgpO1xuICAgICAgdGhpcy5fYWN0aXZlVHJhY2sgPSBudWxsO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgbXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBNdXRlIHRoZSBwbGF5ZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgbXV0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIubXV0ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdW5tdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVuTXV0ZSB0aGUgcGxheWVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIHVubXV0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIudW5tdXRlKCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVNdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRvZ2dsZSB0aGUgbXV0ZSBzdGF0dXMgb2YgdGhlIHBsYXllclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICB0b2dnbGVNdXRlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3BsYXllci50b2dnbGVNdXRlKCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGp1c3RWb2x1bWVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRqdXN0IHRoZSBwbGF5YmFjayB2b2x1bWUgZnJvbSBhIGdpdmVuIGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gUG9zaXRpdmUgb3IgbmVnYXRpdmUgZmxvYXQgYW1vdW50IG9mIHZvbHVtZSBpbiByYW5nZSBbLTEsIDFdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIGFkanVzdFZvbHVtZShhbW91bnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIuYWRqdXN0Vm9sdW1lKGFtb3VudCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzZXRWb2x1bWVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IHRoZSBwbGF5YmFjayB2b2x1bWUgZnJvbSBhIGdpdmVuIHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2b2x1bWUgLSBQb3NpdGl2ZSBvciBuZWdhdGl2ZSBmbG9hdCB2b2x1bWUgdmFsdWUgaW4gcmFuZ2UgWzAsIDFdXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIHNldFZvbHVtZSh2b2x1bWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGp1c3RQcm9ncmVzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGp1c3QgdGhlIHBsYXliYWNrIHByb2dyZXNzIGZyb20gYSBnaXZlbiBhbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIFBvc2l0aXZlIG9yIG5lZ2F0aXZlIGZsb2F0IGFtb3VudCBvZiBwcm9ncmVzcyBpbiByYW5nZSBbLTEwMCwgMTAwXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBhZGp1c3RQcm9ncmVzcyhhbW91bnQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIuYWRqdXN0UHJvZ3Jlc3MoYW1vdW50KTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFByb2dyZXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgcGxheWJhY2sgcHJvZ3Jlc3MgZnJvbSBhIGdpdmVuIGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gcHJvZ3Jlc3MgLSBUaGUgcHJvZ3Jlc3Npb24gcGVyY2VudGFnZSBbMCwgMTAwXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBzZXRQcm9ncmVzcyhwcm9ncmVzcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3BsYXllci5zZXRQcm9ncmVzcyhwcm9ncmVzcyk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIENPTExFQ1RJT04gTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGluaXRDb2xsZWN0aW9uXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdXNlciBjb2xsZXRpb24gYWNjb3JkaW5nIHRvIHVzZXIgcmVzcG9uc2UgKGZyb20gY29udHJvbGxlciBtemsuanMpXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSAtIFRoZSBzZXJ2ZXIgcmVwb25zZSBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSByZXNwb25zZS5ET05FIC0gVGhlIHJlcXVlc3Qgc3RhdHVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25zZS5FUlJPUl9LRVkgLSBUaGUgZXJyb3Iga2V5IHRvIGV2ZW50dWFsbHkgdXNlXG4gICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlLkNPTExFQ1RJT04gLSBUaGUgcmF3IHVzZXIgY29sbGVjdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBpbml0Q29sbGVjdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UuRE9ORSAmJiByZXNwb25zZS5FUlJPUl9LRVkgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLkNPTExFQ1RJT04ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5uZXdMaWJyYXJ5KClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9jb2xsZWN0aW9uLmdldEFjdGl2ZVBsYXlsaXN0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5idWlsZFVzZXJDb2xsZWN0aW9uKHJlc3BvbnNlKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuX2NvbGxlY3Rpb24uZ2V0QWN0aXZlUGxheWxpc3QoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlc3BvbnNlLkVSUk9SX0tFWSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBnZXRUcmFja0J5SWRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgdHJhY2sgdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gaWQsIHNlYXJjaGluZyBpbiBmdWxsIHVzZXIgY29sbGVjdGlvbiAob2J2aW91c2x5IGJydXRhbClcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gVGhlIHRyYWNrIGlkIHRvIGdldCBpbiBjb2xsZWN0aW9uc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSBtYXRjaGluZyB0cmFjayBvciBudWxsXG4gICAqKi9cbiAgZ2V0VHJhY2tCeUlkKGlkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2xsZWN0aW9uLl9wbGF5bGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fY29sbGVjdGlvbi5fcGxheWxpc3RzW2ldLl9hcnRpc3RzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fY29sbGVjdGlvbi5fcGxheWxpc3RzW2ldLl9hcnRpc3RzW2pdLmFsYnVtcy5sZW5ndGg7ICsraykge1xuICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5fY29sbGVjdGlvbi5fcGxheWxpc3RzW2ldLl9hcnRpc3RzW2pdLmFsYnVtc1trXS50cmFja3MubGVuZ3RoOyArK2wpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsZWN0aW9uLl9wbGF5bGlzdHNbaV0uX2FydGlzdHNbal0uYWxidW1zW2tdLnRyYWNrc1tsXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb24uX3BsYXlsaXN0c1tpXS5fYXJ0aXN0c1tqXS5hbGJ1bXNba10udHJhY2tzW2xdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9nZ2xlUmVwZWF0TW9kZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9jb2xsZWN0aW9uLmdldEFjdGl2ZVBsYXlsaXN0KCkudG9nZ2xlUmVwZWF0TW9kZSgpO1xuICAgICAgcmVzb2x2ZSh0aGlzLl9jb2xsZWN0aW9uLmdldEFjdGl2ZVBsYXlsaXN0KCkucmVwZWF0TW9kZSk7XG4gICAgfSk7XG4gIH1cblxuICByZXBlYXRUcmFjaygpIHtcbiAgICB0aGlzLl9wbGF5ZXIucmVwZWF0VHJhY2soKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXQgcmVwZWF0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5nZXRBY3RpdmVQbGF5bGlzdCgpLnJlcGVhdE1vZGU7XG4gIH1cblxuICBnZXRWb2x1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllci5nZXRWb2x1bWUoKTtcbiAgfVxuICBnZXRQbGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllcjtcbiAgfVxuICBnZXRDb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uO1xuICB9XG4gIGdldEFjdGl2ZVRyYWNrKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVUcmFjaztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcbiIsImltcG9ydCBQbGF5bGlzdCBmcm9tICcuL1BsYXlsaXN0LmpzJztcbid1c2Vfc3RyaWN0JztcblxuY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBDb2xsZWN0aW9uIGNsYXNzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIHRoZSB1c2VyIGNvbGxlY3Rpb24gb2YgcGxheWxpc3RzLiBJdCBjb250YWlucyBib3RoIHRoZSBNYW5hWmVhayBsaWJyYXJpZXMsIHRoZSB1c3IgcGxheWxpc3QsIGFuZCBpbiBhIG5lYXIgZnV0dXJlLCBzaGFyZWQgcGxheWxpc3QgZnJvbSBvdGhlciB1c2Vyc1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3BsYXlsaXN0cyA9IFtdO1xuICAgIHRoaXMuX2FjdGl2ZVBsYXlsaXN0ID0gLTE7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRpYWxTY2FuXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBDb2xsZWN0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQXNrIHRoZSBzZXJ2ZXIgdG8gcGVyZm9ybSBhbiBpbml0aWFsIHNjYW4gc2VydmVyIHNpZGUgKHVzZSBvbiBhIG5ld2x5IGNyZWF0ZWQgbGlicmFyeSBvbmx5KVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGxheWxpc3QgLSBUaGUgbmV3IHBsYXlsaXN0IChsaWJyYXJ5KVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfaW5pdGlhbFNjYW4ocGxheWxpc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIExJQlJBUllfSUQ6IHBsYXlsaXN0LmdldElkKClcbiAgICAgIH07XG5cbiAgICAgIG16ay5rb211bmlrYXRvci5wb3N0KCdsaWJyYXJ5L2luaXRpYWxTY2FuLycsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tTY2FuU3RhdHVzKHBsYXlsaXN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBjaGVja1NjYW5TdGF0dXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIENvbGxlY3Rpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBc2sgdGhlIHNlcnZlciB1bnRpbCBhIGxpYnJhcnkgaGF2ZSBiZWVuIHNjYW5uZWQgYW5kIHJlcXVlc3QgdHJhY2tzIGZvciBpdFxuICAgKiBAZGVzY3JpcHRpb24gTWV0aG9kIHRoYXQgcmVjdXJzZSB3aXRoIGFuIGludGVydmFsIHRvIGFzayB0aGUgc2VydmVyIGlmIGEgbGlicmFyeSBoYXZlIGJlZW4gZnVsbHkgc2Nhbm5lZCAodXNlIG9uIGEgbmV3bHkgY3JlYXRlZCBsaWJyYXJ5IG9ubHksIGFmdGVyIF9pbml0aWFsU2NhbiBvbmx5KVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGxheWxpc3QgLSBUaGUgbmV3IHBsYXlsaXN0IChsaWJyYXJ5KVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfY2hlY2tTY2FuU3RhdHVzKHBsYXlsaXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBpbnRlcnZhbElkID0gLTE7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBQTEFZTElTVF9JRDogcGxheWxpc3QuZ2V0SWQoKVxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2hlY2tTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIG16ay5rb211bmlrYXRvci5wb3N0KCdsaWJyYXJ5L2NoZWNrU2NhblN0YXR1cy8nLCBvcHRpb25zKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLkRPTkUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgICAgICAgcGxheWxpc3QuZ2V0QXJ0aXN0c0Zyb21TZXJ2ZXIocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3JDb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGVycm9yQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRlbmQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yQ29kZSA9PiB7XG4gICAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUsXG4gICAgICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY2hlY2tTdGF0dXMoKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYnVpbGRQbGF5bGlzdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgQ29sbGVjdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkcyBhIG5ldyBwbGF5bGlzdCBmcm9tIGEgc2VydmVyIHJlc3BvbnNlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwbGF5bGlzdCAtIFRoZSByYXcgcGxheWxpc3QgdG8gYnVpbGRcbiAgICogQHBhcmFtIHtvYmplY3R9IHBsYXlsaXN0LklORk8gLSBUaGUgcGxheWxpc3QgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHBsYXlsaXN0LklORk8uSUQgLSBUaGUgcGxheWxpc3QgaWRcbiAgICogQHBhcmFtIHtib29sZWFufSBwbGF5bGlzdC5JTkZPLklTX0xJQlJBUlkgLSBUaGUgcGxheWxpc3QgaWRcbiAgICogQHBhcmFtIHtib29sZWFufSBwbGF5bGlzdC5JTkZPLklTX1BVQkxJQyAtIFRoZSBwbGF5bGlzdCBpZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGxheWxpc3QuSU5GTy5OQU1FIC0gVGhlIHBsYXlsaXN0IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsYXlsaXN0LklORk8uREVTQ1JJUFRJT04gLSBUaGUgcGxheWxpc3QgZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsYXlsaXN0LklORk8uT1dORVIgLSBUaGUgcGxheWxpc3Qgb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBsYXlsaXN0LklORk8uQVZFUkFHRV9CSVRSQVRFIC0gVGhlIHBsYXlsaXN0IGF2ZXJhZ2UgYml0cmF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcGxheWxpc3QuSU5GTy5UT1RBTF9EVVJBVElPTiAtIFRoZSBwbGF5bGlzdCB0b3RhbCBkdXJhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gcGxheWxpc3QuSU5GTy5UT1RBTF9UUkFDSyAtIFRoZSBwbGF5bGlzdCB0b3RhbCB0cmFja1xuICAgKiovXG4gIF9idWlsZFBsYXlsaXN0KHBsYXlsaXN0KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGlkOiBwbGF5bGlzdC5JTkZPLklELFxuICAgICAgaXNMaWJyYXJ5OiBwbGF5bGlzdC5JTkZPLklTX0xJQlJBUlksXG4gICAgICBpc1B1YmxpYzogcGxheWxpc3QuSU5GTy5JU19QVUJMSUMsXG4gICAgICBuYW1lOiBwbGF5bGlzdC5JTkZPLk5BTUUsXG4gICAgICBkZXNjcmlwdGlvbjogcGxheWxpc3QuSU5GTy5ERVNDUklQVElPTixcbiAgICAgIG93bmVyOiBwbGF5bGlzdC5JTkZPLk9XTkVSLFxuICAgICAgYXZlcmFnQml0UmF0ZTogcGxheWxpc3QuSU5GTy5BVkVSQUdFX0JJVFJBVEUsXG4gICAgICB0b3RhbER1cmF0aW9uOiBwbGF5bGlzdC5JTkZPLlRPVEFMX0RVUkFUSU9OLFxuICAgICAgdG90YWxUcmFjazogcGxheWxpc3QuSU5GTy5UT1RBTF9UUkFDS1xuICAgIH07XG4gICAgLy8gVE9ETyBoYW5kbGUgcGxheWxpc3QuVklFV1xuICAgIHRoaXMuX3BsYXlsaXN0cy5wdXNoKG5ldyBQbGF5bGlzdChvcHRpb25zKSk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYnVpbGRVc2VyQ29sbGVjdGlvblxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBDb2xsZWN0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHBsYXlsaXN0IHJlbGF0aXZlIGFydGlzdHMgb2JqZWN0IGZyb20gc2VydmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSAtIFRoZSBzZXJ2ZXIgcmVwb25zZSBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSByZXNwb25zZS5ET05FIC0gVGhlIHJlcXVlc3Qgc3RhdHVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25zZS5FUlJPUl9LRVkgLSBUaGUgZXJyb3Iga2V5IHRvIGV2ZW50dWFsbHkgdXNlXG4gICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlLkNPTExFQ1RJT04gLSBUaGUgdXNlciBjb2xsZWN0aW9uIG9mIHBsYXlsaXN0c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBidWlsZFVzZXJDb2xsZWN0aW9uKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5DT0xMRUNUSU9OLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHRoaXMuX2J1aWxkUGxheWxpc3QocmVzcG9uc2UuQ09MTEVDVElPTltpXSk7XG4gICAgICAgIHRoaXMuX3BsYXlsaXN0c1t0aGlzLl9wbGF5bGlzdHMubGVuZ3RoIC0gMV0uZ2V0QXJ0aXN0c0Zyb21TZXJ2ZXIocmVzcG9uc2UpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlUGxheWxpc3QgPSAwOyAvLyBUT0RPIDogc3RvcmUgaW4gYWNrIHVzZXIgbGF0ZXN0IGFjdGl2ZSBwbGF5bGlzdCAoa2VlcCB0aGUgSSBpbmRleClcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIG5ld0xpYnJhcnlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ29sbGVjdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEdldCBwbGF5bGlzdCByZWxhdGl2ZSBhcnRpc3RzIG9iamVjdCBmcm9tIHNlcnZlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBuZXdMaWJyYXJ5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCFtemsudXNlci5oYXNQZXJtaXNzaW9uKCdMSUJSJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGVja1NlcnZlclJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5ET05FKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlUGxheWxpc3QgPSAwO1xuICAgICAgICAgIHRoaXMuX2J1aWxkUGxheWxpc3QocmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuX2luaXRpYWxTY2FuKHRoaXMuX3BsYXlsaXN0c1swXSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgU2hvcnRjdXQucmVzdW1lQWxsKCk7IC8vIFJlc3RvcmUgYWxsIHNob3J0Y3V0c1xuICAgICAgICAgICAgICBtemsudmlldy5yZW1vdmVPdmVybGF5KCk7IC8vIFJlbW92ZSBtb2RhbCBmcm9tIG1haW4gY29udGFpbmVyXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgICBjb2RlOiByZXNwb25zZS5FUlJPUl9LRVksXG4gICAgICAgICAgICBmcm9udGVuZDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2hlY2tNb2RhbFZhbHVlcyA9IChmb3JtVmFsdWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgTkFNRTogZm9ybVZhbHVlcy5uYW1lLFxuICAgICAgICAgIFVSTDogZm9ybVZhbHVlcy5wYXRoLFxuICAgICAgICAgIENPTlZFUlQ6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgbXprLmtvbXVuaWthdG9yLnBvc3QoJ2xpYnJhcnkvbmV3LycsIG9wdGlvbnMpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY2hlY2tTZXJ2ZXJSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2gocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgICAgY29kZTogcmVzcG9uc2UsXG4gICAgICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIFNob3J0Y3V0LnBhdXNlQWxsKCk7IC8vIFBhdXNlIGFsbCBzaG9ydGN1dHMgKGVzcGFzY2lhbGx5IHRoZSBzdG9wIHByb3BhZ2F0aW9uKVxuICAgICAgbXprLnZpZXcuZGlzcGxheU1vZGFsKHtcbiAgICAgICAgICBuYW1lOiAnbmV3bGlicmFyeScsXG4gICAgICAgICAgY2FsbGJhY2s6IGNoZWNrTW9kYWxWYWx1ZXNcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBHRVRURVIgTUVUSE9EUyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIGdldEFjdGl2ZVBsYXlsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5bGlzdHNbdGhpcy5fYWN0aXZlUGxheWxpc3RdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb247XG4iLCJpbXBvcnQgVHJhY2sgZnJvbSAnLi9UcmFjay5qcyc7XG4ndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgUGxheWxpc3Qge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgUGxheWxpc3QgY2xhc3NcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBQbGF5bGlzdCBvYmplY3QgdGhhdCBzdG9yZXMgYWxsIGluZm9ybWF0aW9uIGFib3V0IGEgc2luZ2xlIHBsYXlsaXN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIHBsYXlsaXN0IGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmlkIC0gVGhlIHBsYXlsaXN0IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc0xpYnJhcnkgLSBJcyBwbGF5bGlzdCBhIGxpYnJhcnlcbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzUHVibGljIC0gSXMgcGxheWxpc3QgcHVibGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgcGxheWxpc3QgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5kZXNjcmlwdGlvbiAtIFRoZSBwbGF5bGlzdCBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5vd25lciAtIFRoZSBwbGF5bGlzdCBvd25lclxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5hdmVyYWdlQml0UmF0ZSAtIFRoZSBwbGF5bGlzdCBhdmVyYWdlIGJpdHJhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMudG90YWxEdXJhdGlvbiAtIFRoZSBwbGF5bGlzdCB0b3RhbCBkdXJhdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy50b3RhbFRyYWNrIC0gVGhlIHBsYXlsaXN0IHRvdGFsIHRyYWNrXG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX2lkID0gb3B0aW9ucy5pZDtcbiAgICB0aGlzLl9pc0xpYnJhcnkgPSBvcHRpb25zLmlzTGlicmFyeTtcbiAgICB0aGlzLl9pc1B1YmxpYyA9IG9wdGlvbnMuaXNQdWJsaWM7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IG9wdGlvbnMuZGVzY3JpcHRpb247XG4gICAgdGhpcy5fb3duZXIgPSBvcHRpb25zLm93bmVyO1xuICAgIHRoaXMuX2F2Z0JpdHJhdGUgPSBvcHRpb25zLmF2ZXJhZ0JpdFJhdGU7XG4gICAgdGhpcy5fdG90YWxEdXJhdGlvbiA9IG9wdGlvbnMudG90YWxEdXJhdGlvbjtcbiAgICB0aGlzLl90b3RhbFRyYWNrID0gb3B0aW9ucy50b3RhbFRyYWNrO1xuICAgIHRoaXMuX3JlcGVhdE1vZGUgPSAwOyAvLyAwID0gb2ZmIHwgMSA9IG9uZSB8IDIgPSBhbGxcblxuICAgIHRoaXMuX3Jhd0FydGlzdHMgPSBbXTsgLy8gQXJ0aXN0IGFycmF5IHRoYXQgY29udGFpbnMgYWxidW1zIGFycmF5IHRoYXQgY29udGFpbnMgdHJhY2tzIGFycmF5XG4gICAgdGhpcy5fYXJ0aXN0cyA9IFtdO1xuICAgIHRoaXMuX3RyYWNrcyA9IFtdO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9nZXRBcnRpc3RzTGF6eUxvYWRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFBsYXlsaXN0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRmV0Y2ggYSBidW5jaCBvZiB0cmFja3NcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgLSBUaGUgbGF6eSBsb2FkIGNhbGwgbnVtYmVyXG4gICAqKi9cbiAgX2dldEFydGlzdHNMYXp5TG9hZChzdGVwKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIFBMQVlMSVNUX0lEOiB0aGlzLl9pZCxcbiAgICAgIFJFUVVFU1RfTlVNQkVSOiBzdGVwXG4gICAgfTtcblxuICAgIG16ay5rb211bmlrYXRvci5wb3N0KCdwbGF5bGlzdC9zaW1wbGlmaWVkTGF6eUxvYWRpbmcvJywgb3B0aW9ucylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuRE9ORSkge1xuICAgICAgICAgIHRoaXMuX2NvbnZlcnRSYXdBcnRpc3RzKHJlc3BvbnNlLlJFU1VMVClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZ2V0QXJ0aXN0c0xhenlMb2FkKHN0ZXAgKyAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5FUlJPUl9NU0cgPT0gXCJudWxsXCIgfHwgcmVzcG9uc2UuRVJST1JfTVNHID09IFwiXCIgfHwgcmVzcG9uc2UuRVJST1JfTVNHID09IG51bGwpIHsgLy8gU3VjY2Vzc2Z1bGx5IGxvYWRlZCBhbGxcbiAgICAgICAgICAgIEV2ZW50cy5maXJlKGBUcmFja0xvYWRlZC0ke3RoaXMuX2lkfWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3JDb2RlID0+IHtcbiAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICBjb2RlOiBlcnJvckNvZGUsXG4gICAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jb252ZXJ0UmF3QXJ0aXN0c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUGxheWxpc3RcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDb252ZXJ0IHJhdyBhcnRpc3RzIGludG8gY2xlYW5zZWQgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9jb252ZXJ0UmF3QXJ0aXN0cyhyYXdBcnRpc3RzQXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd0FydGlzdHNBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBhbGJ1bXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByYXdBcnRpc3RzQXJyYXlbaV0uQUxCVU1TLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgY29uc3QgdHJhY2tzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByYXdBcnRpc3RzQXJyYXlbaV0uQUxCVU1TW2pdLlRSQUNLUy5sZW5ndGg7ICsraykge1xuICAgICAgICAgICAgdHJhY2tzLnB1c2gobmV3IFRyYWNrKHtcbiAgICAgICAgICAgICAgYWxidW06IHJhd0FydGlzdHNBcnJheVtpXS5BTEJVTVNbal0sXG4gICAgICAgICAgICAgIGFydGlzdDogcmF3QXJ0aXN0c0FycmF5W2ldLk5BTUUsXG4gICAgICAgICAgICAgIHJhd1RyYWNrOiByYXdBcnRpc3RzQXJyYXlbaV0uQUxCVU1TW2pdLlRSQUNLU1trXVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFsYnVtcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiByYXdBcnRpc3RzQXJyYXlbaV0uQUxCVU1TW2pdLklELFxuICAgICAgICAgICAgbmFtZTogcmF3QXJ0aXN0c0FycmF5W2ldLkFMQlVNU1tqXS5OQU1FLFxuICAgICAgICAgICAgdHJhY2tzOiB0cmFja3NcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FydGlzdHMucHVzaCh7XG4gICAgICAgICAgaWRzOiByYXdBcnRpc3RzQXJyYXlbaV0uSURTLFxuICAgICAgICAgIG5hbWU6IHJhd0FydGlzdHNBcnJheVtpXS5OQU1FLFxuICAgICAgICAgIGFsYnVtczogYWxidW1zXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZ2V0QXJ0aXN0c0Zyb21TZXJ2ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWxpc3RcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBHZXQgcGxheWxpc3QgcmVsYXRpdmUgYXJ0aXN0cyBvYmplY3QgZnJvbSBzZXJ2ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIC0gVGhlIHNlcnZlciByZXBvbnNlIG9iamVjdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlc3BvbnNlLkRPTkUgLSBUaGUgcmVxdWVzdCBzdGF0dXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlc3BvbnNlLkVSUk9SX0tFWSAtIFRoZSBlcnJvciBrZXkgdG8gZXZlbnR1YWxseSB1c2VcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgZ2V0QXJ0aXN0c0Zyb21TZXJ2ZXIocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLkRPTkUpIHtcbiAgICAgICAgY29uc3QgZXZlbnRPcHRpb25zID0ge1xuICAgICAgICAgIG5hbWU6IGBUcmFja0xvYWRlZC0ke3RoaXMuX2lkfWAsXG4gICAgICAgICAgb25lU2hvdDogdHJ1ZSAvLyBFdmVudCBuZWVkcyB0byBiZSBkaXNtaXNzZWQgYWZ0ZXIgcmVxdWVzdCBjb21wbGV0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgRXZlbnRzLnJlZ2lzdGVyKGV2ZW50T3B0aW9ucywgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2dldEFydGlzdHNMYXp5TG9hZCgwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5FUlJPUl9LRVkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlUmVwZWF0TW9kZSgpIHtcbiAgICB0aGlzLl9yZXBlYXRNb2RlID0gKyt0aGlzLl9yZXBlYXRNb2RlICUgMztcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXQgcmVwZWF0TW9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVwZWF0TW9kZTtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBnZXRBcnRpc3RzKCkge1xuICAgIHJldHVybiB0aGlzLl9hcnRpc3RzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBUcmFjayBjbGFzc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN0b3JlcyBhbGwgbWV0YWRhdGEgZnJvbSBhIHJhdyBmb3JtYXRcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgdHJhY2sgbWV0YWRhdGFcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYWxidW0gLSBUcmFjayBhbGJ1bVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hcnRpc3QgLSBUcmFjayBhcnRpc3RcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucmF3VHJhY2sgLSBSYXcgdHJhY2sgc2VydmVyIHJlc3BvbnNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJhd1RyYWNrLkJJVFJBVEUgLSBUcmFjayBiaXRyYXRlIChrYnBzKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yYXdUcmFjay5DT01QT1NFUiAtIFRyYWNrIGNvbXBvc2VyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJhd1RyYWNrLkNPVkVSIC0gVHJhY2sgY292ZXIgdXJsXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJhd1RyYWNrLkRVUkFUSU9OIC0gVHJhY2sgZHVyYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmF3VHJhY2suR0VOUkUgLSBUcmFjayBnZW5yZVxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yYXdUcmFjay5JRCAtIFRyYWNrIGlkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJhd1RyYWNrLlBFUkZPUk1FUiAtIFRyYWNrIHBlcmZvcm1lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yYXdUcmFjay5USVRMRSAtIFRyYWNrIHRpdGxlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJhd1RyYWNrLllFQVIgLSBUcmFjayB5ZWFyXG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuYWxidW0gPSBvcHRpb25zLmFsYnVtO1xuICAgIHRoaXMuYXJ0aXN0ID0gb3B0aW9ucy5hcnRpc3Q7XG4gICAgdGhpcy5iaXRyYXRlID0gb3B0aW9ucy5yYXdUcmFjay5CSVRSQVRFO1xuICAgIHRoaXMuY29tcG9zZXIgPSBvcHRpb25zLnJhd1RyYWNrLkNPTVBPU0VSO1xuICAgIHRoaXMuY292ZXIgPSBvcHRpb25zLnJhd1RyYWNrLkNPVkVSO1xuICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLnJhd1RyYWNrLkRVUkFUSU9OO1xuICAgIHRoaXMuZ2VucmUgPSBvcHRpb25zLnJhd1RyYWNrLkdFTlJFO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLnJhd1RyYWNrLklEO1xuICAgIHRoaXMubW9vZGJhciA9IG9wdGlvbnMucmF3VHJhY2suTU9PREJBUjtcbiAgICB0aGlzLnBlcmZvcm1lciA9IG9wdGlvbnMucmF3VHJhY2suUEVSRk9STUVSO1xuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnJhd1RyYWNrLlRJVExFO1xuICAgIHRoaXMueWVhciA9IG9wdGlvbnMucmF3VHJhY2suWUVBUjtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJhY2s7XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIEVycm9ycyB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBFcnJvcnMgc3lzdGVtIHdpdGggZmVlZGJhY2tcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSYWlzZSBib3RoIGEgbG9nIGFuZCBhIHVzZXIgZmVlYmFjayBkZXBlbmRpbmcgb24gbGFuZy8qLmpzb24gZmlsZXMgKGFsbCBzZXZlcml0eS9rZXkvdmFsdWUgbXV0IGZpZ3VyZSBpbiBpdCkuIFRoZSBjbGFzcyBhbHNvIGxvZ3MgVHlwZUVycm9ycyBpbiBKYXZhU2NyaXB0XG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX3ZlcmJvc2UgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMudmVyYm9zZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLl92ZXJib3NlID0gb3B0aW9ucy52ZXJib3NlO1xuICAgIH1cblxuICAgIHRoaXMuX3RyYWNlID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudHJhY2UgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy50cmFjZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLl90cmFjZSA9IG9wdGlvbnMudHJhY2U7XG4gICAgfVxuXG4gICAgdGhpcy5fY3NzUnVsZXMgPSB7XG4gICAgICBpbmZvOiAnJyxcbiAgICAgIHdhcm5pbmc6ICcnLFxuICAgICAgZXJyb3I6ICcnXG4gICAgfTtcblxuICAgIC8vIFRob3NlIHZhbHVlIG5lZWRzIHRvIG1hdGNoIHRoZSBvbmVzIGluICoqKi5zY3NzIGZvciBpbmZvLCB3YXJuaW5nIGFuZCBlcnJvclxuICAgIHRoaXMuX2Nzc1J1bGVzLmluZm8gPSAnY29sb3I6IHJnYig0NCwgNDQsIDQ4KTsgZm9udC13ZWlnaHQ6IGJvbGQ7JztcbiAgICB0aGlzLl9jc3NSdWxlcy53YXJuaW5nID0gJ2NvbG9yOiByZ2IoNDQsIDQ0LCA0OCk7IGZvbnQtd2VpZ2h0OiBib2xkOyc7XG4gICAgdGhpcy5fY3NzUnVsZXMuZXJyb3IgPSAnY29sb3I6IHJnYigyNTUsIDAsIDQ4KTsgZm9udC13ZWlnaHQ6IGJvbGQ7JztcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZ2V0Q2FsbGVyTmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRXJyb3JzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEdldCBjYWxsZXIgZnVuY3Rpb24gbmFtZSBkZXBlbmRpbmcgb24gZ2l2ZW4gYnJvd3NlclxuICAgKiBAcGFyYW0ge29iamVjdH0gYnJvd3NlcnMgLSBDb250YWlucyBhIGJyb3dzZXIgbGlzdCBhc3NvY2lhdGVkIHdpdGggYSBib29sZWFuIHRvIGtub3cgd2hpY2ggYnJvd3NlciBpcyBpbiB1c2VcbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGNhbGxlciBmdW5jdGlvbiBuYW1lXG4gICAqKi9cbiAgX2dldENhbGxlck5hbWUoYnJvd3Nlcikge1xuICAgIC8vIE9yaWdpbmFsIGNvZGUgZnJvbTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vaXJpc2xpLzcxNmI2ZGFjZDNmMTUxY2UyYjdlXG4gICAgbGV0IGNhbGxlciA9IChuZXcgRXJyb3IoKSkuc3RhY2s7IC8vIENyZWF0ZSBlcnJvciBhbmQgZ2V0IGl0cyBjYWxsIHN0YWNrXG5cbiAgICBpZiAoYnJvd3Nlci5maXJlZm94KSB7XG4gICAgICBjYWxsZXIgPSBjYWxsZXIuc3BsaXQoJ1xcbicpWzJdOyAvLyBHZXQgd2hvIGNhbGxlZCByYWlzZSAoMCA9IHRoaXMsIDEgPSByYWlzZSwgMiA9IHJhaXNlIGNhbGxlcilcbiAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9cXEArLywgJyAoJyk7IC8vIENoYW5nZSBgQGAgdG8gYChgXG4gICAgICBjYWxsZXIgKz0gJyknO1xuICAgIH0gZWxzZSBpZiAoYnJvd3Nlci5jaHJvbWUpIHtcbiAgICAgIGNhbGxlciA9IGNhbGxlci5zcGxpdCgnXFxuJylbM107IC8vIEdldCB3aG8gY2FsbGVkIHJhaXNlICgwID0gdGhpcywgMSA9IHJhaXNlLCAyID0gcmFpc2UgY2FsbGVyKVxuICAgICAgY2FsbGVyID0gY2FsbGVyLnJlcGxhY2UoL15FcnJvclxccysvLCAnJyk7IC8vIFJlbW92ZSBDaHJvbWUgYEVycm9yYCBzdHJpbmdcbiAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9eXFxzK2F0Li8sICcnKTsgLy8gUmVtb3ZlIENocm9tZSBgYXRgIHN0cmluZ1xuICAgIH1cblxuICAgIHJldHVybiBgUmFpc2VkIGZyb20gZnVuY3Rpb24gJHtjYWxsZXJ9YDtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByYWlzZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdmVudHNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZWdpc3RlciBhIGN1c3RvbSBldmVudCB1c2luZyBhIG5hbWUgYW5kIGEgY2FsbGJhY2tcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgZXJyb3Igb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb2RlIC0gVGhlIGVycm9yIGtleSB2YWx1ZSBpbiBsYW5nLyouanNvbiBcImVycm9yc1wiIG9iamVjdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZyb250ZW5kPWZhbHNlXSAtIFRoZSBldmVudCBzdHJpbmcgaWRlbnRpZmllciAodXNlIHNwZWNpZmljIG5hbWVzKVxuICAgKiovXG4gIHJhaXNlKG9wdGlvbnMpIHtcbiAgICBsZXQgc2V2ZXJpdHkgPSAnJztcbiAgICBsZXQgdGl0bGUgPSAnJztcbiAgICBsZXQgbWVzc2FnZSA9ICcnO1xuXG4gICAgaWYgKG16ay5sYW5nLmVycm9ycy5mcm9udGVuZFtvcHRpb25zLmNvZGVdID09PSB1bmRlZmluZWQgJiYgbXprLmxhbmcuZXJyb3JzLmJhY2tlbmRbb3B0aW9ucy5jb2RlXSA9PT0gdW5kZWZpbmVkKSB7IC8vIEphdmFTY3JpcHQgc2NyaXB0aW5nIGVycm9yXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IG9wdGlvbnMuY29kZS5maWxlTmFtZS5tYXRjaCgvXFwvKFteXFwvXSspXFwvPyQvKVsxXTtcbiAgICAgIHNldmVyaXR5ID0gJ2Vycm9yJztcbiAgICAgIHRpdGxlID0gYEVycm9yIGluIEphdmFTY3JpcHQgc291cmNlIGNvZGVgO1xuICAgICAgbWVzc2FnZSA9IGAke29wdGlvbnMuY29kZS5uYW1lfSBiZWNhdXNlICR7b3B0aW9ucy5jb2RlLm1lc3NhZ2V9IGluIGZpbGUgJHtmaWxlbmFtZX0gKCR7b3B0aW9ucy5jb2RlLmxpbmVOdW1iZXJ9OiR7b3B0aW9ucy5jb2RlLmNvbHVtbk51bWJlcn0pYDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZnJvbnRlbmQpIHtcbiAgICAgIHNldmVyaXR5ID0gbXprLmxhbmcuZXJyb3JzLmZyb250ZW5kW29wdGlvbnMuY29kZV0uc2V2ZXJpdHk7XG4gICAgICB0aXRsZSA9IG16ay5sYW5nLmVycm9ycy5mcm9udGVuZFtvcHRpb25zLmNvZGVdLnRpdGxlO1xuICAgICAgbWVzc2FnZSA9IG16ay5sYW5nLmVycm9ycy5mcm9udGVuZFtvcHRpb25zLmNvZGVdLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldmVyaXR5ID0gbXprLmxhbmcuZXJyb3JzLmJhY2tlbmRbb3B0aW9ucy5jb2RlXS5zZXZlcml0eTtcbiAgICAgIHRpdGxlID0gbXprLmxhbmcuZXJyb3JzLmJhY2tlbmRbb3B0aW9ucy5jb2RlXS50aXRsZTtcbiAgICAgIG1lc3NhZ2UgPSBtemsubGFuZy5lcnJvcnMuYmFja2VuZFtvcHRpb25zLmNvZGVdLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgTm90aWZpY2F0aW9uLm5ldyh7XG4gICAgICB0eXBlOiBzZXZlcml0eSxcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl92ZXJib3NlKSB7XG4gICAgICBjb25zdCBicm93c2VyID0ge1xuICAgICAgICBmaXJlZm94OiAvZmlyZWZveC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksXG4gICAgICAgIGNocm9tZTogL2Nocm9tZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL2dvb2dsZSBpbmMvaS50ZXN0KG5hdmlnYXRvci52ZW5kb3IpIC8vIFRlc3QgdmVuZG9yIHRvIGF2b2lkIGZhbHNlIHBvc2l0aXZlXG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zLmNvZGUgPSAnd2Fybic7IC8vIFRvIGFjY2VzcyBjb25zb2xlIHByb3BlcnR5IGVhc2lseSAoc2VlIGNvbnNvbGVbdHlwZV0gY2FsbCksIGluaXQgdG8gd2FybiBpbmNlIGNvbnNvbGUud2FybmluZyBkb2Vzbid0IGV4aXN0cyAoY29uc29sZS53YXJuKCkpXG4gICAgICBjb25zdCBvdXRwdXRTdHJpbmcgPSBgJWMke21lc3NhZ2V9XFxuJHt0aGlzLl9nZXRDYWxsZXJOYW1lKGJyb3dzZXIpfWA7XG4gICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGAke3NldmVyaXR5LnRvVXBwZXJDYXNlKCl9IDogJHt0aXRsZX0gKEVycm9yLmpzKWApO1xuXG4gICAgICBpZiAoc2V2ZXJpdHkgIT09ICd3YXJuaW5nJykge1xuICAgICAgICBvcHRpb25zLmNvZGUgPSBzZXZlcml0eTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZVtvcHRpb25zLmNvZGVdKG91dHB1dFN0cmluZywgdGhpcy5fY3NzUnVsZXNbc2V2ZXJpdHldKTsgLy8gQXBwbHkgdHlwZSBhbmQgc2V2ZXJpdHkgdG8gYnVpbGQgY29uc29sZSBjYWxsXG5cbiAgICAgIGlmICh0aGlzLl90cmFjZSAmJiBzZXZlcml0eSAhPT0gJ2Vycm9yJyAmJiAoYnJvd3Nlci5maXJlZm94IHx8IChicm93c2VyLmNocm9tZSAmJiBzZXZlcml0eSAhPT0gJ3dhcm5pbmcnKSkpIHtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9ycztcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgRXZlbnRzIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEJhc2ljIGN1c3RvbSBldmVudHMgc3lzdGVtXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRXhwb3NlcyBhbiBBUEkgdG8gcmVnaXN0ZXIvdW5yZWdpc3RlciBldmVudHMgYW5kIGZpcmUgdGhlbVxuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2V2ZW50VWlkID0gMDtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByZWdpc3RlclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdmVudHNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZWdpc3RlciBhIGN1c3RvbSBldmVudCB1c2luZyBhIG5hbWUgYW5kIGEgY2FsbGJhY2tcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgZXZlbnQgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIGV2ZW50IHN0cmluZyBpZGVudGlmaWVyICh1c2Ugc3BlY2lmaWMgbmFtZXMpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMub25lU2hvdD1mYWxzZV0gLSBPbmx5IHJlZ2lzdGVyIHRoZSBldmVudCBmb3Igb25lIGNhbGwuIEF1dG9tYXRpY2FsbHkgdW5yZWdpc3RlciBhZnRlclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZXZlbnQgaWQgKHVzZWZ1bCB0byB1bnJlZ2lzdGVyIHRoZSByZWdpc3RlcmVkIGV2ZW50KVxuICAgKiovXG4gIHJlZ2lzdGVyKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb3B0aW9ucy5uYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tvcHRpb25zLm5hbWVdKSB7XG4gICAgICB0aGlzLl9ldmVudHNbb3B0aW9ucy5uYW1lXSA9IFtdO1xuICAgIH0gLy8gQ3JlYXRlIGV2ZW50IGVudHJ5IGlmIG5vdCBhbHJlYWR5IGV4aXN0aW5nXG5cbiAgICB0aGlzLl9ldmVudHNbb3B0aW9ucy5uYW1lXS5wdXNoKHtcbiAgICAgIGlkOiB0aGlzLl9ldmVudFVpZCxcbiAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgIG9uZVNob3Q6IG9wdGlvbnMub25lU2hvdCA/IG9wdGlvbnMub25lU2hvdCA6IGZhbHNlLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICB0aGlzLl9ldmVudFVpZCsrO1xuXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50VWlkOyAvLyBQb3N0IGluY3JlbWVudCB0byByZXR1cm4gdGhlIHRydWUgZXZlbnQgZW50cnkgaWQsIHRoZW4gaW5jcmVtZW50XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnJlZ2lzdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2ZW50c1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVuUmVnaXN0ZXIgYSBjdXN0b20gZXZlbnQgdXNpbmcgaXRzIGlkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB1aWQgLSBUaGUgZXZlbnQgdW5pcXVlIGlkXG4gICAqKi9cbiAgdW5yZWdpc3Rlcih1aWQpIHtcbiAgICBpZiAodHlwZW9mIHV1aWQgIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBsZXQgaSA9IHRoaXMuX2V2ZW50c1trZXldLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHsgLy8gUmV2ZXJzZSBwYXJzaW5nLCBwb3N0IGRlY3JlbWVudCBpcyBtYW5kYXRvcnkgYmMgb2Ygc3BsaWNlKClcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50c1trZXldW2ldLmlkID09PSB1aWQpIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNba2V5XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2V2ZW50c1trZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2tleV07XG4gICAgICB9IC8vIFJlbW92ZSBldmVudCBlbnRyeSBpZiBub3RoaW5nIGlzIGxpc3RlbmluZyB0byBpdFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVucmVnaXN0ZXJBbGxcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZlbnRzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVW5SZWdpc3RlciBhbGwgY3VzdG9tIGV2ZW50IHJlZ2lzdGVyZWRcbiAgICoqL1xuICB1bnJlZ2lzdGVyQWxsKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9OyAvLyBSZW1vdmUgYWxsIGVudHJ5XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBmaXJlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2ZW50c1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEZpcmUgYSBjdXN0b20gZXZlbnQgZnJvbSBpdHMgc3RyaW5nIGlkZW50aWZpZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBldmVudCBzdHJpbmcgaWRlbnRpZmllclxuICAgKiovXG4gIGZpcmUoZXZlbnROYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBsZXQgaSA9IHRoaXMuX2V2ZW50c1trZXldLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHsgLy8gUmV2ZXJzZSBwYXJzaW5nLCBwb3N0IGRlY3JlbWVudCBpcyBtYW5kYXRvcnkgYmMgb2Ygc3BsaWNlKClcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50c1trZXldW2ldLm5hbWUgPT09IGV2ZW50TmFtZSkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1trZXldW2ldLmNhbGxiYWNrKCk7XG4gICAgICAgICAgaWYgKHRoaXMuX2V2ZW50c1trZXldW2ldLm9uZVNob3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50c1trZXldLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9IC8vIFJlbW92ZSBvbmVTaG90IGxpc3RlbmVyIGZyb20gZXZlbnQgZW50cnlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4iLCIndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgbmV3TGlicmFyeShvcHRpb25zKSB7XG4gICAgbGV0IGNsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1saWJyYXJ5LWNsb3NlJyk7XG4gICAgbGV0IGNyZWF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtbmV3LWxpYnJhcnknKTtcbiAgICBsZXQgbGlicmFyeU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlicmFyeS1uYW1lJyk7XG4gICAgbGV0IGxpYnJhcnlQYXRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpYnJhcnktcGF0aCcpO1xuXG4gICAgY29uc29sZS5sb2cobGlicmFyeU5hbWUpXG4gICAgY29uc29sZS5sb2cobGlicmFyeVBhdGgpXG4gICAgY29uc29sZS5sb2coY2xvc2UpXG4gICAgY29uc29sZS5sb2coY3JlYXRlKVxuXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBTaG9ydGN1dC5yZXN1bWVBbGwoKTtcbiAgICAgIG16ay52aWV3LnJlbW92ZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIGNyZWF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2soe1xuICAgICAgICAgIG5hbWU6IGxpYnJhcnlOYW1lLnZhbHVlLFxuICAgICAgICAgIHBhdGg6IGxpYnJhcnlQYXRoLnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbDsiLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIE5vdGlmaWNhdGlvbiB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYSBub3RpZmljYXRpb24gaGFuZGxlclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBOb3RpZmljYXRpb24gQ2xhc3MgdG8gYXV0b21hdGljYWxseSBoYW5kbGUgb25lIG9yIHNldmVyYWwgbm90aWZpY2F0aW9uIG9mIGRpZmZlcmVudCB0eXBlcyBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gVGhlIG5vdGlmaWNhdGlvbiBoYW5kbGVyIGdsb2JhbCBvcHRpb25zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5wb3NpdGlvbj10b3AtcmlnaHRdIC0gPGk+dG9wLWxlZnQ7IHRvcC1yaWdodDsgYm90dG9tLWxlZnQ7IGJvdHRvbS1yaWdodDs8L2k+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aGlja0JvcmRlcj10b3BdIC0gPGk+dG9wOyBib3R0b207IGxlZnQ7IHJpZ2h0OyBub25lOzwvaT5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTMwMDBdIC0gTm90aWZpY2F0aW9uIGxpZmUgY3ljbGUgZHVyYXRpb24gKGluIG1zKSBpbiByYW5nZSBOKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMudHJhbnNpdGlvbj0xMDBdIC0gTm90aWZpY2F0aW9uIGZhZGUgYW5pbWF0aW9uIHRyYW5zaXRpb24gdGltaW5nIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heEFjdGl2ZT01XSAtIE1heGltdW0gb2Ygc2ltdWx0YW5lb3VzbHkgb3BlbmVkIG5vdGlmaWNhdGlvbiBpbiByYW5nZSBOKlxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9kaXNtaXNzQWxsTG9jayA9IGZhbHNlOyAvLyBEaXNtaXNzIGFsbCBvcGVyYXRpb24gaW4gcHJvZ3Jlc3MgZmxhZ1xuICAgIHRoaXMuX2RvbSA9IHt9OyAvLyBOb3RpZmljYXRpb24gaGFuZGxlciBjb250YWluZXJcbiAgICB0aGlzLl9hY3RpdmUgPSB7fTsgLy8gQWN0aXZlIG5vdGlmaWNhdGlvbnMgb2JqZWN0IDogcmV0cmlldmUgYSBub3RpZmljYXRpb24gdXNpbmcgaXRzIElEICh0aGlzLl9hY3RpdmVbSURdKVxuICAgIHRoaXMuX3F1ZXVlID0ge307IC8vIFF1ZXVlIG5vdGlmaWNhdGlvbnMgd2hlbiBtYXggYWN0aXZlIGhhcyBiZWVuIHJlYWNoZWRcbiAgICB0aGlzLl9oaXN0b3J5ID0gW107IC8vIE5vdGlmaWNhdGlvbiBoaXN0b3J5XG4gICAgdGhpcy5fZGVmYXVsdCA9IHt9OyAvLyBXaWxsIGNvbnRhaW4gYWxsIGRlZmF1bHQgdmFsdWUgZm9yIE5vdGlmaWNhdGlvblxuXG4gICAgdGhpcy5fcG9zaXRpb24gPSAnJztcbiAgICB0aGlzLl90aGlja0JvcmRlciA9ICcnO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl90cmFuc2l0aW9uID0gMDtcbiAgICB0aGlzLl9tYXhBY3RpdmUgPSAwO1xuXG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcbiAgICB0aGlzLl9hdHRhY2goKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENyZWF0ZSB0aGUgaGFuZGxlciBET00gZWxlbWVudCwgc2V0IGRlZmF1bHQgdmFsdWVzLCB0ZXN0IGdpdmVuIG9wdGlvbnMgYW5kIHByb3Blcmx5IGFkZCBDU1MgY2xhc3MgdG8gdGhlIGhhbmRsZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFRoZSBub3RpZmljYXRpb24gaGFuZGxlciBnbG9iYWwgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249dG9wLXJpZ2h0XSAtIDxpPnRvcC1sZWZ0OyB0b3AtcmlnaHQ7IGJvdHRvbS1sZWZ0OyBib3R0b20tcmlnaHQ7PC9pPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudGhpY2tCb3JkZXI9dG9wXSAtIDxpPnRvcDsgYm90dG9tOyBsZWZ0OyByaWdodDsgbm9uZTs8L2k+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0zMDAwXSAtIE5vdGlmaWNhdGlvbiBsaWZlIGN5Y2xlIGR1cmF0aW9uIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRyYW5zaXRpb249MTAwXSAgLSBOb3RpZmljYXRpb24gZmFkZSBhbmltYXRpb24gdHJhbnNpdGlvbiB0aW1pbmcgKGluIG1zKSBpbiByYW5nZSBOKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4QWN0aXZlPTVdIC0gTWF4aW11bSBvZiBzaW11bHRhbmVvdXNseSBvcGVuZWQgbm90aWZpY2F0aW9uIGluIHJhbmdlIE4qXG4gICAqKi9cbiAgX2luaXQob3B0aW9ucykge1xuICAgIHRoaXMuX2RvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpOyAvLyBOb3RpZmljYXRpb24gaGFuZGxlciBET00gY29udGFpbmVyXG4gICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbi1jb250YWluZXInKTsgLy8gU2V0IHByb3BlciBDU1MgY2xhc3NcblxuICAgIHRoaXMuX2RlZmF1bHQgPSB7XG4gICAgICBoYW5kbGVyOiB7XG4gICAgICAgIHBvc2l0aW9uOiAndG9wLXJpZ2h0JyxcbiAgICAgICAgdGhpY2tCb3JkZXI6ICd0b3AnLFxuICAgICAgICBkdXJhdGlvbjogNTAwMCxcbiAgICAgICAgdHJhbnNpdGlvbjogMjAwLFxuICAgICAgICBtYXhBY3RpdmU6IDEwXG4gICAgICB9LFxuICAgICAgbm90aWZpY2F0aW9uOiB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgaWNvbmxlc3M6IGZhbHNlLFxuICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgc3RpY2t5OiBmYWxzZSxcbiAgICAgICAgcmVuZGVyVG86IHRoaXMuX2RvbSxcbiAgICAgICAgQ0J0aXRsZTogJycsXG4gICAgICAgIGNhbGxiYWNrOiBudWxsXG4gICAgICB9LFxuICAgICAgY29sb3I6IHtcbiAgICAgICAgc3VjY2VzczogJ3JnYig3NiwgMTc1LCA4MCknLFxuICAgICAgICBpbmZvOiAncmdiKDMsIDE2OSwgMjQ0KScsXG4gICAgICAgIHdhcm5pbmc6ICdyZ2IoMjU1LCAxNTIsIDApJyxcbiAgICAgICAgZXJyb3I6ICdyZ2IoMjQ0LCA2NywgNTQpJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLl9wb3NpdGlvbiA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbiA6IG9wdGlvbnMucG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbiA6IG9wdGlvbnMucG9zaXRpb247XG4gICAgdGhpcy5fdGhpY2tCb3JkZXIgPSBvcHRpb25zID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudGhpY2tCb3JkZXIgOiBvcHRpb25zLnRoaWNrQm9yZGVyID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudGhpY2tCb3JkZXIgOiBvcHRpb25zLnRoaWNrQm9yZGVyO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLmR1cmF0aW9uIDogb3B0aW9ucy5kdXJhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLmR1cmF0aW9uIDogb3B0aW9ucy5kdXJhdGlvbjtcbiAgICB0aGlzLl90cmFuc2l0aW9uID0gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRyYW5zaXRpb24gOiBvcHRpb25zLnRyYW5zaXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50cmFuc2l0aW9uIDogb3B0aW9ucy50cmFuc2l0aW9uO1xuICAgIHRoaXMuX21heEFjdGl2ZSA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5tYXhBY3RpdmUgOiBvcHRpb25zLm1heEFjdGl2ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLm1heEFjdGl2ZSA6IG9wdGlvbnMubWF4QWN0aXZlO1xuXG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uICE9PSAndG9wLWxlZnQnICYmIHRoaXMuX3Bvc2l0aW9uICE9PSAndG9wLXJpZ2h0JyAmJiB0aGlzLl9wb3NpdGlvbiAhPT0gJ2JvdHRvbS1sZWZ0JyAmJiB0aGlzLl9wb3NpdGlvbiAhPT0gJ2JvdHRvbS1yaWdodCcpIHsgLy8gSWxsZWdhbCB2YWx1ZSBmb3IgcG9zaXRpb25cbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnBvc2l0aW9uOyAvLyBEZWZhdWx0IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RoaWNrQm9yZGVyICE9PSAndG9wJyAmJiB0aGlzLl90aGlja0JvcmRlciAhPT0gJ2JvdHRvbScgJiYgdGhpcy5fdGhpY2tCb3JkZXIgIT09ICdsZWZ0JyAmJiB0aGlzLl90aGlja0JvcmRlciAhPT0gJ3JpZ2h0JyAmJiB0aGlzLl90aGlja0JvcmRlciAhPT0gJ25vbmUnKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIHRoaWNrIGJvcmRlclxuICAgICAgdGhpcy5fdGhpY2tCb3JkZXIgPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudGhpY2tCb3JkZXI7IC8vIERlZmF1bHQgdmFsdWVcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2R1cmF0aW9uICE9PSAnbnVtYmVyJyB8fCB0aGlzLl9kdXJhdGlvbiA8PSAwKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIGR1cmF0aW9uXG4gICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5kdXJhdGlvbjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9kdXJhdGlvbiA8ICh0aGlzLl90cmFuc2l0aW9uICogMikpIHsgLy8gVHJhbnNpdGlvbiBvdmVyIChkdXJhdGlvbiAvIDIpXG4gICAgICB0aGlzLl90cmFuc2l0aW9uID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRyYW5zaXRpb247IC8vIERlZmF1bHQgdmFsdWUgZm9yIF9tYXhBY3RpdmVcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX21heEFjdGl2ZSAhPT0gJ251bWJlcicgfHwgdGhpcy5fbWF4QWN0aXZlIDw9IDApIHsgLy8gSWxsZWdhbCB2YWx1ZSBmb3IgbWF4QWN0aXZlXG4gICAgICB0aGlzLl9tYXhBY3RpdmUgPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIubWF4QWN0aXZlOyAvLyBEZWZhdWx0IHZhbHVlIGZvciBfbWF4QWN0aXZlXG4gICAgfVxuXG4gICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQodGhpcy5fcG9zaXRpb24pOyAvLyBBZGQgcG9zaXRpb24gQ1NTIGNsYXNzIG9ubHkgYWZ0ZXIgdGhpcy5fcG9zaXRpb24gaXMgc3VyZSB0byBiZSBhIHZhbGlkIHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYXR0YWNoXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQXR0YWNoIHRoZSBub3RpZmljYXRpb24gaGFuZGxlciB0byB0aGUgZG9tIHVzaW5nIGEgZnJhZ21lbnRcbiAgICoqL1xuICBfYXR0YWNoKCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX2RvbSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIG1vdXNlIGV2ZW50cyBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi50aW1lb3V0SUQgLSBOb3RpZmljYXRpb24gb3duIHNldFRpbWVvdXQgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uc3RpY2t5IC0gTm90aWZpY2F0aW9uIHN0aWNreSBiZWh2YWlvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5jbG9zYWJsZSAtIE1ha2Ugbm90aWZpY2F0aW9uIGNsb3NhYmxlIGZsYWdcbiAgICoqL1xuICBfZXZlbnRzKG5vdGlmaWNhdGlvbikge1xuICAgIGxldCBjbG9zZUZpcmVkID0gZmFsc2U7IC8vIENsb3NlIGZpcmVkIGZsYWdcblxuICAgIC8vIElubmVyIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAgIGNvbnN0IF91bkRpbSA9ICgpID0+IHsgLy8gVW5kaW0gbm90aWZpY2F0aW9uXG4gICAgICBpZiAobm90aWZpY2F0aW9uLmlzRGltbWVkKSB7XG4gICAgICAgIHRoaXMuX3VuRGltKG5vdGlmaWNhdGlvbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IF9jbG9zZSA9ICgpID0+IHsgLy8gQ2xvc2Ugbm90aWZpY2F0aW9uXG4gICAgICBpZiAodGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBjb3VudGVyIERPTSBlbGVtZW50XG4gICAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgICAgdGhpcy5fZGVjcmVtZW50UmVxdWVzdENvdW50ZXIobm90aWZpY2F0aW9uLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIG5vdGlmaWNhdGlvbiBlbGVtZW50IGZyb20gdGhlIERPTSB0cmVlXG4gICAgICBlbHNlIGlmICghY2xvc2VGaXJlZCkge1xuICAgICAgICBjbG9zZUZpcmVkID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChub3RpZmljYXRpb24udGltZW91dElEKTsgLy8gQ2xlYXIgbGlmZSBjeWNsZSB0aW1lb3V0XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xvc2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2UpOyAvLyBBdm9pZCBlcnJvciB3aGVuIHNwYW0gY2xpY2tpbmcgdGhlIGNsb3NlIGJ1dHRvblxuICAgICAgICB0aGlzLl9jbG9zZShub3RpZmljYXRpb24pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBfcmVzZXRUaW1lb3V0ID0gKCkgPT4geyAvLyBSZXNldCBsaWZlIGN5Y2xlIHRpbWVvdXRcbiAgICAgIGlmICh0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjbG9zZUZpcmVkICYmICFub3RpZmljYXRpb24uaXNEaW1tZWQpIHsgLy8gT25seSByZXNldCB0aW1lb3V0IGlmIG5vIGNsb3NlIGV2ZW50IGhhcyBiZWVuIGZpcmVkXG4gICAgICAgIHRoaXMuX3Jlc2V0VGltZW91dChub3RpZmljYXRpb24pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBNb3VzZSBldmVudCBsaXN0ZW5lcnNcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSkge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgX3VuRGltLmJpbmQodGhpcykpO1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIF91bkRpbS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpZiAobm90aWZpY2F0aW9uLmNsb3NhYmxlKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlLmJpbmQodGhpcykpO1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIF9yZXNldFRpbWVvdXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYnVpbGRVSVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkcyB0aGUgRE9NIGVsZW1lbnQgdGhhdCBjb250YWlucyBhbmQgdGhhdCBhZGFwdHMgdG8gYWxsIGdpdmVuIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24udHlwZSAtIEVycm9yLCBXYXJuaW5nLCBJbmZvLCBTdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24udGl0bGUgLSBOb3RpZmljYXRpb24gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbi5tZXNzYWdlIC0gTm90aWZpY2F0aW9uIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaWNvbmxlc3MgLSBObyBpY29uIGZsYWdcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbi50aGlja0JvcmRlciAtIE5vdGlmaWNhdGlvbiBib3JkZXIgc2lkZSAob3ZlcnJpZGUgaGFuZGxlciBzaWRlIHZhbHVlKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5jbG9zYWJsZSAtIE1ha2Ugbm90aWZpY2F0aW9uIGNsb3NhYmxlIGZsYWdcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uc3RpY2t5IC0gTWFrZSBub3RpZmljYXRpb24gc3RpY2t5IGZsYWdcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbi5DQnRpdGxlIC0gTm90aWZpY2F0aW9uIGNhbGxiYWNrIHRpdGxlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG5vdGlmaWNhdGlvbi5jYWxsYmFjayAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayBidXR0b25cbiAgICogQHJldHVybnMge29iamVjdH0gRW5oYW5jZWQgYW5kIHJlYWR5IG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICoqL1xuICBfYnVpbGRVSShub3RpZmljYXRpb24pIHtcbiAgICBub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID0gMTtcbiAgICBub3RpZmljYXRpb24udG90YWxSZXF1ZXN0Q291bnQgPSAxO1xuXG4gICAgLy8gQ3JlYXRlIG5vdGlmaWNhdGlvbiBET00gZWxlbWVudHNcbiAgICBub3RpZmljYXRpb24uZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5jbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWFpbnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSDYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLm1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XG5cbiAgICAvLyBDbGFzcyBhc3NpZ25hdGlvblxuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24tY29udGFpbmVyJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQtY29udGFpbmVyJyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5jbG9zZS5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuXG4gICAgLy8gQ2hhbmdpbmcgYm9yZGVyIHNpZGVcbiAgICBpZiAobm90aWZpY2F0aW9uLnRoaWNrQm9yZGVyID09PSAndG9wJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCd0b3AtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdib3R0b20nKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2JvdHRvbS1ib3JkZXInKTtcbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi50aGlja0JvcmRlciA9PT0gJ2xlZnQnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2xlZnQtYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdyaWdodCcpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgncmlnaHQtYm9yZGVyJyk7XG4gICAgfVxuXG4gICAgLy8gVGV4dCBtb2RpZmljYXRpb25cbiAgICBub3RpZmljYXRpb24uZG9tLm1haW50aXRsZS5pbm5lckhUTUwgPSBub3RpZmljYXRpb24udGl0bGU7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlLmlubmVySFRNTCA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xvc2UuaW5uZXJIVE1MID0gJyYjeDI3MTY7JztcblxuICAgIC8vIFR5cGUgc3BlY2lmaWNhdGlvbiAodGl0bGUsIGljb24sIGNvbG9yKVxuICAgIGlmIChub3RpZmljYXRpb24udHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ3N1Y2Nlc3MnKTtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zcmMgPSAnL3N0YXRpYy9pbWcvZmVlZGJhY2svTm90aWZpY2F0aW9uLmpzL3N1Y2Nlc3Muc3ZnJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi50eXBlID09PSAnd2FybmluZycpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgnd2FybmluZycpO1xuICAgICAgaWYgKCFub3RpZmljYXRpb24uaWNvbmxlc3MpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5pY29uLnNyYyA9ICcvc3RhdGljL2ltZy9mZWVkYmFjay9Ob3RpZmljYXRpb24uanMvd2FybmluZy5zdmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zcmMgPSAnL3N0YXRpYy9pbWcvZmVlZGJhY2svTm90aWZpY2F0aW9uLmpzL2Vycm9yLnN2Zyc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2luZm8nKTtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zcmMgPSAnL3N0YXRpYy9pbWcvZmVlZGJhY2svTm90aWZpY2F0aW9uLmpzL2luZm8uc3ZnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaWNvbmxlc3Mtd2lkdGgnKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20udGV4dC5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLm1lc3NhZ2UpO1xuXG4gICAgLy8gQWRkIGNhbGxiYWNrIGJ1dHRvbiBhbmQgbGlzdGVuZXIgaWYgbmVlZGVkXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5jYWxsYmFjaykge1xuICAgICAgY29uc3QgY2FsbGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcbiAgICAgIGNhbGxiYWNrQnV0dG9uLmlubmVySFRNTCA9IG5vdGlmaWNhdGlvbi5DQnRpdGxlO1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0LmFwcGVuZENoaWxkKGNhbGxiYWNrQnV0dG9uKTtcblxuICAgICAgY2FsbGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5jYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRmlsbCBub3RpZmljYXRpb24gRE9NIGVsZW1lbnRcbiAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLmljb24pO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5kb20uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS50ZXh0KTtcblxuICAgIC8vIEFwcGVuZCBjbG9zZSBidXR0b24gaWYgbmVlZGVkXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5jbG9zYWJsZSkge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLmNsb3NlKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gZmluYWwgbm90aWZpY2F0aW9uXG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zdGFydFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENhbGwgdGhpcyBtZXRob2QgdG8gYWRkIHRoZSBuZXcgbm90aWZpY2F0aW9uIHRvIHRoZSBET00gY29udGFpbmVyLCBhbmQgbGF1bmNoIGl0cyBsaWZlIGN5Y2xlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiovXG4gIF9zdGFydChub3RpZmljYXRpb24pIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fYWN0aXZlKS5sZW5ndGggPj0gdGhpcy5fbWF4QWN0aXZlKSB7XG4gICAgICB0aGlzLl9xdWV1ZVtub3RpZmljYXRpb24uaWRdID0gbm90aWZpY2F0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSA9IG5vdGlmaWNhdGlvbjsgLy8gQXBwZW5kIHRoZSBuZXcgbm90aWZpY2F0aW9uIHRvIHRoZSBfYWN0aXZlIG9iamVjdFxuXG4gICAgICB0aGlzLl9ldmVudHMobm90aWZpY2F0aW9uKTsgLy8gTGlzdGVuIHRvIG1vdXNlIGV2ZW50cyBvbiB0aGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb25cbiAgICAgIHRoaXMuX29wZW4obm90aWZpY2F0aW9uKTsgLy8gT3BlbiB0aGUgbmV3IG5vdGlmaWNhdGlvblxuXG4gICAgICBub3RpZmljYXRpb24udGltZW91dElEID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0NvdW50ZXIobm90aWZpY2F0aW9uKTsgLy8gQ2hlY2sgbm90aWZpY2F0aW9uIHJlcXVlc3QgY291bnQgdG8gYWN0IGFjY29yZGluZ2x5XG4gICAgICB9LCBub3RpZmljYXRpb24uZHVyYXRpb24pOyAvLyBVc2UgTm90aWZpY2F0aW9uIG1hc3RlciBkdXJhdGlvblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9vcGVuXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gT3BlbiBhbmQgYWRkIHRoZSBub3RpZmljYXRpb24gdG8gdGhlIGNvbnRhaW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiovXG4gIF9vcGVuKG5vdGlmaWNhdGlvbikge1xuICAgIC8vIFJldmVyc2UgaW5zZXJ0aW9uIHdoZW4gbm90aWZpY2F0aW9ucyBhcmUgb24gYm90dG9tXG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uID09PSAnYm90dG9tLXJpZ2h0JyB8fCB0aGlzLl9wb3NpdGlvbiA9PT0gJ2JvdHRvbS1sZWZ0Jykge1xuICAgICAgbm90aWZpY2F0aW9uLnJlbmRlclRvLmluc2VydEJlZm9yZShub3RpZmljYXRpb24uZG9tLCBub3RpZmljYXRpb24ucmVuZGVyVG8uZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5yZW5kZXJUby5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24ub3BlbmVkID0gRGF0ZS5ub3coKTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2Nsb3NlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2xvc2UgYW5kIHJlbW92ZSB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIGNvbnRhaW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNDbG9zaW5nIC0gQWxyZWFkeSBjbG9zaW5nIGZsYWdcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLnJlbmRlclRvIC0gRE9NIG9iamVjdCB0byByZW5kZXIgdGhlIG5vdGlmaWNhdGlvbiBpblxuICAgKiovXG4gIF9jbG9zZShub3RpZmljYXRpb24pIHtcbiAgICBpZiAobm90aWZpY2F0aW9uLmlzQ2xvc2luZykgeyAvLyBBdm9pZCBkb3VibGUgY2xvc2Ugb24gYSBub3RpZmljYXRpb24gKGluIGNhc2UgZGlzbWlzcy9kaXNtaXNzQWxsIGlzIHRyaWdnZXJyZWQgd2hlbiBub3RpZmljYXRpb24gaXMgYWxyZWFkeSBjbG9zaW5nKVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvbi5pc0Nsb3NpbmcgPSB0cnVlOyAvLyBMb2NrIG5vdGlmaWNhdGlvbiB0byBvbmUgZmFkZU91dCBhbmltYXRpb25cbiAgICBub3RpZmljYXRpb24uY2xvc2VkID0gRGF0ZS5ub3coKTtcbiAgICBub3RpZmljYXRpb24uZWZmZWN0aXZlRHVyYXRpb24gPSBub3RpZmljYXRpb24uY2xvc2VkIC0gbm90aWZpY2F0aW9uLm9wZW5lZDtcbiAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIC8vIFRPRE8gaGFkbGUgdGhpcy5fdHJhbnNpdGlvbiBpbnN0ZWFkIG9mIGhhcmQgY29kZSBpbiBjc3NcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZUhpc3Rvcnkobm90aWZpY2F0aW9uKTtcbiAgICAgIG5vdGlmaWNhdGlvbi5yZW5kZXJUby5yZW1vdmVDaGlsZChub3RpZmljYXRpb24uZG9tKTsgLy8gUmVtb3ZlIHRoaXMgbm90aWZpY2F0aW9uIGZyb20gdGhlIERPTSB0cmVlXG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9xdWV1ZSkubGVuZ3RoID4gMCkgeyAvLyBOb3RpZmljYXRpb24gcXVldWUgaXMgbm90IGVtcHR5XG4gICAgICAgIHRoaXMuX3N0YXJ0KHRoaXMuX3F1ZXVlW09iamVjdC5rZXlzKHRoaXMuX3F1ZXVlKVswXV0pOyAvLyBTdGFydCBmaXJzdCBxdWV1ZWQgbm90aWZpY2F0aW9uXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9xdWV1ZVtPYmplY3Qua2V5cyh0aGlzLl9xdWV1ZSlbMF1dOyAvLyBTaGlmdCBxdWV1ZSBvYmplY3RcbiAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXModGhpcy5fYWN0aXZlKS5sZW5ndGggPT09IDApIHsgLy8gQ2hlY2sgdGhpcy5fYWN0aXZlIGVtcHR5bmVzc1xuICAgICAgICB0aGlzLl9kaXNtaXNzQWxsTG9jayA9IGZhbHNlOyAvLyBVbmxvY2sgZGlzbWlzc0FsbExvY2tcbiAgICAgIH1cbiAgICB9LCAxMDAwKTsgLy8gVHJhbnNpdGlvbiB2YWx1ZSBzZXQgaW4gX25vdGlmaWNhdGlvbi5zY3NzIFRPRE8gc2FtZSBhcyBmZXcgbGluZXMgdXBcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbmNyZW1lbnRSZXF1ZXN0Q291bnRlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIGEgbm90aWZpY2F0aW9uIGlzIHJlcXVlc3RlZCBhbm90aGVyIHRpbWVcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50IC0gTm90aWZpY2F0aW9uIGlubmVyIGNhbGwgY291bnRlclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNEaW1tZWQgLSBOb3RpZmljYXRpb24gZGltbWVkIHN0YXR1cyAob25seSB1c2VmdWwgaWYgbm90aWZpY2F0aW9uLnN0aWNreSBpcyB0cnVlKVxuICAgKiovXG4gIF9pbmNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24pIHtcbiAgICArK25vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQ7IC8vIEluY3JlbWVudCBub3RpZmljYXRpb24ucmVxdWVzdENvdW50XG5cbiAgICBpZiAobm90aWZpY2F0aW9uLnRvdGFsUmVxdWVzdENvdW50IDwgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCkge1xuICAgICAgbm90aWZpY2F0aW9uLnRvdGFsUmVxdWVzdENvdW50ID0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgY291bnRlciBET00gZWxlbWVudFxuICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID4gMSkge1xuICAgICAgLy8gVXBkYXRlIGV4aXN0aW5nIGNvdW50ZXJcbiAgICAgIGlmIChub3RpZmljYXRpb24uZG9tLmNvdW50ZXIpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyLmlubmVySFRNTCA9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBjb3VudGVyIERPbSBlbGVtZW50XG4gICAgICBlbHNlIHtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uY291bnRlci5jbGFzc0xpc3QuYWRkKCdjb3VudGVyJyk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uY291bnRlci5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVW5kaW0gbm90aWZpY2F0aW9uIGlmIGl0IGlzIGEgc3RpY2t5L2RpbW1lZCBvbmVcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiBub3RpZmljYXRpb24uaXNEaW1tZWQpIHtcbiAgICAgIHRoaXMuX3VuRGltKG5vdGlmaWNhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGVhY2ggbm90aWZpY2F0aW9uIGN5Y2xlIGVuZCB0byB1cGRhdGUgaXRzIGlubmVyIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNEaW1tZWQgLSBOb3RpZmljYXRpb24gZGltbWVkIHN0YXR1cyAob25seSB1c2VmdWwgaWYgbm90aWZpY2F0aW9uLnN0aWNreSBpcyB0cnVlKVxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljYXRpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSAtIFRvIGZvcmNlIHRoZSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50IGRlY3JlbWVudGF0aW9uXG4gICAqKi9cbiAgX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbiwgZm9yY2UpIHtcbiAgICBpZiAobm90aWZpY2F0aW9uLnN0aWNreSAmJiAhZm9yY2UpIHtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmlzRGltbWVkKSB7XG4gICAgICAgIHRoaXMuX2RpbShub3RpZmljYXRpb24pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7XG4gICAgLS1ub3RpZmljYXRpb24ucmVxdWVzdENvdW50OyAvLyBEZWNyZW1lbnQgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudFxuXG4gICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY291bnRlci5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBjb3VudGVyIGVsZW1lbnQgZnJvbSB0aGUgRE9NIHRyZWVcbiAgICBlbHNlIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20ucmVtb3ZlQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5jb3VudGVyKTtcbiAgICAgIGRlbGV0ZSBub3RpZmljYXRpb24uZG9tLmNvdW50ZXI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2NoZWNrQ291bnRlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIHdpbGwgcmVzZXQgdGhlIGZhZGVvdXQvZGltIHRpbWVvdXQgb3IgY2xvc2UvZGltIHRoZSBub3RpZmljYXRpb24gZGVwZW5kaW5nIG9uIGl0cyByZXF1ZXN0Q291bnRcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50IC0gTm90aWZpY2F0aW9uIGlubmVyIGNhbGwgY291bnRlclxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24udGltZW91dElEIC0gTm90aWZpY2F0aW9uIG93biBzZXRUaW1lb3V0IElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICoqL1xuICBfY2hlY2tDb3VudGVyKG5vdGlmaWNhdGlvbikge1xuICAgIC8vIFRoaXMgbm90aWZpY2F0aW9uIGFzIHN0aWxsIG1vcmUgdGhhbiBvbmUgY3ljbGUgdG8gbGl2ZVxuICAgIGlmIChub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID4gMSkge1xuICAgICAgdGhpcy5fZGVjcmVtZW50UmVxdWVzdENvdW50ZXIobm90aWZpY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG5vdGlmaWNhdGlvbiByZWFjaGVkIHRoZSBlbmQgb2YgaXRzIGxpZmUgY3ljbGVcbiAgICBlbHNlIHtcbiAgICAgIGlmIChub3RpZmljYXRpb24ucmVuZGVyVG8uY29udGFpbnMobm90aWZpY2F0aW9uLmRvbSkpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChub3RpZmljYXRpb24udGltZW91dElEKTtcbiAgICAgICAgbm90aWZpY2F0aW9uLnN0aWNreSA/IHRoaXMuX2RpbShub3RpZmljYXRpb24pIDogdGhpcy5fY2xvc2Uobm90aWZpY2F0aW9uKTsgLy8gRmFkZU91dC9EaW0gZGVwZW5kaW5nIG9uIHN0aWNreSBiZWhhdmlvclxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jbGVhclJlcXVlc3RDb3VudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE1ldGhvZCB0aGF0IGNsZWFyIGV2ZXJ5IHBlbmRpbmcgcmVxdWVzdFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiovXG4gIF9jbGVhclJlcXVlc3RDb3VudChub3RpZmljYXRpb24pIHtcbiAgICBub3RpZmljYXRpb24ucmVxdWVzdENvdW50ID0gMTtcbiAgICBub3RpZmljYXRpb24uZG9tLnJlbW92ZUNoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgZGVsZXRlIG5vdGlmaWNhdGlvbi5kb20uY291bnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9yZXNldFRpbWVvdXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVc2UgdGhpcyB0byByZXNldCBhIG5vdGlmaWNhdGlvbiBsaWZlIGN5Y2xlLCBhbmQgZGVsYXkgaXRzIGNsb3NlIGV2ZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRFxuICAgKiovXG4gIF9yZXNldFRpbWVvdXQobm90aWZpY2F0aW9uKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChub3RpZmljYXRpb24udGltZW91dElEKTsgLy8gQ2xlYXIgcHJldmlwb3VzIGxpZmUgY3ljbGVcblxuICAgIG5vdGlmaWNhdGlvbi50aW1lb3V0SUQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jaGVja0NvdW50ZXIobm90aWZpY2F0aW9uKTsgLy8gQ2hlY2sgbm90aWZpY2F0aW9uIHJlcXVlc3QgY291bnQgdG8gYWN0IGFjY29yZGluZ2x5XG4gICAgfSwgbm90aWZpY2F0aW9uLmR1cmF0aW9uKTsgLy8gVXNlIE5vdGlmaWNhdGlvbiBtYXN0ZXIgZHVyYXRpb25cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF91cGRhdGVIaXN0b3J5XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGEgbm90aWZpY2F0aW9uIHRvIHRoZSBoaXN0b3J5LiBNaWdodCBiZSBleGVjdXRlZCB3aGVuIGEgbm90aWZpY2F0aW9uIGlzIGJlaW5nIGNsb3NlZFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICoqL1xuICBfdXBkYXRlSGlzdG9yeShub3RpZmljYXRpb24pIHtcbiAgICAvLyBSZW1vdmUgdGhpcyBub3RpZmljYXRpb24gZnJvbSB0aGUgYWN0aXZlIG9iamVjdFxuICAgIGRlbGV0ZSB0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXTtcblxuICAgIC8vIFdvcmsgbm90aWZpY2F0aW9uIGNvcHlcbiAgICBjb25zdCBjbGVhbkVudHJ5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShub3RpZmljYXRpb24pKTtcblxuICAgIC8vIENsZWFyIG5vdGlmaWNhdGlvbiBvYmplY3QgZnJvbSB3b3JraW5nIGF0dHJpYnV0ZXNcbiAgICBkZWxldGUgY2xlYW5FbnRyeS5pc0Nsb3Npbmc7XG4gICAgZGVsZXRlIGNsZWFuRW50cnkuaXNEaW1tZWQ7XG4gICAgZGVsZXRlIGNsZWFuRW50cnkucmVxdWVzdENvdW50O1xuICAgIGRlbGV0ZSBjbGVhbkVudHJ5LnRpbWVvdXRJRDtcbiAgICBkZWxldGUgY2xlYW5FbnRyeS5yZW5kZXJUbztcbiAgICBkZWxldGUgY2xlYW5FbnRyeS5kb207XG5cbiAgICAvLyBTYXZlIG5vdGlmaWNhdGlvbiB0byB0aGUgaGlzdG9yeVxuICAgIHRoaXMuX2hpc3RvcnkucHVzaChjbGVhbkVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kaW1cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBPbmx5IHVzZWZ1bCBmb3Igc3RpY2t5IG5vdGlmaWNhdGlvbiB0aGF0IGRpbSBpbnN0ZWFkIG9mIGNsb3NlIGF0IHRoZSBlbmQgb2YgaXRzIGxpZmUgY3ljbGVcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uc3RpY2t5IC0gTm90aWZpY2F0aW9uIHN0aWNreSBiZWh2YWlvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5pc0RpbW1lZCAtIE5vdGlmaWNhdGlvbiBkaW1tZWQgc3RhdHVzIChvbmx5IHVzZWZ1bCBpZiBub3RpZmljYXRpb24uc3RpY2t5IGlzIHRydWUpXG4gICAqKi9cbiAgX2RpbShub3RpZmljYXRpb24pIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaSA9IDEwMDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVPdXQoKSB7IC8vIFN0YXJ0IGFuaW1hdGlvbiBpbW1lZGlhdGx5XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgIC0taTtcblxuICAgICAgICBpZiAoaSA9PT0gNTAgJiYgbm90aWZpY2F0aW9uLnN0aWNreSkgeyAvLyBPcGFjaXR5IGhhcyByZWFjaGVkIDAuNTFcbiAgICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAwLjU7IC8vIFNldCBoYWxmIHRyYW5zcGFyZW5jeSBvbiBub3RpZmljYXRpb25cbiAgICAgICAgICBub3RpZmljYXRpb24uaXNEaW1tZWQgPSB0cnVlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGhhbGZGYWRlT3V0LCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3VuRGltXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2FsbCB0aGlzIG1ldGhvZCB3aGVuIGEgbm90aWZpY2F0aW9uIGlzIG5vdCBpbmFjdGl2ZSBhbnltb3JlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSlcbiAgICoqL1xuICBfdW5EaW0obm90aWZpY2F0aW9uKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGkgPSA1MDtcbiAgICAoZnVuY3Rpb24gaGFsZkZhZGVJbigpIHtcbiAgICAgIGlmIChpIDwgMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IGkgLyAxMDA7XG4gICAgICAgICsraTtcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMTAwKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uc3R5bGUub3BhY2l0eSA9IDE7IC8vIFNldCBmdWxsIHZpc2liaWxpdHkgb24gbm90aWZpY2F0aW9uXG4gICAgICAgIG5vdGlmaWNhdGlvbi5pc0RpbW1lZCA9IGZhbHNlOyAvLyBVcGRhdGUgbm90aWZpY2F0aW9uIGRpbSBzdGF0dXNcbiAgICAgICAgdGhhdC5fcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbik7IC8vIFJlc2V0IGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgICByZXR1cm47IC8vIEVuZCBmdW5jdGlvblxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChoYWxmRmFkZUluLCB0aGF0Ll90cmFuc2l0aW9uIC8gMTAwKTsgLy8gU3BsaXQgYW5pbWF0aW9uIHRyYW5zaXRpb24gaW50byAxMDAgaXRlcmF0aW9ucyAoNTAgZm9yIHJlYWwgaGVyZSlcbiAgICB9KSgpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIG5ld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYSBub3RpZmljYXRpb24gYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zLCB0aGVuIGFwcGVuZCBpdCB0byBub3RpZmljYXRpb24gY29udGFpbmVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHlwZSAtIDxpPkVycm9yOyBXYXJuaW5nOyBJbmZvOyBTdWNjZXNzOzwvaT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRpdGxlPW9wdGlvbnMudHlwZV0gLSBOb3RpZmljYXRpb24gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWVzc2FnZSAtIE5vdGlmaWNhdGlvbiBtZXNzYWdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj1oYW5kbGVyXSAtIE5vdGlmaWNhdGlvbiBkdXJhdGlvbiAob3ZlcnJpZGUgaGFuZGxlciBkdXJhdGlvbiB2YWx1ZSlcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pY29ubGVzcz1mYWxzZV0gLSBObyBpY29uIGZsYWdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRoaWNrQm9yZGVyPWhhbmRsZXJdIC0gTm90aWZpY2F0aW9uIGJvcmRlciBzaWRlIChvdmVycmlkZSBoYW5kbGVyIHNpZGUgdmFsdWUpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY2xvc2FibGU9dHJ1ZV0gLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc3RpY2t5PWZhbHNlXSAtIE1ha2Ugbm90aWZpY2F0aW9uIHN0aWNreSBmbGFnXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9ucy5yZW5kZXJUbz1oYW5kbGVyXSAtIERvbSBvYmplY3QgdG8gcmVuZGVyIHRoZSBub3RpZmljYXRpb24gaW5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLkNCdGl0bGU9Q2FsbGJhY2tdIC0gTm90aWZpY2F0aW9uIGNhbGxiYWNrIHRpdGxlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrPXVuZGVmaW5lZF0gLSBOb3RpZmljYXRpb24gY2FsbGJhY2sgYnV0dG9uXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvbiBJRFxuICAgKiovXG4gIG5ldyhvcHRpb25zKSB7XG4gICAgLy8gQ2hlY2sgZm9yIG1hbmRhdG9yeSBhcmd1bWVudHMgZXhpc3RlbmNlXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnR5cGUgPT09IHVuZGVmaW5lZCB8fCAob3B0aW9ucy5tZXNzYWdlID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5tZXNzYWdlID09PSAnJykpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgdW5jbG9zYWJsZSBhdCBhbGwgbm90aWZpY2F0aW9uXG4gICAgaWYgKG9wdGlvbnMuc3RpY2t5ICYmIG9wdGlvbnMuY2xvc2FibGUgPT09IGZhbHNlICYmIG9wdGlvbnMuY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIFRlc3QgTm90aWZpY2F0aW9uIGlubmVyIHZhcmlhYmxlcyB2YWxpZGl0eVxuICAgIGlmIChvcHRpb25zLnR5cGUgIT09ICdpbmZvJyAmJiBvcHRpb25zLnR5cGUgIT09ICdzdWNjZXNzJyAmJiBvcHRpb25zLnR5cGUgIT09ICd3YXJuaW5nJyAmJiBvcHRpb25zLnR5cGUgIT09ICdlcnJvcicpIHtcbiAgICAgIG9wdGlvbnMudHlwZSA9IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLnR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2Rpc21pc3NBbGxMb2NrKSB7XG4gICAgICB0aGlzLl9kaXNtaXNzQWxsTG9jayA9IGZhbHNlOyAvLyBVbmxvY2sgZGlzbWlzc0FsbExvY2tcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBub3RpZmljYXRpb24gRE9NIGVsZW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBvcHRpb25zXG4gICAgbGV0IG5vdGlmaWNhdGlvbiA9IHRoaXMuX2J1aWxkVUkoe1xuICAgICAgaWQ6IFV0aWxzLmlkR2VuZXJhdG9yKG9wdGlvbnMudHlwZSArICcnICsgb3B0aW9ucy5tZXNzYWdlLCA1KSwgLy8gR2VuZXJhdGluZyBhbiBJRCBvZiA1IGNoYXJhY3RlcnMgbG9uZyBmcm9tIG5vdGlmaWNhdGlvbiBtYW5kYXRvcnkgZmllbGRzXG4gICAgICB0eXBlOiBvcHRpb25zLnR5cGUsXG4gICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICB0aXRsZTogb3B0aW9ucy50aXRsZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24udGl0bGUgOiBvcHRpb25zLnRpdGxlLFxuICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2R1cmF0aW9uIDogb3B0aW9ucy5kdXJhdGlvbixcbiAgICAgIGljb25sZXNzOiBvcHRpb25zLmljb25sZXNzID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5pY29ubGVzcyA6IG9wdGlvbnMuaWNvbmxlc3MsXG4gICAgICB0aGlja0JvcmRlcjogb3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkID8gdGhpcy5fdGhpY2tCb3JkZXIgOiBvcHRpb25zLnRoaWNrQm9yZGVyLFxuICAgICAgY2xvc2FibGU6IG9wdGlvbnMuY2xvc2FibGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLmNsb3NhYmxlIDogb3B0aW9ucy5jbG9zYWJsZSxcbiAgICAgIHN0aWNreTogb3B0aW9ucy5zdGlja3kgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLnN0aWNreSA6IG9wdGlvbnMuc3RpY2t5LFxuICAgICAgcmVuZGVyVG86IG9wdGlvbnMucmVuZGVyVG8gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLnJlbmRlclRvIDogb3B0aW9ucy5yZW5kZXJUbyxcbiAgICAgIENCdGl0bGU6IG9wdGlvbnMuQ0J0aXRsZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24uQ0J0aXRsZSA6IG9wdGlvbnMuQ0J0aXRsZSxcbiAgICAgIGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5jYWxsYmFjayA6IG9wdGlvbnMuY2FsbGJhY2ssXG4gICAgICBpc0RpbW1lZDogZmFsc2UgLy8gT25seSB1c2VmdWxsIGlmIHN0aWNreSBpcyBzZXQgdG8gdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IG5vdGlmaWNhdGlvbiBpbiB0aGUgY29udGFpbmVyOiBObyBub3RpZmljYXRpb24gd2l0aCB0aGUgc2FtZSBJRCBpcyBhbHJlYWR5IG9wZW5cbiAgICBpZiAoIXRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdKSB7XG4gICAgICB0aGlzLl9zdGFydChub3RpZmljYXRpb24pO1xuICAgIH1cblxuICAgIC8vIFVzZSBleGlzdGluZyBub3RpZmljYXRpb246IGluY3JlbWVudCByZXF1ZXN0IGNvdW50IGFuZCByZXNldCB0aW1lb3V0XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9yZXNldFRpbWVvdXQodGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0pO1xuICAgICAgdGhpcy5faW5jcmVtZW50UmVxdWVzdENvdW50ZXIodGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0pO1xuICAgICAgbm90aWZpY2F0aW9uID0ge307IC8vIENsZWFyIGxvY2FsIG5ldyBub3RpZmljYXRpb24gc2luY2UgaXQgYWxyZWFkeSBleGlzdHMgaW4gdGhpcy5fYWN0aXZlXG4gICAgfVxuXG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvbi5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGluZm9cbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGFuIGluZm8gbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCAoc2VlIG5ldygpIGFyZ3VtZW50cyBzaW5jZSB0aGlzIGlzIGFuIGFic3RyYWN0aW9uIG9mIG5ldygpKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSURcbiAgICoqL1xuICBpbmZvKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnR5cGUgPSAnaW5mbyc7XG4gICAgcmV0dXJuIHRoaXMubmV3KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc3VjY2Vzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYSBzdWNjZXNzIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEXG4gICAqKi9cbiAgc3VjY2VzcyhvcHRpb25zKSB7XG4gICAgb3B0aW9ucy50eXBlID0gJ3N1Y2Nlc3MnO1xuICAgIHJldHVybiB0aGlzLm5ldyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHdhcm5pbmdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgd2FybmluZyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0IChzZWUgbmV3KCkgYXJndW1lbnRzIHNpbmNlIHRoaXMgaXMgYW4gYWJzdHJhY3Rpb24gb2YgbmV3KCkpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvbiBJRFxuICAgKiovXG4gIHdhcm5pbmcob3B0aW9ucykge1xuICAgIG9wdGlvbnMudHlwZSA9ICd3YXJuaW5nJztcbiAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBlcnJvclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYW4gZXJyb3Igbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCAoc2VlIG5ldygpIGFyZ3VtZW50cyBzaW5jZSB0aGlzIGlzIGFuIGFic3RyYWN0aW9uIG9mIG5ldygpKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSURcbiAgICoqL1xuICBlcnJvcihvcHRpb25zKSB7XG4gICAgb3B0aW9ucy50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBkaXNtaXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBEaXNtaXNzIGEgc3BlY2lmaWMgbm90aWZpY2F0aW9uIHZpYSBpdHMgSURcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gVGhlIG5vdGlmaWNhdGlvbiBJRCB0byBkaXNtaXNzXG4gICAqKi9cbiAgZGlzbWlzcyhpZCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fYWN0aXZlW2lkXS50aW1lb3V0SUQpOyAvLyBDbGVhciBub3RpZmljYXRpb24gdGltZW91dFxuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVtpZF0ucmVxdWVzdENvdW50ID4gMSkgeyAvLyBTZXZlcmFsIHJlcXVlc3QgYXJlIHBlbmRpbmdcbiAgICAgIHRoaXMuX2NsZWFyUmVxdWVzdENvdW50KHRoaXMuX2FjdGl2ZVtpZF0pOyAvLyBDbGVhciBhbGwgcGVuZGluZyByZXF1ZXN0XG4gICAgfVxuXG4gICAgdGhpcy5fY2xvc2UodGhpcy5fYWN0aXZlW2lkXSk7IC8vIENsb3NlIG5vdGlmaWNhdGlvblxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZGlzbWlzc0FsbFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2xlYXIgdGhlIG5vdGlmaWNhdGlvbiBoYW5kbGVyIGZyb20gYWxsIGl0cyBhY3RpdmUgbm90aWZpY2F0aW9uc1xuICAgKiovXG4gIGRpc21pc3NBbGwoKSB7XG4gICAgaWYgKCF0aGlzLl9kaXNtaXNzQWxsTG9jayAmJiBPYmplY3Qua2V5cyh0aGlzLl9hY3RpdmUpLmxlbmd0aCAhPT0gMCkgeyAvLyBDaGVjayB0aGF0IF9kaW1pc3NBbGxMb2NrIGlzIGRpc2FibGUgYW5kIHRoYXQgdGhlcmUgaXMgc3RpbGwgbm90aWZpY2F0aW9uIGRpc3BsYXllZFxuICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSB0cnVlOyAvLyBkaXNtaXNzQWxsTG9jayB3aWxsIGJlIHVubG9ja2VkIGF0IHRoZSBsYXN0IF9jbG9zZSgpIG1ldGhvZCBjYWxsXG4gICAgICB0aGlzLl9xdWV1ZSA9IHt9OyAvLyBDbGVhciBxdWV1ZSBvYmplY3RcblxuICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLl9hY3RpdmUpIHsgLy8gSXRlcmF0ZSBvdmVyIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgdGhpcy5kaXNtaXNzKGlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBkaXNtaXNzVHlwZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRGlzbWlzcyBhbGwgbm90aWZpY2F0aW9ucyBmcm9tIGEgZ2l2ZW4gdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIDxpPnN1Y2NlczsgaW5mbzsgd2FybmluZzsgZXJyb3I7PC9pPlxuICAgKiovXG4gIGRpc21pc3NUeXBlKHR5cGUpIHtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fYWN0aXZlKS5sZW5ndGggIT09IDApIHsgLy8gQ2hlY2sgdGhhdCBfZGltaXNzQWxsTG9jayBpcyBkaXNhYmxlIGFuZCB0aGF0IHRoZXJlIGlzIHN0aWxsIG5vdGlmaWNhdGlvbiBkaXNwbGF5ZWRcbiAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5fYWN0aXZlKSB7IC8vIEl0ZXJhdGUgb3ZlciBub3RpZmljYXRpb25zXG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVbaWRdLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICB0aGlzLmRpc21pc3MoaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBHRVRURVIgTUVUSE9EUyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIGdldEhpc3RvcnlMZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpc3RvcnkubGVuZ3RoO1xuICB9XG4gIGdldEhpc3RvcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb247XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIFNjcm9sbEJhciB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDdXN0b20gSmF2YVNjcmlwdCBTY3JvbGxCYXIgZm9yIGFueSBjb25hdGluZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhIGN1c3RvbSBTY3JvbGxCYXIgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBET00gdGFyZ2V0LCBpbnNwaXJlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9idXppbmFzL3NpbXBsZS1zY3JvbGxiYXIgPDNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgU2Nyb2xsQmFyIG9wdGlvbnNcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMudGFyZ2V0IC0gVGhlIERPTSBub2RlIHRvIGFkZCBhIFNjcm9sbEJhciB0b1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLnRhcmdldDsgLy8gUGFyZW50IGRpdiB0byBwdXQgdGhlIFNjcm9sbEJhciBpblxuICAgIHRoaXMuX3dyYXBwZXIgPSB7fTsgLy8gV3JhcCBib3RoIGNvbnRhaW5lciBhbmQgU2Nyb2xsQmFyXG4gICAgdGhpcy5fY29udGFpbmVyID0ge307IC8vIENvbnRlbnQgdG8gc2Nyb2xsICsgYnJvd3NlciBTY3JvbGxCYXIgKDE4cHggb2Zmc2V0KVxuICAgIHRoaXMuX2JhciA9IHt9OyAvLyBTY3JvbGxCYXIgaXRzZWxmXG4gICAgdGhpcy5fc2Nyb2xsUmF0aW8gPSAwO1xuICAgIHRoaXMuX2xhc3RQYWdlWSA9IDA7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNjcm9sbEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIERPTSBoaWVycmFyY2h5LCBTY3JvbGxCYXIgZG91YmxlIHdyYXBzIHRoZSBjb250ZW50IHRvIGFwcGVuZCBpdHMgY3VzdG9tIGJhclxuICAgKiovXG4gIF9pbml0KCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIC8vIENyZWF0aW5nIGFzc29jaWF0ZWQgZWxlbWVudHMgKHdyYXBwZXIsIGNvbnRhaW5lciwgYmFyKVxuICAgIHRoaXMuX3RhcmdldC5jbGFzc0xpc3QuYWRkKCdzY3JvbGxiYXItY29udGFpbmVyJyk7XG4gICAgdGhpcy5fd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHRoaXMuX3dyYXBwZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzY3JvbGxiYXItd3JhcHBlcicpO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Njcm9sbGJhci1jb250ZW50Jyk7XG4gICAgLy8gTW92ZSB0YXJnZXQgY2hpbGRyZW4gaW50byB0aGlzIGNvbnRhaW5lclxuICAgIHdoaWxlICh0aGlzLl90YXJnZXQuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3RhcmdldC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgLy8gTGluayBET00gZWxlbWVudHNcbiAgICB0aGlzLl93cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpcy5fd3JhcHBlcik7XG4gICAgLy8gQXBwZW5kIGZyYWdtZW50IHRvIERPTSB0YXJnZXRcbiAgICB0aGlzLl90YXJnZXQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIHRoaXMuX3RhcmdldC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8ZGl2IGNsYXNzPVwic2Nyb2xsXCI+PC9kaXY+Jyk7IC8vIEFwcGVuZCBzY3JvbGwgYXMgbGFzdCBjaGlsZFxuICAgIHRoaXMuX2JhciA9IHRoaXMuX3RhcmdldC5sYXN0Q2hpbGQ7IC8vIEdldCBjb250ZW50IGZyb20gbGluZSBqdXN0IG92ZXIgdGhpcyFcbiAgICAvLyBNZXRob2RzIGF1dG8gYmluZGluZyB3aXRoIHRoaXMgdG8gYmUgYWJsZSB0byBhZGQvcmVtb3ZlIGxpc3RlbmVycyBlYXNpbHlcbiAgICB0aGlzLl9kcmFnID0gdGhpcy5fZHJhZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX3N0b3BEcmFnID0gdGhpcy5fc3RvcERyYWcuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNjcm9sbEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBTY3JvbGxCYXIgbW91c2UgZXZlbnRzXG4gICAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl91cGRhdGVTY3JvbGxCYXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl91cGRhdGVTY3JvbGxCYXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYmFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX2JhckNsaWNrZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZHJhZ1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2Nyb2xsQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIHRoZSBkcmFnIGFuaW1hdGlvbiBvZiB0aGUgYmFyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBNb3VzZSBldmVudCBmcm9tIHRoaXMuX2V2ZW50cygpXG4gICAqKi9cbiAgX2RyYWcoZXZlbnQpIHtcbiAgICBjb25zdCBkZWx0YSA9IGV2ZW50LnBhZ2VZIC0gdGhpcy5fbGFzdFBhZ2VZO1xuICAgIHRoaXMuX2xhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLl9jb250YWluZXIuc2Nyb2xsVG9wICs9IChkZWx0YSAvIHRoaXMuX3Njcm9sbFJhdGlvKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9iYXJDbGlja2VkXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgZG9jdW1lbnQgZXZlbnRzIHdoZW4gYmFyIGlzIGNsaWNrZWQgdG8gdHJhY2sgdGhlIG1vdXNlIG1vdmVtZW50IGluIHBhcmVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgTW91c2UgZXZlbnQgZnJvbSB0aGlzLl9ldmVudHMoKVxuICAgKiovXG4gIF9iYXJDbGlja2VkKGV2ZW50KSB7XG4gICAgdGhpcy5fbGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgdGhpcy5fYmFyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGJhci1ncmFiYmVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxiYXItZ3JhYmJlZCcpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2RyYWcpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9zdG9wRHJhZyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RvcERyYWdcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNjcm9sbEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBkb2N1bWVudCBldmVudHMgd2hlbiBiYXIgaXMgcmVsZWFzZWRcbiAgICoqL1xuICBfc3RvcERyYWcoKSB7XG4gICAgdGhpcy5fYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGJhci1ncmFiYmVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxiYXItZ3JhYmJlZCcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2RyYWcpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9zdG9wRHJhZyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfdXBkYXRlU2Nyb2xsQmFyXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDb21wdXRlIGJhciBwb3NpdGlvbiBhY2NvcmRpbmcgdG8gRE9NIG1lYXN1cmVtZW50c1xuICAgKiovXG4gIF91cGRhdGVTY3JvbGxCYXIoKSB7XG4gICAgY29uc3QgdG90YWxIZWlnaHQgPSB0aGlzLl9jb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IG93bkhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgcmlnaHQgPSAodGhpcy5fdGFyZ2V0LmNsaWVudFdpZHRoIC0gdGhpcy5fYmFyLmNsaWVudFdpZHRoKSAqIC0xO1xuXG4gICAgdGhpcy5fc2Nyb2xsUmF0aW8gPSBvd25IZWlnaHQgLyB0b3RhbEhlaWdodDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3Njcm9sbFJhdGlvID49IDEpIHsgLy8gSGlkZSBzY3JvbGxiYXIgaWYgbm8gc2Nyb2xsaW5nIGlzIHBvc3NpYmxlXG4gICAgICAgIHRoaXMuX2Jhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IChNYXRoLm1heCh0aGlzLl9zY3JvbGxSYXRpbyAqIDEwMCwgNSkgKiBvd25IZWlnaHQpIC8gMTAwO1xuICAgICAgICBsZXQgdG9wID0gKCh0aGlzLl9jb250YWluZXIuc2Nyb2xsVG9wIC8gdG90YWxIZWlnaHQpICogMTAwKSAqIG93bkhlaWdodCAvIDEwMDtcblxuICAgICAgICBpZiAoTWF0aC5tYXgodGhpcy5fc2Nyb2xsUmF0aW8gKiAxMDAsIDUpID09PSA1KSB7IC8vIFNjcm9sbEJhciBoYXMgcmVhY2hlZCBpdHMgbWluaW11bSBzaXplXG4gICAgICAgICAgLyogSGVyZSBpcyBhIGNvbXBsZXggdGhpbmcgOiBzY3JvbGwgdG90YWwgaGVpZ2h0ICE9IERPTSBub2RlIHRvdGFsIGhlaWdodC4gV2UgbXVzdCBzdWJzdHJhY3RcbiAgICAgICAgICBhIGdyb3dpbmcgcGVyY2VudGFnZSAoYXMgdXNlciBnb2VzIGRvd24pIHRoYXQgaXMgc2NhbGVkIGFmdGVyIHRvdGFsIHNjcm9sbCBwcm9ncmVzcyBpbiAlLiAqL1xuICAgICAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzUGVyY2VudGFnZSA9ICh0aGlzLl9jb250YWluZXIuc2Nyb2xsVG9wICogMTAwKSAvICh0b3RhbEhlaWdodCAtIG93bkhlaWdodCk7XG4gICAgICAgICAgdG9wID0gKChvd25IZWlnaHQgLSBoZWlnaHQpICogKCgodGhpcy5fY29udGFpbmVyLnNjcm9sbFRvcCArIChzY3JvbGxQcm9ncmVzc1BlcmNlbnRhZ2UgKiBvd25IZWlnaHQpIC8gMTAwKSAvIHRvdGFsSGVpZ2h0KSAqIDEwMCkpIC8gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB0aGlzLl9iYXIuc3R5bGUuY3NzVGV4dCA9IGBoZWlnaHQ6ICR7aGVpZ2h0fXB4OyB0b3A6ICR7dG9wfXB4OyByaWdodDogJHtyaWdodH1weDtgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEJhcjtcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgU2hvcnRjdXQge1xuICAvKipcbiAgICogQHN1bW1hcnkgQmFzaWMga2V5Ym9hcmQgU2hvcnRjdXQgaGFuZGxlclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXIgY2FsbGJhY2tzIHNldCBvbiBrZXlib2FyZCBiaW5kaW5nc1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NpbmdsZUtleSA9IFtdO1xuICAgIHRoaXMuX211bHRpS2V5ID0gW107XG5cbiAgICB0aGlzLl90ZXN0U2hvcnRjdXRzID0gdGhpcy5fdGVzdFNob3J0Y3V0cy5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9hZGRFdmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGtleSBkb3duIGFuZCBrZXkgcHJlc3MgZXZlbnRzIHRvIHRoZSBET01cbiAgICoqL1xuICBfYWRkRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl90ZXN0U2hvcnRjdXRzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX3Rlc3RTaG9ydGN1dHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3JlbW92ZUV2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUga2V5IGRvd24gYW5kIGtleSBwcmVzcyBldmVudHMgdG8gdGhlIERPTVxuICAgKiovXG4gIF9yZW1vdmVFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX3Rlc3RTaG9ydGN1dHMpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5fdGVzdFNob3J0Y3V0cyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfdGVzdFNob3J0Y3V0c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUZXN0IGtleWJvYXJkIGV2ZW50IHRvIGZpcmUgc3RvcmVkIHNob3J0Y3V0IGFjY29yZGluZ2x5XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBLZXlib2FyZCBldmVudCBmcm9tIHRoaXMuX2FkZEV2ZW50cygpXG4gICAqKi9cbiAgX3Rlc3RTaG9ydGN1dHMoZXZlbnQpIHtcbiAgICBpZiAoIShldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleSA9PT0gJ1InKSkgeyAvLyBERVZFTE9QRU1FTlQgdGVzdCB0byBrZWVwIGhhcmQgcmVmcmVzaCBhdmFpbGFibGVcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFRoaXMgaXMgZm9yIFBST0RVQ1RJT04gb25seSwgdG8gcHJldmVudCB0aGF0IGJyb3dzZXIgc2hvcnRjdXRzIGNvbGxpZGUgd2l0aCB1c2VyIG9uZVxuICAgIH1cblxuICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5zaGlmdEtleSkgeyAvLyBNdWx0aSBrZXkgc2hvcnRjdXRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbXVsdGlLZXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQgPSB0aGlzLl9tdWx0aUtleVtpXTtcblxuICAgICAgICBpZiAoIXNob3J0Y3V0LnBhdXNlICYmIHNob3J0Y3V0LmtleSA9PT0gZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKHNob3J0Y3V0Lm1vZGlmaWVyQ291bnQpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgaWYgKChzaG9ydGN1dC5tb2RpZmllcnMuY3RybEtleSAmJiBldmVudC5jdHJsS2V5KSB8fFxuICAgICAgICAgICAgICAgIChzaG9ydGN1dC5tb2RpZmllcnMuYWx0S2V5ICYmIGV2ZW50LmFsdEtleSkgfHxcbiAgICAgICAgICAgICAgICAoc2hvcnRjdXQubW9kaWZpZXJzLnNoaWZ0S2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIHNob3J0Y3V0LmZpcmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGlmICgoc2hvcnRjdXQubW9kaWZpZXJzLmN0cmxLZXkgJiYgZXZlbnQuY3RybEtleSAmJiBzaG9ydGN1dC5tb2RpZmllcnMuYWx0S2V5ICYmIGV2ZW50LmFsdEtleSkgfHxcbiAgICAgICAgICAgICAgICAoc2hvcnRjdXQubW9kaWZpZXJzLmN0cmxLZXkgJiYgZXZlbnQuY3RybEtleSAmJiBzaG9ydGN1dC5tb2RpZmllcnMuc2hpZnRLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHx8XG4gICAgICAgICAgICAgICAgKHNob3J0Y3V0Lm1vZGlmaWVycy5hbHRLZXkgJiYgZXZlbnQuYWx0S2V5ICYmIHNob3J0Y3V0Lm1vZGlmaWVycy5zaGlmdEtleSAmJiBldmVudC5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBzaG9ydGN1dC5maXJlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBpZiAoKHNob3J0Y3V0Lm1vZGlmaWVycy5jdHJsS2V5ICYmIGV2ZW50LmN0cmxLZXkgJiZcbiAgICAgICAgICAgICAgICAgIHNob3J0Y3V0Lm1vZGlmaWVycy5hbHRLZXkgJiYgZXZlbnQuYWx0S2V5ICYmXG4gICAgICAgICAgICAgICAgICBzaG9ydGN1dC5tb2RpZmllcnMuc2hpZnRLZXkgJiYgZXZlbnQuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2hvcnRjdXQuZmlyZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBTaW5nbGUga2V5IHNob3J0Y3V0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpbmdsZUtleS5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBzaG9ydGN1dCA9IHRoaXMuX3NpbmdsZUtleVtpXTtcblxuICAgICAgICBpZiAoIXNob3J0Y3V0LnBhdXNlICYmIHNob3J0Y3V0LmtleSA9PT0gZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICBzaG9ydGN1dC5maXJlKHRoaXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9nZXRNb2RpZmllcnNDb3VudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDb3VudCB0aGUgYW1vdW50IG9mIG1vZGlmaWVycyBpbiBnaXZlbiBzaG9ydGN1dCBiaW5kaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlTdHJpbmcgLSBUaGUga2V5cyBzdHJpbmdcbiAgICogQHJldHVybiB7bnVtYmVyfSAtIFRoZSBudW1iZXIgb2YgbW9kaWZpZXJzIGluIHRoZSBrZXlzIHN0cmluZ1xuICAgKiovXG4gIF9nZXRNb2RpZmllcnNDb3VudChrZXlTdHJpbmcpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IHtcbiAgICAgIGN0cmxLZXk6IC9jdHJsL2kudGVzdChrZXlTdHJpbmcpLFxuICAgICAgYWx0S2V5OiAvYWx0L2kudGVzdChrZXlTdHJpbmcpLFxuICAgICAgc2hpZnRLZXk6IC9zaGlmdC9pLnRlc3Qoa2V5U3RyaW5nKVxuICAgIH07XG5cbiAgICBpZiAobW9kaWZpZXJzLmN0cmxLZXkpICsrY291bnQ7XG4gICAgaWYgKG1vZGlmaWVycy5hbHRLZXkpICsrY291bnQ7XG4gICAgaWYgKG1vZGlmaWVycy5zaGlmdEtleSkgKytjb3VudDtcblxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRBbGxQYXVzZUZsYWdcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUGF1c2UvUmVzdW1lIGFsbCBzaG9ydGN1dHMgY3VycmVudGx5IHJlZ2lzdGVyZWRcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAtIFRoZSBwYXVzZSB2YWx1ZSB0byBzZXRcbiAgICoqL1xuICBfc2V0QWxsUGF1c2VGbGFnKHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaW5nbGVLZXkubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX3NldE9uZVBhdXNlRmxhZyh0aGlzLl9zaW5nbGVLZXlbaV0ua2V5U3RyaW5nLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tdWx0aUtleS5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fc2V0T25lUGF1c2VGbGFnKHRoaXMuX211bHRpS2V5W2ldLmtleVN0cmluZywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zZXRPbmVQYXVzZUZsYWdcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUGF1c2UvUmVzdW1lIGdpdmVuIHNob3J0Y3V0cyBjdXJyZW50bHkgcmVnaXN0ZXJlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgLSBUaGUgcGF1c2UgdmFsdWUgdG8gc2V0XG4gICAqKi9cbiAgX3NldE9uZVBhdXNlRmxhZyhrZXlTdHJpbmcsIHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2dldE1vZGlmaWVyc0NvdW50KGtleVN0cmluZykgPT09IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2luZ2xlS2V5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaW5nbGVLZXlbaV0ua2V5U3RyaW5nID09PSBrZXlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLl9zaW5nbGVLZXlbaV0ucGF1c2UgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX211bHRpS2V5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0aGlzLl9tdWx0aUtleVtpXS5rZXlTdHJpbmcgPT09IGtleVN0cmluZykge1xuICAgICAgICAgIHRoaXMuX211bHRpS2V5W2ldLnBhdXNlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcmVnaXN0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZWdpc3RlciBhIG5ldyBzaG9ydGN1dCBhbmQgYmluZCBpdCB0byBhIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlTdHJpbmcgLSBUaGUga2V5cyBzdHJpbmdcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZmlyZSAtIFRoZSBzaG9ydGN1dCBjYWxsYmFjayB0byB0cmlnZ2VyXG4gICAqKi9cbiAgcmVnaXN0ZXIoa2V5U3RyaW5nLCBmaXJlKSB7XG4gICAgY29uc3Qgc2hvcnRjdXQgPSB7XG4gICAgICBrZXlTdHJpbmc6IGtleVN0cmluZyxcbiAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICBjdHJsS2V5OiAvY3RybC9pLnRlc3Qoa2V5U3RyaW5nKSxcbiAgICAgICAgYWx0S2V5OiAvYWx0L2kudGVzdChrZXlTdHJpbmcpLFxuICAgICAgICBzaGlmdEtleTogL3NoaWZ0L2kudGVzdChrZXlTdHJpbmcpXG4gICAgICB9LFxuICAgICAgbW9kaWZpZXJDb3VudDogdGhpcy5fZ2V0TW9kaWZpZXJzQ291bnQoa2V5U3RyaW5nKSxcbiAgICAgIGtleToga2V5U3RyaW5nLnN1YnN0cihrZXlTdHJpbmcubGFzdEluZGV4T2YoJysnKSArIDEpLnRvTG93ZXJDYXNlKCksXG4gICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgZmlyZTogZmlyZVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5fc2luZ2xlS2V5Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9tdWx0aUtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2FkZEV2ZW50cygpO1xuICAgIH1cblxuICAgICghc2hvcnRjdXQubW9kaWZpZXJzLmN0cmxLZXkgJiYgIXNob3J0Y3V0Lm1vZGlmaWVycy5zaGlmdEtleSAmJiAhc2hvcnRjdXQubW9kaWZpZXJzLmFsdEtleSAmJiAhc2hvcnRjdXQubW9kaWZpZXJzLm1ldGFLZXkpID9cbiAgICB0aGlzLl9zaW5nbGVLZXkucHVzaChzaG9ydGN1dCk6XG4gICAgICB0aGlzLl9tdWx0aUtleS5wdXNoKHNob3J0Y3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVucmVnaXN0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVblJlZ2lzdGVyIGEgc2hvcnRjdXQgdmlhIGl0cyBrZXlzIHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqKi9cbiAgdW5yZWdpc3RlcihrZXlTdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZ2V0TW9kaWZpZXJzQ291bnQoa2V5U3RyaW5nKSA9PT0gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3NpbmdsZUtleS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAodGhpcy5fc2luZ2xlS2V5W2ldLmtleSA9PT0ga2V5U3RyaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICB0aGlzLl9zaW5nbGVLZXkuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9tdWx0aUtleS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAodGhpcy5fbXVsdGlLZXlbaV0ua2V5ID09PSBrZXlTdHJpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHRoaXMuX211bHRpS2V5LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9zaW5nbGVLZXkubGVuZ3RoID09PSAwICYmIHRoaXMuX211bHRpS2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdW5yZWdpc3RlckFsbFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVucmVnaXN0ZXIgZXZlcnkgYWN0aXZlIHNob3J0Y3V0XG4gICAqKi9cbiAgdW5yZWdpc3RlckFsbCgpIHtcbiAgICB0aGlzLl9zaW5nbGVLZXkgPSBbXTtcbiAgICB0aGlzLl9tdWx0aUtleSA9IFtdO1xuICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcmVzdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVzdW1lIHRoZSBnaXZlbiBzaG9ydGN1dCBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqKi9cbiAgcmVzdW1lKGtleVN0cmluZykge1xuICAgIHRoaXMuX3NldE9uZVBhdXNlRmxhZyhrZXlTdHJpbmcsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHBhdXNlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUGF1c2UgdGhlIGdpdmVuIHNob3J0Y3V0IGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlTdHJpbmcgLSBUaGUga2V5cyBzdHJpbmdcbiAgICoqL1xuICBwYXVzZShrZXlTdHJpbmcpIHtcbiAgICB0aGlzLl9zZXRPbmVQYXVzZUZsYWcoa2V5U3RyaW5nLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlc3VtZUFsbFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlc3VtZSBhbGwgc2hvcnRjdXRzIGNhbGxiYWNrXG4gICAqKi9cbiAgcmVzdW1lQWxsKCkge1xuICAgIHRoaXMuX2FkZEV2ZW50cygpO1xuICAgIHRoaXMuX3NldEFsbFBhdXNlRmxhZyhmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHBhdXNlQWxsXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUGF1c2UgYWxsIHNob3J0Y3V0cyBjYWxsYmFja1xuICAgKiovXG4gIHBhdXNlQWxsKCkge1xuICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpO1xuICAgIHRoaXMuX3NldEFsbFBhdXNlRmxhZyh0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaG9ydGN1dDtcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgVXRpbHMge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWlzY2VsYW5lb3VzIHV0aWxzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTWlzY2VsYW5lb3VzIHV0aWxzIGZ1bmN0aW9uIGFuZCBwcm90b3R5cGVzIGZvciBtemtcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wcm90b3R5cGVzKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3Byb3RvdHlwZXNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gT3ZlcnJpZGVzIHNvbWUgdXNlZnVsIHR5cGUgcHJvdG90eXBlc1xuICAgKiovXG4gIF9wcm90b3R5cGVzKCkge1xuICAgIC8vIGh0dHBzOi8vd3d3LnJlZGlwcy5uZXQvamF2YXNjcmlwdC9hcnJheS1tb3ZlLyA8LSBEYSByZWFsIE1WUFxuICAgIEFycmF5LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24ocG9zMSwgcG9zMikge1xuICAgICAgLy8gbG9jYWwgdmFyaWFibGVzXG4gICAgICBsZXQgaSwgdG1wO1xuICAgICAgLy8gY2FzdCBpbnB1dCBwYXJhbWV0ZXJzIHRvIGludGVnZXJzXG4gICAgICBwb3MxID0gcGFyc2VJbnQocG9zMSwgMTApO1xuICAgICAgcG9zMiA9IHBhcnNlSW50KHBvczIsIDEwKTtcbiAgICAgIC8vIGlmIHBvc2l0aW9ucyBhcmUgZGlmZmVyZW50IGFuZCBpbnNpZGUgYXJyYXlcbiAgICAgIGlmIChwb3MxICE9PSBwb3MyICYmIDAgPD0gcG9zMSAmJiBwb3MxIDw9IHRoaXMubGVuZ3RoICYmIDAgPD0gcG9zMiAmJiBwb3MyIDw9IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNhdmUgZWxlbWVudCBmcm9tIHBvc2l0aW9uIDFcbiAgICAgICAgdG1wID0gdGhpc1twb3MxXTtcbiAgICAgICAgLy8gbW92ZSBlbGVtZW50IGRvd24gYW5kIHNoaWZ0IG90aGVyIGVsZW1lbnRzIHVwXG4gICAgICAgIGlmIChwb3MxIDwgcG9zMikge1xuICAgICAgICAgIGZvciAoaSA9IHBvczE7IGkgPCBwb3MyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXNbaV0gPSB0aGlzW2kgKyAxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbW92ZSBlbGVtZW50IHVwIGFuZCBzaGlmdCBvdGhlciBlbGVtZW50cyBkb3duXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvciAoaSA9IHBvczE7IGkgPiBwb3MyOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXNbaV0gPSB0aGlzW2kgLSAxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHV0IGVsZW1lbnQgZnJvbSBwb3NpdGlvbiAxIHRvIGRlc3RpbmF0aW9uXG4gICAgICAgIHRoaXNbcG9zMl0gPSB0bXA7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBwcmVjaXNpb25Sb3VuZFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIERvIGEgTWF0aC5yb3VuZCB3aXRoIGEgZ2l2ZW4gcHJlY2lzaW9uIChpZSBhbW91bnQgb2YgaW50ZWdlcnMgYWZ0ZXIgdGhlIGNvbWEpXG4gICAqIEBwYXJhbSB7bnVubWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gcHJlY2lzZWx5IHJvdW5kXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwcmVjaXNpb24gLSBUaGUgbnVtYmVyIG9mIGludGVnZXJzIGFmdGVyIHRoZSBjb21hXG4gICAqIEByZXR1cm4ge251bWJlcn0gLSBUaGUgcm91bmRlZCB2YWx1ZVxuICAgKiovXG4gIHByZWNpc2lvblJvdW5kKHZhbHVlLCBwcmVjaXNpb24pIHtcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiB8fCAwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNlY29uZHNUb1RpbWVjb2RlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ29udmVydCBhIHRpbWUgaW4gc2Vjb25kcyBpbnRvIGEgdGltZSBERCBISCBNTSBTU1xuICAgKiBAcGFyYW0ge251bm1iZXJ9IHRpbWUgLSBUaGUgdGltZSBpbiBzZWNvbmRzIHRvIGNvbnZlcnRcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIFRoZSBvdXRwdXQgc3RyaW5nIGFjY29yZGluZyB0byB0aW1lIGR1cmF0aW9uXG4gICAqKi9cbiAgc2Vjb25kc1RvVGltZWNvZGUodGltZSkge1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkVGltZSA9IHtcbiAgICAgIGQ6IDAsXG4gICAgICBoOiAwLFxuICAgICAgbTogMCxcbiAgICAgIHM6IDBcbiAgICB9O1xuXG4gICAgLy8gQ3V0dGluZyB0b3RhbCBzZWNvbmRzXG4gICAgdHJhbnNmb3JtZWRUaW1lLmQgPSBNYXRoLmZsb29yKHRpbWUgLyA4NjQwMCk7XG4gICAgdHJhbnNmb3JtZWRUaW1lLmggPSBNYXRoLmZsb29yKCh0aW1lIC0gKHRyYW5zZm9ybWVkVGltZS5kICogODY0MDApKSAvIDM2MDApO1xuICAgIHRyYW5zZm9ybWVkVGltZS5tID0gTWF0aC5mbG9vcigodGltZSAtICh0cmFuc2Zvcm1lZFRpbWUuZCAqIDg2NDAwKSAtICh0cmFuc2Zvcm1lZFRpbWUuaCAqIDM2MDApKSAvIDYwKTtcbiAgICB0cmFuc2Zvcm1lZFRpbWUucyA9IE1hdGguZmxvb3IodGltZSAtICh0cmFuc2Zvcm1lZFRpbWUuZCAqIDg2NDAwKSAtICh0cmFuc2Zvcm1lZFRpbWUuaCAqIDM2MDApIC0gKHRyYW5zZm9ybWVkVGltZS5tICogNjApKTtcblxuICAgIC8vIEFkZGluZyBhbiBleHRyYSAwIGZvciB2YWx1ZXMgaW5mZXJpb3IgdG8gMTBcbiAgICBpZiAodHJhbnNmb3JtZWRUaW1lLmQgPCAxMCkge1xuICAgICAgdHJhbnNmb3JtZWRUaW1lLmQgPSBgMCR7dHJhbnNmb3JtZWRUaW1lLmR9YDtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNmb3JtZWRUaW1lLmggPCAxMCkge1xuICAgICAgdHJhbnNmb3JtZWRUaW1lLmggPSBgMCR7dHJhbnNmb3JtZWRUaW1lLmh9YDtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNmb3JtZWRUaW1lLm0gPCAxMCkge1xuICAgICAgdHJhbnNmb3JtZWRUaW1lLm0gPSBgMCR7dHJhbnNmb3JtZWRUaW1lLm19YDtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNmb3JtZWRUaW1lLnMgPCAxMCkge1xuICAgICAgdHJhbnNmb3JtZWRUaW1lLnMgPSBgMCR7dHJhbnNmb3JtZWRUaW1lLnN9YDtcbiAgICB9XG5cbiAgICAvLyBGb3JtYXR0aW5nIG91dHB1dFxuICAgIGlmICh0cmFuc2Zvcm1lZFRpbWUuZCA+IDApIHtcbiAgICAgIHJldHVybiBgJHt0cmFuc2Zvcm1lZFRpbWUuZH1kICR7dHJhbnNmb3JtZWRUaW1lLmh9aCAke3RyYW5zZm9ybWVkVGltZS5tfW0gJHt0cmFuc2Zvcm1lZFRpbWUuc31zYDtcbiAgICB9IGVsc2UgaWYgKHRyYW5zZm9ybWVkVGltZS5oID4gMCkge1xuICAgICAgcmV0dXJuIGAke3RyYW5zZm9ybWVkVGltZS5ofToke3RyYW5zZm9ybWVkVGltZS5tfToke3RyYW5zZm9ybWVkVGltZS5zfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt0cmFuc2Zvcm1lZFRpbWUubX06JHt0cmFuc2Zvcm1lZFRpbWUuc31gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGlkR2VuZXJhdG9yXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhc2ggdGhlIHNlZWQgdG8gZ2VuZXJhdGUgYW4gSUQsIGluc3BpcmVkIGZyb20gaHR0cDovL3dlcnhsdGQuY29tL3dwLzIwMTAvMDUvMTMvamF2YXNjcmlwdC1pbXBsZW1lbnRhdGlvbi1vZi1qYXZhcy1zdHJpbmctaGFzaGNvZGUtbWV0aG9kL1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VlZCAgIC0gVGhlIHNlZWQgc3RyaW5nIHRvIGhhc2hcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBsZW5ndGggb2YgdGhlIHJldHVybmVkIElEXG4gICAqKi9cbiAgaWRHZW5lcmF0b3Ioc2VlZCwgbGVuZ3RoKSB7XG4gICAgbGV0IGhhc2ggPSAwLFxuICAgICAgY2hhcmFjdGVyID0gJyc7XG5cbiAgICBpZiAoc2VlZC5sZW5ndGggPT09IDAgfHwgbGVuZ3RoID4gMTIpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWVkLmxlbmd0aDsgKytpKSB7XG4gICAgICBjaGFyYWN0ZXIgPSBzZWVkLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXJhY3RlcjtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgfVxuXG4gICAgcmV0dXJuIChNYXRoLmFicyhoYXNoKS50b1N0cmluZygzNikgKyAnJyArIE1hdGguYWJzKGhhc2ggLyAyKS50b1N0cmluZygzNikuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSkuc3Vic3RyaW5nKDAsIGxlbmd0aCkudG9VcHBlckNhc2UoKTsgLy8gSGVyZSBpcyB0aGUgdHdla2VhZCBsaW5lXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBnZXRDb29raWVzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gR2V0IGFsbCBzZXNzaW9uIGNvb2tpZXNcbiAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBjb29raWVzIG9iamVjdFxuICAgKiovXG4gIGdldENvb2tpZXMoKSB7XG4gICAgY29uc3QgY29va2llcyA9IHt9O1xuICAgIGlmIChkb2N1bWVudC5jb29raWUgJiYgZG9jdW1lbnQuY29va2llICE9PSAnJykge1xuICAgICAgZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihjb29raWUpIHtcbiAgICAgICAgY29uc3QgbSA9IGNvb2tpZS50cmltKCkubWF0Y2goLyhcXHcrKT0oLiopLyk7XG4gICAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb29raWVzW21bMV1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb2tpZXM7XG4gIH1cblxuXG4gIGFkZFN0eWxlU2hlZXQoZmlsZW5hbWUpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgIGxpbmsuaHJlZiA9IGZpbGVuYW1lO1xuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcbiIsImltcG9ydCBUb3BCYXIgZnJvbSAnLi90b3BiYXIvVG9wQmFyLmpzJztcbmltcG9ydCBBc2lkZSBmcm9tICcuL21haW5jb250YWluZXIvQXNpZGUuanMnO1xuaW1wb3J0IFNjZW5lIGZyb20gJy4vbWFpbmNvbnRhaW5lci9TY2VuZS5qcyc7XG5pbXBvcnQgRm9vdEJhciBmcm9tICcuL2Zvb3RiYXIvRm9vdEJhci5qcyc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi4vdXRpbHMvTW9kYWwuanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFZpZXcge1xuICAvKipcbiAgICogQHN1bW1hcnkgRnJvbnRlZCBWaWV3IGNsYXNzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIGV2ZXJ5dGhpbmcgdGhhdCBpcyBVSS4gTm90IG1lYW50IEFUIEFMTCB0byBoYW5kbGUgZGF0YSBtb2RlbGlzYXRpb24sIHVzZSA8Y29kZT5Nb2RlbC5qczwvY29kZT4uIFRoaXMgY2xhc3MgaXMgbWVhbnQgdG8gYmUgYWNjZXNzZWQgZnJvbSBhbnl3aGVyZSBpbiB0aGUgYXBwLCBzaW5jZSBpdCBpcyBhdHRhY2hlZCB0byB0aGUgTXprIG9iamVjdC5cbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9tYWluQ29udGFpbmVyID0ge307XG4gICAgdGhpcy5fdG9wQmFyID0ge307XG4gICAgdGhpcy5fYXNpZGUgPSB7fTtcbiAgICB0aGlzLl9zY2VuZSA9IHt9O1xuICAgIHRoaXMuX2Zvb3RCYXIgPSB7fTtcblxuICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWwoKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIFZpZXcgb2JqZWN0IHdpZHRoIFRvcEJhciwgRm9vdEJhciwgQXNpZGVzIGFuZCBTY2VuZVxuICAgKiovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX21haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbkNvbnRhaW5lcicpOyAvLyBVc2VkIHdoZW4gc3dpdGNoaW5nIERpc2NvdmVyIChhbmNpZW5uZW1lbnQgbW9kZXMgKHBhcnR5dmlldywgbWFuYWdvdGl0IGV0YykpXG5cbiAgICB0aGlzLl90b3BCYXIgPSBuZXcgVG9wQmFyKCk7XG4gICAgdGhpcy5fYXNpZGUgPSBuZXcgQXNpZGUoe1xuICAgICAgc2lkZTogJ2xlZnQnXG4gICAgfSk7XG4gICAgdGhpcy5fc2NlbmUgPSBuZXcgU2NlbmUoKTtcbiAgICB0aGlzLl9mb290QmFyID0gbmV3IEZvb3RCYXIoKTtcblxuICAgIHRoaXMuX2Zvb3RCYXIuZ2V0Vm9sdW1lQmFyKCkudXBkYXRlVm9sdW1lKG16ay5nZXRJc011dGVkKCksIG16ay5nZXRWb2x1bWUoKSk7IC8vIFRPRE8gOiByZXBsYWNlIHdpdGggbXprLmdldFVzZXJWb2x1bWUoKSBvciBmcm9tIGxvY2FsU3RvcmFnZSBvciBmcm9tIG9wdHMgKHNlcnYpXG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgY2hhbmdlVHJhY2tcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSBVSSBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIG5ldyBwbGF5aW5nIHRyYWNrIGluZm9ybWF0aW9uc1xuICAgKiovXG4gIGNoYW5nZVRyYWNrKHRyYWNrKSB7XG4gICAgZDMuc2VsZWN0QWxsKCcubW9vZGJhciBzdmcgZycpLnJlbW92ZSgpOyAvLyBDbGVhciBjdXJyZW50IG1vb2RiYXJcbiAgICB0aGlzLnRvZ2dsZVBsYXkoKTtcbiAgICB0aGlzLl9zY2VuZS5jaGFuZ2VUcmFjayh0cmFjay5pZCk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBtemsubW9kZWwuZ2V0UGxheWVyKCk7XG4gICAgdGhpcy5fZm9vdEJhci5yZW5kZXJNb29kRmlsZSh0cmFjay5tb29kYmFyKTtcbiAgICB0aGlzLl9mb290QmFyLmdldFByb2dyZXNzQmFyKCkudXBkYXRlRHVyYXRpb24ocGxheWVyLmdldER1cmF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlUGxheVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBWaWV3XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlIFVJIGVsZW1lbnRzIGFjY29yZGluZyB0byB0aGUgbmV3IHBsYXlpbmcgc3RhdGVcbiAgICoqL1xuICB0b2dnbGVQbGF5KCkge1xuICAgIGNvbnN0IGlzUGxheWluZyA9IG16ay5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRJc1BsYXlpbmcoKTtcbiAgICB0aGlzLl9mb290QmFyLnVwZGF0ZVBsYXlCdXR0b24oaXNQbGF5aW5nKTtcblxuICAgIGlmIChpc1BsYXlpbmcpIHsgLy8gRG9uJ3QgaGFuZGxlICFwbGF5aW5nIChkZXNhY3RpdmF0ZSkgYmMgcGF1c2UgIT0gc3RvcFxuICAgICAgdGhpcy5fZm9vdEJhci5nZXRQcm9ncmVzc0JhcigpLmFjdGl2YXRlKCk7IC8vIEFjdGl2YXRlIG1ha2UgdGhlIHByb2dyZXNzIGJhciBhcHBlYXIgdy8gYW5pbWF0aW9uXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc3RvcFBsYXliYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIFVJIGVsZW1lbnQgdG8gbWF0Y2ggdGhlIHBsYXllciBzdGFuZCBieSBzdGF0ZVxuICAgKiovXG4gIHN0b3BQbGF5YmFjaygpIHtcbiAgICBkMy5zZWxlY3RBbGwoJy5tb29kYmFyIHN2ZyBnJykucmVtb3ZlKCk7IC8vIENsZWFyIGN1cnJlbnQgbW9vZGJhclxuICAgIHRoaXMuX2Zvb3RCYXIudXBkYXRlUGxheUJ1dHRvbihmYWxzZSk7IC8vIFNlbmQgIWlzUGxheWluZyB0byByZXN0b3JlIHBsYXkgaWNvblxuICAgIHRoaXMuX2Zvb3RCYXIuZ2V0UHJvZ3Jlc3NCYXIoKS5yZXNldFByb2dyZXNzQmFyKCk7XG4gICAgdGhpcy5fc2NlbmUuc3RvcFBsYXliYWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBpbml0UGxheWxpc3RcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIGdpdmVuIHBsYXlsaXN0IGludG8gdGhlIHNjZW5lL3ZpZXdcbiAgICogQHBhcmFtIHtvYmplY3R9IHBsYXlsaXN0IC0gVGhlIHBsYXlsaXN0IHRvIGluaXQgdGhlIHZpZXcgd2l0aFxuICAgKiovXG4gIGluaXRQbGF5bGlzdChwbGF5bGlzdCkge1xuICAgIHRoaXMuX3NjZW5lLnVwZGF0ZVZpZXcocGxheWxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdXBkYXRlVm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIHZvbHVtZSB2YWx1ZXMgaW4gdGhlIFVJIGFjY29yZGluZyB0byB0aGUgcGxheWVyJ3MgdmFsdWVcbiAgICoqL1xuICB1cGRhdGVWb2x1bWUoKSB7XG4gICAgY29uc3QgcGxheWVyID0gbXprLm1vZGVsLmdldFBsYXllcigpO1xuICAgIHRoaXMuX2Zvb3RCYXIuZ2V0Vm9sdW1lQmFyKCkudXBkYXRlVm9sdW1lKHBsYXllci5nZXRJc011dGVkKCksIHBsYXllci5nZXRWb2x1bWUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1cGRhdGVQcm9ncmVzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBWaWV3XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyB0aGUgcHJvZ3Jlc3MgYmFyIGFjY29yZGluZyB0byB0aGUgcGxheWVyIHByb2dyZXNzJyB2YWx1ZVxuICAgKiovXG4gIHVwZGF0ZVByb2dyZXNzKCkgeyAvLyBDYWxsZWQgb25DbGlja1xuICAgIGNvbnN0IHByb2dyZXNzID0gbXprLm1vZGVsLmdldFBsYXllcigpLmdldFByb2dyZXNzKCk7XG4gICAgdGhpcy5fZm9vdEJhci5nZXRQcm9ncmVzc0JhcigpLmRlc2FjdGl2YXRlVHJhbnNpdGlvbnMoKTsgLy8gTXVzdCBkaXNhYmxlIHRyYW5zaXRpb24gd2hlbiBjYWxsZWRcbiAgICB0aGlzLl9mb290QmFyLmdldFByb2dyZXNzQmFyKCkuc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgLy8gUmVzdG9yZSB0cmFuc2l0aW9uc1xuICAgICAgdGhpcy5fZm9vdEJhci5nZXRQcm9ncmVzc0JhcigpLmFjdGl2YXRlVHJhbnNpdGlvbnMoKTtcbiAgICB9LmJpbmQodGhpcyksIDUwKTsgLy8gNSBpcyBmaW5lLCBidXQgNTAgaXMgbW9yZSAnbGFnIGZyaWVuZGx5J1xuICB9XG5cblxuICBleHRlbmRNYWluQ29udGFpbmVyKCkge1xuICAgIHRoaXMuX21haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXh0ZW5kZWQnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3NjZW5lLnZpZXcucmVmcmVzaFZpZXcoKTtcbiAgICB9LCA4MDApOyAvLyBWYWx1ZSBtdXN0IG1hdGNoIDQgdGltZXMgdGhlICR0cmFuc2l0aW9uLWR1cmF0aW9uIHZhciBpbiBzY3NzL3V0aWxzL3Rvb2xzL192YXJpYWJsZXMuc2Nzc1xuICB9XG5cbiAgcmV0cmFjdE1haW5Db250YWluZXIoKSB7XG4gICAgdGhpcy5fbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdleHRlbmRlZCcpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zY2VuZS52aWV3LnJlZnJlc2hWaWV3KCk7XG4gICAgfSwgODAwKTsgLy8gVmFsdWUgbXVzdCBtYXRjaCA0IHRpbWVzIHRoZSAkdHJhbnNpdGlvbi1kdXJhdGlvbiB2YXIgaW4gc2Nzcy91dGlscy90b29scy9fdmFyaWFibGVzLnNjc3NcbiAgfVxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkZE92ZXJsYXlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAZGVzY3JpcHRpb24gQWRkIGFuIG92ZXJsYXkgZGl2IChtb2RhbCBzdHlsZSkgb3ZlciB0aGUgc2NlbmVcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vZGUgLSBUaGUgRE9NIG5vZGUgdG8gYXBwZW5kIHRvIHRoZSBzY2VuZSBhcyBhbiBvdmVybGF5XG4gICAqKi9cbiAgYWRkT3ZlcmxheShub2RlKSB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgb3ZlcmxheS5pZCA9ICdvdmVybGF5JztcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXG4gICAgdGhpcy5fbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cblxuICByZW1vdmVPdmVybGF5KCkge1xuICAgIHRoaXMuX21haW5Db250YWluZXIucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKSk7XG4gIH1cblxuICBkaXNwbGF5TW9kYWwob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICduZXdsaWJyYXJ5Jykge1xuICAgICAgbXprLmtvbXVuaWthdG9yLmdldFRlbXBsYXRlKCdtb2RhbHMvbmV3bGlicmFyeS8nKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kYWwnKVswXTtcbiAgICAgICAgICB0aGlzLmFkZE92ZXJsYXkobW9kYWwpO1xuXG4gICAgICAgICAgdGhpcy5tb2RhbC5uZXdMaWJyYXJ5KHtcbiAgICAgICAgICAgIGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldE5leHRUcmFja0lkKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZS5nZXROZXh0VHJhY2tJZCgpO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNUcmFja0lkKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZS5nZXRQcmV2aW91c1RyYWNrSWQoKTtcbiAgfVxuXG4gIHN0YXJ0TG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9zY2VuZS5zdGFydExvYWRpbmcoKVxuICAgICAgICAudGhlbihyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BMb2FkaW5nKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3NjZW5lLnN0b3BMb2FkaW5nKClcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRSZXBlYXRNb2RlKHZhbHVlKSB7XG4gICAgdGhpcy5fZm9vdEJhci5zZXRSZXBlYXRNb2RlKHZhbHVlKTtcbiAgfVxuXG4gIGlzTGFzdFRyYWNrKCkge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZS5pc0xhc3RUcmFjaygpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBHRVRURVIgTUVUSE9EUyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIGdldEZvb3RCYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RCYXI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsImltcG9ydCBWb2x1bWVCYXIgZnJvbSAnLi9jb21wb25lbnRzL1ZvbHVtZUJhci5qcyc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnLi9jb21wb25lbnRzL1Byb2dyZXNzQmFyLmpzJztcbid1c2Vfc3RyaWN0JztcblxuY2xhc3MgRm9vdEJhciB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBGb290QmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBhbGwgY29tcG9uZW50cyBpbiB0aGUgRm9vdEJhciBhbmQgYWxsIHJlbGF0ZWQgZXZlbnRzXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fY29udHJvbHMgPSB7XG4gICAgICBwbGF5OiB7fSxcbiAgICAgIHN0b3A6IHt9LFxuICAgICAgdm9sdW1lOiB7fSxcbiAgICAgIHByZXZpb3VzOiB7fSxcbiAgICAgIG5leHQ6IHt9LFxuICAgICAgcmVwZWF0OiB7fVxuICAgIH07XG4gICAgdGhpcy5fdm9sdW1lQmFyID0ge307XG4gICAgdGhpcy5fcHJvZ3Jlc3NCYXIgPSB7fTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRm9vdEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBGb290QmFyIHdpdGggY29udHJvbHMsIGEgdm9sdW1lIGJhciBhbmQgYSBwcm9ncmVzcyBiYXJcbiAgICoqL1xuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9jb250cm9scy5wbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXknKTtcbiAgICB0aGlzLl9jb250cm9scy5zdG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3AnKTtcbiAgICB0aGlzLl9jb250cm9scy5wcmV2aW91cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aW91cycpO1xuICAgIHRoaXMuX2NvbnRyb2xzLm5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpO1xuICAgIHRoaXMuX2NvbnRyb2xzLnJlcGVhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBlYXQnKTtcblxuICAgIHRoaXMuX3ZvbHVtZUJhciA9IG5ldyBWb2x1bWVCYXIoKTtcbiAgICB0aGlzLl9wcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgRm9vdEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgYWwgY29udHJvbHMgY2xpY2sgZXZlbnRzXG4gICAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9jb250cm9scy5wbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbXprLnRvZ2dsZVBsYXkoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2NvbnRyb2xzLnN0b3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBtemsuc3RvcFBsYXliYWNrKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb250cm9scy5wcmV2aW91cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG16ay5wcmV2aW91c1RyYWNrSW5WaWV3KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb250cm9scy5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbXprLm5leHRUcmFja0luVmlldygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29udHJvbHMucmVwZWF0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbXprLnRvZ2dsZVJlcGVhdE1vZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1cGRhdGVQbGF5QnV0dG9uXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEZvb3RCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyB0aGUgcGxheSBpY29uIGFjY29yZGluZyB0byBhIGdpdmVuIHN0YXRlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQbGF5aW5nIC0gVGhlIHBsYXllciBwbGF5YmFjayBzdGF0ZVxuICAgKiovXG4gIHVwZGF0ZVBsYXlCdXR0b24oaXNQbGF5aW5nKSB7XG4gICAgaWYgKGlzUGxheWluZykge1xuICAgICAgdGhpcy5fY29udHJvbHMucGxheS5zcmMgPSAnLi4vLi4vc3RhdGljL2ltZy9wbGF5ZXIvcGF1c2Uuc3ZnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29udHJvbHMucGxheS5zcmMgPSAnLi4vLi4vc3RhdGljL2ltZy9wbGF5ZXIvcGxheS5zdmcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbmRlck1vb2RGaWxlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEZvb3RCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVuZGVyIGEgbW9vZCBmaWxlIGludG8gdGhlIHByb2dyZXNzLW1vb2RiYXIgY29udGFpbmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdXJsIHRvIGZldGNoIHRoZSBtb2RkIGZpbGVcbiAgICoqL1xuICByZW5kZXJNb29kRmlsZSh1cmwpIHtcbiAgICBtemsua29tdW5pa2F0b3IuZ2V0QmluYXJ5UmVzcG9uc2UodXJsKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlVGV4dCkgPT4ge1xuICAgICAgICAvLyBPcmlnaW5hbCBjb2RlIGZyb20gOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9WYWxvZGltLzUyMjU0NjBcbiAgICAgICAgY29uc3QgcmdiID0gWy4uLkFycmF5KChyZXNwb25zZVRleHQubGVuZ3RoIC8gMykpXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJnYi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIC8vIGAmIDB4ZmZgIEZvcmNlIDhiaXQgbG9uZyBpbnRlZ2VyICh0byBmaXQgcmdiIHJhbmdlIG9mIHZhbHVlcylcbiAgICAgICAgICBjb25zdCByID0gcmVzcG9uc2VUZXh0LmNoYXJDb2RlQXQoaSAqIDMpICYgMHhmZjtcbiAgICAgICAgICBjb25zdCBnID0gcmVzcG9uc2VUZXh0LmNoYXJDb2RlQXQoKGkgKiAzKSArIDEpICYgMHhmZjtcbiAgICAgICAgICBjb25zdCBiID0gcmVzcG9uc2VUZXh0LmNoYXJDb2RlQXQoKGkgKiAzKSArIDIpICYgMHhmZjtcblxuICAgICAgICAgIHJnYltpXSA9IHsgLy8gRW5oYW5jZW1lbnQgOiBIYXZlIGZ1biBoZXJlIHcvIGNvbG9ycyBhbmQgcHJlZlxuICAgICAgICAgICAgb2Zmc2V0OiBgJHsoaSAvIHJnYi5sZW5ndGggKiAxMDApfSVgLFxuICAgICAgICAgICAgY29sb3I6IGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDEpYFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdmcgPSBkMy5zZWxlY3QodGhpcy5fcHJvZ3Jlc3NCYXIuZ2V0TW9vZGJhckNvbnRhaW5lcigpLmNoaWxkTm9kZXNbMV0pLmFwcGVuZCgnZycpOyAvLyBUT0RPIDogY2hpbGROb2RlczAgLCByZW1vdmUgdGV4dCBic1xuXG4gICAgICAgIHN2Zy5hcHBlbmQoJ2xpbmVhckdyYWRpZW50JylcbiAgICAgICAgICAuYXR0cignaWQnLCBgbW9vZGJhci1ncmFkaWVudC0ke3VybFswXSArIHVybFsxXX1gKVxuICAgICAgICAgIC5hdHRyKCdncmFkaWVudFVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJylcbiAgICAgICAgICAuc2VsZWN0QWxsKCdzdG9wJylcbiAgICAgICAgICAuZGF0YShyZ2IpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKCdzdG9wJylcbiAgICAgICAgICAuYXR0cignb2Zmc2V0JywgZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZC5vZmZzZXQ7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYXR0cignc3RvcC1jb2xvcicsIGQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQuY29sb3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgc3ZnLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBgdXJsKCNtb29kYmFyLWdyYWRpZW50LSR7dXJsWzBdICsgdXJsWzFdfSlgKVxuICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgICAgICAuYXR0cignd2lkdGgnLCAnMTAwJScpO1xuICAgICAgfSk7XG4gIH1cblxuICBzZXRSZXBlYXRNb2RlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICB0aGlzLl9jb250cm9scy5yZXBlYXQuc3JjID0gJy9zdGF0aWMvaW1nL3BsYXllci9yZXBlYXQtb2ZmLnN2Zyc7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgICAgdGhpcy5fY29udHJvbHMucmVwZWF0LnNyYyA9ICcvc3RhdGljL2ltZy9wbGF5ZXIvcmVwZWF0LW9uZS5zdmcnO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDIpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLnJlcGVhdC5zcmMgPSAnL3N0YXRpYy9pbWcvcGxheWVyL3JlcGVhdC1hbGwuc3ZnJztcbiAgICB9XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgZ2V0UHJvZ3Jlc3NCYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzQmFyO1xuICB9XG4gIGdldFZvbHVtZUJhcigpIHtcbiAgICByZXR1cm4gdGhpcy5fdm9sdW1lQmFyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RCYXI7XG4iLCIndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgUHJvZ3Jlc3NCYXIge1xuICAvKipcbiAgICogQHN1bW1hcnkgSW50ZXJhY3RpdmUgUHJvZ3Jlc3MgQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIHRoZSBwcm9ncmVzcyBvdmVyIGEgdHJhY2tcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IHtcbiAgICAgIGNvbnRhaW5lcjoge30sXG4gICAgICB0cmFjazoge30sXG4gICAgICBjdXJyZW50OiB7fSxcbiAgICAgIHRodW1iOiB7fSxcbiAgICAgIGhvdmVyOiB7fSxcbiAgICAgIG1vb2RiYXI6IHt9LFxuICAgICAgbGVmdDoge30sXG4gICAgICByaWdodDoge31cbiAgICB9OyAvLyBET00gZWxlbWVudHNcbiAgICB0aGlzLl90b3BiYXJMb2dvID0ge307XG4gICAgdGhpcy5fcmFmSWQgPSBudWxsO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcblxuICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7IC8vIEJvb2xlYW4gZmxhZyB0byBtYWtlIGxpc3RlbmVycyBhdmFpbGFibGUvdW5hdmFpbGFibGVcbiAgICB0aGlzLl9pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8vICAtLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgcHJvZ3Jlc3MgYmFyIGRvbSBhbmQgZXZlbnRzXG4gICAqKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuX3Byb2dyZXNzLnRyYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLXRyYWNrJyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY3VycmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1jdXJyZW50Jyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3MudGh1bWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtdGh1bWInKTtcbiAgICB0aGlzLl9wcm9ncmVzcy5ob3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1ob3ZlcicpO1xuICAgIHRoaXMuX3Byb2dyZXNzLm1vb2RiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtbW9vZGJhcicpO1xuICAgIHRoaXMuX3Byb2dyZXNzLmxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhci1sZWZ0Jyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3MucmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhci1yaWdodCcpO1xuICAgIHRoaXMuX3RvcGJhckxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wYmFyLWxvZ28nKTtcblxuICAgIHRoaXMuX3Jlc2V0VGltZWNvZGUoKTtcblxuICAgIC8vIEluIG9yZGVyIHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgaW4gX3JlbW92ZUV2ZW50cygpXG4gICAgdGhpcy5fbW91c2VEb3duID0gdGhpcy5fbW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VNb3ZlID0gdGhpcy5fbW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fbW91c2VVcCA9IHRoaXMuX21vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLl91cGRhdGVNb3VzZU92ZXIgPSB0aGlzLl91cGRhdGVNb3VzZU92ZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9hZGRFdmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTGlzdGVuIHRvIG1vdXNlIGV2ZW50cyB3aGVuIFByb2dyZXNzQmFyIGlzIGFjdGl2YXRlZFxuICAgKiovXG4gIF9hZGRFdmVudHMoKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX21vdXNlRG93bik7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuX3VwZGF0ZU1vdXNlT3Zlcik7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLl91cGRhdGVNb3VzZU92ZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fbW91c2VVcCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfcmVtb3ZlRXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBtb3VzZSBldmVudHMgd2hlbiBQcm9ncmVzc0JhciBpcyBkZXNhY3RpdmF0ZWRcbiAgICoqL1xuICBfcmVtb3ZlRXZlbnRzKCkge1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZURvd24pO1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLl91cGRhdGVNb3VzZU92ZXIpO1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fdXBkYXRlTW91c2VPdmVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3VwZGF0ZU1vdXNlT3ZlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgbW91c2UgaG92ZXIgb24gcHJvZ3Jlc3MgYmFyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBldmVudCBvYmplY3RcbiAgICoqL1xuICBfdXBkYXRlTW91c2VPdmVyKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW92ZXInKSB7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5ob3Zlci5zdHlsZS5vcGFjaXR5ID0gJzEnOyAvLyBBdXRvbWF0aWMgQ1NTIHRyYW5zaXRpb25cbiAgICAgIHRoaXMuX2lzTW91c2VPdmVyID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWxlYXZlJykge1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MuaG92ZXIuc3R5bGUub3BhY2l0eSA9ICcwJzsgLy8gQXV0b21hdGljIENTUyB0cmFuc2l0aW9uXG4gICAgICB0aGlzLl9pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF91cGRhdGVIb3ZlclRpbWVjb2RlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgaG92ZXIgdGltZWNvZGUgdmFsdWVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHhQb3MgLSBUaGUgbW91c2UgWCBwb3NpdGlvbiBvbiBzY3JlZW5cbiAgICoqL1xuICBfdXBkYXRlSG92ZXJUaW1lY29kZSh4UG9zKSB7XG4gICAgY29uc3QgYm91bmRSZWN0ID0gdGhpcy5fcHJvZ3Jlc3MudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IHBlcmNlbnRhZ2UgPSAoKHhQb3MgLSBib3VuZFJlY3QubGVmdCkgKiAxMDApIC8gYm91bmRSZWN0LndpZHRoO1xuXG4gICAgaWYgKHBlcmNlbnRhZ2UgPiAxMDApIHtcbiAgICAgIHBlcmNlbnRhZ2UgPSAxMDA7XG4gICAgfVxuICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xuICAgICAgcGVyY2VudGFnZSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3MuaG92ZXIuc3R5bGUubGVmdCA9IGAkeygoKChib3VuZFJlY3Qud2lkdGggKiBwZXJjZW50YWdlKSAvIDEwMCkgLSAzMCkgKiAxMDApIC8gYm91bmRSZWN0LndpZHRofSVgO1xuICAgIHRoaXMuX3Byb2dyZXNzLmhvdmVyLmlubmVySFRNTCA9IFV0aWxzLnNlY29uZHNUb1RpbWVjb2RlKChwZXJjZW50YWdlICogdGhpcy5fZHVyYXRpb24pIC8gMTAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9tb3VzZURvd25cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIHRoZSBtb3VzZSBkb3duIGV2ZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBldmVudCBvYmplY3RcbiAgICoqL1xuICBfbW91c2VEb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nICYmXG4gICAgICAoZXZlbnQudGFyZ2V0LmlkID09PSAncHJvZ3Jlc3MtY29udGFpbmVyJyB8fFxuICAgICAgICBldmVudC50YXJnZXQuaWQgPT09ICdwcm9ncmVzcy10cmFjaycgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAncHJvZ3Jlc3MtY3VycmVudCcgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAncHJvZ3Jlc3MtbW9vZGJhcicgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAncHJvZ3Jlc3MtdGh1bWInIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5pZCA9PT0gJ21vb2RiYXJUaHVtYicgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09ICdyZWN0JykpIHtcblxuICAgICAgbXprLm11dGUoKTtcbiAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fc3RvcEFuaW1hdGlvbigpO1xuICAgICAgdGhpcy5fbW92ZVByb2dyZXNzKGV2ZW50LmNsaWVudFgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9tb3VzZVVwXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgbW91c2UgdXAgZXZlbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIG1vdXNlIGV2ZW50IG9iamVjdFxuICAgKiovXG4gIF9tb3VzZVVwKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcpIHsgLy8gVXNlciBoYXMgcmVsZWFzZWQgcHJvZ3Jlc3MgdGh1bWJcbiAgICAgIG16ay51bm11dGUoKTtcbiAgICAgIHRoaXMuX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3N0YXJ0QW5pbWF0aW9uKCk7XG4gICAgICB0aGlzLl9tb3ZlUHJvZ3Jlc3MoZXZlbnQuY2xpZW50WCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX21vdXNlTW92ZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgdGhlIG1vdXNlIG1vdmUgZXZlbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIG1vdXNlIGV2ZW50IG9iamVjdFxuICAgKiovXG4gIF9tb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUgJiYgdGhpcy5faXNEcmFnZ2luZykgeyAvLyBVc2VyIGlzIGRyYWdpbmcgcHJvZ3Jlc3MgdGh1bWJcbiAgICAgIHRoaXMuX21vdmVQcm9ncmVzcyhldmVudC5jbGllbnRYKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2lzQWN0aXZlICYmIHRoaXMuX2lzTW91c2VPdmVyKSB7IC8vIEhvdmVyIG9uIHByb2dyZXNzIHRyYWNrXG4gICAgICB0aGlzLl91cGRhdGVIb3ZlclRpbWVjb2RlKGV2ZW50LmNsaWVudFgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9tb3ZlUHJvZ3Jlc3NcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTW92ZSB0aGUgcHJvZ3Jlc3MgYWxvbmcgaXRzIHRyYWNrXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4UG9zIC0gVGhlIG1vdXNlIFggcG9zaXRpb24gb24gc2NyZWVuXG4gICAqKi9cbiAgX21vdmVQcm9ncmVzcyh4UG9zKSB7XG4gICAgY29uc3QgYm91bmRSZWN0ID0gdGhpcy5fcHJvZ3Jlc3MudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGRpc3RhbmNlID0gKCh4UG9zIC0gYm91bmRSZWN0LmxlZnQpICogMTAwKSAvIGJvdW5kUmVjdC53aWR0aDtcblxuICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgIGRpc3RhbmNlID0gMDtcbiAgICB9XG4gICAgaWYgKGRpc3RhbmNlID4gMTAwKSB7XG4gICAgICBkaXN0YW5jZSA9IDEwMDtcbiAgICB9XG5cbiAgICBtemsuc2V0UHJvZ3Jlc3MoVXRpbHMucHJlY2lzaW9uUm91bmQoZGlzdGFuY2UsIDMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9hbmltYXRlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgcHJvZ3Jlc3MgYmFyIGNvbXBsZXRpb24gYWNjb3JkaW5nIHRvIHRoZSBNemsgcGxheWVyIHByb2dyZXNzIHZhbHVlXG4gICAqKi9cbiAgX2FuaW1hdGUoKSB7XG4gICAgdGhpcy5zZXRQcm9ncmVzcyhtemsuZ2V0UHJvZ3Jlc3MoKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RhcnRBbmltYXRpb25cbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXNlIFJlcXVlc3RBbmltYXRpb25GcmFtZSB0byByZW5kZXIgYW5kIHNldFByb2dyZXNzIG1vc3Qgb2YgdGhlIGZyYW1lc1xuICAgKiovXG4gIF9zdGFydEFuaW1hdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2FuaW1hdGUoKTtcbiAgICAgIHRoaXMuX3JhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3N0YXJ0QW5pbWF0aW9uLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zdG9wQW5pbWF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENhbmNlbCBhbmltYXRpb24gZnJhbWUgaWYgbmVlZGVkXG4gICAqKi9cbiAgX3N0b3BBbmltYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmFmSWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9yZXNldFRpbWVjb2RlXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCBVSSB2YWx1ZXMgdG8gZGVmYXVsdCBgLS06LS1gXG4gICAqKi9cbiAgX3Jlc2V0VGltZWNvZGUoKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLmxlZnQuaW5uZXJIVE1MID0gJy0tOi0tJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnJpZ2h0LmlubmVySFRNTCA9ICctLTotLSc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5ob3Zlci5pbm5lckhUTUwgPSAnLS06LS0nO1xuICAgIH0uYmluZCh0aGlzKSwgNTAwKTsgLy8gTWF0Y2ggdmFsdWUgd2l0aCB0aGUgb25lIGluIHNjc3Mvdmlldy9jb21wb25lbnRzL19wcm9ncmVzYmFyLnNjc3MgLT4gJGZvb3RiYXItdHJhbnNpdGlvblxuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlc2V0UHJvZ3Jlc3NCYXJcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZXNldCB0aGUgcHJvZ3Jlc3MgYmFyIHRvIGl0cyBpbml0aWFsIHN0YXRlIGFuZCBkZXNhY3RpdmF0ZSBpdHMgZXZlbnRzIGFuZCB0cmFuc2l0aW9uc1xuICAgKiovXG4gIHJlc2V0UHJvZ3Jlc3NCYXIoKSB7XG4gICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcbiAgICB0aGlzLmRlc2FjdGl2YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhY3RpdmF0ZVRyYW5zaXRpb25zXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRW5hYmxlIHRoZSB0cmFuc2l0aW9uIG9uIHRoZSBQcm9ncmVzc0JhclxuICAgKiovXG4gIGFjdGl2YXRlVHJhbnNpdGlvbnMoKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MudGh1bWIuc3R5bGUudHJhbnNpdGlvbiA9ICdsZWZ0IDAuNHMgZWFzZSAwcywgb3BhY2l0eSAwLjRzIGVhc2UgMHMnOyAvLyBNYXRjaCB0cmFuc2l0aW9uIGR1cmF0aW9uIHcvIHRoZSBvbmUgaW4gdmlldy9fZm9vdGJhci5zY3NzICgkZm9vdGJhci10cmFuc2l0aW9uKVxuICAgIHRoaXMuX3Byb2dyZXNzLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd3aWR0aCAwLjRzIGVhc2UgMHMnOyAvLyBNYXRjaCB0cmFuc2l0aW9uIGR1cmF0aW9uIHcvIHRoZSBvbmUgaW4gdmlldy9fZm9vdGJhci5zY3NzICgkZm9vdGJhci10cmFuc2l0aW9uKVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzYWN0aXZhdGVUcmFuc2l0aW9uc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIERpc2FibGUgdGhlIHRyYW5zaXRpb24gb24gdGhlIFByb2dyZXNzQmFyXG4gICAqKi9cbiAgZGVzYWN0aXZhdGVUcmFuc2l0aW9ucygpIHtcbiAgICAvLyBIZXJlIHdlIG5lZWQgdG8gc2V0IHRyYW5zaXRpb24gdmFsdWUgdG8gMHMgdG8gYXZvaWQgbGFnIG9uIGN1cnJlbnQgYW5kIHRodW1iIHdoZW4gcHJvZ3Jlc3MgYmFyIGlzIGFjdGl2ZVxuICAgIC8vIExhZyBkdXJhdGlvbiB3aWxsIGJlIGVxdWFsIHRvIHRoZSB0cmFuc2l0aW9uIHRpbWUgb3RoZXJ3aXNlXG4gICAgLy8gUmVzZXQgbGVmdCBhbmQgd2lkdGggdHJhbnNpdGlvbiB0byBkZWZhdWx0LCBtYXRjaCB0cmFuc2l0aW9uIGR1cmF0aW9uIHcvIHRoZSBvbmUgaW4gdmlldy9fZm9vdGJhci5zY3NzICgkZm9vdGJhci10cmFuc2l0aW9uKVxuICAgIHRoaXMuX3Byb2dyZXNzLnRodW1iLnN0eWxlLnRyYW5zaXRpb24gPSAnbGVmdCAwcyBlYXNlIDBzLCBvcGFjaXR5IDAuNHMgZWFzZSAwcyc7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3dpZHRoIDBzIGVhc2UgMHMnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlQWN0aXZlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVG9nZ2xlIHRoZSBQcm9ncmVzc0JhciBhY3RpdmUgc3RhdHVzXG4gICAqKi9cbiAgdG9nZ2xlQWN0aXZlKCkge1xuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXNhY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFjdGl2YXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWN0aXZhdGUgdGhlIFByb2dyZXNzQmFyLCBzZXQgaXQgdmlzaWJsZSwgYWRkIGFuaW1hdGlvbnMgYW5kIGFkZCBtb3VzZSBldmVudHNcbiAgICoqL1xuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRydWUpO1xuICAgIHRoaXMuX3N0YXJ0QW5pbWF0aW9uKCk7XG4gICAgdGhpcy5hY3RpdmF0ZVRyYW5zaXRpb25zKCk7IC8vIFRPRE8gOiBhZGQgdHJhbnNpdGlvbiBpbiBzdGFydEFuaW1hdGlvblxuICAgIHRoaXMuX2FkZEV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZGVzYWN0aXZhdGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBEZXNhY3RpdmF0ZSB0aGUgUHJvZ3Jlc3NCYXIsIHNldCBpdCBpbnZpc2libGUsIHJlbW92ZSBhbmltYXRpb25zIGFuZCByZW1vdmUgbW91c2UgZXZlbnRzXG4gICAqKi9cbiAgZGVzYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnNldFZpc2liaWxpdHkoZmFsc2UpO1xuICAgIHRoaXMuX3Jlc2V0VGltZWNvZGUoKTtcbiAgICB0aGlzLl9yZW1vdmVFdmVudHMoKTtcbiAgICB0aGlzLl9zdG9wQW5pbWF0aW9uKCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyAvLyBEZWxheSBubyBhbmltYXRpb24gc3R5bGUgZm9yIHRodW1iIGFuZCBjdXJyZW50IChib3RoIGNvbWUgYXQgMCUgaW4gMC41cyBpbnRlcnZhbClcbiAgICAgIHRoaXMuZGVzYWN0aXZhdGVUcmFuc2l0aW9ucygpO1xuICAgIH0uYmluZCh0aGlzKSwgNTAwKTsgLy8gVXNlIHNhbWUgdGltZW91dCB2YWx1ZSBhcyB0aGUgdHJhbnNpdGlvbiB2YWx1ZSBzZXQgaW4gcmVzZXRQcm9ncmVzc0JhcigpLCBzbyBhbmltYXRpb24gY2FuIHJ1biBwcm9wZXJseVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0UHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQvU3Vic3RyYWN0IGEgY29tcGxldGlvbiBwZXJjZW50YWdlIHRvIHRoZSBQcm9ncmVzc0JhclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gVGhlIHBlcmNlbnRhZ2UgYW1vdW50IHRvIGFkZC9zdWJzdHJhY3QgaW4gcmFuZ2UgZmxvYXRbLTEwMCwxMDBdXG4gICAqKi9cbiAgYWRqdXN0UHJvZ3Jlc3MoYW1vdW50KSB7XG4gICAgdGhpcy5zZXRQcm9ncmVzcygwICsgYW1vdW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVwZGF0ZUR1cmF0aW9uXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHRoZSBkdXJhdGlvbiB2YWx1ZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIC0gVGhlIHRyYWNrIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICoqL1xuICB1cGRhdGVEdXJhdGlvbihkdXJhdGlvbikge1xuICAgIHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy5fcHJvZ3Jlc3MucmlnaHQuaW5uZXJIVE1MID0gVXRpbHMuc2Vjb25kc1RvVGltZWNvZGUoZHVyYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc2V0UHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgdGhlIGNvbXBsZXRpb24gcGVyY2VudGFnZSBvZiB0aGUgUHJvZ3Jlc3NCYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnRhZ2UgLSBUaGUgcHJvZ3Jlc3MgcGVyY2VudGFnZSB0byBzZXRcbiAgICoqL1xuICBzZXRQcm9ncmVzcyhwZXJjZW50YWdlKSB7XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5jdXJyZW50LnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnRodW1iLnN0eWxlLmxlZnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubGVmdC5pbm5lckhUTUwgPSBVdGlscy5zZWNvbmRzVG9UaW1lY29kZSgocGVyY2VudGFnZSAqIHRoaXMuX2R1cmF0aW9uKSAvIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc2V0VmlzaWJpbGl0eVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgdmlzaWJpbGl0eSBzdGF0dXMgb2YgdGhlIFByb2dyZXNzQmFyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNWaXNpYmxlIC0gVGhlIHZpc2liaWxpdHkgc3RhdGVcbiAgICoqL1xuICBzZXRWaXNpYmlsaXR5KGlzVmlzaWJsZSkge1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLm1vb2RiYXIuc3R5bGUuaGVpZ2h0ID0gJzI1cHgnOyAvLyBNYXRjaCB2YWx1ZSB3LyB0aGUgb25lIGluIHZpZXcvY29tcG9uZW50cy9fcHJvZ3Jlc2Jhci5zY3NzICgkcHJvZ3Jlc3MtbW9vZGJhci1oZWlnaHQpXG4gICAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnRyYWNrLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50cmFjay5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50aHVtYi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubGVmdC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MucmlnaHQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgIHRoaXMuX3RvcGJhckxvZ28uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubW9vZGJhci5zdHlsZS5oZWlnaHQgPSAnMCc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnRyYWNrLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50cmFjay5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50aHVtYi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubGVmdC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MucmlnaHQuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgIHRoaXMuX3RvcGJhckxvZ28uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICB9XG4gIH1cblxuICAvLyAgLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tICAvL1xuXG4gIGdldE1vb2RiYXJDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzLm1vb2RiYXI7XG4gIH1cblxuXG4gIC8vICAtLS0tICBTRVRURVIgTUVUSE9EUyAgIC0tLS0gIC8vXG5cbiAgc2V0SXNBY3RpdmUoaXNBY3RpdmUpIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IGlzQWN0aXZlO1xuICB9XG4gIHNldElzTW91c2VPdmVyKGlzTW91c2VPdmVyKSB7XG4gICAgdGhpcy5faXNNb3VzZU92ZXIgPSBpc01vdXNlT3ZlcjtcbiAgfVxuICBzZXRJc0RyYWdnaW5nKGlzRHJhZ2dpbmcpIHtcbiAgICB0aGlzLl9pc0RyYWdnaW5nID0gaXNEcmFnZ2luZztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgVm9sdW1lQmFyIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFVJIFZvbHVtZUJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbnRlcmFjdGl2ZSB2b2x1bWUgYmFyIHRoYXQgaXMgbGlua2VkIHRvIE1hbmFaZWFrIGxvZ2ljXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdm9sdW1lID0ge1xuICAgICAgaW1hZ2U6IHt9LFxuICAgICAgd3JhcHBlcjoge30sXG4gICAgICBjb250YWluZXI6IHt9LFxuICAgICAgY3VycmVudDoge30sXG4gICAgICB0aHVtYjoge31cbiAgICB9O1xuICAgIHRoaXMuX3Nob3dIaWRlVGltZW91dElkID0gLTE7XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fdm9sdW1lID0ge1xuICAgICAgaW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2x1bWViYXItaW1nJyksXG4gICAgICB3cmFwcGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lYmFyLXdyYXBwZXInKSxcbiAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvbHVtZWJhci1jb250YWluZXInKSxcbiAgICAgIGN1cnJlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2x1bWViYXItY3VycmVudCcpLFxuICAgICAgdGh1bWI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2x1bWViYXItdGh1bWInKVxuICAgIH07XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fdm9sdW1lLmltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXprLnRvZ2dsZU11dGUuYmluZChtemspKTtcbiAgICB0aGlzLl92b2x1bWUuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX21vdXNlRG93bi5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMuX21vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLl9tb3VzZVVwLmJpbmQodGhpcyk7XG4gIH1cblxuICBfbW91c2VEb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcgJiYgKGV2ZW50LnRhcmdldC5pZCA9PT0gJ3ZvbHVtZWJhci13cmFwcGVyJyB8fFxuICAgICAgICBldmVudC50YXJnZXQuaWQgPT09ICd2b2x1bWViYXItY29udGFpbmVyJyB8fFxuICAgICAgICBldmVudC50YXJnZXQuaWQgPT09ICd2b2x1bWViYXItY3VycmVudCcgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAndm9sdW1lYmFyLXRodW1iJykpIHtcblxuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX21vdmVWb2x1bWUoZXZlbnQpO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fbW91c2VVcCk7XG4gICAgfVxuICB9XG5cbiAgX21vdXNlTW92ZShldmVudCkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuX21vdmVWb2x1bWUoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIF9tb3VzZVVwKCkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICAgIH1cbiAgfVxuXG4gIF9tb3ZlVm9sdW1lKGV2ZW50KSB7XG4gICAgLy8gR2V0IGNvbnRhaW5lciBib3VuZCByZWN0YW5nbGUgYW5kIGNvbXB1dGUgZGlmZmVyZW5jZSBpbiBweCBhbmQgJSAocHIpXG4gICAgY29uc3QgYm91bmRSZWN0ID0gdGhpcy5fdm9sdW1lLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0b0xlZnRJblB4ID0gZXZlbnQuY2xpZW50WCAtIGJvdW5kUmVjdC5sZWZ0OyAvLyBDbGllbnQgWCBwb3NpdGlvbiBtaW51cyBjb250YWluZXIgbGVmdCBYIHBvc2l0aW9uIGVxdWFscyBYIHZhcmlhdGlvbiBmcm9tIGNvbnRhaW5lciBsZWZ0IHNpZGVcbiAgICBsZXQgdG9MZWZ0SW5QciA9ICh0b0xlZnRJblB4ICogMTAwKSAvIGJvdW5kUmVjdC53aWR0aDsgLy8gR2V0IHdpZHRoIHBlcmNlbnRhZ2UgZGVwZW5kaW5nIG9uIGNvbnRhaW5lciB3aWR0aFxuICAgIC8vIE9PQiBwcm90ZWN0aW9uXG4gICAgaWYgKHRvTGVmdEluUHIgPiAxMDApIHtcbiAgICAgIHRvTGVmdEluUHIgPSAxMDA7XG4gICAgfVxuICAgIGlmICh0b0xlZnRJblByIDwgMCkge1xuICAgICAgdG9MZWZ0SW5QciA9IDA7XG4gICAgfVxuICAgIC8vIFNldCBtemsgZ2xvYmFsIHZvbHVtZVxuICAgIG16ay5zZXRWb2x1bWUodG9MZWZ0SW5QciAvIDEwMCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgdXBkYXRlVm9sdW1lKGlzTXV0ZWQsIHZvbHVtZSkge1xuICAgIGNvbnN0IHJlbW92ZUZ1bGxDbGFzcyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl92b2x1bWUuY3VycmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Z1bGwnKSkge1xuICAgICAgICB0aGlzLl92b2x1bWUuY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvbHVtZSAqPSAxMDA7XG4gICAgLy8gSWNvbiB1cGRhdGVcbiAgICBpZiAodm9sdW1lID09PSAwIHx8ICh0eXBlb2YgaXNNdXRlZCA9PT0gJ2Jvb2xlYW4nICYmIGlzTXV0ZWQgPT09IHRydWUpKSB7XG4gICAgICByZW1vdmVGdWxsQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3ZvbHVtZS5pbWFnZS5zcmMgPSAnL3N0YXRpYy9pbWcvcGxheWVyL3ZvbHVtZS1tdXRlLnN2Zyc7XG4gICAgfSBlbHNlIGlmICh2b2x1bWUgPiAwICYmIHZvbHVtZSA8IDUwKSB7XG4gICAgICByZW1vdmVGdWxsQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3ZvbHVtZS5pbWFnZS5zcmMgPSAnL3N0YXRpYy9pbWcvcGxheWVyL3ZvbHVtZS1oYWxmLnN2Zyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUZ1bGxDbGFzcygpO1xuICAgICAgdGhpcy5fdm9sdW1lLmltYWdlLnNyYyA9ICcvc3RhdGljL2ltZy9wbGF5ZXIvdm9sdW1lLWZ1bGwuc3ZnJztcbiAgICB9XG5cbiAgICBpZiAodm9sdW1lID4gOTcgJiYgdm9sdW1lIDw9IDEwMCkgeyAvLyBBZGQgYm9yZGVyIHJhZGl1cyBvbiByaWdodCBzaWRlXG4gICAgICB0aGlzLl92b2x1bWUuY3VycmVudC5jbGFzc0xpc3QuYWRkKCdmdWxsJyk7XG4gICAgfVxuXG4gICAgLy8gQ3VycmVudCBhbmQgdGh1bWIgdXBkYXRlXG4gICAgaWYgKHR5cGVvZiBpc011dGVkID09PSAnYm9vbGVhbicgJiYgaXNNdXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgdm9sdW1lID0gMDtcbiAgICB9IC8vIFRvIHNldCB2b2x1bWUgY3VycmVudCBhbmQgdGh1bWIgYXQgMCUgbGVmdCB3aGVuIG11dGVkLlxuICAgIHRoaXMuX3ZvbHVtZS5jdXJyZW50LnN0eWxlLndpZHRoID0gYCR7dm9sdW1lfSVgO1xuICAgIHRoaXMuX3ZvbHVtZS50aHVtYi5zdHlsZS5sZWZ0ID0gYCR7dm9sdW1lfSVgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZvbHVtZUJhcjtcbiIsImltcG9ydCBBc2lkZUVudHJ5IGZyb20gJy4vQXNpZGVFbnRyeS5qcyc7XG4ndXNlX3N0cmljdCc7XG5cbmNsYXNzIEFzaWRlIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEEgY29tcG9uZW50cyBjb250YWluZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYW4gYmUgZmlsbGVkIHdpdGggdmFyaW91cyBBc2lkZUVudHJpZXMgYW5kIGlzIG1lYW50IHRvIGJlIGJvdGggc2lkZXMgb2YgYSBNemsgc2NlbmVcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgQXNpZGUgb3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2lkZSAtIFRoZSBBc2lkZSBwb3NpdGlvbiBvbiBzY3JlZW4gKGBsZWZ0YCBvciBgcmlnaHRgIG9ubHkpXG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZG9tID0ge307XG4gICAgdGhpcy5fb3BlbiA9IHt9O1xuICAgIHRoaXMuX2Nsb3NlID0ge307XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEFzaWRlXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgQXNpZGUgYWNjb3JkaW5nIHRvIGl0cyBzaWRlXG4gICAqKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5kb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXNpZGUnKTtcblxuICAgIHRoaXMuX2Nsb3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FzaWRlLWNsb3NlJyk7XG4gICAgdGhpcy5fb3BlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhc2lkZS1vcGVuJyk7XG5cbiAgICBjb25zdCBhID0gbmV3IEFzaWRlRW50cnkoe1xuICAgICAgdGl0bGU6ICdDb250ZW50IHRvIGNvbWUgc29tZSBkYXkhJ1xuICAgIH0pO1xuICAgIHRoaXMuZG9tLmFwcGVuZENoaWxkKGEuZ2V0RG9tKCkpO1xuXG4gICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEFzaWRlXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIEFzaWRlIG1vdXNlIGNsaWNrIGV2ZW50cyAoc2hvdyBhbmQgaGlkZSlcbiAgICoqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcbiAgICB0aGlzLl9vcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93KTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBoaWRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEFzaWRlXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGlkZSB0aGUgYXNpZGUgd2l0aCBhbmltYXRpb25cbiAgICoqL1xuICBoaWRlKCkge1xuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICAgIHRoaXMuZG9tLnN0eWxlLmxlZnQgPSBgLSR7KCh0aGlzLmRvbS5vZmZzZXRXaWR0aCAqIDEwMCkgLyB2aWV3cG9ydFdpZHRoKX0lYDtcbiAgICB0aGlzLl9jbG9zZS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLl9vcGVuLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIG16ay52aWV3LmV4dGVuZE1haW5Db250YWluZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNob3dcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQXNpZGVcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTaG93IHRoZSBhc2lkZSB3aXRoIGFuaW1hdGlvblxuICAgKiovXG4gIHNob3coKSB7XG4gICAgdGhpcy5kb20uc3R5bGUubGVmdCA9IDA7XG4gICAgdGhpcy5fY2xvc2Uuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgdGhpcy5fb3Blbi5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICBtemsudmlldy5yZXRyYWN0TWFpbkNvbnRhaW5lcigpO1xuICB9XG5cbiAgdG9nZ2xlSGlkZVNob3coKSB7XG4gICAgaWYgKHRoaXMuZG9tLnN0eWxlLmxlZnQgPT09ICcwcHgnKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzaWRlO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBBc2lkZUVudHJ5IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEFuIGVudHJ5IHRoYXQgaXMgbWVhbnQgdG8gYmUgdXNlZCBhcyBhbiBBc2lkZSBjaGlsZHJlblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRPRE9cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgQXNpZGVFbnRyeSBvcHRpb25zIG9iamVjdFxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZTtcbiAgICB0aGlzLmRvbSA9IHt9O1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBBc2lkZUVudHJ5XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgQXNpZGVFbnRyeSBET00gYW5kIGZpbGwgaXQgd2l0aCBpbnN0YW5jZSBhdHRyaWJ1dGVzXG4gICAqKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5kb20udGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdQJyk7XG4gICAgdGhpcy5kb20udGl0bGUuaW5uZXJIVE1MID0gdGhpcy50aXRsZTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXREb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9tLnRpdGxlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzaWRlRW50cnk7XG4iLCJpbXBvcnQgTGlzdFZpZXcgZnJvbSAnLi92aWV3cy9MaXN0Vmlldy5qcyc7XG4ndXNlX3N0cmljdCc7XG5cbmNsYXNzIFNjZW5lIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IE1hbmFaZWFrIG1haW4gc2NlbmUgdG8gcmVuZGVycyB2aWV3cyBpblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgbWFpbiBzY2VuZVxuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3NjZW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjZW5lJyk7XG4gICAgdGhpcy5fb3B0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctb3B0aW9uJyk7XG4gICAgLy8gVE9ETyA6IGFkZCB0ZXN0IGZ1bmN0aW9uIHRoYXQgcmVwbGFjZSBzY2VuZSB3aXRoIGEgc2FuZEJveCB0byB3b3JrIHdpdGhcblxuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9vcHRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnZpZXcub3B0aW9uc0NsaWNrZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBzdG9wUGxheWJhY2soKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZVBsYXlpbmdJY29uKCk7IC8vIFdhcm5pbmcsIHRoaXMgaXMgc3BlY2lmaWMgdG8gbGlzdFZpZXcgc28gZmFyXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGRWaWV3XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNjZW5lXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGEgbmV3IHZpZXcgaW4gdGhlIHNjZW5lIChvbmx5IGFwcGVuZCB0aGUgRE9NIGVsZW1lbnQpXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gVGhlIERPTSBub2RlIHRvIGFwcGVuZCB0byB0aGUgc2NlbmVcbiAgICoqL1xuICBhZGRWaWV3KG5vZGUpIHtcbiAgICAvLyBUT0RPIDogY2xlYXIgZXhpc3RpbmcgbWF0ZXJpYWxcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB0aGlzLl9zY2VuZS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cblxuICBleHRlbmQoKSB7XG4gICAgdGhpcy5fc2NlbmUuY2xhc3NMaXN0LmFkZCgnZXh0ZW5kZWQnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudmlldy5yZWZyZXNoVmlldygpO1xuICAgIH0sIDgwMCk7IC8vIFZhbHVlIG11c3QgbWF0Y2ggNCB0aW1lcyB0aGUgJHRyYW5zaXRpb24tZHVyYXRpb24gdmFyIGluIHNjc3MvdXRpbHMvdG9vbHMvX3ZhcmlhYmxlcy5zY3NzXG4gIH1cblxuICByZXRyYWN0KCkge1xuICAgIHRoaXMuX3NjZW5lLmNsYXNzTGlzdC5yZW1vdmUoJ2V4dGVuZGVkJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy5yZWZyZXNoVmlldygpO1xuICAgIH0sIDgwMCk7IC8vIFZhbHVlIG11c3QgbWF0Y2ggNCB0aW1lcyB0aGUgJHRyYW5zaXRpb24tZHVyYXRpb24gdmFyIGluIHNjc3MvdXRpbHMvdG9vbHMvX3ZhcmlhYmxlcy5zY3NzXG4gIH1cblxuICB0b2dnbGVFeHRlbnNpb24oKSB7XG4gICAgaWYgKHRoaXMuX3NjZW5lLmNsYXNzTGlzdC5jb250YWlucygnZXh0ZW5kZWQnKSkge1xuICAgICAgdGhpcy5yZXRyYWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXh0ZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdXBkYXRlVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTY2VuZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgY3VycmVudCB2aWV3IHdpdGggdGhlIGdpdmVuIHBsYXlsaXN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwbGF5bGlzdCAtIFRoZSBwbGF5bGlzdCB0byB1cGRhdGUgdGhlIHZpZXcgd2l0aFxuICAgKiovXG4gIHVwZGF0ZVZpZXcocGxheWxpc3QpIHtcbiAgICBjb25zdCBhcnRpc3RzID0gcGxheWxpc3QuZ2V0QXJ0aXN0cygpO1xuICAgIGNvbnN0IHRyYWNrcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnRpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFydGlzdHNbaV0uYWxidW1zLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgYXJ0aXN0c1tpXS5hbGJ1bXNbal0udHJhY2tzLmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgdHJhY2tzLnB1c2goYXJ0aXN0c1tpXS5hbGJ1bXNbal0udHJhY2tzW2tdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgIG5hbWU6ICdEdXJhdGlvbicsXG4gICAgICAgICAgb3JkZXI6IDAsXG4gICAgICAgICAgd2lkdGg6ICcxMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdUaXRsZScsXG4gICAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgICAgd2lkdGg6ICcyMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdBcnRpc3QnLFxuICAgICAgICAgIG9yZGVyOiAyLFxuICAgICAgICAgIHdpZHRoOiAnMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnQ29tcG9zZXInLFxuICAgICAgICAgIG9yZGVyOiAzLFxuICAgICAgICAgIHdpZHRoOiAnMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnUGVyZm9ybWVyJyxcbiAgICAgICAgICBvcmRlcjogNCxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0FsYnVtJyxcbiAgICAgICAgICBvcmRlcjogNSxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0dlbnJlJyxcbiAgICAgICAgICBvcmRlcjogNixcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgdGFyZ2V0OiB0aGlzLl9zY2VuZSxcbiAgICAgIGF2YWlsYWJsZUNvbHVtbnM6IFsgLy8gVE9ETyA6IHN0b3JlIHRoaXMgaW4gYSBkZWZhdWx0Lmpzb24gZmlsZSBzb21ld2hlcmVcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdEdXJhdGlvbicsXG4gICAgICAgICAgb3JkZXI6IDAsXG4gICAgICAgICAgd2lkdGg6ICcxMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdUaXRsZScsXG4gICAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgICAgd2lkdGg6ICcyMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdBcnRpc3QnLFxuICAgICAgICAgIG9yZGVyOiAyLFxuICAgICAgICAgIHdpZHRoOiAnMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnQ29tcG9zZXInLFxuICAgICAgICAgIG9yZGVyOiAzLFxuICAgICAgICAgIHdpZHRoOiAnMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnUGVyZm9ybWVyJyxcbiAgICAgICAgICBvcmRlcjogNCxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0FsYnVtJyxcbiAgICAgICAgICBvcmRlcjogNSxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0dlbnJlJyxcbiAgICAgICAgICBvcmRlcjogNixcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMudmlldyA9IG5ldyBMaXN0VmlldyhvcHRpb25zKTsgLy8gVE9ETyA6IG1vdmUgdGhpc1xuICAgIHRoaXMuYWRkVmlldyh0aGlzLnZpZXcuZ2V0RE9NRnJhZ21lbnQoKSk7XG4gICAgdGhpcy52aWV3LmFkZFRyYWNrcyh0cmFja3MpO1xuLypcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudmlldy5jZW50ZXJPbigyKTtcbiAgICB9LCA1MDApO1xuKi9cbiAgfVxuXG4gIGNoYW5nZVRyYWNrKGlkKSB7XG4gICAgdGhpcy52aWV3LmNoYW5nZVRyYWNrKGlkKTtcbiAgfVxuXG4gIGdldE5leHRUcmFja0lkKCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0TmV4dFRyYWNrSWQoKTtcbiAgfVxuXG4gIGdldFByZXZpb3VzVHJhY2tJZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldFByZXZpb3VzVHJhY2tJZCgpO1xuICB9XG5cbiAgaXNMYXN0VHJhY2soKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5pc0xhc3RUcmFjaygpO1xuICB9XG5cbiAgc3RhcnRMb2FkaW5nKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgIHNwaW5uZXIuaWQgPSAnbG9hZGluZy1zcGlubmVyJztcbiAgICAgIHRoaXMuX3NjZW5lLmFwcGVuZENoaWxkKHNwaW5uZXIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIDUwKTsgLy8gRW5zdXJlIHNwaW5uZXIgaGFzIHN0YXJ0ZWQgaXRzIGFuaW1hdGlvbiBiZWZvcmUgcmVzb2x2aW5nIHRoZSBwcm9taXNlXG4gICAgfSk7XG4gIH1cblxuICBzdG9wTG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IHNwaW5uZXIgPSB0aGlzLl9zY2VuZS5xdWVyeVNlbGVjdG9yKFwiI2xvYWRpbmctc3Bpbm5lclwiKTtcbiAgICAgICAgaWYgKHNwaW5uZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2NlbmUucmVtb3ZlQ2hpbGQoc3Bpbm5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjZW5lO1xuIiwiaW1wb3J0IExpc3RWaWV3RW50cnkgZnJvbSAnLi9MaXN0Vmlld0VudHJ5JztcbmltcG9ydCBTY3JvbGxCYXIgZnJvbSAnLi4vLi4vLi4vdXRpbHMvU2Nyb2xsQmFyLmpzJztcbid1c2Ugc3RyaWN0JztcblxuY2xhc3MgTGlzdFZpZXcge1xuICAvKipcbiAgICogQHN1bW1hcnkgTGlzdFZpZXcgZm9yIG16ayBTY2VuZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIExpc3RWaWV3IHRoYXQgZGlzcGxheSB0cmFja3Mgd2l0aCBjdXN0b21pemFibGUgY29sdW1ucyAoc2l6ZSBhbmQgdHlwZSkgaW4gcm93c1xuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBMaXN0VmlldyBvcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge2FycmF5fSBvcHRpb25zLmF2YWlsYWJsZUNvbHVtbnMgLSBUaGUgTGlzdFZpZXcgYXZhaWxhYmxlIGNvbHVtbiAobm90IG5lY2Vzc2FybHkgdGhlIG9uZXMgdGhhdCBhcmUgZGlzcGxheWVkKVxuICAgKiBAcGFyYW0ge2FycmF5fSBvcHRpb25zLmNvbHVtbnMgLSBUaGUgdXNlciBjb2x1bW5zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnRhcmdldCAtIFRoZSBET00gdGFyZ2V0IG5vZGUgdG8gaW5qZWN0IExpc3RWaWV3IGluICh1c3VhbGx5IG16ayBTY2VuZSlcbiAgICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fYXZhaWxhYmxlQ29sdW1ucyA9IG9wdGlvbnMuYXZhaWxhYmxlQ29sdW1ucztcbiAgICB0aGlzLl9jb2x1bW5zID0gb3B0aW9ucy5jb2x1bW5zO1xuICAgIHRoaXMuX3RyYWNrcyA9IFtdO1xuICAgIHRoaXMuX3RhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuICAgIHRoaXMuX3Njcm9sbEJhciA9IHt9O1xuICAgIHRoaXMuX2RvbSA9IHtcbiAgICAgIGZyYWdtZW50OiB7fSxcbiAgICAgIHdyYXBwZXI6IHt9LFxuICAgICAgaGVhZGVyOiB7fSxcbiAgICAgIGNvbnRhaW5lcjoge31cbiAgICB9O1xuXG4gICAgdGhpcy5fZHJhZ2dlZENvbHVtbiA9IG51bGw7XG4gICAgdGhpcy5fc2VsZWN0aW9uID0gW107XG4gICAgdGhpcy5fY2xpY2sgPSB7IC8vIE9iamVjdCB0byBoYW5kbGUgY2xpY2sgZXZlbnRzIG9uIHRyYWNrIGVudHJpZXNcbiAgICAgIGRiY2xpY2s6IGZhbHNlLFxuICAgICAgdGFyZ2V0SWQ6IC0xLFxuICAgICAgdGltZW91dElkOiAtMVxuICAgIH07XG5cbiAgICB0aGlzLl9wbGF5aW5nVHJhY2tJbmRleCA9IC0xO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX2RvbS5mcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0aGlzLl9kb20ud3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIHRoaXMuX2RvbS5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl9kb20uY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cbiAgICB0aGlzLl9kb20ud3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsaXN0dmlldycpO1xuICAgIHRoaXMuX2RvbS5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG4gICAgdGhpcy5fZG9tLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0cmFjay1jb250YWluZXInKTtcbiAgICB0aGlzLl90YXJnZXQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXG4gICAgdGhpcy5fZG9tLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5fZG9tLmhlYWRlcik7XG4gICAgdGhpcy5fZG9tLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5fZG9tLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fZG9tLmZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX2RvbS53cmFwcGVyKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5faW5pdEhlYWRlcigpO1xuICAgIH0sIDApOyAvLyBXYWl0IHRoYXQgaGVhZGVyIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBET01cbiAgfVxuXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fZG9tLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fdHJhY2tDbGlja2VkKGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMudW5zZWxlY3RBbGwoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB0aGlzLl9yZWZyZXNoR3JpZENvbHVtbih0aGlzLl9jb21wdXRlR3JpZFRlbXBsYXRlQ29sdW1ucygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIF90cmFja0NsaWNrZWQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gQmxvY2sgd2luZG93IGNsaWNrIGxpc3RlbmVyXG5cbiAgICBjb25zdCB0YXJnZXRJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaWQ7XG5cbiAgICBpZiAoIXRhcmdldElkKSB7XG4gICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jbGljay5kYmNsaWNrIHx8IHRoaXMuX2NsaWNrLnRhcmdldElkICE9PSB0YXJnZXRJZCkgeyAvLyBTZWNvbmQgdGVzdCBmb3JjZSBkYmNsaWNrIHRvIG9jY3VyIG9uIHNhbWUgdHJhY2tcbiAgICAgIHRoaXMuX2NsaWNrLmRiY2xpY2sgPSB0cnVlO1xuICAgICAgdGhpcy5fY2xpY2sudGFyZ2V0SWQgPSB0YXJnZXRJZDtcblxuICAgICAgaWYgKCFldmVudC5jdHJsS2V5KSB7IC8vIFNpbXBsZSBjbGljayB1bnNlbGVjdHMgYWxsXG4gICAgICAgIGNvbnN0IGlzVGFyZ2V0U2VsZWN0ZWQgPSB0aGlzLl90cmFja3NbdGFyZ2V0SWRdLmdldElzU2VsZWN0ZWQoKTsgLy8gU2F2aW5nIHRhcmdldCBzZWxlY3Rpb24gc3RhdGUgYmVmb3JlIHVuc2VsZWN0aW5nIGFsbFxuICAgICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XG4gICAgICAgIHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uc2V0U2VsZWN0ZWQoaXNUYXJnZXRTZWxlY3RlZCk7IC8vIFJlc3RvcmUgcHJldmlvdXMgc3RhdGUgdG8gcHJvcGVybHkgdXNlIGluIE5vcm1hbCBjbGljayBiZWhhdmlvciBjb25kaXRpb25cbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnB1c2gocGFyc2VJbnQodGFyZ2V0SWQsIDEwKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5ICYmIHRoaXMuX3NlbGVjdGlvbi5sZW5ndGggPiAwKSB7IC8vIEN0cmwgKyBTaGlmdCArIENsaWNrIDogZmlsbCBzZWxlY3Rpb24gaW4gYmV0d2VlbiB0YXJnZXQgYW5kIGNsb3Nlc3Qgc2VsZWN0aW9uZWQgdHJhY2tcbiAgICAgICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPIDogZGlmZsOpcmVuY2UgZW50cmUgdGFyZ2V0IGV0IGxlIGRlcm5pZXIgZW5kcm9pdCBvdSBvbiBjbGlja1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGxldCBlbmQgPSAwO1xuXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQodGFyZ2V0SWQsIDEwKSA8IHRoaXMuX3NlbGVjdGlvblswXSkgeyAvLyBDb21wYXJlIHRvIHRoaXMuX3NlbGVjdGlvblswXSBzaW5jZSB0aGlzLl9zZWxlY3Rpb24gaXMgYWx3YXlzIG9yZGVyZWRcbiAgICAgICAgICAgICAgc3RhcnQgPSBwYXJzZUludCh0YXJnZXRJZCwgMTApO1xuICAgICAgICAgICAgICBlbmQgPSB0aGlzLl9zZWxlY3Rpb25bMF07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlSW50KHRhcmdldElkLCAxMCkgPiB0aGlzLl9zZWxlY3Rpb25bdGhpcy5fc2VsZWN0aW9uLmxlbmd0aCAtIDFdKSB7IC8vIFNhbWUgaGVyZSB3aXRoIGdyZWF0ZXIgaW5kZXggaW4gdGhpcy5fc2VsZWN0aW9uXG4gICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5fc2VsZWN0aW9uW3RoaXMuX3NlbGVjdGlvbi5sZW5ndGggLSAxXSArIDE7IC8vICsxICB0byBhdm9pZCBmaXJzdCBpdGVtIHJlcGV0aXRpb25cbiAgICAgICAgICAgICAgZW5kID0gcGFyc2VJbnQodGFyZ2V0SWQsIDEwKSArIDE7IC8vICsxIHRvIG5vdCBmb3JnZXQgdGhlIHRhcmdldElkIHRvb1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkgeyAvLyBMb29wIHRvIGZpbGwgaW4gYmV0d2VlbiBpdGVtc1xuICAgICAgICAgICAgICB0aGlzLl90cmFja3NbaV0uc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbi5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHsgLy8gTm9ybWFsIGNsaWNrIGJlaGF2aW9yXG4gICAgICAgIG16ay52aWV3LnN0YXJ0TG9hZGluZygpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uZ2V0SXNTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uc2V0U2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3BsaWNlKHRoaXMuX3NlbGVjdGlvbi5pbmRleE9mKHRhcmdldElkKSwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl90cmFja3NbdGFyZ2V0SWRdLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24ucHVzaChwYXJzZUludCh0YXJnZXRJZCwgMTApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2xpY2sudGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NsaWNrLmRiY2xpY2sgPSBmYWxzZTtcbiAgICAgIH0sIDMwMCk7IC8vIERvdWJsZSBjbGljayBzcGVlZCBsb3dlciB0aGFuIDMwMG1zXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9jbGljay50aW1lb3V0SWQpO1xuICAgICAgdGhpcy5yZW1vdmVQbGF5aW5nSWNvbigpO1xuICAgICAgdGhpcy5fdHJhY2tzW3RhcmdldElkXS5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5wdXNoKHBhcnNlSW50KHRhcmdldElkLCAxMCkpO1xuICAgICAgbXprLmNoYW5nZVRyYWNrKHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uaWQpO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGlvbi5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gKGEgLSBiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZVRyYWNrKGlkKSB7XG4gICAgbGV0IHRhcmdldElkID0gMDtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuX3RyYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRoaXMuX3RyYWNrc1tpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGFyZ2V0SWQgPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9wbGF5aW5nVHJhY2tJbmRleCAhPT0gLTEgPyB0aGlzLl90cmFja3NbdGhpcy5fcGxheWluZ1RyYWNrSW5kZXhdLnNldFBsYXlpbmcoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHRoaXMuX3BsYXlpbmdUcmFja0luZGV4ID0gdGFyZ2V0SWQ7XG4gICAgICAgIHRoaXMuX2NsaWNrLmRiY2xpY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJhY2tzW3RhcmdldElkXS5zZXRQbGF5aW5nKHRydWUpO1xuICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgfSk7XG4gIH1cblxuICBvcHRpb25zQ2xpY2tlZCgpIHtcbiAgICBsZXQgbGlzdFZpZXdDb250ZXh0ID0gdGhpcy5fdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0dmlldy1jb250ZXh0Jyk7XG5cbiAgICBpZiAobGlzdFZpZXdDb250ZXh0ICE9PSBudWxsKSB7IC8vIENsb3NlIGNvbnRleHRcbiAgICAgIGxpc3RWaWV3Q29udGV4dC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgYXBwZW5kIGNvbnRleHQsIGFuZCBmaWxsIGl0IHdpdGggaXRzIGNvbnRlbnRcbiAgICBsZXQgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgndHJhbnNwYXJlbnQtb3ZlcmxheScpO1xuICAgIG92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJyNsaXN0dmlldy1jb250ZXh0JykpIHtcbiAgICAgICAgbGlzdFZpZXdDb250ZXh0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICBsaXN0Vmlld0NvbnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBsaXN0Vmlld0NvbnRleHQuaWQgPSAnbGlzdHZpZXctY29udGV4dCc7XG5cbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKGxpc3RWaWV3Q29udGV4dCk7XG4gICAgdGhpcy5fdGFyZ2V0LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICAgIHRoaXMuX2ZpbGxPcHRpb25zQ29udGV4dChsaXN0Vmlld0NvbnRleHQpO1xuICB9XG5cbiAgX2ZpbGxPcHRpb25zQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29uc3QgYWN0aXZhdGVkQ29sdW1ucyA9IHRoaXMuX2NoZWNrQWN0aXZhdGVkQ29sdW1ucygpO1xuXG4gICAgY29uc3QgY2hlY2tCb3hlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGNoZWNrQm94ZXMuY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gtY29udGFpbmVyJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F2YWlsYWJsZUNvbHVtbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdMQUJFTCcpO1xuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJTlBVVCcpO1xuXG4gICAgICBpbnB1dC5pZCA9ICdjb250ZXh0LScgKyB0aGlzLl9hdmFpbGFibGVDb2x1bW5zW2ldLm5hbWU7XG4gICAgICB0ZXh0LmlubmVySFRNTCA9IHRoaXMuX2F2YWlsYWJsZUNvbHVtbnNbaV0ubmFtZTtcbiAgICAgIHRleHQuc2V0QXR0cmlidXRlKCdmb3InLCBgY29udGV4dC0ke3RoaXMuX2F2YWlsYWJsZUNvbHVtbnNbaV0ubmFtZX1gKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuXG4gICAgICBpZiAoYWN0aXZhdGVkQ29sdW1ucy5pbmRleE9mKHRoaXMuX2F2YWlsYWJsZUNvbHVtbnNbaV0ubmFtZSkgIT09IC0xKSB7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0LmlkLm1hdGNoKC8tKC4qKS8pWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSAnJztcblxuICAgICAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fYXZhaWxhYmxlQ29sdW1ucy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fYXZhaWxhYmxlQ29sdW1uc1tqXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLl9hdmFpbGFibGVDb2x1bW5zW2pdLndpZHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90b2dnbGVDb2x1bW4oe1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjaGVja0JveGVzLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgIGNoZWNrQm94ZXMuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgfVxuXG4gICAgY29udGV4dC5hcHBlbmRDaGlsZChjaGVja0JveGVzKTtcblxuICAgIGNvbnN0IHN0cmV0Y2hBbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdCVVRUT04nKTtcbiAgICBzdHJldGNoQWxsLmlubmVySFRNTCA9ICdTdHJldGNoIEFsbCBDb2x1bW5zJztcbiAgICBjb250ZXh0LmFwcGVuZENoaWxkKHN0cmV0Y2hBbGwpO1xuXG4gICAgc3RyZXRjaEFsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLl9zdHJldGNoQWxsQ29sdW1ucygpO1xuICAgIH0pO1xuICB9XG5cbiAgX2luaXRIZWFkZXIoKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdGhpcy5fZG9tLmhlYWRlci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gdGhpcy5fY29tcHV0ZUdyaWRUZW1wbGF0ZUNvbHVtbnMoKTsgLy8gQXNzaWduIENTUyBydWxlXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHsgLy8gRmlsbCBoZWFkZXIgd2l0aCB1c2VyJ3MgY29sdW1uc1xuICAgICAgdGhpcy5fY29sdW1uc1tpXS5vcmRlciA9IGk7IC8vIEFzc2lnbiBjb2x1bW4gb3JkZXJcblxuICAgICAgY29uc3QgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBjb25zdCBzdHJldGNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XG4gICAgICBjb25zdCByZXNpemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblxuICAgICAgY29sdW1uLmNsYXNzTGlzdC5hZGQodGhpcy5fY29sdW1uc1tpXS5uYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgY29sdW1uLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICAgIGNvbHVtbi5pbm5lckhUTUwgPSB0aGlzLl9jb2x1bW5zW2ldLm5hbWU7XG4gICAgICBjb2x1bW4uZGF0YXNldC5pZCA9IGk7XG5cbiAgICAgIHN0cmV0Y2guY2xhc3NMaXN0LmFkZCgnbGlzdHZpZXctc3RyZXRjaC1idXR0b24nKTtcbiAgICAgIHN0cmV0Y2guc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcbiAgICAgIHN0cmV0Y2guc3JjID0gJy9zdGF0aWMvaW1nL2FjdGlvbnMvc3RyZXRjaC14LnN2Zyc7IC8vIFRPRE8gZXhwYW5kIHN2ZyAobGVmdCByaWdodCBhcnJvdyk7XG5cbiAgICAgIHJlc2l6ZS5jbGFzc0xpc3QuYWRkKCdsaXN0dmlldy1yZXNpemUtaGFuZGxlJyk7XG5cbiAgICAgIGNvbHVtbi5hcHBlbmRDaGlsZChyZXNpemUpO1xuICAgICAgY29sdW1uLmFwcGVuZENoaWxkKHN0cmV0Y2gpO1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgICAgIC8vIEFkZCBoZWFkZXIgZXZlbnRzIDogRHJhZyduJ0Ryb3AsIHJlc2l6ZSBhbmQgc3RyZXRjaCBzZWxmXG4gICAgICB0aGlzLl9oYW5kbGVEcmFnRXZlbnRzKGNvbHVtbik7XG4gICAgICB0aGlzLl9oYW5kbGVSZXNpemVFdmVudHMocmVzaXplKTtcbiAgICAgIHN0cmV0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5fc3RyZXRjaENvbHVtbihldmVudC50YXJnZXQucGFyZW50Tm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9kb20uaGVhZGVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgfVxuXG4gIF9oYW5kbGVSZXNpemVFdmVudHMoaGFuZGxlKSB7XG4gICAgY29uc3QgcGFyZW50ID0gaGFuZGxlLnBhcmVudE5vZGU7XG4gICAgY29uc3QgbWFya2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbGV0IGdyYWJiZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJlc2l6ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGdyYWJiZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fZG9tLndyYXBwZXIuYXBwZW5kQ2hpbGQobWFya2VyKTtcbiAgICAgIHBhcmVudC5zdHlsZS53aWR0aCA9IGAkeyhldmVudC5jbGllbnRYKSAtIChwYXJlbnQub2Zmc2V0TGVmdCArIHRoaXMuX3RhcmdldC5vZmZzZXRMZWZ0KX1weGA7XG4gICAgICBtYXJrZXIuc3R5bGUubGVmdCA9IGAke2V2ZW50LmNsaWVudFggLSB0aGlzLl90YXJnZXQub2Zmc2V0TGVmdCAtIDF9cHhgO1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9wUmVzaXppbmcgPSBldmVudCA9PiB7XG4gICAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCByZXNpemUsIGZhbHNlKTtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3BSZXNpemluZywgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKGdyYWJiZWQpIHtcbiAgICAgICAgICAgIGdyYWJiZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2RvbS53cmFwcGVyLnJlbW92ZUNoaWxkKG1hcmtlcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnNbaV0ubmFtZSA9PT0gcGFyZW50LmlubmVySFRNTC5tYXRjaCgvLio/KD89PGRpdnwkKS9pKVswXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHVtbnNbaV0ud2lkdGggPSAocGFyZW50LnN0eWxlLndpZHRoLnNsaWNlKDAsIC0yKSAqIDEwMCAvIHRoaXMuX2RvbS53cmFwcGVyLmNsaWVudFdpZHRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2ldLndpZHRoID0gdGhpcy5fY29sdW1uc1tpXS53aWR0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4odGhpcy5fY29tcHV0ZUdyaWRUZW1wbGF0ZUNvbHVtbnMoKSk7XG4gICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGluaXRSZXNpemUgPSBldmVudCA9PiB7XG4gICAgICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHJlc2l6ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXppbmcsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGluaXRSZXNpemUsIGZhbHNlKTtcbiAgICBtYXJrZXIuaWQgPSAnbGlzdHZpZXctcmVzaXplLW1hcmtlcic7XG4gIH1cblxuICBfaGFuZGxlRHJhZ0V2ZW50cyhjb2x1bW4pIHtcbiAgICBjb25zdCBkcmFnU3RhcnQgPSBlID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIEFib3J0IGRyYWcsIHJlc2l6ZSBldmVudCBpcyBvY2N1cmluZ1xuICAgICAgdGhpcy5fZHJhZ2dlZENvbHVtbiA9IGUudGFyZ2V0OyAvLyBTdG9yZSBkcmFnIHN0YXJ0IGNvbHVtblxuICAgICAgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvaHRtbCcsIGUudGFyZ2V0Lm91dGVySFRNTCk7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnRWxlbScpO1xuICAgIH07XG5cbiAgICBjb25zdCBkcmFnT3ZlciA9IGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBBYm9ydCBkcmFnLCByZXNpemUgZXZlbnQgaXMgb2NjdXJpbmdcbiAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSAvLyBOZWNlc3NhcnkuIEFsbG93cyB1cyB0byBkcm9wLlxuICAgICAgaWYgKHRoaXMuX2RyYWdnZWRDb2x1bW4gIT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnb3ZlcicpO1xuICAgICAgfVxuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7IC8vIFNlZSB0aGUgc2VjdGlvbiBvbiB0aGUgRGF0YVRyYW5zZmVyIG9iamVjdC5cbiAgICB9O1xuXG4gICAgY29uc3QgZHJhZ0xlYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXInKTsgLy8gdGhpcyAvIGUudGFyZ2V0IGlzIHByZXZpb3VzIHRhcmdldCBlbGVtZW50LlxuICAgIH07XG5cbiAgICBjb25zdCBkcmFnRW5kID0gZXZlbnQgPT4ge1xuICAgICAgLy8gdGhpcy9lLnRhcmdldCBpcyB0aGUgc291cmNlIG5vZGUuXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdFbGVtJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRyb3AgPSBldmVudCA9PiB7XG4gICAgICAvLyB0aGlzL2UudGFyZ2V0IGlzIGN1cnJlbnQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSAvLyBTdG9wcyBzb21lIGJyb3dzZXJzIGZyb20gcmVkaXJlY3RpbmcuXG5cbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XG5cbiAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGRyb3BwaW5nIHRoZSBzYW1lIGNvbHVtbiB3ZSdyZSBkcmFnZ2luZy5cbiAgICAgIGlmICh0aGlzLl9kcmFnZ2VkQ29sdW1uICE9PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlZW5kJywgZHJhZ0VuZCwgZmFsc2UpO1xuICAgICAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5pbnNlcnRCZWZvcmUodGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbdGhpcy5fZHJhZ2dlZENvbHVtbi5kYXRhc2V0LmlkXSwgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbZXZlbnQudGFyZ2V0LmRhdGFzZXQuaWRdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2RyYWdnZWRDb2x1bW4uZGF0YXNldC5pZCA8IGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbHVtbnMubW92ZSh0aGlzLl9kcmFnZ2VkQ29sdW1uLmRhdGFzZXQuaWQsIGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkIC0gMSk7IC8vIFNpbmNlIHdlIHNwbGljZSBpbiBtb3ZlLCB3ZSBuZWVkIHRvIHNpbXVsYXRlIGluc2VydFxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gTm8gbmVlZCB0byB0ZXN0IGlkIGVxdWFsaXR5IHNpbmNlIHNlbGYtZHJvcCBpcyBwcmV2ZW50ZWQgOiB0aGF0Ll9kcmFnZ2VkQ29sdW1uICE9PSB0aGlzXG4gICAgICAgICAgICAgIHRoaXMuX2NvbHVtbnMubW92ZSh0aGlzLl9kcmFnZ2VkQ29sdW1uLmRhdGFzZXQuaWQsIGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZHJhZ2dlZENvbHVtbiA9IG51bGw7IC8vIE11c3QgYmUgZG9uZSBhZnRlciBjb2x1bW4gbW92ZW1lbnQgaW4gZ3JpZFxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4oKTtcbiAgICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9kcmFnZ2VkQ29sdW1uID0gbnVsbDsgLy9cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29sdW1uLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydCwgZmFsc2UpO1xuICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyLCBmYWxzZSk7XG4gICAgY29sdW1uLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSwgZmFsc2UpO1xuICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCwgZmFsc2UpO1xuICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCwgZmFsc2UpO1xuICB9XG5cbiAgX2NvbXB1dGVHcmlkVGVtcGxhdGVDb2x1bW5zKCkge1xuICAgIGxldCBncmlkVGVtcGxhdGVDb2x1bW5zID0gJyc7IC8vIENTUyBncmlkIHJ1bGVcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7ICsraSkgeyAvLyBJbml0IGxpc3R2aWV3IGhlYWRlciBhbmQgQ1NTIGdyaWQgY29sdW1ucyBydWxlXG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zICs9IGAkeyh0aGlzLl9jb2x1bW5zW2ldLndpZHRoICogKHRoaXMuX2RvbS53cmFwcGVyLmNsaWVudFdpZHRoIC8gMTAwKSl9cHggYDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JpZFRlbXBsYXRlQ29sdW1ucztcbiAgfVxuXG4gIF9yZWZyZXNoSGVhZGVyKGdyaWRUZW1wbGF0ZUNvbHVtbnMpIHtcbiAgICB0aGlzLl9kb20uaGVhZGVyLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBncmlkVGVtcGxhdGVDb2x1bW5zO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7IC8vIEluaXQgbGlzdHZpZXcgaGVhZGVyXG4gICAgICB0aGlzLl9jb2x1bW5zW2ldLm9yZGVyID0gaTsgLy8gUmVmcmVzaCBjb2x1bW5zIG9yZGVyXG5cbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX2RvbS5oZWFkZXIuY2hpbGROb2Rlc1tpXTtcbiAgICAgIGNvbHVtbi5zdHlsZSA9ICcnOyAvLyBSZW1vdmUgb2xkIHJlbWFpbmluZyB3aWR0aCBzdHlsZSB2YWx1ZVxuICAgICAgY29sdW1uLmNsYXNzTmFtZSA9IHRoaXMuX2NvbHVtbnNbaV0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29sdW1uLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlID0gdGhpcy5fY29sdW1uc1tpXS5uYW1lOyAvLyBEb24ndCBpbm5lckhUTUwgdG8gYXZvaWQgcmVtb3ZlIG9mIHN0cmV0Y2ggYW5kIHJlc2l6ZSBoYW5kbGVzLiBjaGlsZE5vZGVzWzBdIGlzICN0ZXh0IG5vZGVcbiAgICAgIGNvbHVtbi5kYXRhc2V0LmlkID0gaTtcbiAgICB9XG4gIH1cblxuICAvLyBncmlkVGVtcGxhdGVDb2x1bW5zIG9wdGlvbm5hbCAoY3VzdG9tIHNldCBvciBzZWxmIHNldClcbiAgX3JlZnJlc2hHcmlkQ29sdW1uKGdyaWRUZW1wbGF0ZUNvbHVtbnMpIHtcbiAgICBpZiAoIWdyaWRUZW1wbGF0ZUNvbHVtbnMpIHtcbiAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnMgPSB0aGlzLl9jb21wdXRlR3JpZFRlbXBsYXRlQ29sdW1ucygpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlZnJlc2hIZWFkZXIoZ3JpZFRlbXBsYXRlQ29sdW1ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBncmlkVGVtcGxhdGVDb2x1bW5zO1xuICAgIH1cbiAgfVxuXG4gIF9jaGVja0FjdGl2YXRlZENvbHVtbnMoKSB7XG4gICAgY29uc3QgYWN0aXZhdGVkQ29sdW1ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2F2YWlsYWJsZUNvbHVtbnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnNbaV0ubmFtZSA9PT0gdGhpcy5fYXZhaWxhYmxlQ29sdW1uc1tqXS5uYW1lKSB7XG4gICAgICAgICAgYWN0aXZhdGVkQ29sdW1ucy5wdXNoKHRoaXMuX2NvbHVtbnNbaV0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aXZhdGVkQ29sdW1ucztcbiAgfVxuXG4gIF9hZGRDb2x1bW4oY29sdW1uKSB7XG4gICAgaWYgKHRoaXMuX2NoZWNrQWN0aXZhdGVkQ29sdW1ucygpLmluZGV4T2YoY29sdW1uLm5hbWUpID09PSAtMSkge1xuICAgICAgdGhpcy5fY29sdW1ucy5wdXNoKHtcbiAgICAgICAgbmFtZTogY29sdW1uLm5hbWUsXG4gICAgICAgIHdpZHRoOiBjb2x1bW4ud2lkdGhcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9yZWZyZXNoR3JpZENvbHVtbigpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgY29sLmNsYXNzTGlzdC5hZGQoY29sdW1uLm5hbWUudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgaWYgKGNvbHVtbi5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdkdXJhdGlvbicpIHtcbiAgICAgICAgICBjb2wuaW5uZXJIVE1MID0gVXRpbHMuc2Vjb25kc1RvVGltZWNvZGUodGhpcy5fdHJhY2tzW3RoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5kYXRhc2V0LmlkXS5nZXQoY29sdW1uLm5hbWUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbC5pbm5lckhUTUwgPSB0aGlzLl90cmFja3NbdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmRhdGFzZXQuaWRdLmdldChjb2x1bW4ubmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5hcHBlbmRDaGlsZChjb2wpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9yZW1vdmVDb2x1bW4oY29sdW1uKSB7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX2NvbHVtbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5zW2ldLm5hbWUgPT09IGNvbHVtbi5uYW1lKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZWZyZXNoR3JpZENvbHVtbigpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzW2pdLmNsYXNzTGlzdC5jb250YWlucyhjb2x1bW4ubmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgIHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5yZW1vdmVDaGlsZCh0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlc1tqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdG9nZ2xlQ29sdW1uKGNvbHVtbikge1xuICAgIGlmICh0aGlzLl9jaGVja0FjdGl2YXRlZENvbHVtbnMoKS5pbmRleE9mKGNvbHVtbi5uYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX2FkZENvbHVtbihjb2x1bW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW1vdmVDb2x1bW4oY29sdW1uKTtcbiAgICB9XG4gIH1cblxuICBfc3RyZXRjaENvbHVtbihjb2x1bW4pIHtcbiAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNvbHVtbi5kYXRhc2V0LmlkOyAvLyBDb2x1bW4gdG8gc3RyZXRjaCBpbmRleFxuICAgICAgICBsZXQgc3VtID0gMDsgLy8gQ29sdW1ucyB3aWR0aCBpbiAlIHN1bVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIHN1bSArPSBwYXJzZUZsb2F0KHRoaXMuX2NvbHVtbnNbaV0ud2lkdGgsIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoID0gcGFyc2VGbG9hdCh0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCwgMTApOyAvLyBDb252ZXJ0IHRhcmdldCB2YWx1ZSB0byBmbG9hdCBmb3IgY29tcHV0YXRpb25zXG5cbiAgICAgICAgaWYgKHN1bSA8IDEwMCkgeyAvLyBFeHBhbmQgY29sdW1uXG4gICAgICAgICAgdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGggKz0gKDEwMCAtIHN1bSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VtID4gMTAwKSB7IC8vIFJldHJhY3QgY29sdW1uXG4gICAgICAgICAgaWYgKChzdW0gLSAxMDApIDwgdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoIC09IChzdW0gLSAxMDApO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIFRvbyB0aWdodCB0byByZXRyYWN0IGNvbHVtbiwgcmFpc2UgYSB3YXJuaW5nXG4gICAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgICBjb2RlOiAnQ0FOVF9TVFJFVENIX0NPTFVNTicsXG4gICAgICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBMYXlvdXQgaXMgMTAwJSBzdHJldGNoZWQgdG8gaXRzIGNvbnRhaW5lciwgcmFpc2UgYW4gaW5mb1xuICAgICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgICBjb2RlOiAnQUxSRUFEWV9TVFJFVENIJyxcbiAgICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoLnRvU3RyaW5nKCk7IC8vIFJlc3RvcmUgdGFyZ2V0IHZhbHVlXG4gICAgICAgIHRoaXMuX3JlZnJlc2hHcmlkQ29sdW1uKCk7XG4gICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIF9zdHJldGNoQWxsQ29sdW1ucygpIHtcbiAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBlcXVhbENvbHVtbldpZHRoSW5QeCA9ICh0aGlzLl9kb20ud3JhcHBlci5jbGllbnRXaWR0aCAvIHRoaXMuX2NvbHVtbnMubGVuZ3RoKTtcbiAgICAgICAgbGV0IGFscmVhZHlTdHJldGNoZWQgPSB0cnVlOyAvLyBBc3N1bWluZyBieSBkZWZhdWx0IHRoYXQgdGhhdCBjb2x1bW5zIGhhdmUgZXF1YWwgd2lkdGhcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHsgLy8gTG9vcCB0byBmaW5kIGlmIGNvbHVtbnMgYXJlbid0IGFsbCBlcXVhbFxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5XaWR0aEluUHggPSAoKHRoaXMuX2RvbS53cmFwcGVyLmNsaWVudFdpZHRoICogdGhpcy5fY29sdW1uc1tpXS53aWR0aCkgLyAxMDApO1xuICAgICAgICAgIGlmIChjdXJyZW50Q29sdW1uV2lkdGhJblB4ICE9PSBlcXVhbENvbHVtbldpZHRoSW5QeCkgeyAvLyBPbmUgY29sdW1uIGlzbid0IGVxdWFscyB0byB0aGUgb3RoZXJzXG4gICAgICAgICAgICBhbHJlYWR5U3RyZXRjaGVkID0gZmFsc2U7IC8vIEJyZWFrIGVxdWFsIHdpZHRoIGFzc3VtcHRpb25cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbHJlYWR5U3RyZXRjaGVkKSB7IC8vIEV4aXQgZnVuY3Rpb24gaWYgY29sdW1ucyBhcmUgYWxyZWFkeSBzdHJldGNoZWRcbiAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgY29kZTogJ0FMUkVBRFlfU1RSRVRDSCcsXG4gICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyaWRUZW1wbGF0ZUNvbHVtbnMgPSAnJzsgLy8gQ1NTIGdyaWQgcnVsZSAoaW4gcGl4ZWxzKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHsgLy8gSW5pdCBlcXVhbHkgQ1NTIGdyaWQgY29sdW1ucyBydWxlXG4gICAgICAgICAgdGhpcy5fY29sdW1uc1tpXS53aWR0aCA9IChlcXVhbENvbHVtbldpZHRoSW5QeCAqIDEwMCkgLyB0aGlzLl9kb20ud3JhcHBlci5jbGllbnRXaWR0aDsgLy8gVXBkYXRlIGNvbHVtbiB3aWR0aCBpbiAlXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1ucyArPSBgJHtlcXVhbENvbHVtbldpZHRoSW5QeH1weCBgOyAvLyBBc3NpZ24gY29sdW1uIHdpZHRoIGluIHB4XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWZyZXNoR3JpZENvbHVtbihncmlkVGVtcGxhdGVDb2x1bW5zKTsgLy8gUmVmcmVzaCBMaXN0VmlldyBncmlkIHdpdGggY3VzdG9tIGdyaWRUZW1wbGF0ZUNvbHVtbnMgdmFsdWVcbiAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBhZGRUcmFja3ModHJhY2tzKSB7XG4gICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IGdyaWRUZW1wbGF0ZUNvbHVtbnMgPSB0aGlzLl9jb21wdXRlR3JpZFRlbXBsYXRlQ29sdW1ucygpOyAvLyBDU1MgZ3JpZCBydWxlXG4gICAgICAgIGNvbnN0IGZpcnN0Q2FsbCA9IHRoaXMuX3RyYWNrcy5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyArK2kpIHsgLy8gSW5pdCBsaXN0dmlldyBjb250ZW50IGRlcGVuZGluZyBvbiBvcHRpb25zIG9iamVjdFxuICAgICAgICAgIGNvbnN0IGxpc3RWaWV3RW50cnkgPSBuZXcgTGlzdFZpZXdFbnRyeSh7XG4gICAgICAgICAgICB0cmFjazogdHJhY2tzW2ldLFxuICAgICAgICAgICAgZGF0YXNldElkOiBpLFxuICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogZ3JpZFRlbXBsYXRlQ29sdW1uc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3RyYWNrcy5wdXNoKGxpc3RWaWV3RW50cnkpO1xuXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICBjb25zdCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgIGNvbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2NvbHVtbnNbal0ubmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGNvbC5kYXRhc2V0LmlkID0gajtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnNbal0ubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZHVyYXRpb24nKSB7XG4gICAgICAgICAgICAgIGNvbC5pbm5lckhUTUwgPSBVdGlscy5zZWNvbmRzVG9UaW1lY29kZShsaXN0Vmlld0VudHJ5LmdldCh0aGlzLl9jb2x1bW5zW2pdLm5hbWUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sLmlubmVySFRNTCA9IGxpc3RWaWV3RW50cnkuZ2V0KHRoaXMuX2NvbHVtbnNbal0ubmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdFZpZXdFbnRyeS5hZGRDb2x1bW4oY29sKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChsaXN0Vmlld0VudHJ5LmdldERvbSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RvbS5jb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuXG4gICAgICAgIGlmIChmaXJzdENhbGwpIHtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxCYXIgPSBuZXcgU2Nyb2xsQmFyKHtcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5fZG9tLmNvbnRhaW5lclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2RvbS5jb250YWluZXIgPSB0aGlzLl9kb20uY29udGFpbmVyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZDsgLy8gU2Nyb2xsQmFyIGNyZWF0ZXMgdHdvIHdyYXBwZXJzXG4gICAgICAgIH1cblxuICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgfSk7XG4gIH1cblxuICBjZW50ZXJPbihpZCkge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmRhdGFzZXQuaWQpID09PSBpZCkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgIGNvZGU6ICdDQU5UX0NFTlRFUl9UUkFDSycsXG4gICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZWxhdGl2ZURlbHRhID0gdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2luZGV4XS5vZmZzZXRUb3AgKyB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaW5kZXhdLnNjcm9sbEhlaWdodCAvIDI7XG4gICAgdGhpcy5fZG9tLmNvbnRhaW5lci5zY3JvbGxUb3AgPSByZWxhdGl2ZURlbHRhIC0gdGhpcy5fZG9tLmNvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyO1xuICB9XG5cbiAgdW5zZWxlY3RBbGwoKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RyYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fdHJhY2tzW2ldLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVQbGF5aW5nSWNvbigpIHtcbiAgICBpZiAodGhpcy5fdHJhY2tzW3RoaXMuX3BsYXlpbmdUcmFja0luZGV4XSkgeyAvLyBUZXN0aW5nIGlmIGEgdHJhY2sgaXMgZmxhZ2dlZCBwbGF5aW5nXG4gICAgICB0aGlzLl90cmFja3NbdGhpcy5fcGxheWluZ1RyYWNrSW5kZXhdLnNldFBsYXlpbmcoZmFsc2UpOyAvLyBSZW1vdmUgdGhlIGZsYWdcbiAgICAgIHRoaXMuX3BsYXlpbmdUcmFja0luZGV4ID0gLTE7XG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaFZpZXcoKSB7IC8vIFRPRE8gbW92ZSB0aGlzIGluIEFwcFZpZXcgZXh0ZW5kZWQgY2xhc3MgdG8gY3JlYXRlIGFuZCB0aGlzIGlzIG92ZXJyaWRlXG4gICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4oKTtcbiAgICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRET01GcmFnbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tLmZyYWdtZW50O1xuICB9XG5cbiAgZ2V0TmV4dFRyYWNrSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYWNrc1sodGhpcy5fcGxheWluZ1RyYWNrSW5kZXggKyAxKSAlIHRoaXMuX3RyYWNrcy5sZW5ndGhdLmlkO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNUcmFja0lkKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFja3NbKHRoaXMuX3BsYXlpbmdUcmFja0luZGV4ICsgdGhpcy5fdHJhY2tzLmxlbmd0aCAtIDEpICUgdGhpcy5fdHJhY2tzLmxlbmd0aF0uaWQ7XG4gIH1cblxuICBpc0xhc3RUcmFjaygpIHtcbiAgICBpZiAodGhpcy5fcGxheWluZ1RyYWNrSW5kZXggPT09IHRoaXMuX3RyYWNrcy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdFZpZXc7XG4iLCIndXNlciBzdHJpY3QnO1xuXG5jbGFzcyBMaXN0Vmlld0VudHJ5IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IExpc3RWaWV3IGVudHJ5XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQSBMaXN0VmlldyBpdGVtIHRoYXQgYWltIHRvIGNvbnRhaW4gdHJhY2sgYW5kIGl0cyBpbnRlcmFjdGl2aXR5XG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hcnRpc3QgPSBvcHRpb25zLnRyYWNrLmFydGlzdCB8fCAnJztcbiAgICB0aGlzLmFsYnVtID0gb3B0aW9ucy50cmFjay5hbGJ1bS5OQU1FIHx8ICcnO1xuICAgIHRoaXMuY29tcG9zZXIgPSBvcHRpb25zLnRyYWNrLmNvbXBvc2VyIHx8ICcnO1xuICAgIHRoaXMuZHVyYXRpb24gPSBvcHRpb25zLnRyYWNrLmR1cmF0aW9uIHx8ICcnO1xuICAgIHRoaXMuZ2VucmUgPSBvcHRpb25zLnRyYWNrLmdlbnJlIHx8ICcnO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLnRyYWNrLmlkIHx8ICcnO1xuICAgIHRoaXMucGVyZm9ybWVyID0gb3B0aW9ucy50cmFjay5wZXJmb3JtZXIgfHwgJyc7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudHJhY2sudGl0bGUgfHwgJyc7XG5cbiAgICB0aGlzLl9kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl9kb20uY2xhc3NMaXN0LmFkZCgnZW50cnknKTtcbiAgICB0aGlzLl9kb20uZGF0YXNldC5pZCA9IG9wdGlvbnMuZGF0YXNldElkO1xuICAgIHRoaXMuX2RvbS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gb3B0aW9ucy5ncmlkVGVtcGxhdGVDb2x1bW5zO1xuXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICB9XG5cbiAgYWRkQ29sdW1uKGNvbHVtbikge1xuICAgIHRoaXMuX2RvbS5hcHBlbmRDaGlsZChjb2x1bW4pO1xuICB9XG5cbiAgZ2V0RG9tKCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX2RvbSk7XG4gICAgcmV0dXJuIGZyYWdtZW50O1xuICB9XG5cbiAgc2V0U2VsZWN0ZWQoc3RhdHVzKSB7XG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHN0YXR1cztcblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICB0aGlzLl9kb20uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0UGxheWluZyhzdGF0dXMpIHtcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBzdGF0dXM7XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcbiAgICB9XG4gIH1cblxuICBnZXRMb3dlckNhc2VPZih0YWcpIHtcbiAgICByZXR1cm4gdGhpc1t0YWddLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgfVxuICBnZXQodGFnKSB7XG4gICAgcmV0dXJuIHRoaXNbdGFnXTtcbiAgfVxuICBnZXRJc1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdFZpZXdFbnRyeTtcbiIsImltcG9ydCBVc2VyTWVudSBmcm9tICcuL1VzZXJNZW51LmpzJztcbid1c2Vfc3RyaWN0JztcblxuXG5jbGFzcyBUb3BCYXIge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgVG9wQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIGFsbCBjb21wb25lbnRzIGluIHRoZSBUb3BCYXIgYW5kIGFsbCByZWxhdGVkIGV2ZW50c1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3RvcGJhciA9IHt9O1xuICAgIHRoaXMuX2F2YXRhciA9IHt9O1xuICAgIHRoaXMuX3VzZXJNZW51ID0ge307XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICBfaW5pdCgpIHtcbiAgICB0aGlzLl90b3BiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wYmFyJyk7XG4gICAgdGhpcy5fYXZhdGFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcGJhci1hdmF0YXInKTtcbiAgICB0aGlzLl91c2VyTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXG4gICAgdGhpcy5fdXNlck1lbnUgPSBuZXcgVXNlck1lbnUoe1xuICAgICAgdGFyZ2V0OiB0aGlzLl90b3BiYXJcbiAgICB9KTtcbiAgICB0aGlzLl9hdmF0YXIuc3JjID0gYC4uLy4uLyR7bXprLnVzZXIuYXZhdGFyUGF0aH1gOyAvLyBTaW5jZSBpbWcgaXMgaW4gYXBwL3RlbXBsYXRlc1xuICB9XG5cbiAgX2V2ZW50cygpIHtcbi8vICAgIHRoaXMuX2Rpc21pc3NVc2VyTWVudSA9IHRoaXMuX2Rpc21pc3NVc2VyTWVudS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fYXZhdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3RvcGJhci5jb250YWlucyh0aGlzLl91c2VyTWVudS5kb20pKSB7XG4gICAgICAgIHRoaXMuY2xvc2VVc2VyTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuVXNlck1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5Vc2VyTWVudSgpIHtcbiAgICB0aGlzLl91c2VyTWVudS5vcGVuKCk7XG4gIH1cblxuICBjbG9zZVVzZXJNZW51KCkge1xuICAgIHRoaXMuX3VzZXJNZW51LmNsb3NlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9wQmFyO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFVzZXJNZW51IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IFRvcEJhciB1c2VyIG1lbnVcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSG9sZCBhbGwgdXNlciBsaW5rcyB0byBjb250cm9sIHRoZSBtYWluIHZpZXcsIGxvZ291dCBldGMuXG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX3RhcmdldCA9IG9wdGlvbnMudGFyZ2V0O1xuICAgIHRoaXMuX3VzZXJNZW51ID0ge307XG4gICAgdGhpcy5fb3ZlcmxheSA9IHt9O1xuICAgIHRoaXMuX2xvZ091dCA9IHt9O1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cblxuICBfaW5pdCgpIHtcbiAgICBtemsua29tdW5pa2F0b3IuZ2V0VGVtcGxhdGUoJ21vZGFscy91c2VybWVudS8nKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgY29uc3QgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXNwb25zZSwgJ3RleHQvaHRtbCcpO1xuXG4gICAgICAgIHRoaXMuX292ZXJsYXkgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHJhbnNwYXJlbnQtb3ZlcmxheScpWzBdO1xuICAgICAgICB0aGlzLl91c2VyTWVudSA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd1c2VyLW1lbnUnKVswXTtcbiAgICAgICAgdGhpcy5fbG9nT3V0ID0gdGhpcy5fdXNlck1lbnUuY2hpbGROb2Rlc1sxXTtcblxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2codGhpcy5fdXNlck1lbnUuZmlyc3RFbGVtZW50Q2hpbGQuZGF0YXNldC5wZXJtKVxuICAgICAgICB0aGlzLl9ldmVudHMoKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX3ZpZXdwb3J0Q2xpY2tlZCA9IHRoaXMuX3ZpZXdwb3J0Q2xpY2tlZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbXprLmxvZ091dCgpO1xuICAgIH0sIHRydWUpO1xuICB9XG5cblxuICBfdmlld3BvcnRDbGlja2VkKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KGAudXNlci1tZW51YCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX3VzZXJNZW51KSB7XG4gICAgfVxuICB9XG5cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3RhcmdldC5hcHBlbmRDaGlsZCh0aGlzLl9vdmVybGF5KTtcbiAgICB0aGlzLl9vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdmlld3BvcnRDbGlja2VkLCBmYWxzZSk7XG4gIH1cblxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3RhcmdldC5yZW1vdmVDaGlsZCh0aGlzLl9vdmVybGF5KTtcbiAgICB0aGlzLl9vdmVybGF5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fdmlld3BvcnRDbGlja2VkLCBmYWxzZSk7XG4gIH1cblxuXG4gIGdldCBkb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJNZW51O1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVXNlck1lbnU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==