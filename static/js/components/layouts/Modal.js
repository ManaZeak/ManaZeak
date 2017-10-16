/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var Modal = function(type, id) {

    this.url = null;
    this.haveButtons = false; // Add cancel and save button when set to true
    this.isOpen = false;
    this.id = id;
    this.editModal = {};

    switch (type) {
        case "scanLibrary":
            this.url = "utils/modal/scanLibrary";
            break;
        case "editMetadata":
            this.url = "utils/modal/editMetadata";
            this.haveButtons = true;
            break;
        default:
            new Notification("Can not open modal", "The given modal type doesn't exists");
            break;
    }
};


Modal.prototype = {

    open: function() {
        var that = this;

        JSONParsedGetRequest(
            this.url,
            true,
            function(response) {
                document.body.insertAdjacentHTML('beforeend', response);
                that.isOpen = true;
                if (that.haveButtons) { that._eventListener(); }
            }
        );
    },


    close: function() {
	//TODO: Use unique ID (this.id)
        document.body.removeChild(document.getElementById("modal"));
        this.isOpen = false;
    },


    initEditMetadata: function(entriesSelected) {
        var props = Object.getOwnPropertyNames(entriesSelected);
        for(var entry in props) {
            if(entriesSelected[entry] === true) {
                // TODO : from utils, modify here
                document.getElementById("trackListContainer").parentNode.removeChild(document.getElementById("trackListContainer"));
                document.getElementById("inputContainer").className += "inputStandAlone";
            }
        }
    },


    editEntryTrackInfo: function(entry) {
        //entry.track.title = "SCOPARE";
    },


    _eventListener: function() {
	//TODO: Use unique ID
        document.getElementById("cancel").addEventListener("click", this.close);
    },


    getIsOpen: function() { return this.isOpen; }
};
