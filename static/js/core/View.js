/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  ListView class - classical list view                                               *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let View = function(data) {

    this.pageContainer = document.getElementById("mainContainer");
    this.container = document.createElement("DIV");

    this.init(data);
};

View.prototype = {

    init: function(data) {
        this.container.innerHTML = "";
        this._init(data);
        this._eventListener();
    },


    show: function() {
        this.pageContainer.innerHTML = "";
        this.pageContainer.appendChild(this.container);

        // TODO : dirty work here, put this somewhere else
        if (this.listView.scrollHeight > this.listView.clientHeight) {
            this.header.container.className += " columnHeaderOffset";
        }
    },


    getDataFromPlaylist: function(playlist) {
        return null;
    },


    _init: function(data) {
    },


    _eventListener: function() {
    }
};
