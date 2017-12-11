/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Modal class - modals to use in various case in ManaZeak                            *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let Modal = function(type, id) {

    this.url         = null;
    this.haveButtons = false; // Add cancel and save button when set to true
    this.isOpen      = false;
    this.id          = id;
    this.editModal   = {};

    this._createUI();

    switch (type) {
        case "scanLibrary":
            this._scanLibraryUI();
            break;

        case "editMetadata":
            this.url = "utils/modals/editMetadata";
            this.haveButtons = true;
            break;

        default:
            new Notification("ERROR", "Can not open modals", "The given modals type doesn't exists");
            break;
    }
};


Modal.prototype = {

    _createUI: function() {
        this.ui = {
            overlay: document.createElement("DIV"),
            container: document.createElement("DIV"),
            header: document.createElement("DIV"),
            title: document.createElement("H1"),
            content: document.createElement("DIV"),
            footer: document.createElement("DIV")
        };

        this.ui.overlay.id = "modal";
        this.ui.overlay.className = "overlay";

        this.ui.header.id = "header";
        this.ui.content.id = "content";
        this.ui.footer.id = "footer";

        this.ui.header.appendChild(this.ui.title);
        this.ui.container.appendChild(this.ui.header);
        this.ui.container.appendChild(this.ui.content);
        this.ui.container.appendChild(this.ui.footer);

        this.ui.overlay.appendChild(this.ui.container);
    },


    _scanLibraryUI: function() {
        this.ui.container.id = "scan";
        this.ui.title.innerHTML = "Library scan in progress...";

        let contentText = document.createElement("P");
        let spinnerContainer = document.createElement("DIV");
        let spinnerRing = document.createElement("DIV");
        let spinnerFloatDiv = document.createElement("DIV");
        let spinnerImage = document.createElement("IMG");
        let footerText = document.createElement("P");

        contentText.innerHTML = "Dark magic is currently happening, but doing such activity may take a while, depending on the number of files you have. Please relax, go grab some cofee and let the server manage its business.";
        spinnerContainer.className = "lds-css";
        spinnerRing.className = "lds-dual-ring";
        spinnerImage.src = "/static/img/utils/python.svg";
        footerText.innerHTML = "On average, it take a minute to process two thousand files. Just do the math ;)";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(contentText);
        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(footerText);
    },

    open: function() {
        document.body.appendChild(this.ui.overlay);
    },


    close: function() {
        //TODO: Use unique ID (this.id)
        document.body.removeChild(document.getElementById("modal"));
        this.isOpen = false;
    },


    initEditMetadata: function(entriesSelected) {
        let props = Object.getOwnPropertyNames(entriesSelected);

        for (let entry in props) {
            if (entriesSelected[entry] === true) {
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
