function precisionRound(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


function secondsToTimecode(time) {
    // TODO : add days
    var transformedTime = {
        h: 0,
        m: 0,
        s: 0
    };
    // Cutting total seconds
    transformedTime.h = Math.floor(time / 3600);
    transformedTime.m = Math.floor((time - (transformedTime.h * 3600)) / 60);
    transformedTime.s = Math.round(time - (transformedTime.h * 3600) - (transformedTime.m * 60));
    // Adding an extra 0 for values inferior to 10
    transformedTime.h = transformedTime.h < 10 ? "0" + transformedTime.h : transformedTime.h;
    transformedTime.m = transformedTime.m < 10 ? "0" + transformedTime.m : transformedTime.m;
    transformedTime.s = transformedTime.s < 10 ? "0" + transformedTime.s : transformedTime.s;
    // Formatting output
    if (transformedTime.h > 0) {
        return transformedTime.h + ":" + transformedTime.m + ":" + transformedTime.s;
    } else {
        return transformedTime.m + ":" + transformedTime.s;
    }
}


function getCookies() {
    var cookies = {};

    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            var m = c.trim().match(/(\w+)=(.*)/);
            if (m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }

    return cookies;
}


function JSONParsedGetRequest(url, http, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if (http) { callback(this.responseText); }
            else      { callback(JSON.parse(this.responseText)); }
        }
    };

    xmlhttp.open("GET", url, true);
    if (http) { xmlhttp.setRequestHeader("Content-Type", "application/json"); }
    xmlhttp.send();
}


function JSONParsedPostRequest(url, cookies, message, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    };

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(message);
}
