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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export extendClass */
/* harmony export (immutable) */ __webpack_exports__["h"] = precisionRound;
/* harmony export (immutable) */ __webpack_exports__["l"] = secondsToTimecode;
/* harmony export (immutable) */ __webpack_exports__["i"] = rawSizeToReadableSize;
/* harmony export (immutable) */ __webpack_exports__["n"] = sortObjectArrayBy;
/* harmony export (immutable) */ __webpack_exports__["e"] = getCookies;
/* harmony export (immutable) */ __webpack_exports__["m"] = setCookie;
/* harmony export (immutable) */ __webpack_exports__["o"] = toggleVisibilityLock;
/* harmony export (immutable) */ __webpack_exports__["c"] = addVisibilityLock;
/* harmony export (immutable) */ __webpack_exports__["j"] = removeVisibilityLock;
/* unused harmony export toggleInvisibilityLock */
/* unused harmony export addInvisibilityLock */
/* unused harmony export removeInvisibilityLock */
/* harmony export (immutable) */ __webpack_exports__["g"] = isVisibilityLocked;
/* harmony export (immutable) */ __webpack_exports__["f"] = getRequest;
/* harmony export (immutable) */ __webpack_exports__["a"] = JSONParsedGetRequest;
/* harmony export (immutable) */ __webpack_exports__["b"] = JSONParsedPostRequest;
/* harmony export (immutable) */ __webpack_exports__["k"] = renderMoodFile;
/* harmony export (immutable) */ __webpack_exports__["d"] = genUniqueID;
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  Utils function for global app          *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



/**
 * method : extendClass (public)
 * desc   : TODO
 * arg    : {object} parent - TODO
 *          {object} child - TODO
 **/
function extendClass(parent, child) {
    let proto = Object.create(parent.prototype);

    for (let i in child.prototype) {
        proto[i] = child.prototype[i];
    }

    child.prototype = proto;
}


/**
 * method : precisionRound (public)
 * desc   : Round a value to a given number of decimals
 * arg    : {float} value - The value to round
 *          {int} precision - The amount of digits after zero
 **/
