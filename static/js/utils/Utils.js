/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  Utils function for global app          *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

"use strict";

/**
 * method : extendClass (public)
 * desc   : TODO
 * arg    : {object} parent - TODO
 *          {object} child - TODO
 **/
export function extendClass(parent, child) {
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
export function precisionRound(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}



export function secondsToDate(time) {
    let weekday   = "-",
        dayNumber = time.getDate(),
        month     = "-",
        year      = time.getFullYear(),
        hours     = time.getHours(),
        minutes   = time.getMinutes(),
        separator = time.getSeconds() % 2 == 0 ? ":" : "<span style=\"color: transparent;\">-</span>";

    switch (time.getDay()) {
        case 0:
            weekday = "Monday";
            break;
        case 1:
            weekday = "Tuesday";
            break;
        case 2:
            weekday = "Wednesday";
            break;
        case 3:
            weekday = "Thursday";
            break;
        case 4:
            weekday = "Friday";
            break;
        case 5:
            weekday = "Saturday";
            break;
        case 6:
            weekday = "Sunday";
            break;
        default:
            weekday = "-";
            break;
    }

    switch (time.getMonth()) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default:
            month = "-";
            break;
    }

    if (hours < 10)   { hours = "0" + hours.toString();     }
    if (minutes < 10) { minutes = "0" + minutes.toString(); }

    return weekday + " " + dayNumber + " " + month + " " + year + "&nbsp;&nbsp;|&nbsp;&nbsp;" + hours + separator + minutes;
}


/**
 * method : secondsToTimecode (public)
 * desc   : Transforms seconds into a readable timecode
 * arg    : {int} time - Number of seconds
 **/
export function secondsToTimecode(time) {
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
export function rawSizeToReadableSize(size) {
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
export function sortObjectArrayBy(key, ascending, subobject) {
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
export function getCookies() {
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
export function setCookie(cookieKey, cookieValue, expiresDay) {
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
export function toggleVisibilityLock(object) { //TODO: Move to Overrides
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
export function addVisibilityLock(object) { // TODO : rename to addClass -> modify modal accordingly
    object.classList.add("mzk-visible");
    object.dataset.mzkLock = 1;
}


/**
 * method : removeVisibilityLock (public)
 * desc   : Remove a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
export function removeVisibilityLock(object) {
    object.classList.remove("mzk-visible");
    object.dataset.mzkLock = 0;
}


/**
 * method : toggleInvisibilityLock (public)
 * desc   : Toggle a visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
export function toggleInvisibilityLock(object) { //TODO: Move to Overrides
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
export function addInvisibilityLock(object) { // TODO : rename to addClass -> modify modal accordingly
    object.classList.add("mzk-hidden");
    object.dataset.mzkLock = 1;
}


/**
 * method : removeInvisibilityLock (public)
 * desc   : Remove a invisibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
export function removeInvisibilityLock(object) {
    object.classList.remove("mzk-hidden");
    object.dataset.mzkLock = 0;
}


/**
 * method : isVisibilityLocked (public)
 * desc   : Check visibility lock on an element
 * arg    : {object} object - The HTML object to toggle
 **/
export function isVisibilityLocked(object) {
    return object.dataset.mzkLock == '1';
}


/**
 * method : getRequest (public)
 * desc   : Function to GET an url
 * arg    : {string} url - The address
 *          {function} callback
 **/
export function getRequest(url, callback) {
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
export function JSONParsedGetRequest(url, callback) {
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
export function JSONParsedPostRequest(url, message, callback) {
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
export function renderMoodFile(file, parentDiv, callback) {
    // Credit for this function : "Valodim"
    // https://gist.github.com/Valodim/5225460
    let xhr = new XMLHttpRequest();

    xhr.open('GET', file, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onreadystatechange = function(e) {
        if (this.readyState === 4 && this.status === 200) {
            d3.selectAll('.mzk-moodbar svg').remove();
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
export function genUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}


export function matchItem(entry, search) { // Function that check all entry' attributes (except ID) and search for a match in them
	let result      = null; // Result object, null === no match
	let keys        = Object.keys(entry); // Entry attributes array
	let matchOutput = ''; // Keys that matched
	let accuracy    = 0; // Number of keys that matched

	for (let i = 0; i < keys.length; ++i) { // Iterating over keys
		if (keys[i] !== 'track' && entry[keys[i]].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
			matchOutput += keys[i] + ' '; // Update match string (might be use for accuracy later...)
			++accuracy; // Update accuracy index

			result = { // Updating result
				match: matchOutput,
				accuracy: accuracy,
				entry: entry
			};
		}
	}

	return result;
}

export function boldMatchingString(string, search){
    let regex = new RegExp(search, 'gi');
    return string.replace(regex, function(str) {
        return '<b>' + str + '</b>'
    });
}


String.prototype.toTitleCase = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m, p1, p2) {
       return p1 + p2.toUpperCase();
    });
};