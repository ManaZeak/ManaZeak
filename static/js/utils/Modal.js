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

        this.LOG = false; // Set to false to locally mute file
        if (window.debug && this.LOG) {
            console.log('  Modal construction');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : close call');
        }

        document.body.removeChild(document.getElementById(this.id));
        this.unlockShortcuts();
    }


    /**
     * method : open (public)
     * class  : Modal
     * desc   : Add the modal to the body
     **/
    open() {
        if (window.debug && this.LOG) {
            console.log('  Modal : open call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : setCallback call');
        }

        this.callback = callback;
    }


//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _appendCloseButton (private)
     * class  : Modal
     * desc   : Append a close button to modal container
     **/
    _appendCloseButton() {
        if (window.debug && this.LOG) {
            console.log('  Modal : _appendCloseButton call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _appendEditButton call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _checkLibraryInputs call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _checkPlaylistInputs call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _coverUI call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _createUI call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _deletePlaylistUI call');
        }

        this.ui.container.className = "mzk-modal-edit-playlist";
        this.ui.title.innerHTML = window.app.nls.modal.deletePlaylist.title + this.data.playlist.name;

        let infoLabel           = document.createElement("P");
        let cancel              = document.createElement("BUTTON");
        let del                 = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        cancel.id               = "cancelButton";
        del.id                  = "deleteButton";

        infoLabel.innerHTML     = window.app.nls.modal.deletePlaylist.content.pt1 + this.data.playlist.name +
            window.app.nls.modal.deletePlaylist.content.pt2;
        cancel.innerHTML        = window.app.nls.button.cancel;
        del.innerHTML           = window.app.nls.button.delete;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _editCollectionDescriptionUI call');
        }

        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = this.data.name;

        let contentText             = document.createElement("P");
        let close                   = document.createElement("BUTTON");

        contentText.innerHTML       = this.data.description;
        close.innerHTML             = window.app.nls.button.close;

        this.ui.content.appendChild(contentText);
        this.ui.footer.appendChild(close);

        if ((this.data.isLibrary && window.app.user.hasPermission("LIBR")) || (!this.data.isLibrary && window.app.user.hasPermission("PLST"))) {
            this._appendEditButton();
            let that = this;
            this.editButton.addEventListener('click', function() {
                let save       = document.createElement("BUTTON");
                let textarea   = document.createElement('TEXTAREA');

                save.innerHTML = window.app.nls.button.save;
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
        if (window.debug && this.LOG) {
            console.log('  Modal : _editTagUI call');
        }

        this.ui.container.className = "mzk-modal-edit-tag";
        this.editTag = new EditTag(this.ui.content, this.data);

        let ui = {
            foot:      document.createElement("DIV"),
            close: document.createElement("BUTTON"),
            save:  document.createElement("BUTTON")
        };

        ui.foot.className  = "mzk-foot";
        ui.close.innerHTML = window.app.nls.button.close;
        ui.save.innerHTML  = window.app.nls.button.save;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _fetchPlaylistUI call');
        }

        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = window.app.nls.modal.fetchPlaylist.title;

        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let text                    = document.createElement("P");

        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        text.innerHTML              = window.app.nls.modal.fetchPlaylist.content;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _fetchStatusUI call');
        }

        this.ui.container.className = "mzk-modal-fetch-playlists";
        this.ui.title.innerHTML     = window.app.nls.modal.fetchStats.title;

        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let text                    = document.createElement("P");

        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        text.innerHTML              = window.app.nls.modal.fetchStats.content;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _inviteCodeUI call');
        }

        this.ui.container.className = "mzk-modal-invite-code";
        this.ui.title.innerHTML     = window.app.nls.modal.invitation.title;

        let infoLabel           = document.createElement("P");
        let name                = document.createElement("H3");
        let close               = document.createElement("BUTTON");

        infoLabel.id            = "infoLabel";
        name.id                 = "name";

        close.innerHTML         = window.app.nls.button.close;
        name.innerHTML          = window.app.user.getInviteCode();
        infoLabel.innerHTML     = window.app.nls.modal.invitation.content;

        this.ui.content.appendChild(infoLabel);
        this.ui.content.appendChild(name);
        this.ui.footer.appendChild(close);

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _newLibraryUI call');
        }

        this.ui.container.className = "mzk-modal-new-library";
        this.ui.title.innerHTML     = window.app.nls.modal.newLibrary.title;

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let path                    = document.createElement("INPUT");
        let scan                    = document.createElement("BUTTON");

        infoLabel.className         = "mzk-info-label";
        name.id                     = "mzk-name";
        path.id                     = "mzk-path";

        name.type                   = "text";
        path.type                   = "text";
        name.placeholder            = window.app.nls.modal.newLibrary.placeholder.name;
        path.placeholder            = window.app.nls.modal.newLibrary.placeholder.path;

        infoLabel.innerHTML         = window.app.nls.modal.newLibrary.content;
        scan.innerHTML              = window.app.nls.button.scan;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _newPlaylistUI call');
        }

        this.ui.container.className = "mzk-modal-new-library";
        this.ui.title.innerHTML     = window.app.nls.modal.newPlaylist.title;

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let create                  = document.createElement("BUTTON");

        infoLabel.className         = "mzk-info-label";
        name.id                     = "mzk-name";

        name.type                   = "text";
        name.placeholder            = window.app.nls.modal.newPlaylist.placeholder;

        infoLabel.innerHTML         = window.app.nls.modal.newPlaylist.content;
        create.innerHTML            = window.app.nls.button.create;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _newWishUI call');
        }

        this.ui.container.className = "mzk-modal-new-wish";
        this.ui.title.innerHTML     = window.app.nls.modal.wish.title;

        let text                    = document.createElement("P");
        let wish                    = document.createElement("TEXTAREA");
        let submit                  = document.createElement("BUTTON");

        wish.placeholder            = window.app.nls.modal.wish.placeholder;
        text.innerHTML              = window.app.nls.modal.wish.content;
        submit.innerHTML            = window.app.nls.button.submit;

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
                        if (window.debug && this.LOG) {
                            console.log('  Modal : _newWishUI server response');
                        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _openSyncthingUI call');
        }

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _renamePlaylistUI call');
        }

        this.ui.container.className = "mzk-modal-edit-playlist";
        this.ui.title.innerHTML     = window.app.nls.modal.rename.title + this.data.name;

        let infoLabel               = document.createElement("P");
        let name                    = document.createElement("INPUT");
        let cancel                  = document.createElement("BUTTON");
        let rename                  = document.createElement("BUTTON");

        infoLabel.id                = "infoLabel";
        name.id                     = "name";
        cancel.id                   = "cancelButton";
        rename.id                   = "deleteButton";

        name.type                   = "text";
        name.placeholder            = window.app.nls.modal.rename.placeholder;

        infoLabel.innerHTML         = window.app.nls.modal.rename.content.pt1 + this.data.name + window.app.nls.modal.content.pt2;
        cancel.innerHTML            = window.app.nls.button.cancel;
        rename.innerHTML            = window.app.nls.button.rename;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _scanLibraryUI call');
        }

        this.ui.container.className = "mzk-modal-scan-library";
        this.ui.title.innerHTML     = window.app.nls.modal.scan.title;

        let contentText             = document.createElement("P");
        let spinnerContainer        = document.createElement("DIV");
        let spinnerRing             = document.createElement("DIV");
        let spinnerFloatDiv         = document.createElement("DIV");
        let spinnerImage            = document.createElement("IMG");
        let footerText              = document.createElement("P");

        contentText.innerHTML       = window.app.nls.modal.scan.content;
        spinnerContainer.className  = "lds-css";
        spinnerRing.className       = "lds-dual-ring";
        spinnerImage.src            = "/static/img/logo/manazeak.svg";
        footerText.innerHTML        = window.app.nls.modal.scan.footer;

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
        if (window.debug && this.LOG) {
            console.log('  Modal : _editGroupUI call');
        }

        this.ui.container.className = "mzk-modal-edit-group";
        this.ui.title.innerHTML     = window.app.nls.modal.editGroup.title;

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
        cancel.innerHTML            = window.app.nls.button.cancel;
        save.innerHTML              = window.app.nls.button.save;
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
        if (window.debug && this.LOG) {
            console.log('  Modal : _chooseGroupUI call');
        }

        this.ui.container.className = "mzk-modal-choose-group";
        this.ui.title.innerHTML     = window.app.nls.modal.chooseGroup.title + this.data.USER.NAME;

        let cancel                  = document.createElement("BUTTON");
        let save                    = document.createElement("BUTTON");
        let groupsTitle             = document.createElement("DIV");
        let groupsContainer         = document.createElement("UL");

        cancel.id                   = "cancelButton";
        save.id                     = "saveButton";
        groupsContainer.className   = "mzk-modal-groups-container";
        groupsTitle.className       = "mzk-modal-title";

        cancel.innerHTML            = window.app.nls.button.cancel;
        save.innerHTML              = window.app.nls.button.save;
        groupsTitle.innerHTML       = window.app.nls.modal.chooseGroup.content;

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