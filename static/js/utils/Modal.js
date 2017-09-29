"use strict";

var Modal = function() {

    this._init();
};

Modal.prototype = {

    // Create modal skeleton
    _init: function() {
        this.open();
    },


    open: function() {
        JSONParsedGetRequest(
            "utils/modal",
            true,
            function(response) {
               document.body.insertAdjacentHTML('beforeend', response);
            }
        );
    },

    close: function() {
        document.body.removeChild(document.getElementById("modal"));
    }
};
