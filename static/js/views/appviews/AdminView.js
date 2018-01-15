/* * * * * * * * * * * * * * * * * * * * * *
 *                                 *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

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

        this.ui.menuList.appendChild(this.ui.menuDB);
        this.ui.menuList.appendChild(this.ui.menuUser);
        this.ui.menuList.appendChild(this.ui.menuLib);
        this.ui.menuList.appendChild(this.ui.menuSC);

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

        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
        this.ui.rmMoodButton.addEventListener("click", this._removeMoodbar.bind(this));
    }


    _requestDeleteLibraries() { // TODO : put the code below in APP
        let that = this;
        JSONParsedGetRequest(
            "ajax/deleteAllLibrary/",
            function(response) {
                /* response = {
                 *     DONE        : bool
                 *     ERROR_H1    : string
                 *     ERROR_MSG   : string
                 *
                 *     PATH        : string
                 * } */
                if (response.DONE) {
                    window.app.playlists = [];
                    window.app.topBar.playlists = [];
                    that.ui.rmLibButton.blur();

                    window.app.refreshTopBar();
                    window.app.refreshFootBar();
                    that._updateAdminInfo();
                }

                else {
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
        this.ui.menuUser.className   = "selected";
        this.ui.contentTitle.innerHTML = "User management";


        let sponsoringLabel = document.createElement("P");
        let sponsoringSpan = document.createElement("SPAN");
        let sponsoring = document.createElement("BUTTON");
        let list = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.USER.length; ++i) {
            let admin         = this.info.USER[i].ADMIN ? "Admin" : "User";
            let element       = document.createElement("LI");
            let rm            = document.createElement("IMG");
            rm.src            = "/static/img/utils/trash.svg";
            rm.addEventListener("click", function() {
                window.app.deleteUser(that.info.USER[i].ID, function() {
                    let that = this;
                    JSONParsedGetRequest(
                        "ajax/getAdminView/",
                        function(response) {
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             * } */
                            if (response.DONE) {
                                that.info = response;
                                that._requestUsersPage();
                            }
                        }
                    );
                });
            });
            element.innerHTML = "<b>" + this.info.USER[i].NAME + "</b> (" + admin + ") <br>" +
                "Joined ManaZeak: " + this.info.USER[i].JOINED + " - Last login: " + this.info.USER[i].LAST_LOGIN;
            element.appendChild(rm);
            list.appendChild(element);
        }

        let status = this.info.INVITE_ENABLED ? "Enabled" : "Disabled";
        sponsoringLabel.innerHTML = "<b>Sponsoring option on subscribe</b><br>" +
            "<br>" +
            "When activated, any user that want to sign up needs to provide an ID from a user already signed in ManaZeak.<br>" +
            "This command will add a field in the sign up form that is mandatory. Sponsoring current status : " + status;
        sponsoring.innerHTML = this.info.INVITE_ENABLED ? "DISABLE SPONSORING" : "ENABLE SPONSORING";
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
        this.ui.menuLib.className      = "selected";
        this.ui.contentTitle.innerHTML = "Libraries management";

        this.ui.rmLibLabel             = document.createElement("P");
        this.ui.rmLibButton            = document.createElement("BUTTON");

        this.ui.rmLibLabel.innerHTML  = "<b>Remove every libraries</b><br>" +
            "<br>" +
            "In case of... Warning, this command apply to every user in ManaZeak.<br>" +
            "This command will erase all libraries in the database.";
        this.ui.rmLibButton.innerHTML  = "REMOVE ALL LIBRARIES";

        let list = document.createElement("UL");

        let that = this;
        for (let i = 0; i < this.info.LIBRARIES.length; ++i) {
            let element       = document.createElement("LI");
            let rm            = document.createElement("IMG");
            rm.src            = "/static/img/utils/trash.svg";
            rm.addEventListener("click", function() {
                JSONParsedPostRequest(
                    "ajax/deleteLibrary/",
                    JSON.stringify({
                        LIBRARY_ID: that.info.LIBRARIES[i].ID,
                    }),
                    function(response) {
                        /* response = {
                         *     DONE        : bool
                         *     ERROR_H1    : string
                         *     ERROR_MSG   : string
                         *
                         *     PATH        : string
                         * } */
                        if (response.DONE) {
                            for (let j = 0; j < window.app.playlists.length; ++j) { // Removing from playlists Array
                                if (window.app.playlists[j].id === that.info.LIBRARIES[i].ID) {
                                    window.app.playlists.splice(j, 1);
                                    break;
                                }
                            }
                            window.app.refreshTopBar();
                            window.app.refreshFootBar();

                            let self = that;
                            that._updateAdminInfo(function() {
                                self._requestLibrariesPage();
                            });
                        }

                        else {
                            new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                        }
                    }
                );
            });
            element.innerHTML = "<b>" + this.info.LIBRARIES[i].NAME + "</b> (" + this.info.LIBRARIES[i].NUMBER_TRACK + " tracks)<br>" +
                "Path: " + this.info.LIBRARIES[i].PATH;
            element.appendChild(rm);
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.rmLibLabel);
        this.ui.content.appendChild(this.ui.rmLibButton);
        this.ui.content.appendChild(list);

        this.ui.rmLibButton.addEventListener("click", this._requestDeleteLibraries.bind(this));
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestSCPage() {
        this._updateAdminInfo();
        this._clearPageSpace();
        this.ui.menuSC.className   = "selected";
        this.ui.contentTitle.innerHTML = "SyncThing management";

        this.ui.apiKeyLabel            = document.createElement("P");
        this.ui.apiKeyField            = document.createElement("INPUT");
        this.ui.apiKeyButton           = document.createElement("BUTTON");
        this.ui.rescanLabel            = document.createElement("P");
        this.ui.rescanButton           = document.createElement("BUTTON");
        this.ui.openSCLabel            = document.createElement("P");
        this.ui.openSCButton           = document.createElement("BUTTON");

        this.ui.apiKeyField.type       = "text";
        this.ui.apiKeyField.value      = this.info.SYNC_KEY;

        this.ui.apiKeyLabel.innerHTML  = "<b>SyncThing API key</b><br>" +
            "<br>" +
            "In order to link ManaZeak with the SyncThing instance in the server, you must provide the SyncThing API key.<br>" +
            "Please fill the following field with the key you can find on the SyncThing interface (use the OPEN button under).";
        this.ui.rescanLabel.innerHTML  = "<b>Rescan SyncThing folders</b><br>" +
            "<br>" +
            "A SyncThing folder must be rescanned every time a modification is made on a file inside.<br>" +
            "This command will perform a rescan on each SyncThing folder.";
        this.ui.openSCLabel.innerHTML  = "<b>Open SyncThing interface</b><br>" +
            "<br>" +
            "If none of the hereby command can't help you there" +
            "This command will open the SyncThing instance right here, in a modal.";
        this.ui.apiKeyButton.innerHTML = "SUBMIT";
        this.ui.rescanButton.innerHTML = "RESCAN";
        this.ui.openSCButton.innerHTML = "OPEN";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(document.createElement("HR"));
        this.ui.content.appendChild(this.ui.apiKeyLabel);
        this.ui.content.appendChild(this.ui.apiKeyField);
        this.ui.content.appendChild(this.ui.apiKeyButton);
        this.ui.content.appendChild(this.ui.rescanLabel);
        this.ui.content.appendChild(this.ui.rescanButton);
        this.ui.content.appendChild(this.ui.openSCLabel);
        this.ui.content.appendChild(this.ui.openSCButton);

        let that = this;
        this.ui.apiKeyButton.addEventListener("click", this._submitAPIKey.bind(this));
        this.ui.rescanButton.addEventListener("click", this._rescanSC.bind(this));
        this.ui.openSCButton.addEventListener("click", function() {
            that.modal = new Modal("openSyncThing");
            that.modal.open();
        });
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
            "ajax/ZNCcuoa8kJL8z6xgNZKnWmMfahHf9j6w6Fi3HFc",
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
            "ajax/syncthingRescan",
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
            "ajax/removeAllMoods/",
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
            "ajax/changeSyncthingAPIKey/",
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


    _toggleInviteMode() {
        let that = this;
        JSONParsedGetRequest(
            "ajax/toggleInvite/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    let self = that;
                    JSONParsedGetRequest(
                        "ajax/getAdminView/",
                        function(response) {
                            /* response = {
                             *     DONE      : bool
                             *     ERROR_H1  : string
                             *     ERROR_MSG : string
                             * } */
                            if (response.DONE) {
                                self.info = response;
                                self._requestUsersPage();
                            }
                        }
                    );
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }


    _unselectAllMenuEntries() {
        this.ui.menuDB.className   = "";
        this.ui.menuUser.className = "";
        this.ui.menuLib.className  = "";
        this.ui.menuSC.className   = "";
    }


    _updateAdminInfo(callback) {
        let that = this;
        JSONParsedGetRequest(
            "ajax/getAdminView/",
            function(response) {
                /* response = {
                 *     DONE      : bool
                 *     ERROR_H1  : string
                 *     ERROR_MSG : string
                 * } */
                if (response.DONE) {
                    that.info = response;

                    if (callback) {
                        callback();
                    }
                }

                else {
                    new Notification("ERROR", response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    }

}
