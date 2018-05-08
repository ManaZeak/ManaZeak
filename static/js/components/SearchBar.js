/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  UserMenu class                                 *
 *                                                 *
 *  Handle the user's menu                         *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */


class SearchBar {

    constructor() {

        this.isVisible = false;

        this._createUI();
        this._eventListener();
    }


    show() {
        this.isVisible = true;
        document.body.appendChild(this.ui.overlay);
        this.ui.input.focus();
    }


    hide() {
        this.isVisible = false;
        document.body.removeChild(this.ui.overlay);
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //


    /**
     * method : _createUI (private)
     * class  : UserMenu
     * desc   : Build UI Elements
     * arg    : {object} container - The UserMenu container
     **/
    _createUI() {
        this.ui = {
            overlay: document.createElement('DIV'),
            container: document.createElement('DIV'),
            input:       document.createElement('INPUT')
        };

        this.ui.overlay.id   = 'search';

        this.ui.input.name = 'search';
        this.ui.input.type = 'text';

        this.ui.container.appendChild(this.ui.input);
        this.ui.overlay.appendChild(this.ui.container);
    }


    _eventListener() {
        let that = this;
        // TODO : integrate w/ shortcut to aggro from body
        this.ui.input.addEventListener('keyup', function(event) {
            if (event.keyCode === 27 && that.isVisible) {
                that.hide();
            }
        });
    }


    getVisible() { return this.isVisible; }
}

export default SearchBar
