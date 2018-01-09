/* * * * * * * * * * * * * * * * * * * * * *
 *                                         *
 *  AdminView class                        *
 *                                         *
 *  Handle admin settings                  *
 *                                         *
 * * * * * * * * * * * * * * * * * * * * * */

class AdminView extends View {
    constructor() {

        super();

        this.info = null;
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
                    that._createUI();
                }
            }
        );
    }


    /**
     * method : _requestDBPage (private)
     * class  : AdminView
     * desc   : Display the database management page
     **/
    _requestDBPage() {
        this._clearPageSpace();
        this.ui.menuDB.className   = "selected";
        this.ui.contentTitle.innerHTML = "Database";

        this.ui.dropLabel              = document.createElement("P");
        this.ui.dropButton             = document.createElement("BUTTON");
        this.ui.rmMoodLabel            = document.createElement("P");
        this.ui.rmMoodButton           = document.createElement("BUTTON");

        this.ui.dropLabel.innerHTML    = "Drop the database";
        this.ui.dropButton.innerHTML   = "DROP";
        this.ui.rmMoodLabel.innerHTML  = "Remove all moodbar from server"; // TODO : warn user that moodbar will auto gen later
        this.ui.rmMoodButton.innerHTML = "REMOVE ALL";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(this.ui.dropLabel);
        this.ui.content.appendChild(this.ui.dropButton);
        this.ui.content.appendChild(this.ui.rmMoodLabel);
        this.ui.content.appendChild(this.ui.rmMoodButton);

        this.ui.dropButton.addEventListener("click", this._requestDrop.bind(this));
        this.ui.rmMoodButton.addEventListener("click", this._removeMoodbar.bind(this));
    }


    /**
     * method : _requestUsersPage (private)
     * class  : AdminView
     * desc   : Display the users management page
     **/
    _requestUsersPage() {
        this._clearPageSpace();
        this.ui.menuUser.className   = "selected";
        this.ui.contentTitle.innerHTML = "Users";

        let list = document.createElement("UL");

        for (let i = 0; i < this.info.USER.length; ++i) {
            let admin         = this.info.USER[i].ADMIN ? "Admin" : "User";
            let element       = document.createElement("LI");
            element.innerHTML = this.info.USER[i].NAME + " (ID: " + this.info.USER[i].ID + ") <br>" + admin;
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(list);
    }


    /**
     * method : _requestLibrariesPage (private)
     * class  : AdminView
     * desc   : Display the libraries management page
     **/
    _requestLibrariesPage() {
        this._clearPageSpace();
        this.ui.menuLib.className   = "selected";
        this.ui.contentTitle.innerHTML = "Libraries";

        let list = document.createElement("UL");

        for (let i = 0; i < this.info.LIBRARIES.length; ++i) {
            let element       = document.createElement("LI");
            element.innerHTML = this.info.LIBRARIES[i].NAME + " (ID: " + this.info.LIBRARIES[i].ID + ")";
            list.appendChild(element);
        }

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(list);
    }


    /**
     * method : _requestSCPage (private)
     * class  : AdminView
     * desc   : Display the SyncThing management page
     **/
    _requestSCPage() {
        this._clearPageSpace();
        this.ui.menuSC.className   = "selected";
        this.ui.contentTitle.innerHTML = "SyncThing";

        this.ui.apiKeyLabel            = document.createElement("P");
        this.ui.apiKeyField            = document.createElement("INPUT");
        this.ui.apiKeyButton           = document.createElement("BUTTON");
        this.ui.rescanLabel            = document.createElement("P");
        this.ui.rescanButton           = document.createElement("BUTTON");

        this.ui.apiKeyField.type       = "text";
        this.ui.apiKeyField.value      = this.info.SYNC_KEY;

        this.ui.apiKeyLabel.innerHTML  = "SyncThing API key";
        this.ui.apiKeyButton.innerHTML = "SUBMIT";
        this.ui.rescanLabel.innerHTML  = "Rescan SyncThing folders";
        this.ui.rescanButton.innerHTML = "RESCAN";

        this.ui.content.appendChild(this.ui.contentTitle);
        this.ui.content.appendChild(this.ui.apiKeyLabel);
        this.ui.content.appendChild(this.ui.apiKeyField);
        this.ui.content.appendChild(this.ui.apiKeyButton);
        this.ui.content.appendChild(this.ui.rescanLabel);
        this.ui.content.appendChild(this.ui.rescanButton);

        this.ui.apiKeyButton.addEventListener("click", this._submitAPIKey.bind(this));
        this.ui.rescanButton.addEventListener("click", this._rescanSC.bind(this));
    }


    /**
     * method : _requestDrop (private)
     * class  : AdminView
     * desc   : Send a drop db request to the server
     **/
    _requestDrop() {
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
                    // TODO : refresh UI
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

}
