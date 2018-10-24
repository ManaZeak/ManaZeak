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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL1N0YXJ0LmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy9jb3JlL0tvbXVuaWthdG9yLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy9jb3JlL016ay5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvY29yZS9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL2NvcmUvVXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL21vZGVsL2NvbXBvbmVudHMvQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvY29tcG9uZW50cy9QbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvbW9kZWwvY29tcG9uZW50cy9UcmFjay5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdXRpbHMvRXJyb3JzLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy91dGlscy9FdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL01vZGFsLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy91dGlscy9Ob3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL1Njcm9sbEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdXRpbHMvU2hvcnRjdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3V0aWxzL1V0aWxzLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L1ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvZm9vdGJhci9Gb290QmFyLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L2Zvb3RiYXIvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy9mb290YmFyL2NvbXBvbmVudHMvVm9sdW1lQmFyLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L21haW5jb250YWluZXIvQXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvbWFpbmNvbnRhaW5lci9Bc2lkZUVudHJ5LmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy92aWV3L21haW5jb250YWluZXIvU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvbWFpbmNvbnRhaW5lci92aWV3cy9MaXN0Vmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy9tYWluY29udGFpbmVyL3ZpZXdzL0xpc3RWaWV3RW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL3ZpZXcvdG9wYmFyL1RvcEJhci5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvanMvdmlldy90b3BiYXIvVXNlck1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3Njc3Mvc3R5bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsd0VBQXdFO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSxLQUFLLGdEQUFnRDtBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdlLHVFQUFRLEU7Ozs7Ozs7Ozs7O0FDMUV2Qix1QyIsImZpbGUiOiJqcy9tYW5hemVhay5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3N0YXRpYy9qcy9TdGFydC5qc1wiKTtcbiIsImltcG9ydCAnLi4vc2Nzcy9zdHlsZS5zY3NzJztcblxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMvVXRpbHMuanMnO1xuaW1wb3J0IEVycm9ycyBmcm9tICcuL3V0aWxzL0Vycm9ycy5qcyc7XG5pbXBvcnQgRXZlbnRzIGZyb20gJy4vdXRpbHMvRXZlbnRzLmpzJztcbmltcG9ydCBTaG9ydGN1dCBmcm9tICcuL3V0aWxzL1Nob3J0Y3V0LmpzJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi91dGlscy9Ob3RpZmljYXRpb24uanMnO1xuaW1wb3J0IE16ayBmcm9tICcuL2NvcmUvTXprLmpzJztcbid1c2Vfc3RyaWN0JztcblxuY29uc3QgZXJyb3JzT3B0aW9ucyA9IHtcbiAgdmVyYm9zZTogdHJ1ZSxcbiAgdHJhY2U6IHRydWVcbn07XG5cbmNvbnN0IG5vdGlmaWNhdGlvbk9wdGlvbnMgPSB7XG4gIHRoaWNrQm9yZGVyOiAndG9wJyxcbiAgZHVyYXRpb246IDQwMDAsXG4gIHRyYW5zaXRpb246IDIwMCxcbiAgbWF4QWN0aXZlOiAzXG59O1xuXG53aW5kb3cuVXRpbHMgPSBuZXcgVXRpbHMoKTtcbndpbmRvdy5FcnJvcnMgPSBuZXcgRXJyb3JzKGVycm9yc09wdGlvbnMpO1xud2luZG93LkV2ZW50cyA9IG5ldyBFdmVudHMoKTtcbndpbmRvdy5TaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpO1xud2luZG93Lk5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uT3B0aW9ucyk7XG5cbi8vVXRpbHMuYWRkU3R5bGVTaGVldCgnL3N0YXRpYy9kaXN0L2Nzcy9tYWluLmNzcycpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICB3aW5kb3cubXprID0gbmV3IE16aygpO1xuICBtemsuc3RhcnQoKTtcbn0pO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIEtvbXVuaWthdG9yIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+SGFuZGxlIE1hbmFaZWFrJ3MgSFRUUCByZXF1ZXN0czwvaDE+XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBjbGFzcyBpcyB0aGUgbWFpbiBvYmplY3QgdG8gZGVhbCB3aXRoIHdoZW4gcmVxdWVzdGluZyBzb21ldGhpbmcgZnJvbSB0aGUgc2VydmVyLjxicj5cbiAgICogSXQgaGFuZGxlIGFsbCB1cmxzIGNhbGxzICg8Y29kZT5HRVQ8L2NvZGU+LCA8Y29kZT5QT1NUPC9jb2RlPiksIHRyZWF0IHJlc3BvbnNlcyBvciBoYW5kbGUgZXJyb3JzIHVzaW5nIDxjb2RlPlByb21pc2U8L2NvZGU+Ljxicj5cbiAgICogQmVjYXVzZSBpdCB1c2VzIDxjb2RlPlByb21pc2U8L2NvZGU+LCBzdWNjZXNzIGFuZCBlcnJvcnMgYXJlIHRvIGJlIGhhbmRsZWQgaW4gdGhlIGNhbGxlciBmdW5jdGlvbiwgdXNpbmcgPGNvZGU+LnRoZW4oKTwvY29kZT4gYW5kIDxjb2RlPi5jYXRjaCgpPC9jb2RlPi48YnI+XG4gICAqIFRoaXMgb2JqZWN0IGlzIGEgPGEgaHJlZj1cIk16ay5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TXprPC9hPidzIGF0dHJpYnV0ZSwgdGhhdCBjYW4gYmUgdXNlZCBmcm9tIGFueXdoZXJlICg8Y29kZT5temsua29tdW5pa2F0b3I8L2NvZGU+KS48YnI+XG4gICAqIFJlZmVyIHRvIDxjb2RlPmFwcC91cmwucHk8L2NvZGU+IGZvciBhdmFpbGFibGUgdXJscyB0byBjb250cm9sIE1hbmFaZWFrLjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUga29tdW5pa2F0b3IncyBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNzcmZUb2tlbiAtIFRoZSB1c2VyJ3MgY3NyZiB0b2tlbiAobXVzdCBiZSBleHRyYWN0ZWQgZnJvbSBicm93c2VyJ3MgY29va2llcyBiZWZvcmUpICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IC0gVGhlIHVzZXIncyBjc3JmIHRva2VuICovXG4gICAgdGhpcy5fY3NyZlRva2VuID0gb3B0aW9ucy5jc3JmVG9rZW47XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7QXJyYXl9IC0gVGhlIEhUVFAgaGVhZGVycyB0aGF0IGFyZSB1c2VkIGluIDxjb2RlPkdFVDwvY29kZT4gYW5kIDxjb2RlPlBPU1Q8L2NvZGU+IHJlcXVlc3RzICovXG4gICAgdGhpcy5faGVhZGVycyA9IFtdO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cblxuICAvLyAgLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEtvbXVuaWthdG9yXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5Jbml0IHRoZSBLb211bmlrYXRvciBjbGFzcyBieSBmaWxsaW5nIGl0cyA8Y29kZT5faGVhZGVyczwvY29kZT4gcHJpdmF0ZSBtZW1iZXIsIHRvIHVzZSBpbiByZXF1ZXN0cyBsYXRlciBvbi48YnI+XG4gICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgY2FsbGVkIGluIEtvbXVuaWthdG9yJ3MgY29uc3RydWN0b3Igb25seS48L2Jsb2NrcXVvdGU+ICovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX2hlYWRlcnMucHVzaChbJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04J10pOyAvLyB0aGlzLl9oZWFkZXJzWzBdXG4gICAgdGhpcy5faGVhZGVycy5wdXNoKFsnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nXSk7IC8vIHRoaXMuX2hlYWRlcnNbMV1cbiAgICB0aGlzLl9oZWFkZXJzLnB1c2goWydYLUNTUkZUb2tlbicsIHRoaXMuX2NzcmZUb2tlbl0pOyAvLyB0aGlzLl9oZWFkZXJzWzJdXG4gIH1cblxuXG4gIC8vICAtLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLSAgLy9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBhc3luY1xuICAgKiBAbmFtZSBnZXRcbiAgICogQG1lbWJlcm9mIEtvbXVuaWthdG9yXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT48Y29kZT5HRVQ8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj5cbiAgICogPGNvZGU+cmVzb2x2ZTwvY29kZT4gcmV0dXJucyB0aGUgcmVzcG9uc2UgYXMgYW4gPGNvZGU+T2JqZWN0PC9jb2RlPi48YnI+XG4gICAqIDxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5HRVQ8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb20gKHNlZSA8Y29kZT5hcHAvdXJscy5weTwvY29kZT4pXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBnZXQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKFt0aGlzLl9oZWFkZXJzWzBdXSlcbiAgICAgIH07XG5cbiAgICAgIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5qc29uKCkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHJlamVjdCgnVVJMX05PVF9GT1VORCcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHJlamVjdCgnQUNDRVNTX0ZPUkJJRERFTicpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgICAgIHJlamVjdCgnSU5URVJOQUxfRVJST1InKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KCdVTktOT1dOX0VSUk9SJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIGdldEJpbmFyeVJlc3BvbnNlXG4gICAqIEBtZW1iZXJvZiBLb211bmlrYXRvclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+R0VUPC9jb2RlPiBIVFRQIHJlcXVlc3QgdXNpbmcgYW4gPGNvZGU+WE1MSHR0cFJlcXVlc3Q8L2NvZGU+LCB3aXRoIGFuIG92ZXJyaWRlIG1pbWV0eXBlIGhhY2sgdG8gcGFzcyBieXRlcyB0aHJvdWdoIHVucHJvY2Vzc2VkLjxicj5cbiAgICogSXQgd2FzIGltcGxlbWVudGVkIHRvIGFsbG93IDxjb2RlPmQzLmpzPC9jb2RlPiB0byByZW5kZXIgPGNvZGU+Lm1vb2Q8L2NvZGU+IGZpbGUgKHVzZWQgaW4gPGEgaHJlZj1cIi4vRm9vdEJhci5odG1sIy5yZW5kZXJNb29kRmlsZVwiIHRhcmdldD1cIl9ibGFua1wiPnJlbmRlck1vb2RGaWxlPC9hPikuPGJyPlxuICAgKiA8Y29kZT5yZXNvbHZlPC9jb2RlPiByZXR1cm5zIHRoZSByZXNwb25zZSBhcyBiaW5hcnkgZGF0YS48YnI+XG4gICAqIDxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT4ubW9vZDwvY29kZT4gZmlsZSB1cmwgdG8gZmV0Y2ggZGF0YSBmcm9tXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBnZXRCaW5hcnlSZXNwb25zZSh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7IC8vIEtlZXAgb2xkIGpzIGZ1bmN0aW9uIGRlZmluaXRpb24gc2luY2UgdGhpcyBpcyB0aGUgcmVxdWVzdCByZXNwb25zZSBvYmplY3RcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlVGV4dCk7IC8vIHJlc3BvbnNlVGV4dCBpcyBiaW5hcnkgZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqIEBtZXRob2RcbiAgICogQGFzeW5jXG4gICAqIEBuYW1lIGdldFRlbXBsYXRlXG4gICAqIEBtZW1iZXJvZiBLb211bmlrYXRvclxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+PGNvZGU+R0VUPC9jb2RlPiBIVFRQIHJlcXVlc3QgdXNpbmcgdGhlIGZldGNoIEFQSS48YnI+XG4gICAqIDxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48YnI+XG4gICAqIDxjb2RlPnJlamVjdDwvY29kZT4gcmV0dXJucyBhbiBlcnJvciBrZXkgYXMgYSA8Y29kZT5TdHJpbmc8L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFRoZSA8Y29kZT5HRVQ8L2NvZGU+IHVybCB0byBmZXRjaCBkYXRhIGZyb20gKHNlZSA8Y29kZT5hcHAvdXJscy5weTwvY29kZT4pXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgcmVxdWVzdCA8Y29kZT5Qcm9taXNlPC9jb2RlPiAqL1xuICBnZXRUZW1wbGF0ZSh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoW3RoaXMuX2hlYWRlcnNbMF1dKVxuICAgICAgfTtcblxuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLnRleHQoKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgcmVqZWN0KCdVUkxfTk9UX0ZPVU5EJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmVqZWN0KCdBQ0NFU1NfRk9SQklEREVOJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgcmVqZWN0KCdJTlRFUk5BTF9FUlJPUicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoJ1VOS05PV05fRVJST1InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAYXN5bmNcbiAgICogQG5hbWUgcG9zdFxuICAgKiBAbWVtYmVyb2YgS29tdW5pa2F0b3JcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPjxjb2RlPlBPU1Q8L2NvZGU+IEhUVFAgcmVxdWVzdCB1c2luZyB0aGUgZmV0Y2ggQVBJLjxicj5cbiAgICogQmV3YXJlIHRoYXQgdGhlIGdpdmVuIG9wdGlvbnMgb2JqZWN0IG1hdGNoIHRoZSB1cmwgZXhwZWN0YXRpb25zIChicm93c2UgdGhlIGJhY2tlbmQgZG9jdW1lbnRhdGlvbiBmb3IgZnVydGhlciBkZXRhaWxzKS48YnI+XG4gICAqIDxjb2RlPnJlc29sdmU8L2NvZGU+IHJldHVybnMgdGhlIHJlc3BvbnNlIGFzIGFuIDxjb2RlPk9iamVjdDwvY29kZT4uPGJyPlxuICAgKiA8Y29kZT5yZWplY3Q8L2NvZGU+IHJldHVybnMgYW4gZXJyb3Iga2V5IGFzIGEgPGNvZGU+U3RyaW5nPC9jb2RlPi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgLSBUaGUgPGNvZGU+UE9TVDwvY29kZT4gdXJsIHRvIGZldGNoIGRhdGEgZnJvbSAoc2VlIDxjb2RlPmFwcC91cmxzLnB5PC9jb2RlPilcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgPGNvZGU+SlNPTjwvY29kZT4gb2JqZWN0IHRoYXQgY29udGFpbnMgPGNvZGU+UE9TVDwvY29kZT4gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIHJlcXVlc3QgPGNvZGU+UHJvbWlzZTwvY29kZT4gKi9cbiAgcG9zdCh1cmwsIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuX2hlYWRlcnMpLCAvLyBQT1NUIG5lZWRzIGFsbCBwcmV2aW91c2x5IGRlZmluZWQgaGVhZGVyc1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgfTtcblxuICAgICAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgcmVqZWN0KCdVUkxfTk9UX0ZPVU5EJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgcmVqZWN0KCdBQ0NFU1NfRk9SQklEREVOJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgcmVqZWN0KCdJTlRFUk5BTF9FUlJPUicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoJ1VOS05PV05fRVJST1InKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtvbXVuaWthdG9yO1xuIiwiaW1wb3J0IEtvbXVuaWthdG9yIGZyb20gJy4vS29tdW5pa2F0b3IuanMnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4uL21vZGVsL01vZGVsLmpzJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL3ZpZXcvVmlldy5qcyc7XG5pbXBvcnQgVXNlciBmcm9tICcuL1VzZXIuanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIE16ayB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBtYWluIGNvbnRyb2xsZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgYm90aCBNb2RlbCBhZCBWaWV3LCBhbmQgYW5pbWF0ZSB0aGVtIGFjY29yZGluZ2x5LiBIb3N0IFVzZXIsIExhbmdhZ2UgYW5kIEtvbXVuaWthdG9yIGFsc28uXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb29raWVzID0ge307XG4gICAgdGhpcy5rb211bmlrYXRvciA9IHt9O1xuICAgIHRoaXMubGFuZyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgICB0aGlzLnVzZXIgPSB7fTtcbiAgICB0aGlzLnZpZXcgPSB7fTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFNFU1NJT04gSU5JVElBTElaQVRJT04gIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzdGFydFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IGEgTWFuYVplYWsgc2Vzc2lvbiBkZXBlbmRpbmcgb24gdXNlciBzZXR0aW5ncyBpbiBkYlxuICAgKiovXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuY29va2llcyA9IFV0aWxzLmdldENvb2tpZXMoKTsgLy8gR2V0IHVzZXIgY29va2llc1xuXG4gICAgdGhpcy5faW5pdEtvbXVuaWthdG9yKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRMYW5nKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdFVzZXIoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0TW9kZWwoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0VmlldygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRTaG9ydGN1dCgpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXBwKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICBjb2RlOiAnRkFUQUxfRVJST1InLFxuICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0S29tdW5pa2F0b3JcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEtvbXVuaWthdG9yIG9iamVjdCAoY29va2llcyBtdXN0IGhhdmUgYmVlbiBzdG9yZWQgYmVmb3JlKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfaW5pdEtvbXVuaWthdG9yKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMua29tdW5pa2F0b3IgPSBuZXcgS29tdW5pa2F0b3Ioe1xuICAgICAgICBjc3JmVG9rZW46IHRoaXMuY29va2llc1snY3NyZnRva2VuJ11cbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFVzZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIFVzZXIgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0VXNlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgIHRoaXMua29tdW5pa2F0b3IuZ2V0KCd1c2VyL2dldEluZm9ybWF0aW9uLycpXG4gICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXIuc2V0TWVtYmVycyh1c2VySW5mbyk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3JDb2RlID0+IHtcbiAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgY29kZTogZXJyb3JDb2RlLFxuICAgICAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0TGFuZ1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgbGFuZyBrZXlzIGFuZCBhdHRhY2ggdGhlbSB0byB0aGlzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0TGFuZygpIHtcbiAgICBjb25zdCBjaGVja0xhbmcgPSAobGFuZykgPT4geyAvLyBJbiBjYXNlIGxhbmd1YWdlIEpTT04gY2FuIG5vdCBiZSBmZXRjaGVkLCB3ZSByYWlzZSBhIG1hbnVhbCBub3RpZmljYXRpb24gb25seS5cbiAgICAgIGlmIChsYW5nLkRPTkUpIHtcbiAgICAgICAgdGhpcy5sYW5nID0gbGFuZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE5vdGlmaWNhdGlvbi5uZXcoe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgdGl0bGU6ICdVbmFibGUgdG8gbG9hZCBsYW5ndWFnZScsXG4gICAgICAgICAgbWVzc2FnZTogJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBsYW5ndWFnZXMgc2V0dGluZ3MgY2FuIG5vdCBiZSByZWNlaXZlZC4nXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBMQU5HOiAobmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmtvbXVuaWthdG9yLnBvc3QoJ2xhbmd1YWdlLycsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKGxhbmcgPT4ge1xuICAgICAgICAgIGNoZWNrTGFuZyhsYW5nKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pOyAvLyBFcnJvcnMgY2FuIG5vdCBiZSBjYXRjaGVkIHNpbmNlIGxhbmd1YWdlIGZhaWxlZCBsb2FkaW5nLlxuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdE1vZGVsXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBmcm9udGVuZCBNb2RlbFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfaW5pdE1vZGVsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRWaWV3XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBmcm9udGVuZCBWaWV3XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIF9pbml0VmlldygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFNob3J0Y3V0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSB1c2VyIHNob3J0Y3V0c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfaW5pdFNob3J0Y3V0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVsb2FkU2hvcnRjdXRzKCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9zdGFydEFwcFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU3RhcnQgdGhlIFVJIGJ1aWxkaW5nIChtdXN0IGJlIGNhbGxlZCB3aGVuIGV2ZXJ5dGhpbmcgaGF2ZSBiZWVuIHNhZmVseSBpbml0aWFsaXplZClcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX3N0YXJ0QXBwKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmtvbXVuaWthdG9yLmdldCgncGxheWxpc3QvZ2V0VXNlclBsYXlsaXN0cy8nKVxuICAgICAgICAudGhlbihjb2xsZWN0aW9uID0+IHtcbiAgICAgICAgICB0aGlzLm1vZGVsLmluaXRDb2xsZWN0aW9uKGNvbGxlY3Rpb24pXG4gICAgICAgICAgICAudGhlbihwbGF5bGlzdCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMudmlldy5pbml0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yS2V5ID0+IHtcbiAgICAgICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBlcnJvcktleSxcbiAgICAgICAgICAgICAgICBmcm9udGVuZDogZmFsc2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvcktleSA9PiB7XG4gICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgIGNvZGU6IGVycm9yS2V5LFxuICAgICAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vICAtLS0tICBQTEFZQkFDSyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgY2hhbmdlVHJhY2tcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2hhbmdlIHRoZSBwbGF5ZWQgdHJhY2sgd2l0aCB0aGUgZ2lldm4gb25lICh1c2luZyBpdHMgSUQpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIFRoZSB0cmFjayBJRCB0byByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXJcbiAgICoqL1xuICBjaGFuZ2VUcmFjayhpZCkge1xuICAgIGxldCBkdXJhdGlvblBsYXllZCA9IDA7XG5cbiAgICBpZiAoIWlzTmFOKHRoaXMubW9kZWwuZ2V0UGxheWVyKCkuZ2V0UHJvZ3Jlc3MoKSkpIHtcbiAgICAgIGR1cmF0aW9uUGxheWVkID0gdGhpcy5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBUUkFDS19JRDogaWQsXG4gICAgICBMQVNUX1RSQUNLX1BBVEg6IHRoaXMubW9kZWwuZ2V0UGxheWVyKCkuZ2V0U291cmNlKCksXG4gICAgICBUUkFDS19QRVJDRU5UQUdFOiBkdXJhdGlvblBsYXllZCxcbiAgICAgIFBSRVZJT1VTOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmtvbXVuaWthdG9yLnBvc3QoJ3RyYWNrL2dldFBhdGgvJywgb3B0aW9ucylcbiAgICAgIC50aGVuKHRyYWNrID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuY2hhbmdlVHJhY2soaWQsIHRyYWNrLlRSQUNLX1BBVEgpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LmNoYW5nZVRyYWNrKHRoaXMubW9kZWwuZ2V0QWN0aXZlVHJhY2soKSk7XG4gICAgICB9KVxuXG4gICAgLy8gQ2ktZ8OudCBjZSBwZXRpdCBiYW5jIGRlIHRlc3QsIHBvdXIgbGUgbHVseiB1bmlxdWVtZW50XG4gICAgLy8udGhlbih1cmwgPT4geyByZXR1cm4gdGhpcy5tb2RlbC5jaGFuZ2VUcmFjaygnaHR0cDovL3N0YXRpYy5rZXZ2di5pbi9zb3VuZHMvY2FsbG1lbWF5YmUubXAzJykgfSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlUGxheVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgdGhlIHBsYXliYWNrIGFuZCB1cGRhdGUgdGhlIHZpZXdcbiAgICoqL1xuICB0b2dnbGVQbGF5KCkge1xuICAgIHRoaXMubW9kZWwudG9nZ2xlUGxheSgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy50b2dnbGVQbGF5KCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc3RvcFBsYXliYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN0b3AgdGhlIHBsYXliYWNrIGFuZCB1cGRhdGUgdGhlIHZpZXdcbiAgICoqL1xuICBzdG9wUGxheWJhY2soKSB7XG4gICAgdGhpcy5tb2RlbC5zdG9wUGxheWJhY2soKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcuc3RvcFBsYXliYWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFZPTFVNRSBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgbXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBNdXRlIHRoZSBwbGF5ZXJcbiAgICoqL1xuICBtdXRlKCkge1xuICAgIHRoaXMubW9kZWwubXV0ZSgpO1xuICAgIHRoaXMudmlldy51cGRhdGVWb2x1bWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdW5tdXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVuIE11dGUgdGhlIHBsYXllclxuICAgKiovXG4gIHVubXV0ZSgpIHtcbiAgICB0aGlzLm1vZGVsLnVubXV0ZSgpO1xuICAgIHRoaXMudmlldy51cGRhdGVWb2x1bWUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlTXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgdGhlIHBsYXllcidzIG11dGUgc3RhdGUgYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIHRvZ2dsZU11dGUoKSB7XG4gICAgdGhpcy5tb2RlbC50b2dnbGVNdXRlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVZvbHVtZSgpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkanVzdFZvbHVtZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQvU3Vic3RyYWN0IGEgZ2l2ZW4gYW1vdW50IG9mIHZvbHVtZSwgaW4gcmFuZ2UgZmxvYXRbLTEsIDFdIGFuZCB1cGRhdGUgdGhlIHZpZXdcbiAgICoqL1xuICBhZGp1c3RWb2x1bWUoYW1vdW50KSB7XG4gICAgdGhpcy5tb2RlbC5hZGp1c3RWb2x1bWUoYW1vdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlVm9sdW1lKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc2V0Vm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZC9TdWJzdHJhY3QgYSBnaXZlbiBhbW91bnQgb2Ygdm9sdW1lLCBpbiByYW5nZSBmbG9hdFswLCAxXSBhbmQgdXBkYXRlIHRoZSB2aWV3XG4gICAqKi9cbiAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgIHRoaXMubW9kZWwuc2V0Vm9sdW1lKHZvbHVtZSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVZvbHVtZSgpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8vICAtLS0tICBQUk9HUkVTUyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0UHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRqdXN0IHRoZSBwcm9ncmVzcyBwZXJjZW50YWdlIGZyb20gYSBnaXZlbiBhbW91biBpbiByYW5nZSBmbG9hdFstMTAwLDEwMF0gYW5kIHVwZGF0ZSB0aGUgdmlld1xuICAgKiovXG4gIGFkanVzdFByb2dyZXNzKGFtb3VudCkge1xuICAgIHRoaXMubW9kZWwuYWRqdXN0UHJvZ3Jlc3MoYW1vdW50KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzZXRQcm9ncmVzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgdGhlIHByb2dyZXNzIHBlcmNlbnRhZ2UgaW4gcmFuZ2UgZmxvYXRbMCwxMDBdIGFuZCB1cGRhdGUgdGhlIHZpZXdcbiAgICoqL1xuICBzZXRQcm9ncmVzcyhwcm9ncmVzcykge1xuICAgIHRoaXMubW9kZWwuc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMudmlldy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHRyYWNrRW5kZWRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVHJpZ2dlcmVkIHdoZW4gdGhlIHBsYXllciByZWFjaGVkIHRoZSBlbmQgb2YgYSB0cmFja1xuICAgKiovXG4gIHRyYWNrRW5kZWQoKSB7XG4gICAgbXprLm5leHRUcmFja0luVmlldygpO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBuZXh0VHJhY2tJblZpZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSB0aGUgcGxheWVyIHRyYWNrIHVzaW5nIHRoZSBuZXh0IG9uZSBpbiB0aGUgY3VycmVudCB2aWV3XG4gICAqKi9cbiAgbmV4dFRyYWNrSW5WaWV3KCkge1xuICAgIGNvbnN0IHJlcGVhdE1vZGUgPSB0aGlzLm1vZGVsLnJlcGVhdE1vZGU7XG5cbiAgICBpZiAocmVwZWF0TW9kZSA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMudmlldy5pc0xhc3RUcmFjaygpKSB7XG4gICAgICAgIHRoaXMuc3RvcFBsYXliYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtemsubmV4dFRyYWNrSW5WaWV3KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZXBlYXRNb2RlID09PSAxKSB7XG4gICAgICBtemsucmVwZWF0VHJhY2soKTtcbiAgICB9IGVsc2UgaWYgKHJlcGVhdE1vZGUgPT09IDIpIHtcbiAgICAgIG16ay5jaGFuZ2VUcmFjayh0aGlzLnZpZXcuZ2V0TmV4dFRyYWNrSWQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gOiBoYW5kbGUgZXJyb3JcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHByZXZpb3VzVHJhY2tJblZpZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTXprXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSB0aGUgcGxheWVyIHRyYWNrIHVzaW5nIHRoZSBwcmV2aW91cyBvbmUgaW4gdGhlIGN1cnJlbnQgdmlld1xuICAgKiovXG4gIHByZXZpb3VzVHJhY2tJblZpZXcoKSB7XG4gICAgbXprLmNoYW5nZVRyYWNrKHRoaXMudmlldy5nZXRQcmV2aW91c1RyYWNrSWQoKSk7XG4gIH1cblxuXG4gIHJlcGVhdFRyYWNrKCkge1xuICAgIHRoaXMubW9kZWwucmVwZWF0VHJhY2soKTtcbiAgICAvLyBObyBuZWVkIHRvIHVwZGF0ZSB0aGUgdmlldyBzaW5jZSB0aGUgY3VycmVudCB0cmFjayBkaWRuJ3QgY2hhbmdlZFxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB0b2dnbGVSZXBlYXRNb2RlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE16a1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgT2N0b2JlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDaGFuZ2UgdGhlIHJlcGVhdCBzdGF0ZSB0byB0aGUgbmV4dCBvbmUgKG9mZiwgb25lLCBhbGwpXG4gICAqKi9cbiAgdG9nZ2xlUmVwZWF0TW9kZSgpIHtcbiAgICB0aGlzLm1vZGVsLnRvZ2dsZVJlcGVhdE1vZGUoKVxuICAgICAgLnRoZW4oKHJlcGVhdE1vZGUpID0+IHtcbiAgICAgICAgdGhpcy52aWV3LnNldFJlcGVhdE1vZGUocmVwZWF0TW9kZSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vICAtLS0tICBTSE9SVENVVFMgTUVUSE9EUyAgLS0tLSAgLy9cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlbG9hZFNob3J0Y3V0c1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNemtcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDbGVhciByZWdpc3RlcmVkIHNob3J0Y3V0cyBhbmQgcmVsb2FkIHRoZW0gYWxsIGZyb20gVXNlciBwcmVmZXJlbmNlcywgd2hlbiB0aGV5J2xsIGJlIGEgdGhpbmdcbiAgICoqL1xuICByZWxvYWRTaG9ydGN1dHMoKSB7XG4gICAgU2hvcnRjdXQudW5yZWdpc3RlckFsbCgpO1xuXG4gICAgLy8gTXVsdGkga2V5cyBzaG9ydGN1dHMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUgc2ltcGxlIG9uZXMsIHRvIHJlc3BlY3QgdGhlIHRyaWdnZXIgb3JkcmVcblxuICAgIC8vIFZvbHVtZSBjb250cm9sXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrU2hpZnQrQXJyb3dEb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RWb2x1bWUoLTAuMjUpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrU2hpZnQrQXJyb3dVcCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0Vm9sdW1lKDAuMjUpO1xuICAgIH0pO1xuXG4gICAgU2hvcnRjdXQucmVnaXN0ZXIoJ0N0cmwrQXJyb3dEb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RWb2x1bWUoLTAuMSk7XG4gICAgfSk7XG5cbiAgICBTaG9ydGN1dC5yZWdpc3RlcignQ3RybCtBcnJvd1VwJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RWb2x1bWUoMC4xKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdBcnJvd0Rvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFZvbHVtZSgtMC4wMSk7XG4gICAgfSk7XG5cbiAgICBTaG9ydGN1dC5yZWdpc3RlcignQXJyb3dVcCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0Vm9sdW1lKDAuMDEpO1xuICAgIH0pO1xuXG4gICAgLy8gUHJvZ3Jlc3MgY29udHJvbFxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdDdHJsK1NoaWZ0K0Fycm93TGVmdCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0UHJvZ3Jlc3MoLTI1KTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdDdHJsK1NoaWZ0K0Fycm93UmlnaHQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFByb2dyZXNzKDI1KTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdDdHJsK0Fycm93TGVmdCcsICgpID0+IHtcbiAgICAgIHRoaXMuYWRqdXN0UHJvZ3Jlc3MoLTEwKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdDdHJsK0Fycm93UmlnaHQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFByb2dyZXNzKDEwKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdBcnJvd0xlZnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmFkanVzdFByb2dyZXNzKC0xKTtcbiAgICB9KTtcblxuICAgIFNob3J0Y3V0LnJlZ2lzdGVyKCdBcnJvd1JpZ2h0JywgKCkgPT4ge1xuICAgICAgdGhpcy5hZGp1c3RQcm9ncmVzcygxKTtcbiAgICB9KTtcblxuICAgIC8vIFBsYXliYWNrIGNvbnRyb2xcbiAgICBTaG9ydGN1dC5yZWdpc3RlcignICcsICgpID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlUGxheSgpO1xuICAgIH0pO1xuICB9XG5cblxuICBsb2dPdXQoKSB7XG4gICAgdGhpcy5rb211bmlrYXRvci5nZXRCaW5hcnlSZXNwb25zZSgnbG9nb3V0LycpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuXG4gIC8vICAtLS0tICBHRVRURVJTIC8gU0VUVEVSUyAgLS0tLSAgLy9cblxuXG4gIGdldElzTXV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZ2V0UGxheWVyKCkuZ2V0SXNNdXRlZCgpO1xuICB9XG4gIGdldFByb2dyZXNzKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmdldFBsYXllcigpLmdldFByb2dyZXNzKCk7XG4gIH1cbiAgZ2V0Vm9sdW1lKCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmdldFZvbHVtZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE16aztcbiIsIid1c2Vfc3RyaWN0JztcblxuXG5jbGFzcyBQbGF5ZXIge1xuXG5cbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEJhc2ljIGF1ZGlvIEhUTUwgbXVzaWMgcGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFByb3ZpZGUgYSBmZXcgZmVhdHVyZXMgdG8gY29udHJvbCBhIHBsYXliYWNrLiBTaG91bGQgYmUgaGFuZGxlZCBpbiBhIGNvbnRyb2xsZXJcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSB7fTsgLy8gSFRNTCBhdWRpbyBwbGF5ZXJcbiAgICB0aGlzLl92b2x1bWUgPSAwLjA7IC8vIFZvbHVtZSBpbiByYW5nZSBbMCwgMV0gZmxvYXRcbiAgICB0aGlzLl9pc011dGVkID0gZmFsc2U7IC8vIE11dGUgZmxhZ1xuICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlOyAvLyBQbGF5YmFjayBmbGFnXG5cbiAgICB0aGlzLl9pbml0KCk7IC8vIEluaXQgcGxheWVyIG9iamVjdFxuICAgIHRoaXMuX2V2ZW50cygpOyAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgdGhpcy5fYXR0YWNoKCk7IC8vIEF0dGFjaCBIVE1MIGF1ZGlvIHRhZyB0byB0aGUgRE9NXG4gIH1cblxuXG4gIC8vICAtLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0gIC8vXG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIHBsYXllciB0YWcgYW5kIHNldCBsb29wL3ZvbHVtZSB2YWx1ZXNcbiAgICoqL1xuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBVURJTycpOyAvLyBDcmVhdGUgSFRNTCBhdWRpbyB0YWdcbiAgICB0aGlzLl9wbGF5ZXIuaWQgPSAnbXprLWF1ZGlvLXBsYXllcic7IC8vIEFzc2lnbiBwbGF5ZXIgSURcbiAgICB0aGlzLnNldFZvbHVtZSgxKTsgLy8gSW5pdGlhbGl6ZSB2b2x1bWUgdG8gaXRzIG1heGltdW0gdmFsdWUsIHByZWZzXG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIExpc3RlbiB0byBlbmRlZCB0cmFjayBldmVudCBvbiBhdWRpbyBwbGF5ZXJcbiAgICoqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX3BsYXllci5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIHRoaXMuX3RyYWNrRW5kZWQuYmluZCh0aGlzKSk7IC8vIEhhbmRsZSB0cmFjayBlbmQgcGxheWJhY2sgZXZlbnRcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2F0dGFjaFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFwcGVuZCBhdWRpbyBwbGF5ZXIgdG8gdGhlIERPTSB1c2luZyBhIGZyYWdtZW50XG4gICAqKi9cbiAgX2F0dGFjaCgpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTsgLy8gRnJhZ21lbnQgY3JlYXRpb25cbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9wbGF5ZXIpOyAvLyBBcHBlbmQgYXVkaW8gcGxheWVyIHRvIHRoZSBmcmFnbWVudFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpOyAvLyBBcHBlbmQgZnJhZ21lbnQgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldFByb2dyZXNzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ29tcHV0ZSBhbmQgcmV0dXJucyB0aGUgY3VycmVudCB0cmFjayBwcm9ncmVzc2lvbiBpbiB0aGUgcGxheWVyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSB0cmFjayBwcm9ncmVzc2lvbiBpbiBjb21wbGV0aW9uIHBlcmNlbnRhZ2UgaW4gcmFuZ2UgWzAsIDEwMF1cbiAgICoqL1xuICBfZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIFV0aWxzLnByZWNpc2lvblJvdW5kKCh0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgKiAxMDApIC8gdGhpcy5fcGxheWVyLmR1cmF0aW9uLCAzKSB8fCAwOyAvLyBDb21wdXRlIHBlcmNlbnRhZ2UgZnJvbSBjdXJyZW50IHRpbWVcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3NldFByb2dyZXNzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IHByb2dyZXNzaW9uIHBlcmNlbnRhZ2Ugb24gY3VycmVudCB0cmFja1xuICAgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudGFnZSAtIFRoZSBwcm9ncmVzc2lvbiBwZXJjZW50YWdlIGluIHJhbmdlIFswLCAxMDBdXG4gICAqKi9cbiAgX3NldFByb2dyZXNzKHBlcmNlbnRhZ2UpIHtcbiAgICBpZiAodHlwZW9mIHBlcmNlbnRhZ2UgIT09ICdudW1iZXInKSB7IC8vIEJhZCBmb3JtYXQgZm9yIHZhbHVlXG4gICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICBjb2RlOiAnSU5WQUxJRF9QUk9HUkVTUycsXG4gICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lID09PSAwKSB7IC8vIFdoZW4gcGxheWVyIGlzIHN0b3BwZWQsIGN1cnJlbnRUaW1lID0gMC4gV2UgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGVyY2VudGFnZSA8PSAwKSB7IC8vIEJvdW5kIGxvd2VyIHZhbHVlXG4gICAgICBwZXJjZW50YWdlID0gMDtcbiAgICB9XG5cbiAgICBpZiAocGVyY2VudGFnZSA+IDEwMCkgeyAvLyBCb3VuZCB1cHBlciB2YWx1ZVxuICAgICAgcGVyY2VudGFnZSA9IDEwMDtcbiAgICB9XG5cbiAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgPSAocGVyY2VudGFnZSAqIHRoaXMuX3BsYXllci5kdXJhdGlvbikgLyAxMDA7IC8vIEFwcGx5IHBlcmNlbnRhZ2UgdG8gdG90YWwgZHVyYXRpb25cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3NldFZvbHVtZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgcGxheWVyIHZvbHVtZSBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIHZhbHVlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdm9sdW1lIHZhbHVlIHRvIHNldCBpbiByYW5nZSBbMCwgMV1cbiAgICoqL1xuICBfc2V0Vm9sdW1lKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHsgLy8gQmFkIGZvcm1hdCBmb3IgdmFsdWVcbiAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgIGNvZGU6ICdJTlZBTElEX1ZPTFVNRScsXG4gICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPD0gMCkgeyAvLyBCb3VuZCBsb3dlciB2YWx1ZVxuICAgICAgdGhpcy5tdXRlKCk7XG4gICAgICB0aGlzLl92b2x1bWUgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+IDEpIHsgLy8gQm91bmQgdXBwZXIgdmFsdWVcbiAgICAgIHZhbHVlID0gMTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNNdXRlZCkgeyAvLyBSZXN0b3JlIG11dGUgc3RhdGUgaWYgbmVlZGVkXG4gICAgICB0aGlzLnVubXV0ZSgpOyAvLyBVbiBtdXRlIHBsYXliYWNrXG4gICAgICB0aGlzLnNldFZvbHVtZSh2YWx1ZSk7IC8vIENhbGwgYWdhaW4gc2V0Vm9sdW1lIHdpdGggcHJldmlvdXMgdmFsdWVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wbGF5ZXIudm9sdW1lID0gVXRpbHMucHJlY2lzaW9uUm91bmQodmFsdWUsIDIpOyAvLyBBc3NpZ24gbmV3IHZvbHVtZSB2YWx1ZSAodHJ1bmNhdGVkIHdpdGggMiBkZWNpbWFscylcbiAgICB0aGlzLl92b2x1bWUgPSB0aGlzLl9wbGF5ZXIudm9sdW1lOyAvLyBTdG9yZSBvbGQgdm9sdW1lIHZhbHVlXG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF90cmFja0VuZGVkXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWN0aW9uIHRvIHRha2Ugd2hlbiB0aGUgY3VycmVudCB0cmFjayByZWFjaGVzIGl0cyBlbmRcbiAgICoqL1xuICBfdHJhY2tFbmRlZCgpIHtcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTsgLy8gVXBkYXRlIHBsYXlsaW5nIHN0YXRlXG4gICAgbXprLnRyYWNrRW5kZWQoKTtcbiAgfVxuXG5cbiAgLy8gIC0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tICAvL1xuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlTXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVG9nZ2xlIHRoZSBtdXRlIHN0YXR1cyBvZiB0aGUgcGxheWVyXG4gICAqKi9cbiAgdG9nZ2xlTXV0ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzTXV0ZWQpIHtcbiAgICAgIHRoaXMubXV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVubXV0ZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlUGxheVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVG9nZ2xlIHRoZSBwbGF5YmFjayBzdGF0ZSBvZiB0aGUgcGxheWVyXG4gICAqKi9cbiAgdG9nZ2xlUGxheSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkanVzdFByb2dyZXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQvU3Vic3RyYWN0IHRoZSBhbW91bnQgKHBlcmNlbnRhZ2UpIHRvIHRoZSBjdXJyZW50IHByb2dyZXNzIChwZXJjZW50YWdlKVxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gUGVyY2VudGFnZSB2YWx1ZSB0byBhZGp1c3QgcHJvZ3Jlc3MgaW4gcmFuZ2UgWzAsIDEwMF1cbiAgICoqL1xuICBhZGp1c3RQcm9ncmVzcyhhbW91bnQpIHtcbiAgICB0aGlzLl9zZXRQcm9ncmVzcyh0aGlzLl9nZXRQcm9ncmVzcygpICsgYW1vdW50KTsgLy8gSW5uZXIgY2FsbCB3aXRoIGN1cnJlbnQgcHJvZ3Jlc3Npb25cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0Vm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBBZGQvU3Vic3RyYWN0IHRoZSBhbW91bnQgdG8gdGhlIGN1cnJlbnQgdm9sdW1lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSBWb2x1bWUgdG8gYWRkL3N1YnN0cmFjdCBpbiByYW5nZSBbMCwgMV1cbiAgICoqL1xuICBhZGp1c3RWb2x1bWUoYW1vdW50KSB7XG4gICAgdGhpcy5fc2V0Vm9sdW1lKHRoaXMuX3ZvbHVtZSArIGFtb3VudCk7IC8vIElubmVyIGNhbGxcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgY2hhbmdlVHJhY2tcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSB0aGUgcGxheWVyIHNvdXJjZSBhbmQgc3RhcnQgdGhlIHBsYXliYWNrIG9uY2UgcmVhZHkgdG8gcGxheVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHBhdGggdG8gdGhlIHRyYWNrIChsb2NhbCBvciBob3N0ZWQpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHBsYXllciBpcyBvcGVyYXRpbmdcbiAgICoqL1xuICBjaGFuZ2VUcmFjayh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgeyAvLyBCYWQgZm9ybWF0IHZhbHVlXG4gICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgY29kZTogJ0lOVkFMSURfVFJBQ0tfVVJMJyxcbiAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2FkZWRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5fcGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbG9hZGVkTGlzdGVuZXIpOyAvLyBSZW1vdmUgbG9hZGVkIHRyYWNrIGxpc3RlbmVyXG4gICAgICAgIHRoaXMucGxheSgpOyAvLyBDYWxsIHBsYXllciBwbGF5IG1ldGhvZCAobm90IGFjdHVhbGx5IHBsYXkgYWZ0ZXIgdGhhdCBsaW5lKVxuICAgICAgICByZXNvbHZlKCk7IC8vIFJlc29sdmUgcHJvbWlzZVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2lzUGxheWluZykgeyAvLyBTdG9wIGFueSBwcmV2aW91cyBwbGF5YmFja1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcGxheWVyLnNyYyA9IHVybDsgLy8gU2V0IG5ldyB0cmFjayB1cmxcbiAgICAgIHRoaXMuX3BsYXllci5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGxvYWRlZExpc3RlbmVyKTsgLy8gQWRkIGxvYWRlZCB0cmFjayBsaXN0ZW5lclxuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBwbGF5XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTd2FwIHBsYXlpbmcgc3RhdGUgYW5kIHN0YXJ0IHBsYXliYWNrIGF0IGN1cnJlbnRUaW1lXG4gICAqKi9cbiAgcGxheSgpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyLnNyYykgeyAvLyBBcHBseSBvbmx5IGlmIHNyYyBpcyBkZWZpbmVkXG4gICAgICB0aGlzLl9pc1BsYXlpbmcgPSB0cnVlOyAvLyBTZXQgcGxheWluZyBzdGF0ZSB0byB0cnVlXG4gICAgICB0aGlzLl9wbGF5ZXIucGxheSgpOyAvLyBTdGFydCBwbGF5ZXIgZWZlY3RpdmUgcGxheWJhY2tcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHBhdXNlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTd2FwIHBsYXlpbmcgc3RhdGUgYW5kIHBhdXNlIHBsYXliYWNrIGF0IGN1cnJlbnRUaW1lXG4gICAqKi9cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci5zcmMpIHsgLy8gQXBwbHkgb25seSBpZiBzcmMgaXMgZGVmaW5lZFxuICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7IC8vIFNldCBwbGF5aW5nIHN0YXRlIHRvIGZhbHNlXG4gICAgICB0aGlzLl9wbGF5ZXIucGF1c2UoKTsgLy8gUGF1c2UgcGxheWVyIHBsYXliYWNrXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzdG9wXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXllclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTdG9wIHBsYXliYWNrIGFuZCByZW1vdmUgc291cmNlIGZyb20gcGxheWVyIGF0dHJpYnV0ZXNcbiAgICoqL1xuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIuc3JjKSB7IC8vIEFwcGx5IG9ubHkgaWYgc3JjIGlzIGRlZmluZWRcbiAgICAgIHRoaXMuX3BsYXllci5wYXVzZSgpOyAvLyBQYXVzZSBwbGF5ZXIgcGxheWJhY2tcbiAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlOyAvLyBTZXQgcGxheWluZyBzdGF0ZSB0byBmYWxzZVxuICAgICAgdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgIC8vdGhpcy5fcGxheWVyLmR1cmF0aW9uID0gMDtcbiAgICAgIHRoaXMuX3BsYXllci5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpOyAvLyBSZW1vdmUgc3JjIGF0dHJpYnV0ZSBmcm9tIHBsYXllciAoc2luY2UgdGhpcy5fcGxheWVyLnNyYyA9IG51bGwgZG9lc24ndCBkZWxldGUgc3JjKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgbXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IHBsYXllciBlZmZlY3RpdmUgdm9sdW1lIHRvIHplcm9cbiAgICoqL1xuICBtdXRlKCkge1xuICAgIGlmICghdGhpcy5faXNNdXRlZCkgeyAvLyBBdm9pZCBtdWx0aSBjYWxsXG4gICAgICB0aGlzLl9pc011dGVkID0gdHJ1ZTsgLy8gU2V0IG11dGUgc3RhdGUgdG8gdHJ1ZVxuICAgICAgdGhpcy5fcGxheWVyLnZvbHVtZSA9IDA7IC8vIE11dGUgYXVkaW8gcGxheWVyXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1bm11dGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlc3RvcmUgcGxheWVyIHZvbHVtZSB0byBwcmV2aW91cyBpdHMgdmFsdWVcbiAgICoqL1xuICB1bm11dGUoKSB7XG4gICAgaWYgKHRoaXMuX2lzTXV0ZWQpIHsgLy8gQXZvaWQgbXVsdGkgY2FsbFxuICAgICAgbGV0IHZvbHVtZSA9IDAuNTsgLy8gUHJldmVudCBvbGQgdm9sdW1lIHZhbHVlIHdhcyB6ZXJvLCB3ZSBuZWVkIHRvIHJlc3RvcmUgYXQgaGFsZiwgdG8gYXZvaWQgdW5tdXRpbmcgdG8gdm9sdW1lID0gMFxuXG4gICAgICBpZiAodGhpcy5fdm9sdW1lICE9PSAwKSB7IC8vIE9sZCB2b2x1bWUgIT0gMFxuICAgICAgICB2b2x1bWUgPSB0aGlzLl92b2x1bWU7IC8vIFdlIHJlc3RvcmUgdGhlIHByZXZpb3VzIHZvbHVtZSBvdGhlcndpc2VcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNNdXRlZCA9IGZhbHNlOyAvLyBTZXQgbXV0ZSBzdGF0ZSB0byBmYWxzZVxuICAgICAgdGhpcy5zZXRWb2x1bWUodm9sdW1lKTsgLy8gUmVzdG9yZSBvbGQgdm9sdW1lIHZhbHVlXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByZXBlYXRUcmFja1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gcmVzdGFydCBpbW1lZGlhdGVseSB0aGUgY3VycmVudCB0cmFjayBpbiB0aGUgcGxheWVyXG4gICAqKi9cbiAgcmVwZWF0VHJhY2soKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci5zcmMpIHsgLy8gQXBwbHkgb25seSBpZiBzcmMgaXMgZGVmaW5lZFxuICAgICAgdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lID0gMDsgLy8gUmVzZXQgY3VycmVudCB0aW1lXG4gICAgICB0aGlzLnBsYXkoKTsgLy8gU3RhcnQgcGxheWJhY2tcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGdldFNvdXJjZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQbGF5ZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIE9jdG9iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgcGxheWVyIGN1cnJlbnQgc291cmNlIHVybCBpZiBleGlzdGluZywgb3RoZXJ3aXNlIHJldHVybnMgTm9uZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBwbGF5ZXIgY3VycmVudCBzb3VyY2UgdXJsXG4gICAqKi9cbiAgZ2V0U291cmNlKCkge1xuICAgIGxldCBzb3VyY2UgPSAnTm9uZSc7XG5cbiAgICBpZiAodGhpcy5fcGxheWVyLnNyYyAhPT0gbnVsbCkge1xuICAgICAgc291cmNlID0gdGhpcy5fcGxheWVyLnNyYztcbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBoYXNTb3VyY2VcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUGxheWVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoZWNrIGlmIHBsYXllciBoYXMgYSBsb2FkZWQgdHJhY2tcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVGhlIHByZXNlbmNlIG9mIGEgc291cmNlIGluIHBsYXllciBzdGF0ZVxuICAgKiovXG4gIGhhc1NvdXJjZSgpIHtcbiAgICBsZXQgaGFzU291cmNlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fcGxheWVyLnNyYykge1xuICAgICAgaGFzU291cmNlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzU291cmNlO1xuICB9XG5cblxuICAvLyAgLS0tLSAgR0VUVEVSICAgLS0tLSAgLy9cblxuXG4gIGdldElzUGxheWluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuICB9XG5cblxuICBnZXRJc011dGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9pc011dGVkO1xuICB9XG5cblxuICBnZXRWb2x1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgfVxuXG5cbiAgZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldFByb2dyZXNzKCk7XG4gIH1cblxuXG4gIGdldER1cmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXIuZHVyYXRpb247XG4gIH1cblxuXG4gIGdldEN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWU7XG4gIH1cblxuXG4gIC8vICAtLS0tICBTRVRURVIgICAtLS0tICAvL1xuXG5cbiAgc2V0UHJvZ3Jlc3MocGVyY2VudGFnZSkge1xuICAgIHRoaXMuX3NldFByb2dyZXNzKHBlcmNlbnRhZ2UpO1xuICB9XG5cblxuICBzZXRWb2x1bWUodmFsdWUpIHtcbiAgICB0aGlzLl9zZXRWb2x1bWUodmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIid1c2Vfc3RyaWN0JztcblxuXG5jbGFzcyBVc2VyIHtcblxuXG4gIC8qKiBAc3VtbWFyeSA8aDE+TWFuYVplYWsncyB1c2VyIGNsYXNzPC9oMT5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gPGJsb2NrcXVvdGU+VGhpcyBjbGFzcyBzdG9yZXMgZXZlcnl0aGluZyB1c2VmdWwgYWJvdXQgdGhlIHVzZXIuPGJyPlxuICAgKiBJdCBzdG9yZXMgaXRzIG93biBhdHRyaWJ1dGVzIGFuZCBwcm92aWRlIGEgbWV0aG9kIHRvIHRlc3QgdGhlIHVzZXIncyBwZXJtaXNzaW9ucyAoZnJvbnRlbmQgb25seSwgdGhlIGJhY2tlbmQgZG9lcyBpdHMgb3duIHRlc3QgZm9yIHRoaXMpLjxicj5cbiAgICogQWxsIHVzZXIgbWVtYmVycyBtdXN0IGJlIGFjY2Vzc2VkIHRocm91Z2ggZ2V0dGVycyBhbmQgc2V0dGVycy48YnI+XG4gICAqIFRoaXMgb2JqZWN0IGlzIGEgPGEgaHJlZj1cIk16ay5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TXprPC9hPidzIGF0dHJpYnV0ZSwgdGhhdCBjYW4gYmUgdXNlZCBmcm9tIGFueXdoZXJlICg8Y29kZT5temsudXNlcjwvY29kZT4pLjwvYmxvY2txdW90ZT4gKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7U3RyaW5nfSAtIFRoZSB1c2VyJ3MgZ29kIGZhdGhlcidzIGludml0ZSBjb2RlICovXG4gICAgdGhpcy5fZ29kZmF0aGVyQ29kZSA9ICcnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge1N0cmluZ30gLSBUaGUgdXNlcidzIGdvZCBmYXRoZXIncyBuYW1lICovXG4gICAgdGhpcy5fZ29kZmF0aGVyTmFtZSA9ICcnO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge051bWJlcn0gLSBUaGUgdXNlcidzIGN1cnJlbnQgZ3JvdXAgaWQgKi9cbiAgICB0aGlzLl9ncm91cElkID0gLTE7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7U3RyaW5nfSAtIFRoZSB1c2VyJ3MgY3VycmVudCBncm91cCBuYW1lICovXG4gICAgdGhpcy5fZ3JvdXBOYW1lID0gJyc7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7TnVtYmVyfSAtIFRoZSB1c2VyJ3MgaWQgKi9cbiAgICB0aGlzLl9pZCA9IC0xO1xuICAgIC8qKiBAcHJpdmF0ZVxuICAgICAqIEBtZW1iZXIge1N0cmluZ30gLSBUaGUgdXNlcidzIGludml0ZSBjb2RlIGhhc2ggKi9cbiAgICB0aGlzLl9pbnZpdGVDb2RlID0gJyc7XG4gICAgLyoqIEBwcml2YXRlXG4gICAgICogQG1lbWJlciB7Qm9vbGVhbn0gLSBUaGUgdXNlcidzIGFkbWluIHN0YXR1cyAqL1xuICAgIHRoaXMuX2lzQWRtaW4gPSBmYWxzZTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtBcnJheX0gLSBUaGUgdXNlcidzIHBlcm1pc3Npb25zICg0LWdyYW1zIGl0ZW1zLCBzZWUgPGNvZGU+YXBwL3V0aWxzLnB5OnBvcHVsYXRlREIoKTwvY29kZT4pICovXG4gICAgdGhpcy5fcGVybWlzc2lvbnMgPSBbXTtcbiAgICAvKiogQHByaXZhdGVcbiAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IC0gVGhlIHVzZXIncyB1c2VybmFtZSAqL1xuICAgIHRoaXMuX3VzZXJuYW1lID0gJyc7XG4gIH1cblxuXG4gIC8vICAtLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLSAgLy9cblxuXG4gIC8qKiBAbWV0aG9kXG4gICAqIEBuYW1lIGhhc1Blcm1pc3Npb25cbiAgICogQG1lbWJlcm9mIFVzZXJcbiAgICogQGRlc2NyaXB0aW9uIDxibG9ja3F1b3RlPlRlc3QgaWYgdGhlIHVzZXIgaGFzIGEgZ2l2ZW4gcGVybWlzc2lvbiwgdXNpbmcgdGhlIDQtZ3JhbXMgZGVmaW5lZCBpbiA8Y29kZT5hcHAvdXRpbHMucHk6cG9wdWxhdGVEQigpPC9jb2RlPi48L2Jsb2NrcXVvdGU+XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwZXJtaXNzaW9uQ29kZSAtIFRoZSBwZXJtaXNzaW9uIGNvZGUgdG8gdGVzdCwgaXQgbXVzdCBiZSBhIGZvdXIgY2FwcyBsZXR0ZXJzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHVzZXIgaXMgZ3JhbnRlZCwgZmFsc2Ugb3RoZXJ3aXNlICovXG4gIGhhc1Blcm1pc3Npb24ocGVybWlzc2lvbkNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVybWlzc2lvbnMuaW5jbHVkZXMocGVybWlzc2lvbkNvZGUpO1xuICB9XG5cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBzZXRNZW1iZXJzXG4gICAqIEBtZW1iZXJvZiBVc2VyXG4gICAqIEBkZXNjcmlwdGlvbiA8YmxvY2txdW90ZT5TZXQgbWVtYmVycyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIDxjb2RlPkdFVDwvY29kZT4gcmVzcG9uc2UgZnJvbSB1cmwgPGNvZGU+dXNlci9nZXRJbmZvcm1hdGlvbi88L2NvZGU+LjwvYmxvY2txdW90ZT5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgc2VydmVyIHJlc3BvbnNlIG9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5HT0RGQVRIRVJfQ09ERSAtIFRoZSB1c2VyJ3MgZ29kZmF0aGVyIGludml0YXRpb24gY29kZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5HT0RGQVRIRVJfTkFNRSAtIFRoZSB1c2VyJ3MgZ29kZmF0aGVyIG5hbWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuR1JPVVBfSUQgLSBUaGUgdXNlcidzIGdyb3VwIGlkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLkdST1VQX05BTUUgLSBUaGUgdXNlcidzIGdyb3VwXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLlVTRVJfSUQgLSBUaGUgdXNlcidzIGlkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLklOVklURV9DT0RFIC0gVGhlIHVzZXIncyBpbnZpdGF0aW9uIGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLklTX0FETUlOIC0gVGhlIHVzZXIncyBhZG1pbiBzdGF0dXNcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5QRVJNSVNTSU9OUyAtIFRoZSB1c2VyJ3MgcGVybWlzc2lvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuVVNFUk5BTUUgLSBUaGUgdXNlcidzIHVzZXJuYW1lICovXG4gIHNldE1lbWJlcnMob3B0aW9ucykge1xuICAgIHRoaXMuX2F2YXRhclBhdGggPSBvcHRpb25zLkFWQVRBUl9QQVRIO1xuICAgIHRoaXMuX2dvZGZhdGhlckNvZGUgPSBvcHRpb25zLkdPREZBVEhFUl9DT0RFO1xuICAgIHRoaXMuX2dvZGZhdGhlck5hbWUgPSBvcHRpb25zLkdPREZBVEhFUl9OQU1FO1xuICAgIHRoaXMuX2dyb3VwSWQgPSBvcHRpb25zLkdST1VQX0lEO1xuICAgIHRoaXMuX2dyb3VwTmFtZSA9IG9wdGlvbnMuR1JPVVBfTkFNRTtcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMuVVNFUl9JRDtcbiAgICB0aGlzLl9pbnZpdGVDb2RlID0gb3B0aW9ucy5JTlZJVEVfQ09ERTtcbiAgICB0aGlzLl9pc0FkbWluID0gb3B0aW9ucy5JU19BRE1JTjtcbiAgICB0aGlzLl9wZXJtaXNzaW9ucyA9IG9wdGlvbnMuUEVSTUlTU0lPTlM7XG4gICAgdGhpcy5fdXNlcm5hbWUgPSBvcHRpb25zLlVTRVJOQU1FO1xuICB9XG5cblxuICAvLyAgLS0tLSAgR0VUVEVSICAtLS0tICAvL1xuXG5cbiAgLyoqIDxzdHJvbmc+Z2V0dGVyOmdvZGZhdGhlck5hbWU8L3N0cm9uZz5cbiAgICogQHR5cGUge1N0cmluZ30gKi9cbiAgZ2V0IGdvZGZhdGhlck5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dvZGZhdGhlck5hbWU7XG4gIH1cblxuXG4gIC8qKiA8c3Ryb25nPmdldHRlcjppZDwvc3Ryb25nPlxuICAgKiBAdHlwZSB7TnVtYmVyfSAqL1xuICBnZXQgaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cblxuICAvKiogPHN0cm9uZz5nZXR0ZXI6dXNlcm5hbWU8L3N0cm9uZz5cbiAgICogQHR5cGUge1N0cmluZ30gKi9cbiAgZ2V0IHVzZXJuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VybmFtZTtcbiAgfVxuXG4gIGdldCBhdmF0YXJQYXRoKCkge1xuICAgIHJldHVybiB0aGlzLl9hdmF0YXJQYXRoO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4uL2NvcmUvUGxheWVyLmpzJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vY29tcG9uZW50cy9Db2xsZWN0aW9uLmpzJztcbid1c2Vfc3RyaWN0JztcblxuY2xhc3MgTW9kZWwge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgZnJvbnRlbmQgbW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgTWFuYVplYWsgYWJzdHJhY3QgbW9kZWxzIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHNlc3Npb25cbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSB7fTtcbiAgICB0aGlzLl9jb2xsZWN0aW9uID0ge307XG4gICAgdGhpcy5fYWN0aXZlVHJhY2sgPSBudWxsO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHBsYXllciwgdXNlciBjb2xsZWN0aW9uXG4gICAqKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbigpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUExBWUVSIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBjaGFuZ2VUcmFja1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDaGFuZ2UgdGhlIGN1cnJlbnQgdHJhY2sgaW4gdGhlIHBsYXllciBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIHVybFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHRyYWNrIHVybCB0byByZWFkIHN0cmVhbSBmcm9tXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIGNoYW5nZVRyYWNrKGlkLCB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9hY3RpdmVUcmFjayA9IHRoaXMuZ2V0VHJhY2tCeUlkKGlkKTtcbiAgICAgIHRoaXMuX3BsYXllci5jaGFuZ2VUcmFjayh1cmwpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHRvZ2dsZVBsYXlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVG9nZ2xlIHBsYXliYWNrIG9uIHRoZSBwbGF5ZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgdG9nZ2xlUGxheSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIudG9nZ2xlUGxheSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc3RvcFBsYXliYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFN0b3AgdGhlIHBsYXllciBwbGF5YmFja1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBzdG9wUGxheWJhY2soKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLnN0b3AoKTtcbiAgICAgIHRoaXMuX2FjdGl2ZVRyYWNrID0gbnVsbDtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIG11dGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTXV0ZSB0aGUgcGxheWVyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIG11dGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLm11dGUoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVubXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVbk11dGUgdGhlIHBsYXllclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICB1bm11dGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLnVubXV0ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdG9nZ2xlTXV0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUb2dnbGUgdGhlIG11dGUgc3RhdHVzIG9mIHRoZSBwbGF5ZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgdG9nZ2xlTXV0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIudG9nZ2xlTXV0ZSgpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0Vm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkanVzdCB0aGUgcGxheWJhY2sgdm9sdW1lIGZyb20gYSBnaXZlbiBhbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIFBvc2l0aXZlIG9yIG5lZ2F0aXZlIGZsb2F0IGFtb3VudCBvZiB2b2x1bWUgaW4gcmFuZ2UgWy0xLCAxXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBhZGp1c3RWb2x1bWUoYW1vdW50KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLmFkanVzdFZvbHVtZShhbW91bnQpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgc2V0Vm9sdW1lXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgcGxheWJhY2sgdm9sdW1lIGZyb20gYSBnaXZlbiB2YWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdm9sdW1lIC0gUG9zaXRpdmUgb3IgbmVnYXRpdmUgZmxvYXQgdm9sdW1lIHZhbHVlIGluIHJhbmdlIFswLCAxXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBzZXRWb2x1bWUodm9sdW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRqdXN0UHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTW9kZWxcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRqdXN0IHRoZSBwbGF5YmFjayBwcm9ncmVzcyBmcm9tIGEgZ2l2ZW4gYW1vdW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSBQb3NpdGl2ZSBvciBuZWdhdGl2ZSBmbG9hdCBhbW91bnQgb2YgcHJvZ3Jlc3MgaW4gcmFuZ2UgWy0xMDAsIDEwMF1cbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgYWRqdXN0UHJvZ3Jlc3MoYW1vdW50KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLmFkanVzdFByb2dyZXNzKGFtb3VudCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzZXRQcm9ncmVzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgdGhlIHBsYXliYWNrIHByb2dyZXNzIGZyb20gYSBnaXZlbiBhbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb2dyZXNzIC0gVGhlIHByb2dyZXNzaW9uIHBlcmNlbnRhZ2UgWzAsIDEwMF1cbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9wbGF5ZXIuc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBDT0xMRUNUSU9OIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBpbml0Q29sbGVjdGlvblxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBNb2RlbFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHVzZXIgY29sbGV0aW9uIGFjY29yZGluZyB0byB1c2VyIHJlc3BvbnNlIChmcm9tIGNvbnRyb2xsZXIgbXprLmpzKVxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgLSBUaGUgc2VydmVyIHJlcG9uc2Ugb2JqZWN0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzcG9uc2UuRE9ORSAtIFRoZSByZXF1ZXN0IHN0YXR1c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2UuRVJST1JfS0VZIC0gVGhlIGVycm9yIGtleSB0byBldmVudHVhbGx5IHVzZVxuICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZS5DT0xMRUNUSU9OIC0gVGhlIHJhdyB1c2VyIGNvbGxlY3Rpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgaW5pdENvbGxlY3Rpb24ocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLkRPTkUgJiYgcmVzcG9uc2UuRVJST1JfS0VZID09PSBudWxsKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5DT0xMRUNUSU9OLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ubmV3TGlicmFyeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fY29sbGVjdGlvbi5nZXRBY3RpdmVQbGF5bGlzdCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uYnVpbGRVc2VyQ29sbGVjdGlvbihyZXNwb25zZSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9jb2xsZWN0aW9uLmdldEFjdGl2ZVBsYXlsaXN0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5FUlJPUl9LRVkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZ2V0VHJhY2tCeUlkXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE1vZGVsXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIHRyYWNrIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIGlkLCBzZWFyY2hpbmcgaW4gZnVsbCB1c2VyIGNvbGxlY3Rpb24gKG9idmlvdXNseSBicnV0YWwpXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIFRoZSB0cmFjayBpZCB0byBnZXQgaW4gY29sbGVjdGlvbnNcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgbWF0Y2hpbmcgdHJhY2sgb3IgbnVsbFxuICAgKiovXG4gIGdldFRyYWNrQnlJZChpZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sbGVjdGlvbi5fcGxheWxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2NvbGxlY3Rpb24uX3BsYXlsaXN0c1tpXS5fYXJ0aXN0cy5sZW5ndGg7ICsraikge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX2NvbGxlY3Rpb24uX3BsYXlsaXN0c1tpXS5fYXJ0aXN0c1tqXS5hbGJ1bXMubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IHRoaXMuX2NvbGxlY3Rpb24uX3BsYXlsaXN0c1tpXS5fYXJ0aXN0c1tqXS5hbGJ1bXNba10udHJhY2tzLmxlbmd0aDsgKytsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29sbGVjdGlvbi5fcGxheWxpc3RzW2ldLl9hcnRpc3RzW2pdLmFsYnVtc1trXS50cmFja3NbbF0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLl9wbGF5bGlzdHNbaV0uX2FydGlzdHNbal0uYWxidW1zW2tdLnRyYWNrc1tsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvZ2dsZVJlcGVhdE1vZGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fY29sbGVjdGlvbi5nZXRBY3RpdmVQbGF5bGlzdCgpLnRvZ2dsZVJlcGVhdE1vZGUoKTtcbiAgICAgIHJlc29sdmUodGhpcy5fY29sbGVjdGlvbi5nZXRBY3RpdmVQbGF5bGlzdCgpLnJlcGVhdE1vZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVwZWF0VHJhY2soKSB7XG4gICAgdGhpcy5fcGxheWVyLnJlcGVhdFRyYWNrKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgZ2V0IHJlcGVhdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb24uZ2V0QWN0aXZlUGxheWxpc3QoKS5yZXBlYXRNb2RlO1xuICB9XG5cbiAgZ2V0Vm9sdW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXIuZ2V0Vm9sdW1lKCk7XG4gIH1cbiAgZ2V0UGxheWVyKCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXI7XG4gIH1cbiAgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbjtcbiAgfVxuICBnZXRBY3RpdmVUcmFjaygpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVHJhY2s7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XG4iLCJpbXBvcnQgUGxheWxpc3QgZnJvbSAnLi9QbGF5bGlzdC5qcyc7XG4ndXNlX3N0cmljdCc7XG5cbmNsYXNzIENvbGxlY3Rpb24ge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgQ29sbGVjdGlvbiBjbGFzc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgdXNlciBjb2xsZWN0aW9uIG9mIHBsYXlsaXN0cy4gSXQgY29udGFpbnMgYm90aCB0aGUgTWFuYVplYWsgbGlicmFyaWVzLCB0aGUgdXNyIHBsYXlsaXN0LCBhbmQgaW4gYSBuZWFyIGZ1dHVyZSwgc2hhcmVkIHBsYXlsaXN0IGZyb20gb3RoZXIgdXNlcnNcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wbGF5bGlzdHMgPSBbXTtcbiAgICB0aGlzLl9hY3RpdmVQbGF5bGlzdCA9IC0xO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0aWFsU2NhblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgQ29sbGVjdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFzayB0aGUgc2VydmVyIHRvIHBlcmZvcm0gYW4gaW5pdGlhbCBzY2FuIHNlcnZlciBzaWRlICh1c2Ugb24gYSBuZXdseSBjcmVhdGVkIGxpYnJhcnkgb25seSlcbiAgICogQHBhcmFtIHtvYmplY3R9IHBsYXlsaXN0IC0gVGhlIG5ldyBwbGF5bGlzdCAobGlicmFyeSlcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX2luaXRpYWxTY2FuKHBsYXlsaXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBMSUJSQVJZX0lEOiBwbGF5bGlzdC5nZXRJZCgpXG4gICAgICB9O1xuXG4gICAgICBtemsua29tdW5pa2F0b3IucG9zdCgnbGlicmFyeS9pbml0aWFsU2Nhbi8nLCBvcHRpb25zKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrU2NhblN0YXR1cyhwbGF5bGlzdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgY2hlY2tTY2FuU3RhdHVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBDb2xsZWN0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQXNrIHRoZSBzZXJ2ZXIgdW50aWwgYSBsaWJyYXJ5IGhhdmUgYmVlbiBzY2FubmVkIGFuZCByZXF1ZXN0IHRyYWNrcyBmb3IgaXRcbiAgICogQGRlc2NyaXB0aW9uIE1ldGhvZCB0aGF0IHJlY3Vyc2Ugd2l0aCBhbiBpbnRlcnZhbCB0byBhc2sgdGhlIHNlcnZlciBpZiBhIGxpYnJhcnkgaGF2ZSBiZWVuIGZ1bGx5IHNjYW5uZWQgKHVzZSBvbiBhIG5ld2x5IGNyZWF0ZWQgbGlicmFyeSBvbmx5LCBhZnRlciBfaW5pdGlhbFNjYW4gb25seSlcbiAgICogQHBhcmFtIHtvYmplY3R9IHBsYXlsaXN0IC0gVGhlIG5ldyBwbGF5bGlzdCAobGlicmFyeSlcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgX2NoZWNrU2NhblN0YXR1cyhwbGF5bGlzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgaW50ZXJ2YWxJZCA9IC0xO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgUExBWUxJU1RfSUQ6IHBsYXlsaXN0LmdldElkKClcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNoZWNrU3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBtemsua29tdW5pa2F0b3IucG9zdCgnbGlicmFyeS9jaGVja1NjYW5TdGF0dXMvJywgb3B0aW9ucylcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5ET05FID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICAgIHBsYXlsaXN0LmdldEFydGlzdHNGcm9tU2VydmVyKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yQ29kZSA9PiB7XG4gICAgICAgICAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGZyb250ZW5kOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvckNvZGUgPT4ge1xuICAgICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgICAgY29kZTogZXJyb3JDb2RlLFxuICAgICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNoZWNrU3RhdHVzKCk7XG4gICAgICB9LCA1MDApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkUGxheWxpc3RcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIENvbGxlY3Rpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZHMgYSBuZXcgcGxheWxpc3QgZnJvbSBhIHNlcnZlciByZXNwb25zZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGxheWxpc3QgLSBUaGUgcmF3IHBsYXlsaXN0IHRvIGJ1aWxkXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwbGF5bGlzdC5JTkZPIC0gVGhlIHBsYXlsaXN0IGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5bGlzdC5JTkZPLklEIC0gVGhlIHBsYXlsaXN0IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGxheWxpc3QuSU5GTy5JU19MSUJSQVJZIC0gVGhlIHBsYXlsaXN0IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGxheWxpc3QuSU5GTy5JU19QVUJMSUMgLSBUaGUgcGxheWxpc3QgaWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsYXlsaXN0LklORk8uTkFNRSAtIFRoZSBwbGF5bGlzdCBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwbGF5bGlzdC5JTkZPLkRFU0NSSVBUSU9OIC0gVGhlIHBsYXlsaXN0IGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwbGF5bGlzdC5JTkZPLk9XTkVSIC0gVGhlIHBsYXlsaXN0IG93bmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5bGlzdC5JTkZPLkFWRVJBR0VfQklUUkFURSAtIFRoZSBwbGF5bGlzdCBhdmVyYWdlIGJpdHJhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBsYXlsaXN0LklORk8uVE9UQUxfRFVSQVRJT04gLSBUaGUgcGxheWxpc3QgdG90YWwgZHVyYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHBsYXlsaXN0LklORk8uVE9UQUxfVFJBQ0sgLSBUaGUgcGxheWxpc3QgdG90YWwgdHJhY2tcbiAgICoqL1xuICBfYnVpbGRQbGF5bGlzdChwbGF5bGlzdCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBpZDogcGxheWxpc3QuSU5GTy5JRCxcbiAgICAgIGlzTGlicmFyeTogcGxheWxpc3QuSU5GTy5JU19MSUJSQVJZLFxuICAgICAgaXNQdWJsaWM6IHBsYXlsaXN0LklORk8uSVNfUFVCTElDLFxuICAgICAgbmFtZTogcGxheWxpc3QuSU5GTy5OQU1FLFxuICAgICAgZGVzY3JpcHRpb246IHBsYXlsaXN0LklORk8uREVTQ1JJUFRJT04sXG4gICAgICBvd25lcjogcGxheWxpc3QuSU5GTy5PV05FUixcbiAgICAgIGF2ZXJhZ0JpdFJhdGU6IHBsYXlsaXN0LklORk8uQVZFUkFHRV9CSVRSQVRFLFxuICAgICAgdG90YWxEdXJhdGlvbjogcGxheWxpc3QuSU5GTy5UT1RBTF9EVVJBVElPTixcbiAgICAgIHRvdGFsVHJhY2s6IHBsYXlsaXN0LklORk8uVE9UQUxfVFJBQ0tcbiAgICB9O1xuICAgIC8vIFRPRE8gaGFuZGxlIHBsYXlsaXN0LlZJRVdcbiAgICB0aGlzLl9wbGF5bGlzdHMucHVzaChuZXcgUGxheWxpc3Qob3B0aW9ucykpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGJ1aWxkVXNlckNvbGxlY3Rpb25cbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgQ29sbGVjdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEdldCBwbGF5bGlzdCByZWxhdGl2ZSBhcnRpc3RzIG9iamVjdCBmcm9tIHNlcnZlclxuICAgKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgLSBUaGUgc2VydmVyIHJlcG9uc2Ugb2JqZWN0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzcG9uc2UuRE9ORSAtIFRoZSByZXF1ZXN0IHN0YXR1c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzcG9uc2UuRVJST1JfS0VZIC0gVGhlIGVycm9yIGtleSB0byBldmVudHVhbGx5IHVzZVxuICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZS5DT0xMRUNUSU9OIC0gVGhlIHVzZXIgY29sbGVjdGlvbiBvZiBwbGF5bGlzdHNcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgYnVpbGRVc2VyQ29sbGVjdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UuQ09MTEVDVElPTi5sZW5ndGg7ICsraSkge1xuICAgICAgICB0aGlzLl9idWlsZFBsYXlsaXN0KHJlc3BvbnNlLkNPTExFQ1RJT05baV0pO1xuICAgICAgICB0aGlzLl9wbGF5bGlzdHNbdGhpcy5fcGxheWxpc3RzLmxlbmd0aCAtIDFdLmdldEFydGlzdHNGcm9tU2VydmVyKHJlc3BvbnNlKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZVBsYXlsaXN0ID0gMDsgLy8gVE9ETyA6IHN0b3JlIGluIGFjayB1c2VyIGxhdGVzdCBhY3RpdmUgcGxheWxpc3QgKGtlZXAgdGhlIEkgaW5kZXgpXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBuZXdMaWJyYXJ5XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIENvbGxlY3Rpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBHZXQgcGxheWxpc3QgcmVsYXRpdmUgYXJ0aXN0cyBvYmplY3QgZnJvbSBzZXJ2ZXJcbiAgICogQHJldHVybnMge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZSB3aGVuIGxvZ2ljIGhhcyBiZWVuIGV4ZWN1dGVkXG4gICAqKi9cbiAgbmV3TGlicmFyeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICghbXprLnVzZXIuaGFzUGVybWlzc2lvbignTElCUicpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tTZXJ2ZXJSZXNwb25zZSA9IChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UuRE9ORSkge1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVBsYXlsaXN0ID0gMDtcbiAgICAgICAgICB0aGlzLl9idWlsZFBsYXlsaXN0KHJlc3BvbnNlKTtcbiAgICAgICAgICB0aGlzLl9pbml0aWFsU2Nhbih0aGlzLl9wbGF5bGlzdHNbMF0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIFNob3J0Y3V0LnJlc3VtZUFsbCgpOyAvLyBSZXN0b3JlIGFsbCBzaG9ydGN1dHNcbiAgICAgICAgICAgICAgbXprLnZpZXcucmVtb3ZlT3ZlcmxheSgpOyAvLyBSZW1vdmUgbW9kYWwgZnJvbSBtYWluIGNvbnRhaW5lclxuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgY29kZTogcmVzcG9uc2UuRVJST1JfS0VZLFxuICAgICAgICAgICAgZnJvbnRlbmQ6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNoZWNrTW9kYWxWYWx1ZXMgPSAoZm9ybVZhbHVlcykgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIE5BTUU6IGZvcm1WYWx1ZXMubmFtZSxcbiAgICAgICAgICBVUkw6IGZvcm1WYWx1ZXMucGF0aCxcbiAgICAgICAgICBDT05WRVJUOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIG16ay5rb211bmlrYXRvci5wb3N0KCdsaWJyYXJ5L25ldy8nLCBvcHRpb25zKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNoZWNrU2VydmVyUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgICAgIGNvZGU6IHJlc3BvbnNlLFxuICAgICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBTaG9ydGN1dC5wYXVzZUFsbCgpOyAvLyBQYXVzZSBhbGwgc2hvcnRjdXRzIChlc3Bhc2NpYWxseSB0aGUgc3RvcCBwcm9wYWdhdGlvbilcbiAgICAgIG16ay52aWV3LmRpc3BsYXlNb2RhbCh7XG4gICAgICAgICAgbmFtZTogJ25ld2xpYnJhcnknLFxuICAgICAgICAgIGNhbGxiYWNrOiBjaGVja01vZGFsVmFsdWVzXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXRBY3RpdmVQbGF5bGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGxheWxpc3RzW3RoaXMuX2FjdGl2ZVBsYXlsaXN0XTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uO1xuIiwiaW1wb3J0IFRyYWNrIGZyb20gJy4vVHJhY2suanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFBsYXlsaXN0IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IE1hbmFaZWFrIFBsYXlsaXN0IGNsYXNzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUGxheWxpc3Qgb2JqZWN0IHRoYXQgc3RvcmVzIGFsbCBpbmZvcm1hdGlvbiBhYm91dCBhIHNpbmdsZSBwbGF5bGlzdFxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBwbGF5bGlzdCBpbmZvcm1hdGlvblxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5pZCAtIFRoZSBwbGF5bGlzdCBpZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNMaWJyYXJ5IC0gSXMgcGxheWxpc3QgYSBsaWJyYXJ5XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1B1YmxpYyAtIElzIHBsYXlsaXN0IHB1YmxpY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5uYW1lIC0gVGhlIHBsYXlsaXN0IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZGVzY3JpcHRpb24gLSBUaGUgcGxheWxpc3QgZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3duZXIgLSBUaGUgcGxheWxpc3Qgb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuYXZlcmFnZUJpdFJhdGUgLSBUaGUgcGxheWxpc3QgYXZlcmFnZSBiaXRyYXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnRvdGFsRHVyYXRpb24gLSBUaGUgcGxheWxpc3QgdG90YWwgZHVyYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMudG90YWxUcmFjayAtIFRoZSBwbGF5bGlzdCB0b3RhbCB0cmFja1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pZCA9IG9wdGlvbnMuaWQ7XG4gICAgdGhpcy5faXNMaWJyYXJ5ID0gb3B0aW9ucy5pc0xpYnJhcnk7XG4gICAgdGhpcy5faXNQdWJsaWMgPSBvcHRpb25zLmlzUHVibGljO1xuICAgIHRoaXMuX25hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSBvcHRpb25zLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuX293bmVyID0gb3B0aW9ucy5vd25lcjtcbiAgICB0aGlzLl9hdmdCaXRyYXRlID0gb3B0aW9ucy5hdmVyYWdCaXRSYXRlO1xuICAgIHRoaXMuX3RvdGFsRHVyYXRpb24gPSBvcHRpb25zLnRvdGFsRHVyYXRpb247XG4gICAgdGhpcy5fdG90YWxUcmFjayA9IG9wdGlvbnMudG90YWxUcmFjaztcbiAgICB0aGlzLl9yZXBlYXRNb2RlID0gMDsgLy8gMCA9IG9mZiB8IDEgPSBvbmUgfCAyID0gYWxsXG5cbiAgICB0aGlzLl9yYXdBcnRpc3RzID0gW107IC8vIEFydGlzdCBhcnJheSB0aGF0IGNvbnRhaW5zIGFsYnVtcyBhcnJheSB0aGF0IGNvbnRhaW5zIHRyYWNrcyBhcnJheVxuICAgIHRoaXMuX2FydGlzdHMgPSBbXTtcbiAgICB0aGlzLl90cmFja3MgPSBbXTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZ2V0QXJ0aXN0c0xhenlMb2FkXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQbGF5bGlzdFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEZldGNoIGEgYnVuY2ggb2YgdHJhY2tzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIC0gVGhlIGxhenkgbG9hZCBjYWxsIG51bWJlclxuICAgKiovXG4gIF9nZXRBcnRpc3RzTGF6eUxvYWQoc3RlcCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBQTEFZTElTVF9JRDogdGhpcy5faWQsXG4gICAgICBSRVFVRVNUX05VTUJFUjogc3RlcFxuICAgIH07XG5cbiAgICBtemsua29tdW5pa2F0b3IucG9zdCgncGxheWxpc3Qvc2ltcGxpZmllZExhenlMb2FkaW5nLycsIG9wdGlvbnMpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLkRPTkUpIHtcbiAgICAgICAgICB0aGlzLl9jb252ZXJ0UmF3QXJ0aXN0cyhyZXNwb25zZS5SRVNVTFQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2dldEFydGlzdHNMYXp5TG9hZChzdGVwICsgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UuRVJST1JfTVNHID09IFwibnVsbFwiIHx8IHJlc3BvbnNlLkVSUk9SX01TRyA9PSBcIlwiIHx8IHJlc3BvbnNlLkVSUk9SX01TRyA9PSBudWxsKSB7IC8vIFN1Y2Nlc3NmdWxseSBsb2FkZWQgYWxsXG4gICAgICAgICAgICBFdmVudHMuZmlyZShgVHJhY2tMb2FkZWQtJHt0aGlzLl9pZH1gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yQ29kZSA9PiB7XG4gICAgICAgIEVycm9ycy5yYWlzZSh7XG4gICAgICAgICAgY29kZTogZXJyb3JDb2RlLFxuICAgICAgICAgIGZyb250ZW5kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfY29udmVydFJhd0FydGlzdHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFBsYXlsaXN0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ29udmVydCByYXcgYXJ0aXN0cyBpbnRvIGNsZWFuc2VkIG9iamVjdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlIHdoZW4gbG9naWMgaGFzIGJlZW4gZXhlY3V0ZWRcbiAgICoqL1xuICBfY29udmVydFJhd0FydGlzdHMocmF3QXJ0aXN0c0FycmF5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdBcnRpc3RzQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgYWxidW1zID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmF3QXJ0aXN0c0FycmF5W2ldLkFMQlVNUy5sZW5ndGg7ICsraikge1xuICAgICAgICAgIGNvbnN0IHRyYWNrcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmF3QXJ0aXN0c0FycmF5W2ldLkFMQlVNU1tqXS5UUkFDS1MubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICAgIHRyYWNrcy5wdXNoKG5ldyBUcmFjayh7XG4gICAgICAgICAgICAgIGFsYnVtOiByYXdBcnRpc3RzQXJyYXlbaV0uQUxCVU1TW2pdLFxuICAgICAgICAgICAgICBhcnRpc3Q6IHJhd0FydGlzdHNBcnJheVtpXS5OQU1FLFxuICAgICAgICAgICAgICByYXdUcmFjazogcmF3QXJ0aXN0c0FycmF5W2ldLkFMQlVNU1tqXS5UUkFDS1Nba11cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhbGJ1bXMucHVzaCh7XG4gICAgICAgICAgICBpZDogcmF3QXJ0aXN0c0FycmF5W2ldLkFMQlVNU1tqXS5JRCxcbiAgICAgICAgICAgIG5hbWU6IHJhd0FydGlzdHNBcnJheVtpXS5BTEJVTVNbal0uTkFNRSxcbiAgICAgICAgICAgIHRyYWNrczogdHJhY2tzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hcnRpc3RzLnB1c2goe1xuICAgICAgICAgIGlkczogcmF3QXJ0aXN0c0FycmF5W2ldLklEUyxcbiAgICAgICAgICBuYW1lOiByYXdBcnRpc3RzQXJyYXlbaV0uTkFNRSxcbiAgICAgICAgICBhbGJ1bXM6IGFsYnVtc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGdldEFydGlzdHNGcm9tU2VydmVyXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFBsYXlsaXN0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gR2V0IHBsYXlsaXN0IHJlbGF0aXZlIGFydGlzdHMgb2JqZWN0IGZyb20gc2VydmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSAtIFRoZSBzZXJ2ZXIgcmVwb25zZSBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSByZXNwb25zZS5ET05FIC0gVGhlIHJlcXVlc3Qgc3RhdHVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNwb25zZS5FUlJPUl9LRVkgLSBUaGUgZXJyb3Iga2V5IHRvIGV2ZW50dWFsbHkgdXNlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmUgd2hlbiBsb2dpYyBoYXMgYmVlbiBleGVjdXRlZFxuICAgKiovXG4gIGdldEFydGlzdHNGcm9tU2VydmVyKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5ET05FKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50T3B0aW9ucyA9IHtcbiAgICAgICAgICBuYW1lOiBgVHJhY2tMb2FkZWQtJHt0aGlzLl9pZH1gLFxuICAgICAgICAgIG9uZVNob3Q6IHRydWUgLy8gRXZlbnQgbmVlZHMgdG8gYmUgZGlzbWlzc2VkIGFmdGVyIHJlcXVlc3QgY29tcGxldGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIEV2ZW50cy5yZWdpc3RlcihldmVudE9wdGlvbnMsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9nZXRBcnRpc3RzTGF6eUxvYWQoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QocmVzcG9uc2UuRVJST1JfS0VZKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVJlcGVhdE1vZGUoKSB7XG4gICAgdGhpcy5fcmVwZWF0TW9kZSA9ICsrdGhpcy5fcmVwZWF0TW9kZSAlIDM7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgZ2V0IHJlcGVhdE1vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcGVhdE1vZGU7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgZ2V0QXJ0aXN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJ0aXN0cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgVHJhY2sge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgVHJhY2sgY2xhc3NcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTdG9yZXMgYWxsIG1ldGFkYXRhIGZyb20gYSByYXcgZm9ybWF0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIHRyYWNrIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFsYnVtIC0gVHJhY2sgYWxidW1cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXJ0aXN0IC0gVHJhY2sgYXJ0aXN0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnJhd1RyYWNrIC0gUmF3IHRyYWNrIHNlcnZlciByZXNwb25zZVxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yYXdUcmFjay5CSVRSQVRFIC0gVHJhY2sgYml0cmF0ZSAoa2JwcylcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmF3VHJhY2suQ09NUE9TRVIgLSBUcmFjayBjb21wb3NlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yYXdUcmFjay5DT1ZFUiAtIFRyYWNrIGNvdmVyIHVybFxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yYXdUcmFjay5EVVJBVElPTiAtIFRyYWNrIGR1cmF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJhd1RyYWNrLkdFTlJFIC0gVHJhY2sgZ2VucmVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucmF3VHJhY2suSUQgLSBUcmFjayBpZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yYXdUcmFjay5QRVJGT1JNRVIgLSBUcmFjayBwZXJmb3JtZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmF3VHJhY2suVElUTEUgLSBUcmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5yYXdUcmFjay5ZRUFSIC0gVHJhY2sgeWVhclxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmFsYnVtID0gb3B0aW9ucy5hbGJ1bTtcbiAgICB0aGlzLmFydGlzdCA9IG9wdGlvbnMuYXJ0aXN0O1xuICAgIHRoaXMuYml0cmF0ZSA9IG9wdGlvbnMucmF3VHJhY2suQklUUkFURTtcbiAgICB0aGlzLmNvbXBvc2VyID0gb3B0aW9ucy5yYXdUcmFjay5DT01QT1NFUjtcbiAgICB0aGlzLmNvdmVyID0gb3B0aW9ucy5yYXdUcmFjay5DT1ZFUjtcbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy5yYXdUcmFjay5EVVJBVElPTjtcbiAgICB0aGlzLmdlbnJlID0gb3B0aW9ucy5yYXdUcmFjay5HRU5SRTtcbiAgICB0aGlzLmlkID0gb3B0aW9ucy5yYXdUcmFjay5JRDtcbiAgICB0aGlzLm1vb2RiYXIgPSBvcHRpb25zLnJhd1RyYWNrLk1PT0RCQVI7XG4gICAgdGhpcy5wZXJmb3JtZXIgPSBvcHRpb25zLnJhd1RyYWNrLlBFUkZPUk1FUjtcbiAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy5yYXdUcmFjay5USVRMRTtcbiAgICB0aGlzLnllYXIgPSBvcHRpb25zLnJhd1RyYWNrLllFQVI7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNrO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBFcnJvcnMge1xuICAvKipcbiAgICogQHN1bW1hcnkgRXJyb3JzIHN5c3RlbSB3aXRoIGZlZWRiYWNrXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmFpc2UgYm90aCBhIGxvZyBhbmQgYSB1c2VyIGZlZWJhY2sgZGVwZW5kaW5nIG9uIGxhbmcvKi5qc29uIGZpbGVzIChhbGwgc2V2ZXJpdHkva2V5L3ZhbHVlIG11dCBmaWd1cmUgaW4gaXQpLiBUaGUgY2xhc3MgYWxzbyBsb2dzIFR5cGVFcnJvcnMgaW4gSmF2YVNjcmlwdFxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl92ZXJib3NlID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLnZlcmJvc2UgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5fdmVyYm9zZSA9IG9wdGlvbnMudmVyYm9zZTtcbiAgICB9XG5cbiAgICB0aGlzLl90cmFjZSA9IGZhbHNlO1xuICAgIGlmIChvcHRpb25zLnRyYWNlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMudHJhY2UgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5fdHJhY2UgPSBvcHRpb25zLnRyYWNlO1xuICAgIH1cblxuICAgIHRoaXMuX2Nzc1J1bGVzID0ge1xuICAgICAgaW5mbzogJycsXG4gICAgICB3YXJuaW5nOiAnJyxcbiAgICAgIGVycm9yOiAnJ1xuICAgIH07XG5cbiAgICAvLyBUaG9zZSB2YWx1ZSBuZWVkcyB0byBtYXRjaCB0aGUgb25lcyBpbiAqKiouc2NzcyBmb3IgaW5mbywgd2FybmluZyBhbmQgZXJyb3JcbiAgICB0aGlzLl9jc3NSdWxlcy5pbmZvID0gJ2NvbG9yOiByZ2IoNDQsIDQ0LCA0OCk7IGZvbnQtd2VpZ2h0OiBib2xkOyc7XG4gICAgdGhpcy5fY3NzUnVsZXMud2FybmluZyA9ICdjb2xvcjogcmdiKDQ0LCA0NCwgNDgpOyBmb250LXdlaWdodDogYm9sZDsnO1xuICAgIHRoaXMuX2Nzc1J1bGVzLmVycm9yID0gJ2NvbG9yOiByZ2IoMjU1LCAwLCA0OCk7IGZvbnQtd2VpZ2h0OiBib2xkOyc7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2dldENhbGxlck5hbWVcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEVycm9yc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBHZXQgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgZGVwZW5kaW5nIG9uIGdpdmVuIGJyb3dzZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IGJyb3dzZXJzIC0gQ29udGFpbnMgYSBicm93c2VyIGxpc3QgYXNzb2NpYXRlZCB3aXRoIGEgYm9vbGVhbiB0byBrbm93IHdoaWNoIGJyb3dzZXIgaXMgaW4gdXNlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYWxsZXIgZnVuY3Rpb24gbmFtZVxuICAgKiovXG4gIF9nZXRDYWxsZXJOYW1lKGJyb3dzZXIpIHtcbiAgICAvLyBPcmlnaW5hbCBjb2RlIGZyb206IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2lyaXNsaS83MTZiNmRhY2QzZjE1MWNlMmI3ZVxuICAgIGxldCBjYWxsZXIgPSAobmV3IEVycm9yKCkpLnN0YWNrOyAvLyBDcmVhdGUgZXJyb3IgYW5kIGdldCBpdHMgY2FsbCBzdGFja1xuXG4gICAgaWYgKGJyb3dzZXIuZmlyZWZveCkge1xuICAgICAgY2FsbGVyID0gY2FsbGVyLnNwbGl0KCdcXG4nKVsyXTsgLy8gR2V0IHdobyBjYWxsZWQgcmFpc2UgKDAgPSB0aGlzLCAxID0gcmFpc2UsIDIgPSByYWlzZSBjYWxsZXIpXG4gICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvXFxAKy8sICcgKCcpOyAvLyBDaGFuZ2UgYEBgIHRvIGAoYFxuICAgICAgY2FsbGVyICs9ICcpJztcbiAgICB9IGVsc2UgaWYgKGJyb3dzZXIuY2hyb21lKSB7XG4gICAgICBjYWxsZXIgPSBjYWxsZXIuc3BsaXQoJ1xcbicpWzNdOyAvLyBHZXQgd2hvIGNhbGxlZCByYWlzZSAoMCA9IHRoaXMsIDEgPSByYWlzZSwgMiA9IHJhaXNlIGNhbGxlcilcbiAgICAgIGNhbGxlciA9IGNhbGxlci5yZXBsYWNlKC9eRXJyb3JcXHMrLywgJycpOyAvLyBSZW1vdmUgQ2hyb21lIGBFcnJvcmAgc3RyaW5nXG4gICAgICBjYWxsZXIgPSBjYWxsZXIucmVwbGFjZSgvXlxccythdC4vLCAnJyk7IC8vIFJlbW92ZSBDaHJvbWUgYGF0YCBzdHJpbmdcbiAgICB9XG5cbiAgICByZXR1cm4gYFJhaXNlZCBmcm9tIGZ1bmN0aW9uICR7Y2FsbGVyfWA7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcmFpc2VcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZlbnRzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVnaXN0ZXIgYSBjdXN0b20gZXZlbnQgdXNpbmcgYSBuYW1lIGFuZCBhIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGVycm9yIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29kZSAtIFRoZSBlcnJvciBrZXkgdmFsdWUgaW4gbGFuZy8qLmpzb24gXCJlcnJvcnNcIiBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5mcm9udGVuZD1mYWxzZV0gLSBUaGUgZXZlbnQgc3RyaW5nIGlkZW50aWZpZXIgKHVzZSBzcGVjaWZpYyBuYW1lcylcbiAgICoqL1xuICByYWlzZShvcHRpb25zKSB7XG4gICAgbGV0IHNldmVyaXR5ID0gJyc7XG4gICAgbGV0IHRpdGxlID0gJyc7XG4gICAgbGV0IG1lc3NhZ2UgPSAnJztcblxuICAgIGlmIChtemsubGFuZy5lcnJvcnMuZnJvbnRlbmRbb3B0aW9ucy5jb2RlXSA9PT0gdW5kZWZpbmVkICYmIG16ay5sYW5nLmVycm9ycy5iYWNrZW5kW29wdGlvbnMuY29kZV0gPT09IHVuZGVmaW5lZCkgeyAvLyBKYXZhU2NyaXB0IHNjcmlwdGluZyBlcnJvclxuICAgICAgY29uc3QgZmlsZW5hbWUgPSBvcHRpb25zLmNvZGUuZmlsZU5hbWUubWF0Y2goL1xcLyhbXlxcL10rKVxcLz8kLylbMV07XG4gICAgICBzZXZlcml0eSA9ICdlcnJvcic7XG4gICAgICB0aXRsZSA9IGBFcnJvciBpbiBKYXZhU2NyaXB0IHNvdXJjZSBjb2RlYDtcbiAgICAgIG1lc3NhZ2UgPSBgJHtvcHRpb25zLmNvZGUubmFtZX0gYmVjYXVzZSAke29wdGlvbnMuY29kZS5tZXNzYWdlfSBpbiBmaWxlICR7ZmlsZW5hbWV9ICgke29wdGlvbnMuY29kZS5saW5lTnVtYmVyfToke29wdGlvbnMuY29kZS5jb2x1bW5OdW1iZXJ9KWA7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmZyb250ZW5kKSB7XG4gICAgICBzZXZlcml0eSA9IG16ay5sYW5nLmVycm9ycy5mcm9udGVuZFtvcHRpb25zLmNvZGVdLnNldmVyaXR5O1xuICAgICAgdGl0bGUgPSBtemsubGFuZy5lcnJvcnMuZnJvbnRlbmRbb3B0aW9ucy5jb2RlXS50aXRsZTtcbiAgICAgIG1lc3NhZ2UgPSBtemsubGFuZy5lcnJvcnMuZnJvbnRlbmRbb3B0aW9ucy5jb2RlXS5tZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXZlcml0eSA9IG16ay5sYW5nLmVycm9ycy5iYWNrZW5kW29wdGlvbnMuY29kZV0uc2V2ZXJpdHk7XG4gICAgICB0aXRsZSA9IG16ay5sYW5nLmVycm9ycy5iYWNrZW5kW29wdGlvbnMuY29kZV0udGl0bGU7XG4gICAgICBtZXNzYWdlID0gbXprLmxhbmcuZXJyb3JzLmJhY2tlbmRbb3B0aW9ucy5jb2RlXS5tZXNzYWdlO1xuICAgIH1cblxuICAgIE5vdGlmaWNhdGlvbi5uZXcoe1xuICAgICAgdHlwZTogc2V2ZXJpdHksXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fdmVyYm9zZSkge1xuICAgICAgY29uc3QgYnJvd3NlciA9IHtcbiAgICAgICAgZmlyZWZveDogL2ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgICAgICBjaHJvbWU6IC9jaHJvbWUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIC9nb29nbGUgaW5jL2kudGVzdChuYXZpZ2F0b3IudmVuZG9yKSAvLyBUZXN0IHZlbmRvciB0byBhdm9pZCBmYWxzZSBwb3NpdGl2ZVxuICAgICAgfTtcblxuICAgICAgb3B0aW9ucy5jb2RlID0gJ3dhcm4nOyAvLyBUbyBhY2Nlc3MgY29uc29sZSBwcm9wZXJ0eSBlYXNpbHkgKHNlZSBjb25zb2xlW3R5cGVdIGNhbGwpLCBpbml0IHRvIHdhcm4gaW5jZSBjb25zb2xlLndhcm5pbmcgZG9lc24ndCBleGlzdHMgKGNvbnNvbGUud2FybigpKVxuICAgICAgY29uc3Qgb3V0cHV0U3RyaW5nID0gYCVjJHttZXNzYWdlfVxcbiR7dGhpcy5fZ2V0Q2FsbGVyTmFtZShicm93c2VyKX1gO1xuICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZChgJHtzZXZlcml0eS50b1VwcGVyQ2FzZSgpfSA6ICR7dGl0bGV9IChFcnJvci5qcylgKTtcblxuICAgICAgaWYgKHNldmVyaXR5ICE9PSAnd2FybmluZycpIHtcbiAgICAgICAgb3B0aW9ucy5jb2RlID0gc2V2ZXJpdHk7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGVbb3B0aW9ucy5jb2RlXShvdXRwdXRTdHJpbmcsIHRoaXMuX2Nzc1J1bGVzW3NldmVyaXR5XSk7IC8vIEFwcGx5IHR5cGUgYW5kIHNldmVyaXR5IHRvIGJ1aWxkIGNvbnNvbGUgY2FsbFxuXG4gICAgICBpZiAodGhpcy5fdHJhY2UgJiYgc2V2ZXJpdHkgIT09ICdlcnJvcicgJiYgKGJyb3dzZXIuZmlyZWZveCB8fCAoYnJvd3Nlci5jaHJvbWUgJiYgc2V2ZXJpdHkgIT09ICd3YXJuaW5nJykpKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvcnM7XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIEV2ZW50cyB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBCYXNpYyBjdXN0b20gZXZlbnRzIHN5c3RlbVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEV4cG9zZXMgYW4gQVBJIHRvIHJlZ2lzdGVyL3VucmVnaXN0ZXIgZXZlbnRzIGFuZCBmaXJlIHRoZW1cbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9ldmVudFVpZCA9IDA7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcmVnaXN0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgRXZlbnRzXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVnaXN0ZXIgYSBjdXN0b20gZXZlbnQgdXNpbmcgYSBuYW1lIGFuZCBhIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGV2ZW50IG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBldmVudCBzdHJpbmcgaWRlbnRpZmllciAodXNlIHNwZWNpZmljIG5hbWVzKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm9uZVNob3Q9ZmFsc2VdIC0gT25seSByZWdpc3RlciB0aGUgZXZlbnQgZm9yIG9uZSBjYWxsLiBBdXRvbWF0aWNhbGx5IHVucmVnaXN0ZXIgYWZ0ZXJcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIGV2ZW50IGlkICh1c2VmdWwgdG8gdW5yZWdpc3RlciB0aGUgcmVnaXN0ZXJlZCBldmVudClcbiAgICoqL1xuICByZWdpc3RlcihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIG9wdGlvbnMubmFtZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9ldmVudHNbb3B0aW9ucy5uYW1lXSkge1xuICAgICAgdGhpcy5fZXZlbnRzW29wdGlvbnMubmFtZV0gPSBbXTtcbiAgICB9IC8vIENyZWF0ZSBldmVudCBlbnRyeSBpZiBub3QgYWxyZWFkeSBleGlzdGluZ1xuXG4gICAgdGhpcy5fZXZlbnRzW29wdGlvbnMubmFtZV0ucHVzaCh7XG4gICAgICBpZDogdGhpcy5fZXZlbnRVaWQsXG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICBvbmVTaG90OiBvcHRpb25zLm9uZVNob3QgPyBvcHRpb25zLm9uZVNob3QgOiBmYWxzZSxcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZXZlbnRVaWQrKztcblxuICAgIHJldHVybiB0aGlzLl9ldmVudFVpZDsgLy8gUG9zdCBpbmNyZW1lbnQgdG8gcmV0dXJuIHRoZSB0cnVlIGV2ZW50IGVudHJ5IGlkLCB0aGVuIGluY3JlbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdW5yZWdpc3RlclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdmVudHNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVblJlZ2lzdGVyIGEgY3VzdG9tIGV2ZW50IHVzaW5nIGl0cyBpZFxuICAgKiBAcGFyYW0ge251bWJlcn0gdWlkIC0gVGhlIGV2ZW50IHVuaXF1ZSBpZFxuICAgKiovXG4gIHVucmVnaXN0ZXIodWlkKSB7XG4gICAgaWYgKHR5cGVvZiB1dWlkICE9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgbGV0IGkgPSB0aGlzLl9ldmVudHNba2V5XS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7IC8vIFJldmVyc2UgcGFyc2luZywgcG9zdCBkZWNyZW1lbnQgaXMgbWFuZGF0b3J5IGJjIG9mIHNwbGljZSgpXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHNba2V5XVtpXS5pZCA9PT0gdWlkKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW2tleV0uc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ldmVudHNba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1trZXldO1xuICAgICAgfSAvLyBSZW1vdmUgZXZlbnQgZW50cnkgaWYgbm90aGluZyBpcyBsaXN0ZW5pbmcgdG8gaXRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnJlZ2lzdGVyQWxsXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEV2ZW50c1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVuUmVnaXN0ZXIgYWxsIGN1c3RvbSBldmVudCByZWdpc3RlcmVkXG4gICAqKi9cbiAgdW5yZWdpc3RlckFsbCgpIHtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTsgLy8gUmVtb3ZlIGFsbCBlbnRyeVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZmlyZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBFdmVudHNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBGaXJlIGEgY3VzdG9tIGV2ZW50IGZyb20gaXRzIHN0cmluZyBpZGVudGlmaWVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgZXZlbnQgc3RyaW5nIGlkZW50aWZpZXJcbiAgICoqL1xuICBmaXJlKGV2ZW50TmFtZSkge1xuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgbGV0IGkgPSB0aGlzLl9ldmVudHNba2V5XS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7IC8vIFJldmVyc2UgcGFyc2luZywgcG9zdCBkZWNyZW1lbnQgaXMgbWFuZGF0b3J5IGJjIG9mIHNwbGljZSgpXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHNba2V5XVtpXS5uYW1lID09PSBldmVudE5hbWUpIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNba2V5XVtpXS5jYWxsYmFjaygpO1xuICAgICAgICAgIGlmICh0aGlzLl9ldmVudHNba2V5XVtpXS5vbmVTaG90KSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNba2V5XS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfSAvLyBSZW1vdmUgb25lU2hvdCBsaXN0ZW5lciBmcm9tIGV2ZW50IGVudHJ5XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIG5ld0xpYnJhcnkob3B0aW9ucykge1xuICAgIGxldCBjbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctbGlicmFyeS1jbG9zZScpO1xuICAgIGxldCBjcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLW5ldy1saWJyYXJ5Jyk7XG4gICAgbGV0IGxpYnJhcnlOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpYnJhcnktbmFtZScpO1xuICAgIGxldCBsaWJyYXJ5UGF0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWJyYXJ5LXBhdGgnKTtcblxuICAgIGNvbnNvbGUubG9nKGxpYnJhcnlOYW1lKVxuICAgIGNvbnNvbGUubG9nKGxpYnJhcnlQYXRoKVxuICAgIGNvbnNvbGUubG9nKGNsb3NlKVxuICAgIGNvbnNvbGUubG9nKGNyZWF0ZSlcblxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgU2hvcnRjdXQucmVzdW1lQWxsKCk7XG4gICAgICBtemsudmlldy5yZW1vdmVPdmVybGF5KCk7XG4gICAgfSk7XG5cbiAgICBjcmVhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrKHtcbiAgICAgICAgICBuYW1lOiBsaWJyYXJ5TmFtZS52YWx1ZSxcbiAgICAgICAgICBwYXRoOiBsaWJyYXJ5UGF0aC52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7IiwiJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBOb3RpZmljYXRpb24ge1xuICAvKipcbiAgICogQHN1bW1hcnkgQ3JlYXRlIGFuIGluc3RhbmNlIG9mIGEgbm90aWZpY2F0aW9uIGhhbmRsZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gTm90aWZpY2F0aW9uIENsYXNzIHRvIGF1dG9tYXRpY2FsbHkgaGFuZGxlIG9uZSBvciBzZXZlcmFsIG5vdGlmaWNhdGlvbiBvZiBkaWZmZXJlbnQgdHlwZXMgYXQgdGhlIHNhbWUgdGltZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIFRoZSBub3RpZmljYXRpb24gaGFuZGxlciBnbG9iYWwgb3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249dG9wLXJpZ2h0XSAtIDxpPnRvcC1sZWZ0OyB0b3AtcmlnaHQ7IGJvdHRvbS1sZWZ0OyBib3R0b20tcmlnaHQ7PC9pPlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMudGhpY2tCb3JkZXI9dG9wXSAtIDxpPnRvcDsgYm90dG9tOyBsZWZ0OyByaWdodDsgbm9uZTs8L2k+XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0zMDAwXSAtIE5vdGlmaWNhdGlvbiBsaWZlIGN5Y2xlIGR1cmF0aW9uIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnRyYW5zaXRpb249MTAwXSAtIE5vdGlmaWNhdGlvbiBmYWRlIGFuaW1hdGlvbiB0cmFuc2l0aW9uIHRpbWluZyAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhBY3RpdmU9NV0gLSBNYXhpbXVtIG9mIHNpbXVsdGFuZW91c2x5IG9wZW5lZCBub3RpZmljYXRpb24gaW4gcmFuZ2UgTipcbiAgICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTsgLy8gRGlzbWlzcyBhbGwgb3BlcmF0aW9uIGluIHByb2dyZXNzIGZsYWdcbiAgICB0aGlzLl9kb20gPSB7fTsgLy8gTm90aWZpY2F0aW9uIGhhbmRsZXIgY29udGFpbmVyXG4gICAgdGhpcy5fYWN0aXZlID0ge307IC8vIEFjdGl2ZSBub3RpZmljYXRpb25zIG9iamVjdCA6IHJldHJpZXZlIGEgbm90aWZpY2F0aW9uIHVzaW5nIGl0cyBJRCAodGhpcy5fYWN0aXZlW0lEXSlcbiAgICB0aGlzLl9xdWV1ZSA9IHt9OyAvLyBRdWV1ZSBub3RpZmljYXRpb25zIHdoZW4gbWF4IGFjdGl2ZSBoYXMgYmVlbiByZWFjaGVkXG4gICAgdGhpcy5faGlzdG9yeSA9IFtdOyAvLyBOb3RpZmljYXRpb24gaGlzdG9yeVxuICAgIHRoaXMuX2RlZmF1bHQgPSB7fTsgLy8gV2lsbCBjb250YWluIGFsbCBkZWZhdWx0IHZhbHVlIGZvciBOb3RpZmljYXRpb25cblxuICAgIHRoaXMuX3Bvc2l0aW9uID0gJyc7XG4gICAgdGhpcy5fdGhpY2tCb3JkZXIgPSAnJztcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IDA7XG4gICAgdGhpcy5fbWF4QWN0aXZlID0gMDtcblxuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG4gICAgdGhpcy5fYXR0YWNoKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDcmVhdGUgdGhlIGhhbmRsZXIgRE9NIGVsZW1lbnQsIHNldCBkZWZhdWx0IHZhbHVlcywgdGVzdCBnaXZlbiBvcHRpb25zIGFuZCBwcm9wZXJseSBhZGQgQ1NTIGNsYXNzIHRvIHRoZSBoYW5kbGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBUaGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgZ2xvYmFsIG9wdGlvbnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBvc2l0aW9uPXRvcC1yaWdodF0gLSA8aT50b3AtbGVmdDsgdG9wLXJpZ2h0OyBib3R0b20tbGVmdDsgYm90dG9tLXJpZ2h0OzwvaT5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnRoaWNrQm9yZGVyPXRvcF0gLSA8aT50b3A7IGJvdHRvbTsgbGVmdDsgcmlnaHQ7IG5vbmU7PC9pPlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MzAwMF0gLSBOb3RpZmljYXRpb24gbGlmZSBjeWNsZSBkdXJhdGlvbiAoaW4gbXMpIGluIHJhbmdlIE4qXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy50cmFuc2l0aW9uPTEwMF0gIC0gTm90aWZpY2F0aW9uIGZhZGUgYW5pbWF0aW9uIHRyYW5zaXRpb24gdGltaW5nIChpbiBtcykgaW4gcmFuZ2UgTipcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heEFjdGl2ZT01XSAtIE1heGltdW0gb2Ygc2ltdWx0YW5lb3VzbHkgb3BlbmVkIG5vdGlmaWNhdGlvbiBpbiByYW5nZSBOKlxuICAgKiovXG4gIF9pbml0KG9wdGlvbnMpIHtcbiAgICB0aGlzLl9kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTsgLy8gTm90aWZpY2F0aW9uIGhhbmRsZXIgRE9NIGNvbnRhaW5lclxuICAgIHRoaXMuX2RvbS5jbGFzc0xpc3QuYWRkKCdub3RpZmljYXRpb24tY29udGFpbmVyJyk7IC8vIFNldCBwcm9wZXIgQ1NTIGNsYXNzXG5cbiAgICB0aGlzLl9kZWZhdWx0ID0ge1xuICAgICAgaGFuZGxlcjoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXG4gICAgICAgIHRoaWNrQm9yZGVyOiAndG9wJyxcbiAgICAgICAgZHVyYXRpb246IDUwMDAsXG4gICAgICAgIHRyYW5zaXRpb246IDIwMCxcbiAgICAgICAgbWF4QWN0aXZlOiAxMFxuICAgICAgfSxcbiAgICAgIG5vdGlmaWNhdGlvbjoge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGljb25sZXNzOiBmYWxzZSxcbiAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgIHN0aWNreTogZmFsc2UsXG4gICAgICAgIHJlbmRlclRvOiB0aGlzLl9kb20sXG4gICAgICAgIENCdGl0bGU6ICcnLFxuICAgICAgICBjYWxsYmFjazogbnVsbFxuICAgICAgfSxcbiAgICAgIGNvbG9yOiB7XG4gICAgICAgIHN1Y2Nlc3M6ICdyZ2IoNzYsIDE3NSwgODApJyxcbiAgICAgICAgaW5mbzogJ3JnYigzLCAxNjksIDI0NCknLFxuICAgICAgICB3YXJuaW5nOiAncmdiKDI1NSwgMTUyLCAwKScsXG4gICAgICAgIGVycm9yOiAncmdiKDI0NCwgNjcsIDU0KSdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fcG9zaXRpb24gPSBvcHRpb25zID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIucG9zaXRpb24gOiBvcHRpb25zLnBvc2l0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIucG9zaXRpb24gOiBvcHRpb25zLnBvc2l0aW9uO1xuICAgIHRoaXMuX3RoaWNrQm9yZGVyID0gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRoaWNrQm9yZGVyIDogb3B0aW9ucy50aGlja0JvcmRlciA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRoaWNrQm9yZGVyIDogb3B0aW9ucy50aGlja0JvcmRlcjtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5kdXJhdGlvbiA6IG9wdGlvbnMuZHVyYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5kdXJhdGlvbiA6IG9wdGlvbnMuZHVyYXRpb247XG4gICAgdGhpcy5fdHJhbnNpdGlvbiA9IG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50cmFuc2l0aW9uIDogb3B0aW9ucy50cmFuc2l0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIudHJhbnNpdGlvbiA6IG9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB0aGlzLl9tYXhBY3RpdmUgPSBvcHRpb25zID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0LmhhbmRsZXIubWF4QWN0aXZlIDogb3B0aW9ucy5tYXhBY3RpdmUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5tYXhBY3RpdmUgOiBvcHRpb25zLm1heEFjdGl2ZTtcblxuICAgIGlmICh0aGlzLl9wb3NpdGlvbiAhPT0gJ3RvcC1sZWZ0JyAmJiB0aGlzLl9wb3NpdGlvbiAhPT0gJ3RvcC1yaWdodCcgJiYgdGhpcy5fcG9zaXRpb24gIT09ICdib3R0b20tbGVmdCcgJiYgdGhpcy5fcG9zaXRpb24gIT09ICdib3R0b20tcmlnaHQnKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIHBvc2l0aW9uXG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci5wb3NpdGlvbjsgLy8gRGVmYXVsdCB2YWx1ZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl90aGlja0JvcmRlciAhPT0gJ3RvcCcgJiYgdGhpcy5fdGhpY2tCb3JkZXIgIT09ICdib3R0b20nICYmIHRoaXMuX3RoaWNrQm9yZGVyICE9PSAnbGVmdCcgJiYgdGhpcy5fdGhpY2tCb3JkZXIgIT09ICdyaWdodCcgJiYgdGhpcy5fdGhpY2tCb3JkZXIgIT09ICdub25lJykgeyAvLyBJbGxlZ2FsIHZhbHVlIGZvciB0aGljayBib3JkZXJcbiAgICAgIHRoaXMuX3RoaWNrQm9yZGVyID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLnRoaWNrQm9yZGVyOyAvLyBEZWZhdWx0IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9kdXJhdGlvbiAhPT0gJ251bWJlcicgfHwgdGhpcy5fZHVyYXRpb24gPD0gMCkgeyAvLyBJbGxlZ2FsIHZhbHVlIGZvciBkdXJhdGlvblxuICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0LmhhbmRsZXIuZHVyYXRpb247IC8vIERlZmF1bHQgdmFsdWVcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZHVyYXRpb24gPCAodGhpcy5fdHJhbnNpdGlvbiAqIDIpKSB7IC8vIFRyYW5zaXRpb24gb3ZlciAoZHVyYXRpb24gLyAyKVxuICAgICAgdGhpcy5fdHJhbnNpdGlvbiA9IHRoaXMuX2RlZmF1bHQuaGFuZGxlci50cmFuc2l0aW9uOyAvLyBEZWZhdWx0IHZhbHVlIGZvciBfbWF4QWN0aXZlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9tYXhBY3RpdmUgIT09ICdudW1iZXInIHx8IHRoaXMuX21heEFjdGl2ZSA8PSAwKSB7IC8vIElsbGVnYWwgdmFsdWUgZm9yIG1heEFjdGl2ZVxuICAgICAgdGhpcy5fbWF4QWN0aXZlID0gdGhpcy5fZGVmYXVsdC5oYW5kbGVyLm1heEFjdGl2ZTsgLy8gRGVmYXVsdCB2YWx1ZSBmb3IgX21heEFjdGl2ZVxuICAgIH1cblxuICAgIHRoaXMuX2RvbS5jbGFzc0xpc3QuYWRkKHRoaXMuX3Bvc2l0aW9uKTsgLy8gQWRkIHBvc2l0aW9uIENTUyBjbGFzcyBvbmx5IGFmdGVyIHRoaXMuX3Bvc2l0aW9uIGlzIHN1cmUgdG8gYmUgYSB2YWxpZCB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2F0dGFjaFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEF0dGFjaCB0aGUgbm90aWZpY2F0aW9uIGhhbmRsZXIgdG8gdGhlIGRvbSB1c2luZyBhIGZyYWdtZW50XG4gICAqKi9cbiAgX2F0dGFjaCgpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9kb20pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2V2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBtb3VzZSBldmVudHMgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgLSBOb3RpZmljYXRpb24gaW5uZXIgY2FsbCBjb3VudGVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24udGltZW91dElEIC0gTm90aWZpY2F0aW9uIG93biBzZXRUaW1lb3V0IElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnXG4gICAqKi9cbiAgX2V2ZW50cyhub3RpZmljYXRpb24pIHtcbiAgICBsZXQgY2xvc2VGaXJlZCA9IGZhbHNlOyAvLyBDbG9zZSBmaXJlZCBmbGFnXG5cbiAgICAvLyBJbm5lciBjYWxsYmFjayBmdW5jdGlvbnNcbiAgICBjb25zdCBfdW5EaW0gPSAoKSA9PiB7IC8vIFVuZGltIG5vdGlmaWNhdGlvblxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5pc0RpbW1lZCkge1xuICAgICAgICB0aGlzLl91bkRpbShub3RpZmljYXRpb24pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBfY2xvc2UgPSAoKSA9PiB7IC8vIENsb3NlIG5vdGlmaWNhdGlvblxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgY291bnRlciBET00gZWxlbWVudFxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICAgIHRoaXMuX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbiwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSBub3RpZmljYXRpb24gZWxlbWVudCBmcm9tIHRoZSBET00gdHJlZVxuICAgICAgZWxzZSBpZiAoIWNsb3NlRmlyZWQpIHtcbiAgICAgICAgY2xvc2VGaXJlZCA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobm90aWZpY2F0aW9uLnRpbWVvdXRJRCk7IC8vIENsZWFyIGxpZmUgY3ljbGUgdGltZW91dFxuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Nsb3NlKTsgLy8gQXZvaWQgZXJyb3Igd2hlbiBzcGFtIGNsaWNraW5nIHRoZSBjbG9zZSBidXR0b25cbiAgICAgICAgdGhpcy5fY2xvc2Uobm90aWZpY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgX3Jlc2V0VGltZW91dCA9ICgpID0+IHsgLy8gUmVzZXQgbGlmZSBjeWNsZSB0aW1lb3V0XG4gICAgICBpZiAodGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghY2xvc2VGaXJlZCAmJiAhbm90aWZpY2F0aW9uLmlzRGltbWVkKSB7IC8vIE9ubHkgcmVzZXQgdGltZW91dCBpZiBubyBjbG9zZSBldmVudCBoYXMgYmVlbiBmaXJlZFxuICAgICAgICB0aGlzLl9yZXNldFRpbWVvdXQobm90aWZpY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTW91c2UgZXZlbnQgbGlzdGVuZXJzXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5zdGlja3kpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIF91bkRpbS5iaW5kKHRoaXMpKTtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBfdW5EaW0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5jbG9zYWJsZSkge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZS5iaW5kKHRoaXMpKTtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uLmRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBfcmVzZXRUaW1lb3V0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2J1aWxkVUlcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZHMgdGhlIERPTSBlbGVtZW50IHRoYXQgY29udGFpbnMgYW5kIHRoYXQgYWRhcHRzIHRvIGFsbCBnaXZlbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnR5cGUgLSBFcnJvciwgV2FybmluZywgSW5mbywgU3VjY2Vzc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uLnRpdGxlIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24ubWVzc2FnZSAtIE5vdGlmaWNhdGlvbiBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmljb25sZXNzIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24udGhpY2tCb3JkZXIgLSBOb3RpZmljYXRpb24gYm9yZGVyIHNpZGUgKG92ZXJyaWRlIGhhbmRsZXIgc2lkZSB2YWx1ZSlcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uY2xvc2FibGUgLSBNYWtlIG5vdGlmaWNhdGlvbiBjbG9zYWJsZSBmbGFnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE1ha2Ugbm90aWZpY2F0aW9uIHN0aWNreSBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb24uQ0J0aXRsZSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBub3RpZmljYXRpb24uY2FsbGJhY2sgLSBOb3RpZmljYXRpb24gY2FsbGJhY2sgYnV0dG9uXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEVuaGFuY2VkIGFuZCByZWFkeSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqKi9cbiAgX2J1aWxkVUkobm90aWZpY2F0aW9uKSB7XG4gICAgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA9IDE7XG4gICAgbm90aWZpY2F0aW9uLnRvdGFsUmVxdWVzdENvdW50ID0gMTtcblxuICAgIC8vIENyZWF0ZSBub3RpZmljYXRpb24gRE9NIGVsZW1lbnRzXG4gICAgbm90aWZpY2F0aW9uLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20udGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBub3RpZmljYXRpb24uZG9tLm1haW50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0g2Jyk7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuXG4gICAgLy8gQ2xhc3MgYXNzaWduYXRpb25cbiAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uLWNvbnRhaW5lcicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20udGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWNvbnRhaW5lcicpO1xuICAgIG5vdGlmaWNhdGlvbi5kb20uY2xvc2UuY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcblxuICAgIC8vIENoYW5naW5nIGJvcmRlciBzaWRlXG4gICAgaWYgKG5vdGlmaWNhdGlvbi50aGlja0JvcmRlciA9PT0gJ3RvcCcpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uY2xhc3NMaXN0LmFkZCgndG9wLWJvcmRlcicpO1xuICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLnRoaWNrQm9yZGVyID09PSAnYm90dG9tJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdib3R0b20tYm9yZGVyJyk7XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udGhpY2tCb3JkZXIgPT09ICdsZWZ0Jykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdsZWZ0LWJvcmRlcicpO1xuICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLnRoaWNrQm9yZGVyID09PSAncmlnaHQnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWJvcmRlcicpO1xuICAgIH1cblxuICAgIC8vIFRleHQgbW9kaWZpY2F0aW9uXG4gICAgbm90aWZpY2F0aW9uLmRvbS5tYWludGl0bGUuaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLnRpdGxlO1xuICAgIG5vdGlmaWNhdGlvbi5kb20ubWVzc2FnZS5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ubWVzc2FnZTtcbiAgICBub3RpZmljYXRpb24uZG9tLmNsb3NlLmlubmVySFRNTCA9ICcmI3gyNzE2Oyc7XG5cbiAgICAvLyBUeXBlIHNwZWNpZmljYXRpb24gKHRpdGxlLCBpY29uLCBjb2xvcilcbiAgICBpZiAobm90aWZpY2F0aW9uLnR5cGUgPT09ICdzdWNjZXNzJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdzdWNjZXNzJyk7XG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmljb24uc3JjID0gJy9zdGF0aWMvaW1nL2ZlZWRiYWNrL05vdGlmaWNhdGlvbi5qcy9zdWNjZXNzLnN2Zyc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24udHlwZSA9PT0gJ3dhcm5pbmcnKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ3dhcm5pbmcnKTtcbiAgICAgIGlmICghbm90aWZpY2F0aW9uLmljb25sZXNzKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uaWNvbi5zcmMgPSAnL3N0YXRpYy9pbWcvZmVlZGJhY2svTm90aWZpY2F0aW9uLmpzL3dhcm5pbmcuc3ZnJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmljb24uc3JjID0gJy9zdGF0aWMvaW1nL2ZlZWRiYWNrL05vdGlmaWNhdGlvbi5qcy9lcnJvci5zdmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLnR5cGUgPT09ICdpbmZvJykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5jbGFzc0xpc3QuYWRkKCdpbmZvJyk7XG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmljb24uc3JjID0gJy9zdGF0aWMvaW1nL2ZlZWRiYWNrL05vdGlmaWNhdGlvbi5qcy9pbmZvLnN2Zyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pY29ubGVzcykge1xuICAgICAgbm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb25sZXNzLXdpZHRoJyk7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uLmRvbS50ZXh0LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20ubWFpbnRpdGxlKTtcbiAgICBub3RpZmljYXRpb24uZG9tLnRleHQuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5tZXNzYWdlKTtcblxuICAgIC8vIEFkZCBjYWxsYmFjayBidXR0b24gYW5kIGxpc3RlbmVyIGlmIG5lZWRlZFxuICAgIGlmIChub3RpZmljYXRpb24uY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XG4gICAgICBjYWxsYmFja0J1dHRvbi5pbm5lckhUTUwgPSBub3RpZmljYXRpb24uQ0J0aXRsZTtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20udGV4dC5hcHBlbmRDaGlsZChjYWxsYmFja0J1dHRvbik7XG5cbiAgICAgIGNhbGxiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbG9zZShub3RpZmljYXRpb24pO1xuICAgICAgICBub3RpZmljYXRpb24uY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEZpbGwgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50XG4gICAgaWYgKCFub3RpZmljYXRpb24uaWNvbmxlc3MpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5pY29uKTtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uZG9tLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbi5kb20udGV4dCk7XG5cbiAgICAvLyBBcHBlbmQgY2xvc2UgYnV0dG9uIGlmIG5lZWRlZFxuICAgIGlmIChub3RpZmljYXRpb24uY2xvc2FibGUpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5kb20uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbS5jbG9zZSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGZpbmFsIG5vdGlmaWNhdGlvblxuICAgIHJldHVybiBub3RpZmljYXRpb247XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RhcnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYWxsIHRoaXMgbWV0aG9kIHRvIGFkZCB0aGUgbmV3IG5vdGlmaWNhdGlvbiB0byB0aGUgRE9NIGNvbnRhaW5lciwgYW5kIGxhdW5jaCBpdHMgbGlmZSBjeWNsZVxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICoqL1xuICBfc3RhcnQobm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoID49IHRoaXMuX21heEFjdGl2ZSkge1xuICAgICAgdGhpcy5fcXVldWVbbm90aWZpY2F0aW9uLmlkXSA9IG5vdGlmaWNhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF0gPSBub3RpZmljYXRpb247IC8vIEFwcGVuZCB0aGUgbmV3IG5vdGlmaWNhdGlvbiB0byB0aGUgX2FjdGl2ZSBvYmplY3RcblxuICAgICAgdGhpcy5fZXZlbnRzKG5vdGlmaWNhdGlvbik7IC8vIExpc3RlbiB0byBtb3VzZSBldmVudHMgb24gdGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uXG4gICAgICB0aGlzLl9vcGVuKG5vdGlmaWNhdGlvbik7IC8vIE9wZW4gdGhlIG5ldyBub3RpZmljYXRpb25cblxuICAgICAgbm90aWZpY2F0aW9uLnRpbWVvdXRJRCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb3VudGVyKG5vdGlmaWNhdGlvbik7IC8vIENoZWNrIG5vdGlmaWNhdGlvbiByZXF1ZXN0IGNvdW50IHRvIGFjdCBhY2NvcmRpbmdseVxuICAgICAgfSwgbm90aWZpY2F0aW9uLmR1cmF0aW9uKTsgLy8gVXNlIE5vdGlmaWNhdGlvbiBtYXN0ZXIgZHVyYXRpb25cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfb3BlblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE9wZW4gYW5kIGFkZCB0aGUgbm90aWZpY2F0aW9uIHRvIHRoZSBjb250YWluZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICoqL1xuICBfb3Blbihub3RpZmljYXRpb24pIHtcbiAgICAvLyBSZXZlcnNlIGluc2VydGlvbiB3aGVuIG5vdGlmaWNhdGlvbnMgYXJlIG9uIGJvdHRvbVxuICAgIGlmICh0aGlzLl9wb3NpdGlvbiA9PT0gJ2JvdHRvbS1yaWdodCcgfHwgdGhpcy5fcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5yZW5kZXJUby5pbnNlcnRCZWZvcmUobm90aWZpY2F0aW9uLmRvbSwgbm90aWZpY2F0aW9uLnJlbmRlclRvLmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8uYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uLmRvbSk7XG4gICAgfVxuXG4gICAgbm90aWZpY2F0aW9uLm9wZW5lZCA9IERhdGUubm93KCk7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIH0sIDEwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jbG9zZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENsb3NlIGFuZCByZW1vdmUgdGhlIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBjb250YWluZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzQ2xvc2luZyAtIEFscmVhZHkgY2xvc2luZyBmbGFnXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5yZW5kZXJUbyAtIERPTSBvYmplY3QgdG8gcmVuZGVyIHRoZSBub3RpZmljYXRpb24gaW5cbiAgICoqL1xuICBfY2xvc2Uobm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5pc0Nsb3NpbmcpIHsgLy8gQXZvaWQgZG91YmxlIGNsb3NlIG9uIGEgbm90aWZpY2F0aW9uIChpbiBjYXNlIGRpc21pc3MvZGlzbWlzc0FsbCBpcyB0cmlnZ2VycmVkIHdoZW4gbm90aWZpY2F0aW9uIGlzIGFscmVhZHkgY2xvc2luZylcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb24uaXNDbG9zaW5nID0gdHJ1ZTsgLy8gTG9jayBub3RpZmljYXRpb24gdG8gb25lIGZhZGVPdXQgYW5pbWF0aW9uXG4gICAgbm90aWZpY2F0aW9uLmNsb3NlZCA9IERhdGUubm93KCk7XG4gICAgbm90aWZpY2F0aW9uLmVmZmVjdGl2ZUR1cmF0aW9uID0gbm90aWZpY2F0aW9uLmNsb3NlZCAtIG5vdGlmaWNhdGlvbi5vcGVuZWQ7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAvLyBUT0RPIGhhZGxlIHRoaXMuX3RyYW5zaXRpb24gaW5zdGVhZCBvZiBoYXJkIGNvZGUgaW4gY3NzXG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVIaXN0b3J5KG5vdGlmaWNhdGlvbik7XG4gICAgICBub3RpZmljYXRpb24ucmVuZGVyVG8ucmVtb3ZlQ2hpbGQobm90aWZpY2F0aW9uLmRvbSk7IC8vIFJlbW92ZSB0aGlzIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBET00gdHJlZVxuXG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fcXVldWUpLmxlbmd0aCA+IDApIHsgLy8gTm90aWZpY2F0aW9uIHF1ZXVlIGlzIG5vdCBlbXB0eVxuICAgICAgICB0aGlzLl9zdGFydCh0aGlzLl9xdWV1ZVtPYmplY3Qua2V5cyh0aGlzLl9xdWV1ZSlbMF1dKTsgLy8gU3RhcnQgZmlyc3QgcXVldWVkIG5vdGlmaWNhdGlvblxuICAgICAgICBkZWxldGUgdGhpcy5fcXVldWVbT2JqZWN0LmtleXModGhpcy5fcXVldWUpWzBdXTsgLy8gU2hpZnQgcXVldWUgb2JqZWN0XG4gICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoID09PSAwKSB7IC8vIENoZWNrIHRoaXMuX2FjdGl2ZSBlbXB0eW5lc3NcbiAgICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTsgLy8gVW5sb2NrIGRpc21pc3NBbGxMb2NrXG4gICAgICB9XG4gICAgfSwgMTAwMCk7IC8vIFRyYW5zaXRpb24gdmFsdWUgc2V0IGluIF9ub3RpZmljYXRpb24uc2NzcyBUT0RPIHNhbWUgYXMgZmV3IGxpbmVzIHVwXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5jcmVtZW50UmVxdWVzdENvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiBhIG5vdGlmaWNhdGlvbiBpcyByZXF1ZXN0ZWQgYW5vdGhlciB0aW1lXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSlcbiAgICoqL1xuICBfaW5jcmVtZW50UmVxdWVzdENvdW50ZXIobm90aWZpY2F0aW9uKSB7XG4gICAgKytub3RpZmljYXRpb24ucmVxdWVzdENvdW50OyAvLyBJbmNyZW1lbnQgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudFxuXG4gICAgaWYgKG5vdGlmaWNhdGlvbi50b3RhbFJlcXVlc3RDb3VudCA8IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi50b3RhbFJlcXVlc3RDb3VudCA9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQ7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGNvdW50ZXIgRE9NIGVsZW1lbnRcbiAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBjb3VudGVyXG4gICAgICBpZiAobm90aWZpY2F0aW9uLmRvbS5jb3VudGVyKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uY291bnRlci5pbm5lckhUTUwgPSBub3RpZmljYXRpb24ucmVxdWVzdENvdW50O1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgY291bnRlciBET20gZWxlbWVudFxuICAgICAgZWxzZSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5kb20uY291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuY2xhc3NMaXN0LmFkZCgnY291bnRlcicpO1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDtcbiAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24uZG9tLmNvdW50ZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVuZGltIG5vdGlmaWNhdGlvbiBpZiBpdCBpcyBhIHN0aWNreS9kaW1tZWQgb25lXG4gICAgaWYgKG5vdGlmaWNhdGlvbi5zdGlja3kgJiYgbm90aWZpY2F0aW9uLmlzRGltbWVkKSB7XG4gICAgICB0aGlzLl91bkRpbShub3RpZmljYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBlYWNoIG5vdGlmaWNhdGlvbiBjeWNsZSBlbmQgdG8gdXBkYXRlIGl0cyBpbm5lciBjb3VudGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLmlzRGltbWVkIC0gTm90aWZpY2F0aW9uIGRpbW1lZCBzdGF0dXMgKG9ubHkgdXNlZnVsIGlmIG5vdGlmaWNhdGlvbi5zdGlja3kgaXMgdHJ1ZSlcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgLSBOb3RpZmljYXRpb24gaW5uZXIgY2FsbCBjb3VudGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY2F0aW9uIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2UgLSBUbyBmb3JjZSB0aGUgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCBkZWNyZW1lbnRhdGlvblxuICAgKiovXG4gIF9kZWNyZW1lbnRSZXF1ZXN0Q291bnRlcihub3RpZmljYXRpb24sIGZvcmNlKSB7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5zdGlja3kgJiYgIWZvcmNlKSB7XG4gICAgICBpZiAoIW5vdGlmaWNhdGlvbi5pc0RpbW1lZCkge1xuICAgICAgICB0aGlzLl9kaW0obm90aWZpY2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3Jlc2V0VGltZW91dChub3RpZmljYXRpb24pO1xuICAgIC0tbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDsgLy8gRGVjcmVtZW50IG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnRcblxuICAgIC8vIFVwZGF0ZSBjb3VudGVyIERPTSBlbGVtZW50XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5yZXF1ZXN0Q291bnQgPiAxKSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLmNvdW50ZXIuaW5uZXJIVE1MID0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudDtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgY291bnRlciBlbGVtZW50IGZyb20gdGhlIERPTSB0cmVlXG4gICAgZWxzZSB7XG4gICAgICBub3RpZmljYXRpb24uZG9tLnJlbW92ZUNoaWxkKG5vdGlmaWNhdGlvbi5kb20uY291bnRlcik7XG4gICAgICBkZWxldGUgbm90aWZpY2F0aW9uLmRvbS5jb3VudGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9jaGVja0NvdW50ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCB3aWxsIHJlc2V0IHRoZSBmYWRlb3V0L2RpbSB0aW1lb3V0IG9yIGNsb3NlL2RpbSB0aGUgbm90aWZpY2F0aW9uIGRlcGVuZGluZyBvbiBpdHMgcmVxdWVzdENvdW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCAtIE5vdGlmaWNhdGlvbiBpbm5lciBjYWxsIGNvdW50ZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLnRpbWVvdXRJRCAtIE5vdGlmaWNhdGlvbiBvd24gc2V0VGltZW91dCBJRFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5zdGlja3kgLSBOb3RpZmljYXRpb24gc3RpY2t5IGJlaHZhaW9yXG4gICAqKi9cbiAgX2NoZWNrQ291bnRlcihub3RpZmljYXRpb24pIHtcbiAgICAvLyBUaGlzIG5vdGlmaWNhdGlvbiBhcyBzdGlsbCBtb3JlIHRoYW4gb25lIGN5Y2xlIHRvIGxpdmVcbiAgICBpZiAobm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA+IDEpIHtcbiAgICAgIHRoaXMuX2RlY3JlbWVudFJlcXVlc3RDb3VudGVyKG5vdGlmaWNhdGlvbik7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBub3RpZmljYXRpb24gcmVhY2hlZCB0aGUgZW5kIG9mIGl0cyBsaWZlIGN5Y2xlXG4gICAgZWxzZSB7XG4gICAgICBpZiAobm90aWZpY2F0aW9uLnJlbmRlclRvLmNvbnRhaW5zKG5vdGlmaWNhdGlvbi5kb20pKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobm90aWZpY2F0aW9uLnRpbWVvdXRJRCk7XG4gICAgICAgIG5vdGlmaWNhdGlvbi5zdGlja3kgPyB0aGlzLl9kaW0obm90aWZpY2F0aW9uKSA6IHRoaXMuX2Nsb3NlKG5vdGlmaWNhdGlvbik7IC8vIEZhZGVPdXQvRGltIGRlcGVuZGluZyBvbiBzdGlja3kgYmVoYXZpb3JcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfY2xlYXJSZXF1ZXN0Q291bnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBNZXRob2QgdGhhdCBjbGVhciBldmVyeSBwZW5kaW5nIHJlcXVlc3RcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24uZG9tIC0gTm90aWZpY3Rpb24gRE9NIGVsZW1lbnRcbiAgICoqL1xuICBfY2xlYXJSZXF1ZXN0Q291bnQobm90aWZpY2F0aW9uKSB7XG4gICAgbm90aWZpY2F0aW9uLnJlcXVlc3RDb3VudCA9IDE7XG4gICAgbm90aWZpY2F0aW9uLmRvbS5yZW1vdmVDaGlsZChub3RpZmljYXRpb24uZG9tLmNvdW50ZXIpO1xuICAgIGRlbGV0ZSBub3RpZmljYXRpb24uZG9tLmNvdW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfcmVzZXRUaW1lb3V0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXNlIHRoaXMgdG8gcmVzZXQgYSBub3RpZmljYXRpb24gbGlmZSBjeWNsZSwgYW5kIGRlbGF5IGl0cyBjbG9zZSBldmVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi50aW1lb3V0SUQgLSBOb3RpZmljYXRpb24gb3duIHNldFRpbWVvdXQgSURcbiAgICoqL1xuICBfcmVzZXRUaW1lb3V0KG5vdGlmaWNhdGlvbikge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQobm90aWZpY2F0aW9uLnRpbWVvdXRJRCk7IC8vIENsZWFyIHByZXZpcG91cyBsaWZlIGN5Y2xlXG5cbiAgICBub3RpZmljYXRpb24udGltZW91dElEID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fY2hlY2tDb3VudGVyKG5vdGlmaWNhdGlvbik7IC8vIENoZWNrIG5vdGlmaWNhdGlvbiByZXF1ZXN0IGNvdW50IHRvIGFjdCBhY2NvcmRpbmdseVxuICAgIH0sIG5vdGlmaWNhdGlvbi5kdXJhdGlvbik7IC8vIFVzZSBOb3RpZmljYXRpb24gbWFzdGVyIGR1cmF0aW9uXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfdXBkYXRlSGlzdG9yeVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBhIG5vdGlmaWNhdGlvbiB0byB0aGUgaGlzdG9yeS4gTWlnaHQgYmUgZXhlY3V0ZWQgd2hlbiBhIG5vdGlmaWNhdGlvbiBpcyBiZWluZyBjbG9zZWRcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbiAtIFRoZSBub3RpZmljYXRpb24gb2JqZWN0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBub3RpZmljYXRpb24uaWQgLSBOb3RpZmljYXRpb24gcGVyc29ubmFsIElEXG4gICAqKi9cbiAgX3VwZGF0ZUhpc3Rvcnkobm90aWZpY2F0aW9uKSB7XG4gICAgLy8gUmVtb3ZlIHRoaXMgbm90aWZpY2F0aW9uIGZyb20gdGhlIGFjdGl2ZSBvYmplY3RcbiAgICBkZWxldGUgdGhpcy5fYWN0aXZlW25vdGlmaWNhdGlvbi5pZF07XG5cbiAgICAvLyBXb3JrIG5vdGlmaWNhdGlvbiBjb3B5XG4gICAgY29uc3QgY2xlYW5FbnRyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9uKSk7XG5cbiAgICAvLyBDbGVhciBub3RpZmljYXRpb24gb2JqZWN0IGZyb20gd29ya2luZyBhdHRyaWJ1dGVzXG4gICAgZGVsZXRlIGNsZWFuRW50cnkuaXNDbG9zaW5nO1xuICAgIGRlbGV0ZSBjbGVhbkVudHJ5LmlzRGltbWVkO1xuICAgIGRlbGV0ZSBjbGVhbkVudHJ5LnJlcXVlc3RDb3VudDtcbiAgICBkZWxldGUgY2xlYW5FbnRyeS50aW1lb3V0SUQ7XG4gICAgZGVsZXRlIGNsZWFuRW50cnkucmVuZGVyVG87XG4gICAgZGVsZXRlIGNsZWFuRW50cnkuZG9tO1xuXG4gICAgLy8gU2F2ZSBub3RpZmljYXRpb24gdG8gdGhlIGhpc3RvcnlcbiAgICB0aGlzLl9oaXN0b3J5LnB1c2goY2xlYW5FbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZGltXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gT25seSB1c2VmdWwgZm9yIHN0aWNreSBub3RpZmljYXRpb24gdGhhdCBkaW0gaW5zdGVhZCBvZiBjbG9zZSBhdCB0aGUgZW5kIG9mIGl0cyBsaWZlIGN5Y2xlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub3RpZmljYXRpb24gLSBUaGUgbm90aWZpY2F0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gbm90aWZpY2F0aW9uLmlkIC0gTm90aWZpY2F0aW9uIHBlcnNvbm5hbCBJRFxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uLmRvbSAtIE5vdGlmaWN0aW9uIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90aWZpY2F0aW9uLnN0aWNreSAtIE5vdGlmaWNhdGlvbiBzdGlja3kgYmVodmFpb3JcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RpZmljYXRpb24uaXNEaW1tZWQgLSBOb3RpZmljYXRpb24gZGltbWVkIHN0YXR1cyAob25seSB1c2VmdWwgaWYgbm90aWZpY2F0aW9uLnN0aWNreSBpcyB0cnVlKVxuICAgKiovXG4gIF9kaW0obm90aWZpY2F0aW9uKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGkgPSAxMDA7XG4gICAgKGZ1bmN0aW9uIGhhbGZGYWRlT3V0KCkgeyAvLyBTdGFydCBhbmltYXRpb24gaW1tZWRpYXRseVxuICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSBpIC8gMTAwO1xuICAgICAgICAtLWk7XG5cbiAgICAgICAgaWYgKGkgPT09IDUwICYmIG5vdGlmaWNhdGlvbi5zdGlja3kpIHsgLy8gT3BhY2l0eSBoYXMgcmVhY2hlZCAwLjUxXG4gICAgICAgICAgbm90aWZpY2F0aW9uLmRvbS5zdHlsZS5vcGFjaXR5ID0gMC41OyAvLyBTZXQgaGFsZiB0cmFuc3BhcmVuY3kgb24gbm90aWZpY2F0aW9uXG4gICAgICAgICAgbm90aWZpY2F0aW9uLmlzRGltbWVkID0gdHJ1ZTsgLy8gVXBkYXRlIG5vdGlmaWNhdGlvbiBkaW0gc3RhdHVzXG4gICAgICAgICAgcmV0dXJuOyAvLyBFbmQgZnVuY3Rpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChoYWxmRmFkZU91dCwgdGhhdC5fdHJhbnNpdGlvbiAvIDEwMCk7IC8vIFNwbGl0IGFuaW1hdGlvbiB0cmFuc2l0aW9uIGludG8gMTAwIGl0ZXJhdGlvbnMgKDUwIGZvciByZWFsIGhlcmUpXG4gICAgfSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF91bkRpbVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENhbGwgdGhpcyBtZXRob2Qgd2hlbiBhIG5vdGlmaWNhdGlvbiBpcyBub3QgaW5hY3RpdmUgYW55bW9yZVxuICAgKiBAcGFyYW0ge29iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIG5vdGlmaWNhdGlvbiBvYmplY3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5vdGlmaWNhdGlvbi5pZCAtIE5vdGlmaWNhdGlvbiBwZXJzb25uYWwgSURcbiAgICogQHBhcmFtIHtvYmplY3R9IG5vdGlmaWNhdGlvbi5kb20gLSBOb3RpZmljdGlvbiBET00gZWxlbWVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vdGlmaWNhdGlvbi5pc0RpbW1lZCAtIE5vdGlmaWNhdGlvbiBkaW1tZWQgc3RhdHVzIChvbmx5IHVzZWZ1bCBpZiBub3RpZmljYXRpb24uc3RpY2t5IGlzIHRydWUpXG4gICAqKi9cbiAgX3VuRGltKG5vdGlmaWNhdGlvbikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBpID0gNTA7XG4gICAgKGZ1bmN0aW9uIGhhbGZGYWRlSW4oKSB7XG4gICAgICBpZiAoaSA8IDEwMCkge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSBpIC8gMTAwO1xuICAgICAgICArK2k7XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IDEwMCkge1xuICAgICAgICBub3RpZmljYXRpb24uZG9tLnN0eWxlLm9wYWNpdHkgPSAxOyAvLyBTZXQgZnVsbCB2aXNpYmlsaXR5IG9uIG5vdGlmaWNhdGlvblxuICAgICAgICBub3RpZmljYXRpb24uaXNEaW1tZWQgPSBmYWxzZTsgLy8gVXBkYXRlIG5vdGlmaWNhdGlvbiBkaW0gc3RhdHVzXG4gICAgICAgIHRoYXQuX3Jlc2V0VGltZW91dChub3RpZmljYXRpb24pOyAvLyBSZXNldCBsaWZlIGN5Y2xlIHRpbWVvdXRcbiAgICAgICAgcmV0dXJuOyAvLyBFbmQgZnVuY3Rpb25cbiAgICAgIH1cblxuICAgICAgd2luZG93LnNldFRpbWVvdXQoaGFsZkZhZGVJbiwgdGhhdC5fdHJhbnNpdGlvbiAvIDEwMCk7IC8vIFNwbGl0IGFuaW1hdGlvbiB0cmFuc2l0aW9uIGludG8gMTAwIGl0ZXJhdGlvbnMgKDUwIGZvciByZWFsIGhlcmUpXG4gICAgfSkoKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBuZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgbm90aWZpY2F0aW9uIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gb3B0aW9ucywgdGhlbiBhcHBlbmQgaXQgdG8gbm90aWZpY2F0aW9uIGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSA8aT5FcnJvcjsgV2FybmluZzsgSW5mbzsgU3VjY2Vzczs8L2k+XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aXRsZT1vcHRpb25zLnR5cGVdIC0gTm90aWZpY2F0aW9uIHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lc3NhZ2UgLSBOb3RpZmljYXRpb24gbWVzc2FnZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuZHVyYXRpb249aGFuZGxlcl0gLSBOb3RpZmljYXRpb24gZHVyYXRpb24gKG92ZXJyaWRlIGhhbmRsZXIgZHVyYXRpb24gdmFsdWUpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaWNvbmxlc3M9ZmFsc2VdIC0gTm8gaWNvbiBmbGFnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50aGlja0JvcmRlcj1oYW5kbGVyXSAtIE5vdGlmaWNhdGlvbiBib3JkZXIgc2lkZSAob3ZlcnJpZGUgaGFuZGxlciBzaWRlIHZhbHVlKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNsb3NhYmxlPXRydWVdIC0gTWFrZSBub3RpZmljYXRpb24gY2xvc2FibGUgZmxhZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnN0aWNreT1mYWxzZV0gLSBNYWtlIG5vdGlmaWNhdGlvbiBzdGlja3kgZmxhZ1xuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnMucmVuZGVyVG89aGFuZGxlcl0gLSBEb20gb2JqZWN0IHRvIHJlbmRlciB0aGUgbm90aWZpY2F0aW9uIGluXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5DQnRpdGxlPUNhbGxiYWNrXSAtIE5vdGlmaWNhdGlvbiBjYWxsYmFjayB0aXRsZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbb3B0aW9ucy5jYWxsYmFjaz11bmRlZmluZWRdIC0gTm90aWZpY2F0aW9uIGNhbGxiYWNrIGJ1dHRvblxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSURcbiAgICoqL1xuICBuZXcob3B0aW9ucykge1xuICAgIC8vIENoZWNrIGZvciBtYW5kYXRvcnkgYXJndW1lbnRzIGV4aXN0ZW5jZVxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy50eXBlID09PSB1bmRlZmluZWQgfHwgKG9wdGlvbnMubWVzc2FnZSA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMubWVzc2FnZSA9PT0gJycpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHVuY2xvc2FibGUgYXQgYWxsIG5vdGlmaWNhdGlvblxuICAgIGlmIChvcHRpb25zLnN0aWNreSAmJiBvcHRpb25zLmNsb3NhYmxlID09PSBmYWxzZSAmJiBvcHRpb25zLmNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IE5vdGlmaWNhdGlvbiBpbm5lciB2YXJpYWJsZXMgdmFsaWRpdHlcbiAgICBpZiAob3B0aW9ucy50eXBlICE9PSAnaW5mbycgJiYgb3B0aW9ucy50eXBlICE9PSAnc3VjY2VzcycgJiYgb3B0aW9ucy50eXBlICE9PSAnd2FybmluZycgJiYgb3B0aW9ucy50eXBlICE9PSAnZXJyb3InKSB7XG4gICAgICBvcHRpb25zLnR5cGUgPSB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi50eXBlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kaXNtaXNzQWxsTG9jaykge1xuICAgICAgdGhpcy5fZGlzbWlzc0FsbExvY2sgPSBmYWxzZTsgLy8gVW5sb2NrIGRpc21pc3NBbGxMb2NrXG4gICAgfVxuXG4gICAgLy8gQnVpbGQgbm90aWZpY2F0aW9uIERPTSBlbGVtZW50IGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gb3B0aW9uc1xuICAgIGxldCBub3RpZmljYXRpb24gPSB0aGlzLl9idWlsZFVJKHtcbiAgICAgIGlkOiBVdGlscy5pZEdlbmVyYXRvcihvcHRpb25zLnR5cGUgKyAnJyArIG9wdGlvbnMubWVzc2FnZSwgNSksIC8vIEdlbmVyYXRpbmcgYW4gSUQgb2YgNSBjaGFyYWN0ZXJzIGxvbmcgZnJvbSBub3RpZmljYXRpb24gbWFuZGF0b3J5IGZpZWxkc1xuICAgICAgdHlwZTogb3B0aW9ucy50eXBlLFxuICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgdGl0bGU6IG9wdGlvbnMudGl0bGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLnRpdGxlIDogb3B0aW9ucy50aXRsZSxcbiAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLl9kdXJhdGlvbiA6IG9wdGlvbnMuZHVyYXRpb24sXG4gICAgICBpY29ubGVzczogb3B0aW9ucy5pY29ubGVzcyA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24uaWNvbmxlc3MgOiBvcHRpb25zLmljb25sZXNzLFxuICAgICAgdGhpY2tCb3JkZXI6IG9wdGlvbnMudGhpY2tCb3JkZXIgPT09IHVuZGVmaW5lZCA/IHRoaXMuX3RoaWNrQm9yZGVyIDogb3B0aW9ucy50aGlja0JvcmRlcixcbiAgICAgIGNsb3NhYmxlOiBvcHRpb25zLmNsb3NhYmxlID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5jbG9zYWJsZSA6IG9wdGlvbnMuY2xvc2FibGUsXG4gICAgICBzdGlja3k6IG9wdGlvbnMuc3RpY2t5ID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5zdGlja3kgOiBvcHRpb25zLnN0aWNreSxcbiAgICAgIHJlbmRlclRvOiBvcHRpb25zLnJlbmRlclRvID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Lm5vdGlmaWNhdGlvbi5yZW5kZXJUbyA6IG9wdGlvbnMucmVuZGVyVG8sXG4gICAgICBDQnRpdGxlOiBvcHRpb25zLkNCdGl0bGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHQubm90aWZpY2F0aW9uLkNCdGl0bGUgOiBvcHRpb25zLkNCdGl0bGUsXG4gICAgICBjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFjayA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdC5ub3RpZmljYXRpb24uY2FsbGJhY2sgOiBvcHRpb25zLmNhbGxiYWNrLFxuICAgICAgaXNEaW1tZWQ6IGZhbHNlIC8vIE9ubHkgdXNlZnVsbCBpZiBzdGlja3kgaXMgc2V0IHRvIHRydWVcbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBub3RpZmljYXRpb24gaW4gdGhlIGNvbnRhaW5lcjogTm8gbm90aWZpY2F0aW9uIHdpdGggdGhlIHNhbWUgSUQgaXMgYWxyZWFkeSBvcGVuXG4gICAgaWYgKCF0aGlzLl9hY3RpdmVbbm90aWZpY2F0aW9uLmlkXSkge1xuICAgICAgdGhpcy5fc3RhcnQobm90aWZpY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgZXhpc3Rpbmcgbm90aWZpY2F0aW9uOiBpbmNyZW1lbnQgcmVxdWVzdCBjb3VudCBhbmQgcmVzZXQgdGltZW91dFxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fcmVzZXRUaW1lb3V0KHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdKTtcbiAgICAgIHRoaXMuX2luY3JlbWVudFJlcXVlc3RDb3VudGVyKHRoaXMuX2FjdGl2ZVtub3RpZmljYXRpb24uaWRdKTtcbiAgICAgIG5vdGlmaWNhdGlvbiA9IHt9OyAvLyBDbGVhciBsb2NhbCBuZXcgbm90aWZpY2F0aW9uIHNpbmNlIGl0IGFscmVhZHkgZXhpc3RzIGluIHRoaXMuX2FjdGl2ZVxuICAgIH1cblxuICAgIHJldHVybiBub3RpZmljYXRpb24uaWQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBpbmZvXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhbiBpbmZvIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEXG4gICAqKi9cbiAgaW5mbyhvcHRpb25zKSB7XG4gICAgb3B0aW9ucy50eXBlID0gJ2luZm8nO1xuICAgIHJldHVybiB0aGlzLm5ldyhvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN1Y2Nlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGEgc3VjY2VzcyBub3RpZmljYXRpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgbm90aWZpY2F0aW9uIG9wdGlvbnMgb2JqZWN0IChzZWUgbmV3KCkgYXJndW1lbnRzIHNpbmNlIHRoaXMgaXMgYW4gYWJzdHJhY3Rpb24gb2YgbmV3KCkpXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBuZXdseSBjcmVhdGVkIG5vdGlmaWNhdGlvbiBJRFxuICAgKiovXG4gIHN1Y2Nlc3Mob3B0aW9ucykge1xuICAgIG9wdGlvbnMudHlwZSA9ICdzdWNjZXNzJztcbiAgICByZXR1cm4gdGhpcy5uZXcob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB3YXJuaW5nXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvblxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBhIHdhcm5pbmcgbm90aWZpY2F0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIG5vdGlmaWNhdGlvbiBvcHRpb25zIG9iamVjdCAoc2VlIG5ldygpIGFyZ3VtZW50cyBzaW5jZSB0aGlzIGlzIGFuIGFic3RyYWN0aW9uIG9mIG5ldygpKVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbmV3bHkgY3JlYXRlZCBub3RpZmljYXRpb24gSURcbiAgICoqL1xuICB3YXJuaW5nKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zLnR5cGUgPSAnd2FybmluZyc7XG4gICAgcmV0dXJuIHRoaXMubmV3KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZXJyb3JcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEJ1aWxkIGFuIGVycm9yIG5vdGlmaWNhdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIFRoZSBub3RpZmljYXRpb24gb3B0aW9ucyBvYmplY3QgKHNlZSBuZXcoKSBhcmd1bWVudHMgc2luY2UgdGhpcyBpcyBhbiBhYnN0cmFjdGlvbiBvZiBuZXcoKSlcbiAgICogQHJldHVybnMge251bWJlcn0gVGhlIG5ld2x5IGNyZWF0ZWQgbm90aWZpY2F0aW9uIElEXG4gICAqKi9cbiAgZXJyb3Iob3B0aW9ucykge1xuICAgIG9wdGlvbnMudHlwZSA9ICdlcnJvcic7XG4gICAgcmV0dXJuIHRoaXMubmV3KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZGlzbWlzc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBOb3RpZmljYXRpb25cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bmUgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRGlzbWlzcyBhIHNwZWNpZmljIG5vdGlmaWNhdGlvbiB2aWEgaXRzIElEXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIFRoZSBub3RpZmljYXRpb24gSUQgdG8gZGlzbWlzc1xuICAgKiovXG4gIGRpc21pc3MoaWQpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX2FjdGl2ZVtpZF0udGltZW91dElEKTsgLy8gQ2xlYXIgbm90aWZpY2F0aW9uIHRpbWVvdXRcblxuICAgIGlmICh0aGlzLl9hY3RpdmVbaWRdLnJlcXVlc3RDb3VudCA+IDEpIHsgLy8gU2V2ZXJhbCByZXF1ZXN0IGFyZSBwZW5kaW5nXG4gICAgICB0aGlzLl9jbGVhclJlcXVlc3RDb3VudCh0aGlzLl9hY3RpdmVbaWRdKTsgLy8gQ2xlYXIgYWxsIHBlbmRpbmcgcmVxdWVzdFxuICAgIH1cblxuICAgIHRoaXMuX2Nsb3NlKHRoaXMuX2FjdGl2ZVtpZF0pOyAvLyBDbG9zZSBub3RpZmljYXRpb25cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRpc21pc3NBbGxcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENsZWFyIHRoZSBub3RpZmljYXRpb24gaGFuZGxlciBmcm9tIGFsbCBpdHMgYWN0aXZlIG5vdGlmaWNhdGlvbnNcbiAgICoqL1xuICBkaXNtaXNzQWxsKCkge1xuICAgIGlmICghdGhpcy5fZGlzbWlzc0FsbExvY2sgJiYgT2JqZWN0LmtleXModGhpcy5fYWN0aXZlKS5sZW5ndGggIT09IDApIHsgLy8gQ2hlY2sgdGhhdCBfZGltaXNzQWxsTG9jayBpcyBkaXNhYmxlIGFuZCB0aGF0IHRoZXJlIGlzIHN0aWxsIG5vdGlmaWNhdGlvbiBkaXNwbGF5ZWRcbiAgICAgIHRoaXMuX2Rpc21pc3NBbGxMb2NrID0gdHJ1ZTsgLy8gZGlzbWlzc0FsbExvY2sgd2lsbCBiZSB1bmxvY2tlZCBhdCB0aGUgbGFzdCBfY2xvc2UoKSBtZXRob2QgY2FsbFxuICAgICAgdGhpcy5fcXVldWUgPSB7fTsgLy8gQ2xlYXIgcXVldWUgb2JqZWN0XG5cbiAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5fYWN0aXZlKSB7IC8vIEl0ZXJhdGUgb3ZlciBub3RpZmljYXRpb25zXG4gICAgICAgIHRoaXMuZGlzbWlzcyhpZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZGlzbWlzc1R5cGVcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgTm90aWZpY2F0aW9uXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdW5lIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIERpc21pc3MgYWxsIG5vdGlmaWNhdGlvbnMgZnJvbSBhIGdpdmVuIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSA8aT5zdWNjZXM7IGluZm87IHdhcm5pbmc7IGVycm9yOzwvaT5cbiAgICoqL1xuICBkaXNtaXNzVHlwZSh0eXBlKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2FjdGl2ZSkubGVuZ3RoICE9PSAwKSB7IC8vIENoZWNrIHRoYXQgX2RpbWlzc0FsbExvY2sgaXMgZGlzYWJsZSBhbmQgdGhhdCB0aGVyZSBpcyBzdGlsbCBub3RpZmljYXRpb24gZGlzcGxheWVkXG4gICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuX2FjdGl2ZSkgeyAvLyBJdGVyYXRlIG92ZXIgbm90aWZpY2F0aW9uc1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlW2lkXS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgdGhpcy5kaXNtaXNzKGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXRIaXN0b3J5TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5Lmxlbmd0aDtcbiAgfVxuICBnZXRIaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBTY3JvbGxCYXIge1xuICAvKipcbiAgICogQHN1bW1hcnkgQ3VzdG9tIEphdmFTY3JpcHQgU2Nyb2xsQmFyIGZvciBhbnkgY29uYXRpbmVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQnVpbGQgYSBjdXN0b20gU2Nyb2xsQmFyIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gRE9NIHRhcmdldCwgaW5zcGlyZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnV6aW5hcy9zaW1wbGUtc2Nyb2xsYmFyIDwzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIFNjcm9sbEJhciBvcHRpb25zXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnRhcmdldCAtIFRoZSBET00gbm9kZSB0byBhZGQgYSBTY3JvbGxCYXIgdG9cbiAgICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5fdGFyZ2V0ID0gb3B0aW9ucy50YXJnZXQ7IC8vIFBhcmVudCBkaXYgdG8gcHV0IHRoZSBTY3JvbGxCYXIgaW5cbiAgICB0aGlzLl93cmFwcGVyID0ge307IC8vIFdyYXAgYm90aCBjb250YWluZXIgYW5kIFNjcm9sbEJhclxuICAgIHRoaXMuX2NvbnRhaW5lciA9IHt9OyAvLyBDb250ZW50IHRvIHNjcm9sbCArIGJyb3dzZXIgU2Nyb2xsQmFyICgxOHB4IG9mZnNldClcbiAgICB0aGlzLl9iYXIgPSB7fTsgLy8gU2Nyb2xsQmFyIGl0c2VsZlxuICAgIHRoaXMuX3Njcm9sbFJhdGlvID0gMDtcbiAgICB0aGlzLl9sYXN0UGFnZVkgPSAwO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcigpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBCdWlsZCBET00gaGllcnJhcmNoeSwgU2Nyb2xsQmFyIGRvdWJsZSB3cmFwcyB0aGUgY29udGVudCB0byBhcHBlbmQgaXRzIGN1c3RvbSBiYXJcbiAgICoqL1xuICBfaW5pdCgpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAvLyBDcmVhdGluZyBhc3NvY2lhdGVkIGVsZW1lbnRzICh3cmFwcGVyLCBjb250YWluZXIsIGJhcilcbiAgICB0aGlzLl90YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsYmFyLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuX3dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl93cmFwcGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2Nyb2xsYmFyLXdyYXBwZXInKTtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl9jb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzY3JvbGxiYXItY29udGVudCcpO1xuICAgIC8vIE1vdmUgdGFyZ2V0IGNoaWxkcmVuIGludG8gdGhpcyBjb250YWluZXJcbiAgICB3aGlsZSAodGhpcy5fdGFyZ2V0LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl90YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIC8vIExpbmsgRE9NIGVsZW1lbnRzXG4gICAgdGhpcy5fd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXMuX3dyYXBwZXIpO1xuICAgIC8vIEFwcGVuZCBmcmFnbWVudCB0byBET00gdGFyZ2V0XG4gICAgdGhpcy5fdGFyZ2V0LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB0aGlzLl90YXJnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPGRpdiBjbGFzcz1cInNjcm9sbFwiPjwvZGl2PicpOyAvLyBBcHBlbmQgc2Nyb2xsIGFzIGxhc3QgY2hpbGRcbiAgICB0aGlzLl9iYXIgPSB0aGlzLl90YXJnZXQubGFzdENoaWxkOyAvLyBHZXQgY29udGVudCBmcm9tIGxpbmUganVzdCBvdmVyIHRoaXMhXG4gICAgLy8gTWV0aG9kcyBhdXRvIGJpbmRpbmcgd2l0aCB0aGlzIHRvIGJlIGFibGUgdG8gYWRkL3JlbW92ZSBsaXN0ZW5lcnMgZWFzaWx5XG4gICAgdGhpcy5fZHJhZyA9IHRoaXMuX2RyYWcuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9zdG9wRHJhZyA9IHRoaXMuX3N0b3BEcmFnLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgU2Nyb2xsQmFyIG1vdXNlIGV2ZW50c1xuICAgKiovXG4gIF9ldmVudHMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVNjcm9sbEJhci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2Jhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9iYXJDbGlja2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2RyYWdcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNjcm9sbEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgZHJhZyBhbmltYXRpb24gb2YgdGhlIGJhclxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgTW91c2UgZXZlbnQgZnJvbSB0aGlzLl9ldmVudHMoKVxuICAgKiovXG4gIF9kcmFnKGV2ZW50KSB7XG4gICAgY29uc3QgZGVsdGEgPSBldmVudC5wYWdlWSAtIHRoaXMuX2xhc3RQYWdlWTtcbiAgICB0aGlzLl9sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fY29udGFpbmVyLnNjcm9sbFRvcCArPSAoZGVsdGEgLyB0aGlzLl9zY3JvbGxSYXRpbyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYmFyQ2xpY2tlZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2Nyb2xsQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkIGRvY3VtZW50IGV2ZW50cyB3aGVuIGJhciBpcyBjbGlja2VkIHRvIHRyYWNrIHRoZSBtb3VzZSBtb3ZlbWVudCBpbiBwYXJlbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIE1vdXNlIGV2ZW50IGZyb20gdGhpcy5fZXZlbnRzKClcbiAgICoqL1xuICBfYmFyQ2xpY2tlZChldmVudCkge1xuICAgIHRoaXMuX2xhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgIHRoaXMuX2Jhci5jbGFzc0xpc3QuYWRkKCdzY3JvbGxiYXItZ3JhYmJlZCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsYmFyLWdyYWJiZWQnKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9kcmFnKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fc3RvcERyYWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3N0b3BEcmFnXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTY3JvbGxCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgZG9jdW1lbnQgZXZlbnRzIHdoZW4gYmFyIGlzIHJlbGVhc2VkXG4gICAqKi9cbiAgX3N0b3BEcmFnKCkge1xuICAgIHRoaXMuX2Jhci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxiYXItZ3JhYmJlZCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsYmFyLWdyYWJiZWQnKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9kcmFnKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fc3RvcERyYWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3VwZGF0ZVNjcm9sbEJhclxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgU2Nyb2xsQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ29tcHV0ZSBiYXIgcG9zaXRpb24gYWNjb3JkaW5nIHRvIERPTSBtZWFzdXJlbWVudHNcbiAgICoqL1xuICBfdXBkYXRlU2Nyb2xsQmFyKCkge1xuICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5fY29udGFpbmVyLnNjcm9sbEhlaWdodDtcbiAgICBjb25zdCBvd25IZWlnaHQgPSB0aGlzLl9jb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IHJpZ2h0ID0gKHRoaXMuX3RhcmdldC5jbGllbnRXaWR0aCAtIHRoaXMuX2Jhci5jbGllbnRXaWR0aCkgKiAtMTtcblxuICAgIHRoaXMuX3Njcm9sbFJhdGlvID0gb3duSGVpZ2h0IC8gdG90YWxIZWlnaHQ7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zY3JvbGxSYXRpbyA+PSAxKSB7IC8vIEhpZGUgc2Nyb2xsYmFyIGlmIG5vIHNjcm9sbGluZyBpcyBwb3NzaWJsZVxuICAgICAgICB0aGlzLl9iYXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAoTWF0aC5tYXgodGhpcy5fc2Nyb2xsUmF0aW8gKiAxMDAsIDUpICogb3duSGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgbGV0IHRvcCA9ICgodGhpcy5fY29udGFpbmVyLnNjcm9sbFRvcCAvIHRvdGFsSGVpZ2h0KSAqIDEwMCkgKiBvd25IZWlnaHQgLyAxMDA7XG5cbiAgICAgICAgaWYgKE1hdGgubWF4KHRoaXMuX3Njcm9sbFJhdGlvICogMTAwLCA1KSA9PT0gNSkgeyAvLyBTY3JvbGxCYXIgaGFzIHJlYWNoZWQgaXRzIG1pbmltdW0gc2l6ZVxuICAgICAgICAgIC8qIEhlcmUgaXMgYSBjb21wbGV4IHRoaW5nIDogc2Nyb2xsIHRvdGFsIGhlaWdodCAhPSBET00gbm9kZSB0b3RhbCBoZWlnaHQuIFdlIG11c3Qgc3Vic3RyYWN0XG4gICAgICAgICAgYSBncm93aW5nIHBlcmNlbnRhZ2UgKGFzIHVzZXIgZ29lcyBkb3duKSB0aGF0IGlzIHNjYWxlZCBhZnRlciB0b3RhbCBzY3JvbGwgcHJvZ3Jlc3MgaW4gJS4gKi9cbiAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzc1BlcmNlbnRhZ2UgPSAodGhpcy5fY29udGFpbmVyLnNjcm9sbFRvcCAqIDEwMCkgLyAodG90YWxIZWlnaHQgLSBvd25IZWlnaHQpO1xuICAgICAgICAgIHRvcCA9ICgob3duSGVpZ2h0IC0gaGVpZ2h0KSAqICgoKHRoaXMuX2NvbnRhaW5lci5zY3JvbGxUb3AgKyAoc2Nyb2xsUHJvZ3Jlc3NQZXJjZW50YWdlICogb3duSGVpZ2h0KSAvIDEwMCkgLyB0b3RhbEhlaWdodCkgKiAxMDApKSAvIDEwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Jhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5fYmFyLnN0eWxlLmNzc1RleHQgPSBgaGVpZ2h0OiAke2hlaWdodH1weDsgdG9wOiAke3RvcH1weDsgcmlnaHQ6ICR7cmlnaHR9cHg7YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxCYXI7XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIFNob3J0Y3V0IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEJhc2ljIGtleWJvYXJkIFNob3J0Y3V0IGhhbmRsZXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVyIGNhbGxiYWNrcyBzZXQgb24ga2V5Ym9hcmQgYmluZGluZ3NcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zaW5nbGVLZXkgPSBbXTtcbiAgICB0aGlzLl9tdWx0aUtleSA9IFtdO1xuXG4gICAgdGhpcy5fdGVzdFNob3J0Y3V0cyA9IHRoaXMuX3Rlc3RTaG9ydGN1dHMuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYWRkRXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBrZXkgZG93biBhbmQga2V5IHByZXNzIGV2ZW50cyB0byB0aGUgRE9NXG4gICAqKi9cbiAgX2FkZEV2ZW50cygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fdGVzdFNob3J0Y3V0cyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLl90ZXN0U2hvcnRjdXRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9yZW1vdmVFdmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVtb3ZlIGtleSBkb3duIGFuZCBrZXkgcHJlc3MgZXZlbnRzIHRvIHRoZSBET01cbiAgICoqL1xuICBfcmVtb3ZlRXZlbnRzKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl90ZXN0U2hvcnRjdXRzKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX3Rlc3RTaG9ydGN1dHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3Rlc3RTaG9ydGN1dHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVGVzdCBrZXlib2FyZCBldmVudCB0byBmaXJlIHN0b3JlZCBzaG9ydGN1dCBhY2NvcmRpbmdseVxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgS2V5Ym9hcmQgZXZlbnQgZnJvbSB0aGlzLl9hZGRFdmVudHMoKVxuICAgKiovXG4gIF90ZXN0U2hvcnRjdXRzKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQuY3RybEtleSAmJiBldmVudC5zaGlmdEtleSAmJiBldmVudC5rZXkgPT09ICdSJykpIHsgLy8gREVWRUxPUEVNRU5UIHRlc3QgdG8ga2VlcCBoYXJkIHJlZnJlc2ggYXZhaWxhYmxlXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBUaGlzIGlzIGZvciBQUk9EVUNUSU9OIG9ubHksIHRvIHByZXZlbnQgdGhhdCBicm93c2VyIHNob3J0Y3V0cyBjb2xsaWRlIHdpdGggdXNlciBvbmVcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuc2hpZnRLZXkpIHsgLy8gTXVsdGkga2V5IHNob3J0Y3V0XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX211bHRpS2V5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IHNob3J0Y3V0ID0gdGhpcy5fbXVsdGlLZXlbaV07XG5cbiAgICAgICAgaWYgKCFzaG9ydGN1dC5wYXVzZSAmJiBzaG9ydGN1dC5rZXkgPT09IGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgc3dpdGNoIChzaG9ydGN1dC5tb2RpZmllckNvdW50KSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGlmICgoc2hvcnRjdXQubW9kaWZpZXJzLmN0cmxLZXkgJiYgZXZlbnQuY3RybEtleSkgfHxcbiAgICAgICAgICAgICAgICAoc2hvcnRjdXQubW9kaWZpZXJzLmFsdEtleSAmJiBldmVudC5hbHRLZXkpIHx8XG4gICAgICAgICAgICAgICAgKHNob3J0Y3V0Lm1vZGlmaWVycy5zaGlmdEtleSAmJiBldmVudC5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICBzaG9ydGN1dC5maXJlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBpZiAoKHNob3J0Y3V0Lm1vZGlmaWVycy5jdHJsS2V5ICYmIGV2ZW50LmN0cmxLZXkgJiYgc2hvcnRjdXQubW9kaWZpZXJzLmFsdEtleSAmJiBldmVudC5hbHRLZXkpIHx8XG4gICAgICAgICAgICAgICAgKHNob3J0Y3V0Lm1vZGlmaWVycy5jdHJsS2V5ICYmIGV2ZW50LmN0cmxLZXkgJiYgc2hvcnRjdXQubW9kaWZpZXJzLnNoaWZ0S2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB8fFxuICAgICAgICAgICAgICAgIChzaG9ydGN1dC5tb2RpZmllcnMuYWx0S2V5ICYmIGV2ZW50LmFsdEtleSAmJiBzaG9ydGN1dC5tb2RpZmllcnMuc2hpZnRLZXkgJiYgZXZlbnQuc2hpZnRLZXkpKSB7XG4gICAgICAgICAgICAgICAgc2hvcnRjdXQuZmlyZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgaWYgKChzaG9ydGN1dC5tb2RpZmllcnMuY3RybEtleSAmJiBldmVudC5jdHJsS2V5ICYmXG4gICAgICAgICAgICAgICAgICBzaG9ydGN1dC5tb2RpZmllcnMuYWx0S2V5ICYmIGV2ZW50LmFsdEtleSAmJlxuICAgICAgICAgICAgICAgICAgc2hvcnRjdXQubW9kaWZpZXJzLnNoaWZ0S2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSkge1xuICAgICAgICAgICAgICAgIHNob3J0Y3V0LmZpcmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gU2luZ2xlIGtleSBzaG9ydGN1dFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaW5nbGVLZXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3Qgc2hvcnRjdXQgPSB0aGlzLl9zaW5nbGVLZXlbaV07XG5cbiAgICAgICAgaWYgKCFzaG9ydGN1dC5wYXVzZSAmJiBzaG9ydGN1dC5rZXkgPT09IGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgc2hvcnRjdXQuZmlyZSh0aGlzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZ2V0TW9kaWZpZXJzQ291bnRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ291bnQgdGhlIGFtb3VudCBvZiBtb2RpZmllcnMgaW4gZ2l2ZW4gc2hvcnRjdXQgYmluZGluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqIEByZXR1cm4ge251bWJlcn0gLSBUaGUgbnVtYmVyIG9mIG1vZGlmaWVycyBpbiB0aGUga2V5cyBzdHJpbmdcbiAgICoqL1xuICBfZ2V0TW9kaWZpZXJzQ291bnQoa2V5U3RyaW5nKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjb25zdCBtb2RpZmllcnMgPSB7XG4gICAgICBjdHJsS2V5OiAvY3RybC9pLnRlc3Qoa2V5U3RyaW5nKSxcbiAgICAgIGFsdEtleTogL2FsdC9pLnRlc3Qoa2V5U3RyaW5nKSxcbiAgICAgIHNoaWZ0S2V5OiAvc2hpZnQvaS50ZXN0KGtleVN0cmluZylcbiAgICB9O1xuXG4gICAgaWYgKG1vZGlmaWVycy5jdHJsS2V5KSArK2NvdW50O1xuICAgIGlmIChtb2RpZmllcnMuYWx0S2V5KSArK2NvdW50O1xuICAgIGlmIChtb2RpZmllcnMuc2hpZnRLZXkpICsrY291bnQ7XG5cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc2V0QWxsUGF1c2VGbGFnXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFBhdXNlL1Jlc3VtZSBhbGwgc2hvcnRjdXRzIGN1cnJlbnRseSByZWdpc3RlcmVkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgLSBUaGUgcGF1c2UgdmFsdWUgdG8gc2V0XG4gICAqKi9cbiAgX3NldEFsbFBhdXNlRmxhZyh2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2luZ2xlS2V5Lmxlbmd0aDsgKytpKSB7XG4gICAgICB0aGlzLl9zZXRPbmVQYXVzZUZsYWcodGhpcy5fc2luZ2xlS2V5W2ldLmtleVN0cmluZywgdmFsdWUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbXVsdGlLZXkubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX3NldE9uZVBhdXNlRmxhZyh0aGlzLl9tdWx0aUtleVtpXS5rZXlTdHJpbmcsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc2V0T25lUGF1c2VGbGFnXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFBhdXNlL1Jlc3VtZSBnaXZlbiBzaG9ydGN1dHMgY3VycmVudGx5IHJlZ2lzdGVyZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVN0cmluZyAtIFRoZSBrZXlzIHN0cmluZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIC0gVGhlIHBhdXNlIHZhbHVlIHRvIHNldFxuICAgKiovXG4gIF9zZXRPbmVQYXVzZUZsYWcoa2V5U3RyaW5nLCB2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9nZXRNb2RpZmllcnNDb3VudChrZXlTdHJpbmcpID09PSAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpbmdsZUtleS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodGhpcy5fc2luZ2xlS2V5W2ldLmtleVN0cmluZyA9PT0ga2V5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5fc2luZ2xlS2V5W2ldLnBhdXNlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tdWx0aUtleS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodGhpcy5fbXVsdGlLZXlbaV0ua2V5U3RyaW5nID09PSBrZXlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLl9tdWx0aUtleVtpXS5wYXVzZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlZ2lzdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVnaXN0ZXIgYSBuZXcgc2hvcnRjdXQgYW5kIGJpbmQgaXQgdG8gYSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZpcmUgLSBUaGUgc2hvcnRjdXQgY2FsbGJhY2sgdG8gdHJpZ2dlclxuICAgKiovXG4gIHJlZ2lzdGVyKGtleVN0cmluZywgZmlyZSkge1xuICAgIGNvbnN0IHNob3J0Y3V0ID0ge1xuICAgICAga2V5U3RyaW5nOiBrZXlTdHJpbmcsXG4gICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgY3RybEtleTogL2N0cmwvaS50ZXN0KGtleVN0cmluZyksXG4gICAgICAgIGFsdEtleTogL2FsdC9pLnRlc3Qoa2V5U3RyaW5nKSxcbiAgICAgICAgc2hpZnRLZXk6IC9zaGlmdC9pLnRlc3Qoa2V5U3RyaW5nKVxuICAgICAgfSxcbiAgICAgIG1vZGlmaWVyQ291bnQ6IHRoaXMuX2dldE1vZGlmaWVyc0NvdW50KGtleVN0cmluZyksXG4gICAgICBrZXk6IGtleVN0cmluZy5zdWJzdHIoa2V5U3RyaW5nLmxhc3RJbmRleE9mKCcrJykgKyAxKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgIGZpcmU6IGZpcmVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX3NpbmdsZUtleS5sZW5ndGggPT09IDAgfHwgdGhpcy5fbXVsdGlLZXkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAoIXNob3J0Y3V0Lm1vZGlmaWVycy5jdHJsS2V5ICYmICFzaG9ydGN1dC5tb2RpZmllcnMuc2hpZnRLZXkgJiYgIXNob3J0Y3V0Lm1vZGlmaWVycy5hbHRLZXkgJiYgIXNob3J0Y3V0Lm1vZGlmaWVycy5tZXRhS2V5KSA/XG4gICAgdGhpcy5fc2luZ2xlS2V5LnB1c2goc2hvcnRjdXQpOlxuICAgICAgdGhpcy5fbXVsdGlLZXkucHVzaChzaG9ydGN1dCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1bnJlZ2lzdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFNob3J0Y3V0XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVW5SZWdpc3RlciBhIHNob3J0Y3V0IHZpYSBpdHMga2V5cyBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVN0cmluZyAtIFRoZSBrZXlzIHN0cmluZ1xuICAgKiovXG4gIHVucmVnaXN0ZXIoa2V5U3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2dldE1vZGlmaWVyc0NvdW50KGtleVN0cmluZykgPT09IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9zaW5nbGVLZXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpbmdsZUtleVtpXS5rZXkgPT09IGtleVN0cmluZy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgdGhpcy5fc2luZ2xlS2V5LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fbXVsdGlLZXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMuX211bHRpS2V5W2ldLmtleSA9PT0ga2V5U3RyaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICB0aGlzLl9tdWx0aUtleS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2luZ2xlS2V5Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLl9tdWx0aUtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX3JlbW92ZUV2ZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVucmVnaXN0ZXJBbGxcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVbnJlZ2lzdGVyIGV2ZXJ5IGFjdGl2ZSBzaG9ydGN1dFxuICAgKiovXG4gIHVucmVnaXN0ZXJBbGwoKSB7XG4gICAgdGhpcy5fc2luZ2xlS2V5ID0gW107XG4gICAgdGhpcy5fbXVsdGlLZXkgPSBbXTtcbiAgICB0aGlzLl9yZW1vdmVFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHJlc3VtZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlc3VtZSB0aGUgZ2l2ZW4gc2hvcnRjdXQgY2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVN0cmluZyAtIFRoZSBrZXlzIHN0cmluZ1xuICAgKiovXG4gIHJlc3VtZShrZXlTdHJpbmcpIHtcbiAgICB0aGlzLl9zZXRPbmVQYXVzZUZsYWcoa2V5U3RyaW5nLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBwYXVzZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFBhdXNlIHRoZSBnaXZlbiBzaG9ydGN1dCBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3RyaW5nIC0gVGhlIGtleXMgc3RyaW5nXG4gICAqKi9cbiAgcGF1c2Uoa2V5U3RyaW5nKSB7XG4gICAgdGhpcy5fc2V0T25lUGF1c2VGbGFnKGtleVN0cmluZywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByZXN1bWVBbGxcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgU2hvcnRjdXRcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZXN1bWUgYWxsIHNob3J0Y3V0cyBjYWxsYmFja1xuICAgKiovXG4gIHJlc3VtZUFsbCgpIHtcbiAgICB0aGlzLl9hZGRFdmVudHMoKTtcbiAgICB0aGlzLl9zZXRBbGxQYXVzZUZsYWcoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBwYXVzZUFsbFxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTaG9ydGN1dFxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFBhdXNlIGFsbCBzaG9ydGN1dHMgY2FsbGJhY2tcbiAgICoqL1xuICBwYXVzZUFsbCgpIHtcbiAgICB0aGlzLl9yZW1vdmVFdmVudHMoKTtcbiAgICB0aGlzLl9zZXRBbGxQYXVzZUZsYWcodHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvcnRjdXQ7XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIFV0aWxzIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IE1pc2NlbGFuZW91cyB1dGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE1pc2NlbGFuZW91cyB1dGlscyBmdW5jdGlvbiBhbmQgcHJvdG90eXBlcyBmb3IgbXprXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvdG90eXBlcygpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9wcm90b3R5cGVzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE92ZXJyaWRlcyBzb21lIHVzZWZ1bCB0eXBlIHByb3RvdHlwZXNcbiAgICoqL1xuICBfcHJvdG90eXBlcygpIHtcbiAgICAvLyBodHRwczovL3d3dy5yZWRpcHMubmV0L2phdmFzY3JpcHQvYXJyYXktbW92ZS8gPC0gRGEgcmVhbCBNVlBcbiAgICBBcnJheS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKHBvczEsIHBvczIpIHtcbiAgICAgIC8vIGxvY2FsIHZhcmlhYmxlc1xuICAgICAgbGV0IGksIHRtcDtcbiAgICAgIC8vIGNhc3QgaW5wdXQgcGFyYW1ldGVycyB0byBpbnRlZ2Vyc1xuICAgICAgcG9zMSA9IHBhcnNlSW50KHBvczEsIDEwKTtcbiAgICAgIHBvczIgPSBwYXJzZUludChwb3MyLCAxMCk7XG4gICAgICAvLyBpZiBwb3NpdGlvbnMgYXJlIGRpZmZlcmVudCBhbmQgaW5zaWRlIGFycmF5XG4gICAgICBpZiAocG9zMSAhPT0gcG9zMiAmJiAwIDw9IHBvczEgJiYgcG9zMSA8PSB0aGlzLmxlbmd0aCAmJiAwIDw9IHBvczIgJiYgcG9zMiA8PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAvLyBzYXZlIGVsZW1lbnQgZnJvbSBwb3NpdGlvbiAxXG4gICAgICAgIHRtcCA9IHRoaXNbcG9zMV07XG4gICAgICAgIC8vIG1vdmUgZWxlbWVudCBkb3duIGFuZCBzaGlmdCBvdGhlciBlbGVtZW50cyB1cFxuICAgICAgICBpZiAocG9zMSA8IHBvczIpIHtcbiAgICAgICAgICBmb3IgKGkgPSBwb3MxOyBpIDwgcG9zMjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzW2ldID0gdGhpc1tpICsgMV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG1vdmUgZWxlbWVudCB1cCBhbmQgc2hpZnQgb3RoZXIgZWxlbWVudHMgZG93blxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmb3IgKGkgPSBwb3MxOyBpID4gcG9zMjsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzW2ldID0gdGhpc1tpIC0gMV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHB1dCBlbGVtZW50IGZyb20gcG9zaXRpb24gMSB0byBkZXN0aW5hdGlvblxuICAgICAgICB0aGlzW3BvczJdID0gdG1wO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgcHJlY2lzaW9uUm91bmRcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBEbyBhIE1hdGgucm91bmQgd2l0aCBhIGdpdmVuIHByZWNpc2lvbiAoaWUgYW1vdW50IG9mIGludGVnZXJzIGFmdGVyIHRoZSBjb21hKVxuICAgKiBAcGFyYW0ge251bm1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIHByZWNpc2VseSByb3VuZFxuICAgKiBAcGFyYW0ge251bWJlcn0gcHJlY2lzaW9uIC0gVGhlIG51bWJlciBvZiBpbnRlZ2VycyBhZnRlciB0aGUgY29tYVxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gVGhlIHJvdW5kZWQgdmFsdWVcbiAgICoqL1xuICBwcmVjaXNpb25Sb3VuZCh2YWx1ZSwgcHJlY2lzaW9uKSB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24gfHwgMCk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzZWNvbmRzVG9UaW1lY29kZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENvbnZlcnQgYSB0aW1lIGluIHNlY29uZHMgaW50byBhIHRpbWUgREQgSEggTU0gU1NcbiAgICogQHBhcmFtIHtudW5tYmVyfSB0aW1lIC0gVGhlIHRpbWUgaW4gc2Vjb25kcyB0byBjb252ZXJ0XG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBUaGUgb3V0cHV0IHN0cmluZyBhY2NvcmRpbmcgdG8gdGltZSBkdXJhdGlvblxuICAgKiovXG4gIHNlY29uZHNUb1RpbWVjb2RlKHRpbWUpIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFRpbWUgPSB7XG4gICAgICBkOiAwLFxuICAgICAgaDogMCxcbiAgICAgIG06IDAsXG4gICAgICBzOiAwXG4gICAgfTtcblxuICAgIC8vIEN1dHRpbmcgdG90YWwgc2Vjb25kc1xuICAgIHRyYW5zZm9ybWVkVGltZS5kID0gTWF0aC5mbG9vcih0aW1lIC8gODY0MDApO1xuICAgIHRyYW5zZm9ybWVkVGltZS5oID0gTWF0aC5mbG9vcigodGltZSAtICh0cmFuc2Zvcm1lZFRpbWUuZCAqIDg2NDAwKSkgLyAzNjAwKTtcbiAgICB0cmFuc2Zvcm1lZFRpbWUubSA9IE1hdGguZmxvb3IoKHRpbWUgLSAodHJhbnNmb3JtZWRUaW1lLmQgKiA4NjQwMCkgLSAodHJhbnNmb3JtZWRUaW1lLmggKiAzNjAwKSkgLyA2MCk7XG4gICAgdHJhbnNmb3JtZWRUaW1lLnMgPSBNYXRoLmZsb29yKHRpbWUgLSAodHJhbnNmb3JtZWRUaW1lLmQgKiA4NjQwMCkgLSAodHJhbnNmb3JtZWRUaW1lLmggKiAzNjAwKSAtICh0cmFuc2Zvcm1lZFRpbWUubSAqIDYwKSk7XG5cbiAgICAvLyBBZGRpbmcgYW4gZXh0cmEgMCBmb3IgdmFsdWVzIGluZmVyaW9yIHRvIDEwXG4gICAgaWYgKHRyYW5zZm9ybWVkVGltZS5kIDwgMTApIHtcbiAgICAgIHRyYW5zZm9ybWVkVGltZS5kID0gYDAke3RyYW5zZm9ybWVkVGltZS5kfWA7XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zZm9ybWVkVGltZS5oIDwgMTApIHtcbiAgICAgIHRyYW5zZm9ybWVkVGltZS5oID0gYDAke3RyYW5zZm9ybWVkVGltZS5ofWA7XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zZm9ybWVkVGltZS5tIDwgMTApIHtcbiAgICAgIHRyYW5zZm9ybWVkVGltZS5tID0gYDAke3RyYW5zZm9ybWVkVGltZS5tfWA7XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zZm9ybWVkVGltZS5zIDwgMTApIHtcbiAgICAgIHRyYW5zZm9ybWVkVGltZS5zID0gYDAke3RyYW5zZm9ybWVkVGltZS5zfWA7XG4gICAgfVxuXG4gICAgLy8gRm9ybWF0dGluZyBvdXRwdXRcbiAgICBpZiAodHJhbnNmb3JtZWRUaW1lLmQgPiAwKSB7XG4gICAgICByZXR1cm4gYCR7dHJhbnNmb3JtZWRUaW1lLmR9ZCAke3RyYW5zZm9ybWVkVGltZS5ofWggJHt0cmFuc2Zvcm1lZFRpbWUubX1tICR7dHJhbnNmb3JtZWRUaW1lLnN9c2A7XG4gICAgfSBlbHNlIGlmICh0cmFuc2Zvcm1lZFRpbWUuaCA+IDApIHtcbiAgICAgIHJldHVybiBgJHt0cmFuc2Zvcm1lZFRpbWUuaH06JHt0cmFuc2Zvcm1lZFRpbWUubX06JHt0cmFuc2Zvcm1lZFRpbWUuc31gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dHJhbnNmb3JtZWRUaW1lLm19OiR7dHJhbnNmb3JtZWRUaW1lLnN9YDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBpZEdlbmVyYXRvclxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVuZSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYXNoIHRoZSBzZWVkIHRvIGdlbmVyYXRlIGFuIElELCBpbnNwaXJlZCBmcm9tIGh0dHA6Ly93ZXJ4bHRkLmNvbS93cC8yMDEwLzA1LzEzL2phdmFzY3JpcHQtaW1wbGVtZW50YXRpb24tb2YtamF2YXMtc3RyaW5nLWhhc2hjb2RlLW1ldGhvZC9cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlZWQgICAtIFRoZSBzZWVkIHN0cmluZyB0byBoYXNoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSByZXR1cm5lZCBJRFxuICAgKiovXG4gIGlkR2VuZXJhdG9yKHNlZWQsIGxlbmd0aCkge1xuICAgIGxldCBoYXNoID0gMCxcbiAgICAgIGNoYXJhY3RlciA9ICcnO1xuXG4gICAgaWYgKHNlZWQubGVuZ3RoID09PSAwIHx8IGxlbmd0aCA+IDEyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VlZC5sZW5ndGg7ICsraSkge1xuICAgICAgY2hhcmFjdGVyID0gc2VlZC5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyYWN0ZXI7XG4gICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cblxuICAgIHJldHVybiAoTWF0aC5hYnMoaGFzaCkudG9TdHJpbmcoMzYpICsgJycgKyBNYXRoLmFicyhoYXNoIC8gMikudG9TdHJpbmcoMzYpLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykpLnN1YnN0cmluZygwLCBsZW5ndGgpLnRvVXBwZXJDYXNlKCk7IC8vIEhlcmUgaXMgdGhlIHR3ZWtlYWQgbGluZVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgZ2V0Q29va2llc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEdldCBhbGwgc2Vzc2lvbiBjb29raWVzXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgY29va2llcyBvYmplY3RcbiAgICoqL1xuICBnZXRDb29raWVzKCkge1xuICAgIGNvbnN0IGNvb2tpZXMgPSB7fTtcbiAgICBpZiAoZG9jdW1lbnQuY29va2llICYmIGRvY3VtZW50LmNvb2tpZSAhPT0gJycpIHtcbiAgICAgIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oY29va2llKSB7XG4gICAgICAgIGNvbnN0IG0gPSBjb29raWUudHJpbSgpLm1hdGNoKC8oXFx3Kyk9KC4qKS8pO1xuICAgICAgICBpZiAobSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29va2llc1ttWzFdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb29raWVzO1xuICB9XG5cblxuICBhZGRTdHlsZVNoZWV0KGZpbGVuYW1lKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkO1xuICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cbiAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgIGxpbmsudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgICBsaW5rLmhyZWYgPSBmaWxlbmFtZTtcblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG4iLCJpbXBvcnQgVG9wQmFyIGZyb20gJy4vdG9wYmFyL1RvcEJhci5qcyc7XG5pbXBvcnQgQXNpZGUgZnJvbSAnLi9tYWluY29udGFpbmVyL0FzaWRlLmpzJztcbmltcG9ydCBTY2VuZSBmcm9tICcuL21haW5jb250YWluZXIvU2NlbmUuanMnO1xuaW1wb3J0IEZvb3RCYXIgZnJvbSAnLi9mb290YmFyL0Zvb3RCYXIuanMnO1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL3V0aWxzL01vZGFsLmpzJztcbid1c2Vfc3RyaWN0JztcblxuXG5jbGFzcyBWaWV3IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEZyb250ZWQgVmlldyBjbGFzc1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBldmVyeXRoaW5nIHRoYXQgaXMgVUkuIE5vdCBtZWFudCBBVCBBTEwgdG8gaGFuZGxlIGRhdGEgbW9kZWxpc2F0aW9uLCB1c2UgPGNvZGU+TW9kZWwuanM8L2NvZGU+LiBUaGlzIGNsYXNzIGlzIG1lYW50IHRvIGJlIGFjY2Vzc2VkIGZyb20gYW55d2hlcmUgaW4gdGhlIGFwcCwgc2luY2UgaXQgaXMgYXR0YWNoZWQgdG8gdGhlIE16ayBvYmplY3QuXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fbWFpbkNvbnRhaW5lciA9IHt9O1xuICAgIHRoaXMuX3RvcEJhciA9IHt9O1xuICAgIHRoaXMuX2FzaWRlID0ge307XG4gICAgdGhpcy5fc2NlbmUgPSB7fTtcbiAgICB0aGlzLl9mb290QmFyID0ge307XG5cbiAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsKCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBWaWV3IG9iamVjdCB3aWR0aCBUb3BCYXIsIEZvb3RCYXIsIEFzaWRlcyBhbmQgU2NlbmVcbiAgICoqL1xuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9tYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW5Db250YWluZXInKTsgLy8gVXNlZCB3aGVuIHN3aXRjaGluZyBEaXNjb3ZlciAoYW5jaWVubmVtZW50IG1vZGVzIChwYXJ0eXZpZXcsIG1hbmFnb3RpdCBldGMpKVxuXG4gICAgdGhpcy5fdG9wQmFyID0gbmV3IFRvcEJhcigpO1xuICAgIHRoaXMuX2FzaWRlID0gbmV3IEFzaWRlKHtcbiAgICAgIHNpZGU6ICdsZWZ0J1xuICAgIH0pO1xuICAgIHRoaXMuX3NjZW5lID0gbmV3IFNjZW5lKCk7XG4gICAgdGhpcy5fZm9vdEJhciA9IG5ldyBGb290QmFyKCk7XG5cbiAgICB0aGlzLl9mb290QmFyLmdldFZvbHVtZUJhcigpLnVwZGF0ZVZvbHVtZShtemsuZ2V0SXNNdXRlZCgpLCBtemsuZ2V0Vm9sdW1lKCkpOyAvLyBUT0RPIDogcmVwbGFjZSB3aXRoIG16ay5nZXRVc2VyVm9sdW1lKCkgb3IgZnJvbSBsb2NhbFN0b3JhZ2Ugb3IgZnJvbSBvcHRzIChzZXJ2KVxuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGNoYW5nZVRyYWNrXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDaGFuZ2UgVUkgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBuZXcgcGxheWluZyB0cmFjayBpbmZvcm1hdGlvbnNcbiAgICoqL1xuICBjaGFuZ2VUcmFjayh0cmFjaykge1xuICAgIGQzLnNlbGVjdEFsbCgnLm1vb2RiYXIgc3ZnIGcnKS5yZW1vdmUoKTsgLy8gQ2xlYXIgY3VycmVudCBtb29kYmFyXG4gICAgdGhpcy50b2dnbGVQbGF5KCk7XG4gICAgdGhpcy5fc2NlbmUuY2hhbmdlVHJhY2sodHJhY2suaWQpO1xuXG4gICAgY29uc3QgcGxheWVyID0gbXprLm1vZGVsLmdldFBsYXllcigpO1xuICAgIHRoaXMuX2Zvb3RCYXIucmVuZGVyTW9vZEZpbGUodHJhY2subW9vZGJhcik7XG4gICAgdGhpcy5fZm9vdEJhci5nZXRQcm9ncmVzc0JhcigpLnVwZGF0ZUR1cmF0aW9uKHBsYXllci5nZXREdXJhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHRvZ2dsZVBsYXlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIENoYW5nZSBVSSBlbGVtZW50cyBhY2NvcmRpbmcgdG8gdGhlIG5ldyBwbGF5aW5nIHN0YXRlXG4gICAqKi9cbiAgdG9nZ2xlUGxheSgpIHtcbiAgICBjb25zdCBpc1BsYXlpbmcgPSBtemsubW9kZWwuZ2V0UGxheWVyKCkuZ2V0SXNQbGF5aW5nKCk7XG4gICAgdGhpcy5fZm9vdEJhci51cGRhdGVQbGF5QnV0dG9uKGlzUGxheWluZyk7XG5cbiAgICBpZiAoaXNQbGF5aW5nKSB7IC8vIERvbid0IGhhbmRsZSAhcGxheWluZyAoZGVzYWN0aXZhdGUpIGJjIHBhdXNlICE9IHN0b3BcbiAgICAgIHRoaXMuX2Zvb3RCYXIuZ2V0UHJvZ3Jlc3NCYXIoKS5hY3RpdmF0ZSgpOyAvLyBBY3RpdmF0ZSBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgYXBwZWFyIHcvIGFuaW1hdGlvblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHN0b3BQbGF5YmFja1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBWaWV3XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlcyBVSSBlbGVtZW50IHRvIG1hdGNoIHRoZSBwbGF5ZXIgc3RhbmQgYnkgc3RhdGVcbiAgICoqL1xuICBzdG9wUGxheWJhY2soKSB7XG4gICAgZDMuc2VsZWN0QWxsKCcubW9vZGJhciBzdmcgZycpLnJlbW92ZSgpOyAvLyBDbGVhciBjdXJyZW50IG1vb2RiYXJcbiAgICB0aGlzLl9mb290QmFyLnVwZGF0ZVBsYXlCdXR0b24oZmFsc2UpOyAvLyBTZW5kICFpc1BsYXlpbmcgdG8gcmVzdG9yZSBwbGF5IGljb25cbiAgICB0aGlzLl9mb290QmFyLmdldFByb2dyZXNzQmFyKCkucmVzZXRQcm9ncmVzc0JhcigpO1xuICAgIHRoaXMuX3NjZW5lLnN0b3BQbGF5YmFjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgaW5pdFBsYXlsaXN0XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBJbml0IHRoZSBnaXZlbiBwbGF5bGlzdCBpbnRvIHRoZSBzY2VuZS92aWV3XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwbGF5bGlzdCAtIFRoZSBwbGF5bGlzdCB0byBpbml0IHRoZSB2aWV3IHdpdGhcbiAgICoqL1xuICBpbml0UGxheWxpc3QocGxheWxpc3QpIHtcbiAgICB0aGlzLl9zY2VuZS51cGRhdGVWaWV3KHBsYXlsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVwZGF0ZVZvbHVtZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBWaWV3XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gVXBkYXRlIHRoZSB2b2x1bWUgdmFsdWVzIGluIHRoZSBVSSBhY2NvcmRpbmcgdG8gdGhlIHBsYXllcidzIHZhbHVlXG4gICAqKi9cbiAgdXBkYXRlVm9sdW1lKCkge1xuICAgIGNvbnN0IHBsYXllciA9IG16ay5tb2RlbC5nZXRQbGF5ZXIoKTtcbiAgICB0aGlzLl9mb290QmFyLmdldFZvbHVtZUJhcigpLnVwZGF0ZVZvbHVtZShwbGF5ZXIuZ2V0SXNNdXRlZCgpLCBwbGF5ZXIuZ2V0Vm9sdW1lKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdXBkYXRlUHJvZ3Jlc3NcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgVmlld1xuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgdGhlIHByb2dyZXNzIGJhciBhY2NvcmRpbmcgdG8gdGhlIHBsYXllciBwcm9ncmVzcycgdmFsdWVcbiAgICoqL1xuICB1cGRhdGVQcm9ncmVzcygpIHsgLy8gQ2FsbGVkIG9uQ2xpY2tcbiAgICBjb25zdCBwcm9ncmVzcyA9IG16ay5tb2RlbC5nZXRQbGF5ZXIoKS5nZXRQcm9ncmVzcygpO1xuICAgIHRoaXMuX2Zvb3RCYXIuZ2V0UHJvZ3Jlc3NCYXIoKS5kZXNhY3RpdmF0ZVRyYW5zaXRpb25zKCk7IC8vIE11c3QgZGlzYWJsZSB0cmFuc2l0aW9uIHdoZW4gY2FsbGVkXG4gICAgdGhpcy5fZm9vdEJhci5nZXRQcm9ncmVzc0JhcigpLnNldFByb2dyZXNzKHByb2dyZXNzKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IC8vIFJlc3RvcmUgdHJhbnNpdGlvbnNcbiAgICAgIHRoaXMuX2Zvb3RCYXIuZ2V0UHJvZ3Jlc3NCYXIoKS5hY3RpdmF0ZVRyYW5zaXRpb25zKCk7XG4gICAgfS5iaW5kKHRoaXMpLCA1MCk7IC8vIDUgaXMgZmluZSwgYnV0IDUwIGlzIG1vcmUgJ2xhZyBmcmllbmRseSdcbiAgfVxuXG5cbiAgZXh0ZW5kTWFpbkNvbnRhaW5lcigpIHtcbiAgICB0aGlzLl9tYWluQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2V4dGVuZGVkJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9zY2VuZS52aWV3LnJlZnJlc2hWaWV3KCk7XG4gICAgfSwgODAwKTsgLy8gVmFsdWUgbXVzdCBtYXRjaCA0IHRpbWVzIHRoZSAkdHJhbnNpdGlvbi1kdXJhdGlvbiB2YXIgaW4gc2Nzcy91dGlscy90b29scy9fdmFyaWFibGVzLnNjc3NcbiAgfVxuXG4gIHJldHJhY3RNYWluQ29udGFpbmVyKCkge1xuICAgIHRoaXMuX21haW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZXh0ZW5kZWQnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2NlbmUudmlldy5yZWZyZXNoVmlldygpO1xuICAgIH0sIDgwMCk7IC8vIFZhbHVlIG11c3QgbWF0Y2ggNCB0aW1lcyB0aGUgJHRyYW5zaXRpb24tZHVyYXRpb24gdmFyIGluIHNjc3MvdXRpbHMvdG9vbHMvX3ZhcmlhYmxlcy5zY3NzXG4gIH1cblxuICAvKiogQG1ldGhvZFxuICAgKiBAbmFtZSBhZGRPdmVybGF5XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFZpZXdcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBhbiBvdmVybGF5IGRpdiAobW9kYWwgc3R5bGUpIG92ZXIgdGhlIHNjZW5lXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIC0gVGhlIERPTSBub2RlIHRvIGFwcGVuZCB0byB0aGUgc2NlbmUgYXMgYW4gb3ZlcmxheVxuICAgKiovXG4gIGFkZE92ZXJsYXkobm9kZSkge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIG92ZXJsYXkuaWQgPSAnb3ZlcmxheSc7XG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChvdmVybGF5KTtcblxuICAgIHRoaXMuX21haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICB9XG5cbiAgcmVtb3ZlT3ZlcmxheSgpIHtcbiAgICB0aGlzLl9tYWluQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5JykpO1xuICB9XG5cbiAgZGlzcGxheU1vZGFsKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnbmV3bGlicmFyeScpIHtcbiAgICAgIG16ay5rb211bmlrYXRvci5nZXRUZW1wbGF0ZSgnbW9kYWxzL25ld2xpYnJhcnkvJylcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcocmVzcG9uc2UsIFwidGV4dC9odG1sXCIpO1xuICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGFsJylbMF07XG4gICAgICAgICAgdGhpcy5hZGRPdmVybGF5KG1vZGFsKTtcblxuICAgICAgICAgIHRoaXMubW9kYWwubmV3TGlicmFyeSh7XG4gICAgICAgICAgICBjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFja1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXROZXh0VHJhY2tJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmUuZ2V0TmV4dFRyYWNrSWQoKTtcbiAgfVxuXG4gIGdldFByZXZpb3VzVHJhY2tJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmUuZ2V0UHJldmlvdXNUcmFja0lkKCk7XG4gIH1cblxuICBzdGFydExvYWRpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5fc2NlbmUuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzdG9wTG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLl9zY2VuZS5zdG9wTG9hZGluZygpXG4gICAgICAgIC50aGVuKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0UmVwZWF0TW9kZSh2YWx1ZSkge1xuICAgIHRoaXMuX2Zvb3RCYXIuc2V0UmVwZWF0TW9kZSh2YWx1ZSk7XG4gIH1cblxuICBpc0xhc3RUcmFjaygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmUuaXNMYXN0VHJhY2soKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgR0VUVEVSIE1FVEhPRFMgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBnZXRGb290QmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb290QmFyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iLCJpbXBvcnQgVm9sdW1lQmFyIGZyb20gJy4vY29tcG9uZW50cy9Wb2x1bWVCYXIuanMnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJy4vY29tcG9uZW50cy9Qcm9ncmVzc0Jhci5qcyc7XG4ndXNlX3N0cmljdCc7XG5cbmNsYXNzIEZvb3RCYXIge1xuICAvKipcbiAgICogQHN1bW1hcnkgTWFuYVplYWsgRm9vdEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgSnVseSAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgYWxsIGNvbXBvbmVudHMgaW4gdGhlIEZvb3RCYXIgYW5kIGFsbCByZWxhdGVkIGV2ZW50c1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2NvbnRyb2xzID0ge1xuICAgICAgcGxheToge30sXG4gICAgICBzdG9wOiB7fSxcbiAgICAgIHZvbHVtZToge30sXG4gICAgICBwcmV2aW91czoge30sXG4gICAgICBuZXh0OiB7fSxcbiAgICAgIHJlcGVhdDoge31cbiAgICB9O1xuICAgIHRoaXMuX3ZvbHVtZUJhciA9IHt9O1xuICAgIHRoaXMuX3Byb2dyZXNzQmFyID0ge307XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBSSVZBVEUgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX2luaXRcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEZvb3RCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW5pdCB0aGUgRm9vdEJhciB3aXRoIGNvbnRyb2xzLCBhIHZvbHVtZSBiYXIgYW5kIGEgcHJvZ3Jlc3MgYmFyXG4gICAqKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fY29udHJvbHMucGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5Jyk7XG4gICAgdGhpcy5fY29udHJvbHMuc3RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9wJyk7XG4gICAgdGhpcy5fY29udHJvbHMucHJldmlvdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlvdXMnKTtcbiAgICB0aGlzLl9jb250cm9scy5uZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQnKTtcbiAgICB0aGlzLl9jb250cm9scy5yZXBlYXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVwZWF0Jyk7XG5cbiAgICB0aGlzLl92b2x1bWVCYXIgPSBuZXcgVm9sdW1lQmFyKCk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NCYXIgPSBuZXcgUHJvZ3Jlc3NCYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9ldmVudHNcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIEZvb3RCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIGFsIGNvbnRyb2xzIGNsaWNrIGV2ZW50c1xuICAgKiovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fY29udHJvbHMucGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG16ay50b2dnbGVQbGF5KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb250cm9scy5zdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbXprLnN0b3BQbGF5YmFjaygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29udHJvbHMucHJldmlvdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBtemsucHJldmlvdXNUcmFja0luVmlldygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29udHJvbHMubmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG16ay5uZXh0VHJhY2tJblZpZXcoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2NvbnRyb2xzLnJlcGVhdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG16ay50b2dnbGVSZXBlYXRNb2RlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgdXBkYXRlUGxheUJ1dHRvblxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBGb290QmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBKdWx5IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgdGhlIHBsYXkgaWNvbiBhY2NvcmRpbmcgdG8gYSBnaXZlbiBzdGF0ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUGxheWluZyAtIFRoZSBwbGF5ZXIgcGxheWJhY2sgc3RhdGVcbiAgICoqL1xuICB1cGRhdGVQbGF5QnV0dG9uKGlzUGxheWluZykge1xuICAgIGlmIChpc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLnBsYXkuc3JjID0gJy4uLy4uL3N0YXRpYy9pbWcvcGxheWVyL3BhdXNlLnN2Zyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLnBsYXkuc3JjID0gJy4uLy4uL3N0YXRpYy9pbWcvcGxheWVyL3BsYXkuc3ZnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByZW5kZXJNb29kRmlsZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBGb290QmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFJlbmRlciBhIG1vb2QgZmlsZSBpbnRvIHRoZSBwcm9ncmVzcy1tb29kYmFyIGNvbnRhaW5lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHVybCB0byBmZXRjaCB0aGUgbW9kZCBmaWxlXG4gICAqKi9cbiAgcmVuZGVyTW9vZEZpbGUodXJsKSB7XG4gICAgbXprLmtvbXVuaWthdG9yLmdldEJpbmFyeVJlc3BvbnNlKHVybClcbiAgICAgIC50aGVuKChyZXNwb25zZVRleHQpID0+IHtcbiAgICAgICAgLy8gT3JpZ2luYWwgY29kZSBmcm9tIDogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vVmFsb2RpbS81MjI1NDYwXG4gICAgICAgIGNvbnN0IHJnYiA9IFsuLi5BcnJheSgocmVzcG9uc2VUZXh0Lmxlbmd0aCAvIDMpKV07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZ2IubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAvLyBgJiAweGZmYCBGb3JjZSA4Yml0IGxvbmcgaW50ZWdlciAodG8gZml0IHJnYiByYW5nZSBvZiB2YWx1ZXMpXG4gICAgICAgICAgY29uc3QgciA9IHJlc3BvbnNlVGV4dC5jaGFyQ29kZUF0KGkgKiAzKSAmIDB4ZmY7XG4gICAgICAgICAgY29uc3QgZyA9IHJlc3BvbnNlVGV4dC5jaGFyQ29kZUF0KChpICogMykgKyAxKSAmIDB4ZmY7XG4gICAgICAgICAgY29uc3QgYiA9IHJlc3BvbnNlVGV4dC5jaGFyQ29kZUF0KChpICogMykgKyAyKSAmIDB4ZmY7XG5cbiAgICAgICAgICByZ2JbaV0gPSB7IC8vIEVuaGFuY2VtZW50IDogSGF2ZSBmdW4gaGVyZSB3LyBjb2xvcnMgYW5kIHByZWZcbiAgICAgICAgICAgIG9mZnNldDogYCR7KGkgLyByZ2IubGVuZ3RoICogMTAwKX0lYCxcbiAgICAgICAgICAgIGNvbG9yOiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAxKWBcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3ZnID0gZDMuc2VsZWN0KHRoaXMuX3Byb2dyZXNzQmFyLmdldE1vb2RiYXJDb250YWluZXIoKS5jaGlsZE5vZGVzWzFdKS5hcHBlbmQoJ2cnKTsgLy8gVE9ETyA6IGNoaWxkTm9kZXMwICwgcmVtb3ZlIHRleHQgYnNcblxuICAgICAgICBzdmcuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpXG4gICAgICAgICAgLmF0dHIoJ2lkJywgYG1vb2RiYXItZ3JhZGllbnQtJHt1cmxbMF0gKyB1cmxbMV19YClcbiAgICAgICAgICAuYXR0cignZ3JhZGllbnRVbml0cycsICd1c2VyU3BhY2VPblVzZScpXG4gICAgICAgICAgLnNlbGVjdEFsbCgnc3RvcCcpXG4gICAgICAgICAgLmRhdGEocmdiKVxuICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgLmF0dHIoJ29mZnNldCcsIGQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGQub2Zmc2V0O1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvbG9yO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHN2Zy5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgIC5hdHRyKCdmaWxsJywgYHVybCgjbW9vZGJhci1ncmFkaWVudC0ke3VybFswXSArIHVybFsxXX0pYClcbiAgICAgICAgICAuYXR0cigneCcsIDApXG4gICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTAwJScpXG4gICAgICAgICAgLmF0dHIoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc2V0UmVwZWF0TW9kZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5fY29udHJvbHMucmVwZWF0LnNyYyA9ICcvc3RhdGljL2ltZy9wbGF5ZXIvcmVwZWF0LW9mZi5zdmcnO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IDEpIHtcbiAgICAgIHRoaXMuX2NvbnRyb2xzLnJlcGVhdC5zcmMgPSAnL3N0YXRpYy9pbWcvcGxheWVyL3JlcGVhdC1vbmUuc3ZnJztcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAyKSB7XG4gICAgICB0aGlzLl9jb250cm9scy5yZXBlYXQuc3JjID0gJy9zdGF0aWMvaW1nL3BsYXllci9yZXBlYXQtYWxsLnN2Zyc7XG4gICAgfVxuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBHRVRURVIgTUVUSE9EUyAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIGdldFByb2dyZXNzQmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9ncmVzc0JhcjtcbiAgfVxuICBnZXRWb2x1bWVCYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvbHVtZUJhcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb290QmFyO1xuIiwiJ3VzZV9zdHJpY3QnO1xuXG5cbmNsYXNzIFByb2dyZXNzQmFyIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IEludGVyYWN0aXZlIFByb2dyZXNzIEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgcHJvZ3Jlc3Mgb3ZlciBhIHRyYWNrXG4gICAqKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSB7XG4gICAgICBjb250YWluZXI6IHt9LFxuICAgICAgdHJhY2s6IHt9LFxuICAgICAgY3VycmVudDoge30sXG4gICAgICB0aHVtYjoge30sXG4gICAgICBob3Zlcjoge30sXG4gICAgICBtb29kYmFyOiB7fSxcbiAgICAgIGxlZnQ6IHt9LFxuICAgICAgcmlnaHQ6IHt9XG4gICAgfTsgLy8gRE9NIGVsZW1lbnRzXG4gICAgdGhpcy5fdG9wYmFyTG9nbyA9IHt9O1xuICAgIHRoaXMuX3JhZklkID0gbnVsbDtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IDA7XG5cbiAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlOyAvLyBCb29sZWFuIGZsYWcgdG8gbWFrZSBsaXN0ZW5lcnMgYXZhaWxhYmxlL3VuYXZhaWxhYmxlXG4gICAgdGhpcy5faXNNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvLyAgLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIHByb2dyZXNzIGJhciBkb20gYW5kIGV2ZW50c1xuICAgKiovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1jb250YWluZXInKTtcbiAgICB0aGlzLl9wcm9ncmVzcy50cmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy10cmFjaycpO1xuICAgIHRoaXMuX3Byb2dyZXNzLmN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtY3VycmVudCcpO1xuICAgIHRoaXMuX3Byb2dyZXNzLnRodW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLXRodW1iJyk7XG4gICAgdGhpcy5fcHJvZ3Jlc3MuaG92ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtaG92ZXInKTtcbiAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLW1vb2RiYXInKTtcbiAgICB0aGlzLl9wcm9ncmVzcy5sZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RiYXItbGVmdCcpO1xuICAgIHRoaXMuX3Byb2dyZXNzLnJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RiYXItcmlnaHQnKTtcbiAgICB0aGlzLl90b3BiYXJMb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcGJhci1sb2dvJyk7XG5cbiAgICB0aGlzLl9yZXNldFRpbWVjb2RlKCk7XG5cbiAgICAvLyBJbiBvcmRlciB0byByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGluIF9yZW1vdmVFdmVudHMoKVxuICAgIHRoaXMuX21vdXNlRG93biA9IHRoaXMuX21vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlTW92ZSA9IHRoaXMuX21vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLl9tb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fdXBkYXRlTW91c2VPdmVyID0gdGhpcy5fdXBkYXRlTW91c2VPdmVyLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYWRkRXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIExpc3RlbiB0byBtb3VzZSBldmVudHMgd2hlbiBQcm9ncmVzc0JhciBpcyBhY3RpdmF0ZWRcbiAgICoqL1xuICBfYWRkRXZlbnRzKCkge1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZURvd24pO1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLl91cGRhdGVNb3VzZU92ZXIpO1xuICAgIHRoaXMuX3Byb2dyZXNzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fdXBkYXRlTW91c2VPdmVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3JlbW92ZUV2ZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBSZW1vdmUgbW91c2UgZXZlbnRzIHdoZW4gUHJvZ3Jlc3NCYXIgaXMgZGVzYWN0aXZhdGVkXG4gICAqKi9cbiAgX3JlbW92ZUV2ZW50cygpIHtcbiAgICB0aGlzLl9wcm9ncmVzcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fbW91c2VEb3duKTtcbiAgICB0aGlzLl9wcm9ncmVzcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5fdXBkYXRlTW91c2VPdmVyKTtcbiAgICB0aGlzLl9wcm9ncmVzcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuX3VwZGF0ZU1vdXNlT3Zlcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF91cGRhdGVNb3VzZU92ZXJcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIG1vdXNlIGhvdmVyIG9uIHByb2dyZXNzIGJhclxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2UgZXZlbnQgb2JqZWN0XG4gICAqKi9cbiAgX3VwZGF0ZU1vdXNlT3ZlcihldmVudCkge1xuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2VvdmVyJykge1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MuaG92ZXIuc3R5bGUub3BhY2l0eSA9ICcxJzsgLy8gQXV0b21hdGljIENTUyB0cmFuc2l0aW9uXG4gICAgICB0aGlzLl9pc01vdXNlT3ZlciA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLmhvdmVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7IC8vIEF1dG9tYXRpYyBDU1MgdHJhbnNpdGlvblxuICAgICAgdGhpcy5faXNNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfdXBkYXRlSG92ZXJUaW1lY29kZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIGhvdmVyIHRpbWVjb2RlIHZhbHVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4UG9zIC0gVGhlIG1vdXNlIFggcG9zaXRpb24gb24gc2NyZWVuXG4gICAqKi9cbiAgX3VwZGF0ZUhvdmVyVGltZWNvZGUoeFBvcykge1xuICAgIGNvbnN0IGJvdW5kUmVjdCA9IHRoaXMuX3Byb2dyZXNzLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBwZXJjZW50YWdlID0gKCh4UG9zIC0gYm91bmRSZWN0LmxlZnQpICogMTAwKSAvIGJvdW5kUmVjdC53aWR0aDtcblxuICAgIGlmIChwZXJjZW50YWdlID4gMTAwKSB7XG4gICAgICBwZXJjZW50YWdlID0gMTAwO1xuICAgIH1cbiAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcbiAgICAgIHBlcmNlbnRhZ2UgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzLmhvdmVyLnN0eWxlLmxlZnQgPSBgJHsoKCgoYm91bmRSZWN0LndpZHRoICogcGVyY2VudGFnZSkgLyAxMDApIC0gMzApICogMTAwKSAvIGJvdW5kUmVjdC53aWR0aH0lYDtcbiAgICB0aGlzLl9wcm9ncmVzcy5ob3Zlci5pbm5lckhUTUwgPSBVdGlscy5zZWNvbmRzVG9UaW1lY29kZSgocGVyY2VudGFnZSAqIHRoaXMuX2R1cmF0aW9uKSAvIDEwMCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfbW91c2VEb3duXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSB0aGUgbW91c2UgZG93biBldmVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgbW91c2UgZXZlbnQgb2JqZWN0XG4gICAqKi9cbiAgX21vdXNlRG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5faXNEcmFnZ2luZyAmJlxuICAgICAgKGV2ZW50LnRhcmdldC5pZCA9PT0gJ3Byb2dyZXNzLWNvbnRhaW5lcicgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAncHJvZ3Jlc3MtdHJhY2snIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5pZCA9PT0gJ3Byb2dyZXNzLWN1cnJlbnQnIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5pZCA9PT0gJ3Byb2dyZXNzLW1vb2RiYXInIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5pZCA9PT0gJ3Byb2dyZXNzLXRodW1iJyB8fFxuICAgICAgICBldmVudC50YXJnZXQuaWQgPT09ICdtb29kYmFyVGh1bWInIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAncmVjdCcpKSB7XG5cbiAgICAgIG16ay5tdXRlKCk7XG4gICAgICB0aGlzLl9pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3N0b3BBbmltYXRpb24oKTtcbiAgICAgIHRoaXMuX21vdmVQcm9ncmVzcyhldmVudC5jbGllbnRYKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfbW91c2VVcFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgdGhlIG1vdXNlIHVwIGV2ZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBldmVudCBvYmplY3RcbiAgICoqL1xuICBfbW91c2VVcChldmVudCkge1xuICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKSB7IC8vIFVzZXIgaGFzIHJlbGVhc2VkIHByb2dyZXNzIHRodW1iXG4gICAgICBtemsudW5tdXRlKCk7XG4gICAgICB0aGlzLl9pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9zdGFydEFuaW1hdGlvbigpO1xuICAgICAgdGhpcy5fbW92ZVByb2dyZXNzKGV2ZW50LmNsaWVudFgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9tb3VzZU1vdmVcbiAgICogQHByaXZhdGVcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlIHRoZSBtb3VzZSBtb3ZlIGV2ZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBtb3VzZSBldmVudCBvYmplY3RcbiAgICoqL1xuICBfbW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlICYmIHRoaXMuX2lzRHJhZ2dpbmcpIHsgLy8gVXNlciBpcyBkcmFnaW5nIHByb2dyZXNzIHRodW1iXG4gICAgICB0aGlzLl9tb3ZlUHJvZ3Jlc3MoZXZlbnQuY2xpZW50WCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pc0FjdGl2ZSAmJiB0aGlzLl9pc01vdXNlT3ZlcikgeyAvLyBIb3ZlciBvbiBwcm9ncmVzcyB0cmFja1xuICAgICAgdGhpcy5fdXBkYXRlSG92ZXJUaW1lY29kZShldmVudC5jbGllbnRYKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfbW92ZVByb2dyZXNzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIE1vdmUgdGhlIHByb2dyZXNzIGFsb25nIGl0cyB0cmFja1xuICAgKiBAcGFyYW0ge251bWJlcn0geFBvcyAtIFRoZSBtb3VzZSBYIHBvc2l0aW9uIG9uIHNjcmVlblxuICAgKiovXG4gIF9tb3ZlUHJvZ3Jlc3MoeFBvcykge1xuICAgIGNvbnN0IGJvdW5kUmVjdCA9IHRoaXMuX3Byb2dyZXNzLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBkaXN0YW5jZSA9ICgoeFBvcyAtIGJvdW5kUmVjdC5sZWZ0KSAqIDEwMCkgLyBib3VuZFJlY3Qud2lkdGg7XG5cbiAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICBkaXN0YW5jZSA9IDA7XG4gICAgfVxuICAgIGlmIChkaXN0YW5jZSA+IDEwMCkge1xuICAgICAgZGlzdGFuY2UgPSAxMDA7XG4gICAgfVxuXG4gICAgbXprLnNldFByb2dyZXNzKFV0aWxzLnByZWNpc2lvblJvdW5kKGRpc3RhbmNlLCAzKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfYW5pbWF0ZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgdGhlIHByb2dyZXNzIGJhciBjb21wbGV0aW9uIGFjY29yZGluZyB0byB0aGUgTXprIHBsYXllciBwcm9ncmVzcyB2YWx1ZVxuICAgKiovXG4gIF9hbmltYXRlKCkge1xuICAgIHRoaXMuc2V0UHJvZ3Jlc3MobXprLmdldFByb2dyZXNzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgX3N0YXJ0QW5pbWF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVzZSBSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gcmVuZGVyIGFuZCBzZXRQcm9ncmVzcyBtb3N0IG9mIHRoZSBmcmFtZXNcbiAgICoqL1xuICBfc3RhcnRBbmltYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLl9hbmltYXRlKCk7XG4gICAgICB0aGlzLl9yYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9zdGFydEFuaW1hdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfc3RvcEFuaW1hdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBDYW5jZWwgYW5pbWF0aW9uIGZyYW1lIGlmIG5lZWRlZFxuICAgKiovXG4gIF9zdG9wQW5pbWF0aW9uKCkge1xuICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZklkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfcmVzZXRUaW1lY29kZVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgVUkgdmFsdWVzIHRvIGRlZmF1bHQgYC0tOi0tYFxuICAgKiovXG4gIF9yZXNldFRpbWVjb2RlKCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5sZWZ0LmlubmVySFRNTCA9ICctLTotLSc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5yaWdodC5pbm5lckhUTUwgPSAnLS06LS0nO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MuaG92ZXIuaW5uZXJIVE1MID0gJy0tOi0tJztcbiAgICB9LmJpbmQodGhpcyksIDUwMCk7IC8vIE1hdGNoIHZhbHVlIHdpdGggdGhlIG9uZSBpbiBzY3NzL3ZpZXcvY29tcG9uZW50cy9fcHJvZ3Jlc2Jhci5zY3NzIC0+ICRmb290YmFyLXRyYW5zaXRpb25cbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFVCTElDIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSByZXNldFByb2dyZXNzQmFyXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gUmVzZXQgdGhlIHByb2dyZXNzIGJhciB0byBpdHMgaW5pdGlhbCBzdGF0ZSBhbmQgZGVzYWN0aXZhdGUgaXRzIGV2ZW50cyBhbmQgdHJhbnNpdGlvbnNcbiAgICoqL1xuICByZXNldFByb2dyZXNzQmFyKCkge1xuICAgIHRoaXMuc2V0UHJvZ3Jlc3MoMCk7XG4gICAgdGhpcy5kZXNhY3RpdmF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWN0aXZhdGVUcmFuc2l0aW9uc1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEVuYWJsZSB0aGUgdHJhbnNpdGlvbiBvbiB0aGUgUHJvZ3Jlc3NCYXJcbiAgICoqL1xuICBhY3RpdmF0ZVRyYW5zaXRpb25zKCkge1xuICAgIHRoaXMuX3Byb2dyZXNzLnRodW1iLnN0eWxlLnRyYW5zaXRpb24gPSAnbGVmdCAwLjRzIGVhc2UgMHMsIG9wYWNpdHkgMC40cyBlYXNlIDBzJzsgLy8gTWF0Y2ggdHJhbnNpdGlvbiBkdXJhdGlvbiB3LyB0aGUgb25lIGluIHZpZXcvX2Zvb3RiYXIuc2NzcyAoJGZvb3RiYXItdHJhbnNpdGlvbilcbiAgICB0aGlzLl9wcm9ncmVzcy5jdXJyZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnd2lkdGggMC40cyBlYXNlIDBzJzsgLy8gTWF0Y2ggdHJhbnNpdGlvbiBkdXJhdGlvbiB3LyB0aGUgb25lIGluIHZpZXcvX2Zvb3RiYXIuc2NzcyAoJGZvb3RiYXItdHJhbnNpdGlvbilcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc2FjdGl2YXRlVHJhbnNpdGlvbnNcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBEaXNhYmxlIHRoZSB0cmFuc2l0aW9uIG9uIHRoZSBQcm9ncmVzc0JhclxuICAgKiovXG4gIGRlc2FjdGl2YXRlVHJhbnNpdGlvbnMoKSB7XG4gICAgLy8gSGVyZSB3ZSBuZWVkIHRvIHNldCB0cmFuc2l0aW9uIHZhbHVlIHRvIDBzIHRvIGF2b2lkIGxhZyBvbiBjdXJyZW50IGFuZCB0aHVtYiB3aGVuIHByb2dyZXNzIGJhciBpcyBhY3RpdmVcbiAgICAvLyBMYWcgZHVyYXRpb24gd2lsbCBiZSBlcXVhbCB0byB0aGUgdHJhbnNpdGlvbiB0aW1lIG90aGVyd2lzZVxuICAgIC8vIFJlc2V0IGxlZnQgYW5kIHdpZHRoIHRyYW5zaXRpb24gdG8gZGVmYXVsdCwgbWF0Y2ggdHJhbnNpdGlvbiBkdXJhdGlvbiB3LyB0aGUgb25lIGluIHZpZXcvX2Zvb3RiYXIuc2NzcyAoJGZvb3RiYXItdHJhbnNpdGlvbilcbiAgICB0aGlzLl9wcm9ncmVzcy50aHVtYi5zdHlsZS50cmFuc2l0aW9uID0gJ2xlZnQgMHMgZWFzZSAwcywgb3BhY2l0eSAwLjRzIGVhc2UgMHMnO1xuICAgIHRoaXMuX3Byb2dyZXNzLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd3aWR0aCAwcyBlYXNlIDBzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHRvZ2dsZUFjdGl2ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFRvZ2dsZSB0aGUgUHJvZ3Jlc3NCYXIgYWN0aXZlIHN0YXR1c1xuICAgKiovXG4gIHRvZ2dsZUFjdGl2ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBhY3RpdmF0ZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFjdGl2YXRlIHRoZSBQcm9ncmVzc0Jhciwgc2V0IGl0IHZpc2libGUsIGFkZCBhbmltYXRpb25zIGFuZCBhZGQgbW91c2UgZXZlbnRzXG4gICAqKi9cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICB0aGlzLl9zdGFydEFuaW1hdGlvbigpO1xuICAgIHRoaXMuYWN0aXZhdGVUcmFuc2l0aW9ucygpOyAvLyBUT0RPIDogYWRkIHRyYW5zaXRpb24gaW4gc3RhcnRBbmltYXRpb25cbiAgICB0aGlzLl9hZGRFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGRlc2FjdGl2YXRlXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gRGVzYWN0aXZhdGUgdGhlIFByb2dyZXNzQmFyLCBzZXQgaXQgaW52aXNpYmxlLCByZW1vdmUgYW5pbWF0aW9ucyBhbmQgcmVtb3ZlIG1vdXNlIGV2ZW50c1xuICAgKiovXG4gIGRlc2FjdGl2YXRlKCkge1xuICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB0aGlzLl9yZXNldFRpbWVjb2RlKCk7XG4gICAgdGhpcy5fcmVtb3ZlRXZlbnRzKCk7XG4gICAgdGhpcy5fc3RvcEFuaW1hdGlvbigpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgLy8gRGVsYXkgbm8gYW5pbWF0aW9uIHN0eWxlIGZvciB0aHVtYiBhbmQgY3VycmVudCAoYm90aCBjb21lIGF0IDAlIGluIDAuNXMgaW50ZXJ2YWwpXG4gICAgICB0aGlzLmRlc2FjdGl2YXRlVHJhbnNpdGlvbnMoKTtcbiAgICB9LmJpbmQodGhpcyksIDUwMCk7IC8vIFVzZSBzYW1lIHRpbWVvdXQgdmFsdWUgYXMgdGhlIHRyYW5zaXRpb24gdmFsdWUgc2V0IGluIHJlc2V0UHJvZ3Jlc3NCYXIoKSwgc28gYW5pbWF0aW9uIGNhbiBydW4gcHJvcGVybHlcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIGFkanVzdFByb2dyZXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQWRkL1N1YnN0cmFjdCBhIGNvbXBsZXRpb24gcGVyY2VudGFnZSB0byB0aGUgUHJvZ3Jlc3NCYXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIFRoZSBwZXJjZW50YWdlIGFtb3VudCB0byBhZGQvc3Vic3RyYWN0IGluIHJhbmdlIGZsb2F0Wy0xMDAsMTAwXVxuICAgKiovXG4gIGFkanVzdFByb2dyZXNzKGFtb3VudCkge1xuICAgIHRoaXMuc2V0UHJvZ3Jlc3MoMCArIGFtb3VudCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSB1cGRhdGVEdXJhdGlvblxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBQcm9ncmVzc0JhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZSB0aGUgZHVyYXRpb24gdmFsdWVzXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAtIFRoZSB0cmFjayBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gICAqKi9cbiAgdXBkYXRlRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHRoaXMuX3Byb2dyZXNzLnJpZ2h0LmlubmVySFRNTCA9IFV0aWxzLnNlY29uZHNUb1RpbWVjb2RlKGR1cmF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFByb2dyZXNzXG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIFByb2dyZXNzQmFyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBBdWd1c3QgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2V0IHRoZSBjb21wbGV0aW9uIHBlcmNlbnRhZ2Ugb2YgdGhlIFByb2dyZXNzQmFyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50YWdlIC0gVGhlIHByb2dyZXNzIHBlcmNlbnRhZ2UgdG8gc2V0XG4gICAqKi9cbiAgc2V0UHJvZ3Jlc3MocGVyY2VudGFnZSkge1xuICAgIGlmICh0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MuY3VycmVudC5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnRhZ2V9JWA7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50aHVtYi5zdHlsZS5sZWZ0ID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLmxlZnQuaW5uZXJIVE1MID0gVXRpbHMuc2Vjb25kc1RvVGltZWNvZGUoKHBlcmNlbnRhZ2UgKiB0aGlzLl9kdXJhdGlvbikgLyAxMDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHNldFZpc2liaWxpdHlcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgUHJvZ3Jlc3NCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEF1Z3VzdCAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBTZXQgdGhlIHZpc2liaWxpdHkgc3RhdHVzIG9mIHRoZSBQcm9ncmVzc0JhclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmlzaWJsZSAtIFRoZSB2aXNpYmlsaXR5IHN0YXRlXG4gICAqKi9cbiAgc2V0VmlzaWJpbGl0eShpc1Zpc2libGUpIHtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLl9wcm9ncmVzcy5tb29kYmFyLnN0eWxlLmhlaWdodCA9ICcyNXB4JzsgLy8gTWF0Y2ggdmFsdWUgdy8gdGhlIG9uZSBpbiB2aWV3L2NvbXBvbmVudHMvX3Byb2dyZXNiYXIuc2NzcyAoJHByb2dyZXNzLW1vb2RiYXItaGVpZ2h0KVxuICAgICAgdGhpcy5fcHJvZ3Jlc3MubW9vZGJhci5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubW9vZGJhci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50cmFjay5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MudHJhY2suc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MudGh1bWIuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLmxlZnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnJpZ2h0LnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICB0aGlzLl90b3BiYXJMb2dvLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Byb2dyZXNzLm1vb2RiYXIuc3R5bGUuaGVpZ2h0ID0gJzAnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubW9vZGJhci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MubW9vZGJhci5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICB0aGlzLl9wcm9ncmVzcy50cmFjay5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MudHJhY2suc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgdGhpcy5fcHJvZ3Jlc3MudGh1bWIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLmxlZnQuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgIHRoaXMuX3Byb2dyZXNzLnJpZ2h0LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICB0aGlzLl90b3BiYXJMb2dvLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgfVxuICB9XG5cbiAgLy8gIC0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLSAgLy9cblxuICBnZXRNb29kYmFyQ29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcy5tb29kYmFyO1xuICB9XG5cblxuICAvLyAgLS0tLSAgU0VUVEVSIE1FVEhPRFMgICAtLS0tICAvL1xuXG4gIHNldElzQWN0aXZlKGlzQWN0aXZlKSB7XG4gICAgdGhpcy5faXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgfVxuICBzZXRJc01vdXNlT3Zlcihpc01vdXNlT3Zlcikge1xuICAgIHRoaXMuX2lzTW91c2VPdmVyID0gaXNNb3VzZU92ZXI7XG4gIH1cbiAgc2V0SXNEcmFnZ2luZyhpc0RyYWdnaW5nKSB7XG4gICAgdGhpcy5faXNEcmFnZ2luZyA9IGlzRHJhZ2dpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NCYXI7XG4iLCIndXNlX3N0cmljdCc7XG5cbmNsYXNzIFZvbHVtZUJhciB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBVSSBWb2x1bWVCYXJcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIEp1bHkgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gSW50ZXJhY3RpdmUgdm9sdW1lIGJhciB0aGF0IGlzIGxpbmtlZCB0byBNYW5hWmVhayBsb2dpY1xuICAgKiovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3ZvbHVtZSA9IHtcbiAgICAgIGltYWdlOiB7fSxcbiAgICAgIHdyYXBwZXI6IHt9LFxuICAgICAgY29udGFpbmVyOiB7fSxcbiAgICAgIGN1cnJlbnQ6IHt9LFxuICAgICAgdGh1bWI6IHt9XG4gICAgfTtcbiAgICB0aGlzLl9zaG93SGlkZVRpbWVvdXRJZCA9IC0xO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX3ZvbHVtZSA9IHtcbiAgICAgIGltYWdlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lYmFyLWltZycpLFxuICAgICAgd3JhcHBlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZvbHVtZWJhci13cmFwcGVyJyksXG4gICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2b2x1bWViYXItY29udGFpbmVyJyksXG4gICAgICBjdXJyZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lYmFyLWN1cnJlbnQnKSxcbiAgICAgIHRodW1iOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndm9sdW1lYmFyLXRodW1iJylcbiAgICB9O1xuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX3ZvbHVtZS5pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG16ay50b2dnbGVNdXRlLmJpbmQobXprKSk7XG4gICAgdGhpcy5fdm9sdW1lLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLl9tb3VzZU1vdmUgPSB0aGlzLl9tb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9tb3VzZVVwID0gdGhpcy5fbW91c2VVcC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX21vdXNlRG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5pc0RyYWdnaW5nICYmIChldmVudC50YXJnZXQuaWQgPT09ICd2b2x1bWViYXItd3JhcHBlcicgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAndm9sdW1lYmFyLWNvbnRhaW5lcicgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09PSAndm9sdW1lYmFyLWN1cnJlbnQnIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5pZCA9PT0gJ3ZvbHVtZWJhci10aHVtYicpKSB7XG5cbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLl9tb3ZlVm9sdW1lKGV2ZW50KTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuICAgIH1cbiAgfVxuXG4gIF9tb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLl9tb3ZlVm9sdW1lKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBfbW91c2VVcCgpIHtcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9tb3VzZVVwKTtcbiAgICB9XG4gIH1cblxuICBfbW92ZVZvbHVtZShldmVudCkge1xuICAgIC8vIEdldCBjb250YWluZXIgYm91bmQgcmVjdGFuZ2xlIGFuZCBjb21wdXRlIGRpZmZlcmVuY2UgaW4gcHggYW5kICUgKHByKVxuICAgIGNvbnN0IGJvdW5kUmVjdCA9IHRoaXMuX3ZvbHVtZS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgdG9MZWZ0SW5QeCA9IGV2ZW50LmNsaWVudFggLSBib3VuZFJlY3QubGVmdDsgLy8gQ2xpZW50IFggcG9zaXRpb24gbWludXMgY29udGFpbmVyIGxlZnQgWCBwb3NpdGlvbiBlcXVhbHMgWCB2YXJpYXRpb24gZnJvbSBjb250YWluZXIgbGVmdCBzaWRlXG4gICAgbGV0IHRvTGVmdEluUHIgPSAodG9MZWZ0SW5QeCAqIDEwMCkgLyBib3VuZFJlY3Qud2lkdGg7IC8vIEdldCB3aWR0aCBwZXJjZW50YWdlIGRlcGVuZGluZyBvbiBjb250YWluZXIgd2lkdGhcbiAgICAvLyBPT0IgcHJvdGVjdGlvblxuICAgIGlmICh0b0xlZnRJblByID4gMTAwKSB7XG4gICAgICB0b0xlZnRJblByID0gMTAwO1xuICAgIH1cbiAgICBpZiAodG9MZWZ0SW5QciA8IDApIHtcbiAgICAgIHRvTGVmdEluUHIgPSAwO1xuICAgIH1cbiAgICAvLyBTZXQgbXprIGdsb2JhbCB2b2x1bWVcbiAgICBtemsuc2V0Vm9sdW1lKHRvTGVmdEluUHIgLyAxMDApO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQVUJMSUMgTUVUSE9EUyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIHVwZGF0ZVZvbHVtZShpc011dGVkLCB2b2x1bWUpIHtcbiAgICBjb25zdCByZW1vdmVGdWxsQ2xhc3MgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fdm9sdW1lLmN1cnJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmdWxsJykpIHtcbiAgICAgICAgdGhpcy5fdm9sdW1lLmN1cnJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2x1bWUgKj0gMTAwO1xuICAgIC8vIEljb24gdXBkYXRlXG4gICAgaWYgKHZvbHVtZSA9PT0gMCB8fCAodHlwZW9mIGlzTXV0ZWQgPT09ICdib29sZWFuJyAmJiBpc011dGVkID09PSB0cnVlKSkge1xuICAgICAgcmVtb3ZlRnVsbENsYXNzKCk7XG4gICAgICB0aGlzLl92b2x1bWUuaW1hZ2Uuc3JjID0gJy9zdGF0aWMvaW1nL3BsYXllci92b2x1bWUtbXV0ZS5zdmcnO1xuICAgIH0gZWxzZSBpZiAodm9sdW1lID4gMCAmJiB2b2x1bWUgPCA1MCkge1xuICAgICAgcmVtb3ZlRnVsbENsYXNzKCk7XG4gICAgICB0aGlzLl92b2x1bWUuaW1hZ2Uuc3JjID0gJy9zdGF0aWMvaW1nL3BsYXllci92b2x1bWUtaGFsZi5zdmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVGdWxsQ2xhc3MoKTtcbiAgICAgIHRoaXMuX3ZvbHVtZS5pbWFnZS5zcmMgPSAnL3N0YXRpYy9pbWcvcGxheWVyL3ZvbHVtZS1mdWxsLnN2Zyc7XG4gICAgfVxuXG4gICAgaWYgKHZvbHVtZSA+IDk3ICYmIHZvbHVtZSA8PSAxMDApIHsgLy8gQWRkIGJvcmRlciByYWRpdXMgb24gcmlnaHQgc2lkZVxuICAgICAgdGhpcy5fdm9sdW1lLmN1cnJlbnQuY2xhc3NMaXN0LmFkZCgnZnVsbCcpO1xuICAgIH1cblxuICAgIC8vIEN1cnJlbnQgYW5kIHRodW1iIHVwZGF0ZVxuICAgIGlmICh0eXBlb2YgaXNNdXRlZCA9PT0gJ2Jvb2xlYW4nICYmIGlzTXV0ZWQgPT09IHRydWUpIHtcbiAgICAgIHZvbHVtZSA9IDA7XG4gICAgfSAvLyBUbyBzZXQgdm9sdW1lIGN1cnJlbnQgYW5kIHRodW1iIGF0IDAlIGxlZnQgd2hlbiBtdXRlZC5cbiAgICB0aGlzLl92b2x1bWUuY3VycmVudC5zdHlsZS53aWR0aCA9IGAke3ZvbHVtZX0lYDtcbiAgICB0aGlzLl92b2x1bWUudGh1bWIuc3R5bGUubGVmdCA9IGAke3ZvbHVtZX0lYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWb2x1bWVCYXI7XG4iLCJpbXBvcnQgQXNpZGVFbnRyeSBmcm9tICcuL0FzaWRlRW50cnkuanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBBc2lkZSB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBBIGNvbXBvbmVudHMgY29udGFpbmVyXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gQ2FuIGJlIGZpbGxlZCB3aXRoIHZhcmlvdXMgQXNpZGVFbnRyaWVzIGFuZCBpcyBtZWFudCB0byBiZSBib3RoIHNpZGVzIG9mIGEgTXprIHNjZW5lXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIEFzaWRlIG9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNpZGUgLSBUaGUgQXNpZGUgcG9zaXRpb24gb24gc2NyZWVuIChgbGVmdGAgb3IgYHJpZ2h0YCBvbmx5KVxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRvbSA9IHt9O1xuICAgIHRoaXMuX29wZW4gPSB7fTtcbiAgICB0aGlzLl9jbG9zZSA9IHt9O1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBQUklWQVRFIE1FVEhPRFMgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAvL1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIF9pbml0XG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBBc2lkZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEFzaWRlIGFjY29yZGluZyB0byBpdHMgc2lkZVxuICAgKiovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuZG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FzaWRlJyk7XG5cbiAgICB0aGlzLl9jbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhc2lkZS1jbG9zZScpO1xuICAgIHRoaXMuX29wZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXNpZGUtb3BlbicpO1xuXG4gICAgY29uc3QgYSA9IG5ldyBBc2lkZUVudHJ5KHtcbiAgICAgIHRpdGxlOiAnQ29udGVudCB0byBjb21lIHNvbWUgZGF5ISdcbiAgICB9KTtcbiAgICB0aGlzLmRvbS5hcHBlbmRDaGlsZChhLmdldERvbSgpKTtcblxuICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvdyA9IHRoaXMuc2hvdy5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfZXZlbnRzXG4gICAqIEBwcml2YXRlXG4gICAqIEBtZW1iZXJvZiBBc2lkZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBBc2lkZSBtb3VzZSBjbGljayBldmVudHMgKHNob3cgYW5kIGhpZGUpXG4gICAqKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl9jbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZSk7XG4gICAgdGhpcy5fb3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvdyk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgaGlkZVxuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBBc2lkZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhpZGUgdGhlIGFzaWRlIHdpdGggYW5pbWF0aW9uXG4gICAqKi9cbiAgaGlkZSgpIHtcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICB0aGlzLmRvbS5zdHlsZS5sZWZ0ID0gYC0keygodGhpcy5kb20ub2Zmc2V0V2lkdGggKiAxMDApIC8gdmlld3BvcnRXaWR0aCl9JWA7XG4gICAgdGhpcy5fY2xvc2Uuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5fb3Blbi5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICBtemsudmlldy5leHRlbmRNYWluQ29udGFpbmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBzaG93XG4gICAqIEBwdWJsaWNcbiAgICogQG1lbWJlcm9mIEFzaWRlXG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBTZXB0ZW1iZXIgMjAxOFxuICAgKiBAZGVzY3JpcHRpb24gU2hvdyB0aGUgYXNpZGUgd2l0aCBhbmltYXRpb25cbiAgICoqL1xuICBzaG93KCkge1xuICAgIHRoaXMuZG9tLnN0eWxlLmxlZnQgPSAwO1xuICAgIHRoaXMuX2Nsb3NlLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIHRoaXMuX29wZW4uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgbXprLnZpZXcucmV0cmFjdE1haW5Db250YWluZXIoKTtcbiAgfVxuXG4gIHRvZ2dsZUhpZGVTaG93KCkge1xuICAgIGlmICh0aGlzLmRvbS5zdHlsZS5sZWZ0ID09PSAnMHB4Jykge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBc2lkZTtcbiIsIid1c2Vfc3RyaWN0JztcblxuY2xhc3MgQXNpZGVFbnRyeSB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBBbiBlbnRyeSB0aGF0IGlzIG1lYW50IHRvIGJlIHVzZWQgYXMgYW4gQXNpZGUgY2hpbGRyZW5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBUT0RPXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIEFzaWRlRW50cnkgb3B0aW9ucyBvYmplY3RcbiAgICoqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy50aXRsZSA9IG9wdGlvbnMudGl0bGU7XG4gICAgdGhpcy5kb20gPSB7fTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAbmFtZSBfaW5pdFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAbWVtYmVyb2YgQXNpZGVFbnRyeVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEluaXQgdGhlIEFzaWRlRW50cnkgRE9NIGFuZCBmaWxsIGl0IHdpdGggaW5zdGFuY2UgYXR0cmlidXRlc1xuICAgKiovXG4gIF9pbml0KCkge1xuICAgIHRoaXMuZG9tLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnUCcpO1xuICAgIHRoaXMuZG9tLnRpdGxlLmlubmVySFRNTCA9IHRoaXMudGl0bGU7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIEdFVFRFUiBNRVRIT0RTICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgZ2V0RG9tKCkge1xuICAgIHJldHVybiB0aGlzLmRvbS50aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBc2lkZUVudHJ5O1xuIiwiaW1wb3J0IExpc3RWaWV3IGZyb20gJy4vdmlld3MvTGlzdFZpZXcuanMnO1xuJ3VzZV9zdHJpY3QnO1xuXG5jbGFzcyBTY2VuZSB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBNYW5hWmVhayBtYWluIHNjZW5lIHRvIHJlbmRlcnMgdmlld3MgaW5cbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBIYW5kbGUgdGhlIG1haW4gc2NlbmVcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zY2VuZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2VuZScpO1xuICAgIHRoaXMuX29wdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LW9wdGlvbicpO1xuICAgIC8vIFRPRE8gOiBhZGQgdGVzdCBmdW5jdGlvbiB0aGF0IHJlcGxhY2Ugc2NlbmUgd2l0aCBhIHNhbmRCb3ggdG8gd29yayB3aXRoXG5cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fb3B0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy52aWV3Lm9wdGlvbnNDbGlja2VkKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIFBVQkxJQyBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC8vXG5cbiAgc3RvcFBsYXliYWNrKCkge1xuICAgIHRoaXMudmlldy5yZW1vdmVQbGF5aW5nSWNvbigpOyAvLyBXYXJuaW5nLCB0aGlzIGlzIHNwZWNpZmljIHRvIGxpc3RWaWV3IHNvIGZhclxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQG5hbWUgYWRkVmlld1xuICAgKiBAcHVibGljXG4gICAqIEBtZW1iZXJvZiBTY2VuZVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEFkZCBhIG5ldyB2aWV3IGluIHRoZSBzY2VuZSAob25seSBhcHBlbmQgdGhlIERPTSBlbGVtZW50KVxuICAgKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIFRoZSBET00gbm9kZSB0byBhcHBlbmQgdG8gdGhlIHNjZW5lXG4gICAqKi9cbiAgYWRkVmlldyhub2RlKSB7XG4gICAgLy8gVE9ETyA6IGNsZWFyIGV4aXN0aW5nIG1hdGVyaWFsXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgdGhpcy5fc2NlbmUuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICB9XG5cbiAgZXh0ZW5kKCkge1xuICAgIHRoaXMuX3NjZW5lLmNsYXNzTGlzdC5hZGQoJ2V4dGVuZGVkJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXcucmVmcmVzaFZpZXcoKTtcbiAgICB9LCA4MDApOyAvLyBWYWx1ZSBtdXN0IG1hdGNoIDQgdGltZXMgdGhlICR0cmFuc2l0aW9uLWR1cmF0aW9uIHZhciBpbiBzY3NzL3V0aWxzL3Rvb2xzL192YXJpYWJsZXMuc2Nzc1xuICB9XG5cbiAgcmV0cmFjdCgpIHtcbiAgICB0aGlzLl9zY2VuZS5jbGFzc0xpc3QucmVtb3ZlKCdleHRlbmRlZCcpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXcucmVmcmVzaFZpZXcoKTtcbiAgICB9LCA4MDApOyAvLyBWYWx1ZSBtdXN0IG1hdGNoIDQgdGltZXMgdGhlICR0cmFuc2l0aW9uLWR1cmF0aW9uIHZhciBpbiBzY3NzL3V0aWxzL3Rvb2xzL192YXJpYWJsZXMuc2Nzc1xuICB9XG5cbiAgdG9nZ2xlRXh0ZW5zaW9uKCkge1xuICAgIGlmICh0aGlzLl9zY2VuZS5jbGFzc0xpc3QuY29udGFpbnMoJ2V4dGVuZGVkJykpIHtcbiAgICAgIHRoaXMucmV0cmFjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4dGVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBuYW1lIHVwZGF0ZVZpZXdcbiAgICogQHB1YmxpY1xuICAgKiBAbWVtYmVyb2YgU2NlbmVcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgdGhlIGN1cnJlbnQgdmlldyB3aXRoIHRoZSBnaXZlbiBwbGF5bGlzdFxuICAgKiBAcGFyYW0ge29iamVjdH0gcGxheWxpc3QgLSBUaGUgcGxheWxpc3QgdG8gdXBkYXRlIHRoZSB2aWV3IHdpdGhcbiAgICoqL1xuICB1cGRhdGVWaWV3KHBsYXlsaXN0KSB7XG4gICAgY29uc3QgYXJ0aXN0cyA9IHBsYXlsaXN0LmdldEFydGlzdHMoKTtcbiAgICBjb25zdCB0cmFja3MgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJ0aXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnRpc3RzW2ldLmFsYnVtcy5sZW5ndGg7ICsraikge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGFydGlzdHNbaV0uYWxidW1zW2pdLnRyYWNrcy5sZW5ndGg7ICsraykge1xuICAgICAgICAgIHRyYWNrcy5wdXNoKGFydGlzdHNbaV0uYWxidW1zW2pdLnRyYWNrc1trXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICBuYW1lOiAnRHVyYXRpb24nLFxuICAgICAgICAgIG9yZGVyOiAwLFxuICAgICAgICAgIHdpZHRoOiAnMTAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnVGl0bGUnLFxuICAgICAgICAgIG9yZGVyOiAxLFxuICAgICAgICAgIHdpZHRoOiAnMjAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnQXJ0aXN0JyxcbiAgICAgICAgICBvcmRlcjogMixcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0NvbXBvc2VyJyxcbiAgICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1BlcmZvcm1lcicsXG4gICAgICAgICAgb3JkZXI6IDQsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdBbGJ1bScsXG4gICAgICAgICAgb3JkZXI6IDUsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdHZW5yZScsXG4gICAgICAgICAgb3JkZXI6IDYsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHRhcmdldDogdGhpcy5fc2NlbmUsXG4gICAgICBhdmFpbGFibGVDb2x1bW5zOiBbIC8vIFRPRE8gOiBzdG9yZSB0aGlzIGluIGEgZGVmYXVsdC5qc29uIGZpbGUgc29tZXdoZXJlXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnRHVyYXRpb24nLFxuICAgICAgICAgIG9yZGVyOiAwLFxuICAgICAgICAgIHdpZHRoOiAnMTAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnVGl0bGUnLFxuICAgICAgICAgIG9yZGVyOiAxLFxuICAgICAgICAgIHdpZHRoOiAnMjAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnQXJ0aXN0JyxcbiAgICAgICAgICBvcmRlcjogMixcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0NvbXBvc2VyJyxcbiAgICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgICB3aWR0aDogJzE0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1BlcmZvcm1lcicsXG4gICAgICAgICAgb3JkZXI6IDQsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdBbGJ1bScsXG4gICAgICAgICAgb3JkZXI6IDUsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdHZW5yZScsXG4gICAgICAgICAgb3JkZXI6IDYsXG4gICAgICAgICAgd2lkdGg6ICcxNCdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLnZpZXcgPSBuZXcgTGlzdFZpZXcob3B0aW9ucyk7IC8vIFRPRE8gOiBtb3ZlIHRoaXNcbiAgICB0aGlzLmFkZFZpZXcodGhpcy52aWV3LmdldERPTUZyYWdtZW50KCkpO1xuICAgIHRoaXMudmlldy5hZGRUcmFja3ModHJhY2tzKTtcbi8qXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXcuY2VudGVyT24oMik7XG4gICAgfSwgNTAwKTtcbiovXG4gIH1cblxuICBjaGFuZ2VUcmFjayhpZCkge1xuICAgIHRoaXMudmlldy5jaGFuZ2VUcmFjayhpZCk7XG4gIH1cblxuICBnZXROZXh0VHJhY2tJZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldE5leHRUcmFja0lkKCk7XG4gIH1cblxuICBnZXRQcmV2aW91c1RyYWNrSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRQcmV2aW91c1RyYWNrSWQoKTtcbiAgfVxuXG4gIGlzTGFzdFRyYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuaXNMYXN0VHJhY2soKTtcbiAgfVxuXG4gIHN0YXJ0TG9hZGluZygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICBzcGlubmVyLmlkID0gJ2xvYWRpbmctc3Bpbm5lcic7XG4gICAgICB0aGlzLl9zY2VuZS5hcHBlbmRDaGlsZChzcGlubmVyKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9LCA1MCk7IC8vIEVuc3VyZSBzcGlubmVyIGhhcyBzdGFydGVkIGl0cyBhbmltYXRpb24gYmVmb3JlIHJlc29sdmluZyB0aGUgcHJvbWlzZVxuICAgIH0pO1xuICB9XG5cbiAgc3RvcExvYWRpbmcoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjb25zdCBzcGlubmVyID0gdGhpcy5fc2NlbmUucXVlcnlTZWxlY3RvcihcIiNsb2FkaW5nLXNwaW5uZXJcIik7XG4gICAgICAgIGlmIChzcGlubmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lLnJlbW92ZUNoaWxkKHNwaW5uZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2VuZTtcbiIsImltcG9ydCBMaXN0Vmlld0VudHJ5IGZyb20gJy4vTGlzdFZpZXdFbnRyeSc7XG5pbXBvcnQgU2Nyb2xsQmFyIGZyb20gJy4uLy4uLy4uL3V0aWxzL1Njcm9sbEJhci5qcyc7XG4ndXNlIHN0cmljdCc7XG5cbmNsYXNzIExpc3RWaWV3IHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IExpc3RWaWV3IGZvciBtemsgU2NlbmVcbiAgICogQGF1dGhvciBBcnRodXIgQmVhdWxpZXVcbiAgICogQHNpbmNlIFNlcHRlbWJlciAyMDE4XG4gICAqIEBkZXNjcmlwdGlvbiBMaXN0VmlldyB0aGF0IGRpc3BsYXkgdHJhY2tzIHdpdGggY3VzdG9taXphYmxlIGNvbHVtbnMgKHNpemUgYW5kIHR5cGUpIGluIHJvd3NcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgTGlzdFZpZXcgb3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHthcnJheX0gb3B0aW9ucy5hdmFpbGFibGVDb2x1bW5zIC0gVGhlIExpc3RWaWV3IGF2YWlsYWJsZSBjb2x1bW4gKG5vdCBuZWNlc3Nhcmx5IHRoZSBvbmVzIHRoYXQgYXJlIGRpc3BsYXllZClcbiAgICogQHBhcmFtIHthcnJheX0gb3B0aW9ucy5jb2x1bW5zIC0gVGhlIHVzZXIgY29sdW1uc1xuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy50YXJnZXQgLSBUaGUgRE9NIHRhcmdldCBub2RlIHRvIGluamVjdCBMaXN0VmlldyBpbiAodXN1YWxseSBtemsgU2NlbmUpXG4gICAqKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuX2F2YWlsYWJsZUNvbHVtbnMgPSBvcHRpb25zLmF2YWlsYWJsZUNvbHVtbnM7XG4gICAgdGhpcy5fY29sdW1ucyA9IG9wdGlvbnMuY29sdW1ucztcbiAgICB0aGlzLl90cmFja3MgPSBbXTtcbiAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLnRhcmdldDtcbiAgICB0aGlzLl9zY3JvbGxCYXIgPSB7fTtcbiAgICB0aGlzLl9kb20gPSB7XG4gICAgICBmcmFnbWVudDoge30sXG4gICAgICB3cmFwcGVyOiB7fSxcbiAgICAgIGhlYWRlcjoge30sXG4gICAgICBjb250YWluZXI6IHt9XG4gICAgfTtcblxuICAgIHRoaXMuX2RyYWdnZWRDb2x1bW4gPSBudWxsO1xuICAgIHRoaXMuX3NlbGVjdGlvbiA9IFtdO1xuICAgIHRoaXMuX2NsaWNrID0geyAvLyBPYmplY3QgdG8gaGFuZGxlIGNsaWNrIGV2ZW50cyBvbiB0cmFjayBlbnRyaWVzXG4gICAgICBkYmNsaWNrOiBmYWxzZSxcbiAgICAgIHRhcmdldElkOiAtMSxcbiAgICAgIHRpbWVvdXRJZDogLTFcbiAgICB9O1xuXG4gICAgdGhpcy5fcGxheWluZ1RyYWNrSW5kZXggPSAtMTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgUFJJVkFURSBNRVRIT0RTICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLy9cblxuICBfaW5pdCgpIHtcbiAgICB0aGlzLl9kb20uZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdGhpcy5fZG9tLndyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0aGlzLl9kb20uaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgdGhpcy5fZG9tLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXG4gICAgdGhpcy5fZG9tLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGlzdHZpZXcnKTtcbiAgICB0aGlzLl9kb20uaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuICAgIHRoaXMuX2RvbS5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgndHJhY2stY29udGFpbmVyJyk7XG4gICAgdGhpcy5fdGFyZ2V0LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuICAgIHRoaXMuX2RvbS53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuX2RvbS5oZWFkZXIpO1xuICAgIHRoaXMuX2RvbS53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuX2RvbS5jb250YWluZXIpO1xuICAgIHRoaXMuX2RvbS5mcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9kb20ud3JhcHBlcik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2luaXRIZWFkZXIoKTtcbiAgICB9LCAwKTsgLy8gV2FpdCB0aGF0IGhlYWRlciBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRE9NXG4gIH1cblxuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2RvbS5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3RyYWNrQ2xpY2tlZChldmVudCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnVuc2VsZWN0QWxsKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4odGhpcy5fY29tcHV0ZUdyaWRUZW1wbGF0ZUNvbHVtbnMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBfdHJhY2tDbGlja2VkKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIEJsb2NrIHdpbmRvdyBjbGljayBsaXN0ZW5lclxuXG4gICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmlkO1xuXG4gICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgdGhpcy51bnNlbGVjdEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY2xpY2suZGJjbGljayB8fCB0aGlzLl9jbGljay50YXJnZXRJZCAhPT0gdGFyZ2V0SWQpIHsgLy8gU2Vjb25kIHRlc3QgZm9yY2UgZGJjbGljayB0byBvY2N1ciBvbiBzYW1lIHRyYWNrXG4gICAgICB0aGlzLl9jbGljay5kYmNsaWNrID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NsaWNrLnRhcmdldElkID0gdGFyZ2V0SWQ7XG5cbiAgICAgIGlmICghZXZlbnQuY3RybEtleSkgeyAvLyBTaW1wbGUgY2xpY2sgdW5zZWxlY3RzIGFsbFxuICAgICAgICBjb25zdCBpc1RhcmdldFNlbGVjdGVkID0gdGhpcy5fdHJhY2tzW3RhcmdldElkXS5nZXRJc1NlbGVjdGVkKCk7IC8vIFNhdmluZyB0YXJnZXQgc2VsZWN0aW9uIHN0YXRlIGJlZm9yZSB1bnNlbGVjdGluZyBhbGxcbiAgICAgICAgdGhpcy51bnNlbGVjdEFsbCgpO1xuICAgICAgICB0aGlzLl90cmFja3NbdGFyZ2V0SWRdLnNldFNlbGVjdGVkKGlzVGFyZ2V0U2VsZWN0ZWQpOyAvLyBSZXN0b3JlIHByZXZpb3VzIHN0YXRlIHRvIHByb3Blcmx5IHVzZSBpbiBOb3JtYWwgY2xpY2sgYmVoYXZpb3IgY29uZGl0aW9uXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5wdXNoKHBhcnNlSW50KHRhcmdldElkLCAxMCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5zaGlmdEtleSAmJiB0aGlzLl9zZWxlY3Rpb24ubGVuZ3RoID4gMCkgeyAvLyBDdHJsICsgU2hpZnQgKyBDbGljayA6IGZpbGwgc2VsZWN0aW9uIGluIGJldHdlZW4gdGFyZ2V0IGFuZCBjbG9zZXN0IHNlbGVjdGlvbmVkIHRyYWNrXG4gICAgICAgIG16ay52aWV3LnN0YXJ0TG9hZGluZygpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETyA6IGRpZmbDqXJlbmNlIGVudHJlIHRhcmdldCBldCBsZSBkZXJuaWVyIGVuZHJvaXQgb3Ugb24gY2xpY2tcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICAgICAgICBsZXQgZW5kID0gMDtcblxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRhcmdldElkLCAxMCkgPCB0aGlzLl9zZWxlY3Rpb25bMF0pIHsgLy8gQ29tcGFyZSB0byB0aGlzLl9zZWxlY3Rpb25bMF0gc2luY2UgdGhpcy5fc2VsZWN0aW9uIGlzIGFsd2F5cyBvcmRlcmVkXG4gICAgICAgICAgICAgIHN0YXJ0ID0gcGFyc2VJbnQodGFyZ2V0SWQsIDEwKTtcbiAgICAgICAgICAgICAgZW5kID0gdGhpcy5fc2VsZWN0aW9uWzBdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJzZUludCh0YXJnZXRJZCwgMTApID4gdGhpcy5fc2VsZWN0aW9uW3RoaXMuX3NlbGVjdGlvbi5sZW5ndGggLSAxXSkgeyAvLyBTYW1lIGhlcmUgd2l0aCBncmVhdGVyIGluZGV4IGluIHRoaXMuX3NlbGVjdGlvblxuICAgICAgICAgICAgICBzdGFydCA9IHRoaXMuX3NlbGVjdGlvblt0aGlzLl9zZWxlY3Rpb24ubGVuZ3RoIC0gMV0gKyAxOyAvLyArMSAgdG8gYXZvaWQgZmlyc3QgaXRlbSByZXBldGl0aW9uXG4gICAgICAgICAgICAgIGVuZCA9IHBhcnNlSW50KHRhcmdldElkLCAxMCkgKyAxOyAvLyArMSB0byBub3QgZm9yZ2V0IHRoZSB0YXJnZXRJZCB0b29cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHsgLy8gTG9vcCB0byBmaWxsIGluIGJldHdlZW4gaXRlbXNcbiAgICAgICAgICAgICAgdGhpcy5fdHJhY2tzW2ldLnNldFNlbGVjdGVkKHRydWUpO1xuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24ucHVzaChpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7IC8vIE5vcm1hbCBjbGljayBiZWhhdmlvclxuICAgICAgICBtemsudmlldy5zdGFydExvYWRpbmcoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmFja3NbdGFyZ2V0SWRdLmdldElzU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgICB0aGlzLl90cmFja3NbdGFyZ2V0SWRdLnNldFNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnNwbGljZSh0aGlzLl9zZWxlY3Rpb24uaW5kZXhPZih0YXJnZXRJZCksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fdHJhY2tzW3RhcmdldElkXS5zZXRTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnB1c2gocGFyc2VJbnQodGFyZ2V0SWQsIDEwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NsaWNrLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbGljay5kYmNsaWNrID0gZmFsc2U7XG4gICAgICB9LCAzMDApOyAvLyBEb3VibGUgY2xpY2sgc3BlZWQgbG93ZXIgdGhhbiAzMDBtc1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fY2xpY2sudGltZW91dElkKTtcbiAgICAgIHRoaXMucmVtb3ZlUGxheWluZ0ljb24oKTtcbiAgICAgIHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uc2V0U2VsZWN0ZWQodHJ1ZSk7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24ucHVzaChwYXJzZUludCh0YXJnZXRJZCwgMTApKTtcbiAgICAgIG16ay5jaGFuZ2VUcmFjayh0aGlzLl90cmFja3NbdGFyZ2V0SWRdLmlkKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWxlY3Rpb24uc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIChhIC0gYik7XG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VUcmFjayhpZCkge1xuICAgIGxldCB0YXJnZXRJZCA9IDA7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLl90cmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLl90cmFja3NbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgIHRhcmdldElkID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcGxheWluZ1RyYWNrSW5kZXggIT09IC0xID8gdGhpcy5fdHJhY2tzW3RoaXMuX3BsYXlpbmdUcmFja0luZGV4XS5zZXRQbGF5aW5nKGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLl9wbGF5aW5nVHJhY2tJbmRleCA9IHRhcmdldElkO1xuICAgICAgICB0aGlzLl9jbGljay5kYmNsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RyYWNrc1t0YXJnZXRJZF0uc2V0UGxheWluZyh0cnVlKTtcbiAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb3B0aW9uc0NsaWNrZWQoKSB7XG4gICAgbGV0IGxpc3RWaWV3Q29udGV4dCA9IHRoaXMuX3RhcmdldC5xdWVyeVNlbGVjdG9yKCcjbGlzdHZpZXctY29udGV4dCcpO1xuXG4gICAgaWYgKGxpc3RWaWV3Q29udGV4dCAhPT0gbnVsbCkgeyAvLyBDbG9zZSBjb250ZXh0XG4gICAgICBsaXN0Vmlld0NvbnRleHQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGFwcGVuZCBjb250ZXh0LCBhbmQgZmlsbCBpdCB3aXRoIGl0cyBjb250ZW50XG4gICAgbGV0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3RyYW5zcGFyZW50LW92ZXJsYXknKTtcbiAgICBvdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcjbGlzdHZpZXctY29udGV4dCcpKSB7XG4gICAgICAgIGxpc3RWaWV3Q29udGV4dC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sIHRydWUpO1xuXG4gICAgbGlzdFZpZXdDb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgbGlzdFZpZXdDb250ZXh0LmlkID0gJ2xpc3R2aWV3LWNvbnRleHQnO1xuXG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZChsaXN0Vmlld0NvbnRleHQpO1xuICAgIHRoaXMuX3RhcmdldC5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgICB0aGlzLl9maWxsT3B0aW9uc0NvbnRleHQobGlzdFZpZXdDb250ZXh0KTtcbiAgfVxuXG4gIF9maWxsT3B0aW9uc0NvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnN0IGFjdGl2YXRlZENvbHVtbnMgPSB0aGlzLl9jaGVja0FjdGl2YXRlZENvbHVtbnMoKTtcblxuICAgIGNvbnN0IGNoZWNrQm94ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICBjaGVja0JveGVzLmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94LWNvbnRhaW5lcicpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdmFpbGFibGVDb2x1bW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnTEFCRUwnKTtcbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcblxuICAgICAgaW5wdXQuaWQgPSAnY29udGV4dC0nICsgdGhpcy5fYXZhaWxhYmxlQ29sdW1uc1tpXS5uYW1lO1xuICAgICAgdGV4dC5pbm5lckhUTUwgPSB0aGlzLl9hdmFpbGFibGVDb2x1bW5zW2ldLm5hbWU7XG4gICAgICB0ZXh0LnNldEF0dHJpYnV0ZSgnZm9yJywgYGNvbnRleHQtJHt0aGlzLl9hdmFpbGFibGVDb2x1bW5zW2ldLm5hbWV9YCk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcblxuICAgICAgaWYgKGFjdGl2YXRlZENvbHVtbnMuaW5kZXhPZih0aGlzLl9hdmFpbGFibGVDb2x1bW5zW2ldLm5hbWUpICE9PSAtMSkge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5pZC5tYXRjaCgvLSguKikvKVsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gJyc7XG5cbiAgICAgICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2F2YWlsYWJsZUNvbHVtbnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2F2YWlsYWJsZUNvbHVtbnNbal0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy5fYXZhaWxhYmxlQ29sdW1uc1tqXS53aWR0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlQ29sdW1uKHtcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgY2hlY2tCb3hlcy5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICBjaGVja0JveGVzLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIH1cblxuICAgIGNvbnRleHQuYXBwZW5kQ2hpbGQoY2hlY2tCb3hlcyk7XG5cbiAgICBjb25zdCBzdHJldGNoQWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XG4gICAgc3RyZXRjaEFsbC5pbm5lckhUTUwgPSAnU3RyZXRjaCBBbGwgQ29sdW1ucyc7XG4gICAgY29udGV4dC5hcHBlbmRDaGlsZChzdHJldGNoQWxsKTtcblxuICAgIHN0cmV0Y2hBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5fc3RyZXRjaEFsbENvbHVtbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9pbml0SGVhZGVyKCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuX2RvbS5oZWFkZXIuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IHRoaXMuX2NvbXB1dGVHcmlkVGVtcGxhdGVDb2x1bW5zKCk7IC8vIEFzc2lnbiBDU1MgcnVsZVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7IC8vIEZpbGwgaGVhZGVyIHdpdGggdXNlcidzIGNvbHVtbnNcbiAgICAgIHRoaXMuX2NvbHVtbnNbaV0ub3JkZXIgPSBpOyAvLyBBc3NpZ24gY29sdW1uIG9yZGVyXG5cbiAgICAgIGNvbnN0IGNvbHVtbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgY29uc3Qgc3RyZXRjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xuICAgICAgY29uc3QgcmVzaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cbiAgICAgIGNvbHVtbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2NvbHVtbnNbaV0ubmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGNvbHVtbi5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgICBjb2x1bW4uaW5uZXJIVE1MID0gdGhpcy5fY29sdW1uc1tpXS5uYW1lO1xuICAgICAgY29sdW1uLmRhdGFzZXQuaWQgPSBpO1xuXG4gICAgICBzdHJldGNoLmNsYXNzTGlzdC5hZGQoJ2xpc3R2aWV3LXN0cmV0Y2gtYnV0dG9uJyk7XG4gICAgICBzdHJldGNoLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XG4gICAgICBzdHJldGNoLnNyYyA9ICcvc3RhdGljL2ltZy9hY3Rpb25zL3N0cmV0Y2gteC5zdmcnOyAvLyBUT0RPIGV4cGFuZCBzdmcgKGxlZnQgcmlnaHQgYXJyb3cpO1xuXG4gICAgICByZXNpemUuY2xhc3NMaXN0LmFkZCgnbGlzdHZpZXctcmVzaXplLWhhbmRsZScpO1xuXG4gICAgICBjb2x1bW4uYXBwZW5kQ2hpbGQocmVzaXplKTtcbiAgICAgIGNvbHVtbi5hcHBlbmRDaGlsZChzdHJldGNoKTtcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbHVtbik7XG4gICAgICAvLyBBZGQgaGVhZGVyIGV2ZW50cyA6IERyYWcnbidEcm9wLCByZXNpemUgYW5kIHN0cmV0Y2ggc2VsZlxuICAgICAgdGhpcy5faGFuZGxlRHJhZ0V2ZW50cyhjb2x1bW4pO1xuICAgICAgdGhpcy5faGFuZGxlUmVzaXplRXZlbnRzKHJlc2l6ZSk7XG4gICAgICBzdHJldGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuX3N0cmV0Y2hDb2x1bW4oZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZG9tLmhlYWRlci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cblxuICBfaGFuZGxlUmVzaXplRXZlbnRzKGhhbmRsZSkge1xuICAgIGNvbnN0IHBhcmVudCA9IGhhbmRsZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IG1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgIGxldCBncmFiYmVkID0gZmFsc2U7XG5cbiAgICBjb25zdCByZXNpemUgPSBldmVudCA9PiB7XG4gICAgICBncmFiYmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2RvbS53cmFwcGVyLmFwcGVuZENoaWxkKG1hcmtlcik7XG4gICAgICBwYXJlbnQuc3R5bGUud2lkdGggPSBgJHsoZXZlbnQuY2xpZW50WCkgLSAocGFyZW50Lm9mZnNldExlZnQgKyB0aGlzLl90YXJnZXQub2Zmc2V0TGVmdCl9cHhgO1xuICAgICAgbWFya2VyLnN0eWxlLmxlZnQgPSBgJHtldmVudC5jbGllbnRYIC0gdGhpcy5fdGFyZ2V0Lm9mZnNldExlZnQgLSAxfXB4YDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcFJlc2l6aW5nID0gZXZlbnQgPT4ge1xuICAgICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgcmVzaXplLCBmYWxzZSk7XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXppbmcsIGZhbHNlKTtcblxuICAgICAgICAgIGlmIChncmFiYmVkKSB7XG4gICAgICAgICAgICBncmFiYmVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kb20ud3JhcHBlci5yZW1vdmVDaGlsZChtYXJrZXIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9jb2x1bW5zW2ldLm5hbWUgPT09IHBhcmVudC5pbm5lckhUTUwubWF0Y2goLy4qPyg/PTxkaXZ8JCkvaSlbMF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2ldLndpZHRoID0gKHBhcmVudC5zdHlsZS53aWR0aC5zbGljZSgwLCAtMikgKiAxMDAgLyB0aGlzLl9kb20ud3JhcHBlci5jbGllbnRXaWR0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sdW1uc1tpXS53aWR0aCA9IHRoaXMuX2NvbHVtbnNbaV0ud2lkdGgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX3JlZnJlc2hHcmlkQ29sdW1uKHRoaXMuX2NvbXB1dGVHcmlkVGVtcGxhdGVDb2x1bW5zKCkpO1xuICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBpbml0UmVzaXplID0gZXZlbnQgPT4ge1xuICAgICAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCByZXNpemUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcFJlc2l6aW5nLCBmYWxzZSk7XG4gICAgfTtcblxuICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBpbml0UmVzaXplLCBmYWxzZSk7XG4gICAgbWFya2VyLmlkID0gJ2xpc3R2aWV3LXJlc2l6ZS1tYXJrZXInO1xuICB9XG5cbiAgX2hhbmRsZURyYWdFdmVudHMoY29sdW1uKSB7XG4gICAgY29uc3QgZHJhZ1N0YXJ0ID0gZSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBBYm9ydCBkcmFnLCByZXNpemUgZXZlbnQgaXMgb2NjdXJpbmdcbiAgICAgIHRoaXMuX2RyYWdnZWRDb2x1bW4gPSBlLnRhcmdldDsgLy8gU3RvcmUgZHJhZyBzdGFydCBjb2x1bW5cbiAgICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L2h0bWwnLCBlLnRhcmdldC5vdXRlckhUTUwpO1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ0VsZW0nKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZHJhZ092ZXIgPSBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gQWJvcnQgZHJhZywgcmVzaXplIGV2ZW50IGlzIG9jY3VyaW5nXG4gICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gLy8gTmVjZXNzYXJ5LiBBbGxvd3MgdXMgdG8gZHJvcC5cbiAgICAgIGlmICh0aGlzLl9kcmFnZ2VkQ29sdW1uICE9PSBldmVudC50YXJnZXQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ292ZXInKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnOyAvLyBTZWUgdGhlIHNlY3Rpb24gb24gdGhlIERhdGFUcmFuc2ZlciBvYmplY3QuXG4gICAgfTtcblxuICAgIGNvbnN0IGRyYWdMZWF2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7IC8vIHRoaXMgLyBlLnRhcmdldCBpcyBwcmV2aW91cyB0YXJnZXQgZWxlbWVudC5cbiAgICB9O1xuXG4gICAgY29uc3QgZHJhZ0VuZCA9IGV2ZW50ID0+IHtcbiAgICAgIC8vIHRoaXMvZS50YXJnZXQgaXMgdGhlIHNvdXJjZSBub2RlLlxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXInKTtcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnRWxlbScpO1xuICAgIH07XG5cbiAgICBjb25zdCBkcm9wID0gZXZlbnQgPT4ge1xuICAgICAgLy8gdGhpcy9lLnRhcmdldCBpcyBjdXJyZW50IHRhcmdldCBlbGVtZW50LlxuICAgICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0gLy8gU3RvcHMgc29tZSBicm93c2VycyBmcm9tIHJlZGlyZWN0aW5nLlxuXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuXG4gICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBkcm9wcGluZyB0aGUgc2FtZSBjb2x1bW4gd2UncmUgZHJhZ2dpbmcuXG4gICAgICBpZiAodGhpcy5fZHJhZ2dlZENvbHVtbiAhPT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZWVuZCcsIGRyYWdFbmQsIGZhbHNlKTtcbiAgICAgICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0uaW5zZXJ0QmVmb3JlKHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzW3RoaXMuX2RyYWdnZWRDb2x1bW4uZGF0YXNldC5pZF0sIHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzW2V2ZW50LnRhcmdldC5kYXRhc2V0LmlkXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9kcmFnZ2VkQ29sdW1uLmRhdGFzZXQuaWQgPCBldmVudC50YXJnZXQuZGF0YXNldC5pZCkge1xuICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5zLm1vdmUodGhpcy5fZHJhZ2dlZENvbHVtbi5kYXRhc2V0LmlkLCBldmVudC50YXJnZXQuZGF0YXNldC5pZCAtIDEpOyAvLyBTaW5jZSB3ZSBzcGxpY2UgaW4gbW92ZSwgd2UgbmVlZCB0byBzaW11bGF0ZSBpbnNlcnRcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIE5vIG5lZWQgdG8gdGVzdCBpZCBlcXVhbGl0eSBzaW5jZSBzZWxmLWRyb3AgaXMgcHJldmVudGVkIDogdGhhdC5fZHJhZ2dlZENvbHVtbiAhPT0gdGhpc1xuICAgICAgICAgICAgICB0aGlzLl9jb2x1bW5zLm1vdmUodGhpcy5fZHJhZ2dlZENvbHVtbi5kYXRhc2V0LmlkLCBldmVudC50YXJnZXQuZGF0YXNldC5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RyYWdnZWRDb2x1bW4gPSBudWxsOyAvLyBNdXN0IGJlIGRvbmUgYWZ0ZXIgY29sdW1uIG1vdmVtZW50IGluIGdyaWRcbiAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hHcmlkQ29sdW1uKCk7XG4gICAgICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZHJhZ2dlZENvbHVtbiA9IG51bGw7IC8vXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBkcmFnU3RhcnQsIGZhbHNlKTtcbiAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3ZlciwgZmFsc2UpO1xuICAgIGNvbHVtbi5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUsIGZhbHNlKTtcbiAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3AsIGZhbHNlKTtcbiAgICBjb2x1bW4uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGRyYWdFbmQsIGZhbHNlKTtcbiAgfVxuXG4gIF9jb21wdXRlR3JpZFRlbXBsYXRlQ29sdW1ucygpIHtcbiAgICBsZXQgZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICcnOyAvLyBDU1MgZ3JpZCBydWxlXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHsgLy8gSW5pdCBsaXN0dmlldyBoZWFkZXIgYW5kIENTUyBncmlkIGNvbHVtbnMgcnVsZVxuICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1ucyArPSBgJHsodGhpcy5fY29sdW1uc1tpXS53aWR0aCAqICh0aGlzLl9kb20ud3JhcHBlci5jbGllbnRXaWR0aCAvIDEwMCkpfXB4IGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyaWRUZW1wbGF0ZUNvbHVtbnM7XG4gIH1cblxuICBfcmVmcmVzaEhlYWRlcihncmlkVGVtcGxhdGVDb2x1bW5zKSB7XG4gICAgdGhpcy5fZG9tLmhlYWRlci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gZ3JpZFRlbXBsYXRlQ29sdW1ucztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7ICsraSkgeyAvLyBJbml0IGxpc3R2aWV3IGhlYWRlclxuICAgICAgdGhpcy5fY29sdW1uc1tpXS5vcmRlciA9IGk7IC8vIFJlZnJlc2ggY29sdW1ucyBvcmRlclxuXG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9kb20uaGVhZGVyLmNoaWxkTm9kZXNbaV07XG4gICAgICBjb2x1bW4uc3R5bGUgPSAnJzsgLy8gUmVtb3ZlIG9sZCByZW1haW5pbmcgd2lkdGggc3R5bGUgdmFsdWVcbiAgICAgIGNvbHVtbi5jbGFzc05hbWUgPSB0aGlzLl9jb2x1bW5zW2ldLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbHVtbi5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSA9IHRoaXMuX2NvbHVtbnNbaV0ubmFtZTsgLy8gRG9uJ3QgaW5uZXJIVE1MIHRvIGF2b2lkIHJlbW92ZSBvZiBzdHJldGNoIGFuZCByZXNpemUgaGFuZGxlcy4gY2hpbGROb2Rlc1swXSBpcyAjdGV4dCBub2RlXG4gICAgICBjb2x1bW4uZGF0YXNldC5pZCA9IGk7XG4gICAgfVxuICB9XG5cbiAgLy8gZ3JpZFRlbXBsYXRlQ29sdW1ucyBvcHRpb25uYWwgKGN1c3RvbSBzZXQgb3Igc2VsZiBzZXQpXG4gIF9yZWZyZXNoR3JpZENvbHVtbihncmlkVGVtcGxhdGVDb2x1bW5zKSB7XG4gICAgaWYgKCFncmlkVGVtcGxhdGVDb2x1bW5zKSB7XG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zID0gdGhpcy5fY29tcHV0ZUdyaWRUZW1wbGF0ZUNvbHVtbnMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWZyZXNoSGVhZGVyKGdyaWRUZW1wbGF0ZUNvbHVtbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gZ3JpZFRlbXBsYXRlQ29sdW1ucztcbiAgICB9XG4gIH1cblxuICBfY2hlY2tBY3RpdmF0ZWRDb2x1bW5zKCkge1xuICAgIGNvbnN0IGFjdGl2YXRlZENvbHVtbnMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7ICsraSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9hdmFpbGFibGVDb2x1bW5zLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2x1bW5zW2ldLm5hbWUgPT09IHRoaXMuX2F2YWlsYWJsZUNvbHVtbnNbal0ubmFtZSkge1xuICAgICAgICAgIGFjdGl2YXRlZENvbHVtbnMucHVzaCh0aGlzLl9jb2x1bW5zW2ldLm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGl2YXRlZENvbHVtbnM7XG4gIH1cblxuICBfYWRkQ29sdW1uKGNvbHVtbikge1xuICAgIGlmICh0aGlzLl9jaGVja0FjdGl2YXRlZENvbHVtbnMoKS5pbmRleE9mKGNvbHVtbi5uYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX2NvbHVtbnMucHVzaCh7XG4gICAgICAgIG5hbWU6IGNvbHVtbi5uYW1lLFxuICAgICAgICB3aWR0aDogY29sdW1uLndpZHRoXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4oKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgY29sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgIGNvbC5jbGFzc0xpc3QuYWRkKGNvbHVtbi5uYW1lLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGlmIChjb2x1bW4ubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnZHVyYXRpb24nKSB7XG4gICAgICAgICAgY29sLmlubmVySFRNTCA9IFV0aWxzLnNlY29uZHNUb1RpbWVjb2RlKHRoaXMuX3RyYWNrc1t0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0uZGF0YXNldC5pZF0uZ2V0KGNvbHVtbi5uYW1lLnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2wuaW5uZXJIVE1MID0gdGhpcy5fdHJhY2tzW3RoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5kYXRhc2V0LmlkXS5nZXQoY29sdW1uLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0uYXBwZW5kQ2hpbGQoY29sKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcmVtb3ZlQ29sdW1uKGNvbHVtbikge1xuICAgIGZvciAobGV0IGkgPSB0aGlzLl9jb2x1bW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICBpZiAodGhpcy5fY29sdW1uc1tpXS5uYW1lID09PSBjb2x1bW4ubmFtZSkge1xuICAgICAgICB0aGlzLl9jb2x1bW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4oKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5jaGlsZE5vZGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlc1tqXS5jbGFzc0xpc3QuY29udGFpbnMoY29sdW1uLm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICB0aGlzLl9kb20uY29udGFpbmVyLmNoaWxkTm9kZXNbaV0ucmVtb3ZlQ2hpbGQodGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3RvZ2dsZUNvbHVtbihjb2x1bW4pIHtcbiAgICBpZiAodGhpcy5fY2hlY2tBY3RpdmF0ZWRDb2x1bW5zKCkuaW5kZXhPZihjb2x1bW4ubmFtZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLl9hZGRDb2x1bW4oY29sdW1uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVtb3ZlQ29sdW1uKGNvbHVtbik7XG4gICAgfVxuICB9XG5cbiAgX3N0cmV0Y2hDb2x1bW4oY29sdW1uKSB7XG4gICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjb2x1bW4uZGF0YXNldC5pZDsgLy8gQ29sdW1uIHRvIHN0cmV0Y2ggaW5kZXhcbiAgICAgICAgbGV0IHN1bSA9IDA7IC8vIENvbHVtbnMgd2lkdGggaW4gJSBzdW1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBzdW0gKz0gcGFyc2VGbG9hdCh0aGlzLl9jb2x1bW5zW2ldLndpZHRoLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCA9IHBhcnNlRmxvYXQodGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGgsIDEwKTsgLy8gQ29udmVydCB0YXJnZXQgdmFsdWUgdG8gZmxvYXQgZm9yIGNvbXB1dGF0aW9uc1xuXG4gICAgICAgIGlmIChzdW0gPCAxMDApIHsgLy8gRXhwYW5kIGNvbHVtblxuICAgICAgICAgIHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoICs9ICgxMDAgLSBzdW0pO1xuICAgICAgICB9IGVsc2UgaWYgKHN1bSA+IDEwMCkgeyAvLyBSZXRyYWN0IGNvbHVtblxuICAgICAgICAgIGlmICgoc3VtIC0gMTAwKSA8IHRoaXMuX2NvbHVtbnNbaW5kZXhdLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aCAtPSAoc3VtIC0gMTAwKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBUb28gdGlnaHQgdG8gcmV0cmFjdCBjb2x1bW4sIHJhaXNlIGEgd2FybmluZ1xuICAgICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgICAgY29kZTogJ0NBTlRfU1RSRVRDSF9DT0xVTU4nLFxuICAgICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gTGF5b3V0IGlzIDEwMCUgc3RyZXRjaGVkIHRvIGl0cyBjb250YWluZXIsIHJhaXNlIGFuIGluZm9cbiAgICAgICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICAgICAgY29kZTogJ0FMUkVBRFlfU1RSRVRDSCcsXG4gICAgICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29sdW1uc1tpbmRleF0ud2lkdGggPSB0aGlzLl9jb2x1bW5zW2luZGV4XS53aWR0aC50b1N0cmluZygpOyAvLyBSZXN0b3JlIHRhcmdldCB2YWx1ZVxuICAgICAgICB0aGlzLl9yZWZyZXNoR3JpZENvbHVtbigpO1xuICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgfSk7XG4gIH1cblxuICBfc3RyZXRjaEFsbENvbHVtbnMoKSB7XG4gICAgbXprLnZpZXcuc3RhcnRMb2FkaW5nKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZXF1YWxDb2x1bW5XaWR0aEluUHggPSAodGhpcy5fZG9tLndyYXBwZXIuY2xpZW50V2lkdGggLyB0aGlzLl9jb2x1bW5zLmxlbmd0aCk7XG4gICAgICAgIGxldCBhbHJlYWR5U3RyZXRjaGVkID0gdHJ1ZTsgLy8gQXNzdW1pbmcgYnkgZGVmYXVsdCB0aGF0IHRoYXQgY29sdW1ucyBoYXZlIGVxdWFsIHdpZHRoXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7IC8vIExvb3AgdG8gZmluZCBpZiBjb2x1bW5zIGFyZW4ndCBhbGwgZXF1YWxcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q29sdW1uV2lkdGhJblB4ID0gKCh0aGlzLl9kb20ud3JhcHBlci5jbGllbnRXaWR0aCAqIHRoaXMuX2NvbHVtbnNbaV0ud2lkdGgpIC8gMTAwKTtcbiAgICAgICAgICBpZiAoY3VycmVudENvbHVtbldpZHRoSW5QeCAhPT0gZXF1YWxDb2x1bW5XaWR0aEluUHgpIHsgLy8gT25lIGNvbHVtbiBpc24ndCBlcXVhbHMgdG8gdGhlIG90aGVyc1xuICAgICAgICAgICAgYWxyZWFkeVN0cmV0Y2hlZCA9IGZhbHNlOyAvLyBCcmVhayBlcXVhbCB3aWR0aCBhc3N1bXB0aW9uXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWxyZWFkeVN0cmV0Y2hlZCkgeyAvLyBFeGl0IGZ1bmN0aW9uIGlmIGNvbHVtbnMgYXJlIGFscmVhZHkgc3RyZXRjaGVkXG4gICAgICAgICAgRXJyb3JzLnJhaXNlKHtcbiAgICAgICAgICAgIGNvZGU6ICdBTFJFQURZX1NUUkVUQ0gnLFxuICAgICAgICAgICAgZnJvbnRlbmQ6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBtemsudmlldy5zdG9wTG9hZGluZygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncmlkVGVtcGxhdGVDb2x1bW5zID0gJyc7IC8vIENTUyBncmlkIHJ1bGUgKGluIHBpeGVscylcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgKytpKSB7IC8vIEluaXQgZXF1YWx5IENTUyBncmlkIGNvbHVtbnMgcnVsZVxuICAgICAgICAgIHRoaXMuX2NvbHVtbnNbaV0ud2lkdGggPSAoZXF1YWxDb2x1bW5XaWR0aEluUHggKiAxMDApIC8gdGhpcy5fZG9tLndyYXBwZXIuY2xpZW50V2lkdGg7IC8vIFVwZGF0ZSBjb2x1bW4gd2lkdGggaW4gJVxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnMgKz0gYCR7ZXF1YWxDb2x1bW5XaWR0aEluUHh9cHggYDsgLy8gQXNzaWduIGNvbHVtbiB3aWR0aCBpbiBweFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVmcmVzaEdyaWRDb2x1bW4oZ3JpZFRlbXBsYXRlQ29sdW1ucyk7IC8vIFJlZnJlc2ggTGlzdFZpZXcgZ3JpZCB3aXRoIGN1c3RvbSBncmlkVGVtcGxhdGVDb2x1bW5zIHZhbHVlXG4gICAgICAgIG16ay52aWV3LnN0b3BMb2FkaW5nKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgYWRkVHJhY2tzKHRyYWNrcykge1xuICAgIG16ay52aWV3LnN0YXJ0TG9hZGluZygpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCBncmlkVGVtcGxhdGVDb2x1bW5zID0gdGhpcy5fY29tcHV0ZUdyaWRUZW1wbGF0ZUNvbHVtbnMoKTsgLy8gQ1NTIGdyaWQgcnVsZVxuICAgICAgICBjb25zdCBmaXJzdENhbGwgPSB0aGlzLl90cmFja3MubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhY2tzLmxlbmd0aDsgKytpKSB7IC8vIEluaXQgbGlzdHZpZXcgY29udGVudCBkZXBlbmRpbmcgb24gb3B0aW9ucyBvYmplY3RcbiAgICAgICAgICBjb25zdCBsaXN0Vmlld0VudHJ5ID0gbmV3IExpc3RWaWV3RW50cnkoe1xuICAgICAgICAgICAgdHJhY2s6IHRyYWNrc1tpXSxcbiAgICAgICAgICAgIGRhdGFzZXRJZDogaSxcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IGdyaWRUZW1wbGF0ZUNvbHVtbnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl90cmFja3MucHVzaChsaXN0Vmlld0VudHJ5KTtcblxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgY29uc3QgY29sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICBjb2wuY2xhc3NMaXN0LmFkZCh0aGlzLl9jb2x1bW5zW2pdLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICBjb2wuZGF0YXNldC5pZCA9IGo7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2x1bW5zW2pdLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2R1cmF0aW9uJykge1xuICAgICAgICAgICAgICBjb2wuaW5uZXJIVE1MID0gVXRpbHMuc2Vjb25kc1RvVGltZWNvZGUobGlzdFZpZXdFbnRyeS5nZXQodGhpcy5fY29sdW1uc1tqXS5uYW1lLnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbC5pbm5lckhUTUwgPSBsaXN0Vmlld0VudHJ5LmdldCh0aGlzLl9jb2x1bW5zW2pdLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3RWaWV3RW50cnkuYWRkQ29sdW1uKGNvbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGlzdFZpZXdFbnRyeS5nZXREb20oKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kb20uY29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblxuICAgICAgICBpZiAoZmlyc3RDYWxsKSB7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsQmFyID0gbmV3IFNjcm9sbEJhcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuX2RvbS5jb250YWluZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9kb20uY29udGFpbmVyID0gdGhpcy5fZG9tLmNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQ7IC8vIFNjcm9sbEJhciBjcmVhdGVzIHR3byB3cmFwcGVyc1xuICAgICAgICB9XG5cbiAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2VudGVyT24oaWQpIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHBhcnNlSW50KHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpXS5kYXRhc2V0LmlkKSA9PT0gaWQpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBFcnJvcnMucmFpc2Uoe1xuICAgICAgICBjb2RlOiAnQ0FOVF9DRU5URVJfVFJBQ0snLFxuICAgICAgICBmcm9udGVuZDogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRpdmVEZWx0YSA9IHRoaXMuX2RvbS5jb250YWluZXIuY2hpbGROb2Rlc1tpbmRleF0ub2Zmc2V0VG9wICsgdGhpcy5fZG9tLmNvbnRhaW5lci5jaGlsZE5vZGVzW2luZGV4XS5zY3JvbGxIZWlnaHQgLyAyO1xuICAgIHRoaXMuX2RvbS5jb250YWluZXIuc2Nyb2xsVG9wID0gcmVsYXRpdmVEZWx0YSAtIHRoaXMuX2RvbS5jb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMjtcbiAgfVxuXG4gIHVuc2VsZWN0QWxsKCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90cmFja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgIHRoaXMuX3RyYWNrc1tpXS5zZXRTZWxlY3RlZChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlUGxheWluZ0ljb24oKSB7XG4gICAgaWYgKHRoaXMuX3RyYWNrc1t0aGlzLl9wbGF5aW5nVHJhY2tJbmRleF0pIHsgLy8gVGVzdGluZyBpZiBhIHRyYWNrIGlzIGZsYWdnZWQgcGxheWluZ1xuICAgICAgdGhpcy5fdHJhY2tzW3RoaXMuX3BsYXlpbmdUcmFja0luZGV4XS5zZXRQbGF5aW5nKGZhbHNlKTsgLy8gUmVtb3ZlIHRoZSBmbGFnXG4gICAgICB0aGlzLl9wbGF5aW5nVHJhY2tJbmRleCA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2hWaWV3KCkgeyAvLyBUT0RPIG1vdmUgdGhpcyBpbiBBcHBWaWV3IGV4dGVuZGVkIGNsYXNzIHRvIGNyZWF0ZSBhbmQgdGhpcyBpcyBvdmVycmlkZVxuICAgIG16ay52aWV3LnN0YXJ0TG9hZGluZygpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3JlZnJlc2hHcmlkQ29sdW1uKCk7XG4gICAgICAgICAgbXprLnZpZXcuc3RvcExvYWRpbmcoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZ2V0RE9NRnJhZ21lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RvbS5mcmFnbWVudDtcbiAgfVxuXG4gIGdldE5leHRUcmFja0lkKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFja3NbKHRoaXMuX3BsYXlpbmdUcmFja0luZGV4ICsgMSkgJSB0aGlzLl90cmFja3MubGVuZ3RoXS5pZDtcbiAgfVxuXG4gIGdldFByZXZpb3VzVHJhY2tJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhY2tzWyh0aGlzLl9wbGF5aW5nVHJhY2tJbmRleCArIHRoaXMuX3RyYWNrcy5sZW5ndGggLSAxKSAlIHRoaXMuX3RyYWNrcy5sZW5ndGhdLmlkO1xuICB9XG5cbiAgaXNMYXN0VHJhY2soKSB7XG4gICAgaWYgKHRoaXMuX3BsYXlpbmdUcmFja0luZGV4ID09PSB0aGlzLl90cmFja3MubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RWaWV3O1xuIiwiJ3VzZXIgc3RyaWN0JztcblxuY2xhc3MgTGlzdFZpZXdFbnRyeSB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBMaXN0VmlldyBlbnRyeVxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgQXVndXN0IDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEEgTGlzdFZpZXcgaXRlbSB0aGF0IGFpbSB0byBjb250YWluIHRyYWNrIGFuZCBpdHMgaW50ZXJhY3Rpdml0eVxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYXJ0aXN0ID0gb3B0aW9ucy50cmFjay5hcnRpc3QgfHwgJyc7XG4gICAgdGhpcy5hbGJ1bSA9IG9wdGlvbnMudHJhY2suYWxidW0uTkFNRSB8fCAnJztcbiAgICB0aGlzLmNvbXBvc2VyID0gb3B0aW9ucy50cmFjay5jb21wb3NlciB8fCAnJztcbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0aW9ucy50cmFjay5kdXJhdGlvbiB8fCAnJztcbiAgICB0aGlzLmdlbnJlID0gb3B0aW9ucy50cmFjay5nZW5yZSB8fCAnJztcbiAgICB0aGlzLmlkID0gb3B0aW9ucy50cmFjay5pZCB8fCAnJztcbiAgICB0aGlzLnBlcmZvcm1lciA9IG9wdGlvbnMudHJhY2sucGVyZm9ybWVyIHx8ICcnO1xuICAgIHRoaXMudGl0bGUgPSBvcHRpb25zLnRyYWNrLnRpdGxlIHx8ICcnO1xuXG4gICAgdGhpcy5fZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5hZGQoJ2VudHJ5Jyk7XG4gICAgdGhpcy5fZG9tLmRhdGFzZXQuaWQgPSBvcHRpb25zLmRhdGFzZXRJZDtcbiAgICB0aGlzLl9kb20uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IG9wdGlvbnMuZ3JpZFRlbXBsYXRlQ29sdW1ucztcblxuICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZENvbHVtbihjb2x1bW4pIHtcbiAgICB0aGlzLl9kb20uYXBwZW5kQ2hpbGQoY29sdW1uKTtcbiAgfVxuXG4gIGdldERvbSgpIHtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9kb20pO1xuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxuXG4gIHNldFNlbGVjdGVkKHN0YXR1cykge1xuICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSBzdGF0dXM7XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgdGhpcy5fZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RvbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHNldFBsYXlpbmcoc3RhdHVzKSB7XG4gICAgdGhpcy5faXNQbGF5aW5nID0gc3RhdHVzO1xuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIHRoaXMuX2RvbS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RvbS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TG93ZXJDYXNlT2YodGFnKSB7XG4gICAgcmV0dXJuIHRoaXNbdGFnXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgZ2V0KHRhZykge1xuICAgIHJldHVybiB0aGlzW3RhZ107XG4gIH1cbiAgZ2V0SXNTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTZWxlY3RlZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RWaWV3RW50cnk7XG4iLCJpbXBvcnQgVXNlck1lbnUgZnJvbSAnLi9Vc2VyTWVudS5qcyc7XG4ndXNlX3N0cmljdCc7XG5cblxuY2xhc3MgVG9wQmFyIHtcbiAgLyoqXG4gICAqIEBzdW1tYXJ5IE1hbmFaZWFrIFRvcEJhclxuICAgKiBAYXV0aG9yIEFydGh1ciBCZWF1bGlldVxuICAgKiBAc2luY2UgU2VwdGVtYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhhbmRsZSBhbGwgY29tcG9uZW50cyBpbiB0aGUgVG9wQmFyIGFuZCBhbGwgcmVsYXRlZCBldmVudHNcbiAgICoqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl90b3BiYXIgPSB7fTtcbiAgICB0aGlzLl9hdmF0YXIgPSB7fTtcbiAgICB0aGlzLl91c2VyTWVudSA9IHt9O1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fdG9wYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcGJhcicpO1xuICAgIHRoaXMuX2F2YXRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BiYXItYXZhdGFyJyk7XG4gICAgdGhpcy5fdXNlck1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblxuICAgIHRoaXMuX3VzZXJNZW51ID0gbmV3IFVzZXJNZW51KHtcbiAgICAgIHRhcmdldDogdGhpcy5fdG9wYmFyXG4gICAgfSk7XG4gICAgdGhpcy5fYXZhdGFyLnNyYyA9IGAuLi8uLi8ke216ay51c2VyLmF2YXRhclBhdGh9YDsgLy8gU2luY2UgaW1nIGlzIGluIGFwcC90ZW1wbGF0ZXNcbiAgfVxuXG4gIF9ldmVudHMoKSB7XG4vLyAgICB0aGlzLl9kaXNtaXNzVXNlck1lbnUgPSB0aGlzLl9kaXNtaXNzVXNlck1lbnUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX2F2YXRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl90b3BiYXIuY29udGFpbnModGhpcy5fdXNlck1lbnUuZG9tKSkge1xuICAgICAgICB0aGlzLmNsb3NlVXNlck1lbnUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3BlblVzZXJNZW51KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvcGVuVXNlck1lbnUoKSB7XG4gICAgdGhpcy5fdXNlck1lbnUub3BlbigpO1xuICB9XG5cbiAgY2xvc2VVc2VyTWVudSgpIHtcbiAgICB0aGlzLl91c2VyTWVudS5jbG9zZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhcjtcbiIsIid1c2Vfc3RyaWN0JztcblxuXG5jbGFzcyBVc2VyTWVudSB7XG4gIC8qKlxuICAgKiBAc3VtbWFyeSBUb3BCYXIgdXNlciBtZW51XG4gICAqIEBhdXRob3IgQXJ0aHVyIEJlYXVsaWV1XG4gICAqIEBzaW5jZSBPY3RvYmVyIDIwMThcbiAgICogQGRlc2NyaXB0aW9uIEhvbGQgYWxsIHVzZXIgbGlua3MgdG8gY29udHJvbCB0aGUgbWFpbiB2aWV3LCBsb2dvdXQgZXRjLlxuICAgKiovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90YXJnZXQgPSBvcHRpb25zLnRhcmdldDtcbiAgICB0aGlzLl91c2VyTWVudSA9IHt9O1xuICAgIHRoaXMuX292ZXJsYXkgPSB7fTtcbiAgICB0aGlzLl9sb2dPdXQgPSB7fTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG5cbiAgX2luaXQoKSB7XG4gICAgbXprLmtvbXVuaWthdG9yLmdldFRlbXBsYXRlKCdtb2RhbHMvdXNlcm1lbnUvJylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcocmVzcG9uc2UsICd0ZXh0L2h0bWwnKTtcblxuICAgICAgICB0aGlzLl9vdmVybGF5ID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RyYW5zcGFyZW50LW92ZXJsYXknKVswXTtcbiAgICAgICAgdGhpcy5fdXNlck1lbnUgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndXNlci1tZW51JylbMF07XG4gICAgICAgIHRoaXMuX2xvZ091dCA9IHRoaXMuX3VzZXJNZW51LmNoaWxkTm9kZXNbMV07XG5cbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX3VzZXJNZW51LmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQucGVybSlcbiAgICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLl92aWV3cG9ydENsaWNrZWQgPSB0aGlzLl92aWV3cG9ydENsaWNrZWQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX2xvZ091dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG16ay5sb2dPdXQoKTtcbiAgICB9LCB0cnVlKTtcbiAgfVxuXG5cbiAgX3ZpZXdwb3J0Q2xpY2tlZChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCFldmVudC50YXJnZXQuY2xvc2VzdChgLnVzZXItbWVudWApKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl91c2VyTWVudSkge1xuICAgIH1cbiAgfVxuXG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLl90YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5fb3ZlcmxheSk7XG4gICAgdGhpcy5fb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3ZpZXdwb3J0Q2xpY2tlZCwgZmFsc2UpO1xuICB9XG5cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl90YXJnZXQucmVtb3ZlQ2hpbGQodGhpcy5fb3ZlcmxheSk7XG4gICAgdGhpcy5fb3ZlcmxheS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX3ZpZXdwb3J0Q2xpY2tlZCwgZmFsc2UpO1xuICB9XG5cblxuICBnZXQgZG9tKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VyTWVudTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJNZW51OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=