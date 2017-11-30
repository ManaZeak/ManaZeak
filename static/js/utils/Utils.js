"use strict";

function extendClass(parent, child) {
    var proto = Object.create(parent.prototype);
    for(var i in child.prototype) {
        proto[i] = child.prototype[i];
    }
    child.prototype = proto;
}

function precisionRound(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


function secondsToTimecode(time) {
    // TODO : add days
    var transformedTime = {
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
        return transformedTime.d + " days, " + transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
    } else if (transformedTime.h > 0) {
        return transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
    } else {
        return transformedTime.m + ":" + transformedTime.s;
    }
}


function sortObjectArrayBy(key, ascending, subobject) {
    return function(a, b) {
        if(subobject != null) {
            a = a[subobject];
            b = b[subobject];
        }
        
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) { return 0; }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        var compare = 0;
        if (varA > varB)      { compare =  1; }
        else if (varA < varB) { compare = -1; }

        return (!ascending ? (compare * -1) : compare);
    };
}


function getCookies() {
    var cookies = {};

    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (cookie) {
            var m = cookie.trim().match(/(\w+)=(.*)/);
            if (m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }

    return cookies;
}


function addVisibilityLock(object) { // TODO : rename to addClass -> modify modal accordingly
    object.classList.add("mzk-visible");
}


function removeVisibilityLock(object) {
    object.classList.remove("mzk-visible");
}


function getRequest(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}


function JSONParsedGetRequest(url, http, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (http) { callback(this.responseText); }
            else      { callback(JSON.parse(this.responseText)); }
        }
    };

    xhr.open("GET", url, true);
    if (http) { xhr.setRequestHeader("Content-Type", "application/json"); }
    xhr.send();
}


function JSONParsedPostRequest(url, message, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader('X-CSRFToken', window.app.cookies['csrftoken']);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(message);
}


function JSONMoodbarPostRequest(url, cookies, message, callback) {

}


// Credit for this function : "Valodim"
// https://gist.github.com/Valodim/5225460
function renderMoodFile(file, parentDiv) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', file, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onreadystatechange = function(e) {
        if (this.readyState === 4 && this.status === 200) {
            d3.selectAll('#moodbar svg').remove();
            var rgb = new Array(this.responseText.length / 3);

            for (var i = 0, len = rgb.length; i < len; ++i) {
                var r = this.responseText.charCodeAt(i * 3)       & 0xff;
                var g = this.responseText.charCodeAt((i * 3) + 1) & 0xff;
                var b = this.responseText.charCodeAt((i * 3) + 2) & 0xff;

                // TODO : Have fun here w/ colors

                rgb[i] = {
                    offset: (i / len * 100) + "%",
                    color:  "rgba(" + r + ", " + b + ", " + g + ", 0.9)"
                };
            }

            var svg = d3.select(parentDiv).append("svg")
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
    };
    xhr.send();
}