function precisionRound(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


/**
 * method : secondsToTimecode (public)
 * desc   : Transforms seconds into a readable timecode
 * arg    : {int} time - Number of seconds
 **/
function secondsToTimecode(time) {
    // TODO : add days
    let transformedTime = {
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
    transformedTime.d = transformedTime.d < 10 ? "0" + transformedTime.d : transformedTime.d;
    transformedTime.h = transformedTime.h < 10 ? "0" + transformedTime.h : transformedTime.h;
    transformedTime.m = transformedTime.m < 10 ? "0" + transformedTime.m : transformedTime.m;
    transformedTime.s = transformedTime.s < 10 ? "0" + transformedTime.s : transformedTime.s;
    // Formatting output
    if (transformedTime.d > 0) {
        return transformedTime.d + "d " + transformedTime.h + "h " + transformedTime.m + "m " + transformedTime.s + "s";
    }

    else if (transformedTime.h > 0) {
        return transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
    }

    else {
        return transformedTime.m + ":" + transformedTime.s;
    }
}


/**
 * method : rawSizeToReadableSize (public)
 * desc   : Transforms a byte integer into a readable value in octet
 * arg    : {int} size - Size in byte to convert
 **/
function rawSizeToReadableSize(size) {
    let readable = 0;

    if (size / 1000000 < 1) { // TODO : true division to make here (1024 or smthg like theaz)
        readable = precisionRound(size / 1000, 2) + " Ko";
    }

    else {
        readable = precisionRound(size / 1000000, 2) + " Mo";
    }

    return readable;
}


/**
 * method : sortObjectArrayBy (public)
 * desc   : TODO
 * arg    : {int} key - TODO
 *          {bool} ascending - Sort way
 *          {object} subobject - TODO
 **/
function sortObjectArrayBy(key, ascending, subobject) {
    return function(a, b) {
        if (subobject != null) {
            a = a[subobject];
            b = b[subobject];
        }

        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let compare = 0;
        if (varA > varB)      {
            compare =  1;
        }

        else if (varA < varB) {
            compare = -1;
        }

        return (!ascending ? (compare * -1) : compare);
    };
}


/**
 * method : getCookies (public)
 * desc   : Retrieve cookies from browser
 **/
function getCookies() {
    let cookies = {};

    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (cookie) {
            let m = cookie.trim().match(/(\w+)=(.*)/);

            if (m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }

    return cookies;
}


/**
 * method : setCookie (public)
 * desc   : Stores a cookie in browser
 * arg    : {string} cookieKey - The cookie var name
 *          {string} cookieValue - The cookie value
 *          {int} expiresDay - Expiration in days
 **/
function setCookie(cookieKey, cookieValue, expiresDay) {
    let d = new Date();

    d.setTime(d.getTime() + (expiresDay * 24 * 60 * 60 * 1000));

    let expires = "expires="+ d.toUTCString();

    document.cookie = cookieKey + "=" +
        cookieValue + ";" +
        expires +
        ";path=/";
}


/**
 * method : toggleVisibilityLock (public)
 * desc   : Toggle a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function toggleVisibilityLock(object) { //TODO: Move to Overrides
    if (object.classList.contains("mzk-visible")) {
        removeVisibilityLock(object);
    }

    else {
        addVisibilityLock(object);
    }
}


/**
 * method : addVisibilityLock (public)
 * desc   : Add a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function addVisibilityLock(object) { // TODO : rename to addClass -> modify modal accordingly
    object.classList.add("mzk-visible");
    object.dataset.mzkLock = 1;
}


/**
 * method : removeVisibilityLock (public)
 * desc   : Remove a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function removeVisibilityLock(object) {
    object.classList.remove("mzk-visible");
    object.dataset.mzkLock = 0;
}


/**
 * method : toggleInvisibilityLock (public)
 * desc   : Toggle a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function toggleInvisibilityLock(object) { //TODO: Move to Overrides
    if (object.classList.contains("mzk-visible")) {
        removeInvisibilityLock(object);
    }

    else {
        addInvisibilityLock(object);
    }
}


/**
 * method : addInvisibilityLock (public)
 * desc   : Add a invisibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function addInvisibilityLock(object) { // TODO : rename to addClass -> modify modal accordingly
    object.classList.add("mzk-hidden");
    object.dataset.mzkLock = 1;
}


/**
 * method : removeInvisibilityLock (public)
 * desc   : Remove a invisibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function removeInvisibilityLock(object) {
    object.classList.remove("mzk-hidden");
    object.dataset.mzkLock = 0;
}


/**
 * method : isVisibilityLocked (public)
 * desc   : Check visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
function isVisibilityLocked(object) {
    return object.dataset.mzkLock == '1';
}


/**
 * method : getRequest (public)
 * desc   : Function to GET an url
 * arg    : {string} url - The address
 *          {function} callback
 **/
function getRequest(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}


/**
 * method : JSONParsedGetRequest (public)
 * desc   : Function to GET an url, and JSON.parse response
 * arg    : {string} url - The address
 *          {function} callback
 **/
function JSONParsedGetRequest(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}


/**
 * method : JSONParsedPostRequest (public)
 * desc   : Function to POST an url, and JSON.parse response
 * arg    : {string} url - The address
 *          {JSON.stringify} message - Information to give to the server
 *          {function} callback
 *          {bool} raw_data - if true, send as raw data. Default is JSON
 **/
function JSONParsedPostRequest(url, message, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200 && callback !== null) {
            callback(JSON.parse(this.responseText));
        }
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader('X-CSRFToken', window.app.cookies['csrftoken']);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(message);
}


/**
 * method : renderMoodFile (public)
 * desc   : Render a .mood file into a svg -- using d3.js library
 * arg    : {file} file - The .mood file
 *          {object} parentDiv - Rendered moodbar container
 **/
function renderMoodFile(file, parentDiv, callback) {
    // Credit for this function : "Valodim"
    // https://gist.github.com/Valodim/5225460
    let xhr = new XMLHttpRequest();

    xhr.open('GET', file, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onreadystatechange = function(e) {
        if (this.readyState === 4 && this.status === 200) {
            d3.selectAll('#moodbar svg').remove();
            let rgb = new Array(this.responseText.length / 3);

            for (let i = 0, len = rgb.length; i < len; ++i) {
                let r = this.responseText.charCodeAt(i * 3)       & 0xff;
                let g = this.responseText.charCodeAt((i * 3) + 1) & 0xff;
                let b = this.responseText.charCodeAt((i * 3) + 2) & 0xff;

                // TODO : Have fun here w/ colors

                rgb[i] = {
                    offset: (i / len * 100) + "%",
                    color:  "rgba(" + r + ", " + b + ", " + g + ", 0.9)"
                };
            }

            let svg = d3.select(parentDiv).append("svg")
                .attr("height", "100%")
                .attr("width", "100%")
                .append("g");
            svg.append("linearGradient")
                .attr("id", "moodbar-gradient-" + file[0] + file[1])
                .attr("gradientUnits", "userSpaceOnUse")
                .selectAll("stop")
                .data(rgb)
                .enter().append("stop")
                .attr("offset", function(d)     { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });
            svg.append("rect")
                .attr("fill", "url(#moodbar-gradient-" + file[0] + file[1] + ")")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "100%")
                .attr("height", "100%")
        }

        else if (this.status === 404 && callback) {
            callback();
        }
    };
    xhr.send();
}


/**
 * method : genUniqueID (public)
 * desc   : Generates a unique ID
 **/
function genUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MzkListener_js__ = __webpack_require__(15);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  MzkObject class                      *
 *                                         *
 *  TODO *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



class MzkObject {

    constructor() {
        this.listeners = {};
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : listen (public)
     * class  : MzkObject
     * desc   : Add listener on a function
     * arg    : {string} event - the function to listen to
     *        : {function} callback - The function to callback
     *        : {} thisArg - TODO
     **/
    listen(event, callback, thisArg) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; ++i) {
                if (this.listeners[event[i]] || this._hijackMethod(event[i]) == true) {
                    this.listeners[event[i]].push(new __WEBPACK_IMPORTED_MODULE_0__MzkListener_js__["a" /* default */]('', '', callback, thisArg));
                }
            }
        }

        else if (this.listeners[event] || this._hijackMethod(event) == true) {
            this.listeners[event].push(new __WEBPACK_IMPORTED_MODULE_0__MzkListener_js__["a" /* default */]('', '', callback, thisArg));
        }
    }


    /**
     * method : addShortcut (public)
     * class  : MzkObject
     * desc   : TODO
     * arg    : {TODO} shortcut - TODO
     **/
    addShortcut(shortcut) {
        window.app.getShortcutMaestro().registerShortcut(shortcut, this);
    }


    /**
     * method : removeShortcut (public)
     * class  : MzkObject
     * desc   : TODO
     * arg    : {TODO} shortcut - TODO
     **/
    removeShortcut(shortcut) {
        window.app.getShortcutMaestro().unregisterShortcut(shortcut, this);
    }


    /**
     * method : lockShortcuts (public)
     * class  : MzkObject
     * desc   : TODO
     **/
    lockShortcuts() {
        window.app.getShortcutMaestro().lock(this);
    }


    /**
     * method : unlockShortcuts (public)
     * class  : MzkObject
     * desc   : TODO
     **/
    unlockShortcuts() {
        window.app.getShortcutMaestro().unlock(this);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _hijackMethod (private)
     * class  : MzkObject
     * desc   : Surround a method with the event handling code
     * arg    : {string} method - the name of the function to 'hijack'
     **/
    _hijackMethod(method) {
        if (typeof this[method] === "function" && method[0] !== '_') {
            this.listeners[method] = [];

            let oldFunc = this[method];
            this[method] = (function (pname, func) {
                return function () {
                    let r = func.apply(this, arguments);
                    for (let i = 0; i < this.listeners[pname].length; ++i) {
                        this.listeners[pname][i].runCallback(arguments);
                    }
                    return r;
                }
            }(method, oldFunc));
            return true;
        }
        return false;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (MzkObject);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Notification class                             *
 *                                                 *
 *  Notifications to use in various case           *
 *                                                 *
 *  type    : {string} "ERROR" or "INFO"           *
 *  title   : {string} Notification title          *
 *  message : {string} Notification message        *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class Notification {

    constructor(type, title, message) {
        // TODO : test incoming var ...
        // TODO : create notifController class
        this.type         = type;
        this.title        = title;
        this.message      = message;
        this.notification = null;
        this.duration     = 3000; // Notification visible duration
        this.interval     = 1;    // Refreshing interval
        this._createUI();
        this._lifeCycle();
    };

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _close (private)
     * class  : Notification
     * desc   : Make notification disappear
     **/
    _close() {
        //TODO: CSS Animation instead
        let that = this;
        let i    = 100;

        (function iterate () {
            if (i >= 0) {
                that.notification.style.opacity = i / 100;
                i -= 2;
                if (i === 0) { that.notification.parentNode.removeChild(that.notification); }
            }
            window.setTimeout(iterate, that.interval);
        })();

        window.clearTimeout(this.timeoutHandle);
    }


    /**
     * method : _createUI (private)
     * class  : Notification
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            icon:           document.createElement("IMG"),
            title:          document.createElement("P"),
            message:        document.createElement("P"),
            close:          document.createElement("IMG")
        };
        this.notification = document.createElement("DIV");

        this.notification.className = "notificationContainer";
        this.ui.icon.className      = "icon";
        this.ui.title.className     = "title";
        this.ui.message.className   = "message";
        this.ui.close.className     = "close";

        switch (this.type) {
            case "INFO":
                this.ui.icon.src    = "/static/img/utils/notification/info.svg";
                break;

            case "ERROR":
                this.ui.icon.src    = "/static/img/utils/notification/error.svg";
                break;

            default:
                this.ui.icon.src    = "/static/img/utils/notification/error.svg";
                break;
        }

        this.ui.close.src           = "/static/img/utils/notification/close.svg";
        this.ui.title.innerHTML     = this.title;
        this.ui.message.innerHTML   = this.message;

        this.notification.appendChild(this.ui.icon);
        this.notification.appendChild(this.ui.title);
        this.notification.appendChild(this.ui.message);
        this.notification.appendChild(this.ui.close);
    }


    /**
     * method : _eventListener (private)
     * class  : Notification
     * desc   : Notification event listeners
     **/
    _eventListener() {
        this.notification.addEventListener("mousemove", this._resetTimeout.bind(this));
        this.ui.close.addEventListener("click", this._close.bind(this));
    }


    /**
     * method : _lifeCycle (private)
     * class  : Notification
     * desc   : Launch the notification life cycle
     **/
    _lifeCycle() {
        document.body.appendChild(this.notification);
        this._eventListener();
        this._open();
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    }


    /**
     * method : _open (private)
     * class  : Notification
     * desc   : Make notification appear
     **/
    _open() {
        //TODO: CSS Animation instead
        let that = this;
        let i    = 0;

        (function iterate () {
            if (i <= 100) {
                that.notification.style.opacity = i / 100;
                i += 2;
            }
            window.setTimeout(iterate, that.interval);
        })();
    }


    /**
     * method : _resetTimeout (private)
     * class  : Notification
     * desc   : Reset notification close timeout
     **/
    _resetTimeout() {
        window.clearTimeout(this.timeoutHandle);
        this.timeoutHandle = window.setTimeout(this._close.bind(this), this.duration);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Notification);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_EditTag_js__ = __webpack_require__(16);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Modal class                                    *
 *                                                 *
 *  Modals to use in various case                  *
 *                                                 *
 *  type    : {string} Modal type name             *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */






class Modal extends __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__["a" /* default */] {

    constructor(type, data) {
        super();
        this.data        = data;
        this.url         = null;
        this.id          = "modal-" + Object(__WEBPACK_IMPORTED_MODULE_0__Utils_js__["d" /* genUniqueID */])();
        this.callback    = null;
        this.closeButton = null;
        this.editTag     = null;

        this._createUI();

        switch (type) {
            case "deletePlaylist":
                this._deletePlaylistUI();
                break;

            case "fetchPlaylists":
                this._fetchPlaylistsUI();
                break;

            case "fetchStats":
                this._fetchStatsUI();
                break;

            case "newLibrary":
                this._newLibraryUI();
                break;

            case "newPlaylist":
                this._newPlaylistUI();
                break;

            case "renamePlaylist":
                this._renamePlaylistUI();
                break;

            case "scanLibrary":
                this._scanLibraryUI();
                break;

            case "newWish":
                this._newWishUI();
                break;

            case "openSyncThing":
                this._openSyncThing();
                break;

            case "inviteCode":
                this._inviteCodeUI();
                break;

            case "cover":
                this._coverUI();
                break;

            case "editTag":
                this._editTagUI();
                break;

            default:
                new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("ERROR", "Can not open modals", "The given modals type doesn't exists");
                break;
        }
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : close (public)
     * class  : Modal
     * desc   : Remove the modal from body
     **/
    close() {
        document.body.removeChild(document.getElementById(this.id));
        this.unlockShortcuts();
    }


    /**
     * method : open (public)
     * class  : Modal
     * desc   : Add the modal to the body
     **/
    open() {
        this.lockShortcuts();
        document.body.appendChild(this.ui.overlay);
    }


    /**
     * method : setCallback (public)
     * class  : Modal
     * desc   : Set the modal callback
     * arg    : {function} callback
     **/
    setCallback(callback) {
        this.callback = callback;
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _appendCloseButton (private)
     * class  : Modal
     * desc   : Append a close button to modal container
     **/
    _appendCloseButton() {
        this.closeButton     = document.createElement("IMG");
        this.closeButton.id  = "closeButton";
        this.closeButton.src = "/static/img/utils/close.svg";

        let that = this;
        this.closeButton.addEventListener("click", function() {
            that.close();
        });

        this.ui.container.appendChild(this.closeButton);
    }


    /**
     * method : _checkLibraryInputs (private)
     * class  : Modal
     * desc   : Checks user input for new library
     * arg    : {string} name - Given library name
     *          {string} path - Given library path
     *          {bool} convert - conversion to ID3v2
     **/
    _checkLibraryInputs(name, path, convert) {
        if (name.value !== '' && path.value !== '') {
            if (this.callback) {
                this.callback(name, path, convert);
            }
        }

        else {
            if (name.value !== '') {
                path.style.border = "solid 1px red";
                new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("INFO", "Path field is empty.", "You must specify the path of your library.");
            }

            else if (path.value !== '') {
                name.style.border = "solid 1px red";
                new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("INFO", "Name field is empty.", "You must give your library a name.");
            }

            else {
                path.style.border = "solid 1px red";
                name.style.border = "solid 1px red";
                new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("INFO", "Both fields are empty.", "You must fill both fields to create a new library.");
            }
        }
    }


    /**
     * method : _checkPlaylistInputs (private)
     * class  : Modal
     * desc   : Checks user input for new playlist
     * arg    : {string} name - Given playlist name
     **/
    _checkPlaylistInputs(name) {
        if (name.value !== '') {
            if (this.callback) {
                this.callback(name);
            }
        }

        else {
            name.style.border = "solid 1px red";
            new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("INFO", "Name field is empty.", "You must specify the name of your playlist.");
        }
    }


    /**
     * method : _coverUI (private)
     * class  : Modal
     * desc   : Build UI elements for cover modal
     **/
    _coverUI() {
        this.ui.container.id = "cover";

        let info             = document.createElement("H1");
        let cover            = document.createElement("IMG");
        // Avoiding '-' symbol since info comes from innerHTML in TrackPreview
        let year             = this.data.year.length === 29 ? this.data.year.slice(0, -25) : this.data.year;

        info.innerHTML       = this.data.artist + " - " + this.data.album + " (" + year + ")";
        cover.src            = this.data.src;

        this.ui.content.appendChild(info);
        this.ui.content.appendChild(cover);

        this._appendCloseButton();
    }


    /**
     * method : _createUI (private)
     * class  : Modal
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            overlay:   document.createElement("DIV"),
            container: document.createElement("DIV"),
            header:    document.createElement("DIV"),
            title:     document.createElement("H1"),
            content:   document.createElement("DIV"),
            footer:    document.createElement("DIV")
        };

        this.ui.overlay.id        = this.id;
        this.ui.overlay.className = "overlay";
        this.ui.header.id         = "header";
        this.ui.content.id        = "content";
        this.ui.footer.id         = "footer";

        this.ui.header.appendChild(this.ui.title);
        this.ui.container.appendChild(this.ui.header);
        this.ui.container.appendChild(this.ui.content);
        this.ui.container.appendChild(this.ui.footer);
        this.ui.overlay.appendChild(this.ui.container);
    }


    /**
     * method : _deletePlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for delete playlist modal
     **/
    _deletePlaylistUI() {
        this.ui.container.id    = "deletePlaylist";
        this.ui.title.innerHTML = "Remove " + this.data.playlist.name;

        let infoLabel           = document.createElement("P");
        let cancel              = document.createElement("BUTTON");
        let del                 = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        cancel.id               = "cancelButton";
        del.id                  = "deleteButton";

        infoLabel.innerHTML     = "You are about to delete your playlist named " + this.data.playlist.name +
                                  ", and all the tracks that you've collected in it. Do you really want to delete this ?";
        cancel.innerHTML        = "Cancel";
        del.innerHTML           = "Delete";

        this._appendCloseButton();

        this.ui.content.appendChild(infoLabel);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(del);

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
        del.addEventListener("click", function() {
            window.app.deletePlaylist(that.data.playlist);
            that.close();
        });
    }


    _editTagUI() {
        this.editTag = new __WEBPACK_IMPORTED_MODULE_3__components_EditTag_js__["a" /* default */](this.ui.container, this.data);

        let ui = {
            foot:      document.createElement("DIV"),
                close: document.createElement("BUTTON"),
                save:  document.createElement("BUTTON")
        };

        ui.foot.className      = "foot";
            ui.close.innerHTML = "Close";
            ui.save.innerHTML  = "Save";

        ui.foot.appendChild(ui.close);
        ui.foot.appendChild(ui.save);

        let that = this;
        ui.close.addEventListener("click", function() {
            that.close();
        });
        ui.save.addEventListener("click", function() {
           that.editTag.saveState();
           that.close();
        });

        this.editTag.getContainer().appendChild(ui.foot);
    }


    /**
     * method : _fetchPlaylistsUI (private)
     * class  : Modal
     * desc   : Build UI elements for fetchPlaylists modal
     **/
    _fetchPlaylistsUI() {
        this.ui.container.id       = "fetchPlaylists";
        this.ui.title.innerHTML    = "Fetching your playlists";

        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let text                   = document.createElement("P");

        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        text.innerHTML             = "Currently fetching your libraries and playlists, please wait.";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(text);
    }


    /**
     * method : _fetchStatsUI (private)
     * class  : Modal
     * desc   : Build UI elements for fetchStats modal
     **/
    _fetchStatsUI() {
        this.ui.container.id       = "fetchPlaylists";
        this.ui.title.innerHTML    = "Crushing data";

        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let text                   = document.createElement("P");

        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        text.innerHTML             = "Hold on, you're data are on the road.";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(text);
    }


    /**
     * method : _inviteCodeUI (private)
     * class  : Modal
     * desc   : Build UI elements for display user'sfetchPlaylists invite code modal
     **/
    _inviteCodeUI() {
        this.ui.container.id    = "inviteCode";
        this.ui.title.innerHTML = "Invitation code";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("H3");
        let cancel              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";

        cancel.innerHTML        = "Close";
        name.innerHTML          = window.app.user.getInviteCode();
        infoLabel.innerHTML     = "Here is your unique invitation code. Share it with your friends if they want to join ManaZeak. Please do not share this code on the internet.";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(cancel);

        this._appendCloseButton();

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
    }


    /**
     * method : _newLibraryUI (private)
     * class  : Modal
     * desc   : Build UI elements for newLibrary modal
     **/
    _newLibraryUI() {
        this.ui.container.id    = "newLibrary";
        this.ui.title.innerHTML = "New library";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let path                = document.createElement("INPUT");
        let convertLabel        = document.createElement("SPAN");
        let convert             = document.createElement("INPUT");
        let scan                = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        path.id                 = "path";
        convertLabel.id         = "id3Label";
        convert.id              = "convert";
        scan.id                 = "scanButton";

        name.type               = "text";
        path.type               = "text";
        convert.type            = "checkbox";
        name.placeholder        = "Enter the name of the library";
        path.placeholder        = "Enter the absolute path to your library";

        infoLabel.innerHTML     = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
            "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
            "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
            "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
        convertLabel.innerHTML  = "Automatically convert files to <a href=\"https://en.wikipedia.org/wiki/ID3#ID3v2\" target=\"_blank\">ID3v2</a>";
        scan.innerHTML          = "Scan";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.content.appendChild(path);
        this.ui.content.appendChild(convertLabel);
        this.ui.content.appendChild(convert);
        this.ui.footer.appendChild(scan);

        this._appendCloseButton();

        let that = this;
        scan.addEventListener("click", function() {
            that._checkLibraryInputs(name, path, convert);
        });
    }


    /**
     * method : _newPlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for newPlaylist modal
     **/
    _newPlaylistUI() {
        this.ui.container.id    = "newLibrary";
        this.ui.title.innerHTML = "New playlist";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let create              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        create.id               = "scanButton";

        name.type               = "text";
        name.placeholder        = "Enter the name of the playlist";

        infoLabel.innerHTML     = "Please choose a name for your brand new playlist.";
        create.innerHTML        = "Create";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(create);

        this._appendCloseButton();

        let that = this;
        create.addEventListener("click", function() {
            that._checkPlaylistInputs(name);
        });
    }


    /**
     * method : _newWishUI (private)
     * class  : Modal
     * desc   : Build UI elements for newWish modal
     **/
    _newWishUI() {
        this.ui.container.id    = "newWish";
        this.ui.title.innerHTML = "Track suggestion";

        let text                = document.createElement("P");
        let wish                = document.createElement("INPUT");
        let submit              = document.createElement("BUTTON");

        wish.type               = "text";
        wish.placeholder        = "Enter your suggestion here";
        text.innerHTML          = "If you noticed that a track you like is missing from any playlist here, you can make a suggestion. " +
            "Paste a URL or write as much information as you can about it, and an administrator will process your request. " +
            "You will be notified when the track you requested has been added to a playlist. Also, if you have any feature idea, feel free to fill " +
            "this field (hard to say isn't it?).";
        submit.innerHTML        = "Submit";

        this.ui.content.appendChild(text);
        this.ui.content.appendChild(wish);
        this.ui.footer.appendChild(submit);

        this._appendCloseButton();

        let that = this;
        submit.addEventListener("click", function() {
            if (wish.value !== '') {
                // TODO : remove event listener on submit
                Object(__WEBPACK_IMPORTED_MODULE_0__Utils_js__["b" /* JSONParsedPostRequest */])(
                    "wish/submit/",
                    JSON.stringify({
                        WISH: wish.value
                    }),
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         * } */
                        if (!response.DONE) {
                            new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                that.close();
            }

            else {
                wish.style.border = "solid 1px red";
                new __WEBPACK_IMPORTED_MODULE_2__Notification_js__["a" /* default */]("INFO", "Suggestion field is empty.", "You must specify something in the field.");
            }
        });
    }


    /**
     * method : _openSyncThing (private)
     * class  : Modal
     * desc   : Build UI elements for SyncThing IFRAME modal
     **/
    _openSyncThing() {
        let content             = document.createElement("IFRAME");
        this.ui.container.id    = "openSyncThing";

        content.frameBorder     = 0;
        content.height          = "100%";
        content.width           = "100%";
        //content.src             = "http://everynoise.com/engenremap.html";
        content.src             = "//127.0.0.1:8384/";

        content.onload = function() {
        };

        this.ui.content.appendChild(content);

        this._appendCloseButton();
    }


    /**
     * method : _deletePlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for delete playlist modal
     **/
    _renamePlaylistUI() {
        this.ui.container.id    = "deletePlaylist";
        this.ui.title.innerHTML = "Rename " + this.data.name;

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let cancel              = document.createElement("BUTTON");
        let rename              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        cancel.id               = "cancelButton";
        rename.id               = "deleteButton";

        name.type               = "text";
        name.placeholder        = "Enter the name of the playlist";

        infoLabel.innerHTML     = "You are about to delete your playlist named " + this.data.name +
            ", and all the tracks that you've collected in it. Do you really want to delete this ?";
        cancel.innerHTML        = "Cancel";
        rename.innerHTML        = "Delete";

        this._appendCloseButton();

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(rename);

        this.setCallback(function(name) {
            window.app.renamePlaylist(that.data.id, name.value);
            that.close();
        });

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
        rename.addEventListener("click", function() {
            that._checkPlaylistInputs(name);
        });
    }


    /**
     * method : _scanLibraryUI (private)
     * class  : Modal
     * desc   : Build UI elements for scanLibrary modal
     **/
    _scanLibraryUI() {
        this.ui.container.id       = "scan";
        this.ui.title.innerHTML    = "Library scan in progress...";

        let contentText            = document.createElement("P");
        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let footerText             = document.createElement("P");

        contentText.innerHTML      = "Dark magic is currently happening, but doing such activity may take a while, depending on the number of files you have. Please relax, go grab some coffee and let the server manage its business.";
        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        footerText.innerHTML       = "On average, it take a minute to process two thousand files. Just do the math ;)";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(contentText);
        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(footerText);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  View class                             *
 *                                         *
 *  Parent class for every view displayed  *
 *  in mainContainer                       *
 *                                         *
 *  data : {object} data                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class View {

    constructor() {
        this.container           = document.createElement("DIV");
        this.container.innerHTML = "";
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getContainer (public)
     * class  : View
     * desc   : Returns the HTML of the view
     * return : {object} - The view container
     **/
    getContainer() {
        return this.container;
    }


    /**
     * method : getDataFromPlaylist (public)
     * class  : View
     * desc   : Get data from playlist
     * arg    : {object} playlist - The playlist to get data from
     **/
    getDataFromPlaylist(playlist) {
        return null;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _init (private)
     * class  : View
     * desc   : Init view
     * arg    : {object} data - Data to pass in view
     **/
    _init(data) {

    }

}

/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  Shortcut class                         *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



class Shortcut extends __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__["a" /* default */] {

    constructor(eventType, key, callback, ctrl, shift, alt, meta) {
        super();
        this.eventType  = eventType;
        this.key        = key;
        this.callback   = callback;
        this.ctrl       = ctrl;
        this.shift      = shift;
        this.alt        = alt;
        this.meta       = meta;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : run (public)
     * class  : Shortcut
     * desc   : run the shortcut
     */
    run() {
        this.callback();
    }


    /**
     * method : getType (public)
     * class  : Shortcut
     * desc   : TODO
     */
    getType() {
        return this.eventType;
    }


    /**
     * method : getKey (public)
     * class  : Shortcut
     * desc   : TODO
     */
    getKey() {
        return this.key;
    }


    /**
     * method : modifiersOK (public)
     * class  : Shortcut
     * desc   : Check whether the event complies with the modifier keys
     * args   : event
     */
    modifiersOK(event) {
        return  (this.ctrl  == null || this.ctrl  == event.ctrlKey) &&
                (this.shift == null || this.shift == event.shiftKey) &&
                (this.alt   == null || this.alt   == event.altKey) &&
                (this.meta  == null || this.meta  == event.metaKey);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Shortcut);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ContextMenuEntry_js__ = __webpack_require__(8);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                       *
 *  ContextMenu class                                                    *
 *                                                                       *
 *  Handle the context menu on right click                               *
 *                                                                       *
 *  parentElement : {object} the container hoisting the menu             *
 *  openCallback  : {function} A function to run when the menu is opened *
 *  event         : {string} The trigger event                           *
 *                                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */




class ContextMenu {

    constructor(parentElement, openCallback, event) {
        this.contextMenu   = null;
        this.parentElement = parentElement;
        this.openCallback  = openCallback;
        this.element       = null;
        this.isVisible     = false;
        this.event         = event ? event : 'contextmenu';
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addEntry (public)
     * class  : ContextMenu
     * desc   : Add an entry to the
     * arg    : {string} entryPath - TODO
     *        : {} displayString - TODO
     *        : {function} callback - The function to callback - Not Mandatory
     **/
    addEntry(entryPath, displayStr, callback /*, more args for the callback */) {
        let context;
        let parent = this.contextMenu;

        let i, j;
        if (Array.isArray(entryPath)) {
            pathForward: for (i = 0; i < entryPath.length - 1; ++i) {
                for (j = 0; j < parent.children.length; ++j)
                    if (parent.children[j].entryID == entryPath[i]) {
                        parent = parent.children[j];
                        continue pathForward;
                    }

                parent   = parent.addChild(new __WEBPACK_IMPORTED_MODULE_1__ContextMenuEntry_js__["a" /* default */](entryPath[i], entryPath[i]));
            }
            arguments[0] = entryPath[entryPath.length - 1];
        }

        //Simulate unshift on arguments
        let finalArgs = new Array(arguments.length);
        for(let i = 0; i < arguments.length; ++i)
            finalArgs[i + 1] = arguments[i];

        //Bind arguments array to the new constructor and call it
        parent.addChild(new (__WEBPACK_IMPORTED_MODULE_1__ContextMenuEntry_js__["a" /* default */].bind.apply(__WEBPACK_IMPORTED_MODULE_1__ContextMenuEntry_js__["a" /* default */], finalArgs))());
    }


    /**
     * method : reattach (public)
     * class  : ContextMenu
     * desc   : (re)add the context menu to its parent
     **/
    reattach() {
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);
    }


    /**
     * method : setInvisible (public)
     * class  : ContextMenu
     * desc   : Set ContextMenu invisible
     **/
    setInvisible() {
        Object(__WEBPACK_IMPORTED_MODULE_0__Utils_js__["j" /* removeVisibilityLock */])(this.element);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu event listeners
     **/
    _eventListener() {
        let that = this;
        this.parentElement.addEventListener(this.event, function(event) {
            if (event.pageY <= document.documentElement.clientHeight / 2) {
                that.element.style.bottom = "unset";
                that.element.style.top    = event.pageY + "px";
            }

            else {
                that.element.style.top    = "unset";
                that.element.style.bottom = (document.documentElement.clientHeight - event.pageY) + "px";
            }

            if (event.pageX <= document.documentElement.clientWidth / 2) {
                that.element.style.right = "unset";
                that.element.style.left  = event.pageX + "px";
            }

            else {
                that.element.style.left  = "unset";
                that.element.style.right = (document.documentElement.clientWidth - event.pageX) + "px";
            }

            that.contextMenu.closeAll();
            that.element.className = "";

            let target = event.target;

            while (target) {
                if (target.id) {
                    that.element.classList.add("mzk-ctx-include-" + target.id);
                }

                target = target.parentNode;
            }

            Object(__WEBPACK_IMPORTED_MODULE_0__Utils_js__["c" /* addVisibilityLock */])(that.element);
            if (that.openCallback) {
                that.openCallback(event);
            }
        });

        this.element.addEventListener('mzk_ctx:close', function() {
            that.element.className = "";
            that.contextMenu.closeAll();
        });
    }


    /**
     * method : _init (private)
     * class  : ContextMenu
     * desc   : Building entries and UI
     **/
    _init() {
        this.contextMenu = new __WEBPACK_IMPORTED_MODULE_1__ContextMenuEntry_js__["a" /* default */]("master", "", null);
        this.contextMenu.activateEventListener();
        this.element     = document.createElement('DIV');
        this.element.id  = "mzk-ctx-wrap";
        this.element.appendChild(this.contextMenu.element);
        this.parentElement.insertBefore(this.element, this.parentElement.firstChild);
        this._eventListener();
        this._keyListener();
    }


    /**
     * method : _keyListener (private)
     * class  : ContextMenu
     * desc   : ContextMenu key listeners
     **/
    _keyListener() {
        let that = this;
        document.addEventListener("keydown", function(event) { // TODO : put this in Shortcut
            switch (event.keyCode) {
                case 27: // Esc
                    if (that.isVisible) { that.toggleVisibilityLock(); }
                    break;

                default:
                    break;
            }
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getContextMenu() { return this.contextMenu; }

}

/* harmony default export */ __webpack_exports__["a"] = (ContextMenu);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  MultiSelect class                              *
 *                                                 *
 *  A class that handles selecting items ala OS    *
 *                                                 *
 *                                                 *
 *                                                 *
 *                                                 *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */



class MultiSelect extends __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__["a" /* default */] {

    constructor(purgeThreshold) {
        super();
        this.selection = {};
        this.size = 0;
        this.maxSize = 0;
        this.purgeThreshhold = purgeThreshold ? purgeThreshold : 25;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : add (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    add(value, append) {
        if (append == false) {
            if (this.size == 1 && this.selection[value] == true) {
                this.clear();
                return false;
            }

            else {
                this.clear();
                this.selection[value]     = true;
                this.size                 = 1;
                this.maxSize              = 1;
            }
        }

        else {
            if (this.selection[value] != null) {
                if (this.selection[value]) {
                    this.selection[value] = false;
                    --this.size;
                }

                else {
                    this.selection[value] = true;
                    ++this.size;
                }
            }

            else {
                this.selection[value]     = true;
                ++this.size;
                ++this.maxSize;
            }
        }

        if (this.maxSize - this.size > this.purgeThreshhold) {
            let that = this;
            window.setTimeout(function() {
                that.purge();
            }, 0);
        }

        return this.selection[value];
    }


    /**
     * method : addBulk (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    addBulk(values, append) {
        for (let i = 0; i < values.length; ++i) {
            this.add(values[i], append | i != 0);
        }
    }


    /**
     * method : clear (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    clear() {
        this.selection = {};
        this.size      = 0;
        this.maxSize   = 0;
    }


    /**
     * method : get (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    get() {
        let result = new Array(this.size);
        let ix = 0;
        for (let i in this.selection)
            if (this.selection[i])
                result[ix++] = i;

        return result;
    }


    /**
     * method : getSize (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    getSize() {
        return this.size;
    }


    /**
     * method : purge (public)
     * class  : MultiSelect
     * desc   : TODO
     **/
    purge() {
        for (let i in this.selection) {
            if (this.selection[i] == false) {
                delete this.selection[i];
            }
        }
        this.maxSize = this.size;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (MultiSelect);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  ContextMenuEntry sub class                     *
 *                                                 *
 *  Entry in the ContextMenu                       *
 *                                                 *
 *  entryID       : {int} TODO                     *
 *  displayString : {string} TODO                  *
 *  callback      : {function} TODO                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

const NB_OF_NAMED_ARGS = 3; // /!\ IMPORTANT - CHANGE THIS IF YOU ADD/REMOVE ARGUMENTS FROM THIS CONSTRUCTOR /!\

class ContextMenuEntry {

    constructor(entryID, displayString, callback/*, MORE ARGUMENTS HERE*/) {
        this.entryID          = entryID;
        this.displayString    = displayString;
        this.callback         = callback;
        this.callbackArgs     = arguments.length > NB_OF_NAMED_ARGS ? new Array(arguments.length - NB_OF_NAMED_ARGS) : [];
        this.multiOpenSubmenu = false;
        this.hideRule         = null;
        this.showRule         = null;
        this.element          = null;
        this.children         = [];
        this.parent           = null;

        for (let i = NB_OF_NAMED_ARGS; i < arguments.length; ++i) {
            this.callbackArgs[i - NB_OF_NAMED_ARGS] = arguments[i];
        }

        this._checkStylesheet();
        this._init();
    }


//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activateEventListener (public)
     * class  : ContextMenuEntry
     * desc   : activates the event listeners for the entire menu system
     **/
    activateEventListener() { //Call this on the root
        let self = this;
        document.body.addEventListener('click', function(event) {
            let target = event.target;
            while (target && target != self.element) {
                target = target.parentNode;
            }

            if (target != self.element) {
                self.element.dispatchEvent(new Event('mzk_ctx:close', {bubbles: true}));
            }
        }, true);
        this.element.addEventListener("click", function (event) {
            if (event.target.tagName !== 'LI') {
                return true;
            }

            let target  = event.target;
            let ixArray = new Array(10);
            let i       = 0;

            while (target.parentNode !== self.element) {
                ixArray[i++] = target.dataset.parentIx;

                do {
                    target = target.parentNode;
                } while (target.tagName !== 'LI');
            }

            ixArray[i]  = target.dataset.parentIx;

            let clicked = self;

            for (i; i >= 0; --i) {
                clicked = clicked.children[ixArray[i]];
            }

            if (clicked.children.length === 0) { // If the entry is a leaf then run its action
                clicked._runCallback();
            }

            else { // Else expand it
                if (clicked.parent.multiOpenSubmenu) {
                    clicked.parent.closeAll();
                }

                clicked.element.classList.toggle("mzk-ctx-open");
            }
        });
    }


    /**
     * method : addChild (public)
     * class  : ContextMenuEntry
     * desc   : add a subentry to this menu
     * arg    : {object} other_entry - the ContextMenuEntry to add
     *          {string} before_ID   - the ID of the element before which to add
     *          {bool}   after       - add after the ID instead of before
     **/
    addChild(other_entry, before_ID, after) {
        //Create the child element
        let li              = document.createElement("LI");
        li.dataset.parentIx = this.children.length;

        if (other_entry.entryID) { li.id = "mzk-ctx-li-" + other_entry.entryID; }

        li.textContent      = other_entry.displayString;
        li.appendChild(other_entry.element);

        //Find where to insert it
        let childRef        = this._findChildByID(before_ID);
        if (childRef) {
            if (after === false) { childRef = childRef.element.parentNode;             }
            else                 { childRef = childRef.element.parentNode.nextSibling; }
        }

        //Insert it and add the cross references
        this.element.insertBefore(li, childRef);
        this.children.push(other_entry);
        other_entry.parent = this;

        if (this.element.parentNode) { this.element.parentNode.classList.add("mzk-ctx-submenu"); }
        return other_entry;
    }


    /**
     * method : closeAll (public)
     * class  : ContextMenuEntry
     * desc   : close the menu and its submenus
     **/
    closeAll() {
        this.children.forEach(function(child) {
            child.closeAll();
            child.element.classList.remove("mzk-ctx-open");
        });
    }


    /**
     * method : seMultiOpenSubmenu (public)
     * class  : ContextMenuEntry
     * desc   : set the boolean that allow for multiple submenus to be opened
     * arg    : {bool} allow - whether to allow or forbid multiple open submenus
     **/
    seMultiOpenSubmenu(allow) {
        this.multiOpenSubmenu = allow;
        return this;
    }


    /**
     * method : setVisibleAreas (public)
     * class  : ContextMenuEntry
     * desc   : hides the entry unless the menu was opened on a child node of a node whose id is contained in the array
     * arg    : {array/string} array_of_IDs - the IDs to allow
     **/
    setVisibleAreas(array_of_IDs) {
        if (this.entryID === null || this.entryID !== undefined) {
            return;
        }

        let menu_selector  = "#mzk-ctx-wrap";
        let this_selector  = " #mzk-ctx-li-" + this.entryID;
        let hide_css       = "{ display: none; visibility: hidden; }";
        let show_css       = "{ display: block; visibility: visible; }";
        let sheet          = window.app.cssFiles.contextMenu;

        this.hideRule      = sheet.insertRule(menu_selector + this_selector + hide_css);
        let show_selector  = ".mzk-ctx-void";

        for (let i = 0; i < array_of_IDs.length; ++i) {
            show_selector += "," + menu_selector + ".mzk-ctx-include-" + array_of_IDs[i] + this_selector;
        }

        this.showRule      = sheet.insertRule(show_selector + show_css);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _checkStylesheet (private)
     * class  : ContextMenuEntry
     * desc   : setup the stylesheet needed for the setVisibleAreas function
     **/
    _checkStylesheet() {
        if (window.app.cssFiles.contextMenu) {
            return;
        }

        let el = document.createElement("STYLE");
        // Webkit hack to enable the stylesheet
        el.appendChild(document.createTextNode(""));
        let styleSheetIx = document.styleSheets.length;
        document.head.appendChild(el);
        window.app.cssFiles.contextMenu = document.styleSheets[styleSheetIx];
    }


    /**
     * method : _findChildByID (private)
     * class  : ContextMenuEntry
     * desc   : find a direct child from its ID
     * arg    : {string} childID - the ID of the child
     **/
    _findChildByID(childID) {
        if (childID === null || childID === undefined) {
            return null;
        }

        for (let i = 0; i < this.children.length; ++i) {
            if (this.children[i].entryID === childID) {
                return this.children[i];
            }
        }

        return null;
    }


    /**
     * method : _init (private)
     * class  : ContextMenuEntry
     * desc   : creates the DOM element
     **/
    _init() {
        this.element = document.createElement("UL");

        if (this.entryID) {
            this.element.id = "mzk-ctx-ul-" + this.entryID;
        }
    }


    /**
     * method : _runCallback (private)
     * class  : ContextMenuEntry
     * desc   : run the callback associated with the entry
     **/
    _runCallback() {
        if (this.callback) {
            this.children.forEach(function(child) {
                child.closeAll();
                child.element.classList.remove("mzk-ctx-open");
            });
            this.callback.apply(null, this.callbackArgs);
        }
        this.element.dispatchEvent(new Event('mzk_ctx:close', {bubbles: true}));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (ContextMenuEntry);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Track class                                    *
 *                                                 *
 *  Track object from db with all its metadata     *
 *                                                 *
 *  track : {object} Raw track from database JSON  *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class Track {

    constructor(track) {
        this.updateMetadata(track);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : updateMetadata (public)
     * class  : Track
     * desc   : Update metadata contained in Track (UI) object
     * arg    : {object} track - Raw JSON track
     **/
    updateMetadata(track) {
        this.id = {
            track:          track.ID                ? track.ID                : "",
            album:          track.ALBUM.ID          ? track.ALBUM.ID          : "",
            artists:        this._getArtistsIDFromArtistsArray(track.ARTISTS)
        };
        this.title        = track.TITLE             ? track.TITLE             : "";
        this.year         = track.YEAR              ? track.YEAR              : "";
        this.composer     = track.COMPOSER          ? track.COMPOSER          : "";
        this.performer    = track.PERFORMER         ? track.PERFORMER         : "";
        this.track        = track.TRACK_NUMBER      ? track.TRACK_NUMBER      : "";
        this.trackTotal   = track.ALBUM.TOTAL_TRACK ? track.ALBUM.TOTAL_TRACK : "";
        this.disc         = track.DISC_NUMBER       ? track.DISC_NUMBER        : "";
        this.discTotal    = track.ALBUM.TOTAL_DISC  ? track.ALBUM.TOTAL_DISC  : "";
        this.bpm          = track.BPM               ? track.BPM               : "";
        this.lyrics       = track.LYRICS            ? track.LYRICS            : "";
        this.comment      = track.COMMENT           ? track.COMMENT           : "";
        this.bitRate      = track.BITRATE           ? track.BITRATE           : "";
        this.sampleRate   = track.SAMPLERATE        ? track.SAMPLERATE        : "";
        this.duration     = track.DURATION          ? track.DURATION          : "";
        this.size         = track.SIZE              ? track.SIZE              : "";
        this.lastModified = track.LAST_MODIFIED     ? track.LAST_MODIFIED     : "";
        this.album        = track.ALBUM.TITLE       ? track.ALBUM.TITLE       : "";
        this.genre        = track.GENRE             ? track.GENRE             : "";
        this.fileType     = track.FILE_TYPE         ? track.FILE_TYPE         : "";
        this.cover        = track.COVER             ? "../static/img/covers/" + track.COVER : "../static/img/utils/defaultcover.svg";
        this.artist       = this._getArtistFromArtistsArray(track.ARTISTS);
        this.albumArtist  = this._getArtistFromArtistsArray(track.ALBUM.ARTISTS);
        this.playCount    = track.PLAY_COUNTER      ? track.PLAY_COUNTER      : 0;
        this.fileName     = track.FILENAME          ? track.FILENAME          : "";
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _getArtistsIDFromArtistsArray (private)
     * class  : Track
     * desc   : Extract artists IDs from JSON
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {[int]} - The artists ID array
     **/
    _getArtistsIDFromArtistsArray(artists) {
        if (artists === null || artists === undefined) { return ""; }

        let artistsID = [];
        for (let i = 0; i < artists.length; ++i) {
            artistsID.push(artists[i].ID);
        }

        return artistsID;
    }


    /**
     * method : _getArtistFromArtistsArray (private)
     * class  : Track
     * desc   : Create artists string from artist's names in [object]
     * arg    : {[object]} artists - Raw JSON array of objects
     * return : {string} The Artists concated string
     **/
    _getArtistFromArtistsArray(artists) {
        if (artists === null || artists === undefined) { return ""; }

        let artistsName = []; // Artists name array
        for (let i = 0; i < artists.length; ++i) {
            artistsName.push(artists[i].NAME);
        }

        artistsName.sort(); // In order to get artists alphabetically ordered

        let artist = ""; // Output string
        for (let i = 0; i < artistsName.length; ++i) {
            artist += artistsName[i];
            if (i < (artistsName.length - 1)) { artist += ", "; }
        }

        return artist;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Track);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Overrides_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Overrides_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_Overrides_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_js__ = __webpack_require__(12);



document.addEventListener('DOMContentLoaded', function() {
    window.app = new __WEBPACK_IMPORTED_MODULE_1__App_js__["a" /* default */]();
    window.app.init();
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  This file is for overriding vanilla JS *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

Event.prototype.stop = function() {
    this.stopPropagation();
    this.stopImmediatePropagation();
    this.preventDefault();
};


(function forceStop() {
    let addEvent = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(type, handler, options) {
        addEvent.call(this, type, function(event) {
            if (options !== true) {
                event.stop();
            }

            handler.apply(this, arguments);
        }, options);
    }
}());


//Disable default loading of dropped files
window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
},false);


window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
},false);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_FootBar_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_TopBar_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_User_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_DragDrop_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_PlaylistCollection_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_ShortcutMaestro_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_Queue_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_Player_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_appviews_StatsView_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__views_appviews_AdminView_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__views_appviews_UserView_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__views_appviews_PartyView_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__views_ListView_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__core_Playlist_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__utils_Modal_js__ = __webpack_require__(3);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  App class                                      *
 *                                                 *
 *  ManaZeak main class, orchestrate all the front *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */





















class App extends __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__["a" /* default */] {

    constructor() {
        super();
        this.cookies          = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["e" /* getCookies */])();
        this.user             = new __WEBPACK_IMPORTED_MODULE_4__core_User_js__["a" /* default */]();
        this.dragdrop         = new __WEBPACK_IMPORTED_MODULE_5__components_DragDrop_js__["a" /* default */](document.body);
        this.mainContainer    = document.createElement("DIV");
        this.mainContainer.id = "mainContainer";
        this.topBar           = null;
        this.footBar          = null;
        this.player           = null;
        this.playlists        = new __WEBPACK_IMPORTED_MODULE_6__core_PlaylistCollection_js__["a" /* default */]();
        this.activePlaylist   = null;
        this.cssFiles         = {};
        this.appViews         = {};
        this._createDefaultViews();
        this.shortcutMaestro  = new __WEBPACK_IMPORTED_MODULE_7__utils_ShortcutMaestro_js__["a" /* default */]();
        this.availableViews   = {
            LIST: {
                index: 0,
                class: __WEBPACK_IMPORTED_MODULE_15__views_ListView_js__["a" /* default */]
            },
            ALBUM: {
                index: 1,
                class: null
            }
        };
        document.body.appendChild(this.mainContainer);
        this._consoleWelcome();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addTracksToPlaylist (public)
     * class  : App
     * desc   : Add tracks to a playlist, including server-side
     * arg    : {object} playlist
     *          {array}  tracks
     **/
    addTracksToPlaylist(playlist, tracks) {
        let ids    = new Array(tracks.length);
        let names  = '';
        for (let i = 0; i < tracks.length; ++i) {
            ids[i] = tracks[i].id.track;
            names += tracks[i].title + ',';
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "playlist/addTracks/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id,
                TRACKS_ID:   ids
            }),
            (response) => {
                /* response = {
                 *     DONE         : bool
                 *     ERROR_H1     : string
                 *     ERROR_MSG    : string
                 * } */
                if (response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Tracks added to " + playlist.name, names + " have been added to " + playlist.name + ".");
                    playlist.getPlaylistsTracks();
                } else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR.MSG);
                }
            }
        );
    }


    /**
     * method : adjustVolume (public)
     * class  : App
     * desc   : Adjust ManaZeak volume
     * arg    : {float} amount - Value between 0 and 1
     **/
    adjustVolume(amount) {
        this.setVolume(this.player.getPlayer().volume + amount);
    }


    /**
     * method : changePageTitle (public)
     * class  : App
     * desc   : Change page title
     * arg    : {string} path - Current track path
     **/
    changePageTitle(path) {
        // IDEA : Recontruct from Track attributes bc special char won't display as below ... (?/etc.)
        document.title = path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, ''); // Automatically remove path to file and any extension
    }


    /**
     * method : getActivePlaylist (public)
     * class  : App
     * desc   : Returns the active playlist
     *
     **/
    getActivePlaylist() {
        return this.activePlaylist ? this.activePlaylist : null;
    }


    /**
     * method : getVolume (public)
     * class  : App
     * desc   : return the current volume
     **/
    getVolume() {
        return this.player.getVolume();
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Change the active playlist
     **/
    changePlaylist(playlistID) {
        let newActive = playlistID != null ? this.playlists.get(playlistID) : this.playlists.getDefault();
        if (newActive) {
            this.activePlaylist = newActive;
            this.activePlaylist.activate();
            return true;
        }
        this.activePlaylist = null;
        return false;
    }


    /**
     * method : changePlaylist (public)
     * class  : App
     * desc   : Update FootBar PlaylistPreview
     * arg    : {object} track - The track to set as current
     *          {bool} previous - For server about history
     **/
    changeTrack(track, previous) {
        if (track == null) {
            return false;
        }

        let that            = this;
        let lastTrackPath   = this.player.player.attributes.getNamedItem("src"); // To update statistic on the previous track

        if (lastTrackPath !== null) {
            lastTrackPath   = lastTrackPath.value;
        }

        else {
            lastTrackPath   = "None";
        }

        let duration_played = (this.player.getCurrentTime() * 100) / this.player.getDuration();
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/getPath/",
            JSON.stringify({
                TRACK_ID:         track.id.track,
                LAST_TRACK_PATH:  lastTrackPath,
                TRACK_PERCENTAGE: isNaN(duration_played) ? 0 : duration_played,
                PREVIOUS:         previous
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     TRACK_PATH  : string
                 * } */
                if (response.DONE) {
                    that.player.changeSource(".." + response.TRACK_PATH, track.id.track);
                    that.changePageTitle(response.TRACK_PATH);
                    that.activePlaylist.setCurrentTrack(track);
                    that.togglePlay();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );

        return true;
    }

    /**
     * method : changeView (public)
     * class  : App
     * desc   : Change the main view
     * arg    : {object} view - The view to set
     **/
    changeView(view) {
        for (let i = 0; i < this.mainContainer.children.length; ++i) {
            this.mainContainer.children[i].classList.add('mzk-view-hide');
        }

        let container = view.getContainer();
        container.classList.remove('mzk-view-hide');
        if (container.parentNode != this.mainContainer) {
            this.mainContainer.appendChild(container);
        }
    }


    /**
     * method : createAppView (public)
     * class  : App
     * desc   : Create an AppView
     * arg    : {string} name - The view name
     *          {object} view - The View object
     **/
    createAppView(name, view) {
        if (this.appViews[name] == null) {
            this.appViews[name] = view;
            return true;
        }

        else {
            return false;
        }
    }


    /**
     * method : deletePlaylist (public)
     * class  : App
     * desc   : Ask server to delete a playlist from a given ID
     * arg    : {int} id - The playlist ID
     * arg    : {function} callback - Not mandatory
     **/
    deletePlaylist(playlist, callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "collection/delete/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    that.playlists.remove(playlist.id);
                    let nextPlaylist = that.playlists.getDefault();
                    if (nextPlaylist != null) {
                        that.changePlaylist(nextPlaylist.id);
                    }

                    else {
                        that.mainContainer.innerHTML = '';
                        that.requestNewLibrary();
                    }

                    if (callback) {
                        callback();
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : deleteUser (public)
     * class  : App
     * desc   : Remove a user from DB via its ID
     * arg    : {int} id - The user ID to delete
     *        : {function} callback - The function to callback - Mandatory
     **/
    deleteUser(id, callback) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "admin/removeUserById/",
            JSON.stringify({
                USER_ID: id
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    callback();
                }
            }
        );
    }


    /**
     * method : downloadTrack (public)
     * class  : App
     * desc   : Download a single track
     * arg    : {object} track - The track to download
     **/
    downloadTrack(track) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/download/",
            JSON.stringify({
                TRACK_ID: track.id.track
            }),
            function (response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     DOWNLOAD_PATH : string
                 * } */
                if (response.DONE) {
                    let dl      = document.createElement("A");
                    dl.href     = response.DOWNLOAD_PATH;
                    dl.download = response.DOWNLOAD_PATH.replace(/^.*[\\\/]/, '');
                    document.body.appendChild(dl);
                    dl.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    document.body.removeChild(dl);
                    //TODO: What is ZEAZZZZ ???!!!
                    dl.remove();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : downloadTracksZip (public)
     * class  : App
     * desc   : Download mutliple tracks
     * arg    : {[object]} tracks - The tracks to download
     **/
    downloadTracksZip(tracks) {
        let ids    = new Array(tracks.length);
        for (let i = 0; i < tracks.length; ++i) {
            ids[i] = tracks[i].id.track;
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/multiDownload/",
            JSON.stringify({
                TRACKS_ID: ids
            }),
            function (response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     DOWNLOAD_PATH      : string
                 * } */
                if (response.DONE) {
                    let dl      = document.createElement("A");
                    dl.href     = response.DOWNLOAD_PATH;
                    dl.download = response.DOWNLOAD_PATH.replace(/^.*[\\\/]/, '');
                    document.body.appendChild(dl);
                    dl.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                    document.body.removeChild(dl);
                    //TODO: What is ZEAZZZZ ???!!!
                    dl.remove();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : fastForward (public)
     * class  : App
     * desc   : Fast forward playback
     * arg    : {int} amount - Time in seconds
     **/
    fastForward(amount) {
        this.player.getPlayer().currentTime += amount;
    }


    /**
     * method : getPlaylistFromId (public)
     * class  : App
     * desc   : Returns a playlist from a given ID
     * arg    : {int} id - The playlist to get from an ID
     **/
    getPlaylistFromId(id) {
        this.playlists.get(id);
    }


    /**
     * method : getPlaylists (public)
     * class  : App
     * desc   : Get user playlists only
     * return : {object} element
     **/
    getPlaylists() {
        return this.playlists.filter(function() {
            return this.getIsLibrary() == false;
        });
    }


    /**
     * method : getShortcutMaestro (public)
     * class  : App
     * desc   : Get the shortcut maestro
     **/
    getShortcutMaestro() {
        return this.shortcutMaestro;
    }


    /**
     * method : hidePageContent (public)
     * class  : App
     * desc   : Hide any content in mainContainer
     **/
    hidePageContent() {
        addInvisibilityLock(this.footBar.getFootBar());
        addInvisibilityLock(this.mainContainer);
        addInvisibilityLock(this.topBar.getTopBar());
    }


    /**
     * method : init (public)
     * class  : App
     * desc   : Init components and request user playlist from server
     **/
    init() {
        this.topBar  = new __WEBPACK_IMPORTED_MODULE_3__components_TopBar_js__["a" /* default */]();
        this.queue   = new __WEBPACK_IMPORTED_MODULE_9__core_Queue_js__["a" /* default */]();
        this.player  = new __WEBPACK_IMPORTED_MODULE_10__core_Player_js__["a" /* default */]();
        this.footBar = new __WEBPACK_IMPORTED_MODULE_1__components_FootBar_js__["a" /* default */]();
        document.body.appendChild(this.topBar.getTopBar());
        document.body.appendChild(this.footBar.getFootBar());

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])( // Loading playlists
            "playlist/fetchAll/",
            function(response) {
                /* response = {
                 *     DONE                : bool
                 *     ERROR_H1            : string
                 *     ERROR_MSG           : string
                 *
                 *     PLAYLIST_IDS        : int[] / undefined
                 *     PLAYLIST_NAMES      : string[] / undefined
                 *     PLAYLIST_IS_LIBRARY : bool[] / undefined
                 * } */
                that._appStart(response); // Response is tested in _appStart
            }
        );
    }


    /**
     * method : logOut (public)
     * class  : App
     * desc   : Log out from current user
     **/
    logOut() {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["f" /* getRequest */])(
            "logout",
            function() {
                location.reload();
            }
        );
    }


    /**
     * method : moveQueue (public)
     * class  : App
     * desc   : TODO
     * arg    : {type} element - TODO
     **/
    moveQueue(element, newPos) {
        this.queue.slide(element, newPos);
    }


    /**
     * method : mute (public)
     * class  : App
     * desc   : Mute playback
     **/
    mute() {
        this.player.mute();
    }


    /**
     * method : next (public)
     * class  : App
     * desc   : Get next track
     **/
    next() {
        if (this.queue.isEmpty() == false) {
            this.popQueue();
        }

        else {
            this.activePlaylist.playNextTrack();
        }
    }


    /**
     * method : playerLoadedMetadata
     * class  : App
     * desc   : fired when the player has loaded the file metadata
     **/
    playerLoadedMetadata() {

    }


    /**
     * method : popQueue (public)
     * class  : App
     * desc   : TODO
     **/
    popQueue() {
        this.changeTrack(this.queue.dequeue(), false);
    }


    /**
     * method : previous (public)
     * class  : App
     * desc   : Get previous track
     **/
    previous() {
        if (!this.player.isEmpty()) {
            this.activePlaylist.playPreviousTrack();
        }
    }


    /**
     * method : pushQueue (public)
     * class  : App
     * desc   : TODO
     * arg    : {object} track - The Track to push in Queue
     **/
    pushQueue(track) {
        this.queue.enqueue(track);
    }

    /**
     * method : removeTracksFromPlaylist (public)
     * class  : App
     * desc   : Request tracks to be deleted from the playlist
     * arg    : {object} Playlist
     *          {array}  tracks;
     */
    removeTracksFromPlaylist(playlist, tracks) {
        let ids    = new Array(tracks.length);
        let names  = '';
        for (let i = 0; i < tracks.length; ++i ) {
            ids[i] = tracks[i].id.track;
            names += tracks[i].title + ',';
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "playlist/removeTracks/",
            JSON.stringify({
                PLAYLIST_ID: playlist.id,
                TRACKS_ID:   ids
            }),
            function (response) {
                /* response = {
                 *     DONE           : bool
                 *     ERROR_H1       : string
                 *     ERROR_MSG      : string
                 * } */
                if (response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Tracks removed from " + playlist.name, names + " have been removed from " + playlist.name + ".");
                    playlist.getPlaylistsTracks();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR.MSG);
                }
            });
    }


    /**
     * method : renamePlaylist (public)
     * class  : App
     * desc   : Renames a playlist/library from its ID
     * arg    : {int} id - The playlist's ID to rename
     *        : {string} name - The name to give to the playlist
     **/
    renamePlaylist(id, name) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "playlist/rename/",
            JSON.stringify({
                PLAYLIST_ID:   id,
                PLAYLIST_NAME: name
            }),
            function(response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     PLAYLIST_ID   : string
                 *     PLAYLIST_NAME : string
                 * } */
                if (response.DONE) {
                    that.playlists.rename(response.PLAYLIST_ID, response.PLAYLIST_NAME);
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : repeatTrack (public)
     * class  : App
     * desc   : Repeat current track
     **/
    repeatTrack() {
        this.player.repeatTrack();
    }


    /**
     * method : requestNewPlaylist (public)
     * class  : App
     * desc   : User requested a new playlist
     **/
    requestNewPlaylist() {
        let that = this;
        let np = new __WEBPACK_IMPORTED_MODULE_16__core_Playlist_js__["a" /* default */](0, null, false, false, undefined, function() {
            that.playlists.add(np);
            that.changePlaylist(np.id);
        });
    }


    /**
     * method : requestNewLibrary (public)
     * class  : App
     * desc   : Admin requested a new library
     **/
    requestNewLibrary() {
        let that = this;
        let nl = new __WEBPACK_IMPORTED_MODULE_16__core_Playlist_js__["a" /* default */](0, null, true, false, undefined, function() {
            that.playlists.add(nl);
            that.changePlaylist(nl.id);
        });
    }


    /**
     * method : hidePageContent (public)
     * class  : App
     * desc   : Restore any content in mainContainer
     **/
    restorePageContent() {
        removeInvisibilityLock(this.footBar.getFootBar());
        removeInvisibilityLock(this.mainContainer);
        removeInvisibilityLock(this.topBar.getTopBar());
    }


    /**
     * method : reverseQueue (public)
     * class  : App
     * desc   : Reverse the Queue order
     * arg    : {bool} reverse
     **/
    reverseQueue(reverse) {
        this.queue.setReverse(reverse);
    }


    /**
     * method : rewind (public)
     * class  : App
     * desc   : Rewind playback
     * arg    : {int} amount - Time in seconds
     **/
    rewind(amount) {
        this.player.getPlayer().currentTime -= amount;
    }


    /**
     * method : showAppView (public)
     * class  : App
     * desc   : Show the given AppView
     * arg    : {string} name - AppView name
     **/
    showAppView(name) {
        if (this.appViews[name]) {
            this.changeView(this.appViews[name]);
        }
    }


    /**
     * method : setVolume (public)
     * class  : App
     * desc   : Set ManaZeak volume to a given value
     * arg    : {float} volume - Volume between 0 and 1
     **/
    setVolume(volume) {
        this.player.setVolume(volume);
    }


    /**
     * method : stopPlayback (public)
     * class  : App
     * desc   : Stop ManaZeak playback
     **/
    stopPlayback() {
        this.changePageTitle("ManaZeak");
        this.player.stopPlayback();
    }


    /**
     * method : toggleMute (public)
     * class  : App
     * desc   : Toggle mute on player
     **/
    toggleMute() {
        if (this.player.isMuted) {
            this.unmute();
            this.setVolume(this.player.oldVolume);
        }

        else {
            this.mute();
            this.setVolume(0);
        }
    }


    /**
     * method : togglePlay (public)
     * class  : App
     * desc   : Toggle play on player
     **/
    togglePlay() {
        if (this.player.isEmpty()) {
            this.changeTrack(this.activePlaylist.getFirstEntry(), false);
        }

        else {
            this.player.togglePlay();
        }
    }


    /**
     * method : toggleRepeat (public)
     * class  : App
     * desc   : Toggle repeat mode on playlist
     **/
    toggleRepeat() {
        this.activePlaylist.toggleRepeat();
        switch(this.activePlaylist.getRepeatMode()) {
            case 0:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change repeat mode", "Repeat off - Playback will stop by the end of your playlist.");
                break;

            case 1:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change repeat mode", "Repeat one - The current track will be repeated for ever.");
                break;

            case 2:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change repeat mode", "Repeat all - Repeat your playlist for ever.");
                break;

            default:
                break;
        }
    }


    /**
     * method : toggleShuffle (public)
     * class  : App
     * desc   : Toggle shuffle mode on playlist
     **/
    toggleShuffle() {
        this.activePlaylist.toggleShuffle();
        switch(this.activePlaylist.getShuffleMode()) {
            case 0:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change shuffle mode", "Shuffle off - Playback will follow your current view order.");
                break;

            case 1:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change shuffle mode", "Random on - Random With track repetition");
                break;

            case 2:
                new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("INFO", "Change shuffle mode", "Shuffle on - Random with no track repetition");
                break;

            default:
                break;
        }
    }


    /**
     * method : unmute (public)
     * class  : App
     * desc   : Unmute playback
     **/
    unmute() {
        this.player.unmute();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _appStart (private)
     * class  : App
     * desc   : ManaZeak start point. Fetching playlist, build UI according to those, and activate the last playlist used
     **/
    _appStart(playlists) {
        let that = this;
        if (playlists.DONE) { // User already have playlists
            let modal = new __WEBPACK_IMPORTED_MODULE_18__utils_Modal_js__["a" /* default */]("fetchPlaylists"); // TODO : gen unique ID from utils here
            modal.open();

            for (let i = 0; i < playlists.PLAYLIST_IDS.length; ++i) {
                that.playlists.add(new __WEBPACK_IMPORTED_MODULE_16__core_Playlist_js__["a" /* default */](playlists.PLAYLIST_IDS[i],
                    playlists.PLAYLIST_NAMES[i],
                    playlists.PLAYLIST_IS_LIBRARY[i],
                    true,
                    undefined,
                    undefined));
            }

            let defPlaylist = this.playlists.getDefault();
            defPlaylist.getPlaylistsTracks(function() {
                modal.close();
                that.changePlaylist(that.playlists.getDefault().id);
                that.playlists.forEach(function() {
                    this.getPlaylistsTracks();
                }, false);
            });
        }

        else if (playlists.ERROR_H1 === "null" && playlists.ERROR_MSG === "null") { // User first connection
            this.requestNewLibrary();
        }

        else {
            new __WEBPACK_IMPORTED_MODULE_17__utils_Notification_js__["a" /* default */]("ERROR", playlists.ERROR_H1, playlists.ERROR_MSG);
        }

        this._keyListener();
    }


    _consoleWelcome() {
        let cssRuleTitle  = "color: rgb(44, 44, 48);" +
                            "font-size: 3em;" +
                            "font-weight: bold;" +
                            "margin: 20px 0;" +
                            "text-shadow: 1px 1px 5px rgb(44, 44, 48);";
        let cssRuleHidden = "color: rgb(255, 255, 255);";
        setTimeout(console.log.bind(console, "%cManaZeak console", cssRuleTitle)); // Hiding source in console
        setTimeout(console.log.bind(console, "Hello there!\n" +
                                             "\nIf you don't know why you are here, you may close this window, and keep using ManaZeak." +
                                             "\nOtherwise, keep in mind that using this console may result in a non working app, at least on your side. "));
        setTimeout(console.log.bind(console, "%cCongratulation, you found the first key for the achievement TOAST. Here it is : ba6f7979ab2cb9096d050b7f850d50ff", cssRuleHidden));
        setTimeout(console.log.bind(console, "To know more about ManaZeak, visit https://github.com/Squadella/ManaZeak"));
        setTimeout(console.log.bind(console, "\n-----------"));
    }


    /**
     * method : _createDefaultViews (private)
     * class  : App
     * desc   : Create AppViews (Stats, Admin)
     **/
    _createDefaultViews() {
        this.createAppView('mzk_stats', new __WEBPACK_IMPORTED_MODULE_11__views_appviews_StatsView_js__["a" /* default */]());
        this.createAppView('mzk_admin', new __WEBPACK_IMPORTED_MODULE_12__views_appviews_AdminView_js__["a" /* default */]());
        this.createAppView('mzk_settings', new __WEBPACK_IMPORTED_MODULE_13__views_appviews_UserView_js__["a" /* default */]());
        this.createAppView('mzk_party', new __WEBPACK_IMPORTED_MODULE_14__views_appviews_PartyView_js__["a" /* default */]());
    }


    /**
     * method : _keyListener (private)
     * class  : App
     * desc   : App key listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'Space', function() { that.togglePlay(); }));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'Semicolon', function() { that.toggleMute(); }));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowLeft', function() { that.rewind(10); }, false));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowLeft', function() { that.rewind(30); }, true));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowRight', function() { that.fastForward(10); }, false));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowRight', function() { that.fastForward(30); }, true));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowUp', function() { that.adjustVolume(0.1); }, false));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowUp', function() { that.adjustVolume(0.01); }, true));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowDown', function() { that.adjustVolume(-0.1); }, false));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_8__utils_Shortcut_js__["a" /* default */]('keydown', 'ArrowDown', function() { that.adjustVolume(-0.01); }, true));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_footbar_TrackPreview_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_footbar_Controls_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_footbar_ProgressBar_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__elements_footbar_PlaylistPreview_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  FootBar class                                  *
 *                                                 *
 *  Handle FootBar and every components inside     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */







class FootBar extends __WEBPACK_IMPORTED_MODULE_4__core_MzkObject_js__["a" /* default */] {

    constructor() {
        super();
        this._createUI();
        this.trackPreview    = new __WEBPACK_IMPORTED_MODULE_0__elements_footbar_TrackPreview_js__["a" /* default */](this.footBar);
        this.controls        = new __WEBPACK_IMPORTED_MODULE_1__elements_footbar_Controls_js__["a" /* default */](this.controlsContainer);
        this.progressBar     = new __WEBPACK_IMPORTED_MODULE_2__elements_footbar_ProgressBar_js__["a" /* default */](this.controlsContainer);
        this.playlistPreview = new __WEBPACK_IMPORTED_MODULE_3__elements_footbar_PlaylistPreview_js__["a" /* default */](this.footBar);
        this.footBar.appendChild(this.controlsContainer);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : resetUI (public)
     * class  : FootBar
     * desc   : Reset TrackPreview and ProgressBar.
     **/
    resetUI(hidePreview) {
        this.trackPreview.resetTrackPreview();
        this.progressBar.resetProgressBar();
        if (hidePreview) {
            this.playlistPreview.setVisible(false);
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : FootBar
     * desc   : Build UI elements
     **/
    _createUI() {
        this.footBar                     = document.createElement("DIV");
        this.controlsContainer           = document.createElement("DIV");
        this.progressContainer           = document.createElement("DIV");

        this.footBar.id                  = "footBar";
        this.controlsContainer.className = "mzk-controls-container";
    }


    /**
     * method : _eventListener (private)
     * class  : FootBar
     * desc   : FootBar event listeners
     **/
    _eventListener() {
        let that = this;
        window.app.listen('stopPlayback', function() {
            that.resetUI();
        });
        window.app.listen(['fastForward', 'rewind'], function() {
            that.progressBar.updateProgress(window.app.player.getPlayer());
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getFootBar() { return this.footBar; }

}

/* harmony default export */ __webpack_exports__["a"] = (FootBar);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Modal_js__ = __webpack_require__(3);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TrackPreview class                             *
 *                                                 *
 *  Handle the track info container                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




class TrackPreview extends __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__["a" /* default */] {

    constructor(container) {
        super();
        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeTrack (public)
     * class  : TrackPreview
     * desc   : Change track details
     * arg    : {object} track - New track to get info from
     **/
    changeTrack(track) {
        this.ui.cover.src           = track.cover;
        this.ui.thumb.src           = track.cover;
        this.ui.title.innerHTML     = track.title;
        this.ui.artist.innerHTML    = track.artist;
        this.ui.album.innerHTML     = track.album;
        this.ui.year.innerHTML      = track.year;
        if (track.genre) {
            this.ui.year.innerHTML += "&nbsp;&nbsp;-&nbsp;&nbsp;";
        }
        this.ui.genre.innerHTML     = track.genre;

        this._setVisible(true);
    }


    /**
     * method : resetTrackPreview (public)
     * class  : TrackPreview
     * desc   : Reset field values and set invisible
     **/
    resetTrackPreview() {
        this.ui.cover.src        = "";
        this.ui.thumb.src        = "";
        this.ui.title.innerHTML  = "";
        this.ui.artist.innerHTML = "";
        this.ui.album.innerHTML  = "";
        this.ui.year.innerHTML   = "";
        this.ui.genre.innerHTML  = "";
        this._setVisible(false);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : TrackPreview
     * desc   : Build UI elements
     * arg    : {object} container - The TrackPreview container
     **/
    _createUI(container) {
        this.ui = {
            container:                   document.createElement("DIV"),
            thumb:                       document.createElement("IMG"),
            cover:                       document.createElement("IMG"),
            title:                       document.createElement("LI"),
            artist:                      document.createElement("LI"),
            album:                       document.createElement("LI"),
            genreYear:                   document.createElement("LI"),
            year:                        document.createElement("SPAN"),
            genre:                       document.createElement("SPAN"),
            thumbTooltip:                document.createElement("SPAN")
        };
        this.tooltipWrapper            = document.createElement("DIV");
        this.listContainer             = document.createElement("UL");

        this.ui.container.id           = "trackPreview";
        this.tooltipWrapper.className  = "tooltipWrapper";
        this.ui.cover.id               = "trackPreviewCover";
        this.ui.thumb.id               = "trackPreviewThumb";
        this.ui.thumbTooltip.className = "tooltipTrackCover";
        this.ui.title.id               = "trackPreviewTitle";
        this.ui.artist.id              = "trackPreviewArtist";
        this.ui.album.id               = "trackPreviewAlbum";
        this.ui.year.id                = "trackPreviewYear";
        this.ui.genre.id               = "trackPreviewGenre";
        this.ui.cover.src              = "/static/img/utils/defaultcover.svg";
        this.ui.thumb.src              = "/static/img/utils/defaultcover.svg";

        this.ui.thumbTooltip.appendChild(this.ui.thumb);
        this.tooltipWrapper.appendChild(this.ui.cover);
        this.tooltipWrapper.appendChild(this.ui.thumbTooltip);
        this.ui.genreYear.appendChild(this.ui.year);
        this.ui.genreYear.appendChild(this.ui.genre);
        this.listContainer.appendChild(this.ui.title);
        this.listContainer.appendChild(this.ui.artist);
        this.listContainer.appendChild(this.ui.album);
        this.listContainer.appendChild(this.ui.genreYear);
        this.ui.container.appendChild(this.tooltipWrapper);
        this.ui.container.appendChild(this.listContainer);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : TrackPreview
     * desc   : TrackPreview event listeners
     **/
    _eventListener() {
        this.ui.cover.addEventListener("click", function() {
            let modal = new __WEBPACK_IMPORTED_MODULE_1__utils_Modal_js__["a" /* default */]("cover", {
                src:    that.ui.cover.src,
                artist: that.ui.artist.innerHTML,
                album:  that.ui.album.innerHTML,
                year:   that.ui.year.innerHTML
            });
            modal.open();
        });
        let that = this;
        window.app.listen('changeTrack', function(track) {
            that.changeTrack(track);
        });
        window.app.listen("togglePlay", function() {
            that._setVisible(true);
        });
        window.app.listen("stopPlayback", function() {
            that._setVisible(false);
        });
    }


    /**
     * method : setVisible (private)
     * class  : TrackPreview
     * desc   : Change visibility status of TrackPreview
     * arg    : {bool} visible
     **/
    _setVisible(visible) {
        this.ui.container.style.opacity = visible ? 1 : 0;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TrackPreview);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  MzkListener class                      *
 *                                         *
 *  Class for handling app event listeners *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class MzkListener {

    constructor(name, description, callback, thisArg) {
        this.name     = name;
        this.desc     = description;
        this.callback = callback;
        this.thisArg  = thisArg;
        this.active   = true;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : runCallback (public)
     * class  : MzkListener
     * desc   : Run the callback
     * arg    : {array} args - the arguments to be applied to the callback
     **/
    runCallback(args) {
        if (this.active == true) {
            this.callback.apply(this.thisArg, args);
        }
    }


    /**
     * method : setActive (public)
     * class  : MzkListener
     * desc   : Set whether the callback should be run
     * arg    : {bool} active - the new state
     **/
    setActive(active) {
        this.active = active;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (MzkListener);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_MultiSelect_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entries_EditTagEntry_js__ = __webpack_require__(17);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */





class EditTag {

    constructor(container, data) {
        this.data     = data;
        this.send     = [];
        this.entries  = [];
        this.selector = new __WEBPACK_IMPORTED_MODULE_1__utils_MultiSelect_js__["a" /* default */]();
        this.keepStr  = '< keep >';

        this._createUI(container);
        this._eventListener();

        this.selector.add(0); // Initializing modal with first track value
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : saveState (public)
     * class  : EditTag
     * desc   : Sending modal info to backend
     **/
    saveState() {
        let send = [];

        if (this.data.length > 1) {
            for (let i = 0; i < this.selector.get().length ;++i) {
                send.push(this.entries[this.selector.get()[i]].track.id.track);
            }
        }

        else { // One track to edit
            send.push(this.data[0].id.track);
        }

        let reqArgs = { TRACKS_ID: send };
        let fields = {
            TITLE:             this.ui.cTitleInput.value,
            YEAR:              this.ui.rYearNumber.value,
            COMPOSER:          this.ui.tagComposerField.value,
            PERFORMER:         this.ui.tagPerformerField.value,
            TRACK_NUMBER:      this.ui.rTrackNumber.value,
            ALBUM_TOTAL_TRACK: this.ui.rTrackTotal.value,
            DISC_NUMBER:       this.ui.rDiscNumber.value,
            ALBUM_TOTAL_DISC:  this.ui.rDiscTotal.value,
            LYRICS:            this.ui.lyrField.value,
            COMMENT:           this.ui.comField.value,
            ALBUM_TITLE:       this.ui.tagAlbumField.value,
            GENRE:             this.ui.tagGenreField.value,
            ARTISTS:           this.ui.cArtistInput.value,
            ALBUM_ARTISTS:     this.ui.tagAlbumArtistsField.value
        };

        for (let f in fields) {
            if (fields[f] != this.keepStr) {
                reqArgs[f] = fields[f];
            }
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/changeMetadata/",
            JSON.stringify(reqArgs),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : EditTag
     * desc   : Build UI elements
     * arg    : {object} container - The EditTag container
     **/
    _createUI(container) {
        this._uiCreateVar();
        this._uiSetVar();
        this._uiAppendVar();

        if (this.data.length > 1) {
            this.entries = new Array(this.data.length);

            for (let i = 0; i < this.data.length ;++i) {
                this.entries[i] = new __WEBPACK_IMPORTED_MODULE_2__entries_EditTagEntry_js__["a" /* default */](this.ui.list, this.data[i]);
            }

            container.style = "display: flex;";
            container.appendChild(this.ui.list);
            this.ui.container.style += "display: inline;";
            this.entries[0].setIsSelected(true);
        }

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : EditTag
     * desc   : EditTag event listeners
     **/
    _eventListener() {
        let that = this;
        this.selector.listen('clear', function() {
            for (let i = 0; i < that.entries.length; ++i) {
                that.entries[i].setIsSelected(false);
            }
        });
        this.selector.listen('add', function() {
            that._updateFields();
        });

        this.ui.list.addEventListener('click', function(event) {
            if (event.target == that.ui.list) {
                return;
            }

            if (!event.ctrlKey) {
                that.saveState(); // Saving tag before changing track
            }

            let target = event.target;
            while (target.parentNode != that.ui.list) {
                target = target.parentNode;
            }

            let ix     = target.dataset.childID;
            that.entries[ix].setIsSelected(that.selector.add(ix, event.ctrlKey));
        });
    }


    /**
     * method : _uiAppendVar (private)
     * class  : EditTag
     * desc   : Append UI elements, building final UI
     **/
    _uiAppendVar() {
        // Head --------------------------------------------------
        this.ui.cForm.appendChild(this.ui.cTitleLabel);
        this.ui.cForm.appendChild(this.ui.cTitleInput);
        this.ui.cForm.appendChild(this.ui.cArtistLabel);
        this.ui.cForm.appendChild(this.ui.cArtistInput);
        this.ui.rTrackForm.appendChild(this.ui.rTrackLabel);
        this.ui.rTrackForm.appendChild(this.ui.rTrackNumber);
        this.ui.rTrackForm.appendChild(this.ui.rTrackSeparator);
        this.ui.rTrackForm.appendChild(this.ui.rTrackTotal);
        this.ui.rTrackContainer.appendChild(this.ui.rTrackForm);
        this.ui.rDiscForm.appendChild(this.ui.rDiscLabel);
        this.ui.rDiscForm.appendChild(this.ui.rDiscNumber);
        this.ui.rDiscForm.appendChild(this.ui.rDiscSeparator);
        this.ui.rDiscForm.appendChild(this.ui.rDiscTotal);
        this.ui.rDiscContainer.appendChild(this.ui.rDiscForm);
        this.ui.rYearForm.appendChild(this.ui.rYearLabel);
        this.ui.rYearForm.appendChild(this.ui.rYearNumber);
        this.ui.rYearContainer.appendChild(this.ui.rYearForm);
        this.ui.rWrapper.appendChild(this.ui.rTrackContainer);
        this.ui.rWrapper.appendChild(this.ui.rDiscContainer);
        this.ui.rWrapper.appendChild(this.ui.rYearContainer);
        this.ui.lContainer.appendChild(this.ui.lCover);
        this.ui.cContainer.appendChild(this.ui.cForm);
        this.ui.rContainer.appendChild(this.ui.rWrapper);
        this.ui.head.appendChild(this.ui.lContainer);
        this.ui.head.appendChild(this.ui.cContainer);
        this.ui.head.appendChild(this.ui.rContainer);
        // Tags --------------------------------------------------
        this.ui.tagForm.appendChild(this.ui.tagAlbumLabel);
        this.ui.tagForm.appendChild(this.ui.tagAlbumField);
        this.ui.tagForm.appendChild(this.ui.tagAlbumArtistsLabel);
        this.ui.tagForm.appendChild(this.ui.tagAlbumArtistsField);
        this.ui.tagForm.appendChild(this.ui.tagComposerLabel);
        this.ui.tagForm.appendChild(this.ui.tagComposerField);
        this.ui.tagForm.appendChild(this.ui.tagPerformerLabel);
        this.ui.tagForm.appendChild(this.ui.tagPerformerField);
        this.ui.tagForm.appendChild(this.ui.tagGenreLabel);
        this.ui.tagForm.appendChild(this.ui.tagGenreField);
        this.ui.tagWrapper.appendChild(this.ui.tagForm);
        this.ui.tags.appendChild(this.ui.tagWrapper);
        // Coms --------------------------------------------------
        this.ui.comForm.appendChild(this.ui.comLabel);
        this.ui.comForm.appendChild(this.ui.comField);
        this.ui.lyrForm.appendChild(this.ui.lyrLabel);
        this.ui.lyrForm.appendChild(this.ui.lyrField);
        this.ui.comElement.appendChild(this.ui.comForm);
        this.ui.lyrElement.appendChild(this.ui.lyrForm);
        this.ui.coms.appendChild(this.ui.comElement);
        this.ui.coms.appendChild(this.ui.lyrElement);
        // Info --------------------------------------------------
        this.ui.info.appendChild(this.ui.lineOne);
        this.ui.info.appendChild(this.ui.lineTwo);
        // Add element in local container ------------------------
        this.ui.container.appendChild(this.ui.head);
        this.ui.container.appendChild(this.ui.tags);
        this.ui.container.appendChild(this.ui.coms);
        this.ui.container.appendChild(this.ui.info);
    }


    /**
     * method : _uiCreateVar (private)
     * class  : EditTag
     * desc   : Creating UI elements
     **/
    _uiCreateVar() {
        this.ui = {
            container:            document.createElement("DIV"),
            // List --------------------------
            list:                 document.createElement("DIV"),
            // Head --------------------------
            head:                 document.createElement("DIV"),
            lContainer:           document.createElement("DIV"),
            lCover:               document.createElement("IMG"),
            cContainer:           document.createElement("DIV"),
            cForm:                document.createElement("FORM"),
            cTitleLabel:          document.createElement("P"),
            cTitleInput:          document.createElement("INPUT"),
            cArtistLabel:         document.createElement("P"),
            cArtistInput:         document.createElement("INPUT"),
            rContainer:           document.createElement("DIV"),
            rWrapper:             document.createElement("DIV"),
            rTrackContainer:      document.createElement("DIV"),
            rTrackForm:           document.createElement("FORM"),
            rTrackLabel:          document.createElement("SPAN"),
            rTrackNumber:         document.createElement("INPUT"),
            rTrackSeparator:      document.createElement("SPAN"),
            rTrackTotal:          document.createElement("INPUT"),
            rDiscContainer:       document.createElement("DIV"),
            rDiscForm:            document.createElement("FORM"),
            rDiscLabel:           document.createElement("SPAN"),
            rDiscNumber:          document.createElement("INPUT"),
            rDiscSeparator:       document.createElement("SPAN"),
            rDiscTotal:           document.createElement("INPUT"),
            rYearContainer:       document.createElement("DIV"),
            rYearForm:            document.createElement("FORM"),
            rYearLabel:           document.createElement("SPAN"),
            rYearNumber:          document.createElement("INPUT"),
            // Tags --------------------------
            tags:                 document.createElement("DIV"),
            tagWrapper:           document.createElement("DIV"),
            tagForm:              document.createElement("FORM"),
            tagAlbumLabel:        document.createElement("P"),
            tagAlbumField:        document.createElement("INPUT"),
            tagAlbumArtistsLabel: document.createElement("P"),
            tagAlbumArtistsField: document.createElement("INPUT"),
            tagComposerLabel:     document.createElement("P"),
            tagComposerField:     document.createElement("INPUT"),
            tagPerformerLabel:    document.createElement("P"),
            tagPerformerField:    document.createElement("INPUT"),
            tagGenreLabel:        document.createElement("P"),
            tagGenreField:        document.createElement("INPUT"),
            // Coms --------------------------
            coms:                 document.createElement("DIV"),
            comElement:           document.createElement("DIV"),
            comForm:              document.createElement("FORM"),
            comLabel:             document.createElement("P"),
            comField:             document.createElement("TEXTAREA"),
            lyrElement:           document.createElement("DIV"),
            lyrForm:              document.createElement("FORM"),
            lyrLabel:             document.createElement("P"),
            lyrField:             document.createElement("TEXTAREA"),
            // Info --------------------------
            info:                 document.createElement("DIV"),
            lineOne:              document.createElement("P"),
            lineTwo:              document.createElement("P"),
            // Foot is handled in Modal class
        };
    }


    /**
     * method : _uiSetVar (private)
     * class  : EditTag
     * desc   : Set UI elements
     **/
    _uiSetVar() {
        this.ui.container.className            = "editTag";
        // List ------------------------------------------
        this.ui.list.className                 = "list";
        // Head ------------------------------------------
        this.ui.head.className                 = "head";
        this.ui.lContainer.className           = "img-container";
        this.ui.cContainer.className           = "art-tit-container";
        this.ui.cTitleLabel.innerHTML          = "Title :";
        this.ui.cTitleInput.name               = "title";
        this.ui.cTitleInput.type               = "text";
        this.ui.cArtistLabel.className         = "space-up";
        this.ui.cArtistLabel.innerHTML         = "Artist :";
        this.ui.cArtistInput.name              = "artist";
        this.ui.cArtistInput.type              = "text";
        this.ui.rContainer.className           = "numbs-year-container";
        this.ui.rWrapper.className             = "item-wrapper";
        this.ui.rTrackContainer.className      = "item";
        this.ui.rTrackLabel.innerHTML          = "Track # : ";
        this.ui.rTrackNumber.name              = "track-number";
        this.ui.rTrackNumber.type              = "text";
        this.ui.rTrackSeparator.innerHTML      = "/";
        this.ui.rTrackTotal.name               = "track-total";
        this.ui.rTrackTotal.type               = "text";
        this.ui.rDiscContainer.className       = "item";
        this.ui.rDiscLabel.innerHTML           = "Disc # : ";
        this.ui.rDiscNumber.name               = "disc-number";
        this.ui.rDiscNumber.type               = "text";
        this.ui.rDiscSeparator.innerHTML       = "/";
        this.ui.rDiscTotal.name                = "disc-number";
        this.ui.rDiscTotal.type                = "text";
        this.ui.rYearContainer.className       = "item";
        this.ui.rYearLabel.innerHTML           = "Year : ";
        this.ui.rYearNumber.name               = "year";
        this.ui.rYearNumber.type               = "text";
        this.ui.rYearNumber.className          = "year";
        // Tags ------------------------------------------
        this.ui.tags.className                 = "tags";
        this.ui.tagWrapper.className           = "tags-wrapper";
        this.ui.tagAlbumLabel.innerHTML        = "Album :";
        this.ui.tagAlbumField.name             = "album";
        this.ui.tagAlbumField.type             = "text";
        this.ui.tagAlbumArtistsLabel.innerHTML = "Album artists :";
        this.ui.tagAlbumArtistsField.name      = "album-artists";
        this.ui.tagAlbumArtistsField.type      = "text";
        this.ui.tagComposerLabel.innerHTML     = "Composer :";
        this.ui.tagComposerField.name          = "composer";
        this.ui.tagComposerField.type          = "text";
        this.ui.tagPerformerLabel.innerHTML    = "Performer :";
        this.ui.tagPerformerField.name         = "performer";
        this.ui.tagPerformerField.type         = "text";
        this.ui.tagGenreLabel.innerHTML        = "Genre :";
        this.ui.tagGenreField.name             = "genre";
        this.ui.tagGenreField.type             = "text";
        this.ui.tagGenreField.className        = "no-margin";
        // Coms ------------------------------------------
        this.ui.coms.className                 = "coms";
        this.ui.comElement.className           = "element";
        this.ui.comLabel.innerHTML             = "Comment :";
        this.ui.comField.name                  = "comment";
        this.ui.comField.row                   = "8";
        this.ui.comField.cols                  = "80";
        this.ui.lyrElement.className           = "element";
        this.ui.lyrLabel.innerHTML             = "Lyrics :";
        this.ui.lyrField.name                  = "lyrics";
        this.ui.lyrField.row                   = "8";
        this.ui.lyrField.cols                  = "80";
        this.ui.lyrField.className             = "center";
        // Info ------------------------------------------
        this.ui.info.className                 = "info";
    }


    /**
     * method : _updateFields (private)
     * class  : EditTag
     * desc   : Update every fields in edit modal
     * arg    : {object} track - The track to take data from
     **/
    _updateFields() {

        let tracks = this.selector.get();
        let tmp;

        let fields = {
            cover: '',
            title: '',
            year: '',
            composer: '',
            performer: '',
            track: '',
            trackTotal: '',
            disc: '',
            discTotal: '',
            lyrics: '',
            comment: '',
            album: '',
            genre: '',
            artist: '',
            albumArtist: ''
        };

        if (tracks[0]) {
            tmp = this.entries[tracks[0]].track;

            for (let f in fields) {
                fields[f] = tmp[f];
            }

            //Show these infos when there is only one track selected;
            if (tracks.length == 1) {
                this.ui.lineOne.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(tmp.duration) + " - " +
                                            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["i" /* rawSizeToReadableSize */])(tmp.size) + " - " +
                                            tmp.fileType + " - " +
                                            Math.round(tmp.bitRate / 1000) + " kbps - " +
                                            tmp.sampleRate + " Hz";
                this.ui.lineTwo.innerHTML = "This track has been played " + tmp.playCount + " times (" +
                                            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(tmp.playCount * tmp.duration) + ")";
                this.ui.lineOne.classList.remove('multiple');
                this.ui.lineTwo.classList.remove('multiple');
            } else {
                this.ui.lineOne.classList.add('multiple');
                this.ui.lineTwo.classList.add('multiple');
            }
        }

        for(let i = 1; i < tracks.length; ++i) {
            tmp = this.entries[tracks[i]].track;

            for(let f in fields)
                if(fields[f] != tmp[f])
                    fields[f] = this.keepStr;
        }

        if(fields.cover == this.keepStr) //TODO: default image for <keep>
            this.ui.lCover.src                 = 'FEAX_ZEAZ_PLEAZ';
        else
            this.ui.lCover.src                 = fields.cover;

        this.ui.cTitleInput.value          = fields.title;
        this.ui.rYearNumber.value          = fields.year;
        this.ui.tagComposerField.value     = fields.composer;
        this.ui.tagPerformerField.value    = fields.performer;
        this.ui.rTrackNumber.value         = fields.track;
        this.ui.rTrackTotal.value          = fields.trackTotal;
        this.ui.rDiscNumber.value          = fields.disc;
        this.ui.rDiscTotal.value           = fields.discTotal;
        this.ui.lyrField.value             = fields.lyrics;
        this.ui.comField.value             = fields.comment;
        this.ui.tagAlbumField.value        = fields.album;
        this.ui.tagGenreField.value        = fields.genre;
        this.ui.cArtistInput.value         = fields.artist;
        this.ui.tagAlbumArtistsField.value = fields.albumArtist;
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getContainer() { return this.ui.container; }

}

/* harmony default export */ __webpack_exports__["a"] = (EditTag);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  EditTag class                                  *
 *                                                 *
 *  Handle the edit tag modal                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class EditTagEntry {

    constructor(container, track) {
        this.entry                 = document.createElement("P");
        this.track                 = track;
        this.entry.innerHTML       = track.fileName;
        this.entry.dataset.childID = container.children.length;

        container.appendChild(this.entry);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : setIsSelected (public)
     * class  : EditTagEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) {
            this.entry.classList.add("mzk-selected");
        }

        else {
            this.entry.classList.remove("mzk-selected");
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (EditTagEntry);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VolumeBar_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QueuePreview_js__ = __webpack_require__(20);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Controls class                                 *
 *                                                 *
 *  Handle the player controls                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




class Controls  {

    constructor(container) {
        this._createUI(container);
        this.volumeBar    = new __WEBPACK_IMPORTED_MODULE_0__VolumeBar_js__["a" /* default */](this.container);
        this.queuePreview = new __WEBPACK_IMPORTED_MODULE_1__QueuePreview_js__["a" /* default */](this.ui.queueExpander.button);
        this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : Controls
     * desc   : Build UI elements
     * arg    : {object} container - The Controls container
     **/
    _createUI(container) {
        this.container = document.createElement("DIV");
        this.ui        = {
            play: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            stop: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            repeat: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            shuffle: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            next: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            previous: {
                button:  document.createElement("A"),
                image:   document.createElement("IMG")
            },
            queueExpander: {
                button:  document.createElement("DIV"),
                image:   document.createElement("IMG")
            }
        };

        this.container.className               = "half";
        //TODO: switch to classes wherever possible
        this.ui.play.button.id                 = "buttonPlay";
        this.ui.play.image.id                  = "imagePlay";
        this.ui.stop.button.id                 = "buttonStop";
        this.ui.stop.image.id                  = "imageStop";
        this.ui.repeat.button.id               = "buttonRepeat";
        this.ui.repeat.image.id                = "imageRepeat";
        this.ui.shuffle.button.id              = "buttonShuffle";
        this.ui.shuffle.image.id               = "imageShuffle";
        this.ui.next.button.id                 = "buttonNext";
        this.ui.next.image.id                  = "imageNext";
        this.ui.previous.button.id             = "buttonPrevious";
        this.ui.previous.image.id              = "imagePrevious";
        this.ui.queueExpander.button.className = "queueExpander";
        this.ui.queueExpander.image.id         = "imageQueueExpander";
        this.ui.play.image.src                 = "/static/img/player/play.svg";
        this.ui.stop.image.src                 = "/static/img/player/stop.svg";
        this.ui.repeat.image.src               = "/static/img/player/repeat.svg";
        this.ui.shuffle.image.src              = "/static/img/player/shuffle.svg";
        this.ui.next.image.src                 = "/static/img/player/next.svg";
        this.ui.previous.image.src             = "/static/img/player/previous.svg";
        this.ui.queueExpander.image.src        = "/static/img/player/queue.svg";

        this.ui.repeat.button.appendChild(this.ui.repeat.image);
        this.ui.shuffle.button.appendChild(this.ui.shuffle.image);
        this.ui.previous.button.appendChild(this.ui.previous.image);
        this.ui.play.button.appendChild(this.ui.play.image);
        this.ui.stop.button.appendChild(this.ui.stop.image);
        this.ui.next.button.appendChild(this.ui.next.image);
        this.ui.queueExpander.button.appendChild(this.ui.queueExpander.image);

        this.container.appendChild(this.ui.repeat.button);
        this.container.appendChild(this.ui.shuffle.button);
        this.container.appendChild(this.ui.previous.button);
        this.container.appendChild(this.ui.play.button);
        this.container.appendChild(this.ui.stop.button);
        this.container.appendChild(this.ui.next.button);
        this.container.appendChild(this.ui.queueExpander.button);

        container.appendChild(this.container);
    }


    /**
     * method : _eventListener (private)
     * class  : Controls
     * desc   : Controls event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.play.button.addEventListener("click", function() { window.app.togglePlay(); });
        this.ui.stop.button.addEventListener("click", function() { window.app.stopPlayback(); });
        this.ui.shuffle.button.addEventListener("click", function() { window.app.toggleShuffle(); });
        this.ui.repeat.button.addEventListener("click", function() { window.app.toggleRepeat(); });
        this.ui.next.button.addEventListener("click", function() { window.app.next(); });
        this.ui.previous.button.addEventListener("click", function() { window.app.previous(); });
        this.ui.queueExpander.button.addEventListener("click", function() {
            if (that.queuePreview.getIsLocked()) {
                let self = that;
                window.setTimeout(function() {
                    self.queuePreview.hide();
                    self.ui.queueExpander.image.src = "/static/img/player/queue.svg";
                }, 50); // 50ms to avoid double click open/close instant QueuePreview
            }

            else {
                let self = that;
                window.setTimeout(function() {
                    self.queuePreview.lock();
                    self.ui.queueExpander.image.src = "/static/img/player/queue-locked.svg";
                }, 50); // 50ms to avoid double click open/close instant QueuePreview
            }
        });
        window.app.listen('pushQueue', function() {
            that.queuePreview.preview();
        });
        window.app.listen(['togglePlay', 'stopPlayback'], function() {
            that._setPlayPause();
        });
    }


    /**
     * method : _setPlayPause (private)
     * class  : Controls
     * desc   : Change Play/Pause image source depending on player status
     **/
    _setPlayPause() {
        if (window.app.player.getIsPlaying() === true) {
            this.ui.play.image.src = "/static/img/player/pause.svg";
        }

        else {
            this.ui.play.image.src = "/static/img/player/play.svg";
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Controls);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Shortcut_js__ = __webpack_require__(5);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  VolumeBar class                                *
 *                                                 *
 *  Handle the volume bar depending on the         *
 *  player's volume                                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */





class VolumeBar extends __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__["a" /* default */] {

    constructor(container) {
        super();
        this.isDragging   = false;
        this.volumeLockId = -1;
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : delayHideVolume (public)
     * class  : VolumeBar
     * desc   : Delay volume bar invisibility
     **/
    delayHideVolume() {
        let that = this;

        window.clearTimeout(this.volumeLockId);
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["c" /* addVisibilityLock */])(that.volumeBar.wrapper);
        this.volumeLockId = window.setTimeout(function() {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */])(that.volumeBar.wrapper);
        }, 1500);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : VolumeBar
     * desc   : Build UI elements
     * arg    : {object} container - The VolumeBar container
     **/
    _createUI(container) {
        this.ui        = {
            mute: {
                button: document.createElement("A"),
                image:  document.createElement("IMG")
            }
        };
        this.volumeBar = {
            wrapper:    document.createElement("DIV"),
            container:  document.createElement("DIV"),
            current:    document.createElement("DIV"),
            thumb:      document.createElement("DIV")
        };

        this.volumeBar.wrapper.id   = "volumeBarWrapper";
        this.volumeBar.container.id = "volumeBar";
        this.volumeBar.current.id   = "volume";
        this.volumeBar.thumb.id     = "volumeThumb";
        this.ui.mute.button.id      = "buttonMute";
        this.ui.mute.image.id       = "imageMute";
        this.ui.mute.image.src      = "/static/img/player/volume.svg";

        this.ui.mute.button.appendChild(this.ui.mute.image);
        this.volumeBar.container.appendChild(this.volumeBar.current);
        this.volumeBar.container.appendChild(this.volumeBar.thumb);
        this.volumeBar.wrapper.appendChild(this.volumeBar.container);
        this.ui.mute.button.appendChild(this.volumeBar.wrapper);

        container.appendChild(this.ui.mute.button);
    }


    /**
     * method : _eventListener (private)
     * class  : VolumeBar
     * desc   : VolumeBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.mute.image.addEventListener("click", function() {
            window.app.toggleMute();
        });
        this.volumeBar.container.addEventListener("mousedown", that._mouseDown.bind(this));
        window.addEventListener("mousemove", this._mouseMove.bind(this));
        window.addEventListener("mouseup", this._mouseUp.bind(this));
        window.app.listen('setVolume', function() {
            that._updateVolume(window.app.getVolume());
        });
    }


    /**
     * method : _init (private)
     * class  : VolumeBar
     * desc   : Init default volume, set/store player empty source and listen
     **/
    _init() {
        this._updateVolume(window.app.getVolume());
        this._eventListener();
        this._keyListener();
    }


    /**
     * method : _eventListener (private)
     * class  : VolumeBar
     * desc   : VolumeBar event listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_2__utils_Shortcut_js__["a" /* default */]('keyup', 'ArrowUp', function() { that.delayHideVolume(); }));
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_2__utils_Shortcut_js__["a" /* default */]('keyup', 'ArrowDown', function() { that.delayHideVolume(); }));
    }


    /**
     * method : _mouseDown (private)
     * class  : VolumeBar
     * desc   : Action on mouse down event
     * arg    : {object} event - MouseEvent
     **/
    _mouseDown(event) {
        if (!this.isDragging &&
            (event.target.id === "volume" || event.target.id === "volumeBar" || event.target.id === "volumeThumb")) {
            this.isDragging = true;
            this._moveVolume(event);
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["o" /* toggleVisibilityLock */])(this.volumeBar.wrapper);
        }
    }


    /**
     * method : _mouseMove (private)
     * class  : VolumeBar
     * desc   : Action on mouse move event
     * arg    : {object} event - MouseEvent
     **/
    _mouseMove(event) {
        if (this.isDragging) {
            this._moveVolume(event);
        }
    }


    /**
     * method : _mouseUp (private)
     * class  : VolumeBar
     * desc   : Action on mouse up event
     **/
    _mouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["o" /* toggleVisibilityLock */])(this.volumeBar.wrapper);
        }
    }


    /**
     * method : _moveVolume (private)
     * class  : VolumeBar
     * desc   : Updates UI volume according to event location
     * arg    : {object} event - MouseEvent
     **/
    _moveVolume(event) {
        let boundRect                       = this.volumeBar.container.getBoundingClientRect();
        let distanceToBottomInPx            = boundRect.bottom - event.clientY;
        let distanceToBottomInPr            = (distanceToBottomInPx * 100) / boundRect.height;
        // OOB protection
        if (distanceToBottomInPr > 100) { distanceToBottomInPr = 100; }
        if (distanceToBottomInPr < 0)   { distanceToBottomInPr = 0;   }

        this.volumeBar.current.style.height = distanceToBottomInPr + "%";
        this.volumeBar.thumb.style.bottom   = distanceToBottomInPr + "%";
        window.app.setVolume(distanceToBottomInPr / 100);
    }


    /**
     * method : _updateVolume (private)
     * class  : VolumeBar
     * desc   : Updates volume to a given value
     * arg    : {int} volume - The volume to set
     **/
    _updateVolume(volume) {
        volume                              *= 100;
        this.volumeBar.current.style.height  = volume + "%";
        this.volumeBar.thumb.style.bottom    = volume + "%";

        if (volume === 0) {
            this.ui.mute.image.src           = "/static/img/player/mute.svg";
        }

        else if (volume > 0 && volume < 66) {
            this.ui.mute.image.src           = "/static/img/player/volume-half.svg";
        }

        else {
            this.ui.mute.image.src           = "/static/img/player/volume.svg";
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (VolumeBar);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Shortcut_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  QueuePreview class                             *
 *                                                 *
 *  Classical queue (pre)view                      *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */





class QueuePreview extends __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__["a" /* default */] {

    constructor(container) {
        super();
        this.contextMenu = null;
        this.reverse     = window.app.queue.isReverse();
        this.isLocked    = false;
        this._createUI(container);
        this._eventListener();
        this._keyListener();
        this._contextMenuSetup();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : hide (public)
     * class  : QueuePreview
     * desc   : Hide QueuePreview
     **/
    hide() {
        this.isLocked = false;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */])(this.ui.container);
    }


    /**
     * method : lock (public)
     * class  : QueuePreview
     * desc   : Show and lock QueuePreview
     **/
    lock() {
        this.isLocked = true;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["c" /* addVisibilityLock */])(this.ui.container);
    }


    /**
     * method : preview (public)
     * class  : QueuePreview
     * desc   : Shows a queue preview of 2 seconds
     **/
    preview() {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["g" /* isVisibilityLocked */])(this.ui.container)) {
            return;
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["c" /* addVisibilityLock */])(this.ui.container);
        window.setTimeout(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */].bind(null, this.ui.container), 2000);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntry (private)
     * class  : QueuePreview
     * desc   : Add an entry in QueuePreview
     * arg    : {object} track - The track to add as an entry
     **/
    _addEntry(track) {
        let li                         = document.createElement("LI");
        let img                        = document.createElement("IMG");
        let body                       = document.createElement("DIV");
        let title                      = document.createElement("SPAN");
        let origin                     = document.createElement("SPAN");
        let composer                   = document.createElement("SPAN");
        let qControls                  = document.createElement("DIV");
        let qControlsUp                = document.createElement("SPAN");
        let qControlsDown              = document.createElement("SPAN");

        body.className                 = "mzk-qprev-body";
        title.className                = "mzk-qprev-title";
        origin.className               = "mzk-qprev-origin";
        composer.className             = "mzk-qprev-composer";
        qControls.className            = "mzk-qprev-controls";

        title.innerText                = track.title;
        origin.innerText               = track.artist + ' - ' + track.album + ' (' + track.year + ')';
        composer.innerText             = 'Composed by: ' + track.composer;
        qControlsUp.innerText          = "U";
        qControlsDown.innerText        = "D";
        img.src                        = track.cover;

        qControlsUp.dataset.callback   = "moveUp";
        qControlsDown.dataset.callback = "moveDown";

        body.appendChild(title);
        body.appendChild(origin);
        body.appendChild(composer);

        qControls.appendChild(qControlsUp);
        qControls.appendChild(qControlsDown);

        li.appendChild(img);
        li.appendChild(body);
        li.appendChild(qControls);

        this.ui.queueList.appendChild(li);
    }


    /**
     * method : _contextMenuSetup (private)
     * class  : QueuePreview
     * desc   : TODO
     **/
    _contextMenuSetup() {

    }


    /**
     * method : _createUI (private)
     * class  : QueuePreview
     * desc   : Build UI elements
     * arg    : {object} container - The QueuePreview container
     **/
    _createUI(container) {
        this.ui = {
            container:      document.createElement("DIV"),
            statusBar:  {
                container:  document.createElement("DIV"),
                trackCount: document.createElement("SPAN"),
                reverseBox: document.createElement("INPUT"),
                reverseLbl: document.createElement("LABEL")
            },
            queueList:      document.createElement("UL"),
            queueEmpty:     document.createElement("LI")
        };

        this.ui.container.className            = "mzk-queue-preview";
        this.ui.statusBar.container.className  = "mzk-queue-status";
        this.ui.queueList.className            = "mzk-queue-list";
        this.ui.queueEmpty.className           = "mzk-queue-empty";
        this.ui.statusBar.trackCount.innerText = "0 tracks";
        this.ui.statusBar.reverseLbl.innerText = "Reverse Play:";
        this.ui.statusBar.reverseBox.type      = "checkbox";
        this.ui.statusBar.reverseBox.value     = this.reverse;
        this.ui.queueEmpty.innerHTML           = "The Queue is empty";

        this.ui.queueList.appendChild(this.ui.queueEmpty);
        this.ui.statusBar.container.appendChild(this.ui.statusBar.trackCount);
        this.ui.statusBar.container.appendChild(this.ui.statusBar.reverseLbl);
        this.ui.statusBar.reverseLbl.appendChild(this.ui.statusBar.reverseBox);
        this.ui.container.appendChild(this.ui.queueList);
        this.ui.container.appendChild(this.ui.statusBar.container);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _keyListener (private)
     * class  : QueuePreview
     * desc   : QueuePreview key event listeners
     **/
    _keyListener() {
        let that = this;
        this.addShortcut(new __WEBPACK_IMPORTED_MODULE_1__utils_Shortcut_js__["a" /* default */]('keydown', 'KeyA', function() {
            if (that.isLocked) {
                that.hide();
            }

            else {
                that.lock();
            }
        }));
    }


    /**
     * method : _eventListener (private)
     * class  : QueuePreview
     * desc   : QueuePreview event listeners
     **/
    _eventListener() {
        let that = this;
        let findParentLI = function(element) {
            while (element.tagName !== 'UL' && element.tagName !== 'LI') {
                element = element.parentNode;

                if (element.tagName === 'LI') { return element; }
                else                          { return null;    }
            }
        };
        this.ui.statusBar.reverseBox.addEventListener('click', function() {
            window.app.reverseQueue(!that.reverse);
            that.ui.statusBar.reverseBox.checked ^= true;
        });
        this.ui.queueList.addEventListener('click', function(event) {
            let li, sib;

            switch (event.target.dataset.callback) {
                case 'moveUp':
                    li = findParentLI(event.target);

                    if (li !== null || li !== undefined) {
                        sib = li.previousSibling;

                        if (sib !== null || li !== undefined) {
                            for (let i = 0; li.parentNode.children[i] !== li; ++i) {}

                            that.ui.queueList.insertBefore(that.ui.queueList.removeChild(li), sib);
                            window.app.moveQueue(i, i -1);
                        }
                    }
                    break;

                case 'moveDown':
                    li = findParentLI(event.target);
                    if (li !== null || li !== undefined) {
                        sib = li.nextSibling;

                        if (sib !== null || li !== undefined) {
                            for (let i = 0; li.parentNode.children[i] !== li; ++i) {}

                            that.ui.queueList.insertBefore(that.ui.queueList.removeChild(li), sib.nextSibling);
                            window.app.moveQueue(i, i + 1);
                        }

                    }
                    break;

                default:
                    break;
            }
        });
        document.body.addEventListener('click', function() {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */])(that.ui.container);
        });
        window.app.listen('pushQueue', function(track) {
            that._addEntry(track);
            that.ui.statusBar.trackCount.innerText = (that.ui.queueList.childNodes.length - 1) + " tracks";
        });
        window.app.listen('popQueue', function() {
            that.ui.queueList.removeChild(that.reverse ? that.ui.queueList.lastChild : that.ui.queueList.firstChild.nextSibling);
            that.ui.statusBar.trackCount.innerText = (that.ui.queueList.childNodes.length - 1) + " tracks";
        });
        window.app.listen('reverseQueue', function(reverse) {
            that.reverse = reverse;
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsLocked() { return this.isLocked; }

}

/* harmony default export */ __webpack_exports__["a"] = (QueuePreview);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  ProgressBar class                              *
 *                                                 *
 *  Handle the progress bar depending on current   *
 *  track in player                                *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




class ProgressBar extends __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__["a" /* default */] {

    constructor(container) {
        super();
        this.refreshIntervalId = -1;
        this.isDragging        = false;
        this.isMouseOver       = false;
        this.isInverted        = false;
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : refreshInterval (public)
     * class  : ProgressBar
     * desc   : Start refresh interval on track
     * arg    : {object} track - The track to update progress from
     **/
    refreshInterval(track) {
        let that = this;

        this._stopRefreshInterval();
        this.refreshIntervalId = window.setInterval(function () {
            that.updateProgress(track);
        }, 50); // Firing an updateProgress every 50ms to appear smooth on moodBar
    }


    /**
     * method : resetProgressBar (public)
     * class  : ProgressBar
     * desc   : Set ProgressBar to default
     **/
    resetProgressBar () {
        this.duration.current.innerHTML         = "--:--";
        this.duration.total.innerHTML           = "--:--";
        this.duration.hover.innerHTML           = "--:--";

        this.progressBar.current.style.width    = 0 + "%";
        this.progressBar.thumb.style.marginLeft = 0 + "%";

        if (this.moodbar.thumb) {
            this.moodbar.thumb.style.marginLeft = 0 + "%";
        }

        this._stopRefreshInterval();
    }


    /**
     * method : setMoodbarProgress (public)
     * class  : ProgressBar
     * desc   : Set moodbar container/thumb
     **/
    setMoodbarProgress() {
        this.moodbar.container = document.getElementById("moodbar");
        this.moodbar.thumb     = document.getElementById("moodbarThumb");
    }


    /**
     * method : updateProgress (public)
     * class  : ProgressBar
     * desc   : Update ProgressBar on track
     * arg    : {object} track - The track to update progress from
     **/
    updateProgress(track) {
        let distanceToLeftBorder                = (track.currentTime * 100) / track.duration;
        this.progressBar.current.style.width    = distanceToLeftBorder + "%";
        this.progressBar.thumb.style.marginLeft = distanceToLeftBorder + "%";
        this.moodbar.thumb.style.marginLeft     = distanceToLeftBorder + "%";

        if (!this.isInverted) {
            this.duration.current.innerHTML     = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.currentTime);
            this.duration.total.innerHTML       = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.duration);
        }

        else {
            this.duration.current.innerHTML     = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.currentTime);
            this.duration.total.innerHTML       = "-" + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.duration - track.currentTime);
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : ProgressBar
     * desc   : Build UI elements
     * arg    : {object} container - The ProgressBar container
     **/
    _createUI(container) {
        this.container   = document.createElement("DIV");
        this.progressBar = {
            container:     document.createElement("DIV"),
            current:       document.createElement("DIV"),
            thumb:         document.createElement("DIV")
        };
        this.duration    = {
            current:       document.createElement("SPAN"),
            total:         document.createElement("SPAN"),
            hover:         document.createElement("DIV")
        };

        this.moodbar     = {
            container:     null,
            thumb:         null
        };

        this.container.id             = "progressBarWrapper";
        this.progressBar.container.id = "progressBar";
        this.progressBar.current.id   = "progress";
        this.progressBar.thumb.id     = "progressThumb";
        this.duration.current.id      = "currentDuration";
        this.duration.total.id        = "totalDuration";
        this.duration.hover.id        = "progressTimecodeHover";

        this.progressBar.container.appendChild(this.progressBar.current);
        this.progressBar.container.appendChild(this.progressBar.thumb);
        this.progressBar.container.appendChild(this.duration.hover);
        this.container.appendChild(this.duration.current);
        this.container.appendChild(this.progressBar.container);
        this.container.appendChild(this.duration.total);

        container.appendChild(this.container);
    }


    /**
     * method : _eventListener (private)
     * class  : ProgressBar
     * desc   : ProgressBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.progressBar.container.addEventListener("mouseover", function () { that.isMouseOver = true; });
        this.progressBar.container.addEventListener("mouseleave", function () { that.isMouseOver = false; });
        this.duration.current.addEventListener("click", this._invertTimecode.bind(this));
        this.duration.total.addEventListener("click", this._invertTimecode.bind(this));
        window.addEventListener("mousemove", this._mouseMove.bind(this));
        window.addEventListener("mouseup", this._mouseUp.bind(this));
        window.addEventListener("mousedown", this._mouseDown.bind(this));
        window.app.listen('playerLoadedMetadata', function() {
            that.refreshInterval(window.app.player.getPlayer());
        });
        window.app.listen('changeTrack', function() {
            that.resetProgressBar();
        });
        window.app.listen('changeView', function() {
            that.setMoodbarProgress();
        });
    }


    /**
     * method : _init (private)
     * class  : ProgressBar
     * desc   : Creating moodbar, setting timecodes and listen
     **/
    _init() {
        this.duration.current.innerHTML = "--:--";
        this.duration.total.innerHTML   = "--:--";
        this._eventListener();
    }


    /**
     * method : _invertTimecode (private)
     * class  : ProgressBar
     * desc   : Invert timecodes
     **/
    _invertTimecode() {
        this.isInverted = !this.isInverted;
    }


    /**
     * method : _mouseDown (private)
     * class  : ProgressBar
     * desc   : Action on mouse down event
     * arg    : {object} event - MouseEvent
     **/
    _mouseDown(event) {
        //TODO: Clean this shit up
        if (!this.isDragging && (event.target.id === "progress" || event.target.id === "progressBar" || event.target.id === "progressThumb")) {
            this.isDragging          = true;
            this._stopRefreshInterval();
            this._moveProgress(event, window.app.player.getPlayer());
            window.app.mute();
        }

        else if (!this.isDragging && (event.target.id === "moodbar" || event.target.tagName === "rect" || event.target.id === "moodbarThumb")) {
            this.isDragging          = true;
            this.isDraggingOnMoodbar = true;
            this._stopRefreshInterval();
            this._moveProgress(event, window.app.player.getPlayer());
            window.app.mute();
        }
    }


    /**
     * method : _mouseMove (private)
     * class  : ProgressBar
     * desc   : Action on mouse move event
     * arg    : {object} event - MouseEvent
     **/
    _mouseMove(event) {
        if (this.isDragging) { // Updating the ProgressBar while user is moving the mouse
            this._moveProgress(event, window.app.player.getPlayer());
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["c" /* addVisibilityLock */])(this.duration.hover);
            this._timecodeProgressHover(event, window.app.player.getPlayer());
        }

        else if (this.isMouseOver) {
            this._timecodeProgressHover(event, window.app.player.getPlayer());
        }
    }


    /**
     * method : _mouseUp (private)
     * class  : ProgressBar
     * desc   : Action on mouse up event
     **/
    _mouseUp() {
        if (this.isDragging) { // User released the ProgressBar thumb
            this.isDragging          = false;
            this.isDraggingOnMoodbar = false;

            this.refreshInterval(window.app.player.getPlayer());
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */])(this.duration.hover);
            window.app.unmute();
        }
    }


    /**
     * method : _moveProgress (private)
     * class  : ProgressBar
     * desc   : Updates UI progress according to event location
     * arg    : {object} event - MouseEvent
     *        : {object} track - The current track in player to update
     **/
    _moveProgress(event, track) {
        let boundRect = 0;

        if (this.isDraggingOnMoodbar) {
            boundRect = this.moodbar.container.getBoundingClientRect();
        }

        else {
            boundRect = this.progressBar.container.getBoundingClientRect();
        }

        if (this.isDragging) {
            let distanceToLeftInPx = event.clientX - boundRect.left;
            let distanceToLeftInPr = (distanceToLeftInPx * 100) / boundRect.width;
            // OOB protection
            if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; }
            if (distanceToLeftInPr < 0)   { distanceToLeftInPr = 0;   }
            // Style assignation
            this.progressBar.current.style.width    = distanceToLeftInPr + "%";
            this.progressBar.thumb.style.marginLeft = distanceToLeftInPr + "%";
            this.moodbar.thumb.style.marginLeft     = distanceToLeftInPr + "%";
            // Changing track currentTime
            track.currentTime = (track.duration * distanceToLeftInPr) / 100;
            // Updating progress player -- /!\ Code under this while be trigger every sec due to setInterval() in init();
            this.updateProgress(track);
        }
    }


    /**
     * method : _stopRefreshInterval (private)
     * class  : ProgressBar
     * desc   : Clear refresh interval
     **/
    _stopRefreshInterval() {
        window.clearInterval(this.refreshIntervalId);
        this.refreshIntervalId = null;
    }


    /**
     * method : _timecodeProgressHover (private)
     * class  : ProgressBar
     * desc   : Display pointer's duration on hover ProgressBar
     * arg    : {object} event - MouseEvent
     *          {object} track - The track that aggro ProgressBar
     **/
    _timecodeProgressHover(event, track) {
        let boundRect                  = this.progressBar.container.getBoundingClientRect();
        let distanceToLeftInPx         = event.clientX - boundRect.left;
        let distanceToLeftInPr         = (distanceToLeftInPx * 100) / boundRect.width;
        // Avoid OOB
        if (distanceToLeftInPr > 100) { distanceToLeftInPr = 100; }
        if (distanceToLeftInPr < 0)   { distanceToLeftInPr = 0;   }

        let hoveredTimecode            = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])((track.duration * distanceToLeftInPr) / 100);
        // We must convert back InPr to InPx ( distInPx = (boundRect.width * distanceToLeftInPr / 100) ) bc pixel size must be capped to progressBar bounds
        this.duration.hover.style.left = ((((boundRect.width * distanceToLeftInPr) / 100) - 30) * 100) / boundRect.width + "%";
        this.duration.hover.innerHTML  = hoveredTimecode;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (ProgressBar);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  PlaylistPreview class                          *
 *                                                 *
 *  Handle the playlist info container             *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




class PlaylistPreview extends __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__["a" /* default */] {

    constructor(container) {
        super();
        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changePlaylist (public)
     * class  : PlaylistPreview
     * desc   : Change track details
     * arg    : {object} playlist - New playlist to get info from
     **/
    changePlaylist(playlist) {
        // TODO : POST on getPlaylistInfo to add Total genre etc.
        this.ui.name.innerHTML     = playlist.name;
        this.ui.total.innerHTML    = playlist.trackTotal + " tracks";
        this.ui.duration.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(playlist.durationTotal);
        this._updatePlaylistPreview();
    }


    /**
     * method : setVisible (public)
     * class  : PlaylistPreview
     * desc   : Change visibility status of PlaylistPreview
     * arg    : {bool} visible
     **/
    setVisible(visible) {
        this.ui.container.style.opacity = visible ? 1 : 0;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PlaylistPreview
     * desc   : Build UI elements
     * arg    : {object} container - The PlaylistPreview container
     **/
    _createUI(container) {
        this.ui = {
            container:                  document.createElement("DIV"),
            name:                       document.createElement("LI"),
            total:                      document.createElement("LI"),
            duration:                   document.createElement("LI"),
            repeatShuffle:              document.createElement("LI"),
            repeat:                     document.createElement("SPAN"),
            genre:                      document.createElement("SPAN"),
            shuffle:                    document.createElement("SPAN")
        };
        this.tooltipWrapper           = document.createElement("DIV");
        this.listContainer            = document.createElement("UL");

        this.tooltipWrapper.className = "tooltipWrapper";
        this.ui.container.id          = "playlistPreview";
        this.ui.name.id               = "playlistPreviewName";
        this.ui.total.id              = "playlistPreviewTotal";
        this.ui.duration.id           = "playlistPreviewDuration";
        this.ui.repeat.id             = "playlistPreviewRepeat";
        this.ui.shuffle.id            = "playlistPreviewShuffle";

        this.ui.repeatShuffle.appendChild(this.ui.repeat);
        this.ui.repeatShuffle.appendChild(this.ui.shuffle);
        this.listContainer.appendChild(this.ui.name);
        this.listContainer.appendChild(this.ui.total);
        this.listContainer.appendChild(this.ui.duration);
        this.listContainer.appendChild(this.ui.repeatShuffle);
        this.ui.container.appendChild(this.listContainer);
        this.ui.container.appendChild(this.tooltipWrapper);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : PlaylistPreview
     * desc   : PlaylistPreview event listeners
     **/
    _eventListener() {
        let that = this;
        window.app.listen(['renamePlaylist', 'changePlaylist'], function() {
            let activePlaylist = window.app.getActivePlaylist();
            if (activePlaylist != null) {
                that.changePlaylist(activePlaylist);
                that.setVisible(true);
            }

            else {
                that.setVisible(false);
            }
        });
        window.app.listen(['toggleRepeat', 'toggleShuffle'], function() {
            that._updatePlaylistPreview();
        });
    }


    /**
     * method : _updatePlaylistPreview (private)
     * class  : PlaylistPreview
     * desc   : Update shuffle and repeat mode
     **/
    _updatePlaylistPreview() {
        let repeatMode  = window.app.activePlaylist.getRepeatMode();
        let shuffleMode = window.app.activePlaylist.getShuffleMode();

        switch (repeatMode) {
            case 0:
                this.ui.repeat.innerHTML = "Repeat off";
                break;

            case 1:
                this.ui.repeat.innerHTML = "Repeat one";
                break;

            case 2:
                this.ui.repeat.innerHTML = "Repeat all";
                break;

            default:
                new Notification("ERROR", "Unknown repeat mode value", "Something went wrong with the repeat mode value.");
                break;
        }

        switch (shuffleMode) {
            case 0:
                this.ui.shuffle.innerHTML = " - Shuffle off";
                break;

            case 1:
                this.ui.shuffle.innerHTML = " - Random";
                break;

            case 2:
                this.ui.shuffle.innerHTML = " - Shuffle on";
                break;

            default:
                new Notification("ERROR", "Unknown shuffle mode value", "Something went wrong with the shuffle mode value.");
                break;
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PlaylistPreview);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements_topbar_PartyMode_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_elements_topbar_WishList_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_elements_topbar_UserMenu_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_elements_topbar_CollectionBar_js__ = __webpack_require__(27);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TopBar class                                   *
 *                                                 *
 *  Handle the whole topBar and its components     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */








class TopBar extends __WEBPACK_IMPORTED_MODULE_1__core_MzkObject_js__["a" /* default */] {

    constructor() {
        super();
        this._createUI();
        this._eventListener();
        this.partyMode     = new __WEBPACK_IMPORTED_MODULE_2__elements_topbar_PartyMode_js__["a" /* default */](this.topBar);
        this.wishList      = new __WEBPACK_IMPORTED_MODULE_3__components_elements_topbar_WishList_js__["a" /* default */](this.topBar);
        this.userMenu      = new __WEBPACK_IMPORTED_MODULE_4__components_elements_topbar_UserMenu_js__["a" /* default */](this.topBar);
        this.collectionBar = new __WEBPACK_IMPORTED_MODULE_5__components_elements_topbar_CollectionBar_js__["a" /* default */](window.app.playlists, this.playlistBar);
        this.newLibMenu    = null;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeMoodbar (public)
     * class  : TopBar
     * desc   : Request the moodbar from a track ID and set it
     * arg    : {int} id - The Track ID
     **/
    changeMoodbar(id) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/getMoodbar/",
            JSON.stringify({
                TRACK_ID: id
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     TRACK_MOOD  : string
                 * } */
                let error = false;
                Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["k" /* renderMoodFile */])(response.TRACK_MOOD, that.moodbar, function() { // Callback is here in case of 404 on the moodBar
                    that.resetMoodbar();
                    error = true;
                });

                if (!that.moodbarThumb.isVisible && !error) {
                    that.moodbarThumb.isVisible = true;
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["c" /* addVisibilityLock */])(that.moodbarThumb);
                }
            }

        );
    }


    /**
     * method : resetMoodbar (public)
     * class  : TopBar
     * desc   : Erase moodbar content and hide moodbar thumb
     **/
    resetMoodbar() {
        d3.selectAll('#moodbar svg').remove();
        this.moodbarThumb.isVisible = false;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["j" /* removeVisibilityLock */])(this.moodbarThumb);
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _createUI (private)
     * class  : TopBar
     * desc   : Build UI elements
     **/
    _createUI() {
        this.topBar                      = document.createElement("DIV");
        this.moodbar                     = document.createElement("DIV");
        this.moodbarThumb                = document.createElement("DIV");
        this.playlistBar                 = document.createElement("DIV");

        this.topBar.id                   = "topBar";
        this.moodbar.id                  = "moodbar";
        this.moodbarThumb.id             = "moodbarThumb";
        this.playlistBar.id              = "playlistBar";
        this.moodbarThumb.isVisible      = false;

        this.topBar.appendChild(this.moodbar);
        this.moodbar.appendChild(this.moodbarThumb);
        this.topBar.appendChild(this.playlistBar);
    }


    /**
     * method : _eventListener (private)
     * class  : TopBar
     * desc   : TopBar event listeners
     **/
    _eventListener() {
        let that = this;
        window.app.listen('stopPlayback', function() {
            that.resetMoodbar();
        });
        window.app.listen('changeTrack', function(track) {
            that.changeMoodbar(track.id.track);
        });
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getTopBar() { return this.topBar; }

}

/* harmony default export */ __webpack_exports__["a"] = (TopBar);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  PartyMode class                                *
 *                                                 *
 *  Handle the firring of the PartyView in TopBar  *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class PartyMode {

    constructor(container) {
        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PartyMode
     * desc   : Build UI elements
     * arg    : {object} container - The PartyMode container
     **/
    _createUI(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.id = "partyMode";
        this.ui.img.src      = "/static/img/utils/party.svg";

        this.ui.container.appendChild(this.ui.img);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : PartyMode
     * desc   : PartyMode event listeners
     **/
    _eventListener() {
        this.ui.img.addEventListener("click", function() {
            window.app.showAppView("mzk_party");
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PartyMode);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__ = __webpack_require__(3);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  WishList class                                 *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO : add a list of the user's suggestions (link in modal ?)


class WishList {

    constructor(container) {
        this._createUI(container);
        this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : WishList
     * desc   : Build UI elements
     * arg    : {object} container - The WishList container
     **/
    _createUI(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.id = "wishList";
        this.ui.img.src      = "/static/img/utils/idea.svg";

        this.ui.container.appendChild(this.ui.img);
        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : WishList
     * desc   : WishList event listeners
     **/
    _eventListener() {
        this.ui.img.addEventListener("click", function() {
            let modal = new __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__["a" /* default */]("newWish");
            modal.open();
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (WishList);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ContextMenu_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_ContextMenuEntry_js__ = __webpack_require__(8);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  UserMenu class                                 *
 *                                                 *
 *  Handle the user's menu                         *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */





class UserMenu {

    constructor(container) {
        this.contextMenu = null;
        this._createUI(container);
        this._setupContextMenu();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _createUI (private)
     * class  : UserMenu
     * desc   : Build UI Elements
     * arg    : {object} container - The UserMenu container
     **/
    _createUI(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.id = "userExpander";
        this.ui.img.src      = "/static/img/utils/user.svg";

        this.ui.container.appendChild(this.ui.img);

        container.appendChild(this.ui.container);
    }


    /**
     * method : _setupContextMenu (private)
     * class  : UserMenu
     * desc   : UserMenu context menu
     **/
    _setupContextMenu() {
        let that         = this;
        this.contextMenu = new __WEBPACK_IMPORTED_MODULE_1__utils_ContextMenu_js__["a" /* default */](this.ui.container, null, 'click');

        this.contextMenu.addEntry('invite', 'Invite Code', function() {
            new __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__["a" /* default */]('inviteCode', null).open();
        });
        this.contextMenu.addEntry('settings', 'Username', function() { // TODO : replace w/ username
            window.app.showAppView('mzk_settings');
        });
        this.contextMenu.addEntry('stats', 'Stats', function() {
            window.app.showAppView('mzk_stats');
        });
        this.contextMenu.addEntry('logout', 'Log out', function() {
            window.app.logOut();
        });
        window.app.user.updateIsAdmin(function(is) {
            if (is) {
                let adm = new __WEBPACK_IMPORTED_MODULE_2__utils_ContextMenuEntry_js__["a" /* default */]('admin', 'Admin', function() {
                    window.app.showAppView('mzk_admin');
                });
                that.contextMenu.getContextMenu().addChild(adm, 'invite', false);
            }
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (UserMenu);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ContextMenu_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                           *
 *  PlaylistBarEntry sub class                               *
 *                                                           *
 *                                                           *
 *  playlist    : {int} Playlist ID in db                    *
 *  playlistBar : {bool} true => new library, false => load  *
 *  id          : {int} Playlist tracks                      *
 *  isLibrary   : {bool} Not mandatory                       *
 *                                                           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */




class PlaylistCollectionEntry {

    constructor(playlist, container) {
        //TODO: free the listeners
        this.isLibrary             = playlist.getIsLibrary();
        this.playlist              = playlist;
        this.entry                 = document.createElement("DIV");
        this.entry.dataset.childID = playlist.id;
        this.label                 = document.createElement('SPAN');
        this.label.innerHTML       = playlist.getName();
        this.entry.appendChild(this.label);

        if (this.isLibrary) {
            this.entry.className   = "library";
        }

        else {
            this.entry.className   = "playlist";
        }

        this.isSelected            = false;

        if (this.isLibrary) {
            if (window.app.user.getIsAdmin()) {
                this._createOptionButton();
            }
        }

        else {
            this._createOptionButton();
        }

        container.appendChild(this.entry);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : rename
     * class  : CollectionBarEntry
     * desc   : Rename an entry
     * arg    : {string} name
     **/
    rename(name) {
        this.label.innerHTML = name;
    }


    /**
     * method : setIsSelected (public)
     * class  : PlaylistBarEntry
     * desc   : Set entry as selected/!selected
     * arg    : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isLibrary) {
            if (this.isSelected) {
                this.entry.classList.add("librarySelected");
            }

            else {
                this.entry.classList.remove("librarySelected");
            }
        }

        else {
            if (this.isSelected) {
                this.entry.classList.add("playlistSelected");
            }

            else {
                this.entry.classList.remove("playlistSelected");
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _contextMenuSetup (private)
     * class  : ListView
     * desc   : TODO
     **/
    _contextMenuSetup() {
        let that             = this;
        this.contextMenu     = null;
        this.contextMenu     = new __WEBPACK_IMPORTED_MODULE_1__utils_ContextMenu_js__["a" /* default */](this.options, null, 'click');
        this.contextMenu.addEntry(null, "Rename", function() {
            that.modal       = new __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__["a" /* default */]("renamePlaylist", {
                name: that.playlist.name,
                id:   that.playlist.id
            });
            that.modal.open();
        });
        this.contextMenu.addEntry(null, "Delete", function() {
            that.modal       = new __WEBPACK_IMPORTED_MODULE_0__utils_Modal_js__["a" /* default */]("deletePlaylist", {
                playlist: that.playlist
            });
            that.modal.open();
        });
    }



    /**
     * method : _createOptionButton (private)
     * class  : ListView
     * desc   : Append option button to entry
     **/
    _createOptionButton() {
        let that           = this;
        // TODO : add admin options, or library options
        this.options       = document.createElement("A");
        this.options.id    = "gear";
        this.options.addEventListener("mouseleave", function() {
            if (that.contextMenu) {
                that.contextMenu.setInvisible();
            }
        });
        this.entry.appendChild(this.options);
        this._contextMenuSetup();
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getID()         { return this.entry.dataset.childID;   }
    getIsSelected() { return this.isSelected; }

}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  CollectionBar class                            *
 *                                                 *
 *  PlaylistCollection display                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */



class CollectionBar extends __WEBPACK_IMPORTED_MODULE_2__core_MzkObject_js__["a" /* default */] {

    constructor(collection, container) {
        super();
        this.collection = collection;
        this.entries    = [];
        this.newLibMenu = null;
        this._createUI(container);
        this._eventListener();
        this._contextMenuSetup();
        this.refresh();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //


    /**
     * method : refresh (private)
     * class  : CollectionBar
     * desc   : Refresh the display from the collection
     **/
    refresh() {
        this.libsContainer.innerHTML = '';
        this.playContainer.innerHTML = '';
        this.entries                 = [];

        let that = this;
        this.collection.forEach(function() {
            if (this.getIsLibrary() === true) {
                that.entries.push(new PlaylistCollectionEntry(this, that.libsContainer));
            }

            else {
                that.entries.push(new PlaylistCollectionEntry(this, that.playContainer));
            }
        });
        let activePlaylist           = window.app.getActivePlaylist();
        if (activePlaylist) {
            that.setSelected(activePlaylist.id);
        }
    }


    /**
     * method : setSelected (public)
     * class  : CollectionBar
     * desc   : Set a playlist bar entry as selected
     * arg    : {int} id - the id of the playlist to select
     **/
    setSelected(id) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getID() == id) {
                this.entries[i].setIsSelected(true);
                return;
            }
        }
    }


    /**
     * method : unSelectAll (public)
     * class  : CollectionBar
     * desc   : Unselect every entry in playlist bar
     **/
    unSelectAll() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setIsSelected(false);
        }
    }

//  --------------------------------  PRIVATE METHODS  ---------------------------------  //

    /**
     * method : _contextMenuSetup (private)
     * class  : CollectionBar
     * desc   : Setup a context menu for Add library button and listen
     **/
    _contextMenuSetup() {
        this.newLibMenu = new __WEBPACK_IMPORTED_MODULE_1__utils_ContextMenu_js__["a" /* default */](this.newButton, null, 'click');
        this.newLibMenu.addEntry(null, 'New Library', function() {
            window.app.requestNewLibrary();
        });
        this.newLibMenu.addEntry(null, 'New Playlist', function() {
            window.app.requestNewPlaylist();
        });
    }


    /**
     * method : _createUI (private)
     * class  : CollectionBar
     * desc   : Build UI elements
     * arg    : {object} container - The CollectionBar container
     **/
    _createUI(container) {
        this.element                 = document.createElement('DIV');
        this.libsContainer           = document.createElement('DIV');
        this.playContainer           = document.createElement('DIV');
        this.newButton               = document.createElement("DIV");

        this.libsContainer.className = 'no-padding';
        this.playContainer.className = 'no-padding';
        this.newButton.innerText     = '+';

        this.element.appendChild(this.libsContainer);
        this.element.appendChild(this.playContainer);
        this.element.appendChild(this.newButton);

        container.appendChild(this.element);
    }


    /**
     * method : _eventListener (private)
     * class  : CollectionBar
     * desc   : CollectionBar event listeners
     **/
    _eventListener() {
        let that = this;
        this.collection.listen(['add', 'remove', 'clear'], function() {
            that.refresh();
        });
        this.collection.listen('rename', function(id, name) {
            for (let i = 0; i < that.entries.length; ++i)
                if (that.entries[i].getID() == id) {
                    that.entries[i].rename(name);
                    return;
                }
        });
        this.element.addEventListener('click', function(event) {
            let target = event.target;
            while (target.dataset.childID == null && target != self.element) {
                target = target.parentNode;
            }

            if (target == self.element) {
                return true;
            }

            window.app.changePlaylist(target.dataset.childID);
        });
        window.app.listen('changePlaylist', function(id) {
            that.unSelectAll();
            that.setSelected(id);
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (CollectionBar);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  User class                                     *
 *                                                 *
 *  Handle user attributes and settings            *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */



class User {

    constructor() {
        this.isAdmin       = false;
        this.inviteCode    = 0;
        this.godFatherCode = 0;
        this._getUserInfo();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    updateIsAdmin(callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/isAdmin/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     IS_ADMIN  : bool
                 * } */
                if (response.DONE && response.IS_ADMIN) {
                    that.isAdmin = true;
                    callback(true);
                }

                else {
                    that.isAdmin = false;
                    callback(false);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : getIsAdmin (public)
     * class  : User
     * desc   : Get info from server and stores it locally
     * arg    : {function} callback
     **/
    _getUserInfo() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "user/getSettings/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USERNAME:
                 *     DATE_JOINED:
                 *     LAST_LOGIN:
                 *     INVITE_CODE:
                 *     IS_ADMIN:
                 *     MANACOIN:
                 *     GODFATHER_CODE:
                 *     GODFATHER_NAME:
                 * } */
                if (response.DONE) {
                    // TODO : store all values
                    that.godFatherCode = response.GODFATHER_CODE;
                    that.inviteCode    = response.INVITE_CODE;
                }

                else {

                }
            }
        );
    }


//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsAdmin() { return this.isAdmin; }
    getInviteCode() { return this.inviteCode; }

}

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                       *
 *  DragDrop class                                       *
 *                                                       *
 *  Handle the drag and drop of music files              *
 *                                                       *
 *  element : {object} TODO   *
 *                                                       *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



class DragDrop {

    constructor(element) {
      this.element = element;
      this.element.classList.add('mzk-dragdrop');
      //this.wrapper = document.createElement('DIV');
      //this.wrapper.className = 'mzk-dragdrop';

      //if(this.element.parentNode)
      //    this.element.parentNode.replaceChild(this.wrapper, this.element);

      //this.wrapper.appendChild(this.element);
      this._eventListener();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : DragDrop
     * desc   : DragDrop event listeners
     **/
    _eventListener() {
        let that = this;
        this.element.addEventListener('dragenter', function() {
           that.element.classList.add('mzk-dragdrop-show');
        });
        this.element.addEventListener('dragleave', function(event) {
            if (event.target == that.element) {
               that.element.classList.remove('mzk-dragdrop-show');
            }
        });
        this.element.addEventListener('drop', function(event) {
            let files = event.dataTransfer.files;
            that.element.classList.remove('mzk-dragdrop-show');

            let f;
            for (let i = 0; i < files.length; i++) {
                f = files[i];
                if (f.type == 'audio/flac' || f.type == 'audio/ogg' || (f.type == 'audio/mpeg' || f.type == 'audio/mp3')) {
                    let reader = new FileReader();
                    // This fires after the blob has been read/loaded.
                    reader.addEventListener('loadend', function(event) {
                        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
                            "file/upload/",
                            JSON.stringify({
                                FILENAME: f.name,
                                CONTENT:  event.target.result
                            }),
                            function(response) {
                                if (!response.DONE) {
                                    new Notification('INFO', 'Upload successful', 'Your file ' + f.name + ' has been uploaded.');
                                }
                            }
                        );
                    });
                    // Start reading the blob as text.
                    reader.readAsDataURL(f);
                } else {
                    new Notification('ERROR', 'Unsupported file format', 'The MIME format ' + f.type + ' for the file ' + f.name + ' is not supported.<br/><br/>Supported MIME formats are audio/flac, audio/ogg and audio/mpeg');
                }
            }
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (DragDrop);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  PlaylistCollection class                       *
 *                                                 *
 *  A class to handle storing the playlists        *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */



class PlaylistCollection extends __WEBPACK_IMPORTED_MODULE_0__MzkObject_js__["a" /* default */] {

    constructor() {
        super();
        this.bank = {};
        this.size = 0;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : add (public)
     * class  : PlaylistCollection
     * desc   : Add a playlist to the collection
     * arg    : {object} playlist
     **/
    add(playlist) {
        if (this.get(playlist.id) == null) {
            this.bank[playlist.id] = playlist;
            ++this.size;
            return true;
        }

        else {
            return false;
        }
    }


    /**
     * method : remove(public)
     * class  : PlaylistCollection
     * desc   : Remove a playlist from the collection
     * arg    : {inter} playlistID
     **/
    remove(playlistID) {
        if (this.get(playlistID) != null) {
            delete this.bank[playlistID];
            --this.size;
            return true;
        }

        else {
            return false;
        }
    }


    /**
     * method : rename(public)
     * class  : PlaylistCollection
     * desc   : Rename a playlist from the collection
     * arg    : {inter} playlistID
     *          {string} name
     **/
    rename(playlistID, name) {
        if (this.get(playlistID) != null) {
            this.bank[playlistID].setName(name);
            return true;
        }

        else {
            return false;
        }
    }


    /**
     * method : clear(public)
     * class  : PlaylistCollection
     * desc   : Clear the collection
     **/
    clear() {
        this.bank = {};
        this.size = 0;
    }


    /**
     * method : forEach(public)
     * class  : PlaylistCollection
     * desc   : Call a function on every playlist
     * arg    : {function} callback
     * arg    : {boolean} includeDefault - whether to call on the default playlist
     **/
    forEach(callback, includeDefault) {
        for (let i in this.bank) {
            if (includeDefault != false || this.bank[i] != this.getDefault()) {
                callback.call(this.bank[i]);
            }
        }
    }


    /**
     * method : filter(public)
     * class  : PlaylistCollection
     * desc   : return all of the playlists that satisfy the function
     * arg    : {function} filterFct
     **/
    filter(filterFct) {
        let result = new Array(this.size);
        let j      = 0;
        for (let i in this.bank) {
            if (filterFct.call(this.bank[i]) == true) {
                result[j] = this.bank[i];
                ++j;
            }
        }

        result.length = j;
        return result;
    }


    /**
     * method : get(public)
     * class  : PlaylistCollection
     * desc   : Get a playlist from the collection
     * arg    : {integer} playlistID
     **/
    get(playlistID) {
        return this.bank[playlistID];
    }


    /**
     * method : getDefault(public)
     * class  : PlaylistCollection
     * desc   : Get the default playlist from the collection
     **/
    getDefault() {
        for (let i in this.bank) {
            return this.bank[i];
        }

        return null;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PlaylistCollection);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ShortcutMaestro class                  *
 *                                         *
 *  TODO                                   *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



class ShortcutMaestro extends __WEBPACK_IMPORTED_MODULE_0__core_MzkObject_js__["a" /* default */] {

    constructor() {
        super();
        this.shortcuts  = {
            keydown:  {},
            keyup:    {},
            keypress: {}
        };
        this.stack      = [];
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : lock (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    lock(sourceObject) {
        this.stack.push(sourceObject);
    }


    /**
     * method : registerShortcut (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    registerShortcut(shortcut, sourceObject) {
        let type = shortcut.getType();
        let key  = shortcut.getKey();

        if (this.shortcuts[type] == null) {
            return;
        }

        if (this.shortcuts[type][key] == null) {
            this.shortcuts[type][key] = [];
        }

        this.shortcuts[type][key].push({
            src:   sourceObject,
            short: shortcut
        });
    }


    /**
     * method : unlock (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    unlock(sourceObject) {
        for (let i = this.stack.length; i >= 0; --i) {
            if (this.stack[i] == sourceObject) {
                this.stack.splice(i, 1);
            }
        }
    }


    /**
     * method : unregisterShortcut (public)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    unregisterShortcut(shortcut) {
        let type = shortcut.getType();
        let key  = shortcut.getKey();
        if (this.shortcuts[type] != null && this.shortcuts[type][key] != null) {
            for (let i = this.shortcuts[type][key].length; i >= 0; --i) {
                if (this.shortcuts[type][key][i].short == shortcut) {
                    this.shortcuts[type][key].splice(i, 1);
                }
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : ShortcutMaestro
     * desc   : ShortcutMaestro event listener
     */
    _eventListener() {
        document.addEventListener('keydown', this._relay.bind(this));
        document.addEventListener('keyup', this._relay.bind(this));
        document.addEventListener('keypress', this._relay.bind(this));
    }


    /**
     * method : _relay (private)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    _relay(event) {
        let fireable = this.shortcuts[event.type][event.code];
        if (fireable != null) {
            for (let i = 0; i < fireable.length; ++i) {
                if (this._canRun(fireable[i], event)) {
                    fireable[i].short.run();
                }
            }
        }
    }


    /**
     * method : _canRun (private)
     * class  : ShortcutMaestro
     * desc   : TODO
     * args   : TODO
     */
    _canRun(shortcutCapsule, event) {
        let blocked = this.stack.length == 0 ? false : this.stack[this.stack.length - 1] != shortcutCapsule.src;
        return !blocked && shortcutCapsule.short.modifiersOK(event);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (ShortcutMaestro);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MzkObject_js__ = __webpack_require__(1);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  QueueEntry (sub) Class                         *
 *                                                 *
 *  A track entry un the queue                     *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

class QueueEntry {

    constructor(track) {
        this.next     = null;
        this.previous = null;
        this.track    = track;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : addNext (public)
     * class  : QueueEntry
     * desc   : append a new QueueEntry after this one
     * arg    : {type} other - the new entry
     **/
    addNext(other) {
        if (other == null) {
            return;
        }

        other.unlink();

        if (this.next) {
            this.next.previous = other;
            other.next         = this.next;
        }

        this.next              = other;
        other.previous         = this;
    }


    /**
     * method : addPrev (public)
     * class  : QueueEntry
     * desc   : append a new QueueEntry before this one
     * arg    : {type} other - the new entry
     **/
    addPrev(other) {
        if (other == null) {
            return;
        }

        other.unlink();

        if (this.previous) {
            this.previous.next = other;
            other.previous     = this.previous;
        }

        this.previous          = other;
        other.next             = this;
    }


    /**
     * method : moveNext (public)
     * class  : QueueEntry
     * desc   : change positions with the next QueueEntry if there is one
     **/
    moveNext() {
        let tmp_t;

        if (this.next) {
            tmp_t           = this.track;
            this.track      = this.next.track;
            this.next.track = tmp_t;
        }
    }


    /**
     * method : movePrev (public)
     * class  : QueueEntry
     * desc   : change positions with the previous QueueEntry if there is one
     **/
    movePrev() {
        let tmp_t;

        if (this.previous) {
            tmp_t               = this.track;
            this.track          = this.previous.track;
            this.previous.track = tmp_t;
        }
    }


    /**
     * method : unlink (public)
     * class  : QueueEntry
     * desc   : remove this entry from the list
     **/
    unlink() {
        if (this.previous) {
            this.previous.next = this.next;
        }

        if (this.next) {
            this.next.previous = this.previous;
        }

        this.previous          = null;
        this.next              = null;
    }

}


/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Queue Class                                    *
 *                                                 *
 *  Handle the user queue, with reorder and info   *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




class Queue extends __WEBPACK_IMPORTED_MODULE_1__MzkObject_js__["a" /* default */] {

    constructor(showNotificationOnAdd) {
        super();
        this.first   = null;
        this.last    = null;
        this.reverse = false;
        this.notif   = showNotificationOnAdd;
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : dequeue (public)
     * class  : Queue
     * desc   : Remove an element in the queue
     * return : {object} The track to be played
     **/
    dequeue() {
        if (this.first == null) {
            return;
        }

        let tmp;

        if (this.reverse == true) {
            tmp            = this.last;
            this.last      = this.last.previous;

            if (this.last == null) {
                this.first = null;
            }
        }

        else {
            tmp            = this.first;
            this.first     = this.first.next;

            if (this.first == null) {
                this.last  = null;
            }
        }

        tmp.unlink();

        return tmp.track;
    }


    /**
     * method : enqueue (public)
     * class  : Queue
     * desc   : Append a new track in the queue
     * arg    : {object} track - The track to enqueue
     **/
    enqueue(track) {
        let newLink    = new QueueEntry(track);

        if (this.first == null) {
            this.first = newLink;
        }

        else {
            this.last.addNext(newLink);
        }

        this.last      = newLink;

        if (this.notif) {
            new __WEBPACK_IMPORTED_MODULE_0__utils_Notification_js__["a" /* default */]('INFO', 'Track added to Queue', track.title + 'was added to the queue');
        }
    }


    /**
     * method : isEmpty (public)
     * class  : Queue
     * desc   : Check queue emptiness
     * return : {bool}
     **/
    isEmpty() {
        return this.first == null;
    }


    /**
     * method : isReverse (public)
     * class  : Queue
     * desc   : Check is reverse status
     * return : {bool}
     **/
    isReverse() {
        return this.reverse;
    }


    /**
     * method : setReverse (public)
     * class  : Queue
     * desc   : Set reverse status
     * arg    : {bool} newReverse - Set reverse value
     **/
    setReverse(newReverse) {
        this.reverse = newReverse == true;
    }


    /**
     * method : slide (public)
     * class  : Queue
     * desc   : Move the nth element to another position in the queue
     * arg    : {int} element - the index of the track to move
     *          {int} newPos - the new desired index
     **/
    slide(element, newPos) {
        let link = this.first;
        let diff = newPos - element;

        for (; --element > 0 && link != null; link = link.next) {}

        if (link != null) {
            if (diff > 0) {
                for (; --diff > 0; link = link.next) {
                    link.moveNext();
                }
            }

            else {
                for (; ++diff < 0; link = link.previous) {
                    link.movePrev();
                }
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Queue);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Player class                                   *
 *                                                 *
 *  Handle song streaming client side,             *
 *  and std action on it                           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */



class Player {

    constructor() {
        this.player    = document.createElement("AUDIO");

        this.isPlaying = false;
        this.isMuted   = false;
        this.oldVolume = 0;
        this.emptyURL  = "";
        this.trackId   = 0;
        this._init();

        document.body.insertBefore(this.player, document.body.firstChild);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : changeSource (public)
     * class  : Player
     * desc   : Change player source and stop playback
     * arg    : {string} url - Path to targeted track
     *        : {int}     id - The associated ID
     **/
    changeSource(url, id) {
        this.trackId    = id;
        this.stopPlayback();
        this.player.src = url;
    }


    /**
     * method : isEmpty (public)
     * class  : Player
     * desc   : Test if player source is empty
     * return : {bool} true if src is empty
     **/
    isEmpty() {
        return this.player.src == this.emptyURL;
    }


    /**
     * method : mute (public)
     * class  : Player
     * desc   : Mute player and store old value
     **/
    mute() {
        this.isMuted       = true;
        this.oldVolume     = this.player.volume; // Store old volume for restoration on unmute
        this.player.volume = 0;
    }


    /**
     * method : repeatTrack (public)
     * class  : Player
     * desc   : Reset player current time and repeat the track
     **/
    repeatTrack() {
        this.player.currentTime = 0;

        if (!this.isPlaying) {
            this._play();
        }
    }


    /**
     * method : setVolume (public)
     * class  : Player
     * desc   : Set Player volume to a given value
     * arg    : {float} volume - Volume between 0 and 1
     **/
    setVolume(volume) {
        if (volume > 1) {
            volume         = 1;
        }

        else if (volume < 0) {
            volume         = 0;
        }

        this.player.volume = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(volume, 2);
    }


    /**
     * method : stopPlayback (public)
     * class  : Player
     * desc   : Stop player playback and reset player src
     **/
    stopPlayback() {
        this._pause();
        this.isPlaying  = false;
        this.player.src = "";
    }


    /**
     * method : togglePlay (public)
     * class  : Player
     * desc   : Switch on and off player playback depending on its current status
     **/
    togglePlay() {
        if (this.isPlaying) {
            this._pause();
        }

        else {
            this._play();
        }
    }


    /**
     * method : unmute (public)
     * class  : Player
     * desc   : Unmute player and restore old value
     **/
    unmute() {
        this.isMuted       = false;
        this.player.volume = this.oldVolume;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _eventListener (private)
     * class  : Player
     * desc   : Player event listeners
     **/
    _eventListener() {
        let that = this;
        this.player.addEventListener("loadedmetadata", function() {
            window.app.playerLoadedMetadata();
        });
        this.player.addEventListener("ended", function() {
            that.isPlaying = false;
            window.app.next();
        });
    }


    /**
     * method : _init (private)
     * class  : Player
     * desc   : Init player volume, set/store player empty source and listen
     **/
    _init() {
        this.player.volume = 0.5; // TODO : init from global var in App os user settings
        this.emptyURL      = '';
        this._eventListener();
    }


    /**
     * method : _pause (private)
     * class  : Player
     * desc   : Pause player playback
     **/
    _pause() {
        this.isPlaying = false;
        this.player.pause();
    }


    /**
     * method : _play (private)
     * class  : Player
     * desc   : Play player playback
     **/
    _play() {
        this.isPlaying = true;
        this.player.play();
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getPlayer()       { return this.player;             }
    getIsPlaying()    { return this.isPlaying;          }
    getCurrentTime()  { return this.player.currentTime; }
    getDuration()     { return this.player.duration;    }
    getSourceID()     { return this.trackId;            }
    getVolume()       { return this.player.volume;      }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_View_js__ = __webpack_require__(4);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  StatsView class                        *
 *                                         *
 *  Handle stats                           *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */





class StatsView extends __WEBPACK_IMPORTED_MODULE_2__core_View_js__["a" /* default */] {

    constructor() {
        super();
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : StatsView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : StatsView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuTrack:   document.createElement("LI"),
            menuArtist:  document.createElement("LI"),
            menuGenre:   document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.id          = "stats";
        this.ui.menu.id               = "leftMenu";
        this.ui.content.id            = "content";
        this.ui.menuTitle.innerHTML   = "Statistics";
        this.ui.menuArtist.innerHTML  = "Artist";
        this.ui.menuTrack.innerHTML   = "Track";
        this.ui.menuGenre.innerHTML   = "Genre";

        this.ui.menuList.appendChild(this.ui.menuArtist);
        this.ui.menuList.appendChild(this.ui.menuTrack);
        this.ui.menuList.appendChild(this.ui.menuGenre);
        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestArtistPage();
    }


    /**
     * method : _eventListener (private)
     * class  : StatsView
     * desc   : StatsView event listeners
     **/
    _eventListener() {
        this.ui.menuArtist.addEventListener("click", this._requestArtistPage.bind(this));
        this.ui.menuTrack.addEventListener("click", this._requestTrackPage.bind(this));
        this.ui.menuGenre.addEventListener("click", this._requestGenrePage.bind(this));
    }


    /**
     * method : _requestArtistPage (private)
     * class  : StatsView
     * desc   : Display the artists page
     **/
    _requestArtistPage() {
        this._clearPageSpace();

        this.ui.menuArtist.className   = "selected";
        this.ui.contentTitle.innerHTML = "Artists statistic";

        let artistsLeft                = document.createElement("DIV");
        let artistsRight               = document.createElement("DIV");
        let prefArtistsLabel           = document.createElement("P");
        let prefArtists                = document.createElement("UL");
        let leastArtistsLabel          = document.createElement("P");
        let leastArtists               = document.createElement("UL");

        prefArtistsLabel.id            = "label";
        leastArtistsLabel.id           = "label";
        artistsLeft.className          = "col";
        artistsRight.className         = "col";

        artistsLeft.appendChild(prefArtistsLabel);
        artistsLeft.appendChild(prefArtists);
        artistsRight.appendChild(leastArtistsLabel);
        artistsRight.appendChild(leastArtists);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(artistsLeft);
        this.ui.content.appendChild(artistsRight);

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "stats/getUserPrefArtists/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_ARTISTS      : [][]
                 *     LEAST_ARTISTS     : [][]
                 * } */
                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefArtistsLabel.innerHTML     = "";
                        leastArtistsLabel.innerHTML    = "";
                        that.ui.contentTitle.innerHTML = "No stats yet to display about artists. Use ManaZeak before going there!";
                    }

                    else {
                        prefArtistsLabel.innerHTML     = "Top Artists";
                        leastArtistsLabel.innerHTML    = "Flop Artists";
                        that._updatePrefArtistsList(response.PREF_ARTISTS, prefArtists);
                        that._updateLeastArtistsList(response.LEAST_ARTISTS, leastArtists);
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestGenrePage (private)
     * class  : StatsView
     * desc   : Display the genres page
     **/
    _requestGenrePage() {
        this._clearPageSpace();

        this.ui.menuGenre.className    = "selected";
        this.ui.contentTitle.innerHTML = "Genres statistic";

        let genresLeft                 = document.createElement("DIV");
        let genresRight                = document.createElement("DIV");
        let prefGenresLabel            = document.createElement("P");
        let prefGenres                 = document.createElement("UL");
        let leastGenresLabel           = document.createElement("P");
        let leastGenres                = document.createElement("UL");

        prefGenresLabel.id             = "label";
        leastGenresLabel.id            = "label";
        genresLeft.className           = "col";
        genresRight.className          = "col";

        genresLeft.appendChild(prefGenresLabel);
        genresLeft.appendChild(prefGenres);
        genresRight.appendChild(leastGenresLabel);
        genresRight.appendChild(leastGenres);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(genresLeft);
        this.ui.content.appendChild(genresRight);

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "stats/getUserPrefGenres/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_GENRES      : [][]
                 *     LEAST_GENRES     : [][]
                 * } */
                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefGenresLabel.innerHTML      = "";
                        leastGenresLabel.innerHTML     = "";
                        that.ui.contentTitle.innerHTML = "No stats yet to display about genres. Use ManaZeak before going there!";
                    }

                    else {
                        prefGenresLabel.innerHTML      = "Top Genres";
                        leastGenresLabel.innerHTML     = "Flop Genres";
                        that._updatePrefGenresList(response.PREF_GENRES, prefGenres);
                        that._updateLeastGenresList(response.LEAST_GENRES, leastGenres);
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestTrackPage (private)
     * class  : StatsView
     * desc   : Display the tracks page
     **/
    _requestTrackPage() {
        this._clearPageSpace();

        this.ui.menuTrack.className    = "selected";
        this.ui.contentTitle.innerHTML = "Tracks statistic";

        let tracksLeft                 = document.createElement("DIV");
        let tracksRight                = document.createElement("DIV");
        let prefTracksLabel            = document.createElement("P");
        let prefTracks                 = document.createElement("UL");
        let leastTracksLabel           = document.createElement("P");
        let leastTracks                = document.createElement("UL");

        prefTracksLabel.id             = "label";
        leastTracksLabel.id            = "label";
        tracksLeft.className           = "col";
        tracksRight.className          = "col";

        tracksLeft.appendChild(prefTracksLabel);
        tracksLeft.appendChild(prefTracks);
        tracksRight.appendChild(leastTracksLabel);
        tracksRight.appendChild(leastTracks);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(tracksLeft);
        this.ui.content.appendChild(tracksRight);

        let that = this;

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "stats/getUserPrefTracks/",
            function(response) {
                /* response = {
                 *     DONE              : bool
                 *     ERROR_H1          : string
                 *     ERROR_MSG         : string
                 *
                 *     PREF_TRACKS      : [][]
                 *     LEAST_TRACKS     : [][]
                 * } */
                if (response.DONE) {
                    if (response.ERROR_H1 !== "null") {
                        prefTracksLabel.innerHTML      = "";
                        leastTracksLabel.innerHTML     = "";
                        that.ui.contentTitle.innerHTML = "No stats yet to display about tracks. Use ManaZeak before going there!";
                    }

                    else {
                        prefTracksLabel.innerHTML      = "Top Tracks";
                        leastTracksLabel.innerHTML     = "Flop Tracks";
                        that._updatePrefTracksList(response.PREF_TRACKS, prefTracks);
                        that._updateLeastTracksList(response.LEAST_TRACKS, leastTracks);
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _unselectAllMenuEntries (private)
     * class  : StatsView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuArtist.className = "";
        this.ui.menuTrack.className  = "";
        this.ui.menuGenre.className  = "";
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop artists list
     * arg    : {[int][int]} leastArtists - Key/Value artists array
     **/
    _updateLeastArtistsList(leastArtists, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastArtists.length; ++i) {
            if (leastArtists[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastArtists[i][0] !== "") {
                    entry.innerHTML =  counter + ". " + leastArtists[i][0] + " (" + leastArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML =  counter + ". Untagged artist (" + leastArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the favorite artists list
     * arg    : {[int][int]} prefArtists - Key/Value artists array
     **/
    _updatePrefArtistsList(prefArtists, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefArtists.length; ++i) {
            if (prefArtists[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefArtists[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefArtists[i][0] + " (" + prefArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". Untagged artist (" + prefArtists[i][1] + " tracks played)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastGenresList (private)
     * class  : StatsView
     * desc   : Updates the flop tracks list
     * arg    : {[][]} leastGenres - Key/Value tracks array
     **/
    _updateLeastGenresList(leastGenres, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastGenres.length; ++i) {
            if (leastGenres[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastGenres[i][0] !== "") {
                    entry.innerHTML = counter + ". " + leastGenres[i][0] + " (played " + leastGenres[i][1] + " times, is " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(leastGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". Untagged genre (played " + leastGenres[i][1] + " times, is " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(leastGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updatePrefGenresList (private)
     * class  : StatsView
     * desc   : Updates the favorite tracks list
     * arg    : {[int][int]} prefTracks - Key/Value tracks array
     **/
    _updatePrefGenresList(prefGenres, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefGenres.length; ++i) {
            if (prefGenres[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefGenres[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefGenres[i][0] + " (played " + prefGenres[i][1] + " times, is " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(prefGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". Untagged genre (played " + prefGenres[i][1] + " times, is " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(prefGenres[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);
            }
        }
    }


    /**
     * method : _updateLeastArtistsList (private)
     * class  : StatsView
     * desc   : Updates the flop tracks list
     * arg    : {[int][int]} leastTracks - Key/Value tracks array
     **/
    _updateLeastTracksList(leastTracks, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < leastTracks.length; ++i) {
            if (leastTracks[i][0] !== null) {
                let entry = document.createElement("LI");

                if (leastTracks[i][0]) {
                    entry.innerHTML = counter + ". " + leastTracks[i][0] + " (played " + leastTracks[i][1] + " times, average listening : " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(leastTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". Untagged track (played " + leastTracks[i][1] + " times, average listening : " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(leastTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                ++counter;
                ui.appendChild(entry);

            }
        }
    }


    /**
     * method : _updatePrefTracksList (private)
     * class  : StatsView
     * desc   : Updates the favorite tracks list
     * arg    : {[int][int]} prefTracks - Key/Value tracks array
     **/
    _updatePrefTracksList(prefTracks, ui) {
        let counter = 1; // A must here since void element is not in a fixed index in array
        for (let i = 0; i < prefTracks.length; ++i) {
            if (prefTracks[i][0] !== null) {
                let entry = document.createElement("LI");

                if (prefTracks[i][0] !== "") {
                    entry.innerHTML = counter + ". " + prefTracks[i][0] + " (played " + prefTracks[i][1] + " times, average listening : " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(prefTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }

                else {
                    entry.innerHTML = counter + ". Untagged track (played " + prefTracks[i][1] + " times, average listening : " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["h" /* precisionRound */])(prefTracks[i][2], 1) + "%)"; // 0 = name, 1 = counter
                }
                ++counter;
                ui.appendChild(entry);

            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (StatsView);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_View_js__ = __webpack_require__(4);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */





class AdminView extends __WEBPACK_IMPORTED_MODULE_2__core_View_js__["a" /* default */] {

    constructor() {
        super();
        this.info  = null;
        this.modal = null;
        this._init();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : AdminView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : AdminView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuDB:       document.createElement("LI"),
            menuUser:     document.createElement("LI"),
            menuLib:      document.createElement("LI"),
            menuSC:       document.createElement("LI"),
            menuWish:     document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.id        = "admin";
        this.ui.menu.id             = "leftMenu";
        this.ui.content.id          = "content";
        this.ui.menuTitle.innerHTML = "Admin panel";
        this.ui.menuDB.innerHTML    = "Database";
        this.ui.menuUser.innerHTML  = "Users";
        this.ui.menuLib.innerHTML   = "Libraries";
        this.ui.menuSC.innerHTML    = "SyncThing";
        this.ui.menuWish.innerHTML    = "Wishes";

        this.ui.menuList.appendChild(this.ui.menuDB);
        this.ui.menuList.appendChild(this.ui.menuLib);
        this.ui.menuList.appendChild(this.ui.menuWish);
        this.ui.menuList.appendChild(this.ui.menuSC);
        this.ui.menuList.appendChild(this.ui.menuUser);

        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestDBPage();
    }


    /**
     * method : _eventListener (private)
     * class  : AdminView
     * desc   : AdminView event listeners
     **/
    _eventListener() {
        this.ui.menuDB.addEventListener("click", this._requestDBPage.bind(this));
        this.ui.menuUser.addEventListener("click", this._requestUsersPage.bind(this));
        this.ui.menuLib.addEventListener("click", this._requestLibrariesPage.bind(this));
        this.ui.menuSC.addEventListener("click", this._requestSCPage.bind(this));
        this.ui.menuWish.addEventListener("click", this._requestWishPage.bind(this));
    }


    /**
     * method : _init (private)
     * class  : AdminView
     * desc   : Create view to DB page by default
     **/
    _init() {
        let that = this;
        this._updateAdminInfo(function() {
            that._createUI();
        });
    }


    /**
     * method : _requestDBPage (private)
     * class  : AdminView
     * desc   : Display the database management page
     **/
    _requestDBPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuDB.className        = "selected";
        this.ui.contentTitle.innerHTML  = "Database management";

        this.ui.rmMoodLabel             = document.createElement("P");
        this.ui.rmMoodButton            = document.createElement("BUTTON");
        this.ui.rmCoverLabel            = document.createElement("P");
        this.ui.rmCoverButton           = document.createElement("BUTTON");
        this.ui.dropLabel               = document.createElement("P");
        this.ui.dropButton              = document.createElement("BUTTON");

        this.ui.rmCoverLabel.innerHTML  = "<b>Re-extract all covers from tracks</b><br>" +
            "<br>" +
            "Covers are automatically extracted from all tracks contained in a new library and locally stored on the server.<br>" +
            "This command will erase existing covers and re-extract them for all tracks stored in the database.";
        this.ui.rmMoodLabel.innerHTML   = "<b>Remove all moodbars from server</b><br>" +
            "<br>" +
            "ManaZeak perform a MoodBar scan on all tracks in the <code>/library/</code> folder every hour to generate the associated " +
            "<code>.mood</code> file (if it doesn't exists already).<br>" +
            "This command will erase all existing <code>.mood</code> file stored in the server. You might wait an hour or less before " +
            "ManaZeak re-generate those <code>.mood</code> files.";
        this.ui.dropLabel.innerHTML     = "<b>Drop database</b><br>" +
            "<br>" +
            "The server database stores data about users, libraries, playlists, tracks, artists, albums, genres, shuffle history, user history and statistics.<br>" +
            "This command will delete everything in the database except users.";
        this.ui.rmMoodButton.innerHTML  = "REMOVE ALL MOODBARS";
        this.ui.rmCoverButton.innerHTML = "RE-EXTRACT ALL COVERS";
        this.ui.dropButton.innerHTML    = "DROP DATABASE";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rmCoverLabel);
        this.ui.content.appendChild(this.ui.rmCoverButton);
        this.ui.content.appendChild(this.ui.rmMoodLabel);
        this.ui.content.appendChild(this.ui.rmMoodButton);
        this.ui.content.appendChild(this.ui.dropLabel);
        this.ui.content.appendChild(this.ui.dropButton);

        this.ui.rmMoodButton.addEventListener("click", this._removeMoodbar.bind(this));
        this.ui.rmCoverButton.addEventListener("click", this._regenCover.bind(this));
        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
    }


    _regenCover() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/regenerateCovers/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDeleteLibraries (private)
     * class  : AdminView
     * desc   : Request to delete all library
     **/
    _requestDeleteLibraries() { // TODO : put the code below in APP
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "library/deleteAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    window.app.playlists.clear();
                    window.app.changePlaylist();
                    that.ui.rmLibButton.blur();
                    that._updateAdminInfo();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestRescanLibraries (private)
     * class  : AdminView
     * desc   : Request to rescan all library
     **/
    _requestRescanLibraries() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "library/rescanAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestUsersPage (private)
     * class  : AdminView
     * desc   : Display the users management page
     **/
    _requestUsersPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuUser.className     = "selected";
        this.ui.contentTitle.innerHTML = "User management";


        let sponsoringLabel            = document.createElement("P");
        let sponsoringSpan             = document.createElement("SPAN");
        let sponsoring                 = document.createElement("BUTTON");
        let list                       = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.USER.length; ++i) {
            let admin                  = this.info.USER[i].ADMIN ? "Admin" : "User";
            let element                = document.createElement("LI");
            let rm                     = document.createElement("IMG");
            rm.src                     = "/static/img/utils/trash.svg";
            rm.addEventListener("click", function() {
                window.app.deleteUser(that.info.USER[i].ID, function() {
                    let that = this;
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
                        "admin/getView/",
                        function(response) { // TODO : fetch those info from getUserInfo
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             *
                             *     USER: {
                             *         GODFATHER_NAME:
                             *         NAME:
                             *         IS_ADMIN:
                             *         JOINED:
                             *         LAST_LOGIN:
                             *         USER_ID:
                             *         INVITE_CODE:
                             *         MANACOIN:
                             *     }
                             *     LIBRARIES: {
                             *         NAME:
                             *         PATH:
                             *         NUMBER_TRACK:
                             *         TOTAL_DURATION:
                             *         ID:
                             *     }
                             *     SYNC_KEY:
                             *     BUFFER_PATH:
                             *     INVITE_ENABLED:
                             * } */
                            if (response.DONE) {
                                that.info = response;
                                that._requestUsersPage();
                            }
                        }
                    );
                });
            });
            element.innerHTML          = "<b>" + this.info.USER[i].NAME + "</b> (" + admin + ") <br><br>" +
                                         "User ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.info.USER[i].INVITE_CODE + "<br>" +
                                         "Godfather:&nbsp;&nbsp;" + this.info.USER[i].GODFATHER_NAME + "<br>" +
                                         "ManaCoin: " + this.info.USER[i].MANACOIN + "<br><br>" +
                                         "Joined on: " + this.info.USER[i].JOINED + "<br>" +
                                         "Last login: " + this.info.USER[i].LAST_LOGIN;

            element.appendChild(rm);
            list.appendChild(element);
        }

        let status                     = this.info.INVITE_ENABLED ? "Enabled" : "Disabled";
        sponsoringLabel.innerHTML      = "<b>Sponsoring option on subscribe</b><br>" +
                                         "<br>" +
                                         "When activated, any user that want to sign up needs to provide an ID from a user already signed in ManaZeak.<br>" +
                                         "This command will add a field in the sign up form that is mandatory. <b>Sponsoring current status : " + status + "</b>";
        sponsoring.innerHTML           = this.info.INVITE_ENABLED ? "DISABLE SPONSORING" : "ENABLE SPONSORING";
        //godFather.setAttribute("onClick", godFather.checked = !godFather.checked);

        sponsoringSpan.appendChild(sponsoring);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(sponsoringLabel);
        this.ui.content.appendChild(sponsoringSpan);
        this.ui.content.appendChild(list);

        sponsoring.addEventListener("click", this._toggleInviteMode.bind(this));
    }


    /**
     * method : _requestLibrariesPage (private)
     * class  : AdminView
     * desc   : Display the libraries management page
     **/
    _requestLibrariesPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuLib.className         = "selected";
        this.ui.contentTitle.innerHTML    = "Libraries management";

        this.ui.rescanLibLabel            = document.createElement("P");
        this.ui.rescanLibButton           = document.createElement("BUTTON");
        this.ui.rmLibLabel                = document.createElement("P");
        this.ui.rmLibButton               = document.createElement("BUTTON");

        this.ui.rescanLibLabel.innerHTML  = "<b>Rescan libraries</b><br>" +
                                            "<br>" +
                                            "After you made modification on files located in a library folder, use this command to perform a rescan.<br>" +
                                            "This command will rescan all libraries in the database.";
        this.ui.rescanLibButton.innerHTML = "RESCAN ALL LIBRARIES";
        this.ui.rmLibLabel.innerHTML      = "<b>Remove libraries</b><br>" +
                                            "<br>" +
                                            "In case of... Warning, this command apply to every user in ManaZeak.<br>" +
                                            "This command will erase all libraries in the database.";
        this.ui.rmLibButton.innerHTML     = "REMOVE ALL LIBRARIES";

        let list                          = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.LIBRARIES.length; ++i) {
            let element                   = document.createElement("LI");
            let rm                        = document.createElement("IMG");
            rm.src                        = "/static/img/utils/trash.svg";
            let deletedID                 = that.info.LIBRARIES[i].ID;
            rm.addEventListener("click", function() {
                window.app.deletePlaylist(window.app.getPlaylistFromId(that.info.LIBRARIES[i].ID), function() {
                    that._updateAdminInfo(function() {
                        that._requestLibrariesPage();
                    });
                });
            });
            element.innerHTML             = "<b>" + this.info.LIBRARIES[i].NAME + "</b> - " + this.info.LIBRARIES[i].PATH + "<br>" +
                                            this.info.LIBRARIES[i].NUMBER_TRACK + " tracks - " + Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(this.info.LIBRARIES[i].TOTAL_DURATION);

            element.appendChild(rm);
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rescanLibLabel);
        this.ui.content.appendChild(this.ui.rescanLibButton);
        this.ui.content.appendChild(this.ui.rmLibLabel);
        this.ui.content.appendChild(this.ui.rmLibButton);
        this.ui.content.appendChild(list);

        this.ui.rescanLibButton.addEventListener("click", function() {
            that._requestRescanLibraries();
        });
        this.ui.rmLibButton.addEventListener("click", function() {
            that._requestDeleteLibraries();
        });
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestSCPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuSC.className       = "selected";
        this.ui.contentTitle.innerHTML = "SyncThing management";

        this.ui.apiKeyLabel            = document.createElement("P");
        this.ui.apiKeyField            = document.createElement("INPUT");
        this.ui.apiKeyButton           = document.createElement("BUTTON");
        this.ui.bufferLabel            = document.createElement("P");
        this.ui.bufferField            = document.createElement("INPUT");
        this.ui.bufferButton           = document.createElement("BUTTON");
        this.ui.rescanLabel            = document.createElement("P");
        this.ui.rescanButton           = document.createElement("BUTTON");
        this.ui.openSCLabel            = document.createElement("P");
        this.ui.openSCButton           = document.createElement("BUTTON");

        this.ui.apiKeyField.type       = "text";
        this.ui.apiKeyField.value      = this.info.SYNC_KEY;
        this.ui.apiKeyField.type       = "text";
        this.ui.bufferField.value      = this.info.BUFFER_PATH;
        this.ui.apiKeyLabel.innerHTML  = "<b>SyncThing API key</b><br>" +
                                         "<br>" +
                                         "In order to link ManaZeak with the SyncThing instance in the server, you must provide the SyncThing API key.<br>" +
                                         "Please fill the following field with the key you can find on the SyncThing interface (use the OPEN button under).";
        this.ui.apiKeyButton.innerHTML = "SUBMIT";
        this.ui.bufferLabel.innerHTML  = "<b>Buffer path</b><br>" +
                                         "<br>" +
                                         "The buffer folder is the one selected to upload file in.<br>" +
                                         "Please fill the following field with the buffer path.";
        this.ui.bufferButton.innerHTML = "SUBMIT";
        this.ui.rescanLabel.innerHTML  = "<b>Rescan SyncThing folders</b><br>" +
                                         "<br>" +
                                         "A SyncThing folder must be rescanned every time a modification is made on a file inside.<br>" +
                                         "This command will perform a rescan on each SyncThing folder.";
        this.ui.rescanButton.innerHTML = "RESCAN";
        this.ui.openSCLabel.innerHTML  = "<b>Open SyncThing interface</b><br>" +
                                         "<br>" +
                                         "If none of the hereby command can't help you there, you may use the SyncThing interface.<br>" +
                                         "This command will open the SyncThing instance right here, in a modal.";
        this.ui.openSCButton.innerHTML = "OPEN";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.apiKeyLabel);
        this.ui.content.appendChild(this.ui.apiKeyField);
        this.ui.content.appendChild(this.ui.apiKeyButton);
        this.ui.content.appendChild(this.ui.bufferLabel);
        this.ui.content.appendChild(this.ui.bufferField);
        this.ui.content.appendChild(this.ui.bufferButton);
        this.ui.content.appendChild(this.ui.rescanLabel);
        this.ui.content.appendChild(this.ui.rescanButton);
        this.ui.content.appendChild(this.ui.openSCLabel);
        this.ui.content.appendChild(this.ui.openSCButton);

        let that = this;
        this.ui.apiKeyButton.addEventListener("click", this._submitAPIKey.bind(this));
        this.ui.bufferButton.addEventListener("click", this._submitBufferPath.bind(this));
        this.ui.rescanButton.addEventListener("click", this._rescanSC.bind(this));
        this.ui.openSCButton.addEventListener("click", function() {
            that.modal = new Modal("openSyncThing");
            that.modal.open();
        });
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestWishPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuWish.className     = "selected";
        this.ui.contentTitle.innerHTML = "Wishes management";

        let list                       = document.createElement("UL");

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "wish/get/",
            JSON.stringify({
                ALL: true
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT: {
                 *         WISH_ID:
                 *         DATE:
                 *         TEXT:
                 *         USERNAME:
                 *         STATUS:
                 *     }
                 * } */
                if (response.DONE) {
                    for (let i = 0; i < response.RESULT.length; ++i) {
                        let element        = document.createElement("LI");
                        let accept         = document.createElement("IMG");
                        let refuse         = document.createElement("IMG");

                        element.id         = "wishEntry";
                        accept.id          = "accept";
                        refuse.id          = "refuse";

                        element.innerHTML  = response.RESULT[i].USERNAME + ", " + response.RESULT[i].DATE + ":<br>" +
                                             "<b>" + response.RESULT[i].TEXT + "</b><br>";

                        switch (response.RESULT[i].STATUS) {
                            case 0:
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                                break;
                            case 1:
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused-true.svg";
                                break;
                            case 2:
                                accept.src = "/static/img/utils/adminview/accepted-true.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                                break;
                        }

                        let self = that;
                        accept.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 2, function() {
                                accept.src = "/static/img/utils/adminview/accepted-true.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                            });
                        });
                        refuse.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 1, function() {
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused-true.svg";
                            });
                        });

                        element.appendChild(accept);
                        element.appendChild(refuse);
                        list.appendChild(element);
                    }

                    that.ui.content.appendChild(that.ui.contentTitle);
                    that.ui.content.appendChild(document.createElement("HR"));
                    that.ui.content.appendChild(list);
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Update the vote on a given wish
     **/
    _updateWishStatus(wishID, status, callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "wish/setStatus/",
            JSON.stringify({
                WISH_ID: wishID,
                STATUS:  status
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    if (callback) {
                        callback();
                    }

                    else {
                        that._requestWishPage();
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDrop (private)
     * class  : AdminView
     * desc   : Send a drop db request to the server
     **/
    _requestDrop() {
        // TODO : put modal on drop action to confirm ?
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.dropButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Rescan syncthing folders
     **/
    _rescanSC() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/syncthingRescan",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rescanButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _removeMoodbar (private)
     * class  : AdminView
     * desc   : Remove all moodbar from server
     **/
    _removeMoodbar() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/removeAllMoods/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rmMoodButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitAPIKey() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "admin/changeSyncthingAPIKey/",
            JSON.stringify({
                SYNC_KEY: this.ui.apiKeyField.value // TODO : Warning, value must be tested
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.apiKeyButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitBufferPath() {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "admin/changeBufferPath/",
            JSON.stringify({
                BUFFER_PATH: this.ui.bufferField.value // TODO : Warning, value must be tested
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.bufferButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _toggleInviteMode (private)
     * class  : AdminView
     * desc   : Toggle user sponsoring in app
     **/
    _toggleInviteMode() {
        let that = this;


        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/toggleInvite/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    that._requestUsersPage();
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _unselectAllMenuEntries (private)
     * class  : AdminView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuDB.className   = "";
        this.ui.menuUser.className = "";
        this.ui.menuLib.className  = "";
        this.ui.menuSC.className   = "";
        this.ui.menuWish.className = "";
    }


    /**
     * method : _updateAdminInfo (private)
     * class  : AdminView
     * desc   : Updates admin information
     **/
    _updateAdminInfo(callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
            "admin/getView/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USER: {
                 *         GODFATHER_NAME:
                 *         NAME:
                 *         IS_ADMIN:
                 *         JOINED:
                 *         LAST_LOGIN:
                 *         USER_ID:
                 *         INVITE_CODE:
                 *         MANACOIN:
                 *     }
                 *     LIBRARIES: {
                 *         NAME:
                 *         PATH:
                 *         NUMBER_TRACK:
                 *         TOTAL_DURATION:
                 *         ID:
                 *     }
                 *     SYNC_KEY:
                 *     BUFFER_PATH:
                 *     INVITE_ENABLED:
                 * } */
                if (response.DONE) {
                    that.info = response;

                    if (callback) {
                        callback();
                    }
                }
            }
        );
    }

}

/* harmony default export */ __webpack_exports__["a"] = (AdminView);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_View_js__ = __webpack_require__(4);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  UserView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */





class UserView extends __WEBPACK_IMPORTED_MODULE_2__core_View_js__["a" /* default */] {

    constructor() {
        super();
        this.info  = null;
        this._createUI();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : UserView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : UserView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuGen:       document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.id        = "user";
        this.ui.menu.id             = "leftMenu";
        this.ui.content.id          = "content";
        this.ui.menuTitle.innerHTML = "User";
        this.ui.menuGen.innerHTML   = "General";

        this.ui.menuList.appendChild(this.ui.menuGen);
        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestGeneralPage();
    }


    /**
     * method : _eventListener (private)
     * class  : UserView
     * desc   : UserView event listeners
     **/
    _eventListener() {
        this.ui.menuGen.addEventListener("click", this._requestGeneralPage.bind(this));
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Display the general page
     **/
    _requestGeneralPage() {
        this._updateSettingsInfo();
        this._clearPageSpace();
        this.ui.menuGen.className          = "selected";
        this.ui.contentTitle.innerHTML     = "General settings";

        let that = this;
        this._updateSettingsInfo(function() {
            let userInfo                   = document.createElement("P");

            let admin                      = that.info.IS_ADMIN ? "Admin" : "User";
            that.ui.contentTitle.innerHTML = "General settings";
            userInfo.innerHTML             = "<b>" + that.info.USERNAME + "</b> (" + admin + ") <br><br>" +
                                             "User ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + that.info.INVITE_CODE + "<br>" +
                                             "Godfather:&nbsp;&nbsp;" + that.info.GODFATHER_NAME + " (" + that.info.GODFATHER_CODE + ")<br>" +
                                             "ManaCoin: " + that.info.MANACOIN + "<br><br>" +
                                             "Joined on: " + that.info.DATE_JOINED + "<br>" +
                                             "Last login: " + that.info.LAST_LOGIN;

            that.ui.content.appendChild(that.ui.contentTitle);
            that.ui.content.appendChild(document.createElement("HR"));
            that.ui.content.appendChild(userInfo);
        });
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuGen.className = "";
    }


    /**
     * method : _requestGeneralPage (private)
     * class  : UserView
     * desc   : Updates settings information
     **/
    _updateSettingsInfo(callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])( // TODO : user the function in User class
            "user/getSettings/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USERNAME:
                 *     DATE_JOINED:
                 *     LAST_LOGIN:
                 *     INVITE_CODE:
                 *     IS_ADMIN:
                 *     MANACOIN:
                 *     GODFATHER_CODE:
                 *     GODFATHER_NAME:
                 * } */
                if (response.DONE) {
                    that.info = response;

                    if (callback) {
                        callback();
                    }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

}

/* harmony default export */ __webpack_exports__["a"] = (UserView);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Track_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_View_js__ = __webpack_require__(4);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  PartyView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */






class PartyView extends __WEBPACK_IMPORTED_MODULE_3__core_View_js__["a" /* default */] {

    constructor() {
        super();
        this._createUI();
        this._eventListener();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : _createUI (public)
     * class  : PartyView
     * desc   : Returns container while fetching details about current track in player
     **/
    getContainer() {
        this._setPlayPause();

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/getDetailedInfo/",
            JSON.stringify({
                TRACK_ID: [window.app.player.getSourceID()]
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     RESULT    : {
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         TRACK_NUMBER:
                 *         BPM:
                 *         LYRICS:
                 *         COMMENT:
                 *         BITRATE:
                 *         SAMPLERATE:
                 *         DURATION:
                 *         GENRE:
                 *         FILE_TYPE:
                 *         DISC_NUMBER:
                 *         SIZE:
                 *         LAST_MODIFIED:
                 *         COVER:
                 *         ARTISTS: {
                 *            ID:
                 *            NAME:
                 *         }
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *             TOTAL_DISC:
                 *             TOTAL_TRACK:
                 *             ARTISTS: {
                 *                 ID:
                 *                 NAME:
                 *             }
                 *         }
                 *         PLAY_COUNTER:
                 *         FILE_NAME:
                 *     }
                 * } */
                if (response.DONE) {
                    that._setCurrentTrack(new __WEBPACK_IMPORTED_MODULE_2__core_Track_js__["a" /* default */](response.RESULT[0]));
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );

        return this.ui.container;
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : PartyView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:          this.container,

            sparksContainer:    document.createElement("DIV"),
            sparksLayer1:       document.createElement("DIV"),
            sparksLayer2:       document.createElement("DIV"),
            sparksLayer3:       document.createElement("DIV"),
            sparksLayer4:       document.createElement("DIV"),

            trackContainer:     document.createElement("DIV"),
            trackCover:         document.createElement("IMG"),

            trackInfoContainer: document.createElement("DIV"),
            trackTitle:         document.createElement("H1"),
            trackArtist:        document.createElement("H2"),
            trackComposer:      document.createElement("H3"),
            trackYearAlbum:     document.createElement("H3"),
            trackGenre:         document.createElement("H3"),

            close:              document.createElement("IMG"),
            previous:           document.createElement("IMG"),
            play:               document.createElement("IMG"),
            next:               document.createElement("IMG"),
        };

        this.ui.container.id             = "party";
        // Smells like Grafikart here ;) (https://www.youtube.com/watch?v=rV6Xgb_4FFo)
        this.ui.sparksContainer.id       = "snow";
        this.ui.sparksLayer1.id          = "snow-layer";
        this.ui.sparksLayer2.id          = "snow-layer";
        this.ui.sparksLayer3.id          = "snow-layer";
        this.ui.sparksLayer4.id          = "snow-layer";

        this.ui.trackContainer.id        = "trackContainer";
        this.ui.trackCover.src           = "/static/img/utils/defaultcover.svg";

        this.ui.trackInfoContainer.id    = "partyTrackInfo";
        this.ui.trackTitle.id            = "a";
        this.ui.trackArtist.id           = "b";
        this.ui.trackComposer.id         = "c";
        this.ui.trackYearAlbum.id        = "d";
        this.ui.trackGenre.id            = "e";

        this.ui.close.id                 = "close";
        this.ui.previous.id              = "previous";
        this.ui.play.id                  = "play";
        this.ui.next.id                  = "next";

        this.ui.close.src                = "/static/img/utils/idea.svg"; // TODO : add ManaZeak log + tooltip
        this.ui.previous.src             = "/static/img/player/previous.svg";
        this.ui.play.src                 = "/static/img/player/play.svg";
        this.ui.next.src                 = "/static/img/player/next.svg";

        this.ui.sparksContainer.appendChild(this.ui.sparksLayer1);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer2);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer3);
        this.ui.sparksContainer.appendChild(this.ui.sparksLayer4);

        this.ui.trackInfoContainer.appendChild(this.ui.trackTitle);
        this.ui.trackInfoContainer.appendChild(this.ui.trackArtist);
        this.ui.trackInfoContainer.appendChild(this.ui.trackComposer);
        this.ui.trackInfoContainer.appendChild(this.ui.trackYearAlbum);
        this.ui.trackInfoContainer.appendChild(this.ui.trackGenre);

        this.ui.trackContainer.appendChild(this.ui.trackCover);
        this.ui.trackContainer.appendChild(this.ui.trackInfoContainer);

        this.ui.container.appendChild(this.ui.sparksContainer);
        this.ui.container.appendChild(this.ui.trackContainer);
        this.ui.container.appendChild(this.ui.close);
        this.ui.container.appendChild(this.ui.previous);
        this.ui.container.appendChild(this.ui.play);
        this.ui.container.appendChild(this.ui.next);
    }


    /**
     * method : _eventListener (private)
     * class  : PartyView
     * desc   : PartyView event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.close.addEventListener("click", function() {
            document.body.removeChild(that.ui.container);
            window.app.restorePageContent();
        });
        this.ui.play.addEventListener("click", function() {
            window.app.togglePlay();
            that._setPlayPause();
        });
        this.ui.next.addEventListener("click", function() {
            window.app.next();
        });
    }


    /**
     * method : _setPlayPause (private)
     * class  : PartyView
     * desc   : Change Play/Pause button depending on player status
     **/
    _setPlayPause() {
        if (window.app.player.getIsPlaying() === true) {
            this.ui.play.src = "/static/img/player/pause.svg";
        }

        else {
            this.ui.play.src = "/static/img/player/play.svg";
        }
    }


    /**
     * method : _setCurrentTrack (private)
     * class  : PartyView
     * desc   : Change current track in view
     **/
    _setCurrentTrack(track) {
        this.ui.trackCover.src           = track.cover;
        this.ui.trackTitle.innerHTML     = track.title;
        this.ui.trackArtist.innerHTML    = track.artist;
        this.ui.trackComposer.innerHTML  = track.composer;
        this.ui.trackYearAlbum.innerHTML = track.year + " - " + track.album;
        this.ui.trackGenre.innerHTML     = track.genre;
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

}

/* harmony default export */ __webpack_exports__["a"] = (PartyView);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entries_ListViewEntry_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_PlaylistView_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_MultiSelect_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_elements_TrackInfo_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_ContextMenu_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_Modal_js__ = __webpack_require__(3);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListView class                         *
 *                                         *
 *  Classical list view                    *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */









class ListView extends __WEBPACK_IMPORTED_MODULE_2__core_PlaylistView_js__["a" /* default */] {

    constructor(data, isLibrary, id) {
        super();
        this.isLibrary = isLibrary;
        this.id        = id;
        // The index of the last track on which the view was centered
        this.lastTrackCenter = 0;
        this.isActive = false;
        this.selector = new __WEBPACK_IMPORTED_MODULE_3__utils_MultiSelect_js__["a" /* default */]();
        this._init(data);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getDataFromPlaylist (public)
     * class  : ListView
     * desc   : Get data from a given playlist
     * return : {object} playlist - The playlist to retrieve data from
     **/
    getDataFromPlaylist(playlist) {
        return playlist.tracks;
    }


    /**
     * method : getEntryById (public)
     * class  : ListView
     * desc   : Get an entry by its ID
     * arg    : {int} id - The ID to retrieve
     * return : {object} ListView entry
     **/
    getEntryById(id) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].track.id.track === id) {
                return this.entries[i].track;
            }
        }
    }


    /**
     * method : getFirstEntry (public)
     * class  : ListView
     * desc   : returns the first entry of the ListView
     * return : {object} ListView first entry
     **/
    getFirstEntry() {
        if (this.entries.length > 0) {
            return this.entries[0].track;
        }

        else {
            new Notification("ERROR", "Empty Playlist", "This playlist has no tracks");
            return null;
        }
    }


    /**
     * method : getNextEntry (public)
     * class  : ListView
     * desc   : Returns the next entry after the selected one
     * return : {object} ListView next entry
     **/
    getNextEntry() {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) {
                return this.entries[(i + 1) % this.entries.length].track;
            }
        }
    }


    /**
     * method : getPreviousEntry (public)
     * class  : ListView
     * desc   : Returns the previous entry before the selected one
     * return : {object} ListView previous entry
     **/
    getPreviousEntry() {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) {
                return this.entries[(i - 1 + this.entries.length) % this.entries.length].track;
            }
        }
    }


    /**
     * method : isLastEntry (public)
     * class  : ListView
     * desc   : Test if selected track is the last entry in ListView
     * return : {bool} true if yes
     **/
    isLastEntry() {
        return !!this.entries[this.entries.length - 1].getIsSelected();
    }


    /**
     * method : refreshTracks (public)
     * class  : ListView
     * desc   : Refresh ListView entries (+ column header)
     * arg    : {[object]} tracks - Tracks array
     **/
    refreshTracks(tracks) {
        while (this.listView.firstChild) {
            this.listView.removeChild(this.listView.firstChild);
        }

        this.entries = [];
        this._addEntries(tracks);
        this.contextMenu.reattach();

        this.container.appendChild(this.header.container);
        this.container.appendChild(this.listView);
    }


    /**
     * method : setSelected (public)
     * class  : ListView
     * desc   : Select an entry using a Track object
     * arg    : {object} track - The track to select
     **/
    setSelected(track) {
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) { //  Un-selecting all
                this.entries[i].setIsSelected(false);
            }

            if (this.entries[i].track.id.track === track.id.track) { // Selecting the one
                this.entries[i].setIsSelected(true);
            }
        }
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _addEntries (private)
     * class  : ListView
     * desc   : Add entries in ListView for a given tracks collection
     * arg    : {[object]} tracks - Tracks array to display
     **/
    _addEntries(tracks) {
        for (let i = 0; i < tracks.length; ++i) {
            this.entries.push(new __WEBPACK_IMPORTED_MODULE_1__entries_ListViewEntry_js__["a" /* default */](tracks[i], this.listView));
        }
    }


    /**
     * method : _addIDToSelect (private)
     * class  : ListView
     * desc   : TODO
     * arg    : {int} id - TODO
     *          {object} event - TODO
     **/
    _addIDToSelect(id, event) {
        // Clicked outside of the entries
        if (id === undefined || id === null) {
            this._unSelectAll();
            return true;
        }

        this.entries[id].setIsSelected(this.selector.add(id, event.ctrlKey));
    }


    /**
     * method : _contextMenuSetup (private)
     * class  : ListView
     * desc   : TODO
     **/
    _contextMenuSetup() {
        let that             = this;
        this.contextMenu     = null;
        this.contextMenu     = new __WEBPACK_IMPORTED_MODULE_5__utils_ContextMenu_js__["a" /* default */](this.listView, function(event) {
            clearTimeout(that.hoveredTimeout);
            that.trackInfo.setVisible(false);

            let target       = event.target;
            while (target.parentNode != null && target.dataset.childID == null) {
                target       = target.parentNode;
            }

            if(that.entries[target.dataset.childID].getIsSelected() == false)
                that._addIDToSelect(target.dataset.childID, event);
        });

        this.contextMenu.addEntry(null, "Add to Queue", function() {
            let selected     = that.selector.get();
            for(let i = 0; i < selected.length; ++i) {
                window.app.pushQueue(that.entries[selected[i]].track);
            }
        });

        //TODO: move to App
        this.contextMenu.addEntry(null, "Edit tags", function() {
            let ids          = that.selector.get();
            let tracksID     = new Array(ids.length);
            let tracks       = new Array(ids.length);

            for(let i = 0; i < ids.length; ++i) {
                tracksID[i]  = that.entries[ids[i]].track.id.track;
                tracks[i]    = that.entries[ids[i]].track;
            }

            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
                "track/getDetailedInfo/",
                JSON.stringify({
                    TRACK_ID: tracksID
                }),
                function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     RESULT    : {
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         TRACK_NUMBER:
                 *         BPM:
                 *         LYRICS:
                 *         COMMENT:
                 *         BITRATE:
                 *         SAMPLERATE:
                 *         DURATION:
                 *         GENRE:
                 *         FILE_TYPE:
                 *         DISC_NUMBER:
                 *         SIZE:
                 *         LAST_MODIFIED:
                 *         COVER:
                 *         ARTISTS: {
                 *            ID:
                 *            NAME:
                 *         }
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *             TOTAL_DISC:
                 *             TOTAL_TRACK:
                 *             ARTISTS: {
                 *                 ID:
                 *                 NAME:
                 *             }
                 *         }
                 *         PLAY_COUNTER:
                 *         FILE_NAME:
                 *     }
                 * } */
                    if (response.DONE) {
                        for (let i = 0; i < response.RESULT.length ;++i) {
                            that.entries[ids[i]].track.updateMetadata(response.RESULT[i]);
                        }

                        let tmp = new __WEBPACK_IMPORTED_MODULE_6__utils_Modal_js__["a" /* default */]("editTag", tracks);
                        tmp.open();
                    }

                    else {
                        new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    }
                }
            );
        });

        this.contextMenu.addEntry(null, "Download track", function() {
            let nbTracks = that.selector.getSize();
            if(nbTracks == 1)
                window.app.downloadTrack(that.entries[that.selector.get()[0]].track);
            else if(nbTracks > 0) {
                let tracks = new Array(nbTracks);
                let ids = that.selector.get();
                for(let i = 0; i < nbTracks; ++i)
                    tracks[i] = that.entries[ids[i]].track;
                window.app.downloadTracksZip(tracks);
            }
        });


        this.contextMenu.addEntry('playlists', "Add to playlist");

        //TODO: Add and remove playlists on the fly (listen to window.app.playlists)
        let playlists = window.app.getPlaylists();
        for (let i = 0; i < playlists.length; ++i) {
            this.contextMenu.addEntry(['playlists', null], playlists[i].name, function () {
                let tracks = that.selector.get();
                for(let t = 0; t < tracks.length; t++)
                    tracks[t] = that.entries[tracks[t]].track;
                window.app.addTracksToPlaylist(playlists[i], tracks);
            });
        }

        this.contextMenu.addEntry(['playlists', null], "New playlist", function() {
            window.app.requestNewPlaylist();
        });

        if (!this.isLibrary) {
            this.contextMenu.addEntry(null, "Remove track", function() {
                let tracks = that.selector.get();
                for(let t = 0; t < tracks.length; t++)
                    tracks[t] = that.entries[tracks[t]].track;
                window.app.removeTracksFromPlaylist(window.app.playlists.get(that.id), tracks);
            });
        }
    }


    /**
     * method : _createUI (private)
     * class  : ListView
     * desc   : Build UI elements
     **/
    _createUI(data) {
        this.listView               = document.createElement("DIV");
        this.listView.id            = "listView";
        this.container.id           = "listViewWrapper";
        this.container.style.height = "100%";

        this._initHeader();
        this._addEntries(data);
        this.container.appendChild(this.header.container);
        this.container.appendChild(this.listView);

        if (this.entries.length * 26 > screen.height) { // TODO : Value to adjust
            this.header.container.classList.add("columnHeaderOffset");
        }

        this.trackInfo      = new __WEBPACK_IMPORTED_MODULE_4__components_elements_TrackInfo_js__["a" /* default */](this.container);
        this.hoveredTrack   = null;
        this.hoveredTimeout = null;

        this._contextMenuSetup();
    }


    /**
     * method : _eventListener (private)
     * class  : ListView
     * desc   : ListView event listeners
     **/
    _eventListener() {
        let that = this;
        this.listView.onscroll = function() {
            that.trackInfo.setVisible(false);
        };
        this.listView.addEventListener('mousemove', function(event) {
            that._showTrackInfo(event);
        }, true);
        this.listView.addEventListener('mouseleave', function(event) {
            window.clearTimeout(that.hoveredTimeout);
            // We need to enqueue that event because mouseleave will get fired before trackinfo's mouseenter
            if (event.target == that.listView)
                window.setTimeout(function() {
                    that.trackInfo.setVisible(false);
                }, 0);
        });
        this.listView.addEventListener("click", this._viewClicked.bind(this));

        // Sorting listeners
        this.header.container.addEventListener('click', function(event) {
            if(event.target == that.header.container)
                return;
            let target = event.target;
            while(target.parentNode != that.header.container)
                target = target.parentNode;

            let sorter = that.sort[target.dataset.sorter];
            if(sorter) {
                sorter.isAsc ^= true;
                that._sortBy(target.dataset.sorter, sorter.isAsc);
                that._resetEntriesBackground();
            }
        });
        window.app.listen('changeTrack', function(track) {
            that._centerOnTrack(track, false);
        });
        window.app.listen('changeView', function(view) {
            that.isActive = view == that;
            if (that.isActive)
                that._centerOnTrack(that.lastTrackCenter, true);
        });

        window.app.listen("stopPlayback", function() {
            that._unSelectAll();
        });
        this.selector.listen('clear', this._unSelectAll.bind(this));
    }


    /**
     * method : _init (private)
     * class  : ListView
     * desc   : Create view and append data to it
     * arg    : {object} data - Tracks
     **/
    _init(data) {
        this.listView        = null;
        this.entries         = [];
        this.trackInfo       = null;
        this.dblClick        = null;
        this.contextMenu     = null;
        this.header = {
            container:      null,
            duration:       null,
            title:          null,
            artist:         null,
            composer:       null,
            performer:      null,
            album:          null,
            genre:          null,
            bitRate:        null,
            year:           null
        };
        this.sort = {
            duration:   { isAsc:    false },
            title:      { isAsc:    false },
            artist:     { isAsc:    false },
            composer:   { isAsc:    false },
            performer:  { isAsc:    false },
            album:      { isAsc:    false },
            genre:      { isAsc:    false },
            bitRate:    { isAsc:    false },
            year:       { isAsc:    false }
        };
        this._createUI(data);
        this._eventListener();
    }


    /**
     * method : _initHeader (private)
     * class  : ListView
     * desc   : Init ListView header
     **/
    _initHeader() {
        this.header.container                = document.createElement("DIV");
        this.header.duration                 = document.createElement("DIV");
        this.header.title                    = document.createElement("DIV");
        this.header.artist                   = document.createElement("DIV");
        this.header.composer                 = document.createElement("DIV");
        this.header.album                    = document.createElement("DIV");
        this.header.genre                    = document.createElement("DIV");
        this.header.bitRate                  = document.createElement("DIV");
        this.header.year                     = document.createElement("DIV");

        this.header.container.className      = "columnHeader";
        this.header.duration.className       = "col-duration";
        this.header.title.className          = "col-title";
        this.header.artist.className         = "col-artist";
        this.header.composer.className       = "col-composer";
        this.header.album.className          = "col-album";
        this.header.genre.className          = "col-genre";
        this.header.bitRate.className        = "col-bitRate";
        this.header.year.className           = "col-year";
        this.header.duration.innerHTML       = "Duration";
        this.header.title.innerHTML          = "Title";
        this.header.artist.innerHTML         = "Artist";
        this.header.composer.innerHTML       = "Composer";
        this.header.album.innerHTML          = "Album";
        this.header.genre.innerHTML          = "Genre";
        this.header.bitRate.innerHTML        = "BitRate";
        this.header.year.innerHTML           = "Year";
        this.header.duration.dataset.sorter  = "duration";
        this.header.title.dataset.sorter     = "title";
        this.header.artist.dataset.sorter    = "artist";
        this.header.composer.dataset.sorter  = "composer";
        this.header.album.dataset.sorter     = "album";
        this.header.genre.dataset.sorter     = "genre";
        this.header.bitRate.dataset.sorter   = "bitRate";
        this.header.year.dataset.sorter      = "year";

        this.header.container.appendChild(this.header.duration);
        this.header.container.appendChild(this.header.title);
        this.header.container.appendChild(this.header.artist);
        this.header.container.appendChild(this.header.composer);
        this.header.container.appendChild(this.header.album);
        this.header.container.appendChild(this.header.genre);
        this.header.container.appendChild(this.header.bitRate);
        this.header.container.appendChild(this.header.year);
    }


    /**
     * method : _resetEntriesBackground (private)
     * class  : ListView
     * desc   : Reset entries background alternance
     **/
    _resetEntriesBackground() {
        for (let i = 0; i < this.entries.length; ++i) {
            this.entries[i].setBackground(i);
        }
    }


    /**
     * method : _showTrackInfo (private)
     * class  : ListView
     * desc   : Show TrackInfo on hovered track
     * arg    : {object} event - Mouse event
     **/
    _showTrackInfo(event) {
        if (event.target == this.listView) {
            return this.trackInfo.setVisible(false);
        }

        let target = event.target;
        while (target.parentNode != this.listView) {
            target = target.parentNode;
        }

        if (target.dataset.childID !== undefined) { // Avoid right click to cause error
            if (target != this.hoveredTrack || this.trackInfo.isVisible() == false) {
                this.hoveredTrack = target;
                this.trackInfo.setVisible(false);
                window.clearTimeout(this.hoveredTimeout);

                let that = this;
                this.hoveredTimeout = window.setTimeout(function () {
                    let self = that;
                    that.trackInfo.updateGeometry(that.hoveredTrack.getBoundingClientRect(), that.header.duration.offsetWidth);
                    that.trackInfo.updateInfo(that.entries[that.hoveredTrack.dataset.childID].track, function () {
                        self.trackInfo.setVisible(true)
                    });
                }, 1000);
            }
        }
    }


    /**
     * method : _sortBy (private)
     * class  : ListView
     * desc   : Sort entries
     * arg    : {string} argument - The argument to sort array by
     *          {bool} ascending - Sort way
     **/
    _sortBy(argument, ascending) {
        //TODO: Optimise this for bigger playlists (need custom sort) UPDATE: Actually might not be possible
        this.entries.sort(Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["n" /* sortObjectArrayBy */])(argument, ascending, "track"));
        this.listView.innerHTML = "";

        for (let i = 0; i < this.entries.length; i++) {
            this.entries[i].insert(this.listView);
        }

        this.contextMenu.reattach();
    }


    /**
     * method : _unSelectAll (private)
     * class  : ListView
     * desc   : Unselect all entries in ListView
     **/
    _unSelectAll() {
        for (let i = 0; i < this.entries.length ;++i) {
            if (this.entries[i].getIsSelected()) {
                this.entries[i].setIsSelected(false);
            }
        }
    }


    /**
     * method : _centerOnTrack (private)
     * class  : ListView
     * desc   : Center the listview on a track
     * arg    : {bool} useIndex - whether to treat track as an object or an integer
     *          {object} track - The track on which to center
     *          OR
     *          {integer} track - The index of the track on which to center
     **/
    _centerOnTrack(track, useIndex) {
        let i = track;
        if (useIndex !== true) {
            for (i = 0; i < this.entries.length; ++i) {
                if (this.entries[i].track == track) {
                    break;
                }
            }
        }

        if (i >= this.entries.length) {
            return;
        }

        let relativeDelta = this.entries[i].entry.offsetTop + this.entries[i].entry.scrollHeight / 2;

        if (this.entries[i].entry.offsetParent != this.listView) {
            relativeDelta -= this.listView.offsetTop;
        }

        if (this.isActive) {
            this.lastTrackCenter = i;
        }

        this.listView.scrollTop = relativeDelta - this.listView.clientHeight / 2;
    }


    /**
     * method : _viewClicked (private)
     * class  : ListView
     * desc   : On ListView clicked
     * arg    : {object} event - Mouse event
     **/
    _viewClicked(event) {
        let that   = this;
        let target = event.target;

        if (target === this.listView) {
            this._unSelectAll();
            return true;
        }

        while (target.parentNode !== this.listView) {
            target = target.parentNode;
        }

        let id = target.dataset.childID;
        if (this.dblClick == id) {
            window.app.changeTrack(this.entries[id].track, false);
            return;
        }

        this.dblClick = id;
        window.setTimeout(function() {
            that.dblClick = null;
        }, 500);

        this._addIDToSelect(id, event);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (ListView);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  ListViewEntry sub class                *
 *                                         *
 *  A list view entry                      *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



class ListViewEntry {

    constructor(track, listView) {
        this.track           = track;
        this.isSelected      = false;

        this.entry           = document.createElement("DIV");
        let duration         = document.createElement("DIV");
        let title            = document.createElement("DIV");
        let artist           = document.createElement("DIV");
        let composer         = document.createElement("DIV");
        let performer        = document.createElement("DIV");
        let album            = document.createElement("DIV");
        let genre            = document.createElement("DIV");
        let bitRate          = document.createElement("DIV");
        let year             = document.createElement("DIV");

        this.entry.className = "trackContainer";
        duration.className   = "col-duration";
        title.className      = "col-title";
        artist.className     = "col-artist";
        composer.className   = "col-composer";
        performer.className  = "col-performer";
        album.className      = "col-album";
        genre.className      = "col-genre";
        bitRate.className    = "col-bitRate";
        year.className       = "col-year";
        duration.innerHTML   = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.duration);
        title.innerHTML      = track.title;
        artist.innerHTML     = track.artist;
        composer.innerHTML   = track.composer;
        performer.innerHTML  = track.performer;
        album.innerHTML      = track.album;
        genre.innerHTML      = track.genre;
        bitRate.innerHTML    = Math.round(track.bitRate / 1000) + " kbps";
        year.innerHTML       = track.year;

        this.entry.appendChild(duration);
        this.entry.appendChild(title);
        this.entry.appendChild(artist);
        this.entry.appendChild(composer);
        //this.entry.appendChild(performer);
        this.entry.appendChild(album);
        this.entry.appendChild(genre);
        this.entry.appendChild(bitRate);
        this.entry.appendChild(year);

        this.insert(listView);
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : insert (public)
     * class  : ListViewEntry
     * desc   : Insert the entry in the list
     * return : {object} listView - The HTML container
     **/
    insert(listView) {
        this.entry.dataset.childID = listView.children.length;

        if (this.entry.dataset.childID % 2 === 0) {
            this.entry.classList.add("evenLin");
        }

        listView.appendChild(this.entry);
    }


    /**
     * method : setBackground (public)
     * class  : ListViewEntry
     * desc   : Change entry BG color if seed is even
     * arg    : {int} seed - The value to test is even
     **/
    setBackground(seed) {
        this.entry.classList.remove("evenLin");

        if (seed % 2 === 0) {
            this.entry.classList.add("evenLin");
        }
    }


    /**
     * method : setIsSelected (public)
     * class  : ListViewEntry
     * desc   : Set the entry as selected/!selected
     * return : {bool} isSelected
     **/
    setIsSelected(isSelected) {
        this.isSelected = isSelected;

        if (this.isSelected) {
            this.entry.classList.add("mzk-selected");
        }

        else {
            this.entry.classList.remove("mzk-selected");
        }
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getIsSelected() { return this.isSelected; }

}

/* harmony default export */ __webpack_exports__["a"] = (ListViewEntry);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(4);
/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  PlaylistView class                     *
 *                                         *
 *  Abstract view for the playlists' views *
 *                                         *
 *  data : {int} Playlist ID in db         *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */



class PlaylistView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* default */] {

    constructor() {
        super();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : getEntryById (public)
     * class  : PlaylistView
     * desc   : Return an entry for a given id
     * arg    : {int} id - A function argument
     * return : {object} A view entry
     **/
    getEntryById(id) {
        return null;
    }


    /**
     * method : getFirstEntry (public)
     * class  : PlaylistView
     * desc   : Return the first entry in view
     * return : {object} A view entry
     **/
    getFirstEntry() {
        return null;
    }


    /**
     * method : getNextEntry (public)
     * class  : PlaylistView
     * desc   : Return the next entry in view
     * return : {object} A view entry
     **/
    getNextEntry() {
        return null;
    }


    /**
     * method : getPreviousEntry (public)
     * class  : PlaylistView
     * desc   : Return the previous entry in view
     * return : {object} A view entry
     **/
    getPreviousEntry() {
        return null;
    }


    /**
     * method : isLastEntry (public)
     * class  : PlaylistView
     * desc   : Test if a track is the last entry in view
     * arg    : {object} track - The track to test in view
     * return : {bool}
     **/
    isLastEntry(track) {
        return true;
    }


    /**
     * method : setSelected (public)
     * class  : PlaylistView
     * desc   : Select an entry in view from a track object
     * arg    : {object} track - The track to select in view
     **/
    setSelected(track) {
        // TODO : setSelected without unselecting all entries.
        for (let i = 0; i < this.entries.length; ++i) {
            if (this.entries[i].getIsSelected()) { //  Un-selecting all
                this.entries[i].setIsSelected(false);
            }
            if (this.entries[i].track.id.track === track.id.track) { // Selecting the one
                this.entries[i].setIsSelected(true);
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (PlaylistView);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  TrackInfo class                                *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */




const TOTAL_SUGGESTIONS_NUMBER = 4; // Number of track to display in suggested tracks
const TOTAL_SUGGESTIONS_MODES  = 3; // Number of suggestion mode (see trackSuggestionMode in constructor)

class TrackInfo {

    constructor(container) {
        this.inactivityTimeoutId = -1;    // ID for the inactivity timeout
        this.trackSuggestionMode = 0;     // 0: By Artists / 1: By Album / 2: By Genre
        this.track               = null;  // Track that triggered TrackInfo in view
        this.locked              = false; // TrackInfo lock status
        this._createUI(container);
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : isVisible (public)
     * class  : TrackInfo
     * desc   : Returns true if TrackInfo is visible
     **/
    isVisible() {
        return this.ui.container.style.opacity == 1;
    }


    /**
     * method : setVisible (public)
     * class  : TrackInfo
     * desc   : Set TrackInfo visibility. Must be fired in updateInfo() callback
     * arg    : {bool} visible - The visibility status to set
     **/
    setVisible(visible) {
        if (this.locked === true) {
            return;
        }

        if (visible === true) {
            this.ui.container.style.opacity    = 1;
            this.ui.container.style.zIndex     = 0;

            this._startInactivityTimeout(5000);  // If mouse doesn't move for 5 seconds outside the TrackInfo container, it's closed.
        }

        else {
            let that = this;

            this.ui.container.style.opacity    = 0;
            window.setTimeout(function() {
                that.ui.container.style.zIndex = -1;
            }, 100); // 100ms bc of transition time in #TrackInfo - _trackinfo.scss
        }
    }


    /**
     * method : updateGeometry (public)
     * class  : TrackInfo
     * desc   : Set the new position of the TrackInfo container depending on the targeted entry's boundingRect.
     * arg    : {object} rect - The view entry boundingRect
     *          {int}  offset - The left offset to open TrackInfo with
     **/
    updateGeometry(rect, offset) {
        this.ui.container.style.top    = (rect.top - 24) + "px";
        this.ui.container.style.left   = (rect.left + offset + 8) + "px"; // 8 come from the padding in col-title
        this.ui.container.style.height = "200px";
        this.ui.container.style.width  = "auto";
    }


    /**
     * method : updateInfo (public)
     * class  : TrackInfo
     * desc   : Update all elements in TrackInfo container and fetch suggested track according to the given track
     * arg    : {object}      track - The Track object that will be used for the update
     *          {function} callback - The function to callback (not mandatory)
     **/
    updateInfo(track, callback) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "track/getDetailedInfo/",
            JSON.stringify({
                TRACK_ID: [track.id.track]
            }),
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     RESULT    : {
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         TRACK_NUMBER:
                 *         BPM:
                 *         LYRICS:
                 *         COMMENT:
                 *         BITRATE:
                 *         SAMPLERATE:
                 *         DURATION:
                 *         GENRE:
                 *         FILE_TYPE:
                 *         DISC_NUMBER:
                 *         SIZE:
                 *         LAST_MODIFIED:
                 *         COVER:
                 *         ARTISTS: {
                 *            ID:
                 *            NAME:
                 *         }
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *             TOTAL_DISC:
                 *             TOTAL_TRACK:
                 *             ARTISTS: {
                 *                 ID:
                 *                 NAME:
                 *             }
                 *         }
                 *         PLAY_COUNTER:
                 *         FILE_NAME:
                 *     }
                 * } */
                if (response.DONE) {
                    track.updateMetadata(response.RESULT[0]);
                    that.track                        = track;
                    that.ui.cover.src                 = track.cover;
                    that.ui.title.innerHTML           = track.title;
                    that.ui.artist.innerHTML          = track.artist;
                    that.ui.albumArtist.innerHTML     = "Album Artists : " + track.albumArtist;
                    that.ui.composer.innerHTML        = "Composer : " + track.composer;
                    that.ui.performer.innerHTML       = "Performer : " + track.performer;
                    that.ui.genre.innerHTML           = "Genre : " + track.genre;
                    that.ui.album.innerHTML           = track.year + " - " + track.album;
                    that.ui.numbers.innerHTML         = "track 1 / 12&nbsp;-&nbsp;disc 1 / 1";
                    that.ui.trackDetails.innerHTML    = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(track.duration) + " - " +
                                                        track.fileType + " - " +
                                                        Math.round(track.bitRate / 1000) + " kbps - " +
                                                        track.sampleRate + " Hz";
                    // TODO : add total played and other interesting stats about track
                    that._updateSuggestionMode();
                    that._updateSuggestionTracks();

                    if (callback) { callback(); }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : TrackInfo
     * desc   : Build and append UI elements to parent
     * arg    : {object} container - The TrackInfo container
     **/
    _createUI(container) {
        this.ui = {
            container:            document.createElement("DIV"),
            cover:                document.createElement("IMG"),
            numbers:              document.createElement("P"),

            trackWrapper:         document.createElement("DIV"),
            title:                document.createElement("P"),
            artist:               document.createElement("P"),
            albumArtist:          document.createElement("P"),
            composer:             document.createElement("P"),
            performer:            document.createElement("P"),
            genre:                document.createElement("P"),
            album:                document.createElement("P"),
            trackDetails:         document.createElement("P"),

            suggestionWrapper:    document.createElement("DIV"),
            suggestionTitle:      document.createElement("P"),
            suggestionList:       document.createElement("UL"),

            changeSuggestionType: document.createElement("IMG")
        };

        this.ui.container.id              = "trackInfo";
        this.ui.trackWrapper.id           = "trackWrapper";
        this.ui.title.id                  = "title";
        this.ui.album.id                  = "album";
        this.ui.numbers.id                = "numbers";
        this.ui.genre.id                  = "album";
        this.ui.suggestionWrapper.id      = "suggestionWrapper";
        this.ui.suggestionTitle.id        = "title";
        this.ui.changeSuggestionType.src  = "";

        this.tracks = [];

        // TODO : entries subClass in here for deaz
        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.tracks[i] = {
                ui:        null,
                id:        null,
                duration:  null,
                title:     null,
                performer: null
            };

            this.tracks[i].ui = document.createElement("LI");
            this.ui.suggestionList.appendChild(this.tracks[i].ui);
        }

        this.ui.trackWrapper.appendChild(this.ui.title);
        this.ui.trackWrapper.appendChild(this.ui.artist);
        this.ui.trackWrapper.appendChild(this.ui.album);
        this.ui.trackWrapper.appendChild(this.ui.albumArtist);
        this.ui.trackWrapper.appendChild(this.ui.composer);
        this.ui.trackWrapper.appendChild(this.ui.performer);
        this.ui.trackWrapper.appendChild(this.ui.genre);
        this.ui.trackWrapper.appendChild(this.ui.trackDetails);
        this.ui.suggestionWrapper.appendChild(this.ui.suggestionTitle);
        this.ui.suggestionWrapper.appendChild(this.ui.suggestionList);
        this.ui.suggestionWrapper.appendChild(this.ui.changeSuggestionType);
        this.ui.container.appendChild(this.ui.cover);
        this.ui.container.appendChild(this.ui.numbers);
        this.ui.container.appendChild(this.ui.suggestionWrapper);
        this.ui.container.appendChild(this.ui.trackWrapper);
        container.appendChild(this.ui.container);
    }


    /**
     * method : _eventListener (private)
     * class  : TrackInfo
     * desc   : TrackInfo event listeners
     **/
    _eventListener() {
        let that = this;
        this.ui.container.addEventListener("mouseenter", function() {
            that.locked = true;
            that._stopInactivityTimeout();
        }, true);
        this.ui.container.addEventListener("mouseleave", function() {
            that.locked = false;
            that.setVisible(false);
        });
        this.ui.changeSuggestionType.addEventListener("click", function() {
            that._toggleChangeType();
        });
    }


    /**
     * method : _init (private)
     * class  : TrackInfo
     * desc   : Init suggestions from cookies and add listeners on UI elements
     **/
    _init() {
        let cookies = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["e" /* getCookies */])();

        if (cookies.TRACK_INFO_SUGGESTION_MODE >= 0 && cookies.TRACK_INFO_SUGGESTION_MODE < TOTAL_SUGGESTIONS_MODES) {
            this._updateSuggestionMode(cookies.TRACK_INFO_SUGGESTION_MODE);
        }

        else {
            this._updateSuggestionMode(0);
        }

        this._eventListener();
    }


    /**
     * method : _startInactivityTimeout (private)
     * class  : TrackInfo
     * desc   : Starts a timeout to make TrackInfo invisible after a given amount of time if not canceled by _stopInactivityTimeout
     * arg    : {bool} visible - TrackInfo visibility status to set
     **/
    _startInactivityTimeout(time) {
        let that = this;
        this.inactivityTimeoutId = window.setTimeout(function() {
            that.setVisible(false);
        }, time);
    }


    /**
     * method : _stopInactivityTimeout (private)
     * class  : TrackInfo
     * desc   : Stops the inactivity timeout
     **/
    _stopInactivityTimeout() {
        if (this.inactivityTimeoutId !== -1) {
            window.clearTimeout(this.inactivityTimeoutId);
        }
    }


    /**
     * method : _toggleChangeType (private)
     * class  : TrackInfo
     * desc   : Event from changeSuggestionType attribute clicked to change suggestion mode
     **/
    _toggleChangeType() {
        ++this.trackSuggestionMode;
        this._updateSuggestionMode();
        this._updateSuggestionTracks();
    }


    /**
     * method : _updateSuggestionMode (private)
     * class  : TrackInfo
     * desc   : Update the suggestion UI title and icon elements according to the trackSuggestionMode attribute
     * arg    : {int} value - The set value (not mandatory)
     **/
    _updateSuggestionMode(value) {
        if (value) {
            this.trackSuggestionMode              = value % TOTAL_SUGGESTIONS_MODES;
        }

        else {
            this.trackSuggestionMode             %= TOTAL_SUGGESTIONS_MODES;
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["m" /* setCookie */])("TRACK_INFO_SUGGESTION_MODE", this.trackSuggestionMode, 20);

        switch (this.trackSuggestionMode) {
            case 0:
                this.ui.suggestionTitle.innerHTML = "From the same artist :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/artist.svg";
                break;

            case 1:
                this.ui.suggestionTitle.innerHTML = "From the same album :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/album.svg";
                break;

            case 2:
                this.ui.suggestionTitle.innerHTML = "From the same genre :";
                this.ui.changeSuggestionType.src  = "/static/img/utils/trackinfo/genre.svg";
                break;

            default:
                new Notification("ERROR", "Track Info suggestion error.", "The suggestion mode value is beyond its bounds.");
                break;
        }

        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
            this.tracks[i].ui.style.opacity = 0;
            this.tracks[i].ui.innerHTML     = "";
        }
    }


    /**
     * method : _updateSuggestionTracks (private)
     * class  : TrackInfo
     * desc   : Fetch suggested tracks depending on trackSuggestionMode attribute and update UI
     **/
    _updateSuggestionTracks() {
        let that = this;
        if (this.track !== null) {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
                "suggestions/getSimilarTrack/",
                JSON.stringify({
                    TRACK_ID:        this.track.id.track,
                    SUGGESTION_MODE: this.trackSuggestionMode
                }),
                function(response) {
                    /* response = {
                     *     DONE      : bool
                     *     ERROR_H1  : string
                     *     ERROR_MSG : string
                     *
                     *     RESULT    : {
                     *         ID:
                     *         TITLE:
                     *         YEAR:
                     *         COMPOSER:
                     *         PERFORMER:
                     *         TRACK_NUMBER:
                     *         BPM:
                     *         LYRICS:
                     *         COMMENT:
                     *         BITRATE:
                     *         SAMPLERATE:
                     *         DURATION:
                     *         GENRE:
                     *         FILE_TYPE:
                     *         DISC_NUMBER:
                     *         SIZE:
                     *         LAST_MODIFIED:
                     *         COVER:
                     *         ARTISTS: {
                     *            ID:
                     *            NAME:
                     *         }
                     *         ALBUM: {
                     *             ID:
                     *             TITLE:
                     *             TOTAL_DISC:
                     *             TOTAL_TRACK:
                     *             ARTISTS: {
                     *                 ID:
                     *                 NAME:
                     *             }
                     *         }
                     *         PLAY_COUNTER:
                     *         FILE_NAME:
                     * } */
                    if (!response.DONE) {
                        that.tracks[0].ui.innerHTML             = response.ERROR_H1 + "<br>" + response.ERROR_MSG;
                        that.tracks[0].ui.style.opacity         = 1;
                    }

                    else {
                        for (let i = 0; i < TOTAL_SUGGESTIONS_NUMBER; ++i) {
                            if (response.RESULT[i]) {
                                that.tracks[i].id               = response.RESULT[i].ID;
                                that.tracks[i].duration         = response.RESULT[i].DURATION;
                                that.tracks[i].title            = response.RESULT[i].TITLE;
                                that.tracks[i].performer        = response.RESULT[i].PERFORMER;
                                that.tracks[i].ui.innerHTML     = Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["l" /* secondsToTimecode */])(that.tracks[i].duration) + " - " +
                                                                  that.tracks[i].title + "<br><div class=\"performerIndent\"></div>" +
                                                                  that.tracks[i].performer;
                                that.tracks[i].ui.style.opacity = 1;
                            }
                        }
                    }
                }
            );
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TrackInfo);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Track_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Modal_js__ = __webpack_require__(3);
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                         *
 *  Playlist class                                         *
 *                                                         *
 *  Handle a collection of track (lib, playlist, custom)   *
 *                                                         *
 *  id         : {int} Playlist ID in db                   *
 *  newLibrary : {bool} true => new library, false => load *
 *  tracks     : {[object]} Playlist tracks                *
 *  callback   : {function} Not mandatory                  *
 *                                                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */






class Playlist {

    constructor(id, name, isLibrary, isLoading, rawTracks, callback) { //TODO: get shuffle and repeat from server/cookies
        if (typeof rawTracks !== 'undefined') { //TODO: fix this
            this.rawTracks       = rawTracks;
        }
        else {
            this.rawTracks       = [];
        }

        if (typeof callback !== 'undefined') {
            this.callback        = callback;
        }
        else {
            this.callback        = null;
        }

        this.id                  = id;
        this.name                = name;
        this.isLibrary           = isLibrary;
        this.isLoading           = isLoading;
        this.modal               = null;
        this.shuffleMode         = 0; // 0 : off, 1 : random, 2: shuffle
        this.repeatMode          = 0; // 0 : off, 1 : one,    2: all
        this.getTracksIntervalId = -1; // Interval id for _getTracksFromServer_aux
        this.tracks              = [];
        this.currentTrack        = 0;
        this.trackTotal          = 0;
        this.artistTotal         = 0; // TODO
        this.albumTotal          = 0; // TODO
        this.durationTotal       = 0;
        let viewkeys             = Object.keys(window.app.availableViews);
        this.views               = new Array(viewkeys.length).fill(null);
        this.activeView          = window.app.availableViews[viewkeys[0]];
        this.lazyLoadOK          = true;
        this._init();
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : activate (public)
     * class  : Playlist
     * desc   : Set in app the current playlist to this
     **/
    activate() {
        if (this.lazyLoadOK == false) {
            this.modal = new __WEBPACK_IMPORTED_MODULE_3__utils_Modal_js__["a" /* default */]('fetchPlaylists', null);
            this.modal.open();
            let that   = this;
            let timer  = window.setInterval(function() {
                if (that.lazyLoadOK == true) {
                    that.modal.close();
                    that.modal = null;
                    that.activate();
                    clearInterval(timer);
                }
            }, 100);
        }

        else {
            window.app.activePlaylist = this;
            this.showView(window.app.availableViews.LIST);
        }
    }


    /**
     * method : getFirstEntry (public)
     * class  : Playlist
     * desc   : Returns the first entry of active view
     * return : {object} View entry
     **/
    getFirstEntry() {
        return this.activeView.getFirstEntry();
    }


    /**
     * method : getPlaylistsTracks (public)
     * class  : Playlist
     * desc   : Fetch raw tracks from server
     * arg    : {function} callback - The function to callback - Not mandatory
     **/
    getPlaylistsTracks(callback) {
        this._getTracksLazy(0, callback);
    }


    /**
     * method : playNextTrack (public)
     * class  : Playlist
     * desc   : Play next track, according to user repeat/shuffle settings
     **/
    playNextTrack() {
        let that = this;
        if (this.repeatMode === 1) {
            window.app.repeatTrack();
        }

        else {
            switch (this.shuffleMode) {
                case 0: // Shuffle off
                    if (this.repeatMode !== 0) {
                        this.currentTrack = this.activeView.getNextEntry();
                        window.app.changeTrack(this.currentTrack, false);
                    }

                    else {
                        if (this.activeView.isLastEntry()) {
                            window.app.stopPlayback();
                        }

                        else {
                            this.currentTrack = this.activeView.getNextEntry();
                            window.app.changeTrack(this.currentTrack, false);
                        }
                    }
                    break;

                case 1: // Random
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
                        "player/randomNext/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id
                        }),
                        function(response) {
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             *
                             *     TRACK_ID  : int
                             * } */
                            if (response.DONE) {
                                that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                window.app.changeTrack(that.currentTrack, false);
                            }

                                else {
                                new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                            }
                        }
                    );
                    break;

                case 2: // Shuffle on
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
                        "player/shuffleNext/",
                        JSON.stringify({
                            PLAYLIST_ID: that.id
                        }),
                        function(response) {
                            /* response = {
                             *     DONE       : bool
                             *     ERROR_H1   : string
                             *     ERROR_MSG  : string
                             *
                             *     IS_LAST    : bool
                             *     TRACK_ID   : int
                             * } */
                            if (response.DONE) {
                                if (response.IS_LAST) {
                                    window.app.stopPlayback();
                                }

                                else {
                                    that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                                    window.app.changeTrack(that.currentTrack, false);
                                }
                            }

                            else {
                                new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                            }
                        }
                    );
                    break;

                default:
                    break;
            }
        }
    }


    /**
     * method : playPreviousTrack (public)
     * class  : Playlist
     * desc   : Play previous track, according to user repeat/shuffle settings
     **/
    playPreviousTrack() {
        let that = this;
        switch (this.shuffleMode) {
            case 0: // Shuffle off
                this.currentTrack = this.activeView.getPreviousEntry();
                window.app.changeTrack(this.currentTrack, false);
                break;

            default:
                Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["a" /* JSONParsedGetRequest */])(
                    "history/getLastSongPlayed/",
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         *
                         *     TRACK_ID  : int
                         * } */
                        if (response.DONE) {
                            // TODO : test if track comes from the current playlist ...
                            that.currentTrack = that.activeView.getEntryById(response.TRACK_ID);
                            window.app.changeTrack(that.currentTrack, true);
                        }

                        else {
                            new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                break;
        }
    }


    /**
     * method : refreshViews (public)
     * class  : Playlist
     * desc   : Refresh view
     **/
    refreshViews() {
        for (let i = 0; i < this.views.length; ++i) {
            if (this.views[i] !== null) {
                this.views[i].refreshTracks(this.tracks);
            }
        }
    }


    /**
     * method : setCurrentTrack (public)
     * class  : Playlist
     * desc   : Set playlist current track
     * arg    : {object} track - The track to select
     **/
    setCurrentTrack(track) {
        this.currentTrack = track; // TODO : handle list sorting, search for entry in view instead
        this.activeView.setSelected(track);
    }


    /**
     * method : showView (public)
     * class  : Playlist
     * desc   : Set UI to this playlist's view
     * arg    : {object} viewType - The view type
     **/
    showView(viewType) {
        let v = this.views[viewType.index];

        if (v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this), this.isLibrary, this.id);
            v = this.views[viewType.index];
        }

        this.activeView = v;
        window.app.changeView(v);
    }


    /**
     * method : toggleRepeat (public)
     * class  : Playlist
     * desc   : Change repeat mode ( 0 : off, 1 : one, 2: all ) and send info to server
     **/
    toggleRepeat() {
        ++this.repeatMode;
        this.repeatMode %= 3;

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "ajax/toggleRepeat/",
            JSON.stringify({
                PLAYLIST_ID: this.id,
                REPEAT_MODE: this.repeatMode
            }),
            null
        );
    }


    /**
     * method : toggleShuffle (public)
     * class  : Playlist
     * desc   : Change shuffle mode ( 0 : off, 1 : random, 2: shuffle ) and send info to server
     **/
    toggleShuffle() {
        ++this.shuffleMode;
        this.shuffleMode %= 3;

        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "player/toggleRandomMode/",
            JSON.stringify({
                PLAYLIST_ID: this.id,
                RANDOM_MODE: this.shuffleMode
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (!response.DONE) {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearTracks (private)
     * class  : Playlist
     * desc   : Remove all track and reset tracks, artists and album count
     **/
    _clearTracks() {
        this.tracks        = [];
        this.durationTotal = 0;
        this.trackTotal    = 0;
        this.artistTotal   = 0;
        this.albumTotal    = 0;
    }


    /**
     * method : _fillTracks (private)
     * class  : Playlist
     * desc   : Transform raw tracks into Track object
     * arg    : {object} tracks - Raw track w/ server syntax (capsed var)
     **/
    _fillTracks(tracks) { // Tracks is JSON response to playlist ID
        for (let i = 0; i < tracks.length; ++i) {
            ++this.trackTotal;
            this.durationTotal += tracks[i].DURATION;
            this.tracks.push(new __WEBPACK_IMPORTED_MODULE_2__Track_js__["a" /* default */](tracks[i]));
        }
    }


    /**
     * method : _getTracksLazy (public)
     * class  : Playlist
     * desc   : Fetch raw tracks from server using the lazy loading
     * arg    : {integer} step - Must start at 0
     *          {function} callback - Not mandatory
     **/
    _getTracksLazy(step, callback) {
        if (step == 0) {
            this.lazyLoadOK = false;
            this.rawTracks  = [];
            this._clearTracks();
        }

        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "playlist/simplifiedLazyLoading/",
            JSON.stringify({
                PLAYLIST_ID:    this.id,
                REQUEST_NUMBER: step
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT: [
                 *         ID:
                 *         TITLE:
                 *         YEAR:
                 *         COMPOSER:
                 *         PERFORMER:
                 *         BITRATE:
                 *         DURATION:
                 *         COVER:
                 *         ARTISTS:
                 *         GENRE:
                 *         ALBUM: {
                 *             ID:
                 *             TITLE:
                 *         }
                 *     ]
                 * } */
                if (response.DONE) {
                    that.rawTracks = that.rawTracks.concat(response.RESULT);
                    that._getTracksLazy(step + 1, callback);
                }

                else {
                    if (response.ERROR_MSG == "null" || response.ERROR_MSG == "" || response.ERROR_MSG == null) { // Successfully loaded all
                        that._fillTracks(that.rawTracks);
                        that.refreshViews();
                        that.lazyLoadOK = true;

                        if (callback) {
                            that.activate();
                            callback();
                        }
                    }

                    else {
                        new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                    }
                }
            }
        );
    }


    /**
     * method : _getTracksFromServer (private)
     * class  : Playlist
     * desc   : Ask server while track aren't fully scanned, every 0.5s
     * arg    : {int} playlistId - The playlist ID to get tracks from
     **/
    _getTracksFromServer(playlistId) {
        let that = this;
        this.getTracksIntervalId = window.setInterval(function() {
            that._getTracksFromServer_aux(playlistId);
        }, 500); // One call every 0.5s
    }


    /**
     * method : _getTracksFromServer_aux (private)
     * class  : Playlist
     * desc   : Post call to fetch tracks afterwards
     * arg    : {int} playlistId - The playlist ID to get tracks from
     **/
    _getTracksFromServer_aux(playlistId) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "library/checkScanStatus/",
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    window.clearInterval(that.getTracksIntervalId);
                    that.getTracksIntervalId = -1;

                    let self = that;
                    that.getPlaylistsTracks(function() {
                        self.showView(window.app.availableViews.LIST);
                        self.modal.close();
                        if (self.callback) {
                            self.callback();
                        }
                    });
                }
            }
        );
    }


    /**
     * method : _init (private)
     * class  : Playlist
     * desc   : Handle playlist instantiation depending on booleans given to constructor
     **/
    _init() {
        if (this.isLoading) {
            if (this.isLibrary) { // Library loading process
                this._loadLibrary();
            }

            else { // Playlist loading process
                this._loadPlaylist();
            }
        }

        else {
            if (this.isLibrary) { // Library creation process
                this._newLibrary();
            }

            else { // Playlist creation process
                this._newPlaylist();
            }
        }
    }


    /**
     * method : _initialLibraryScan (private)
     * class  : Playlist
     * desc   : Scan a new library folder
     * arg    : {int} libraryId - The library ID to scan
     **/
    _initialLibraryScan(libraryId) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "library/initialScan/",
            JSON.stringify({
                LIBRARY_ID: libraryId
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PLAYLIST_ID : int or undefined
                 * } */
                if (response.DONE) {
                    that.id = response.PLAYLIST_ID;
                    that._getTracksFromServer(response.PLAYLIST_ID);
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _loadLibrary (private)
     * class  : Playlist
     * desc   : Order _fillTracks if one sent rawTrack at instantiation
     **/
    _loadLibrary() {
        if (this.rawTracks.length === 0) {
            return;
        }

        this._fillTracks(this.rawTracks);
    }


    /**
     * method : _loadLibrary (private)
     * class  : Playlist
     * desc   : Order _fillTracks if one sent rawTrack at instantiation
     **/
    _loadPlaylist() {
        if (this.rawTracks.length === 0) {
            return;
        }

        this._fillTracks(this.rawTracks);
    }


    /**
     * method : _newLibrary (private)
     * class  : Playlist
     * desc   : Starts a new library sequence
     **/
    _newLibrary() {
        this.isLibrary = true;
        this.modal     = new __WEBPACK_IMPORTED_MODULE_3__utils_Modal_js__["a" /* default */]("newLibrary");
        this.modal.open();

        let that = this;
        this.modal.setCallback(function(name, path, convert) {
            that._requestNewLibrary(name.value, path.value, convert.checked);
        })
    }


    /**
     * method : _newPlaylist (private)
     * class  : Playlist
     * desc   : Starts a new playlist sequence
     **/
    _newPlaylist() {
        this.isLibrary = false;
        this.modal     = new __WEBPACK_IMPORTED_MODULE_3__utils_Modal_js__["a" /* default */]("newPlaylist");
        this.modal.open();

        let that = this;
        this.modal.setCallback(function(name) {
            that._requestNewPlaylist(name.value);
        })
    }


    /**
     * method : _requestNewLibrary (private)
     * class  : Playlist
     * desc   : Send new library information to server
     * arg    : {string} name - Name given by user
     *          {string} path - Path given by user
     *          {bool} convert - Auto conversion to ID3v2
     **/
    _requestNewLibrary(name, path, convert) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "library/new/",
            JSON.stringify({
                URL:     path,
                NAME:    name,
                CONVERT: convert
            }),
            function(response) {
                /* response = {
                 *     DONE         : bool
                 *     ERROR_H1     : string
                 *     ERROR_MSG    : string
                 *
                 *     LIBRARY_ID   : int or undefined
                 *     LIBRARY_NAME : string
                 * } */
                if (response.DONE) {
                    that.name  = response.LIBRARY_NAME;
                    that.modal.close();
                    that.modal = null;
                    that.modal = new __WEBPACK_IMPORTED_MODULE_3__utils_Modal_js__["a" /* default */]("scanLibrary");
                    that.modal.open();
                    that.id    = response.LIBRARY_ID;
                    that._initialLibraryScan(response.LIBRARY_ID);
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestNewPlaylist (private)
     * class  : Playlist
     * desc   : Send new playlist information to server
     * arg    : {string} name - Name given by user
     **/
    _requestNewPlaylist(name) {
        let that = this;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_Utils_js__["b" /* JSONParsedPostRequest */])(
            "playlist/new/",
            JSON.stringify({
                PLAYLIST_NAME: name
            }),
            function(response) {
                /* response = {
                 *     DONE          : bool
                 *     ERROR_H1      : string
                 *     ERROR_MSG     : string
                 *
                 *     PLAYLIST_ID   : int or undefined
                 *     PLAYLIST_NAME : string
                 * } */
                if (response.DONE) {
                    that.name  = response.PLAYLIST_NAME;
                    that.id    = response.PLAYLIST_ID;
                    that.modal.close();
                    that.modal = null;
                    if (that.callback) { that.callback(); }
                }

                else {
                    new __WEBPACK_IMPORTED_MODULE_1__utils_Notification_js__["a" /* default */]("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getName()        { return this.name;        }
    getIsLibrary()   { return this.isLibrary;   }
    getRepeatMode()  { return this.repeatMode;  }
    getShuffleMode() { return this.shuffleMode; }

    setName(name)    { this.name = name;        }

}

/* harmony default export */ __webpack_exports__["a"] = (Playlist);

/***/ })
/******/ ]);