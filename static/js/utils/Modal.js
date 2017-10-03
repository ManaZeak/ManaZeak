/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Modal = function() {
    this._init();
};


Modal.prototype = {

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
