/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

import { JSONParsedPostRequest, JSONParsedGetRequest, secondsToTimecode } from '../../utils/Utils.js'
import Notification from '../../utils/Notification.js'
import View from '../../core/View.js'

class AdminView extends View {

    constructor() {
        super();
        this.info  = null;
        this.modal = null;
        this._init();
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _clearPageSpace (private)
     * class  : AdminView
     * desc   : Clear the UI content div from all its child
     **/
    _clearPageSpace() {
        this.ui.content.innerHTML = "";
        this._unselectAllMenuEntries();
    }


    /**
     * method : _createUI (private)
     * class  : AdminView
     * desc   : Build UI elements
     **/
    _createUI() {
        this.ui = {
            container:    this.container,
            menu:         document.createElement("DIV"),
            menuTitle:    document.createElement("H2"),

            menuList:     document.createElement("UL"),
            menuDB:       document.createElement("LI"),
            menuUser:     document.createElement("LI"),
            menuLib:      document.createElement("LI"),
            menuSC:       document.createElement("LI"),
            menuWish:     document.createElement("LI"),

            content:      document.createElement("DIV"),
            contentTitle: document.createElement("H1"),
        };

        this.ui.container.id        = "admin";
        this.ui.menu.id             = "leftMenu";
        this.ui.content.id          = "content";
        this.ui.menuTitle.innerHTML = "Admin panel";
        this.ui.menuDB.innerHTML    = "Database";
        this.ui.menuUser.innerHTML  = "Users";
        this.ui.menuLib.innerHTML   = "Libraries";
        this.ui.menuSC.innerHTML    = "SyncThing";
        this.ui.menuWish.innerHTML    = "Wishes";

        this.ui.menuList.appendChild(this.ui.menuDB);
        this.ui.menuList.appendChild(this.ui.menuLib);
        this.ui.menuList.appendChild(this.ui.menuWish);
        this.ui.menuList.appendChild(this.ui.menuSC);
        this.ui.menuList.appendChild(this.ui.menuUser);

        this.ui.menu.appendChild(this.ui.menuTitle);
        this.ui.menu.appendChild(this.ui.menuList);
        this.ui.container.appendChild(this.ui.menu);
        this.ui.container.appendChild(this.ui.content);

        this._eventListener();
        this._requestDBPage();
    }


    /**
     * method : _eventListener (private)
     * class  : AdminView
     * desc   : AdminView event listeners
     **/
    _eventListener() {
        this.ui.menuDB.addEventListener("click", this._requestDBPage.bind(this));
        this.ui.menuUser.addEventListener("click", this._requestUsersPage.bind(this));
        this.ui.menuLib.addEventListener("click", this._requestLibrariesPage.bind(this));
        this.ui.menuSC.addEventListener("click", this._requestSCPage.bind(this));
        this.ui.menuWish.addEventListener("click", this._requestWishPage.bind(this));
    }


    /**
     * method : _init (private)
     * class  : AdminView
     * desc   : Create view to DB page by default
     **/
    _init() {
        let that = this;
        this._updateAdminInfo(function() {
            that._createUI();
        });
    }


    /**
     * method : _requestDBPage (private)
     * class  : AdminView
     * desc   : Display the database management page
     **/
    _requestDBPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuDB.className        = "selected";
        this.ui.contentTitle.innerHTML  = "Database management";

        this.ui.rmMoodLabel             = document.createElement("P");
        this.ui.rmMoodButton            = document.createElement("BUTTON");
        this.ui.rmCoverLabel            = document.createElement("P");
        this.ui.rmCoverButton           = document.createElement("BUTTON");
        this.ui.dropLabel               = document.createElement("P");
        this.ui.dropButton              = document.createElement("BUTTON");

        this.ui.rmCoverLabel.innerHTML  = "<b>Re-extract all covers from tracks</b><br>" +
            "<br>" +
            "Covers are automatically extracted from all tracks contained in a new library and locally stored on the server.<br>" +
            "This command will erase existing covers and re-extract them for all tracks stored in the database.";
        this.ui.rmMoodLabel.innerHTML   = "<b>Remove all moodbars from server</b><br>" +
            "<br>" +
            "ManaZeak perform a MoodBar scan on all tracks in the <code>/library/</code> folder every hour to generate the associated " +
            "<code>.mood</code> file (if it doesn't exists already).<br>" +
            "This command will erase all existing <code>.mood</code> file stored in the server. You might wait an hour or less before " +
            "ManaZeak re-generate those <code>.mood</code> files.";
        this.ui.dropLabel.innerHTML     = "<b>Drop database</b><br>" +
            "<br>" +
            "The server database stores data about users, libraries, playlists, tracks, artists, albums, genres, shuffle history, user history and statistics.<br>" +
            "This command will delete everything in the database except users.";
        this.ui.rmMoodButton.innerHTML  = "REMOVE ALL MOODBARS";
        this.ui.rmCoverButton.innerHTML = "RE-EXTRACT ALL COVERS";
        this.ui.dropButton.innerHTML    = "DROP DATABASE";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rmCoverLabel);
        this.ui.content.appendChild(this.ui.rmCoverButton);
        this.ui.content.appendChild(this.ui.rmMoodLabel);
        this.ui.content.appendChild(this.ui.rmMoodButton);
        this.ui.content.appendChild(this.ui.dropLabel);
        this.ui.content.appendChild(this.ui.dropButton);

