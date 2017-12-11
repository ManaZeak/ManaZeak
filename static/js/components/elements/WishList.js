/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  WishList class                                 *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

let WishList = function(container) {

    this._createUI(container);
    this._init();
};


WishList.prototype = {


//  --------------------------------  PUBLIC METHODS  --------------------------------  //





//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    _init: function() {
        this._eventListener();
    },

    /**
     * method : _updateSuggestionMode (private)
     * class  : TrackInfo
     * desc   : Update the suggestion UI title and icon elements according to the trackSuggestionMode attribute
     * arg    : {int} value - The set value (not mandatory)
     **/
    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img: document.createElement("IMG")
        };

        this.ui.container.id = "wishList";
        this.ui.img.src = "/static/img/utils/idea.svg";

        this.ui.container.appendChild(this.ui.img);
        container.appendChild(this.ui.container);
    },

    _eventListener: function() {
        this.ui.img.addEventListener("click", function() {
            let modal = new Modal("scanLibrary");
            modal.open();
        });
    }
};
