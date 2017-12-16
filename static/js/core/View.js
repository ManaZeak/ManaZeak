/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let View = function(data) {
    this.container = document.createElement("DIV");

    this.init(data);
};

View.prototype = {

    init: function(data) {
        this.container.innerHTML = "";
        this._init(data);
        this._eventListener();
    },


    getDataFromPlaylist: function(playlist) {
        return null;
    },

    getContainer: function() {
        return this.container;
    },

    _init: function(data) {
    },


    _eventListener: function() {
    }
};
