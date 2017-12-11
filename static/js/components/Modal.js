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
    this.callback    = null;
    this.editModal   = {};

    this._createUI();

    switch (type) {
        case "newLibrary":
            this._newLibraryUI();
            break;

        case "scanLibrary":
            this._scanLibraryUI();
            break;

        case "newWish":
            this._newWishUI();
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


    _newLibraryUI: function() {
        this.ui.container.id = "newLibrary";
        this.ui.title.innerHTML = "New library";

        let infoLabel   = document.createElement("P");
        let name        = document.createElement("INPUT");
        let path        = document.createElement("INPUT");
        let convertLabel = document.createElement("SPAN");
        let convert     = document.createElement("INPUT");
        let scan        = document.createElement("BUTTON");

        infoLabel.id = "infoLabel";
        name.id = "name";
        path.id = "path";
        convertLabel.id = "id3Label";
        convert.id = "convert";
        scan.id = "scanButton";

        name.type    = "text";
        path.type    = "text";
        convert.type = "checkbox";
        name.placeholder = "Enter the name of the library";
        path.placeholder = "Enter the absolute path to your library";

        infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
            "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
            "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
            "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
        convertLabel.innerHTML = "Automatically convert files to <a href=\"https://en.wikipedia.org/wiki/ID3#ID3v2\" target=\"_blank\">ID3v2</a>";
        scan.innerHTML = "Scan";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.content.appendChild(path);
        this.ui.content.appendChild(convertLabel);
        this.ui.content.appendChild(convert);
        this.ui.footer.appendChild(scan);

        let that = this;
        scan.addEventListener("click", function() {
            that._checkInputs(name, path, convert);
        });
    },


    _newWishUI: function() {
        this.ui.container.id = "newWish";
        this.ui.title.innerHTML = "Track suggestion";

        let text        = document.createElement("P");
        let wish        = document.createElement("INPUT");
        let submit      = document.createElement("BUTTON");

        wish.type    = "text";
        wish.placeholder = "Enter your suggestion here";
        text.innerHTML = "If you noticed that a track you like is missing from any playlist here, you can make a suggestion. " +
            "Paste an url or write the more information you can about it, and an administrator will process your request. " +
            "You'll be notified when the track you asked has been added to a playlist.";
        submit.innerHTML = "Submit";

        this.ui.content.appendChild(text);
        this.ui.content.appendChild(wish);
        this.ui.footer.appendChild(submit);

        let that = this;
        submit.addEventListener("click", function(e) {
            if (wish.value !== '') {
                e.target.removeEventListener("click", arguments.callee);
                JSONParsedPostRequest(
                    "ajax/submitWish/",
                    JSON.stringify({
                        WISH: wish.value
                    }),
                    function(response) {
                        if (!response.DONE) {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                that.close();
            } else {
                wish.style.border = "solid 1px red";
                new Notification("INFO", "Suggestion field is empty.", "You must specify a name or an url for your track.");
            }
        });
    },


    _checkInputs: function(name, path, convert) {
        if (name.value !== '' && path.value !== '') {
            if (this.callback) {
                this.callback(name, path, convert);
            }
        }

        else {
            if (name.value !== '') {
                path.style.border = "solid 1px red";
                new Notification("INFO", "Path field is empty.", "You must specify the path of your library.");
            }

            else if (path.value !== '') {
                name.style.border = "solid 1px red";
                new Notification("INFO", "Name field is empty.", "You must give your library a name.");
            }

            else {
                path.style.border = "solid 1px red";
                name.style.border = "solid 1px red";
                new Notification("INFO", "Both fields are empty.", "You must fill both fields to create a new library.");
            }
        }
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


    setCallback: function(callback) {
        this.callback = callback;
    },


    getIsOpen: function() { return this.isOpen; }
};
