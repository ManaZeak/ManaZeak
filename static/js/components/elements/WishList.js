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

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : WishList
     * desc   : Build UI elements
     **/
    _createUI: function(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.id = "wishList";
        this.ui.img.src      = "/static/img/utils/idea.svg";

        this.ui.container.appendChild(this.ui.img);
        container.appendChild(this.ui.container);
    },


    /**
     * method : _init (private)
     * class  : WishList
     * desc   : Listen to events
     **/
    _init: function() {
        this._eventListener();
    },


    /**
     * method : _eventListener (private)
     * class  : WishList
     * desc   : WishList event listeners
     **/
    _eventListener: function() {
        this.ui.img.addEventListener("click", function() {
            let modal = new Modal("newWish");
            modal.open();
        });
    }

};
