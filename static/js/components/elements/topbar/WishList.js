/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  WishList class                                 *
 *                                                 *
 *  Handle track information and suggests tracks,  *
 *  triggered on hover over a view entry           *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO : add a list of the user's suggestions (link in modal ?)
class WishList {
    constructor(container) {


        this._createUI(container);
        this._init();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _createUI (private)
     * class  : WishList
     * desc   : Build UI elements
     **/
    _createUI(container) {
        this.ui = {
            container: document.createElement("DIV"),
            img:       document.createElement("IMG")
        };

        this.ui.container.id = "wishList";
        this.ui.img.src      = "/static/img/utils/idea.svg";

        this.ui.container.appendChild(this.ui.img);
        container.appendChild(this.ui.container);
    }


    /**
     * method : _init (private)
     * class  : WishList
     * desc   : Listen to events
     **/
    _init() {
        this._eventListener();
    }


    /**
     * method : _eventListener (private)
     * class  : WishList
     * desc   : WishList event listeners
     **/
    _eventListener() {
        this.ui.img.addEventListener("click", function() {
            let modal = new Modal("newWish");
            modal.open();
        });
    }

}
