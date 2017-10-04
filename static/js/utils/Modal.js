/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Modal = function(type) {

    switch (type) {
        case "scanLibrary":
            this.open(false, "utils/modal/scanLibrary");
            break;
        case "editMetadata":
            this.open(true, "utils/modal/editMetadata");
            this._keyListener();
            break;
        default:
            new Notification("Can not open modal", "The given modal type doesn't exists");
            break;
    }
};


Modal.prototype = {

    open: function(buttons, url) {
        var that = this;

        JSONParsedGetRequest(
            url,
            true,
            function(response) {
                document.body.insertAdjacentHTML('beforeend', response);

                if (buttons) { that._eventListener(); }
            }
        );
    },


    close: function() {
        document.body.removeChild(document.getElementById("modal"));
    },


    _eventListener: function() {
        getById("cancel").addEventListener("click", this.close.bind(this));
    },


    _keyListener: function()  {
        var that = this;

        // Key pressed event
        document.addEventListener("keydown", function(event) {
            switch (event.keyCode) {
                case 27: // Esc
                    that.close();
                    break;
                default:
                    break;
            }
        });
    }
};
