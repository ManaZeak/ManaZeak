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

let View = function(data) {

    this.container = document.createElement("DIV");
    this.init(data);
};


View.prototype = {

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : init (public)
     * class  : View
     * desc   : Init container and listen before calling child constructor
     * arg    : {object} data - TODO
     **/
    init: function(data) {
        this.container.innerHTML = "";
        this._init(data);
        this._eventListener();
    },


    /**
     * method : getDataFromPlaylist (public)
     * class  : View
     * desc   : Get data from playlist
     * arg    : {object} playlist - The playlist to get data from
     **/
    getDataFromPlaylist: function(playlist) {
        return null;
    },


    /**
     * method : getContainer (public)
     * class  : View
     * desc   : Returns the HTML of the view
     * return : {object} - The view container
     **/
    getContainer: function() {
        return this.container;
    },

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _init (private)
     * class  : View
     * desc   : _init child class with data
     * arg    : {object} data - TODO
     **/
    _init: function(data) {

    },


    /**
     * method : _eventListener (private)
     * class  : View
     * desc   : Extract artists IDs from JSON
     **/
    _eventListener: function() {

    }

};
