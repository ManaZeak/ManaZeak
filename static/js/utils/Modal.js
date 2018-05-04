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
        this.id          = "mzk-modal-wrapper-" + genUniqueID();
        this.callback    = null;
        this.closeButton = null;
        this.editButton  = null; // TODO : create modale button object
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

            case "editGroup":
                this._editGroupUI();
                break;

            case "chooseGroup":
                this._chooseGroupUI();
                break;

            case "editCollectionDescription":
                this._editCollectionDescriptionUI();
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
        this.closeButton           = document.createElement("IMG");
        this.closeButton.src       = "/static/img/controls/close.svg";
        this.closeButton.className = "mzk-modal-closebutton";

        let that = this;
        this.closeButton.addEventListener("click", function() {
            that.close();
        });

        this.ui.container.appendChild(this.closeButton);
    }

    /**
     * method : _appendCloseButton (private)
     * class  : Modal
     * desc   : Append a close button to modal container
     **/
    _appendEditButton() {
        this.editButton          = document.createElement("IMG");
        this.editButton.src       = "/static/img/controls/edit.svg";
        this.editButton.className = "mzk-modal-editbutton";

        // Listener to set when append somewhere

        this.ui.container.appendChild(this.editButton);
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
        this.ui.container.className = "mzk-modal-cover";

        let info             = document.createElement("H1");
        let cover            = document.createElement("IMG");
        // Avoiding '-' symbol since info comes from innerHTML in TrackPreview
        let year             = this.data.year.length === 29 ? this.data.year.slice(0, -25) : this.data.year;

        info.innerHTML       = this.data.artist + " - " + this.data.album + " (" + year + ")";
        cover.src            = this.data.src;

        this.ui.container.innerHTML = "";

        this.ui.header  = null;
        this.ui.footer  = null;
        this.ui.content = null;

        this.ui.container.appendChild(info);
        this.ui.container.appendChild(cover);

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
        this.ui.overlay.className = "mzk-modal-overlay";
        this.ui.header.className  = "mzk-modal-header";
        this.ui.content.className = "mzk-modal-content";
        this.ui.footer.className  = "mzk-modal-footer";
        this.ui.container.id      = "mzk-modal-container";

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
        this.ui.container.className = "mzk-modal-edit-playlist";
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


    _editCollectionDescriptionUI() {
        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = this.data.name;

        let contentText             = document.createElement("P");
        let close                   = document.createElement("BUTTON");

        contentText.innerHTML       = this.data.description;
        close.innerHTML             = "Close";

        this.ui.content.appendChild(contentText);
        this.ui.footer.appendChild(close);

        if ((this.data.isLibrary && window.app.user.hasPermission("LIBR")) || (!this.data.isLibrary && window.app.user.hasPermission("PLST"))) {
            this._appendEditButton();
            let that = this;
            this.editButton.addEventListener('click', function() {
                let save       = document.createElement("BUTTON");
                let textarea   = document.createElement('TEXTAREA');

                save.innerHTML = 'Save';
                textarea.name  = 'comment';
                textarea.row   = '8';
                textarea.cols  = '80';
                textarea.value = contentText.innerHTML;

                that.ui.content.removeChild(contentText);
                that.ui.footer.appendChild(save);
                that.ui.content.appendChild(textarea);

                let self = that;
                save.addEventListener('click', function() {
                    self.callback(textarea.value);
                    contentText.innerHTML = textarea.value;
                    self.ui.content.removeChild(textarea);
                    self.ui.content.appendChild(contentText);
                    self.ui.footer.removeChild(save);
                });
            });
        }

        this._appendCloseButton();

        close.addEventListener("click", function() {
            that.close();
        });
    }


    _editTagUI() {
        this.ui.container.className = "mzk-modal-edit-tag";
        this.editTag = new EditTag(this.ui.content, this.data);

        let ui = {
            foot:      document.createElement("DIV"),
            close: document.createElement("BUTTON"),
            save:  document.createElement("BUTTON")
        };

        ui.foot.className  = "mzk-foot";
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
        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = "Fetching your playlists";

        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let text                    = document.createElement("P");

        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        text.innerHTML              = "Currently fetching your libraries and playlists, please wait.";

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
        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = "Crushing data";

        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let text                    = document.createElement("P");

        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        text.innerHTML              = "Hold on, you're data are on the road.";

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
        this.ui.container.className = "mzk-modal-invite-code";
        this.ui.title.innerHTML     = "Invitation code";

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
        this.ui.container.className = "mzk-modal-new-library";
        this.ui.title.innerHTML     = "New library";

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let path                    = document.createElement("INPUT");
        let scan                    = document.createElement("BUTTON");

        infoLabel.className         = "mzk-info-label";
        name.id                     = "mzk-name";
        path.id                     = "mzk-path";

        name.type                   = "text";
        path.type                   = "text";
        name.placeholder            = "Enter the name of the library";
        path.placeholder            = "Enter the absolute path to your library";

        infoLabel.innerHTML         = "Welcome! Fill the path with your library's one, name it and let the magic begin! " +
            "Some additionnal features are waiting for you if your library is synced with other devices, using " +
            "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
            "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
        scan.innerHTML              = "Scan";

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.content.appendChild(path);
        this.ui.footer.appendChild(scan);

        this._appendCloseButton();

        let that = this;
        scan.addEventListener("click", function() {
            that._checkLibraryInputs(name, path, false);
        });
    }


    /**
     * method : _newPlaylistUI (private)
     * class  : Modal
     * desc   : Build UI elements for newPlaylist modal
     **/
    _newPlaylistUI() {
        this.ui.container.className = "mzk-modal-new-library";
        this.ui.title.innerHTML     = "New playlist";

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let create                  = document.createElement("BUTTON");

        infoLabel.className         = "mzk-info-label";
        name.id                     = "mzk-name";

        name.type                   = "text";
        name.placeholder            = "Enter the name of the playlist";

        infoLabel.innerHTML         = "Please choose a name for your brand new playlist.";
        create.innerHTML            = "Create";

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
        this.ui.container.className = "mzk-modal-new-wish";
        this.ui.title.innerHTML     = "Make a suggestion";

        let text                    = document.createElement("P");
        let wish                    = document.createElement("TEXTAREA");
        let submit                  = document.createElement("BUTTON");

        wish.placeholder            = "Enter your suggestion here";
        text.innerHTML              = "If you noticed that a track you like is missing from any playlist here, you can make a suggestion. " +
            "Paste a URL or write as much information as you can about it, and an administrator will process your request. " +
            "You will be notified when the track you requested has been added to a playlist. Also, if you have any feature idea, feel free to fill " +
            "this field (hard to say isn't it?).";
        submit.innerHTML            = "Submit";

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
        let content                 = document.createElement("IFRAME");
        this.ui.container.className = "mzk-modal-open-syncthing";

        content.frameBorder         = 0;
        content.height              = "100%";
        content.width               = "100%";
        //content.src                 = "http://everynoise.com/engenremap.html";
        content.src                 = "//127.0.0.1:8384/";

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
        this.ui.container.className = "mzk-modal-edit-playlist";
        this.ui.title.innerHTML     = "Rename " + this.data.name;

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let cancel                  = document.createElement("BUTTON");
        let rename                  = document.createElement("BUTTON");

        infoLabel.id                = "infoLabel";
        name.id                     = "name";
        cancel.id                   = "cancelButton";
        rename.id                   = "deleteButton";

        name.type                   = "text";
        name.placeholder            = "Enter the name of the playlist";

        infoLabel.innerHTML         = "You are about to rename your playlist named <b>" + this.data.name +
            "</b>, Do you really want to rename it ?";
        cancel.innerHTML            = "Cancel";
        rename.innerHTML            = "Rename";

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
        this.ui.container.className = "mzk-modal-scan-library";
        this.ui.title.innerHTML     = "Library scan in progress...";

        let contentText             = document.createElement("P");
        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let footerText              = document.createElement("P");

        contentText.innerHTML       = "Dark magic is currently happening, but doing such activity may take a while, depending on the number of files you have. Please relax, go grab some coffee and let the server manage its business.";
        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        footerText.innerHTML        = "On average, it take a minute to process two thousand files. Just do the math ;)";

        spinnerRing.appendChild(spinnerFloatDiv);
        spinnerContainer.appendChild(spinnerRing);

        this.ui.content.appendChild(contentText);
        this.ui.content.appendChild(spinnerContainer);
        this.ui.content.appendChild(spinnerImage);
        this.ui.footer.appendChild(footerText);
    }

    /**
     * method : _editGroupUI (private)
     * class  : Modal
     * desc   : Build UI elements for edit group modal
     */
    _editGroupUI() {
        this.ui.container.className = "mzk-modal-edit-group";
        this.ui.title.innerHTML     = "Edit Group";

        let nameTitle               = document.createElement("DIV");
        let name                    = document.createElement("INPUT");
        let cancel                  = document.createElement("BUTTON");
        let save                    = document.createElement("BUTTON");
        let permsTitle              = document.createElement("DIV");
        let boxContainer            = document.createElement("DIV");

        name.id                     = "name";
        cancel.id                   = "cancelButton";
        save.id                     = "saveButton";
        boxContainer.className      = "mzk-modal-box-container";
        nameTitle.className         = "mzk-modal-title";
        permsTitle.className        = "mzk-modal-title";

        name.type                   = "text";
        name.value                  = this.data.GROUP.NAME;
        cancel.innerHTML            = "Cancel";
        save.innerHTML              = "Save";
        nameTitle.innerHTML         = "Group Name";
        permsTitle.innerHTML        = "Permissions";

        this._appendCloseButton();

        this.ui.content.appendChild(nameTitle);
        this.ui.content.appendChild(name);
        this.ui.content.appendChild(permsTitle);
        this.ui.content.appendChild(boxContainer);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(save);

        for(let i in this.data.PERMISSIONS) {
            let box     = document.createElement('INPUT');
            box.type    = 'checkbox';
            box.value   = i;

            let boxLbl  = document.createElement("LABEL");
            boxLbl.appendChild(box);
            boxLbl.innerHTML += this.data.PERMISSIONS[i];

            boxContainer.appendChild(boxLbl);
        }

        for(let i = 0; i < this.data.GROUP.PERMISSIONS.length; ++i) {
            for(let j = 0; j < boxContainer.children.length; ++j)
                if(boxContainer.children[j].firstChild.value == this.data.GROUP.PERMISSIONS[i])
                    boxContainer.children[j].firstChild.checked = true;
        }

        let that = this;
        cancel.addEventListener('click', function() {
            that.close();
        });
        save.addEventListener('click', function() {
            let rights = {};
            for(let i = 0; i < boxContainer.children.length; ++i)
                rights[boxContainer.children[i].firstChild.value] = boxContainer.children[i].firstChild.checked == true;

            window.app.changeGroup(that.data.GROUP.ID, name.value, rights);
            that.close();
        });
    }

    /**
     * method : _chooseGroupUI (private)
     * class  : Modal
     * desc   : Build UI elements for choose group modal
     */
    _chooseGroupUI() {
        this.ui.container.className = "mzk-modal-choose-group";
        this.ui.title.innerHTML     = "Choose group for " + this.data.USER.NAME;

        let cancel                  = document.createElement("BUTTON");
        let save                    = document.createElement("BUTTON");
        let groupsTitle             = document.createElement("DIV");
        let groupsContainer         = document.createElement("UL");

        cancel.id                   = "cancelButton";
        save.id                     = "saveButton";
        groupsContainer.className   = "mzk-modal-groups-container";
        groupsTitle.className       = "mzk-modal-title";

        cancel.innerHTML            = "Cancel";
        save.innerHTML              = "Save";
        groupsTitle.innerHTML       = "Available groups on ManaZeak";

        this._appendCloseButton();

        this.ui.content.appendChild(groupsTitle);
        this.ui.content.appendChild(groupsContainer);
        this.ui.footer.appendChild(cancel);
        this.ui.footer.appendChild(save);

        let selected = null;
        let nbPerm = Object.keys(this.data.PERMISSIONS).length;
        for(let i = 0; i < this.data.GROUPS.length; ++i) {
            let li = document.createElement("LI");
            li.innerHTML = "<b>" + this.data.GROUPS[i].NAME + "</b> (" + this.data.GROUPS[i].PERMISSIONS.length + "/" + nbPerm + " permissions)";
            li.value     = this.data.GROUPS[i].ID;
            if(li.value == this.data.USER.GROUP_ID) {
                li.className = "mzk-selected";
                selected = li;
            }

            li.addEventListener('click', function() {
                if(selected)
                    selected.className = "";
                selected = li;
                selected.className = "mzk-selected";
            });

            groupsContainer.appendChild(li);
        }

        let that = this;
        cancel.addEventListener('click', function() {
            that.close();
        });
        save.addEventListener('click', function() {
            window.app.changeUserGroup(that.data.USER.USER_ID, selected.value, that.data.USER.NAME);
            that.close();
        });
    }

}

export default Modal