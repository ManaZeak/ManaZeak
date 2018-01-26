/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  Modal class                                    *
 *                                                 *
 *  Modals to use in various case                  *
 *                                                 *
 *  type    : {string} Modal type name             *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest, genUniqueID } from './Utils.js'
import MzkObject from '../core/MzkObject.js'
import Notification from './Notification.js'
import EditTag from '../components/EditTag.js'

class Modal extends MzkObject {

    constructor(type, data) {
        super();
        this.data        = data;
        this.url         = null;
        this.id          = "modal-" + genUniqueID();
        this.callback    = null;
        this.closeButton = null;
        this.editTag     = null;

        this._createUI();

        switch (type) {
            case "deletePlaylist":
                this._deletePlaylistUI();
                break;

            case "fetchPlaylists":
                this._fetchPlaylistsUI();
                break;

            case "fetchStats":
                this._fetchStatsUI();
                break;

            case "newLibrary":
                this._newLibraryUI();
                break;

            case "newPlaylist":
                this._newPlaylistUI();
                break;

            case "renamePlaylist":
                this._renamePlaylistUI();
                break;

            case "scanLibrary":
                this._scanLibraryUI();
                break;

            case "newWish":
                this._newWishUI();
                break;

            case "openSyncThing":
                this._openSyncThing();
                break;

            case "inviteCode":
                this._inviteCodeUI();
                break;

            case "cover":
                this._coverUI();
                break;

            case "editTag":
                this._editTagUI();
                break;

            default:
                new Notification("ERROR", "Can not open modals", "The given modals type doesn't exists");
                break;
        }
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : close (public)
     * class  : Modal
     * desc   : Remove the modal from body
     **/
    close() {
        document.body.removeChild(document.getElementById(this.id));
        this.unlockShortcuts();
    }


    /**
     * method : open (public)
     * class  : Modal
     * desc   : Add the modal to the body
     **/
    open() {
        this.lockShortcuts();
        document.body.appendChild(this.ui.overlay);
    }


    /**
     * method : setCallback (public)
     * class  : Modal
     * desc   : Set the modal callback
     * arg    : {function} callback
     **/
    setCallback(callback) {
        this.callback = callback;
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _appendCloseButton (private)
     * class  : Modal
     * desc   : Append a close button to modal container
     **/
    _appendCloseButton() {
        this.closeButton     = document.createElement("IMG");
        this.closeButton.id  = "closeButton";
        this.closeButton.src = "/static/img/utils/close.svg";

        let that = this;
        this.closeButton.addEventListener("click", function() {
            that.close();
        });

        this.ui.container.appendChild(this.closeButton);
    }


    /**
     * method : _checkLibraryInputs (private)
     * class  : Modal
     * desc   : Checks user input for new library
     * arg    : {string} name - Given library name
     *          {string} path - Given library path
     *          {bool} convert - conversion to ID3v2
     **/
    _checkLibraryInputs(name, path, convert) {
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
    }


    /**
     * method : _checkPlaylistInputs (private)
     * class  : Modal
     * desc   : Checks user input for new playlist
     * arg    : {string} name - Given playlist name
     **/
    _checkPlaylistInputs(name) {
        if (name.value !== '') {
            if (this.callback) {
                this.callback(name);
            }
        }

        else {
            name.style.border = "solid 1px red";
            new Notification("INFO", "Name field is empty.", "You must specify the name of your playlist.");
        }
    }


    /**
     * method : _coverUI (private)
     * class  : Modal
     * desc   : Build UI elements for cover modal
     **/
    _coverUI() {
        this.ui.container.id = "cover";

        let info             = document.createElement("H1");
        let cover            = document.createElement("IMG");
        // Avoiding '-' symbol since info comes from innerHTML in TrackPreview
        let year             = this.data.year.length === 29 ? this.data.year.slice(0, -25) : this.data.year;

        info.innerHTML       = this.data.artist + " - " + this.data.album + " (" + year + ")";
        cover.src            = this.data.src;

        this.ui.content.appendChild(info);
        this.ui.content.appendChild(cover);

        this._appendCloseButton();
    }


    /**
     * method : _createUI (private)
     * class  : Modal
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            overlay:   document.createElement("DIV"),
            container: document.createElement("DIV"),
            header:    document.createElement("DIV"),
            title:     document.createElement("H1"),
            content:   document.createElement("DIV"),
            footer:    document.createElement("DIV")
        };

        this.ui.overlay.id        = this.id;
        this.ui.overlay.className = "overlay";
        this.ui.header.id         = "header";
        this.ui.content.id        = "content";
        this.ui.footer.id         = "footer";

        this.ui.header.appendChild(this.ui.title);
        this.ui.container.appendChild(this.ui.header);
        this.ui.container.appendChild(this.ui.content);
        this.ui.container.appendChild(this.ui.footer);
        this.ui.overlay.appendChild(this.ui.container);
    }


    /**
     * method : _deletePlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for delete playlist modal
     **/
    _deletePlaylistUI() {
        this.ui.container.id    = "deletePlaylist";
        this.ui.title.innerHTML = "Remove " + this.data.playlist.name;

        let infoLabel           = document.createElement("P");
        let cancel              = document.createElement("BUTTON");
        let del                 = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        cancel.id               = "cancelButton";
        del.id                  = "deleteButton";

        infoLabel.innerHTML     = "You are about to delete your playlist named " + this.data.playlist.name +
                                  ", and all the tracks that you've collected in it. Do you really want to delete this ?";
        cancel.innerHTML        = "Cancel";
        del.innerHTML           = "Delete";

        this._appendCloseButton();

        this.ui.content.appendChild(infoLabel);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(del);

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
        del.addEventListener("click", function() {
            window.app.deletePlaylist(that.data.playlist);
            that.close();
        });
    }


    _editTagUI() {
        this.editTag = new EditTag(this.ui.container, this.data);

        let ui = {
            foot:      document.createElement("DIV"),
                close: document.createElement("BUTTON"),
                save:  document.createElement("BUTTON")
        };

        ui.foot.className      = "foot";
            ui.close.innerHTML = "Close";
            ui.save.innerHTML  = "Save";

        ui.foot.appendChild(ui.close);
        ui.foot.appendChild(ui.save);

        let that = this;
        ui.close.addEventListener("click", function() {
            that.close();
        });
        ui.save.addEventListener("click", function() {
           that.editTag.saveState();
           that.close();
        });

        this.editTag.getContainer().appendChild(ui.foot);
    }


    /**
     * method : _fetchPlaylistsUI (private)
     * class  : Modal
     * desc   : Build UI elements for fetchPlaylists modal
     **/
    _fetchPlaylistsUI() {
        this.ui.container.id       = "fetchPlaylists";
        this.ui.title.innerHTML    = "Fetching your playlists";

        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let text                   = document.createElement("P");

        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        text.innerHTML             = "Currently fetching your libraries and playlists, please wait.";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(text);
    }


    /**
     * method : _fetchStatsUI (private)
     * class  : Modal
     * desc   : Build UI elements for fetchStats modal
     **/
    _fetchStatsUI() {
        this.ui.container.id       = "fetchPlaylists";
        this.ui.title.innerHTML    = "Crushing data";

        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let text                   = document.createElement("P");

        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        text.innerHTML             = "Hold on, you're data are on the road.";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(text);
    }


    /**
     * method : _inviteCodeUI (private)
     * class  : Modal
     * desc   : Build UI elements for display user'sfetchPlaylists invite code modal
     **/
    _inviteCodeUI() {
        this.ui.container.id    = "inviteCode";
        this.ui.title.innerHTML = "Invitation code";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("H3");
        let cancel              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";

        cancel.innerHTML        = "Close";
        name.innerHTML          = window.app.user.getInviteCode();
        infoLabel.innerHTML     = "Here is your unique invitation code. Share it with your friends if they want to join ManaZeak. Please do not share this code on the internet.";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(cancel);

        this._appendCloseButton();

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
    }


    /**
     * method : _newLibraryUI (private)
     * class  : Modal
     * desc   : Build UI elements for newLibrary modal
     **/
    _newLibraryUI() {
        this.ui.container.id    = "newLibrary";
        this.ui.title.innerHTML = "New library";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let path                = document.createElement("INPUT");
        let convertLabel        = document.createElement("SPAN");
        let convert             = document.createElement("INPUT");
        let scan                = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        path.id                 = "path";
        convertLabel.id         = "id3Label";
        convert.id              = "convert";
        scan.id                 = "scanButton";

        name.type               = "text";
        path.type               = "text";
        convert.type            = "checkbox";
        name.placeholder        = "Enter the name of the library";
        path.placeholder        = "Enter the absolute path to your library";

        infoLabel.innerHTML     = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
            "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
            "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
            "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
        convertLabel.innerHTML  = "Automatically convert files to <a href=\"https://en.wikipedia.org/wiki/ID3#ID3v2\" target=\"_blank\">ID3v2</a>";
        scan.innerHTML          = "Scan";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.content.appendChild(path);
        this.ui.content.appendChild(convertLabel);
        this.ui.content.appendChild(convert);
        this.ui.footer.appendChild(scan);

        this._appendCloseButton();

        let that = this;
        scan.addEventListener("click", function() {
            that._checkLibraryInputs(name, path, convert);
        });
    }


    /**
     * method : _newPlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for newPlaylist modal
     **/
    _newPlaylistUI() {
        this.ui.container.id    = "newLibrary";
        this.ui.title.innerHTML = "New playlist";

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let create              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        create.id               = "scanButton";

        name.type               = "text";
        name.placeholder        = "Enter the name of the playlist";

        infoLabel.innerHTML     = "Please choose a name for your brand new playlist.";
        create.innerHTML        = "Create";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(create);

        this._appendCloseButton();

        let that = this;
        create.addEventListener("click", function() {
            that._checkPlaylistInputs(name);
        });
    }


    /**
     * method : _newWishUI (private)
     * class  : Modal
     * desc   : Build UI elements for newWish modal
     **/
    _newWishUI() {
        this.ui.container.id    = "newWish";
        this.ui.title.innerHTML = "Track suggestion";

        let text                = document.createElement("P");
        let wish                = document.createElement("INPUT");
        let submit              = document.createElement("BUTTON");

        wish.type               = "text";
        wish.placeholder        = "Enter your suggestion here";
        text.innerHTML          = "If you noticed that a track you like is missing from any playlist here, you can make a suggestion. " +
            "Paste a URL or write as much information as you can about it, and an administrator will process your request. " +
            "You will be notified when the track you requested has been added to a playlist. Also, if you have any feature idea, feel free to fill " +
            "this field (hard to say isn't it?).";
        submit.innerHTML        = "Submit";

        this.ui.content.appendChild(text);
        this.ui.content.appendChild(wish);
        this.ui.footer.appendChild(submit);

        this._appendCloseButton();

        let that = this;
        submit.addEventListener("click", function() {
            if (wish.value !== '') {
                // TODO : remove event listener on submit
                JSONParsedPostRequest(
                    "wish/submit/",
                    JSON.stringify({
                        WISH: wish.value
                    }),
                    function(response) {
                        /* response = {
                         *     DONE      : bool
                         *     ERROR_H1  : string
                         *     ERROR_MSG : string
                         * } */
                        if (!response.DONE) {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
                that.close();
            }

            else {
                wish.style.border = "solid 1px red";
                new Notification("INFO", "Suggestion field is empty.", "You must specify something in the field.");
            }
        });
    }


    /**
     * method : _openSyncThing (private)
     * class  : Modal
     * desc   : Build UI elements for SyncThing IFRAME modal
     **/
    _openSyncThing() {
        let content             = document.createElement("IFRAME");
        this.ui.container.id    = "openSyncThing";

        content.frameBorder     = 0;
        content.height          = "100%";
        content.width           = "100%";
        //content.src             = "http://everynoise.com/engenremap.html";
        content.src             = "//127.0.0.1:8384/";

        content.onload = function() {
        };

        this.ui.content.appendChild(content);

        this._appendCloseButton();
    }


    /**
     * method : _deletePlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for delete playlist modal
     **/
    _renamePlaylistUI() {
        this.ui.container.id    = "deletePlaylist";
        this.ui.title.innerHTML = "Rename " + this.data.name;

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("INPUT");
        let cancel              = document.createElement("BUTTON");
        let rename              = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";
        cancel.id               = "cancelButton";
        rename.id               = "deleteButton";

        name.type               = "text";
        name.placeholder        = "Enter the name of the playlist";

        infoLabel.innerHTML     = "You are about to delete your playlist named " + this.data.name +
            ", and all the tracks that you've collected in it. Do you really want to delete this ?";
        cancel.innerHTML        = "Cancel";
        rename.innerHTML        = "Delete";

        this._appendCloseButton();

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(rename);

        this.setCallback(function(name) {
            window.app.renamePlaylist(that.data.id, name.value);
            that.close();
        });

        let that = this;
        cancel.addEventListener("click", function() {
            that.close();
        });
        rename.addEventListener("click", function() {
            that._checkPlaylistInputs(name);
        });
    }


    /**
     * method : _scanLibraryUI (private)
     * class  : Modal
     * desc   : Build UI elements for scanLibrary modal
     **/
    _scanLibraryUI() {
        this.ui.container.id       = "scan";
        this.ui.title.innerHTML    = "Library scan in progress...";

        let contentText            = document.createElement("P");
        let spinnerContainer       = document.createElement("DIV");
        let spinnerRing            = document.createElement("DIV");
        let spinnerFloatDiv        = document.createElement("DIV");
        let spinnerImage           = document.createElement("IMG");
        let footerText             = document.createElement("P");

        contentText.innerHTML      = "Dark magic is currently happening, but doing such activity may take a while, depending on the number of files you have. Please relax, go grab some coffee and let the server manage its business.";
        spinnerContainer.className = "lds-css";
        spinnerRing.className      = "lds-dual-ring";
        spinnerImage.src           = "/static/img/manazeak.svg";
        footerText.innerHTML       = "On average, it take a minute to process two thousand files. Just do the math ;)";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(contentText);
        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(footerText);
    }

}

export default Modal