        this.ui.rmMoodButton.addEventListener("click", this._removeMoodbar.bind(this));
        this.ui.rmCoverButton.addEventListener("click", this._regenCover.bind(this));
        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
    }


    _regenCover() {
        let that = this;
        JSONParsedGetRequest(
            "admin/regenerateCovers/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDeleteLibraries (private)
     * class  : AdminView
     * desc   : Request to delete all library
     **/
    _requestDeleteLibraries() { // TODO : put the code below in APP
        let that = this;
        JSONParsedGetRequest(
            "library/deleteAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    window.app.playlists.clear();
                    window.app.changePlaylist();
                    that.ui.rmLibButton.blur();
                    that._updateAdminInfo();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestRescanLibraries (private)
     * class  : AdminView
     * desc   : Request to rescan all library
     **/
    _requestRescanLibraries() {
        let that = this;
        JSONParsedGetRequest(
            "library/rescanAll/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestUsersPage (private)
     * class  : AdminView
     * desc   : Display the users management page
     **/
    _requestUsersPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuUser.className     = "selected";
        this.ui.contentTitle.innerHTML = "User management";


        let sponsoringLabel            = document.createElement("P");
        let sponsoringSpan             = document.createElement("SPAN");
        let sponsoring                 = document.createElement("BUTTON");
        let list                       = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.USER.length; ++i) {
            let admin                  = this.info.USER[i].ADMIN ? "Admin" : "User";
            let element                = document.createElement("LI");
            let rm                     = document.createElement("IMG");
            rm.src                     = "/static/img/utils/trash.svg";
            rm.addEventListener("click", function() {
                window.app.deleteUser(that.info.USER[i].ID, function() {
                    let that = this;
                    JSONParsedGetRequest(
                        "admin/getView/",
                        function(response) { // TODO : fetch those info from getUserInfo
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             *
                             *     USER: {
                             *         GODFATHER_NAME:
                             *         NAME:
                             *         IS_ADMIN:
                             *         JOINED:
                             *         LAST_LOGIN:
                             *         USER_ID:
                             *         INVITE_CODE:
                             *         MANACOIN:
                             *     }
                             *     LIBRARIES: {
                             *         NAME:
                             *         PATH:
                             *         NUMBER_TRACK:
                             *         TOTAL_DURATION:
                             *         ID:
                             *     }
                             *     SYNC_KEY:
                             *     BUFFER_PATH:
                             *     INVITE_ENABLED:
                             * } */
                            if (response.DONE) {
                                that.info = response;
                                that._requestUsersPage();
                            }
                        }
                    );
                });
            });
            element.innerHTML          = "<b>" + this.info.USER[i].NAME + "</b> (" + admin + ") <br><br>" +
                                         "User ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.info.USER[i].INVITE_CODE + "<br>" +
                                         "Godfather:&nbsp;&nbsp;" + this.info.USER[i].GODFATHER_NAME + "<br>" +
                                         "ManaCoin: " + this.info.USER[i].MANACOIN + "<br><br>" +
                                         "Joined on: " + this.info.USER[i].JOINED + "<br>" +
                                         "Last login: " + this.info.USER[i].LAST_LOGIN;

            element.appendChild(rm);
            list.appendChild(element);
        }

        let status                     = this.info.INVITE_ENABLED ? "Enabled" : "Disabled";
        sponsoringLabel.innerHTML      = "<b>Sponsoring option on subscribe</b><br>" +
                                         "<br>" +
                                         "When activated, any user that want to sign up needs to provide an ID from a user already signed in ManaZeak.<br>" +
                                         "This command will add a field in the sign up form that is mandatory. <b>Sponsoring current status : " + status + "</b>";
        sponsoring.innerHTML           = this.info.INVITE_ENABLED ? "DISABLE SPONSORING" : "ENABLE SPONSORING";
        //godFather.setAttribute("onClick", godFather.checked = !godFather.checked);

        sponsoringSpan.appendChild(sponsoring);
        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(sponsoringLabel);
        this.ui.content.appendChild(sponsoringSpan);
        this.ui.content.appendChild(list);

        sponsoring.addEventListener("click", this._toggleInviteMode.bind(this));
    }


    /**
     * method : _requestLibrariesPage (private)
     * class  : AdminView
     * desc   : Display the libraries management page
     **/
    _requestLibrariesPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuLib.className         = "selected";
        this.ui.contentTitle.innerHTML    = "Libraries management";

        this.ui.rescanLibLabel            = document.createElement("P");
        this.ui.rescanLibButton           = document.createElement("BUTTON");
        this.ui.rmLibLabel                = document.createElement("P");
        this.ui.rmLibButton               = document.createElement("BUTTON");

        this.ui.rescanLibLabel.innerHTML  = "<b>Rescan libraries</b><br>" +
                                            "<br>" +
                                            "After you made modification on files located in a library folder, use this command to perform a rescan.<br>" +
                                            "This command will rescan all libraries in the database.";
        this.ui.rescanLibButton.innerHTML = "RESCAN ALL LIBRARIES";
        this.ui.rmLibLabel.innerHTML      = "<b>Remove libraries</b><br>" +
                                            "<br>" +
                                            "In case of... Warning, this command apply to every user in ManaZeak.<br>" +
                                            "This command will erase all libraries in the database.";
        this.ui.rmLibButton.innerHTML     = "REMOVE ALL LIBRARIES";

        let list                          = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.LIBRARIES.length; ++i) {
            let element                   = document.createElement("LI");
            let rm                        = document.createElement("IMG");
            rm.src                        = "/static/img/utils/trash.svg";
            let deletedID                 = that.info.LIBRARIES[i].ID;
            rm.addEventListener("click", function() {
                window.app.deletePlaylist(window.app.getPlaylistFromId(that.info.LIBRARIES[i].ID), function() {
                    that._updateAdminInfo(function() {
                        that._requestLibrariesPage();
                    });
                });
            });
            element.innerHTML             = "<b>" + this.info.LIBRARIES[i].NAME + "</b> - " + this.info.LIBRARIES[i].PATH + "<br>" +
                                            this.info.LIBRARIES[i].NUMBER_TRACK + " tracks - " + secondsToTimecode(this.info.LIBRARIES[i].TOTAL_DURATION);

            element.appendChild(rm);
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rescanLibLabel);
        this.ui.content.appendChild(this.ui.rescanLibButton);
        this.ui.content.appendChild(this.ui.rmLibLabel);
        this.ui.content.appendChild(this.ui.rmLibButton);
        this.ui.content.appendChild(list);

        this.ui.rescanLibButton.addEventListener("click", function() {
            that._requestRescanLibraries();
        });
        this.ui.rmLibButton.addEventListener("click", function() {
            that._requestDeleteLibraries();
        });
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestSCPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuSC.className       = "selected";
        this.ui.contentTitle.innerHTML = "SyncThing management";

        this.ui.apiKeyLabel            = document.createElement("P");
        this.ui.apiKeyField            = document.createElement("INPUT");
        this.ui.apiKeyButton           = document.createElement("BUTTON");
        this.ui.bufferLabel            = document.createElement("P");
        this.ui.bufferField            = document.createElement("INPUT");
        this.ui.bufferButton           = document.createElement("BUTTON");
        this.ui.rescanLabel            = document.createElement("P");
        this.ui.rescanButton           = document.createElement("BUTTON");
        this.ui.openSCLabel            = document.createElement("P");
        this.ui.openSCButton           = document.createElement("BUTTON");

        this.ui.apiKeyField.type       = "text";
        this.ui.apiKeyField.value      = this.info.SYNC_KEY;
        this.ui.apiKeyField.type       = "text";
        this.ui.bufferField.value      = this.info.BUFFER_PATH;
        this.ui.apiKeyLabel.innerHTML  = "<b>SyncThing API key</b><br>" +
                                         "<br>" +
                                         "In order to link ManaZeak with the SyncThing instance in the server, you must provide the SyncThing API key.<br>" +
                                         "Please fill the following field with the key you can find on the SyncThing interface (use the OPEN button under).";
        this.ui.apiKeyButton.innerHTML = "SUBMIT";
        this.ui.bufferLabel.innerHTML  = "<b>Buffer path</b><br>" +
                                         "<br>" +
                                         "The buffer folder is the one selected to upload file in.<br>" +
                                         "Please fill the following field with the buffer path.";
        this.ui.bufferButton.innerHTML = "SUBMIT";
        this.ui.rescanLabel.innerHTML  = "<b>Rescan SyncThing folders</b><br>" +
                                         "<br>" +
                                         "A SyncThing folder must be rescanned every time a modification is made on a file inside.<br>" +
                                         "This command will perform a rescan on each SyncThing folder.";
        this.ui.rescanButton.innerHTML = "RESCAN";
        this.ui.openSCLabel.innerHTML  = "<b>Open SyncThing interface</b><br>" +
                                         "<br>" +
                                         "If none of the hereby command can't help you there, you may use the SyncThing interface.<br>" +
                                         "This command will open the SyncThing instance right here, in a modal.";
        this.ui.openSCButton.innerHTML = "OPEN";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.apiKeyLabel);
        this.ui.content.appendChild(this.ui.apiKeyField);
        this.ui.content.appendChild(this.ui.apiKeyButton);
        this.ui.content.appendChild(this.ui.bufferLabel);
        this.ui.content.appendChild(this.ui.bufferField);
        this.ui.content.appendChild(this.ui.bufferButton);
        this.ui.content.appendChild(this.ui.rescanLabel);
        this.ui.content.appendChild(this.ui.rescanButton);
        this.ui.content.appendChild(this.ui.openSCLabel);
        this.ui.content.appendChild(this.ui.openSCButton);

        let that = this;
        this.ui.apiKeyButton.addEventListener("click", this._submitAPIKey.bind(this));
        this.ui.bufferButton.addEventListener("click", this._submitBufferPath.bind(this));
        this.ui.rescanButton.addEventListener("click", this._rescanSC.bind(this));
        this.ui.openSCButton.addEventListener("click", function() {
            that.modal = new Modal("openSyncThing");
            that.modal.open();
        });
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestWishPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuWish.className     = "selected";
        this.ui.contentTitle.innerHTML = "Wishes management";

        let list                       = document.createElement("UL");

        let that = this;
        JSONParsedPostRequest(
            "wish/get/",
            JSON.stringify({
                ALL: true
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     RESULT: {
                 *         WISH_ID:
                 *         DATE:
                 *         TEXT:
                 *         USERNAME:
                 *         STATUS:
                 *     }
                 * } */
                if (response.DONE) {
                    for (let i = 0; i < response.RESULT.length; ++i) {
                        let element        = document.createElement("LI");
                        let accept         = document.createElement("IMG");
                        let refuse         = document.createElement("IMG");

                        element.id         = "wishEntry";
                        accept.id          = "accept";
                        refuse.id          = "refuse";

                        element.innerHTML  = response.RESULT[i].USERNAME + ", " + response.RESULT[i].DATE + ":<br>" +
                                             "<b>" + response.RESULT[i].TEXT + "</b><br>";

                        switch (response.RESULT[i].STATUS) {
                            case 0:
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                                break;
                            case 1:
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused-true.svg";
                                break;
                            case 2:
                                accept.src = "/static/img/utils/adminview/accepted-true.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                                break;
                        }

                        let self = that;
                        accept.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 2, function() {
                                accept.src = "/static/img/utils/adminview/accepted-true.svg";
                                refuse.src = "/static/img/utils/adminview/refused.svg";
                            });
                        });
                        refuse.addEventListener("click", function() {
                            self._updateWishStatus(response.RESULT[i].WISH_ID, 1, function() {
                                accept.src = "/static/img/utils/adminview/accepted.svg";
                                refuse.src = "/static/img/utils/adminview/refused-true.svg";
                            });
                        });

                        element.appendChild(accept);
                        element.appendChild(refuse);
                        list.appendChild(element);
                    }

                    that.ui.content.appendChild(that.ui.contentTitle);
                    that.ui.content.appendChild(document.createElement("HR"));
                    that.ui.content.appendChild(list);
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Update the vote on a given wish
     **/
    _updateWishStatus(wishID, status, callback) {
        let that = this;
        JSONParsedPostRequest(
            "wish/setStatus/",
            JSON.stringify({
                WISH_ID: wishID,
                STATUS:  status
            }),
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 * } */
                if (response.DONE) {
                    if (callback) {
                        callback();
                    }

                    else {
                        that._requestWishPage();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _requestDrop (private)
     * class  : AdminView
     * desc   : Send a drop db request to the server
     **/
    _requestDrop() {
        // TODO : put modal on drop action to confirm ?
        let that = this;
        JSONParsedGetRequest(
            "admin/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.dropButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _rescanSC (private)
     * class  : AdminView
     * desc   : Rescan syncthing folders
     **/
    _rescanSC() {
        let that = this;
        JSONParsedGetRequest(
            "admin/syncthingRescan",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rescanButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _removeMoodbar (private)
     * class  : AdminView
     * desc   : Remove all moodbar from server
     **/
    _removeMoodbar() {
        let that = this;
        JSONParsedGetRequest(
            "admin/removeAllMoods/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (!response.DONE) {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }

                else {
                    that.ui.rmMoodButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitAPIKey() {
        let that = this;
        JSONParsedPostRequest(
            "admin/changeSyncthingAPIKey/",
            JSON.stringify({
                SYNC_KEY: this.ui.apiKeyField.value // TODO : Warning, value must be tested
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

                else {
                    that.ui.apiKeyButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _submitAPIKey (private)
     * class  : AdminView
     * desc   : Submit the SyncThing API key
     **/
    _submitBufferPath() {
        let that = this;
        JSONParsedPostRequest(
            "admin/changeBufferPath/",
            JSON.stringify({
                BUFFER_PATH: this.ui.bufferField.value // TODO : Warning, value must be tested
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

                else {
                    that.ui.bufferButton.blur();
                    // TODO : refresh UI
                }
            }
        );
    }


    /**
     * method : _toggleInviteMode (private)
     * class  : AdminView
     * desc   : Toggle user sponsoring in app
     **/
    _toggleInviteMode() {
        let that = this;


        JSONParsedGetRequest(
            "admin/toggleInvite/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    that._requestUsersPage();
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    /**
     * method : _unselectAllMenuEntries (private)
     * class  : AdminView
     * desc   : Unselect every entry in the left menu
     **/
    _unselectAllMenuEntries() {
        this.ui.menuDB.className   = "";
        this.ui.menuUser.className = "";
        this.ui.menuLib.className  = "";
        this.ui.menuSC.className   = "";
        this.ui.menuWish.className = "";
    }


    /**
     * method : _updateAdminInfo (private)
     * class  : AdminView
     * desc   : Updates admin information
     **/
    _updateAdminInfo(callback) {
        let that = this;
        JSONParsedGetRequest(
            "admin/getView/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 *
                 *     USER: {
                 *         GODFATHER_NAME:
                 *         NAME:
                 *         IS_ADMIN:
                 *         JOINED:
                 *         LAST_LOGIN:
                 *         USER_ID:
                 *         INVITE_CODE:
                 *         MANACOIN:
                 *     }
                 *     LIBRARIES: {
                 *         NAME:
                 *         PATH:
                 *         NUMBER_TRACK:
                 *         TOTAL_DURATION:
                 *         ID:
                 *     }
                 *     SYNC_KEY:
                 *     BUFFER_PATH:
                 *     INVITE_ENABLED:
                 * } */
                if (response.DONE) {
                    that.info = response;

                    if (callback) {
                        callback();
                    }
                }
            }
        );
    }

}

export default AdminView